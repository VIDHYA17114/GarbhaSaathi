import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import api from '../../services/api';
import { 
  History, 
  Calendar, 
  Utensils, 
  HeartPulse, 
  CheckSquare, 
  Footprints, 
  Clock, 
  FileText, 
  Activity, 
  AlertCircle, 
  Stethoscope, 
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Smile,
  Moon,
  Droplet,
  Pill,
  CheckCircle2,
  CalendarCheck,
  Save,
  Check,
  Sparkles
} from 'lucide-react';

function getTodayStr() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function DailyHistoryViewerCard() {
  const { language } = useApp();
  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';
  const tr = (hi, mr, en) => isMarathi ? (mr || hi) : (isHindi ? hi : en);

  const [availableDates, setAvailableDates] = useState([getTodayStr()]);
  const [selectedDate, setSelectedDate] = useState(getTodayStr());
  const [dayData, setDayData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch list of dates with recorded data
  const fetchDates = useCallback(async () => {
    try {
      const res = await api.getHistoryDates();
      if (res?.dates && res.dates.length > 0) {
        setAvailableDates(res.dates);
        if (!res.dates.includes(selectedDate)) {
          setSelectedDate(res.dates[0]);
        }
      }
    } catch (err) {
      console.warn('History dates fetch error:', err.message);
    }
  }, [selectedDate]);

  // Fetch full aggregated history for selected date
  const fetchDayHistory = useCallback(async (date) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getDayHistory(date);
      setDayData(res);
    } catch (err) {
      console.warn('Day history fetch error:', err.message);
      setError(tr('इतिहास लोड करने में त्रुटि।', 'इतिहास लोड करताना त्रुटी.', 'Could not load historical data.'));
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchDates();
  }, [fetchDates]);

  useEffect(() => {
    if (selectedDate) {
      fetchDayHistory(selectedDate);
    }
  }, [selectedDate, fetchDayHistory]);

  // Systematic Save of the day's complete state
  const handleSystematicSave = async () => {
    setIsSaving(true);
    try {
      await api.syncSystematicDailyHistory(selectedDate);
      setSaveMessage(tr(
        '✓ इस तारीख का संपूर्ण दैनिक इतिहास व्यवस्थित रूप से सुरक्षित हुआ!',
        '✓ या तारखेचा संपूर्ण दैनिक इतिहास व्यवस्थित सेव्ह झाला!',
        `✓ Systematic wellness history snapshot successfully saved for ${selectedDate}`
      ));
      await fetchDates();
      await fetchDayHistory(selectedDate);
      setTimeout(() => setSaveMessage(null), 4000);
    } catch (err) {
      setSaveMessage(tr('सहेजने में विफल', 'जतन अयशस्वी', 'Failed to save snapshot'));
      setTimeout(() => setSaveMessage(null), 2500);
    } finally {
      setIsSaving(false);
    }
  };

  const hasAnyData = dayData?.has_data;
  const foodCount = dayData?.food_records?.length || 0;
  const stepCount = dayData?.activity_steps?.step_count || 0;
  const stepKm = dayData?.activity_steps?.distance_km || '0.00';
  const healthLog = dayData?.health_log || dayData?.health_status;
  const needsProgress = dayData?.daily_needs?.progress_percent ?? null;
  const kickSessions = dayData?.kick_sessions || [];
  const totalKicks = kickSessions.reduce((acc, k) => acc + (k.kicks || 0), 0);
  const reportsCount = dayData?.medical_reports?.length || 0;

  return (
    <div className="w-full bg-white dark:bg-slate-800/90 p-5 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs text-left transition-all duration-300">
      
      {/* ── Compact Header ── */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-900 text-[#157F66] dark:text-teal-400 flex items-center justify-center shrink-0 shadow-2xs">
            <History className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm sm:text-base text-slate-800 dark:text-slate-100 leading-snug">
                {tr('तारीख-वार दैनिक स्वास्थ्य इतिहास', 'तारीखनिहाय दैनिक आरोग्य इतिहास', 'Date-Specific Daily Wellness History')}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold">
                {tr('व्यवस्थित रिकॉर्ड', 'व्यवस्थित नोंदी', 'Systematic Records')}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {tr('किसी भी तारीख के भोजन, स्वास्थ्य, कदम व चेकअप का व्यवस्थित रिकॉर्ड', 'कोणत्याही तारखेचे जेवण, आरोग्य, पावले व तपासणी तपासा', 'Systematic archive of meals, vitals, walking steps & checks')}
            </p>
          </div>
        </div>

        {/* Right Controls: Date Picker & Systematic Save Button */}
        <div className="flex items-center gap-2">
          {/* Systematic Save Button */}
          <button
            type="button"
            onClick={handleSystematicSave}
            disabled={isSaving}
            className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-extrabold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-2xs disabled:opacity-50"
            title={tr('इस तारीख का इतिहास व्यवस्थित रूप से सुरक्षित करें', 'इतिहास सेव्ह करा', 'Save / Sync Systematic History Snapshot')}
          >
            <Save className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{isSaving ? tr('सहेज रहा है...', 'जतन करत आहे...', 'Saving...') : tr('इतिहास सहेजें', 'इतिहास सेव्ह', 'Save History')}</span>
          </button>

          {/* Date Picker */}
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-750 p-1.5 px-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <Calendar className="w-3.5 h-3.5 text-[#157F66]" />
            <input 
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-xs font-extrabold text-slate-800 dark:text-slate-100 focus:outline-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Save Toast Banner */}
      {saveMessage && (
        <div className="mb-3 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Available Dates Quick-Pills (sorted newest first) */}
      {availableDates.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2.5 mb-3 scrollbar-none text-xs">
          <span className="text-[10px] font-bold text-slate-400 shrink-0 mr-1 uppercase">
            {tr('तारीखें:', 'तारखा:', 'Dates:')}
          </span>
          {availableDates.slice(0, 8).map(d => (
            <button
              key={d}
              onClick={() => setSelectedDate(d)}
              className={`py-1 px-2.5 rounded-xl font-bold text-xs shrink-0 border transition cursor-pointer ${
                selectedDate === d
                  ? 'bg-[#157F66] text-white border-[#157F66] shadow-2xs'
                  : 'bg-slate-50 dark:bg-slate-750 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-teal-300'
              }`}
            >
              {d === getTodayStr() ? tr('आज (Today)', 'आज (Today)', 'Today') : d}
            </button>
          ))}
        </div>
      )}

      {/* ── Content Area ── */}
      {loading ? (
        <div className="py-8 text-center text-xs text-slate-400">
          {tr('चयनित तारीख का इतिहास लोड हो रहा है...', 'निवडलेल्या तारखेचा इतिहास लोड होत आहे...', 'Loading date history...')}
        </div>
      ) : !hasAnyData ? (
        <div className="py-6 px-4 text-center border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50/50 dark:bg-slate-800/50 flex flex-col items-center justify-center">
          <Calendar className="w-7 h-7 text-slate-300 dark:text-slate-600 mb-1.5" />
          <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300">
            {tr(`तारीख ${selectedDate} के लिए कोई सुरक्षित रिकॉर्ड नहीं मिला`, `तारीख ${selectedDate} साठी कोणतीही नोंद सापडली नाही`, `No records saved for ${selectedDate}`)}
          </h4>
          <p className="text-[11px] text-slate-400 max-w-sm mt-0.5">
            {tr(
              'इस तारीख को भोजन, स्वास्थ्य प्रश्नावली या कदम दर्ज नहीं हैं। "इतिहास सहेजें" दबाकर आज की गतिविधि सुरक्षित कर सकती हैं।',
              'या तारखेला कोणतीही नोंद नाही. "इतिहास सेव्ह" वर क्लिक करून आजचा डेटा नोंदवू शकता.',
              'No food, checklist, health check-in or kick records exist for this date. You can save today\'s state using "Save History".'
            )}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {/* ── 1. Compact Summary Highlights Bar (Reduced Size Default View) ── */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-3 bg-slate-50 dark:bg-slate-750 rounded-2xl border border-slate-200/80 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200">
            {/* Meals */}
            <div className="flex items-center gap-2 p-1.5">
              <Utensils className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block font-bold leading-tight uppercase">
                  {tr('भोजन', 'जेवण', 'Meals')}
                </span>
                <span className="font-extrabold text-xs">
                  {foodCount > 0 ? `${foodCount} ${tr('आइटम', 'नोंदी', 'items')}` : '—'}
                </span>
              </div>
            </div>

            {/* Steps */}
            <div className="flex items-center gap-2 p-1.5">
              <Footprints className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block font-bold leading-tight uppercase">
                  {tr('कदम', 'पावले', 'Steps')}
                </span>
                <span className="font-extrabold text-xs">
                  {stepCount > 0 ? `${stepCount.toLocaleString()} (${stepKm} km)` : '—'}
                </span>
              </div>
            </div>

            {/* Health Vitals */}
            <div className="flex items-center gap-2 p-1.5">
              <HeartPulse className="w-4 h-4 text-teal-600 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block font-bold leading-tight uppercase">
                  {tr('स्वास्थ्य', 'आरोग्य', 'Health')}
                </span>
                <span className="font-extrabold text-xs capitalize truncate block max-w-[110px]">
                  {healthLog ? `${healthLog.feeling || 'Good'} • ${healthLog.water_glasses || 0}💧` : '—'}
                </span>
              </div>
            </div>

            {/* Daily Needs */}
            <div className="flex items-center gap-2 p-1.5">
              <CheckSquare className="w-4 h-4 text-indigo-600 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block font-bold leading-tight uppercase">
                  {tr('चेकलिस्ट', 'चेकलिस्ट', 'Checklist')}
                </span>
                <span className="font-extrabold text-xs">
                  {needsProgress !== null ? `${needsProgress}% done` : '—'}
                </span>
              </div>
            </div>

            {/* Baby Kicks / Reports */}
            <div className="flex items-center gap-2 p-1.5 col-span-2 sm:col-span-1">
              <Activity className="w-4 h-4 text-rose-500 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block font-bold leading-tight uppercase">
                  {tr('किक / रिपोर्ट', 'किक / अहवाल', 'Kicks / Docs')}
                </span>
                <span className="font-extrabold text-xs">
                  {totalKicks > 0 ? `${totalKicks} kicks` : (reportsCount > 0 ? `${reportsCount} docs` : '—')}
                </span>
              </div>
            </div>
          </div>

          {/* ── 2. Read More / Show Less Toggle Bar ── */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] font-semibold text-slate-400">
              {isExpanded 
                ? tr('विस्तृत इतिहास खुला है', 'तपशीलवार इतिहास दृश्य', 'Detailed breakdown shown') 
                : tr('संक्षिप्त दृश्य सक्रिय है', 'संक्षिप्त दृश्य', 'Compact view active')}
            </span>

            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="py-1.5 px-3.5 rounded-xl bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/60 text-[#157F66] dark:text-teal-300 font-extrabold text-xs flex items-center gap-1.5 transition cursor-pointer border border-teal-200 dark:border-teal-800"
            >
              <span>
                {isExpanded 
                  ? tr('कम देखें (Show Less)', 'कमी पहा (Show Less)', 'Show Less') 
                  : tr('विस्तार से देखें (Read More)', 'सविस्तर पहा (Read More)', 'Read More Details')}
              </span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* ── 3. Expandable Detailed Breakdown (Revealed when Read More is clicked) ── */}
          {isExpanded && (
            <div className="pt-2 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                
                {/* Card 1: Food & Meals */}
                <div className="p-3.5 bg-slate-50/80 dark:bg-slate-750 rounded-2xl border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-slate-200/60 dark:border-slate-700">
                      <Utensils className="w-4 h-4 text-emerald-600" />
                      <h5 className="font-bold text-xs text-slate-800 dark:text-slate-100">
                        {tr('आहार व भोजन रिकॉर्ड', 'आहार व जेवण नोंदी', 'Logged Meals & Snacks')}
                      </h5>
                    </div>
                    {dayData.food_records && dayData.food_records.length > 0 ? (
                      <ul className="space-y-1.5 text-xs">
                        {dayData.food_records.map(f => (
                          <li key={f.id} className="flex items-start justify-between gap-2 p-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-150 dark:border-slate-700">
                            <div>
                              <span className="font-semibold text-slate-700 dark:text-slate-200 block text-xs">
                                {f.food_name}
                              </span>
                              <span className="text-[10px] text-slate-400 capitalize">
                                {f.meal_type} {f.portion ? `• ${f.portion}` : ''} {f.meal_time ? `• ${f.meal_time}` : ''}
                              </span>
                            </div>
                            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                              f.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                            }`}>
                              {f.completed ? '✓' : 'Pending'}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-slate-400 italic py-2">
                        {tr('कोई भोजन दर्ज नहीं', 'अन्न नोंद नाही', 'No meals logged')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Card 2: Health Status Questionnaire */}
                <div className="p-3.5 bg-slate-50/80 dark:bg-slate-750 rounded-2xl border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-slate-200/60 dark:border-slate-700">
                      <HeartPulse className="w-4 h-4 text-teal-600" />
                      <h5 className="font-bold text-xs text-slate-800 dark:text-slate-100">
                        {tr('स्वास्थ्य प्रश्नावली', 'आरोग्य प्रश्नावली', 'Daily Health Status')}
                      </h5>
                    </div>
                    {healthLog ? (
                      <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                        <div className="flex justify-between">
                          <span className="text-slate-400">{tr('स्थिति:', 'स्थिती:', 'Feeling:')}</span>
                          <strong className="capitalize">{healthLog.feeling || 'Good'}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">{tr('नींद:', 'झोप:', 'Sleep:')}</span>
                          <strong className="capitalize">{healthLog.sleep_quality || 'Normal'}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">{tr('जल सेवन:', 'पाणी:', 'Water:')}</span>
                          <strong className="text-blue-600">{healthLog.water_glasses || 0} glasses</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">{tr('दवाएं:', 'औषधे:', 'Meds:')}</span>
                          <strong className="capitalize text-emerald-600">{healthLog.medicines_taken || 'Yes'}</strong>
                        </div>
                        {healthLog.symptoms && healthLog.symptoms.length > 0 && (
                          <div className="pt-1">
                            <span className="text-slate-400 text-[10px] block">{tr('लक्षण:', 'लक्षणे:', 'Symptoms:')}</span>
                            <div className="flex flex-wrap gap-1 mt-0.5">
                              {healthLog.symptoms.map(s => (
                                <span key={s} className="px-1.5 py-0.2 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[9px] font-semibold">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic py-2">
                        {tr('कोई प्रश्नावली प्रतिक्रिया नहीं', 'प्रश्नावली नोंद नाही', 'No health check-in completed')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Card 3: Daily Needs Checklist */}
                <div className="p-3.5 bg-slate-50/80 dark:bg-slate-750 rounded-2xl border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-slate-200/60 dark:border-slate-700">
                      <CheckSquare className="w-4 h-4 text-indigo-600" />
                      <h5 className="font-bold text-xs text-slate-800 dark:text-slate-100">
                        {tr('अनिवार्य आवश्यकताएं', 'आवश्यक गरजा', 'Needs Checklist')}
                      </h5>
                    </div>
                    {dayData.daily_needs ? (
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">{tr('प्रगति:', 'प्रगती:', 'Progress:')}</span>
                          <span className="font-extrabold text-[#157F66] dark:text-teal-400">
                            {dayData.daily_needs.completed_count || 0} / {dayData.daily_needs.applicable_count || 0} ({dayData.daily_needs.progress_percent || 0}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-650 h-2 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${dayData.daily_needs.progress_percent || 0}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic py-2">
                        {tr('कोई चेकलिस्ट डेटा नहीं', 'चेकलिस्ट नोंद नाही', 'No checklist recorded')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Card 4: Walking Steps */}
                <div className="p-3.5 bg-slate-50/80 dark:bg-slate-750 rounded-2xl border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-slate-200/60 dark:border-slate-700">
                      <Footprints className="w-4 h-4 text-amber-600" />
                      <h5 className="font-bold text-xs text-slate-800 dark:text-slate-100">
                        {tr('पैदल चलना (कदम)', 'चालणे (पावले)', 'Walking Steps')}
                      </h5>
                    </div>
                    {stepCount > 0 ? (
                      <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                        <div className="flex justify-between">
                          <span className="text-slate-400">{tr('कदम:', 'पावले:', 'Steps:')}</span>
                          <strong className="text-sm text-amber-900 dark:text-amber-300">
                            {stepCount.toLocaleString()}
                          </strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">{tr('दूरी:', 'अंतर:', 'Distance:')}</span>
                          <span>~{stepKm} km</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">{tr('लक्ष्य:', 'ध्येय:', 'Goal:')}</span>
                          <span>{dayData.activity_steps?.step_goal || 4000}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic py-2">
                        {tr('कदम दर्ज नहीं किए गए', 'पावले नोंदवली नाहीत', 'No step records saved')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Card 5: Baby Kick Sessions */}
                <div className="p-3.5 bg-slate-50/80 dark:bg-slate-750 rounded-2xl border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-slate-200/60 dark:border-slate-700">
                      <Activity className="w-4 h-4 text-rose-500" />
                      <h5 className="font-bold text-xs text-slate-800 dark:text-slate-100">
                        {tr('शिशु हलचल (किक सत्र)', 'बाळाच्या हालचाली (किक सत्रे)', 'Baby Kick Counter')}
                      </h5>
                    </div>
                    {kickSessions.length > 0 ? (
                      <ul className="space-y-1.5 text-xs">
                        {kickSessions.map((k, idx) => (
                          <li key={k.id || idx} className="p-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/60 dark:border-slate-700">
                            <div className="flex justify-between font-bold text-slate-800 dark:text-slate-100">
                              <span>{k.kicks} {tr('किक्स', 'किक्स', 'kicks')}</span>
                              <span className="text-slate-400 font-normal">{k.duration_minutes || 10} min</span>
                            </div>
                            {k.notes && <p className="text-[10px] text-slate-500 mt-0.5">{k.notes}</p>}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-slate-400 italic py-2">
                        {tr('कोई किक सत्र दर्ज नहीं', 'कोणतेही किक सत्र नोंदवले नाही', 'No kick sessions recorded')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Card 6: Medical Reports & Checkups */}
                <div className="p-3.5 bg-slate-50/80 dark:bg-slate-750 rounded-2xl border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-slate-200/60 dark:border-slate-700">
                      <FileText className="w-4 h-4 text-purple-600" />
                      <h5 className="font-bold text-xs text-slate-800 dark:text-slate-100">
                        {tr('मेडिकल रिपोर्ट व क्लिनिक', 'वैद्यकीय अहवाल व तपासणी', 'Medical Reports & Checkups')}
                      </h5>
                    </div>
                    {dayData.medical_reports && dayData.medical_reports.length > 0 ? (
                      <ul className="space-y-1.5 text-xs">
                        {dayData.medical_reports.map((r, idx) => (
                          <li key={r.id || idx} className="p-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/60 dark:border-slate-700">
                            <span className="font-bold text-slate-800 dark:text-slate-100 block truncate">
                              📄 {r.file_name || r.title || 'Report'}
                            </span>
                            <span className="text-[10px] text-emerald-600 font-semibold">
                              {r.confirmed ? '✓ Confirmed' : 'Saved'}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-slate-400 italic py-2">
                        {tr('इस तारीख को कोई नई रिपोर्ट नहीं', 'या तारखेला कोणताही अहवाल नाही', 'No reports uploaded on this date')}
                      </p>
                    )}
                  </div>
                </div>

              </div>

              {/* Bottom Collapse Button */}
              <div className="pt-3 text-center">
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="py-1 px-3 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 mx-auto transition cursor-pointer"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                  <span>{tr('संक्षिप्त करें (Show Less)', 'कमी करा', 'Collapse Detailed View')}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
