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

  /* Sticky header shrink on scroll */
  var header = document.getElementById("siteHeader");
  var onScroll = function () {
    if (!header) return;
    if (window.scrollY > 20) header.classList.add("shrink");
    else header.classList.remove("shrink");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile nav toggle */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");
  var closeMenu = function () {
    if (!menu || !toggle) return;
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  };
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

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
