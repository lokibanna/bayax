import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faGraduationCap, faAtom, faLaptopCode, faPenFancy, faMicroscope, faBrain, faCalculator } from '@fortawesome/free-solid-svg-icons';

const icons = [
    { icon: faBook, color: 'text-cyan-500' },
    { icon: faGraduationCap, color: 'text-blue-500' },
    { icon: faAtom, color: 'text-purple-500' },
    { icon: faLaptopCode, color: 'text-teal-500' },
    { icon: faPenFancy, color: 'text-pink-500' },
    { icon: faMicroscope, color: 'text-green-500' },
    { icon: faBrain, color: 'text-yellow-500' },
    { icon: faCalculator, color: 'text-red-400' }
];

const FloatingParticles = () => {
    // Generate random positions and paths
    const particles = icons.map((item, index) => ({
        ...item,
        id: index,
        initialX: Math.random() * 100, // percentage
        initialY: Math.random() * 100, // percentage
        duration: 15 + Math.random() * 20,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className={`absolute text-2xl sm:text-4xl opacity-20 ${particle.color}`}
                    style={{
                        left: `${particle.initialX}%`,
                        top: `${particle.initialY}%`,
                    }}
                    animate={{
                        x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
                        y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
                        rotate: [0, 180, 360],
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <FontAwesomeIcon icon={particle.icon} />
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingParticles;
