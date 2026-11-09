import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PeriodicTableModal } from './components/PeriodicTableModal';
import { ElectrochemicalModal } from './components/ElectrochemicalModal';
import { SolubilityModal } from './components/SolubilityModal';
import { StudentModal } from './components/StudentModal';
import { AdminModal } from './components/AdminModal';
import { AITutorModal } from './components/AITutorModal';
import { TheoryView } from './components/TheoryView';
import { ExamView } from './components/ExamView';
import { ResultView } from './components/ResultView';
import { AdminPortal } from './components/AdminPortal';
import { CURRICULUM, DEFAULT_EXAM_BANK } from './data/curriculum';
import { Chapter, StudentProfile, ExamSubmission, ChapterExamData } from './types';

export default function App() {
  // Navigation State
  const [currentGrade, setCurrentGrade] = useState<number>(12);
  const [selectedChapterId, setSelectedChapterId] = useState<string>('12_1');
  const [chapterTab, setChapterTab] = useState<'theory' | 'exam'>('theory');
  const [currentView, setCurrentView] = useState<'home' | 'chapter' | 'exam' | 'result' | 'admin'>('home');

  // Student Profile
  const [student, setStudent] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('dakrong_student');
      return saved ? JSON.parse(saved) : { name: 'Nguyễn Văn An', class: '12A1' };
    } catch {
      return { name: 'Nguyễn Văn An', class: '12A1' };
    }
  });

  // Modals state
  const [isPeriodicOpen, setIsPeriodicOpen] = useState(false);
  const [isElectroOpen, setIsElectroOpen] = useState(false);
  const [isSolubilityOpen, setIsSolubilityOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [aiTutorData, setAiTutorData] = useState<{ open: boolean; question: string; exp: string }>({
    open: false,
    question: '',
    exp: ''
  });

  // Exam Submissions History
  const [submissions, setSubmissions] = useState<ExamSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('dakrong_submissions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Custom Teacher-Added Questions
  const [customBank, setCustomBank] = useState<Record<string, ChapterExamData>>(() => {
    try {
      const saved = localStorage.getItem('dakrong_custom_questions');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Current Exam Active Result
  const [lastSubmission, setLastSubmission] = useState<ExamSubmission | null>(null);
  const [lastUserAnswers, setLastUserAnswers] = useState<{
    part1: Record<number, number>;
    part2: Record<string, boolean>;
    part3: Record<number, string>;
  }>({ part1: {}, part2: {}, part3: {} });

  // Toast state
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
    }, 3500);
  };

  // Save student to localStorage
  const handleSaveStudent = (newStudent: StudentProfile) => {
    setStudent(newStudent);
    localStorage.setItem('dakrong_student', JSON.stringify(newStudent));
    showToast(`Đã lưu thông tin: ${newStudent.name} - ${newStudent.class}`);
  };

  // Save Submissions
  const handleSaveSubmission = (newSub: ExamSubmission) => {
    const updated = [newSub, ...submissions];
    setSubmissions(updated);
    localStorage.setItem('dakrong_submissions', JSON.stringify(updated));
  };

  // Clear History
  const handleClearHistory = () => {
    if (window.confirm('CẢNH BÁO: Thầy/Cô có chắc chắn muốn xóa toàn bộ lịch sử thi? Thao tác này không thể hoàn tác.')) {
      setSubmissions([]);
      localStorage.removeItem('dakrong_submissions');
      showToast('Đã xóa sạch lịch sử bài thi.');
    }
  };

  // Save Custom Questions from Admin
  const handleSaveCustomQuestions = (chapterId: string, questions: Partial<ChapterExamData>) => {
    const base = customBank[chapterId] || DEFAULT_EXAM_BANK[chapterId] || DEFAULT_EXAM_BANK['12_1'];
    const updated: ChapterExamData = {
      part1: questions.part1 ? [...questions.part1, ...(base.part1 || [])].slice(0, 18) : base.part1,
      part2: questions.part2 ? [...questions.part2, ...(base.part2 || [])].slice(0, 4) : base.part2,
      part3: questions.part3 ? [...questions.part3, ...(base.part3 || [])].slice(0, 6) : base.part3
    };

    const newBank = { ...customBank, [chapterId]: updated };
    setCustomBank(newBank);
    localStorage.setItem('dakrong_custom_questions', JSON.stringify(newBank));
  };

  // Get active chapter object
  const currentChapterList = CURRICULUM[currentGrade] || [];
  const currentChapter: Chapter = currentChapterList.find(c => c.id === selectedChapterId) || currentChapterList[0] || {
    id: `${currentGrade}_1`,
    num: 1,
    grade: currentGrade,
    title: 'Chương 1',
    desc: 'Chương trình chuẩn Hóa học THPT'
  };

  // Get active exam questions for selected chapter
  const currentExamData: ChapterExamData = customBank[selectedChapterId] || DEFAULT_EXAM_BANK[selectedChapterId] || DEFAULT_EXAM_BANK['12_1'];

  // Handle Exam Submission
  const handleExamSubmit = (answers: {
    part1: Record<number, number>;
    part2: Record<string, boolean>;
    part3: Record<number, string>;
  }, secondsSpent: number) => {
    let p1Correct = 0;
    currentExamData.part1.forEach((q, idx) => {
      if (answers.part1[idx] === q.ans) p1Correct++;
    });

    let p2Correct = 0;
    currentExamData.part2.forEach((q, idx) => {
      q.items.forEach((it, itIdx) => {
        if (answers.part2[`${idx}_${itIdx}`] === it.ans) p2Correct++;
      });
    });

    let p3Correct = 0;
    currentExamData.part3.forEach((q, idx) => {
      const user = (answers.part3[idx] || '').trim().toLowerCase().replace(',', '.');
      const trueAns = q.ans.trim().toLowerCase().replace(',', '.');
      if (user && user === trueAns) p3Correct++;
    });

    const totalScore = Math.min(10, Math.round((p1Correct * 0.25 + p2Correct * 0.25 + p3Correct * 0.25) * 100) / 100);

    let rank = 'Cần cố gắng';
    if (totalScore >= 9.0) rank = 'Xuất sắc';
    else if (totalScore >= 8.0) rank = 'Giỏi';
    else if (totalScore >= 6.5) rank = 'Khá';
    else if (totalScore >= 5.0) rank = 'Đạt';

    const minutes = Math.floor(secondsSpent / 60);
    const secs = secondsSpent % 60;
    const timeFormatted = `${minutes} phút ${secs} giây`;

    const subRecord: ExamSubmission = {
      id: Date.now(),
      studentName: student.name,
      className: student.class,
      grade: currentGrade,
      chapterId: currentChapter.id,
      chapterTitle: currentChapter.title,
      score: totalScore,
      p1Correct,
      p2Correct,
      p3Correct,
      timeFormatted,
      rank,
      timestamp: new Date().toLocaleString('vi-VN')
    };

    setLastSubmission(subRecord);
    setLastUserAnswers(answers);
    handleSaveSubmission(subRecord);
    setCurrentView('result');
    showToast(`Đã nộp bài! Điểm của em: ${totalScore.toFixed(2)}/10`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGrade = (grade: number) => {
    setCurrentGrade(grade);
    const firstChap = (CURRICULUM[grade] || [])[0];
    if (firstChap) setSelectedChapterId(firstChap.id);
    setCurrentView('home');
  };

  const handleOpenChapter = (chapId: string) => {
    setSelectedChapterId(chapId);
    setChapterTab('theory');
    setCurrentView('chapter');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 font-sans antialiased">
      
      {/* Navigation Bar */}
      <Navbar
        currentGrade={currentGrade}
        onSelectGrade={handleSelectGrade}
        onNavigateHome={() => setCurrentView('home')}
        student={student}
        onOpenStudentModal={() => setIsStudentModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onOpenPeriodicTable={() => setIsPeriodicOpen(true)}
        onOpenElectrochemical={() => setIsElectroOpen(true)}
        onOpenSolubility={() => setIsSolubilityOpen(true)}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* VIEW 1: TRANG CHỦ / DANH MỤC CHƯƠNG */}
        {currentView === 'home' && (
          <section className="space-y-6 animate-fadeIn">
            {/* Hero Banner THPT Đakrông */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0f393b] via-[#115e59] to-[#0d9488] p-6 sm:p-8 text-white shadow-xl">
              <div className="absolute -right-8 -bottom-8 opacity-10 text-white text-9xl pointer-events-none">
                <i className="fa-solid fa-atom"></i>
              </div>
              <div className="relative z-10 max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-semibold text-teal-200">
                  <i className="fa-solid fa-graduation-cap"></i> Trường THPT Đakrông - Năm học 2025 - 2026
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                  Ôn Luyện & Đánh Giá Năng Lực Hóa Học
                </h2>
                <p className="text-sm sm:text-base text-teal-100/90 leading-relaxed">
                  Hệ thống bám sát định hướng Chương trình Giáo dục Phổ thông 2018 (SGK Kết Nối Tri Thức Với Cuộc Sống). Rèn luyện tư duy hóa học thực nghiệm, củng cố lý thuyết trọng tâm và làm bài kiểm tra 45 phút chuẩn cấu trúc trắc nghiệm mới của Bộ GD&ĐT.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-teal-200">
                  <span className="flex items-center gap-1.5"><i className="fa-solid fa-check-circle text-emerald-300"></i> Ma trận 40% Biết - 30% Hiểu - 30% Vận dụng</span>
                  <span className="hidden sm:inline">·</span>
                  <span className="flex items-center gap-1.5"><i className="fa-solid fa-check-circle text-emerald-300"></i> Chấm điểm tức thì & Lời giải sư phạm</span>
                  <span className="hidden sm:inline">·</span>
                  <span className="flex items-center gap-1.5"><i className="fa-solid fa-check-circle text-emerald-300"></i> Đầy đủ 21 chương 3 khối lớp</span>
                </div>
              </div>
            </div>

            {/* Tiêu đề khối lớp đang chọn */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <i className="fa-solid fa-layer-group text-teal-600"></i> Danh mục chương trình Hóa học Lớp {currentGrade}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  {currentChapterList.length} chương chuẩn SGK Kết Nối Tri Thức Với Cuộc Sống
                </p>
              </div>
              <span className="text-xs text-slate-500 hidden sm:inline">
                Mẹo: Bấm vào thẻ chương để ôn lý thuyết hoặc làm đề 45 phút
              </span>
            </div>

            {/* Grid các chương */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {currentChapterList.map(ch => (
                <div
                  key={ch.id}
                  onClick={() => handleOpenChapter(ch.id)}
                  className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-slate-200 hover:border-teal-400 transition-all duration-200 cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                        Chương {ch.num}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">Hóa học {ch.grade}</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-700 transition line-clamp-1">
                      {ch.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{ch.desc}</p>
                  </div>

                  <div className="pt-5 border-t border-slate-100 flex items-center justify-between mt-4">
                    <span className="text-xs font-semibold text-teal-600 group-hover:translate-x-1 transition flex items-center gap-1.5">
                      Học & Kiểm tra <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </span>
                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                      <span title="Lý thuyết"><i className="fa-solid fa-book-open"></i></span>
                      <span title="Kiểm tra 45 phút"><i className="fa-solid fa-file-pen"></i></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* VIEW 2: CHI TIẾT CHƯƠNG (LÝ THUYẾT & CHUẨN BỊ THI) */}
        {currentView === 'chapter' && (
          <section className="space-y-6 animate-fadeIn">
            {/* Back button */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentView('home')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-teal-800 hover:text-teal-950 transition"
              >
                <i className="fa-solid fa-arrow-left"></i> Quay lại danh mục chương
              </button>
              <div className="text-xs font-semibold px-3 py-1 rounded-md bg-teal-100 text-teal-900 border border-teal-200">
                Lớp {currentGrade}
              </div>
            </div>

            {/* Chapter Header Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
                  Chương {currentChapter.num}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  {currentChapter.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {currentChapter.desc}
                </p>
              </div>

              {/* Tab Switcher */}
              <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0 self-start md:self-center">
                <button
                  onClick={() => setChapterTab('theory')}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition flex items-center gap-2 ${
                    chapterTab === 'theory' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <i className="fa-solid fa-book-open text-teal-600"></i> Hệ Thống Lý Thuyết
                </button>
                <button
                  onClick={() => setChapterTab('exam')}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition flex items-center gap-2 ${
                    chapterTab === 'exam' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <i className="fa-solid fa-file-pen text-emerald-600"></i> Đề Kiểm Tra (45 Phút)
                </button>
              </div>
            </div>

            {/* Tab 1: Theory View */}
            {chapterTab === 'theory' && (
              <TheoryView chapter={currentChapter} />
            )}

            {/* Tab 2: Exam Intro Card */}
            {chapterTab === 'exam' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 text-center max-w-3xl mx-auto space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto text-3xl border border-teal-200 shadow-sm">
                  <i className="fa-solid fa-stopwatch"></i>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900">Đề Kiểm Tra Đánh Giá Năng Lực 45 Phút</h3>
                  <p className="text-sm text-slate-600 max-w-xl mx-auto">
                    Cấu trúc chuẩn theo mô hình định dạng mới nhất của Bộ Giáo dục & Đào tạo gồm 28 câu hỏi (Thang điểm 10):
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-bold text-teal-700 uppercase">Phần I</span>
                    <p className="text-sm font-semibold text-slate-900 mt-1">18 câu Trắc nghiệm 4 lựa chọn</p>
                    <p className="text-xs text-slate-500 mt-0.5">0,25 đ/câu (Tổng 4,5 điểm)</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-bold text-emerald-700 uppercase">Phần II</span>
                    <p className="text-sm font-semibold text-slate-900 mt-1">4 câu Đúng / Sai (16 ý)</p>
                    <p className="text-xs text-slate-500 mt-0.5">0,25 đ/ý đúng (Tổng 4,0 điểm)</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-bold text-blue-700 uppercase">Phần III</span>
                    <p className="text-sm font-semibold text-slate-900 mt-1">6 câu Trả lời ngắn</p>
                    <p className="text-xs text-slate-500 mt-0.5">0,25 đ/câu (Tổng 1,5 điểm)</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/60 text-xs text-teal-900 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-user-graduate text-teal-600 text-sm"></i>
                    Thí sinh: <strong>{student.name} - {student.class}</strong>
                  </span>
                  <button
                    onClick={() => setIsStudentModalOpen(true)}
                    className="text-teal-700 underline font-semibold hover:text-teal-900"
                  >
                    Thay đổi
                  </button>
                </div>

                <button
                  onClick={() => {
                    setCurrentView('exam');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-base shadow-lg shadow-teal-700/20 transition transform active:scale-95 inline-flex items-center gap-2"
                >
                  <i className="fa-solid fa-play"></i> Bắt đầu làm bài thi
                </button>
              </div>
            )}
          </section>
        )}

        {/* VIEW 3: PHÒNG THI ĐANG LÀM BÀI */}
        {currentView === 'exam' && (
          <ExamView
            chapter={currentChapter}
            examData={currentExamData}
            student={student}
            onSubmit={handleExamSubmit}
            onCancel={() => setCurrentView('chapter')}
            onOpenPeriodicTable={() => setIsPeriodicOpen(true)}
            onOpenElectrochemical={() => setIsElectroOpen(true)}
            onOpenSolubility={() => setIsSolubilityOpen(true)}
          />
        )}

        {/* VIEW 4: KẾT QUẢ VÀ XEM LẠI CHI TIẾT */}
        {currentView === 'result' && lastSubmission && (
          <ResultView
            chapter={currentChapter}
            examData={currentExamData}
            submission={lastSubmission}
            userAnswers={lastUserAnswers}
            onRetake={() => {
              setCurrentView('exam');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackToHome={() => setCurrentView('home')}
            onAskAI={(question, exp) => setAiTutorData({ open: true, question, exp })}
          />
        )}

        {/* VIEW 5: CỔNG QUẢN TRỊ VIÊN DÀNH CHO GIÁO VIÊN */}
        {currentView === 'admin' && (
          <AdminPortal
            submissions={submissions}
            onExit={() => setCurrentView('home')}
            onClearHistory={handleClearHistory}
            onSaveCustomQuestions={handleSaveCustomQuestions}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-700 flex items-center justify-center text-white font-bold text-sm">
              <i className="fa-solid fa-flask"></i>
            </div>
            <div>
              <p className="font-bold text-slate-200 text-sm">TRƯỜNG THPT ĐAKRÔNG - TỔ HÓA HỌC</p>
              <p className="text-[11px] text-slate-400">Ứng dụng Ôn luyện & Đánh giá năng lực môn Hóa học (Chương trình GDPT 2018)</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span>Kết Nối Tri Thức Với Cuộc Sống</span>
            <span>·</span>
            <span>Hỗ trợ ôn thi Tốt nghiệp THPT 2025</span>
            <span>·</span>
            <span>Bản quyền © 2025 THPT Đakrông</span>
          </div>
        </div>
      </footer>

      {/* Floating Utilities Modals */}
      <PeriodicTableModal
        isOpen={isPeriodicOpen}
        onClose={() => setIsPeriodicOpen(false)}
      />

      <ElectrochemicalModal
        isOpen={isElectroOpen}
        onClose={() => setIsElectroOpen(false)}
      />

      <SolubilityModal
        isOpen={isSolubilityOpen}
        onClose={() => setIsSolubilityOpen(false)}
      />

      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        student={student}
        onSave={handleSaveStudent}
      />

      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSuccess={() => {
          setCurrentView('admin');
          showToast('Đăng nhập Quản trị viên thành công!');
        }}
      />

      <AITutorModal
        isOpen={aiTutorData.open}
        onClose={() => setAiTutorData({ open: false, question: '', exp: '' })}
        question={aiTutorData.question}
        explanation={aiTutorData.exp}
      />

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-xl text-white text-xs font-semibold flex items-center gap-2 bg-slate-900 border border-slate-700 animate-slideUp">
          <i className="fa-solid fa-circle-check text-emerald-400 text-sm"></i>
          <span>{toastMsg}</span>
        </div>
      )}

    </div>
  );
}
