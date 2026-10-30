import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { moodMediaLibrary } from '../data/moodMediaLibrary';
import { ArrowLeft, Play, BookOpen, Wind, Film, Eye } from 'lucide-react';

export default function Screen13_MoodWellness() {
  const { setCurrentScreen, setActiveModal, setModalData, dailyCheckin, setDailyCheckin, language, t } = useApp();
  const [selectedMood, setSelectedMood] = useState(dailyCheckin.mood || 'calm');
  const [activeCategory, setActiveCategory] = useState('all'); // 'all', 'reels', 'audio', 'read', 'breathing'

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';

  const handleSelectMood = (moodId) => {
    setSelectedMood(moodId);
    setDailyCheckin(prev => ({ ...prev, mood: moodId }));
  };

  const handleOpenMedia = (item) => {
    setModalData(item);
    if (item.type === 'breathing' || item.type === 'audio') {
      setActiveModal('audioPlayer');
    } else if (item.type === 'read') {
      setActiveModal('bookReader');
    } else if (item.type === 'reels') {
      setActiveModal('reelPlayer');
    }
  };

  // Filter items based on category and mood match
  const filteredItems = moodMediaLibrary.items.filter(item => {
    if (activeCategory !== 'all' && item.type !== activeCategory) return false;
    return true;
  });

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
            {t.moodTitle}
          </h2>
        </div>

        {/* Mood Emojis Bar (Matching Mockup 13) */}
        <div className="grid grid-cols-6 gap-1.5 my-2">
          {moodMediaLibrary.moods.map((m) => {
            const isSelected = selectedMood === m.id;
            return (
              <button
                key={m.id}
                onClick={() => handleSelectMood(m.id)}
                className={`py-2 px-1 rounded-2xl flex flex-col items-center justify-center transition ${
                  isSelected
                    ? 'bg-teal-50 border-2 border-[#157F66] shadow-xs'
                    : 'bg-white border border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                <span className="text-xl">{m.emoji}</span>
                <span className={`text-[10px] font-bold mt-1 tracking-tighter ${isSelected ? 'text-[#157F66]' : 'text-slate-500'}`}>
                  {isHindi ? m.labelHi : (isMarathi ? m.labelMr : m.label)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Section Heading: "Recommended for your mood" */}
        <div className="mt-4">
          <h3 className="font-bold text-xs text-slate-800 mb-2">
            {t.recommendedForMood}
          </h3>

          {/* Category Filter Pills (Short Reels, Audio, Read, Breathing) (Matching Mockup 13) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2">
            {moodMediaLibrary.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold transition ${
                  activeCategory === cat.id
                    ? 'bg-[#157F66] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {isHindi ? cat.labelHi : (isMarathi ? cat.labelMr : cat.label)}
              </button>
            ))}
          </div>

          {/* Media Cards 2x2 Grid (Matching Mockup 13) */}
          <div className="grid grid-cols-2 gap-2.5 mt-2">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleOpenMedia(item)}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col cursor-pointer hover:border-teal-300 hover:shadow-md transition group"
              >
                {/* Visual Thumbnail */}
                <div className={`h-24 bg-linear-to-br ${item.bgGradient} flex items-center justify-center text-3xl text-white relative shadow-inner`}>
                  <span>{item.icon}</span>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition" />
                  <div className="absolute bottom-1.5 right-2 px-1.5 py-0.5 rounded-md bg-black/60 text-[9px] font-mono text-white">
                    {item.duration}
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-2.5 flex-1 flex flex-col justify-between">
                  <h4 className="font-bold text-[11px] text-slate-800 line-clamp-2 leading-tight">
                    {isHindi ? (item.titleHi || item.title) : item.title}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                    <span>{item.views}</span>
                    <div className="w-5 h-5 rounded-full bg-slate-100 group-hover:bg-[#157F66] group-hover:text-white flex items-center justify-center text-slate-600 transition">
                      <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
