import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faArrowLeft, faFilePdf, faFileWord } from '@fortawesome/free-solid-svg-icons';
import GridBackground from '../components/ui/GridBackground';

const LessonResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const contentRef = useRef(null);

    // Safely access state
    const { lessonPlan, docxFile, filename } = location.state || {};

    if (!lessonPlan) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h2 className="text-2xl font-bold mb-4">No Lesson Plan Found</h2>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-cyan-500 text-white px-4 py-2 rounded-lg"
                >
                    Go Back to Dashboard
                </button>
            </div>
        );
    }

    const handleDownloadPDF = () => {
        // We assume html2pdf is loaded in index.html or imported if installed. 
        // Since we installed it via npm, we should import it.
        import('html2pdf.js').then((html2pdf) => {
            const element = contentRef.current;
            const opt = {
                margin: 0.5,
                filename: filename ? filename.replace('.docx', '.pdf') : 'lesson-plan.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf.default().set(opt).from(element).save();
        });
    };

    const handleDownloadDOCX = () => {
        if (!docxFile) return;

        // Convert base64 to blob
        const byteCharacters = atob(docxFile);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

        // Create download link
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename || 'lesson-plan.docx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className='min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative z-10'>
            {/* Navigation */}
            <div className="max-w-4xl mx-auto mb-6">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center text-slate-500 hover:text-cyan-500 transition-colors"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                    Back to Dashboard
                </button>
            </div>

            {/* Action Buttons */}
            <div className="max-w-4xl mx-auto mb-8 flex flex-wrap gap-4 justify-end">
                <button
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg shadow-red-500/30 transition-all transform hover:scale-105"
                >
                    <FontAwesomeIcon icon={faFilePdf} />
                    Download PDF
                </button>

                {docxFile && (
                    <button
                        onClick={handleDownloadDOCX}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg shadow-blue-600/30 transition-all transform hover:scale-105"
                    >
                        <FontAwesomeIcon icon={faFileWord} />
                        Download DOCX
                    </button>
                )}
            </div>

            {/* Content Display */}
            <div className="max-w-4xl mx-auto bg-white dark:bg-[#0f172a] shadow-2xl rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                <div ref={contentRef} className="p-8 sm:p-12 text-slate-800 dark:text-slate-200">

                    {/* Header */}
                    <div className="border-b border-slate-200 dark:border-slate-700 pb-6 mb-6">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{location.state?.topic || 'Lesson Plan'}</h1>
                        <div className="flex gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <p><span className="font-semibold">Subject:</span> {location.state?.subject}</p>
                            <p><span className="font-semibold">Grade:</span> {location.state?.grade}</p>
                            <p><span className="font-semibold">Duration:</span> {location.state?.duration} mins</p>
                        </div>
                    </div>

                    {/* Sections */}
                    <div className="space-y-8">
                        {/* Overview */}
                        <section>
                            <h2 className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">Overview</h2>
                            <p className="leading-relaxed">{lessonPlan.overview}</p>
                        </section>

                        {/* Curricular Goals & Competencies */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <section>
                                <h2 className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">Curricular Goals</h2>
                                <ul className="list-disc list-inside space-y-1">
                                    {Array.isArray(lessonPlan.curricularGoals) ? lessonPlan.curricularGoals.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    )) : <p>{lessonPlan.curricularGoals}</p>}
                                </ul>
                            </section>
                            <section>
                                <h2 className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">Curricular Competencies</h2>
                                <ul className="list-disc list-inside space-y-1">
                                    {Array.isArray(lessonPlan.curricularCompetencies) ? lessonPlan.curricularCompetencies.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    )) : <p>{lessonPlan.curricularCompetencies}</p>}
                                </ul>
                            </section>
                        </div>

                        {/* Knowledge */}
                        <section>
                            <h2 className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">Factual Knowledge</h2>
                            <ul className="list-disc list-inside space-y-1">
                                {Array.isArray(lessonPlan.factualKnowledge) ? lessonPlan.factualKnowledge.map((item, i) => (
                                    <li key={i}>{item}</li>
                                )) : <p>{lessonPlan.factualKnowledge}</p>}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">Teaching Points</h2>
                            <ul className="list-disc list-inside space-y-1">
                                {Array.isArray(lessonPlan.teachingPoints) ? lessonPlan.teachingPoints.map((item, i) => (
                                    <li key={i}>{item}</li>
                                )) : <p>{lessonPlan.teachingPoints}</p>}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">Activities</h2>
                            <ul className="list-decimal list-inside space-y-2">
                                {Array.isArray(lessonPlan.sequentialActivities) ? lessonPlan.sequentialActivities.map((item, i) => (
                                    <li key={i} className="pl-2">{item}</li>
                                )) : <p>{lessonPlan.sequentialActivities}</p>}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">Homework</h2>
                            <ul className="list-disc list-inside space-y-1">
                                {Array.isArray(lessonPlan.homework) ? lessonPlan.homework.map((item, i) => (
                                    <li key={i}>{item}</li>
                                )) : <p>{lessonPlan.homework}</p>}
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LessonResult;
