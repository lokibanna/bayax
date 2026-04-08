import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Faq from './pages/Faq'
import Pricing from './pages/Pricing'
import Layout from './components/Layout'
import Authsignin from './pages/Authsignin'
import AuthSignup from './pages/AuthSignup'
import NoPage from './pages/NoPage'
import Dashboard from './pages/Dashboard'
import LessonResult from './pages/LessonResult'
import IdeaResult from './pages/IdeaResult'
import { RecoilRoot } from 'recoil'
import UserProfile from './pages/UserProfile'
import ProtectedRoutes from './components/ProtectedRoutes'
import { ThemeProvider } from './context/ThemeContext'
import GridBackground from './components/ui/GridBackground'

const App = () => {
  return (
    <ThemeProvider>
      <div className='font-fontOne min-h-screen relative text-slate-900 dark:text-slate-100 bg-white dark:bg-[#020617] transition-colors duration-300 selection:bg-cyan-500 selection:text-white'>
        <GridBackground />
        <div className="relative z-10">
          <RecoilRoot>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/pricing' element={<Pricing />} />
                  <Route path='/Faq' element={<Faq />} />
                  <Route element={<ProtectedRoutes />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/lesson-result' element={<LessonResult />} />
                    <Route path='/idea-result' element={<IdeaResult />} />
                    <Route path='/user/profile' element={<UserProfile />} />
                  </Route>
                </Route>
                {/* routes outside the layout thing  */}
                <Route path='/auth/signin' element={<Authsignin />} />
                <Route path='/auth/signup' element={<AuthSignup />} />
                <Route path='*' element={<NoPage />} />
              </Routes>
            </BrowserRouter>
          </RecoilRoot>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App