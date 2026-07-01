/* Anding Law Firm — redesign concept interactions */
(function () {
  "use strict";

  /* Current year in footer */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* Sticky header shrink on scroll */
  var header = document.getElementById("siteHeader");
  var onScroll = function () {
    if (!header) return;
    if (window.scrollY > 24) header.classList.add("shrink");
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
  if ("IntersectionObserver" in window && reveals.length) {
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
        note.textContent = "Thank you — your request has been noted. (Demo form: not yet connected.)";
        note.classList.add("success");
      }
      form.reset();
    });
    form.addEventListener("input", function (e) {
      if (e.target.classList.contains("invalid")) e.target.classList.remove("invalid");
    });
  }
})();
