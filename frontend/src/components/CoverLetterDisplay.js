import React, { useState } from 'react';
import jsPDF from 'jspdf';

function CoverLetterDisplay({ coverLetter, onCoverLetterChange }) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        if (!coverLetter) return;
        navigator.clipboard.writeText(coverLetter).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Revert after 2 seconds
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
    };

    const handleDownload = () => {
        if (!coverLetter) return;
        const pdf = new jsPDF();
        const margin = 15;
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const textLines = pdf.splitTextToSize(coverLetter, pdfWidth - margin * 2);
        
        pdf.setFontSize(12);
        pdf.text(textLines, margin, margin);
        pdf.save('cover-letter.pdf');
    };

    return (
        <div className="mt-10 bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Your Generated Cover Letter</h2>
                <div className="flex space-x-2">
                    <button
                        onClick={handleCopy}
                        className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 ${
                            isCopied
                                ? 'bg-green-500 text-white focus:ring-green-500'
                                : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                        }`}
                        disabled={!coverLetter}
                    >
                        {isCopied ? 'Copied!' : 'Copy Text'}
                    </button>
                    <button
                        onClick={handleDownload}
                        className="px-4 py-2 text-sm font-medium rounded-md bg-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300"
                        disabled={!coverLetter}
                    >
                        Download PDF
                    </button>
                </div>
            </div>
            <textarea
                value={coverLetter}
                onChange={onCoverLetterChange}
                className="w-full p-4 border rounded-md bg-gray-50 h-96 overflow-y-auto focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                placeholder="Your cover letter will appear here..."
            />
        </div>
    );
}

export default CoverLetterDisplay;
