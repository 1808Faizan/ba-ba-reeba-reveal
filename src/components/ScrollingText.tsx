import React from "react";
import "@/components/ScrollingText.css";

const ScrollingText: React.FC = () => {
  return (
    <section className="scrolling-text-snap">
      <div className="scrolling-text-wrapper">
        <div className="scrolling-text-track">
          <span className="scrolling-text stroked-text brand-font">
            MUSIC MAKES MY HEART GO BABA REEBA
          </span>
          <span className="scrolling-text stroked-text brand-font">
          MUSIC MAKES MY HEART GO BABA REEBA
          </span>
        </div>
      </div>
    </section>
  );
};

export default ScrollingText;
