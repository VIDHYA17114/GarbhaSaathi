import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Phone, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Heart, 
  CheckCircle2,
  Globe
} from 'lucide-react';

export default function WebLoginPage({ onNavigateAuth, onLoginSuccess }) {
  const { language, setLanguage, user, setUser } = useApp();
  const [identifier, setIdentifier] = useState('9876543210');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!identifier.trim()) {
      setErrorMsg(isMarathi ? 'कृपया मोबाईल क्रमांक किंवा ईमेल प्रविष्ट करा' : (isHindi ? 'कृपया मोबाइल नंबर या ईमेल दर्ज करें' : 'Please enter your mobile number or email'));
      return;
    }

    if (!password || password.length < 4) {
      setErrorMsg(isMarathi ? 'पासवर्ड किमान ४ अक्षरांचा असावा' : (isHindi ? 'पासवर्ड कम से कम 4 अक्षरों का होना चाहिए' : 'Password must be at least 4 characters'));
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Authenticate and set user state
      const updatedUser = {
        ...user,
        phone: identifier.includes('@') ? user.phone : identifier,
        email: identifier.includes('@') ? identifier : user.email,
        isLoggedIn: true
      };

      setUser(updatedUser);
      localStorage.setItem('garbhasaathi_user', JSON.stringify(updatedUser));
      setIsLoading(false);

      if (onLoginSuccess) {
        onLoginSuccess();
      }
    }, 600);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      const demoUser = {
        name: 'Priya Sharma',
        age: 24,
        phone: '+91 98765 43210',
        email: 'priya.sharma@example.com',
        language: language || 'hi',
        stage: 'I am pregnant',
        lmpDate: '2025-03-15',
        eddDate: '2025-12-20',
        isLoggedIn: true
      };
      setUser(demoUser);
      localStorage.setItem('garbhasaathi_user', JSON.stringify(demoUser));
      setIsLoading(false);
      if (onLoginSuccess) onLoginSuccess();
    }, 400);
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
                onClick={() => setLanguage(item.code)}
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

      {/* Main Login Body */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-4xl bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 text-left">
          
          {/* Left Hero Card / Benefits Banner */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#157F66] to-[#0d5444] text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
            
            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-teal-100 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Safe Maternal Health Portal</span>
              </div>

              <h2 className="text-2xl font-black tracking-tight leading-snug">
                {isMarathi ? 'मातृत्वाच्या सुरक्षित प्रवासात पुन्हा स्वागत!' : (isHindi ? 'मातृत्व की सुरक्षित यात्रा में पुनः स्वागत!' : 'Welcome back to your safe pregnancy companion')}
              </h2>

              <p className="text-xs text-teal-100/90 leading-relaxed">
                {isMarathi 
                  ? 'तुमचा वैयक्तिक डॅशबोर्ड, औषधांचे स्मरण, आहार योजना आणि बाळाच्या किकची नोंद सुरू ठेवण्यासाठी लॉगिन करा.'
                  : (isHindi 
                      ? 'अपने व्यक्तिगत डैशबोर्ड, दवा रिमाइंडर, पोषण योजना और किक रिकॉर्ड को जारी रखने के लिए लॉगिन करें।'
                      : 'Access your personalized dashboard, tablet reminders, trimester nutrition, and baby development tracking.')}
              </p>

              {/* Mother newborn sketch card */}
              <div className="pt-2">
                <img
                  src="/mother_newborn_love.png"
                  alt="Mother and baby"
                  className="w-full h-36 object-contain rounded-2xl bg-white/10 p-2 backdrop-blur-xs"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-white/15 text-[11px] text-teal-200 flex items-center gap-2 relative z-10">
              <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>100% Private, Encrypted & Clinically Reviewed</span>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  {isMarathi ? 'लॉगिन करा' : (isHindi ? 'खाते में लॉगिन करें' : 'User Login')}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {isMarathi ? 'कृपया नोंदणीकृत मोबाईल किंवा ईमेल प्रविष्ट करा' : (isHindi ? 'कृपया पंजीकृत मोबाइल नंबर या ईमेल दर्ज करें' : 'Enter your registered mobile or email to continue')}
                </p>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold animate-in fade-in">
                  {errorMsg}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                
                {/* Identifier */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {isMarathi ? 'मोबाईल नंबर किंवा ईमेल' : (isHindi ? 'मोबाइल नंबर या ईमेल' : 'Mobile Number or Email')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="e.g. 9876543210 or priya@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#157F66] focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {isMarathi ? 'पासवर्ड' : (isHindi ? 'पासवर्ड' : 'Password')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#157F66] focus:border-transparent outline-none transition"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded text-[#157F66] focus:ring-[#157F66]"
                    />
                    <span>{isMarathi ? 'लक्षात ठेवा' : (isHindi ? 'मुझे याद रखें' : 'Remember me')}</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => alert(isMarathi ? 'पासवर्ड रीसेट लिंक तुमच्या मोबाईलवर पाठवली जाईल.' : 'पासवर्ड रीसेट लिंक आपके मोबाइल पर भेज दी जाएगी।')}
                    className="text-[#157F66] font-bold hover:underline"
                  >
                    {isMarathi ? 'पासवर्ड विसरलात?' : (isHindi ? 'पासवर्ड भूल गए?' : 'Forgot Password?')}
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#157F66] hover:bg-[#116752] text-white font-black text-sm shadow-md shadow-teal-800/20 flex items-center justify-center gap-2 transition cursor-pointer active:scale-98 disabled:opacity-70 mt-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{isMarathi ? 'डॅशबोर्डमध्ये जा' : (isHindi ? 'डैशबोर्ड में जाएं' : 'Login to Dashboard')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Demo Login Quick Access */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full py-2.5 px-4 rounded-2xl bg-teal-50 hover:bg-teal-100 text-[#157F66] border border-teal-200 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>1-Click Demo Login as Priya Sharma (Week 28)</span>
                </button>
              </div>
            </div>

            {/* Bottom Register Switcher */}
            <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500 font-medium">
              <span>{isMarathi ? 'नवीन वापरकर्ता आहात?' : (isHindi ? 'क्या आप नए उपयोगकर्ता हैं?' : 'New to GarbhaSaathi?')} </span>
              <button
                type="button"
                onClick={() => onNavigateAuth('register')}
                className="text-[#157F66] font-black hover:underline ml-1 cursor-pointer"
              >
                {isMarathi ? 'नवीन खाते तयार करा (Sign Up)' : (isHindi ? 'नया खाता बनाएं (साइन अप)' : 'Create Your Account')}
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

