import React from 'react';
import { TheoryCard, Chapter } from '../types';
import { CHAPTER_THEORY_DATA } from '../data/curriculum';

interface TheoryViewProps {
  chapter: Chapter;
}

export const TheoryView: React.FC<TheoryViewProps> = ({ chapter }) => {
  const cards: TheoryCard[] = CHAPTER_THEORY_DATA[chapter.id] || [
    {
      badge: 'Khái niệm trọng tâm',
      title: '1. Kiến thức cốt lõi SGK Kết Nối Tri Thức',
      content: `Hệ thống chuẩn bị đầy đủ nội dung mục <strong>"Em đã học"</strong> và <strong>"Ôn tập chương"</strong> cho bài học <em>${chapter.title}</em>.<br>Học sinh cần nắm chắc các định nghĩa, quy luật biến thiên, tính chất hóa học đặc trưng và phương trình phản ứng cân bằng trước khi bước vào đề kiểm tra 45 phút.`
    },
    {
      badge: 'Sơ đồ tư duy',
      title: '2. Các Dạng Bài Tập & Ứng Dụng Thực Tiễn',
      content: `• Rèn luyện kỹ năng phân tích cấu tạo nguyên tử, liên kết hóa học, công thức cấu tạo và gọi tên theo danh pháp quốc tế IUPAC.<br>• Vận dụng kiến thức giải thích các hiện tượng hóa học trong đời sống, bảo vệ môi trường và sản xuất tại địa phương Đakrông.`
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between text-xs text-slate-500 pb-1 border-b border-slate-200">
        <span className="font-semibold text-slate-700 flex items-center gap-1.5">
          <i className="fa-solid fa-sparkles text-amber-500"></i>
          Trọng tâm kiến thức từ SGK Kết Nối Tri Thức Với Cuộc Sống
        </span>
        <span className="hidden sm:inline">Chuẩn phương pháp sư phạm môn Hóa học THPT</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/90 space-y-3 hover:shadow-md transition"
          >
            <span className="inline-block text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
              {card.badge}
            </span>
            <h4 className="text-base font-bold text-slate-900">{card.title}</h4>
            <div
              className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2"
              dangerouslySetInnerHTML={{ __html: card.content }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
