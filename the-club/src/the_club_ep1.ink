// ============================================================
// THE CLUB - Ã‰PISODE 1
// ============================================================

// --- Variables ---
VAR CASS_CONF = 0
VAR LOAM_CONF = 0
VAR IVY_CONF = 0
VAR SETH_CONF = 0
VAR RIDGE_CONF = 0
VAR NOX_CONF = 0
VAR VALE_CONF = 0
VAR nnd_count = 0
VAR silent_count = 0
VAR CASS_ROM = 0
VAR IVY_ROM = 0
VAR SETH_ROM = 0

-> prologue

// ======================================
// PROLOGUE â€” Point de vue : le MC
// ======================================

=== prologue ===

> INITIALISATION... # bg:hexapolis
> RECUPERATION DES DONNEES MEMOIRE...
> FRAGMENT(S) TROUVE(S) : 1
> CHARGEMENT...

// ---

Hexapolis, la nuit, c'est toujours la mÃªme chose.

Des nÃ©ons qui se noient dans la pluie. Des drones Noctis qui font leur ronde au-dessus des blocs rÃ©sidentiels, silencieux et indiffÃ©rents. Des gamins qui vendent des bricoles volÃ©es au coin des ruelles que les camÃ©ras ont oubliÃ© de surveiller â€” ou dÃ©cidÃ© d'ignorer, c'est selon.

Sept ans que je regardais cette ville de loin. Depuis ma planque, depuis ce studio au bord de la mer qui sentait le cÃ¢ble brÃ»lÃ© et le sel industriel, je m'Ã©tais convaincu qu'Hexapolis pouvait trÃ¨s bien s'en sortir sans moi.

Ce soir, je suis revenu. Pas sÃ»r que la ville s'en soit aperÃ§ue.

* [J'avais une raison prÃ©cise de revenir.]
    Une raison que j'avais retournÃ©e dans ma tÃªte pendant les sept heures de trajet en train de nuit. Une raison propre, calibrÃ©e, dÃ©fendable. J'ai mis du temps Ã  comprendre que c'Ã©tait du foutage de gueule. Les vraies raisons ne ressemblent jamais Ã  Ã§a.
    -> suite_prologue

* [Je suis revenu parce que je n'avais plus le choix.]
    Je croyais que j'avais trouvÃ© un endroit.. Calme. Personne qui te connaÃ®t, personne qui te cherche. Mais Noctis Ã©tend ses tentacules et les zones mortes rÃ©trÃ©cissent. Ã€ un moment, il ne reste plus qu'un endroit oÃ¹ tu peux encore exister sans qu'on te demande de te justifier.
    MÃªme si cet endroit te dÃ©teste.
    -> suite_prologue

* [Revenir. C'est tout.]
    ~ silent_count++
    ...
    -> suite_prologue

=== suite_prologue ===

Le Club. Ah putain, le club...

Aucun local. Aucune plaque. Aucune existence lÃ©gale. Noctis aurait adorÃ© qu'on soit assez bÃªtes pour leur en donner une. Juste un rÃ©seau, une poignÃ©e de gens qui se retrouvaient lÃ  parce qu'il n'y avait nulle part ailleurs oÃ¹ aller. Des inadaptÃ©s. Des gens qui avaient dÃ©cidÃ©, Ã  un moment ou un autre, que le monde tel qu'il tournait n'Ã©tait pas acceptable. Que les serveurs Noctis pouvaient brÃ»ler. Que les flics corrompus mÃ©ritaient qu'on fasse fuiter leur sale gueule. Que les gamins des blocs mÃ©ritaient mieux que des drones au-dessus de la tÃªte.

Des idÃ©alistes, en somme.

On avait appelÃ© Ã§a la PoussiÃ¨re. Cela n'avait rien d'une opÃ©ration officielle, rien dans le Club n'Ã©tait officiel. Juste un nom qu'on s'Ã©tait donnÃ© pour ce qu'on essayait de faire. DÃ©sintÃ©grer le systÃ¨me grain par grain, depuis l'intÃ©rieur. Pour tout rÃ©duire en poussiÃ¨re, en restant invisibles.

Ã‡a n'avait pas Ã©tÃ© invisible du tout.

* ["On avait failli rÃ©ussir."]
    C'est ce que je me dis quand j'suis sous medocs. Quand j'oublie comment Ã§a s'est terminÃ©. Hexapolis Ã©tait Ã  deux doigts de quelque chose, on le sentait tous. A deux doigts de faire changer le monde.
    -> souvenir

* ["J'ai tout fait foirer."]
    Pas la peine de chercher midi Ã  quatorze heures. J'ai pris une dÃ©cision. Elle Ã©tait mauvaise et des gens en ont payÃ© le prix. Mes amis les premiers.
    -> souvenir

* [Passer Ã  la suite.]
    ~ silent_count++
    ...
    -> souvenir

=== souvenir ===

Leurs visages remontent toujours dans le mÃªme ordre, je ne sais pas pourquoi.

Loam en premier â€” enthousiaste jusqu'Ã  l'inconscience, le genre de gamin qui croit encore que les bonnes intentions protÃ¨gent des balles et des mecs enragÃ©s. Seth et son instinct de survie affilÃ© comme une lame, toujours Ã  sentir les coups avant qu'ils arrivent. Ivy et ses combines Ã  la frontiÃ¨re du gÃ©nie et de l'arnaque, elle-mÃªme incapable de dire oÃ¹ l'un commence et oÃ¹ l'autre finit. Ridge â€” Ridge qui bossait pour nous et qui bosse pour Noctis maintenant, apparemment. Ã‡a ne m'Ã©tonne mÃªme pas. Nox, froide et mÃ©thodique, celle qui savait exactement ce que chaque dÃ©cision allait coÃ»ter avant qu'on la prenne.

Et Cass.

* [Je me souviens de ce qu'elle m'a dit avant que je parte.]
    Elle m'avait regardÃ© et dit : "Si tu fais Ã§a, c'est terminÃ©." Je l'ai fait quand mÃªme.
    -> decision

* [Je me souviens de la nuit oÃ¹ j'ai dÃ©cidÃ© de trahir le plan.]
    3h47 du matin. J'ai fait un choix, un choix que je pensais bon pour eux, pour moi, pour Hexapolis. On a tous vu comment les choses ont terminÃ©...
    -> decision

* [Je prÃ©fÃ¨re ne pas me souvenir.]
    ~ silent_count++
    -> decision

=== decision ===

Alors pourquoi je reviens ?

Hexapolis n'a pas besoin de moi. Le Club non plus, probablement. Noctis s'est renforcÃ©, les quartiers libres ont rÃ©trÃ©ci, la PoussiÃ¨re est morte dans l'Å“uf â€” et la plupart de ceux qui y ont survÃ©cu me considÃ¨rent comme responsable de son Ã©chec. Avec de bonnes raisons.

* ["Pour rÃ©parer ce que j'ai cassÃ©."]
    Arrogant. NaÃ¯f. Je sais. Mais rester loin Ã  regarder les drones Noctis coloniser les Ã©crans d'actu, c'Ã©tait aussi une forme de lÃ¢chetÃ©. Et je commence Ã  en avoir assez de moi-mÃªme.
    -> acces

* ["Parce qu'il reste quelque chose Ã  finir."]
    La PoussiÃ¨re n'a pas abouti. Ce qu'elle visait, tout Ã§a est encore lÃ . Quelqu'un doit le finir. Ã‡a peut aussi bien Ãªtre moi.
    -> acces

* ["Je sais pas encore. On verra."]
    La seule rÃ©ponse qui ne soit pas un mensonge complet au final hein ?
    -> acces

=== acces ===

J'ouvre le client. # bg:bg_ep1_main_thread

L'adresse, je n'ai jamais eu besoin de la chercher. Elle est gravÃ©e quelque part entre les habitudes et la honte, dans cette partie du cerveau qui archive les choses qu'on n'arrive pas tout Ã  fait Ã  oublier.

La connexion met trois secondes Ã  s'Ã©tablir.

{ silent_count >= 3:
    > ...
    > ...
    > ANALYSE EN COURS...
    > PROFIL ENTRANT : XXXXXX
    -> boot_system
}

> CONNEXION EN COURS...
> VÃ©rification de l'empreinte...
> ...
> ...

-> boot_system

=== boot_system ===

> SYSTEM BOOT COMPLETE # bg:bg_ep1_main_thread # music:terminal
> UnitÃ© connectÃ©e au rÃ©seau Club.net
> ENTREE DANS LA SALLE HUB.CLUB
> Empreinte reconnue : â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆ
> Autorisation forcÃ©eâ€¦ AccordÃ©e.

> ACCES BLOQUE PAR : cass.or@club.mod

Je savais que ce serait elle.
Ã‡a ne pouvait Ãªtre qu'elle.

-> cass_entry

// ============================================================
=== cass_entry ===

cass.or : Bordel, j'y crois pasâ€¦. C'est vraiment toi ? # bg:bg_ep1_hub_entry # music:club # emotion:cold_anger
cass.or : T'as une explication ? # emotion:cold_anger
cass.or : Et ne me fais pas perdre mon temps. # emotion:tired_guarded
cass.or : Pourquoi t'es lÃ  ?? # emotion:cold_anger

* [Je suis venu voir ce qu'il reste ici. Et le point auquel j'ai foutu la merde. § CASS:+10 § Aveu dÃ©sarmant]
    ~ CASS_CONF += 10
    -> cass_react_1
* [Peut-Ãªtre que j'ai juste cliquÃ© au mauvais endroit.]
    -> cass_react_1
* [Ce que je fais ici me regarde. § CASS:-10 § Mauvaise entrÃ©e en matiÃ¨re]
    ~ CASS_CONF -= 10
    -> cass_react_1

// ============================================================
=== cass_react_1 ===

{ CASS_CONF <= 0:
    cass.or : Oh bordel, tu me fatigues dÃ©jÃ . # emotion:tired_guarded
- else:
    cass.or : J'espÃ¨re que je me trompes sur toi. # emotion:hurt_distrust
}
-> cass_scene_2

// ============================================================
=== cass_scene_2 ===

cass.or : Tu nous as plantÃ© Ã  Hexapolis, on t'a pas vu pendant quoiâ€¦ sept ans ? Et tu reviens comme une fleur ? Tu sais dans quel Ã©tat tu les as tous laissÃ©s ? Ou tu t'en fous ? # emotion:hurt_distrust
cass.or : Ridge ne dit rien. Vale est en vrac. Nox j'vais mÃªme pas en parler. # emotion:hurt_distrust
cass.or : Et maintenant, toi. *soupir* # emotion:tired_guarded
cass.or : J'ai pas le temps pour ces conneriesâ€¦ *silence* # emotion:tired_guarded
cass.or : Tu veux quoi ? # emotion:cold_anger

* [Voir. Peut-Ãªtre vous aider, qui sait. Ou tout du moins rÃ©parer ce que je vous ai fait. § CASS:+15 § SincÃ©ritÃ©]
    ~ CASS_CONF += 15
    -> cass_react_2
* [Je dÃ©ciderai plus tard. § CASS:+5 § Prudence]
    ~ CASS_CONF += 5
    -> cass_react_2
* [Je ne veux pas reproduire le passÃ©, Cass, promis. § CASS:-5 § Promesse creuse]
    ~ CASS_CONF -= 5
    -> cass_react_2

// ============================================================
=== cass_react_2 ===

{ CASS_CONF > 30:
    cass.or : C'est pas une mauvaise chose. J'imagine. # emotion:tired_guarded
- else:
    cass.or : "TrÃ¨s bien." # emotion:dry_sarcasm
    cass.or : "Alors sers Ã  quelque chose." # emotion:dry_sarcasm
}
-> cass_scene_3

// ============================================================
=== cass_scene_3 ===

cass.or : Au fait, Loam t'a vu le premier, il te sautera dessus Ã  la moindre occasion. Attend toi Ã  un interrogatoire de la part des deux nÃ©vrosÃ©s et probablement Ã  une nouvelle arnaque d'Ivy. # emotion:dry_sarcasm
cass.or : Quitte Ã  ce que tu reviennes, je prÃ©fÃ¨re te surveiller avant que Seth te fasse entrer d'elle-mÃªmeâ€¦ # emotion:tired_guarded

* [Je veux plus m'imposer, Cass. § CASS:+15 § HumilitÃ© convaincante]
    ~ CASS_CONF += 15
    -> cass_scene_4
* [Je suis pas lÃ  pour m'excuser. § CASS:+5 § Direct]
    ~ CASS_CONF += 5
    -> cass_scene_4
* [Eh beh, je vous ai manquÃ©... § CASS:-5 § Ton dÃ©placÃ©]
    ~ CASS_CONF -= 5
    -> cass_scene_4

// ============================================================
=== cass_scene_4 ===

cass.or : Tu n'oublieras pas de dire bonjour, au passage. # emotion:dry_sarcasm
cass.or : D'ailleurs, attention Ã  ce que tu dis quand tu vas voir les autres. # emotion:tired_guarded
cass.or : Personne ici n'a oubliÃ© ce que tu as fait. # emotion:cold_anger

// [transition]
-> ivy_intro

// ============================================================
=== ivy_intro ===

ivy.m : Ah ouaisâ€¦. Donc Cass l'a VRAIMENT laissÃ© rentrer. Je pars deux minutes et le diable est de retour en enfer. J'espÃ¨re que t'as de meilleures offres Ã  m'faire mon chou, parce que depuis le temps j'ai montÃ© ma gammeâ€¦ #vo:ivy/ivy_1 # emotion:predatory_amusement # bg:bg_ep1_ivy_corner
cass.or : Bordel, Ivy...
ivy.m : Attend, elle t'a laissÃ© rentrer ou t'as forcÃ© le passage ? Fin quoi qu'il en soit, bienvenue chez les fous mon cher ! J'dois bien avoir un petit cadeau de bienvenueâ€¦ #vo:ivy/ivy_2 # emotion:dangerous_charm

* [T'as deux minutes. Crache. § IVY:+15 § Ivy apprÃ©cie l'efficacitÃ©]
    ~ IVY_CONF += 15
    ivy.m : Ok. J'ai rÃ©cupÃ©rÃ© l'un des modules d'Ã©coute de notre incroyaaable gouvernement. Bien Ã©videmment interdit Ã  la circulation, probablement dangereux et plein de donnÃ©es interdites Ã  nos petits yeux de mortels. Autrement dit, une mine d'or pour notre rÃ©volutionnaire en cartonâ€¦ #vo:ivy/ivy_3 # emotion:genuine_interest
    -> ivy_scene_2
* [T'as 20 secondes. Montre. § IVY:+5 § IntriguÃ©]
    ~ IVY_CONF += 5
    ivy.m : Basiquement un bon gros tas de trucs cryptÃ©s que Cass voudrait oublier sur ce qu'on a pu faire tout les deuxâ€¦ #vo:ivy/ivy_4 # emotion:predatory_amusement
    -> ivy_scene_2
* [Je passe. J'ai d'autres prioritÃ©s. § IVY:-15 § CASS:+5 § Ivy s'en souviendra]
    ~ IVY_CONF -= 15
    ~ CASS_CONF += 5
    ivy.m : Voyez vous Ã§a, monsieur se la joue grand seigneur aprÃ¨s avoir entraÃ®nÃ© la moitiÃ© de la rÃ©gion vers l'auto-destruction. Allez-y messire, je vous dÃ©roule le tapis rougeâ€¦ #vo:ivy/ivy_5 # emotion:offended_disdain
    -> ivy_scene_2

// ============================================================
=== ivy_scene_2 ===

cass.or : T'Ã©tais pas obligÃ©e de te pointer si c'est juste pour Ã§a, Ivy Marvenâ€¦.
ivy.m : Oh mais inutile de me rÃ©primander trÃ¨s chÃ¨re, je venais simplement retrouver un ami. Je vous laisse Ã  vos retrouvailles, je suis certaine que vous avez des centaaaines de choses Ã  vous dire. #vo:ivy/ivy_6 # emotion:dangerous_charm
ivy.m : *un peu plus bas* Tu sais Cass, tu peux l'ignorer autant que tu veux, tu sais aussi bien que moi que les souvenirs de la PoussiÃ¨re referont surface dÃ¨s qu'ils sauront qu'il est en vie. *bruit de deco* #vo:ivy/ivy_7 # emotion:genuine_interest
cass.or : Putain...
cass.or : â€¦ Bon. J'sais pas ce que tu veux, ni ce que tu fous lÃ , mais de source sÃ»re Ã§a pue. Tout le monde te croyais mort et enterrÃ© depuis 7 ans, moi y comprise. *Soupir* Je vais te redonner l'accÃ¨sâ€¦ # emotion:hurt_distrust
cass.or : DÃ©merde toi. # emotion:tired_guarded

* [Je suis prÃªt. § CASS:+10 § LOAM:+10 § Bonne posture]
    ~ CASS_CONF += 10
    ~ LOAM_CONF += 10
    -> main_hub
* [...]
    -> main_hub
* [Trop tard pour reculer. § CASS:+5 § VALE:+5 § Fataliste]
    ~ CASS_CONF += 5
    ~ VALE_CONF += 5
    -> main_hub
* [Ne rien dire § NND:+1 § Silence comptÃ©]
    ~ LOAM_CONF += 5
    ~ nnd_count += 1
    ~ silent_count += 1
    -> main_hub

// ============================================================
=== main_hub ===

// [Connexion transfÃ©rÃ©e vers : #main-club-thread]
> *bruit*
loaam : ATTEND IL EST VRAIMENT LA ? POUR DE VRAI ? # bg:bg_ep1_hub_entry # emotion:excited_bright #vo:loam/Replique1_Loam
cass.or : Loam.
loaam : Oui, oui jme tais. Maisâ€¦ Finâ€¦ Il vaâ€¦ rester cette fois ? # emotion:anxious_hope #vo:loam/Replique2_Loam

* [Bien sÃ»r, Loam. § LOAM:+10 § Loam rassurÃ©]
    ~ LOAM_CONF += 10
    loaam : GÃ©nial ! Tu m'avais tellement manquÃ© ! J'ai plein de trucs Ã  te montrer ! T'as vu queâ€¦ j'ai un nouvel avatar ! C'est Nox qui m'a aidÃ© Ã  le faire !! # emotion:excited_bright #vo:loam/Replique3_Loam
    -> seth_intro
* [Je sais pas encore. Faut voir si Ã§a vaut le coup. § LOAM:+5 § HonnÃªte]
    ~ LOAM_CONF += 5
    loaam : J'ai trop parlÃ© hein ? # emotion:anxious_hope #vo:loam/Replique4_Loam
    -> seth_intro
* [Reste en dehors de Ã§a, Loam. § LOAM:-10 § CASS:-5 § Brutal]
    ~ LOAM_CONF -= 10
    ~ CASS_CONF -= 5
    loaam : Jeâ€¦ D'accordâ€¦ # emotion:hurt_withdrawn #vo:loam/Replique5_Loam
    -> seth_intro

// ============================================================
=== seth_intro ===

// [parasitage audio â€” bruit â€” quelqu'un s'incruste]
seth : aaah voilÃ , j'me disais aussi que Ã§a sentait le truc pourri. Mais c'est qu'on a un cadavre parmi nous ! Alors, t'es oÃ¹ depuis le temps ? T'as tracÃ© jusqu'Ã  Ulven, vu que c'Ã©tait ton plan ? C'est comment la vie Ã  la plage pendant qu'on crÃ¨ve dans la merde ? # emotion:hostile_amusement
cass.or : Seth, tu sais parfaitement que tout Ã§a c'est AUSSI de ta faute. Ne fais pas comme si t'Ã©tais clean lÃ  dedans.

* [Ravi de te retrouver, mon pote. T'as pas changÃ©. § SETH:+10 § Seth flattÃ©]
    ~ SETH_CONF += 10
    seth : Ahh jrtrouve bien mon vieux pote lÃ  ! toujours lbon nez pour nous pondre les pires idÃ©es de l'univers. J'espÃ¨re que tu t'es foutu en sÃ©curitÃ©, parce que c'est toujours un sacrÃ© bordel ici. # emotion:dry_grin
    -> ridge_intro
* [Non j'suis pas Ã  Ulven. § SETH:+5 § CASS:+5 § Info utile]
    ~ SETH_CONF += 5
    ~ CASS_CONF += 5
    seth : ah bon ? Donc t'Ã©tais encore plus prÃ¨s que je pensaisâ€¦ # emotion:serious_warning
    -> ridge_intro
* [J'ai pas de comptes Ã  te rendre, Seth. Notre deal est terminÃ©. § SETH:-10 § Seth hostile]
    ~ SETH_CONF -= 10
    seth : Ah si si, je suis mÃªme presque certain que tu me dois encore un paquet de fric, mon pote. T'es sÃ»r de vouloir aller sur ce terrain ? # emotion:hostile_amusement
    -> ridge_intro

// ============================================================
=== ridge_intro ===
~ RIDGE_CONF = -15

cass.or : STOP !
ridge : Cass, c'est quoi ce bordel ? Qu'est-ce que ce connard fait ici ? Il ne t'a pas fait assez de mal ? # emotion:aggressive
cass.or : Ridge jeâ€¦

* [Je te demande pardon ? § RIDGE:-5 § SETH:+5 § Escalade]
    ~ RIDGE_CONF -= 5
    ~ SETH_CONF += 5
    ridge : Connard, tu veux que je le rÃ©pÃ¨tes ? # emotion:aggressive
    -> ridge_scene_2
* [Viens me dire les choses en face, sale traÃ®tre. § RIDGE:-10 § Ridge renforcÃ©]
    ~ RIDGE_CONF -= 10
    ridge : Oh tu m'as trÃ¨s bien entendu.. Tu sais j'ai encore des contacts avec les flics. Tiens toi Ã  carreaux, Ã§a pourrait mal finir pour toi. # emotion:contempt
    -> ridge_scene_2
* [J'ai changÃ©, Ridge. § RIDGE:+10 § CASS:+5 § DÃ©samorÃ§age]
    ~ RIDGE_CONF += 10
    ~ CASS_CONF += 5
    ridge : Et moi jbosse pour Noctis. Me prends pas pour un con. # emotion:bitter_guarded
    -> ridge_scene_2
* [NE RIEN DIRE § NND:+1 § RIDGE:-5 § Silence hostile]
    ~ nnd_count += 1
    ~ silent_count += 1
    ~ RIDGE_CONF -= 5
    -> ridge_scene_2

// ============================================================
=== ridge_scene_2 ===

ridge : J'appelle Nox. Ã‡a serait dommage qu'elle rate la cÃ©lÃ©bration de nos merveilleuses retrouvailles. *Bruit de deco* # emotion:contempt
cass.or : Je t'avais prÃ©venu.

* [Je sais. Je suis prÃªt. § RIDGE:+5 § DÃ©sescalade]
    ~ RIDGE_CONF += 5
    cass.or : Tant mieux. MÃªme si je ne te fais pas confiance, Nox n'a pas ma tolÃ©rance.
    -> nox_intro
* [Je m'attendais Ã  pire, pour Ãªtre honnÃªte. § RIDGE:+3 § Neutre]
    ~ RIDGE_CONF += 3
    cass.or : Oh Ã§a arrive, ne t'en fais pasâ€¦
    -> nox_intro
* [C'est pas l'autre nerd qui va me faire peur. § NOX:-5 § Arrogance coÃ»teuse]
    ~ NOX_CONF -= 5
    cass.or : tsssâ€¦ tu as conscience que ta prÃ©sence ici ne tient qu'Ã  moi ?
    -> nox_intro
* [NE RIEN DIRE § NND:+1 § Silence comptÃ©]
    ~ nnd_count += 1
    ~ silent_count += 1
    cass.or : â€¦ Je commence Ã  me demander ce que tu fous ici.
    -> nox_intro

// ============================================================
=== nox_intro ===
~ NOX_CONF = -30

// *Bruit de connexion*
nox : Cassandra Orson, me dis pas que c'est toi qui a ramenÃ© ce tocard ? Il nous a trahies une premiÃ¨re fois, comme les deux autres, pourquoi tu le laisses venir ? # emotion:restrained_fury #vo:nox/NoxReplique1 # bg:bg_ep1_nox_node
cass.or : Nox, Ã§a fait sept ans, et il peut nous Ãªtre utile, aussiâ€¦ peu fiable soit-il.
nox : Tu veux vraiment te la prendre Ã  l'envers une deuxiÃ¨me fois ? # emotion:suspicious #vo:nox/NoxReplique2
cass.or : Il dÃ©gage au moindre Ã©cart.

* [Surtout faites comme si je n'Ã©tais pas lÃ â€¦ § NOX:+5 § DiscrÃ©tion]
    ~ NOX_CONF += 5
    nox : Crois moi, j'aurais prÃ©fÃ©rÃ©. # emotion:analytical_cold #vo:nox/NoxReplique3
    -> nox_scene_2
* [Ravi de te revoir Ã©galement, Nox. § NOX:+3 § Politesse distante]
    ~ NOX_CONF += 3
    cass.or : Avec encore plus d'entrain, la prochaine foisâ€¦
    nox : Mais tout le plaisir est pour moi voyonsâ€¦ # emotion:disdain #vo:nox/NoxReplique4
    -> nox_scene_2
* [NE RIEN DIRE § NND:+1 § NOX:-5 § âš  Fin secrÃ¨te possible]
    ~ nnd_count += 1
    ~ silent_count += 1
    ~ NOX_CONF -= 5
    { nnd_count >= 4:
        -> secret_ending
    - else:
        nox : Il est louche, Cass et tu le sais. # emotion:suspicious #vo:nox/NoxReplique5
        -> nox_scene_2
    }

// ============================================================
=== nox_scene_2 ===

nox : bon. Vu que Cass a dÃ©cidÃ© de te faire Ã  nouveau confiance, ce qui est Ã  mes yeux une bÃªtise monumentale mais passons, sache que ta premiÃ¨re mission pour nous prouver ta bonne volontÃ©, va Ãªtre de nous dire absolument tout ce que tu sais et tout ce que tu as appris depuis sept ans. # emotion:analytical_cold #vo:nox/NoxReplique7
nox : Et si tu refuses, j'irai les chercher moi-mÃªme de toute faÃ§on. Je sais oÃ¹ tu te caches, ne l'oublie pasâ€¦ # emotion:restrained_fury #vo:nox/NoxReplique8

* [Raconter. § NOX:+10 § CoopÃ©ration]
    ~ NOX_CONF += 10
    -> fin_episode

// ============================================================
=== secret_ending ===

// ðŸ† FIN SECRÃˆTE â€” "N'a pas passÃ© le CAPTCHA"
cass.or : Il n'a rien dit depuis qu'il est arrivÃ©. On essaie de nous faire une blague avec un bot Ã  la con je crois bien. *Soupir* # emotion:dry_sarcasm
nox : Un humour de qualitÃ© supÃ©rieureâ€¦ Vire moi ce truc. Et laisse moi ban son IP par pitiÃ©. J'ai besoin de cet instant de satisfaction. # emotion:disdain #vo:nox/NoxReplique6

SuccÃ¨s dÃ©bloquÃ© : "N'a pas passÃ© le CAPTCHA" ðŸ†
-> END

// ============================================================
=== fin_episode ===

// FIN DE L'Ã‰PISODE 1
-> END

