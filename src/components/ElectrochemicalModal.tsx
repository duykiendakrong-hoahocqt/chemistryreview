import React from 'react';
import { ELECTROCHEMICAL_DATA } from '../data/curriculum';

interface ElectrochemicalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ElectrochemicalModal: React.FC<ElectrochemicalModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="p-4 bg-teal-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-bolt text-amber-400 text-lg"></i>
            <div>
              <h3 className="font-bold text-sm sm:text-base">Dãy Điện Hóa Kim Loại Chuẩn (Thế Điện Cực Chuẩn E°)</h3>
              <p className="text-[11px] text-teal-200">Quy tắc Alpha (α) xác định chiều phản ứng oxi hóa - khử</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-teal-200 hover:text-white text-lg p-1 transition"
            aria-label="Đóng"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Alpha Rule Callout */}
        <div className="p-4 bg-amber-50/90 border-b border-amber-200 text-xs text-amber-950 space-y-1">
          <div className="font-bold flex items-center gap-2">
            <i className="fa-solid fa-lightbulb text-amber-600"></i> Quy tắc Alpha (α):
          </div>
          <p className="text-slate-700">
            Chất oxi hóa mạnh hơn + Chất khử mạnh hơn → Chất oxi hóa yếu hơn + Chất khử yếu hơn.
            <span className="font-mono font-semibold ml-1.5 text-teal-800">(Ví dụ: Cu²⁺ + Fe → Fe²⁺ + Cu)</span>
          </p>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          
          {/* Electrochemical Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-center text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="px-3 py-2.5 text-left">Cặp Oxi hóa / Khử (Ox/Red)</th>
                  <th className="px-3 py-2.5">Dạng Oxi hóa (Cation)</th>
                  <th className="px-3 py-2.5">Dạng Khử (Kim loại)</th>
                  <th className="px-3 py-2.5 font-mono">E° (V)</th>
                  <th className="px-3 py-2.5 text-left">Nhận xét tính chất</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {ELECTROCHEMICAL_DATA.map((row) => (
                  <tr key={row.pair} className="hover:bg-slate-50 transition">
                    <td className="px-3 py-2 text-left font-bold text-slate-900">{row.pair}</td>
                    <td className="px-3 py-2 text-teal-700 font-semibold">{row.ox}</td>
                    <td className="px-3 py-2 text-rose-700 font-semibold">{row.red}</td>
                    <td className={`px-3 py-2 font-bold ${row.e0 > 0 ? 'text-emerald-700' : 'text-slate-700'}`}>
                      {row.e0 > 0 ? '+' : ''}{row.e0.toFixed(3)}
                    </td>
                    <td className="px-3 py-2 text-left text-slate-500 font-sans text-[11px]">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Directional Gradient Indicators */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between text-rose-700 font-bold">
              <span>← Tính khử của kim loại (dạng Red) TĂNG DẦN</span>
              <span>Tính khử GIẢM DẦN →</span>
            </div>
            <div className="h-2.5 bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500 rounded-full shadow-inner"></div>
            <div className="flex items-center justify-between text-teal-700 font-bold">
              <span>← Tính oxi hóa của cation (dạng Ox) GIẢM DẦN</span>
              <span>Tính oxi hóa TĂNG DẦN →</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
