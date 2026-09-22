/* =====================================================================
   MENU BURGER STREET — LE SEUL FICHIER À MODIFIER
   ---------------------------------------------------------------------
   Tout le contenu du site est ici : infos du restaurant, catégories,
   plats, descriptions et prix. Le reste du site s'adapte tout seul.

   ⚠️  Les plats et prix ci-dessous sont des EXEMPLES à remplacer
       par la vraie carte du restaurant.

   Pour chaque plat :
     name        : nom du plat (obligatoire)
     description : ingrédients / détail (facultatif)
     price       : prix unique, ex. 8.9  → affiche « 8,90 € »
     prices      : plusieurs prix, ex. [{ label: "Seul", price: 8.9 },
                                        { label: "Menu", price: 11.9 }]
                   (utiliser soit price, soit prices)
     tags        : badges facultatifs parmi "new", "best", "spicy", "veggie"
                   (ou n'importe quel texte libre, ex. "Halal")
     image       : photo facultative, ex. "images/classic.jpg"

   Pour chaque catégorie :
     id    : identifiant sans espace ni accent (utilisé dans l'adresse)
     name  : nom affiché
     emoji : icône de la catégorie
     note  : phrase d'info affichée en haut de la catégorie (facultatif)
   ===================================================================== */

window.MENU = {
  restaurant: {
    name: "Burger Street",
    tagline: "Burgers maison · Street food",
    // Laisser vide ("") pour ne pas afficher la ligne
    address: "",   // ex. "12 rue de la République, 69001 Lyon"
    phone: "",     // ex. "04 00 00 00 00"
    hours: "",     // ex. "7j/7 · 11h30–14h30 et 18h30–23h"
    footnote: "Prix nets en euros, service compris. Liste des allergènes disponible sur demande auprès de notre équipe."
  },

  categories: [
    {
      id: "burgers",
      name: "Burgers",
      emoji: "🍔",
      note: "Servis dans un pain brioché toasté. En menu : frites maison + boisson 33 cl.",
      items: [
        {
          name: "Classic",
          description: "Steak de bœuf 150 g, cheddar, salade, tomate, oignons rouges, pickles, sauce maison.",
          prices: [{ label: "Seul", price: 8.9 }, { label: "Menu", price: 11.9 }]
        },
        {
          name: "Double Cheese",
          description: "Deux steaks de bœuf, double cheddar fondu, oignons, pickles, ketchup, moutarde.",
          prices: [{ label: "Seul", price: 10.9 }, { label: "Menu", price: 13.9 }],
          tags: ["best"]
        },
        {
          name: "Smash Street",
          description: "Deux smash steaks croustillants, cheddar, oignons caramélisés, sauce Street.",
          prices: [{ label: "Seul", price: 11.5 }, { label: "Menu", price: 14.5 }],
          tags: ["best"]
        },
        {
          name: "Bacon BBQ",
          description: "Steak de bœuf 150 g, bacon grillé, cheddar, oignons frits, sauce barbecue fumée.",
          prices: [{ label: "Seul", price: 10.5 }, { label: "Menu", price: 13.5 }]
        },
        {
          name: "Chicken Crispy",
          description: "Filet de poulet pané croustillant, cheddar, salade, tomate, sauce Street.",
          prices: [{ label: "Seul", price: 9.5 }, { label: "Menu", price: 12.5 }]
        },
        {
          name: "Spicy Street",
          description: "Steak de bœuf 150 g, pepper jack, jalapeños, oignons frits, sauce piquante maison.",
          prices: [{ label: "Seul", price: 10.5 }, { label: "Menu", price: 13.5 }],
          tags: ["spicy"]
        },
        {
          name: "Montagnard",
          description: "Steak de bœuf 150 g, raclette fondue, poitrine fumée, oignons confits, sauce au poivre.",
          prices: [{ label: "Seul", price: 11.9 }, { label: "Menu", price: 14.9 }],
          tags: ["new"]
        },
        {
          name: "Veggie",
          description: "Galette végétale, cheddar, avocat, salade, tomate, oignons rouges, sauce yaourt-herbes.",
          prices: [{ label: "Seul", price: 9.9 }, { label: "Menu", price: 12.9 }],
          tags: ["veggie"]
        }
      ]
    },

    {
      id: "formules",
      name: "Formules",
      emoji: "🧾",
      note: "Formules non cumulables avec d'autres offres.",
      items: [
        {
          name: "Formule Midi",
          description: "Du lundi au vendredi, de 11h30 à 14h30. Classic ou Chicken Crispy + frites maison + boisson 33 cl.",
          price: 10.9
        },
        {
          name: "Formule Étudiant",
          description: "Sur présentation de la carte étudiante. Classic, Chicken Crispy ou Veggie + frites + boisson 33 cl.",
          price: 10.5
        },
        {
          name: "Box Duo",
          description: "2 burgers au choix, 2 frites maison, 6 tenders, 2 boissons 33 cl.",
          price: 26.9,
          tags: ["best"]
        },
        {
          name: "Box Famille",
          description: "4 burgers au choix, 4 frites maison, 12 tenders ou wings, 1 boisson 1,5 L.",
          price: 49.9
        }
      ]
    },

    {
      id: "chicken",
      name: "Chicken",
      emoji: "🍗",
      note: "Poulet mariné et pané maison, servi avec une sauce au choix.",
      items: [
        {
          name: "Tenders",
          description: "Aiguillettes de poulet panées, croustillantes et tendres.",
          prices: [{ label: "x3", price: 5.5 }, { label: "x5", price: 7.9 }, { label: "x8", price: 11.5 }]
        },
        {
          name: "Wings",
          description: "Ailes de poulet marinées, nature ou sauce buffalo.",
          prices: [{ label: "x6", price: 6.5 }, { label: "x12", price: 11.9 }]
        },
        {
          name: "Nuggets",
          description: "Nuggets de poulet dorés.",
          prices: [{ label: "x6", price: 4.9 }, { label: "x9", price: 6.9 }]
        },
        {
          name: "Chicken Box",
          description: "4 tenders, 4 wings, frites maison et 2 sauces au choix.",
          price: 12.9,
          tags: ["best"]
        }
      ]
    },

    {
      id: "accompagnements",
      name: "Accompagnements",
      emoji: "🍟",
      note: "Sauces : ketchup, mayonnaise, barbecue, samouraï, algérienne, biggy, sauce Street.",
      items: [
        {
          name: "Frites maison",
          description: "Pommes de terre fraîches coupées sur place.",
          prices: [{ label: "Petite", price: 3 }, { label: "Grande", price: 4 }],
          tags: ["veggie"]
        },
        {
          name: "Cheesy Fries",
          description: "Frites maison nappées de cheddar fondu et de bacon croustillant.",
          price: 5.9,
          tags: ["best"]
        },
        {
          name: "Frites de patate douce",
          description: "Croustillantes à l'extérieur, fondantes à l'intérieur.",
          price: 4.5,
          tags: ["veggie"]
        },
        {
          name: "Onion rings",
          description: "6 rondelles d'oignon panées.",
          price: 4,
          tags: ["veggie"]
        },
        {
          name: "Mozza sticks",
          description: "5 bâtonnets de mozzarella panés, sauce tomate.",
          price: 4.9,
          tags: ["veggie"]
        },
        {
          name: "Salade verte",
          description: "Jeunes pousses, tomates cerises, vinaigrette maison.",
          price: 3.5,
          tags: ["veggie"]
        },
        {
          name: "Sauce supplémentaire",
          description: "Au choix parmi nos sauces.",
          price: 0.5
        }
      ]
    },

    {
      id: "kids",
      name: "Menu Kids",
      emoji: "🧒",
      note: "Pour les moins de 10 ans. Une surprise offerte avec chaque menu !",
      items: [
        {
          name: "Kids Burger",
          description: "Cheeseburger + petite frites + jus de fruits ou eau + compote.",
          price: 7.5
        },
        {
          name: "Kids Nuggets",
          description: "4 nuggets + petite frites + jus de fruits ou eau + compote.",
          price: 7.5
        }
      ]
    },

    {
      id: "desserts",
      name: "Desserts",
      emoji: "🍩",
      items: [
        {
          name: "Cookie géant",
          description: "Cookie moelleux aux pépites de chocolat, cuit sur place.",
          price: 3
        },
        {
          name: "Brownie",
          description: "Brownie au chocolat noir et noix de pécan.",
          price: 3.5
        },
        {
          name: "Tiramisu maison",
          description: "Au café ou au spéculoos.",
          price: 4.5
        },
        {
          name: "Sundae",
          description: "Glace vanille, coulis caramel ou chocolat, éclats de cacahuètes.",
          price: 3.9
        },
        {
          name: "Milkshake",
          description: "Vanille, chocolat, fraise ou caramel beurre salé.",
          price: 4.9,
          tags: ["best"]
        }
      ]
    },

    {
      id: "boissons",
      name: "Boissons",
      emoji: "🥤",
      items: [
        {
          name: "Sodas",
          description: "Cola, cola zéro, orange, citron, thé glacé pêche. 33 cl.",
          price: 2.5
        },
        {
          name: "Eau minérale",
          description: "Plate ou gazeuse. 50 cl.",
          price: 2
        },
        {
          name: "Jus de fruits",
          description: "Orange, pomme ou multifruits. 25 cl.",
          price: 2.8
        },
        {
          name: "Limonade artisanale",
          description: "Citron, framboise ou menthe. 33 cl.",
          price: 3.5
        },
        {
          name: "Grande bouteille",
          description: "Soda au choix. 1,5 L.",
          price: 4.5
        }
      ]
    }
  ]
};
