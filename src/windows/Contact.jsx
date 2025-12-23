import WindowWrapper from "#hoc/WindowWrapper";
import { socials } from "#constants";
import WindowControls from "../components/WindowControls";

const Contact = () => {
  return (
    <div className="rounded-xl overflow-hidden bg-white">
      {/* Window Header */}
      <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact Me</h2>
      </div>

      {/* Content */}
      <div className="p-5 space-y-5">
        <img
          src="/images/dinesh.png"
          alt="dinesh"
          className="w-20 rounded-full"
        />

        <h3>Let's Connect</h3>

        <p>
          Got an idea? A bug to squash? Or just wanna talk tech? I’m in.
        </p>

        <ul className="flex gap-3 ">
          {socials.map(({ id, bg, link, icon, text }) => (
            <li key={id}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                title={text}
                className="flex items-center gap-2 p-3 rounded-lg text-white"
                style={{ backgroundColor: bg }}
              >
                <img src={icon} alt={text} className="size-5" />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


const ContactWindow = WindowWrapper(Contact, "contact");

export default ContactWindow;
