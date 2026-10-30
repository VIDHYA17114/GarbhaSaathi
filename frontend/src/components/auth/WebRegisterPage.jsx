import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { getBestPregnancyProgress } from '../../utils/pregnancyCalculator';
import { 
  User, 
  Phone, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Calendar, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Heart, 
  CheckCircle2, 
  Baby, 
  Sprout
} from 'lucide-react';

export default function WebRegisterPage({ onNavigateAuth, onRegisterSuccess }) {
  const { language, setLanguage, user, setUser } = useApp();

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';

  const [formData, setFormData] = useState({
    name: 'Priya Sharma',
    phone: '9876543210',
    email: 'priya@example.com',
    password: 'password123',
    confirmPassword: 'password123',
    stage: 'I am pregnant', // 'I am pregnant' | 'planning' | 'postpartum'
    dateMode: 'lmp', // 'lmp' | 'edd'
    lmpDate: '2025-03-15',
    eddDate: '2025-12-20',
    language: language || 'hi',
    agreeTerms: true
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Dynamic preview of pregnancy progress based on entered dates
  const estimatedProgress = useMemo(() => {
    const lmp = formData.dateMode === 'lmp' ? formData.lmpDate : null;
    const edd = formData.dateMode === 'edd' ? formData.eddDate : null;
    return getBestPregnancyProgress(lmp, edd);
  }, [formData.dateMode, formData.lmpDate, formData.eddDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg(isMarathi ? 'कृपया तुमचे नाव प्रविष्ट करा' : (isHindi ? 'कृपया अपना पूरा नाम दर्ज करें' : 'Please enter your full name'));
      return;
    }

    if (!formData.phone.trim()) {
      setErrorMsg(isMarathi ? 'कृपया मोबाईल नंबर प्रविष्ट करा' : (isHindi ? 'कृपया मोबाइल नंबर दर्ज करें' : 'Please enter your mobile number'));
      return;
    }

    if (formData.password.length < 6) {
      setErrorMsg(isMarathi ? 'पासवर्ड किमान ६ अक्षरांचा असावा' : (isHindi ? 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए' : 'Password must be at least 6 characters'));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg(isMarathi ? 'पासवर्ड जुळत नाही' : (isHindi ? 'पासवर्ड मेल नहीं खाते' : 'Passwords do not match'));
      return;
    }

    if (!formData.agreeTerms) {
      setErrorMsg(isMarathi ? 'कृपया अटी व शर्ती मान्य करा' : (isHindi ? 'कृपया नियम और शर्तों को स्वीकार करें' : 'Please agree to the medical terms'));
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const newUser = {
        name: formData.name.trim(),
        age: 25,
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        language: formData.language,
        stage: formData.stage,
        lmpDate: formData.dateMode === 'lmp' ? formData.lmpDate : null,
        eddDate: formData.dateMode === 'edd' ? formData.eddDate : null,
        isLoggedIn: true
      };

      setUser(newUser);
      setLanguage(formData.language);
      localStorage.setItem('garbhasaathi_user', JSON.stringify(newUser));
      localStorage.setItem('garbhasaathi_lang', formData.language);

      setIsLoading(false);
      if (onRegisterSuccess) onRegisterSuccess();
    }, 700);
  };

  const fillQuickDemo = () => {
    setFormData({
      name: 'Priya Sharma',
      phone: '9876543210',
      email: 'priya.sharma@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      stage: 'I am pregnant',
      dateMode: 'lmp',
      lmpDate: '2025-03-15',
      eddDate: '2025-12-20',
      language: language || 'hi',
      agreeTerms: true
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-800 flex flex-col justify-between selection:bg-teal-100 selection:text-teal-900">
      
      {/* Top Header */}
      <header className="w-full bg-white/90 backdrop-blur-md border-b border-slate-100 py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <button
            onClick={() => onNavigateAuth('landing')}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#157F66] transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isMarathi ? 'मागे जा (होम)' : (isHindi ? 'वापस जाएं (होम)' : 'Back to Home')}</span>
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigateAuth('landing')}>
            <img src="/garbhasaathi_logo.png" alt="Logo" className="w-8 h-8 object-contain" />
            <span className="font-black text-base text-slate-800">
              <span className="text-[#157F66]">Garbha</span>
              <span className="text-[#F06565]">Saathi</span>
            </span>
          </div>

          {/* Language Switch */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
            {[
              { code: 'en', label: 'EN' },
              { code: 'hi', label: 'हिं' },
              { code: 'mr', label: 'म' }
            ].map(item => (
              <button
                key={item.code}
                onClick={() => {
                  setLanguage(item.code);
                  setFormData(prev => ({ ...prev, language: item.code }));
                }}
                className={`px-2 py-1 rounded-lg transition ${
                  language === item.code ? 'bg-[#157F66] text-white' : 'hover:bg-slate-100 text-slate-500'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Form Body */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-4xl bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 text-left">
          
          {/* Left Hero Sidebar */}
          <div className="md:col-span-4 bg-gradient-to-br from-[#157F66] to-[#0f5b4a] text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />

            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-teal-100 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Join GarbhaSaathi Family</span>
              </div>

              <h2 className="text-2xl font-black tracking-tight leading-snug">
                {isMarathi ? 'तुमच्या मातृत्वाच्या प्रवासात, नेहमी सोबत ♡' : (isHindi ? 'आपकी मातृत्व यात्रा में, हमेशा साथ ♡' : 'Start your healthy pregnancy journey today')}
              </h2>

              <p className="text-xs text-teal-100/90 leading-relaxed">
                {isMarathi
                  ? 'आहार, व्यायाम, किक काउंटर, डॉक्टरांच्या भेटींचे स्मरण आणि वैद्यकीय अहवाल सुरक्षित ठेवण्यासाठी आजच विनामूल्य खाते तयार करा.'
                  : (isHindi
                      ? 'आहार, व्यायाम, किक काउंटर, दवा रिमाइंडर और मेडिकल रिकॉर्ड्स सुरक्षित रखने के लिए आज ही निःशुल्क खाता बनाएं।'
                      : 'Create your account to unlock week-by-week fetal growth, clinical reminders, pelvic floor exercises, and secure medical records.')}
              </p>

              <div className="pt-2">
                <img
                  src="/landing_hero_mother.png"
                  alt="Pregnancy wellness illustration"
                  className="w-full h-44 object-contain rounded-2xl bg-white/10 p-2 backdrop-blur-xs"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/15 text-[11px] text-teal-200 space-y-1 relative z-10">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Confidential & Private</span>
              </div>
              <p className="text-[10px] text-teal-300/80">
                Data is never shared without your permission.
              </p>
            </div>
          </div>

          {/* Right Form Container */}
          <div className="md:col-span-8 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    {isMarathi ? 'नवीन खाते तयार करा' : (isHindi ? 'नया खाता बनाएं' : 'Create Your Account')}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isMarathi ? 'मातृत्व प्रवासासाठी वैयक्तिक माहिती भरा' : (isHindi ? 'अपनी गर्भावस्था के अनुसार जानकारी भरें' : 'Fill in your details to personalize your care')}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={fillQuickDemo}
                  className="px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#157F66] border border-teal-200 text-xs font-bold transition shrink-0 cursor-pointer"
                  title="Auto-fill with sample pregnancy profile"
                >
                  ⚡ Auto-Fill Demo
                </button>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold animate-in fade-in">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* 1. Name & Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isMarathi ? 'पूर्ण नाव' : (isHindi ? 'पूरा नाम' : 'Full Name')} *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Priya Sharma"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#157F66] outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isMarathi ? 'मोबाईल नंबर' : (isHindi ? 'मोबाइल नंबर' : 'Mobile Number')} *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="10-digit mobile number"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#157F66] outline-none transition"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Email Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isMarathi ? 'ईमेल पत्ता (पर्यायी)' : (isHindi ? 'ईमेल पता (वैकल्पिक)' : 'Email Address (Optional)')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="priya@example.com"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#157F66] outline-none transition"
                    />
                  </div>
                </div>

                {/* 3. Password & Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isMarathi ? 'पासवर्ड' : (isHindi ? 'पासवर्ड' : 'Password')} *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="At least 6 characters"
                        className="w-full pl-10 pr-10 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#157F66] outline-none transition"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isMarathi ? 'पासवर्डची पुष्टी करा' : (isHindi ? 'पासवर्ड की पुष्टि करें' : 'Confirm Password')} *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        placeholder="Re-type password"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#157F66] outline-none transition"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Pregnancy Due Date / LMP Calculation */}
                <div className="p-3.5 rounded-2xl bg-teal-50/60 border border-teal-100 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">
                      {isMarathi ? 'मासिक पाळी / प्रसूतीची तारीख:' : (isHindi ? 'अंतिम माहवारी / प्रसव तिथि:' : 'Calculate using:')}
                    </span>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-1 font-semibold text-slate-600 cursor-pointer">
                        <input
                          type="radio"
                          name="dateMode"
                          checked={formData.dateMode === 'lmp'}
                          onChange={() => setFormData({ ...formData, dateMode: 'lmp' })}
                          className="text-[#157F66] focus:ring-[#157F66]"
                        />
                        <span>LMP (माहवारी)</span>
                      </label>
                      <label className="flex items-center gap-1 font-semibold text-slate-600 cursor-pointer">
                        <input
                          type="radio"
                          name="dateMode"
                          checked={formData.dateMode === 'edd'}
                          onChange={() => setFormData({ ...formData, dateMode: 'edd' })}
                          className="text-[#157F66] focus:ring-[#157F66]"
                        />
                        <span>EDD (Due Date)</span>
                      </label>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      type="date"
                      value={formData.dateMode === 'lmp' ? formData.lmpDate : formData.eddDate}
                      onChange={(e) => {
                        if (formData.dateMode === 'lmp') {
                          setFormData({ ...formData, lmpDate: e.target.value });
                        } else {
                          setFormData({ ...formData, eddDate: e.target.value });
                        }
                      }}
                      className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-teal-200 bg-white text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-[#157F66]"
                      required
                    />
                  </div>

                  {/* Calculated Progress Preview Badge */}
                  {estimatedProgress && (
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-teal-200/80 text-xs">
                      <span className="font-bold text-[#157F66]">
                        ✨ {estimatedProgress.formattedText}
                      </span>
                      <span className="font-bold text-slate-600">
                        {estimatedProgress.trimesterLabels?.long || 'Trimester 1'}
                      </span>
                    </div>
                  )}
                </div>

                {/* 5. Medical Consent Checkbox */}
                <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-600 leading-snug pt-1">
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                    className="mt-0.5 rounded text-[#157F66] focus:ring-[#157F66]"
                    required
                  />
                  <span>
                    {isMarathi 
                      ? 'मी गर्भसाथीच्या आरोग्य व गोपनीयता अटी मान्य करते. मला समजले आहे की हे ॲप डॉक्टरांचा सल्ला बदलत नाही.'
                      : (isHindi 
                          ? 'मैं गर्भसाथी के नियमों और गोपनीयता नीति से सहमत हूँ। मैं समझती हूँ कि यह ऐप डॉक्टर के विकल्प के रूप में नहीं है।'
                          : 'I agree to the Terms of Service & Privacy Policy, and understand that GarbhaSaathi is an educational & health companion, not a substitute for clinical medical care.')}
                  </span>
                </label>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#157F66] hover:bg-[#116752] text-white font-black text-sm shadow-md shadow-teal-800/20 flex items-center justify-center gap-2 transition cursor-pointer active:scale-98 disabled:opacity-70 mt-3"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{isMarathi ? 'माझे खाते तयार करा' : (isHindi ? 'खाता बनाएं एवं यात्रा शुरू करें' : 'Create Account & Start My Journey')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>
            </div>

            {/* Bottom Login Link */}
            <div className="mt-5 pt-3 border-t border-slate-100 text-center text-xs text-slate-500 font-medium">
              <span>{isMarathi ? 'आधीच खाते आहे?' : (isHindi ? 'पहले से खाता है?' : 'Already have an account?')} </span>
              <button
                type="button"
                onClick={() => onNavigateAuth('login')}
                className="text-[#157F66] font-black hover:underline ml-1 cursor-pointer"
              >
                {isMarathi ? 'येथे लॉगिन करा (Login)' : (isHindi ? 'यहाँ लॉगिन करें' : 'Sign in here')}
              </button>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-[11px] text-slate-400">
        © {new Date().getFullYear()} GarbhaSaathi • Safe & Clinically Monitored Pregnancy Care
      </footer>
    </div>
  );
}

