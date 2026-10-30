import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { moodMediaLibrary } from '../../data/moodMediaLibrary';
import { krishnaFluteAudio } from '../../utils/krishnaFluteAudio';
import { 
  X, 
  Heart, 
  MessageCircle, 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ChevronUp, 
  ChevronDown,
  Bookmark,
  Music,
  ExternalLink
} from 'lucide-react';

export default function VideoPlayerModal() {
  const { activeModal, setActiveModal, modalData, setModalData, language } = useApp();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(14820);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  // All reel items in the library
  const allReels = moodMediaLibrary.items.filter(item => item.type === 'reels');
  const currentReelIndex = allReels.findIndex(r => r.id === modalData?.id);

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';
  const tr = (hi, mr, en) => isMarathi ? (mr || hi) : (isHindi ? hi : en);

  // Compute display title & description in the selected language
  const currentTitle = isMarathi 
    ? (modalData?.titleMr || modalData?.titleHi || modalData?.title || '')
    : (isHindi ? (modalData?.titleHi || modalData?.title || '') : (modalData?.title || ''));

  const currentDesc = isMarathi 
    ? (modalData?.descriptionMr || modalData?.descriptionHi || modalData?.description || '')
    : (isHindi ? (modalData?.descriptionHi || modalData?.description || '') : (modalData?.description || ''));

  // Only play ambient flute if modalData DOES NOT have a YouTube ID
  useEffect(() => {
    if (activeModal === 'reelPlayer' && isPlaying && !isMuted && !modalData?.youtubeId) {
      krishnaFluteAudio.start({ volume: 0.35 });
    } else {
      krishnaFluteAudio.stop();
    }

    return () => {
      krishnaFluteAudio.stop();
    };
  }, [activeModal, isPlaying, isMuted, modalData]);

  // Voice narration ONLY for items without YouTube video
  useEffect(() => {
    if (activeModal === 'reelPlayer' && !isMuted && isPlaying && !modalData?.youtubeId) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();

        const titleText = isMarathi 
          ? (modalData?.titleMr || modalData?.titleHi || modalData?.title)
          : (isHindi ? (modalData?.titleHi || modalData?.title) : modalData?.title);

        const descText = isMarathi 
          ? (modalData?.descriptionMr || modalData?.descriptionHi || modalData?.description)
          : (isHindi ? (modalData?.descriptionHi || modalData?.description) : modalData?.description);

        const reelSpeechText = isMarathi 
          ? `गर्भसाथी वेलनेस रील: ${titleText}. ${descText}`
          : (isHindi ? `गर्भसाथी वेलनेस रील: ${titleText}. ${descText}` : `GarbhaSaathi Wellness Reel: ${titleText}. ${descText}`);

        const utterance = new SpeechSynthesisUtterance(reelSpeechText);
        utterance.lang = isMarathi ? 'mr-IN' : (isHindi ? 'hi-IN' : 'en-IN');
        utterance.rate = 0.92;
        window.speechSynthesis.speak(utterance);
      }
    } else {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }

    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, [activeModal, modalData, isMuted, isPlaying, isHindi, isMarathi]);

  if (activeModal !== 'reelPlayer' || !modalData) return null;

  const handleDoubleTap = (e) => {
    e.stopPropagation();
    setIsLiked(true);
    setLikesCount(c => (isLiked ? c : c + 1));
    setShowHeartBurst(true);
    setTimeout(() => setShowHeartBurst(false), 900);
  };

  const handleNextReel = (e) => {
    e && e.stopPropagation();
    if (allReels.length > 0) {
      const nextIdx = (currentReelIndex + 1) % allReels.length;
      setModalData(allReels[nextIdx]);
    }
  };

  const handlePrevReel = (e) => {
    e && e.stopPropagation();
    if (allReels.length > 0) {
      const prevIdx = (currentReelIndex - 1 + allReels.length) % allReels.length;
      setModalData(allReels[prevIdx]);
    }
  };

  const handleShare = (e) => {
    e && e.stopPropagation();
    setShareToast(true);
    try {
      if (modalData.youtubeUrl) {
        navigator.clipboard.writeText(modalData.youtubeUrl);
      }
    } catch { /* ignore */ }
    setTimeout(() => setShareToast(false), 2000);
  };

  const currentYoutubeId = modalData.youtubeId || 'nl9L4NKvPGs';
  const youtubeUrl = modalData.youtubeUrl || `https://www.youtube.com/watch?v=${currentYoutubeId}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* 9:16 Instagram/YouTube Reel Container */}
      <div 
        onDoubleClick={handleDoubleTap}
        className="bg-black rounded-[36px] max-w-[420px] w-full h-[720px] max-h-[95vh] shadow-2xl relative overflow-hidden flex flex-col justify-between text-white border-2 border-slate-700/80 select-none"
      >
        
        {/* 1. Top Bar */}
        <div className="w-full px-4 pt-3.5 pb-2.5 z-20 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/50 to-transparent">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <div className="flex items-center gap-1 bg-red-600/90 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              <span>YouTube Reel</span>
            </div>
            <span className="text-[11px] font-bold text-slate-300">
              {modalData.duration || '2 min'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Open on YouTube direct button */}
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 px-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold flex items-center gap-1 transition shadow-sm"
              title="Open video on YouTube"
            >
              <span>YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Close Button */}
            <button
              onClick={() => {
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                setActiveModal(null);
              }}
              className="p-1.5 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-xs transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. Real YouTube Video Player Embed */}
        <div className="absolute inset-0 z-0 bg-black flex items-center justify-center">
          {modalData.youtubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${modalData.youtubeId}?autoplay=1&controls=1&modestbranding=1&rel=0&playsinline=1`}
              title={currentTitle}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-b ${modalData.bgGradient || 'from-indigo-900 to-black'} flex flex-col items-center justify-center p-6 text-center`}>
              <div className="w-28 h-28 rounded-full bg-white/10 flex items-center justify-center text-5xl mb-4 animate-pulse">
                {modalData.icon || '🌸'}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{currentTitle}</h3>
              <p className="text-xs text-slate-300 max-w-xs">{currentDesc}</p>
            </div>
          )}
        </div>

        {/* Double Tap Big Heart Pop Animation */}
        {showHeartBurst && (
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none animate-in zoom-in-50 duration-200">
            <Heart className="w-28 h-28 text-rose-500 fill-rose-500 drop-shadow-2xl animate-bounce" />
          </div>
        )}

        {/* 3. Instagram & YouTube Right Side Floating Actions */}
        <div 
          onClick={(e) => e.stopPropagation()} 
          className="absolute right-3 bottom-28 flex flex-col items-center gap-3.5 z-20 pointer-events-auto"
        >
          {/* Previous Reel Button */}
          <button 
            onClick={handlePrevReel}
            className="p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-xs transition cursor-pointer"
            title="Previous Reel"
          >
            <ChevronUp className="w-4 h-4" />
          </button>

          {/* Like Button */}
          <button 
            onClick={() => {
              setIsLiked(!isLiked);
              setLikesCount(c => (isLiked ? c - 1 : c + 1));
            }}
            className="flex flex-col items-center gap-0.5 cursor-pointer"
          >
            <div className={`p-2.5 rounded-full transition transform active:scale-125 ${isLiked ? 'bg-rose-500 text-white' : 'bg-black/60 text-white border border-white/20'}`}>
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-white' : ''}`} />
            </div>
            <span className="text-[10px] font-bold drop-shadow-md">{likesCount.toLocaleString()}</span>
          </button>

          {/* Bookmark Button */}
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className="flex flex-col items-center gap-0.5 cursor-pointer"
          >
            <div className={`p-2.5 rounded-full transition ${isSaved ? 'bg-amber-400 text-amber-950' : 'bg-black/60 text-white border border-white/20'}`}>
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </div>
          </button>

          {/* Share Button */}
          <button 
            onClick={handleShare}
            className="flex flex-col items-center gap-0.5 cursor-pointer"
            title="Share Reel link"
          >
            <div className="p-2.5 bg-black/60 hover:bg-black/90 rounded-full text-white border border-white/20 transition">
              <Share2 className="w-5 h-5" />
            </div>
          </button>

          {/* Next Reel Button */}
          <button 
            onClick={handleNextReel}
            className="p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-xs transition cursor-pointer"
            title="Next Reel"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* 4. Bottom Info & Marquee */}
        <div className="p-3.5 z-20 bg-gradient-to-t from-black/95 via-black/80 to-transparent text-left pointer-events-auto">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-full bg-[#157F66] border border-white flex items-center justify-center font-bold text-[10px] text-white">
              GS
            </div>
            <span className="font-extrabold text-xs text-white">@garbhasaathi_wellness</span>
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] text-slate-400">• {modalData.views || '3.2M views'}</span>
          </div>

          <h4 className="text-xs font-bold text-white line-clamp-1 leading-snug">
            {currentTitle}
          </h4>

          <p className="text-[11px] text-slate-300 line-clamp-2 mt-1 leading-relaxed">
            {currentDesc}
          </p>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/15 text-[10px]">
            <div className="flex items-center gap-1.5 text-slate-300 truncate max-w-[250px]">
              <Music className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="truncate">🎵 {modalData.author || "Garbh Sanskar Wellness"}</span>
            </div>

            {/* Quick Link to YouTube Search for more mood reels */}
            <a
              href={`https://www.youtube.com/results?search_query=pregnancy+reels+garbh+sanskar+${encodeURIComponent(modalData.moods?.[0] || 'wellness')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-300 font-bold hover:underline flex items-center gap-1 shrink-0"
            >
              <span>{tr('और रील्स ↗', 'अजून रील्स ↗', 'More Reels ↗')}</span>
            </a>
          </div>
        </div>

        {/* Toast Notification */}
        {shareToast && (
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-40 bg-white text-slate-900 px-4 py-1.5 rounded-full text-xs font-bold shadow-xl animate-in fade-in duration-150">
            {isMarathi ? '✓ रील लिंक कॉपी झाली!' : (isHindi ? '✓ रील लिंक कॉपी हो गई!' : '✓ Reel YouTube link copied!')}
          </div>
        )}

      </div>
    </div>
  );
}
