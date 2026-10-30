import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useVoice } from '../../context/VoiceContext';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  Heart, 
  AlertCircle, 
  History,
  ShieldCheck 
} from 'lucide-react';

export default function WebVoiceHealthCheckPage() {
  const { dailyCheckin, setDailyCheckin, language, t } = useApp();
  const { isListening, transcript, voiceFeedback, isSpeaking, startListening, stopListening, speakFeedback } = useVoice();
  const [selectedSymptom, setSelectedSymptom] = useState(dailyCheckin.feeling || 'good');
  const [historyList, setHistoryList] = useState([
    { date: "Today, Morning", symptom: "Good & Energized", note: "Recommended iron-rich breakfast." },
    { date: "Yesterday, 3:30 PM", symptom: "Mild Nausea", note: "Suggested ginger lemon tea & dry crackers." },
    { date: "24 Oct 2026", symptom: "Fatigue / Tiredness", note: "Advised left lateral rest & extra hydration." }
  ]);

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';

  // Three-language translation helper
  const tr = (hi, mr, en) => isMarathi ? (mr || hi) : (isHindi ? hi : en);

  const symptomsList = [
    { id: 'good', label: t.feelGood, icon: '😊', desc: 'No discomfort, normal energy' },
    { id: 'nausea', label: t.nausea, icon: '🤢', desc: 'Morning sickness, aversion to food' },
    { id: 'tired', label: t.tiredness, icon: '🥱', desc: 'Excessive exhaustion, heavy limbs' },
    { id: 'mood', label: t.moodChanges, icon: '💭', desc: 'Hormonal swings, anxiety' },
    { id: 'other', label: t.otherSymptoms, icon: '🩺', desc: 'Back pain, mild cramping' }
  ];

  const handleSelectSymptom = (symId) => {
    setSelectedSymptom(symId);
    setDailyCheckin(prev => ({ ...prev, feeling: symId }));

    if (symId === 'nausea') {
      speakFeedback(
        isMarathi 
          ? 'मळमळ कमी करण्यासाठी आले-लिंबू पाणी आणि सुके पदार्थ खा.' 
          : 'जी मिचलाना कम करने के लिए थोड़ा अदरक-नींबू पानी और सूखा खाखरा लें।'
      );
    } else if (symId === 'tired') {
      speakFeedback(
        isMarathi 
          ? 'आज भरपूर पाणी प्या आणि डाव्या बाजूला झोपून विश्रांती घ्या.' 
          : 'आज पर्याप्त पानी पिएं और बाईं करवट सोकर आराम करें।'
      );
    } else if (symId === 'good') {
      speakFeedback(
        isMarathi 
          ? 'खूप छान! आपला दिवस आनंदात जावो.' 
          : 'बहुत बढ़िया! आपका दिन मंगलमय और ऊर्जावान रहे।'
      );
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-in fade-in duration-300 text-left">
      
      {/* Top Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-[#157F66] bg-teal-50 px-3 py-1 rounded-full uppercase tracking-wider">
            {isHindi ? "दैनिक आवाज एवं स्वास्थ्य साथी" : isMarathi ? "दैनिक आवाज व आरोग्य साथी" : "AI Voice Companion & Symptom Tracker"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            {t.voiceCheckin}
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl leading-relaxed">
            {t.voiceSub}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200">
          <ShieldCheck className="w-4 h-4 text-[#157F66]" />
          <span>{tr("गोपनीय एवं सुरक्षित चेक-इन", "गोपनीय व सुरक्षित चेक-इन", "Private & Secure Check-in")}</span>
        </div>
      </div>

      {/* Main Grid Layout: Voice Interactive Console (6 cols) + Symptom Picker & History (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Voice Assistant Microphone Console */}
        <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col items-center justify-center text-center relative overflow-hidden">
          
          <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold mb-4">
            {tr("माइक पर टैप करके हिंदी/मराठी में बोलें", "मायक्रोफोनवर टॅप करून मराठीत/हिंदीत बोला", "Speech Recognition in Hindi & Marathi")}
          </span>

          {/* Animated Glowing Mic Circle */}
          <div className="my-6 relative flex items-center justify-center">
            {isListening && (
              <>
                <div className="absolute w-52 h-52 rounded-full bg-rose-400/20 animate-pulse-ring" />
                <div className="absolute w-60 h-60 rounded-full bg-rose-400/10 animate-ping" />
              </>
            )}

            <button
              onClick={isListening ? stopListening : startListening}
              className={`w-36 h-36 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all transform active:scale-95 z-10 ${
                isListening
                  ? 'bg-rose-500 text-white shadow-rose-300 ring-8 ring-rose-100 animate-pulse'
                  : 'bg-linear-to-br from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white shadow-rose-200'
              }`}
            >
              {isListening ? (
                <MicOff className="w-14 h-14" />
              ) : (
                <Mic className="w-14 h-14 animate-bounce" />
              )}
            </button>
          </div>

          <h3 className="font-extrabold text-base text-slate-800">
            {isListening ? t.listening : t.tapToSpeak}
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">
            {isMarathi
              ? "उदाहरण: 'मला आज थोडी मळमळ होत आहे' किंवा 'मला खूप थकवा जाणवतोय'"
              : isHindi 
              ? "उदाहरण: 'मुझे आज थोड़ी उल्टी जैसा लग रहा है' या 'मुझे बहुत थकान महसूस हो रही है'" 
              : "Try saying: 'I am feeling nauseous today' or 'I feel energetic and happy'"}
          </p>

          {/* Transcript / Spoken Feedback */}
          {(transcript || voiceFeedback) && (
            <div className="w-full mt-6 p-4 bg-teal-50 border border-teal-200 rounded-2xl text-left text-xs text-teal-950 flex items-start gap-3 shadow-xs">
              <Sparkles className="w-5 h-5 text-[#157F66] shrink-0 mt-0.5" />
              <div className="space-y-1">
                {transcript && <p className="font-medium italic text-slate-700">"{transcript}"</p>}
                {voiceFeedback && <p className="font-bold text-[#157F66] text-sm">{voiceFeedback}</p>}
              </div>
            </div>
          )}

          {isSpeaking && (
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#157F66] animate-pulse">
              <Volume2 className="w-4 h-4" />
              <span>{tr("गर्भसाथी साथी बोल रही है...", "गर्भसाथी बोलत आहे...", "GarbhaSaathi Speaking...")}</span>
            </div>
          )}
        </div>

        {/* Right Column: Tap Symptoms & Check-in History */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Quick Tap Symptoms Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
            <h3 className="font-bold text-sm text-slate-800 mb-1">
              {tr("या नीचे दिए गए लक्षणों में से चुनें:", "किंवा खालीलपैकी एक लक्षण निवडा:", "Or select an option directly:")}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {tr("क्लिक करने पर तुरंत पोषण व स्व-देखभाल परामर्श मिलेगा:", "क्लिक केल्यावर तात्काळ आहार व स्वतःची काळजी घेण्याचा सल्ला मिळेल:", "Instant safe dietary suggestions upon selection:")}
            </p>

            <div className="space-y-2.5">
              {symptomsList.map((item) => {
                const isSelected = selectedSymptom === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectSymptom(item.id)}
                    className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-teal-50 border-[#157F66] shadow-xs'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <span className={`text-xs font-bold block ${isSelected ? 'text-[#157F66]' : 'text-slate-800'}`}>
                          {item.label}
                        </span>
                        <span className="text-[11px] text-slate-500">{item.desc}</span>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-[#157F66] bg-[#157F66]' : 'border-slate-300'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Past Check-ins Timeline */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
            <h4 className="font-bold text-xs text-slate-800 mb-3 flex items-center gap-2">
              <History className="w-4 h-4 text-slate-400" />
              <span>{tr("हालिया चेक-इन रिकॉर्ड्स", "अलीकडील चेक-इन नोंदी", "Recent Check-in History")}</span>
            </h4>

            <div className="space-y-2.5">
              {historyList.map((h, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs flex justify-between items-start">
                  <div>
                    <span className="font-bold text-slate-800 block">{h.symptom}</span>
                    <span className="text-[11px] text-slate-500">{h.note}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0 font-medium">{h.date}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
