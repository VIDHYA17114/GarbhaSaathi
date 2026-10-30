import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  Upload, 
  Clock, 
  Pill, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Trash2,
  Calendar,
  ShieldCheck,
  ChevronRight,
  Bell,
  BellRing,
  RotateCcw,
  Check,
  Smartphone,
  Volume2,
  AlertTriangle,
  X
} from 'lucide-react';
import { 
  getTabletAdherenceStatus, 
  requestNotificationPermission, 
  getNotificationPermission,
  testOnTimeReminderAlert,
  testMissedDoseAlert
} from '../../utils/tabletNotificationService';

function getTodayStr() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function WebHealthRecordsPage() {
  const { 
    setActiveModal, 
    reports, 
    reminders, 
    toggleReminder, 
    addReminder,
    tabletAdherence,
    markTabletTaken,
    unmarkTabletTaken,
    phoneAlertsEnabled,
    setPhoneAlertsEnabled,
    language, 
    t 
  } = useApp();

  const [activeTab, setActiveTab] = useState('all');
  const [showAddTabletModal, setShowAddTabletModal] = useState(false);
  const [newTabletTitle, setNewTabletTitle] = useState('');
  const [newTabletDosage, setNewTabletDosage] = useState('1 tablet after lunch');
  const [newTabletTime, setNewTabletTime] = useState('02:00 PM');
  const [testAlertMessage, setTestAlertMessage] = useState(null);

  const fileInputRef = useRef(null);

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';
  const tr = (hi, mr, en) => isMarathi ? (mr || hi) : (isHindi ? hi : en);

  const todayStr = getTodayStr();
  const todayAdherence = tabletAdherence[todayStr] || {};

  // Tablet statistics
  const medicineReminders = reminders.filter(r => r.category === 'medicine');
  const totalTablets = medicineReminders.length;
  const takenTablets = medicineReminders.filter(r => todayAdherence[r.id]?.status === 'taken').length;
  
  // Calculate missed: past time by 15 mins and not taken
  const missedTablets = medicineReminders.filter(r => {
    const statusObj = getTabletAdherenceStatus(r, todayAdherence[r.id]);
    return statusObj.status === 'missed';
  }).length;

  const pendingTablets = Math.max(0, totalTablets - takenTablets);
  const adherenceRate = totalTablets > 0 ? Math.round((takenTablets / totalTablets) * 100) : 0;

  // Handle request for notification permission
  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      setPhoneAlertsEnabled(true);
      setTestAlertMessage(tr('फोन अलर्ट सफलतापूर्वक सक्रिय किए गए!', 'फोन अलर्ट यशस्वीरीत्या सुरू केले!', 'Phone alerts successfully enabled!'));
      setTimeout(() => setTestAlertMessage(null), 3000);
    } else {
      alert(tr(
        'ब्राउज़र सेटिंग्स में सूचनाओं (Notifications) की अनुमति दें ताकि फोन पर अलर्ट प्राप्त हो सकें।',
        'फोनवर अलर्ट मिळवण्यासाठी ब्राउझर सेटिंग्जमध्ये नोटिफिकेशन्स सुरू करा.',
        'Please allow notifications in browser settings to receive phone alerts even when portal is closed.'
      ));
    }
  };

  const handleTestOnTime = async () => {
    const firstMed = medicineReminders[0]?.title || 'Iron & Folic Acid Tablet';
    const firstTime = medicineReminders[0]?.time || '02:00 PM';
    await testOnTimeReminderAlert(firstMed, firstTime);
    setTestAlertMessage(tr('समय पर दवा अलर्ट फोन पर भेजा गया!', 'वेळेवर औषध अलर्ट फोनवर पाठवला!', 'On-time tablet reminder sent to your phone!'));
    setTimeout(() => setTestAlertMessage(null), 3500);
  };

  const handleTestMissed = async () => {
    const firstMed = medicineReminders[0]?.title || 'Iron & Folic Acid Tablet';
    const firstTime = medicineReminders[0]?.time || '02:00 PM';
    await testMissedDoseAlert(firstMed, firstTime);
    setTestAlertMessage(tr('छूटी हुई दवा (Missed Dose) अलर्ट भेजा गया!', 'चुकलेले औषध (Missed Dose) अलर्ट पाठवला!', 'Missed dose alert sent to your phone!'));
    setTimeout(() => setTestAlertMessage(null), 3500);
  };

  const handleAddTabletSubmit = (e) => {
    e.preventDefault();
    if (!newTabletTitle.trim()) return;

    addReminder({
      id: `rem-med-${Date.now()}`,
      title: newTabletTitle.trim(),
      titleHi: newTabletTitle.trim(),
      titleMr: newTabletTitle.trim(),
      detail: newTabletDosage.trim(),
      detailHi: newTabletDosage.trim(),
      detailMr: newTabletDosage.trim(),
      time: newTabletTime,
      isActive: true,
      category: 'medicine'
    });

    setNewTabletTitle('');
    setShowAddTabletModal(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-in fade-in duration-300 text-left">
      
      {/* Hidden File Picker for Direct Device Upload */}
      <input 
        type="file"
        ref={fileInputRef}
        accept="image/*,application/pdf,.pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setActiveModal('ocrModal');
          }
        }}
      />

      {/* Top Page Header */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
        <div>
          <span className="text-xs font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full uppercase tracking-wider border border-teal-200/60 dark:border-teal-900">
            {tr("निजी स्वास्थ्य रिकॉर्ड एवं दवा ट्रैकर", "वैयक्तिक आरोग्य नोंदी आणि औषध ट्रॅकर", "Health Records & Tablet Reminders")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">
            {t.healthRecords} & {t.reminders}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 max-w-2xl leading-relaxed">
            {tr(
              "सोनोग्राफी, लैब रिपोर्ट व डॉक्टर की पर्चियों को सुरक्षित अपलोड करें। फोन अलर्ट द्वारा सुनिश्चित करें कि कोई भी गोली छूटे नहीं।",
              "सोनोग्राफी, लॅब अहवाल सुरक्षित अपलोड करा. फोन अलर्टद्वारे कोणतीही गोळी चुकणार नाही याची खात्री करा.",
              "Securely upload medical scans and reports from your device. Track tablet adherence with on-time & missed-dose phone alerts."
            )}
          </p>
        </div>

        {/* Upload Button */}
        <button
          onClick={() => setActiveModal('ocrModal')}
          className="py-3.5 px-6 bg-[#157F66] hover:bg-[#0e5947] text-white rounded-2xl font-bold text-xs shadow-md shadow-teal-700/20 flex items-center gap-2 transition shrink-0 cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          <span>{tr("रिपोर्ट अपलोड करें (डिवाइस से)", "अहवाल अपलोड करा (डिव्हाइसमधून)", "Upload Report from Device")}</span>
        </button>
      </div>

      {/* Grid: Left Column Documents (6 cols) + Right Column Tablet Reminders (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Reports & Upload from Device */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Upload Dropzone Card (with Direct Device Access) */}
          <div
            onClick={() => setActiveModal('ocrModal')}
            className="border-2 border-dashed border-[#157F66]/40 dark:border-teal-700/50 bg-teal-50/30 dark:bg-teal-950/20 hover:bg-teal-50/60 dark:hover:bg-teal-950/40 rounded-3xl p-8 text-center flex flex-col items-center justify-center cursor-pointer transition group shadow-xs"
          >
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 text-[#157F66] dark:text-teal-400 shadow-sm flex items-center justify-center mb-3 group-hover:scale-105 transition">
              <Upload className="w-7 h-7" />
            </div>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
              {tr("डिवाइस से रिपोर्ट अपलोड करें", "डिव्हाइसमधून अहवाल अपलोड करा", "Upload Medical Records from Your Device")}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md">
              {tr(
                "अपने फोन की फाइल्स, डाउनलोड्स या कैमरे से CBC रक्त रिपोर्ट, सोनोग्राफी या पर्चा अपलोड करें।",
                "आपल्या फोनमधील फाइल्स किंवा कॅमेऱ्याने रक्त अहवाल, सोनोग्राफी किंवा प्रिस्क्रिप्शन अपलोड करा.",
                "Select PDF or photo from your phone files or camera. Smart OCR extracts doctor advice and dosage times."
              )}
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-slate-800 text-xs font-bold text-[#157F66] dark:text-teal-400 border border-teal-200 dark:border-teal-900 shadow-2xs">
              <Upload className="w-3.5 h-3.5" />
              <span>{tr("फ़ाइल चुनें या फोटो लें", "फाइल निवडा किंवा फोटो घ्या", "Choose File or Take Photo")}</span>
            </span>
          </div>

          {/* Recent Reports List */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                {t.recentReports} ({reports.length})
              </h3>
              <span className="text-[11px] text-slate-400">
                {tr("सुरक्षित व निजी", "सुरक्षित व खाजगी", "Private & Encrypted")}
              </span>
            </div>

            <div className="space-y-3">
              {reports.map((rep) => (
                <div
                  key={rep.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 dark:hover:border-slate-600 transition"
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center font-bold text-xs uppercase shrink-0 ${rep.badgeColor || 'bg-red-100 dark:bg-red-950/70 text-red-600 dark:text-red-300 border-red-200 dark:border-red-900/50'}`}>
                      {rep.type}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100">
                        {isMarathi ? (rep.fileNameMr || rep.fileNameHi || rep.fileName) : (isHindi ? (rep.fileNameHi || rep.fileName) : rep.fileName)}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {rep.extractedData?.testName || tr("चिकित्सा रिकॉर्ड", "वैद्यकीय नोंद", "Medical record")} • <span className="font-semibold text-slate-700 dark:text-slate-200">{rep.date}</span>
                        {rep.fileSize && <span className="ml-1 text-slate-400">({rep.fileSize})</span>}
                      </p>
                      {rep.extractedData?.findings && (
                        <p className="text-[11px] text-[#157F66] dark:text-teal-400 font-medium mt-1 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700 inline-block">
                          {rep.extractedData.findings}
                        </p>
                      )}
                    </div>
                  </div>

                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full self-start sm:self-center shrink-0 border border-emerald-100 dark:border-emerald-800">
                    {tr('सत्यापित', 'पडताळलेले', 'Verified')}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Tablet Adherence Tracker & Phone Alerts */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors space-y-5">
            
            {/* Header + Add Tablet Button */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                  <Pill className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                    {tr("दवा अनुपालन व रिमाइंडर", "औषध ट्रॅकर व स्मरणपत्रे", "Tablet Reminders & Intake Tracker")}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {tr("आज ली गई गोलियों का रिकॉर्ड व फोन अलर्ट", "आज घेतलेल्या गोळ्यांची नोंद व फोन अलर्ट", "Track if tablets are taken + background alerts")}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAddTabletModal(true)}
                className="py-1.5 px-3 bg-[#157F66] hover:bg-[#0e5947] text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-xs cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{tr('नई गोली जोड़ें', 'नवीन गोळी जोडा', 'Add Tablet')}</span>
              </button>
            </div>

            {/* Today's Tablet Adherence Summary Banner */}
            <div className="p-4 bg-gradient-to-r from-teal-50/70 via-emerald-50/50 to-rose-50/50 dark:from-slate-800 dark:to-slate-800/80 rounded-2xl border border-teal-200/80 dark:border-slate-700 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-100">
                  {tr("आज का गोली सेवन (Tablet Adherence)", "आजचे औषध सेवन", "Today's Tablet Status")}:
                </span>
                <span className="font-black text-[#157F66] dark:text-teal-400">
                  {takenTablets} / {totalTablets} {tr("ली गईं", "घेतल्या", "taken")} ({adherenceRate}%)
                </span>
              </div>

              <div className="w-full bg-slate-200/80 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#157F66] to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${adherenceRate}%` }}
                />
              </div>

              <div className="flex items-center gap-3 text-[11px] pt-1">
                <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{takenTablets} {tr("ली गईं", "घेतल्या", "Taken")}</span>
                </span>
                <span className="flex items-center gap-1 text-amber-700 dark:text-amber-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>{pendingTablets} {tr("बाकी", "शिल्लक", "Pending")}</span>
                </span>
                {missedTablets > 0 && (
                  <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    <span>{missedTablets} {tr("छूट गईं", "चुकल्या", "Missed")}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Background Phone Alerts Card (Dual-Condition Alerts) */}
            <div className="p-4 bg-indigo-50/60 dark:bg-indigo-950/30 rounded-2xl border border-indigo-200/70 dark:border-indigo-900/60 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs text-indigo-950 dark:text-indigo-200">
                      {tr("फोन बैकग्राउंड अलर्ट (पोर्टल बंद होने पर भी)", "फोन पार्श्वभूमी अलर्ट (पोर्टल बंद असतानाही)", "Phone Alerts (Even When Portal is Closed)")}
                    </h4>
                    <span className="text-[10px] text-indigo-700 dark:text-indigo-400">
                      {phoneAlertsEnabled
                        ? tr("सक्रिय: समय पर और छूटने पर अलर्ट भेजा जाएगा", "सक्रिय: वेळेवर आणि चुकल्यास अलर्ट पाठवला जाईल", "Active: Alerts on scheduled time & if missed")
                        : tr("अलर्ट बंद हैं", "अलर्ट बंद आहेत", "Alerts are currently paused")}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleEnableNotifications}
                  className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shrink-0 shadow-2xs"
                >
                  {tr("अलर्ट चालू करें", "सुरू करा", "Allow Alerts")}
                </button>
              </div>

              {/* Two Conditions Explanation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="p-2 bg-white dark:bg-slate-800 rounded-xl border border-indigo-100 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-indigo-700 dark:text-indigo-400 block mb-0.5">
                    ⏰ {tr("शर्त 1: समय पर अलर्ट", "अट १: वेळेवर स्मरण", "Condition 1: On-Time Reminder")}
                  </span>
                  <span>{tr("गोली का समय होते ही फोन पर घंटी और अलर्ट बजेगा।", "गोळीची वेळ होताच फोनवर रिंग व नोटिफिकेशन येईल.", "Alert arrives exactly at scheduled dose time.")}</span>
                </div>

                <div className="p-2 bg-white dark:bg-slate-800 rounded-xl border border-indigo-100 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-rose-600 dark:text-rose-400 block mb-0.5">
                    ⚠️ {tr("शर्त 2: छूटी हुई दवा अलर्ट", "अट २: चुकलेल्या गोळीचा अलर्ट", "Condition 2: Missed Dose Alert")}
                  </span>
                  <span>{tr("समय बीतने के 15 मिनट बाद भी गोली न लेने पर दोबारा अलर्ट आएगा।", "वेळ उलटून १५ मिनिटे झाल्यावर गोळी न घेतल्यास पुन्हा अलर्ट येईल.", "Follow-up alert fires if not marked taken.")}</span>
                </div>
              </div>

              {/* Instant Test Buttons */}
              <div className="flex items-center gap-2 pt-1 border-t border-indigo-100 dark:border-indigo-900/60">
                <span className="text-[10px] text-indigo-800 dark:text-indigo-400 font-semibold shrink-0">
                  {tr("फोन अलर्ट जांचें:", "अलर्ट तपासा:", "Test Phone Alert:")}
                </span>
                <button
                  type="button"
                  onClick={handleTestOnTime}
                  className="py-1 px-2.5 bg-white dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-slate-700 text-indigo-700 dark:text-indigo-300 rounded-lg border border-indigo-200 dark:border-slate-700 text-[11px] font-bold transition cursor-pointer"
                >
                  ⏰ {tr("समय पर अलर्ट", "वेळेवर", "Test On-Time")}
                </button>
                <button
                  type="button"
                  onClick={handleTestMissed}
                  className="py-1 px-2.5 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 text-rose-700 dark:text-rose-300 rounded-lg border border-rose-200 dark:border-rose-900 text-[11px] font-bold transition cursor-pointer"
                >
                  ⚠️ {tr("छूटी दवा अलर्ट", "चुकलेले", "Test Missed Dose")}
                </button>
              </div>

              {testAlertMessage && (
                <div className="p-2 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 text-xs text-emerald-800 dark:text-emerald-200 rounded-xl font-bold flex items-center gap-1.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{testAlertMessage}</span>
                </div>
              )}
            </div>

            {/* Individual Tablet Cards List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                {tr("आपकी निर्धारित दवाइयां व दैनिक स्थिति:", "आपली नियमित औषधे व आजची स्थिती:", "Scheduled Tablets & Intake Status:")}
              </h4>

              {medicineReminders.map((rem) => {
                const adherence = todayAdherence[rem.id];
                const statusObj = getTabletAdherenceStatus(rem, adherence);
                const isTaken = statusObj.status === 'taken';
                const isMissed = statusObj.status === 'missed';
                const isDue = statusObj.status === 'due';

                return (
                  <div
                    key={rem.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isTaken
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-900/60'
                        : isMissed
                        ? 'bg-rose-50/60 dark:bg-rose-950/30 border-rose-300 dark:border-rose-900/80 shadow-2xs'
                        : isDue
                        ? 'bg-teal-50/60 dark:bg-teal-950/30 border-teal-300 dark:border-teal-800'
                        : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200/80 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      
                      {/* Left: Tablet Info & Time */}
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                          isTaken 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : isMissed 
                            ? 'bg-rose-100 text-rose-700 animate-bounce' 
                            : 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
                        }`}>
                          <Pill className="w-5 h-5" />
                        </div>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100">
                              {isMarathi ? (rem.titleMr || rem.titleHi || rem.title) : (isHindi ? (rem.titleHi || rem.title) : rem.title)}
                            </h4>

                            {/* Status Badge */}
                            {isTaken ? (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                                <Check className="w-3 h-3 stroke-3" />
                                <span>{tr(`ली गई (${adherence?.takenAt || 'आज'})`, `घेतली (${adherence?.takenAt || 'आज'})`, `Taken at ${adherence?.takenAt || 'Today'}`)}</span>
                              </span>
                            ) : isMissed ? (
                              <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold animate-pulse flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                <span>{tr("समय बीत चुका है (छूट गई)", "वेळ उलटून गेली", "Missed Dose")}</span>
                              </span>
                            ) : isDue ? (
                              <span className="px-2 py-0.5 rounded-full bg-teal-600 text-white text-[10px] font-bold animate-pulse flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{tr("दवा का समय हो गया!", "औषधाची वेळ झाली!", "Due Now!")}</span>
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-semibold">
                                {tr("आगामी", "पुढील", "Scheduled")}
                              </span>
                            )}
                          </div>

                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {isMarathi ? (rem.detailMr || rem.detailHi || rem.detail) : (isHindi ? (rem.detailHi || rem.detail) : rem.detail)}
                          </p>
                          
                          <div className="flex items-center gap-3 text-xs mt-1">
                            <span className="font-bold text-[#157F66] dark:text-teal-400">
                              ⏰ {rem.time}
                            </span>
                            <span className="text-[10px] text-slate-400 flex items-center gap-1">
                              <BellRing className="w-3 h-3 text-indigo-500" />
                              <span>{tr("फोन अलर्ट सक्रिय", "फोन अलर्ट सुरू", "Phone Alerts Active")}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Mark as Taken / Undo Controls */}
                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        {isTaken ? (
                          <button
                            type="button"
                            onClick={() => unmarkTabletTaken(rem.id)}
                            className="py-1.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 flex items-center gap-1 transition"
                            title={tr("वापस लें", "मागे घ्या", "Undo Taken")}
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>{tr("बदलें", "बदला", "Undo")}</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => markTabletTaken(rem.id)}
                            className={`py-2 px-3.5 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition active:scale-95 cursor-pointer ${
                              isMissed
                                ? 'bg-rose-600 hover:bg-rose-700'
                                : 'bg-[#157F66] hover:bg-[#0e5947]'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{isMissed ? tr("अभी लें (+1)", "आता घ्या (+१)", "Take Now (+1)") : tr("गोली ले ली ✓", "गोळी घेतली ✓", "Mark as Taken")}</span>
                          </button>
                        )}

                        {/* Reminder active toggle */}
                        <button
                          type="button"
                          onClick={() => toggleReminder(rem.id)}
                          title={rem.isActive ? tr("रिमाइंडर सक्रिय", "रिमाइंडर सुरू", "Active") : tr("रिमाइंडर निष्क्रिय", "बंद", "Inactive")}
                          className={`w-10 h-5 rounded-full transition-colors relative p-0.5 focus:outline-none ${
                            rem.isActive ? 'bg-[#157F66]' : 'bg-slate-300 dark:bg-slate-700'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
                              rem.isActive ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Clinical Non-Prescription Safety Note */}
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-3xl p-5 text-amber-950 dark:text-amber-200 text-xs leading-relaxed flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p>
              {tr(
                "गर्भसाथी कभी भी स्वयं दवा नहीं बदलता। सभी रिमाइंडर केवल आपकी पर्ची से आपके द्वारा पुष्टि किए जाने पर ही सक्रिय होते हैं। दवा छूटने पर तुरंत डॉक्टर की सलाह लें।",
                "गर्भसाथी स्वतः कधीही औषधे बदलत नाही. सर्व स्मरणपत्रे केवळ आपल्या डॉक्टरांच्या सल्ल्यानुसार असतात.",
                "GarbhaSaathi does not prescribe medication or alter dosages. If you frequently miss doses, discuss an adjusted schedule with your doctor."
              )}
            </p>
          </div>

        </div>

      </div>

      {/* ── Add Custom Tablet Modal ── */}
      {showAddTabletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-[#157F66] dark:text-teal-400 flex items-center justify-center">
                  <Pill className="w-4 h-4" />
                </div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                  {tr("नई गोली रिमाइंडर जोड़ें", "नवीन औषध स्मरणपत्र जोडा", "Add Tablet Reminder")}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowAddTabletModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddTabletSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-200 block mb-1">
                  {tr("दवा का नाम", "औषधाचे नाव", "Tablet Name")} *
                </label>
                <input 
                  type="text"
                  required
                  placeholder={tr("उदा: आयरन व फोलिक एसिड (IFA)", "उदा: लोह आणि फॉलिक ॲसिड", "e.g., Folic Acid 5mg, Iron Tablet")}
                  value={newTabletTitle}
                  onChange={(e) => setNewTabletTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-200 block mb-1">
                  {tr("खुराक व निर्देश", "डोस व सूचना", "Dosage Instructions")}
                </label>
                <input 
                  type="text"
                  placeholder={tr("उदा: 1 गोली दोपहर के खाने के बाद", "उदा: १ गोळी दुपारच्या जेवणानंतर", "e.g., 1 tablet after lunch with water")}
                  value={newTabletDosage}
                  onChange={(e) => setNewTabletDosage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-200 block mb-1">
                  {tr("दवा का समय", "औषधाची वेळ", "Scheduled Dose Time")}
                </label>
                <input 
                  type="text"
                  placeholder="02:00 PM"
                  value={newTabletTime}
                  onChange={(e) => setNewTabletTime(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500 font-mono"
                />
              </div>

              <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200/60 dark:border-indigo-900/40 text-[11px] text-indigo-900 dark:text-indigo-300">
                <span>📱 {tr("इस गोली के लिए समय पर और छूटने पर दोनों फोन अलर्ट अपने आप सक्रिय रहेंगे।", "या गोळीसाठी वेळेवर व चुकल्यावर दोन्ही फोन अलर्ट आपोआप सुरू राहतील.", "Both on-time and missed-dose phone alerts will be active for this tablet.")}</span>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddTabletModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold"
                >
                  {tr("रद्द करें", "रद्द करा", "Cancel")}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#157F66] hover:bg-[#0e5947] text-white font-bold shadow-xs cursor-pointer"
                >
                  {tr("जोड़ें", "जोडा", "Add Reminder")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
