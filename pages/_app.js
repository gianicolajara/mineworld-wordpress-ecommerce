import Footer from "../components/Footer";
import Menu from "../components/Menu";
import NextNProgress from "nextjs-progressbar";
import "../styles/globals.css";
import { AnimatePresence, motion } from "framer-motion";
import CartContextProvider from "../contexts/cart.context";
import UserContextProvider from "../contexts/user.context";
import LoadStripeContextProvider from "../contexts/loadStripe.context";
import DeviceContextProvider from "../contexts/devices.context";

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <DeviceContextProvider>
      <UserContextProvider>
        <LoadStripeContextProvider>
          <CartContextProvider>
            {getLayout(<Component {...pageProps} />)}
          </CartContextProvider>
        </LoadStripeContextProvider>
      </UserContextProvider>
    </DeviceContextProvider>
  );
}

export default MyApp;
