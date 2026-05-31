document.addEventListener("DOMContentLoaded", () => {
  // 1. Project card filtering + active button highlighting
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');

      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      cards.forEach(card => {
        const type = card.getAttribute('data-type');
        card.style.display = (filter === 'all' || filter === type) ? 'block' : 'none';
      });
    });
  });

  // 2. Email copy functionality
  const email = document.getElementById("email");
  const tooltip = document.getElementById("tooltip");

  if (email && tooltip) {
    email.addEventListener("click", () => {
      const address = email.textContent;
      navigator.clipboard.writeText(address).then(() => {
        tooltip.style.opacity = "1";
        setTimeout(() => {
          tooltip.style.opacity = "0";
        }, 2000);
      });
    });
  }

  // 3. Back to top button show/hide
  const backToTopBtn = document.getElementById("backToTopBtn");

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      const shouldShow = document.body.scrollTop > 200 || document.documentElement.scrollTop > 200;
      backToTopBtn.style.display = shouldShow ? "flex" : "none";
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 4. Image modal (zoom, desktop only)
  const galleryImages = document.querySelectorAll(".project-img");

  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      if (window.innerWidth <= 767) return;

      const src = img.src;
      const modalImage = document.getElementById("modalImage");
      const modalEl = document.getElementById("imageModal");

      if (modalImage && modalEl) {
        modalImage.src = src;
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
      }
    });
  });


// 5. Cursor effect — rotating box + split corners on hover
const cursorDot     = document.getElementById("cursor-dot");
const cursorBox     = document.getElementById("cursor-box");
const cursorCorners = document.getElementById("cursor-corners");

if (cursorDot && cursorBox && cursorCorners && window.innerWidth >= 768) {
  let mouseX = 0, mouseY = 0;
  let rotation = 0;
  let isHovering = false;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    // dot — 항상 정확히 따라옴
    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top  = mouseY + "px";

    // box — hover 아닐 때 회전
    cursorBox.style.left = mouseX + "px";
    cursorBox.style.top  = mouseY + "px";
    if (!isHovering) {
      rotation = (rotation + 1.2) % 360;
      cursorBox.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
    }

    // corners — hover 시 위치
    cursorCorners.style.left = mouseX + "px";
    cursorCorners.style.top  = mouseY + "px";

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  const hoverableElements = document.querySelectorAll('a, button, [role="button"], .project-img, .filter-btn, .copy-email');

  hoverableElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      isHovering = true;
      cursorBox.classList.add("is-hovering");
      cursorCorners.classList.add("is-hovering");
      cursorDot.classList.add("is-hovering");
    });

    el.addEventListener("mouseleave", () => {
      isHovering = false;
      cursorBox.classList.remove("is-hovering");
      cursorCorners.classList.remove("is-hovering");
      cursorDot.classList.remove("is-hovering");
    });
  });

  // iframe 위에서 커서 숨김
  document.querySelectorAll(".no-cursor").forEach((iframe) => {
    iframe.addEventListener("mouseenter", () => {
      cursorDot.style.opacity = "0";
      cursorBox.style.opacity = "0";
      cursorCorners.style.opacity = "0";
    });
    iframe.addEventListener("mouseleave", () => {
      cursorDot.style.opacity = "1";
      cursorBox.style.opacity = "";
      cursorCorners.style.opacity = "";
    });
  });
}



});