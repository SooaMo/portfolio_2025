document.addEventListener("DOMContentLoaded", () => {
  // 1. Back to top
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    const toggle = () => {
      backToTopBtn.style.display = window.scrollY > 200 ? "flex" : "none";
    };
    window.addEventListener("scroll", toggle, { passive: true });
    toggle();
    backToTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // 2. Image modal (zoom, desktop only)
  document.querySelectorAll(".project-img").forEach((img) => {
    img.addEventListener("click", () => {
      if (window.innerWidth <= 767) return;
      const modalImage = document.getElementById("modalImage");
      const modalEl = document.getElementById("imageModal");
      if (modalImage && modalEl && window.bootstrap) {
        modalImage.src = img.src;
        new bootstrap.Modal(modalEl).show();
      }
    });
  });

  // 3. Email copy button
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", () => {
      navigator.clipboard.writeText(btn.dataset.copy).then(() => {
        const label = btn.textContent;
        btn.textContent = "Copied ✓";
        setTimeout(() => (btn.textContent = label), 1600);
      });
    });
  });

  // 4. Scroll reveal
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  // 5. Cursor effect — 3-layer trailing cursor
  const cursorDot  = document.getElementById("cursor-dot");
  const cursorBox  = document.getElementById("cursor-box");
  const cursorFill = document.getElementById("cursor-fill");
  const finePointer = window.matchMedia("(hover: hover) and (min-width: 768px)").matches;

  if (cursorDot && cursorBox && cursorFill && finePointer) {
    let mouseX = 0, mouseY = 0, fillX = 0, fillY = 0, dotX = 0, dotY = 0, rotation = 0;
    let target = null;
    const PAD = 6; // bracket frame padding around the hovered element

    // Corner brackets [ ] inside the fill box
    ["tl", "tr", "bl", "br"].forEach((c) => {
      const s = document.createElement("span");
      s.className = "cursor-corner " + c;
      cursorFill.appendChild(s);
    });

    document.addEventListener("mousemove", (e) => { mouseX = e.clientX; mouseY = e.clientY; });

    const applyHover = () => {
      document.body.classList.toggle("cursor-snap", !!target);
      document.body.classList.toggle("cursor-on-dark",
        !!(target && target.closest(".hero-tile, .contact-tile, .proj-takeaway, .proj-header, .site-nav-resume, .proj-next")));
      if (!target) {
        cursorFill.style.width = "22px";
        cursorFill.style.height = "22px";
      }
    };

    (function animateCursor() {
      cursorBox.style.left = mouseX + "px";
      cursorBox.style.top  = mouseY + "px";
      if (!target) rotation = (rotation + 1.2) % 360;
      cursorBox.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
      if (target && target.isConnected) {
        const r = target.getBoundingClientRect();
        fillX += (r.left + r.width / 2 - fillX) * 0.25;
        fillY += (r.top + r.height / 2 - fillY) * 0.25;
        cursorFill.style.width  = r.width  + PAD * 2 + "px";
        cursorFill.style.height = r.height + PAD * 2 + "px";
      } else {
        fillX += (mouseX - fillX) * 0.15;
        fillY += (mouseY - fillY) * 0.15;
      }
      cursorFill.style.left = fillX + "px";
      cursorFill.style.top  = fillY + "px";
      dotX += (mouseX - dotX) * 0.08;
      dotY += (mouseY - dotY) * 0.08;
      cursorDot.style.left = dotX + "px";
      cursorDot.style.top  = dotY + "px";
      requestAnimationFrame(animateCursor);
    })();

    // Delegated so it also works on navbar/footer loaded later by include.js
    const HOVERABLE = 'a, button, [role="button"], .project-img';
    document.addEventListener("mouseover", (e) => {
      const t = e.target.closest(HOVERABLE);
      if (t !== target) { target = t; applyHover(); }
    });

    // Hide cursor over iframes
    document.querySelectorAll(".no-cursor").forEach((iframe) => {
      iframe.addEventListener("mouseenter", () => {
        [cursorDot, cursorBox, cursorFill].forEach((el) => (el.style.opacity = "0"));
      });
      iframe.addEventListener("mouseleave", () => {
        [cursorDot, cursorBox, cursorFill].forEach((el) => (el.style.opacity = ""));
        target = null;
        applyHover();
      });
    });
  }
});
