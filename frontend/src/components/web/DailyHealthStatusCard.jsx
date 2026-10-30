import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import api from '../../services/api';
import { 
  HeartPulse, 
  Smile, 
  Moon, 
  Droplet, 
  Pill, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Save, 
  Info,
  ChevronDown,
  Plus,
  Minus
} from 'lucide-react';

function getTodayStr() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const COMMON_SYMPTOMS = [
  { id: 'nausea', labelHi: 'मतली / उल्टी', labelMr: 'मळमळ / उलटी', labelEn: 'Nausea' },
  { id: 'fatigue', labelHi: 'थकान', labelMr: 'थकवा', labelEn: 'Fatigue' },
  { id: 'backache', labelHi: 'कमर दर्द', labelMr: 'कंबरदुखी', labelEn: 'Backache' },
  { id: 'heartburn', labelHi: 'एसिडिटी', labelMr: 'ॲसिडिटी', labelEn: 'Heartburn' },
  { id: 'headache', labelHi: 'हल्का सिरदर्द', labelMr: 'डोकेदुखी', labelEn: 'Headache' },
  { id: 'swelling', labelHi: 'हल्की सूजन', labelMr: 'पायावर सूज', labelEn: 'Mild Swelling' }
];

export default function DailyHealthStatusCard() {
  const { language } = useApp();
  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';
  const tr = (hi, mr, en) => isMarathi ? (mr || hi) : (isHindi ? hi : en);

  const [selectedDate, setSelectedDate] = useState(getTodayStr());
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isRecorded, setIsRecorded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Questionnaire fields
  const [feeling, setFeeling] = useState('good');
  const [sleepQuality, setSleepQuality] = useState('good');
  const [symptoms, setSymptoms] = useState([]);
  const [waterGlasses, setWaterGlasses] = useState(6);
  const [medicinesTaken, setMedicinesTaken] = useState('yes');
  const [activityCompleted, setActivityCompleted] = useState('yes');
  const [mealsEaten, setMealsEaten] = useState('yes');
  const [notes, setNotes] = useState('');

  const fetchHealthStatus = useCallback(async (date) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getHealthStatus(date);
      if (res?.found && res?.data) {
        setIsRecorded(true);
        setFeeling(res.data.feeling || 'good');
        setSleepQuality(res.data.sleep_quality || 'good');
        setSymptoms(res.data.symptoms || []);
        setWaterGlasses(res.data.water_glasses ?? 6);
        setMedicinesTaken(res.data.medicines_taken || 'yes');
        setActivityCompleted(res.data.activity_completed || 'yes');
        setMealsEaten(res.data.meals_eaten || 'yes');
        setNotes(res.data.notes || '');
      } else {
        setIsRecorded(false);
        setFeeling('good');
        setSleepQuality('good');
        setSymptoms([]);
        setWaterGlasses(6);
        setMedicinesTaken('yes');
        setActivityCompleted('yes');
        setMealsEaten('yes');
        setNotes('');
      }
    } catch (err) {
      console.warn('Health status fetch error:', err.message);
      setError(tr('स्वास्थ्य स्थिति लोड करने में विफल।', 'आरोग्य स्थिती लोड करताना त्रुटी.', 'Could not load health status.'));
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchHealthStatus(selectedDate);
  }, [selectedDate, fetchHealthStatus]);

  const toggleSymptom = (id) => {
    setSymptoms(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError(null);
    setSaveSuccess(false);

    const payload = {
      date: selectedDate,
      feeling,
      sleep_quality: sleepQuality,
      symptoms,
      water_glasses: waterGlasses,
      medicines_taken: medicinesTaken,
      activity_completed: activityCompleted,
      meals_eaten: mealsEaten,
      notes: notes.trim() || null
    };

    try {
      await api.saveHealthStatus(payload);
      setIsRecorded(true);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setError(tr('स्वास्थ्य स्थिति सहेजने में विफल।', 'जतन करताना त्रुटी आली.', 'Failed to save health status.'));
    }
  };

  const feelingLabels = {
    great: { label: tr('बहुत अच्छा', 'खूप छान', 'Great'), icon: '🌟' },
    good:  { label: tr('अच्छा', 'छान', 'Good'), icon: '😊' },
    tired: { label: tr('थकान', 'थकवा', 'Tired'), icon: '🥱' },
    unwell:{ label: tr('अस्वस्थ', 'अस्वस्थ', 'Unwell'), icon: '🤕' }
  };

  const sleepLabels = {
    good:     { label: tr('गहरी व अच्छी', 'शांत व गाढ', 'Deep & Restful') },
    moderate: { label: tr('सामान्य', 'मध्यम', 'Average') },
    poor:     { label: tr('अधूरी नींद', 'अपरी अपुरी झोप', 'Disturbed / Poor') }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-800/90 p-5 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs text-left transition-all">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-100 dark:border-slate-700/70">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-100 dark:border-teal-900 text-[#157F66] dark:text-teal-400 flex items-center justify-center shrink-0">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-slate-800 dark:text-slate-100">
                {tr('दैनिक स्वास्थ्य स्थिति', 'दैनिक आरोग्य स्थिती', 'Daily Health Status')}
              </h3>
              {isRecorded && (
                <span className="px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/60 text-[#157F66] dark:text-teal-300 text-[10px] font-bold border border-teal-200/60 dark:border-teal-800">
                  {tr('दर्ज किया गया', 'नोंदवले', 'Recorded')}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {tr('दैनिक अनुभव, नींद, जलयोजन और लक्षणों का संक्षिप्त रिकॉर्ड', 'दैनंदिन अनुभव, झोप, पाणी आणि लक्षणांची नोंद', 'Daily feelings, sleep quality, hydration, and symptoms')}
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
            {isRecorded
              ? tr('आज की दर्ज स्वास्थ्य स्थिति सारांश:', 'आजची नोंदवलेली आरोग्य स्थिती:', "Recorded check-in summary:")
              : tr('आज की स्थिति अभी दर्ज नहीं की गई है', 'आजची स्थिती अद्याप नोंदवलेली नाही', 'No check-in recorded yet for this date')}
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

        {/* Concise summary badges */}
        {isRecorded ? (
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200/70 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-300 font-semibold flex items-center gap-1.5">
                <span>{feelingLabels[feeling]?.icon || '😊'}</span>
                <span>{tr('अनुभव', 'अनुभव', 'Feeling')}: {feelingLabels[feeling]?.label || feeling}</span>
              </span>

              <span className="px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/70 dark:border-indigo-900 text-xs text-indigo-800 dark:text-indigo-300 font-semibold flex items-center gap-1.5">
                <Moon className="w-3.5 h-3.5 text-indigo-500" />
                <span>{tr('नींद', 'झोप', 'Sleep')}: {sleepLabels[sleepQuality]?.label || sleepQuality}</span>
              </span>

              <span className="px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200/70 dark:border-blue-900 text-xs text-blue-800 dark:text-blue-300 font-semibold flex items-center gap-1.5">
                <Droplet className="w-3.5 h-3.5 text-blue-500" />
                <span>{waterGlasses} {tr('ग्लास जल', 'ग्लास पाणी', 'glasses water')}</span>
              </span>

              <span className="px-3 py-1 rounded-xl bg-teal-50 dark:bg-teal-950/50 border border-teal-200/70 dark:border-teal-900 text-xs text-teal-800 dark:text-teal-300 font-semibold flex items-center gap-1.5">
                <Pill className="w-3.5 h-3.5 text-teal-600" />
                <span>{tr('दवाइयां', 'औषधे', 'Meds')}: {medicinesTaken === 'yes' ? tr('हाँ', 'हो', 'Yes') : tr('नहीं', 'नाही', 'No')}</span>
              </span>
            </div>

            {/* Symptoms summary */}
            <div className="text-xs text-slate-500 dark:text-slate-400 pt-0.5">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {tr('लक्षण', 'लक्षणे', 'Reported symptoms')}:
              </span>{' '}
              {symptoms.length > 0 ? (
                <span>{symptoms.map(s => {
                  const item = COMMON_SYMPTOMS.find(x => x.id === s);
                  return item ? tr(item.labelHi, item.labelMr, item.labelEn) : s;
                }).join(', ')}</span>
              ) : (
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                  {tr('कोई असामान्य लक्षण दर्ज नहीं', 'कोणतेही असामान्य लक्षण नाही', 'None reported')}
                </span>
              )}
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">
            {tr('दैनिक स्वास्थ्य, जलयोजन और लक्षणों को दर्ज करने के लिए "अधिक देखें" पर क्लिक करें।', 'दैनिक आरोग्य स्थिती नोंदवण्यासाठी "अधिक पहा" वर क्लिक करा.', 'Click "Read more" to complete your daily wellness check-in.')}
          </p>
        )}
      </div>

      {/* ── Expanded Full Questionnaire ── */}
      {isExpanded && (
        <form onSubmit={handleSave} className="pt-3 border-t border-slate-100 dark:border-slate-700/80 space-y-4 animate-in fade-in duration-200">
          
          {/* Question 1: Feeling */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-2">
              1. {tr('आज आप कैसा महसूस कर रही हैं?', 'आज आपल्याला कसे वाटत आहे?', 'How are you feeling today?')}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.entries(feelingLabels).map(([key, item]) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => setFeeling(key)}
                  className={`py-2 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 border transition cursor-pointer ${
                    feeling === key
                      ? 'bg-[#157F66] text-white border-[#157F66] shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-750/70 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-teal-300'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Sleep */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-2">
              2. {tr('बीती रात आपकी नींद कैसी रही?', 'काल रात्री झोप कशी झाली?', 'How was your sleep last night?')}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {Object.entries(sleepLabels).map(([key, item]) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => setSleepQuality(key)}
                  className={`py-2 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 border transition cursor-pointer ${
                    sleepQuality === key
                      ? 'bg-[#157F66] text-white border-[#157F66] shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-750/70 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-teal-300'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Water Intake */}
          <div className="p-3 bg-blue-50/40 dark:bg-blue-950/20 rounded-2xl border border-blue-200/60 dark:border-blue-900/40 flex items-center justify-between">
            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                <Droplet className="w-4 h-4 text-blue-500" />
                <span>{tr('जल सेवन (ग्लास)', 'पाणी पिणे (ग्लास)', 'Water Hydration (Glasses)')}</span>
              </label>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {tr('लक्ष्य: 8-10 ग्लास प्रतिदिन', 'ध्येय: ८-१० ग्लास दररोज', 'Recommended: 8-10 glasses daily')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setWaterGlasses(prev => Math.max(0, prev - 1))}
                className="w-7 h-7 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-200 hover:bg-slate-100"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center font-black text-base text-blue-700 dark:text-blue-400">
                {waterGlasses}
              </span>
              <button
                type="button"
                onClick={() => setWaterGlasses(prev => prev + 1)}
                className="w-7 h-7 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-200 hover:bg-slate-100"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Question 4: Symptoms */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-2">
              3. {tr('क्या आज कोई लक्षण महसूस हो रहे हैं? (चुनें)', 'आज कोणती लक्षणे जाणवत आहेत? (निवडा)', 'Any symptoms today? (Select all that apply)')}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {COMMON_SYMPTOMS.map(s => {
                const isSelected = symptoms.includes(s.id);
                return (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => toggleSymptom(s.id)}
                    className={`p-2.5 rounded-2xl text-xs font-semibold border text-left transition flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200'
                        : 'bg-slate-50 dark:bg-slate-750/70 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <span>{tr(s.labelHi, s.labelMr, s.labelEn)}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 5: Quick Yes/No Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-750/60 border border-slate-200/80 dark:border-slate-700 text-xs flex items-center justify-between">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {tr('निर्धारित दवाइयां लीं?', 'औषधे घेतली का?', 'Prescribed meds taken?')}
              </span>
              <button
                type="button"
                onClick={() => setMedicinesTaken(prev => prev === 'yes' ? 'no' : 'yes')}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition ${
                  medicinesTaken === 'yes'
                    ? 'bg-[#157F66] text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {medicinesTaken === 'yes' ? tr('हाँ', 'हो', 'Yes') : tr('नहीं', 'नाही', 'No')}
              </button>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-750/60 border border-slate-200/80 dark:border-slate-700 text-xs flex items-center justify-between">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {tr('हल्का व्यायाम/टहलना?', 'हलका व्यायाम केला का?', 'Gentle walk/activity?')}
              </span>
              <button
                type="button"
                onClick={() => setActivityCompleted(prev => prev === 'yes' ? 'no' : 'yes')}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition ${
                  activityCompleted === 'yes'
                    ? 'bg-[#157F66] text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {activityCompleted === 'yes' ? tr('हाँ', 'हो', 'Yes') : tr('नहीं', 'नाही', 'No')}
              </button>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-750/60 border border-slate-200/80 dark:border-slate-700 text-xs flex items-center justify-between">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {tr('तीनों समय भोजन किया?', 'तिन्ही जेवणे झाली का?', 'All 3 meals eaten?')}
              </span>
              <button
                type="button"
                onClick={() => setMealsEaten(prev => prev === 'yes' ? 'no' : 'yes')}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition ${
                  mealsEaten === 'yes'
                    ? 'bg-[#157F66] text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {mealsEaten === 'yes' ? tr('हाँ', 'हो', 'Yes') : tr('नहीं', 'नाही', 'No')}
              </button>
            </div>
          </div>

          {/* Notes field */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
              {tr('अतिरिक्त टिप्पणी या कोई असुविधा (वैकल्पिक)', 'अतिरिक्त नोंद किंवा अस्वस्थता (पर्यायी)', 'Additional notes or discomfort (Optional)')}
            </label>
            <input 
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={tr('उदा: शाम को हल्का सिरदर्द था, आराम के बाद ठीक हुआ', 'उदा: संध्याकाळी थोडे डोके दुखत होते', 'e.g., mild evening headache relieved by resting')}
              className="w-full text-xs bg-slate-50 dark:bg-slate-750/70 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Non-Diagnostic Safety Disclaimer */}
          <div className="p-3 bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-xl text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p>
              {tr(
                'यह प्रश्नावली केवल आपकी दैनिक स्व-निगरानी के लिए है और कोई चिकित्सकीय निदान प्रदान नहीं करती। गंभीर सिरदर्द, रक्तस्राव, तेज पेट दर्द या शिशु की हलचल में कमी जैसे लक्षणों पर तुरंत अपने डॉक्टर से संपर्क करें।',
                'ही प्रश्नावली केवळ दैनंदिन स्व-निरीक्षणासाठी आहे. तीव्र डोकेदुखी, रक्तस्राव किंवा बाळाच्या हालचाली कमी जाणवल्यास त्वरित डॉक्टरांशी संपर्क साधा.',
                'This questionnaire is for personal daily wellness tracking only and is non-diagnostic. For severe pain, bleeding, fluid leaking, or reduced fetal movement, contact your healthcare provider immediately.'
              )}
            </p>
          </div>

          {error && (
            <div className="p-2 bg-red-50 dark:bg-red-950/40 border border-red-200 text-xs text-red-700 rounded-xl">
              {error}
            </div>
          )}

          {saveSuccess && (
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-xs text-emerald-700 rounded-xl flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>{tr('स्वास्थ्य स्थिति सफलतापूर्वक सहेजी गई!', 'आरोग्य स्थिती यशस्वीरीत्या जतन झाली!', 'Health status saved successfully!')}</span>
            </div>
          )}

          {/* Submit button */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex justify-end">
            <button
              type="submit"
              className="py-2.5 px-5 bg-[#157F66] hover:bg-[#0e5947] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{tr('स्वास्थ्य स्थिति सहेजें', 'स्थिती जतन करा', 'Save Health Status')}</span>
            </button>
          </div>

        </form>
      )}

    </div>
  );
}
