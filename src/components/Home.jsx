import { locations } from "#constants";
import clsx from "clsx";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";

import useWindowStore from "#store/window";
import useLocationStore from "#store/location";

const projects = locations.work?.children ?? [];

const Home = () => {
  const { openWindow } = useWindowStore();
  const { setActiveLocation } = useLocationStore();

  const handleOpenProjectFinder = (project) => {
    setActiveLocation(project);
    openWindow("finder");
  };

  useGSAP(() => {
    Draggable.create(".folder", {
      bounds: "body",
      inertia: true,
    });
  }, []);

  return (
    <section id="home" className="relative w-full h-screen">
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className={clsx(
              "group folder absolute flex flex-col items-center gap-1 cursor-pointer select-none",
              project.windowPosition
            )}
            onDoubleClick={() => handleOpenProjectFinder(project)}
          >
            <img
              src="/images/folder.png"
              alt={project.name}
              className="w-16 h-16"
              draggable={false}
            />
            <p className="text-xs text-white text-center group-hover:bg-blue-600 px-2 rounded">
              {project.name}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
