import Title from "../Title";
import { motion } from "framer-motion";
import { useContext } from "react";
import { DeviceContext } from "../../contexts/devices.context";
import { desktop } from "../../config/devices";
import Image from "next/image";

const Heroe = () => {
  const { device } = useContext(DeviceContext);

  return (
    <div className="w-full h-[calc(100vh-140px)] flex justify-center items-center relative z-10 ]">
      {desktop(device) ? (
        <video
          loop
          autoPlay
          muted
          className="w-full h-full object-cover brightness-50 absolute z-10"
        >
          <source src="./media/videos/heroe.mp4" className="absolute z-10" />
          Tu navegador no soporta el elemento <code>video</code>.
        </video>
      ) : (
        <div className="relative w-full h-full">
          <Image
            src="/images/heroe.jpg"
            objectFit="cover"
            layout="fill"
            alt="heroe"
          />
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, x: -500 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute text-center z-20"
      >
        <Title color="text-white">Bienvenido a Mineworld</Title>
        <p className="text-white">Tienda oficial de Mineworld</p>
      </motion.div>
    </div>
  );
};

export default Heroe;
