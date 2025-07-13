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
  const galleryImages = document.querySelectorAll(".gallery-img");

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


// 5. Cursor effect (dot + blur following glow + spin)
const cursorDot = document.getElementById("cursor-dot");
const cursorEffect = document.getElementById("cursor-effect");

let rotation = 0;
let isRotating = false;

if (cursorDot && cursorEffect && window.innerWidth >= 768) {
  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    const transformBase = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
    cursorDot.style.transform = isRotating
      ? `${transformBase} rotate(${rotation}deg)`
      : transformBase;

    currentX += (mouseX - currentX) * 0.25;
    currentY += (mouseY - currentY) * 0.25;
    cursorEffect.style.transform = `translate(${currentX - 25}px, ${currentY - 25}px)`;

    if (isRotating) {
      rotation += 4;
      if (rotation >= 360) rotation -= 360;
    }

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Elements to trigger hover effect
  const hoverableElements = document.querySelectorAll('a, button, [role="button"], .gallery-img, .filter-btn, .copy-email ');

  hoverableElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorDot.classList.add("sharp");
      cursorEffect.classList.add("sharp");
      isRotating = true;
    });

    el.addEventListener("mouseleave", () => {
      cursorDot.classList.remove("sharp");
      cursorEffect.classList.remove("sharp");
      isRotating = false;
      rotation = 0;
      cursorDot.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
    });
  });
}

const iframes = document.querySelectorAll(".no-cursor");

iframes.forEach((iframe) => {
  iframe.addEventListener("mouseenter", () => {
    cursorDot.style.opacity = "0";
    cursorEffect.style.opacity = "0";
  });

  iframe.addEventListener("mouseleave", () => {
    cursorDot.style.opacity = "1";
    cursorEffect.style.opacity = "1";
  });
});



});
