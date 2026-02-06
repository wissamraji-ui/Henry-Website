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

const progressBar = document.querySelector(".scroll-progress__bar");
let progressTicking = false;

const updateScrollProgress = () => {
  if (!progressBar) {
    return;
  }

  const scrollTop = window.scrollY;
  const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollRange > 0 ? scrollTop / scrollRange : 0;

  progressBar.style.transform = `scaleX(${progress})`;
  progressTicking = false;
};

const requestProgressUpdate = () => {
  if (progressTicking) {
    return;
  }

  progressTicking = true;
  window.requestAnimationFrame(updateScrollProgress);
};

window.addEventListener("scroll", requestProgressUpdate, { passive: true });
window.addEventListener("resize", requestProgressUpdate);
requestProgressUpdate();

const copyButtons = document.querySelectorAll(".copy-btn");

const fallbackCopyText = (text) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const succeeded = document.execCommand("copy");
  document.body.removeChild(textarea);
  return succeeded;
};

const flashCopiedState = (button) => {
  const originalLabel = button.dataset.originalLabel || button.textContent;
  button.dataset.originalLabel = originalLabel;
  button.textContent = "Copied";
  button.classList.add("is-copied");

  window.setTimeout(() => {
    button.textContent = originalLabel;
    button.classList.remove("is-copied");
  }, 1200);
};

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const textToCopy = button.dataset.copy;
    if (!textToCopy) {
      return;
    }

    let copied = false;

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        copied = true;
      } catch (error) {
        copied = false;
      }
    }

    if (!copied) {
      copied = fallbackCopyText(textToCopy);
    }

    if (copied) {
      flashCopiedState(button);
    }
  });
});
