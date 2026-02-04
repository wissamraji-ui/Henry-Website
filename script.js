const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));

const themeButtons = document.querySelectorAll("[data-theme-value]");
const storedTheme = localStorage.getItem("theme") || "auto";

const applyTheme = (value) => {
  if (value === "auto") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", value);
  }

  localStorage.setItem("theme", value);

  themeButtons.forEach((button) => {
    const isActive = button.dataset.themeValue === value;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
};

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyTheme(button.dataset.themeValue);
  });
});

applyTheme(storedTheme);
