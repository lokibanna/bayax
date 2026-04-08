import React, { useState, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faExclamationTriangle, faRocket, faChartLine, faListCheck, faBrain, faChevronDown, faChevronUp, faCode, faSitemap, faArrowDown, faArrowRight, faPlus, faMinus, faFilePdf, faFileExport, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import BlurHeadline from '../components/BlurHeadline'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const Card = ({ children, className = "" }) => (
    <div className={`p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm ${className}`}>
        {children}
    </div>
)

const PhaseItem = ({ phase }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="border border-slate-200 dark:border-slate-800 rounded-xl mb-4 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
                <div className="font-bold text-slate-800 dark:text-slate-100">{phase.name}</div>
                <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} className="text-slate-500" />
            </button>
            {isOpen && (
                <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                    <ul className="space-y-3">
                        {phase.steps.map((step, i) => (
                            <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                                <div className="mt-1 w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center text-xs text-slate-400">
                                    {i + 1}
                                </div>
                                {step}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

// Simple Tree Visualization Component
const TreeView = ({ mindMap }) => {
    if (!mindMap) return null;

    return (
        <div className="flex flex-col items-center">
            <div className="p-4 bg-cyan-600 text-white font-bold rounded-lg shadow-lg mb-8 relative z-10">
                {mindMap.root}
            </div>

            <div className="flex flex-wrap justify-center gap-8 relative">
                {mindMap.branches.map((branch, i) => (
                    <div key={i} className="flex flex-col items-center relative">
                        {/* Vertical Line */}
                        <div className="h-8 w-px bg-slate-300 dark:bg-slate-600 mb-2"></div>

                        <div className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm font-semibold text-sm mb-4">
                            {branch.label}
                        </div>

                        <div className="flex flex-col gap-2">
                            {branch.children.map((child, j) => (
                                <div key={j} className="text-xs bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                                    {child}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// Logic Flow Visualization
const LogicFlowMap = ({ logic }) => {
    if (!logic) return null;

    return (
        <div className="flex flex-col items-center space-y-4 max-w-2xl mx-auto">
            {/* TOPIC */}
            <div className="w-full text-center">
                <div className="inline-block px-6 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-700">
                    {logic.topic}
                </div>
            </div>

            <FontAwesomeIcon icon={faArrowDown} className="text-slate-300" />

            {/* PROBLEM */}
            <div className="w-full p-5 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl text-center">
                <div className="text-xs font-bold text-red-500 uppercase mb-2">The Problem</div>
                <div className="text-slate-800 dark:text-slate-200 font-medium">{logic.problem}</div>
            </div>

            <FontAwesomeIcon icon={faArrowDown} className="text-slate-300" />

            {/* SOLUTION */}
            <div className="w-full p-5 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-xl text-center shadow-lg shadow-green-900/5">
                <div className="text-xs font-bold text-green-600 uppercase mb-2">The Solution</div>
                <div className="text-slate-900 dark:text-white font-bold text-lg">{logic.solution}</div>
            </div>

            <FontAwesomeIcon icon={faArrowDown} className="text-slate-300" />

            {/* EFFECTS */}
            <div className="grid grid-cols-2 gap-4 w-full">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-xs font-bold text-green-500 uppercase mb-2">
                        <FontAwesomeIcon icon={faPlus} />
                        Positive Impact
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{logic.marketEffects?.positive}</div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase mb-2">
                        <FontAwesomeIcon icon={faMinus} />
                        Risks / Negative
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{logic.marketEffects?.negative}</div>
                </div>
            </div>
        </div>
    )
}

const IdeaResult = () => {
    const location = useLocation()
    const result = location.state?.result
    const contentRef = useRef(null)

    if (!result) {
        return (
            <div className="min-h-screen pt-32 text-center text-slate-500">
                No idea analysis found. <Link to="/dashboard" className="text-cyan-500 underline">Start new analysis</Link>.
            </div>
        )
    }

    const { clarityCheck, marketAnalysis, executionStructure, criticalQuestions, techStack, mindMap, logicFlow } = result

    const downloadPDF = async () => {
        if (!contentRef.current) return;

        try {
            const canvas = await html2canvas(contentRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#0f172a' : '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

            // Allow multiple pages if needed, but for now fit to width with scrolling if needed or just fit height
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 10;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, canvas.height * pdfWidth / canvas.width);
            pdf.save('bayax-execution-plan.pdf');
        } catch (err) {
            console.error("PDF generation failed", err);
            alert("Could not generate PDF. Please try again.");
        }
    }

    const exportToNotionHelper = () => {
        // Simple Markdown export for now as a "Notion ready" format
        const text = `
# ${clarityCheck.refinedConcept}

## The Vision
${clarityCheck.originalInput}

## Logic Flow
**Problem:** ${logicFlow?.problem}
**Solution:** ${logicFlow?.solution}
**Impact:** ${logicFlow?.marketEffects?.positive}

## Market Analysis
**Score:** ${marketAnalysis.score}
**Verdict:** ${marketAnalysis.verdict}
**Audience:** ${marketAnalysis.targetAudience.join(', ')}

## Execution Roadmap
${executionStructure.phases.map(p => `### ${p.name}\n${p.steps.map(s => `- ${s}`).join('\n')}`).join('\n\n')}

## Recommended Tech Stack
- Frontend: ${techStack?.frontend}
- Backend: ${techStack?.backend}
- Database: ${techStack?.database}

## Critical Questions
${criticalQuestions?.map(q => `- ${q}`).join('\n')}
        `;

        navigator.clipboard.writeText(text);
        alert("Plan copied to clipboard as Markdown! You can paste this directly into Notion.");
    }

    return (
        <div className="min-h-screen pt-28 pb-20 px-4 sm:px-10 max-w-7xl mx-auto font-sans text-slate-900 dark:text-slate-200">

            <div className="flex justify-end gap-3 mb-6">
                <button onClick={downloadPDF} className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg text-sm font-bold transition-colors">
                    <FontAwesomeIcon icon={faFilePdf} />
                    Download PDF
                </button>
                <button onClick={exportToNotionHelper} className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg text-sm font-bold transition-colors">
                    <FontAwesomeIcon icon={faFileExport} />
                    Export to Notion
                </button>
            </div>

            <div ref={contentRef} className="p-4 sm:p-8 bg-white dark:bg-[#020617] rounded-3xl">
                {/* HEADER */}
                <div className="mb-12 text-center sm:text-left">
                    <div className="inline-block px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
                        Status: Analyzed
                    </div>
                    {/* Reduced font size for better readability on long titles */}
                    <BlurHeadline
                        text={clarityCheck.refinedConcept || "Refined Concept"}
                        className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4 leading-tight"
                    />
                    <p className="text-slate-500 text-lg max-w-3xl leading-relaxed">
                        "{clarityCheck.originalInput}"
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">

                    {/* LEFT COLUMN: Market & Stats */}
                    <div className="space-y-8">
                        <Card className="text-center">
                            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Market Proof Score</div>
                            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 mb-2">
                                {marketAnalysis.score}
                            </div>
                            <div className="inline-block px-3 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-sm">
                                {marketAnalysis.verdict}
                            </div>
                        </Card>

                        <Card>
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <FontAwesomeIcon icon={faChartLine} className="text-cyan-500" />
                                Target Data
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-xs text-slate-500 font-bold mb-1">AUDIENCE</div>
                                    <div className="flex flex-wrap gap-2">
                                        {marketAnalysis.targetAudience.map((a, i) => (
                                            <span key={i} className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-700 dark:text-slate-300">{a}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 font-bold mb-1">MONETIZATION</div>
                                    <div className="flex flex-wrap gap-2">
                                        {marketAnalysis.monetization.map((a, i) => (
                                            <span key={i} className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-1 rounded border border-green-200 dark:border-green-900">{a}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* TECH STACK CARD */}
                        {techStack && (
                            <Card>
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faCode} className="text-blue-500" />
                                    Recommended Tech
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                                        <span className="text-slate-500">Frontend</span>
                                        <span className="font-semibold">{techStack.frontend}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                                        <span className="text-slate-500">Backend</span>
                                        <span className="font-semibold">{techStack.backend}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                                        <span className="text-slate-500">Database</span>
                                        <span className="font-semibold">{techStack.database}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 italic mt-2">"{techStack.rationale}"</p>
                                </div>
                            </Card>
                        )}
                    </div>

                    {/* MIDDLE: Content */}
                    <div className="md:col-span-2 space-y-8">

                        {/* LOGIC FLOW (New Interaction) */}
                        {logicFlow && (
                            <Card>
                                <h3 className="font-bold mb-6 text-xl flex items-center gap-2">
                                    <FontAwesomeIcon icon={faArrowRight} className="text-green-500" />
                                    Logic Flow
                                </h3>
                                <LogicFlowMap logic={logicFlow} />
                            </Card>
                        )}

                        {/* VISUAL MIND MAP (Tree) */}
                        <Card className="min-h-[300px] overflow-x-auto">
                            <h3 className="font-bold mb-6 text-xl flex items-center gap-2">
                                <FontAwesomeIcon icon={faSitemap} className="text-purple-500" />
                                Blueprint Structure
                            </h3>
                            <div className="flex justify-center min-w-[500px]">
                                <TreeView mindMap={mindMap} />
                            </div>
                        </Card>

                        <Card>
                            <h3 className="font-bold mb-6 text-xl flex items-center gap-2">
                                <FontAwesomeIcon icon={faRocket} className="text-cyan-500" />
                                Execution Roadmap
                            </h3>
                            <div>
                                {executionStructure.phases.map((phase, i) => (
                                    <PhaseItem key={i} phase={phase} />
                                ))}
                            </div>
                        </Card>

                        <Card className="border-l-4 border-l-yellow-400 bg-yellow-50 dark:bg-yellow-900/10">
                            <h3 className="font-bold text-yellow-800 dark:text-yellow-500 mb-3 flex items-center gap-2">
                                <FontAwesomeIcon icon={faExclamationTriangle} />
                                Critical Questions
                            </h3>
                            <ul className="space-y-2">
                                {criticalQuestions?.map((q, i) => (
                                    <li key={i} className="text-sm text-yellow-900 dark:text-yellow-200/80">• {q}</li>
                                ))}
                            </ul>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default IdeaResult
