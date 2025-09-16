export interface AnalysisResult {
  matchPercentage: number; // now represents ATS score
  summary: string;
  matchingSkills: string[];
  missingSkills: string[];
  careerGuidance: string;
  interviewQuestions: string[];
}
