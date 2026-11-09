import React from 'react';
import { SOLUBILITY_DATA } from '../data/curriculum';

interface SolubilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SolubilityModal: React.FC<SolubilityModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { cations, anions, grid } = SOLUBILITY_DATA;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="p-4 bg-teal-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-droplet text-blue-300 text-lg"></i>
            <div>
              <h3 className="font-bold text-sm sm:text-base">Bảng Tính Tan Của Các Muối & Hydroxide Trong Nước</h3>
              <p className="text-[11px] text-teal-200">Quy ước màu sắc kết tủa và trạng thái tan ở 25°C</p>
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

        {/* Legend */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
              <span className="w-4 h-4 rounded bg-emerald-100 border border-emerald-300 flex items-center justify-center text-[10px]">T</span> Tan
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-rose-700">
              <span className="w-4 h-4 rounded bg-rose-100 border border-rose-300 flex items-center justify-center text-[10px]">K</span> Không tan (Kết tủa)
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-amber-700">
              <span className="w-4 h-4 rounded bg-amber-100 border border-amber-300 flex items-center justify-center text-[10px]">I</span> Ít tan
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-slate-500">
              <span className="w-4 h-4 rounded bg-slate-100 border border-slate-300 flex items-center justify-center text-[10px]">B</span> Bị thủy phân / Không tồn tại
            </span>
          </div>
          <div className="text-[11px] text-slate-500 italic">Rê chuột hoặc chạm vào ô để xem chi tiết màu sắc kết tủa</div>
        </div>

        {/* Interactive Matrix */}
        <div className="p-4 overflow-auto flex-1">
          <table className="min-w-full text-center text-xs border-collapse">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-2 border border-slate-200 bg-slate-200">Cation \ Anion</th>
                {anions.map(a => (
                  <th key={a} className="p-2 border border-slate-200 font-mono text-teal-800">{a}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cations.map(c => (
                <tr key={c}>
                  <td className="p-2 border border-slate-200 font-bold font-mono bg-slate-50 text-slate-800 text-left">{c}</td>
                  {anions.map(a => {
                    const val = grid[c]?.[a] || 'T';
                    let bgClass = 'bg-emerald-50 text-emerald-800 font-semibold';
                    let code = 'T';

                    if (val.startsWith('K')) {
                      bgClass = 'bg-rose-100 text-rose-900 font-bold cursor-help';
                      code = 'K';
                    } else if (val.startsWith('I')) {
                      bgClass = 'bg-amber-100 text-amber-900 font-semibold';
                      code = 'I';
                    } else if (val.startsWith('B')) {
                      bgClass = 'bg-slate-100 text-slate-400';
                      code = 'B';
                    }

                    return (
                      <td
                        key={a}
                        className={`p-2 border border-slate-200 transition hover:scale-105 ${bgClass}`}
                        title={`${c} + ${a} → ${val}`}
                      >
                        {code}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
