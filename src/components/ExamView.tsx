import React, { useState, useEffect } from 'react';
import { Chapter, ChapterExamData, StudentProfile } from '../types';

interface ExamViewProps {
  chapter: Chapter;
  examData: ChapterExamData;
  student: StudentProfile;
  onSubmit: (answers: {
    part1: Record<number, number>;
    part2: Record<string, boolean>;
    part3: Record<number, string>;
  }, secondsSpent: number) => void;
  onCancel: () => void;
  onOpenPeriodicTable: () => void;
  onOpenElectrochemical: () => void;
  onOpenSolubility: () => void;
}

export const ExamView: React.FC<ExamViewProps> = ({
  chapter,
  examData,
  student,
  onSubmit,
  onCancel,
  onOpenPeriodicTable,
  onOpenElectrochemical,
  onOpenSolubility
}) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(45 * 60); // 45 phút
  const [p1Answers, setP1Answers] = useState<Record<number, number>>({});
  const [p2Answers, setP2Answers] = useState<Record<string, boolean>>({});
  const [p3Answers, setP3Answers] = useState<Record<number, string>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [p1Answers, p2Answers, p3Answers]);

  const handleAutoSubmit = () => {
    alert('Đã hết thời gian làm bài 45 phút! Hệ thống đang tự động thu bài và chấm điểm.');
    onSubmit({ part1: p1Answers, part2: p2Answers, part3: p3Answers }, 45 * 60 - secondsLeft);
  };

  const handleManualSubmit = () => {
    const p1Count = Object.keys(p1Answers).length;
    const p2Count = Object.keys(p2Answers).length;
    const p3Count = Object.values(p3Answers).filter(v => v && v.trim() !== '').length;
    const totalAnswered = p1Count + Math.floor(p2Count / 4) + p3Count;

    if (totalAnswered < 20) {
      if (!window.confirm(`Em mới hoàn thành ${totalAnswered}/28 câu hỏi. Em có chắc chắn muốn nộp bài ngay bây giờ không?`)) {
        return;
      }
    } else {
      if (!window.confirm('Xác nhận hoàn thành bài làm và nộp để hệ thống chấm điểm?')) {
        return;
      }
    }

    const spent = Math.max(1, 45 * 60 - secondsLeft);
    onSubmit({ part1: p1Answers, part2: p2Answers, part3: p3Answers }, spent);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const isUrgent = secondsLeft < 300;

  const answeredTotal = Object.keys(p1Answers).length + 
    Math.floor(Object.keys(p2Answers).length / 4) + 
    Object.values(p3Answers).filter(v => v && v.trim() !== '').length;

  const scrollToQuestion = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Sticky Countdown & Quick Status Bar */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-teal-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-lg shadow-sm">
            <i className="fa-solid fa-stopwatch"></i>
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Khối {chapter.grade} · Chương {chapter.num}: {chapter.title}
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-800">
              Thí sinh: <span className="text-teal-700">{student.name} - {student.class}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Thời gian còn lại</div>
            <div className={`text-xl sm:text-2xl font-black font-mono tabular-nums leading-none ${isUrgent ? 'text-rose-600 animate-pulse' : 'text-teal-700'}`}>
              {timeFormatted}
            </div>
          </div>

          <div className="sm:hidden font-mono text-lg font-bold text-teal-700">
            {timeFormatted}
          </div>

          <button
            onClick={handleManualSubmit}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
          >
            <i className="fa-solid fa-paper-plane"></i> Nộp bài
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Main Questions Form (3 Cols on Desktop) */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* PHẦN I: 18 CÂU TRẮC NGHIỆM 4 LỰA CHỌN */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h4 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-teal-600 text-white text-xs flex items-center justify-center">I</span>
                PHẦN I: Câu trắc nghiệm nhiều phương án lựa chọn (18 câu - 4,5 điểm)
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Mỗi câu hỏi có 4 phương án (A, B, C, D), thí sinh chỉ chọn đúng 1 phương án duy nhất. Mỗi câu đúng được 0,25 điểm.
              </p>
            </div>

            <div className="space-y-6">
              {examData.part1.map((q, idx) => (
                <div key={idx} id={`p1-q-${idx}`} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      <span className="text-teal-700">Câu {idx + 1}:</span> {q.q}
                    </p>
                    <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0">
                      {q.level || 'Biết'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.opts.map((opt, optIdx) => {
                      const isChecked = p1Answers[idx] === optIdx;
                      return (
                        <label
                          key={optIdx}
                          className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition select-none ${
                            isChecked
                              ? 'bg-teal-50 border-teal-500 text-teal-950 font-semibold shadow-sm'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`p1_q_${idx}`}
                            checked={isChecked}
                            onChange={() => setP1Answers(prev => ({ ...prev, [idx]: optIdx }))}
                            className="text-teal-600 focus:ring-teal-500"
                          />
                          <span className="font-bold text-slate-500">{String.fromCharCode(65 + optIdx)}.</span>
                          <span>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PHẦN II: 4 CÂU ĐÚNG / SAI (16 Ý) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h4 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-emerald-600 text-white text-xs flex items-center justify-center">II</span>
                PHẦN II: Câu trắc nghiệm Đúng / Sai (4 câu - 4,0 điểm)
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Mỗi câu hỏi gồm 4 ý (a, b, c, d). Thí sinh chọn Đúng (Đ) hoặc Sai (S) cho từng ý. Mỗi ý đúng được 0,25 điểm.
              </p>
            </div>

            <div className="space-y-6">
              {examData.part2.map((q, qIdx) => (
                <div key={qIdx} id={`p2-q-${qIdx}`} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    <span className="text-emerald-700">Câu {19 + qIdx}:</span> {q.q}
                  </p>
                  
                  <div className="space-y-2">
                    {q.items.map((it, itIdx) => {
                      const key = `${qIdx}_${itIdx}`;
                      const val = p2Answers[key];
                      return (
                        <div key={itIdx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl border border-slate-200 bg-white text-xs">
                          <span className="text-slate-800 font-medium leading-relaxed">{it.t}</span>
                          <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                            <label className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border cursor-pointer font-bold transition ${val === true ? 'bg-teal-600 text-white border-teal-600 shadow-sm' : 'bg-slate-50 text-teal-800 border-slate-200 hover:bg-teal-50'}`}>
                              <input
                                type="radio"
                                name={`p2_${key}`}
                                checked={val === true}
                                onChange={() => setP2Answers(prev => ({ ...prev, [key]: true }))}
                                className="hidden"
                              />
                              <i className="fa-solid fa-check text-[10px]"></i> Đúng
                            </label>

                            <label className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border cursor-pointer font-bold transition ${val === false ? 'bg-rose-600 text-white border-rose-600 shadow-sm' : 'bg-slate-50 text-rose-800 border-slate-200 hover:bg-rose-50'}`}>
                              <input
                                type="radio"
                                name={`p2_${key}`}
                                checked={val === false}
                                onChange={() => setP2Answers(prev => ({ ...prev, [key]: false }))}
                                className="hidden"
                              />
                              <i className="fa-solid fa-xmark text-[10px]"></i> Sai
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PHẦN III: 6 CÂU TRẢ LỜI NGẮN */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h4 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-blue-600 text-white text-xs flex items-center justify-center">III</span>
                PHẦN III: Câu trắc nghiệm trả lời ngắn (6 câu - 1,5 điểm)
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Thí sinh điền đáp số dạng số nguyên, số thập phân hoặc công thức/tên chất vào ô trả lời. Mỗi câu đúng được 0,25 điểm.
              </p>
            </div>

            <div className="space-y-6">
              {examData.part3.map((q, idx) => (
                <div key={idx} id={`p3-q-${idx}`} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    <span className="text-blue-700">Câu {23 + idx}:</span> {q.q}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-500">Đáp số:</span>
                    <input
                      type="text"
                      placeholder="Nhập số hoặc từ khóa..."
                      value={p3Answers[idx] || ''}
                      onChange={(e) => setP3Answers(prev => ({ ...prev, [idx]: e.target.value }))}
                      className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white w-56 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Submit Button */}
          <div className="text-center pt-4">
            <button
              type="button"
              onClick={handleManualSubmit}
              className="px-10 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg transition"
            >
              <i className="fa-solid fa-circle-check mr-2"></i> Hoàn thành và Nộp bài thi
            </button>
          </div>

        </div>

        {/* Sidebar Question Palette / Sticky Jumper */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm sticky top-40 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="text-sm font-bold text-slate-900">Bảng câu hỏi</div>
              <div className="text-xs font-semibold text-teal-700">
                Đã làm: {answeredTotal}/28
              </div>
            </div>

            {/* Quick jump sections */}
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Phần I: 1 - 18
                </span>
                <div className="grid grid-cols-6 gap-1">
                  {examData.part1.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => scrollToQuestion(`p1-q-${i}`)}
                      className={`h-7 rounded text-[11px] font-mono font-semibold transition ${
                        p1Answers[i] !== undefined
                          ? 'bg-teal-600 text-white font-bold'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Phần II: 19 - 22
                </span>
                <div className="grid grid-cols-4 gap-1">
                  {examData.part2.map((_, i) => {
                    const count = [0, 1, 2, 3].filter(sub => p2Answers[`${i}_${sub}`] !== undefined).length;
                    return (
                      <button
                        key={i}
                        onClick={() => scrollToQuestion(`p2-q-${i}`)}
                        className={`h-7 rounded text-[11px] font-mono font-semibold transition ${
                          count === 4
                            ? 'bg-emerald-600 text-white font-bold'
                            : count > 0
                            ? 'bg-emerald-100 text-emerald-900 font-bold border border-emerald-300'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {19 + i}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Phần III: 23 - 28
                </span>
                <div className="grid grid-cols-6 gap-1">
                  {examData.part3.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => scrollToQuestion(`p3-q-${i}`)}
                      className={`h-7 rounded text-[11px] font-mono font-semibold transition ${
                        p3Answers[i] && p3Answers[i].trim() !== ''
                          ? 'bg-blue-600 text-white font-bold'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {23 + i}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick floating reference tool triggers */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <span className="text-[11px] text-slate-400 font-medium block">Tiện ích tra cứu nổi:</span>
              <div className="grid grid-cols-3 gap-1 text-[10px] font-semibold">
                <button
                  onClick={onOpenPeriodicTable}
                  className="p-1.5 rounded-lg bg-teal-50 text-teal-800 hover:bg-teal-100 transition text-center"
                >
                  <i className="fa-solid fa-table-cells block text-xs mb-0.5"></i> Tuần hoàn
                </button>
                <button
                  onClick={onOpenElectrochemical}
                  className="p-1.5 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 transition text-center"
                >
                  <i className="fa-solid fa-bolt block text-xs mb-0.5"></i> Điện hóa
                </button>
                <button
                  onClick={onOpenSolubility}
                  className="p-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 transition text-center"
                >
                  <i className="fa-solid fa-droplet block text-xs mb-0.5"></i> Tính tan
                </button>
              </div>
            </div>

            <button
              onClick={onCancel}
              className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-rose-600 transition text-center"
            >
              Hủy bài thi và thoát
            </button>

          </div>
        </div>

      </div>

    </div>
  );
};
