<!--
Sync Impact Report
- Version change: 1.1.0 -> 1.1.1
- Principes modifiés: traduction et clarification des principes et des règles
  de gouvernance en français
- Sections ajoutées: aucune
- Sections supprimées: section redondante de langue écrite en anglais
- Follow-up TODOs: aucune
-->

# Constitution Rescue-Grid

## Principes fondamentaux

### I. Livraison orientée mission
Rescue-Grid DOIT prioriser les fonctionnalités qui améliorent directement la réponse aux urgences, la connaissance de la situation ou la sécurité opérationnelle. Toute modification apportée aux couches Arduino, backend ou interface d'administration DOIT correspondre à un besoin concret de secours, et les travaux sans finalité opérationnelle claire ne sont pas admissibles.

### II. Intégrité des contrats entre systèmes
Les firmware Arduino, les services backend et les interfaces d'administration
DOIVENT se traiter comme des systèmes dépendants dotés de contrats explicites.
Les schémas de données, les payloads d'appareils, les événements de statut et
les réponses API DOIVENT être examinés ensemble avant toute modification, et
aucun composant ne DOIT casser silencieusement les hypothèses d'un autre.

### III. Vérification avant validation
Toute modification non triviale DOIT être validée par le test, la compilation
ou la vérification déterministe pertinente avant la fusion. Pour la logique
matérielle, le comportement backend et les flux d'interface, le workflow par
defaut est le suivant : reproduire ou définir le problème, implémenter la
correction et confirmer le comportement affecté avec une preuve.

### IV. Sécurité et moindre privilège
Les données opérationnelles sensibles, l'état des dispositifs et les accès
administratifs DOIVENT être protégés par le principe du moindre privilège. Les
secrets NE DOIVENT PAS être stockés dans les fichiers sources ni dans la
configuration versionnée ; les environnements locaux et de déploiement DOIVENT
utiliser des variables d'environnement ou des sources de configuration
protégées.

### V. Simplicité et maintenabilité
La base de code DOIT privilégier des responsabilités claires, des interfaces
petites, des noms explicites et un couplage caché minimal. La complexité n'est
acceptée que lorsqu'elle répond à un besoin opérationnel validé, et toute
décision non évidente DOIT être documentée pour permettre à la prochaine
équipe de raisonner correctement.

## Normes opérationnelles
Le projet DOIT maintenir une séparation claire entre les responsabilités du
matériel, du serveur et du client. La logique Arduino DOIT rester déterministe
et légère ; les services backend DOIVENT valider, enregistrer et exposer les
données de manière cohérente ; et les interfaces d'administration DOIVENT
présenter un état observable sans inventer d'autorité ni contourner la
validation backend.

La configuration DOIT être explicite et adaptée à l'environnement. Les setups
locaux, les profils de déploiement et les points d'accès réseau DOIVENT être
documentés pour que l'équipe puisse reproduire, diagnostiquer et récupérer des
pannes sans supposition.

## Normes de documentation et de langue
La documentation du projet et les commentaires de code DOIVENT être rédigés en
français, sauf si un artefact spécifique est explicitement désigné pour un autre
public. Les identifiants, les noms de fichiers et les termes de workflow peuvent
rester en anglais uniquement lorsque cela est requis par le runtime, les
bibliothèques standards, les frameworks ou les contrats d'intégration ; dans la
mesure du possible, les noms visibles pour le projet et le texte destiné aux
utilisateurs DOIVENT rester cohérents avec la politique linguistique du projet.

Les spécifications destinées aux utilisateurs, les documents de conception, les
plans et les notes de mise en œuvre DOIVENT rester lisibles, cohérents et
traçables par rapport au besoin opérationnel qu'ils servent. Cela permet de
maintenir une compréhension claire pour l'équipe de secours et pour les futurs
responsables de maintenance.

## Processus de développement
Tout travail DOIT être cadré par un changement opérationnel, un problème ou un
besoin utilisateur précis. Les demandes de fusion DOIVENT décrire le problème,
les systèmes affectés, la vérification effectuée et tout impact sur les contrats
ou le déploiement. Les changements sur les protocoles de communication,
l'authentification, les contrats de données ou le comportement des dispositifs
nécessitent une revue explicite et des conseils de migration.

Les réviseurs DOIVENT confirmer que le changement respecte la constitution du
projet, préserve l'intégrité du flux de secours de bout en bout et n'introduit
pas de couplage non vérifié entre les composants.

## Gouvernance
Cette constitution gouverne tout le travail sur Rescue-Grid. Les amendements
nécessitent une justification documentée, une analyse d'impact et l'approbation
du responsable avant l'adoption de la nouvelle version. Les changements
matériels qui altèrent les principes fondamentaux, les vérifications
obligatoires ou les contrats système DOIVENT inclure des consignes de migration
ou de reprise.

Tous les contributeurs DOIVENT vérifier leur conformité à cette constitution
avant la fusion. Les exceptions pour des besoins opérationnels urgents DOIVENT
être documentées, limitées dans le temps et revues immédiatement après
l'incident afin qu'elles ne deviennent pas une déviation permanente.

**Version**: 1.1.1 | **Ratifié**: 2026-10-06 | **Dernière modification**: 2026-10-06
