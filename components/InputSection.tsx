
import React, { useCallback } from 'react';

interface InputSectionProps {
  userProfile: File | null;
  setUserProfile: (file: File | null) => void;
  jobTitle: string;
  setJobTitle: (value: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

// --- ICONS ---
const AnalyzeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
  </svg>
);

const LoadingSpinner: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 17.25V6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v10.5A2.25 2.25 0 0118.75 19.5H5.25A2.25 2.25 0 013 17.25z" />
    </svg>
);

const DocumentIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);


export const InputSection: React.FC<InputSectionProps> = ({
  userProfile,
  setUserProfile,
  jobTitle,
  setJobTitle,
  onAnalyze,
  isLoading,
}) => {

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setUserProfile(file);
      } else {
        alert("Please upload a PDF file.");
        e.target.value = '';
      }
    }
  }, [setUserProfile]);

  const onFileContainerClick = () => {
    document.getElementById('file-upload')?.click();
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-lg shadow-lg border border-slate-700">
      <h2 className="text-2xl font-bold mb-4 text-slate-100">Your Details</h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="file-upload" className="block text-sm font-medium text-slate-300 mb-2">
            Upload Your Resume (PDF only)
          </label>
           <div 
            onClick={onFileContainerClick}
            className="mt-2 flex justify-center items-center flex-col w-full h-48 rounded-lg border-2 border-dashed border-slate-600 hover:border-cyan-500 transition-colors duration-300 cursor-pointer p-6 text-center bg-slate-900/50"
          >
            {userProfile ? (
              <div className="flex flex-col items-center">
                <DocumentIcon className="w-12 h-12 text-green-400 mb-2" />
                <p className="font-semibold text-slate-200">{userProfile.name}</p>
                <p className="text-xs text-slate-400">{(userProfile.size / 1024).toFixed(2)} KB</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setUserProfile(null);
                    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
                    if(fileInput) fileInput.value = '';
                  }}
                  className="mt-3 text-sm text-red-400 hover:text-red-300 font-semibold"
                >
                  Remove File
                </button>
              </div>
            ) : (
               <div className="flex flex-col items-center pointer-events-none">
                 <UploadIcon className="w-12 h-12 text-slate-500 mb-2"/>
                 <p className="text-slate-400"><span className="font-semibold text-cyan-400">Click to upload</span> or drag and drop</p>
                 <p className="text-xs text-slate-500">PDF up to 10MB</p>
              </div>
            )}
             <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf" disabled={isLoading} />
          </div>
        </div>
        <div>
          <label htmlFor="job-title" className="block text-sm font-medium text-slate-300 mb-2">
            Job Title
          </label>
          <input
            id="job-title"
            type="text"
            className="w-full bg-slate-900 border border-slate-700 rounded-md p-3 text-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            placeholder="e.g., Senior Frontend Developer"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            disabled={isLoading}
            aria-label="Job Title Input"
          />
        </div>
        <button
          onClick={onAnalyze}
          disabled={isLoading || !userProfile || !jobTitle}
          className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-cyan-500/30"
          aria-live="polite"
        >
          {isLoading ? (
            <>
              <LoadingSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <AnalyzeIcon className="w-5 h-5" />
              <span>Analyze Fit</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
