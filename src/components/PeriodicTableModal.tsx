import React, { useState } from 'react';
import { PERIODIC_ELEMENTS } from '../data/curriculum';
import { PeriodicElement } from '../types';

interface PeriodicTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PeriodicTableModal: React.FC<PeriodicTableModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedElement, setSelectedElement] = useState<PeriodicElement>(PERIODIC_ELEMENTS[0]);

  if (!isOpen) return null;

  const filteredElements = PERIODIC_ELEMENTS.filter(el =>
    el.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    el.sym.toLowerCase().includes(searchTerm.toLowerCase()) ||
    el.z.toString() === searchTerm.trim()
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="p-4 bg-teal-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-table-cells text-teal-300 text-lg"></i>
            <div>
              <h3 className="font-bold text-sm sm:text-base">Bảng Tuần Hoàn Các Nguyên Tố Hóa Học</h3>
              <p className="text-[11px] text-teal-200">Tra cứu Số hiệu Z, Nguyên tử khối, Độ âm điện, Cấu hình electron</p>
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

        {/* Filter & Category Legend */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm nguyên tố (tên, ký hiệu, Z)..."
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs w-48 sm:w-64 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span> Kim loại kiềm</span>
            <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Kiềm thổ</span>
            <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span> Kim loại chuyển tiếp</span>
            <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Phi kim</span>
            <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span> Khí hiếm</span>
          </div>
        </div>

        {/* Grid of Elements */}
        <div className="p-4 overflow-y-auto flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {filteredElements.map(el => {
              let catColor = 'border-slate-300 bg-white hover:border-teal-500';
              if (el.cat === 'kim-loai-kiem') catColor = 'border-rose-200 bg-rose-50/70 hover:border-rose-400';
              else if (el.cat === 'kiem-tho') catColor = 'border-amber-200 bg-amber-50/70 hover:border-amber-400';
              else if (el.cat === 'chuyen-tiep') catColor = 'border-blue-200 bg-blue-50/70 hover:border-blue-400';
              else if (el.cat === 'phi-kim') catColor = 'border-emerald-200 bg-emerald-50/70 hover:border-emerald-400';
              else if (el.cat === 'khi-hiem') catColor = 'border-purple-200 bg-purple-50/70 hover:border-purple-400';

              const isSelected = selectedElement.z === el.z;

              return (
                <div
                  key={el.z}
                  onClick={() => setSelectedElement(el)}
                  className={`p-2 rounded-xl border ${catColor} cursor-pointer transition flex flex-col items-center justify-between text-center select-none ${
                    isSelected ? 'ring-2 ring-teal-600 shadow-md scale-102' : 'hover:scale-102'
                  }`}
                >
                  <span className="text-[10px] text-slate-400 font-mono self-start">{el.z}</span>
                  <span className="text-base font-bold font-mono text-slate-900">{el.sym}</span>
                  <span className="text-[10px] text-slate-600 truncate w-full">{el.name}</span>
                  <span className="text-[9px] text-slate-400 font-mono">{el.m}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Inspector Detail Card */}
        <div className="p-4 bg-teal-50 border-t border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-teal-700 text-white flex flex-col items-center justify-center font-bold shrink-0 shadow">
              <span className="text-[9px]">{selectedElement.z}</span>
              <span className="text-base font-mono">{selectedElement.sym}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <strong className="text-sm font-bold text-slate-900">{selectedElement.name}</strong>
                <span className="text-slate-600 font-mono">M = {selectedElement.m}</span>
              </div>
              <p className="text-slate-600 font-mono text-[11px]">
                Cấu hình e: {selectedElement.conf} · Độ âm điện: {selectedElement.en ?? 'Chưa xác định'}
              </p>
            </div>
          </div>
          <div className="text-slate-700 text-[11px] max-w-md">
            {selectedElement.desc}
          </div>
        </div>

      </div>
    </div>
  );
};
