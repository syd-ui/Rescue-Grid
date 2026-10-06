# Spécification de la fonctionnalité : Surveillance Rescue-Grid

**Branche de la fonctionnalité** : `001-rescue-grid-monitoring`

**Créé le** : 2026-10-06

**Statut** : Brouillon

**Entrée** : Description utilisateur : "Rescue-Grid est un système de réponse aux urgences dans lequel des dispositifs de terrain connectés envoient des signaux de statut et de battement de cœur à un service central afin que les opérateurs puissent confirmer la disponibilité des équipements, détecter les problèmes rapidement et intervenir efficacement."

## Scénarios utilisateur et tests *(obligatoire)*

### Histoire utilisateur 1 - Surveiller la disponibilité des dispositifs de terrain (Priorité : P1)
Un opérateur a besoin d'une vue unique de tous les dispositifs de terrain actifs et de savoir si chacun est en ligne, en retard ou indisponible. Cela aide les équipes à confirmer que les actifs de secours sont opérationnels avant d'envoyer une intervention ou un groupe sur site.

**Pourquoi cette priorité** : Sans données fiables sur la disponibilité des dispositifs, les opérateurs ne peuvent pas faire confiance au réseau terrain ni planifier des interventions sûres.

**Test indépendant** : Peut être validé entièrement en vérifiant qu'un opérateur peut voir l'état opérationnel actuel de chaque dispositif et identifier tout appareil silencieux.

**Scénarios de validation** :

1. **Étant donné** un ensemble de dispositifs de terrain actifs, **quand** l'opérateur ouvre la vue de surveillance, **alors** chaque dispositif affiche un état courant et l'horodatage de la dernière activité.
2. **Étant donné** qu'un dispositif n'a pas envoyé de battement de cœur dans la fenêtre autorisée, **quand** la vue de surveillance se rafraîchit, **alors** le dispositif est marqué comme indisponible ou à risque et mis en évidence pour l'opérateur.

---

### Histoire utilisateur 2 - Recevoir des avertissements précoces sur une couverture dégradée (Priorité : P2)
Un superviseur a besoin d'un signal clair lorsqu'un dispositif de terrain cesse de communiquer ou signale un état dégradé pour pouvoir enquêter rapidement avant que la situation ne s'aggrave.

**Pourquoi cette priorité** : La détection rapide réduit le temps d'indisponibilité et augmente les chances d'une réponse rapide.

**Test indépendant** : Peut être testé en simulant un battement de cœur manquant et en confirmant qu'une alerte est déclenchée avec des informations exploitables.

**Scénarios de validation** :

1. **Étant donné** qu'un dispositif de terrain n'envoie plus de mises à jour, **quand** la fenêtre attendue du battement de cœur est dépassée, **alors** le système déclenche une alerte pour l'opérateur.
2. **Étant donné** qu'un dispositif s'est rétabli après une interruption, **quand** il recommence à signaler un état normal, **alors** le système efface ou réduit l'alerte pour refléter l'état rétabli.

---

### Histoire utilisateur 3 - Consulter l'historique opérationnel pour la planification de la réponse (Priorité : P3)
Un administrateur a besoin de revoir l'historique récent des statuts pour comprendre les tendances, confirmer ce qui s'est produit lors d'une interruption et prendre de meilleures décisions pour les opérations futures.

**Pourquoi cette priorité** : La visibilité historique aide à l'amélioration continue et permet d'expliquer ou de répondre aux incidents opérationnels.

**Test indépendant** : Peut être validé en vérifiant qu'un opérateur peut consulter les enregistrements récents et identifier des schémas ou des pannes sur le temps.

**Scénarios de validation** :

1. **Étant donné** qu'un dispositif a envoyé plusieurs mises à jour de statut au fil du temps, **quand** un administrateur ouvre l'historique de ce dispositif, **alors** la chronologie montre la progression de l'état sain vers l'état dégradé ou indisponible.
2. **Étant donné** qu'une interruption récente a été résolue, **quand** l'administrateur consulte la période concernée, **alors** l'état rétabli et les horodatages clés sont clairement visibles.

---

### Cas limites

- Que se passe-t-il lorsqu'un dispositif signale une mise à jour de statut en conflit avec le dernier état connu ?
- Comment le système gère-t-il les battements de cœur dupliqués ou répétés ?
- Que se passe-t-il lorsqu'une communication est interrompue pendant une période prolongée ou rétablie après une longue panne ?
- Que se passe-t-il lorsqu'un dispositif est temporairement inactif mais prévu pour reprendre le service plus tard ?

## Exigences *(obligatoire)*

### Exigences fonctionnelles

- **FR-001** : Le système DOIT présenter l'état opérationnel actuel de chaque dispositif de terrain actif aux opérateurs.
- **FR-002** : Le système DOIT enregistrer une mise à jour de statut ou un battement de cœur pour chaque dispositif à un intervalle cohérent et observable.
- **FR-003** : Le système DOIT signaler un dispositif lorsqu'il n'a pas transmis de données dans la fenêtre de temps attendue.
- **FR-004** : Le système DOIT indiquer si un dispositif est sain, dégradé ou indisponible selon le dernier état rapporté.
- **FR-005** : Le système DOIT permettre aux opérateurs de consulter l'historique récent de l'état pour un ou plusieurs dispositifs.
- **FR-006** : Le système DOIT fournir des informations d'alerte claires pour aider les opérateurs à comprendre quel dispositif est concerné et quand le problème a commencé.
- **FR-007** : Le système DOIT permettre à un dispositif rétabli de revenir à un état sain dès qu'il recommence à signaler.
- **FR-008** : Le système DOIT conserver un enregistrement cohérent des changements d'état opérationnel pour analyse et dépannage ultérieur.

### Entités clés *(inclure si la fonctionnalité implique des données)*

- **Dispositif de terrain** : Un actif de secours déployé qui envoie les informations de statut opérationnel et de battement de cœur.
- **Mise à jour de statut** : Un enregistrement horodaté montrant l'état de santé actuel ou l'état de communication du dispositif.
- **Opérateur** : Une personne responsable de la surveillance de l'état des dispositifs et de la prise de décision liée à la sécurité.
- **Alerte** : Une condition indiquant qu'un dispositif peut être dégradé, indisponible ou nécessiter une attention particulière.

## Critères de succès *(obligatoire)*

### Résultats mesurables

- **SC-001** : Les opérateurs peuvent confirmer l'état actuel des dispositifs actifs dans un délai de 30 secondes après l'ouverture de la vue de surveillance.
- **SC-002** : Au moins 95 % des dispositifs actifs affichent un statut actuel sans avoir besoin de contrôle manuel.
- **SC-003** : 90 % des pannes de dispositifs sont détectées avant que les opérateurs ne les découvrent manuellement.
- **SC-004** : Les opérateurs peuvent consulter l'historique récent d'un dispositif et identifier la cause d'une interruption en moins de 10 minutes.
- **SC-005** : Le système soutient la coordination sûre et rapide des opérations de terrain en réduisant l'incertitude sur la disponibilité des dispositifs.

## Hypothèses

- Les dispositifs de terrain actifs sont supposés fonctionner dans des zones de couverture de communication normales.
- Les opérateurs sont responsables de la réponse aux alertes et de la validation de la situation opérationnelle sur le terrain.
- Le modèle de statut distingue les états sain, dégradé et indisponible sans nécessiter de détails techniques spécifiques au dispositif.
- Le système est destiné à la surveillance opérationnelle et ne remplace pas les procédures d'urgence sur site ni les décisions locales.
