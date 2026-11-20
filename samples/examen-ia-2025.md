# Examen : IA appliquée à la finance (Session normale)
**Année universitaire : 2025/2026**
**Master : CCA**
**Durée : 1 h 00**

> N.B. : Un point sera attribué à la présentation de la copie.

---

## Exercice 1 : 8 pts

Complétez les phrases ci-dessous, avec les mots convenables d'après la liste suivante :
**IA faible - Performants - Cognitives - L'extraction - Compétences - Non-structurées - La sélection - Semi-structurées.**

- L'intelligence est une notion complexe qui englobe plusieurs capacités .................... et comportementales.

- Les systèmes d'IA étroite sont généralement .................... dans leur domaine d'expertise, mais ils ne sont pas capables de généraliser leurs .................... à d'autres tâches.

- Les algorithmes de recommandation de produits sont une application de ....................

- Textes, images, vidéos, sont des exemples de données ....................

- Les fichiers JSON, et les logs sont des exemples de données ....................

- L'ingénierie des caractéristiques regroupe .................... et .................... des caractéristiques.

---

## Exercice 2 : 5 pts

1. Citez trois éléments nécessaires au fonctionnement d'un système d'IA.
2. Quel est l'objectif de l'ingénierie des caractéristiques ?
3. Définissez les éléments suivants : IA, Machine Learning, Deep Learning.
4. Quelle est la différence entre Seaborn et Matplotlib ?

---

## Exercice 3 : 6 pts

On considère un extrait d'un ensemble de données bancaires destiné à prédire si une transaction est normale ou suspecte :

| ID Clients | Numéro de compte | Identifiant opération | Type de transaction | Statut opération | Localisation | Montant | Classe |
|------------|------------------|-----------------------|---------------------|------------------|--------------|---------|--------|
| 1023 | 851032.0 | TR208/1145 | Paiement en ligne | Échoué | Kaolack | 45000.0 | Normal |
| 543 | 85453.0 | TR107/0124 | ATM | Échoué | Tambacounda | 18000.0 | Suspect |
| 1013 | 851301.0 | TR205/0196 | Paiement électronique | Validé | Thiès | 200000.0 | Normal |
| 10360 | 8501036.0 | TR216/00239 | ATM | Validé | Kaolack | 29000.0 | Normal |
| 1022 | 851202.0 | TR208/0023 | ATM | Validé | Ziguinchor | 14000.0 | Normal |

1. Avant la modélisation, quelle étape doit-on appliquer aux données ?
2. Quelle opération de prétraitement faut-il appliquer à la colonne **Classe** pour transformer les données catégorielles en données numériques ?
3. Quel type d'apprentissage faut-il utiliser dans ce cas ? Quelle est la tâche correspondante ?
4. Proposer un algorithme de machine learning adapté à ce problème.
5. Décrire les principales étapes d'un projet de machine learning permettant de construire un modèle de détection de transactions suspectes.

---

*Bon courage*

---

Examen d’Intelligence Artificielle (session normale)

Année universitaire : 2025/2026

S5 - Option : Politiques Economiques

Durée : 1h30

Exercice 1 : (7pts)

Complétez les phrases suivantes avec le ou les mots appropriés.















L’intelligence est liée à …………….. à travers ses facultés de compréhension et

…………….., et elle est observable grâce à son comportement.

L’IA est définie comme …………….. mises en œuvre afin de construire

………………capables de faire preuve d’un comportement que l’on peut qualifier

intelligent.

L’IA faible se concentre sur une tâche ou un domaine ……………..

Dans l’apprentissage supervisé, l’algorithme apprend à partir de données ……………..

Le machine learning repose sur des opérations …………….., les données doivent donc

être converties en valeurs …………….. pour être traitées par les modèles.

Lors de l’application de la technique de …………….., l’ensemble des données est

divisé en k ensembles de tailles presque égales.

« False Positive » implique que la prédiction est …………….. alors que la valeur réelle

est ……………..

Exercice 2 : (10pts)

On dispose d’un dataset « Student » avec les colonnes : âge, sexe (Femme/Homme), studytime,

note. Certaines valeurs de la colonne âge sont manquantes.

Proposez deux méthodes d’imputation possibles pour la colonne âge.

Donnez le code Python pour chaque méthode.

Expliquez pourquoi on procède à l’encodage des variables catégorielles.

Quelle est la différence entre Feature Selection et Feature Extraction ?

Expliquez le principe de la normalisation.

Citez au moins trois algorithmes sensibles à la mise à l'échelle des variables.

Expliquez la différence entre Machine Learning et Deep Learning à l’aide d’un schéma

simple.

1. Expliquez la relation entre l’IA, le machine learning, le deep learning et l’IA générative

2. Dans la matrice de confusion, expliquez la différence entre l’erreur de type I et l’erreur

de type II.

10. Un modèle donne : Train = 98% et Test = 60%. Identifiez le problème et proposez une

solution.

1.

2.

3.

4.

5.

6.

7.

1

Exercice 3 : (3pts)

Classez les algorithmes suivants selon le type d’apprentissage : supervisé, non supervisé, par

renforcement.

Q-Learning - Agglomerative Clustering - Proximal Policy Optimization (PPO) - Support Vector

Machines (SVM) - Deep Q-Network (DQN) - Gaussian Mixture Models (GMM) – DBSCAN

- K-Nearest Neighbors (KNN) - Régression Logistique.

Bon courage !

2



---

# Corrigé — IA appliquée à la finance (Master CCA)

---

## Exercice 1 : Complétez les phrases (8 pts)

- L'intelligence est une notion complexe qui englobe plusieurs capacités **cognitives** et comportementales.

- Les systèmes d'IA étroite sont généralement **performants** dans leur domaine d'expertise, mais ils ne sont pas capables de généraliser leurs **compétences** à d'autres tâches.

- Les algorithmes de recommandation de produits sont une application de **l'IA faible**.

- Textes, images, vidéos, sont des exemples de données **non-structurées**.

- Les fichiers JSON et les logs sont des exemples de données **semi-structurées**.

- L'ingénierie des caractéristiques regroupe **l'extraction** et **la sélection** des caractéristiques.

---

## Exercice 2 : Questions de cours (5 pts)

**1. Les trois éléments nécessaires au fonctionnement d'un système d'IA :**
- Les **données** (qui nourrissent et entraînent les algorithmes)
- Les **algorithmes** (qui permettent d'atteindre l'objectif grâce à des règles et des modèles)
- La **puissance de calcul** (pour traiter les données et exécuter les algorithmes)

**2. Objectif de l'ingénierie des caractéristiques :**
L'ingénierie des caractéristiques vise à créer ou sélectionner les variables les plus pertinentes à partir des données existantes, afin d'améliorer les performances du modèle de machine learning. Elle comprend l'extraction (générer de nouvelles variables à partir d'informations cachées) et la sélection (ne garder que les variables les plus utiles pour éviter de dégrader le modèle).

**3. Définitions :**

- **Intelligence Artificielle (IA) :** Ensemble des techniques mises en œuvre afin de construire des machines capables de faire preuve d'un comportement que l'on peut qualifier d'intelligent ; c'est une imitation de l'intelligence humaine.

- **Machine Learning (ML) :** Sous-domaine de l'IA qui donne à une machine la capacité d'apprendre sans être explicitement programmée, en développant et entraînant un modèle mathématique à partir de données d'apprentissage afin qu'il puisse effectuer des prédictions sur de nouvelles données.

- **Deep Learning (DL) :** Sous-domaine du Machine Learning reposant sur des réseaux de neurones artificiels multicouches, inspirés du cerveau humain. Il permet de résoudre des problèmes complexes à partir de grandes quantités de données non-structurées (images, texte, son), et réalise automatiquement l'extraction de caractéristiques contrairement au ML classique.

**4. Différence entre Seaborn et Matplotlib :**
Matplotlib est la bibliothèque de visualisation de base en Python, permettant de créer des graphiques variés (histogrammes, courbes, scatter plots). Seaborn est une extension de Matplotlib, plus puissante et plus esthétique par défaut. Elle permet de tracer des graphiques relationnels entre variables et des graphiques de distribution plus facilement, et permet également d'automatiser la création de graphiques pour travailler plus rapidement.

---

## Exercice 3 : Cas pratique — Détection de transactions suspectes (6 pts)

**1. Étape à appliquer avant la modélisation :**
Avant la modélisation, il faut appliquer une phase de **prétraitement des données**. Cela inclut : la vérification et la gestion des valeurs manquantes (imputation ou suppression), l'encodage des variables catégorielles, la normalisation des variables numériques, et éventuellement la sélection des caractéristiques pertinentes.

**2. Opération de prétraitement sur la colonne « Classe » :**
Il faut appliquer l'**encodage** (encoding). Cette opération consiste à remplacer les valeurs catégorielles (*Normal*, *Suspect*) par des valeurs numériques, par exemple : 0 pour Normal et 1 pour Suspect. Cette transformation est indispensable car les algorithmes de Machine Learning ne traitent que des données numériques, puisqu'ils reposent sur des opérations mathématiques.

**3. Type d'apprentissage et tâche correspondante :**
- **Type d'apprentissage :** Apprentissage **supervisé**, car les données sont étiquetées (la colonne *Classe* fournit le label de chaque transaction).
- **Tâche correspondante :** Il s'agit d'une tâche de **classification**, car la sortie Y est une variable catégorielle à deux classes : Normal ou Suspect.

**4. Algorithme adapté :**
Parmi les algorithmes adaptés à ce problème de classification binaire supervisée, on peut proposer :
- **SVM (Support Vector Machine)**, efficace pour les problèmes de classification binaire
- ou **Random Forest**, robuste et performant sur des données tabulaires avec des variables mixtes.

**5. Principales étapes du projet Machine Learning :**

1. **Définition du problème** : L'objectif est de prédire si une transaction bancaire est normale ou suspecte (classification binaire supervisée).

2. **Collecte et préparation des données** : Rassembler les données transactionnelles, gérer les valeurs manquantes (imputation ou suppression), encoder les variables catégorielles (*Type de transaction*, *Statut opération*, *Localisation*, *Classe*), normaliser les variables numériques (*Montant*).

3. **Exploration des données (EDA)** : Analyser la structure du dataset, visualiser la distribution des montants, identifier les déséquilibres entre classes, détecter les valeurs aberrantes.

4. **Séparation des données** : Diviser le dataset en ensemble d'entraînement (ex. 80 %) et ensemble de test (ex. 20 %) via la fonction `train_test_split` de Scikit-learn.

5. **Choix et entraînement du modèle** : Choisir un algorithme de classification (ex. SVM, Random Forest), puis entraîner le modèle sur X_train et Y_train à l'aide de la fonction `fit`.

6. **Évaluation et optimisation** : Tester le modèle sur X_test, comparer Y_prédit avec Y_test réel, et mesurer les performances avec des métriques adaptées (accuracy, précision, recall). Ajuster les hyperparamètres si nécessaire.

7. **Déploiement et suivi** : Déployer le modèle en production au sein du système bancaire, surveiller ses performances et le mettre à jour régulièrement avec de nouvelles données.

---