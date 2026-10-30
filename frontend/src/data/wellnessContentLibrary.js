/**
 * wellnessContentLibrary.js
 * 
 * Sacred spiritual scriptures, maternal stories, and Garbh Sanskar literature
 * for expecting mothers, complete in Hindi, Marathi, and English.
 * 
 * Includes:
 * 1. Shrimad Bhagavad Gita - Chapter 9 (Complete 22 Shlokas) & Chapter 2 Wisdom
 * 2. Ramayana Maternal Stories (Mata Kaushalya, Mata Sita, Hanuman's Protection)
 * 3. Krishna Stories (Yashoda Nandan, Vasudev & Yamuna, The Sacred Bansuri)
 * 4. Puranic & Historical Garbh Sanskar (Rajmata Jijabai, Queen Madalasa, Kayadhu & Prahlad)
 */

import { gitaChapter9Shlokas } from './gitaShlokas';

export const WELLNESS_BOOKS_AND_STORIES = [
  // ── 0A. Bhagavad Gita: Chapter 9 Verse 22 (Special Dedicated Solace Shloka) ──
  {
    totalItems: 1,
    onlineLibraryUrl: "https://www.gitasupersite.iitk.ac.in/srimad?language=dv&field_chapter_value=9&field_nsutra_value=22",
    onlineLibraryName: "IIT Kanpur Gita Supersite (अध्याय ९, श्लोक २२)",
    shlokas: [
      {
        number: 22,
        sanskrit: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥",
        transliteration: "ananyāś cintayanto māṁ ye janāḥ paryupāsate, teṣāṁ nityābhiyuktānāṁ yoga-kṣemaṁ vahāmy aham",
        meaningHi: "॥ श्रीकृष्ण का परम आश्वासन ॥\nजो भक्त अनन्य भाव से, पूर्ण निष्ठा के साथ मेरा चिंतन करते हुए मेरी शरण में रहते हैं, उन नित्य-युक्त भक्तों के 'योग' (जो उनके पास नहीं है उसे देना) और 'क्षेम' (जो उनके पास है उसकी रक्षा करना) का सम्पूर्ण भार मैं स्वयं वहन करता हूँ।",
        meaningMr: "॥ श्रीकृष्णाचे अभयवचन ॥\nजे भक्त अनन्य भावाने माझे स्मरण करतात, त्यांच्या योगक्षेमाची (कल्याणाची व संरक्षणाची) सर्व जबाबदारी मी स्वतः घेतो.",
        meaningEn: "॥ The Supreme Divine Assurance ॥\nTo those who always think of Me and worship Me with single-minded devotion, I personally carry what they lack and safeguard what they possess.",
        maternalGuidance: "माँ के लिए संदेश: हे माँ! जब भी गर्भावस्था के हॉर्मोन्स से उदासी या अकेलापन लगे, अपनी हथेलियाँ पेट पर रखें। आपके गर्भ में जो नन्हा जीवन पल रहा है, उसकी रक्षा और आपकी मानसिक शांति का भार स्वयं ईश्वर ने उठा रखा है। मुस्कुराइए, आप सुरक्षित हैं!",
        maternalGuidanceMr: "आईसाठी संदेश: जेव्हा मन उदास किंवा जड होईल, तेव्हा पोटावर हात ठेवून शांत राहा. आपल्या बाळाचे व आपले रक्षण साक्षात परमेश्वर करत आहे. काळजी सोडून आनंदी राहा.",
        maternalGuidanceEn: "Message for Mother: Whenever sadness or hormonal waves arise, rest your hands gently over your womb. The Divine is personally caring for your safety and your baby's health. You are deeply protected."
      }
    ]
  },

  // ── 0B. Ancient Garbh Sanskar: Bonding with Womb Child ──
  {
    id: "book-garbh-sanskar",
    category: "garbhsanskar",
    categoryNameEn: "Ancient Garbh Sanskar",
    categoryNameHi: "वैदिक गर्भ संस्कार",
    categoryNameMr: "वैदिक गर्भ संस्कार",
    titleEn: "Garbh Sanskar: Soulful Mother-Child Bonding to Dissolve Sadness",
    titleHi: "गर्भ संस्कार: शिशु से भावनात्मक संवाद करके उदासी दूर करें",
    titleMr: "गर्भ संस्कार: बाळाशी प्रेमळ संवाद व मातृत्वाचा परमानंद",
    authorEn: "Ancient Vedic Garbh Sanskar",
    authorHi: "प्राचीन गर्भ संस्कार परिषद",
    authorMr: "वैदिक गर्भ संस्कार ज्ञान",
    icon: "🌸",
    bgGradient: "from-rose-500 to-pink-600",
    duration: "4 min read & listen",
    totalItems: 1,
    onlineLibraryUrl: "https://archive.org/search.php?query=garbh+sanskar",
    onlineLibraryName: "Internet Archive - Garbh Sanskar Library",
    shlokas: [
      {
        number: 1,
        sanskrit: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं।\nभर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥",
        transliteration: "oṁ bhūr bhuvaḥ svaḥ tat savitur vareṇyaṁ, bhargo devasya dhīmahi dhiyo yo naḥ pracodayāt",
        meaningHi: "हम उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापरहित, देवस्वरूप परमात्मा का ध्यान करते हैं। वह परमात्मा हमारी और हमारे शिशु की बुद्धि को सन्मार्ग पर प्रेरित करे।",
        meaningMr: "त्या सर्वज्ञ, दुःखहारक आणि प्रकाशमान परमात्म्याचे आम्ही ध्यान करतो. तो आमच्या व बाळाच्या बुद्धीला सत्प्रेरणा देवो.",
        meaningEn: "We meditate upon the supreme, adorable divine effulgence. May that radiant light illuminate our intellect and protect our unborn child.",
        maternalGuidance: "माँ के लिए संदेश: जब आप उदास होती हैं, तो 2 मिनट आँखें बंद करके शिशु से बात करें: 'मेरे प्यारे बच्चे, मैं तुमसे बहुत प्यार करती हूँ। अब मैं तुम्हारे लिए मुस्कुरा रही हूँ।' यह संवाद माँ और शिशु दोनों में खुशी के हॉर्मोन्स सक्रिय कर देता है।",
        maternalGuidanceMr: "आईसाठी संदेश: डोळे मिटून पोटातील बाळाला म्हणा: 'बाळा, आपण दोघेही निरोगी आणि आनंदी आहोत.' आईच्या गोड शब्दांनी बाळाचा मेंदू तेजस्वी घडतो.",
        maternalGuidanceEn: "Message for Mother: Close your eyes, breathe, and whisper to your baby: 'My precious child, you and I are safe, loved, and happy.' Maternal connection instantly releases soothing oxytocin."
      }
    ]
  },

  // ── 0C. Sundarkand & Sankat Mochan Verses ──
  {
    id: "book-sundarkand-peace",
    category: "ramayana",
    categoryNameEn: "Sundarkand Fearlessness",
    categoryNameHi: "सुंदरकांड अमृत वचन (भय व चिंता नाशक)",
    categoryNameMr: "सुंदरकांड व संकटमोचन दोहे",
    titleEn: "Sundarkand Pearls: Sacred Verses for Freedom from Fear & Anxiety",
    titleHi: "सुंदरकांड: संकट कटे मिटे सब पीरा (भय, चिंता और उदासी नाशक दोहे)",
    titleMr: "सुंदरकांड दोहे: संकटमोचन हनुमानाष्टक व मनःशांती",
    authorEn: "Goswami Tulsidas (Ramcharitmanas)",
    authorHi: "गोस्वामी तुलसीदास जी (रामचरितमानस)",
    authorMr: "संत तुलसीदास (रामचरितमानस)",
    icon: "🚩",
    bgGradient: "from-orange-500 to-red-600",
    duration: "6 min read & listen",
    totalItems: 1,
    onlineLibraryUrl: "https://archive.org/search.php?query=garbh+sanskar",
    onlineLibraryName: "Internet Archive - Garbh Sanskar Library",
    shlokas: [
      {
        number: 1,
        sanskrit: "दीनदयाल विरदु संभारी। हरहु नाथ मम संकट भारी॥\nप्रनवउँ पवनकुमार खल बन पावक ग्यानघन।\nजासु हृदय आगार बसहिं राम सर चाप धर॥",
        transliteration: "dīnadayāla viradu saṁbhārī, harahu nātha mama saṁkaṭa bhārī, pranavauṁ pavana-kumāra khala bana pāvaka gyāna-ghana, jāsu hṛdaya āgāra basahiṁ rāma sara cāpa dhara",
        meaningHi: "हे दीनों पर दया करने वाले कृपालु प्रभु! आप अपने दयालु विरद (स्वभाव) का स्मरण करके मेरी इस चिंता और भारी संकट को हर लीजिए। हम पवनपुत्र हनुमान जी को प्रणाम करते हैं जिनके पावन हृदय में धनुष-बाण धारण किए प्रभु श्रीराम सदा निवास करते हैं।",
        meaningMr: "हे दयाळू प्रभू! मनातील सर्व भीती व चिंता दूर करा. ज्यांच्या हृदयात प्रभू श्रीराम सदैव वास करतात अशा मारुतीरायांना आमचे कोटी कोटी वंदन.",
        meaningEn: "O compassionate Lord, remembering Your gracious nature, remove every heavy burden and fear from my heart. I bow to Hanuman, in whose lotus heart Lord Rama eternally dwells.",
        maternalGuidance: "माँ के लिए संदेश: गर्भावस्था में किसी भी अज्ञात भय, डिलीवरी की घबराहट या उदासी के समय हनुमान जी का स्मरण करें। उनका नाम लेते ही मन का भारीपन कपूर की तरह उड़ जाता है और अंतर्मन में असीम निर्भयता का संचार होता है।",
        maternalGuidanceMr: "आईसाठी संदेश: डिलिव्हरीची भीती किंवा कसलीही चिंता वाटल्यास या पावन दोह्याचे स्मरण करा. मनाला त्वरित अदम्य धैर्य प्राप्त होईल.",
        maternalGuidanceEn: "Message for Mother: Whenever anxiety or delivery apprehension touches you, listen to these sacred vibrations. Fear dissolves immediately, replaced by serene courage."
      }
    ]
  },
  // ── 1. Shrimad Bhagavad Gita Chapter 9 (All 22 Shlokas) ──
  {
    id: "book-gita-ch9",
    category: "gita",
    categoryNameEn: "Shrimad Bhagavad Gita",
    categoryNameHi: "श्रीमद्भगवद्गीता (अध्याय ९)",
    categoryNameMr: "श्रीमद्भगवद्गीता (अध्याय ९)",
    titleEn: "Bhagavad Gita: Chapter 9 - The Yoga of Sovereign Mystery (All 22 Verses)",
    titleHi: "श्रीमद्भगवद्गीता: अध्याय ९ - राजविद्याराजगुह्ययोग (सम्पूर्ण २२ श्लोक)",
    titleMr: "श्रीमद्भगवद्गीता: अध्याय ९ - राजविद्याराजगुह्ययोग (सर्व २२ श्लोक)",
    authorEn: "Maharshi Vedavyasa / Lord Krishna",
    authorHi: "महर्षि वेदव्यास / भगवान श्रीकृष्ण",
    authorMr: "महर्षि वेदव्यास / भगवान श्रीकृष्ण",
    icon: "🕉️",
    bgGradient: "from-amber-500 via-orange-600 to-rose-600",
    duration: "15 min read & listen",
    totalItems: 22,
    onlineLibraryUrl: "https://www.gitasupersite.iitk.ac.in/srimad?language=dv&field_chapter_value=9",
    onlineLibraryName: "IIT Kanpur Gita Supersite (संपूर्ण अध्याय ९)",
    shlokas: gitaChapter9Shlokas
  },

  // ── 2. Bhagavad Gita: Karmanye Vadhikaraste & Peace ──
  {
    id: "book-gita-ch2",
    category: "gita",
    categoryNameEn: "Shrimad Bhagavad Gita",
    categoryNameHi: "श्रीमद्भगवद्गीता (अध्याय २)",
    categoryNameMr: "श्रीमद्भगवद्गीता (अध्याय २)",
    titleEn: "Bhagavad Gita: Chapter 2 (Verse 47) - Overcoming Delivery Anxiety & Present Peace",
    titleHi: "श्रीमद्भगवद्गीता: अध्याय २ - कर्मण्येवाधिकारस्ते एवं मानसिक संतुलन",
    titleMr: "श्रीमद्भगवद्गीता: अध्याय २ - कर्मण्येवाधिकारस्ते व मनःशांती",
    authorEn: "Maharshi Vedavyasa",
    authorHi: "महर्षि वेदव्यास",
    authorMr: "महर्षि वेदव्यास",
    icon: "📖",
    bgGradient: "from-amber-600 to-yellow-600",
    duration: "4 min read",
    totalItems: 1,
    onlineLibraryUrl: "https://archive.org/search.php?query=garbh+sanskar",
    onlineLibraryName: "Internet Archive - Garbh Sanskar Library",
    shlokas: [
      {
        number: 47,
        sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
        transliteration: "karmaṇy evādhikāras te mā phaleṣu kadācana, mā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi",
        meaningHi: "तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। इसलिए कर्म के फल की चिंता मत करो और अकर्मण्यता (कर्म न करने) में भी तुम्हारी आसक्ति न हो।",
        meaningMr: "तुझा अधिकार केवळ कर्म करण्यावर आहे, फळावर कधीही नाही. फळाची चिंता सोडून वर्तमानात शांत चित्ताने आपले कर्तव्य कर.",
        meaningEn: "You have a right to perform your prescribed duty, but not to the fruits of action. Never consider yourself the cause of results, nor be attached to inaction.",
        maternalGuidance: "माँ के लिए संदेश: प्रसव या भविष्य की अनावश्यक चिंता छोड़ें। आज का दिन स्वस्थ, शांत और आनंदमय बिताना ही आपका सबसे पावन धर्म है।",
        maternalGuidanceMr: "आईसाठी संदेश: प्रसूतीची किंवा भविष्याची अनावश्यक काळजी सोडून द्या. आजचा दिवस आनंदी व शांत ठेवणे हेच तुमचे खरे कर्तव्य आहे.",
        maternalGuidanceEn: "Message for Mother: Release worry about the future or labor. Focusing peacefully on today’s nourishment is your sacred duty."
      }
    ]
  },

  // ── 3. Ramayana: Mata Kaushalya & Lord Rama's Birth ──
  {
    id: "story-ramayana-kaushalya",
    category: "ramayana",
    categoryNameEn: "Ramayana Maternal Stories",
    categoryNameHi: "रामायण मातृत्व कथाएं",
    categoryNameMr: "रामायण मातृत्व कथा",
    titleEn: "Mata Kaushalya & The Divine Incarnation: Celebrating Motherhood",
    titleHi: "माता कौशल्या और प्रभु श्रीराम का प्राकट्य: मातृत्व की पावन गाथा",
    titleMr: "माता कौशल्या आणि श्रीराम जन्म: मातृत्वाचा पवित्र उत्सव",
    authorEn: "Goswami Tulsidas (Ramcharitmanas)",
    authorHi: "गोस्वामी तुलसीदास (श्रीरामचरितमानस)",
    authorMr: "संत तुलसीदास (श्रीरामचरितमानस)",
    icon: "🏹",
    bgGradient: "from-rose-500 via-amber-600 to-orange-500",
    duration: "6 min read & listen",
    totalItems: 3,
    shlokas: [
      {
        number: 1,
        sanskrit: "भए प्रगट कृपाला दीनदयाला कौसल्या हितकारी।\nहरषित महतारी मुनि मन हारी अद्भुत रूप बिचारी॥",
        transliteration: "bhae pragaṭa kṛpālā dīnadayālā kausalyā hitakārī, haraṣita mahatārī muni mana hārī adbhuta rūpa bicārī",
        meaningHi: "दीनों पर दया करने वाले और माता कौशल्या का कल्याण करने वाले कृपालु प्रभु प्रकट हुए। मुनियों के मन को हरने वाले उनके अद्भुत रूप को देखकर माता का हृदय परम आनंद से भर गया।",
        meaningMr: "दीनदयाळू व माता कौशल्याचे कल्याण करणारे कृपानिधी प्रभू श्रीराम प्रगट झाले. त्यांचे अलौकिक रूप पाहून आईचे हृदय आनंदाने न्हाऊन निघाले.",
        meaningEn: "The merciful and benevolent Lord, the benefactor of Mother Kaushalya, appeared. Gazing upon His wondrous divine form, the mother’s heart swelled with infinite bliss.",
        maternalGuidance: "माँ के लिए संदेश: हर शिशु ईश्वर का ही पावन स्वरूप है। अपने गर्भस्थ शिशु को प्रभु का वरदान मानकर उसके आगमन की प्रसन्नता मनाएं।",
        maternalGuidanceMr: "आईसाठी संदेश: प्रत्येक बाळ हे देवाचे रूप असते. आपल्या बाळाला ईश्वराचा आशीर्वाद मानून नेहमी प्रसन्न राहा.",
        maternalGuidanceEn: "Message for Mother: Every newborn is a divine blessing. Cherish your baby as a sacred gift and rejoice in this holy transition."
      },
      {
        number: 2,
        sanskrit: "लोचन अभिरामा तनु घनस्यामा निज आयुध भुज चारी।\nभूषन बनमाला नयन बिसाला सोभासिंधु खरारी॥",
        transliteration: "locana abhirāmā tanu ghanasyāmā nija āyudha bhuja cārī, bhūṣana banamālā nayana bisālā sobhāsindhu kharārī",
        meaningHi: "नेत्रों को आनंद देने वाले, मेघ के समान श्याम वर्ण, चारों भुजाओं में अपने आयुध धारण किए हुए, विशाल नेत्रों वाले भगवान शोभा के सागर हैं।",
        meaningMr: "डोळ्यांना शांतता देणारे, अथांग सौभाग्याचे प्रतीक असणारे रूप पाहून माता कौशल्या कृतार्थ झाली.",
        meaningEn: "His captivating beauty radiates absolute peace, and His divine eyes bestow supreme grace and comfort to the mother.",
        maternalGuidance: "माँ के लिए संदेश: अपनी आँखों को बंद करें और अपने बच्चे के तेजस्वी, सुंदर और शांत मुखमंडल का ध्यान करें।",
        maternalGuidanceMr: "आईसाठी संदेश: डोळे मिटून आपल्या तेजस्वी आणि गोंडस बाळाच्या हास्याचे स्मरण करा.",
        maternalGuidanceEn: "Message for Mother: Close your eyes and visualize the serene, radiant smile of your healthy child."
      },
      {
        number: 3,
        sanskrit: "कह तात न मनावहु पुनि पुनि धावहु बाल चरित मोरा।\nजननी मन भावा अतुला आनंदा नैनन प्रेम के झोरा॥",
        transliteration: "kaha tāta na manāvahu puni puni dhāvahu bāla carita morā, jananī mana bhāvā atulā ānandā nainana prema ke jhorā",
        meaningHi: "माता कौशल्या ने प्रभु से बाल रूप में लीलाएं करने की विनती की। प्रभु ने तुरंत नन्हें शिशु का रूप धारण कर लिया और माता की गोद में मुस्कराने लगे।",
        meaningMr: "प्रभूंनी लहान बाळाचे रूप घेतले आणि कौशल्या मातेच्या कुशीत हसू लागले. आईचे वात्सल्य हे जगातील सर्वात श्रेष्ठ सुख आहे.",
        meaningEn: "The Lord assumed the sweet form of a tiny baby and smiled in Mother Kaushalya’s lap, establishing maternal love as the highest devotion.",
        maternalGuidance: "माँ के लिए संदेश: मातृत्व इस संसार का सबसे अलौकिक सुख है। आपकी हर मुस्कान आपके बच्चे के जीवन की खुशहाली बनती है।",
        maternalGuidanceMr: "आईसाठी संदेश: आईची माया ही जगातील सर्वात मोठी ताकद आहे. तुमचे सुख हेच बाळाचे आरोग्य आहे.",
        maternalGuidanceEn: "Message for Mother: Your loving maternal embrace provides your baby with lifelong security and peace."
      }
    ]
  },

  // ── 4. Ramayana: Mata Sita's Resilience & Luv-Kush Garbh Sanskar ──
  {
    id: "story-ramayana-sita",
    category: "ramayana",
    categoryNameEn: "Ramayana Maternal Stories",
    categoryNameHi: "रामायण मातृत्व कथाएं",
    categoryNameMr: "रामायण मातृत्व कथा",
    titleEn: "Mata Sita’s Unshakable Courage: Nurturing Luv & Kush in the Forest",
    titleHi: "माता सीता का असीम आत्मबल: वन में लव-कुश को तेजस्वी बनाने वाले संस्कार",
    titleMr: "माता सीतेचे अदम्य धैर्य: वनवासात लव-कुश घडवणारे गर्भ संस्कार",
    authorEn: "Maharshi Valmiki (Valmiki Ramayana)",
    authorHi: "महर्षि वाल्मीकि (वाल्मीकि रामायण)",
    authorMr: "महर्षि वाल्मीकि (वाल्मीकि रामायण)",
    icon: "🌿",
    bgGradient: "from-emerald-600 via-teal-600 to-cyan-700",
    duration: "7 min read & listen",
    totalItems: 2,
    shlokas: [
      {
        number: 1,
        sanskrit: "धृत्या यया धारयते मनःप्राणेन्द्रियक्रियाः।\nयोगेनाव्यभिचारिण्या धृतिः सा पार्थ सात्त्विकी॥",
        transliteration: "dhṛtyā yayā dhārayate manaḥ-prāṇendriya-kriyāḥ, yogenāvyabhicāriṇyā dhṛtiḥ sā pārtha sāttvikī",
        meaningHi: "माता सीता ने वन के अत्यंत कठिन समय में भी धैर्य और सात्त्विक शक्ति को धारण किया। उन्होंने अपने मन और प्राणों को शांत रखकर दोनों बालकों को शूरवीर और नीतिवान बनाया।",
        meaningMr: "माता सीतेने कठीण परिस्थितीतही धीर सोडला नाही. अत्यंत शांत व खंबीर राहून तिने लव आणि कुश यांच्यावर उच्च संस्कार केले.",
        meaningEn: "Even amidst challenging circumstances in the hermitage, Mother Sita maintained supreme poise and fortitude, imparting fearlessness and wisdom to her twin sons.",
        maternalGuidance: "माँ के लिए संदेश: माँ का आत्मबल और धैर्य ही संतान की सबसे बड़ी ढाल है। जब माँ अंदर से शांत और मजबूत होती है, तो शिशु भी निर्भय बनता है।",
        maternalGuidanceMr: "आईसाठी संदेश: आईचे मनोधैर्य हीच बाळाची खरी शक्ती असते. परिस्थिती कशीही असो, मनाची शांतता ढळू देऊ नका.",
        maternalGuidanceEn: "Message for Mother: A mother's inner calmness sculpts the emotional resilience and courage of her unborn child."
      },
      {
        number: 2,
        sanskrit: "जननी जन्मभूमिश्च स्वर्गादपि गरीयसी।\nमातुः परतरं नास्ति दैवतं जगतीतले॥",
        transliteration: "jananī janmabhūmiś ca svargād api garīyasī, mātuḥ parataraṁ nāsti daivataṁ jagatītale",
        meaningHi: "माता और मातृभूमि स्वर्ग से भी श्रेष्ठ हैं। इस संसार में माँ से बड़ा कोई देवता नहीं है।",
        meaningMr: "आई आणि मातृभूमी स्वर्गापेक्षाही श्रेष्ठ आहेत. आईपेक्षा मोठे दैवत जगात दुसरे कोणतेही नाही.",
        meaningEn: "Mother and motherland are greater even than heaven. There is no higher divinity on earth than a mother.",
        maternalGuidance: "माँ के लिए संदेश: आप स्वयं इस सृष्टि की जननी हैं। अपनी क्षमता और मातृत्व शक्ति पर अटूट विश्वास रखें।",
        maternalGuidanceMr: "आईसाठी संदेश: आपण एका नव्या जीवाची निर्माती आहात. स्वतःच्या सामर्थ्यावर दृढ विश्वास ठेवा.",
        maternalGuidanceEn: "Message for Mother: You are creating new life. Walk with pride, peace, and sacred self-confidence."
      }
    ]
  },

  // ── 5. Krishna Stories: Yashoda Nandan & The Vision of Cosmos ──
  {
    id: "story-krishna-yashoda",
    category: "krishna",
    categoryNameEn: "Krishna Childhood Tales",
    categoryNameHi: "श्रीकृष्ण बाललीला व वात्सल्य",
    categoryNameMr: "श्रीकृष्ण बाललीला व वात्सल्य",
    titleEn: "Mother Yashoda & Little Krishna: The Vision of the Cosmos",
    titleHi: "यशोदा मैया का वात्सल्य और नन्हे कान्हा के मुख में ब्रह्मांड के दर्शन",
    titleMr: "यशोदा मातेचे वात्सल्य आणि बालकृष्णाच्या मुखात संपूर्ण विश्व",
    authorEn: "Shrimad Bhagavatam (10th Canto)",
    authorHi: "श्रीमद्भागवत महापुराण (दशम स्कंध)",
    authorMr: "श्रीमद्भागवत महापुराण (दहावा स्कंध)",
    icon: "🪈",
    bgGradient: "from-indigo-600 via-blue-600 to-teal-500",
    duration: "5 min read & listen",
    totalItems: 2,
    shlokas: [
      {
        number: 1,
        sanskrit: "सा तत्र ददृशे विश्वं जगत्स्थास्नु च खं दिशः।\nसाद्रिद्वीपाब्धिभूगोलं सवाय्वग्न्यिन्दुतारकम्॥",
        transliteration: "sā tatra dadṛśe viśvaṁ jagat-sthāsnu ca khaṁ diśaḥ, sādri-dvīpābdhi-bhū-golaṁ sa-vāyv-agny-indu-tārakam",
        meaningHi: "जब माता यशोदा ने मिट्टी खाने की आशंका पर नन्हे कृष्ण का मुख खुलवाया, तो उन्हें बालक के मुख में समस्त ब्रह्मांड, पर्वत, नदियां, सूर्य, चंद्रमा और तारे दिखाई दिए।",
        meaningMr: "जेव्हा यशोदा मातेने बाळकृष्णाला तोंड उघडायला सांगितले, तेव्हा तिला त्याच्या मुखात संपूर्ण सूर्यमाला, पर्वत आणि अनंत विश्व दिसले.",
        meaningEn: "When Mother Yashoda asked little Krishna to open His mouth, she beheld the entire cosmos—galaxies, stars, oceans, and life itself—resting inside the child.",
        maternalGuidance: "माँ के लिए संदेश: आपका गर्भस्थ शिशु भी अनंत संभावनाओं का ब्रह्मांड अपने भीतर समेटे हुए है। उसे प्रेम और आशीर्वाद से सींचें।",
        maternalGuidanceMr: "आईसाठी संदेश: तुमच्या गर्भातील बाळामध्येही अफाट बुद्धिमत्ता आणि अनंत शक्यता सामावलेल्या आहेत. त्याला केवळ प्रेम द्या.",
        maternalGuidanceEn: "Message for Mother: Within your tiny baby lies an infinite universe of potential, brilliance, and goodness."
      },
      {
        number: 2,
        sanskrit: "त्रयीसांख्ययोगोपनिषत्सु गीतासु च यः प्रभुः।\nतं यशोदा सुतं मत्वा पाशेन अबध्नात् प्रेम्णा॥",
        transliteration: "trayī-sāṅkhya-yogopaniṣatsu gītāsu ca yaḥ prabhuḥ, taṁ yaśodā sutaṁ matvā pāśena abadhnāt premṇā",
        meaningHi: "जिन्हें वेद और उपनिषद भी नहीं बांध सकते, उन्हें यशोदा मैया ने अपने निश्छल वात्सल्य प्रेम की डोरी से बांध लिया। प्रेम ही ईश्वर का सबसे बड़ा रूप है।",
        meaningMr: "ज्या ईश्वराला वेदही जाणू शकत नाहीत, त्या परमात्म्याला यशोदा मातेने आपल्या केवळ प्रेमाने जिंकून घेतले.",
        meaningEn: "The Supreme, ungraspable by scriptures, allowed Himself to be bound simply by the pure maternal love of Mother Yashoda.",
        maternalGuidance: "माँ के लिए संदेश: आपका मातृत्व प्रेम ही आपके बच्चे के लिए सबसे बड़ा कवच और औषधि है।",
        maternalGuidanceMr: "आईसाठी संदेश: आईचे निस्वार्थ प्रेम हेच बाळासाठी जगातील सर्वात मोठे संरक्षण असते.",
        maternalGuidanceEn: "Message for Mother: Unconditional maternal tenderness is the purest healing force for your baby's nervous system."
      }
    ]
  },

  // ── 6. Krishna Stories: Vasudev & The Yamuna Crossing ──
  {
    id: "story-krishna-yamuna",
    category: "krishna",
    categoryNameEn: "Krishna Childhood Tales",
    categoryNameHi: "श्रीकृष्ण बाललीला व वात्सल्य",
    categoryNameMr: "श्रीकृष्ण बाललीला व वात्सल्य",
    titleEn: "The Miracle Crossing: Divine Protection for the Newborn",
    titleHi: "यमुना पार करते वासुदेव: शिशु की अलौकिक सुरक्षा का दिव्य भरोसा",
    titleMr: "वासुदेव आणि यमुना नदी: बालकाचे दैवी संरक्षण",
    authorEn: "Shrimad Bhagavatam",
    authorHi: "श्रीमद्भागवत",
    authorMr: "श्रीमद्भागवत",
    icon: "🌊",
    bgGradient: "from-blue-700 via-indigo-800 to-purple-900",
    duration: "5 min read & listen",
    totalItems: 1,
    onlineLibraryUrl: "https://archive.org/search.php?query=garbh+sanskar",
    onlineLibraryName: "Internet Archive - Garbh Sanskar Library",
    shlokas: [
      {
        number: 1,
        sanskrit: "शेषः फणैः अन्वगाद् वारिवारयन् मेघो वर्षन् गर्जमानः।\nमार्गो ददौ सिन्धुरिव प्रमत्ता यमुनोदन्वता कृष्णपदारविन्दस्पर्शात्॥",
        transliteration: "śeṣaḥ phaṇaiḥ anvagād vāri-vārayan megho varṣan garjamānaḥ, mārgo dadau sindhur iva pramattā yamunodanvatā kṛṣṇa-padāravinda-sparśāt",
        meaningHi: "घोर अंधकार और भारी वर्षा में जब वासुदेव बालक कृष्ण को लेकर चले, तो शेषनाग ने अपने फणों से छत्र बनाकर वर्षा रोकी, और यमुना ने चरण स्पर्श होते ही मार्ग दे दिया।",
        meaningMr: "मुसळधार पावसात शेषनागाने बाळावर छत्र धरले आणि बाळकृष्णाच्या चरणस्पर्शाने उधाणलेल्या यमुनेने स्वतः रस्ता दिला. देवाच्या भक्ताचे सर्व संकटे टळतात.",
        meaningEn: "In torrential rain and darkness, the serpent Shesha protected the baby like an umbrella, and the rushing Yamuna river parted the moment the child's feet touched the water.",
        maternalGuidance: "माँ के लिए संदेश: प्रकृति और परमात्मा आपके शिशु के चारों ओर सुरक्षा का अभेद्य घेरा बनाए हुए हैं। भयमुक्त होकर मुस्कुराएं।",
        maternalGuidanceMr: "आईसाठी संदेश: ईश्वराची शक्ती तुमच्या बाळाचे अहोरात्र रक्षण करत आहे. मनातील भीती पूर्णपणे काढून टाका.",
        maternalGuidanceEn: "Message for Mother: Divine natural forces are constantly safeguarding your baby. Let go of fear; you are held in safety."
      }
    ]
  },

  // ── 7. Historical Garbh Sanskar: Rajmata Jijabai & Chhatrapati Shivaji Maharaj ──
  {
    id: "story-garbh-jijabai",
    category: "garbhsanskar",
    categoryNameEn: "Puranic & Historical Wisdom",
    categoryNameHi: "ऐतिहासिक व पौराणिक गर्भ संस्कार",
    categoryNameMr: "ऐतिहासिक व पौराणिक गर्भ संस्कार",
    titleEn: "Rajmata Jijabai: The Maternal Vision that Built Swarajya",
    titleHi: "राष्ट्रमाता जीजाबाई के गर्भ संस्कार: छत्रपति शिवाजी महाराज के शौर्य की नींव",
    titleMr: "राष्ट्रमाता जिजाऊंचे गर्भ संस्कार: छत्रपती शिवाजी महाराजांच्या पराक्रमाची पायाभरणी",
    authorEn: "Maharashtra Historical Chronicles",
    authorHi: "ऐतिहासिक गाथा",
    authorMr: "महाराष्ट्राचा प्रेरणादायी इतिहास",
    icon: "🚩",
    bgGradient: "from-orange-600 via-amber-600 to-red-600",
    duration: "6 min read & listen",
    totalItems: 2,
    shlokas: [
      {
        number: 1,
        sanskrit: "प्रतिपच्चन्द्रलेखेव वर्धिष्णुर्विश्ववन्दिता।\nशाहसूनोः शिवस्यैषा मुद्रा भद्राय राजते॥",
        transliteration: "pratipat-candra-lekheva vardhiṣṇur viśva-vanditā, śāhasūnoḥ śivasyaiṣā mudrā bhadrāya rājate",
        meaningHi: "प्रतिपदा के चंद्रमा की कला के समान निरंतर बढ़ने वाली और सारे विश्व द्वारा वंदित यह शाहजी के पुत्र शिवाजी की राजमुद्रा लोक-कल्याण के लिए सुशोभित है।",
        meaningMr: "प्रतिपदेच्या चंद्रकलेप्रमाणे रोज वाढत जाणारी आणि साऱ्या विश्वाला वंदनीय असणारी ही शिवमुद्रा लोकांच्या कल्याणासाठी तळपते आहे.",
        meaningEn: "Like the crescent moon of the first lunar day, growing ever radiant and revered by the entire world, this sovereign seal of Shivaji shines for universal welfare.",
        maternalGuidance: "माँ के लिए संदेश: माता जीजाबाई ने गर्भावस्था के दौरान शिवनेरी दुर्ग पर रामायण, महाभारत और गीता का वाचन किया। माँ के उच्च विचार शिशु के चरित्र की नींव बनते हैं।",
        maternalGuidanceMr: "आईसाठी संदेश: राष्ट्रमाता जिजाऊंनी गरोदरपणात शिवनेरीवर सदासर्वकाळ वीरगाथा आणि सद्ग्रंथांचे वाचन केले. आईचे उदात्त विचार बाळाला तेजस्वी बनवतात.",
        maternalGuidanceEn: "Message for Mother: Rajmata Jijabai immersed her mind in valor, compassion, and dharma during pregnancy. A mother’s nobility shapes a leader."
      },
      {
        number: 2,
        sanskrit: "मातृदेवो भव पितृदेवो भव। आचार्यदेवो भव अतिथिदेवो भव॥",
        transliteration: "mātṛ-devo bhava, pitṛ-devo bhava, ācārya-devo bhava, atithi-devo bhava",
        meaningHi: "माता को देवतुल्य समझो, पिता को देवतुल्य समझो। जो माँ अपने विचारों को धर्म और संस्कार से जोड़ती है, उसकी संतान युगपुरुष बनती है।",
        meaningMr: "आई हे साक्षात दैवत आहे. आईच्या एका एका विचारातून नव्या पिढीचे भविष्य घडत असते.",
        meaningEn: "Honor the mother as divine. A mother whose mind is anchored in virtue gives birth to enlightened human beings.",
        maternalGuidance: "माँ के लिए संदेश: अपनी गर्भावस्था के हर दिन को सकारात्मक, प्रेरक और ज्ञानवर्धक विचारों से सजाएं।",
        maternalGuidanceMr: "आईसाठी संदेश: दररोज काहीतरी चांगले, प्रेरणादायी वाचा. तुमचे बाळ सुसंस्कृत आणि तेजस्वी घडेल.",
        maternalGuidanceEn: "Message for Mother: Fill every single day with uplifting, courageous, and noble thoughts."
      }
    ]
  },

  // ── 8. Puranic Wisdom: Queen Madalasa's Enlightened Lullaby ──
  {
    id: "story-garbh-madalasa",
    category: "garbhsanskar",
    categoryNameEn: "Puranic & Historical Wisdom",
    categoryNameHi: "ऐतिहासिक व पौराणिक गर्भ संस्कार",
    categoryNameMr: "ऐतिहासिक व पौराणिक गर्भ संस्कार",
    titleEn: "Queen Madalasa: The Womb Wisdom Lullabies",
    titleHi: "रानी मदालसा की दिव्य लोरी: गर्भ से ही संतानों को निर्भय और आत्मज्ञानी बनाने की विद्या",
    titleMr: "राणी मदालसाची ज्ञानलोरी: गर्भातूनच बाळाला निर्भय बनवणारी माता",
    authorEn: "Markandeya Purana",
    authorHi: "मार्कण्डेय पुराण",
    authorMr: "मार्कंडेय पुराण",
    icon: "✨",
    bgGradient: "from-pink-500 via-rose-600 to-indigo-600",
    duration: "5 min read & listen",
    totalItems: 1,
    onlineLibraryUrl: "https://archive.org/search.php?query=garbh+sanskar",
    onlineLibraryName: "Internet Archive - Garbh Sanskar Library",
    shlokas: [
      {
        number: 1,
        sanskrit: "शुद्धोऽसि बुद्धोऽसि निरंजनोऽसि संसारमाया परिवर्जितोऽसि।\nसंसारस्वप्नं त्यज मोहनिद्रां मदालसा वाक्यमुवाच पुत्रम्॥",
        transliteration: "śuddho 'si buddho 'si nirañjano 'si saṁsāra-māyā parivarjito 'si, saṁsāra-svapnaṁ tyaja moha-nidrāṁ madālasā vākyam uvāca putram",
        meaningHi: "हे मेरे प्यारे बच्चे! तुम स्वभाव से ही परम शुद्ध हो, ज्ञानवान हो, विकारों से रहित हो। तुम निर्भय हो। रानी मदालसा अपने पालने में झूलते शिशु को यह गाकर सुनाती थीं।",
        meaningMr: "बाळा, तू जन्मतःच शुद्ध आहेस, बुद्धिवान आहेस, निर्भय आहेस! राणी मदालसा आपल्या बाळाला अशी ज्ञानयुक्त लोरी गाऊन शांत करत असे.",
        meaningEn: "O beloved child! You are inherently pure, wise, flawless, and fearless. Awaken to your true divine strength, sang Queen Madalasa.",
        maternalGuidance: "माँ के लिए संदेश: अपने शिशु से बात करते हुए उसे बताएं: 'तुम बुद्धिमान हो, तुम स्वस्थ हो, तुम बहुत प्यारे हो।' शिशु माँ की हर बात सुनता है।",
        maternalGuidanceMr: "आईसाठी संदेश: बाळाशी बोलताना नेहमी सांगा: 'तू शांत आहेस, तू निरोगी आहेस, तू खूप हुशार आहेस.' बाळ पोटातूनच हे शिकत असते.",
        maternalGuidanceEn: "Message for Mother: Whisper affirmations to your womb: 'You are healthy, bright, peaceful, and loved.' The baby absorbs your voice deeply."
      }
    ]
  }
];
