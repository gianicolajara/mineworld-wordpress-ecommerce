import Subtitle from "../Subtitle";
import Wrapper from "../Wrapper";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Aboutus = () => {
  const controls = useAnimation();

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <section>
      <Wrapper last={true}>
        <div ref={ref}>
          <div>
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-5"
            >
              <Subtitle>ACERCA DE NOSOTROS.</Subtitle>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-slate-600">
                Lorem ipsum dolor sit amet consectetur adipiscing elit feugiat,
                tempus nisl primis suscipit dictumst porta ornare mattis, nostra
                dui vivamus commodo hac leo pulvinar. Fermentum curabitur
                euismod tempus tellus vestibulum ac penatibus maecenas
                himenaeos, ullamcorper ut sociosqu nisi diam urna etiam
                ridiculus, sem odio litora nulla porttitor habitant curae augue.
                Sodales magnis luctus nisi dictumst tempus dapibus fusce morbi,
                hac per primis integer felis semper orci dignissim, urna quisque
                lobortis ad fames ultricies faucibus.
              </p>
              <br />
              <p className="text-slate-600">
                Lorem ipsum dolor sit amet consectetur adipiscing elit feugiat,
                tempus nisl primis suscipit dictumst porta ornare mattis, nostra
                dui vivamus commodo hac leo pulvinar. Fermentum curabitur
                euismod tempus tellus vestibulum ac penatibus maecenas
                himenaeos, ullamcorper ut sociosqu nisi diam urna etiam
                ridiculus, sem odio litora nulla porttitor habitant curae augue.
                Sodales magnis luctus nisi dictumst tempus dapibus fusce morbi,
                hac per primis integer felis semper orci dignissim, urna quisque
                lobortis ad fames ultricies faucibus.
              </p>
            </motion.div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Aboutus;
