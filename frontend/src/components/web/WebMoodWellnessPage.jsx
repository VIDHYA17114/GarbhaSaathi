import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { krishnaFluteAudio } from '../../utils/krishnaFluteAudio';
import {
  LEARNING_BOOKS,
  GITA_CHAPTERS,
  GITA_CH2_DETAIL,
  GITA_CH9_DETAIL,
  LEARNING_STORIES,
  LEARNING_QUOTES,
  LEARNING_KNOWLEDGE,
  loadLearningProgress,
  saveLearningProgress
} from '../../data/learningGardenData';
import { gitaChapter9Shlokas } from '../../data/gitaShlokas';
import {
  Search,
  BookOpen,
  Heart,
  Sparkles,
  Quote,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Play,
  Pause,
  Clock,
  Globe,
  Star,
  Headphones,
  X,
  Volume2,
  VolumeX,
  Check,
  Copy,
  Share2,
  Compass,
  ArrowUpRight,
  CheckCircle2,
  Lightbulb,
  Info
} from 'lucide-react';

// ── Multi-language String Helper ───────────────────────────────────────────
function t3(lang, en, hi, mr) {
  if (lang === 'mr') return mr || hi || en;
  if (lang === 'hi') return hi || en;
  return en;
}

function getField(item, field, lang) {
  if (!item) return '';
  const langSuffix = { en: 'En', hi: 'Hi', mr: 'Mr' }[lang] || 'En';
  return item[field + langSuffix] || item[field + 'En'] || item[field] || '';
}

// ── Markdown-to-HTML parser for formatted reading ─────────────────────────
function markdownToHtml(md) {
  if (!md) return '';
  let html = md
    .replace(/^### (.+)$/gm, '<h3 class="text-base font-extrabold text-slate-800 dark:text-slate-100 mt-5 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-lg font-extrabold text-slate-900 dark:text-slate-50 mt-6 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-slate-100">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="italic text-slate-600 dark:text-slate-300">$1</em>')
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-pink-400 pl-4 py-1.5 my-3 bg-pink-50/60 dark:bg-pink-950/30 rounded-r-xl italic text-slate-700 dark:text-slate-300">$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-sm text-slate-700 dark:text-slate-300 py-0.5">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 list-decimal text-sm text-slate-700 dark:text-slate-300 py-0.5">$2</li>')
    .replace(/✅/g, '<span class="text-emerald-600 font-bold">✅</span>')
    .replace(/❌/g, '<span class="text-rose-600 font-bold">❌</span>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');
  return html;
}

export default function WebMoodWellnessPage() {
  const { language, setLanguage, setActiveModal, setModalData } = useApp();
  const lang = language || 'hi';

  // Navigation views: 'home' | 'books' | 'gita' | 'stories' | 'quotes' | 'bookDetail' | 'chapterReader' | 'gitaChapterDetail' | 'storyReader' | 'knowledgeReader'
  const [view, setView] = useState('home');
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedGitaCh, setSelectedGitaCh] = useState(null);
  const [selectedKnowledge, setSelectedKnowledge] = useState(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('popular'); // 'popular' | 'latest' | 'short' | 'audio' | 'all'
  const [bookTopicFilter, setBookTopicFilter] = useState('all'); // 'all' | 'pregnancy' | 'wellness'

  // Toast notice for honest audio availability
  const [toastMessage, setToastMessage] = useState(null);
  const [copiedQuoteId, setCopiedQuoteId] = useState(null);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  }, []);

  // Reading progress and personalization
  const [progress, setProgress] = useState(() => loadLearningProgress());
  useEffect(() => {
    saveLearningProgress(progress);
  }, [progress]);

  const toggleBookmark = useCallback((id) => {
    setProgress(prev => {
      const exists = prev.bookmarks.includes(id);
      const bookmarks = exists
        ? prev.bookmarks.filter(b => b !== id)
        : [...prev.bookmarks, id];
      return { ...prev, bookmarks };
    });
  }, []);

  const markRecentItem = useCallback((id, type, titleEn, subtitleEn = '') => {
    setProgress(prev => {
      const filtered = prev.recentItems.filter(r => r.id !== id);
      const items = [{ id, type, titleEn, subtitleEn, ts: Date.now() }, ...filtered].slice(0, 10);
      return { ...prev, recentItems: items };
    });
  }, []);

  const markChapterRead = useCallback((bookId, chapterId) => {
    setProgress(prev => {
      const cp = { ...prev.chapterProgress };
      if (!cp[bookId]) cp[bookId] = [];
      if (!cp[bookId].includes(chapterId)) cp[bookId] = [...cp[bookId], chapterId];
      return { ...prev, chapterProgress: cp };
    });
  }, []);

  // Audio handler — starts soothing sound immediately & opens Audio Player Modal
  const handleListenAction = (item, title, preferLang = null) => {
    // 1. Unconditionally trigger Web Audio in user gesture to unlock AudioContext
    try {
      krishnaFluteAudio.start({ volume: 0.7 });
    } catch (e) {
      console.warn("Audio start error:", e);
    }

    const effectiveLang = preferLang || lang;

    // 2. Prepare rich audio metadata for AudioPlayerModal
    const modalTitle = title || getField(item, 'title', effectiveLang) || getField(item, 'name', effectiveLang) || 'Maternal Sacred Audio';
    const modalDesc = getField(item, 'desc', effectiveLang) || item?.maternalTheme || 'Relaxing spiritual sound and maternal wisdom.';

    setModalData({
      title: modalTitle,
      titleEn: item?.titleEn || item?.nameEn || modalTitle,
      titleHi: item?.titleHi || item?.nameHi || modalTitle,
      titleMr: item?.titleMr || item?.nameMr || modalTitle,
      description: modalDesc,
      descriptionEn: item?.descEn || item?.maternalTheme || modalDesc,
      descriptionHi: item?.descHi || item?.maternalTheme || modalDesc,
      descriptionMr: item?.descMr || item?.maternalTheme || modalDesc,
      content: getField(item, 'content', effectiveLang) || modalDesc,
      contentEn: item?.contentEn,
      contentHi: item?.contentHi,
      contentMr: item?.contentMr,
      author: getField(item, 'author', effectiveLang) || (item?.shlokaCount ? 'Shrimad Bhagavad Gita' : 'GarbhaSaathi Prenatal Audio'),
      duration: item?.readTime || '10:00',
      icon: item?.coverEmoji || (item?.shlokaCount ? '🙏' : '🌸'),
      bgGradient: item?.coverGradient || (item?.shlokaCount ? 'from-amber-500 to-orange-600' : 'from-pink-500 to-rose-600'),
      youtubeId: item?.youtubeId || (item?.shlokaCount ? '1ZYbU82GVz4' : 'g33L8X9s9jI'),
      type: 'audio',
      preferredMode: 'narration'
    });

    // 3. Open audio modal
    setActiveModal('audioPlayer');
  };

  const handleCopyQuote = (q) => {
    const text = `"${getField(q, 'text', lang)}" — ${getField(q, 'source', lang)} (via GarbhaSaathi Learning Garden)`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedQuoteId(q.id);
      setTimeout(() => setCopiedQuoteId(null), 2500);
    }
  };

  // Search Results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    const results = [];

    LEARNING_BOOKS.forEach(b => {
      if (getField(b, 'title', lang).toLowerCase().includes(q) || getField(b, 'desc', lang).toLowerCase().includes(q)) {
        results.push({ type: 'book', item: b, title: getField(b, 'title', lang) });
      }
      b.chapters?.forEach(ch => {
        if (getField(ch, 'title', lang).toLowerCase().includes(q)) {
          results.push({ type: 'chapter', item: ch, parent: b, title: getField(ch, 'title', lang) });
        }
      });
    });

    GITA_CHAPTERS.forEach(g => {
      if (getField(g, 'name', lang).toLowerCase().includes(q) || g.descEn.toLowerCase().includes(q) || g.maternalTheme.toLowerCase().includes(q)) {
        results.push({ type: 'gita', item: g, title: `${t3(lang, 'Chapter', 'अध्याय', 'अध्याय')} ${g.number}: ${getField(g, 'name', lang)}` });
      }
    });

    LEARNING_STORIES.forEach(s => {
      if (getField(s, 'title', lang).toLowerCase().includes(q) || getField(s, 'desc', lang).toLowerCase().includes(q)) {
        results.push({ type: 'story', item: s, title: getField(s, 'title', lang) });
      }
    });

    LEARNING_QUOTES.forEach(qo => {
      if (getField(qo, 'text', lang).toLowerCase().includes(q) || getField(qo, 'source', lang).toLowerCase().includes(q)) {
        results.push({ type: 'quote', item: qo, title: getField(qo, 'text', lang).slice(0, 70) + '...' });
      }
    });

    LEARNING_KNOWLEDGE.forEach(k => {
      if (getField(k, 'title', lang).toLowerCase().includes(q) || getField(k, 'desc', lang).toLowerCase().includes(q)) {
        results.push({ type: 'knowledge', item: k, title: getField(k, 'title', lang) });
      }
    });

    return results;
  }, [searchQuery, lang]);

  const goHome = () => {
    setView('home');
    setSelectedBook(null);
    setSelectedChapter(null);
    setSelectedStory(null);
    setSelectedGitaCh(null);
    setSelectedKnowledge(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ══════════════════════════════════════════════════════════════════════════
  // ── VIEW: CHAPTER READER ──────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════════
  if (view === 'chapterReader' && selectedChapter && selectedBook) {
    const ch = selectedChapter;
    const chapters = selectedBook.chapters || [];
    const idx = chapters.findIndex(c => c.id === ch.id);
    const prev = idx > 0 ? chapters[idx - 1] : null;
    const next = idx < chapters.length - 1 ? chapters[idx + 1] : null;
    const isRead = progress.chapterProgress[selectedBook.id]?.includes(ch.id);
    const isBookmarked = progress.bookmarks.includes(ch.id);

    return (
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-6 space-y-6 animate-in fade-in duration-300 text-left">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => { setView('bookDetail'); setSelectedChapter(null); }}
            className="flex items-center gap-2 text-sm font-bold text-[#157F66] hover:underline cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> {t3(lang, 'Back to Chapters', 'अध्यायों की सूची पर वापस', 'अध्याय यादीवर परत')}
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(ch.id)}
              className={`p-2.5 rounded-xl border transition ${isBookmarked ? 'bg-pink-50 border-pink-300 text-pink-600 dark:bg-pink-950 dark:border-pink-800' : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700 dark:bg-slate-800 dark:border-slate-700'}`}
              title="Bookmark"
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-pink-600" /> : <Bookmark className="w-4 h-4" />}
            </button>
            <button
              onClick={() => handleListenAction(ch, getField(ch, 'title', lang))}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-800 dark:bg-pink-950 dark:text-pink-300 text-xs font-bold transition"
            >
              <Headphones className="w-4 h-4" />
              <span>{t3(lang, 'Listen', 'सुनें', 'ऐका')}</span>
            </button>
          </div>
        </div>

        {/* Article Box */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 text-xs font-bold">
              {t3(lang, 'Chapter', 'अध्याय', 'अध्याय')} {ch.number}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {ch.readTime}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{getField(selectedBook, 'title', lang)}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50 leading-tight">
            {getField(ch, 'title', lang)}
          </h1>

          {/* Marathi Voice Audio Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-teal-50 dark:from-slate-800 dark:to-slate-850 border border-rose-200/80 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Volume2 className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  <span>{t3(lang, 'Listen in Marathi Voice', 'मराठी आवाज में सुनें', 'मराठी आवाजात ऑडिओ ऐका')}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold">मराठी ऑडिओ</span>
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {t3(lang, 'Clear spoken narration in Marathi to nurture your baby', 'गर्भवती माताओं के लिए शांत मराठी आवाज वाचन', 'गरोदर मातांसाठी शांत, स्पष्ट व गोड मराठी आवाज वाचन')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleListenAction(ch, ch.titleMr || getField(ch, 'title', lang), 'mr')}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-rose-600/20 transition cursor-pointer active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>मराठीत ऐका (Voice)</span>
              </button>
            </div>
          </div>

          <article
            className="prose prose-slate dark:prose-invert max-w-none text-sm leading-relaxed text-slate-700 dark:text-slate-300"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(getField(ch, 'content', lang)) }}
          />

          {/* Key Takeaways Box */}
          {ch.keyTakeawaysEn && (
            <div className="mt-8 p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 space-y-3">
              <h4 className="font-extrabold text-sm text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                <span>🔑</span> {t3(lang, 'Key Takeaways for Mother & Baby', 'माँ और शिशु के लिए मुख्य निष्कर्ष', 'आई आणि बाळासाठी मुख्य मुद्दे')}
              </h4>
              <ul className="space-y-1.5">
                {(getField(ch, 'keyTakeaways', lang) || ch.keyTakeawaysEn).map((item, i) => (
                  <li key={i} className="text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Mark as Read Button */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between flex-wrap gap-4">
            <button
              onClick={() => markChapterRead(selectedBook.id, ch.id)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition ${isRead ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-[#157F66] text-white hover:bg-[#126b56]'}`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isRead ? t3(lang, 'Completed & Saved in Progress', 'पूर्ण — प्रगति में सहेजा गया', 'पूर्ण — प्रगतीमध्ये सेव्ह केले') : t3(lang, 'Mark as Read', 'पढ़ा हुआ चिह्नित करें', 'वाचले म्हणून नोंदवा')}</span>
            </button>
            <span className="text-xs text-slate-400">
              {t3(lang, 'Reading progress is automatically saved', 'आपकी पढ़ाई की प्रगति स्वतः सहेजी जाती है', 'वाचनाची प्रगती आपोआप सेव्ह होते')}
            </span>
          </div>

          {/* Prev / Next Navigation */}
          <div className="pt-4 flex items-center justify-between gap-4">
            {prev ? (
              <button
                onClick={() => {
                  setSelectedChapter(prev);
                  markRecentItem(prev.id, 'chapter', prev.titleEn, `Chapter ${prev.number}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{t3(lang, 'Previous Chapter', 'पिछला अध्याय', 'मागील अध्याय')}</span>
              </button>
            ) : <span />}

            {next ? (
              <button
                onClick={() => {
                  setSelectedChapter(next);
                  markRecentItem(next.id, 'chapter', next.titleEn, `Chapter ${next.number}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#157F66] hover:bg-[#126b56] text-white text-xs font-bold transition shadow-xs"
              >
                <span>{t3(lang, 'Next Chapter', 'अगला अध्याय', 'पुढील अध्याय')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : <span />}
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ── VIEW: BOOK DETAIL ─────────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════════
  if (view === 'bookDetail' && selectedBook) {
    const b = selectedBook;
    const readChapters = progress.chapterProgress[b.id] || [];
    const totalCh = b.chapters?.length || b.chapterCount || 1;
    const progressPct = Math.round((readChapters.length / totalCh) * 100);

    return (
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 py-6 space-y-6 animate-in fade-in duration-300 text-left">
        <button
          onClick={goHome}
          className="flex items-center gap-2 text-sm font-bold text-[#157F66] hover:underline cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> {t3(lang, 'Back to Learning Garden', 'लर्निंग गार्डन पर वापस', 'लर्निंग गार्डनवर परत')}
        </button>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className={`w-28 h-36 rounded-2xl bg-gradient-to-br ${b.coverGradient} flex items-center justify-center text-5xl shadow-md shrink-0`}>
              {b.coverEmoji}
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 text-[10px] font-bold uppercase tracking-wider">
                  {t3(lang, 'Book', 'पुस्तक', 'पुस्तक')}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold">
                  {b.topic === 'pregnancy' ? t3(lang, 'Pregnancy & Nutrition', 'गर्भावस्था एवं पोषण', 'गर्भावस्था व पोषण') : t3(lang, 'Mindfulness & Wellness', 'माइंडफुलनेस एवं वेलनेस', 'माइंडफुलनेस व वेलनेस')}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-50">
                {getField(b, 'title', lang)}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {getField(b, 'desc', lang)}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-500 dark:text-slate-400">
                <span><Clock className="w-3.5 h-3.5 inline mr-1 text-slate-400" />{b.readTime}</span>
                <span><BookOpen className="w-3.5 h-3.5 inline mr-1 text-slate-400" />{totalCh} {t3(lang, 'Chapters', 'अध्याय', 'अध्याय')}</span>
                <span><Globe className="w-3.5 h-3.5 inline mr-1 text-slate-400" />{t3(lang, 'Hindi · English · Marathi', 'हिंदी · English · मराठी', 'हिंदी · English · मराठी')}</span>
                <span className="text-slate-400 font-medium">✍️ {getField(b, 'author', lang)}</span>
              </div>

              {/* Progress Bar */}
              <div className="pt-3 space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-600 dark:text-slate-400">{t3(lang, 'Reading Progress', 'पढ़ाई की प्रगति', 'वाचनाची प्रगती')}</span>
                  <span className="text-[#157F66]">{progressPct}% ({readChapters.length}/{totalCh} {t3(lang, 'read', 'पढ़े', 'वाचले')})</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full rounded-full bg-[#157F66] transition-all duration-300" style={{ width: `${progressPct}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Chapters List */}
          <div className="mt-8 space-y-3">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>📖</span> {t3(lang, 'Chapter Contents', 'अध्याय सूची एवं विषयवस्तु', 'अध्याय सूची')}
            </h3>

            {(b.chapters || []).map(ch => {
              const isRead = readChapters.includes(ch.id);
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    setSelectedChapter(ch);
                    setView('chapterReader');
                    markRecentItem(ch.id, 'chapter', ch.titleEn, `Chapter ${ch.number}`);
                  }}
                  className="w-full flex items-center justify-between p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[#157F66] dark:hover:border-teal-500 bg-white dark:bg-slate-900 hover:bg-teal-50/30 dark:hover:bg-slate-800/60 transition text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${isRead ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                      {isRead ? '✓' : ch.number}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 group-hover:text-[#157F66] truncate">
                        {getField(ch, 'title', lang)}
                      </h4>
                      <span className="text-[11px] text-slate-400">{ch.readTime}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#157F66] shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ── VIEW: GITA CHAPTER DETAIL ─────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════════
  if (view === 'gitaChapterDetail' && selectedGitaCh) {
    const g = selectedGitaCh;
    const isCh2 = g.number === 2;
    const isCh9 = g.number === 9;
    const shlokasToRender = isCh9 ? gitaChapter9Shlokas : (isCh2 ? GITA_CH2_DETAIL.shlokas : []);
    const idx = GITA_CHAPTERS.findIndex(c => c.id === g.id);
    const prevCh = idx > 0 ? GITA_CHAPTERS[idx - 1] : null;
    const nextCh = idx < GITA_CHAPTERS.length - 1 ? GITA_CHAPTERS[idx + 1] : null;
    const isBookmarked = progress.bookmarks.includes(g.id);

    return (
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-6 space-y-6 animate-in fade-in duration-300 text-left">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setView(view === 'gitaChapterDetail' && selectedGitaCh ? 'gita' : 'home')}
            className="flex items-center gap-2 text-sm font-bold text-[#157F66] hover:underline cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> {t3(lang, 'Back to 18 Chapters', '18 अध्यायों की सूची पर वापस', '18 अध्यायांच्या यादीवर परत')}
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(g.id)}
              className={`p-2.5 rounded-xl border transition ${isBookmarked ? 'bg-amber-50 border-amber-300 text-amber-600 dark:bg-amber-950 dark:border-amber-800' : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700 dark:bg-slate-800 dark:border-slate-700'}`}
              title="Bookmark"
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-amber-600" /> : <Bookmark className="w-4 h-4" />}
            </button>
            <button
              onClick={() => handleListenAction(g, `Gita Chapter ${g.number}: ${getField(g, 'name', lang)}`)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-950 dark:text-amber-300 text-xs font-bold transition"
            >
              <Headphones className="w-4 h-4" />
              <span>{t3(lang, 'Listen Chanting', 'मंत्रोच्चार सुनें', 'मंत्रोच्चार ऐका')}</span>
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold">
              {t3(lang, 'Chapter', 'अध्याय', 'अध्याय')} {g.number}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {g.readTime}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">{g.shlokaCount} {t3(lang, 'Shlokas', 'श्लोक', 'श्लोक')}</span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50">
              {getField(g, 'name', lang)}
            </h1>
            <p className="text-sm text-amber-700 dark:text-amber-400 mt-2 font-medium italic">
              {g.maternalTheme}
            </p>
          </div>

          {/* Chapter Introduction */}
          <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-1.5">
              {t3(lang, 'Chapter Essence for Expecting Mothers', 'गर्भवती माताओं के लिए अध्याय का सार', 'गर्भवती मातांसाठी अध्यायाचा सार')}
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {isCh2 && t3(lang, GITA_CH2_DETAIL.introEn, GITA_CH2_DETAIL.introHi, GITA_CH2_DETAIL.introMr)}
              {isCh9 && t3(lang, GITA_CH9_DETAIL.introEn, GITA_CH9_DETAIL.introHi, GITA_CH9_DETAIL.introMr)}
              {!isCh2 && !isCh9 && getField(g, 'desc', lang)}
            </p>
          </div>

          {/* Render Shlokas */}
          {shlokasToRender.length > 0 ? (
            <div className="space-y-6 pt-4">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>🙏</span> {t3(lang, 'Sacred Shlokas & Meanings', 'पवित्र श्लोक एवं भावार्थ', 'पवित्र श्लोक व भावार्थ')}
              </h3>

              {shlokasToRender.map((sh, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300 text-[10px] font-bold">
                      {t3(lang, 'Shloka', 'श्लोक', 'श्लोक')} {sh.number}
                    </span>
                    <span className="text-[10px] text-slate-400">Bhagavad Gita {g.number}.{sh.number}</span>
                  </div>

                  {/* Sanskrit Shloka */}
                  <p className="text-base sm:text-lg font-serif text-amber-900 dark:text-amber-200 whitespace-pre-line leading-relaxed tracking-wide text-center py-2 bg-amber-50/40 dark:bg-slate-800/40 rounded-xl">
                    {sh.sanskrit}
                  </p>

                  {/* Transliteration */}
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic text-center">
                    {sh.transliteration}
                  </p>

                  {/* Simple Meaning */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      {t3(lang, 'Simple Meaning', 'सरल भावार्थ', 'सोपा अर्थ')}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                      {t3(lang, sh.meaningEn, sh.meaningHi, sh.meaningMr)}
                    </p>
                  </div>

                  {/* Maternal Message */}
                  {sh.maternalGuidance && (
                    <div className="p-3.5 rounded-xl bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-900">
                      <p className="text-[11px] font-bold text-pink-700 dark:text-pink-300 mb-1 flex items-center gap-1.5">
                        <span>🌸</span> {t3(lang, 'Message for Mother & Womb Child', 'माँ एवं गर्भस्थ शिशु के लिए संदेश', 'आई व बाळासाठी संदेश')}
                      </p>
                      <p className="text-xs text-pink-900 dark:text-pink-200 leading-relaxed">
                        {sh.maternalGuidance}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 text-center space-y-2">
              <span className="text-3xl block">🙏</span>
              <h4 className="font-bold text-sm text-amber-900 dark:text-amber-200">
                {t3(lang, 'Detailed Verse Translations Being Compiled', 'श्लोकों के प्रामाणिक अनुवाद संकलित किए जा रहे हैं', 'श्लोकांचे भाषांतर तयार केले जात आहे')}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                {t3(lang, 
                  `This chapter contains ${g.shlokaCount} shlokas. The comprehensive verse-by-verse commentary for expecting mothers is being prepared with Sanskrit scholars.`,
                  `इस अध्याय में ${g.shlokaCount} श्लोक हैं। गर्भवती माताओं के लिए विशेष सरल व्याख्या शीघ्र ही जोड़ी जाएगी।`,
                  `या अध्यायात ${g.shlokaCount} श्लोक आहेत. गर्भवती मातांसाठी विशेष भाष्य लवकरच उपलब्ध होईल.`
                )}
              </p>
            </div>
          )}

          {/* Prev / Next Chapters */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
            {prevCh ? (
              <button
                onClick={() => {
                  setSelectedGitaCh(prevCh);
                  markRecentItem(prevCh.id, 'gita', prevCh.nameEn, `Chapter ${prevCh.number}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{t3(lang, 'Previous Chapter', 'पिछला अध्याय', 'मागील अध्याय')}</span>
              </button>
            ) : <span />}

            {nextCh ? (
              <button
                onClick={() => {
                  setSelectedGitaCh(nextCh);
                  markRecentItem(nextCh.id, 'gita', nextCh.nameEn, `Chapter ${nextCh.number}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-xs"
              >
                <span>{t3(lang, 'Next Chapter', 'अगला अध्याय', 'पुढील अध्याय')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : <span />}
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ── VIEW: STORY READER ────────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════════
  if (view === 'storyReader' && selectedStory) {
    const s = selectedStory;
    const isBookmarked = progress.bookmarks.includes(s.id);

    return (
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-6 space-y-6 animate-in fade-in duration-300 text-left">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setView('stories')}
            className="flex items-center gap-2 text-sm font-bold text-[#157F66] hover:underline cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> {t3(lang, 'Back to Stories', 'कहानियों की सूची पर वापस', 'कथांच्या यादीवर परत')}
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(s.id)}
              className={`p-2.5 rounded-xl border transition ${isBookmarked ? 'bg-pink-50 border-pink-300 text-pink-600 dark:bg-pink-950 dark:border-pink-800' : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700 dark:bg-slate-800 dark:border-slate-700'}`}
              title="Bookmark"
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-pink-600" /> : <Bookmark className="w-4 h-4" />}
            </button>
            <button
              onClick={() => handleListenAction(s, getField(s, 'title', lang))}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-800 dark:bg-pink-950 dark:text-pink-300 text-xs font-bold transition"
            >
              <Headphones className="w-4 h-4" />
              <span>{t3(lang, 'Listen Story', 'कहानी सुनें', 'कथा ऐका')}</span>
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 text-xs font-bold uppercase">
              {t3(lang, 'Inspirational Story', 'प्रेरक कहानी', 'प्रेरणादायक कथा')}
            </span>
            {s.isOriginal && (
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold">
                {t3(lang, 'Original Maternal Narrative', 'मूल मातृत्व वृत्तांत', 'मूळ कथा')}
              </span>
            )}
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {s.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50 leading-tight">
            {getField(s, 'title', lang)}
          </h1>

          {/* Marathi Story Voice Audio Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-teal-50 dark:from-slate-800 dark:to-slate-850 border border-rose-200/80 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Volume2 className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  <span>{t3(lang, 'Listen Story in Marathi Voice', 'कथा मराठी आवाज में सुनें', 'कथा मराठी आवाजात ऐका')}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold">मराठी ऑडिओ</span>
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {t3(lang, 'Relax and listen to this inspiring motherhood journey in Marathi', 'मातृत्व प्रेरणादायक कहानी मराठी में सुनें', 'शांत बसा आणि ही प्रेरणादायी मातृत्व कथा मराठीत ऐका')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleListenAction(s, s.titleMr || getField(s, 'title', lang), 'mr')}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-rose-600/20 transition cursor-pointer active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>कथा मराठीत ऐका</span>
              </button>
            </div>
          </div>

          <article
            className="prose prose-slate dark:prose-invert max-w-none text-sm leading-relaxed text-slate-700 dark:text-slate-300"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(getField(s, 'content', lang)) }}
          />
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ── VIEW: KNOWLEDGE READER ────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════════
  if (view === 'knowledgeReader' && selectedKnowledge) {
    const k = selectedKnowledge;
    const isBookmarked = progress.bookmarks.includes(k.id);

    return (
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-6 space-y-6 animate-in fade-in duration-300 text-left">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setView('quotes')}
            className="flex items-center gap-2 text-sm font-bold text-[#157F66] hover:underline cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> {t3(lang, 'Back to Quotes & Knowledge', 'ज्ञान एवं उद्धरण पर वापस', 'ज्ञान व विचार यादीवर परत')}
          </button>
          <button
            onClick={() => toggleBookmark(k.id)}
            className={`p-2.5 rounded-xl border transition ${isBookmarked ? 'bg-teal-50 border-teal-300 text-teal-600 dark:bg-teal-950 dark:border-teal-800' : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700 dark:bg-slate-800 dark:border-slate-700'}`}
            title="Bookmark"
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-teal-600" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-xs font-bold">
              {t3(lang, 'Maternal Knowledge', 'मातृत्व ज्ञान', 'मातृत्व ज्ञान')}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {k.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50">
            {getField(k, 'title', lang)}
          </h1>

          <article
            className="prose prose-slate dark:prose-invert max-w-none text-sm leading-relaxed text-slate-700 dark:text-slate-300"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(getField(k, 'content', lang)) }}
          />
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ── VIEW: DEDICATED BOOKS LIBRARY ─────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════════
  if (view === 'books') {
    const filteredBooks = LEARNING_BOOKS.filter(b => {
      if (bookTopicFilter === 'all') return true;
      return b.category === bookTopicFilter;
    });

    return (
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 space-y-6 animate-in fade-in duration-300 text-left">
        <button
          onClick={goHome}
          className="flex items-center gap-2 text-sm font-bold text-[#157F66] hover:underline cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> {t3(lang, 'Back to Learning Garden', 'लर्निंग गार्डन पर वापस', 'लर्निंग गार्डनवर परत')}
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50">
              📚 {t3(lang, 'Maternal Books Library', 'मातृत्व पुस्तकालय', 'मातृत्व ग्रंथालय')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              {t3(lang, 
                'Original educational series on pregnancy, nutrition, newborn care, and maternal wellbeing.',
                'गर्भावस्था, पोषण, नवजात शिशु की देखभाल और भावनात्मक स्वास्थ्य पर मूल पुस्तकें।',
                'गर्भावस्था, पोषण, बाळ संगोपन आणि भावनिक आरोग्यावरील अभ्यासपूर्ण पुस्तके.'
              )}
            </p>
          </div>

          {/* Topic Filters */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: t3(lang, 'All Books', 'सभी पुस्तकें', 'सर्व पुस्तके') },
              { id: 'pregnancy', label: t3(lang, 'Pregnancy & Nutrition', 'गर्भावस्था एवं पोषण', 'गर्भावस्था व पोषण') },
              { id: 'wellness', label: t3(lang, 'Mindfulness & Wellness', 'माइंडफुलनेस एवं वेलनेस', 'माइंडफुलनेस व वेलनेस') }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setBookTopicFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${bookTopicFilter === tab.id ? 'bg-[#157F66] text-white shadow-xs' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBooks.map(b => {
            const readCh = progress.chapterProgress[b.id]?.length || 0;
            const totalCh = b.chapters?.length || b.chapterCount || 1;
            const pct = Math.round((readCh / totalCh) * 100);

            return (
              <div
                key={b.id}
                className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs hover:shadow-md hover:border-[#157F66] transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-14 h-18 rounded-xl bg-gradient-to-br ${b.coverGradient} flex items-center justify-center text-3xl shadow-sm shrink-0`}>
                      {b.coverEmoji}
                    </div>
                    <div className="min-w-0">
                      <span className="px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 text-[10px] font-bold uppercase">
                        {b.category === 'pregnancy' ? t3(lang, 'Pregnancy', 'गर्भावस्था', 'गर्भावस्था') : t3(lang, 'Wellness', 'वेलनेस', 'वेलनेस')}
                      </span>
                      <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 group-hover:text-[#157F66] mt-1 line-clamp-2">
                        {getField(b, 'title', lang)}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-3">
                    {getField(b, 'desc', lang)}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{b.chapterCount} {t3(lang, 'Chapters', 'अध्याय', 'अध्याय')}</span>
                    <span>{b.readTime}</span>
                  </div>

                  {pct > 0 && (
                    <div className="space-y-1">
                      <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div className="h-full rounded-full bg-[#157F66]" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-[10px] font-bold text-[#157F66] block text-right">{pct}% {t3(lang, 'read', 'पढ़ा', 'वाचले')}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => {
                        setSelectedBook(b);
                        setView('bookDetail');
                        markRecentItem(b.id, 'book', b.titleEn);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#157F66] hover:bg-[#126b56] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{t3(lang, 'Read Book', 'पुस्तक पढ़ें', 'पुस्तक वाचा')}</span>
                    </button>
                    <button
                      onClick={() => handleListenAction(b, getField(b, 'title', lang))}
                      className="p-2 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-800 dark:bg-pink-950 dark:text-pink-300 text-xs font-bold transition cursor-pointer"
                      title="Listen"
                    >
                      <Headphones className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ── VIEW: DEDICATED BHAGAVAD GITA — 18 CHAPTERS ───────────────────────────
  // ══════════════════════════════════════════════════════════════════════════
  if (view === 'gita') {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 space-y-6 animate-in fade-in duration-300 text-left">
        <button
          onClick={goHome}
          className="flex items-center gap-2 text-sm font-bold text-[#157F66] hover:underline cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> {t3(lang, 'Back to Learning Garden', 'लर्निंग गार्डन पर वापस', 'लर्निंग गार्डनवर परत')}
        </button>

        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6 sm:p-8 rounded-3xl border border-amber-200 dark:border-amber-900">
          <span className="px-3 py-1 rounded-full bg-amber-200/80 dark:bg-amber-950 text-amber-900 dark:text-amber-200 text-xs font-bold uppercase tracking-wider">
            🕉️ Shrimad Bhagavad Gita
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50 mt-2">
            {t3(lang, 'Bhagavad Gita — All 18 Chapters', 'श्रीमद्भगवद्गीता — संपूर्ण १८ अध्याय', 'श्रीमद्भगवद्गीता — संपूर्ण १८ अध्याय')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-2xl leading-relaxed">
            {t3(lang, 
              'Timeless spiritual wisdom curated to bring peace of mind, fearlessness, and divine maternal bliss to expecting mothers and their womb children.',
              'गर्भवती माताओं और उनके गर्भस्थ शिशुओं के लिए मानसिक शांति, अभय और दिव्य संस्कार प्रदान करने वाला शाश्वत ज्ञान।',
              'गर्भवती माता व गर्भातील बाळासाठी मनःशांती, अभय आणि दिव्य संस्कार देणारे शाश्वत ज्ञान.'
            )}
          </p>
        </div>

        {/* 18 Chapters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GITA_CHAPTERS.map(g => (
            <div
              key={g.id}
              className="p-5 rounded-3xl border border-amber-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md hover:border-amber-400 transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-bold">
                    {t3(lang, 'Chapter', 'अध्याय', 'अध्याय')} {g.number}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {g.readTime}
                  </span>
                </div>

                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-amber-700 dark:group-hover:text-amber-400">
                  {getField(g, 'name', lang)}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {getField(g, 'desc', lang)}
                </p>
                <p className="text-[11px] text-amber-700/90 dark:text-amber-400/80 mt-2 italic line-clamp-2">
                  {g.maternalTheme}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 mt-3">
                <button
                  onClick={() => {
                    setSelectedGitaCh(g);
                    setView('gitaChapterDetail');
                    markRecentItem(g.id, 'gita', g.nameEn, `Chapter ${g.number}`);
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{t3(lang, 'Read Chapter', 'अध्याय पढ़ें', 'अध्याय वाचा')}</span>
                </button>
                <button
                  onClick={() => handleListenAction(g, `Gita Chapter ${g.number}: ${getField(g, 'name', lang)}`)}
                  className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-950 dark:text-amber-300 text-xs font-bold transition cursor-pointer"
                  title="Listen"
                >
                  <Headphones className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ── VIEW: DEDICATED INSPIRATIONAL STORIES ─────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════════
  if (view === 'stories') {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 space-y-6 animate-in fade-in duration-300 text-left">
        <button
          onClick={goHome}
          className="flex items-center gap-2 text-sm font-bold text-[#157F66] hover:underline cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> {t3(lang, 'Back to Learning Garden', 'लर्निंग गार्डन पर वापस', 'लर्निंग गार्डनवर परत')}
        </button>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50">
            💖 {t3(lang, 'Inspirational Stories Library', 'प्रेरक कहानियाँ एवं मातृत्व अनुभव', 'प्रेरणादायक कथा व मातृत्व अनुभव')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            {t3(lang,
              'Real-inspired journeys of maternal hope, family support, emotional resilience, and quiet strength.',
              'मातृत्व की आशा, पारिवारिक स्नेह, भावनात्मक धीरज और शांत शक्ति की मूल प्रेरक कहानियां।',
              'मातृत्वाची आशा, कौटुंबिक प्रेम आणि धैर्याच्या सुंदर प्रेरणादायी कथा.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LEARNING_STORIES.map(s => (
            <div
              key={s.id}
              className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs hover:shadow-md hover:border-rose-300 transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.coverGradient} flex items-center justify-center text-2xl shadow-sm shrink-0`}>
                    {s.coverEmoji}
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 text-[10px] font-bold uppercase">
                      {t3(lang, 'Story', 'कहानी', 'कथा')}
                    </span>
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 group-hover:text-rose-600 mt-1 line-clamp-2">
                      {getField(s, 'title', lang)}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-2">
                  {getField(s, 'desc', lang)}
                </p>

                {s.isOriginal && (
                  <span className="text-[10px] text-slate-400 italic block mb-2">
                    ✍️ {t3(lang, 'Original Maternal Narrative', 'मूल मातृत्व वृत्तांत', 'मूळ कथा')}
                  </span>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedStory(s);
                    setView('storyReader');
                    markRecentItem(s.id, 'story', s.titleEn);
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{t3(lang, 'Read Story', 'कहानी पढ़ें', 'कथा वाचा')}</span>
                </button>
                <button
                  onClick={() => handleListenAction(s, getField(s, 'title', lang))}
                  className="p-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 dark:bg-rose-950 dark:text-rose-300 text-xs font-bold transition cursor-pointer"
                  title="Listen"
                >
                  <Headphones className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ── VIEW: DEDICATED QUOTES & KNOWLEDGE ────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════════
  if (view === 'quotes') {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 space-y-6 animate-in fade-in duration-300 text-left">
        <button
          onClick={goHome}
          className="flex items-center gap-2 text-sm font-bold text-[#157F66] hover:underline cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> {t3(lang, 'Back to Learning Garden', 'लर्निंग गार्डन पर वापस', 'लर्निंग गार्डनवर परत')}
        </button>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50">
            ✨ {t3(lang, 'Quotes & Knowledge Collection', 'उद्धरण एवं ज्ञान संग्रह', 'विचार व ज्ञान संग्रह')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            {t3(lang,
              'Daily positive affirmations, spiritual wisdom, science-backed pregnancy facts, and parenting knowledge.',
              'दैनिक सकारात्मक विचार, आध्यात्मिक वचन, गर्भावस्था के वैज्ञानिक तथ्य और परवरिश का ज्ञान।',
              'सकारात्मक विचार, आध्यात्मिक शिकवण, वैज्ञानिक तथ्य आणि पालकत्व ज्ञान.'
            )}
          </p>
        </div>

        {/* Quotes Section */}
        <div className="space-y-4">
          <h2 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>💬</span> {t3(lang, 'Daily Positive Quotes & Spiritual Wisdom', 'दैनिक सकारात्मक उद्धरण एवं आत्म-विश्वास', 'सकारात्मक विचार व आध्यात्मिक ज्ञान')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LEARNING_QUOTES.map(q => {
              const isCopied = copiedQuoteId === q.id;
              const isBookmarked = progress.bookmarks.includes(q.id);

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-3xl bg-gradient-to-br ${q.color} text-white shadow-xs flex flex-col justify-between space-y-4 relative overflow-hidden`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-[10px] font-bold">
                      {q.badge || '🌸 Quote'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopyQuote(q)}
                        className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition text-white"
                        title="Copy Quote"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => toggleBookmark(q.id)}
                        className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition text-white"
                        title="Bookmark"
                      >
                        {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5 text-amber-200" /> : <Bookmark className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <p className="text-sm font-semibold leading-relaxed">
                    "{getField(q, 'text', lang)}"
                  </p>

                  <p className="text-[11px] opacity-85 font-medium pt-2 border-t border-white/20">
                    — {getField(q, 'source', lang)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Knowledge Articles Section */}
        <div className="space-y-4 pt-6">
          <h2 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>💡</span> {t3(lang, 'Educational Knowledge Articles', 'ज्ञानवर्धक लेख एवं वैज्ञानिक तथ्य', 'माहितीपूर्ण लेख व वैज्ञानिक तथ्य')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LEARNING_KNOWLEDGE.map(k => (
              <div
                key={k.id}
                className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-[10px] font-bold">
                    {k.readTime}
                  </span>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-[#157F66] mt-2">
                    {getField(k, 'title', lang)}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-3 leading-relaxed">
                    {getField(k, 'desc', lang)}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedKnowledge(k);
                    setView('knowledgeReader');
                    markRecentItem(k.id, 'knowledge', k.titleEn);
                  }}
                  className="mt-4 py-2 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#157F66] dark:text-teal-300 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{t3(lang, 'Read Article', 'लेख पढ़ें', 'लेख वाचा')}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ── VIEW: MAIN HOME PAGE (MATCHING DESIGN REFERENCE) ──────────────────────
  // ══════════════════════════════════════════════════════════════════════════
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8 animate-in fade-in duration-300 text-left">

      {/* Honest Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-white dark:bg-slate-900 border-2 border-pink-400 dark:border-pink-600 p-4 rounded-2xl shadow-xl flex items-start gap-3 animate-in slide-in-from-bottom duration-300">
          <span className="text-2xl">🎧</span>
          <div className="flex-1">
            <h4 className="font-extrabold text-xs text-slate-900 dark:text-slate-100">{toastMessage.title}</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{toastMessage.body}</p>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── A. HERO SECTION (MATCHING DESIGN REFERENCE) ── */}
      <div className="relative bg-gradient-to-r from-pink-50 via-rose-50/70 to-amber-50/60 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6 sm:p-10 rounded-3xl border border-pink-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 text-xs font-bold">
              <span>🌱</span>
              <span>{t3(lang, 'Learning Garden', 'लर्निंग गार्डन', 'लर्निंग गार्डन')}</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
                {t3(lang, 'Read. Listen. Learn. Grow.', 'पढ़ें। सुनें। सीखें। बढ़ें।', 'वाचा. ऐका. शिका. वाढा.')}
              </h1>
              <p className="text-sm sm:text-base font-semibold text-rose-700 dark:text-rose-300 mt-1">
                {t3(lang, 'Welcome to Your Learning Garden', 'आपके अपने लर्निंग गार्डन में स्वागत है', 'आपल्या लर्निंग गार्डनमध्ये स्वागत आहे')}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                {t3(lang,
                  'Discover meaningful books, spiritual wisdom, inspiring stories, and knowledge to nurture yourself throughout your pregnancy journey.',
                  'सार्थक पुस्तकें, भगवद्गीता का दिव्य ज्ञान, प्रेरक कहानियां और वैज्ञानिक मार्गदर्शन — आपकी मातृत्व यात्रा को सुंदर और शांत बनाने के लिए।',
                  'अर्थपूर्ण पुस्तके, भगवद्गीतेचे ज्ञान, प्रेरणादायी कथा आणि शास्त्रीय मार्गदर्शन — आपला मातृत्व प्रवास शांत आणि सुंदर करण्यासाठी.'
                )}
              </p>
            </div>

            {/* Feature Badges */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                <span>🎧</span> {t3(lang, 'Human-narrated audio', 'मानव-वाचित ऑडियो', 'मानवी वाचन ऑडिओ')}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                <span>🌐</span> {t3(lang, 'Hindi · English · Marathi (3 Languages)', 'हिंदी · English · मराठी (३ भाषा)', 'हिंदी · English · मराठी (३ भाषा)')}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                <span>🔖</span> {t3(lang, 'Save & continue anytime', 'सेव करें व कभी भी जारी रखें', 'सेव्ह करा व कधीही सुरू ठेवा')}
              </span>
            </div>
          </div>

          {/* Inspirational Visual Quote Banner on Right */}
          <div className="w-full lg:w-80 p-5 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-pink-200/80 dark:border-slate-700 shadow-sm space-y-3 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 dark:bg-pink-950/70 border border-pink-200 dark:border-pink-900 flex items-center justify-center text-2xl shrink-0">
                🤰
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  {t3(lang, 'Maternal Affirmation', 'मातृत्व प्रेरणा', 'मातृत्व प्रेरणा')}
                </span>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                  {t3(lang, 'A calm mother nurtures a peaceful child.', 'शांत माँ, स्वस्थ और सुखी शिशु।', 'शांत आई, सुदृढ व सुखी बाळ.')}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-700">
              "{t3(lang,
                'A positive mind nurtures a healthier tomorrow for you and your baby ♥',
                'सकारात्मक मन आपके और आपके शिशु के लिए एक सुंदर कल का निर्माण करता है ♥',
                'सकारात्मक मन आपल्या आणि बाळाच्या उज्ज्वल उद्याची पायाभरणी करते ♥'
              )}"
            </p>
          </div>
        </div>
      </div>

      {/* ── B. SEARCH & DIRECT LANGUAGE SELECTOR (MATCHING REFERENCE) ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t3(lang, 'Search books, chapters, stories, quotes...', 'पुस्तकें, अध्याय, कहानियां, उद्धरण खोजें...', 'पुस्तके, अध्याय, कथा, विचार शोधा...')}
            className="w-full pl-11 pr-10 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#157F66] transition shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Trilingual Direct Language Dropdown Selector */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs shrink-0">
          <Globe className="w-4 h-4 text-[#157F66] shrink-0" />
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300 shrink-0">
            {t3(lang, 'Language:', 'भाषा:', 'भाषा:')}
          </span>
          <div className="flex items-center gap-1">
            {[
              { code: 'hi', label: 'हिंदी' },
              { code: 'en', label: 'English' },
              { code: 'mr', label: 'मराठी' }
            ].map(l => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition ${lang === l.code ? 'bg-[#157F66] text-white shadow-2xs' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Search Results Dropdown/Box */}
      {searchResults && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100">
              🔍 {searchResults.length} {t3(lang, 'Results Found', 'परिणाम मिले', 'निकाल सापडले')}
            </h3>
            <button onClick={() => setSearchQuery('')} className="text-xs text-slate-400 hover:text-slate-600">
              {t3(lang, 'Clear', 'साफ़ करें', 'साफ करा')}
            </button>
          </div>

          {searchResults.length === 0 ? (
            <p className="text-xs text-slate-500 py-3">
              {t3(lang, 'No matching content found. Try keywords like "nutrition", "gita", "breath", or "baby".', 'कोई परिणाम नहीं मिला। कृपया अन्य शब्द खोजें।', 'काहीही सापडले नाही. कृपया वेगळा शब्द शोधा.')}
            </p>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-y-auto no-scrollbar">
              {searchResults.map((r, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (r.type === 'book') { setSelectedBook(r.item); setView('bookDetail'); }
                    else if (r.type === 'chapter') { setSelectedBook(r.parent); setSelectedChapter(r.item); setView('chapterReader'); }
                    else if (r.type === 'gita') { setSelectedGitaCh(r.item); setView('gitaChapterDetail'); }
                    else if (r.type === 'story') { setSelectedStory(r.item); setView('storyReader'); }
                    else if (r.type === 'knowledge') { setSelectedKnowledge(r.item); setView('knowledgeReader'); }
                    setSearchQuery('');
                  }}
                  className="w-full text-left py-2.5 px-2 hover:bg-teal-50/50 dark:hover:bg-slate-800 rounded-xl transition flex items-center justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold uppercase shrink-0">
                      {r.type}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#157F66] truncate">
                      {r.title}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#157F66] shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {!searchResults && (
        <>
          {/* ── C. FOUR MAIN CATEGORY CARDS (MATCHING DESIGN REFERENCE) ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Books */}
            <div
              onClick={() => setView('books')}
              className="p-5 rounded-3xl bg-gradient-to-br from-pink-100/90 via-rose-50 to-pink-100/60 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border border-pink-200 dark:border-pink-900 shadow-2xs hover:shadow-md transition text-left cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/90 dark:bg-slate-800 flex items-center justify-center text-2xl shadow-2xs mb-3 group-hover:scale-105 transition">
                  📖
                </div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-50 group-hover:text-rose-600 transition">
                  {t3(lang, 'Books', 'पुस्तकें', 'पुस्तके')}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                  {t3(lang, 'Pregnancy, nutrition and baby care', 'गर्भावस्था, पोषण और शिशु देखभाल', 'गर्भावस्था, पोषण आणि बाळ संगोपन')}
                </p>
              </div>
              <div className="pt-4 flex items-center justify-between">
                <span className="text-[11px] font-bold text-rose-700 dark:text-rose-400">50+ chapters</span>
                <span className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center group-hover:translate-x-0.5 transition">
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Card 2: Bhagavad Gita */}
            <div
              onClick={() => setView('gita')}
              className="p-5 rounded-3xl bg-gradient-to-br from-amber-100/90 via-orange-50 to-amber-100/60 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border border-amber-200 dark:border-amber-900 shadow-2xs hover:shadow-md transition text-left cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/90 dark:bg-slate-800 flex items-center justify-center text-2xl shadow-2xs mb-3 group-hover:scale-105 transition">
                  🙏
                </div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-50 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition">
                  {t3(lang, 'Bhagavad Gita', 'भगवद्गीता', 'भगवद्गीता')}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                  {t3(lang, '18 chapters, shlokas and explanations', '18 अध्याय, श्लोक और व्याख्या', '18 अध्याय, श्लोक आणि व्याख्या')}
                </p>
              </div>
              <div className="pt-4 flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400">700+ shlokas & meanings</span>
                <span className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center group-hover:translate-x-0.5 transition">
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Card 3: Stories */}
            <div
              onClick={() => setView('stories')}
              className="p-5 rounded-3xl bg-gradient-to-br from-rose-100/90 via-pink-50 to-purple-100/60 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border border-rose-200 dark:border-rose-900 shadow-2xs hover:shadow-md transition text-left cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/90 dark:bg-slate-800 flex items-center justify-center text-2xl shadow-2xs mb-3 group-hover:scale-105 transition">
                  💖
                </div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-50 group-hover:text-rose-600 transition">
                  {t3(lang, 'Stories', 'कहानियाँ', 'कथा')}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                  {t3(lang, 'Inspirational and real-life journeys', 'प्रेरक और वास्तविक यात्राएं', 'प्रेरणादायक आणि वास्तविक प्रवास')}
                </p>
              </div>
              <div className="pt-4 flex items-center justify-between">
                <span className="text-[11px] font-bold text-rose-700 dark:text-rose-400">100+ stories</span>
                <span className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center group-hover:translate-x-0.5 transition">
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Card 4: Quotes & Knowledge */}
            <div
              onClick={() => setView('quotes')}
              className="p-5 rounded-3xl bg-gradient-to-br from-teal-100/90 via-emerald-50 to-teal-100/60 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border border-teal-200 dark:border-teal-900 shadow-2xs hover:shadow-md transition text-left cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/90 dark:bg-slate-800 flex items-center justify-center text-2xl shadow-2xs mb-3 group-hover:scale-105 transition">
                  💡
                </div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-50 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition">
                  {t3(lang, 'Quotes & Knowledge', 'उद्धरण और ज्ञान', 'विचार व ज्ञान')}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                  {t3(lang, 'Positive thoughts, interesting facts and learning', 'सकारात्मक विचार, रोचक तथ्य और सीख', 'सकारात्मक विचार, तथ्य आणि शिक्षण')}
                </p>
              </div>
              <div className="pt-4 flex items-center justify-between">
                <span className="text-[11px] font-bold text-teal-700 dark:text-teal-400">200+ articles</span>
                <span className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center group-hover:translate-x-0.5 transition">
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>

          {/* ── D. CONTINUE YOUR JOURNEY BANNER (MATCHING DESIGN REFERENCE) ── */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-base text-slate-900 dark:text-slate-50 flex items-center gap-2">
                <span>🔄</span>
                <span>{t3(lang, 'Continue Your Journey', 'अपनी यात्रा जारी रखें', 'आपला प्रवास सुरू ठेवा')}</span>
              </h2>
              <button
                onClick={() => setView('books')}
                className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
              >
                <span>{t3(lang, 'View All', 'सभी देखें', 'सर्व पहा')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-16 h-20 rounded-2xl bg-gradient-to-br from-pink-300 via-rose-300 to-pink-400 flex items-center justify-center text-3xl shadow-sm shrink-0">
                  🤱
                </div>
                <div className="space-y-1.5 min-w-0">
                  <span className="px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 text-[10px] font-bold uppercase">
                    BOOK
                  </span>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 truncate">
                    {t3(lang, 'Healthy Pregnancy: Month-by-Month Guide', 'स्वस्थ गर्भावस्था: माह-दर-माह मार्गदर्शिका', 'निरोगी गर्भावस्था: महिन्यागणिक मार्गदर्शिका')}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t3(lang, 'Last read: Month 2 – Baby Development', 'पिछला पढ़ा: माह 2 – शिशु के अंग बनते हैं', 'शेवटचे वाचले: महिना 2 – बाळाचे अवयव')}
                  </p>
                  <div className="flex items-center gap-2 w-48 max-w-full">
                    <div className="flex-1 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full rounded-full bg-rose-500" style={{ width: '35%' }} />
                    </div>
                    <span className="text-[10px] font-bold text-rose-500">35%</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Matching Reference */}
              <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
                <button
                  onClick={() => handleListenAction(LEARNING_BOOKS[0], 'Month 2 – Baby Features Form')}
                  className="flex-1 md:flex-none px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{t3(lang, 'Continue Listening (12 min left)', 'सुनना जारी रखें (12 मिनट शेष)', 'ऐकणे सुरू ठेवा (12 मिनिटे शिल्लक)')}</span>
                </button>
                <button
                  onClick={() => {
                    const b = LEARNING_BOOKS[0];
                    setSelectedBook(b);
                    setSelectedChapter(b.chapters[1]);
                    setView('chapterReader');
                  }}
                  className="flex-1 md:flex-none px-4 py-2.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-rose-600" />
                  <span>{t3(lang, 'Continue Reading', 'पढ़ना जारी रखें', 'वाचन सुरू ठेवा')}</span>
                </button>
              </div>
            </div>
          </div>

          {/* ── E. FEATURED THIS WEEK & FILTER TABS (MATCHING REFERENCE) ── */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="font-extrabold text-base text-slate-900 dark:text-slate-50 flex items-center gap-2">
                  <span>⭐</span>
                  <span>{t3(lang, 'Featured This Week', 'इस सप्ताह विशेष', 'या आठवड्याचे विशेष')}</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {t3(lang, 'Handpicked for you to read, listen and grow.', 'आपके पढ़ने, सुनने और सीखने के लिए विशेष चयन।', 'आपल्या वाचन, मनन आणि अभ्यासासाठी खास निवड.')}
                </p>
              </div>
              <button
                onClick={() => setView('books')}
                className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                <span>{t3(lang, 'View All', 'सभी देखें', 'सर्व पहा')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Filter Tabs Matching Reference */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {[
                { id: 'popular', label: t3(lang, 'Most Popular', 'सर्वाधिक लोकप्रिय', 'सर्वात लोकप्रिय') },
                { id: 'latest', label: t3(lang, 'Latest', 'नवीनतम', 'नवीनतम') },
                { id: 'short', label: t3(lang, 'Short Reads', 'छोटे पाठ', 'लहान वाचन') },
                { id: 'audio', label: t3(lang, 'Audio Only', 'केवल ऑडियो', 'फक्त ऑडिओ') },
                { id: 'all', label: t3(lang, 'All Content', 'सभी सामग्री', 'सर्व सामग्री') }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${activeFilter === f.id ? 'bg-rose-500 text-white shadow-2xs' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-rose-300'}`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* 4 Featured Cards Matching Reference */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Featured 1: BOOK - Nutrition */}
              <div
                onClick={() => {
                  const b = LEARNING_BOOKS[1];
                  setSelectedBook(b);
                  setView('bookDetail');
                }}
                className="p-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition text-left cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="w-full h-32 rounded-2xl bg-gradient-to-br from-amber-200 via-orange-200 to-amber-300 flex items-center justify-center text-4xl shadow-2xs mb-3">
                    🥗
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 text-[10px] font-bold uppercase">
                    BOOK
                  </span>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 group-hover:text-rose-600 mt-1 line-clamp-1">
                    {t3(lang, 'Nutrition for a Healthy Pregnancy', 'गर्भावस्था पोषण एवं भोजन सुरक्षा', 'गर्भावस्था पोषण व अन्न सुरक्षा')}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                    {t3(lang, 'Simple and practical food guidance.', 'सरल एवं व्यावहारिक आहार निर्देश।', 'सोपे आणि प्रात्यक्षिक आहार नियम.')}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 mt-3">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 15 min</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleListenAction(LEARNING_BOOKS[1]);
                    }}
                    className="w-7 h-7 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center transition active:scale-95 cursor-pointer shadow-xs"
                    title="Play Audio"
                  >
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </button>
                </div>
              </div>

              {/* Featured 2: GITA - Chapter 2 */}
              <div
                onClick={() => {
                  const g = GITA_CHAPTERS[1];
                  setSelectedGitaCh(g);
                  setView('gitaChapterDetail');
                }}
                className="p-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition text-left cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="w-full h-32 rounded-2xl bg-gradient-to-br from-amber-200 via-yellow-200 to-orange-300 flex items-center justify-center text-4xl shadow-2xs mb-3">
                    🙏
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-bold uppercase">
                    GITA
                  </span>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 group-hover:text-amber-700 mt-1 line-clamp-1">
                    {t3(lang, 'Chapter 2 Sankhya Yoga', 'अध्याय २ सांख्य योग', 'अध्याय २ सांख्य योग')}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                    {t3(lang, 'The eternal wisdom of life and soul.', 'जीवन और आत्मा की अमर बुद्धिमत्ता।', 'जीवन व आत्म्याचे गूढ ज्ञान.')}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 mt-3">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 20 min</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleListenAction(GITA_CHAPTERS[1]);
                    }}
                    className="w-7 h-7 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center transition active:scale-95 cursor-pointer shadow-xs"
                    title="Play Audio"
                  >
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </button>
                </div>
              </div>

              {/* Featured 3: STORY - Overcoming Anxiety */}
              <div
                onClick={() => {
                  const s = LEARNING_STORIES[2];
                  setSelectedStory(s);
                  setView('storyReader');
                }}
                className="p-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition text-left cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="w-full h-32 rounded-2xl bg-gradient-to-br from-teal-200 via-emerald-200 to-teal-300 flex items-center justify-center text-4xl shadow-2xs mb-3">
                    🕊️
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 text-[10px] font-bold uppercase">
                    STORY
                  </span>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 group-hover:text-rose-600 mt-1 line-clamp-1">
                    {t3(lang, 'Overcoming Pregnancy Anxiety', 'चिंता पर विजय', 'चिंतेवर मात')}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                    {t3(lang, 'A real story of hope and strength.', 'आशा और आंतरिक शक्ति की सच्ची कहानी।', 'आशा व धैर्याची खरी गोष्ट.')}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 mt-3">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 10 min</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleListenAction(LEARNING_STORIES[2]);
                    }}
                    className="w-7 h-7 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center transition active:scale-95 cursor-pointer shadow-xs"
                    title="Play Audio"
                  >
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </button>
                </div>
              </div>

              {/* Featured 4: QUOTES - Self-Care */}
              <div
                onClick={() => {
                  const k = LEARNING_KNOWLEDGE[1];
                  setSelectedKnowledge(k);
                  setView('knowledgeReader');
                }}
                className="p-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition text-left cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="w-full h-32 rounded-2xl bg-gradient-to-br from-emerald-200 via-teal-200 to-green-300 flex items-center justify-center text-4xl shadow-2xs mb-3">
                    🌿
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-[10px] font-bold uppercase">
                    KNOWLEDGE
                  </span>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 group-hover:text-teal-600 mt-1 line-clamp-1">
                    {t3(lang, 'Self-Care Tips for a Calmer Mind', 'शांत मन के लिए स्व-देखभाल', 'शांत मनासाठी स्व-काळजी')}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                    {t3(lang, 'Simple ways to take care of yourself daily.', 'प्रतिदिन अपना ख्याल रखने के सरल उपाय।', 'दररोज स्वतःची काळजी घेण्याचे सोपे उपाय.')}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 mt-3">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 8 min</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleListenAction(LEARNING_KNOWLEDGE[1]);
                    }}
                    className="w-7 h-7 rounded-full bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center transition active:scale-95 cursor-pointer shadow-xs"
                    title="Play Audio"
                  >
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── F. POPULAR BOOKS (MATCHING DESIGN REFERENCE) ── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-extrabold text-base text-slate-900 dark:text-slate-50 flex items-center gap-2">
                  <span>📖</span>
                  <span>{t3(lang, 'Popular Books', 'लोकप्रिय पुस्तकें', 'लोकप्रिय पुस्तके')}</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {t3(lang, 'Complete guides to support you at every stage of your pregnancy.', 'गर्भावस्था के प्रत्येक चरण में आपका मार्गदर्शन करने वाली संपूर्ण पुस्तकें।', 'गर्भावस्थेच्या प्रत्येक टप्प्यावर मार्गदर्शन करणारी संपूर्ण पुस्तके.')}
                </p>
              </div>
              <button
                onClick={() => setView('books')}
                className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
              >
                <span>{t3(lang, 'View All', 'सभी देखें', 'सर्व पहा')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {LEARNING_BOOKS.slice(0, 4).map((b, i) => {
                const readCh = progress.chapterProgress[b.id]?.length || 0;
                const totalCh = b.chapters?.length || b.chapterCount || 1;
                const pct = Math.round((readCh / totalCh) * 100);

                return (
                  <div
                    key={b.id}
                    className="p-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition text-left flex flex-col justify-between group"
                  >
                    <div>
                      <div className={`w-full h-36 rounded-2xl bg-gradient-to-br ${b.coverGradient} flex items-center justify-center text-4xl shadow-xs mb-3`}>
                        {b.coverEmoji}
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 text-[10px] font-bold uppercase">
                        BOOK
                      </span>
                      <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 group-hover:text-rose-600 mt-1 line-clamp-1">
                        {getField(b, 'title', lang)}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                        {getField(b, 'desc', lang)}
                      </p>
                      <span className="text-[11px] font-bold text-slate-400 block mt-1">
                        {b.chapterCount} {t3(lang, 'Chapters', 'अध्याय', 'अध्याय')}
                      </span>

                      {pct > 0 && (
                        <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mt-2">
                          <div className="h-full rounded-full bg-rose-500" style={{ width: `${pct}%` }} />
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 mt-3">
                      <button
                        onClick={() => handleListenAction(b, getField(b, 'title', lang))}
                        className="flex-1 py-1.5 px-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-300 text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer"
                      >
                        <Headphones className="w-3.5 h-3.5" />
                        <span>{t3(lang, 'Listen', 'सुनें', 'ऐका')}</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedBook(b);
                          setView('bookDetail');
                        }}
                        className="flex-1 py-1.5 px-2 rounded-xl bg-[#157F66] hover:bg-[#126b56] text-white text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{t3(lang, 'Read', 'पढ़ें', 'वाचा')}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── G. BHAGAVAD GITA — 18 CHAPTERS (MATCHING DESIGN REFERENCE) ── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-extrabold text-base text-slate-900 dark:text-slate-50 flex items-center gap-2">
                  <span>🙏</span>
                  <span>{t3(lang, 'Bhagavad Gita — 18 Chapters', 'भगवद्गीता — 18 अध्याय', 'भगवद्गीता — 18 अध्याय')}</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {t3(lang, 'Explore the timeless wisdom for a peaceful and meaningful life.', 'शांति और पावन मातृत्व के लिए शाश्वत ज्ञान का अन्वेषण करें।', 'शांत आणि अर्थपूर्ण जीवनासाठी शाश्वत ज्ञान मिळवा.')}
                </p>
              </div>
              <button
                onClick={() => setView('gita')}
                className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1"
              >
                <span>{t3(lang, 'View All', 'सभी देखें', 'सर्व पहा')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {GITA_CHAPTERS.slice(0, 4).map(g => (
                <div
                  key={g.id}
                  className="p-4 rounded-3xl border border-amber-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition text-left flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-full h-32 rounded-2xl bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200 flex items-center justify-center text-4xl shadow-2xs mb-3">
                      {g.number === 1 ? '🏹' : (g.number === 2 ? '🦚' : (g.number === 3 ? '🧘' : '📖'))}
                    </div>
                    <span className="text-[11px] font-extrabold text-amber-800 dark:text-amber-400">
                      {t3(lang, 'Chapter', 'अध्याय', 'अध्याय')} {g.number}
                    </span>
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 group-hover:text-amber-700 mt-0.5 line-clamp-1">
                      {getField(g, 'name', lang)}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                      {getField(g, 'desc', lang)}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 mt-3">
                    <button
                      onClick={() => {
                        setSelectedGitaCh(g);
                        setView('gitaChapterDetail');
                      }}
                      className="flex-1 py-1.5 px-2 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-slate-800 text-amber-900 dark:text-amber-300 text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{t3(lang, 'Read', 'पढ़ें', 'वाचा')}</span>
                    </button>
                    <button
                      onClick={() => handleListenAction(g, `Gita Chapter ${g.number}: ${getField(g, 'name', lang)}`)}
                      className="flex-1 py-1.5 px-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer"
                    >
                      <Headphones className="w-3.5 h-3.5" />
                      <span>{t3(lang, 'Listen', 'सुनें', 'ऐका')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── H. TWO-COLUMN BOTTOM SECTION (MATCHING DESIGN REFERENCE) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
            {/* Left: Inspirational Stories */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-extrabold text-base text-slate-900 dark:text-slate-50 flex items-center gap-2">
                    <span>💖</span>
                    <span>{t3(lang, 'Inspirational Stories', 'प्रेरक कहानियाँ', 'प्रेरणादायक कथा')}</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t3(lang, 'Real experiences, real emotions, real inspiration.', 'सच्चे अनुभव, सच्ची भावनाएं, सच्ची प्रेरणा।', 'खरे अनुभव, खरी प्रेरणा.')}
                  </p>
                </div>
                <button
                  onClick={() => setView('stories')}
                  className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
                >
                  <span>{t3(lang, 'View All', 'सभी देखें', 'सर्व पहा')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {LEARNING_STORIES.slice(0, 3).map(s => (
                  <div
                    key={s.id}
                    onClick={() => {
                      setSelectedStory(s);
                      setView('storyReader');
                    }}
                    className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition text-left cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className={`w-full h-24 rounded-xl bg-gradient-to-br ${s.coverGradient} flex items-center justify-center text-3xl shadow-2xs mb-2`}>
                        {s.coverEmoji}
                      </div>
                      <h4 className="font-extrabold text-xs text-slate-900 dark:text-slate-100 group-hover:text-rose-600 line-clamp-1">
                        {getField(s, 'title', lang)}
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                        {getField(s, 'desc', lang)}
                      </p>
                    </div>
                    <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400 mt-2">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {s.readTime}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleListenAction(s, getField(s, 'title', lang));
                        }}
                        className="w-5 h-5 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center transition active:scale-95 cursor-pointer shadow-xs"
                        title="Play Audio"
                      >
                        <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Quotes & Knowledge */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-extrabold text-base text-slate-900 dark:text-slate-50 flex items-center gap-2">
                    <span>💡</span>
                    <span>{t3(lang, 'Quotes & Knowledge', 'उद्धरण एवं ज्ञान', 'विचार व ज्ञान')}</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t3(lang, 'Daily inspiration and useful knowledge for your journey.', 'आपकी यात्रा के लिए दैनिक प्रेरणा और ज्ञान।', 'आपल्या प्रवासासाठी दैनंदिन प्रेरणा व ज्ञान.')}
                  </p>
                </div>
                <button
                  onClick={() => setView('quotes')}
                  className="text-xs font-bold text-teal-600 hover:underline flex items-center gap-1"
                >
                  <span>{t3(lang, 'View All', 'सभी देखें', 'सर्व पहा')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {/* Mini Card 1: Daily Positive Quotes */}
                <div
                  onClick={() => setView('quotes')}
                  className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition text-left cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-full h-24 rounded-xl bg-gradient-to-br from-pink-300 via-rose-300 to-purple-400 flex items-center justify-center text-3xl shadow-2xs mb-2">
                      🌸
                    </div>
                    <h4 className="font-extrabold text-xs text-slate-900 dark:text-slate-100 group-hover:text-teal-600 line-clamp-1">
                      {t3(lang, 'Daily Positive Quotes', 'दैनिक सकारात्मक विचार', 'दैनिक सकारात्मक विचार')}
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                      {t3(lang, 'Short quotes for a calm mind.', 'शांत मन के लिए प्रेरणादायक विचार।', 'शांत मनासाठी सुंदर विचार.')}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400 mt-2">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 5 min</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleListenAction(LEARNING_QUOTES[0], 'Daily Positive Quotes');
                      }}
                      className="w-5 h-5 rounded-full bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center transition active:scale-95 cursor-pointer shadow-xs"
                      title="Play Audio"
                    >
                      <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                    </button>
                  </div>
                </div>

                {/* Mini Card 2: Interesting Pregnancy Facts */}
                <div
                  onClick={() => {
                    const k = LEARNING_KNOWLEDGE[0];
                    setSelectedKnowledge(k);
                    setView('knowledgeReader');
                  }}
                  className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition text-left cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-full h-24 rounded-xl bg-gradient-to-br from-blue-300 via-sky-300 to-indigo-400 flex items-center justify-center text-3xl shadow-2xs mb-2">
                      🔬
                    </div>
                    <h4 className="font-extrabold text-xs text-slate-900 dark:text-slate-100 group-hover:text-teal-600 line-clamp-1">
                      {t3(lang, 'Interesting Facts', 'गर्भावस्था के रोचक तथ्य', 'गर्भावस्थेचे रोचक तथ्य')}
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                      {t3(lang, 'Learn something new every day.', 'हर दिन कुछ नया और अद्भुत जानें।', 'दररोज काहीतरी नवीन शिका.')}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400 mt-2">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 7 min</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleListenAction(LEARNING_KNOWLEDGE[0], getField(LEARNING_KNOWLEDGE[0], 'title', lang));
                      }}
                      className="w-5 h-5 rounded-full bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center transition active:scale-95 cursor-pointer shadow-xs"
                      title="Play Audio"
                    >
                      <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                    </button>
                  </div>
                </div>

                {/* Mini Card 3: Parenting Knowledge */}
                <div
                  onClick={() => {
                    const k = LEARNING_KNOWLEDGE[2];
                    setSelectedKnowledge(k);
                    setView('knowledgeReader');
                  }}
                  className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition text-left cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-full h-24 rounded-xl bg-gradient-to-br from-amber-300 via-orange-300 to-yellow-400 flex items-center justify-center text-3xl shadow-2xs mb-2">
                      🍼
                    </div>
                    <h4 className="font-extrabold text-xs text-slate-900 dark:text-slate-100 group-hover:text-teal-600 line-clamp-1">
                      {t3(lang, 'Parenting Knowledge', 'शिशु परवरिश का ज्ञान', 'पालकत्व ज्ञान')}
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                      {t3(lang, 'Helpful tips for your journey ahead.', 'आने वाले सफर के लिए जरूरी सुझाव।', 'पुढील प्रवासासाठी उपयुक्त माहिती.')}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400 mt-2">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 10 min</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleListenAction(LEARNING_KNOWLEDGE[2], getField(LEARNING_KNOWLEDGE[2], 'title', lang));
                      }}
                      className="w-5 h-5 rounded-full bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center transition active:scale-95 cursor-pointer shadow-xs"
                      title="Play Audio"
                    >
                      <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
