import React, { useRef } from "react";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const AnimatedHeaderSection = ({
  subTitle,
  title,
  text,
  textColor = "text-white",
  withScrollTrigger = false,
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);

  const titleParts = title.includes(" ") ? title.split(" ") : [title];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: withScrollTrigger
        ? {
            trigger: contextRef.current,
            start: "top 80%",
          }
        : undefined,
    });

    tl.from(contextRef.current, {
      y: "50vh",
      duration: 1,
      ease: "circ.out",
    });

    tl.from(
      headerRef.current,
      {
        opacity: 0,
        y: 200,
        duration: 1,
        ease: "circ.out",
      },
      "<+0.2"
    );
  }, []);

  return (
    <div ref={contextRef} className="overflow-hidden">
      <div className="clip-path-full">
        <div
          ref={headerRef}
          className="flex flex-col justify-center gap-12 pt-16 sm:gap-16"
        >
          {/* Subtitle */}
          <p
            className={`text-xs sm:text-sm font-light tracking-[0.5rem] uppercase px-10 ${textColor}`}
          >
            {subTitle}
          </p>

          {/* Title */}
          <div className="px-10">
            <h1
              className={`flex flex-col gap-10 uppercase banner-text-responsive sm:gap-14 md:block font-amiamie tracking-wide ${textColor}`}
            >
              {titleParts.map((part, index) => (
                <span key={index}>{part}</span>
              ))}
            </h1>
          </div>
        </div>
      </div>

      {/* Description Block with Line Separation */}
      <div className={`relative mt-16 px-10 ${textColor}`}>
        {/* Decorative Line */}
        <div className="w-full h-px0 mb-12" />

        {/* Text Block */}
        <div className="text-end">
          <AnimatedTextLines
            text={text}
            className={`font-light uppercase value-text-responsive leading-relaxed ${textColor}`}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeaderSection;
