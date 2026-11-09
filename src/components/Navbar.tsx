import React, { useState } from 'react';
import { StudentProfile } from '../types';

interface NavbarProps {
  currentGrade: number;
  onSelectGrade: (grade: number) => void;
  onNavigateHome: () => void;
  student: StudentProfile;
  onOpenStudentModal: () => void;
  onOpenAdminModal: () => void;
  onOpenPeriodicTable: () => void;
  onOpenElectrochemical: () => void;
  onOpenSolubility: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentGrade,
  onSelectGrade,
  onNavigateHome,
  student,
  onOpenStudentModal,
  onOpenAdminModal,
  onOpenPeriodicTable,
  onOpenElectrochemical,
  onOpenSolubility
}) => {
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0f393b] text-white shadow-md border-b border-teal-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & School Branding */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={onNavigateHome}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-950/40 text-white font-bold text-xl sm:text-2xl border border-white/20">
              <i className="fa-solid fa-flask-vial"></i>
            </div>
            <div>
              <h1 className="text-base sm:text-xl font-bold tracking-tight text-white leading-tight">
                HÓA HỌC THPT ĐAKRÔNG
              </h1>
              <p className="text-[11px] sm:text-xs text-teal-200/90 font-medium line-clamp-1">
                Ôn luyện & Đánh giá năng lực (GDPT 2018)
              </p>
            </div>
          </div>

          {/* Grade Selector (Desktop) */}
          <div className="hidden md:flex items-center p-1 bg-black/25 backdrop-blur rounded-xl border border-white/10">
            {[10, 11, 12].map(g => (
              <button
                key={g}
                onClick={() => onSelectGrade(g)}
                className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 ${
                  currentGrade === g
                    ? 'bg-teal-500 text-white shadow-md shadow-teal-950/30'
                    : 'text-teal-100 hover:text-white'
                }`}
              >
                Lớp {g}
              </button>
            ))}
          </div>

          {/* Action Tools & User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Floating Modals on Desktop */}
            <div className="hidden lg:flex items-center gap-1.5">
              <button
                onClick={onOpenPeriodicTable}
                title="Bảng tuần hoàn các nguyên tố hóa học"
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-teal-800/60 hover:bg-teal-700/80 border border-teal-600/40 text-teal-100 transition flex items-center gap-1.5"
              >
                <i className="fa-solid fa-table-cells text-teal-300"></i> Bảng tuần hoàn
              </button>
              <button
                onClick={onOpenElectrochemical}
                title="Dãy điện hóa kim loại chuẩn"
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-teal-800/60 hover:bg-teal-700/80 border border-teal-600/40 text-teal-100 transition flex items-center gap-1.5"
              >
                <i className="fa-solid fa-bolt text-amber-400"></i> Dãy điện hóa
              </button>
              <button
                onClick={onOpenSolubility}
                title="Bảng tính tan"
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-teal-800/60 hover:bg-teal-700/80 border border-teal-600/40 text-teal-100 transition flex items-center gap-1.5"
              >
                <i className="fa-solid fa-droplet text-blue-300"></i> Bảng tính tan
              </button>
            </div>

            {/* Mobile Dropdown for Quick Tools */}
            <div className="lg:hidden relative">
              <button
                onClick={() => setShowToolsDropdown(!showToolsDropdown)}
                className="p-2 text-teal-100 bg-teal-800/60 rounded-lg hover:bg-teal-700 border border-teal-600/40 text-xs flex items-center gap-1"
                aria-label="Tra cứu nổi"
              >
                <i className="fa-solid fa-book-bookmark"></i>
              </button>
              {showToolsDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-200 py-1 z-50 text-slate-800 text-xs">
                  <button
                    onClick={() => { onOpenPeriodicTable(); setShowToolsDropdown(false); }}
                    className="w-full text-left px-3 py-2 hover:bg-teal-50 flex items-center gap-2"
                  >
                    <i className="fa-solid fa-table-cells text-teal-600"></i> Bảng tuần hoàn
                  </button>
                  <button
                    onClick={() => { onOpenElectrochemical(); setShowToolsDropdown(false); }}
                    className="w-full text-left px-3 py-2 hover:bg-teal-50 flex items-center gap-2"
                  >
                    <i className="fa-solid fa-bolt text-amber-500"></i> Dãy điện hóa
                  </button>
                  <button
                    onClick={() => { onOpenSolubility(); setShowToolsDropdown(false); }}
                    className="w-full text-left px-3 py-2 hover:bg-teal-50 flex items-center gap-2"
                  >
                    <i className="fa-solid fa-droplet text-blue-500"></i> Bảng tính tan
                  </button>
                </div>
              )}
            </div>

            {/* Student Info Badge */}
            <button
              onClick={onOpenStudentModal}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-medium text-white flex items-center gap-1.5 transition max-w-[130px] sm:max-w-[170px]"
              title="Thông tin học sinh"
            >
              <i className="fa-regular fa-circle-user text-teal-300 shrink-0"></i>
              <span className="truncate">{student.name ? `${student.name} (${student.class})` : 'Học sinh'}</span>
            </button>

            {/* Teacher Admin Button */}
            <button
              onClick={onOpenAdminModal}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5 shrink-0"
            >
              <i className="fa-solid fa-lock"></i>
              <span className="hidden sm:inline">Quản trị GV</span>
            </button>

          </div>

        </div>

        {/* Mobile Grade Bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-teal-900/40 text-xs">
          {[10, 11, 12].map(g => (
            <button
              key={g}
              onClick={() => onSelectGrade(g)}
              className={`px-4 py-1 rounded-md font-semibold ${
                currentGrade === g ? 'bg-teal-500 text-white' : 'text-teal-100'
              }`}
            >
              Lớp {g}
            </button>
          ))}
        </div>

      </div>
    </header>
  );
};
