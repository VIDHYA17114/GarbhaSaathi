import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Send, 
  Sparkles, 
  Key, 
  Check,
  Bot,
  User,
  Heart
} from 'lucide-react';
import { 
  askGarbhaSaathiAI, 
  getGeminiApiKey, 
  saveGeminiApiKey 
} from '../../services/geminiVoiceService';
import { maternalNarrator } from '../../utils/maternalSpeechHelper';

export default function AIVoiceAssistantModal() {
  const { activeModal, setActiveModal, language } = useApp();

  // Assistant active language ('mr' | 'hi' | 'en')
  const [voiceLang, setVoiceLang] = useState(language || 'mr');
  
  // Voice Input State
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoVoiceReply, setAutoVoiceReply] = useState(true);

  // Gemini API Key State
  const [apiKey, setApiKey] = useState('');
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [tempKeyInput, setTempKeyInput] = useState('');
  const [keySavedToast, setKeySavedToast] = useState(false);

  // Conversation history
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      role: 'assistant',
      text: voiceLang === 'mr'
        ? 'नमस्ते ताई! मी तुमची गर्भसाथी AI वाणी साथी आहे. तुमच्या गरोदरपणाबद्दल, पोषणाबद्दल किंवा बाळाच्या वाढीबद्दल तुम्ही मला काहीही विचारू शकता. खालील माईक दाबून बोला किंवा प्रश्न निवडा!'
        : (voiceLang === 'hi'
            ? 'नमस्ते दीदी! मैं आपकी गर्भसाथी AI वाणी साथी हूँ। गर्भावस्था, पोषण या शिशु के विकास से जुड़ा कोई भी सवाल आप मुझसे बेझिझक पूछ सकती हैं। माइक दबाकर बोलें!'
            : 'Hello dear mother! I am your GarbhaSaathi AI Voice Companion. Feel free to ask me anything about your pregnancy, nutrition, or baby development. Tap the mic to speak!'),
      lang: voiceLang
    }
  ]);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const transcriptRef = useRef('');

  // Sync initial language & API key
  useEffect(() => {
    if (activeModal === 'aiVoiceAssistant') {
      const storedKey = getGeminiApiKey();
      setApiKey(storedKey);
      setTempKeyInput(storedKey);
      setVoiceLang(language || 'mr');
    }
  }, [activeModal, language]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  // Cleanup on unmount or modal close
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (e) { /* ignore */ }
      }
      maternalNarrator.stop();
    };
  }, []);

  if (activeModal !== 'aiVoiceAssistant') return null;

  const toggleListening = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    maternalNarrator.stop();
    setIsSpeaking(false);

    if (isListening) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (err) { /* ignore */ }
      }
      setIsListening(false);
      return;
    }

    transcriptRef.current = '';
    setTranscript('');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(voiceLang === 'mr' 
        ? 'तुमच्या ब्राउझरमध्ये स्पीच रेकॉर्डिंग उपलब्ध नाही. कृपया टाइप करा.' 
        : 'Speech recognition is not supported in this browser. Please type your question.');
      return;
    }

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (err) { /* ignore */ }
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = voiceLang === 'mr' ? 'mr-IN' : (voiceLang === 'hi' ? 'hi-IN' : 'en-IN');

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        let currentText = '';
        for (let i = 0; i < event.results.length; ++i) {
          currentText += event.results[i][0].transcript;
        }
        transcriptRef.current = currentText;
        setTranscript(currentText);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        const finalSpoken = transcriptRef.current.trim();
        if (finalSpoken) {
          handleSend(finalSpoken);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn('Recognition start exception:', err);
      setIsListening(false);
    }
  };

  const handleSend = async (textToSend, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const query = (textToSend || inputText).trim();
    if (!query || isProcessing) return;

    setInputText('');
    setTranscript('');
    transcriptRef.current = '';

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      lang: voiceLang
    };

    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    try {
      const response = await askGarbhaSaathiAI({
        prompt: query,
        language: voiceLang,
        conversationHistory: messages
      });

      const assistantMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: response.text,
        source: response.source,
        lang: voiceLang
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Automatically speak the response if auto voice reply is enabled
      if (autoVoiceReply) {
        speakMessage(response.text, voiceLang);
      }
    } catch (err) {
      console.error('AI chat failed:', err);
      const errMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: voiceLang === 'mr'
          ? 'माफ करा ताई, उत्तर मिळवताना अडचण आली. कृपया पुन्हा विचारून पहा.'
          : 'क्षमा करें दीदी, उत्तर प्राप्त करने में समस्या हुई। कृपया दोबारा पूछें।',
        lang: voiceLang
      };
      setMessages(prev => [...prev, errMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const speakMessage = (text, lang) => {
    maternalNarrator.stop();
    setIsSpeaking(true);
    maternalNarrator.speak({
      text,
      language: lang || voiceLang,
      rate: 0.9,
      onEnd: () => setIsSpeaking(false)
    });
  };

  const stopSpeaking = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    maternalNarrator.stop();
    setIsSpeaking(false);
  };

  const handleSaveApiKey = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    saveGeminiApiKey(tempKeyInput);
    setApiKey(tempKeyInput.trim());
    setKeySavedToast(true);
    setTimeout(() => {
      setKeySavedToast(false);
      setIsKeyModalOpen(false);
    }, 1500);
  };

  const handleClose = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    maternalNarrator.stop();
    setIsSpeaking(false);
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch (err) { /* ignore */ }
    }
    setActiveModal(null);
  };

  // Quick suggestions based on selected language
  const suggestions = {
    mr: [
      'तिसऱ्या महिन्यात काय खावे?',
      'उल्टी आणि मळमळ घरगुती उपाय',
      'बाळाची पहिली हालचाल कधी समजते?',
      'गर्भ संस्कारासाठी कोणते श्लोक ऐकावे?',
      'डाव्या कुशीवर झोपणे का महत्त्वाचे आहे?'
    ],
    hi: [
      'गर्भावस्था में क्या खाना चाहिए?',
      'उल्टी व चक्कर आने पर क्या करें?',
      'शिशु की पहली हलचल कब महसूस होती है?',
      'गर्भ संस्कार के लाभ क्या हैं?',
      'सोते समय किस करवट सोना चाहिए?'
    ],
    en: [
      'What foods should I eat in the 2nd trimester?',
      'How to relieve morning sickness naturally?',
      'When do baby kicks start?',
      'What is the importance of Garbha Sanskar?',
      'Safe sleeping positions during pregnancy'
    ]
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-[32px] max-w-xl w-full h-[90vh] max-h-[720px] shadow-2xl relative border border-teal-100 dark:border-slate-800 flex flex-col overflow-hidden text-left">
        
        {/* ── 1. Header ── */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-teal-50/80 via-emerald-50/50 to-rose-50/40 dark:from-slate-800/80 dark:to-slate-900 flex items-center justify-between shrink-0">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center shadow-md shadow-teal-500/20 relative">
              <Bot className="w-5 h-5" />
              {isSpeaking && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full animate-ping" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 tracking-tight leading-none">
                  {voiceLang === 'mr' ? 'AI वाणी साथी' : (voiceLang === 'hi' ? 'AI वाणी साथी' : 'AI Voice Saathi')}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-100 dark:bg-teal-950 text-[#157F66] dark:text-teal-300 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>Gemini AI</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                {voiceLang === 'mr' 
                  ? 'मराठी • हिंदी • English संभाषण' 
                  : (voiceLang === 'hi' ? 'हिंदी • मराठी • English संवाद' : 'Multi-lingual Maternal Voice Assistant')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Gemini Key Config Button */}
            <button
              type="button"
              onClick={() => setIsKeyModalOpen(true)}
              className={`p-2 rounded-xl transition cursor-pointer flex items-center gap-1 text-xs font-bold ${
                apiKey 
                  ? 'bg-teal-100/70 text-teal-800 dark:bg-teal-950 dark:text-teal-300' 
                  : 'bg-amber-100/80 text-amber-900 dark:bg-amber-950 dark:text-amber-300'
              }`}
              title={apiKey ? "Gemini API Key Connected" : "Add Gemini API Key"}
            >
              <Key className="w-4 h-4" />
              <span className="hidden sm:inline">{apiKey ? 'Gemini Active' : 'Set API Key'}</span>
            </button>

            {/* Auto-Voice Toggle */}
            <button
              type="button"
              onClick={() => {
                if (isSpeaking) maternalNarrator.stop();
                setAutoVoiceReply(!autoVoiceReply);
              }}
              className={`p-2 rounded-xl transition cursor-pointer ${
                autoVoiceReply 
                  ? 'bg-[#157F66] text-white shadow-xs' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}
              title={autoVoiceReply ? "Voice Reply Enabled" : "Voice Reply Muted"}
            >
              {autoVoiceReply ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Close Modal */}
            <button
              type="button"
              onClick={handleClose}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-white/80 dark:bg-slate-800 rounded-xl transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── 2. Language Selector Bar ── */}
        <div className="px-5 py-2 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs shrink-0">
          <span className="font-bold text-slate-600 dark:text-slate-400">
            {voiceLang === 'mr' ? 'भाषा निवडा:' : (voiceLang === 'hi' ? 'भाषा चुनें:' : 'Language:')}
          </span>
          <div className="flex items-center gap-1.5">
            {[
              { code: 'mr', label: 'मराठी (Marathi)' },
              { code: 'hi', label: 'हिंदी (Hindi)' },
              { code: 'en', label: 'English' }
            ].map(l => (
              <button
                key={l.code}
                type="button"
                onClick={() => {
                  setVoiceLang(l.code);
                  maternalNarrator.stop();
                  setIsSpeaking(false);
                }}
                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition cursor-pointer ${
                  voiceLang === l.code
                    ? 'bg-[#157F66] text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gemini API Key Banner (if not set) */}
        {!apiKey && (
          <div className="mx-4 mt-2.5 p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-900/60 flex items-center justify-between gap-2 text-xs shrink-0">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>
                {voiceLang === 'mr' 
                  ? 'Gemini / Copilot प्रमाणे अमर्याद लाइव्ह उत्तरांसाठी Google Gemini Key जोडा.' 
                  : (voiceLang === 'hi' ? 'Gemini / Copilot जैसे लाइव AI जवाबों के लिए Google Gemini Key जोड़ें।' : 'Connect your free Google Gemini API Key for live open-ended AI conversation.')}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsKeyModalOpen(true)}
              className="px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-[10px] shrink-0 transition cursor-pointer"
            >
              {voiceLang === 'mr' ? 'Key जोडा' : 'Add Key'}
            </button>
          </div>
        )}

        {/* ── 3. Chat Messages Area ── */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] sm:max-w-[75%] p-3.5 rounded-2xl relative shadow-2xs leading-relaxed ${
                    isUser
                      ? 'bg-[#157F66] text-white rounded-br-xs'
                      : 'bg-slate-50 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700 rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>

                  {/* Message Bottom Action: Read aloud button */}
                  {!isUser && (
                    <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-teal-700 dark:text-teal-400 flex items-center gap-1">
                        <Heart className="w-3 h-3 fill-current text-rose-500" />
                        <span>{m.source === 'gemini' ? 'Google Gemini AI (Live)' : 'GarbhaSaathi Conversational AI'}</span>
                      </span>

                      <button
                        type="button"
                        onClick={() => speakMessage(m.text, m.lang)}
                        className="flex items-center gap-1 hover:text-[#157F66] dark:hover:text-teal-300 font-bold transition cursor-pointer"
                        title="Read this response aloud"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{voiceLang === 'mr' ? 'पुन्हा ऐका' : (voiceLang === 'hi' ? 'पुनः सुनें' : 'Listen')}</span>
                      </button>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* AI Thinking Animation */}
          {isProcessing && (
            <div className="flex gap-2.5 justify-start items-center text-xs text-slate-500">
              <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center shrink-0 animate-pulse">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
                <span>
                  {voiceLang === 'mr' ? 'AI उत्तर तयार करत आहे...' : (voiceLang === 'hi' ? 'AI उत्तर तैयार कर रहा है...' : 'AI is thinking...')}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ── 4. Quick Suggestion Chips ── */}
        <div className="px-4 py-2 bg-slate-50/70 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 shrink-0">
            {voiceLang === 'mr' ? 'सुचवलेले प्रश्न:' : (voiceLang === 'hi' ? 'सुझाव:' : 'Suggestions:')}
          </span>
          {(suggestions[voiceLang] || suggestions.mr).map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(item)}
              className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-teal-400 text-slate-700 dark:text-slate-300 text-[11px] font-medium whitespace-nowrap transition cursor-pointer hover:bg-teal-50/50"
            >
              {item}
            </button>
          ))}
        </div>

        {/* ── 5. Voice Wave / Live Speech Preview ── */}
        {isListening && (
          <div className="px-4 py-2.5 bg-rose-50 dark:bg-rose-950/60 border-t border-rose-200 dark:border-rose-900 flex items-center justify-between gap-3 shrink-0 animate-pulse">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 text-xs font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span>
                {voiceLang === 'mr' ? 'ऐकत आहे... बोला' : (voiceLang === 'hi' ? 'सुन रही हूँ... बोलिए' : 'Listening... Speak now')}
              </span>
              <span className="font-normal italic text-slate-600 dark:text-slate-300 truncate max-w-xs">
                {transcript || (voiceLang === 'mr' ? 'तुमचा आवाज रेकॉर्ड होत आहे...' : 'Recording speech...')}
              </span>
            </div>
            <button
              type="button"
              onClick={toggleListening}
              className="px-3 py-1 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold transition cursor-pointer"
            >
              {voiceLang === 'mr' ? 'पूर्ण करा' : 'Done'}
            </button>
          </div>
        )}

        {/* ── 6. Speaking Indicator Bar ── */}
        {isSpeaking && (
          <div className="px-4 py-2 bg-teal-50 dark:bg-teal-950/60 border-t border-teal-200 dark:border-teal-900 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300 text-xs font-bold">
              <Volume2 className="w-4 h-4 animate-bounce text-teal-600" />
              <span>{voiceLang === 'mr' ? 'AI वाणी सुरू आहे (मराठी आवाज)...' : 'AI is speaking...'}</span>
            </div>
            <button
              type="button"
              onClick={stopSpeaking}
              className="px-3 py-1 rounded-full bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-bold transition cursor-pointer"
            >
              {voiceLang === 'mr' ? 'थांबवा' : 'Stop'}
            </button>
          </div>
        )}

        {/* ── 7. Input Controls ── */}
        <div className="p-3 sm:p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2 shrink-0">
          
          {/* Big Mic Button */}
          <button
            type="button"
            onClick={toggleListening}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition shadow-md cursor-pointer shrink-0 ${
              isListening
                ? 'bg-rose-500 text-white shadow-rose-500/30 animate-pulse ring-4 ring-rose-200 dark:ring-rose-900'
                : 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white hover:brightness-105 shadow-teal-500/20 active:scale-95'
            }`}
            title={isListening ? "Stop Listening" : "Press to Speak in Marathi, Hindi, or English"}
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>

          {/* Text Input for Typing */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSend();
            }}
            className="flex-1 flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-2xl px-3.5 py-2 border border-slate-200/80 dark:border-slate-700"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                voiceLang === 'mr' 
                  ? 'येथे लिहा किंवा माईक दाबून बोला...' 
                  : (voiceLang === 'hi' ? 'यहाँ लिखें या माइक दबाकर बोलें...' : 'Type your question or tap mic...')
              }
              className="w-full bg-transparent text-xs sm:text-sm text-slate-800 dark:text-slate-100 outline-none placeholder:text-slate-400"
              disabled={isProcessing}
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isProcessing}
              className="p-1.5 rounded-xl bg-[#157F66] hover:bg-[#116752] disabled:opacity-30 text-white transition cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>

      {/* ── Sub-Modal: Google Gemini API Key Setup ── */}
      {isKeyModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-slate-200 dark:border-slate-800 text-left space-y-4">
            
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-100">
                    Google Gemini API Key
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {voiceLang === 'mr' ? 'अमर्याद AI संभाषणासाठी की जोडा' : 'Connect for real-time Gemini AI'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsKeyModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 bg-slate-100 dark:bg-slate-800 rounded-full cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {voiceLang === 'mr'
                ? 'तुमची स्वतःची Google Gemini API Key प्रविष्ट करा. ही की तुमच्या ब्राउझरमध्ये सुरक्षित सेव्ह राहील.'
                : 'Enter your Google Gemini API Key. Your key is stored securely in your browser.'}
            </p>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                Gemini API Key
              </label>
              <input
                type="password"
                value={tempKeyInput}
                onChange={(e) => setTempKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono outline-none focus:ring-2 focus:ring-[#157F66]"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-[#157F66] dark:text-teal-400 hover:underline flex items-center gap-1"
              >
                <span>Get free Gemini API Key ↗</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    saveGeminiApiKey('');
                    setApiKey('');
                    setTempKeyInput('');
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-500 hover:text-red-600 transition"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={handleSaveApiKey}
                  className="px-4 py-2 rounded-xl bg-[#157F66] hover:bg-[#116752] text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition"
                >
                  {keySavedToast ? <Check className="w-4 h-4" /> : null}
                  <span>{keySavedToast ? 'Saved!' : 'Save Key'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
