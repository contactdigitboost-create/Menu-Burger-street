# Menu Burger Street

Petit site du menu de Burger Street, pensé pour le téléphone (carte NFC sur place) et lisible aussi sur ordinateur.

- **Accueil** : logo + gros bouton « Voir notre menu »
- **Catégories** : Burgers, Sandwichs, Tacos, Paninis, Tex-Mex, Salades, Pâtes, Desserts, Boissons, Sauces
- **Détail** : plats, descriptions, prix, options au choix (viandes, saveurs, sauces), onglets pour passer d'une catégorie à l'autre

Aucune installation nécessaire : c'est du HTML/CSS/JS pur, sans dépendance.

## Modifier le menu

Tout le contenu est dans **`js/menu-data.js`** : catégories, plats, descriptions et prix.
Le mode d'emploi est en haut du fichier. Rien d'autre à toucher.

Pour ajouter une photo à un plat : déposer l'image dans un dossier `images/` et ajouter `image: "images/nom-de-la-photo.jpg"` au plat.

Les couleurs se changent en haut de `css/style.css` (variables `--accent`, `--bg`…).

## Voir le site en local

Ouvrir `index.html` dans un navigateur.

## Mettre en ligne (GitHub Pages, gratuit)

1. Sur GitHub : **Settings → Pages**
2. Source : **Deploy from a branch**, branche `main`, dossier `/ (root)`
3. Le site est publié sur `https://<compte>.github.io/Menu-Burger-street/` : c'est ce lien qu'il faut enregistrer sur la carte NFC.

Liens directs possibles vers une catégorie, par exemple `…/#menu/burgers` ou `…/#menu/desserts`.
