import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import Testimonials from '../components/Testimonials'
import { useRecoilState } from 'recoil'
import { userProfileState } from '../recoil/createUser.recoil'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrain, faChessBoard, faListCheck, faChartLine, faBolt, faNetworkWired, faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import BlurHeadline from '../components/BlurHeadline'
import { Link } from 'react-router-dom'

const Section = ({ children, className = "" }) => (
  <section className={`py-20 px-6 sm:px-20 ${className}`}>
    {children}
  </section>
)

const FeatureCard = ({ icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="p-8 rounded-2xl bg-white/10 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-lg shadow-slate-200/10 dark:shadow-none hover:border-cyan-500/30 transition-all duration-300"
  >
    <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-6">
      <FontAwesomeIcon icon={icon} size="lg" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
  </motion.div>
)

const StepCard = ({ number, title, sub, desc }) => (
  <div className="relative pl-12 pb-12 last:pb-0 border-l border-cyan-500/20 last:border-0">
    <div className="absolute left-[-16px] top-0 flex items-center justify-center w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900 border border-cyan-500 text-cyan-700 dark:text-cyan-400 font-bold text-sm">
      {number}
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">{title}</h3>
    <div className="text-sm text-cyan-600 dark:text-cyan-500 font-mono mb-3 uppercase tracking-wider">{sub}</div>
    <p className="text-slate-600 dark:text-slate-400 max-w-md">{desc}</p>
  </div>
)

const Home = () => {
  const [userProfile, setUserProfile] = useRecoilState(userProfileState)

  useEffect(() => {
    const username = localStorage.getItem('username')
    if (username) setUserProfile(true)
  }, [])

  return (
    <div className="font-sans text-slate-900 dark:text-slate-200">

      {/* 1. HERO SECTION */}
      <section className="relative pt-48 pb-32 sm:px-20 px-6 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-1.5 mb-8 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 text-sm font-medium backdrop-blur-sm">
            The Idea-to-Execution Platform
          </div>

          <BlurHeadline
            text="Turn Confusion Into Execution."
            className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 text-slate-900 dark:text-white"
          />

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop sitting on raw ideas. We transform vague thoughts into structured,
            visual, and executable plans using multi-role AI intelligence.
          </p>

          <div className="flex gap-4 justify-center">
            {!userProfile ? (
              <Button className='scale-125' prop={"Start Building Now"} link='/auth/signup' />
            ) : (
              <Button className='scale-125' prop={"Go to Dashboard"} link='/dashboard' />
            )}
          </div>
        </motion.div>
      </section>

      {/* 2. THE PROBLEM (Confusion -> Clarity) */}
      <Section className="dark:bg-slate-900/50">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-slate-100">The "Idea Gap"</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">
              Most people have ideas but get stuck in the <span className="text-slate-900 dark:text-white font-semibold">"Messy Middle"</span>.
              You have a vision, but no roadmap. You have passion, but no structure.
            </p>
            <ul className="space-y-4">
              {[
                "Undefined target audience",
                "Unclear monetization strategy",
                "Overwhelmed by 'where to start'",
                "Fear of wasting time on the wrong path"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative p-8 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/10 dark:bg-slate-950/20 backdrop-blur-md flex flex-col items-center justify-center text-center shadow-lg dark:shadow-none">
            <div className="grid grid-cols-2 gap-4 w-full opacity-50 blur-[1px]">
              <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
              <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
              <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-lg col-span-2"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-4 rounded-xl shadow-2xl">
                <span className="text-red-500 dark:text-red-400 font-mono font-bold">Status: CONFUSED</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. THE TRANSFORMATION (Process) */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">From Chaos to Clarity</h2>
            <p className="text-slate-600 dark:text-slate-400">Our system guides you through a rigorous structuring process.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative p-6 border-t font-mono text-sm border-slate-300 dark:border-slate-700 pt-8">
              <div className="absolute -top-3 left-0 text-slate-400 dark:text-slate-500">01</div>
              <h4 className="text-cyan-600 dark:text-cyan-400 font-bold mb-2">INPUT</h4>
              <p className="text-slate-600 dark:text-slate-400">Dump your raw, messy thoughts. Or just pick a field.</p>
            </div>
            <div className="relative p-6 border-t font-mono text-sm border-cyan-500 pt-8 bg-cyan-500/5 dark:bg-cyan-900/5 backdrop-blur-sm">
              <div className="absolute -top-3 left-0 text-cyan-600 dark:text-cyan-500">02</div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-2">STRUCTURE</h4>
              <p className="text-slate-700 dark:text-slate-300">AI Strategist organizes it into nodes, logic, and steps.</p>
            </div>
            <div className="relative p-6 border-t font-mono text-sm border-slate-300 dark:border-slate-700 pt-8">
              <div className="absolute -top-3 left-0 text-slate-400 dark:text-slate-500">03</div>
              <h4 className="text-cyan-600 dark:text-cyan-400 font-bold mb-2">EXECUTE</h4>
              <p className="text-slate-600 dark:text-slate-400">Get a guaranteed daily checklist and go.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* 4. AI INTELLIGENCE */}
      <Section className="dark:bg-slate-900/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-slate-100">Not Just a Chatbot. A Co-Founder.</h2>
          <p className="text-slate-600 dark:text-slate-400">We simulate a team of experts analyzing your idea.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <FeatureCard
            icon={faBrain}
            title="The Strategist"
            desc="Breaks down high-level goals into actionable, logical phases. Ensures feasibility."
            delay={0.1}
          />
          <FeatureCard
            icon={faChartLine}
            title="The Market Thinker"
            desc="Analyzes competition, demand, and monetization potential. Gives you a 'Market Proof Score'."
            delay={0.2}
          />
          <FeatureCard
            icon={faListCheck}
            title="The Project Manager"
            desc="Converts strategy into a daily task list with milestones and deadlines."
            delay={0.3}
          />
        </div>
      </Section>

      {/* 5. VISUAL THINKING */}
      <Section>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative rounded-xl border border-slate-200 dark:border-slate-800 bg-white/10 dark:bg-slate-900/20 backdrop-blur-md overflow-hidden aspect-video group shadow-xl dark:shadow-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-100/20 dark:from-cyan-900/10 via-transparent to-transparent"></div>
            {/* Abstract Visual Representation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <FontAwesomeIcon icon={faNetworkWired} className="text-6xl text-cyan-500/50 group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-slate-900/80 px-3 py-1 rounded text-xs text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-slate-800 backdrop-blur-md">
              Interactive Node Engine
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-slate-100">See Your Idea Alive.</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Words aren't enough. Our <span className="text-cyan-600 dark:text-cyan-400">Visual Thinking System</span> converts your structured plan into a dynamic mind map.
            </p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <FontAwesomeIcon icon={faLayerGroup} className="mt-1 text-slate-400 dark:text-slate-500" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-200">Time-Based Layers</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-500">Toggle views: 7 days, 30 days, 90 days.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <FontAwesomeIcon icon={faBolt} className="mt-1 text-slate-400 dark:text-slate-500" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-200">Click-to-Explain Nodes</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-500">Drill down into any step for tools, logic, and examples.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* 6. EXECUTION GUARANTEE */}
      <Section className="dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-950 border-y border-transparent dark:border-white/5">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-slate-100">The Execution Guarantee.</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              We don't leave you with a PDF. We give you a living, breathing system to ensure you ship.
            </p>
            <div className="flex flex-col gap-6">
              <StepCard
                number="1"
                title="Commit"
                sub="DAILY CHECKLIST"
                desc="A beginner or pro mode checklist that adapts to your pace."
              />
              <StepCard
                number="2"
                title="Validate"
                sub="FEEDBACK LOOP"
                desc="Real-world experiments to test your assumptions early."
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-2xl dark:shadow-none">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">YOUR PROGRESS</span>
                <span className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-1 rounded">ON TRACK</span>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${i === 1 ? 'bg-cyan-500 border-cyan-500 text-white dark:text-black shadow-md' : 'border-slate-300 dark:border-slate-600'}`}>
                      {i === 1 && <FontAwesomeIcon icon={faListCheck} className="text-[10px]" />}
                    </div>
                    <div className={`h-2 rounded-full flex-1 ${i === 1 ? 'bg-slate-300 dark:bg-slate-700' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                <p className="text-4xl font-bold text-slate-900 dark:text-white mb-1">82%</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest">Confidence Score</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 7. ASSETS & EXPORT */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-slate-100">Everything You Need to Launch</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            { label: "Brand Kit", icon: faChessBoard },
            { label: "Landing Page Copy", icon: faLayerGroup },
            { label: "Notion Export", icon: faListCheck },
            { label: "PDF Roadmap", icon: faChartLine }
          ].map((g, i) => (
            <div key={i} className="p-6 bg-white/10 dark:bg-slate-800/20 backdrop-blur-sm rounded-xl text-center border border-slate-200 dark:border-white/5 hover:bg-white/20 dark:hover:bg-slate-800/40 transition-colors">
              <FontAwesomeIcon icon={g.icon} className="text-2xl text-slate-500 dark:text-slate-400 mb-3" />
              <div className="font-semibold text-slate-700 dark:text-slate-200">{g.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* 8. CTA */}
      <Section className="pb-32">
        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 dark:from-cyan-900/20 dark:to-blue-900/20 border border-transparent dark:border-cyan-500/20 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Execute?</h2>
            <p className="text-lg text-cyan-100 dark:text-slate-400 mb-8 max-w-xl mx-auto">
              Join the builders who stopped dreaming and started doing.
              Say "I can execute this."
            </p>
            <div className="flex justify-center flex-wrap gap-4">
              <Link to="/auth/signup" className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-cyan-50 transition-colors shadow-lg">
                Get Started Free
              </Link>
              <Link to="/about" className="px-8 py-3 rounded-xl font-bold text-white border border-white/20 hover:bg-white/10 transition-colors">
                Read Manifest
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <div className="sm:px-36 px-10 pb-20">
        <BlurHeadline
          text="Trending Executions."
          className="text-2xl font-bold text-center text-slate-400 dark:text-slate-500 mb-12"
        />
        <div className="opacity-70">
          <Testimonials />
        </div>
      </div>
    </div>
  )
}

export default Home