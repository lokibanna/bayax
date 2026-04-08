import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const PricingCard = ({ title, price, features, recommended = false, btnText = "Get Started", delay }) => (
  <div className={`relative p-8 rounded-2xl border flex flex-col transition-all duration-300 ${recommended ? 'bg-slate-900 border-cyan-500 shadow-2xl shadow-cyan-500/10 scale-105 z-10 dark:bg-slate-900' : 'bg-white dark:bg-slate-950/50 border-slate-200 dark:border-slate-800'}`}>
    {recommended && (
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cyan-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
        Most Popular
      </div>
    )}
    <h3 className={`text-xl font-bold mb-2 ${recommended ? 'text-white' : 'text-slate-900 dark:text-slate-200'}`}>{title}</h3>
    <div className="mb-6">
      <span className={`text-4xl font-bold ${recommended ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{price}</span>
      {price !== 'Free' && <span className="text-slate-500">/mo</span>}
    </div>
    <ul className="space-y-4 mb-8 flex-1">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-3 text-sm">
          {f.included ? (
            <FontAwesomeIcon icon={faCheck} className="mt-1 text-cyan-500" />
          ) : (
            <FontAwesomeIcon icon={faTimes} className="mt-1 text-slate-400 dark:text-slate-700" />
          )}
          <span className={f.included ? (recommended ? 'text-slate-300' : 'text-slate-700 dark:text-slate-300') : (recommended ? 'text-slate-600' : 'text-slate-400 dark:text-slate-600')}>{f.text}</span>
        </li>
      ))}
    </ul>
    <Link to="/auth/signup">
      <button className={`w-full py-3 rounded-xl font-bold transition-all ${recommended ? 'bg-cyan-500 text-black hover:bg-cyan-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
        {btnText}
      </button>
    </Link>
  </div>
)

const Pricing = () => {
  const plans = [
    {
      title: "Explorer",
      price: "Free",
      features: [
        { text: "3 Idea Analyses / month", included: true },
        { text: "Basic Strategy Overview", included: true },
        { text: "7-Day Execution Plan", included: true },
        { text: "Market Proof Score", included: false },
        { text: "Export to Notion/PDF", included: false },
      ]
    },
    {
      title: "Builder",
      price: "$29",
      recommended: true,
      features: [
        { text: "Unlimited Idea Analyses", included: true },
        { text: "Deep Market Intelligence", included: true },
        { text: "Full 90-Day Roadmap", included: true },
        { text: "Visual Mind Map Engine", included: true },
        { text: "Export to Notion/PDF", included: true },
      ]
    },
    {
      title: "Visionary",
      price: "$99",
      features: [
        { text: "Everything in Builder", included: true },
        { text: "Human Expert Review (Beta)", included: true },
        { text: "Investor Pitch Deck Assets", included: true },
        { text: "API Access", included: true },
        { text: "Private Idea Vault", included: true },
      ]
    }
  ]

  return (
    <div className='min-h-screen pt-32 pb-20 px-6 sm:px-20 text-slate-900 dark:text-slate-200'>
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className='text-4xl sm:text-5xl font-bold mo-4 text-slate-900 dark:text-white'>Invest in your Execution.</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg">Detailed plans cost thousands of dollars from consultants. BayaX does it for a fraction.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-center">
        {plans.map((p, i) => <PricingCard key={i} {...p} />)}
      </div>
    </div>
  )
}

export default Pricing