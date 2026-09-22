/* =====================================================================
   MENU BURGER STREET — LE SEUL FICHIER À MODIFIER
   ---------------------------------------------------------------------
   Tout le contenu du site est ici : catégories, plats, descriptions
   et prix. Le reste du site s'adapte tout seul.

   Pour chaque plat :
     name         : nom du plat (obligatoire)
     description  : ingrédients / détail (facultatif)
     price        : prix unique, ex. 8.5  → affiche « 8,50 € »
     prices       : plusieurs prix, ex. [{ label: "1 viande", price: 9 },
                                         { label: "2 viandes", price: 10 }]
                    (utiliser soit price, soit prices)
     choices      : liste d'options affichées en pastilles, ex. ["Kebab", "Merguez"]
     choicesLabel : titre au-dessus des options (facultatif)
     tags         : badges facultatifs parmi "new", "best", "spicy", "veggie"
                    (ou n'importe quel texte libre, ex. "Halal")
     image        : photo facultative, ex. "images/cheese.jpg"

   Pour chaque catégorie :
     id         : identifiant sans espace ni accent (utilisé dans l'adresse)
     name       : nom affiché
     emoji      : icône de la catégorie
     note       : phrase d'info affichée en haut de la catégorie (facultatif)
     countLabel : texte sous le nom de la catégorie (par défaut « X choix »)
   ===================================================================== */

window.MENU = {
  restaurant: {
    name: "Burger Street",
    tagline: "Burgers · Sandwichs · Tacos",
    footnote: "Prix nets en euros. Informations sur les allergènes disponibles sur demande."
  },

  categories: [
    {
      id: "burgers",
      name: "Burgers",
      emoji: "🍔",
      items: [
        { name: "Cheese",         description: "1 steak 90 g + cheddar",                                   price: 6.5 },
        { name: "Double Cheese",  description: "2 steaks 90 g + cheddar",                                  price: 8.5 },
        { name: "Le 180",         description: "2 steaks 90 g + cheddar",                                  price: 8.5 },
        { name: "Chèvre",         description: "1 steak haché 90 g + fromage de chèvre + 1 cheddar",       price: 8 },
        { name: "Bacon",          description: "2 steaks 90 g + 2 bacon + 2 cheddar",                      price: 10 },
        { name: "Chicken",        description: "Chicken pané + cheddar",                                   price: 7 },
        { name: "Double Chicken", description: "2 chicken panés + cheddar",                                price: 8.5 },
        { name: "Triple Chicken", description: "3 chicken panés + cheddar",                                price: 10 },
        { name: "Fish",           description: "Fish pané + cheddar",                                      price: 7 }
      ]
    },

    {
      id: "sandwichs",
      name: "Sandwichs",
      emoji: "🥙",
      items: [
        { name: "Kebab",    description: "Viande de kebab",                                    price: 8.5 },
        { name: "Curry",    description: "Chicken curry + cheddar",                            price: 8.5 },
        { name: "Paprika",  description: "Chicken paprika + cheddar",                          price: 8.5 },
        { name: "Escalope", description: "Escalope de poulet + cheddar",                       price: 8.5 },
        { name: "Steak",    description: "2 steaks 45 g + cheddar",                            price: 8.5 },
        { name: "Suprême",  description: "2 steaks 45 g + bacon + œuf + fromage",              price: 8.5 },
        { name: "Merguez",  description: "2 pièces de merguez",                                price: 8.5 },
        { name: "Country",  description: "1 steak 45 g + galette de pomme de terre + cheddar", price: 8.5 },
        { name: "Radical",  description: "2 steaks 45 g + cordon bleu + cheddar",              price: 8.5 },
        { name: "Boursin",  description: "Escalope + Boursin + cheddar",                       price: 8.5 }
      ]
    },

    {
      id: "tacos",
      name: "Tacos",
      emoji: "🌯",
      countLabel: "1 à 3 viandes",
      items: [
        {
          name: "Tacos classique",
          prices: [
            { label: "1 viande",  price: 9 },
            { label: "2 viandes", price: 10 },
            { label: "3 viandes", price: 11 }
          ],
          choicesLabel: "Viandes au choix",
          choices: ["Kebab", "Merguez", "Escalope", "Curry", "Tenders", "Cordon bleu", "Nuggets", "Viande hachée"]
        },
        {
          name: "Suppléments",
          choices: ["Chèvre", "Cheddar", "Boursin", "Mozza", "Lardons", "Olives", "Chorizo", "Raclette"]
        }
      ]
    },

    {
      id: "paninis",
      name: "Paninis",
      emoji: "🥪",
      countLabel: "7 saveurs",
      items: [
        {
          name: "Panini",
          price: 6,
          choicesLabel: "Au choix",
          choices: ["Poulet", "Steak", "3 Fromages", "Jambon", "Saumon", "Kebab", "Merguez"]
        }
      ]
    },

    {
      id: "tex-mex",
      name: "Tex-Mex",
      emoji: "🍗",
      items: [
        { name: "Tenders",      description: "5 pièces", price: 7 },
        { name: "Wings",        description: "5 pièces", price: 6 },
        { name: "Nuggets",      description: "5 pièces", price: 5 },
        { name: "Mozza sticks", description: "5 pièces", price: 6 },
        { name: "Oignon rings", description: "6 pièces", price: 5 }
      ]
    },

    {
      id: "salades",
      name: "Salades",
      emoji: "🥗",
      items: [
        { name: "Niçoise",     description: "Salade, tomate, thon, maïs, œuf, olives",                         price: 8 },
        { name: "Genova",      description: "Salade, tomate, lardons, poulet, emmental",                       price: 8 },
        { name: "Chèvre chaud", description: "Salade, tomate, chèvre chaud sur toast, lardons",                price: 8 },
        { name: "Norvégienne", description: "Salade, tomate, saumon, avocat, crème fraîche, maïs, citron",     price: 8 }
      ]
    },

    {
      id: "pates",
      name: "Pâtes",
      emoji: "🍝",
      items: [
        { name: "Carbonara",  description: "Crème fraîche, lardons, œuf",          price: 8 },
        { name: "Bolognaise", description: "Viande hachée, sauce tomate",          price: 8 },
        { name: "Saumon",     description: "Crème fraîche, saumon, sauce tomate",  price: 8 },
        { name: "4 Fromages", description: "Crème fraîche, assortiment de fromages", price: 8 },
        { name: "Escalope",   description: "Crème fraîche, champignons, escalope", price: 8 }
      ]
    },

    {
      id: "desserts",
      name: "Desserts",
      emoji: "🍰",
      items: [
        {
          name: "Milkshake",
          price: 4,
          choicesLabel: "Au choix",
          choices: ["Nutella", "M&M's", "Kinder Bueno", "Oreo", "Milka", "Snickers", "Lotus", "KitKat", "Daim", "Twix"]
        },
        { name: "Glace Häagen-Dazs", price: 4 },
        { name: "Brownie",           price: 3 },
        { name: "Tarte au Daim",     price: 3 },
        { name: "Tiramisu",          price: 3 }
      ]
    },

    {
      id: "boissons",
      name: "Boissons",
      emoji: "🥤",
      items: [
        { name: "Coca-Cola / Oasis", price: 2 },
        { name: "Ice Tea",           price: 2 },
        { name: "Bouteille d'eau",   description: "50 cl", price: 1.5 }
      ]
    },

    {
      id: "sauces",
      name: "Sauces",
      emoji: "🥫",
      countLabel: "7 sauces",
      items: [
        {
          name: "Nos sauces",
          choices: ["Blanche", "Samouraï", "Algérienne", "Harissa", "Ketchup", "Mayo", "Biggy"]
        }
      ]
    }
  ]
};
