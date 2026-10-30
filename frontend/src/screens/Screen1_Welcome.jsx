import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Screen1_Welcome() {
  const { setCurrentScreen, language, setLanguage, t } = useApp();

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-linear-to-b from-[#FFF5F2] via-[#FAF9F5] to-[#EAF5F1] text-center select-none">
      {/* Top Header Logo */}
      <div className="pt-4 flex flex-col items-center">
        <img 
          src="/garbhasaathi_logo.png" 
          alt="GarbhaSaathi Logo" 
          className="w-20 h-20 object-contain drop-shadow-md mb-2" 
        />
        <h1 className="text-3xl font-extrabold text-[#157F66] tracking-tight">
          GarbhaSaathi
        </h1>
        <p className="text-xs text-slate-600 max-w-[260px] mt-1 font-medium leading-relaxed">
          {language === 'hi' 
            ? "स्वस्थ और खुशहाल मातृत्व यात्रा के लिए आपकी साथी" 
            : (language === 'mr' ? "निरोगी आणि आनंदी मातृत्व प्रवासासाठी आपली विश्वासू सोबती" : "Your Companion for a Healthy, Happy Pregnancy Journey")}
        </p>
      </div>

      {/* Main Illustration Area */}
      <div className="my-auto py-4 flex flex-col items-center relative">
        <div className="w-56 h-56 rounded-full bg-linear-to-tr from-rose-100/70 to-teal-50 flex items-center justify-center relative shadow-inner border border-rose-200/50">
          {/* Stylized Avatar Illustration */}
          <div className="w-44 h-44 rounded-full bg-linear-to-b from-rose-200 to-orange-100 flex flex-col items-center justify-center relative overflow-hidden shadow-md">
            <span className="text-7xl">🤰</span>
            <div className="absolute -bottom-2 w-32 h-10 bg-white/40 blur-xs rounded-full" />
          </div>
          {/* Floral floating badges */}
          <span className="absolute -top-2 left-6 text-2xl animate-bounce">🌿</span>
          <span className="absolute top-10 right-4 text-2xl">✨</span>
          <span className="absolute bottom-4 left-4 text-2xl">🌺</span>
        </div>
      </div>

      {/* Bottom Language Selector & Get Started */}
      <div className="w-full pb-2 flex flex-col items-center gap-3">
        {/* Language Pills */}
        <div className="flex items-center gap-3 bg-white/90 p-1.5 rounded-full shadow-sm border border-slate-200/60">
          <button
            onClick={() => setLanguage('hi')}
            className={`px-5 py-1.5 rounded-full text-xs font-bold transition ${
              language === 'hi'
                ? 'bg-[#157F66] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            हिंदी
          </button>
          <button
            onClick={() => setLanguage('mr')}
            className={`px-5 py-1.5 rounded-full text-xs font-bold transition ${
              language === 'mr'
                ? 'bg-[#157F66] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            मराठी
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
              language === 'en'
                ? 'bg-[#157F66] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            English
          </button>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => setCurrentScreen(2)}
          className="w-full py-4 bg-[#157F66] hover:bg-[#0e5947] active:scale-98 text-white rounded-2xl font-bold text-sm shadow-xl shadow-teal-700/20 flex items-center justify-center gap-2 transition"
        >
          <span>{t.getStarted}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
