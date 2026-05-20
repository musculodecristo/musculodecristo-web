/*
  Small interaction layer:
  - reveals sections as they enter the viewport
  - hides broken logo images while keeping clear text fallbacks visible
*/

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

document.querySelectorAll("img").forEach((image) => {
  const markMissingImage = () => {
    const fallbackParent = image.closest(".brand-mark__image-wrap, .hero__logo, .site-footer__brand");

    if (fallbackParent) {
      fallbackParent.classList.add("is-missing");
    }
  };

  image.addEventListener("error", markMissingImage);

  if (image.complete && image.naturalWidth === 0) {
    markMissingImage();
  }
});
