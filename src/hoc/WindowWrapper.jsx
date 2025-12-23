import { useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import useWindowStore from "../store/window";


gsap.registerPlugin(Draggable);

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { windows, focusWindow } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);

    // 🔹 OPEN / CLOSE ANIMATION
useGSAP(() => {
      if (!ref.current) return;

      gsap.to(ref.current, {
        scale: isOpen ? 1 : 0.8,
        opacity: isOpen ? 1 : 0,
        duration: 0.3,
        ease: "power2.out",
        pointerEvents: isOpen ? "auto" : "none",
      });
}, [isOpen]);

    // 🔹 DRAGGING
useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      const [instance] = Draggable.create(el, {
        onPress: () => focusWindow(windowKey),
      });

      return () => instance.kill();
}, []);

useLayoutEffect(()=>{
      const el = ref.current;
      if (!el) return;

      el.style.display = isOpen ? "block" : "none";
},[isOpen])

return (
      <section
        ref={ref}
        style={{ zIndex }}
        className="absolute top-20 left-20"
      >
        <Component {...props} />
      </section>
    );
};

  Wrapped.displayName = `WindowWrapper(${Component.displayName || "Component"})`;

  return Wrapped;
};

export default WindowWrapper;
