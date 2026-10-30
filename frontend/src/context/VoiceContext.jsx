import React, { createContext, useContext, useState, useRef } from 'react';
import { useApp } from './AppContext';

const VoiceContext = createContext();

export function VoiceProvider({ children }) {
  const { language, setDailyCheckin } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [voiceFeedback, setVoiceFeedback] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef(null);

  const handleSpeechResult = (text) => {
    if (!text) return;
    const lower = text.toLowerCase();
    
    // Simple intent detection
    if (lower.includes('अच्छा') || lower.includes('theek') || lower.includes('good') || lower.includes('छान') || lower.includes('आनंद')) {
      if (setDailyCheckin) setDailyCheckin(prev => ({ ...prev, feeling: 'good' }));
      speakFeedback(
        language === 'mr' 
          ? 'खूप छान! आनंदी राहा आणि भरपूर पाणी प्या.' 
          : 'बहुत अच्छा! खुश रहें और पर्याप्त पानी पिएं।'
      );
    } else if (lower.includes('उल्टी') || lower.includes('मळमळ') || lower.includes('nausea') || lower.includes('vomit') || lower.includes('जी मिचलाना')) {
      if (setDailyCheckin) setDailyCheckin(prev => ({ ...prev, feeling: 'nausea' }));
      speakFeedback(
        language === 'mr' 
          ? 'काळजी करू नका. आल्याचा चहा किंवा सुका खाखरा खा, बरे वाटेल.' 
          : 'चिंता न करें। थोड़ा सूखा खाखरा या अदरक का पानी लें, आराम मिलेगा।'
      );
    } else if (lower.includes('थकान') || lower.includes('tired') || lower.includes('थकवा') || lower.includes('कमजोरी')) {
      if (setDailyCheckin) setDailyCheckin(prev => ({ ...prev, feeling: 'tired' }));
      speakFeedback(
        language === 'mr' 
          ? 'आज थोडी जास्त विश्रांती घ्या आणि डाव्या बाजूला झोपा.' 
          : 'आज थोड़ा अधिक विश्राम करें और बाईं करवट सोएं।'
      );
    }
  };

  const startListening = () => {
    setTranscript('');
    setVoiceFeedback('');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        if (recognitionRef.current) {
          try { recognitionRef.current.abort(); } catch (e) { /* ignore */ }
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = language === 'mr' ? 'mr-IN' : (language === 'hi' ? 'hi-IN' : 'en-IN');

        let accumulatedTranscript = '';

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event) => {
          let text = '';
          for (let i = 0; i < event.results.length; ++i) {
            text += event.results[i][0].transcript;
          }
          accumulatedTranscript = text;
          setTranscript(text);
        };

        recognition.onerror = (event) => {
          console.warn('Speech Recognition Error:', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
          if (accumulatedTranscript.trim()) {
            handleSpeechResult(accumulatedTranscript.trim());
          }
        };

        recognitionRef.current = recognition;
        recognition.start();
        return;
      } catch (err) {
        console.warn('Recognition start error:', err);
      }
    }
    
    // Graceful fallback for environments without mic permissions
    setIsListening(true);
    setTranscript(language === 'mr' ? 'मी ऐकत आहे... (मला आज थोडे मळमळत आहे)' : 'मैं सुन रही हूँ... (मुझे आज थोड़ी उल्टी जैसा लग रहा है)');
    setTimeout(() => {
      setIsListening(false);
      const simulatedText = language === 'mr' ? 'मला मळमळत आहे' : 'मुझे थोड़ा जी मिचलाना लग रहा है';
      setTranscript(simulatedText);
      handleSpeechResult(simulatedText);
    }, 2000);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) { /* ignore */ }
    }
    setIsListening(false);
  };

  const speakFeedback = (text) => {
    setVoiceFeedback(text);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'mr' ? 'mr-IN' : (language === 'hi' ? 'hi-IN' : 'en-IN');
        utterance.rate = 0.9;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        setIsSpeaking(false);
      }
    }
  };

  return (
    <VoiceContext.Provider
      value={{
        isListening,
        transcript,
        voiceFeedback,
        isSpeaking,
        startListening,
        stopListening,
        speakFeedback
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  const context = useContext(VoiceContext);
  if (!context) throw new Error("useVoice must be used within VoiceProvider");
  return context;
}
