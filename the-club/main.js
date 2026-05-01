// ======================================
// THE CLUB — main.js
// Moteur de jeu inkjs
// ======================================

let story = null;
let currentEpisodeFile = "intro.json";
let pendingStartKnot   = null; // knot de départ pour la prochaine loadStory
let storyEnded         = false; // verrouille l'état fin d'épisode

// --- Lecture ligne par ligne ---
let lineQueue           = [];
let isWaiting           = false;
let isTyping            = false;   // typewriter en cours
let skipTypewriter      = false;   // signal pour terminer instantanément
let isCtrlHeld          = false;   // fast-forward (Ctrl maintenu)
let typeTickCount       = 0;       // throttle son de frappe
let portraitSlots = { left: null, right: null };

// Mapping nom brut -> nom affiché + classe CSS
const CHAR_MAP = {
  "cass.or"  : { name: "Cass Orson",  cls: "cass",  sprite: "assets/images/sprites/cass.png"  },
  "cass"     : { name: "Cass Orson",  cls: "cass",  sprite: "assets/images/sprites/cass.png"  },
  "ivy.m"    : { name: "Ivy Marven",  cls: "ivy",   sprite: "assets/images/sprites/ivy.png"   },
  "ivy"      : { name: "Ivy",         cls: "ivy",   sprite: "assets/images/sprites/ivy.png"   },
  "loaam"    : { name: "Loam",        cls: "loam",  sprite: "assets/images/sprites/loam (2).png"  },
  "loam"     : { name: "Loam",        cls: "loam",  sprite: "assets/images/sprites/loam (2).png"  },
  "seth"     : { name: "Seth",        cls: "seth",  sprite: "assets/images/sprites/seth.png"  },
  "ridge"    : { name: "Ridge",       cls: "ridge", sprite: "assets/images/sprites/ridge.png" },
  "nox"      : { name: "Nox",         cls: "nox",   sprite: "assets/images/sprites/nox.png"   },
};

const SYSTEM_PREFIXES = [">", "//", "*bruit*", "*Bruit"];

// Prefixes des sprites d'émotion (nom_prefix + emotion_key + .png)
const EMOTION_PREFIX = {
  cass:   "cass_emotion_",
  ivy:    "ivy_emotion_",
  loam:   "loam_v2_emotion_",
  seth:   "seth_emotion_",
  ridge:  "ridge_emotion_",
  nox:    "nox_emotion_",
  tahlia: "tahlia_emotion_",
};

// Émotion active par personnage { charCls: "emotion_key" }
let currentEmotions = {};

function emotionSprite(charCls, key) {
  const prefix = EMOTION_PREFIX[charCls];
  if (!prefix) return null;
  return `assets/images/sprites/${prefix}${key}.png`;
}

function handleEmotionTag(tags, charCls) {
  const tag = tags.find(t => t.startsWith("emotion:"));
  if (!tag) return;
  const key = tag.slice(8).trim();
  if (key === "default") {
    delete currentEmotions[charCls];
  } else {
    currentEmotions[charCls] = key;
  }
}

// Épisodes disponibles
const EPISODES = [
  {
    label:       "Intro — Hexapolis",
    file:        "intro.json",
    chapter:     "INTRO",
    quote:       '" HURT "',
    quoteText:   '"I hurt myself today / To see if I still feel"',
    quoteCredit: '— Nine Inch Nails – "Hurt" (1994)',
    titleMusic:  "intro_title",
  },
  {
    label:       "Chapitre 1 — System Boot Complete",
    file:        "story.json",
    chapter:     "CHAPITRE UN",
    quote:       '" WELCOME TO THE MACHINE "',
    quoteText:   '"You bought a guitar to punish your ma / And you didn\'t like school / And you know you\'re nobody\'s fool"',
    quoteCredit: '— Pink Floyd – "Welcome to the Machine" (1975)',
    titleMusic:  "ep1_title",
  },
];

// Volumes audio (0–1)
const AUDIO = { master: 1, music: 0.8, sfx: 0.8 };

// ---- SFX synthétiques (Web Audio API) ----
let _audioCtx = null;
function getAudioCtx() {
  if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return _audioCtx;
}

function playSfx(name) {
  const vol = AUDIO.master * AUDIO.sfx;
  if (vol === 0) return;
  const ctx = getAudioCtx();

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(vol * 0.4, ctx.currentTime + 0.01);
  gain.connect(ctx.destination);

  if (name === "connect") {
    // Ascending tri-tone chirp
    [0, 0.12, 0.24].forEach((offset, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440 + i * 220, ctx.currentTime + offset);
      osc.frequency.exponentialRampToValueAtTime(880 + i * 220, ctx.currentTime + offset + 0.1);
      osc.connect(gain);
      osc.start(ctx.currentTime + offset);
      osc.stop(ctx.currentTime + offset + 0.12);
    });
    gain.gain.setValueAtTime(vol * 0.4, ctx.currentTime + 0.36 - 0.04);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.48);

  } else if (name === "disconnect") {
    // Descending digital sweep
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.35);
    osc.connect(gain);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
    gain.gain.setValueAtTime(vol * 0.35, ctx.currentTime + 0.25);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.42);

  } else if (name === "static") {
    // Noise burst + resonant sweep
    const bufLen = ctx.sampleRate * 0.18;
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(200, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.18);
    filter.Q.value = 3;
    src.connect(filter);
    filter.connect(gain);
    src.start(ctx.currentTime);
    gain.gain.setValueAtTime(vol * 0.5, ctx.currentTime + 0.12);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);

  } else if (name === "type") {
    // Tap clavier subtil (throttlé dans startTypewriter)
    const osc = ctx.createOscillator();
    osc.type = "square";
    osc.frequency.setValueAtTime(700 + Math.random() * 350, ctx.currentTime);
    osc.connect(gain);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.018);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(vol * 0.055, ctx.currentTime + 0.003);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.022);

  } else if (name === "choice_hover") {
    // Chirp doux survol choix
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1700, ctx.currentTime + 0.06);
    osc.connect(gain);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.07);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(vol * 0.13, ctx.currentTime + 0.01);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.08);

  } else if (name === "choice_select") {
    // Double-clic confirmation choix
    [0, 0.07].forEach((offset) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(900, ctx.currentTime + offset);
      osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + offset + 0.05);
      osc.connect(gain);
      osc.start(ctx.currentTime + offset);
      osc.stop(ctx.currentTime + offset + 0.07);
    });
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(vol * 0.22, ctx.currentTime + 0.01);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.16);
  }
}

// Lecteur voiceover
const voicePlayer = new Audio();

// Lecteur musique (boucle)
const musicPlayer = new Audio();
musicPlayer.loop = true;
let currentMusicTrack = null;

// --- Système de confiance ---
const CONF_VARS = {
  cass:  "CASS_CONF",
  ivy:   "IVY_CONF",
  loam:  "LOAM_CONF",
  seth:  "SETH_CONF",
  ridge: "RIDGE_CONF",
  nox:   "NOX_CONF",
};
const CONF_COLORS = {
  cass:  "#7b6fff",
  ivy:   "#ff6fb0",
  loam:  "#38bdf8",
  seth:  "#fb923c",
  ridge: "#a3e635",
  nox:   "#e879f9",
};
const CONF_LABELS = {
  cass:  "CASS",
  ivy:   "IVY",
  loam:  "LOAM",
  seth:  "SETH",
  ridge: "RIDGE",
  nox:   "NOX",
};
let prevConf = {};

// ---- Écran titre (contenu dynamique par épisode) ----
function showTitleScreen(ep) {
  const epigraph = document.getElementById("title-epigraph");
  if (ep.quote && ep.quoteText) {
    document.getElementById("title-quote").textContent       = ep.quote;
    document.getElementById("title-quote-text").textContent  = ep.quoteText;
    document.getElementById("title-quote-credit").textContent = ep.quoteCredit || "";
    epigraph.style.display = "";
  } else {
    epigraph.style.display = "none";
  }
  document.getElementById("title-chapter").textContent = ep.chapter || "";
  document.getElementById("title-screen").classList.remove("hidden");
}

// ======================================
// ÉCRAN DE CHARGEMENT (transition chapitres)
// ======================================
function showLoadingScreen(label, onComplete) {
  const overlay = document.getElementById("loading-overlay");
  const term    = document.getElementById("loading-terminal");
  while (term.firstChild) term.removeChild(term.firstChild);
  overlay.classList.remove("fade-out");
  overlay.classList.add("visible");
  overlay.setAttribute("aria-hidden", "false");

  const lines = [
    { text: "DÉCONNEXION DU SEGMENT PRÉCÉDENT...", accent: false },
    { text: "CHARGEMENT : " + label,               accent: true  },
    { text: "SYNCHRONISATION NEURALE EN COURS...", accent: false },
    { text: "INITIALISATION DE L'ESPACE VIRTUEL...", accent: false },
    { text: "IMMERSION DANS HUB.CLUB — PRÊT",      accent: true  },
  ];

  let i = 0;
  function nextLine() {
    if (i >= lines.length) {
      showBar();
      return;
    }
    const el = document.createElement("div");
    el.className = "loading-line" + (lines[i].accent ? " loading-line--accent" : "");
    el.textContent = "> " + lines[i].text;
    term.appendChild(el);
    i++;
    setTimeout(nextLine, 320);
  }

  function showBar() {
    const barWrap = document.createElement("div");
    barWrap.className = "loading-bar-wrap";
    const bar = document.createElement("div");
    bar.className = "loading-bar-fill";
    barWrap.appendChild(bar);
    term.appendChild(barWrap);

    let pct = 0;
    const iv = setInterval(() => {
      pct += Math.random() * 18 + 4;
      if (pct >= 100) {
        pct = 100;
        bar.style.width = "100%";
        clearInterval(iv);
        setTimeout(() => {
          overlay.classList.add("fade-out");
          setTimeout(() => {
            overlay.classList.remove("visible");
            overlay.classList.remove("fade-out");
            overlay.setAttribute("aria-hidden", "true");
            onComplete();
          }, 500);
        }, 250);
      } else {
        bar.style.width = pct + "%";
      }
    }, 70);
  }

  setTimeout(nextLine, 150);
}

// ---- Init ----
async function init() {
  loadAudioSettings();
  buildEpisodeList();

  document.getElementById("settings-btn").addEventListener("click", openSettings);
  document.getElementById("settings-close").addEventListener("click", closeSettings);
  document.getElementById("settings-overlay").addEventListener("click", (e) => {
    if (e.target === document.getElementById("settings-overlay")) closeSettings();
  });

  document.getElementById("achievements-btn").addEventListener("click", openAchievements);
  document.getElementById("achievements-close").addEventListener("click", closeAchievements);
  document.getElementById("achievements-overlay").addEventListener("click", (e) => {
    if (e.target === document.getElementById("achievements-overlay")) closeAchievements();
  });

  // Personnages
  document.getElementById("chars-btn").addEventListener("click", openCharacters);
  document.getElementById("chars-close").addEventListener("click", closeCharacters);
  document.getElementById("chars-overlay").addEventListener("click", (e) => {
    if (e.target === document.getElementById("chars-overlay")) closeCharacters();
  });

  // Arbre des décisions — fermeture
  const ctClose = document.getElementById("choice-tree-close");
  if (ctClose) {
    ctClose.addEventListener("click", () => {
      document.getElementById("choice-tree-overlay").classList.remove("visible");
    });
  }

  ["master", "music", "sfx"].forEach(key => {
    const slider  = document.getElementById(`vol-${key}`);
    const display = document.getElementById(`val-${key}`);
    slider.value = Math.round(AUDIO[key] * 100);
    display.textContent = slider.value;
    slider.addEventListener("input", () => {
      AUDIO[key] = slider.valueAsNumber / 100;
      display.textContent = slider.value;
      localStorage.setItem(`audio_${key}`, AUDIO[key]);
      if (!musicPlayer.paused) musicPlayer.volume = Math.min(1, AUDIO.master * AUDIO.music);
    });
  });

  // Avancer avec Espace / Ctrl, nav choix 1–9, skip typewriter
  document.addEventListener("keydown", (e) => {
    if (e.key === "Control") {
      isCtrlHeld = true;
      if (isTyping)  { skipTypewriter = true; return; }
      if (isWaiting) { showNextLine(); return; }
      return;
    }
    if (e.code === "Space") {
      e.preventDefault();
      if (isTyping)  { skipTypewriter = true; return; }
      if (isWaiting) { showNextLine(); }
      return;
    }
    // Sélection choix par touche numérique 1–9
    if (!isTyping && !isWaiting) {
      const n = parseInt(e.key, 10);
      if (!isNaN(n) && n >= 1) {
        const btns = document.querySelectorAll(".choice-btn");
        if (btns[n - 1]) btns[n - 1].click();
      }
    }
  });
  document.addEventListener("keyup", (e) => {
    if (e.key === "Control") isCtrlHeld = false;
  });
  document.getElementById("story-text").addEventListener("click", () => {
    if (isTyping)  { skipTypewriter = true; return; }
    if (isWaiting) { showNextLine(); }
  });

  applyCSSScene("hexapolis");
  playMusic(EPISODES[0].titleMusic || "ambient");
  showTitleScreen(EPISODES[0]);

  document.getElementById("title-start-btn").addEventListener("click", async () => {
    document.getElementById("title-screen").classList.add("hidden");
    await loadStory(currentEpisodeFile);
  });

  // Bouton "Reprendre" (sauvegarde)
  const resumeBtn = document.getElementById("title-resume-btn");
  if (resumeBtn) {
    if (hasSave()) resumeBtn.style.display = "";
    resumeBtn.addEventListener("click", loadSaveAndStart);
  }
}

async function loadStory(file) {
  const res = await fetch(file);
  if (!res.ok) {
    const p = document.createElement("p");
    p.className = "system-line";
    p.textContent = "\u274c Fichier introuvable. Lance node compile.js d'abord !";
    document.getElementById("story-text").appendChild(p);
    return;
  }
  const json = await res.text();
  story = new inkjs.Story(json);
  storyEnded = false;
  const startKnot = pendingStartKnot || (file === "story.json" ? "acces" : null);
  if (startKnot) story.ChoosePathString(startKnot);
  pendingStartKnot = null;
  if (typeof resetChoiceTree === "function") resetChoiceTree();
  // Succès : première connexion à l'ep1
  if (file === "story.json") unlockAchievement("first_connection");
  advance();
}

// ======================================
// SYSTÈME DE SAUVEGARDE
// ======================================
function saveGame() {
  if (!story || storyEnded || currentEpisodeFile !== "story.json") return;
  try {
    const data = JSON.stringify({ file: currentEpisodeFile, state: story.state.ToJson() });
    localStorage.setItem("the_club_save_ep1", data);
  } catch (_) {}
}

function hasSave() {
  return !!localStorage.getItem("the_club_save_ep1");
}

async function loadSaveAndStart() {
  const raw = localStorage.getItem("the_club_save_ep1");
  if (!raw) return;
  let saveData;
  try { saveData = JSON.parse(raw); } catch (_) { return; }
  const { file, state } = saveData;
  // Reset UI
  const storyEl   = document.getElementById("story-text");
  const choicesEl = document.getElementById("choices-area");
  while (storyEl.firstChild)   storyEl.removeChild(storyEl.firstChild);
  while (choicesEl.firstChild) choicesEl.removeChild(choicesEl.firstChild);
  lineQueue = [];
  isWaiting = false;
  storyEnded = false;
  prevConf = {};
  currentEmotions = {};
  voicePlayer.pause();
  updatePortrait(null);
  setBackground(null);
  handleMotionTag([]);  // reset motion panel
  document.getElementById("scene-area").classList.remove("scene-hexapolis", "scene-terminal", "scene-club_hub");
  updateConfHud();
  document.getElementById("title-screen").classList.add("hidden");
  currentEpisodeFile = file;
  // Load story + restore state
  const res = await fetch(file);
  if (!res.ok) return;
  const json = await res.text();
  story = new inkjs.Story(json);
  story.state.LoadJson(state);
  storyEnded = false;
  if (typeof resetChoiceTree === "function") resetChoiceTree();
  // Resume indicator
  const indicator = document.createElement("div");
  indicator.className = "system-line";
  indicator.textContent = "> REPRISE DEPUIS LA DERNIÈRE SAUVEGARDE";
  storyEl.appendChild(indicator);
  advance();
}

// ---- Typewriter : anime le texte caractère par caractère ----
function startTypewriter(el, text, onDone) {
  isTyping       = true;
  skipTypewriter = false;
  typeTickCount  = 0;
  let i = 0;

  function tick() {
    if (skipTypewriter || isCtrlHeld) {
      el.textContent = text;
      isTyping       = false;
      skipTypewriter = false;
      onDone();
      return;
    }
    if (i < text.length) {
      el.textContent = text.slice(0, i + 1);
      i++;
      typeTickCount++;
      setTimeout(tick, 28);
    } else {
      isTyping = false;
      onDone();
    }
  }

  setTimeout(tick, 0);
}

// ---- Avancer : collecter les lignes puis d\u00e9marrer la queue ----
function advance() {
  if (storyEnded) return;
  isTyping       = false;
  skipTypewriter = false;
  const choicesEl = document.getElementById("choices-area");
  while (choicesEl.firstChild) choicesEl.removeChild(choicesEl.firstChild);

  while (story.canContinue) {
    const line = story.Continue().trimEnd();
    const tags  = story.currentTags.slice();
    if (line.trim() === "") continue;
    lineQueue.push({ line, tags });
  }

  showNextLine();
}

// ---- Afficher la prochaine ligne ----
function showNextLine() {
  // Si typewriter en cours : Space/clic → compléter instantanément
  if (isTyping) {
    skipTypewriter = true;
    return;
  }

  const storyEl = document.getElementById("story-text");

  if (lineQueue.length === 0) {
    isWaiting = false;
    showContinueHint(false);
    renderChoices();
    return;
  }

  isWaiting = false;
  showContinueHint(false);

  const { line, tags } = lineQueue.shift();
  handleMusicTag(tags);
  handleBgTag(tags);
  handleMotionTag(tags);
  handleSfxTag(tags);
  handleSfxFromLine(line);

  const el = renderLine(line, tags);
  if (el) {
    storyEl.appendChild(el);
    storyEl.scrollTop = storyEl.scrollHeight;
  }

  checkConfidenceEffects();
  checkAchievementTriggers(line, tags);

  // Trouver l'élément à animer (marqué data-tw par renderLine)
  let twEl = null;
  if (el) {
    if (el.dataset && el.dataset.tw !== undefined) {
      twEl = el;
    } else {
      twEl = el.querySelector ? el.querySelector("[data-tw]") : null;
    }
  }

  function onTypeDone() {
    storyEl.scrollTop = storyEl.scrollHeight;
    if (lineQueue.length > 0) {
      isWaiting = true;
      showContinueHint(true);
    } else {
      isWaiting = false;
      showContinueHint(false);
      renderChoices();
    }
  }

  if (twEl) {
    const twText = twEl.dataset.tw;
    delete twEl.dataset.tw;
    startTypewriter(twEl, twText, onTypeDone);
  } else {
    onTypeDone();
  }
}

// ---- Afficher les choix ----
function renderChoices() {
  const storyEl   = document.getElementById("story-text");
  const choicesEl = document.getElementById("choices-area");

  if (story.currentChoices.length > 0) {
    const choiceTexts = story.currentChoices.map(c => c.text);
    story.currentChoices.forEach((choice, idx) => {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      const numSpan = document.createElement("span");
      numSpan.className = "choice-num";
      numSpan.textContent = String(idx + 1);
      btn.appendChild(numSpan);
      btn.appendChild(document.createTextNode("\u00a0" + choice.text));
      btn.addEventListener("mouseenter", () => playSfx("choice_hover"));
      btn.addEventListener("click", () => {
        playSfx("choice_select");
        if (currentEpisodeFile === "story.json" && typeof recordDecision === "function") {
          recordDecision(choiceTexts, idx);
        }
        story.ChooseChoiceIndex(idx);
        advance();
      });
      choicesEl.appendChild(btn);
    });
    // Auto-save au point de décision (ep1 uniquement)
    if (currentEpisodeFile === "story.json") saveGame();
  } else {
    // Si c'est la fin de l'intro, transition automatique vers l'épisode 1
    if (currentEpisodeFile === "intro.json") {
      storyEl.scrollTop = storyEl.scrollHeight;
      pendingStartKnot = "acces";
      showLoadingScreen("ÉPISODE 1 — SYSTEM BOOT COMPLETE", () => replayEpisode(EPISODES[1]));
    } else {
      if (currentEpisodeFile === "story.json") {
        storyEnded = true;
        if (unlockedAchievements.has("secret_ending")) {
          // Fin secrète — écran de ban
          const ban = document.createElement("div");
          ban.className = "end-message end-message--secret";
          const l1 = document.createElement("div");
          l1.textContent = "> CONNEXION INTERROMPUE";
          const l2 = document.createElement("div");
          l2.textContent = "> RAISON : COMPORTEMENT SUSPECT";
          const l3 = document.createElement("div");
          l3.textContent = "> IP BANNIE PAR : nox@club.mod";
          const l4 = document.createElement("div");
          l4.className = "end-message--secret-label";
          l4.textContent = "— FIN SECRÈTE —";
          ban.appendChild(l1);
          ban.appendChild(l2);
          ban.appendChild(l3);
          ban.appendChild(l4);
          storyEl.appendChild(ban);
        } else {
          unlockAchievement("ep1_complete");
          const v     = story.variablesState;
          const cass  = v["CASS_CONF"]  ?? 0;
          const loam  = v["LOAM_CONF"]  ?? 0;
          const ivy   = v["IVY_CONF"]   ?? 0;
          const seth  = v["SETH_CONF"]  ?? 0;
          const ridge = v["RIDGE_CONF"] ?? 0;
          const nox   = v["NOX_CONF"]   ?? 0;
          const nnd   = v["nnd_count"]  ?? 0;
          if (cass >= 40)                                                              unlockAchievement("parole_tenue");
          if (cass > 0 && loam > 0 && ivy > 0 && seth > 0 && ridge >= 0 && nox >= -20) unlockAchievement("ardoise_propre");
          if (nnd === 0)                                                               unlockAchievement("sans_filtre");
          if (cass < 0 && ivy < 0)                                                     unlockAchievement("l_insupportable");
          if (cass < 0 && loam < 0 && ivy < 0 && seth < 0)                             unlockAchievement("brise_tout");
          if (cass >= 30)                                                              unlockAchievement("cass_trust");
          if (cass < 0)                                                                unlockAchievement("cass_hostile");
          if (loam <= -5)                                                              unlockAchievement("loam_hurt");
          if (ivy <= -10)                                                              unlockAchievement("ivy_snubbed");
          if (ridge >= 0)                                                              unlockAchievement("ridge_warmer");
          if (ridge <= -25)                                                            unlockAchievement("ridge_hostile");
          if (nox >= -15)                                                              unlockAchievement("nox_warmer");
          if (nox <= -35)                                                              unlockAchievement("nox_hostile");
          const sc = v["silent_count"] ?? 0;
          if (sc >= 3)                                                                 unlockAchievement("silent_type");
          showRelationshipRecap(storyEl);
          const end = document.createElement("div");
          end.className = "end-message";
          end.textContent = "\u2014 FIN DE L'\u00c9PISODE \u2014";
          storyEl.appendChild(end);
        }
      }
      storyEl.scrollTop = storyEl.scrollHeight;
      fadeOutMusic();
    }
  }
}

// ---- Hint \u00ab Appuyer sur espace \u00bb ----
function showContinueHint(visible) {
  const hint = document.getElementById("continue-hint");
  if (visible) hint.classList.add("visible");
  else         hint.classList.remove("visible");
}

// ---- Parser une ligne ----
function renderLine(line, tags = []) {
  // Ligne vide
  if (!line.trim()) return null;

  // Ligne système (commence par > ou //)
  if (SYSTEM_PREFIXES.some(p => line.trim().startsWith(p))) {
    const el = document.createElement("div");
    el.className = "system-line";
    el.textContent = line;
    return el;
  }

  // Succès secret
  if (line.includes("Succès débloqué")) {
    const el = document.createElement("div");
    el.className = "end-message secret-line";
    el.textContent = line;
    return el;
  }

  // Titre d'épisode
  if (line.startsWith("THE CLUB")) {
    const el = document.createElement("div");
    el.className = "episode-title";
    el.textContent = line;
    return el;
  }

  // Dialogue "nom : texte"
  const colonIdx = line.indexOf(" : ");
  if (colonIdx !== -1) {
    const rawName = line.substring(0, colonIdx).trim().toLowerCase();
    const text = line.substring(colonIdx + 3).trim();
    const char = CHAR_MAP[rawName];

    if (char) {
      handleEmotionTag(tags, char.cls);
      updatePortrait(char);
      playVoiceover(tags);

      const wrapper = document.createElement("div");
      wrapper.className = "dialogue-line";

      const nameEl = document.createElement("div");
      nameEl.className = `char-name ${char.cls}`;
      nameEl.textContent = char.name;

      const textEl = document.createElement("div");
      textEl.className = "char-text";
      const twText = text.replace(/\*[^*]+\*/g, "").replace(/\s{2,}/g, " ").trim();
      textEl.dataset.tw = twText;
      textEl.textContent = "";

      wrapper.appendChild(nameEl);
      wrapper.appendChild(textEl);
      return wrapper;
    }
  }

  // Paragraphe générique
  const el = document.createElement("p");
  el.className = "story-para";
  el.dataset.tw = line;
  el.textContent = "";
  return el;
}

// ---- Portrait ----
function updatePortrait(char) {
  const container = document.getElementById("char-portrait");
  const leftSlot  = document.getElementById("portrait-left");
  const rightSlot = document.getElementById("portrait-right");

  if (!char) {
    portraitSlots = { left: null, right: null };
    leftSlot.classList.remove("visible", "entering", "active", "idle", "conf-low", "conf-mid", "conf-high");
    rightSlot.classList.remove("visible", "entering", "active", "idle", "conf-low", "conf-mid", "conf-high");
    container.classList.remove("has-two");
    return;
  }

  // Trouver le slot existant ou en assigner un
  let charSlot = null;
  if (portraitSlots.left  === char.cls) charSlot = "left";
  else if (portraitSlots.right === char.cls) charSlot = "right";

  if (!charSlot) {
    if (!portraitSlots.left)       charSlot = "left";
    else if (!portraitSlots.right) charSlot = "right";
    else {
      // Les deux slots occupés : remplacer l'idle
      charSlot = leftSlot.classList.contains("idle") ? "left" : "right";
    }
    portraitSlots[charSlot] = char.cls;
  }

  const slotEl  = charSlot === "left" ? leftSlot : rightSlot;
  const otherEl = charSlot === "left" ? rightSlot : leftSlot;
  const otherId = charSlot === "left" ? "right" : "left";

  // Mettre à jour l'image
  const img = slotEl.querySelector("img");
  const emotion   = currentEmotions[char.cls];
  const spriteSrc = (emotion && emotionSprite(char.cls, emotion)) || char.sprite;
  const resolvedSrc = new URL(spriteSrc, location.href).href;
  const isNew = img.src !== resolvedSrc;
  if (isNew) {
    img.src = spriteSrc;
    img.alt = char.name;
    slotEl.classList.remove("entering");
    void slotEl.offsetWidth;
    slotEl.classList.add("entering");
  }
  slotEl.classList.add("visible");

  // Actif / idle
  slotEl.classList.add("active");
  slotEl.classList.remove("idle");
  if (portraitSlots[otherId]) {
    otherEl.classList.add("idle");
    otherEl.classList.remove("active");
    container.classList.add("has-two");
  } else {
    container.classList.remove("has-two");
  }

  applyPortraitConf(char.cls, slotEl);
}

function applyPortraitConf(charCls, slotEl) {
  const val = getConfValue(charCls);
  slotEl.classList.remove("conf-low", "conf-mid", "conf-high");
  if (val !== null) {
    if (val <= 3)      slotEl.classList.add("conf-low");
    else if (val <= 6) slotEl.classList.add("conf-mid");
    else               slotEl.classList.add("conf-high");
  }
}

function getConfValue(charCls) {
  if (!story || !CONF_VARS[charCls]) return null;
  const v = story.variablesState[CONF_VARS[charCls]];
  return (v !== null && v !== undefined) ? v : null;
}

// Scènes CSS intégrées (pas besoin d'image)
const CSS_SCENES = new Set(["hexapolis", "terminal", "club_hub"]);

// ---- Motion comic panel ----
function handleMotionTag(tags) {
  const tag = tags.find(t => t.trim().startsWith("motion:"));
  if (!tag) return;
  const name = tag.trim().slice(7).trim();
  const panel  = document.getElementById("motion-panel");
  const imgEl  = document.getElementById("motion-img");
  const charPortrait = document.getElementById("char-portrait");
  if (!name || name === "none") {
    panel.classList.remove("visible");
    panel.setAttribute("aria-hidden", "true");
    charPortrait.style.display = "";
    return;
  }
  // Forcer reload du GIF en ajoutant un timestamp si c'est le même fichier
  const src = `assets/images/motion/${name}_preview_smooth.gif`;
  if (imgEl.dataset.current !== src) {
    imgEl.src = src;
    imgEl.dataset.current = src;
  }
  panel.classList.add("visible");
  panel.setAttribute("aria-hidden", "false");
  charPortrait.style.display = "none";
}

// ---- Background de scène ----
function handleBgTag(tags) {
  const tag = tags.find(t => t.trim().startsWith("bg:"));
  if (!tag) return;
  const name = tag.trim().slice(3).trim();
  if (!name || name === "none") { setBackground(null); return; }

  // Scène CSS nommée → appliquer directement
  if (CSS_SCENES.has(name)) {
    applyCSSScene(name);
    return;
  }

  // Sinon charger comme image
  const base = `assets/images/background/${name}`;
  const img = new Image();
  img.onload  = () => setBackground(img.src);
  img.onerror = () => {
    const img2 = new Image();
    img2.onload  = () => setBackground(img2.src);
    img2.onerror = () => applyCSSScene("club_hub"); // fallback
    img2.src = `${base}.jpg`;
  };
  img.src = `${base}.png`;
}

function applyCSSScene(name) {
  const scene = document.getElementById("scene-area");
  const newClass = `scene-${name}`;
  if (scene.classList.contains(newClass)) return;
  const old = scene.querySelector(".scene-bg");
  if (old) {
    old.classList.remove("scene-bg-visible");
    setTimeout(() => { if (old.parentNode) old.parentNode.removeChild(old); }, 600);
  }
  scene.classList.remove("scene-hexapolis", "scene-terminal", "scene-club_hub");
  scene.classList.add(newClass);
}

function setBackground(src) {
  const scene = document.getElementById("scene-area");
  // Retirer la classe CSS de scène si active
  scene.classList.remove("scene-hexapolis", "scene-terminal", "scene-club_hub");
  const old = scene.querySelector(".scene-bg");
  if (!src) {
    if (old) {
      old.classList.remove("scene-bg-visible");
      setTimeout(() => { if (old.parentNode) old.parentNode.removeChild(old); }, 600);
    }
    return;
  }
  const layer = document.createElement("div");
  layer.className = "scene-bg";
  layer.style.backgroundImage = "url('" + src.replace(/'/g, "%27") + "')";
  scene.insertBefore(layer, scene.firstChild);
  void layer.offsetWidth;
  layer.classList.add("scene-bg-visible");
  if (old) {
    setTimeout(() => { if (old.parentNode) old.parentNode.removeChild(old); }, 600);
  }
}

// ---- Voiceover ----
function playVoiceover(tags) {
  const tag = tags.find(t => t.startsWith("vo:"));
  if (!tag) return;
  const file = tag.slice(3).trim();
  voicePlayer.pause();
  voicePlayer.src = `assets/audio/${file}.m4a`;
  voicePlayer.volume = Math.min(1, AUDIO.master * AUDIO.sfx);
  voicePlayer.play().catch(() => {});
}

// ---- Musique de fond ----
function handleMusicTag(tags) {
  const tag = tags.find(t => t.startsWith("music:"));
  if (!tag) return;
  const track = tag.slice(6).trim();
  if (track === "stop" || track === "fade") { fadeOutMusic(); return; }
  playMusic(track);
}

function playMusic(track) {
  if (currentMusicTrack === track) return;
  currentMusicTrack = track;
  musicPlayer.pause();
  musicPlayer.currentTime = 0;
  musicPlayer.volume = Math.min(1, AUDIO.master * AUDIO.music);
  // Essayer les formats dans l'ordre : mp3, ogg, m4a
  const exts = ["mp3", "ogg", "m4a"];
  function tryNext(i) {
    if (i >= exts.length) return;
    const src = `assets/audio/music/${track}.${exts[i]}`;
    musicPlayer.src = src;
    musicPlayer.load();
    musicPlayer.play().then(() => {
      updateMusicIndicator(track);
    }).catch(() => tryNext(i + 1));
  }
  tryNext(0);
}

// ---- SFX tags + ligne ----
function handleSfxTag(tags) {
  const tag = tags.find(t => t.startsWith("sfx:"));
  if (!tag) return;
  playSfx(tag.slice(4).trim());
}

function handleSfxFromLine(line) {
  const lower = line.toLowerCase();
  if (lower.includes("bruit de deco") || lower.includes("bruit de déco")) {
    playSfx("disconnect");
  } else if (lower.includes("bruit de connexion")) {
    playSfx("connect");
  } else if (lower === "*bruit*" || lower.includes("parasitage audio")) {
    playSfx("static");
  }
}

function fadeOutMusic() {
  const step = Math.max(musicPlayer.volume / 20, 0.01);
  const fade = setInterval(() => {
    if (musicPlayer.volume > step) {
      musicPlayer.volume = Math.max(0, musicPlayer.volume - step);
    } else {
      musicPlayer.pause();
      musicPlayer.volume = Math.min(1, AUDIO.master * AUDIO.music);
      currentMusicTrack = null;
      clearInterval(fade);
    }
  }, 50);
  updateMusicIndicator(null);
}

function updateMusicIndicator(track) {
  const indicator = document.getElementById("music-indicator");
  const nameEl    = document.getElementById("music-track-name");
  if (track) {
    nameEl.textContent = track.replace(/_/g, " ");
    indicator.classList.add("visible");
  } else {
    indicator.classList.remove("visible");
  }
}

// ---- Confiance ----
function checkAchievementTriggers(line, tags) {
  if (!story || currentEpisodeFile !== "story.json") return;
  const lower = line.toLowerCase();
  const vars  = story.variablesState;

  // ── Retrouvailles ──
  if (lower.includes("bordel, j'y crois pas") && lower.includes("c'est vraiment toi")) {
    unlockAchievement("cass_reunion");
  }
  if (lower.includes("donc cass l'a vraiment laissé rentrer")) {
    unlockAchievement("ivy_deal");
  }
  if (lower.includes("cassandra orson, me dis pas")) {
    unlockAchievement("nox_survived");
  }

  // ── Rencontres ──
  if (lower.includes("attend il est vraiment la")) {
    unlockAchievement("loam_met");
  }
  if (lower.includes("aaah voilà, j'me disais aussi que ça sentait")) {
    unlockAchievement("seth_met");
  }
  if (lower.includes("qu'est-ce que ce connard fait ici")) {
    unlockAchievement("ridge_met");
  }

  if (lower.includes("je suis même presque certain que tu me dois")) {
    unlockAchievement("seth_debt");
  }

  // ── Spéciaux ──
  if (lower.includes("n'a pas passé le captcha")) {
    unlockAchievement("secret_ending");
  }
}

function checkConfidenceEffects() {
  if (!story) return;
  const state = story.variablesState;
  for (const [charCls, varName] of Object.entries(CONF_VARS)) {
    const val = state[varName];
    if (val === null || val === undefined) continue;
    const prev = prevConf[charCls];
    if (prev !== undefined && val !== prev) {
      triggerConfFlash(charCls, val - prev);
    }
    prevConf[charCls] = val;
  }
  updateConfHud();
  for (const [side, cls] of Object.entries(portraitSlots)) {
    if (cls) {
      const slotEl = document.getElementById(`portrait-${side}`);
      if (slotEl) applyPortraitConf(cls, slotEl);
    }
  }
}

function getConfStatusLabel(val) {
  if (val >= 30) return { text: "CONFIANT(E)", color: "#4ade80" };
  if (val >= 15) return { text: "FAVORABLE",   color: "#a3e635" };
  if (val >= 0)  return { text: "NEUTRE",       color: "#94a3b8" };
  if (val >= -15) return { text: "MÉFIANT(E)",  color: "#fb923c" };
  return { text: "HOSTILE", color: "#ff4444" };
}

function showRelationshipRecap(parent) {
  const recap = document.createElement("div");
  recap.className = "relation-recap";

  const title = document.createElement("div");
  title.className = "relation-recap-title";
  title.textContent = "━━ BILAN RELATIONNEL ━━";
  recap.appendChild(title);

  const chars = [
    { varName: "CASS_CONF",  label: "CASS",  color: "#7b6fff" },
    { varName: "LOAM_CONF",  label: "LOAM",  color: "#38bdf8" },
    { varName: "IVY_CONF",   label: "IVY",   color: "#ff6fb0" },
    { varName: "SETH_CONF",  label: "SETH",  color: "#fb923c" },
    { varName: "RIDGE_CONF", label: "RIDGE", color: "#a3e635" },
    { varName: "NOX_CONF",   label: "NOX",   color: "#e879f9" },
  ];

  chars.forEach(ch => {
    const val    = story.variablesState[ch.varName] ?? 0;
    const isNeg  = val < 0;
    const status = getConfStatusLabel(val);

    const row = document.createElement("div");
    row.className = "relation-row";

    const nameEl = document.createElement("span");
    nameEl.className = "relation-name";
    nameEl.textContent = ch.label;
    nameEl.style.color = ch.color;

    const barBg = document.createElement("div");
    barBg.className = "relation-bar-bg";

    const fill = document.createElement("div");
    fill.className = "relation-bar-fill";
    fill.style.width = `${Math.min(100, Math.abs(val) * 3.33)}%`;
    fill.style.background = isNeg ? "#ff4444" : ch.color;

    const valEl = document.createElement("span");
    valEl.className = "relation-val";
    valEl.textContent = (val >= 0 ? "+" : "") + val;
    valEl.style.color = isNeg ? "#ff4444" : ch.color;

    const statusEl = document.createElement("span");
    statusEl.className = "relation-status";
    statusEl.textContent = status.text;
    statusEl.style.color = isNeg ? "#ff4444" : status.color;

    barBg.appendChild(fill);
    row.appendChild(nameEl);
    row.appendChild(barBg);
    row.appendChild(valEl);
    row.appendChild(statusEl);
    recap.appendChild(row);
  });

  // Bouton arbre des décisions
  const treeBtn = document.createElement("button");
  treeBtn.className = "tree-btn";
  treeBtn.textContent = "→ VOIR L'ARBRE DES DÉCISIONS";
  treeBtn.addEventListener("click", () => {
    if (typeof showChoiceTree === "function") showChoiceTree();
  });
  recap.appendChild(treeBtn);

  parent.appendChild(recap);
}

function updateConfHud() {
  const hud = document.getElementById("conf-hud");
  while (hud.firstChild) hud.removeChild(hud.firstChild);

  let hasAny = false;
  for (const [charCls, varName] of Object.entries(CONF_VARS)) {
    const val = story ? story.variablesState[varName] : null;
    if (val === null || val === undefined) continue;
    hasAny = true;

    const item = document.createElement("div");
    item.className = "conf-item";

    const label = document.createElement("span");
    label.className = "conf-label";
    label.textContent = CONF_LABELS[charCls];
    label.style.color = CONF_COLORS[charCls];

    const barBg = document.createElement("div");
    barBg.className = "conf-bar-bg";

    const isNegative = val < 0;
    const fillWidth  = Math.min(100, Math.abs(val) * 10);
    const fillColor  = isNegative ? "#ff4444" : CONF_COLORS[charCls];

    const fill = document.createElement("div");
    fill.className = "conf-bar-fill";
    fill.style.width = `${fillWidth}%`;
    fill.style.background = fillColor;
    fill.style.boxShadow = `0 0 6px ${fillColor}`;

    const valEl = document.createElement("span");
    valEl.className = "conf-val";
    valEl.style.color = isNegative ? "#ff4444" : "";
    valEl.textContent = val;

    barBg.appendChild(fill);
    item.appendChild(label);
    item.appendChild(barBg);
    item.appendChild(valEl);
    hud.appendChild(item);
  }

  hud.style.display = hasAny ? "flex" : "none";
}

function triggerConfFlash(charCls, delta) {
  const flash = document.getElementById("conf-flash");
  const color = delta > 0 ? (CONF_COLORS[charCls] || "#7b6fff") : "#ff4444";
  flash.style.setProperty("--flash-color", color);
  flash.classList.remove("active");
  void flash.offsetWidth;
  flash.classList.add("active");
  showConfDelta(charCls, delta);
}

function showConfDelta(charCls, delta) {
  const hud = document.getElementById("conf-hud");
  const el  = document.createElement("div");
  el.className = `conf-delta ${delta > 0 ? "pos" : "neg"}`;
  el.textContent = `${delta > 0 ? "+" : ""}${delta} ${CONF_LABELS[charCls]}`;
  hud.appendChild(el);
  setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 2000);
}

// ---- Audio ----
function loadAudioSettings() {
  ["master", "music", "sfx"].forEach(key => {
    const saved = localStorage.getItem(`audio_${key}`);
    if (saved !== null) AUDIO[key] = parseFloat(saved);
  });
}

// ---- Settings panel ----
function buildEpisodeList() {
  const list = document.getElementById("episode-list");
  EPISODES.forEach(ep => {
    const row = document.createElement("div");
    row.className = "episode-row";

    const labelEl = document.createElement("span");
    labelEl.className = "episode-label";
    labelEl.textContent = ep.label;

    const btn = document.createElement("button");
    btn.className = "episode-replay-btn";
    btn.textContent = "REJOUER";
    btn.addEventListener("click", () => replayEpisode(ep, true));

    row.appendChild(labelEl);
    row.appendChild(btn);
    list.appendChild(row);
  });
}

function openSettings() {
  const overlay = document.getElementById("settings-overlay");
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
}

function closeSettings() {
  const overlay = document.getElementById("settings-overlay");
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
}

async function replayEpisode(ep, fromMenu = false) {
  const storyEl   = document.getElementById("story-text");
  const choicesEl = document.getElementById("choices-area");
  if (fromMenu) pendingStartKnot = null;
  while (storyEl.firstChild)   storyEl.removeChild(storyEl.firstChild);
  while (choicesEl.firstChild) choicesEl.removeChild(choicesEl.firstChild);
  lineQueue = [];
  isWaiting = false;
  storyEnded = false;
  prevConf  = {};
  currentEmotions = {};
  voicePlayer.pause();
  updatePortrait(null);
  setBackground(null);
  handleMotionTag([]);  // reset motion panel
  document.getElementById("scene-area").classList.remove("scene-hexapolis", "scene-terminal", "scene-club_hub");
  updateConfHud();
  fadeOutMusic();
  closeSettings();
  currentEpisodeFile = ep.file;
  applyCSSScene("hexapolis");
  playMusic(ep.titleMusic || "ambient");
  showTitleScreen(ep);
}

// ============================================================
// SYSTÈME DE SUCCÈS
// ============================================================

const ACHIEVEMENTS = [
  // ── Progression ──
  { id: "first_connection", icon: "🔌", name: "PREMIÈRE CONNEXION",       desc: "Tu es revenu dans le réseau.",                                   pts: 10 },
  { id: "loam_met",         icon: "🌱", name: "L'ENTHOUSIASTE",           desc: "Loam n'a pas attendu deux secondes pour te sauter dessus.",      pts: 10 },
  { id: "seth_met",         icon: "🦊", name: "LE FLAIR",                 desc: "Seth a senti que quelque chose de pourri venait d'arriver.",     pts: 10 },
  { id: "ridge_met",        icon: "🚫", name: "PERSONA NON GRATA",        desc: "Ridge aimerait vraiment que tu t'en ailles.",                   pts: 10 },
  { id: "ep1_complete",     icon: "✅", name: "SYSTEM BOOT COMPLETE",     desc: "Tu as terminé le Chapitre 1.",                                  pts: 50 },
  // ── Relations – bonnes ──
  { id: "cass_reunion",     icon: "⚔️", name: "RETROUVAILLES DIFFICILES", desc: "Cass t'a laissé entrer. Ça ne veut pas dire qu'elle te fait confiance.", pts: 20 },
  { id: "ivy_deal",         icon: "🃏", name: "L'ARNAQUEUSE",             desc: "Tu as rencontré Ivy. Accroche-toi à ton portefeuille.",         pts: 15 },
  { id: "nox_survived",     icon: "🧊", name: "SOUS ZÉRO",               desc: "Nox ne t'a pas banni. Pour l'instant.",                        pts: 15 },
  // ── Relations – mauvaises ──
  { id: "cass_hostile",     icon: "🧱", name: "MAUVAISE IMPRESSION",      desc: "Cass n'est pas convaincue. Du tout.",                          pts: 20 },
  { id: "loam_hurt",        icon: "💔", name: "TROP LOIN",               desc: "Loam t'avait fait confiance...",         pts: 15 },
  { id: "ivy_snubbed",      icon: "💸", name: "ERREUR DE CALCUL",         desc: "Ivy prend note. Elle ne l'oubliera pas.",                      pts: 15 },
  { id: "seth_debt",        icon: "📉", name: "T'ES DANS LE ROUGE",       desc: "Seth t'a rappelé que les dettes ne s'oublient pas.",           pts: 15 },
  { id: "ridge_hostile",    icon: "🔥", name: "PERSONA NON GRATA +1",     desc: "Ridge avait une mauvaise opinion de toi. Tu as réussi à l'empirer.", pts: 15 },
  { id: "nox_hostile",      icon: "☠️", name: "BANNI EN SURSIS",          desc: "Nox te déteste encore plus que prévu. C'est un exploit en soi.", pts: 15 },
  // ── Relations – bonnes ──
  { id: "cass_trust",       icon: "🤝", name: "BRÈCHE DANS LE MUR",       desc: "Cass commence peut-être à te faire confiance. Un peu.",         pts: 25 },
  { id: "ridge_warmer",     icon: "🕊️", name: "DÉGEL PARTIEL",            desc: "Ridge ne te déteste plus complètement. C'est un début.",        pts: 25 },
  { id: "nox_warmer",       icon: "🧊", name: "ZÉRO ABSOLU",              desc: "Nox te supporte. Juste à peine. Ne pousse pas ta chance.",      pts: 25 },
  { id: "silent_type",      icon: "🤐", name: "HOMME DE PEU DE MOTS",    desc: "Tu as choisi le silence trois fois de suite.",                 pts: 25 },
  { id: "secret_ending",    icon: "🤖", name: "N'A PAS PASSÉ LE CAPTCHA", desc: "Nox t'a banni. Nox a eu satisfaction.",                       pts: 30 },
  // ── Complétionnistes ──
  { id: "parole_tenue",     icon: "🔓", name: "PAROLE TENUE",            desc: "Tu as tout mis en œuvre pour regagner la confiance de Cass.",  pts: 35 },
  { id: "ardoise_propre",   icon: "🕊️", name: "ARDOISE PROPRE",          desc: "Personne ne te déteste. C'est déjà une performance.",          pts: 35 },
  { id: "sans_filtre",      icon: "🎙️", name: "SANS FILTRE",             desc: "Tu as répondu à chaque fois. Courageux.",       pts: 20 },
  { id: "l_insupportable",  icon: "💀", name: "L'INSUPPORTABLE",          desc: "Un record : tu t'es aliéné tout le monde en moins d'une heure.", pts: 25 },
  { id: "brise_tout",       icon: "🌪️", name: "BRISE-TOUT",               desc: "Cass, Loam, Ivy et Seth te détestent. Ridge et Nox aussi. Félicitations.", pts: 30 },
  // ── Méta (collection) ──
  { id: "collectionneur",   icon: "📜", name: "COLLECTIONNEUR",          desc: "5 succès débloqués.",                                          pts: 15, meta: true },
  { id: "obsessionnel",     icon: "🔍", name: "OBSESSIONNEL",             desc: "10 succès débloqués. Tu reviendras.",                          pts: 25, meta: true },
  { id: "tout_vu",          icon: "🏅", name: "TOUT VU",                  desc: "Tous les succès non-méta débloqués. Impressionnant.",           pts: 100, meta: true },
];

// Chargement depuis localStorage
let unlockedAchievements = new Set(
  JSON.parse(localStorage.getItem("the_club_achievements") || "[]")
);

let achievementPopupQueue = [];
let achievementPopupRunning = false;

function unlockAchievement(id) {
  if (unlockedAchievements.has(id)) return;
  const ach = ACHIEVEMENTS.find(a => a.id === id);
  if (!ach) return;
  unlockedAchievements.add(id);
  localStorage.setItem("the_club_achievements", JSON.stringify([...unlockedAchievements]));
  buildAchievementList();
  achievementPopupQueue.push(ach);
  if (!achievementPopupRunning) runAchievementPopupQueue();
  // Vérification méta après chaque déblocage
  if (!ach.meta) {
    const nonMeta = ACHIEVEMENTS.filter(a => !a.meta);
    const count   = nonMeta.filter(a => unlockedAchievements.has(a.id)).length;
    if (count >= 5)              unlockAchievement("collectionneur");
    if (count >= 10)             unlockAchievement("obsessionnel");
    if (count === nonMeta.length) unlockAchievement("tout_vu");
  }
}

function runAchievementPopupQueue() {
  if (achievementPopupQueue.length === 0) {
    achievementPopupRunning = false;
    return;
  }
  achievementPopupRunning = true;
  const ach = achievementPopupQueue.shift();
  showAchievementPopup(ach);
}

function showAchievementPopup(ach) {
  const popup = document.getElementById("achievement-popup");
  document.getElementById("achievement-popup-icon").textContent = ach.icon;
  document.getElementById("achievement-popup-name").textContent = ach.name;
  document.getElementById("achievement-popup-desc").textContent = ach.desc;
  document.getElementById("achievement-popup-pts").textContent  = `+${ach.pts}G`;
  popup.setAttribute("aria-hidden", "false");
  popup.classList.add("visible");
  setTimeout(() => {
    popup.classList.remove("visible");
    popup.setAttribute("aria-hidden", "true");
    setTimeout(() => runAchievementPopupQueue(), 400);
  }, 4000);
}

function buildAchievementList() {
  const list = document.getElementById("achievements-list");
  while (list.firstChild) list.removeChild(list.firstChild);
  const total   = ACHIEVEMENTS.length;
  const unlocked = ACHIEVEMENTS.filter(a => unlockedAchievements.has(a.id)).length;
  const pts     = ACHIEVEMENTS.filter(a => unlockedAchievements.has(a.id)).reduce((s, a) => s + a.pts, 0);
  const maxPts  = ACHIEVEMENTS.reduce((s, a) => s + a.pts, 0);
  document.getElementById("achievements-count").textContent =
    `${unlocked}/${total} — ${pts}/${maxPts}G`;

  ACHIEVEMENTS.forEach(ach => {
    const item = document.createElement("div");
    item.className = "achievement-item" + (unlockedAchievements.has(ach.id) ? "" : " locked");

    const icon = document.createElement("div");
    icon.className = "achievement-icon";
    icon.textContent = unlockedAchievements.has(ach.id) ? ach.icon : "🔒";

    const body = document.createElement("div");
    body.className = "achievement-body";

    const name = document.createElement("div");
    name.className = "achievement-name";
    name.textContent = ach.name;

    const desc = document.createElement("div");
    desc.className = "achievement-desc";
    desc.textContent = unlockedAchievements.has(ach.id) ? ach.desc : "???";

    const pts = document.createElement("div");
    pts.className = "achievement-pts";
    pts.textContent = `${ach.pts}G`;

    body.appendChild(name);
    body.appendChild(desc);
    item.appendChild(icon);
    item.appendChild(body);
    item.appendChild(pts);
    list.appendChild(item);
  });
}

function openAchievements() {
  buildAchievementList();
  const overlay = document.getElementById("achievements-overlay");
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
}

function closeAchievements() {
  const overlay = document.getElementById("achievements-overlay");
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
}

// ---- Démarrage ----
window.addEventListener("DOMContentLoaded", init);
