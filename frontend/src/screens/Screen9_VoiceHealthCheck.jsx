import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useVoice } from '../context/VoiceContext';
import { ArrowLeft, Mic, MicOff, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Screen9_VoiceHealthCheck() {
  const { setCurrentScreen, dailyCheckin, setDailyCheckin, language, t } = useApp();
  const { isListening, transcript, voiceFeedback, isSpeaking, startListening, stopListening, speakFeedback } = useVoice();
  const [selectedSymptom, setSelectedSymptom] = useState(dailyCheckin.feeling || 'good');

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';

  const symptomsList = [
    { id: 'good', label: t.feelGood, icon: '😊' },
    { id: 'nausea', label: t.nausea, icon: '🤢' },
    { id: 'tired', label: t.tiredness, icon: '🥱' },
    { id: 'mood', label: t.moodChanges, icon: '💭' },
    { id: 'other', label: t.otherSymptoms, icon: '🩺' }
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
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#FAF9F5] text-left select-none overflow-y-auto no-scrollbar">
      <div>
        {/* Top Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen(8)}
            className="p-1.5 -ml-1.5 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-slate-800">
            {t.voiceCheckin}
          </h2>
        </div>
        <p className="text-xs text-slate-500 mt-1 ml-8">
          {t.voiceSub}
        </p>

        {/* Large Glowing Voice Assistant Mic Circle (Matching Mockup 9) */}
        <div className="my-8 flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Pulsing waves */}
            {isListening && (
              <>
                <div className="absolute w-40 h-40 rounded-full bg-rose-400/20 animate-pulse-ring" />
                <div className="absolute w-48 h-48 rounded-full bg-rose-400/10 animate-ping" />
              </>
            )}

            {/* Glowing Center Mic Button */}
            <button
              onClick={isListening ? stopListening : startListening}
              className={`w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-xl transition-all transform active:scale-95 ${
                isListening
                  ? 'bg-rose-500 text-white shadow-rose-300 ring-8 ring-rose-100 animate-pulse'
                  : 'bg-linear-to-br from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white shadow-rose-200'
              }`}
            >
              {isListening ? (
                <MicOff className="w-12 h-12" />
              ) : (
                <Mic className="w-12 h-12 animate-bounce" />
              )}
            </button>
          </div>

          <div className="text-center mt-4">
            <span className="font-bold text-xs text-slate-800 block">
              {t.tapToSpeak}
            </span>
            <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
              {isListening ? t.listening : (isHindi ? "माइक पर टैप करके अपनी बात कहें" : "Tap mic to speak")}
            </span>
          </div>

          {/* Transcript / Spoken Feedback */}
          {(transcript || voiceFeedback) && (
            <div className="w-full mt-4 p-3.5 bg-teal-50 border border-teal-200 rounded-2xl text-xs text-teal-900 flex items-start gap-2 shadow-xs">
              <Sparkles className="w-4 h-4 text-[#157F66] shrink-0 mt-0.5" />
              <div>
                {transcript && <p className="font-medium italic">"{transcript}"</p>}
                {voiceFeedback && <p className="font-bold text-[#157F66] mt-1">{voiceFeedback}</p>}
              </div>
            </div>
          )}
        </div>

        {/* Tap Options List (Matching Mockup 9) */}
        <div className="space-y-2 mt-4">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            {isHindi ? "या नीचे से विकल्प चुनें:" : "Or select an option below:"}
          </span>
          {symptomsList.map((item) => {
            const isSelected = selectedSymptom === item.id;
            return (
              <div
                key={item.id}
                onClick={() => handleSelectSymptom(item.id)}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition cursor-pointer ${
                  isSelected
                    ? 'bg-teal-50/80 border-[#157F66] shadow-xs'
                    : 'bg-white border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className={`text-xs font-semibold ${isSelected ? 'text-[#157F66]' : 'text-slate-700'}`}>
                    {item.label}
                  </span>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? 'border-[#157F66] bg-[#157F66]' : 'border-slate-300'
                  }`}
                >
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Continue CTA */}
      <div className="pt-4">
        <button
          onClick={() => setCurrentScreen(10)} // Move to Screen 10: Nutrition Planner
          className="w-full py-3.5 bg-[#157F66] hover:bg-[#0e5947] text-white rounded-2xl font-bold text-xs shadow-lg shadow-teal-700/20 transition active:scale-98"
        >
          {isHindi ? "अनुकूलित आहार योजना देखें" : "View Personalized Nutrition Plan"}
        </button>
      </div>
    </div>
  );
}
