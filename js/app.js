/* Affichage du menu — le contenu se modifie dans js/menu-data.js */
(() => {
  "use strict";

  const { restaurant, categories } = window.MENU;

  const euro = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });
  const formatPrice = (p) => (typeof p === "number" ? euro.format(p) : String(p));

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const smooth = () => (reduceMotion.matches ? "auto" : "smooth");

  const TAGS = {
    new:    { label: "Nouveau",     icon: "✨" },
    best:   { label: "Best-seller", icon: "⭐" },
    spicy:  { label: "Épicé",       icon: "🌶️" },
    veggie: { label: "Végétarien",  icon: "🌱" },
  };

  // Différence de hauteur de l'en-tête entre normal et compact (voir --bar-h dans style.css)
  const COMPACT_DELTA = 14;

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

  const views = { home: $("#view-home"), menu: $("#view-menu") };
  const head = $("#menu-head");
  const nav = $("#cat-nav");

  /* ---------- Textes du restaurant ---------- */

  const nameParts = restaurant.name.trim().split(/\s+/);
  const brandNode = () => {
    const last = nameParts.length > 1 ? nameParts[nameParts.length - 1] : null;
    const first = last ? nameParts.slice(0, -1).join(" ") + " " : nameParts[0];
    return [first, last && h("span", { text: last })];
  };
  $$("[data-brand]").forEach((el) => el.replaceChildren(...brandNode()));
  $$("[data-restaurant]").forEach((el) => {
    const value = restaurant[el.dataset.restaurant];
    el.textContent = value || "";
    el.hidden = !value;
  });

  /* ---------- Plats ---------- */

  function renderItem(item) {
    const prices = Array.isArray(item.prices) ? item.prices : [];
    const choices = Array.isArray(item.choices) ? item.choices : [];
    const tags = Array.isArray(item.tags) ? item.tags : [];
    const hasSinglePrice = prices.length === 0 && item.price != null;

    return h("li", { class: "item reveal" },
      item.image && h("img", { class: "item-img", src: item.image, alt: "", loading: "lazy", width: "88", height: "88" }),
      h("div", { class: "item-body" },
        h("h3", { class: "item-name", text: item.name }),
        item.description && h("p", { class: "item-desc", text: item.description }),
        prices.length > 0 && h("ul", { class: "item-prices" },
          prices.map((p) =>
            h("li", { class: "price-opt" },
              p.label && h("span", { class: "price-label", text: p.label }),
              h("span", { class: "price-tag", text: formatPrice(p.price) })
            )
          )
        ),
        choices.length > 0 && item.choicesLabel && h("p", { class: "choices-label", text: item.choicesLabel }),
        choices.length > 0 && h("ul", { class: "choices" },
          choices.map((c) => h("li", { class: "choice", text: c }))
        ),
        tags.length > 0 && h("ul", { class: "tags" },
          tags.map((t) => {
            const tag = TAGS[t] || { label: t, icon: "" };
            return h("li", { class: `tag tag-${TAGS[t] ? t : "custom"}` },
              tag.icon && h("span", { "aria-hidden": "true", text: tag.icon + " " }),
              tag.label
            );
          })
        )
      ),
      hasSinglePrice && h("span", { class: "price-tag", text: formatPrice(item.price) })
    );
  }

  const entries = categories.map((cat) => {
    const link = h("a", { class: "cat-link", href: `#menu/${cat.id}`, text: cat.name });
    const section = h("section", { class: "cat", id: `cat-${cat.id}`, "aria-labelledby": `title-${cat.id}` },
      h("h2", { class: "cat-title reveal", id: `title-${cat.id}`, text: cat.name }),
      cat.note && h("p", { class: "cat-note reveal", text: cat.note }),
      h("ul", { class: "items" }, cat.items.map(renderItem))
    );
    return { cat, link, section };
  });

  nav.replaceChildren(...entries.map((e) => e.link));
  $("#sections").replaceChildren(...entries.map((e) => e.section));

  /* ---------- Barre de catégories : défilement + catégorie active ---------- */

  function scrollToEntry(entry, animate) {
    const compactHeight = head.offsetHeight - (head.classList.contains("is-compact") ? 0 : COMPACT_DELTA);
    const top = entry.section.getBoundingClientRect().top + window.scrollY - compactHeight + 1;
    window.scrollTo({ top: Math.max(0, top), behavior: animate ? smooth() : "auto" });
  }

  entries.forEach((entry) => {
    entry.link.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToEntry(entry, true);
      history.replaceState(null, "", `#menu/${entry.cat.id}`);
    });
  });

  let activeEntry = null;
  function setActive(entry) {
    if (entry === activeEntry) return;
    activeEntry = entry;
    entries.forEach((e) => {
      if (e === entry) e.link.setAttribute("aria-current", "true");
      else e.link.removeAttribute("aria-current");
    });
    nav.scrollTo({
      left: entry.link.offsetLeft - (nav.clientWidth - entry.link.offsetWidth) / 2,
      behavior: smooth(),
    });
  }

  let ticking = false;
  function onScroll() {
    if (ticking || views.menu.hidden) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const y = window.scrollY;
      head.classList.toggle("is-compact", y > 10);

      const line = head.getBoundingClientRect().bottom + 12;
      let current = entries[0];
      for (const e of entries) if (e.section.getBoundingClientRect().top <= line) current = e;
      if (window.innerHeight + y >= document.documentElement.scrollHeight - 2) current = entries[entries.length - 1];
      setActive(current);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  /* ---------- Apparition au scroll ---------- */

  let observer = null;
  function startReveal() {
    if (observer !== null) return;
    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      observer = false;
      return;
    }
    document.documentElement.classList.add("js-reveal");
    observer = new IntersectionObserver((list) => {
      let i = 0;
      for (const entry of list) {
        if (!entry.isIntersecting) continue;
        entry.target.style.transitionDelay = Math.min(i++ * 45, 240) + "ms";
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
    $$(".reveal").forEach((el) => observer.observe(el));
  }

  /* ---------- Bouton « Menu » magnétique (souris uniquement) ---------- */

  const btn = $("#btn-menu");
  const btnWrap = $("#btn-wrap");
  let magnetOn = false;
  let magnetFrame = 0;

  function setMagnet(x, y, scale) {
    magnetOn = x !== 0 || y !== 0;
    cancelAnimationFrame(magnetFrame);
    magnetFrame = requestAnimationFrame(() => {
      btn.style.transform = x || y || scale !== 1 ? `translate3d(${x}px, ${y}px, 0) scale(${scale})` : "";
    });
  }

  views.home.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse" || reduceMotion.matches || !finePointer.matches) return;
    const r = btnWrap.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    if (Math.hypot(dx, dy) < r.width * 0.9) setMagnet(dx * 0.28, dy * 0.38, 1.04);
    else if (magnetOn) setMagnet(0, 0, 1);
  });
  views.home.addEventListener("pointerleave", () => setMagnet(0, 0, 1));

  /* ---------- Navigation : #  →  #menu  →  #menu/burgers ---------- */

  let currentView = null;
  let firstRoute = true;

  function showView(name) {
    if (currentView === name) return false;
    for (const [key, view] of Object.entries(views)) view.hidden = key !== name;
    currentView = name;
    return true;
  }

  function route() {
    const [page, id] = location.hash.replace(/^#\/?/, "").split("/");

    if (page === "menu") {
      const changed = showView("menu");
      document.title = `Menu · ${restaurant.name}`;
      startReveal();
      const target = id && entries.find((e) => e.cat.id === decodeURIComponent(id));
      if (target) scrollToEntry(target, !changed);
      else if (changed) window.scrollTo(0, 0);
      if (changed && !firstRoute) $("#menu-title").focus({ preventScroll: true });
      onScroll();
    } else {
      showView("home");
      document.title = restaurant.name;
      window.scrollTo(0, 0);
      setMagnet(0, 0, 1);
    }
    firstRoute = false;
  }

  window.addEventListener("hashchange", route);
  route();
})();
