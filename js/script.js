// project card functionlity
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');

    cards.forEach(card => {
      const type = card.getAttribute('data-type');
      if (filter === 'all' || filter === type) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});



// Email copy functionality
const email = document.getElementById("email");
const tooltip = document.getElementById("tooltip");

email.addEventListener("click", () => {
  const address = email.textContent;
  navigator.clipboard.writeText(address).then(() => {
    tooltip.style.opacity = "1";
    setTimeout(() => {
      tooltip.style.opacity = "0";
    }, 2000);
  });
});

// Show or hide the back to top button
const backToTopBtn = document.getElementById("backToTopBtn");

window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    backToTopBtn.style.display = "flex";
  } else {
    backToTopBtn.style.display = "none";
  }
});

// Scroll to top on click
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
