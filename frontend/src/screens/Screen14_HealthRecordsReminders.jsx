import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  Image, 
  Clock, 
  Pill, 
  Plus, 
  CheckCircle2, 
  ChevronRight,
  RotateCcw,
  BellRing,
  AlertTriangle,
  Smartphone,
  Check
} from 'lucide-react';
import { 
  getTabletAdherenceStatus, 
  requestNotificationPermission,
  testOnTimeReminderAlert,
  testMissedDoseAlert
} from '../utils/tabletNotificationService';

function getTodayStr() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function Screen14_HealthRecordsReminders() {
  const { 
    setCurrentScreen, 
    setActiveModal, 
    reports, 
    reminders, 
    toggleReminder, 
    tabletAdherence,
    markTabletTaken,
    unmarkTabletTaken,
    phoneAlertsEnabled,
    setPhoneAlertsEnabled,
    language, 
    t 
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState('uploads'); // 'uploads', 'history', 'reminders'
  const [alertNotice, setAlertNotice] = useState(null);
  const fileInputRef = useRef(null);

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';
  const tr = (hi, mr, en) => isMarathi ? (mr || hi) : (isHindi ? hi : en);

  const todayStr = getTodayStr();
  const todayAdherence = tabletAdherence[todayStr] || {};
  const medicineReminders = reminders.filter(r => r.category === 'medicine');
  const totalTablets = medicineReminders.length;
  const takenTablets = medicineReminders.filter(r => todayAdherence[r.id]?.status === 'taken').length;

  const handleEnableAlerts = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      setPhoneAlertsEnabled(true);
      setAlertNotice(tr('फोन अलर्ट सक्रिय!', 'फोन अलर्ट सुरू!', 'Phone alerts enabled!'));
      setTimeout(() => setAlertNotice(null), 3000);
    }
  };

  const handleTestAlert = async (isMissed = false) => {
    const medTitle = medicineReminders[0]?.title || 'Iron Tablet';
    const medTime = medicineReminders[0]?.time || '02:00 PM';
    if (isMissed) {
      await testMissedDoseAlert(medTitle, medTime);
      setAlertNotice(tr('छूटी दवा अलर्ट भेजा गया!', 'चुकलेले औषध अलर्ट!', 'Missed dose alert sent!'));
    } else {
      await testOnTimeReminderAlert(medTitle, medTime);
      setAlertNotice(tr('समय पर दवा अलर्ट भेजा गया!', 'वेळेवर औषध अलर्ट!', 'On-time alert sent!'));
    }
    setTimeout(() => setAlertNotice(null), 3000);
  };

  return (
    <div className="flex-1 flex flex-col p-4 bg-[#FAF9F5] text-left select-none overflow-y-auto no-scrollbar pb-6">
      
      {/* Hidden file input for device upload */}
      <input 
        type="file"
        ref={fileInputRef}
        accept="image/*,application/pdf,.pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={() => setActiveModal('ocrModal')}
      />

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
            {t.healthRecords} & {t.reminders}
          </h2>
        </div>

        {/* Subtabs: Uploads / History / Reminders */}
        <div className="grid grid-cols-3 gap-2 my-2">
          <button
            onClick={() => setActiveSubTab('uploads')}
            className={`py-1.5 rounded-full text-xs font-bold transition ${
              activeSubTab === 'uploads'
                ? 'bg-[#157F66] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            {tr("अपलोड", "अपलोड", "Uploads")}
          </button>
          <button
            onClick={() => setActiveSubTab('history')}
            className={`py-1.5 rounded-full text-xs font-bold transition ${
              activeSubTab === 'history'
                ? 'bg-[#157F66] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            {tr("रिकॉर्ड", "नोंदी", "History")}
          </button>
          <button
            onClick={() => setActiveSubTab('reminders')}
            className={`py-1.5 rounded-full text-xs font-bold transition ${
              activeSubTab === 'reminders'
                ? 'bg-[#157F66] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            {tr("दवा अलर्ट", "औषध अलर्ट", "Reminders")}
          </button>
        </div>

        {/* Upload Your Reports Box (Device Access) */}
        {(activeSubTab === 'uploads' || activeSubTab === 'history') && (
          <div className="mt-3">
            <h3 className="font-bold text-xs text-slate-800 mb-2">
              {t.uploadReports}
            </h3>

            {/* Dashed Dropzone */}
            <div
              onClick={() => setActiveModal('ocrModal')}
              className="border-2 border-dashed border-teal-300 bg-teal-50/40 rounded-3xl p-5 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-teal-50 transition group"
            >
              <div className="w-12 h-12 rounded-full bg-white text-[#157F66] shadow-sm flex items-center justify-center mb-2 group-hover:scale-105 transition">
                <Upload className="w-6 h-6" />
              </div>
              <span className="font-bold text-xs text-slate-800 block">
                {tr("डिवाइस या रिपोर्ट्स से अपलोड करें", "डिव्हाइस किंवा अहवालातून अपलोड करा", "Upload from Your Device / Reports")}
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5">
                {tr("PDF, फोटो या कैमरा से रिपोर्ट अपलोड करें। स्मार्ट OCR स्वतः दवा पढ़ेगा।", "PDF, फोटो किंवा कॅमेरा वापरून अहवाल अपलोड करा.", "Tap to select PDF or snap photo from phone")}
              </span>
            </div>
          </div>
        )}

        {/* Recent Reports List */}
        {(activeSubTab === 'uploads' || activeSubTab === 'history') && (
          <div className="mt-5">
            <h3 className="font-bold text-xs text-slate-800 mb-2">
              {t.recentReports} ({reports.length})
            </h3>

            <div className="space-y-2">
              {reports.map((rep) => (
                <div
                  key={rep.id}
                  className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold text-[10px] uppercase ${rep.badgeColor || 'bg-red-100 text-red-600 border-red-200'}`}>
                      {rep.type}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-800">
                        {isHindi ? (rep.fileNameHi || rep.fileName) : rep.fileName}
                      </h4>
                      <span className="text-[10px] text-slate-400">
                        {rep.date} {rep.fileSize ? `• ${rep.fileSize}` : ''}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {tr("सत्यापित", "पडताळलेले", "Verified")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tablet Adherence & Dual-Condition Phone Reminders */}
        {(activeSubTab === 'uploads' || activeSubTab === 'reminders') && (
          <div className="mt-5 space-y-3">
            
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs text-slate-800">
                {tr("आज का गोली सेवन व अलर्ट", "आजचे औषध सेवन व अलर्ट", "Tablet Adherence & Alerts")}
              </h3>
              <button
                onClick={() => setActiveModal('ocrModal')}
                className="text-[11px] font-bold text-[#157F66] flex items-center gap-1 hover:underline"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{tr("नया जोड़ें", "नवीन जोडा", "Add")}</span>
              </button>
            </div>

            {/* Adherence Summary Bar */}
            <div className="p-3 bg-white rounded-2xl border border-teal-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>{tr("दवा सेवन:", "औषध सेवन:", "Tablet Status:")}</span>
                <span className="text-[#157F66]">
                  {takenTablets} / {totalTablets} {tr("ली गईं", "घेतल्या", "taken")}
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#157F66] rounded-full transition-all duration-300"
                  style={{ width: `${totalTablets > 0 ? (takenTablets / totalTablets) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Background Phone Alerts Card */}
            <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-indigo-950">
                  <Smartphone className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{tr("फोन बैकग्राउंड अलर्ट", "फोन पार्श्वभूमी अलर्ट", "Phone Background Alerts")}</span>
                </div>
                <button
                  onClick={handleEnableAlerts}
                  className="px-2 py-0.5 bg-indigo-600 text-white rounded-lg text-[10px] font-bold"
                >
                  {phoneAlertsEnabled ? "✓ Active" : "Enable"}
                </button>
              </div>

              <div className="text-[10px] text-indigo-800 space-y-1">
                <p>⏰ <strong>{tr("समय पर अलर्ट", "वेळेवर", "On-Time")}:</strong> {tr("गोली के समय फोन बजेगा", "वेळेवर अलर्ट येईल", "Alerts right at dose time")}</p>
                <p>⚠️ <strong>{tr("छूटने पर अलर्ट", "चुकल्यास", "Missed Dose")}:</strong> {tr("15 मिनट बाद दोबारा अलर्ट", "१५ मिनिटांनी पुन्हा अलर्ट", "Follow-up after 15 mins if not taken")}</p>
              </div>

              <div className="flex items-center gap-2 pt-1 border-t border-indigo-100">
                <button
                  type="button"
                  onClick={() => handleTestAlert(false)}
                  className="flex-1 py-1 bg-white border border-indigo-200 rounded-lg text-[10px] font-bold text-indigo-700 text-center"
                >
                  ⏰ {tr("टेस्ट वेळेवर", "वेळेवर", "Test On-Time")}
                </button>
                <button
                  type="button"
                  onClick={() => handleTestAlert(true)}
                  className="flex-1 py-1 bg-rose-50 border border-rose-200 rounded-lg text-[10px] font-bold text-rose-700 text-center"
                >
                  ⚠️ {tr("टेस्ट मिस", "चुकलेले", "Test Missed")}
                </button>
              </div>

              {alertNotice && (
                <div className="p-1.5 bg-emerald-100 text-emerald-800 text-[10px] rounded-lg font-bold text-center">
                  {alertNotice}
                </div>
              )}
            </div>

            {/* Medicine Items List */}
            <div className="space-y-2">
              {medicineReminders.map((rem) => {
                const adherence = todayAdherence[rem.id];
                const statusObj = getTabletAdherenceStatus(rem, adherence);
                const isTaken = statusObj.status === 'taken';
                const isMissed = statusObj.status === 'missed';

                return (
                  <div
                    key={rem.id}
                    className={`p-3 rounded-2xl border transition-all ${
                      isTaken 
                        ? 'bg-emerald-50/60 border-emerald-200' 
                        : isMissed 
                        ? 'bg-rose-50 border-rose-300' 
                        : 'bg-white border-slate-200/80 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                          isTaken ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-50 text-rose-500'
                        }`}>
                          <Pill className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="font-bold text-xs text-slate-800">
                              {isHindi ? (rem.titleHi || rem.title) : rem.title}
                            </h4>
                            {isTaken && (
                              <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full">
                                ✓ {adherence?.takenAt || 'Taken'}
                              </span>
                            )}
                            {isMissed && (
                              <span className="text-[9px] font-bold bg-rose-500 text-white px-1.5 py-0.2 rounded-full animate-pulse">
                                ⚠️ Missed
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            {isHindi ? (rem.detailHi || rem.detail) : rem.detail} • <span className="font-bold text-[#157F66]">{rem.time}</span>
                          </p>
                        </div>
                      </div>

                      {/* Action Button: Mark Taken / Undo */}
                      <div>
                        {isTaken ? (
                          <button
                            onClick={() => unmarkTabletTaken(rem.id)}
                            className="p-1 px-2 border border-slate-200 rounded-lg text-[10px] text-slate-500 font-bold"
                          >
                            Undo
                          </button>
                        ) : (
                          <button
                            onClick={() => markTabletTaken(rem.id)}
                            className={`p-1 px-2.5 rounded-lg text-white text-[10px] font-bold shadow-2xs ${
                              isMissed ? 'bg-rose-600' : 'bg-[#157F66]'
                            }`}
                          >
                            {isMissed ? "Take Now" : "Mark Taken"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
