(() => {
  const track = document.getElementById("customerStoriesTrack");
  const dots = Array.from(document.querySelectorAll(".customer-story-dot"));

  if (!track || dots.length === 0) return;

  const setActiveDot = (index) => {
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === index;
      dot.classList.toggle("is-active", active);
      if (active) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  };

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      track.scrollTo({ left: track.clientWidth * index, behavior: "smooth" });
      setActiveDot(index);
    });
  });

  let scrollTimer;
  track.addEventListener("scroll", () => {
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(() => {
      const index = Math.round(track.scrollLeft / track.clientWidth);
      setActiveDot(index);
    }, 80);
  });
})();
