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


// 5. Cursor effect — 3-layer trailing cursor
const cursorDot  = document.getElementById("cursor-dot");
const cursorBox  = document.getElementById("cursor-box");
const cursorFill = document.getElementById("cursor-fill");

if (cursorDot && cursorBox && cursorFill && window.innerWidth >= 768) {
  let mouseX = 0, mouseY = 0;
  // box2(fill): 천천히 따라오는 박스
  let fillX = 0, fillY = 0;
  // dot: 더 느리게 따라오는 점
  let dotX = 0, dotY = 0;
  let rotation = 0;
  let isHovering = false;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function applyHover() {
    if (isHovering) {
      cursorFill.style.background = "#3e6658";
      cursorFill.style.borderColor = "#3e6658";
      cursorFill.style.width = "30px";
      cursorFill.style.height = "30px";
      cursorDot.style.background = "#ffffff";
    } else {
      cursorFill.style.background = "transparent";
      cursorFill.style.borderColor = "#658D7F";
      cursorFill.style.width = "22px";
      cursorFill.style.height = "22px";
      cursorDot.style.background = "#658D7F";
    }
  }

  function animateCursor() {
    // 네모1: 마우스 위치에 정확히 + 회전
    cursorBox.style.left = mouseX + "px";
    cursorBox.style.top  = mouseY + "px";
    rotation = (rotation + 1.2) % 360;
    cursorBox.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;

    // 네모2: 천천히 따라옴 (easing 0.15)
    fillX += (mouseX - fillX) * 0.15;
    fillY += (mouseY - fillY) * 0.15;
    cursorFill.style.left = fillX + "px";
    cursorFill.style.top  = fillY + "px";

    // 점: 더 느리게 따라옴 (easing 0.08)
    dotX += (mouseX - dotX) * 0.08;
    dotY += (mouseY - dotY) * 0.08;
    cursorDot.style.left = dotX + "px";
    cursorDot.style.top  = dotY + "px";

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  const hoverableElements = document.querySelectorAll('a, button, [role="button"], .project-img, .filter-btn, .copy-email');

  hoverableElements.forEach((el) => {
    el.addEventListener("mouseenter", () => { isHovering = true;  applyHover(); });
    el.addEventListener("mouseleave", () => { isHovering = false; applyHover(); });
  });

  // iframe 위에서 커서 숨김
  document.querySelectorAll(".no-cursor").forEach((iframe) => {
    iframe.addEventListener("mouseenter", () => {
      cursorDot.style.opacity  = "0";
      cursorBox.style.opacity  = "0";
      cursorFill.style.opacity = "0";
    });
    iframe.addEventListener("mouseleave", () => {
      cursorDot.style.opacity  = "1";
      cursorBox.style.opacity  = "1";
      cursorFill.style.opacity = "1";
      applyHover();
    });
  });
}



});