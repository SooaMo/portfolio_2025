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

  // 5. Cursor effect (glow + sharp on links)
  const cursorEffect = document.getElementById("cursor-effect");

  if (cursorEffect && window.innerWidth >= 768) {
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animate() {
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;

      const offset = cursorEffect.classList.contains("sharp") ? 10 : 35;
cursorEffect.style.transform = `translate(${currentX - offset}px, ${currentY - offset}px)`;

      requestAnimationFrame(animate);
    }

    animate();

    // Apply .sharp on all elements with rendered cursor: pointer
    const allElements = document.querySelectorAll("*");

allElements.forEach(el => {
  const computed = window.getComputedStyle(el);
  const isPointer = computed.cursor === "pointer";
  const isGalleryImg = el.classList.contains("gallery-img");

  if (isPointer || isGalleryImg) {
    el.addEventListener("mouseenter", () => {
      cursorEffect.classList.add("sharp");
    });
    el.addEventListener("mouseleave", () => {
      cursorEffect.classList.remove("sharp");
    });
  }
});

  }
});
