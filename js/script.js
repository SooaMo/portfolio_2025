document.addEventListener("DOMContentLoaded", () => {
  // 1. Project card filtering + active button highlighting
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');

      // Remove "active" class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));

      // Add "active" class to the clicked button
      button.classList.add('active');

      // Filter the project cards based on the selected type
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

    // Scroll to top
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

  }

  // 4. Gallery toggle "More"/"Less"
  const toggleBtn = document.getElementById("toggleGalleryBtn");
  const extraItems = document.querySelectorAll(".gallery-extra");
  let isExpanded = false;

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      isExpanded = !isExpanded;
      extraItems.forEach(item => item.classList.toggle("d-none"));
      toggleBtn.textContent = isExpanded ? "Less" : "More";
    });
  }

  // 5. Image modal (zoom)
  const galleryImages = document.querySelectorAll(".gallery-img");

  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
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
});
