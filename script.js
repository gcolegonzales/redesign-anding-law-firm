/* Anding Law Firm — redesign concept interactions */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Current year in footer */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* Stagger hero reveals */
  var heroReveals = document.querySelectorAll(".hero .reveal");
  heroReveals.forEach(function (el, i) { el.style.setProperty("--i", String(i)); });

  /* Mobile nav toggle */
  var header = document.getElementById("siteHeader");
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");
  var drawer = document.getElementById("navDrawer");
  var scrim = document.getElementById("navScrim");

  var openMenu = function () {
    if (!drawer || !toggle) return;
    drawer.classList.add("open");
    if (menu) menu.classList.add("is-open");
    if (scrim) scrim.classList.add("is-open");
    toggle.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    if (header) header.classList.add("nav-open");
  };
  var closeMenu = function () {
    if (!drawer || !toggle) return;
    drawer.classList.remove("open");
    if (menu) menu.classList.remove("is-open");
    if (scrim) scrim.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    if (header) header.classList.remove("nav-open");
  };
  if (toggle && drawer) {
    toggle.addEventListener("click", function () {
      if (drawer.classList.contains("open")) closeMenu();
      else openMenu();
    });
    if (menu) {
      menu.addEventListener("click", function (e) {
        if (e.target.closest("a")) closeMenu();
      });
    }
    if (scrim) scrim.addEventListener("click", closeMenu);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* Sticky header: shrink after a little scroll; hide on scroll-down,
     reveal on ANY upward scroll (even a few px). */
  var lastY = window.scrollY || window.pageYOffset || 0;
  var onScroll = function () {
    if (!header) return;
    var y = window.scrollY || window.pageYOffset || 0;
    if (y > 20) header.classList.add("shrink");
    else header.classList.remove("shrink");

    if (!drawer || !drawer.classList.contains("open")) {
      if (y > lastY && y > 120) {
        header.classList.add("hide");     // scrolling down, past the header
      } else if (y < lastY) {
        header.classList.remove("hide");  // any upward scroll reveals it
      }
    }
    lastY = y;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Scroll-reveal via IntersectionObserver */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Count-up for credential numbers (skips items marked data-plain, e.g. a year) */
  var counters = document.querySelectorAll(".cred-num[data-count]:not([data-plain])");
  var runCount = function (el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (isNaN(target)) return;
    if (reduceMotion) { el.textContent = String(target); return; }
    var start = null, dur = 1100;
    var step = function (ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = String(target);
    };
    requestAnimationFrame(step);
  };
  if (counters.length) {
    if ("IntersectionObserver" in window && !reduceMotion) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { runCount(entry.target); cio.unobserve(entry.target); }
        });
      }, { threshold: 0.6 });
      counters.forEach(function (el) { cio.observe(el); });
    } else {
      counters.forEach(function (el) { el.textContent = el.getAttribute("data-count"); });
    }
  }

  /* Consultation form — styled, non-wired. Validates and shows confirmation. */
  var form = document.getElementById("consultForm");
  var note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var required = form.querySelectorAll("[required]");
      var firstInvalid = null;
      required.forEach(function (el) {
        var ok = el.value && el.value.trim() !== "";
        if (el.type === "email") ok = ok && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value);
        el.classList.toggle("invalid", !ok);
        if (!ok && !firstInvalid) firstInvalid = el;
      });
      if (firstInvalid) {
        firstInvalid.focus();
        if (note) {
          note.textContent = "Please complete the highlighted fields.";
          note.classList.remove("success");
        }
        return;
      }
      if (note) {
        note.textContent = "Thank you — your request has been received. George will reach out shortly. (Demo form: not yet connected.)";
        note.classList.add("success");
      }
      form.reset();
    });
    form.addEventListener("input", function (e) {
      if (e.target.classList.contains("invalid")) e.target.classList.remove("invalid");
    });
  }
})();
