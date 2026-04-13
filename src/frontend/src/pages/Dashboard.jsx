import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { usernameState, ideaFormState } from '../recoil/createUser.recoil'
import Input from '../components/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLightbulb, faLayerGroup, faBolt, faArrowRight, faExclamationCircle, faComments, faSearch, faCode, faBriefcaseMedical, faGraduationCap, faLaptopCode, faVideo, faBook, faChalkboardTeacher
} from '@fortawesome/free-solid-svg-icons'
import BlurReveal from '../components/BlurReveal'
import { analyzeIdea } from '../apiFrontend/Idea'
import { genereatePlan } from '../apiFrontend/CreatePlan'
import { motion, AnimatePresence } from 'framer-motion'

const OptionCard = ({ icon, title, desc, onClick, active }) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-6 rounded-2xl border text-left transition-all duration-200 w-full h-full flex flex-col items-center text-center gap-4 hover:shadow-lg ${active ? 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-500 ring-1 ring-cyan-500 scale-105' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-slate-500'}`}
  >
    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${active ? 'bg-cyan-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300'}`}>
      <FontAwesomeIcon icon={icon} />
    </div>
    <div>
      <h3 className={`font-bold text-lg ${active ? 'text-cyan-900 dark:text-cyan-100' : 'text-slate-800 dark:text-slate-200'}`}>{title}</h3>
      {desc && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{desc}</p>}
    </div>
  </button>
)

// ─── IDEA WIZARD STEPS ───────────────────────────────────────────────────────

const StepOne = ({ ideaData, updateData }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Where are we building?</h2>
      <p className="text-slate-500 dark:text-slate-400 mt-2">Select the industry or domain for your project.</p>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {[
        { id: 'tech', label: 'Software / SaaS', icon: faLaptopCode },
        { id: 'business', label: 'Business / B2B', icon: faLayerGroup },
        { id: 'content', label: 'Content / Creator', icon: faVideo },
        { id: 'medical', label: 'Health / Medical', icon: faBriefcaseMedical },
        { id: 'education', label: 'EdTech', icon: faGraduationCap },
        { id: 'other', label: 'Other', icon: faLightbulb },
      ].map((field) => (
        <OptionCard
          key={field.id}
          icon={field.icon}
          title={field.label}
          active={ideaData.field === field.id}
          onClick={() => updateData('field', field.id)}
        />
      ))}
    </div>
  </div>
)

const StepTwo = ({ ideaData, updateData }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">What's your starting point?</h2>
      <p className="text-slate-500 dark:text-slate-400 mt-2">Tell us what you have so far.</p>
    </div>
    <div className="grid md:grid-cols-2 gap-4">
      <OptionCard
        icon={faLightbulb}
        title="I have an idea"
        desc="I want to turn it into a structured plan."
        active={ideaData.intent === 'have_idea'}
        onClick={() => updateData('intent', 'have_idea')}
      />
      <OptionCard
        icon={faSearch}
        title="I need an idea"
        desc="I want to solve a problem in this field."
        active={ideaData.intent === 'need_idea'}
        onClick={() => updateData('intent', 'need_idea')}
      />
    </div>
  </div>
)

const StepThree = ({ ideaData, updateData }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
        {ideaData.intent === 'have_idea' ? "Describe your vision" : "Constraints & Preferences"}
      </h2>
      <p className="text-slate-500 dark:text-slate-400 mt-2">
        {ideaData.intent === 'have_idea' ? "What is the core problem and your proposed solution?" : "What are you looking for?"}
      </p>
    </div>
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        {ideaData.intent === 'have_idea' ? 'Idea Details' : 'Any specific interests or constraints?'}
      </label>
      <textarea
        className="w-full h-32 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-cyan-500 outline-none transition-all resize-none text-slate-800 dark:text-slate-100 placeholder-slate-400"
        placeholder={ideaData.intent === 'have_idea' ? "e.g. A marketplace connecting local farmers with restaurants..." : "e.g. Low-code tool for marketing automation..."}
        value={ideaData.content}
        onChange={(e) => updateData('content', e.target.value)}
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        Preferred Tech Stack (Optional)
      </label>
      <Input
        icon={<FontAwesomeIcon icon={faCode} className="text-slate-400" />}
        placeholder="e.g. React, Node, Python, or No-Code"
        value={ideaData.techStack}
        onChange={(e) => updateData('techStack', e.target.value)}
      />
    </div>
  </div>
)

// ─── LESSON PLAN FORM ─────────────────────────────────────────────────────────

const SUBJECTS = ['Mathematics', 'Science', 'English', 'History', 'Geography', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Economics', 'Hindi', 'Other']
const GRADES = Array.from({ length: 12 }, (_, i) => i + 1)
const DURATIONS = ['30', '45', '60', '75', '90']

const LessonForm = ({ lessonData, setLessonData }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Create Lesson Plan</h2>
      <p className="text-slate-500 dark:text-slate-400 mt-2">AI will generate a complete structured lesson plan for you.</p>
    </div>

    <div className="grid md:grid-cols-2 gap-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Subject *</label>
        <select
          value={lessonData.subject}
          onChange={(e) => setLessonData(p => ({ ...p, subject: e.target.value }))}
          className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 dark:text-slate-100 transition-all"
        >
          <option value="">Select Subject</option>
          {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Grade *</label>
        <select
          value={lessonData.grade}
          onChange={(e) => setLessonData(p => ({ ...p, grade: e.target.value }))}
          className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 dark:text-slate-100 transition-all"
        >
          <option value="">Select Grade</option>
          {GRADES.map(g => <option key={g} value={g}>Grade {g}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Duration (minutes) *</label>
        <select
          value={lessonData.duration}
          onChange={(e) => setLessonData(p => ({ ...p, duration: e.target.value }))}
          className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 dark:text-slate-100 transition-all"
        >
          <option value="">Select Duration</option>
          {DURATIONS.map(d => <option key={d} value={d}>{d} minutes</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Topic *</label>
        <input
          type="text"
          placeholder="e.g. Photosynthesis, Algebra, World War II..."
          value={lessonData.topic}
          onChange={(e) => setLessonData(p => ({ ...p, topic: e.target.value }))}
          className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 transition-all"
        />
      </div>
    </div>
  </div>
)

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────

const Dashboard = () => {
  const [username, setUsername] = useRecoilState(usernameState)
  const [ideaData, setIdeaData] = useRecoilState(ideaFormState)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('idea') // 'idea' | 'lesson'
  const [lessonData, setLessonData] = useState({ subject: '', topic: '', grade: '', duration: '' })
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('username')
    if (user) setUsername(user)
  }, [])

  const updateData = (key, value) => {
    setIdeaData(prev => ({ ...prev, [key]: value }))
    setError(null)
  }

  const handleNext = () => {
    if (ideaData.step === 1 && !ideaData.field) return setError("Please select a field to proceed.")
    if (ideaData.step === 2 && !ideaData.intent) return setError("Please select an option.")
    updateData('step', ideaData.step + 1)
  }

  const handleBack = () => updateData('step', Math.max(1, ideaData.step - 1))

  const handleIdeaSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      if (!ideaData.content && ideaData.intent === 'have_idea') throw new Error("Please describe your idea.")
      const response = await analyzeIdea({ ...ideaData, username })
      if (response?.data?.success) {
        navigate('/idea-result', { state: { result: response.data.data } })
      } else {
        setError(response?.data?.message || "AI Analysis failed. Please try again.")
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Check your connection.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLessonSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    const { subject, topic, grade, duration } = lessonData
    if (!subject || !topic || !grade || !duration) return setError("Please fill in all lesson plan fields.")
    setIsLoading(true)
    try {
      const response = await genereatePlan({ subject, topic, grade: Number(grade), duration: Number(duration) })
      if (response?.data?.success) {
        navigate('/lesson-result', {
          state: {
            lessonPlan: response.data.lessonPlan,
            docxFile: response.data.docxFile,
            filename: response.data.filename,
            subject,
            topic,
            grade,
            duration
          }
        })
      } else {
        setError("Failed to generate lesson plan. Please try again.")
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Check your connection.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center mt-24 min-h-[calc(100vh-6rem)] sm:px-0 px-4 max-w-4xl mx-auto w-full'>

      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2'>
          Welcome, {username || 'Creator'}.
        </h1>
        <p className='text-slate-600 dark:text-slate-400'>Choose what you want to build today.</p>
      </div>

      {/* Tab Toggle */}
      <div className="flex gap-2 mb-6 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
        <button
          onClick={() => { setActiveTab('idea'); setError(null) }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${activeTab === 'idea' ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
        >
          <FontAwesomeIcon icon={faLightbulb} />
          Startup Blueprint
        </button>
        <button
          onClick={() => { setActiveTab('lesson'); setError(null) }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${activeTab === 'lesson' ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
        >
          <FontAwesomeIcon icon={faChalkboardTeacher} />
          Lesson Plan
        </button>
      </div>

      <div className='w-full bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 p-8 rounded-2xl shadow-xl dark:shadow-none transition-all duration-300 min-h-[500px] flex flex-col justify-between relative overflow-hidden'>

        {isLoading ? (
          <BlurReveal isLoading={isLoading} text={activeTab === 'idea' ? "AI Architect is structuring your roadmap..." : "AI is crafting your lesson plan..."} />
        ) : (
          <AnimatePresence mode='wait'>
            {activeTab === 'idea' ? (
              <motion.form
                key="idea-form"
                onSubmit={handleIdeaSubmit}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="flex-1 flex flex-col"
              >
                {/* Progress bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800">
                  <motion.div
                    className="h-full bg-cyan-500"
                    initial={{ width: '33%' }}
                    animate={{ width: `${(ideaData.step / 3) * 100}%` }}
                  />
                </div>

                <div className="flex-1 pt-6">
                  <AnimatePresence mode='wait'>
                    <motion.div
                      key={ideaData.step}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {ideaData.step === 1 && <StepOne ideaData={ideaData} updateData={updateData} />}
                      {ideaData.step === 2 && <StepTwo ideaData={ideaData} updateData={updateData} />}
                      {ideaData.step === 3 && <StepThree ideaData={ideaData} updateData={updateData} />}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm flex items-center gap-2">
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    {error}
                  </div>
                )}

                <div className="pt-6 border-t border-slate-200 dark:border-slate-700/50 flex justify-between items-center mt-6">
                  {ideaData.step > 1 ? (
                    <button type="button" onClick={handleBack} className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-medium px-4 py-2">
                      Back
                    </button>
                  ) : <div />}

                  {ideaData.step < 3 ? (
                    <button type="button" onClick={handleNext} className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold py-3 px-8 rounded-xl shadow-lg hover:scale-[1.02] transition-all">
                      Next Step
                    </button>
                  ) : (
                    <button type="submit" className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all">
                      <span>Generate Blueprint</span>
                      <FontAwesomeIcon icon={faBolt} />
                    </button>
                  )}
                </div>
              </motion.form>
            ) : (
              <motion.form
                key="lesson-form"
                onSubmit={handleLessonSubmit}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="flex-1 flex flex-col"
              >
                <div className="flex-1 pt-2">
                  <LessonForm lessonData={lessonData} setLessonData={setLessonData} />
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm flex items-center gap-2">
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    {error}
                  </div>
                )}

                <div className="pt-6 border-t border-slate-200 dark:border-slate-700/50 flex justify-end mt-6">
                  <button type="submit" className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all">
                    <span>Generate Lesson Plan</span>
                    <FontAwesomeIcon icon={faBook} />
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

export default Dashboard
