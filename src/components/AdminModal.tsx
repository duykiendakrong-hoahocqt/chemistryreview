import React, { useState } from 'react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Kien123456@@') {
      setError(false);
      setPassword('');
      onSuccess();
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-5">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto text-xl border border-emerald-200 shadow-sm">
            <i className="fa-solid fa-lock"></i>
          </div>
          <h3 className="font-bold text-base text-slate-900">Khu Vực Quản Trị Giáo Viên</h3>
          <p className="text-xs text-slate-500">
            Dành riêng cho Giáo viên Hóa học THPT Đakrông
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Mật khẩu giáo viên:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              required
              placeholder="Nhập mật khẩu quản trị..."
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium"
            />
            {error && (
              <p className="text-rose-600 font-semibold text-[11px] mt-1.5 flex items-center gap-1">
                <i className="fa-solid fa-circle-exclamation"></i> Mật khẩu không chính xác!
              </p>
            )}
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 font-semibold hover:bg-slate-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow"
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
