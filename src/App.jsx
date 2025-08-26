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
  const [isReady, setIsReady] = useState(false);

  // wait until all images + videos are loaded
  useEffect(() => {
    const assets = [
      ...Array.from(document.images).map(img => img.src),
      ...Array.from(document.querySelectorAll("video")).map(v => v.src),
    ];

    if (assets.length === 0) {
      setIsReady(true);
      return;
    }

    let loaded = 0;
    const handleLoad = () => {
      loaded += 1;
      if (loaded === assets.length) {
        setTimeout(() => setIsReady(true), 400); // small delay for smooth fade
      }
    };

    assets.forEach(src => {
      const el = src.endsWith(".mp4") || src.endsWith(".webm")
        ? document.createElement("video")
        : new Image();
      el.src = src;
      el.addEventListener("loadeddata", handleLoad);
      el.addEventListener("load", handleLoad);
      el.addEventListener("error", handleLoad);
    });
  }, []);

  return (
    <ReactLenis root className="relative w-screen min-h-screen overflow-x-auto">
      {!isReady && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black transition-opacity duration-700">
          {/* Minimal Loader (spinner) */}
          <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
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
