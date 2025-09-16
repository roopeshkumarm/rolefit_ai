import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { ResultsDisplay } from './components/ResultsDisplay';
import type { AnalysisResult } from './types';
import { getAnalysis } from './services/geminiService';

const App: React.FC = () => {
  const [userProfile, setUserProfile] = useState<File | null>(null);
  const [jobTitle, setJobTitle] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAnalyze = useCallback(async () => {
    if (!userProfile || !jobTitle) {
      setError('Please upload your resume and provide a job title.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const base64Profile = await fileToBase64(userProfile);
      const result = await getAnalysis(base64Profile, jobTitle, userProfile.type);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [userProfile, jobTitle]);

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-200">
      <Header />
      <main className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col gap-8">
          <div className="max-w-3xl mx-auto w-full">
            <InputSection
              userProfile={userProfile}
              setUserProfile={setUserProfile}
              jobTitle={jobTitle}
              setJobTitle={setJobTitle}
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
            />
          </div>

          <div className="max-w-3xl mx-auto w-full">
            <ResultsDisplay
              result={analysisResult}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
