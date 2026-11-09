import React from 'react';

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  explanation: string;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({ isOpen, onClose, question, explanation }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-teal-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500/30 flex items-center justify-center text-teal-300">
              <i className="fa-solid fa-brain"></i>
            </div>
            <div>
              <h3 className="font-bold text-sm">Gia Sư Hóa Học AI - Trường THPT Đakrông</h3>
              <p className="text-[11px] text-teal-200">Hướng dẫn phương pháp tư duy và các bước giải chi tiết</p>
            </div>
          </div>
          <button onClick={onClose} className="text-teal-200 hover:text-white p-1">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider">Câu hỏi:</span>
            <p className="font-semibold text-slate-900 mt-1">{question}</p>
          </div>
          
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wider text-teal-800">
              <i className="fa-solid fa-wand-magic-sparkles text-teal-600"></i> Phân tích bước làm sư phạm:
            </h5>
            <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200/80 font-normal space-y-2 text-slate-800 leading-relaxed">
              <p className="font-bold text-teal-900">1. Bản chất hóa học trọng tâm:</p>
              <p className="leading-relaxed">{explanation}</p>
              
              <p className="font-bold text-teal-900 mt-3">2. Lời khuyên ôn luyện từ Giáo viên THPT Đakrông:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-700 ml-1">
                <li>Luôn xác định rõ công thức cấu tạo và nhóm chức của chất trước khi suy đoán tính chất.</li>
                <li>Đối với các câu tính toán số mol, hãy lập phương trình phản ứng cân bằng hoặc áp dụng bảo toàn nguyên tố/khối lượng để tối ưu hóa thời gian thi.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-teal-700 text-white text-xs font-semibold hover:bg-teal-800 transition shadow"
          >
            Đã hiểu bài
          </button>
        </div>

      </div>
    </div>
  );
};
