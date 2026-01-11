import React, { useEffect, useRef, useState } from "react";

import portfolio1 from "@/assets/portfolio-1.png";
import portfolio2 from "@/assets/portfolio-2.png";
import portfolio3 from "@/assets/portfolio-3.png";
import portfolio4 from "@/assets/portfolio-4.png";
import portfolio5 from "@/assets/portfolio-5.png";
import portfolio6 from "@/assets/portfolio-6.png";
import portfolio7 from "@/assets/portfolio-7.png";
import portfolio8 from "@/assets/portfolio-8.png";
import portfolio9 from "@/assets/portfolio-9.png";
import portfolio10 from "@/assets/portfolio-10.png";
import portfolio11 from "@/assets/portfolio-11.png";
import portfolio12 from "@/assets/portfolio-12.png";

const portfolioImages = [
  portfolio1, portfolio2, portfolio3, portfolio4,
  portfolio5, portfolio6, portfolio7, portfolio8,
  portfolio9, portfolio10, portfolio11, portfolio12
];

const imagePositions = [
  { x: -48, y: -38 },
  { x: -42, y: 4 },
  { x: -36, y: 40 },
  { x: -14, y: -40 },
  { x: 10, y: -46 },
  { x: 44, y: -36 },
  { x: 52, y: 6 },
  { x: 46, y: 42 },
  { x: 12, y: 56 },
  { x: -22, y: 50 },
  { x: -30, y: -12 },
  { x: 28, y: -6 }
];

const CircleScrollAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [rotation, setRotation] = useState(0);

  // Rotating orbit dots
  useEffect(() => {
    let last = 0;
    let anim: number;

    const loop = (t: number) => {
      if (last) {
        const d = t - last;
        setRotation(r => r + d * 0.003);
      }
      last = t;
      anim = requestAnimationFrame(loop);
    };

    anim = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(anim);
  }, []);

  // Scroll progress
  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const h = rect.height - window.innerHeight;
      const p = Math.min(Math.max(-rect.top / h, 0), 1);
      setScrollProgress(p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dot = (deg: number, r: number) => {
    const rad = (deg * Math.PI) / 180;
    return { x: Math.cos(rad) * r, y: Math.sin(rad) * r };
  };

  return (
    <>
      <style>{`
        .scroll-section{
          position:relative;
          height:300vh;
          background:#000;
        }

        .sticky-container{
          position:sticky;
          top:0;
          height:100vh;
          background:#000;
          display:flex;
          align-items:center;
          justify-content:center;
          overflow:hidden;
        }

        .circle{
          position:absolute;
          border-radius:50%;
          border:1px solid rgba(255,255,255,.12);
        }

        .dot{
          position:absolute;
          width:6px;
          height:6px;
          border-radius:50%;
          background:white;
          transform:translate(-50%, -50%);
        }

        .text{
          color:white;
          font-family:Georgia, serif;
          font-size:2.4rem;
          font-weight:300;
          text-align:center;
          pointer-events:none;
        }

        /* 🔒 Prevent browser from painting images too early */
        .portfolio-image{
          position:absolute;
          top:50%;
          left:50%;
          width:240px;
          height:310px;
          object-fit:cover;
          border-radius:16px;
          opacity:0;
          box-shadow:0 28px 70px rgba(0,0,0,.65);
          pointer-events:none;
        }

        @media(max-width:768px){
          .text{font-size:1.3rem}
          .portfolio-image{width:140px;height:180px}
        }
      `}</style>

      <div className="scroll-section" ref={containerRef}>
        <div className="sticky-container">

          {[560,500,440].map((s,i)=>(
            <div key={i} className="circle" style={{width:s,height:s}}/>
          ))}

          {[260,220,180].map((r,i)=>
            [40,160,300].map((a,j)=>{
              const p = dot(a + rotation*(i===1?-1:1), r);
              return(
                <div key={i+''+j} className="dot"
                  style={{left:`calc(50% + ${p.x}px)`,top:`calc(50% + ${p.y}px)`}}
                />
              );
            })
          )}

          <div className="text">
            Good music. Great crowd. Perfect vibes.
            <br/>Just a glimpse of what awaits you inside
          </div>

          {portfolioImages.map((img,i)=>{

            // ⏳ GLOBAL SCROLL DELAY (no images until scroll starts)
            const GLOBAL_DELAY = 0.12;

            const start = GLOBAL_DELAY + i * 0.06;
            const end   = start + 0.55;

            const raw = Math.min(Math.max((scrollProgress - start)/(end-start),0),1);

            // 🔒 opacity stays ZERO until real motion starts
            const eased = raw <= 0 ? 0 : 1 - Math.pow(1-raw,5);

            // late soft fade-out only at very end
            const finalOpacity = eased < 0.9 ? eased : (1-(eased-0.9)*8);

            return(
              <img
                key={i}
                src={img}
                className="portfolio-image"
                style={{
                  opacity: finalOpacity <= 0 ? 0 : finalOpacity,
                  transform:`
                    translate(calc(-50% + ${imagePositions[i].x * eased}vw),
                              calc(-50% + ${imagePositions[i].y * eased}vh))
                    scale(${0.32 + eased * 0.78})
                  `,
                  zIndex: 10+i
                }}
              />
            );
          })}

        </div>
      </div>
    </>
  );
};

export default CircleScrollAnimation;
