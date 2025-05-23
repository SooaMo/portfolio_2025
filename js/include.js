document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll("[data-include]");

  includes.forEach(el => {
    const file = el.getAttribute("data-include");
    if (!file) return;

    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error(`Failed to load: ${file}`);
        return response.text();
      })
      .then(data => {
        el.innerHTML = data;
      })
      .catch(error => {
        console.error(error);
        el.innerHTML = `<!-- Error loading ${file} -->`;
      });
  });
});
