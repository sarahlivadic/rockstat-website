// ======================================================
// CASES INFINITE DRAG SLIDER
// ======================================================

document.addEventListener("DOMContentLoaded", () => {
  const marquee = document.querySelector(".cases-marquee");
  const track = document.querySelector(".cases-track");

  console.log("Marquee:", marquee);
  console.log("Track:", track);

  if (!marquee || !track) {
    console.error("Cases slider elementi nisu pronađeni.");
    return;
  }

  if (!track.dataset.cloned) {
    const cards = Array.from(track.children);

    cards.forEach((card) => {
      const clone = card.cloneNode(true);

      clone.setAttribute("aria-hidden", "true");
      clone.setAttribute("tabindex", "-1");

      track.appendChild(clone);
    });

    track.dataset.cloned = "true";
  }

  let position = 0;
  let paused = false;

  function animateSlider() {
    if (!paused) {
      position -= 0.5;

      const loopWidth = track.scrollWidth / 2;

      if (Math.abs(position) >= loopWidth) {
        position = 0;
      }

      track.style.transform = `translate3d(${position}px, 0, 0)`;
    }

    requestAnimationFrame(animateSlider);
  }

  marquee.addEventListener("mouseenter", () => {
    paused = true;
  });

  marquee.addEventListener("mouseleave", () => {
    paused = false;
  });

  animateSlider();
});
