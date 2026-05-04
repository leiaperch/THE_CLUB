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

function _ctConnector() {
  const el = document.createElement("div");
  el.className = "ct-connector";
  return el;
}

function _ctDecisionNode(dec, idx) {
  const meta = EP1_SCENE_LABELS[idx];
  const node = document.createElement("div");
  node.className = "ct-node";

  // En-tête
  const header = document.createElement("div");
  header.className = "ct-node-header";
  const dot = document.createElement("div");
  dot.className = "ct-dot";
  dot.style.background = dec.color;
  dot.style.boxShadow  = `0 0 8px ${dec.color}`;
  const labelEl = document.createElement("div");
  labelEl.className = "ct-node-label";
  labelEl.textContent = dec.label;
  labelEl.style.color = dec.color;
  header.appendChild(dot);
  header.appendChild(labelEl);
  node.appendChild(header);

  // Liste des choix
  const list = document.createElement("div");
  list.className = "ct-choices";

  dec.choices.forEach((text, ci) => {
    const isTaken = ci === dec.takenIdx;
    const effects = meta?.choiceEffects?.[ci] ?? [];

    const row = document.createElement("div");
    row.className = "ct-choice" + (isTaken ? " ct-choice--taken" : " ct-choice--untaken");
    if (isTaken) {
      row.style.borderColor = dec.color;
      row.style.color       = dec.color;
      row.style.background  = dec.color + "18";
    }

    const arrow = document.createElement("span");
    arrow.className  = "ct-arrow";
    arrow.textContent = isTaken ? "▶" : "○";
    row.appendChild(arrow);

    const textEl = document.createElement("span");
    textEl.className  = "ct-choice-text";
    textEl.textContent = text;
    row.appendChild(textEl);

    // Badges de stat — uniquement sur le choix pris
    if (isTaken && effects.length > 0) {
      const badgesEl = document.createElement("div");
      badgesEl.className = "ct-badges";
      effects.forEach(ef => {
        const badge = document.createElement("span");
        badge.className  = "ct-badge badge-" + ef.char.toLowerCase();
        badge.textContent = (ef.val > 0 ? "+" : "") + ef.val + " " + ef.char;
        badgesEl.appendChild(badge);
      });
      row.appendChild(badgesEl);
    }

    list.appendChild(row);
  });

  node.appendChild(list);
  return node;
}

function _ctBranchNode(branchDef) {
  const varVal = branchDef.getVarValue();
  const node = document.createElement("div");
  node.className = "ct-branch";

  // En-tête
  const header = document.createElement("div");
  header.className = "ct-branch-header";
  const dot = document.createElement("div");
  dot.className = "ct-dot ct-dot--small";
  dot.style.background = branchDef.color;
  dot.style.boxShadow  = `0 0 5px ${branchDef.color}`;
  const lbl = document.createElement("div");
  lbl.className  = "ct-branch-label";
  lbl.textContent = "RÉACTION " + branchDef.charLabel;
  lbl.style.color = branchDef.color;
  header.appendChild(dot);
  header.appendChild(lbl);
  node.appendChild(header);

  // Lignes de dialogue
  branchDef.branches.forEach(branch => {
    const triggered = varVal !== undefined && branch.condition(varVal);
    const lineEl = document.createElement("div");
    lineEl.className = "ct-branch-line" + (triggered ? " ct-branch-line--active" : " ct-branch-line--hidden");
    if (triggered) {
      lineEl.style.borderColor = branchDef.color;
      lineEl.style.color       = branchDef.color;
    }
    lineEl.textContent = branch.text;
    node.appendChild(lineEl);
  });

  return node;
}

// ---- Affichage principal ----

function showChoiceTree() {
  const overlay = document.getElementById("choice-tree-overlay");
  const content = document.getElementById("choice-tree-content");
  if (!overlay || !content) return;

  while (content.firstChild) content.removeChild(content.firstChild);

  if (ep1Decisions.length === 0) {
    const empty = document.createElement("div");
    empty.className  = "ct-empty";
    empty.textContent = "Aucune décision enregistrée pour cette session.";
    content.appendChild(empty);
  } else {
    const epTitle = document.createElement("div");
    epTitle.className  = "ct-episode-title";
    epTitle.textContent = "ÉPISODE 1 — CHRONOLOGIE";
    content.appendChild(epTitle);

    const epSub = document.createElement("div");
    epSub.className  = "ct-episode-sub";
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
          timeline.appendChild(_ctConnector());
          timeline.appendChild(_ctBranchNode(branchDef));
        }
        timeline.appendChild(_ctConnector());
      }
      timeline.appendChild(_ctDecisionNode(dec, i));
    });

    content.appendChild(timeline);
  }

  overlay.classList.add("visible");
}

