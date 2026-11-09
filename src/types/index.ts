export interface Chapter {
  id: string; // e.g. '12_1'
  num: number;
  grade: number;
  title: string;
  desc: string;
}

export interface TheoryCard {
  badge: string;
  title: string;
  summary?: string;
  content: string;
}

export interface QuestionPart1 {
  q: string;
  opts: string[];
  ans: number; // 0, 1, 2, 3
  level?: 'Biết' | 'Hiểu' | 'Vận dụng';
  exp: string;
}

export interface QuestionPart2Item {
  t: string;
  ans: boolean; // true = Đúng, false = Sai
}

export interface QuestionPart2 {
  q: string;
  items: QuestionPart2Item[];
  exp: string;
}

export interface QuestionPart3 {
  q: string;
  ans: string;
  exp: string;
}

export interface ChapterExamData {
  part1: QuestionPart1[];
  part2: QuestionPart2[];
  part3: QuestionPart3[];
}

export interface StudentProfile {
  name: string;
  class: string;
}

export interface ExamSubmission {
  id: number;
  studentName: string;
  className: string;
  grade: number;
  chapterId: string;
  chapterTitle: string;
  score: number;
  p1Correct: number;
  p2Correct: number;
  p3Correct: number;
  timeFormatted: string;
  rank: string;
  timestamp: string;
}

export interface PeriodicElement {
  z: number;
  sym: string;
  name: string;
  m: number;
  cat: 'kim-loai-kiem' | 'kiem-tho' | 'chuyen-tiep' | 'phi-kim' | 'khi-hiem';
  conf: string;
  en: number | null;
  desc: string;
}

export interface ElectrochemicalRow {
  pair: string;
  ox: string;
  red: string;
  e0: number;
  note: string;
}
