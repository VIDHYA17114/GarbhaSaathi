import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  UserCheck,
  Sprout,
  ArrowRight,
  Heart,
  Activity,
  Calendar,
  Footprints,
  FileText,
  Utensils,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Globe,
  Clock,
  Bell,
  Flower2,
  Baby,
  PhoneCall
} from 'lucide-react';

export default function WebLandingPage({ onNavigateAuth, onEnterPortal }) {
  const { language, setLanguage, user } = useApp();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';
  const isLoggedIn = Boolean(user?.isLoggedIn);

  // Dynamic copy for regional tagline
  const regionalTagline = isMarathi
    ? "तुमच्या मातृत्वाच्या प्रवासात, नेहमी सोबत ♡"
    : (isHindi ? "आपकी मातृत्व यात्रा में, हमेशा साथ ♡" : "With you, always, in your journey of motherhood ♡");

  const subDescription = isMarathi
    ? "वैयक्तिक काळजी, विश्वासार्ह माहिती आणि तुमच्या गरोदरपणाच्या प्रत्येक टप्प्यासाठी सोपी साधने."
    : (isHindi
      ? "व्यक्तिगत देखभाल, विश्वसनीय जानकारी और आपकी गर्भावस्था के प्रत्येक चरण के लिए आसान उपकरण।"
      : "Personalized care, trusted information and easy tools for every stage of your pregnancy.");

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-800 font-sans antialiased flex flex-col selection:bg-teal-100 selection:text-teal-900">

      {/* ── 1. Header / Navigation Bar ── */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">

          {/* Logo Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-amber-300 p-0.5 bg-amber-50/60 shadow-sm shrink-0 hover:scale-105 transition-transform duration-200">
              <img
                src="/garbhasaathi_logo.png"
                alt="GarbhaSaathi Official Seal"
                className="w-full h-full object-contain rounded-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="text-left">
              <div className="flex items-center text-xl font-black tracking-tight leading-none">
                <span className="text-[#157F66]">Garbha</span>
                <span className="text-[#F06565]">Saathi</span>
              </div>
              <p className="text-[10px] font-medium text-slate-500 tracking-tight mt-0.5">
                Your Companion in a Safe & Healthy Pregnancy
              </p>
            </div>
          </div>

          {/* Center Navigation Links (desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-semibold text-slate-600">
            <a href="#home" className="text-[#157F66] hover:text-[#116752] transition">Home</a>
            <a href="#about" className="hover:text-[#157F66] transition">About</a>
            <a href="#features" className="hover:text-[#157F66] transition">Features</a>
            <a href="#journey" className="hover:text-[#157F66] transition">Your Journey</a>
            <a href="#guidance" className="hover:text-[#157F66] transition">Expert Guidance</a>
            <a href="#resources" className="hover:text-[#157F66] transition">Resources</a>
            <a href="#contact" className="hover:text-[#157F66] transition">Contact</a>
          </nav>

          {/* Right Controls: Language Selector + Login + Sign Up */}
          <div className="flex items-center gap-2.5">

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:border-slate-300 text-xs font-bold text-slate-700 transition cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span>{language === 'mr' ? 'मराठी' : (language === 'hi' ? 'हिंदी' : 'English')}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150">
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'hi', label: 'हिंदी (Hindi)' },
                    { code: 'mr', label: 'मराठी (Marathi)' }
                  ].map(item => (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLanguage(item.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-bold transition flex items-center justify-between cursor-pointer ${language === item.code ? 'text-[#157F66] bg-teal-50' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                      <span>{item.label}</span>
                      {language === item.code && <CheckCircle2 className="w-3.5 h-3.5 text-[#157F66]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Login & Sign Up (shown only when not logged in) */}
            {!isLoggedIn && (
              <>
                <button
                  onClick={() => onNavigateAuth('login')}
                  className="px-4 sm:px-5 py-2 rounded-full border border-slate-300 hover:border-[#157F66] hover:text-[#157F66] text-slate-700 font-bold text-xs sm:text-sm transition bg-white shadow-2xs cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigateAuth('register')}
                  className="px-4 sm:px-5 py-2 rounded-full bg-[#F06565] hover:bg-rose-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-200 transition cursor-pointer"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── 2. Hero Section ── */}
      <section id="home" className="relative overflow-hidden pt-6 pb-12 sm:py-14 bg-gradient-to-b from-[#F2FAF7] via-[#FAF9F5] to-white">

        {/* Soft Background Accents */}
        <div className="absolute top-10 left-[-40px] w-64 h-64 bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-[-30px] w-80 h-80 bg-rose-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Column: Heading, Tagline, Badges, CTAs */}
            <div className="lg:col-span-5 text-left space-y-4 sm:space-y-5">

              <div>
                <h1 className="text-4xl sm:text-5xl font-black text-[#157F66] tracking-tight leading-none mb-1.5">
                  GarbhaSaathi
                </h1>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight leading-snug">
                  Your Companion in a Safe & Healthy Pregnancy
                </h2>
              </div>

              {/* Regional Emotional Tagline */}
              <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-rose-50 border border-rose-100 text-rose-700 font-bold text-xs sm:text-sm">
                <span>{regionalTagline}</span>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-lg">
                {subDescription}
              </p>

              {/* 3 Trust Badges */}
              <div className="flex items-center gap-3 sm:gap-5 border-y border-slate-200/80 py-3.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#157F66]" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 leading-tight">
                    Trusted<br />Health Information
                  </span>
                </div>

                <div className="w-px h-7 bg-slate-200" />

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0">
                    <UserCheck className="w-4 h-4 text-[#157F66]" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 leading-tight">
                    Personalized<br />Guidance
                  </span>
                </div>

                <div className="w-px h-7 bg-slate-200" />

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0">
                    <Sprout className="w-4 h-4 text-[#157F66]" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 leading-tight">
                    Simple &<br />Easy to Use
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={isLoggedIn ? onEnterPortal : () => onNavigateAuth('register')}
                  className="px-7 py-3 rounded-full bg-[#157F66] hover:bg-[#116752] text-white font-black text-sm shadow-md shadow-teal-700/20 flex items-center gap-2 transition cursor-pointer active:scale-95"
                >
                  <span>{isLoggedIn ? (isMarathi ? 'डॅशबोर्डमध्ये जा' : (isHindi ? 'डैशबोर्ड में जाएं' : 'Enter Dashboard')) : 'Get Started'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: EXACT Reference Image Hero Artwork */}
            <div className="lg:col-span-7 flex items-center justify-center relative">
              <div className="relative w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-white/40 backdrop-blur-xs hover:shadow-2xl transition duration-500">
                <img
                  src="/landing_hero_full_right.png"
                  alt="GarbhaSaathi Expectant Mother, App Dashboard and Newborn Love"
                  className="w-full h-auto object-contain rounded-3xl"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. Four Feature Highlights Row ── */}
      <section id="features" className="py-8 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Card 1: Baby's Growth */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition flex items-center gap-3.5 text-left">
              <img
                src="/landing_feat_baby.png"
                alt="Track Baby's Growth"
                className="w-13 h-13 rounded-full object-contain shrink-0 shadow-xs"
              />
              <div>
                <h3 className="text-sm font-black text-slate-800 tracking-tight">Track Your Baby's Growth</h3>
                <p className="text-xs text-slate-500 mt-0.5">Week-by-week development information</p>
              </div>
            </div>

            {/* Card 2: Daily Health Check-in */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition flex items-center gap-3.5 text-left">
              <img
                src="/landing_feat_feet.png"
                alt="Monitor Daily Health"
                className="w-13 h-13 rounded-full object-contain shrink-0 shadow-xs"
              />
              <div>
                <h3 className="text-sm font-black text-slate-800 tracking-tight">Monitor Daily Health</h3>
                <p className="text-xs text-slate-500 mt-0.5">Track symptoms, mood, water intake and more</p>
              </div>
            </div>

            {/* Card 3: Active & Nourished */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition flex items-center gap-3.5 text-left">
              <img
                src="/landing_feat_food.png"
                alt="Stay Active & Nourished"
                className="w-13 h-13 rounded-full object-contain shrink-0 shadow-xs"
              />
              <div>
                <h3 className="text-sm font-black text-slate-800 tracking-tight">Stay Active & Nourished</h3>
                <p className="text-xs text-slate-500 mt-0.5">Food tracking, walking steps and yoga guidance</p>
              </div>
            </div>

            {/* Card 4: Medical Records Safe */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition flex items-center gap-3.5 text-left">
              <img
                src="/landing_feat_report.png"
                alt="Keep Your Records Safe"
                className="w-13 h-13 rounded-full object-contain shrink-0 shadow-xs"
              />
              <div>
                <h3 className="text-sm font-black text-slate-800 tracking-tight">Keep Your Records Safe</h3>
                <p className="text-xs text-slate-500 mt-0.5">Upload and manage your medical reports easily</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. Why Choose GarbhaSaathi? ── */}
      <section id="about" className="py-12 sm:py-16 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">

          <div className="inline-block mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why Choose GarbhaSaathi?
            </h2>
            <div className="w-16 h-1 bg-[#157F66] rounded-full mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">

            {/* 1: Reliable & Simple */}
            <div className="p-5 rounded-3xl bg-rose-50/60 border border-rose-100 shadow-2xs hover:shadow-md transition text-left flex items-start gap-4">
              <img
                src="/landing_why_guidance.png"
                alt="Reliable guidance"
                className="w-14 h-14 rounded-full object-contain shrink-0 shadow-xs"
              />
              <div>
                <h3 className="text-sm font-black text-slate-800 mb-1">
                  Reliable & Simple Guidance
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Evidence-based information in easy language (English, हिंदी, मराठी).
                </p>
              </div>
            </div>

            {/* 2: Personalized for You */}
            <div className="p-5 rounded-3xl bg-teal-50/60 border border-teal-100 shadow-2xs hover:shadow-md transition text-left flex items-start gap-4">
              <img
                src="/landing_why_checklist.png"
                alt="Personalized for you"
                className="w-14 h-14 rounded-full object-contain shrink-0 shadow-xs"
              />
              <div>
                <h3 className="text-sm font-black text-slate-800 mb-1">
                  Personalized for You
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Guidance based on your pregnancy week and needs.
                </p>
              </div>
            </div>

            {/* 3: Complete Daily Care */}
            <div className="p-5 rounded-3xl bg-purple-50/60 border border-purple-100 shadow-2xs hover:shadow-md transition text-left flex items-start gap-4">
              <img
                src="/landing_why_lotus.png"
                alt="Complete daily care"
                className="w-14 h-14 rounded-full object-contain shrink-0 shadow-xs"
              />
              <div>
                <h3 className="text-sm font-black text-slate-800 mb-1">
                  Complete Daily Care
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Health check-ins, nutrition, walking steps, baby kick counter, reminders and more.
                </p>
              </div>
            </div>

            {/* 4: Support from Experts */}
            <div className="p-5 rounded-3xl bg-amber-50/60 border border-amber-100 shadow-2xs hover:shadow-md transition text-left flex items-start gap-4">
              <img
                src="/landing_why_doctor.png"
                alt="Support from experts"
                className="w-14 h-14 rounded-full object-contain shrink-0 shadow-xs"
              />
              <div>
                <h3 className="text-sm font-black text-slate-800 mb-1">
                  Support from Experts
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Trusted advice and awareness to help you make informed decisions.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 5. Your Pregnancy Journey Timeline ── */}
      <section id="journey" className="py-12 sm:py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">

          <div className="inline-block mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Your Pregnancy Journey
            </h2>
            <div className="w-16 h-1 bg-[#157F66] rounded-full mx-auto mt-2" />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-3">

            {/* Step 1: Pre-Pregnancy */}
            <div className="w-full flex-1 p-3.5 rounded-2xl bg-[#FAF9F5] border border-slate-200/80 text-left hover:border-teal-300 transition flex items-center gap-3">
              <img src="/landing_journey_pre.png" alt="Pre-Pregnancy" className="w-11 h-11 rounded-full object-contain shrink-0 shadow-2xs" />
              <div>
                <h4 className="text-xs font-black text-slate-800">Pre-Pregnancy Planning</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Prepare your body and mind</p>
              </div>
            </div>

            <ChevronRight className="hidden md:block w-4 h-4 text-slate-400 shrink-0" />

            {/* Step 2: 1st Trimester */}
            <div className="w-full flex-1 p-3.5 rounded-2xl bg-teal-50/60 border border-teal-200 text-left hover:border-teal-400 transition flex items-center gap-3">
              <img src="/landing_journey_t1.png" alt="1st Trimester" className="w-11 h-11 rounded-full object-contain shrink-0 shadow-2xs" />
              <div>
                <h4 className="text-xs font-black text-slate-800">1st Trimester</h4>
                <p className="text-[10px] text-[#157F66] font-bold">Weeks 1–12</p>
                <p className="text-[9.5px] text-slate-500">Early care & guidance</p>
              </div>
            </div>

            <ChevronRight className="hidden md:block w-4 h-4 text-slate-400 shrink-0" />

            {/* Step 3: 2nd Trimester */}
            <div className="w-full flex-1 p-3.5 rounded-2xl bg-[#FAF9F5] border border-slate-200/80 text-left hover:border-teal-300 transition flex items-center gap-3">
              <img src="/landing_journey_t2.png" alt="2nd Trimester" className="w-11 h-11 rounded-full object-contain shrink-0 shadow-2xs" />
              <div>
                <h4 className="text-xs font-black text-slate-800">2nd Trimester</h4>
                <p className="text-[10px] text-[#157F66] font-bold">Weeks 13–27</p>
                <p className="text-[9.5px] text-slate-500">Track growth & stay active</p>
              </div>
            </div>

            <ChevronRight className="hidden md:block w-4 h-4 text-slate-400 shrink-0" />

            {/* Step 4: 3rd Trimester */}
            <div className="w-full flex-1 p-3.5 rounded-2xl bg-[#FAF9F5] border border-slate-200/80 text-left hover:border-teal-300 transition flex items-center gap-3">
              <img src="/landing_journey_t3.png" alt="3rd Trimester" className="w-11 h-11 rounded-full object-contain shrink-0 shadow-2xs" />
              <div>
                <h4 className="text-xs font-black text-slate-800">3rd Trimester</h4>
                <p className="text-[10px] text-[#157F66] font-bold">Weeks 28–40</p>
                <p className="text-[9.5px] text-slate-500">Prepare for delivery</p>
              </div>
            </div>

            <ChevronRight className="hidden md:block w-4 h-4 text-slate-400 shrink-0" />

            {/* Step 5: Postpartum */}
            <div className="w-full flex-1 p-3.5 rounded-2xl bg-[#FAF9F5] border border-slate-200/80 text-left hover:border-teal-300 transition flex items-center gap-3">
              <img src="/landing_journey_post.png" alt="Postpartum Care" className="w-11 h-11 rounded-full object-contain shrink-0 shadow-2xs" />
              <div>
                <h4 className="text-xs font-black text-slate-800">Postpartum Care</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Your health & baby's care</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 6. Bottom CTA Banner ("Start Your Journey with GarbhaSaathi Today") ── */}
      <section className="py-8 bg-gradient-to-r from-teal-50 via-emerald-50 to-rose-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-teal-100 shadow-md flex flex-col lg:flex-row items-center justify-between gap-5 text-left">

            {/* Left Title */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  Start Your Journey with GarbhaSaathi Today
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                A caring, culturally grounded partner for every expectant mother in India.
              </p>
            </div>

            {/* Middle Feature Highlights */}
            <div className="hidden sm:flex items-center gap-5 text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Understand Your Body Changes</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Baby className="w-4 h-4 text-amber-500" />
                <span>Track Your Baby's Development</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Sprout className="w-4 h-4 text-emerald-600" />
                <span>Stay Healthy & Confident</span>
              </span>
            </div>

            {/* Right Action */}
            {!isLoggedIn ? (
              <div className="text-center sm:text-right shrink-0">
                <button
                  onClick={() => onNavigateAuth('register')}
                  className="px-7 py-3 rounded-full bg-[#157F66] hover:bg-[#116752] text-white font-black text-xs sm:text-sm shadow-md shadow-teal-700/20 flex items-center gap-2 transition cursor-pointer active:scale-95"
                >
                  <span>Create Your Account →</span>
                </button>
                <p className="text-[10px] text-slate-400 font-medium mt-1">
                  It's free and easy to get started!
                </p>
              </div>
            ) : (
              <div className="text-center sm:text-right shrink-0">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-[#157F66]" />
                  <span>Welcome to GarbhaSaathi</span>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ── 7. Comprehensive Landing Footer ── */}
      <footer id="contact" className="bg-white border-t border-slate-200 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-6 text-left">

          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <img src="/garbhasaathi_logo.png" alt="Logo" className="w-6 h-6 object-contain" />
              <span className="font-black text-slate-800 text-sm">GarbhaSaathi</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Empowering pregnant women and families with trusted medical knowledge, daily health monitoring, and culturally sensitive maternal support.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 mb-1.5">Key Features</h4>
            <ul className="space-y-1 text-[11px]">
              <li>Baby Kick Counter</li>
              <li>Trimester Yoga & Exercises</li>
              <li>Daily Nutrition & Food Tracker</li>
              <li>Medical Report OCR & Vault</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 mb-1.5">Emergency Help</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              In any medical emergency, severe bleeding, or active contractions, immediately contact:
            </p>
            <div className="mt-1.5 flex items-center gap-2 font-black text-red-600">
              <PhoneCall className="w-4 h-4" />
              <span>National Ambulance: 108 / 102</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 mb-1.5">Medical Disclaimer</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              GarbhaSaathi is an educational and wellness tracking portal. It does not provide medical diagnoses or replace individualized care from your gynecologist or obstetrician.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <span>© {new Date().getFullYear()} GarbhaSaathi. All rights reserved.</span>
          <div className="flex items-center gap-4">
            {!isLoggedIn && (
              <>
                <button onClick={() => onNavigateAuth('login')} className="hover:text-slate-600 transition">User Login</button>
                <button onClick={() => onNavigateAuth('register')} className="hover:text-slate-600 transition">Register</button>
              </>
            )}
            <span>English • हिंदी • मराठी</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

