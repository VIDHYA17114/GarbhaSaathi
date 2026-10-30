import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  User, 
  Globe, 
  Bell, 
  ShieldCheck, 
  Database, 
  Sun, 
  HelpCircle, 
  Info, 
  LogOut, 
  ChevronRight,
  Download,
  Trash2,
  Check
} from 'lucide-react';

export default function Screen15_PrivacySettings() {
  const { user, setCurrentScreen, language, setLanguage, t } = useApp();
  const [exportMessage, setExportMessage] = useState('');

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify({ user, exportDate: new Date().toISOString() }, null, 2)
    );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `GarbhaSaathi_Backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setExportMessage(isHindi ? "डेटा सफलतापूर्वक एक्सपोर्ट किया गया!" : "Data exported successfully!");
    setTimeout(() => setExportMessage(''), 3000);
  };

  const handleLogout = () => {
    setCurrentScreen(1); // Return to Welcome Screen
  };

  return (
    <div className="flex-1 flex flex-col p-4 bg-[#FAF9F5] text-left select-none overflow-y-auto no-scrollbar pb-6">
      <div>
        {/* Top Header */}
        <div className="flex items-center gap-3 pb-2">
          <button
            onClick={() => setCurrentScreen(8)}
            className="p-1.5 -ml-1.5 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-bold text-slate-800">
            {t.privacySettings}
          </h2>
        </div>

        {/* User Profile Card (Matching Mockup 15) */}
        <div className="my-3 p-4 bg-white rounded-3xl border border-slate-100 shadow-xs flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-3xl shadow-2xs">
            👩
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-800">
              {user.name || "Priya Sharma"}
            </h3>
            <span className="text-xs font-semibold text-[#157F66] block">
              12 Weeks 3 Days
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              {user.phone || "+91 98765 43210"}
            </span>
          </div>
        </div>

        {/* Export Feedback Alert */}
        {exportMessage && (
          <div className="mb-3 p-2.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{exportMessage}</span>
          </div>
        )}

        {/* Menu Items List (Matching Mockup 15) */}
        <div className="space-y-1.5 bg-white p-2 rounded-3xl border border-slate-100 shadow-xs">
          {/* 1. My Profile */}
          <button
            onClick={() => setCurrentScreen(5)}
            className="w-full p-3 rounded-2xl hover:bg-slate-50 flex items-center justify-between text-xs text-slate-700 font-semibold transition"
          >
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-slate-400" />
              <span>{t.myProfile}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* 2. Language */}
          <div className="w-full p-3 rounded-2xl hover:bg-slate-50 flex items-center justify-between text-xs text-slate-700 font-semibold transition">
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-slate-400" />
              <span>{t.language}</span>
            </div>
            <div className="flex items-center gap-1 text-[#157F66] font-bold">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-xs font-bold text-[#157F66] outline-none cursor-pointer"
              >
                <option value="hi">हिंदी</option>
                <option value="mr">मराठी</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>

          {/* 3. Notifications */}
          <button className="w-full p-3 rounded-2xl hover:bg-slate-50 flex items-center justify-between text-xs text-slate-700 font-semibold transition">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-slate-400" />
              <span>{t.notifications}</span>
            </div>
            <span className="text-[11px] text-emerald-600 font-bold">Active</span>
          </button>

          {/* 4. Privacy & Security */}
          <button className="w-full p-3 rounded-2xl hover:bg-slate-50 flex items-center justify-between text-xs text-slate-700 font-semibold transition">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-slate-400" />
              <span>{t.privacySecurity}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* 5. Data Management (Export) */}
          <button
            onClick={handleExportData}
            className="w-full p-3 rounded-2xl hover:bg-slate-50 flex items-center justify-between text-xs text-slate-700 font-semibold transition"
          >
            <div className="flex items-center gap-3">
              <Database className="w-4 h-4 text-slate-400" />
              <span>{t.dataManagement}</span>
            </div>
            <Download className="w-4 h-4 text-[#157F66]" />
          </button>

          {/* 6. Theme */}
          <div className="w-full p-3 rounded-2xl hover:bg-slate-50 flex items-center justify-between text-xs text-slate-700 font-semibold transition">
            <div className="flex items-center gap-3">
              <Sun className="w-4 h-4 text-slate-400" />
              <span>{t.theme}</span>
            </div>
            <span className="text-slate-400 font-medium">Light</span>
          </div>

          {/* 7. Help & Support */}
          <button className="w-full p-3 rounded-2xl hover:bg-slate-50 flex items-center justify-between text-xs text-slate-700 font-semibold transition">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>{t.helpSupport}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* 8. About GarbhaSaathi */}
          <button className="w-full p-3 rounded-2xl hover:bg-slate-50 flex items-center justify-between text-xs text-slate-700 font-semibold transition">
            <div className="flex items-center gap-3">
              <Info className="w-4 h-4 text-slate-400" />
              <span>{t.aboutApp}</span>
            </div>
            <span className="text-slate-400 text-[11px]">v1.0.0</span>
          </button>

          {/* 9. Log Out */}
          <button
            onClick={handleLogout}
            className="w-full p-3 rounded-2xl hover:bg-rose-50 flex items-center justify-between text-xs text-rose-600 font-bold transition pt-2 border-t border-slate-100"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-4 h-4 text-rose-500" />
              <span>{t.logout}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
