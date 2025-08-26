import React, { useEffect, useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ServiceSummary from "./sections/ServiceSummary";
import Services from "./sections/Services";
import ReactLenis from "lenis/react";
import About from "./sections/About";
import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";

const App = () => {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // preload all assets (images, videos, fonts)
  useEffect(() => {
    const assets = [
      ...Array.from(document.images).map(img => img.src),
      ...Array.from(document.querySelectorAll("video")).map(v => v.src),
    ];

    // track loaded count
    let loaded = 0;
    const updateProgress = () => {
      loaded += 1;
      const percent = Math.round((loaded / assets.length) * 100);
      setProgress(percent);
      if (percent === 100) {
        // add small delay to let transition feel smooth
        setTimeout(() => setIsReady(true), 500);
      }
    };

    if (assets.length === 0) {
      setProgress(100);
      setTimeout(() => setIsReady(true), 500);
      return;
    }

    assets.forEach(src => {
      const el = src.endsWith(".mp4") || src.endsWith(".webm")
        ? document.createElement("video")
        : new Image();
      el.src = src;
      el.addEventListener("loadeddata", updateProgress);
      el.addEventListener("load", updateProgress);
      el.addEventListener("error", updateProgress); // count errors as loaded
    });
  }, []);

  // fake smooth animation so it doesn't jump
  const [displayProgress, setDisplayProgress] = useState(0);
  useEffect(() => {
    if (progress > displayProgress) {
      const interval = setInterval(() => {
        setDisplayProgress(p => {
          if (p >= progress) {
            clearInterval(interval);
            return p;
          }
          return p + 1;
        });
      }, 20);
      return () => clearInterval(interval);
    }
  }, [progress]);

  return (
    <ReactLenis root className="relative w-screen min-h-screen overflow-x-auto">
      {!isReady && (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 font-light">
          <p className="mb-4 text-xl tracking-widest animate-pulse">
            Loading {displayProgress}%
          </p>
          <div className="relative h-1 overflow-hidden rounded w-60 bg-white/20">
            <div
              className="absolute top-0 left-0 h-full transition-all duration-200 bg-white"
              style={{ width: `${displayProgress}%` }}
            ></div>
          </div>
        </div>
      )}
      <div
        className={`${
          isReady ? "opacity-100" : "opacity-0"
        } transition-opacity duration-1000`}
      >
        <Navbar />
        <Hero />
        <ServiceSummary />
        <Services />
        <About />
        <ContactSummary />
        <Contact />
      </div>
    </ReactLenis>
  );
};

export default App;
