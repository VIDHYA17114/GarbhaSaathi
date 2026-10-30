import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import api from '../../services/api';
import { 
  CheckSquare, 
  Calendar, 
  Check, 
  Minus, 
  Ban, 
  Droplet, 
  Utensils, 
  Pill, 
  Activity, 
  Stethoscope, 
  AlertCircle,
  Save,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

function getTodayStr() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const CHECKLIST_ITEMS = [
  {
    id: 'water_intake',
    titleHi: 'पर्याप्त जल सेवन (8-10 ग्लास)',
    titleMr: 'पुरेसे पाणी पिणे (८-१० ग्लास)',
    titleEn: 'Hydration (8-10 glasses water)',
    descHi: 'निर्जलीकरण और यूरिनरी इन्फेक्शन से बचाव के लिए',
    descMr: 'डिहायड्रेशन व संसर्ग टाळण्यासाठी',
    descEn: 'Prevents dehydration and urinary tract infections',
    icon: Droplet,
    iconColor: 'text-blue-500'
  },
  {
    id: 'balanced_meals',
    titleHi: 'नियमित समय पर संतुलित 3 मुख्य भोजन व स्नैक्स',
    titleMr: 'वेळेवर ३ संतुलित जेवणे व पौष्टिक अल्पोपहार',
    titleEn: 'Scheduled 3 Balanced Meals & Snacks',
    descHi: 'आयरन, प्रोटीन व कैल्शियम युक्त घर का बना ताजा भोजन',
    descMr: 'लोह, प्रथिने व कॅल्शियमयुक्त ताजा घरगुती आहार',
    descEn: 'Nutrient-rich home cooked meals & whole foods',
    icon: Utensils,
    iconColor: 'text-emerald-500'
  },
  {
    id: 'prescribed_supplements',
    titleHi: 'डॉक्टर द्वारा निर्धारित आयरन/फोलिक/कैल्शियम गोलियां',
    titleMr: 'डॉक्टरांनी सांगितलेल्या फॉलिक/लोह/कॅल्शियम गोळ्या',
    titleEn: 'Prescribed Supplements (Folic, Iron, Calcium)',
    descHi: 'चिकित्सकीय निर्देशानुसार सही समय पर सेवन',
    descMr: 'वैद्यकीय सल्ल्यानुसार योग्य वेळी नियमित घेणे',
    descEn: 'Taken as directed by healthcare provider',
    icon: Pill,
    iconColor: 'text-rose-500'
  },
  {
    id: 'safe_physical_activity',
    titleHi: 'हल्का दैनिक व्यायाम / 20 मिनट टहलना',
    titleMr: 'हलका दैनंदिन व्यायाम / २० मिनिटे चालणे',
    titleEn: 'Safe Gentle Activity / 20-min Walk',
    descHi: 'शरीर को लचीला व सक्रिय रखने के लिए हल्का व्यायाम',
    descMr: 'शरीर लवचिक व सक्रिय ठेवण्यासाठी हलका व्यायाम',
    descEn: 'Gentle walking or pelvic floor stretches as permitted',
    icon: Activity,
    iconColor: 'text-purple-500'
  },
  {
    id: 'scheduled_checkups',
    titleHi: 'नियमित ANC क्लिनिक व लैब जांच',
    titleMr: 'नियमित ANC तपासणी व आवश्यक रक्त चाचण्या',
    titleEn: 'Scheduled Antenatal Appointments & Scans',
    descHi: 'रक्तचाप, वजन व शिशु की सामान्य निगरानी',
    descMr: 'रक्तदाब, वजन व बाळाच्या वाढीचे नियमित निरीक्षण',
    descEn: 'Periodic clinic visits, blood pressure & ultrasound checks',
    icon: Stethoscope,
    iconColor: 'text-teal-600'
  },
  {
    id: 'symptom_monitoring',
    titleHi: 'शारीरिक लक्षणों व शिशु की हलचल पर नजर',
    titleMr: 'शारीरिक लक्षणे व बाळाच्या हालचालींवर लक्ष',
    titleEn: 'Daily Symptom & Movement Awareness',
    descHi: 'किसी भी असामान्य संकेत या दर्द की तुरंत पहचान',
    descMr: 'कोणत्याही असामान्य बदलांची वेळेवर नोंद घेणे',
    descEn: 'Noticing baby movement kicks and overall comfort',
    icon: AlertCircle,
    iconColor: 'text-amber-500'
  }
];

export default function DailyNeedsChecklistCard() {
  const { language } = useApp();
  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';
  const tr = (hi, mr, en) => isMarathi ? (mr || hi) : (isHindi ? hi : en);

  const [selectedDate, setSelectedDate] = useState(getTodayStr());
  const [itemStatuses, setItemStatuses] = useState({});
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const fetchChecklist = useCallback(async (date) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getDailyNeeds(date);
      if (res?.found && res?.items) {
        setItemStatuses(res.items);
      } else {
        const defaults = {};
        CHECKLIST_ITEMS.forEach(it => {
          defaults[it.id] = { status: 'pending' };
        });
        setItemStatuses(defaults);
      }
    } catch (err) {
      console.warn('Daily needs fetch error:', err.message);
      setError(tr('दैनिक आवश्यकता सूची लोड नहीं हो सकी।', 'दैनंदिन गरजांची सूची लोड होऊ शकली नाही.', 'Could not load daily needs checklist.'));
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchChecklist(selectedDate);
  }, [selectedDate, fetchChecklist]);

  // Update item status: 'completed' | 'skipped' | 'not_applicable' | 'pending'
  const setStatus = async (id, status) => {
    const updated = {
      ...itemStatuses,
      [id]: { status: itemStatuses[id]?.status === status ? 'pending' : status }
    };
    setItemStatuses(updated);

    try {
      const res = await api.saveDailyNeeds({
        date: selectedDate,
        items: updated
      });
      if (res?.checklist) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
      }
    } catch (err) {
      setError(tr('अपडेट सहेजने में त्रुटि।', 'अपडेट जतन करताना त्रुटी.', 'Failed to update checklist.'));
    }
  };

  // Calculations
  const completedCount = CHECKLIST_ITEMS.filter(it => itemStatuses[it.id]?.status === 'completed').length;
  const skippedCount = CHECKLIST_ITEMS.filter(it => itemStatuses[it.id]?.status === 'skipped').length;
  const naCount = CHECKLIST_ITEMS.filter(it => itemStatuses[it.id]?.status === 'not_applicable').length;
  const pendingCount = CHECKLIST_ITEMS.length - (completedCount + skippedCount + naCount);
  const applicableCount = CHECKLIST_ITEMS.length - naCount;
  const progressPercent = applicableCount > 0 ? Math.round((completedCount / applicableCount) * 100) : 0;

  return (
    <div className="w-full bg-white dark:bg-slate-800/90 p-5 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs text-left transition-all">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-100 dark:border-slate-700/70">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 text-indigo-700 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-slate-800 dark:text-slate-100">
                {tr('दैनिक आवश्यकता चेकलिस्ट', 'दैनंदिन गरजांची चेकलिस्ट', 'Daily Needs & Essentials Checklist')}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-indigo-100/70 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 text-[10px] font-bold">
                {progressPercent}%
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {tr('पोषण, जल, दवा व स्वास्थ्य देखभाल की दैनिक प्रगति', 'पोषण, पाणी, औषधे व आरोग्य काळजी प्रगती', 'Hydration, nutrition, medicines, and prenatal care essentials')}
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
          <span className="text-slate-600 dark:text-slate-300 font-medium">
            {tr('दैनिक आवश्यकताओं का अनुपालन:', 'दैनंदिन गरजांची पूर्तता:', 'Completion summary:')}
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

        {/* Progress bar and 3 status counts */}
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900 text-center">
            <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 block">
              {tr('पूर्ण', 'पूर्ण', 'Completed')}
            </span>
            <span className="text-base font-black text-emerald-800 dark:text-emerald-200">
              {completedCount}
            </span>
          </div>

          <div className="p-2.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900 text-center">
            <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400 block">
              {tr('लंबित', 'प्रलंबित', 'Pending')}
            </span>
            <span className="text-base font-black text-amber-800 dark:text-amber-200">
              {pendingCount}
            </span>
          </div>

          <div className="p-2.5 rounded-2xl bg-slate-100/80 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
              {tr('छोड़ा गया', 'वगळले', 'Skipped')}
            </span>
            <span className="text-base font-black text-slate-700 dark:text-slate-300">
              {skippedCount}
            </span>
          </div>
        </div>

        {/* Mini progress indicator */}
        <div className="space-y-1 pt-0.5">
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>{completedCount} of {applicableCount} {tr('कार्य संपन्न', 'कार्ये पूर्ण', 'actions done')}</span>
            <span className="font-bold text-[#157F66] dark:text-teal-400">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#157F66] to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Expanded Full Checklist Interface ── */}
      {isExpanded && (
        <div className="pt-3 border-t border-slate-100 dark:border-slate-700/80 space-y-3 animate-in fade-in duration-200">
          {saveSuccess && (
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-xs text-emerald-700 rounded-xl flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>{tr('चेकलिस्ट सहेजी गई!', 'चेकलिस्ट जतन झाली!', 'Checklist saved to PostgreSQL!')}</span>
            </div>
          )}

          {error && (
            <div className="p-2 bg-red-50 text-xs text-red-700 rounded-xl">
              {error}
            </div>
          )}

          <div className="space-y-2">
            {CHECKLIST_ITEMS.map(item => {
              const Icon = item.icon;
              const currentStatus = itemStatuses[item.id]?.status || 'pending';

              return (
                <div 
                  key={item.id}
                  className="p-3 bg-slate-50/80 dark:bg-slate-750/70 rounded-2xl border border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition"
                >
                  <div className="flex items-start gap-2.5 flex-1 min-w-0">
                    <div className={`mt-0.5 w-7 h-7 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center shrink-0 ${item.iconColor}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-800 dark:text-slate-100">
                        {tr(item.titleHi, item.titleMr, item.titleEn)}
                      </h5>
                      <p className="text-[11px] text-slate-400 dark:text-slate-400 mt-0.5">
                        {tr(item.descHi, item.descMr, item.descEn)}
                      </p>
                    </div>
                  </div>

                  {/* 3 Status Buttons: Completed / Skipped / N/A */}
                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                    
                    {/* Completed */}
                    <button
                      type="button"
                      onClick={() => setStatus(item.id, 'completed')}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
                        currentStatus === 'completed'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-400'
                      }`}
                      title={tr('पूर्ण', 'पूर्ण', 'Completed')}
                    >
                      <Check className="w-3 h-3" />
                      <span>{tr('पूर्ण', 'पूर्ण', 'Done')}</span>
                    </button>

                    {/* Skipped */}
                    <button
                      type="button"
                      onClick={() => setStatus(item.id, 'skipped')}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
                        currentStatus === 'skipped'
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-amber-400'
                      }`}
                      title={tr('छोड़ा', 'वगळले', 'Skipped')}
                    >
                      <Minus className="w-3 h-3" />
                      <span>{tr('छोड़ा', 'वगळले', 'Skip')}</span>
                    </button>

                    {/* Not Applicable */}
                    <button
                      type="button"
                      onClick={() => setStatus(item.id, 'not_applicable')}
                      className={`px-2 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
                        currentStatus === 'not_applicable'
                          ? 'bg-slate-600 text-white shadow-xs'
                          : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-400 hover:border-slate-400'
                      }`}
                      title={tr('लागू नहीं', 'लागू नाही', 'Not Applicable')}
                    >
                      <Ban className="w-3 h-3" />
                      <span>N/A</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
