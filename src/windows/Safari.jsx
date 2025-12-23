import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { ChevronLeft, ChevronRight, ShieldHalf, Search, Share, Plus, Copy } from "lucide-react";
import { blogPosts } from "#constants";
import WindowControls from "../components/WindowControls";

const Safari = () => {
  return (
    <div id="safari">
      <div id="window-header">
        <WindowControls target="safari"/>
        <div className="flex items-center gap-5">
          <Share className="icon" />
          <Plus className="icon" />
          <Copy className="icon" />
        </div>

        <div className="search">
          <ShieldHalf className="icon" />
          <Search className="icon" />
          <input
            type="text"
            placeholder="Search or enter website name"
            className="flex-1 outline-none text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <ChevronLeft className="icon" />
          <ChevronRight className="icon" />
        </div>
      </div>

      {/* Content */}
      <div className="blog">
        <h2>My Developer Blog</h2>

        <div className="space-y-8">
          {blogPosts.map(({ id, image, title, date, link }) => (
            <div key={id} className="blog-post">
              <img src={image} alt={title} />

              <div className="content">
                <p>{date}</p>
                <h3>{title}</h3>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  Read article →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
