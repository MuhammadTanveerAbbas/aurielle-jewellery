import { useRef } from "react";
import Marquee from "../components/Marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const items = ["Heritage", "Craftsmanship", "Exclusivity"];
const items2 = ["Visit Our Boutique", "Request a Custom Design", "Contact Us"];

const ContactSummary = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        markers: false,
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="flex flex-col items-center justify-between min-h-screen gap-12 mt-16"
    >
      <Marquee items={items} />

      <div className="overflow-hidden font-light text-center contact-text-responsive">
        <p>
          “ Let’s make something <br />
          <span className="font-normal">long‑lasting</span> &{" "}
          <span className="italic">special</span> <br />
          you’ll <span className="text-gold">love forever</span> “
        </p>
      </div>

      <Marquee
        items={items2}
        reverse
        className="text-black bg-transparent border-y-2"
        iconClassName="stroke-gold stroke-2 text-primary"
        icon="material-symbols-light:diamond"
      />
    </section>
  );
};

export default ContactSummary;
