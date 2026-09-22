# Menu Burger Street

Site du menu de Burger Street, consulté sur téléphone après avoir scanné la carte NFC du restaurant.

- **Accueil** : « Découvrez notre menu » et un grand bouton « Menu » (effet magnétique à la souris, dégradé animé en fond)
- **Menu** : toute la carte sur une seule page qui défile, avec une barre de catégories collée en haut qui suit la lecture et un en-tête qui se compacte au scroll
- Direction artistique « Street Night » : noir, jaune moutarde, étiquettes prix rouges
- Animations discrètes (transform / opacity), désactivées si le téléphone demande de réduire les animations

Site 100 % statique : HTML, CSS et JavaScript, sans dépendance ni appel extérieur (les polices sont incluses).

## Contenu du dossier

```
index.html          la page
css/style.css       les styles (couleurs en haut du fichier)
js/menu-data.js     LA CARTE : plats, descriptions, prix
js/app.js           l'affichage et les animations
fonts/              polices Anton et Archivo (licence SIL Open Font License)
```

## Modifier la carte

Tout se passe dans **`js/menu-data.js`** : le mode d'emploi est en haut du fichier.
Pour changer un prix, modifier le nombre après `price:` (ex. `price: 8.5` affiche « 8,50 € »).

Pour ajouter une photo à un plat : déposer l'image dans un dossier `images/` et ajouter `image: "images/nom-de-la-photo.jpg"` au plat.

## Mettre en ligne

1. Envoyer **tout le contenu du dossier** (avec `index.html` à la racine) sur l'hébergement : FTP, gestionnaire de fichiers de l'hébergeur, ou glisser-déposer sur Netlify / Vercel.
2. Ouvrir l'adresse du site sur un téléphone pour vérifier.
3. Enregistrer cette adresse sur la carte NFC.

Aucun réglage serveur n'est nécessaire (pas de base de données, pas de PHP).

## Voir le site en local

Double-cliquer sur `index.html` suffit pour un aperçu. Pour un rendu identique au site en ligne :

```
python3 -m http.server 8000
```

puis ouvrir http://localhost:8000.
