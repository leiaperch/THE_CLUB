// ======================================
// THE CLUB — choiceTree.js
// Arbre des décisions — Horizontal, branches conditionnelles
// ======================================

// Données par point de décision : label, couleur du personnage, effets par choix
const EP1_SCENE_LABELS = [
  {
    label: "CASS — POURQUOI T'ES LÀ ?", color: "#7b6fff",
    choiceEffects: [
      [{ char: "CASS", val: +10 }],
      [],
      [{ char: "CASS", val: -10 }],
    ]
  },
  {
    label: "CASS — TU VEUX QUOI ?", color: "#7b6fff",
    choiceEffects: [
      [{ char: "CASS", val: +15 }],
      [{ char: "CASS", val: +5 }],
      [{ char: "CASS", val: -5 }],
    ]
  },
  {
    label: "CASS — TA RÉPONSE", color: "#7b6fff",
    choiceEffects: [
      [{ char: "CASS", val: +15 }],
      [{ char: "CASS", val: +5 }],
      [{ char: "CASS", val: -5 }],
    ]
  },
  {
    label: "IVY — L'OFFRE", color: "#ff6fb0",
    choiceEffects: [
      [{ char: "IVY", val: +15 }],
      [{ char: "IVY", val: +5 }],
      [{ char: "IVY", val: -15 }, { char: "CASS", val: +5 }],
    ]
  },
  {
    label: "CONNEXION — ACCÈS AU RÉSEAU", color: "#7b6fff",
    choiceEffects: [
      [{ char: "CASS", val: +10 }, { char: "LOAM", val: +10 }],
      [],
      [{ char: "CASS", val: +5 }, { char: "VALE", val: +5 }],
      [{ char: "LOAM", val: +5 }],
    ]
  },
  {
    label: "LOAM — IL VA RESTER ?", color: "#38bdf8",
    choiceEffects: [
      [{ char: "LOAM", val: +10 }],
      [{ char: "LOAM", val: +5 }],
      [{ char: "LOAM", val: -10 }, { char: "CASS", val: -5 }],
    ]
  },
  {
    label: "SETH — LA CONFRONTATION", color: "#fb923c",
    choiceEffects: [
      [{ char: "SETH", val: +10 }],
      [{ char: "SETH", val: +5 }, { char: "CASS", val: +5 }],
      [{ char: "SETH", val: -10 }],
    ]
  },
  {
    label: "RIDGE — QUI T'A AUTORISÉ ?", color: "#a3e635",
    choiceEffects: [
      [{ char: "RIDGE", val: -5 }, { char: "SETH", val: +5 }],
      [{ char: "RIDGE", val: -10 }],
      [{ char: "RIDGE", val: +10 }, { char: "CASS", val: +5 }],
      [{ char: "NND", val: +1 }, { char: "RIDGE", val: -5 }],
    ]
  },
  {
    label: "RIDGE — AVANT NOX", color: "#a3e635",
    choiceEffects: [
      [{ char: "RIDGE", val: +5 }],
      [{ char: "RIDGE", val: +3 }],
      [{ char: "NOX", val: -5 }],
      [{ char: "NND", val: +1 }],
    ]
  },
  {
    label: "NOX — PREMIÈRE IMPRESSION", color: "#e879f9",
    choiceEffects: [
      [{ char: "NOX", val: +5 }],
      [{ char: "NOX", val: +3 }],
      [{ char: "NND", val: +1 }, { char: "NOX", val: -5 }],
    ]
  },
  {
    label: "NOX — LA MISSION", color: "#e879f9",
    choiceEffects: [
      [{ char: "NOX", val: +10 }],
    ]
  },
];

// Branches conditionnelles entre décisions (dialogues déclenchés par conf)
// afterDecision : index de la décision après laquelle la branche s'insère
// getVarValue   : récupère la valeur de la variable au moment de la branche
//   → on utilise varsBefore de la décision SUIVANTE (= état après décision i)
const EP1_CONDITIONAL_BRANCHES = [
  {
    afterDecision: 0,
    charLabel: "CASS",
    color: "#7b6fff",
    getVarValue: () => ep1Decisions[1]?.varsBefore?.CASS_CONF,
    branches: [
      { condition: v => v <= 0, text: "« Oh bordel, tu me fatigues déjà. »" },
      { condition: v => v > 0,  text: "« J'espère que je me trompes sur toi. »" },
    ]
  },
  {
    afterDecision: 1,
    charLabel: "CASS",
    color: "#7b6fff",
    getVarValue: () => ep1Decisions[2]?.varsBefore?.CASS_CONF,
    branches: [
      { condition: v => v > 30, text: "« C'est pas une mauvaise chose. J'imagine. »" },
      { condition: v => v <= 30, text: "« Très bien. » / « Alors sers à quelque chose. »" },
    ]
  },
];

// Données enregistrées pendant la partie
let ep1Decisions = [];
let decisionIdx  = 0;

/**
 * Appelé depuis main.js juste avant ChooseChoiceIndex.
 * Capture les textes + l'état des variables AVANT que le choix soit traité.
 */
function recordDecision(choices, takenIdx) {
  const meta = EP1_SCENE_LABELS[decisionIdx] || {
    label: `DÉCISION ${decisionIdx + 1}`,
    color: "#7b6fff",
  };

  const varsBefore = {};
  const varsToTrack = ['CASS_CONF','LOAM_CONF','IVY_CONF','SETH_CONF',
                       'RIDGE_CONF','NOX_CONF','VALE_CONF','nnd_count','silent_count'];
  for (const v of varsToTrack) {
    try { varsBefore[v] = story.variablesState[v] ?? 0; } catch(e) { varsBefore[v] = 0; }
  }

  ep1Decisions.push({
    label:      meta.label,
    color:      meta.color,
    choices:    choices.slice(),
    takenIdx,
    varsBefore,
  });
  decisionIdx++;
}

/** Remet l'arbre à zéro (appelé au début d'une nouvelle partie). */
function resetChoiceTree() {
  ep1Decisions = [];
  decisionIdx  = 0;
}

// ---- Constructeurs de nœuds ----

/** Connecteur horizontal entre clusters */
function _ctConnector(color) {
  const el = document.createElement("div");
  el.className = "ct-connector";
  if (color) {
    el.style.background = color;
    el.style.boxShadow  = `0 0 4px ${color}55`;
  }
  return el;
}

/**
 * Construit une rangée de choix (arm + box).
 * taken: true = choix pris (en premier, coloré), false = non pris (grisé)
 */
function _ctRow(text, taken, color, effects, isLast) {
  const row = document.createElement("div");
  row.className = "ct-row" + (isLast ? " ct-row--last" : "") + (taken ? " ct-row--taken" : " ct-row--unchosen");

  const arm = document.createElement("div");
  arm.className = "ct-row-arm";
  if (taken) arm.style.background = color;
  row.appendChild(arm);

  const box = document.createElement("div");
  box.className = "ct-row-box";
  if (taken) {
    box.style.borderColor = color;
    box.style.color       = color;
    box.style.background  = color + "14";
  }

  const arrow = document.createElement("span");
  arrow.className   = "ct-row-arrow";
  arrow.textContent = taken ? "▶" : "◦";
  box.appendChild(arrow);

  const txt = document.createElement("span");
  txt.className   = "ct-row-txt";
  txt.textContent = text;
  box.appendChild(txt);

  // Badges uniquement sur le choix pris
  if (taken && effects && effects.length > 0) {
    const bdg = document.createElement("div");
    bdg.className = "ct-badges";
    effects.forEach(ef => {
      const b = document.createElement("span");
      b.className   = "ct-badge badge-" + ef.char.toLowerCase();
      b.textContent = (ef.val > 0 ? "+" : "") + ef.val + " " + ef.char;
      bdg.appendChild(b);
    });
    box.appendChild(bdg);
  }

  row.appendChild(box);
  return row;
}

/** Cluster de décision : épine verticale + bras → choix (pris en tête, autres dessous) */
function _ctCluster(dec, idx) {
  const meta = EP1_SCENE_LABELS[idx];

  const wrap = document.createElement("div");
  wrap.className = "ct-cluster";

  // ── Header ──
  const hdr = document.createElement("div");
  hdr.className = "ct-cluster-hdr";
  const dot = document.createElement("div");
  dot.className = "ct-dot";
  dot.style.background = dec.color;
  dot.style.boxShadow  = `0 0 8px ${dec.color}`;
  const lbl = document.createElement("div");
  lbl.className   = "ct-cluster-lbl";
  lbl.textContent = dec.label;
  lbl.style.color = dec.color;
  hdr.appendChild(dot);
  hdr.appendChild(lbl);
  wrap.appendChild(hdr);

  // ── Body avec épine ──
  const body = document.createElement("div");
  body.className = "ct-cluster-body";
  body.style.borderColor = dec.color + "55";

  // Choix : taken en tête, les autres dessous
  const takenItem   = { text: dec.choices[dec.takenIdx], ci: dec.takenIdx, taken: true };
  const otherItems  = dec.choices
    .map((text, ci) => ({ text, ci, taken: false }))
    .filter(c => c.ci !== dec.takenIdx);
  const sorted = [takenItem, ...otherItems];

  sorted.forEach((item, si) => {
    const effects = meta?.choiceEffects?.[item.ci] ?? [];
    const isLast  = si === sorted.length - 1;
    body.appendChild(_ctRow(item.text, item.taken, dec.color, effects, isLast));
  });

  wrap.appendChild(body);
  return wrap;
}

/** Cluster de réaction conditionnelle (branche dashed) */
function _ctReactionCluster(branchDef) {
  const varVal = branchDef.getVarValue();

  const wrap = document.createElement("div");
  wrap.className = "ct-cluster ct-cluster--reaction";

  // ── Header ──
  const hdr = document.createElement("div");
  hdr.className = "ct-cluster-hdr";
  const dot = document.createElement("div");
  dot.className = "ct-dot ct-dot--small";
  dot.style.background  = "transparent";
  dot.style.border      = `1.5px dashed ${branchDef.color}`;
  dot.style.boxSizing   = "border-box";
  const lbl = document.createElement("div");
  lbl.className   = "ct-cluster-lbl";
  lbl.textContent = "RÉACTION " + branchDef.charLabel;
  lbl.style.color = branchDef.color + "cc";
  hdr.appendChild(dot);
  hdr.appendChild(lbl);
  wrap.appendChild(hdr);

  // ── Body ──
  const body = document.createElement("div");
  body.className = "ct-cluster-body ct-cluster-body--dashed";
  body.style.borderColor = branchDef.color + "44";

  // Branche déclenchée en tête, non-déclenchées dessous
  const triggered   = branchDef.branches.find(b => varVal !== undefined && b.condition(varVal));
  const untriggered = branchDef.branches.filter(b => b !== triggered);
  const sorted = triggered
    ? [{ ...triggered, active: true }, ...untriggered.map(b => ({ ...b, active: false }))]
    : branchDef.branches.map(b => ({ ...b, active: false }));

  sorted.forEach((branch, si) => {
    const isLast = si === sorted.length - 1;
    const row = _ctRow(branch.text, branch.active, branchDef.color, [], isLast);
    body.appendChild(row);
  });

  wrap.appendChild(body);
  return wrap;
}

/** Nœud fin secrète — affiché en grisé ou activé selon nnd_count */
function _ctSecretEndingCluster() {
  const lastDec   = ep1Decisions[ep1Decisions.length - 1];
  const nndCount  = lastDec?.varsBefore?.nnd_count ?? 0;
  const unlocked  = nndCount >= 4;
  const color     = unlocked ? "#a8a8a8" : "#3a3a4a";

  const wrap = document.createElement("div");
  wrap.className = "ct-cluster ct-cluster--secret" + (unlocked ? " ct-cluster--secret-unlocked" : "");

  // ── Header ──
  const hdr = document.createElement("div");
  hdr.className = "ct-cluster-hdr";
  const dot = document.createElement("div");
  dot.className = "ct-dot";
  dot.style.background = unlocked ? "#a8a8a8" : "transparent";
  dot.style.border     = unlocked ? "none" : "1px dashed #3a3a4a";
  dot.style.boxSizing  = "border-box";
  const lbl = document.createElement("div");
  lbl.className   = "ct-cluster-lbl";
  lbl.textContent = unlocked ? "NND — FIN SECRÈTE" : "??? FIN SECRÈTE";
  lbl.style.color = color;
  hdr.appendChild(dot);
  hdr.appendChild(lbl);
  wrap.appendChild(hdr);

  // ── Body ──
  const body = document.createElement("div");
  body.className = "ct-cluster-body";
  body.style.borderColor = color + "66";

  const row = document.createElement("div");
  row.className = "ct-row ct-row--last" + (unlocked ? " ct-row--taken" : " ct-row--unchosen");

  const arm = document.createElement("div");
  arm.className = "ct-row-arm";
  if (unlocked) arm.style.background = color;
  row.appendChild(arm);

  const box = document.createElement("div");
  box.className = "ct-row-box";
  if (unlocked) {
    box.style.borderColor = color;
    box.style.color       = color;
    box.style.background  = color + "14";
  }

  const arrow = document.createElement("span");
  arrow.className   = "ct-row-arrow";
  arrow.textContent = unlocked ? "▶" : "◆";
  box.appendChild(arrow);

  const txt = document.createElement("span");
  txt.className   = "ct-row-txt";
  txt.textContent = unlocked ? "FIN OBTENUE" : `NND ≥ 4 — (${nndCount}/4)`;
  box.appendChild(txt);

  row.appendChild(box);
  body.appendChild(row);
  wrap.appendChild(body);
  return wrap;
}

// ---- Affichage principal ----

function showChoiceTree() {
  const overlay = document.getElementById("choice-tree-overlay");
  const content = document.getElementById("choice-tree-content");
  if (!overlay || !content) return;

  while (content.firstChild) content.removeChild(content.firstChild);

  if (ep1Decisions.length === 0) {
    const empty = document.createElement("div");
    empty.className   = "ct-empty";
    empty.textContent = "Aucune décision enregistrée pour cette session.";
    content.appendChild(empty);
  } else {
    const epTitle = document.createElement("div");
    epTitle.className   = "ct-episode-title";
    epTitle.textContent = "ÉPISODE 1 — CHRONOLOGIE";
    content.appendChild(epTitle);

    const epSub = document.createElement("div");
    epSub.className   = "ct-episode-sub";
    epSub.textContent = `${ep1Decisions.length} DÉCISION${ep1Decisions.length > 1 ? "S" : ""} ENREGISTRÉE${ep1Decisions.length > 1 ? "S" : ""}`;
    content.appendChild(epSub);

    // Timeline horizontale
    const timeline = document.createElement("div");
    timeline.className = "ct-timeline";

    ep1Decisions.forEach((dec, i) => {
      if (i > 0) {
        // Branche conditionnelle entre i-1 et i ?
        const branchDef = EP1_CONDITIONAL_BRANCHES.find(b => b.afterDecision === i - 1);
        if (branchDef) {
          timeline.appendChild(_ctConnector(branchDef.color + "88"));
          timeline.appendChild(_ctReactionCluster(branchDef));
        }
        timeline.appendChild(_ctConnector(dec.color + "88"));
      }
      timeline.appendChild(_ctCluster(dec, i));
    });

    // Fin secrète toujours visible en bout de timeline
    if (ep1Decisions.length > 0) {
      timeline.appendChild(_ctConnector("#3a3a5a"));
      timeline.appendChild(_ctSecretEndingCluster());
    }

    content.appendChild(timeline);
  }

  overlay.classList.add("visible");
}

