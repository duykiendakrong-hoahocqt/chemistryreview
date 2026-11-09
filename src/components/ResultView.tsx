import React from 'react';
import { Chapter, ChapterExamData, ExamSubmission } from '../types';

interface ResultViewProps {
  chapter: Chapter;
  examData: ChapterExamData;
  submission: ExamSubmission;
  userAnswers: {
    part1: Record<number, number>;
    part2: Record<string, boolean>;
    part3: Record<number, string>;
  };
  onRetake: () => void;
  onBackToHome: () => void;
  onAskAI: (question: string, explanation: string) => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  chapter,
  examData,
  submission,
  userAnswers,
  onRetake,
  onBackToHome,
  onAskAI
}) => {
  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Score Summary Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider">Kết quả kiểm tra</span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Học sinh: {submission.studentName} - {submission.className}
            </h3>
            <p className="text-xs text-slate-500">
              Khối {submission.grade} · Chương {chapter.num}: {submission.chapterTitle}
            </p>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-400">Thời gian làm bài</span>
            <p className="text-sm font-semibold text-slate-700">{submission.timeFormatted}</p>
          </div>
        </div>

        {/* Dashboard Metric Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-center shadow-sm">
            <span className="text-xs font-bold text-teal-800 uppercase">Tổng điểm</span>
            <div className="text-3xl sm:text-4xl font-extrabold text-teal-700 mt-1 font-mono tabular-nums">
              {submission.score.toFixed(2)}
            </div>
            <span className="text-[11px] text-teal-600 font-medium">Thang điểm 10</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-xs font-bold text-slate-600 uppercase">Phần I (MCQ)</span>
            <div className="text-xl sm:text-2xl font-bold text-slate-800 mt-1 font-mono">
              {(submission.p1Correct * 0.25).toFixed(2)} / 4.5
            </div>
            <span className="text-[11px] text-slate-500 font-medium">{submission.p1Correct}/18 câu đúng</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-xs font-bold text-slate-600 uppercase">Phần II (Đ/S)</span>
            <div className="text-xl sm:text-2xl font-bold text-slate-800 mt-1 font-mono">
              {(submission.p2Correct * 0.25).toFixed(2)} / 4.0
            </div>
            <span className="text-[11px] text-slate-500 font-medium">{submission.p2Correct}/16 ý đúng</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-xs font-bold text-slate-600 uppercase">Phần III (Ngắn)</span>
            <div className="text-xl sm:text-2xl font-bold text-slate-800 mt-1 font-mono">
              {(submission.p3Correct * 0.25).toFixed(2)} / 1.5
            </div>
            <span className="text-[11px] text-slate-500 font-medium">{submission.p3Correct}/6 câu đúng</span>
          </div>
        </div>

        {/* Pedagogical Evaluation Note */}
        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs sm:text-sm text-emerald-900 flex items-start gap-3">
          <i className="fa-solid fa-award text-emerald-600 text-xl mt-0.5"></i>
          <div>
            <p className="font-bold text-emerald-950 text-sm">
              Xếp loại năng lực: {submission.rank}
            </p>
            <p className="text-emerald-800 mt-1 leading-relaxed">
              {submission.score >= 9.0
                ? 'Tuyệt vời! Em có năng lực Hóa học rất cao, tư duy nhanh nhẹn và nắm bắt sâu sắc bản chất phản ứng.'
                : submission.score >= 8.0
                ? 'Rất tốt! Em nắm chắc lý thuyết và vận dụng tốt. Hãy rèn luyện thêm ở các câu trả lời ngắn để đạt điểm tuyệt đối.'
                : submission.score >= 6.5
                ? 'Khá tốt! Em đã hoàn thành tốt các câu hỏi cơ bản, cần chú ý tính toán cẩn thận hơn ở phần vận dụng.'
                : submission.score >= 5.0
                ? 'Em đã đạt yêu cầu cơ bản của chương. Hãy xem lại phần giải thích chi tiết các câu làm sai để củng cố kiến thức.'
                : 'Em cần dành thêm thời gian đọc lại lý thuyết SGK và luyện tập thêm các dạng bài nhận biết, thông hiểu.'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={onRetake}
            className="px-4 py-2 rounded-lg bg-teal-50 text-teal-800 hover:bg-teal-100 text-xs font-semibold border border-teal-300 transition flex items-center gap-1.5"
          >
            <i className="fa-solid fa-rotate-right"></i> Làm lại đề này
          </button>
          <button
            onClick={onBackToHome}
            className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-900 text-xs font-semibold transition flex items-center gap-1.5 shadow"
          >
            <i className="fa-solid fa-list-check"></i> Trở về danh mục chương
          </button>
        </div>
      </div>

      {/* Detailed Review Section */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <i className="fa-solid fa-clipboard-check text-teal-600"></i> Bảng Xem Lại Lời Giải Chi Tiết
        </h4>

        {/* Review Part 1 */}
        <div className="space-y-4">
          {examData.part1.map((q, idx) => {
            const userChoice = userAnswers.part1[idx];
            const isCorrect = userChoice === q.ans;
            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border ${
                  isCorrect ? 'border-emerald-200 bg-emerald-50/20' : 'border-rose-200 bg-rose-50/20'
                } space-y-3 bg-white`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    <span className={isCorrect ? 'text-emerald-700' : 'text-rose-700'}>
                      Câu {idx + 1} ({isCorrect ? 'ĐÚNG +0.25đ' : 'SAI 0đ'}):
                    </span>{' '}
                    {q.q}
                  </p>
                  <button
                    onClick={() => onAskAI(`Câu ${idx + 1}: ${q.q}`, q.exp)}
                    className="px-2.5 py-1 rounded bg-teal-100 hover:bg-teal-200 text-teal-800 text-[11px] font-semibold flex items-center gap-1 shrink-0 transition"
                  >
                    <i className="fa-solid fa-brain"></i> Hỏi Gia sư AI
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.opts.map((opt, oIdx) => {
                    let badgeClass = 'border-slate-200 bg-white text-slate-800';
                    if (oIdx === q.ans) badgeClass = 'border-emerald-400 bg-emerald-100 text-emerald-950 font-bold';
                    else if (oIdx === userChoice && !isCorrect) badgeClass = 'border-rose-400 bg-rose-100 text-rose-950 line-through';

                    return (
                      <div key={oIdx} className={`p-2 rounded-lg border ${badgeClass} flex items-center gap-2`}>
                        <span className="font-bold">{String.fromCharCode(65 + oIdx)}.</span>
                        <span>{opt}</span>
                        {oIdx === q.ans && <i className="fa-solid fa-check text-emerald-600 ml-auto"></i>}
                        {oIdx === userChoice && !isCorrect && <i className="fa-solid fa-xmark text-rose-600 ml-auto"></i>}
                      </div>
                    );
                  })}
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                  <strong className="text-teal-800">Giải thích đáp án:</strong> {q.exp}
                </div>
              </div>
            );
          })}
        </div>

        {/* Review Part 2 */}
        <div className="space-y-4">
          {examData.part2.map((q, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  <span className="text-emerald-700">Câu {19 + idx}:</span> {q.q}
                </p>
                <button
                  onClick={() => onAskAI(`Câu ${19 + idx}: ${q.q}`, q.exp)}
                  className="px-2.5 py-1 rounded bg-teal-100 hover:bg-teal-200 text-teal-800 text-[11px] font-semibold flex items-center gap-1 shrink-0 transition"
                >
                  <i className="fa-solid fa-brain"></i> Hỏi Gia sư AI
                </button>
              </div>

              <div className="space-y-1.5 text-xs">
                {q.items.map((it, itIdx) => {
                  const key = `${idx}_${itIdx}`;
                  const userChoice = userAnswers.part2[key];
                  const isItemCorrect = userChoice === it.ans;

                  return (
                    <div
                      key={itIdx}
                      className={`p-2.5 rounded-lg border ${
                        isItemCorrect ? 'border-emerald-200 bg-emerald-50/30' : 'border-rose-200 bg-rose-50/30'
                      } flex flex-col sm:flex-row sm:items-center justify-between gap-2`}
                    >
                      <span className="font-medium text-slate-800">{it.t}</span>
                      <div className="flex items-center gap-2 text-[11px] font-bold shrink-0">
                        <span className="text-slate-500">
                          Em chọn: {userChoice === true ? 'Đúng' : (userChoice === false ? 'Sai' : 'Chưa chọn')}
                        </span>
                        <span className={it.ans ? 'text-emerald-700' : 'text-rose-700'}>
                          · Đáp án: {it.ans ? 'Đúng' : 'Sai'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                <strong className="text-teal-800">Giải thích:</strong> {q.exp}
              </div>
            </div>
          ))}
        </div>

        {/* Review Part 3 */}
        <div className="space-y-4">
          {examData.part3.map((q, idx) => {
            const userVal = (userAnswers.part3[idx] || '').trim();
            const trueVal = q.ans.trim();
            const isCorrect = userVal.toLowerCase().replace(',', '.') === trueVal.toLowerCase().replace(',', '.');

            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border ${
                  isCorrect ? 'border-emerald-200 bg-emerald-50/20' : 'border-rose-200 bg-rose-50/20'
                } space-y-2 bg-white`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    <span className={isCorrect ? 'text-emerald-700' : 'text-rose-700'}>
                      Câu {23 + idx} ({isCorrect ? 'ĐÚNG' : 'SAI'}):
                    </span>{' '}
                    {q.q}
                  </p>
                  <button
                    onClick={() => onAskAI(`Câu ${23 + idx}: ${q.q}`, q.exp)}
                    className="px-2.5 py-1 rounded bg-teal-100 hover:bg-teal-200 text-teal-800 text-[11px] font-semibold flex items-center gap-1 shrink-0 transition"
                  >
                    <i className="fa-solid fa-brain"></i> Hỏi Gia sư AI
                  </button>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <span>
                    Em điền:{' '}
                    <strong className={`font-mono ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {userVal || '(Để trống)'}
                    </strong>
                  </span>
                  <span>
                    Đáp án đúng: <strong className="font-mono text-teal-800">{trueVal}</strong>
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                  <strong className="text-teal-800">Phương pháp giải:</strong> {q.exp}
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
