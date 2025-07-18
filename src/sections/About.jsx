import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  const imgRef = useRef(null);

  const text = `At Aurielle Jewellers,
we craft timeless treasures.`;

  const aboutParagraph = `
Crafted with intention. Designed to endure.
Each piece begins with passion and culminates in timeless elegance.
We believe jewelry should be as lasting as the memories it celebrates.`;

  const offerings = [
    {
      title: "• Signature Rings",
      description: "Timeless and refined — each ring tells your unique story.",
    },
    {
      title: "• Elegant Necklaces",
      description: "Delicate masterpieces that add grace to every moment.",
    },
    {
      title: "• Artisan Earrings",
      description:
        "Bold or subtle, sculpted to perfection with meticulous detail.",
    },
    {
      title: "• Bespoke Creations",
      description:
        "One-of-a-kind pieces, tailored to your vision and individuality.",
    },
    {
      title: "• Lifetime Care",
      description:
        "Our commitment to preserving your jewelry for generations to come.",
    },
  ];

  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });

    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });
  });

  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Coded with Purpose, Crafted to Endure"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />

      <div className="flex flex-col items-center justify-between gap-16 px-10 pb-16 text-white/80 lg:flex-row">
        {/* Image */}
        <img
          ref={imgRef}
          src="images/Picture.jpg"
          alt="Artisan at work"
          className="w-full max-w-md rounded-3xl"
        />

        {/* Text Content */}
        <div className="w-full space-y-6 text-xl font-light tracking-wide md:text-2xl lg:text-3xl">
          <AnimatedTextLines text={aboutParagraph} />

          <div className="pt-4 space-y-6">
            {offerings.map((item, index) => (
              <div key={index}>
                <h4 className="text-white text-xl md:text-2xl lg:text-3xl font-medium mb-1">
                  {item.title}
                </h4>
                <p className="text-white/60 text-base md:text-lg lg:text-xl tracking-wide">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
