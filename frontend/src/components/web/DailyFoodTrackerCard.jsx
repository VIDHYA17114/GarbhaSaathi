import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import api from '../../services/api';
import { 
  Utensils, 
  Plus, 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Calendar, 
  Clock, 
  AlertCircle, 
  Coffee, 
  Soup, 
  Apple, 
  Check,
  ChevronDown
} from 'lucide-react';

const MEAL_CATEGORIES = [
  { id: 'breakfast', labelHi: 'नाश्ता', labelMr: 'नाश्ता', labelEn: 'Breakfast', icon: Coffee, color: 'amber' },
  { id: 'lunch', labelHi: 'दोपहर का भोजन', labelMr: 'दुपारचे जेवण', labelEn: 'Lunch', icon: Utensils, color: 'emerald' },
  { id: 'snack', labelHi: 'पौष्टिक स्नैक', labelMr: 'पौष्टिक अल्पोपहार', labelEn: 'Snacks', icon: Apple, color: 'teal' },
  { id: 'dinner', labelHi: 'रात का भोजन', labelMr: 'रात्रीचे जेवण', labelEn: 'Dinner', icon: Soup, color: 'indigo' }
];

function getTodayStr() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function DailyFoodTrackerCard() {
  const { language } = useApp();
  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';
  const tr = (hi, mr, en) => isMarathi ? (mr || hi) : (isHindi ? hi : en);

  const [selectedDate, setSelectedDate] = useState(getTodayStr());
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Form state
  const [activeTab, setActiveTab] = useState('breakfast');
  const [foodName, setFoodName] = useState('');
  const [portion, setPortion] = useState('');
  const [mealTime, setMealTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchRecords = useCallback(async (date) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getFoodRecords(date);
      setRecords(res?.records || []);
    } catch (err) {
      console.warn('Food records fetch error:', err.message);
      setError(tr('भोजन रिकॉर्ड लोड करने में समस्या हुई।', 'अन्न नोंदी लोड करण्यात त्रुटी आली.', 'Could not load food records.'));
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchRecords(selectedDate);
  }, [selectedDate, fetchRecords]);

  const handleAddFood = async (e) => {
    e.preventDefault();
    if (!foodName.trim()) return;

    setIsSubmitting(true);
    setError(null);

    const now = new Date();
    const timeFormatted = mealTime || now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const payload = {
      date: selectedDate,
      meal_type: activeTab,
      food_name: foodName.trim(),
      portion: portion.trim() || '1 portion',
      meal_time: timeFormatted,
      completed: true
    };

    try {
      const res = await api.saveFoodRecord(payload);
      if (res?.record) {
        setRecords(prev => [...prev, res.record]);
        setFoodName('');
        setPortion('');
        setMealTime('');
      }
    } catch (err) {
      setError(tr('भोजन रिकॉर्ड सहेजने में विफल। कृपया पुनः प्रयास करें।', 'नोंद जतन करण्यात त्रुटी. कृपया पुन्हा प्रयत्न करा.', 'Failed to save food record. Please retry.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      setRecords(prev => prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
      await api.toggleFoodRecord(id);
    } catch (err) {
      fetchRecords(selectedDate);
    }
  };

  const handleDelete = async (id) => {
    try {
      setRecords(prev => prev.filter(r => r.id !== id));
      await api.deleteFoodRecord(id);
    } catch (err) {
      fetchRecords(selectedDate);
    }
  };

  const currentCategoryRecords = records.filter(r => r.meal_type === activeTab);
  const totalItems = records.length;
  const completedItems = records.filter(r => r.completed).length;

  const breakfastCount = records.filter(r => r.meal_type === 'breakfast').length;
  const lunchCount = records.filter(r => r.meal_type === 'lunch').length;
  const snackCount = records.filter(r => r.meal_type === 'snack').length;
  const dinnerCount = records.filter(r => r.meal_type === 'dinner').length;

  return (
    <div className="w-full bg-white dark:bg-slate-800/90 p-5 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs text-left transition-all">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-100 dark:border-slate-700/70">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-slate-800 dark:text-slate-100">
                {tr('दैनिक पोषण व आहार रिकॉर्ड', 'दैनिक पोषण व आहार नोंदी', 'Daily Food & Meal Log')}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                PostgreSQL
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {tr('नाश्ता, दोपहर, रात का भोजन और स्वस्थ स्नैक्स दर्ज करें', 'नाश्ता, जेवण आणि पौष्टिक अल्पोपहार नोंदवा', 'Log meals, snacks, and portions')}
            </p>
          </div>
        </div>

        {/* Date Picker */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-750 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs">
          <Calendar className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
          <input 
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-transparent text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none pr-1 cursor-pointer"
          />
        </div>
      </div>

      {/* ── Collapsed Summary View (Always visible) ── */}
      <div className="py-3.5 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
          <span className="text-slate-600 dark:text-slate-300">
            {tr(
              `कुल दर्ज वस्तुएं: ${totalItems} (${completedItems} पूर्ण)`,
              `एकूण नोंदी: ${totalItems} (${completedItems} पूर्ण)`,
              `Recorded items: ${totalItems} (${completedItems} completed)`
            )}
          </span>

          {/* Compact Teal "Read more" / "Show less" button with rotating chevron */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/50 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-[#157F66] dark:text-teal-400 border border-teal-200/80 dark:border-teal-800 text-xs font-bold transition focus:outline-none focus:ring-2 focus:ring-teal-500/20 cursor-pointer"
          >
            <span>{isExpanded ? tr('कम दिखाएं', 'कमी दाखवा', 'Show less') : tr('अधिक देखें', 'अधिक पहा', 'Read more')}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Category Count Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {MEAL_CATEGORIES.map(cat => {
            const count = records.filter(r => r.meal_type === cat.id).length;
            const Icon = cat.icon;
            return (
              <div 
                key={cat.id}
                className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-750/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {tr(cat.labelHi, cat.labelMr, cat.labelEn)}
                  </span>
                </div>
                <span className="font-bold text-slate-800 dark:text-slate-100 px-1.5 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-700 text-[10px]">
                  {count}
                </span>
              </div>
            );
          })}
        </div>

        {/* Quick summary of logged foods when collapsed */}
        {!isExpanded && (
          <div className="text-xs text-slate-500 dark:text-slate-400 pt-1">
            {records.length > 0 ? (
              <p className="truncate">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {tr('हालिया आहार', 'अलीकडील आहार', 'Recent entries')}:
                </span>{' '}
                {records.slice(-3).map(r => r.food_name).join(', ')}
              </p>
            ) : (
              <p className="italic text-slate-400">
                {tr('इस तिथि के लिए कोई आहार दर्ज नहीं है। अधिक देखने के लिए "अधिक देखें" पर क्लिक करें।', 'या तारखेसाठी कोणतीही नोंद नाही. तपशील नोंदवण्यासाठी "अधिक पहा" वर क्लिक करा.', 'No meals logged yet for this date. Click "Read more" to add food entries.')}
              </p>
            )}
          </div>
        )}
      </div>

      {/* ── Expanded Full Logging Interface ── */}
      {isExpanded && (
        <div className="pt-3 border-t border-slate-100 dark:border-slate-700/80 space-y-4 animate-in fade-in duration-200">
          {/* Meal Category Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {MEAL_CATEGORIES.map(cat => {
              const count = records.filter(r => r.meal_type === cat.id).length;
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  type="button"
                  className={`py-2 px-3 rounded-2xl text-xs font-bold flex items-center justify-between border transition cursor-pointer ${
                    isActive 
                      ? 'bg-[#157F66] text-white border-[#157F66] shadow-xs' 
                      : 'bg-slate-50 dark:bg-slate-750/70 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-teal-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tr(cat.labelHi, cat.labelMr, cat.labelEn)}</span>
                  </div>
                  {count > 0 && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                      isActive ? 'bg-white/30 text-white' : 'bg-slate-200 dark:bg-slate-650 text-slate-700 dark:text-slate-200'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Add Meal Entry Form */}
          <form onSubmit={handleAddFood} className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
              <div className="sm:col-span-6">
                <input 
                  type="text"
                  placeholder={tr('भोजन का नाम (जैसे: पालक दाल + 2 रोटी)', 'अन्नाचे नाव (उदा: पालक वरण + २ पोळी)', 'Food name (e.g., Dal Khichdi + Curd)')}
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-teal-500"
                  required
                />
              </div>
              <div className="sm:col-span-3">
                <input 
                  type="text"
                  placeholder={tr('मात्रा (उदा: 1 कटोरी)', 'प्रमाण (उदा: १ वाटी)', 'Portion (e.g. 1 bowl)')}
                  value={portion}
                  onChange={(e) => setPortion(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="sm:col-span-3">
                <button
                  type="submit"
                  disabled={isSubmitting || !foodName.trim()}
                  className="w-full py-2 px-3 bg-[#157F66] hover:bg-[#0e5947] disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{tr('जोड़ें', 'जोडा', 'Add')}</span>
                </button>
              </div>
            </div>
          </form>

          {error && (
            <div className="p-2.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Current Category Items List */}
          <div className="space-y-2 min-h-[70px]">
            {loading ? (
              <div className="py-6 text-center text-xs text-slate-400">
                {tr('लोड हो रहा है...', 'लोड होत आहे...', 'Loading meals...')}
              </div>
            ) : currentCategoryRecords.length === 0 ? (
              <div className="py-6 text-center border-2 border-dashed border-slate-100 dark:border-slate-750 rounded-2xl">
                <p className="text-xs text-slate-400">
                  {tr(
                    `इस श्रेणी में कोई भोजन दर्ज नहीं है। ऊपर से जोड़ें।`,
                    `या वर्गवारीत अद्याप नोंद नाही. वरून जोडा.`,
                    `No items logged in this category for ${selectedDate}.`
                  )}
                </p>
              </div>
            ) : (
              currentCategoryRecords.map((item) => (
                <div 
                  key={item.id}
                  className={`p-3 rounded-2xl border transition flex items-center justify-between gap-3 text-xs ${
                    item.completed 
                      ? 'bg-slate-50/80 dark:bg-slate-750/50 border-slate-200/80 dark:border-slate-700' 
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <button 
                      type="button"
                      onClick={() => handleToggle(item.id)}
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition shrink-0 ${
                        item.completed 
                          ? 'bg-[#157F66] text-white' 
                          : 'border-2 border-slate-300 dark:border-slate-600 hover:border-teal-500'
                      }`}
                    >
                      {item.completed && <Check className="w-3 h-3 stroke-3" />}
                    </button>
                    <div className="truncate">
                      <span className={`font-semibold block truncate ${
                        item.completed 
                          ? 'line-through text-slate-400 dark:text-slate-500' 
                          : 'text-slate-800 dark:text-slate-100'
                      }`}>
                        {item.food_name}
                      </span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-2">
                        {item.portion && <span>{item.portion}</span>}
                        {item.meal_time && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.meal_time}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>

                  <button 
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 transition shrink-0"
                    title={tr('हटाएं', 'हटवा', 'Delete')}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

    </div>
  );
}
