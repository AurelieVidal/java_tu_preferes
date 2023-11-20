# Projet "Tu préfères ?"

Ce projet vise à développer le jeu ludique "Tu préfères ?", tout en fournissant une expérience d'apprentissage pratique d'Angular et TypeScript.

### Matériel nécessaire

- Un ordinateur ou un appareil pour jouer.
- Au moins deux joueurs.

## Dépendances

Assurez-vous d'avoir les dépendances suivantes installées sur votre machine avant de lancer le projet :

- **Node.js et npm :** Si vous ne les avez pas déjà installés, téléchargez et installez [Node.js](https://nodejs.org/), qui inclut npm, le gestionnaire de paquets Node.js.

    ```bash
    sudo apt update
    sudo apt install npm
    ```

- **Angular CLI (Command Line Interface) :** Installez Angular CLI en utilisant la commande suivante :
    ```bash
    npm install -g @angular/cli
    ```

- **Docker et Docker Compose :** Pour Linux, vous pouvez installer Docker et Docker Compose avec les commandes suivantes :
    ```bash
    sudo apt install docker
    sudo apt install docker-compose
    ```

## Setup

1. **Clonage du dépôt :** Clonez ce dépôt sur votre machine en utilisant la commande suivante :
    ```bash
    git clone git@github.com:AurelieVidal/java_tu_preferes.git
    ```

### Frontend

2. **Installation des dépendances (Frontend) :** Naviguez vers le répertoire "front" du projet et exécutez la commande suivante pour installer les dépendances nécessaires :
    ```bash
    npm install
    ```

3. **Lancement de l'application Frontend :** Retournez dans le répertoire "front" et exécutez la commande suivante pour lancer l'application. Elle sera accessible sur le port 4200 :
    ```bash
    ng serve
    ```

### Backend

4. **Installation des dépendances (Backend) :** Dans le répertoire "back" du projet, exécutez la commande suivante pour lancer les services backend via Docker Compose :
    ```bash
    docker-compose up
    ```

5. **Base de données PostgreSQL :** Construisez la base de données PostgreSQL puis exécuter les fichiers SQL suivants situés dans "back/initdb/":
    - Sélectionnez les deux fichiers "1_TABLES.sql" et "2_DEFAULT_ENTRIES.sql".
    - Cliquez avec le bouton droit de la souris et choisissez 'Run 1_TABLES.sql...'.

6. **Appui sur le bouton "BackSqueletonApplication" :** Enfin, dans IntelliJ , appuyez sur le bouton "BackSqueletonApplication" en haut à droite.



L'application sera accessible sur http://localhost:4200/. Assurez-vous que les services backend sont opérationnels avant de jouer à "Tu préfères ?".



## Règles du jeu "Tu préfères ?"

1. **Déroulement d'une manche :**
    - *Choix à deux issues :* À chaque manche, un choix à deux issues est présenté au joueur en cours de jeu.
    - *Sélection du choix préféré :* Le joueur doit sélectionner son choix préféré parmi les deux propositions.

2. **Devinez la répartition :** Après avoir fait son choix, le joueur en cours doit deviner la répartition des votes parmi les joueurs présents.

3. **Changement de joueur :** Une fois qu'un joueur a terminé sa participation en répondant à la question en cours, le jeu passe au joueur suivant. Chaque joueur répond successivement à la même question. Lorsque tous les joueurs ont répondu à la question en cours, la manche se termine, et le jeu passe à la manche suivante.

4. **Calcul des scores :** Les scores sont calculés à la fin du jeu, une fois que toutes les manches ont été jouées. Les joueurs reçoivent des points en fonction de leur capacité à deviner correctement la répartition des votes.

5. **Fin du jeu :** Le jeu se termine lorsque toutes les manches ont été jouées. Le joueur avec le plus grand nombre de points remporte la partie.

Enjoy :)