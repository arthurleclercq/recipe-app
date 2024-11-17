## Application de liste de recettes de cuisine

Le client et serveur sont en Sveltekit, la base de données est en PostgreSQL.
Pour le développement la base de données est hébergée grâce à Docker en localhost sur le port 5433, avec les données stockées dans un dossier 'postgres-data' à la racine du projet.

## Lancer la base de données

Installer Docker si besoin

Ouvrir un terminal et se placer à la racine du projet

Lancer la commande suivante:

```bash
docker-compose up
```
## Lancer l'application

Ouvrir un terminal, se placer à la  racine du projet

Lancer la commande suivante:

```bash
npm run dev -- --open
```


