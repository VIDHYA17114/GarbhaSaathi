import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Calendar, Camera } from 'lucide-react';

export default function Screen5_ProfileSetup() {
  const { setCurrentScreen, user, setUser, language, setLanguage, t } = useApp();
  const [name, setName] = useState(user.name || "Priya Sharma");
  const [age, setAge] = useState(user.age || 24);
  const [stage, setStage] = useState("I am pregnant");
  const [lmpDate, setLmpDate] = useState(user.lmpDate || "2025-03-15");
  const [eddDate, setEddDate] = useState(user.eddDate || "2025-12-20");

  const handleLmpChange = (newVal) => {
    setLmpDate(newVal);
    // Auto calculate EDD: LMP + 280 days (40 weeks)
    try {
      const d = new Date(newVal);
      if (!isNaN(d.getTime())) {
        d.setDate(d.getDate() + 280);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        setEddDate(`${yyyy}-${mm}-${dd}`);
      }
    } catch (e) { /* ignore */ }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name,
      age: parseInt(age) || 24,
      stage,
      lmpDate,
      eddDate
    }));
    setCurrentScreen(6); // Go to Screen 6: Pregnancy Journey
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#FAF9F5] text-left select-none overflow-y-auto no-scrollbar">
      <div>
        {/* Top Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen(3)}
            className="p-1.5 -ml-1.5 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-slate-800">
            {t.letsKnowBetter}
          </h2>
        </div>

        {/* Profile Avatar Circle with edit badge */}
        <div className="my-5 flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-rose-100 border-2 border-rose-200 flex items-center justify-center text-3xl shadow-sm">
              👩
            </div>
            <button
              type="button"
              className="absolute bottom-0 right-0 p-1.5 bg-[#157F66] text-white rounded-full shadow-md hover:bg-[#0e5947] transition"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Setup Form */}
        <form onSubmit={handleContinue} className="space-y-3.5">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              {t.fullName}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs focus:ring-2 focus:ring-[#157F66] outline-none"
              required
            />
          </div>

          {/* Age & Preferred Language Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {t.age}
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs focus:ring-2 focus:ring-[#157F66] outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {t.preferredLanguage}
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs focus:ring-2 focus:ring-[#157F66] outline-none"
              >
                <option value="hi">हिंदी (Hindi)</option>
                <option value="mr">मराठी (Marathi)</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>

          {/* Current Stage */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              {t.currentStage}
            </label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs focus:ring-2 focus:ring-[#157F66] outline-none"
            >
              <option value="I am pregnant">{t.iamPregnant}</option>
            </select>
          </div>

          {/* Last Menstrual Period (LMP) */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              {t.lmp}
            </label>
            <div className="relative">
              <input
                type="date"
                value={lmpDate}
                onChange={(e) => handleLmpChange(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs focus:ring-2 focus:ring-[#157F66] outline-none"
                required
              />
            </div>
          </div>

          {/* Expected Due Date (EDD auto) */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              {t.eddAuto}
            </label>
            <div className="relative">
              <input
                type="date"
                value={eddDate}
                onChange={(e) => setEddDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs focus:ring-2 focus:ring-[#157F66] outline-none"
              />
            </div>
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            className="w-full py-3.5 mt-3 bg-[#157F66] hover:bg-[#0e5947] text-white rounded-2xl font-bold text-xs shadow-lg shadow-teal-700/20 transition active:scale-98"
          >
            {t.continueBtn}
          </button>
        </form>
      </div>
    </div>
  );
}
