import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Transition = ({ children, transitionDuration }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: transitionDuration || 0.5 }}
  >
    {children}
  </motion.div>
);

Transition.propTypes = {
    children: PropTypes.node,
    transitionDuration: PropTypes.number
  };

export default Transition;