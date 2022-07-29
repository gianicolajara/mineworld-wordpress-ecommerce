import NextNProgress from "nextjs-progressbar";
import Menu from "../Menu";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "../Footer";
import { useRouter } from "next/router";

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const GeneralLayout = ({ children }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-[100vh] w-full">
      <NextNProgress color="green" />
      <Menu />
      <AnimatePresence exitBeforeEnter>
        <motion.main
          key={router.route}
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{ type: "linear" }}
          className="flex-1"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default GeneralLayout;
