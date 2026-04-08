import React from "react";
import { motion } from "framer-motion";

const transition = { duration: 1, ease: [0.25, 0.1, 0.25, 1] };
const variants = {
    hidden: { filter: "blur(10px)", transform: "translateY(20%)", opacity: 0 },
    visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
};

const BlurHeadline = ({ text, className }) => {
    const words = text.split(" ");

    return (
        <motion.h1
            initial="hidden"
            whileInView="visible"
            transition={{ staggerChildren: 0.04 }}
            className={className}
        >
            {words.map((word, index) => (
                <React.Fragment key={index}>
                    <motion.span
                        className="inline-block"
                        transition={transition}
                        variants={variants}
                    >
                        {word}
                    </motion.span>
                    {index < words.length - 1 && " "}
                </React.Fragment>
            ))}
        </motion.h1>
    );
};

export default BlurHeadline;
