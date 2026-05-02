(function () {
  document.body.classList.add("js");

  const revealTargets = document.querySelectorAll("[data-reveal]");
  const showAllRevealTargets = () => {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  };

  let supportsIntersectionObserver = "IntersectionObserver" in window;

  if (supportsIntersectionObserver) {
    try {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.16, rootMargin: "0px 0px -40px 0px" },
      );

      revealTargets.forEach((target, index) => {
        target.style.transitionDelay = `${Math.min(index * 75, 320)}ms`;
        revealObserver.observe(target);
      });
    } catch (error) {
      supportsIntersectionObserver = false;
      showAllRevealTargets();
    }
  } else {
    showAllRevealTargets();
  }

  const counters = document.querySelectorAll("[data-count]");
  const runCounter = (node) => {
    const target = Number(node.getAttribute("data-count")) || 0;
    const suffix = node.getAttribute("data-suffix") || "";
    const duration = 900;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.round(target * (1 - Math.pow(1 - progress, 3)));
      node.textContent = `${value}${suffix}`;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  if (supportsIntersectionObserver) {
    try {
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runCounter(entry.target);
              counterObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 },
      );

      counters.forEach((counter) => counterObserver.observe(counter));
    } catch (error) {
      counters.forEach((counter) => runCounter(counter));
    }
  } else {
    counters.forEach((counter) => runCounter(counter));
  }

  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);

    window.gsap.from(".hero-copy > *", {
      y: 22,
      opacity: 0,
      duration: 0.68,
      stagger: 0.08,
      ease: "power2.out",
      clearProps: "all",
    });

    window.gsap.from(".hero-media", {
      y: 24,
      opacity: 0,
      duration: 0.82,
      delay: 0.16,
      ease: "power2.out",
      clearProps: "all",
    });

    window.gsap.utils.toArray(".feature-card, .journey-card").forEach((card, index) => {
      window.gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 82%",
        },
        y: 24,
        opacity: 0,
        duration: 0.62,
        delay: (index % 3) * 0.05,
        ease: "power2.out",
      });
    });
  }
})();
