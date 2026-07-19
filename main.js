/* =========================================================
   HORIZON DIGITAL — Interações
   ========================================================= */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Micro-animações específicas por serviço (hover na foto) ---------- */
  (function serviceParticles() {
    if (prefersReducedMotion) return;

    var glyphs = {
      visa: ["$", "€", "£", "₿"],
      importacao: ["▢", "✈", "⛴", "▤"],
      trafego: ["▲", "◆", "%", "▮"],
      design: ["✎", "◆", "▧", "✦"],
      sites: ["</>", "{ }", "▮", "▤"]
    };

    document.querySelectorAll(".service-block[data-particle]").forEach(function (block) {
      var type = block.getAttribute("data-particle");
      var head = block.querySelector(".service-block-head");
      if (!head || !glyphs[type]) return;

      var layer = document.createElement("div");
      layer.className = "particle-layer";
      layer.setAttribute("aria-hidden", "true");
      block.style.position = "relative";
      block.insertBefore(layer, block.firstChild);

      var interval = null;

      function spawn() {
        var glyph = glyphs[type][Math.floor(Math.random() * glyphs[type].length)];
        var el = document.createElement("span");
        el.className = "service-particle";
        el.textContent = glyph;
        el.style.left = (10 + Math.random() * 80) + "%";
        el.style.fontSize = (14 + Math.random() * 10) + "px";
        el.style.fontFamily = "var(--font-display)";
        el.style.fontWeight = "700";
        layer.appendChild(el);
        setTimeout(function () { el.remove(); }, 1900);
      }

      block.addEventListener("mouseenter", function () {
        spawn();
        interval = setInterval(spawn, 260);
      });
      block.addEventListener("mouseleave", function () {
        clearInterval(interval);
      });
    });
  })();

  /* ---------- Scroll suave (Lenis) ---------- */
  (function smoothScroll() {
    if (prefersReducedMotion || typeof window.Lenis === "undefined") return;
    var lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  })();

  /* ---------- Tema claro/escuro ---------- */
  (function themeToggle() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    var STORAGE_KEY = "horizon-theme";
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (saved === "light") document.documentElement.setAttribute("data-theme", "light");

    btn.addEventListener("click", function () {
      var isLight = document.documentElement.getAttribute("data-theme") === "light";
      if (isLight) {
        document.documentElement.removeAttribute("data-theme");
        try { localStorage.setItem(STORAGE_KEY, "dark"); } catch (e) {}
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        try { localStorage.setItem(STORAGE_KEY, "light"); } catch (e) {}
      }
    });
  })();

  /* ---------- Notificações toast ---------- */
  function showToast(message, iconSvg) {
    var container = document.getElementById("toast-container");
    if (!container) return;
    var toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = (iconSvg || "") + "<span>" + message + "</span>";
    container.appendChild(toast);
    requestAnimationFrame(function () { toast.classList.add("is-visible"); });
    setTimeout(function () {
      toast.classList.remove("is-visible");
      setTimeout(function () { toast.remove(); }, 350);
    }, 2600);
  }

  /* ---------- Voltar ao topo ---------- */
  (function backToTop() {
    var btn = document.getElementById("back-to-top");
    if (!btn) return;
    window.addEventListener("scroll", function () {
      if (window.scrollY > 600) btn.classList.add("is-visible");
      else btn.classList.remove("is-visible");
    }, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  })();

  /* ---------- Copiar contacto ---------- */
  (function copyContact() {
    var btn = document.getElementById("copy-contact-btn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var text = "Horizon Digital\nWhatsApp: 924 122 757\nEmail: horizondigitao@gmail.com";
      function done() { showToast("Contacto copiado com sucesso."); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () {
          showToast("Não foi possível copiar automaticamente.");
        });
      } else {
        showToast("Não foi possível copiar automaticamente.");
      }
    });
  })();

  /* ---------- Partilhar ---------- */
  (function shareSite() {
    var btn = document.getElementById("share-btn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var shareData = {
        title: "Horizon Digital",
        text: "Cartões Visa, Importação, Streaming, Tráfego Pago, Sites e Design Digital.",
        url: window.location.href
      };
      if (navigator.share) {
        navigator.share(shareData).catch(function () {});
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareData.url).then(function () {
          showToast("Link copiado — já podes partilhar.");
        });
      } else {
        showToast("Copia o link na barra de endereço para partilhar.");
      }
    });
  })();

  /* ---------- Toast ao clicar em qualquer link do WhatsApp ---------- */
  (function whatsappToast() {
    var waLinks = document.querySelectorAll('a[href*="wa.me"]');
    var checkIcon = '<svg class="toast-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="20 6 9 17 4 12"/></svg>';
    waLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        showToast("A abrir o WhatsApp...", checkIcon);
      });
    });
  })();

  /* ---------- Filtros de pesquisa por categoria ---------- */
  (function searchFilters() {
    var chips = document.querySelectorAll(".filter-chip");
    if (!chips.length) return;
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("is-active"); });
        chip.classList.add("is-active");
        var filter = chip.getAttribute("data-filter");
        if (filter === "todos") {
          document.querySelectorAll("[data-service]").forEach(function (el) {
            el.style.display = "";
          });
          return;
        }
        document.querySelectorAll("[data-service]").forEach(function (el) {
          el.style.display = el.getAttribute("data-service") === filter ? "" : "none";
        });
        var target = document.getElementById(
          filter === "visa" ? "cartoes-visa" :
          filter === "sites" ? "criacao-sites" :
          filter === "importacao" ? "importacao" :
          filter === "mentoria" ? "mentoria" : filter
        );
        if (target) target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
      });
    });
  })();

  /* ---------- Ano no rodapé ---------- */
  var anoEl = document.getElementById("ano-atual");
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  /* ---------- Título do hero: entrada letra por letra ---------- */
  (function heroTitle() {
    var el = document.getElementById("hero-title");
    if (!el) return;
    var text = "Transformamos ideias em soluções digitais.";
    if (prefersReducedMotion) {
      el.textContent = text;
      return;
    }
    var frag = document.createDocumentFragment();
    var delay = 0;
    text.split("").forEach(function (ch) {
      var span = document.createElement("span");
      span.className = "char";
      span.style.animationDelay = delay + "ms";
      span.textContent = ch === " " ? "\u00A0" : ch;
      frag.appendChild(span);
      delay += 18;
    });
    el.appendChild(frag);
  })();

  /* ---------- Botões com atraso na entrada do hero ---------- */
  (function heroButtonsDelay() {
    var actions = document.querySelector(".hero-actions");
    if (actions && !prefersReducedMotion) {
      actions.style.transitionDelay = "0.5s";
    }
    var search = document.querySelector(".hero-search");
    if (search && !prefersReducedMotion) {
      search.style.transitionDelay = "0.65s";
    }
  })();

  /* ---------- Scroll reveal (fade + slide) ---------- */
  (function scrollReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || prefersReducedMotion) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach(function (el) { io.observe(el); });
  })();

  /* ---------- Contadores animados ---------- */
  (function counters() {
    var counters = document.querySelectorAll(".stat-number");
    if (!counters.length) return;

    function animateCounter(el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      var suffix = el.getAttribute("data-suffix") || "";
      if (prefersReducedMotion) {
        el.textContent = target + suffix;
        return;
      }
      var duration = 1600;
      var start = null;

      function step(timestamp) {
        if (!start) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(step);
    }

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCounter);
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) { io.observe(el); });
  })();

  /* ---------- FAQ acordeão ---------- */
  (function faq() {
    var questions = document.querySelectorAll(".faq-question");
    questions.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest(".faq-item");
        var isOpen = item.classList.contains("is-open");

        document.querySelectorAll(".faq-item.is-open").forEach(function (openItem) {
          openItem.classList.remove("is-open");
          openItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        });

        if (!isOpen) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  })();

  /* ---------- Menu mobile ---------- */
  (function navToggle() {
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("main-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open");
      nav.style.display = expanded ? "none" : "flex";
      if (!expanded) {
        nav.style.position = "absolute";
        nav.style.top = "100%";
        nav.style.left = "0";
        nav.style.right = "0";
        nav.style.flexDirection = "column";
        nav.style.background = "rgba(11,61,46,0.98)";
        nav.style.padding = "1.2rem 1.5rem";
        nav.style.gap = "1rem";
      }
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 900) {
          nav.style.display = "none";
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  })();

  /* ---------- WhatsApp flutuante com menu de serviços ---------- */
  (function waMenu() {
    var btn = document.getElementById("wa-float-btn");
    var menu = document.getElementById("wa-menu");
    if (!btn || !menu) return;
    btn.addEventListener("click", function () {
      var isHidden = menu.hasAttribute("hidden");
      if (isHidden) {
        menu.removeAttribute("hidden");
        btn.setAttribute("aria-expanded", "true");
      } else {
        menu.setAttribute("hidden", "");
        btn.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("click", function (e) {
      if (!menu.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
        menu.setAttribute("hidden", "");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  })();

  /* ---------- Pesquisa inteligente ---------- */
  (function search() {
    var input = document.getElementById("search-input");
    var results = document.getElementById("search-results");
    if (!input || !results) return;

    var index = [
      { label: "Cartões Visa Digitais", href: "#cartoes-visa", terms: ["visa", "cartao", "cartão", "bybit", "pexx", "jeton", "redotpay"] },
      { label: "Streaming — Netflix, Disney+, HBO, Spotify...", href: "#streaming", terms: ["streaming", "netflix", "disney", "hbo", "spotify", "prime", "youtube"] },
      { label: "Tráfego Pago", href: "#trafego-pago", terms: ["trafego", "tráfego", "anuncios", "anúncios", "publicidade", "ads"] },
      { label: "Criação de Sites", href: "#criacao-sites", terms: ["site", "sites", "landing", "página", "pagina"] },
      { label: "Design Digital", href: "#design-digital", terms: ["design", "flyer", "curriculo", "currículo", "carta"] },
      { label: "Importação — Alibaba, SHEIN, Temu...", href: "#importacao", terms: ["importacao", "importação", "alibaba", "shein", "temu", "aliexpress", "ebay", "vinted", "1688"] },
      { label: "Mentoria de Importação", href: "#mentoria", terms: ["mentoria", "aprender", "negocio", "negócio", "curso"] }
    ];

    function renderResults(query) {
      var q = query.trim().toLowerCase();
      if (!q) {
        results.hidden = true;
        results.innerHTML = "";
        return;
      }
      var matches = index.filter(function (item) {
        return item.terms.some(function (t) { return t.indexOf(q) !== -1 || q.indexOf(t) !== -1; }) ||
               item.label.toLowerCase().indexOf(q) !== -1;
      });
      results.innerHTML = "";
      if (!matches.length) {
        var empty = document.createElement("div");
        empty.className = "no-results";
        empty.textContent = "Nenhum resultado. Fala connosco no WhatsApp.";
        results.appendChild(empty);
      } else {
        matches.forEach(function (item) {
          var a = document.createElement("a");
          a.href = item.href;
          a.textContent = item.label;
          results.appendChild(a);
        });
      }
      results.hidden = false;
    }

    input.addEventListener("input", function () { renderResults(input.value); });
    input.addEventListener("focus", function () { if (input.value) renderResults(input.value); });
    document.addEventListener("click", function (e) {
      if (!results.contains(e.target) && e.target !== input) results.hidden = true;
    });
    results.addEventListener("click", function (e) {
      if (e.target.tagName === "A") results.hidden = true;
    });
  })();

  /* ---------- Fundo com partículas digitais no Hero ---------- */
  (function particles() {
    var canvas = document.getElementById("hero-canvas");
    if (!canvas || prefersReducedMotion) return;
    var ctx = canvas.getContext("2d");
    var w, h, particles;
    var COUNT = window.innerWidth < 700 ? 34 : 60;

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }

    function makeParticles() {
      particles = [];
      for (var i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.6 + 0.6
        });
      }
    }

    function tick() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(212,175,55,0.55)";
        ctx.fill();

        for (var j = i + 1; j < particles.length; j++) {
          var q = particles[j];
          var dx = p.x - q.x, dy = p.y - q.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = "rgba(20,92,69," + (1 - dist / 120) * 0.5 + ")";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(tick);
    }

    window.addEventListener("resize", function () { resize(); makeParticles(); });
    resize();
    makeParticles();
    tick();
  })();
})();
