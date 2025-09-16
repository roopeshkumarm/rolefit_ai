import React from 'react';
import type { AnalysisResult } from '../types';

interface ResultsDisplayProps {
  result: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
}

// --- SVG Icons ---
const ErrorIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
);
const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
  </svg>
);
const XCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
  </svg>
);
const LightBulbIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311a15.045 15.045 0 01-7.5 0C4.508 19.64 3 17.414 3 14.846c0-1.487.65-2.823 1.697-3.757A10.5 10.5 0 0112 3c2.973 0 5.706 1.22 7.643 3.288a7.877 7.877 0 011.697 3.757c0 2.568-1.508 4.794-3.75 5.485z" />
    </svg>
);

// --- Sub-components ---

const ScoreGauge: React.FC<{ score: number }> = ({ score }) => {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const scoreColor = score < 40 ? 'text-red-400' : score < 70 ? 'text-yellow-400' : 'text-green-400';
  const trackColor = score < 40 ? 'stroke-red-400/20' : score < 70 ? 'stroke-yellow-400/20' : 'stroke-green-400/20';
  const progressColor = score < 40 ? 'stroke-red-400' : score < 70 ? 'stroke-yellow-400' : 'stroke-green-400';
  
  return (
    <div className="relative flex items-center justify-center w-36 h-36">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
        <circle
          className={trackColor}
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
        />
        <circle
          className={`${progressColor} transition-all duration-1000 ease-out`}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
          style={{ transitionProperty: 'stroke-dashoffset' }}
        />
      </svg>
      <span className={`absolute text-4xl font-bold ${scoreColor}`}>
        {score}
        <span className="text-2xl">%</span>
      </span>
    </div>
  );
};


const LoadingSkeleton: React.FC = () => (
  <div className="bg-slate-800/50 p-6 rounded-lg shadow-lg border border-slate-700 animate-pulse w-full">
    <div className="flex items-center justify-center mb-6">
        <div className="w-36 h-36 bg-slate-700 rounded-full"></div>
    </div>
    <div className="h-4 bg-slate-700 rounded w-3/4 mx-auto mb-8"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
            <div className="h-5 bg-slate-700 rounded w-1/2 mb-4"></div>
            <div className="flex flex-wrap gap-2">
                <div className="h-6 bg-slate-700 rounded-full w-20"></div>
                <div className="h-6 bg-slate-700 rounded-full w-24"></div>
                <div className="h-6 bg-slate-700 rounded-full w-16"></div>
            </div>
        </div>
        <div>
            <div className="h-5 bg-slate-700 rounded w-1/2 mb-4"></div>
            <div className="flex flex-wrap gap-2">
                <div className="h-6 bg-slate-700 rounded-full w-28"></div>
                <div className="h-6 bg-slate-700 rounded-full w-20"></div>
            </div>
        </div>
    </div>
    <div className="h-5 bg-slate-700 rounded w-1/3 mb-4"></div>
    <div className="space-y-2 mb-8">
        <div className="h-4 bg-slate-700 rounded w/full"></div>
        <div className="h-4 bg-slate-700 rounded w-5/6"></div>
    </div>
    <div className="h-5 bg-slate-700 rounded w-1/3 mb-4"></div>
    <div className="space-y-4">
        <div className="h-10 bg-slate-700 rounded-lg w-full"></div>
        <div className="h-10 bg-slate-700 rounded-lg w-full"></div>
    </div>
  </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
  <div className="bg-red-900/20 border border-red-500/30 text-red-300 p-6 rounded-lg flex items-center gap-4 w/full">
    <ErrorIcon className="w-8 h-8 flex-shrink-0" />
    <div>
      <h3 className="font-bold text-lg">Analysis Failed</h3>
      <p className="text-sm">{message}</p>
    </div>
  </div>
);

const Placeholder: React.FC = () => (
  <div className="flex flex-col items-center justify-center bg-slate-800/50 p-6 rounded-lg shadow-lg border border-dashed border-slate-700 h/full min-h-[400px]">
    <h3 className="text-xl font-bold text-slate-300">Ready for Analysis</h3>
    <p className="text-slate-400 mt-2 text-center">
      Upload your resume, enter a job title, and hit 'Analyze Fit' to see your results here.
    </p>
  </div>
);

const AnalysisDetails: React.FC<{ result: AnalysisResult }> = ({ result }) => {
  const careerGuidancePoints = result.careerGuidance.split('\n').filter(line => line.trim() !== '');

  return (
      <div className="bg-slate-800/50 p-6 rounded-lg shadow-lg border border-slate-700 max-w-3xl mx-auto w-full">
        <div className="flex flex-col items-center text-center mb-6">
            <ScoreGauge score={result.matchPercentage} />
            <p className="mt-4 text-lg text-slate-300 max-w-xl italic">"{result.summary}"</p>
        </div>
        
        <div className="border-t border-slate-700 my-6"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-green-400">
                    <CheckCircleIcon className="w-5 h-5" /> Matching Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                    {result.matchingSkills.map((skill) => (
                        <span key={skill} className="bg-green-500/10 text-green-300 text-sm font-medium px-3 py-1 rounded-full">{skill}</span>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-yellow-400">
                    <XCircleIcon className="w-5 h-5" /> Skill Gaps
                </h3>
                <div className="flex flex-wrap gap-2">
                    {result.missingSkills.map((skill) => (
                        <span key={skill} className="bg-yellow-500/10 text-yellow-300 text-sm font-medium px-3 py-1 rounded-full">{skill}</span>
                    ))}
                </div>
            </div>
        </div>

        <div className="border-t border-slate-700 my-6"></div>
        
        <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-cyan-400">
                <LightBulbIcon className="w-5 h-5" /> Career Guidance
            </h3>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
                {careerGuidancePoints.map((point, index) => (
                    <li key={index}>{point}</li>
                ))}
            </ul>
        </div>
        
        <div className="border-t border-slate-700 my-6"></div>

        <div>
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">Anticipated Questions</h3>
            <div className="space-y-3">
                {result.interviewQuestions.map((question, index) => (
                    <div key={index} className="bg-slate-900/70 border border-slate-700 p-3 rounded-lg text-slate-300">
                        <p>{question}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};


// --- Main Component ---

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, isLoading, error }) => {
  return (
    <section aria-live="polite" className="w-full">
      {isLoading && <LoadingSkeleton />}
      {error && !isLoading && <ErrorDisplay message={error} />}
      {!result && !isLoading && !error && <Placeholder />}
      {result && !isLoading && !error && <AnalysisDetails result={result} />}
    </section>
  );
};
