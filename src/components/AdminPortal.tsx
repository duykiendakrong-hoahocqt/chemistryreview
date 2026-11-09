import React, { useState } from 'react';
import { CURRICULUM } from '../data/curriculum';
import { ExamSubmission, ChapterExamData, QuestionPart1 } from '../types';

interface AdminPortalProps {
  submissions: ExamSubmission[];
  onExit: () => void;
  onClearHistory: () => void;
  onSaveCustomQuestions: (chapterId: string, questions: Partial<ChapterExamData>) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  submissions,
  onExit,
  onClearHistory,
  onSaveCustomQuestions
}) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'parser' | 'manual'>('stats');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Parser State
  const [parserGrade, setParserGrade] = useState<number>(12);
  const [parserChapter, setParserChapter] = useState<string>('12_1');
  const [parserRawText, setParserRawText] = useState<string>('');
  const [parsedPreview, setParsedPreview] = useState<QuestionPart1[]>([]);

  // Manual State
  const [manGrade, setManGrade] = useState<number>(12);
  const [manChapter, setManChapter] = useState<string>('12_1');
  const [manPart, setManPart] = useState<'1' | '2' | '3'>('1');
  const [manLevel, setManLevel] = useState<'Biết' | 'Hiểu' | 'Vận dụng'>('Biết');
  const [manText, setManText] = useState<string>('');
  const [manExp, setManExp] = useState<string>('');

  // Manual part 1
  const [opt0, setOpt0] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [correctOpt, setCorrectOpt] = useState<number>(0);

  // Manual part 2
  const [p2Items, setP2Items] = useState([
    { t: '', ans: true },
    { t: '', ans: true },
    { t: '', ans: true },
    { t: '', ans: true }
  ]);

  // Manual part 3
  const [p3Ans, setP3Ans] = useState('');

  // Filter Submissions
  const filteredSubmissions = submissions.filter(s => {
    if (gradeFilter !== 'all' && s.grade.toString() !== gradeFilter) return false;
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      return s.studentName.toLowerCase().includes(q) || s.className.toLowerCase().includes(q);
    }
    return true;
  });

  // Calculate statistics
  const totalCount = filteredSubmissions.length;
  const avgScore = totalCount > 0
    ? (filteredSubmissions.reduce((acc, c) => acc + c.score, 0) / totalCount).toFixed(2)
    : '0.0';
  const maxScore = totalCount > 0
    ? Math.max(...filteredSubmissions.map(s => s.score)).toFixed(2)
    : '0.0';
  const passRate = totalCount > 0
    ? Math.round((filteredSubmissions.filter(s => s.score >= 5.0).length / totalCount) * 100)
    : 0;

  // Export CSV with UTF-8 BOM
  const handleExportCSV = () => {
    if (submissions.length === 0) {
      alert('Chưa có dữ liệu bài nộp để xuất file!');
      return;
    }

    let csvContent = '\uFEFFSTT,Họ và tên,Lớp,Khối,Chương kiểm tra,Điểm số (/10),Phần I (đúng),Phần II (đúng),Phần III (đúng),Xếp loại,Thời gian làm bài,Thời điểm nộp\n';

    submissions.forEach((s, idx) => {
      csvContent += `"${idx + 1}","${s.studentName}","${s.className}","Khối ${s.grade}","${s.chapterTitle}","${s.score}","${s.p1Correct}/18","${s.p2Correct}/16","${s.p3Correct}/6","${s.rank}","${s.timeFormatted}","${s.timestamp}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Bang_Diem_Hoa_Hoc_THPT_Dakrong_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Parser Logic
  const handleRunParser = () => {
    const raw = parserRawText.trim();
    if (!raw) {
      alert('Vui lòng nhập hoặc dán nội dung đề thi vào khung!');
      return;
    }

    const blocks = raw.split(/(?=Câu\s+\d+[:.])/i);
    const results: QuestionPart1[] = [];

    blocks.forEach(block => {
      const text = block.trim();
      if (!text) return;

      let questionPart = text;
      let explanation = 'Chưa có lời giải chi tiết.';
      const expMatch = text.match(/(?:Lời giải|Giải thích|HD):?\s*([\s\S]*)/i);
      if (expMatch) {
        explanation = expMatch[1].trim();
        questionPart = text.replace(expMatch[0], '').trim();
      }

      const lines = questionPart.split('\n').map(l => l.trim()).filter(l => l);
      if (lines.length >= 2) {
        const qTitle = lines[0];
        const optLines = lines.slice(1);
        const options: string[] = [];
        let correctIndex = 0;

        optLines.forEach(l => {
          const isUnderline = l.includes('<u>') || l.includes('</u>') || (l.startsWith('_') && l.endsWith('_'));
          const cleanText = l.replace(/<\/?u>/gi, '').replace(/^_|_$/g, '').replace(/^[A-D][.:\)]\s*/i, '').trim();

          if (cleanText) {
            if (isUnderline) correctIndex = options.length;
            options.push(cleanText);
          }
        });

        if (options.length >= 2) {
          results.push({
            q: qTitle,
            opts: options.slice(0, 4),
            ans: correctIndex,
            level: 'Biết',
            exp: explanation
          });
        }
      }
    });

    if (results.length > 0) {
      setParsedPreview(results);
    } else {
      alert('Không nhận diện được câu hỏi nào. Vui lòng kiểm tra lại định dạng (ví dụ: Câu 1: ... A. ... <u>B. ...</u>)');
    }
  };

  const handleSaveParsed = () => {
    if (parsedPreview.length === 0) return;
    onSaveCustomQuestions(parserChapter, { part1: parsedPreview });
    alert(`Đã lưu thành công ${parsedPreview.length} câu hỏi vào ngân hàng đề của chương!`);
    setParsedPreview([]);
    setParserRawText('');
  };

  // Manual Submit
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manText.trim()) return;

    if (manPart === '1') {
      const opts = [opt0.trim(), opt1.trim(), opt2.trim(), opt3.trim()];
      if (opts.some(o => !o)) {
        alert('Vui lòng nhập đầy đủ 4 phương án A, B, C, D!');
        return;
      }
      onSaveCustomQuestions(manChapter, {
        part1: [{
          q: manText.trim(),
          opts,
          ans: correctOpt,
          level: manLevel,
          exp: manExp.trim() || 'Lời giải chi tiết từ giáo viên.'
        }]
      });
      setOpt0(''); setOpt1(''); setOpt2(''); setOpt3('');
    } else if (manPart === '2') {
      onSaveCustomQuestions(manChapter, {
        part2: [{
          q: manText.trim(),
          items: p2Items,
          exp: manExp.trim() || 'Lời giải chi tiết từ giáo viên.'
        }]
      });
    } else if (manPart === '3') {
      if (!p3Ans.trim()) {
        alert('Vui lòng nhập đáp án ngắn!');
        return;
      }
      onSaveCustomQuestions(manChapter, {
        part3: [{
          q: manText.trim(),
          ans: p3Ans.trim(),
          exp: manExp.trim() || 'Lời giải chi tiết từ giáo viên.'
        }]
      });
      setP3Ans('');
    }

    setManText('');
    setManExp('');
    alert('Đã thêm câu hỏi vào ngân hàng đề thi thành công!');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Header Admin */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <i className="fa-solid fa-shield-halved"></i> Cổng Giáo Viên THPT Đakrông
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">Quản Trị Hệ Thống & Ngân Hàng Đề Thi</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Thống kê điểm số học sinh, nạp câu hỏi tự động Smart Parser và quản lý ngân hàng câu hỏi
          </p>
        </div>

        <button
          onClick={onExit}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1.5 self-start sm:self-center"
        >
          <i className="fa-solid fa-right-from-bracket"></i> Đăng xuất Quản trị
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 rounded-lg transition flex items-center gap-2 shrink-0 ${
            activeTab === 'stats' ? 'bg-teal-800 text-white shadow' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <i className="fa-solid fa-chart-column"></i> Thống kê kết quả học sinh
        </button>
        <button
          onClick={() => setActiveTab('parser')}
          className={`px-4 py-2 rounded-lg transition flex items-center gap-2 shrink-0 ${
            activeTab === 'parser' ? 'bg-teal-800 text-white shadow' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <i className="fa-solid fa-wand-magic-sparkles"></i> Nạp đề nhanh (Smart Parser)
        </button>
        <button
          onClick={() => setActiveTab('manual')}
          className={`px-4 py-2 rounded-lg transition flex items-center gap-2 shrink-0 ${
            activeTab === 'manual' ? 'bg-teal-800 text-white shadow' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <i className="fa-solid fa-plus"></i> Thêm câu hỏi thủ công
        </button>
      </div>

      {/* TAB 1: THỐNG KÊ & KẾT QUẢ */}
      {activeTab === 'stats' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-500 uppercase">Tổng lượt làm bài</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 font-mono">{totalCount}</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-teal-600 uppercase">Điểm trung bình</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-700 mt-1 font-mono">{avgScore}</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-emerald-600 uppercase">Điểm cao nhất</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-1 font-mono">{maxScore}</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-blue-600 uppercase">Tỷ lệ Đạt (≥ 5.0)</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 mt-1 font-mono">{passRate}%</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={gradeFilter}
                  onChange={(e) => setGradeFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium bg-slate-50 text-slate-700"
                >
                  <option value="all">Tất cả Khối lớp</option>
                  <option value="10">Khối 10</option>
                  <option value="11">Khối 11</option>
                  <option value="12">Khối 12</option>
                </select>

                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Tìm theo tên học sinh, lớp..."
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50 text-slate-700 w-48 sm:w-60 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  className="px-3.5 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-file-excel"></i> Xuất Excel (CSV)
                </button>
                <button
                  onClick={onClearHistory}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-trash-can"></i> Xóa lịch sử
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">STT</th>
                    <th className="px-4 py-3">Học sinh</th>
                    <th className="px-4 py-3">Lớp</th>
                    <th className="px-4 py-3">Khối</th>
                    <th className="px-4 py-3">Chương kiểm tra</th>
                    <th className="px-4 py-3 text-center">Điểm số</th>
                    <th className="px-4 py-3 text-center">Xếp loại</th>
                    <th className="px-4 py-3">Thời gian nộp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSubmissions.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-8 text-slate-400">
                        Chưa có kết quả làm bài nào phù hợp với bộ lọc.
                      </td>
                    </tr>
                  ) : (
                    filteredSubmissions.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition">
                        <td className="px-4 py-3 font-mono text-slate-400">{idx + 1}</td>
                        <td className="px-4 py-3 font-bold text-slate-900">{item.studentName}</td>
                        <td className="px-4 py-3 font-semibold text-slate-700">{item.className}</td>
                        <td className="px-4 py-3 text-slate-600">Khối {item.grade}</td>
                        <td className="px-4 py-3 text-slate-800 font-medium">{item.chapterTitle}</td>
                        <td className={`px-4 py-3 text-center font-bold font-mono text-sm ${
                          item.score >= 8.0 ? 'text-teal-700' : (item.score >= 5.0 ? 'text-blue-700' : 'text-rose-600')
                        }`}>
                          {item.score.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.score >= 8.0 ? 'bg-teal-100 text-teal-800' : (item.score >= 5.0 ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800')
                          }`}>
                            {item.rank}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-500 text-[11px]">{item.timestamp}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SMART PARSER */}
      {activeTab === 'parser' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-5">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <i className="fa-solid fa-wand-magic-sparkles text-teal-600"></i> Smart Parser: Nạp Câu Hỏi Tự Động Từ Văn Bản
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Thầy cô copy-paste đề thi từ Word/PDF vào khung dưới. Hệ thống tự động bóc tách Câu hỏi, các phương án A/B/C/D và Lời giải thích.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-950 space-y-1">
            <p className="font-bold flex items-center gap-1.5"><i className="fa-solid fa-circle-info text-teal-600"></i> Quy ước nhận diện đáp án đúng:</p>
            <ul className="list-disc list-inside space-y-0.5 text-slate-700 ml-1">
              <li>Dùng thẻ gạch chân: <code className="bg-white px-1 py-0.5 rounded border border-teal-300">&lt;u&gt;A. Đáp án đúng&lt;/u&gt;</code> hoặc gạch dưới: <code className="bg-white px-1 py-0.5 rounded border border-teal-300">_A. Đáp án đúng_</code></li>
              <li>Lời giải thích: dòng bắt đầu bằng <code className="bg-white px-1 py-0.5 rounded border border-teal-300">Lời giải: ...</code> hoặc <code className="bg-white px-1 py-0.5 rounded border border-teal-300">Giải thích: ...</code></li>
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Chọn Khối Lớp:</label>
              <select
                value={parserGrade}
                onChange={(e) => {
                  const g = parseInt(e.target.value);
                  setParserGrade(g);
                  setParserChapter(`${g}_1`);
                }}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
              >
                <option value="10">Khối 10</option>
                <option value="11">Khối 11</option>
                <option value="12">Khối 12</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Chọn Chương:</label>
              <select
                value={parserChapter}
                onChange={(e) => setParserChapter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
              >
                {(CURRICULUM[parserGrade] || []).map(c => (
                  <option key={c.id} value={c.id}>Chương {c.num}: {c.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Dán nội dung đề thi vào đây:</label>
            <textarea
              rows={8}
              value={parserRawText}
              onChange={(e) => setParserRawText(e.target.value)}
              placeholder="Ví dụ:
Câu 1: Chất nào sau đây là ester no, đơn chức, mạch hở?
<u>A. Methyl acetate.</u>
B. Triolein.
C. Vinyl acetate.
D. Phenyl acetate.
Lời giải: Methyl acetate có công thức CH3COOCH3 là ester no, đơn chức, mạch hở."
              className="w-full p-4 rounded-xl border border-slate-200 text-xs font-mono bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRunParser}
              className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs shadow-md transition flex items-center gap-2"
            >
              <i className="fa-solid fa-bolt"></i> Bóc tách & Xem trước câu hỏi
            </button>
          </div>

          {parsedPreview.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-800">
                  Đã nhận diện: {parsedPreview.length} câu
                </h4>
                <button
                  onClick={handleSaveParsed}
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow transition flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-floppy-disk"></i> Lưu vào ngân hàng câu hỏi
                </button>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {parsedPreview.map((q, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-teal-200 bg-teal-50/40 text-xs space-y-1.5">
                    <p className="font-bold text-slate-900">{q.q}</p>
                    <div className="grid grid-cols-2 gap-1 text-[11px]">
                      {q.opts.map((o, oi) => (
                        <div key={oi} className={`p-1 rounded ${oi === q.ans ? 'bg-emerald-200 font-bold text-emerald-950' : 'bg-white'}`}>
                          {String.fromCharCode(65 + oi)}. {o} {oi === q.ans ? '✓' : ''}
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-600"><em>Lời giải:</em> {q.exp}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: THÊM THỦ CÔNG */}
      {activeTab === 'manual' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-5 max-w-3xl">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <i className="fa-solid fa-plus-circle text-teal-600"></i> Thêm Câu Hỏi Mới Vào Ngân Hàng Đề
          </h3>

          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Khối Lớp:</label>
                <select
                  value={manGrade}
                  onChange={(e) => {
                    const g = parseInt(e.target.value);
                    setManGrade(g);
                    setManChapter(`${g}_1`);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
                >
                  <option value="10">Khối 10</option>
                  <option value="11">Khối 11</option>
                  <option value="12">Khối 12</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Chương:</label>
                <select
                  value={manChapter}
                  onChange={(e) => setManChapter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
                >
                  {(CURRICULUM[manGrade] || []).map(c => (
                    <option key={c.id} value={c.id}>Chương {c.num}: {c.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dạng câu hỏi:</label>
                <select
                  value={manPart}
                  onChange={(e) => setManPart(e.target.value as '1' | '2' | '3')}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
                >
                  <option value="1">Dạng 1: Trắc nghiệm 4 lựa chọn (A, B, C, D)</option>
                  <option value="2">Dạng 2: Đúng / Sai (4 ý a, b, c, d)</option>
                  <option value="3">Dạng 3: Trả lời ngắn</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mức độ nhận thức:</label>
              <div className="flex items-center gap-4 text-xs">
                {(['Biết', 'Hiểu', 'Vận dụng'] as const).map(lvl => (
                  <label key={lvl} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="man-level"
                      value={lvl}
                      checked={manLevel === lvl}
                      onChange={() => setManLevel(lvl)}
                      className="text-teal-600"
                    /> {lvl}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nội dung câu hỏi / Câu dẫn:</label>
              <textarea
                rows={3}
                required
                value={manText}
                onChange={(e) => setManText(e.target.value)}
                placeholder="Nhập câu hỏi, phương trình hoặc tình huống hóa học..."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
              />
            </div>

            {/* Part 1 options */}
            {manPart === '1' && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">4 Lựa chọn (Chọn nút tròn cho đáp án đúng):</label>
                <div className="space-y-1.5">
                  {[
                    { label: 'A', val: opt0, set: setOpt0, idx: 0 },
                    { label: 'B', val: opt1, set: setOpt1, idx: 1 },
                    { label: 'C', val: opt2, set: setOpt2, idx: 2 },
                    { label: 'D', val: opt3, set: setOpt3, idx: 3 }
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="man-correct"
                        checked={correctOpt === item.idx}
                        onChange={() => setCorrectOpt(item.idx)}
                        className="text-teal-600"
                      />
                      <span className="text-xs font-bold text-slate-500">{item.label}.</span>
                      <input
                        type="text"
                        value={item.val}
                        onChange={(e) => item.set(e.target.value)}
                        required
                        placeholder={`Phương án ${item.label}`}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Part 2 items */}
            {manPart === '2' && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">4 Ý Đúng / Sai:</label>
                {p2Items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 w-4">{['a', 'b', 'c', 'd'][idx]})</span>
                    <input
                      type="text"
                      value={item.t}
                      onChange={(e) => {
                        const newItems = [...p2Items];
                        newItems[idx].t = e.target.value;
                        setP2Items(newItems);
                      }}
                      required
                      placeholder={`Nội dung ý ${['a', 'b', 'c', 'd'][idx]}`}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50"
                    />
                    <select
                      value={item.ans ? 'true' : 'false'}
                      onChange={(e) => {
                        const newItems = [...p2Items];
                        newItems[idx].ans = e.target.value === 'true';
                        setP2Items(newItems);
                      }}
                      className="px-2 py-1.5 rounded-lg border text-xs bg-white"
                    >
                      <option value="true">Đúng</option>
                      <option value="false">Sai</option>
                    </select>
                  </div>
                ))}
              </div>
            )}

            {/* Part 3 answer */}
            {manPart === '3' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Đáp án ngắn:</label>
                <input
                  type="text"
                  value={p3Ans}
                  onChange={(e) => setP3Ans(e.target.value)}
                  placeholder="Ví dụ: 0.15 hoặc C2H5OH hoặc 4"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50 font-mono font-bold"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Lời giải thích sư phạm:</label>
              <textarea
                rows={2}
                value={manExp}
                onChange={(e) => setManExp(e.target.value)}
                placeholder="Giải thích chi tiết phương trình phản ứng, cách suy luận hoặc công thức tính toán..."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
            >
              <i className="fa-solid fa-plus-circle"></i> Thêm câu hỏi vào hệ thống
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
