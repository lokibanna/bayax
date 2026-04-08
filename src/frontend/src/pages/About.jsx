import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faBrain, faCodeBranch } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 sm:px-20 text-slate-900 dark:text-slate-200 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="inline-block px-4 py-1.5 mb-8 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-medium">
          Our Manifesto
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold mb-8 leading-tight text-slate-900 dark:text-white">
          Ideas are cheap. <br />
          <span className="bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">Execution is everything.</span>
        </h1>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-12 mt-16 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
        <p>
          We live in an era where everyone has an idea. "Uber for X", "Airbnb for Y", "AI for Z".
          But 99% of these ideas die. Not because they were bad ideas, but because they stuck in
          the <strong>"Confused Zone"</strong>.
        </p>
        <p>
          The founder didn't know where to start. They didn't know if the market existed.
          They didn't have a roadmap. They had passion, but zero structure.
        </p>

        <div className="p-8 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl my-12">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">The BayaX Mission</h3>
          <p className="text-slate-700 dark:text-slate-300">
            To build the world's first <strong>Idea-to-Execution Engine</strong>.
            We don't just "chat" about your idea. We rigorously analyze, structure,
            and map it out until you have no excuse NOT to build it.
          </p>
        </div>

        <p>
          We believe that if we can lower the friction of "starting", we can unlock
          a generation of builders who solve actual problems.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto mt-20">
        {[
          { icon: faBrain, title: "Intelligence", desc: "We use multi-agent AI to simulate a boardroom of experts." },
          { icon: faCodeBranch, title: "Structure", desc: "We refuse to let you be vague. We force clarity." },
          { icon: faRocket, title: "Action", desc: "We optimize for shipping, not just planning." }
        ].map((item, i) => (
          <div key={i} className="text-center p-6 bg-white dark:bg-slate-800/20 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
            <FontAwesomeIcon icon={item.icon} className="text-3xl text-cyan-600 dark:text-cyan-500 mb-4" />
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
