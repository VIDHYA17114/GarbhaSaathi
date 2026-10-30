import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  Globe, 
  Calendar, 
  ShieldCheck, 
  Database, 
  Download, 
  Check, 
  Sparkles,
  Heart,
  Info,
  Sun,
  Moon,
  Monitor,
  LogOut
} from 'lucide-react';

export default function WebSettingsPage({ onLogout }) {
  const { user, setUser, language, setLanguage, t, theme, setTheme, isDarkMode, logout } = useApp();
  const handleLogoutAction = onLogout || logout;
  const [name, setName] = useState(user.name || "Priya Sharma");
  const [age, setAge] = useState(user.age || 24);
  const [phone, setPhone] = useState(user.phone || "+91 98765 43210");
  const [lmpDate, setLmpDate] = useState(user.lmpDate || "2025-03-15");
  const [eddDate, setEddDate] = useState(user.eddDate || "2025-12-20");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [exportMessage, setExportMessage] = useState('');

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';
  const tr = (hi, mr, en) => isMarathi ? (mr || hi) : (isHindi ? hi : en);

  const handleLmpChange = (val) => {
    setLmpDate(val);
    try {
      const d = new Date(val);
      if (!isNaN(d.getTime())) {
        d.setDate(d.getDate() + 280);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        setEddDate(`${yyyy}-${mm}-${dd}`);
      }
    } catch (e) { /* ignore */ }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name,
      age: parseInt(age) || 24,
      phone,
      lmpDate,
      eddDate
    }));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify({ user, exportDate: new Date().toISOString() }, null, 2)
    );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `GarbhaSaathi_Backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setExportMessage(tr("डेटा सफलतापूर्वक डाउनलोड किया गया!", "डेटा यशस्वीरित्या डाउनलोड झाला!", "Backup downloaded successfully!"));
    setTimeout(() => setExportMessage(''), 3000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-in fade-in duration-300 text-left">
      
      {/* Top Page Header */}
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 transition-colors duration-200">
        <div>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full uppercase tracking-wider">
            {tr("खाता व प्राथमिकताएं", "खाते आणि प्राधान्ये", "Account & App Preferences")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">
            {t.privacySettings}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 max-w-2xl leading-relaxed">
            {tr(
              "अपनी व्यक्तिगत जानकारी, गर्भावस्था तारीखें, थीम (Dark Mode) और भाषा सेटिंग्स प्रबंधित करें।",
              "आपली वैयक्तिक माहिती, गरोदरपणाच्या तारखा, थीम (Dark Mode) आणि भाषा सेटिंग्ज व्यवस्थापित करा.",
              "Manage personal profile, pregnancy dates, dark mode appearance, and language preferences."
            )}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{tr("प्रोफाइल सुरक्षित हो गई!", "प्रोफाइल सेव्ह झाली!", "Settings saved successfully!")}</span>
            </div>
          )}

          <button
            onClick={handleLogoutAction}
            className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 rounded-2xl text-xs font-black transition flex items-center gap-2 shadow-2xs cursor-pointer"
            title="Log Out of your account"
          >
            <LogOut className="w-4 h-4" />
            <span>{tr("लॉगआउट", "लॉगआउट", "Log Out")}</span>
          </button>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Profile & Pregnancy Dates Form */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs transition-colors duration-200">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-[#157F66] dark:text-teal-400" />
            <span>{tr("व्यक्तिगत व गर्भावस्था विवरण", "वैयक्तिक आणि गर्भधारणा तपशील", "Personal & Pregnancy Dates")}</span>
          </h3>

          <form onSubmit={handleSaveProfile} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">{t.fullName}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 rounded-2xl text-xs text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#157F66] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">{t.age}</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 rounded-2xl text-xs text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#157F66] outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">{t.mobileNumber}</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 rounded-2xl text-xs text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#157F66] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">{t.preferredLanguage}</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 rounded-2xl text-xs font-bold text-[#157F66] dark:text-teal-400 focus:ring-2 focus:ring-[#157F66] outline-none"
                >
                  <option value="hi">हिंदी (Hindi)</option>
                  <option value="mr">मराठी (Marathi)</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>

            {/* LMP and EDD */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t.lmp}
                </label>
                <input
                  type="date"
                  value={lmpDate}
                  onChange={(e) => handleLmpChange(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 rounded-2xl text-xs text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#157F66] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t.eddAuto}
                </label>
                <input
                  type="date"
                  value={eddDate}
                  onChange={(e) => setEddDate(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 rounded-2xl text-xs text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#157F66] outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="py-3.5 px-8 bg-[#157F66] hover:bg-[#0e5947] text-white rounded-2xl font-bold text-xs shadow-md shadow-teal-700/20 transition active:scale-98 cursor-pointer"
            >
              {tr("परिवर्तन सुरक्षित करें", "बदल सेव्ह करा", "Save Changes")}
            </button>
          </form>
        </div>

        {/* Right Column: Theme Settings, Data Export & Privacy Info */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Theme & Display Mode */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs transition-colors duration-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#157F66] dark:text-teal-400" />
                <span>{tr('थीम व डिस्प्ले', 'थीम आणि डिस्प्ले', 'Theme & Appearance')}</span>
              </h4>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700">
                {isDarkMode ? tr('🌙 डार्क', '🌙 डार्क', '🌙 Dark') : tr('☀️ लाइट', '☀️ लाइट', '☀️ Light')}
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              {tr(
                'अपनी सुविधानुसार लाइट या सुखद डार्क मोड चुनें। सिस्टम विकल्प आपके फोन/कंप्यूटर के मोड का पालन करेगा।',
                'आपल्या सोयीनुसार लाइट किंवा सुखद डार्क मोड निवडा. सिस्टम पर्याय आपल्या फोन/संगणकाच्या मोडनुसार काम करेल.',
                'Choose Light or healthcare Dark Mode. System Default follows your device preference.'
              )}
            </p>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'light', icon: Sun, labelEn: 'Light', labelHi: 'लाइट', labelMr: 'लाइट', desc: 'Day' },
                { id: 'dark', icon: Moon, labelEn: 'Dark', labelHi: 'डार्क', labelMr: 'डार्क', desc: 'Night' },
                { id: 'system', icon: Monitor, labelEn: 'System', labelHi: 'सिस्टम', labelMr: 'सिस्टम', desc: 'Auto' },
              ].map((opt) => {
                const Icon = opt.icon;
                const isSelected = theme === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTheme(opt.id)}
                    className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1 transition border cursor-pointer ${
                      isSelected
                        ? 'bg-teal-50 dark:bg-teal-950/60 border-[#157F66] dark:border-teal-400 text-[#157F66] dark:text-teal-300 font-black shadow-xs ring-1 ring-[#157F66]'
                        : 'bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-bold">{tr(opt.labelHi, opt.labelMr, opt.labelEn)}</span>
                    <span className="text-[9px] text-slate-400 dark:text-slate-400 font-semibold">{opt.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Data Export Box */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs transition-colors duration-200">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
              <Database className="w-4 h-4 text-[#157F66] dark:text-teal-400" />
              <span>{t.dataManagement}</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              {tr(
                "अपनी संपूर्ण दैनिक चेक-इन, किक सत्र, रिपोर्ट्स व रिमाइंडर जानकारी को बैकअप के रूप में डाउनलोड करें।",
                "आपल्या संपूर्ण दैनंदिन नोंदी, किक सेशन्स, रिपोर्ट्स आणि स्मरणपत्रांचा बॅकअप म्हणून डेटा डाउनलोड करा.",
                "Export your complete timeline, kick count sessions, and reminders as a JSON backup file."
              )}
            </p>

            <button
              onClick={handleExportData}
              className="w-full py-3 bg-slate-50 dark:bg-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-[#157F66] dark:text-teal-400" />
              <span>{tr("डेटा बैकअप डाउनलोड करें", "डेटा बॅकअप डाउनलोड करा", "Download Data Backup (JSON)")}</span>
            </button>

            {exportMessage && (
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-2 text-center">{exportMessage}</p>
            )}
          </div>

          {/* Privacy Guarantee */}
          <div className="bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900 rounded-3xl p-6 text-teal-950 dark:text-teal-200 text-xs leading-relaxed space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-[#157F66] dark:text-teal-400">
              <ShieldCheck className="w-5 h-5" />
              <span>{tr("डेटा सुरक्षा प्रतिज्ञा", "डेटा सुरक्षा हमी", "Privacy & Safety Guarantee")}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              {tr(
                "आपका स्वास्थ्य डेटा पूर्णतः निजी है। गर्भसाथी किसी भी तृतीय-पक्ष विज्ञापनदाता के साथ आपका डेटा साझा नहीं करता।",
                "आपला आरोग्य डेटा पूर्णपणे खाजगी आहे. गर्भसाथी कोणत्याही जाहिरातदारांसोबत आपला डेटा सामायिक करत नाही.",
                "Your personal and maternal health details remain under your sole control with zero third-party monetization."
              )}
            </p>
          </div>

          {/* Account Session & Log Out Card */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-rose-200 dark:border-rose-900/60 shadow-xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-rose-700 dark:text-rose-400">
              <LogOut className="w-4 h-4" />
              <span>{tr("सत्र व लॉगआउट", "सत्र आणि लॉगआउट", "Account Session & Log Out")}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {tr(
                "अपने खाते से सुरक्षित रूप से लॉगआउट करें। आपका डेटा सुरक्षित रूप से सहेजा गया है।",
                "आपल्या खात्यातून सुरक्षितपणे लॉगआउट करा. आपला सर्व डेटा सुरक्षितपणे सेव्ह आहे.",
                "Sign out of your active session on this device. Your pregnancy data remains safely saved."
              )}
            </p>
            <button
              type="button"
              onClick={handleLogoutAction}
              className="w-full py-3 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/70 border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 rounded-2xl text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <LogOut className="w-4 h-4" />
              <span>{tr("खाते से लॉगआउट करें", "खात्यातून लॉगआउट करा", "Log Out of GarbhaSaathi")}</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
