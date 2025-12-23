import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/* ------------------ FONT CONFIG ------------------ */
const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 900, base: 100 },
  title: { min: 300, max: 900, base: 400 },
};

/* ------------------ TEXT SPLITTER ------------------ */
const renderText = (text, baseWeight = 400) => {
  return (
    <span className="inline-flex">
      {text.split("").map((char, index) => (
        <span
          key={index}
          data-letter
          style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

/* ------------------ HOVER LOGIC ------------------ */
const setupTextHover = (container, type) => {
  if (!container) return () => {};

  const letters = container.querySelectorAll("[data-letter]");
  const { min, max, base } = FONT_WEIGHTS[type];

  const animateLetter = (letter, weight, duration = 0.25) => {
    gsap.to(letter, {
      fontVariationSettings: `'wght' ${weight}`,
      duration,
      ease: "power2.out",
    });
  };

  const handleMouseMove = (e) => {
    const bounds = container.getBoundingClientRect();
    const mouseX = e.clientX;

    letters.forEach((letter) => {
      const rect = letter.getBoundingClientRect();
      const letterCenter =
        rect.left - bounds.left + rect.width / 2;

      const distance = Math.abs(mouseX - letterCenter);
      const intensity = Math.exp(-(distance ** 2) / 2000);

      const weight = min + (max - min) * intensity;
      animateLetter(letter, weight);
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      animateLetter(letter, base, 0.5);
    });
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

/* ------------------ COMPONENT ------------------ */
const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const titleCleanup = setupTextHover(titleRef.current, "title");
    const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle");

    return () => {
      titleCleanup();
      subtitleCleanup();
    };
  }, []);

  return (
    <section id="welcome">
      <p
        ref={subtitleRef}
        className="text-3xl font-georama"
      >
        {renderText("Hey, I'm Dinesh! Welcome to my", 100)}
      </p>

      <h1
        ref={titleRef}
        className="mt-7 text-7xl italic font-georama"
      >
        {renderText("portfolio", 400)}
      </h1>

      <div className="small-screen">
        <p>This portfolio is designed for desktop/tablet screens only.</p>
      </div>
    </section>
  );
};

export default Welcome;
