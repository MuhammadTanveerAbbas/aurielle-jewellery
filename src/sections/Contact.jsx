import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";

const Contact = () => {
  const text = "Have a question? Let's connect and make it happen.";

  const items = ["Craftsmanship", "Design", "Quality", "Elegance", "Luxury"];

  useGSAP(() => {
    gsap.from(".social-link", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".social-link",
      },
    });
  }, []);

  return (
    <section
      id="contact"
      className="flex flex-col justify-between min-h-screen bg-black"
    >
      <div>
        <AnimatedHeaderSection
          title={"Contact"}
          text={text}
          textColor={"text-white"}
          withScrollTrigger={true}
        />

        <div className="flex px-10 font-light text-white uppercase lg:text-[32px] text-[26px] leading-none mb-10">
          <div className="flex flex-col w-full gap-10">
            <div className="social-link">
              <h2>E-mail</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <p className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl">
                aurielle@jewellars.com
              </p>
            </div>

            <div className="social-link">
              <h2>Phone</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <p className="text-xl lowercase md:text-2xl lg:text-3xl">
                +33 7 12 12 32 12
              </p>
            </div>

            <div className="social-link">
              <h2 className="text-lg lg:text-2xl">Social Media</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <div className="flex flex-wrap gap-4 mt-2 items-center">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="transition-opacity duration-200 hover:opacity-80"
                  >
                    <img
                      src={social.icon}
                      alt={social.name}
                      className="w-6 h-6 md:w-8 md:h-8 object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Marquee
        items={items}
        speed={30}
        className="text-white bg-transparent tracking-wider gap-x-20"
        icon="material-symbols:crown-outline"
        iconClassName="text-gold text-xl"
      />
    </section>
  );
};

export default Contact;
