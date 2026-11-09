import React, { useState, useEffect } from 'react';
import { StudentProfile } from '../types';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  onSave: (student: StudentProfile) => void;
}

export const StudentModal: React.FC<StudentModalProps> = ({ isOpen, onClose, student, onSave }) => {
  const [name, setName] = useState(student.name);
  const [className, setClassName] = useState(student.class);

  useEffect(() => {
    setName(student.name);
    setClassName(student.class);
  }, [student, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !className.trim()) {
      alert('Vui lòng nhập đầy đủ họ tên và lớp học!');
      return;
    }
    onSave({ name: name.trim(), class: className.trim() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <i className="fa-solid fa-id-card text-teal-600"></i> Thông Tin Học Sinh Làm Bài
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Họ và tên học sinh:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Ví dụ: Nguyễn Văn An"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 font-medium"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Lớp (Trường THPT Đakrông):</label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              required
              placeholder="Ví dụ: 12A1"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 font-medium"
            />
          </div>
          <p className="text-[11px] text-slate-500 italic">
            Thông tin này được ghi nhận vào bảng điểm đánh giá năng lực của nhà trường để giáo viên tổng hợp.
          </p>
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 font-semibold hover:bg-slate-200"
            >
              Đóng
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold shadow"
            >
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
