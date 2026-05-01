// ======================================
// THE CLUB — choiceTree.js
// Arbre des décisions style Detroit: Become Human
// ======================================

// Labels pour chaque point de décision de l'épisode 1 (dans l'ordre d'apparition)
const EP1_SCENE_LABELS = [
  { label: "CASS — POURQUOI T'ES LÀ ?",      color: "#7b6fff" },
  { label: "CASS — TU VEUX QUOI ?",           color: "#7b6fff" },
  { label: "CASS — TA RÉPONSE",               color: "#7b6fff" },
  { label: "IVY — L'OFFRE",                   color: "#ff6fb0" },
  { label: "CONNEXION — ACCÈS AU RÉSEAU",     color: "#7b6fff" },
  { label: "LOAM — IL VA RESTER ?",           color: "#38bdf8" },
  { label: "SETH — LA CONFRONTATION",         color: "#fb923c" },
  { label: "RIDGE — QUI T'A AUTORISÉ ?",      color: "#a3e635" },
  { label: "RIDGE — AVANT NOX",               color: "#a3e635" },
  { label: "NOX — PREMIÈRE IMPRESSION",       color: "#f43f5e" },
  { label: "NOX — LA MISSION",                color: "#f43f5e" },
];

// Données enregistrées pendant la partie
let ep1Decisions = [];
let decisionIdx  = 0;

/**
 * Appelé depuis main.js quand le joueur fait un choix.
 * @param {string[]} choices - textes de tous les choix affichés
 * @param {number}   takenIdx - index du choix sélectionné
 */
function recordDecision(choices, takenIdx) {
  const meta = EP1_SCENE_LABELS[decisionIdx] || {
    label: `DÉCISION ${decisionIdx + 1}`,
    color: "#7b6fff",
  };
  ep1Decisions.push({
    label:    meta.label,
    color:    meta.color,
    choices:  choices.slice(),
    takenIdx,
  });
  decisionIdx++;
}

/** Remet l'arbre à zéro (appelé au début d'une nouvelle partie / reprise). */
function resetChoiceTree() {
  ep1Decisions = [];
  decisionIdx  = 0;
}

/** Affiche l'overlay de l'arbre des décisions. */
function showChoiceTree() {
  const overlay = document.getElementById("choice-tree-overlay");
  const content = document.getElementById("choice-tree-content");
  if (!overlay || !content) return;

  // Vider le contenu précédent
  while (content.firstChild) content.removeChild(content.firstChild);

  if (ep1Decisions.length === 0) {
    const empty = document.createElement("div");
    empty.className = "ct-empty";
    empty.textContent = "Aucune décision enregistrée pour cette session.";
    content.appendChild(empty);
  } else {
    // En-tête de l'épisode
    const epTitle = document.createElement("div");
    epTitle.className = "ct-episode-title";
    epTitle.textContent = "CHAPITRE 1 — SYSTEM BOOT COMPLETE";
    content.appendChild(epTitle);

    const epSub = document.createElement("div");
    epSub.className = "ct-episode-sub";
    epSub.textContent = `${ep1Decisions.length} DÉCISION${ep1Decisions.length > 1 ? "S" : ""} ENREGISTRÉE${ep1Decisions.length > 1 ? "S" : ""}`;
    content.appendChild(epSub);

    ep1Decisions.forEach((dec, i) => {
      // Connecteur vertical entre les nœuds
      if (i > 0) {
        const connector = document.createElement("div");
        connector.className = "ct-connector";
        content.appendChild(connector);
      }

      // Nœud de décision
      const node = document.createElement("div");
      node.className = "ct-node";

      // En-tête du nœud : point coloré + label de scène
      const nodeHeader = document.createElement("div");
      nodeHeader.className = "ct-node-header";

      const dot = document.createElement("div");
      dot.className = "ct-dot";
      dot.style.background  = dec.color;
      dot.style.boxShadow   = `0 0 8px ${dec.color}`;

      const nodeLabel = document.createElement("div");
      nodeLabel.className = "ct-node-label";
      nodeLabel.textContent = dec.label;
      nodeLabel.style.color = dec.color;

      nodeHeader.appendChild(dot);
      nodeHeader.appendChild(nodeLabel);
      node.appendChild(nodeHeader);

      // Liste des choix
      const choicesList = document.createElement("div");
      choicesList.className = "ct-choices";

      dec.choices.forEach((text, ci) => {
        const isTaken = ci === dec.takenIdx;
        const choiceEl = document.createElement("div");
        choiceEl.className = "ct-choice" + (isTaken ? " ct-choice--taken" : " ct-choice--untaken");
        if (isTaken) {
          choiceEl.style.borderColor = dec.color;
          choiceEl.style.color       = dec.color;
          choiceEl.style.background  = dec.color + "18";
        }

        const arrow = document.createElement("span");
        arrow.className = "ct-arrow";
        arrow.textContent = isTaken ? "▶" : "○";

        const label = document.createElement("span");
        label.textContent = text;

        choiceEl.appendChild(arrow);
        choiceEl.appendChild(label);
        choicesList.appendChild(choiceEl);
      });

      node.appendChild(choicesList);
      content.appendChild(node);
    });
  }

  overlay.classList.add("visible");
}

// Fermeture de l'overlay — le bouton est câblé dans index.html
