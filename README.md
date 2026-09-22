# Menu Burger Street

Petit site du menu de Burger Street, pensé pour le téléphone (QR code sur table) et lisible aussi sur ordinateur.

- **Accueil** : logo + gros bouton « Voir notre menu »
- **Catégories** : Burgers, Formules, Chicken, Accompagnements, Menu Kids, Desserts, Boissons
- **Détail** : plats, descriptions, prix, badges (Nouveau, Best-seller, Épicé, Végétarien), onglets pour passer d'une catégorie à l'autre

Aucune installation nécessaire : c'est du HTML/CSS/JS pur, sans dépendance.

## Modifier le menu

Tout le contenu est dans **`js/menu-data.js`** : nom, slogan, adresse, horaires, téléphone, catégories, plats et prix.
Le mode d'emploi est en haut du fichier. Rien d'autre à toucher.

> ⚠️ Les plats et prix actuellement dans le fichier sont des exemples à remplacer par la vraie carte.

Pour ajouter une photo à un plat : déposer l'image dans un dossier `images/` et ajouter `image: "images/nom-de-la-photo.jpg"` au plat.

Les couleurs se changent en haut de `css/style.css` (variables `--accent`, `--bg`…).

## Voir le site en local

Ouvrir `index.html` dans un navigateur.

## Mettre en ligne (GitHub Pages, gratuit)

1. Sur GitHub : **Settings → Pages**
2. Source : **Deploy from a branch**, branche `main`, dossier `/ (root)`
3. Le site est publié sur `https://<compte>.github.io/Menu-Burger-street/` : il suffit d'en faire un QR code.

Liens directs possibles vers une catégorie, par exemple `…/#menu/burgers` ou `…/#menu/desserts`.
