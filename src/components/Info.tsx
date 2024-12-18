import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

const Info = () => {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: "-50%" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      ref={sectionRef}
      className="flex flex-col justify-center w-full h-svh bg-black bg-cover bg-center"
      style={{
        backgroundImage: `url('https://www.thirdspace.london/wp-content/uploads/2024/09/image-13-1920x1012.webp')`,
      }}
      initial="hidden"
      animate={controls}
    >
      <div className="ml-4 cu500:ml-10 sm:ml-20">
        <motion.div
          className="text-white text-3xl sm:text-5xl font-bold mb-4 mt-10"
          variants={textVariants}
        >
          THE ONLY
        </motion.div>
        <motion.div
          className="text-yellow-500 text-3xl sm:text-5xl font-bold mb-4"
          variants={textVariants}
        >
          IMPOSSIBLE
        </motion.div>
        <motion.div
          className="text-white text-3xl sm:text-5xl font-bold mb-4"
          variants={textVariants}
        >
          JOURNEY IS
        </motion.div>
        <motion.div
          className="text-white text-3xl sm:text-5xl font-bold"
          variants={textVariants}
        >
          THE ONE YOU
        </motion.div>
        <motion.div
          className="text-yellow-500 text-3xl sm:text-5xl font-bold"
          variants={textVariants}
        >
          NEVER BEGIN.
        </motion.div>
        <motion.button
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-4 rounded mt-4"
          variants={buttonVariants}
        >
          BEGIN YOUR JOURNEY
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Info;
