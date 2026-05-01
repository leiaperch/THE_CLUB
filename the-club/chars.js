// ======================================
// THE CLUB — chars.js
// Fiches personnages style Until Dawn
// ======================================

// Profils personnages
const CHAR_PROFILES = [
  {
    id:             "cass",
    confVar:        "CASS_CONF",
    romVar:         "CASS_ROM",
    hasRomance:     true,
    metAchievement: null,
    name:           "CASSANDRA ORSON",
    firstName:      "CASS",
    alias:          "cass.or@club.mod",
    age:            "35 ans",
    role:           "Administratrice du Club",
    color:          "#7b6fff",
    sprite:         "assets/images/sprites/cass.png",
    traits:         ["Rationnelle", "Épuisée", "Amère", "Éprise de justice"],
    bio:            "Elle bloque ton accès dès la première seconde. Évidemment. Elle a tenu ce réseau à bout de bras pendant sept ans, pendant que tu t'évaporais. Elle n'a pas oublié, ni votre relation, ni ce que tu as fait.",
    known: [
      "Elle contrôle les accès du Club — c'est le premier verrou que tu as dû franchir.",
      "Elle a maintenu le Club en vie les sept ans de ton absence.",
      "Elle t'a quand même redonné l'accès. Tu ne sais pas encore pourquoi.",
      "C'est ton ancienne partenaire. Vous avez partagé des choses que tu n'as jamais partagées avec personne d'autre.",
    ],
    romanceNote:    "Possible",
    scenes: [
      { title: "Ép.1 — Retour impossible",  img: null, achievementGate: "cass_reunion" },
      { title: "Ép.2 — À venir",            img: null, achievementGate: null },
      { title: "Ép.2 — À venir",            img: null, achievementGate: null },
    ],
    motions: [
      { name: "prologue_betrayal", label: "La trahison" },
    ],
  },
  {
    id:             "loam",
    confVar:        "LOAM_CONF",
    romVar:         null,
    hasRomance:     false,
    metAchievement: "loam_met",
    name:           "LOAM ORSON",
    firstName:      "LOAM",
    alias:          "loam@club",
    age:            null,
    role:           "Membre du Club",
    color:          "#38bdf8",
    sprite:         "assets/images/sprites/loam (2).png",
    traits:         ["Rêveur", "Naïf", "Curieux", "Idéaliste"],
    bio:            "Il t'a reconnu avant même que Cass finisse de tout préparer. Loam croit encore que les bonnes intentions protègent de tout, et que les gens peuvent changer. Il a l'air de penser que tu es un héros tragique qui a fait ce qu'il fallait pour survivre. C'est mignon, mais tu n'es pas sûr que ça t'aide beaucoup.",
    known: [
      "Vous étiez proches avant ton départ. Il t'a reconnu immédiatement.",
      "Ton absence l'a marqué.",
      "Cass l'a adopté il y a quelques années. Il lui est très loyal.",
    ],
    romanceNote:    null,
    scenes: [
      { title: "Ép.1 — Première rencontre", img: null, achievementGate: "loam_met" },
      { title: "Ép.2 — À venir",            img: null, achievementGate: null },
      { title: "Ép.2 — À venir",            img: null, achievementGate: null },
    ],
    motions: [
      { name: "prologue_loam_v2", label: "Souvenirs" },
    ],
  },
  {
    id:             "ivy",
    confVar:        "IVY_CONF",
    romVar:         "IVY_ROM",
    hasRomance:     true,
    metAchievement: "ivy_deal",
    name:           "IVY MARVEN",
    firstName:      "IVY",
    alias:          "ivy.m@club",
    age:            "30 ans",
    role:           "Informatrice — Alliée à ses heures",
    color:          "#ff6fb0",
    sprite:         "assets/images/sprites/ivy.png",
    traits:         ["Solaire", "Insolente", "Séductrice", "Pragmatique"],
    bio:            "Ivy est à la frontière du génie et de l'arnaque — elle-même incapable de dire où l'une commence et où l'autre finit. C'est la seule qui comprenait tes idées, autrefois. Elle a des ressources, des contacts, et elle n'a pas peur de les utiliser pour obtenir ce qu'elle veut.",
    known: [
      "Ses informations sont précieuses, mais elle les vend au plus offrant. Il faut négocier dur pour obtenir ce qu'elle a.",
      "Elle a des contacts dans la police, dans les milieux underground, et même chez Noctis. Elle n'hésite pas à les utiliser pour faire avancer ses pions.",
      "Elle est prête à tout pour survivre, y compris à s'allier avec des gens douteux — comme toi.",
    ],
    romanceNote:    "Possible",
    scenes: [
      { title: "Ép.1 — Le deal",            img: null, achievementGate: "ivy_deal" },
      { title: "Ép.2 — À venir",            img: null, achievementGate: null },
      { title: "Ép.2 — À venir",            img: null, achievementGate: null },
    ],
    motions: [
      { name: "prologue_ivy_v2", label: "Souvenirs" },
    ],
  },
  {
    id:             "seth",
    confVar:        "SETH_CONF",
    romVar:         "SETH_ROM",
    hasRomance:     true,
    metAchievement: "seth_met",
    name:           "SETH",
    firstName:      "SETH",
    alias:          "seth@club",
    age:            "30 ans",
    role:           "Présence non autorisée — Ancienne alliée",
    color:          "#fb923c",
    sprite:         "assets/images/sprites/seth.png",
    traits:         ["Chaotique", "Cynique", "Moqueuse", "Dangereuse"],
    bio:            "Seth s'incruste dans la conversation sans invitation, comme d'hab. Votre relation est un mélange toxique de camaraderie, de rancune, et de dette — et il n'est pas facile de démêler tout ça. Elle t'accuse de bien des choses, mais elle non plus, n'est pas toute blanche.",
    known: [
      "Elle a des comptes à régler avec toi",
      "Elle a un réseau criminel assez conséquent, tu t'en est allègrement servi dans le passé."
    ],
    romanceNote:    "Possible",
    scenes: [
      { title: "Ép.1 — La dette",           img: null, achievementGate: "seth_met" },
      { title: "Ép.2 — À venir",            img: null, achievementGate: null },
      { title: "Ép.2 — À venir",            img: null, achievementGate: null },
    ],
    motions: [
      { name: "prologue_seth", label: "Souvenirs" },
    ],
  },
  {
    id:             "ridge",
    confVar:        "RIDGE_CONF",
    romVar:         null,
    hasRomance:     false,
    metAchievement: "ridge_met",
    name:           "RIDGE TALL",
    firstName:      "RIDGE",
    alias:          "ridge@noctis",
    age:            "37 ans",
    role:           "Travaille pour Noctis — Raisons inconnues",
    color:          "#a3e635",
    sprite:         "assets/images/sprites/ridge.png",
    traits:         ["Loyal", "Sérieux", "Volontaire", "Stratège"],
    bio:            "Ridge était l'agent double du Club chez Noctis. Il a disparu en même temps que toi, et personne n'a jamais su ce qu'il était devenu. Il est réapparu récemment, travaillant ouvertement pour Noctis. Il prétend que c'est pour protéger le Club de l'intérieur, mais personne n'est sûr de pouvoir lui faire confiance.",
    known: [
      "Il travaille pour Noctis. Il te l'a dit directement, sans honte.",
      "Il t'en veux énormément.", ],
    romanceNote:    null,
    scenes: [
      { title: "Ép.1 — Confrontation",      img: null, achievementGate: "ridge_met" },
      { title: "Ép.2 — À venir",            img: null, achievementGate: null },
      { title: "Ép.2 — À venir",            img: null, achievementGate: null },
    ],
    motions: [
      { name: "hex_rooftops", label: "Hexapolis — Toits" },
    ],
  },
  {
    id:             "nox",
    confVar:        "NOX_CONF",
    romVar:         null,
    hasRomance:     false,
    metAchievement: "nox_survived",
    name:           "NOVA KERSH",
    firstName:      "NOX",
    alias:          "nox@club.mod",
    age:            "28 ans",
    role:           "Hackeuse — Surveillance du Club",
    color:          "#e879f9",
    sprite:         "assets/images/sprites/nox.png",
    traits:         ["Obsessionnelle", "Froide", "Maniaque", "Intransigeante"],
    bio:            "Froide et méthodique, elle a été le bras droit de Cass pendant toute la Poussière. C'est la personne la plus compétente du Club, et elle n'a aucune patience pour les erreurs ou les excuses. Elle t'a survécu, mais elle ne te fait pas de cadeau pour autant.",
    known: [
      "Elle te déteste. Au fond elle a ses raisons.",
      "La Poussière l'a rendue encore plus aigrie qu'elle ne l'était déjà. Comme quoi c'est possible" ],
    romanceNote:    null,
    scenes: [
      { title: "Ép.1 — Sous surveillance",  img: null, achievementGate: "nox_survived" },
      { title: "Ép.2 — À venir",            img: null, achievementGate: null },
      { title: "Ép.2 — À venir",            img: null, achievementGate: null },
    ],
    motions: [
      { name: "dust_nox",     label: "La Poussière" },
    ],
  },
];

// ---- Helpers ----
function _getStoryVar(varName) {
  if (typeof story === "undefined" || !story) return 0;
  const v = story.variablesState[varName];
  return (v !== null && v !== undefined) ? v : 0;
}

function _isCharMet(profile) {
  if (!profile.metAchievement) return true;
  if (typeof unlockedAchievements === "undefined") return false;
  return unlockedAchievements.has(profile.metAchievement);
}

function _confLabel(val) {
  if (val >= 30)  return { text: "CONFIANT(E)",  color: "#4ade80" };
  if (val >= 15)  return { text: "FAVORABLE",    color: "#a3e635" };
  if (val >= 0)   return { text: "NEUTRE",        color: "#94a3b8" };
  if (val >= -15) return { text: "MÉFIANT(E)",   color: "#fb923c" };
  return           { text: "HOSTILE",             color: "#ff4444" };
}

function _romLabel(val) {
  if (val >= 20) return { text: "INTÉRÊT MARQUÉ", color: "#ff6fb0" };
  if (val >= 10) return { text: "CURIOSITÉ",       color: "#fb923c" };
  if (val > 0)   return { text: "NEUTRE",           color: "#94a3b8" };
  return          { text: "—",                      color: "#3a3a4a" };
}

// ======================================
// OUVERTURE / FERMETURE
// ======================================
function openCharacters() {
  _renderSelector();
  document.getElementById("chars-overlay").classList.add("visible");
}

function closeCharacters() {
  document.getElementById("chars-overlay").classList.remove("visible");
}

// ======================================
// VUE SÉLECTEUR — grille de portraits
// ======================================
function _renderSelector() {
  const list = document.getElementById("chars-list");
  while (list.firstChild) list.removeChild(list.firstChild);

  const grid = document.createElement("div");
  grid.className = "cc-selector-grid";

  CHAR_PROFILES.forEach(profile => {
    const met = _isCharMet(profile);
    const card = document.createElement("div");
    card.className = "cc-sel-card" + (met ? "" : " cc-sel-card--unknown");
    card.style.setProperty("--char-color", profile.color);

    const img = document.createElement("img");
    img.className = "cc-sel-img";
    img.alt = met ? profile.name : "???";
    if (met) {
      img.src = profile.sprite;
      img.onerror = () => { img.style.display = "none"; };
    } else {
      img.style.display = "none";
    }
    card.appendChild(img);

    if (!met) {
      const unk = document.createElement("div");
      unk.className = "cc-sel-unknown";
      unk.textContent = "?";
      card.appendChild(unk);
    }

    const grad = document.createElement("div");
    grad.className = "cc-sel-gradient";
    card.appendChild(grad);

    const nameEl = document.createElement("div");
    nameEl.className = "cc-sel-name";
    nameEl.textContent = met ? profile.firstName : "???";
    card.appendChild(nameEl);

    if (met) {
      const confVal = _getStoryVar(profile.confVar);
      const lbl = _confLabel(confVal);
      const statusEl = document.createElement("div");
      statusEl.className = "cc-sel-status";
      statusEl.textContent = lbl.text;
      statusEl.style.color = lbl.color;
      card.appendChild(statusEl);

      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", "Dossier de " + profile.name);
      card.addEventListener("click", () => _renderDetail(profile));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") _renderDetail(profile);
      });
    }

    grid.appendChild(card);
  });

  list.appendChild(grid);
}

// ======================================
// VUE DÉTAIL
// ======================================
function _renderDetail(profile) {
  const list = document.getElementById("chars-list");
  while (list.firstChild) list.removeChild(list.firstChild);

  const met = _isCharMet(profile);
  const confVal = met ? _getStoryVar(profile.confVar) : 0;
  const isNeg = confVal < 0;

  const detail = document.createElement("div");
  detail.className = "cc-detail";
  detail.style.setProperty("--char-color", profile.color);

  // Bouton retour
  const back = document.createElement("button");
  back.className = "cc-back-btn";
  back.textContent = "\u2190 PERSONNAGES";
  back.addEventListener("click", _renderSelector);
  detail.appendChild(back);

  // Layout deux colonnes
  const layout = document.createElement("div");
  layout.className = "cc-detail-layout";

  // ---- Colonne gauche : portrait + barres ----
  const leftCol = document.createElement("div");
  leftCol.className = "cc-detail-left";

  const portraitWrap = document.createElement("div");
  portraitWrap.className = "cc-detail-portrait-wrap";

  const pImg = document.createElement("img");
  pImg.className = "cc-detail-portrait";
  pImg.alt = met ? profile.name : "???";
  if (met) {
    pImg.src = profile.sprite;
    pImg.onerror = () => { pImg.style.display = "none"; };
  } else {
    pImg.style.display = "none";
  }
  portraitWrap.appendChild(pImg);

  if (!met) {
    const unk = document.createElement("div");
    unk.className = "cc-detail-portrait-unknown";
    unk.textContent = "?";
    portraitWrap.appendChild(unk);
  }

  const glowEl = document.createElement("div");
  glowEl.className = "cc-detail-portrait-glow";
  if (met) {
    const glowColor = isNeg ? "#ff4444" : profile.color;
    glowEl.style.boxShadow = `inset 0 0 30px ${glowColor}33`;
    glowEl.style.borderColor = glowColor;
  }
  portraitWrap.appendChild(glowEl);
  leftCol.appendChild(portraitWrap);

  // Barres
  const barsWrap = document.createElement("div");
  barsWrap.className = "cc-detail-bars";
  barsWrap.appendChild(_buildBar({
    label:   "CONFIANCE",
    value:   confVal,
    max:     50,
    color:   isNeg ? "#ff4444" : profile.color,
    valText: met ? ((confVal >= 0 ? "+" : "") + confVal) : "???",
    status:  met ? _confLabel(confVal) : null,
    ghost:   !met,
  }));
  if (profile.hasRomance) {
    const romVal = met ? _getStoryVar(profile.romVar) : 0;
    barsWrap.appendChild(_buildBar({
      label:   "ROMANCE",
      value:   romVal,
      max:     30,
      color:   "#ff6fb0",
      valText: met ? ((romVal >= 0 ? "+" : "") + romVal) : "???",
      status:  met ? _romLabel(romVal) : null,
      ghost:   !met,
    }));
  }
  leftCol.appendChild(barsWrap);
  layout.appendChild(leftCol);

  // ---- Colonne droite : infos + galerie ----
  const rightCol = document.createElement("div");
  rightCol.className = "cc-detail-right";

  const nameEl = document.createElement("div");
  nameEl.className = "cc-detail-name";
  nameEl.textContent = met ? profile.name : "IDENTITÉ INCONNUE";
  nameEl.style.color = met ? profile.color : "var(--muted)";
  rightCol.appendChild(nameEl);

  const metaEl = document.createElement("div");
  metaEl.className = "cc-detail-meta";
  if (met && profile.age) {
    const ageSpan = document.createElement("span");
    ageSpan.className = "cc-detail-age";
    ageSpan.textContent = profile.age;
    metaEl.appendChild(ageSpan);
  }
  const aliasSpan = document.createElement("span");
  aliasSpan.className = "cc-detail-alias";
  aliasSpan.textContent = met ? profile.alias : "???@???";
  metaEl.appendChild(aliasSpan);
  rightCol.appendChild(metaEl);

  const roleEl = document.createElement("div");
  roleEl.className = "cc-detail-role";
  roleEl.textContent = met ? profile.role : "STATUT INCONNU";
  rightCol.appendChild(roleEl);

  if (met) {
    const traitsWrap = document.createElement("div");
    traitsWrap.className = "cc-detail-traits";
    profile.traits.forEach(t => {
      const tag = document.createElement("span");
      tag.className = "cc-detail-trait";
      tag.textContent = t;
      traitsWrap.appendChild(tag);
    });
    rightCol.appendChild(traitsWrap);

    const bioEl = document.createElement("div");
    bioEl.className = "cc-detail-bio";
    bioEl.textContent = profile.bio;
    rightCol.appendChild(bioEl);

    // Romance note
    if (profile.hasRomance && profile.romanceNote) {
      const romNoteEl = document.createElement("div");
      romNoteEl.className = "cc-romance-note";
      const romIcon = document.createElement("span");
      romIcon.textContent = "♥ ";
      romIcon.style.color = "#ff6fb0";
      romNoteEl.appendChild(romIcon);
      const romText = document.createElement("span");
      romText.textContent = profile.romanceNote;
      romNoteEl.appendChild(romText);
      rightCol.appendChild(romNoteEl);
    }

    const knownTitle = document.createElement("div");
    knownTitle.className = "cc-section-title";
    knownTitle.textContent = "CE QU\u2019ON SAIT";
    rightCol.appendChild(knownTitle);

    const knownList = document.createElement("ul");
    knownList.className = "cc-known-list";
    profile.known.forEach(k => {
      const li = document.createElement("li");
      li.textContent = k;
      knownList.appendChild(li);
    });
    rightCol.appendChild(knownList);
  } else {
    const bioEl = document.createElement("div");
    bioEl.className = "cc-detail-bio";
    bioEl.textContent = "Aucune donnée disponible. Rencontrez ce personnage pour débloquer son dossier.";
    rightCol.appendChild(bioEl);
  }

  const galleryTitle = document.createElement("div");
  galleryTitle.className = "cc-section-title";
  galleryTitle.textContent = "CINÉMATIQUES";
  rightCol.appendChild(galleryTitle);
  rightCol.appendChild(_buildGallery(profile, met));

  // ---- Section motions comics ----
  if (met && profile.motions && profile.motions.length > 0) {
    const motTitle = document.createElement("div");
    motTitle.className = "cc-section-title";
    motTitle.textContent = "MOTIONS COMICS";
    rightCol.appendChild(motTitle);
    rightCol.appendChild(_buildMotions(profile));
  }

  layout.appendChild(rightCol);
  detail.appendChild(layout);
  list.appendChild(detail);
}

// ======================================
// GALERIE
// ======================================
function _buildGallery(profile, met) {
  const grid = document.createElement("div");
  grid.className = "cc-gallery-grid";

  profile.scenes.forEach(scene => {
    const tile = document.createElement("div");
    tile.className = "cc-gallery-tile";
    tile.style.setProperty("--char-color", profile.color);

    const isFuture = (scene.achievementGate === null);
    const isUnlocked = met && !isFuture
      && typeof unlockedAchievements !== "undefined"
      && unlockedAchievements.has(scene.achievementGate);

    tile.className += isFuture
      ? " cc-gallery-tile--future"
      : (isUnlocked ? " cc-gallery-tile--unlocked" : " cc-gallery-tile--locked");

    if (scene.img && isUnlocked) {
      const img = document.createElement("img");
      img.className = "cc-gallery-img";
      img.src = scene.img;
      img.alt = scene.title;
      img.onerror = () => { img.style.display = "none"; };
      tile.appendChild(img);
    }

    const label = document.createElement("div");
    label.className = "cc-gallery-label";

    const icon = document.createElement("span");
    icon.className = "cc-gallery-icon";
    icon.textContent = isFuture ? "\u25b6\u25b6" : (isUnlocked ? "" : "\uD83D\uDD12");
    label.appendChild(icon);

    const titleEl = document.createElement("span");
    titleEl.className = "cc-gallery-tile-title";
    titleEl.textContent = scene.title;
    label.appendChild(titleEl);

    tile.appendChild(label);
    grid.appendChild(tile);
  });

  return grid;
}

function _buildMotions(profile) {
  const grid = document.createElement("div");
  grid.className = "cc-motions-grid";

  profile.motions.forEach(motion => {
    const tile = document.createElement("div");
    tile.className = "cc-motion-tile";
    tile.style.setProperty("--char-color", profile.color);
    tile.setAttribute("tabindex", "0");
    tile.setAttribute("role", "button");
    tile.setAttribute("aria-label", motion.label);

    const thumb = document.createElement("img");
    thumb.className = "cc-motion-thumb";
    thumb.src = `assets/images/motion/${motion.name}_preview_smooth.gif`;
    thumb.alt = motion.label;
    thumb.onerror = () => { tile.classList.add("cc-motion-tile--broken"); };
    tile.appendChild(thumb);

    const overlay = document.createElement("div");
    overlay.className = "cc-motion-overlay";
    const playIcon = document.createElement("span");
    playIcon.className = "cc-motion-play";
    playIcon.textContent = "▶";
    overlay.appendChild(playIcon);
    tile.appendChild(overlay);

    const labelEl = document.createElement("div");
    labelEl.className = "cc-motion-label";
    labelEl.textContent = motion.label;
    tile.appendChild(labelEl);

    tile.addEventListener("click", () => _openMotionLightbox(motion, profile.color));
    tile.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") _openMotionLightbox(motion, profile.color);
    });

    grid.appendChild(tile);
  });

  return grid;
}

function _openMotionLightbox(motion, color) {
  // Réutiliser ou créer le lightbox
  let lb = document.getElementById("cc-motion-lightbox");
  if (!lb) {
    lb = document.createElement("div");
    lb.id = "cc-motion-lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");

    const lbInner = document.createElement("div");
    lbInner.id = "cc-motion-lightbox-inner";

    const closeBtn = document.createElement("button");
    closeBtn.id = "cc-motion-lightbox-close";
    closeBtn.textContent = "✕";
    closeBtn.setAttribute("aria-label", "Fermer");
    closeBtn.addEventListener("click", () => {
      lb.classList.remove("visible");
      const img = document.getElementById("cc-motion-lightbox-img");
      if (img) img.src = "";
    });

    const lbImg = document.createElement("img");
    lbImg.id = "cc-motion-lightbox-img";
    lbImg.alt = "";

    const lbLabel = document.createElement("div");
    lbLabel.id = "cc-motion-lightbox-label";

    lbInner.appendChild(closeBtn);
    lbInner.appendChild(lbImg);
    lbInner.appendChild(lbLabel);
    lb.appendChild(lbInner);

    lb.addEventListener("click", (e) => {
      if (e.target === lb) {
        lb.classList.remove("visible");
        lbImg.src = "";
      }
    });

    // Attacher au chars-panel pour rester dans la portée
    const panel = document.getElementById("chars-panel");
    if (panel) panel.appendChild(lb);
  }

  const lbImg   = document.getElementById("cc-motion-lightbox-img");
  const lbLabel = document.getElementById("cc-motion-lightbox-label");
  lbImg.src            = `assets/images/motion/${motion.name}_preview_smooth.gif`;
  lbImg.alt            = motion.label;
  lbImg.style.border   = `2px solid ${color}`;
  lbImg.style.boxShadow = `0 0 32px ${color}55`;
  lbLabel.textContent  = motion.label;
  lbLabel.style.color  = color;
  lb.classList.add("visible");
}

function _buildBar({ label, value, max, color, valText, status, ghost }) {
  const wrap = document.createElement("div");
  wrap.className = "cc-bar-row";

  const labelEl = document.createElement("span");
  labelEl.className = "cc-bar-label";
  labelEl.textContent = label;
  wrap.appendChild(labelEl);

  const barBg = document.createElement("div");
  barBg.className = "cc-bar-bg";

  const fill = document.createElement("div");
  fill.className = "cc-bar-fill";
  if (!ghost) {
    fill.style.width = `${Math.min(100, (Math.abs(value) / max) * 100)}%`;
    fill.style.background = color;
    fill.style.boxShadow = `0 0 8px ${color}88`;
  } else {
    fill.style.width = "0%";
  }
  barBg.appendChild(fill);
  wrap.appendChild(barBg);

  const valEl = document.createElement("span");
  valEl.className = "cc-bar-val";
  valEl.textContent = ghost ? "???" : valText;
  if (!ghost) valEl.style.color = color;
  wrap.appendChild(valEl);

  if (status && !ghost) {
    const statusEl = document.createElement("span");
    statusEl.className = "cc-bar-status";
    statusEl.textContent = status.text;
    statusEl.style.color = status.color;
    wrap.appendChild(statusEl);
  }

  return wrap;
}


