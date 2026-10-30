import React from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, ShieldAlert, PhoneCall } from 'lucide-react';

export default function WebFooter({ setActivePage }) {
  const { language, setActiveModal } = useApp();

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';
  const tr = (hi, mr, en) => isMarathi ? (mr || hi) : (isHindi ? hi : en);

  return (
    <footer className="w-full bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 text-left text-xs mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-amber-300/80 p-0.5 bg-amber-50 shrink-0">
                <img 
                  src="/garbhasaathi_logo.png" 
                  alt="GarbhaSaathi Seal" 
                  className="w-full h-full object-contain rounded-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/garbhasaathi_emblem.jpg';
                  }}
                />
              </div>
              <span className="font-extrabold text-base text-white tracking-wide">GarbhaSaathi</span>
              <span className="text-xs text-teal-400 font-bold font-serif">गर्भसाथी</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              {tr(
                "गर्भावस्था में सुरक्षित पोषण, मानसिक शांति, दैनिक स्व-देखभाल एवं रिपोर्ट प्रबंधन के लिए समर्पित मातृत्व वेब पोर्टल।",
                "गरोदरपणात सुरक्षित पोषण, मानसिक शांतता, दैनंदिन स्वतःची काळजी आणि रिपोर्ट व्यवस्थापनासाठी समर्पित मातृत्व वेब पोर्टल.",
                "A personalized pregnancy companion supporting expecting mothers with nutrition, emotional wellness, and daily self-care."
              )}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              {tr("मुख्य पृष्ठ", "महत्त्वाचे दुवे", "Portals & Guides")}
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => setActivePage('home')} className="hover:text-white transition">Dashboard</button></li>
              <li><button onClick={() => setActivePage('journey')} className="hover:text-white transition">{tr("Month-Wise Journey (माह-वार विकास)", "Month-Wise Journey (महिनानिहाय विकास)", "Month-Wise Journey")}</button></li>
              <li><button onClick={() => setActivePage('nutrition')} className="hover:text-white transition">{tr("Pantry & Nutrition (आहार योजना)", "Pantry & Nutrition (पोषण योजना)", "Pantry & Nutrition")}</button></li>
              <li><button onClick={() => setActivePage('tasks')} className="hover:text-white transition">{tr("दैनिक कार्य (Daily Tasks)", "दैनिक कामे (Daily Tasks)", "Daily Tasks")}</button></li>
              <li><button onClick={() => setActivePage('exercise')} className="hover:text-white transition">{tr("दैनिक व्यायाम व योग (Daily Exercise)", "दैनंदिन व्यायाम व योग (Daily Exercise)", "Daily Exercise & Yoga")}</button></li>
            </ul>
          </div>

          {/* Wellness & Records */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              {tr("सुविधाएं", "साधने आणि नोंदी", "Tools & Records")}
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => setActivePage('wellness')} className="hover:text-white transition">{tr("Learning Garden (लर्निंग गार्डन)", "Learning Garden (लर्निंग गार्डन)", "Learning Garden")}</button></li>
              <li><button onClick={() => setActivePage('records')} className="hover:text-white transition">{tr("Health Records & Reminders (दवाएं)", "Health Records & Reminders (औषधे)", "Health Records & Reminders")}</button></li>
              <li><button onClick={() => setActiveModal('kickCounter')} className="hover:text-white transition">{tr("Baby Kick Counter (शिशु किक्स)", "Baby Kick Counter (बाळाच्या किक्स)", "Baby Kick Counter")}</button></li>
              <li><button onClick={() => setActiveModal('waterTracker')} className="hover:text-white transition">{tr("Hydration Tracker (जल संजीवन)", "Hydration Tracker (पाण्याची नोंद)", "Hydration Tracker")}</button></li>
            </ul>
          </div>

          {/* Emergency Helplines */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5 text-rose-400">
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              <span>{tr("आपातकालीन नंबर", "आपत्कालीन क्रमांक", "Emergency Helplines")}</span>
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                <span className="font-bold text-white">108</span>
                <span className="text-[11px] text-slate-400">{tr("राष्ट्रीय एम्बुलेंस (24x7)", "राष्ट्रीय रुग्णवाहिका (24x7)", "National Ambulance")}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                <span className="font-bold text-white">102</span>
                <span className="text-[11px] text-slate-400">{tr("मुफ्त जननी सेवा", "मोफत जननी सेवा", "Maternal Transport")}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Clinical Safety Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-[11px] text-slate-400 leading-relaxed text-center">
          <p>
            <strong className="text-amber-400">{tr("चिकित्सीय अस्वीकरण (Medical Disclaimer): ", "वैद्यकीय अस्वीकरण (Medical Disclaimer): ", "Medical Disclaimer: ")}</strong>
            {tr(
              "गर्भसाथी केवल शैक्षिक और दैनिक स्व-देखभाल के लिए है। यह किसी डॉक्टर या चिकित्सकीय परामर्श का विकल्प नहीं है। गंभीर लक्षणों पर तुरंत 108 पर कॉल करें या नजदीकी अस्पताल जाएं।",
              "गर्भसाथी केवळ शैक्षणिक आणि दैनंदिन स्वतःच्या काळजीसाठी आहे. हा कोणत्याही डॉक्टरांच्या किंवा वैद्यकीय सल्ल्याचा पर्याय नाही. गंभीर लक्षणे आढळल्यास ताबडतोब 108 वर कॉल करा किंवा जवळच्या रुग्णालयात जा.",
              "GarbhaSaathi is a supportive self-care and education platform, not a diagnostic or medical treatment service. For medical concerns, always consult a licensed obstetrician."
            )}
          </p>
        </div>

        {/* Bottom Credits */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <span>© 2026 GarbhaSaathi (गर्भसाथी). All rights reserved.</span>
          <span className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Expecting Mothers across India.
          </span>
        </div>

      </div>
    </footer>
  );
}
