/**
 * Maternal Voice & Speech Synthesis Helper
 * Specialized for Marathi (mr-IN), Hindi (hi-IN), and English (en-IN)
 * Provides reliable, chunked text-to-speech for books, stories, and AI assistant
 */

/**
 * Remove markdown syntax for smooth spoken narration
 */
export function cleanMarkdownForSpeech(mdText) {
  if (!mdText) return '';
  return mdText
    .replace(/^#+\s+/gm, '') // Remove # headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italics
    .replace(/_{1,2}(.*?)_{1,2}/g, '$1') // Remove underscores
    .replace(/`{1,3}.*?`{1,3}/gs, '') // Remove code
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
    .replace(/^[-*+]\s+/gm, '') // Remove bullet points
    .replace(/^\d+\.\s+/gm, '') // Remove numbered lists
    .replace(/^[>|].*$/gm, '') // Remove quotes or tables
    .replace(/---/g, '') // Remove dividers
    .replace(/🔑|✨|🌸|🙏|🤰|👶|🌱|❤️|🪈|📖|🎙️|🔊/g, '') // Remove emojis
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Split long text into speakable sentence chunks (< 200 chars)
 */
export function splitIntoSpeechChunks(text) {
  if (!text) return [];
  // Split by full stop, danda (।), question mark, exclamation mark, or newline
  const rawSentences = text.split(/([।!?\n.]\s*)/);
  const chunks = [];
  let buffer = '';

  for (let i = 0; i < rawSentences.length; i++) {
    const part = rawSentences[i] || '';
    if ((buffer + part).length < 180) {
      buffer += part;
    } else {
      if (buffer.trim()) chunks.push(buffer.trim());
      buffer = part;
    }
  }
  if (buffer.trim()) chunks.push(buffer.trim());
  return chunks.filter(c => c.length > 1);
}

/**
 * Find the best available voice for language (mr-IN, hi-IN, en-IN)
 */
export function getBestVoice(lang = 'mr') {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices() || [];
  if (!voices.length) return null;

  if (lang === 'mr') {
    // 1. Look for Marathi specific voice
    const mrVoice = voices.find(v => 
      v.lang.toLowerCase().includes('mr') || 
      v.name.toLowerCase().includes('marathi') ||
      v.name.toLowerCase().includes('मराठी')
    );
    if (mrVoice) return mrVoice;

    // 2. Fallback to Hindi voice for Devanagari script pronunciation
    const hiVoice = voices.find(v => 
      v.lang.toLowerCase().includes('hi') || 
      v.name.toLowerCase().includes('hindi') ||
      v.name.toLowerCase().includes('हिंदी')
    );
    if (hiVoice) return hiVoice;

    // 3. Indian English voice fallback
    const inVoice = voices.find(v => v.lang.toLowerCase().includes('en-in'));
    if (inVoice) return inVoice;
  } else if (lang === 'hi') {
    const hiVoice = voices.find(v => 
      v.lang.toLowerCase().includes('hi') || 
      v.name.toLowerCase().includes('hindi')
    );
    if (hiVoice) return hiVoice;
  } else {
    const enVoice = voices.find(v => 
      v.lang.toLowerCase().includes('en-in') || 
      v.lang.toLowerCase().includes('en-gb') || 
      v.lang.toLowerCase().includes('en')
    );
    if (enVoice) return enVoice;
  }

  return voices[0] || null;
}

class MaternalVoiceNarrator {
  constructor() {
    this.chunks = [];
    this.currentChunkIndex = 0;
    this.isPlaying = false;
    this.isPaused = false;
    this.rate = 0.9;
    this.language = 'mr';
    this.onProgressCallback = null;
    this.onEndCallback = null;
    this.keepAliveTimer = null;
  }

  speak({ text, language = 'mr', rate = 0.9, onProgress, onEnd }) {
    this.stop();

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis is not supported on this browser.');
      return;
    }

    const cleanText = cleanMarkdownForSpeech(text);
    if (!cleanText) return;

    this.chunks = splitIntoSpeechChunks(cleanText);
    this.currentChunkIndex = 0;
    this.language = language;
    this.rate = rate;
    this.onProgressCallback = onProgress;
    this.onEndCallback = onEnd;
    this.isPlaying = true;
    this.isPaused = false;

    // Chrome keep-alive hack for SpeechSynthesis
    this.keepAliveTimer = setInterval(() => {
      if (this.isPlaying && !this.isPaused) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 12000);

    this._speakNextChunk();
  }

  _speakNextChunk() {
    if (!this.isPlaying || this.currentChunkIndex >= this.chunks.length) {
      this.stop();
      if (this.onEndCallback) this.onEndCallback();
      return;
    }

    const chunk = this.chunks[this.currentChunkIndex];
    const utterance = new SpeechSynthesisUtterance(chunk);

    const voice = getBestVoice(this.language);
    if (voice) utterance.voice = voice;
    utterance.lang = this.language === 'mr' ? 'mr-IN' : (this.language === 'hi' ? 'hi-IN' : 'en-IN');
    utterance.rate = this.rate;

    utterance.onend = () => {
      if (!this.isPlaying) return;
      this.currentChunkIndex++;
      if (this.onProgressCallback) {
        const pct = Math.round((this.currentChunkIndex / this.chunks.length) * 100);
        this.onProgressCallback({
          progress: pct,
          currentChunk: chunk,
          chunkIndex: this.currentChunkIndex,
          totalChunks: this.chunks.length
        });
      }
      this._speakNextChunk();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis chunk error:', e);
      if (!this.isPlaying) return;
      this.currentChunkIndex++;
      this._speakNextChunk();
    };

    window.speechSynthesis.speak(utterance);
  }

  pause() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
      this.isPaused = true;
    }
  }

  resume() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
      this.isPaused = false;
    }
  }

  setRate(newRate) {
    this.rate = newRate;
    // Will apply to next chunk
  }

  stop() {
    this.isPlaying = false;
    this.isPaused = false;
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) { /* ignore */ }
    }
  }
}

export const maternalNarrator = new MaternalVoiceNarrator();

