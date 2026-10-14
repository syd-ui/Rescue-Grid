<!--
Sync Impact Report
- Version change: 1.1.1 -> 1.1.2
- Principes modifiés: V. Documentation française et conformité des spécifications;
  renforcement de la gouvernance et clarification des exigences opérationnelles
- Sections ajoutées: aucune
- Sections supprimées: aucune
- Déplacements: consolidation des exigences linguistiques et de conformité dans le principe V
- Follow-up TODOs: aucune
-->

# Constitution Rescue-Grid

## Principes fondamentaux

### I. Mission de secours et pertinence opérationnelle
Le système Rescue-Grid DOIT être conçu pour améliorer la disponibilité, la sûreté et la coordination des dispositifs de terrain et des opérateurs. Toute fonctionnalité, modification de protocole, de données ou d'interface DOIT produire un bénéfice direct pour la réponse aux urgences, le maintien de la couverture opérationnelle ou la réduction de l'incertitude. Les efforts sans impact opérationnel démontrable ne sont pas admissibles.

### II. Intégrité des contrats et des données
Les dispositifs Arduino, le backend et l'interface d'administration DOIVENT être traités comme des composants dépendants dotés de contrats explicites. Les payloads, les événements de statut, les seuils de battement de cœur, les alertes et les API DOIVENT être documentés, testés et validés ensemble ; aucun composant ne peut modifier la structure ou le sens d'un échange sans coordination préalable.

### III. Vérification avant validation
Tout changement non trivial DOIT être prouvé par une validation déterministe : test, compilation, simulation, revue de contrat ou vérification de comportement. Aucun changement de logique de surveillance, d'alerte, de données ou de sécurité ne peut être validé sans preuve du comportement attendu dans le contexte du système complet.

### IV. Sécurité, confidentialité et moindre privilège
Les données opérationnelles sensibles, les états des dispositifs et les accès administratifs DOIVENT suivre le principe du moindre privilège. Les secrets ne sont pas stockés dans le code ou la configuration versionnée. Les environnements de test et de production DOIVENT utiliser des variables d'environnement ou des secrets protégés, et tout accès administratif DOIT être justifié et traçable.

### V. Documentation française et conformité des spécifications
Toute documentation, spécification, plan, tâche, commentaire de code et artefact de communication du projet DOIT être rédigé en français. Les documents d'analyse, de conception, les workflows Speckit et les livrables techniques DOIVENT rester cohérents avec le cahier de charge et le cahier des spécifications, et toute divergence explicite DOIT être signalée avant validation. Les termes techniques imposés par l'outillage ou les bibliothèques peuvent rester en anglais uniquement lorsqu'ils sont requis par le runtime, les protocoles ou les contrats d'intégration.

### VI. Simplicité, maintenabilité et traçabilité
La base de code DOIT privilégier des responsabilités claires, des interfaces compactes et des changements traçables. Les décisions de conception complexes DOIVENT être documentées, la logique critique DOIT rester lisible et les évolutions du système DOIVENT maintenir la possibilité de diagnostiquer rapidement les incidents et de rétablir le service sans hypothèses.

## Règles opérationnelles
Le projet DOIT maintenir une séparation claire entre les responsabilités du matériel, du backend et de l'administration. L'Arduino DOIT rester déterministe et léger ; le backend DOIT valider les événements, la persistance et les alertes ; l'interface d'administration DOIT présenter un état observable sans inventer de droits ni contourner les règles du backend.

La configuration DOIT être explicite et reproductible. Les environnements locaux, de test et de production DOIVENT être documentés et alignés avec les seuils opérationnels du projet. Les états des dispositifs, les fenêtres de battement de cœur et les niveaux d'alerte DOIVENT être définis de manière explicite et testable.

## Processus de développement et de revue
Tout travail DOIT être cadré par un besoin opérationnel, un défaut ou une évolution fonctionnelle documentée. Les demandes de modification DOIVENT décrire le problème, les composants affectés, les contrats touchés, les vérifications effectuées et les impacts sur le fonctionnement des dispositifs et des opérateurs. Les changements sur les protocoles de communication, la logique de détection, les alertes, l'historique ou les contraintes de sécurité exigent une revue explicite avant intégration.

Les réviseurs DOIVENT confirmer que le changement respecte la constitution, préserve la disponibilité de secours et n'introduit pas de couplage non vérifié entre les composants. Les exceptions d'urgence DOIVENT être documentées, limitées dans le temps et suivies d'une revue de correction dans les plus brefs délais.

## Gouvernance
Cette constitution gouverne tout le travail sur Rescue-Grid. Les amendements exigent une justification documentée, une analyse d'impact, la confirmation de conformité aux exigences du cahier de charge et du cahier des spécifications, et l'approbation du responsable avant l'adoption de la nouvelle version. Les changements qui modifient les principes fondamentaux, les seuils de surveillance, les règles de sécurité ou les contrats d'échange entre composants DOIVENT inclure un plan de migration ou de reprise.

Les contributeurs DOIVENT vérifier leur conformité à cette constitution avant la fusion. Toute exception pour un besoin opérationnel urgent DOIT être documentée, limitée dans le temps, et revue immédiatement après l'incident pour empêcher qu'elle devienne une déviation permanente. Les documents et artefacts produits par les workflows de spécification DOIVENT être rédigés en français et être cohérents avec la source d'exigences validée du projet.

**Version**: 1.1.2 | **Ratifié**: 2026-10-06 | **Dernière modification**: 2026-10-07
