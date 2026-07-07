// =========================================================
// Pronab Samanta — Portfolio JS
// Loader, mobile nav, header state, scroll-reveal, active link, back-to-top
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");
  const navToggle = document.getElementById("navToggle");
  const navMobile = document.getElementById("navMobile");
  const backToTop = document.getElementById("backToTop");
  const yearEl = document.getElementById("year");
  const loader = document.getElementById("cf-loader");

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Page loader ----
  if (loader) {
    const start = Date.now();
    const MIN_TIME = 1400;

    const hideLoader = () => {
      const elapsed = Date.now() - start;
      setTimeout(
        () => {
          loader.classList.add("hide");
        },
        Math.max(0, MIN_TIME - elapsed),
      );
    };

    if (document.readyState === "complete") {
      hideLoader();
    } else {
      window.addEventListener("load", hideLoader);
    }
  }

  // ---- Mobile nav toggle ----
  if (navToggle && navMobile) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMobile.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.classList.toggle("open", isOpen);
    });

    navMobile.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMobile.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- Header shadow / back-to-top on scroll ----
  const onScroll = () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 12);
    if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 500);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ---- Scroll-reveal ----
  const revealTargets = document.querySelectorAll(
    ".section .card, .section .eyebrow, .section-title, .gitlog-item, .contact-card",
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  // ---- Active nav link on scroll ----
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const setActiveLink = () => {
    let currentId = "";
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${currentId}`,
      );
    });
  };

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();
});
