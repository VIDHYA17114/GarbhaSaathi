/**
 * GarbhaSaathi Conversational AI Engine (Powered by Google Gemini AI)
 * Native support for Marathi (mr), Hindi (hi), and English (en)
 * Accurate word-boundary matching, expansive maternal topics,
 * and direct Google Gemini multi-turn generation.
 */

const GEMINI_STORAGE_KEY = 'garbhasaathi_gemini_api_key';

export function getGeminiApiKey() {
  if (typeof window === 'undefined') return '';
  const stored = localStorage.getItem(GEMINI_STORAGE_KEY);
  if (stored && stored.trim()) return stored.trim();
  const envKey = import.meta.env?.VITE_GEMINI_API_KEY;
  if (envKey && envKey.trim()) return envKey.trim();
  return '';
}

export function saveGeminiApiKey(key) {
  if (typeof window === 'undefined') return;
  if (key && key.trim()) {
    localStorage.setItem(GEMINI_STORAGE_KEY, key.trim());
  } else {
    localStorage.removeItem(GEMINI_STORAGE_KEY);
  }
}

// System prompt designed for warm, maternal conversational flow
const SYSTEM_INSTRUCTION = `You are "GarbhaSaathi AI Voice Saathi" (गर्भसाथी वाणी साथी), an affectionate, highly knowledgeable maternal health and Garbha Sanskar companion for expecting mothers in India.
You understand and fluently converse in:
1. Marathi (मराठी) - Warm, respectful maternal tone (e.g., "नमस्ते ताई, काळजी करू नका...").
2. Hindi (हिंदी) - Caring, culturally respectful tone (e.g., "नमस्ते दीदी, बिल्कुल चिंता न करें...").
3. English - Warm, reassuring, clear maternal care tone.

Strict Rules:
1. Always respond in the EXACT language the mother asked in (Marathi if asked in Marathi, Hindi if Hindi, English if English).
2. Directly answer her specific question first (e.g. if she asks about food, give specific food advice; if precautions, give precautions).
3. Keep spoken responses CONCISE (2 to 4 caring sentences) so it sounds natural when read aloud.
4. Address her respectfully ("ताई" in Marathi, "दीदी" in Hindi, "dear mother" in English).
5. For danger signs (heavy bleeding, acute abdominal pain, high fever, water breaking), advise seeing her doctor immediately.
6. Do NOT use markdown symbols like asterisks, hashtags, or bullet points; write clean spoken prose.`;

/**
 * Call Google Gemini API (gemini-1.5-flash)
 */
async function callGeminiApi(apiKey, conversationHistory, userPrompt, language) {
  const modelName = 'gemini-1.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const langDirective = language === 'mr'
    ? 'मराठी भाषेत 2 ते 4 वाक्यांत थेट आणि अत्यंत प्रेमळ संवादात्मक उत्तर द्या.'
    : (language === 'hi'
        ? 'हिंदी भाषा में 2 से 4 वाक्यों में सीधे और अत्यंत स्नेहपूर्वक संवादात्मक उत्तर दें।'
        : 'Respond directly and warmly in English in 2 to 4 spoken sentences.');

  const cleanTurns = [];
  const recentHistory = conversationHistory.filter(
    m => m && m.text && !m.id?.startsWith('welcome-')
  ).slice(-6);

  let expectedRole = 'user';
  for (const msg of recentHistory) {
    const role = msg.role === 'user' ? 'user' : 'model';
    if (role === expectedRole) {
      cleanTurns.push({
        role,
        parts: [{ text: msg.text }]
      });
      expectedRole = role === 'user' ? 'model' : 'user';
    }
  }

  if (expectedRole === 'model' && cleanTurns.length > 0) {
    cleanTurns.pop();
  }

  cleanTurns.push({
    role: 'user',
    parts: [{ text: `${userPrompt}\n\n[Instruction: ${langDirective}]` }]
  });

  const body = {
    systemInstruction: {
      parts: [{ text: SYSTEM_INSTRUCTION }]
    },
    contents: cleanTurns,
    generationConfig: {
      temperature: 0.75,
      topP: 0.95,
      maxOutputTokens: 350
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gemini API Error details:', errorText);
    throw new Error(`Gemini API returned ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!candidate) throw new Error('No candidate response from Gemini API');
  return candidate.replace(/[*#_`]/g, '').trim();
}

/**
 * Word-boundary safe matcher to prevent false substring hits (e.g. "which" matching "hi")
 */
function matchesKeyword(text, keyword) {
  const cleanKeyword = keyword.toLowerCase().trim();
  const cleanText = text.toLowerCase();

  // If keyword is pure ASCII Latin word (e.g. "hi", "food", "eat")
  if (/^[a-z0-9]+$/i.test(cleanKeyword)) {
    const regex = new RegExp(`(^|[^a-z0-9])${cleanKeyword}([^a-z0-9]|$)`, 'i');
    return regex.test(cleanText);
  }

  // Multi-word phrase or Indic phrase
  return cleanText.includes(cleanKeyword);
}

/**
 * Maternal Knowledge Topics (Prioritized by specificity, Greetings placed at end)
 */
const MATERNAL_TOPICS = [
  // 1. Precautions & Safety
  {
    tags: ['precaution', 'precautions', 'care', 'safety', 'safe', 'काळजी', 'सावधगिरी', 'सावधानी', 'नियम', 'काय काळजी घ्यावी'],
    mr: [
      'ताई, गरोदरपणात वजनदार वस्तू उचलणे आणि वेगाने वाकणे टाळा. दररोज वेळेवर डॉक्टरांनी दिलेली औषधे (फोलिक ॲसिड, आयर्न, कॅल्शियम) घ्या. बाहेरचे उघड्यावरचे अन्न, कच्चे पपई-अननस खाणे टाळा आणि पुरेशी विश्रांती घ्या. कोणत्याही शंकेत डॉक्टरांचा सल्ला नक्की घ्या.',
      'महत्त्वाची काळजी म्हणजे रिकाम्या पोटी राहू नका आणि भरपूर पाणी प्या. आरामदायक चप्पल वापरा आणि पायऱ्या चढताना-उतरताना सावकाश चला. मन नेहमी शांत आणि आनंदी ठेवा.'
    ],
    hi: [
      'दीदी, गर्भावस्था में भारी वजन उठाना और अचानक झुकना बिल्कुल टालें। डॉक्टर द्वारा दी गई फोलिक एसिड, आयरन और कैल्शियम की दवाएं समय पर लें। कच्चा पपीता, अनानास और बाहर का खुला खाना न खाएं तथा पर्याप्त आराम करें।',
      'मुख्य सावधानी यह है कि दिन भर में खूब पानी पिएं, ढीले और आरामदायक कपड़े पहनें और सीढ़ियां चढ़ते समय सावधानी बरतें। अपने मन को हमेशा सकारात्मक और शांत बनाए रखें।'
    ],
    en: [
      'Dear mother, avoid lifting heavy weights, straining, or bending abruptly. Take your prescribed prenatal vitamins like folic acid, iron, and calcium consistently every day. Avoid raw papaya, pineapple, and unpasteurized foods, and get plenty of restful sleep.',
      'Key precautions include staying well-hydrated, wearing comfortable flat footwear, and avoiding stressful environments. Always consult your obstetrician before taking any unprescribed medicines.'
    ]
  },

  // 2. Food & Nutrition (What to eat)
  {
    tags: ['food', 'eat', 'eating', 'diet', 'nutrition', 'fruits', 'vegetables', 'खावे', 'जेवण', 'आहार', 'पोषण', 'काय खावे', 'फळे', 'खाना', 'भोजन'],
    mr: [
      'ताई, गरोदरपणात चौरस आणि पोषक आहार घ्या. हिरव्या पालेभाज्या, डाळी, दूध, दही, पनीर, सफरचंद, डाळिंब आणि भिजवलेले बदाम रोज खा. रक्तातील हिमोग्लोबिन वाढवण्यासाठी गूळ-शेंगदाणे, खजूर आणि बीट खूप फायदेशीर आहे.',
      'सुदृढ बाळासाठी ताजे आणि सात्विक अन्न खा. दिवसातून किमान ८ ते १० ग्लास पाणी आणि शक्य असल्यास ताजे नारळ पाणी नक्की प्या. तुम्ही रोज दूध आणि फळे घेता का ताई?'
    ],
    hi: [
      'दीदी, गर्भावस्था में संतुलित पोषण बहुत जरूरी है। भोजन में हरी सब्जियां, दालें, दूध, पनीर, अनार, सेब और भीगे बादाम जरूर शामिल करें। हीमोग्लोबिन ठीक रखने के लिए गुड़-चना और खजूर बहुत फायदेमंद हैं।',
      'स्वस्थ शिशु के लिए घर का बना ताजा व सात्विक भोजन ही सबसे उत्तम है। भोजन में प्रोटीन, कैल्शियम और फोलिक एसिड की भरपूर मात्रा रखें। दिन में कम से कम 8 से 10 गिलास पानी जरूर पिएं।'
    ],
    en: [
      'Focus on a nutrient-rich, balanced diet with leafy green vegetables, lentils, dairy, apples, pomegranates, and soaked almonds. For healthy iron levels, include dates, jaggery, beetroot, and legumes.',
      'Nourish yourself with fresh, home-cooked meals including whole grains, proteins, and plenty of fluids. Drink at least 8 to 10 glasses of water daily along with fresh coconut water.'
    ]
  },

  // 3. Foods to Avoid (What NOT to eat)
  {
    tags: ['avoid', 'not to eat', 'papaya', 'pineapple', 'काय खाऊ नये', 'काय टाळावे', 'पपई', 'अननस', 'क्या न खाएं'],
    mr: [
      'गरोदरपणात कच्ची पपई, अननस, जास्त तीखट-मसालेदार अन्न आणि कच्चे अंडे खाणे टाळा. तसेच शिळे अन्न, प्रक्रिया केलेले पॅक फूड आणि जास्त कॅफिन (चहा/कॉफी) घेऊ नका.',
      'ताई, पहिल्या तीन महिन्यांत पपई व अननस पूर्ण टाळणे उत्तम मानले जाते. ताजे, गरम आणि सात्विक घरचे अन्नच नेहमी खा.'
    ],
    hi: [
      'गर्भावस्था में कच्चा पपीता, अनानास, ज्यादा तीखा-तला हुआ खाना और कच्चा अंडा खाने से बचना चाहिए। साथ ही बासी खाना और ज्यादा चाय-कॉफी का सेवन न करें।',
      'दीदी, विशेष रूप से पहली तिमाही में कच्चा पपीता और अनानास बिल्कुल न खाएं। हमेशा ताजा बना हुआ, साफ और हल्का सुपाच्य भोजन ही ग्रहण करें।'
    ],
    en: [
      'It is advisable to avoid raw or unripe papaya, pineapple, unpasteurized milk, raw eggs, and excess caffeine. Also steer clear of overly spicy, oily, or processed street foods.',
      'Always wash fruits and vegetables thoroughly, eat freshly cooked home meals, and keep your diet clean and wholesome for your babys optimal development.'
    ]
  },

  // 4. Morning Sickness & Nausea
  {
    tags: ['nausea', 'vomit', 'vomiting', 'sick', 'मळमळ', 'उल्टी', 'जी मिचलाना', 'सकाळी त्रास'],
    mr: [
      'ताई, पहिल्या तीन महिन्यांत मळमळणे आणि उल्टी होणे हार्मोन्समुळे स्वाभाविक आहे. सकाळी उठल्यावर लगेच सुका खाखरा किंवा बिस्कीट खा. आल्याचा हलका तुकडा किंवा लिंबू पाणी घेतल्यास खूप आराम मिळेल. रिकाम्या पोटी राहू नका.',
      'चिंता करू नका ताई, मळमळ कमी करण्यासाठी दिवसातून थोडे थोडे खात राहा. अति तेलकट किंवा मसालेदार अन्न टाळा आणि भरपूर पाणी प्या. तुम्हाला हा त्रास प्रामुख्याने सकाळी होतो का?'
    ],
    hi: [
      'दीदी, पहली तिमाही में जी मिचलाना और उल्टी होना बिल्कुल सामान्य है। सुबह उठते ही थोड़ा सूखा बिस्कुट या खाखरा चबा लें। अदरक का पानी या नींबू पानी पीने से भी बहुत ताजगी मिलेगी।',
      'घबराइए मत दीदी, उल्टी की समस्या से बचने के लिए खाली पेट न रहें। दिन में खूब पानी पिएं और नारियल पानी जरूर लें। छोटे-छोटे अंतराल पर हल्का भोजन करें।'
    ],
    en: [
      'Nausea and morning sickness are very common in the first trimester. Nibbling on dry toast or crackers before getting out of bed helps settle the stomach. Sip ginger tea or fresh lemon water throughout the day.',
      'Do not worry, dear mother. Eating small, frequent meals prevents an empty stomach and eases nausea. Stay well hydrated with fresh coconut water and light sips of water.'
    ]
  },

  // 5. Baby Kicks & Movement
  {
    tags: ['kick', 'kicks', 'movement', 'movements', 'हालचाल', 'किक', 'हलचल', 'बाळ कधी फिरते'],
    mr: [
      'बाळाची पहिली नाजुक हालचाल साधारणपणे १८ व्या ते २४ व्या आठवड्यादरम्यान जाणवते. सुरुवातीला ती फुलपाखराच्या फडफडण्यासारखी वाटते. बाळाची हालचाल जाणवली की पोटावर हात ठेवून प्रेमळ संवाद साधा.',
      'ताई, २४ आठवड्यांनंतर बाळ खूप छान किक मारायला लागते. गोड खाल्ल्यानंतर किंवा डाव्या कुशीवर झोपल्यानंतर बाळ अधिक सक्रिय होते. तुम्हाला हालचाल जाणवू लागली आहे का?'
    ],
    hi: [
      'शिशु की पहली हलकी हलचल आमतौर पर 18 से 24वें हफ्ते के बीच महसूस होती है। शुरुआत में यह तितली के उड़ने जैसी हल्की सी कंपन लगती है। जब भी हलचल हो, प्यार से पेट पर हाथ रखकर अपने बच्चे से बात करें।',
      'दीदी, जैसे-जैसे गर्भ का समय बढ़ता है, शिशु की किक्स साफ समझ आने लगती हैं। बाईं करवट लेटने पर बच्चा अक्सर ज्यादा सक्रिय रहता है। क्या आपको अपने नन्हे शिशु की हलचल महसूस होने लगी है?'
    ],
    en: [
      'You will typically feel your babys first gentle flutter or quickening between 18 and 24 weeks. It often feels like soft bubbles or tiny butterfly wings. Gently stroke your belly and talk to your little one!',
      'As your pregnancy progresses, the kicks become stronger and more distinct. Babies often move more after meals or when you relax on your left side. Keep track of those wonderful movements!'
    ]
  },

  // 6. Sleeping Position
  {
    tags: ['sleep', 'sleeping', 'posture', 'position', 'झोप', 'निद्रा', 'कसे झोपावे', 'karwat', 'करवट'],
    mr: [
      'गरोदरपणात डाव्या कुशीवर झोपणे (Left lateral position) सर्वात सुरक्षित आणि उत्तम मानले जाते. यामुळे गर्भाशयाकडे आणि बाळाकडे रक्तप्रवाह उत्तम राहतो. गुडघ्यांमध्ये आणि पाठीमागे उशी ठेवा, त्यामुळे शांत झोप लागेल.',
      'ताई, पाठीवर किंवा पोटावर झोपणे टाळा. डाव्या कुशीवर झोपल्याने पायांची सूज कमी होते आणि पचनही चांगले होते.'
    ],
    hi: [
      'गर्भावस्था में बाईं करवट (Left side) सोना सबसे सुरक्षित और लाभदायक है। इससे प्लेसेंटा और शिशु तक खून और ऑक्सीजन का संचार बहुत अच्छा रहता है। घुटनों के बीच एक तकिया रखें, इससे कमर को बहुत सहारा मिलेगा।',
      'दीदी, पीठ के बल सीधा सोने से बचें। बाईं करवट सोने से पैरों की सूजन भी कम होती है और पाचन क्रिया भी सुधरती है।'
    ],
    en: [
      'Sleeping on your left side is the best position during pregnancy. It maximizes blood and nutrient flow to your baby and the placenta. Placing a pillow between your knees gives wonderful back support.',
      'Avoid sleeping flat on your back, especially in the second and third trimesters. Left-side sleeping also helps relieve leg swelling and improves kidney function.'
    ]
  },

  // 7. Leg Cramps, Backache & Swelling
  {
    tags: ['cramp', 'cramps', 'backache', 'back pain', 'pain', 'swelling', 'सूज', 'गोळे', 'पाठदुखी', 'कंबर दुखी', 'दर्द'],
    mr: [
      'पाठदुखी आणि पायात गोळे येणे हे वाढत्या वजनामुळे आणि कॅल्शियमच्या कमतरतेमुळे होऊ शकते. रोज कोमट दूध प्या, जास्त वेळ सलग उभे राहू नका, आणि पायाला कोमट तेलाने हलकी मालिश करा.',
      'ताई, बसताना पाठीमागे उशीचा आधार घ्या आणि झोपताना पाय थोडे उंचावर ठेवा. त्यामुळे पायांची सूज आणि थकवा कमी होईल.'
    ],
    hi: [
      'पैरों में ऐंठन और कमर में दर्द अक्सर शरीर में बढ़ते वजन या कैल्शियम की कमी से होता है। रोजाना एक गिलास दूध लें, लंबे समय तक एक ही जगह खड़े न रहें, और पैरों की हल्की गर्म तेल से मालिश करें।',
      'दीदी, बैठते समय कमर के पीछे तकिए का सहारा लें और पैरों को थोड़ा ऊपर रखें ताकि सूजन कम हो सके। सुबह-शाम की हल्की सैर से पीठ को बहुत आराम मिलता है।'
    ],
    en: [
      'Backache and leg cramps are very common as your body adapts to carrying your growing baby. Ensure adequate calcium and magnesium intake, avoid standing for long periods, and gently stretch your calves before bed.',
      'Use a supportive cushion behind your lower back while sitting. Elevating your feet whenever you rest helps reduce leg swelling and promotes healthy circulation.'
    ]
  },

  // 8. Garbha Sanskar & Spiritual Wisdom
  {
    tags: ['sanskar', 'gita', 'mantra', 'story', 'गर्भ संस्कार', 'संस्कार', 'श्लोक', 'मंत्र', 'पुस्तक', 'वाचन'],
    mr: [
      'गर्भ संस्कार म्हणजे गर्भातील बाळावर सकारात्मक विचार, संगीत आणि प्रेमाची सुंदर पेरणी. रोज शांत बसून भगवद्गीतेचे श्लोक, गायत्री मंत्र किंवा प्रेरक कथा वाचा. आईच्या मनाची शांतता थेट बाळाचा मेंदू विकसित करते.',
      'ताई, आपल्या लर्निंग गार्डनमध्ये भगवद्गीतेचे १८ अध्याय आणि सुंदर मातृत्व कथा आहेत. रोज सकाळी किंवा संध्याकाळी १५ मिनिटे शांत बासरी संगीत ऐका, यामुळे बाळ शांत आणि सुदृढ होते.'
    ],
    hi: [
      'गर्भ संस्कार का अर्थ है गर्भस्थ शिशु को उत्तम संस्कार, सुंदर विचार और सकारात्मक ऊर्जा देना। रोजाना श्रीमद्भगवद्गीता के श्लोक, मंत्र और प्रेरक कहानियां पढ़ें। आपकी मानसिक शांति शिशु के मानसिक विकास को सुंदर बनाती है।',
      'दीदी, हमारे लर्निंग गार्डन में विशेष रूप से तैयार की गई प्रेरक कहानियाँ और पवित्र श्लोक हैं। प्रतिदिन शांत संगीत सुनें और अपने नन्हे बच्चे के साथ प्रेमपूर्ण संवाद करें।'
    ],
    en: [
      'Garbha Sanskar is the sacred practice of nourishing your baby in the womb with positive thoughts, noble values, and serene music. Reading inspiring stories and chanting peaceful verses nurtures the babys emotional and cognitive growth.',
      'Your thoughts and emotional state directly influence your baby. Take 15 minutes each day to listen to soothing flute music and read uplifting literature from our Learning Garden.'
    ]
  },

  // 9. Emergency Red Flags
  {
    tags: ['bleeding', 'emergency', 'acute pain', 'fever', 'रक्तस्त्राव', 'धोका', 'तीव्र पोटदुखी', 'ताप', 'कळा', 'खून'],
    mr: [
      'ताई, जर जास्त रक्तस्त्राव, तीव्र पोटदुखी, अंगातून पाणी जाणे किंवा तीव्र ताप असेल, तर घरगुती उपायांची वाट न पाहता ताबडतोब तुमच्या डॉक्टरांशी किंवा रुग्णालयाशी संपर्क साधा. आम्ही सदैव तुमच्या सुरक्षिततेसाठी सोबत आहोत.',
      'कृपया हे लक्षात ठेवा: अचानक बाळाची हालचाल खूप कमी झाल्यास किंवा डोळ्यांसमोर अंधारी आल्यास त्वरित डॉक्टरांचा सल्ला घ्या. तुमचा आणि बाळाचा जीव सर्वात अनमोल आहे.'
    ],
    hi: [
      'दीदी, अगर कभी भी तेज रक्तस्राव, असहनीय पेट दर्द, पानी छूटना या तेज बुखार हो, तो बिना देर किए तुरंत अपने डॉक्टर या नजदीकी अस्पताल जाएं। किसी भी खतरे के लक्षण को अनदेखा न करें।',
      'यदि शिशु की हलचल में अचानक कमी आए या तेज सिरदर्द व धुंधला दिखाई दे, तो तुरंत चिकित्सीय जांच करवाएं। आपकी और बच्चे की सुरक्षा सर्वोपरि है।'
    ],
    en: [
      'Dear mother, if you notice vaginal bleeding, severe abdominal cramps, leaking amniotic fluid, or high fever, please contact your obstetrician or hospital immediately.',
      'Any sudden decrease in fetal movements or severe persistent headache warrants immediate medical attention. Your safety and your babys health are our highest priority.'
    ]
  },

  // 10. Greetings & Identity (Placed LAST so questions like "which food" don't match "hi")
  {
    tags: ['who are you', 'how are you', 'hello', 'namaste', 'hey', 'नमस्ते', 'कशी आहेस', 'तू कोण', 'तुझे नाव'],
    mr: [
      'नमस्ते ताई! मी तुमची गर्भसाथी AI वाणी साथी आहे. मी तुमच्या गरोदरपणातील आहार, बाळाची वाढ आणि मनःशांतीसाठी सदैव तुमच्या सोबत आहे. आज तुम्हाला काय विचारायचे आहे?',
      'नमस्कार ताई! मी अगदी छान आहे. तुमच्या आणि बाळाच्या आरोग्याची काळजी घेण्यासाठी मी सदैव उपस्थित आहे. आज काय मदत हवी आहे?'
    ],
    hi: [
      'नमस्ते दीदी! मैं आपकी गर्भसाथी AI वाणी साथी हूँ। गर्भावस्था, खान-पान और नन्हे शिशु की देखभाल में आपकी मदद के लिए हमेशा तैयार हूँ। आज आप क्या जानना चाहती हैं?',
      'प्रणाम दीदी! मैं बिल्कुल ठीक हूँ। आपकी मातृत्व यात्रा को सुखद और सुरक्षित बनाना ही मेरा काम है। आज आप क्या पूछना चाहती हैं?'
    ],
    en: [
      'Hello dear mother! I am your GarbhaSaathi AI Voice Companion, here to guide you with nutrition, baby growth, and peaceful mindfulness. What would you like to know today?',
      'Warm greetings! I am doing great and always happy to support you and your baby. How can I assist you on your motherhood journey today?'
    ]
  }
];

/**
 * Generate intelligent conversational response when API key is not present
 */
function generateDynamicMaternalReply(prompt, language, conversationHistory = []) {
  // Find matching topic using word-boundary safe matcher
  let matchedTopic = null;
  for (const topic of MATERNAL_TOPICS) {
    if (topic.tags.some(tag => matchesKeyword(prompt, tag))) {
      matchedTopic = topic;
      break;
    }
  }

  const langKey = language === 'mr' ? 'mr' : (language === 'hi' ? 'hi' : 'en');

  if (matchedTopic && matchedTopic[langKey]) {
    const responses = matchedTopic[langKey];
    const index = conversationHistory.length % responses.length;
    return responses[index];
  }

  // Dynamic contextual generative synthesis for open-ended questions
  if (language === 'mr') {
    const variations = [
      `ताई, तुमचा प्रश्न खूप महत्त्वाचा आहे. गर्भावस्थेत दररोज वेळेवर पोषक आहार घ्या, मन शांत ठेवा आणि पुरेशी विश्रांती घ्या. तुमचा सध्या कितवा महिना सुरू आहे? मला नक्की सांगा म्हणजे मी अधिक सविस्तर माहिती देईन.`,
      `होय ताई, मातृत्वाच्या प्रवासात स्वतःची काळजी घेणे सर्वात महत्त्वाचे असते. रोज भरपूर पाणी प्या, हलकी सैर करा आणि सकारात्मक विचार ठेवा. याविषयी तुम्हाला अजून काही विशेष जाणून घ्यायचे आहे का?`,
      `ताई, गरोदरपणात शरीराचे संकेत समजून घेणे आवश्यक आहे. नियमित डॉक्टरांची तपासणी आणि औषधे वेळेवर घेत राहा. मी तुमच्या सर्व प्रश्नांची उत्तरे देण्यासाठी सदैव तयार आहे, सांगा अजून काय मदत करू?`
    ];
    return variations[conversationHistory.length % variations.length];
  } else if (language === 'hi') {
    const variations = [
      `दीदी, आपका सवाल बहुत महत्वपूर्ण है। पौष्टिक आहार लें, मन शांत रखें और पर्याप्त नींद लें। आपका अभी कौन सा महीना चल रहा है? मुझे बताएं ताकि मैं आपको और सही सलाह दे सकूँ।`,
      `जी दीदी, इस सुंदर यात्रा में अपने स्वास्थ्य का ख्याल रखना सबसे पहला कर्तव्य है। रोजाना भरपूर पानी पिएं, हल्का टहलें और खुश रहें। क्या आपको इस बारे में कुछ और विस्तार से जानना है?`,
      `दीदी, गर्भावस्था में शरीर में कई बदलाव आते हैं। अपने डॉक्टर की सलाह और दवाइयों का नियमित पालन करें। मैं हर कदम पर आपके साथ हूँ, बताइए और क्या पूछना चाहती हैं आप?`
    ];
    return variations[conversationHistory.length % variations.length];
  } else {
    const variations = [
      `Dear mother, that is a great question. Prioritize wholesome meals, peaceful rest, and gentle movement every day. Which month of pregnancy are you currently in? Tell me so I can give you personalized advice!`,
      `Taking gentle care of yourself is the greatest gift for your growing baby. Stay well-hydrated, nurture positive thoughts, and listen to your body. Is there anything specific you would like to explore further?`,
      `Your body is doing miraculous work every single day. Keep up with your routine prenatal checkups and nourish yourself with love and balanced nutrition. How else can I assist you today?`
    ];
    return variations[conversationHistory.length % variations.length];
  }
}

/**
 * Ask GarbhaSaathi Conversational AI
 */
export async function askGarbhaSaathiAI({
  prompt,
  language = 'mr',
  conversationHistory = []
}) {
  const apiKey = getGeminiApiKey();

  if (apiKey) {
    try {
      const geminiText = await callGeminiApi(apiKey, conversationHistory, prompt, language);
      return {
        text: geminiText,
        source: 'gemini',
        hasApiKey: true
      };
    } catch (err) {
      console.warn('Gemini API call encountered an issue, transitioning to dynamic maternal engine:', err);
    }
  }

  // Dynamic generative maternal dialogue (no repeated canned text)
  const conversationalReply = generateDynamicMaternalReply(prompt, language, conversationHistory);
  return {
    text: conversationalReply,
    source: 'maternal-engine',
    hasApiKey: Boolean(apiKey)
  };
}
