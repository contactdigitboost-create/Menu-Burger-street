/* Affichage du menu — le contenu se modifie dans js/menu-data.js */
(() => {
  "use strict";

  const { restaurant, categories } = window.MENU;

  const euro = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });
  const formatPrice = (p) => (typeof p === "number" ? euro.format(p) : String(p));

  const TAGS = {
    new:    { label: "Nouveau",     icon: "✨" },
    best:   { label: "Best-seller", icon: "⭐" },
    spicy:  { label: "Épicé",       icon: "🌶️" },
    veggie: { label: "Végétarien",  icon: "🌱" },
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => root.querySelectorAll(sel);

  // Crée un élément sans passer par innerHTML
  function h(tag, props = {}, ...children) {
    const el = document.createElement(tag);
    for (const [key, value] of Object.entries(props)) {
      if (value == null || value === false) continue;
      if (key === "class") el.className = value;
      else if (key === "text") el.textContent = value;
      else el.setAttribute(key, value);
    }
    for (const child of children.flat()) {
      if (child == null || child === false) continue;
      el.append(child);
    }
    return el;
  }

  const views = {
    home: $("#view-home"),
    categories: $("#view-categories"),
    category: $("#view-category"),
  };

  /* ---------- Infos restaurant ---------- */

  const nameParts = restaurant.name.trim().split(/\s+/);
  const brandNode = () => {
    const last = nameParts.length > 1 ? nameParts[nameParts.length - 1] : null;
    const first = last ? nameParts.slice(0, -1).join(" ") + " " : nameParts[0];
    return [first, last && h("span", { text: last })];
  };

  $("#logo").replaceChildren(...brandNode());
  $$("[data-brand]").forEach((el) => el.replaceChildren(...brandNode()));
  $$("[data-restaurant]").forEach((el) => {
    const value = restaurant[el.dataset.restaurant];
    el.textContent = value || "";
    el.hidden = !value;
  });

  const info = [
    restaurant.address && h("li", { text: "📍 " + restaurant.address }),
    restaurant.hours && h("li", { text: "🕒 " + restaurant.hours }),
    restaurant.phone && h("li", {},
      h("a", { href: "tel:" + restaurant.phone.replace(/[^\d+]/g, ""), text: "📞 " + restaurant.phone })
    ),
  ].filter(Boolean);
  $("#home-info").replaceChildren(...info);
  $("#home-info").hidden = info.length === 0;

  /* ---------- Grille des catégories ---------- */

  $("#cat-grid").replaceChildren(
    ...categories.map((cat) =>
      h("li", {},
        h("a", { class: "cat-card", href: `#menu/${cat.id}` },
          h("span", { class: "cat-emoji", "aria-hidden": "true", text: cat.emoji || "🍽️" }),
          h("span", { class: "cat-name", text: cat.name }),
          h("span", { class: "cat-count", text: `${cat.items.length} choix` })
        )
      )
    )
  );

  /* ---------- Onglets de catégories ---------- */

  const tabs = $("#cat-tabs");
  tabs.replaceChildren(
    ...categories.map((cat) =>
      h("a", { class: "tab", href: `#menu/${cat.id}`, "data-id": cat.id },
        h("span", { "aria-hidden": "true", text: cat.emoji || "🍽️" }),
        cat.name
      )
    )
  );

  /* ---------- Détail d'une catégorie ---------- */

  function renderItem(item) {
    const prices = Array.isArray(item.prices) ? item.prices : [];
    const tags = Array.isArray(item.tags) ? item.tags : [];
    const hasSinglePrice = prices.length === 0 && item.price != null;

    return h("li", { class: "item" },
      item.image && h("img", { class: "item-img", src: item.image, alt: "", loading: "lazy", width: "88", height: "88" }),
      h("div", { class: "item-body" },
        h("div", { class: "item-head" },
          h("h3", { class: "item-name", text: item.name }),
          hasSinglePrice && h("span", { class: "item-leader", "aria-hidden": "true" }),
          hasSinglePrice && h("span", { class: "item-price", text: formatPrice(item.price) })
        ),
        item.description && h("p", { class: "item-desc", text: item.description }),
        prices.length > 0 && h("ul", { class: "item-prices" },
          prices.map((p) =>
            h("li", { class: "price-chip" },
              p.label && h("span", { class: "price-label", text: p.label }),
              h("strong", { text: formatPrice(p.price) })
            )
          )
        ),
        tags.length > 0 && h("ul", { class: "item-tags" },
          tags.map((t) => {
            const tag = TAGS[t] || { label: t, icon: "" };
            return h("li", { class: `tag tag-${TAGS[t] ? t : "custom"}` },
              tag.icon && h("span", { "aria-hidden": "true", text: tag.icon + " " }),
              tag.label
            );
          })
        )
      )
    );
  }

  function pagerLink(cat, dir) {
    return h("a", { class: `pager-link pager-${dir}`, href: `#menu/${cat.id}` },
      h("small", { text: dir === "prev" ? "Précédent" : "Suivant" }),
      h("span", { text: dir === "prev" ? `← ${cat.name}` : `${cat.name} →` })
    );
  }

  function renderCategory(cat) {
    $("#cat-title").textContent = cat.name;

    const note = $("#cat-note");
    note.textContent = cat.note || "";
    note.hidden = !cat.note;

    $("#cat-items").replaceChildren(...cat.items.map(renderItem));

    $$(".tab", tabs).forEach((tab) => {
      const active = tab.dataset.id === cat.id;
      tab.classList.toggle("is-active", active);
      if (active) tab.setAttribute("aria-current", "page");
      else tab.removeAttribute("aria-current");
    });

    const i = categories.indexOf(cat);
    const prev = categories[i - 1];
    const next = categories[i + 1];
    $("#cat-pager").replaceChildren(
      prev ? pagerLink(prev, "prev") : h("span"),
      next ? pagerLink(next, "next") : h("span")
    );
  }

  function centerActiveTab(smooth) {
    const active = $(".tab.is-active", tabs);
    if (!active) return;
    tabs.scrollTo({
      left: active.offsetLeft - (tabs.clientWidth - active.offsetWidth) / 2,
      behavior: smooth ? "smooth" : "auto",
    });
  }

  /* ---------- Navigation (#, #menu, #menu/burgers) ---------- */

  let firstRender = true;

  function show(name, title) {
    for (const [key, view] of Object.entries(views)) view.hidden = key !== name;
    document.title = title ? `${title} · ${restaurant.name}` : restaurant.name;
    window.scrollTo(0, 0);
    if (!firstRender) {
      const heading = $("[data-focus]", views[name]);
      if (heading) heading.focus({ preventScroll: true });
    }
  }

  function route() {
    const [page, id] = location.hash.replace(/^#\/?/, "").split("/");

    if (page === "menu" && id) {
      const cat = categories.find((c) => c.id === decodeURIComponent(id));
      if (cat) {
        const wasOnCategory = !views.category.hidden;
        renderCategory(cat);
        show("category", cat.name);
        centerActiveTab(wasOnCategory && !firstRender);
        firstRender = false;
        return;
      }
    }

    if (page === "menu") show("categories", "Notre menu");
    else show("home");
    firstRender = false;
  }

  window.addEventListener("hashchange", route);
  route();
})();
