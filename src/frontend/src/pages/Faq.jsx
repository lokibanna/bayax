import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50 overflow-hidden transition-all duration-300 hover:border-cyan-500/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-6 text-left"
      >
        <span className="text-lg font-bold text-slate-800 dark:text-slate-200">{question}</span>
        <span className={`transition-transform duration-300 text-cyan-500 ${isOpen ? 'rotate-180' : ''}`}>
          <FontAwesomeIcon icon={isOpen ? faMinus : faPlus} />
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/50">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const Faq = () => {
  const faqs = [
    {
      question: "How is BayaX different from ChatGPT?",
      answer: "ChatGPT is a generalist chatbot. BayaX is a specialized engine. We don't just 'chat'—we use multi-agent workflows to break your idea into specific nodes (Strategy, Market, Tasks), visualize it as a mind map, and force you to answer the hard questions you're avoiding."
    },
    {
      question: "I don't have a technical background. Is this for me?",
      answer: "Absolutely. In fact, that's exactly who we built this for. You bring the domain expertise and the vision; we provide the structure, the roadmap, and the technical breakdown so you can hire devs or use no-code tools effectively."
    },
    {
      question: "What exactly do I get with the 'Blueprint'?",
      answer: "You get a comprehensive 90-day execution plan. This includes: A polished problem-solution definition, a visual logic map of your product, a competitor analysis (Market Proof Score), and a week-by-week task list to get you to MPV."
    },
    {
      question: "Is my idea safe? Do you steal ideas?",
      answer: "Your ideas are your own. We encrypted all data and we do not use your private idea data to train our public models. We sell tools, not ideas."
    },
    {
      question: "Can I export my plan?",
      answer: "Yes. In the Builder and Visionary plans, you can export your entire roadmap to Notion or PDF, making it easy to share with co-founders or investors."
    }
  ]

  return (
    <div className='min-h-screen pt-32 pb-20 px-6 sm:px-20 font-sans text-slate-900 dark:text-slate-200'>
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className='text-4xl sm:text-5xl font-bold mb-6 text-slate-900 dark:text-white'>
          Frequently Asked <span className="text-cyan-500">Questions</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          Everything you need to know about the product and billing.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <FaqItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>

      <div className="text-center mt-20 p-8 bg-cyan-50 dark:bg-cyan-900/10 rounded-3xl border border-cyan-100 dark:border-cyan-500/10">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Still have questions?</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">We're happy to chat. Reach out to our team.</p>
        <a href="mailto:support@bayax.com" className="inline-block px-6 py-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold rounded-xl border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform">
          Contact Support
        </a>
      </div>
    </div>
  )
}

export default Faq