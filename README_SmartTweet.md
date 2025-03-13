# SmartTweet - Votre Réseau Social Intelligent

## 📄 Description

**SmartTweet** est une plateforme de réseau social qui permet aux utilisateurs de partager du contenu (texte, images, vidéos), d'interagir avec leur communauté en temps réel et de bénéficier d'une analyse avancée des expressions faciales.

Développé par le **Groupe 16**, SmartTweet offre une interface intuitive et performante pour optimiser l'engagement des utilisateurs.

## 🚀 Fonctionnalités principales

- Publier et gérer des tweets (texte, images, vidéos)
- Interagir avec la communauté (likes, retweets, réponses, signets)
- Fil d'actualité personnalisé
- Recherche avancée avec filtres
- Profil utilisateur complet
- Analyse des expressions faciales pour adapter le feed

## 🛠 Installation et Activation en Local

### 👉 Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

- [Node.js](https://nodejs.org/) (v16 ou plus)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)
- Un gestionnaire de paquets : `npm` ou `yarn`

### 🌍 Cloner le dépôt

```bash
# Cloner le projet depuis le dépôt Git
git clone https://github.com/Govindajen/Hackathon_IPSSI.git
cd smarttweet
```

### 🔧 Configuration de l'environnement

Créez un fichier `.env` à la racine du projet et ajoutez les variables suivantes (voir `.env.example`) :

```env
PORT=3000
MONGODB_URI=votre_mongodb_uri
JWT_SECRET=votre_secret
```

### 🔧 Installation des dépendances

Dans le dossier `backend-app` :

```bash
cd backend-app
npm install
```

Dans le dossier `front-hackathon` :

```bash
cd ../front-hackathon
npm install
```

### 💪 Lancer l'application

**1. Démarrer le backend**

```bash
cd backend-app
npm start
```

**2. Démarrer le frontend**

```bash
cd ../front-hackathon
npm run dev
```

L'application sera disponible sur [http://localhost:5173](http://localhost:5173) par défaut.

## 🔗 Lien Trello

Pour suivre l'avancement du projet, consultez notre [Tableau Trello](https://trello.com/b/dVEOg5mI/modele-kanban).

## 👥 Équipe de Développement

- **Dyhia AMOUBOUDI**
- **Kevin TATA**
- **Jonathan GUERPILLON**
- **Chouaib GHODHBAN**
- **Govindarajen COODIEN**
- **Meïssa MARA**

## 🛡 Architecture du Système

- **Base de données** : MongoDB
- **Backend** : Node.js, Express.js, WebSockets
- **Frontend** : React.js, Redux, Bootstrap

## 📜 Modèles de Données

- **Utilisateur** : Profil, connexions, émotions
- **Tweet** : Contenu, interactions
- **Notification** : Alertes en temps réel

## 🔗 API et Routes

- **Tweets** : Création, modification, suppression
- **Utilisateurs** : Authentification, profils, relations
- **Notifications** : Alertes en temps réel
- **Recherche** : Requêtes personnalisées

## 🔧 Contribuer

Les contributions sont les bienvenues ! Veuillez soumettre une PR ou ouvrir une issue en cas de bug.

---

Merci d'utiliser **SmartTweet** ! ✨

