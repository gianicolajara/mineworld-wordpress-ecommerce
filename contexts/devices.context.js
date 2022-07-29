import { createContext, useEffect, useState } from "react";
import { typeOfDevice } from "../config/devices";

export const DeviceContext = createContext();

const DeviceContextProvider = ({ children }) => {
  const [device, setDevice] = useState();

  const handleResize = () => {
    if (window.innerWidth < 640) {
      // Extra Small Device
      setDevice(typeOfDevice.xs);
    }
    if (window.innerWidth >= 640 && window.innerWidth < 768) {
      // Small Device
      setDevice(typeOfDevice.sm);
    }
    if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      // Medium Device
      setDevice(typeOfDevice.md);
    }
    if (window.innerWidth >= 1024) {
      // Large Device
      setDevice(typeOfDevice.lg);
    }
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const value = {
    device,
  };

  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  );
};

export default DeviceContextProvider;
