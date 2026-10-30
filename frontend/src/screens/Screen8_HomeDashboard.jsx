import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bell, 
  Utensils, 
  Compass, 
  Heart, 
  BookOpen, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  Droplets,
  Mic
} from 'lucide-react';

export default function Screen8_HomeDashboard() {
  const { 
    user, 
    setCurrentScreen, 
    tasks, 
    toggleTask, 
    setActiveModal, 
    language, 
    t 
  } = useApp();

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="flex-1 flex flex-col p-4 bg-[#FAF9F5] text-left select-none overflow-y-auto no-scrollbar pb-6">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pt-1 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-rose-100 border border-rose-200 flex items-center justify-center text-xl shadow-xs">
            👩
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-medium block">
              {t.goodMorning},
            </span>
            <h2 className="text-sm font-extrabold text-slate-800 flex items-center gap-1">
              <span>{user.name || "Priya"}!</span>
              <span className="text-rose-400">🌸</span>
            </h2>
          </div>
        </div>

        {/* Action icons (Mic for Voice Assistant + Notification Bell) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentScreen(9)} // Screen 9: AI Health Check Voice
            className="p-2 rounded-full bg-teal-50 border border-teal-200 text-[#157F66] hover:bg-teal-100 transition shadow-xs"
            title="AI Voice Health Check"
          >
            <Mic className="w-4 h-4 animate-pulse" />
          </button>
          <div className="relative">
            <button className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-xs">
              <Bell className="w-4 h-4" />
            </button>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </div>
        </div>
      </div>

      {/* Hero Banner Card (Matching Mockup 8) */}
      <div 
        onClick={() => setCurrentScreen(6)}
        className="p-4 rounded-3xl bg-linear-to-r from-rose-50 via-orange-50/60 to-rose-100/40 border border-rose-200/60 shadow-xs relative overflow-hidden cursor-pointer hover:shadow-md transition"
      >
        <div className="flex items-start justify-between">
          <div>
            <span className="font-extrabold text-slate-900 text-xs block">
              12 Weeks 3 Days
            </span>
            <span className="text-[11px] font-semibold text-[#157F66] block">
              {isHindi ? "पहला त्रैमास (First Trimester)" : "First Trimester"}
            </span>
            <p className="text-[11px] text-slate-600 mt-2 max-w-[170px] leading-tight">
              {t.doingGreat}
            </p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-white/80 border border-rose-100 flex items-center justify-center text-3xl shadow-xs">
            🤰
          </div>
        </div>
      </div>

      {/* Quick Action Grid (6 Icons matching Mockup 8) */}
      <div className="grid grid-cols-3 gap-2.5 my-4">
        {/* 1. Nutrition Plan */}
        <button
          onClick={() => setCurrentScreen(10)}
          className="p-3 bg-white rounded-2xl border border-slate-100 shadow-xs hover:border-teal-200 hover:bg-teal-50/30 flex flex-col items-center justify-center text-center transition group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#157F66] flex items-center justify-center mb-1 group-hover:scale-105 transition">
            <Utensils className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-700 tracking-tight">
            {t.nutritionPlan}
          </span>
        </button>

        {/* 2. My Journey */}
        <button
          onClick={() => setCurrentScreen(6)}
          className="p-3 bg-white rounded-2xl border border-slate-100 shadow-xs hover:border-pink-200 hover:bg-pink-50/30 flex flex-col items-center justify-center text-center transition group"
        >
          <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mb-1 group-hover:scale-105 transition">
            <Compass className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-700 tracking-tight">
            {t.myJourney}
          </span>
        </button>

        {/* 3. Mood Care */}
        <button
          onClick={() => setCurrentScreen(13)}
          className="p-3 bg-white rounded-2xl border border-slate-100 shadow-xs hover:border-rose-200 hover:bg-rose-50/30 flex flex-col items-center justify-center text-center transition group"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center mb-1 group-hover:scale-105 transition">
            <Heart className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-700 tracking-tight">
            {t.moodCare}
          </span>
        </button>

        {/* 4. Read & Listen */}
        <button
          onClick={() => setCurrentScreen(13)}
          className="p-3 bg-white rounded-2xl border border-slate-100 shadow-xs hover:border-amber-200 hover:bg-amber-50/30 flex flex-col items-center justify-center text-center transition group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-1 group-hover:scale-105 transition">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-700 tracking-tight">
            {t.readListen}
          </span>
        </button>

        {/* 5. Health Records */}
        <button
          onClick={() => setCurrentScreen(14)}
          className="p-3 bg-white rounded-2xl border border-slate-100 shadow-xs hover:border-blue-200 hover:bg-blue-50/30 flex flex-col items-center justify-center text-center transition group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-1 group-hover:scale-105 transition">
            <FileText className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-700 tracking-tight">
            {t.healthRecords}
          </span>
        </button>

        {/* 6. Reminders */}
        <button
          onClick={() => setCurrentScreen(14)}
          className="p-3 bg-white rounded-2xl border border-slate-100 shadow-xs hover:border-purple-200 hover:bg-purple-50/30 flex flex-col items-center justify-center text-center transition group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-1 group-hover:scale-105 transition">
            <Clock className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-700 tracking-tight">
            {t.reminders}
          </span>
        </button>
      </div>

      {/* Special Quick Helpful Tools Bar (Kicks, Hydration & Emergency) */}
      <div className="mb-4 p-3 bg-teal-50/80 border border-teal-100 rounded-2xl flex items-center justify-between gap-2">
        <button
          onClick={() => setActiveModal('kickCounter')}
          className="flex-1 py-1.5 px-2 bg-white rounded-xl border border-rose-200 text-rose-600 text-[11px] font-bold flex items-center justify-center gap-1 shadow-xs hover:bg-rose-50 transition"
        >
          <Heart className="w-3.5 h-3.5 fill-rose-500" />
          <span>{isHindi ? "शिशु किक्स" : "Kick Count"}</span>
        </button>

        <button
          onClick={() => setActiveModal('waterTracker')}
          className="flex-1 py-1.5 px-2 bg-white rounded-xl border border-blue-200 text-blue-600 text-[11px] font-bold flex items-center justify-center gap-1 shadow-xs hover:bg-blue-50 transition"
        >
          <Droplets className="w-3.5 h-3.5 text-blue-500" />
          <span>{isHindi ? "पानी पिएं" : "Hydration"}</span>
        </button>

        <button
          onClick={() => setActiveModal('emergencySos')}
          className="py-1.5 px-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 shadow-xs transition"
        >
          <span>SOS</span>
        </button>
      </div>

      {/* Today's Plan Checklist (Matching Mockup 8) */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-extrabold text-xs text-slate-800">
            {t.todaysPlan}
          </h3>
          <span className="text-[11px] font-bold text-[#157F66] bg-teal-50 px-2.5 py-0.5 rounded-full">
            {completedCount}/{tasks.length} {isHindi ? "पूर्ण" : "completed"}
          </span>
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition select-none"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => {}}
                className="w-4 h-4 text-[#157F66] rounded-sm focus:ring-[#157F66] cursor-pointer"
              />
              <span
                className={`text-xs ${
                  task.completed ? 'line-through text-slate-400 font-normal' : 'text-slate-700 font-medium'
                }`}
              >
                {isHindi ? (task.textHi || task.text) : task.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
