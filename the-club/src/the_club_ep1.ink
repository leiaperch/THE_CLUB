// ============================================================
// THE CLUB - ÉPISODE 1
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
// PROLOGUE — Point de vue : le MC
// ======================================

=== prologue ===

> INITIALISATION... # bg:hexapolis
> RECUPERATION DES DONNEES MEMOIRE...
> FRAGMENT(S) TROUVE(S) : 1
> CHARGEMENT...

// ---

Hexapolis, la nuit, c'est toujours la même chose.

Des néons qui se noient dans la pluie. Des drones Noctis qui font leur ronde au-dessus des blocs résidentiels, silencieux et indifférents. Des gamins qui vendent des bricoles volées au coin des ruelles que les caméras ont oublié de surveiller — ou décidé d'ignorer, c'est selon.

Sept ans que je regardais cette ville de loin. Depuis ma planque, depuis ce studio au bord de la mer qui sentait le câble brûlé et le sel industriel, je m'étais convaincu qu'Hexapolis pouvait très bien s'en sortir sans moi.

Ce soir, je suis revenu. Pas sûr que la ville s'en soit aperçue.

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

On avait appelé ça la Poussière. Cela n'avait rien d'une opération officielle, rien dans le Club n'était officiel. Juste un nom qu'on s'était donné pour ce qu'on essayait de faire. Désintégrer le système grain par grain, depuis l'intérieur. Pour tout réduire en poussière, en restant invisibles.

Ça n'avait pas été invisible du tout.

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

Loam en premier — enthousiaste jusqu'à l'inconscience, le genre de gamin qui croit encore que les bonnes intentions protègent des balles et des mecs enragés. Seth et son instinct de survie affilé comme une lame, toujours à sentir les coups avant qu'ils arrivent. Ivy et ses combines à la frontière du génie et de l'arnaque, elle-même incapable de dire où l'un commence et où l'autre finit. Ridge — Ridge qui bossait pour nous et qui bosse pour Noctis maintenant, apparemment. Ça ne m'étonne même pas. Nox, froide et méthodique, celle qui savait exactement ce que chaque décision allait coûter avant qu'on la prenne.

Et Cass.

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
    -> acces

* ["Parce qu'il reste quelque chose à finir."]
    La Poussière n'a pas abouti. Ce qu'elle visait, tout ça est encore là. Quelqu'un doit le finir. Ça peut aussi bien être moi.
    -> acces

* ["Je sais pas encore. On verra."]
    La seule réponse qui ne soit pas un mensonge complet au final hein ?
    -> acces

=== acces ===

J'ouvre le client. # bg:bg_ep1_main_thread

L'adresse, je n'ai jamais eu besoin de la chercher. Elle est gravée quelque part entre les habitudes et la honte, dans cette partie du cerveau qui archive les choses qu'on n'arrive pas tout à fait à oublier.

La connexion met trois secondes à s'établir.

{ silent_count >= 3:
    > ...
    > ...
    > ANALYSE EN COURS...
    > PROFIL ENTRANT : XXXXXX
    -> boot_system
}

> CONNEXION EN COURS...
> Vérification de l'empreinte...
> ...
> ...

-> boot_system

=== boot_system ===

> SYSTEM BOOT COMPLETE # bg:bg_ep1_main_thread # music:terminal
> Unité connectée au réseau Club.net
> ENTREE DANS LA SALLE HUB.CLUB
> Empreinte reconnue : ██████████
> Autorisation forcée… Accordée.

> ACCES BLOQUE PAR : cass.or@club.mod

Je savais que ce serait elle.
Ça ne pouvait être qu'elle.

-> cass_entry

// ============================================================
=== cass_entry ===

cass.or : Bordel, j'y crois pas…. C'est vraiment toi ? # bg:bg_ep1_hub_entry # music:club # emotion:cold_anger
cass.or : T'as une explication ? # emotion:cold_anger
cass.or : Et ne me fais pas perdre mon temps. # emotion:tired_guarded
cass.or : Pourquoi t'es là ?? # emotion:cold_anger

* [Je suis venu voir ce qu'il reste ici. Et le point auquel j'ai foutu la merde.]
    ~ CASS_CONF += 10
    -> cass_react_1
* [Peut-être que j'ai juste cliqué au mauvais endroit.]
    -> cass_react_1
* [Ce que je fais ici me regarde.]
    ~ CASS_CONF -= 10
    -> cass_react_1

// ============================================================
=== cass_react_1 ===

{ CASS_CONF <= 0:
    cass.or : Oh bordel, tu me fatigues déjà. # emotion:tired_guarded
- else:
    cass.or : J'espère que je me trompes sur toi. # emotion:hurt_distrust
}
-> cass_scene_2

// ============================================================
=== cass_scene_2 ===

cass.or : Tu nous as planté à Hexapolis, on t'a pas vu pendant quoi… sept ans ? Et tu reviens comme une fleur ? Tu sais dans quel état tu les as tous laissés ? Ou tu t'en fous ? # emotion:hurt_distrust
cass.or : Ridge ne dit rien. Vale est en vrac. Nox j'vais même pas en parler. # emotion:hurt_distrust
cass.or : Et maintenant, toi. *soupir* # emotion:tired_guarded
cass.or : J'ai pas le temps pour ces conneries… *silence* # emotion:tired_guarded
cass.or : Tu veux quoi ? # emotion:cold_anger

* [Voir. Peut-être vous aider, qui sait. Ou tout du moins réparer ce que je vous ai fait.]
    ~ CASS_CONF += 15
    -> cass_react_2
* [Je déciderai plus tard.]
    ~ CASS_CONF += 5
    -> cass_react_2
* [Je ne veux pas reproduire le passé, Cass, promis.]
    ~ CASS_CONF -= 5
    -> cass_react_2

// ============================================================
=== cass_react_2 ===

{ CASS_CONF > 30:
    cass.or : C'est pas une mauvaise chose. J'imagine. # emotion:tired_guarded
- else:
    cass.or : "Très bien." # emotion:dry_sarcasm
    cass.or : "Alors sers à quelque chose." # emotion:dry_sarcasm
}
-> cass_scene_3

// ============================================================
=== cass_scene_3 ===

cass.or : Au fait, Loam t'a vu le premier, il te sautera dessus à la moindre occasion. Attend toi à un interrogatoire de la part des deux névrosés et probablement à une nouvelle arnaque d'Ivy. # emotion:dry_sarcasm
cass.or : Quitte à ce que tu reviennes, je préfère te surveiller avant que Seth te fasse entrer d'elle-même… # emotion:tired_guarded

* [Je veux plus m'imposer, Cass.]
    ~ CASS_CONF += 15
    -> cass_scene_4
* [Je suis pas là pour m'excuser.]
    ~ CASS_CONF += 5
    -> cass_scene_4
* [Eh beh, je vous ai manqué...]
    ~ CASS_CONF -= 5
    -> cass_scene_4

// ============================================================
=== cass_scene_4 ===

cass.or : Tu n'oublieras pas de dire bonjour, au passage. # emotion:dry_sarcasm
cass.or : D'ailleurs, attention à ce que tu dis quand tu vas voir les autres. # emotion:tired_guarded
cass.or : Personne ici n'a oublié ce que tu as fait. # emotion:cold_anger

// [transition]
-> ivy_intro

// ============================================================
=== ivy_intro ===

ivy.m : Ah ouais…. Donc Cass l'a VRAIMENT laissé rentrer. Je pars deux minutes et le diable est de retour en enfer. J'espère que t'as de meilleures offres à m'faire mon chou, parce que depuis le temps j'ai monté ma gamme… #vo:ivy/ivy_1 # emotion:predatory_amusement # bg:bg_ep1_ivy_corner
cass.or : Bordel, Ivy...
ivy.m : Attend, elle t'a laissé rentrer ou t'as forcé le passage ? Fin quoi qu'il en soit, bienvenue chez les fous mon cher ! J'dois bien avoir un petit cadeau de bienvenue… #vo:ivy/ivy_2 # emotion:dangerous_charm

* [T'as deux minutes. Crache.]
    ~ IVY_CONF += 15
    ivy.m : Ok. J'ai récupéré l'un des modules d'écoute de notre incroyaaable gouvernement. Bien évidemment interdit à la circulation, probablement dangereux et plein de données interdites à nos petits yeux de mortels. Autrement dit, une mine d'or pour notre révolutionnaire en carton… #vo:ivy/ivy_3 # emotion:genuine_interest
    -> ivy_scene_2
* [T'as 20 secondes. Montre.]
    ~ IVY_CONF += 5
    ivy.m : Basiquement un bon gros tas de trucs cryptés que Cass voudrait oublier sur ce qu'on a pu faire tout les deux… #vo:ivy/ivy_4 # emotion:predatory_amusement
    -> ivy_scene_2
* [Je passe. J'ai d'autres priorités.]
    ~ IVY_CONF -= 15
    ~ CASS_CONF += 5
    ivy.m : Voyez vous ça, monsieur se la joue grand seigneur après avoir entraîné la moitié de la région vers l'auto-destruction. Allez-y messire, je vous déroule le tapis rouge… #vo:ivy/ivy_5 # emotion:offended_disdain
    -> ivy_scene_2

// ============================================================
=== ivy_scene_2 ===

cass.or : T'étais pas obligée de te pointer si c'est juste pour ça, Ivy Marven….
ivy.m : Oh mais inutile de me réprimander très chère, je venais simplement retrouver un ami. Je vous laisse à vos retrouvailles, je suis certaine que vous avez des centaaaines de choses à vous dire. #vo:ivy/ivy_6 # emotion:dangerous_charm
ivy.m : *un peu plus bas* Tu sais Cass, tu peux l'ignorer autant que tu veux, tu sais aussi bien que moi que les souvenirs de la Poussière referont surface dès qu'ils sauront qu'il est en vie. *bruit de deco* #vo:ivy/ivy_7 # emotion:genuine_interest
cass.or : Putain...
cass.or : … Bon. J'sais pas ce que tu veux, ni ce que tu fous là, mais de source sûre ça pue. Tout le monde te croyais mort et enterré depuis 7 ans, moi y comprise. *Soupir* Je vais te redonner l'accès… # emotion:hurt_distrust
cass.or : Démerde toi. # emotion:tired_guarded

* [Je suis prêt.]
    ~ CASS_CONF += 10
    ~ LOAM_CONF += 10
    -> main_hub
* [...]
    -> main_hub
* [Trop tard pour reculer.]
    ~ CASS_CONF += 5
    ~ VALE_CONF += 5
    -> main_hub
* [Ne rien dire]
    ~ LOAM_CONF += 5
    ~ nnd_count += 1
    ~ silent_count += 1
    -> main_hub

// ============================================================
=== main_hub ===

// [Connexion transférée vers : #main-club-thread]
> *bruit*
loaam : ATTEND IL EST VRAIMENT LA ? POUR DE VRAI ? # bg:bg_ep1_hub_entry # emotion:excited_bright #vo:loam/Replique1_Loam
cass.or : Loam.
loaam : Oui, oui jme tais. Mais… Fin… Il va… rester cette fois ? # emotion:anxious_hope #vo:loam/Replique2_Loam

* [Bien sûr, Loam.]
    ~ LOAM_CONF += 10
    loaam : Génial ! Tu m'avais tellement manqué ! J'ai plein de trucs à te montrer ! T'as vu que… j'ai un nouvel avatar ! C'est Nox qui m'a aidé à le faire !! # emotion:excited_bright #vo:loam/Replique3_Loam
    -> seth_intro
* [Je sais pas encore. Faut voir si ça vaut le coup.]
    ~ LOAM_CONF += 5
    loaam : J'ai trop parlé hein ? # emotion:anxious_hope #vo:loam/Replique4_Loam
    -> seth_intro
* [Reste en dehors de ça, Loam.]
    ~ LOAM_CONF -= 10
    ~ CASS_CONF -= 5
    loaam : Je… D'accord… # emotion:hurt_withdrawn #vo:loam/Replique5_Loam
    -> seth_intro

// ============================================================
=== seth_intro ===

// [parasitage audio — bruit — quelqu'un s'incruste]
seth : aaah voilà, j'me disais aussi que ça sentait le truc pourri. Mais c'est qu'on a un cadavre parmi nous ! Alors, t'es où depuis le temps ? T'as tracé jusqu'à Ulven, vu que c'était ton plan ? C'est comment la vie à la plage pendant qu'on crève dans la merde ? # emotion:hostile_amusement
cass.or : Seth, tu sais parfaitement que tout ça c'est AUSSI de ta faute. Ne fais pas comme si t'étais clean là dedans.

* [Ravi de te retrouver, mon pote. T'as pas changé.]
    ~ SETH_CONF += 10
    seth : Ahh jrtrouve bien mon vieux pote là ! toujours lbon nez pour nous pondre les pires idées de l'univers. J'espère que tu t'es foutu en sécurité, parce que c'est toujours un sacré bordel ici. # emotion:dry_grin
    -> ridge_intro
* [Non j'suis pas à Ulven.]
    ~ SETH_CONF += 5
    ~ CASS_CONF += 5
    seth : ah bon ? Donc t'étais encore plus près que je pensais… # emotion:serious_warning
    -> ridge_intro
* [J'ai pas de comptes à te rendre, Seth. Notre deal est terminé.]
    ~ SETH_CONF -= 10
    seth : Ah si si, je suis même presque certain que tu me dois encore un paquet de fric, mon pote. T'es sûr de vouloir aller sur ce terrain ? # emotion:hostile_amusement
    -> ridge_intro

// ============================================================
=== ridge_intro ===
~ RIDGE_CONF = -15

cass.or : STOP !
ridge : Cass, c'est quoi ce bordel ? Qu'est-ce que ce connard fait ici ? Il ne t'a pas fait assez de mal ? # emotion:aggressive
cass.or : Ridge je…

* [Je te demande pardon ?]
    ~ RIDGE_CONF -= 5
    ~ SETH_CONF += 5
    ridge : Connard, tu veux que je le répètes ? # emotion:aggressive
    -> ridge_scene_2
* [Viens me dire les choses en face, sale traître.]
    ~ RIDGE_CONF -= 10
    ridge : Oh tu m'as très bien entendu.. Tu sais j'ai encore des contacts avec les flics. Tiens toi à carreaux, ça pourrait mal finir pour toi. # emotion:contempt
    -> ridge_scene_2
* [J'ai changé, Ridge.]
    ~ RIDGE_CONF += 10
    ~ CASS_CONF += 5
    ridge : Et moi jbosse pour Noctis. Me prends pas pour un con. # emotion:bitter_guarded
    -> ridge_scene_2
* [NE RIEN DIRE]
    ~ nnd_count += 1
    ~ silent_count += 1
    ~ RIDGE_CONF -= 5
    -> ridge_scene_2

// ============================================================
=== ridge_scene_2 ===

ridge : J'appelle Nox. Ça serait dommage qu'elle rate la célébration de nos merveilleuses retrouvailles. *Bruit de deco* # emotion:contempt
cass.or : Je t'avais prévenu.

* [Je sais. Je suis prêt.]
    ~ RIDGE_CONF += 5
    cass.or : Tant mieux. Même si je ne te fais pas confiance, Nox n'a pas ma tolérance.
    -> nox_intro
* [Je m'attendais à pire, pour être honnête.]
    ~ RIDGE_CONF += 3
    cass.or : Oh ça arrive, ne t'en fais pas…
    -> nox_intro
* [C'est pas l'autre nerd qui va me faire peur.]
    ~ NOX_CONF -= 5
    cass.or : tsss… tu as conscience que ta présence ici ne tient qu'à moi ?
    -> nox_intro
* [NE RIEN DIRE]
    ~ nnd_count += 1
    ~ silent_count += 1
    cass.or : … Je commence à me demander ce que tu fous ici.
    -> nox_intro

// ============================================================
=== nox_intro ===
~ NOX_CONF = -30

// *Bruit de connexion*
nox : Cassandra Orson, me dis pas que c'est toi qui a ramené ce tocard ? Il nous a trahies une première fois, comme les deux autres, pourquoi tu le laisses venir ? # emotion:restrained_fury #vo:nox/NoxReplique1 # bg:bg_ep1_nox_node
cass.or : Nox, ça fait sept ans, et il peut nous être utile, aussi… peu fiable soit-il.
nox : Tu veux vraiment te la prendre à l'envers une deuxième fois ? # emotion:suspicious #vo:nox/NoxReplique2
cass.or : Il dégage au moindre écart.

* [Surtout faites comme si je n'étais pas là…]
    ~ NOX_CONF += 5
    nox : Crois moi, j'aurais préféré. # emotion:analytical_cold #vo:nox/NoxReplique3
    -> nox_scene_2
* [Ravi de te revoir également, Nox.]
    ~ NOX_CONF += 3
    cass.or : Avec encore plus d'entrain, la prochaine fois…
    nox : Mais tout le plaisir est pour moi voyons… # emotion:disdain #vo:nox/NoxReplique4
    -> nox_scene_2
* [NE RIEN DIRE]
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

nox : bon. Vu que Cass a décidé de te faire à nouveau confiance, ce qui est à mes yeux une bêtise monumentale mais passons, sache que ta première mission pour nous prouver ta bonne volonté, va être de nous dire absolument tout ce que tu sais et tout ce que tu as appris depuis sept ans. # emotion:analytical_cold #vo:nox/NoxReplique7
nox : Et si tu refuses, j'irai les chercher moi-même de toute façon. Je sais où tu te caches, ne l'oublie pas… # emotion:restrained_fury #vo:nox/NoxReplique8

* [Raconter.]
    ~ NOX_CONF += 10
    -> fin_episode

// ============================================================
=== secret_ending ===

// 🏆 FIN SECRÈTE — "N'a pas passé le CAPTCHA"
cass.or : Il n'a rien dit depuis qu'il est arrivé. On essaie de nous faire une blague avec un bot à la con je crois bien. *Soupir* # emotion:dry_sarcasm
nox : Un humour de qualité supérieure… Vire moi ce truc. Et laisse moi ban son IP par pitié. J'ai besoin de cet instant de satisfaction. # emotion:disdain #vo:nox/NoxReplique6

Succès débloqué : "N'a pas passé le CAPTCHA" 🏆
-> END

// ============================================================
=== fin_episode ===

// FIN DE L'ÉPISODE 1
-> END
