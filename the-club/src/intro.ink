// ============================================================
// THE CLUB - INTRO
// Prologue standalone — avant le Chapitre 1
// ============================================================

VAR silent_count = 0

-> prologue

// ======================================
// PROLOGUE — Point de vue : le MC
// ======================================

=== prologue ===

> INITIALISATION... # bg:hexapolis
> RECUPERATION DES DONNEES MEMOIRE...
> FRAGMENT(S) TROUVE(S) : 1
> CHARGEMENT...

// ---

Hexapolis, la nuit, c'est toujours la même chose. # motion:prologue_hexapolis

Des néons qui se noient dans la pluie. Des drones Noctis qui font leur ronde au-dessus des blocs résidentiels, silencieux et indifférents. Des gamins qui vendent des bricoles volées au coin des ruelles que les caméras ont oublié de surveiller — ou décidé d'ignorer, c'est selon. # motion:hex_noctis

Sept ans que je regardais cette ville de loin. Depuis ma planque, depuis ce studio au bord de la mer qui sentait le câble brûlé et le sel industriel, je m'étais convaincu qu'Hexapolis pouvait très bien s'en sortir sans moi. # motion:prologue_exile

Ce soir, je suis revenu. Pas sûr que la ville s'en soit aperçue. # motion:prologue_train

* [J'avais une raison précise de revenir.]
    Une raison que j'avais retournée dans ma tête pendant les sept heures de trajet en train de nuit. Une raison propre, calibrée, défendable. J'ai mis du temps à comprendre que c'était du foutage de gueule. Les vraies raisons ne ressemblent jamais à ça.
    -> suite_prologue

* [Je suis revenu parce que je n'avais plus le choix.]
    Je croyais que j'avais trouvé un endroit.. Calme. Personne qui te connaît, personne qui te cherche. Mais Noctis étend ses tentacules et les zones mortes rétrécissent. À un moment, il ne reste plus qu'un endroit où tu peux encore exister sans qu'on te demande de te justifier.
    Même si cet endroit te déteste.
    -> suite_prologue

* [Revenir. C'est tout.]
    ~ silent_count++
    ...
    -> suite_prologue

=== suite_prologue ===

Le Club. Ah putain, le club...

Aucun local. Aucune plaque. Aucune existence légale. Noctis aurait adoré qu'on soit assez bêtes pour leur en donner une. Juste un réseau, une poignée de gens qui se retrouvaient là parce qu'il n'y avait nulle part ailleurs où aller. Des inadaptés. Des gens qui avaient décidé, à un moment ou un autre, que le monde tel qu'il tournait n'était pas acceptable. Que les serveurs Noctis pouvaient brûler. Que les flics corrompus méritaient qu'on fasse fuiter leur sale gueule. Que les gamins des blocs méritaient mieux que des drones au-dessus de la tête.

Des idéalistes, en somme.

On avait appelé ça la Poussière. Cela n'avait rien d'une opération officielle, rien dans le Club n'était officiel. Juste un nom qu'on s'était donné pour ce qu'on essayait de faire. Désintégrer le système grain par grain, depuis l'intérieur. Pour tout réduire en poussière, en restant invisibles. # motion:dust_briefing

Ça n'avait pas été invisible du tout. # motion:dust_prebreak

* ["On avait failli réussir."]
    C'est ce que je me dis quand j'suis sous medocs. Quand j'oublie comment ça s'est terminé. Hexapolis était à deux doigts de quelque chose, on le sentait tous. A deux doigts de faire changer le monde.
    -> souvenir

* ["J'ai tout fait foirer."]
    Pas la peine de chercher midi à quatorze heures. J'ai pris une décision. Elle était mauvaise et des gens en ont payé le prix. Mes amis les premiers.
    -> souvenir

* [Passer à la suite.]
    ~ silent_count++
    ...
    -> souvenir

=== souvenir ===

Leurs visages remontent toujours dans le même ordre, je ne sais pas pourquoi.

Loam en premier — enthousiaste jusqu'à l'inconscience, le genre de gamin qui croit encore que les bonnes intentions protègent des balles et des mecs enragés. # motion:prologue_loam_v2
Seth et son instinct de survie affilé comme une lame, toujours à sentir les coups avant qu'ils arrivent. # motion:prologue_seth
Ivy et ses combines à la frontière du génie et de l'arnaque, elle-même incapable de dire où l'un commence et où l'autre finit. # motion:prologue_ivy_v2
Ridge — Ridge qui bossait pour nous et qui bosse pour Noctis maintenant, apparemment. Ça ne m'étonne même pas. # motion:hex_rooftops
Nox, froide et méthodique, celle qui savait exactement ce que chaque décision allait coûter avant qu'on la prenne. # motion:dust_nox

Et Cass. # motion:prologue_betrayal

* [Je me souviens de ce qu'elle m'a dit avant que je parte.]
    Elle m'avait regardé et dit : "Si tu fais ça, c'est terminé." Je l'ai fait quand même.
    -> decision

* [Je me souviens de la nuit où j'ai décidé de trahir le plan.]
    3h47 du matin. J'ai fait un choix, un choix que je pensais bon pour eux, pour moi, pour Hexapolis. On a tous vu comment les choses ont terminé...
    -> decision

* [Je préfère ne pas me souvenir.]
    ~ silent_count++
    -> decision

=== decision ===

Alors pourquoi je reviens ?

Hexapolis n'a pas besoin de moi. Le Club non plus, probablement. Noctis s'est renforcé, les quartiers libres ont rétréci, la Poussière est morte dans l'œuf — et la plupart de ceux qui y ont survécu me considèrent comme responsable de son échec. Avec de bonnes raisons.

* ["Pour réparer ce que j'ai cassé."]
    Arrogant. Naïf. Je sais. Mais rester loin à regarder les drones Noctis coloniser les écrans d'actu, c'était aussi une forme de lâcheté. Et je commence à en avoir assez de moi-même.
    -> fin_intro

* ["Parce qu'il reste quelque chose à finir."]
    La Poussière n'a pas abouti. Ce qu'elle visait, tout ça est encore là. Quelqu'un doit le finir. Ça peut aussi bien être moi.
    -> fin_intro

* ["Je sais pas encore. On verra."]
    La seule réponse qui ne soit pas un mensonge complet au final hein ?
    -> fin_intro

=== fin_intro ===

> ... # motion:none
> CONNEXION EN COURS...
> INITIALISATION DU CHAPITRE UN...

-> END
