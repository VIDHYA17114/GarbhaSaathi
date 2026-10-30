/**
 * learningGardenData.js
 * Content library for the Learning Garden section of GarbhaSaathi.
 * Includes: Books, Bhagavad Gita chapters, Stories, Quotes & Knowledge.
 * Trilingual: Hindi (hi), English (en), Marathi (mr)
 */

// ── BOOKS ──────────────────────────────────────────────────────────────────

export const LEARNING_BOOKS = [
  // ── Pregnancy, Nutrition & Baby Care Series ──
  {
    id: 'book-healthy-pregnancy',
    category: 'pregnancy',
    topic: 'pregnancy',
    titleEn: 'Healthy Pregnancy: Month-by-Month Guide',
    titleHi: 'स्वस्थ गर्भावस्था: माह-दर-माह मार्गदर्शिका',
    titleMr: 'निरोगी गर्भावस्था: महिन्यागणिक मार्गदर्शिका',
    descEn: 'A complete guide to understanding your pregnancy month by month, from conception to birth.',
    descHi: 'गर्भधारण से लेकर प्रसव तक, हर माह की शारीरिक एवं मानसिक विकास की पूरी जानकारी।',
    descMr: 'गर्भधारणेपासून प्रसूतीपर्यंत, प्रत्येक महिन्याचे सविस्तर शारीरिक व मानसिक मार्गदर्शन।',
    authorEn: 'GarbhaSaathi Medical & Wellness Team',
    authorHi: 'गर्भसाथी चिकित्सा एवं वेलनेस दल',
    authorMr: 'गर्भसाथी वैद्यकीय व वेलनेस गट',
    coverGradient: 'from-pink-400 via-rose-400 to-pink-500',
    coverEmoji: '🤱',
    readTime: '50+ min',
    chapterCount: 9,
    audioAvailable: false,
    languages: ['hi', 'en', 'mr'],
    chapters: [
      {
        id: 'hp-ch1', number: 1,
        titleEn: 'Month 1 – The Miracle of Conception & Beginning of Life',
        titleHi: 'माह 1 – जीवन की शुरुआत एवं गर्भाधान का चमत्कार',
        titleMr: 'महिना 1 – जीवनाची सुरुवात आणि गर्भाधानाचा चमत्कार',
        readTime: '5 min',
        contentHi: `## माह 1 – जीवन की शुरुआत एवं गर्भाधान का चमत्कार

गर्भधारण के पहले माह में आपका शरीर एक अत्यंत चमत्कारिक और पवित्र यात्रा शुरू करता है। इस अवधि में निषेचित अंडा (Zygote) गर्भाशय की दीवार में सुरक्षित रूप से प्रत्यारोपित होता है और भ्रूण का निर्माण आरंभ होता है।

### इस माह आपके शरीर में होने वाले सामान्य परिवर्तन
- **मासिक धर्म का रुकना:** यह गर्भावस्था का पहला और सबसे स्पष्ट संकेत है।
- **थकान और सुस्ती:** प्रोजेस्टेरोन हार्मोन के स्तर में तीव्र वृद्धि के कारण ऊर्जा कम महसूस हो सकती है।
- **स्तनों में संवेदनशीलता व भारीपन:** दूध ग्रंथियों की तैयारी अभी से शुरू हो जाती है।
- **हल्की मतली या गंध से चिढ़:** विशेषकर सुबह के समय (Morning Sickness)।
- **बार-बार पेशाब आना:** श्रोणि क्षेत्र में रक्त प्रवाह बढ़ने से मूत्राशय पर दबाव पड़ता है।

### गर्भ में शिशु का विकास
पहले माह के अंत तक भ्रूण का आकार खसखस के दाने से बढ़कर लगभग 0.4 इंच (1 सेमी) तक पहुंच जाता है। 
- 22वें दिन के आसपास शिशु के नन्हे हृदय की धड़कन आरंभ हो जाती है।
- मस्तिष्क और रीढ़ की हड्डी के लिए न्यूरल ट्यूब (Neural Tube) का निर्माण शुरू हो जाता है।
- चेहरे, आंखों और कानों की प्राथमिक संरचनाएं बनने लगती हैं।

### पोषण और जीवनशैली के नियम
- **फोलिक एसिड (400-800 mcg/दिन):** डॉक्टर की सलाह से फोलिक एसिड की गोली अवश्य लें। यह न्यूरल ट्यूब दोषों (Spina Bifida) से 70% तक रक्षा करती है।
- **संतुलित थाली:** हरी पत्तेदार सब्जियां (पालक, मेथी), दालें, साबुत अनाज, फल और अंकुरित अनाज लें।
- **कैल्शियम और प्रोटीन:** दूध, दही, पनीर, भुने चने और मेवे शामिल करें।
- **भरपूर जलपान:** प्रतिदिन 8 से 10 गिलास गुनगुना या स्वच्छ पानी पिएं।

### क्या करें और क्या न करें
✅ तुरंत प्रसवपूर्व जांच (First Prenatal Check-up) शेड्यूल करें।
✅ 8-9 घंटे की आरामदायक नींद लें और दिन में हल्का विश्राम करें।
✅ 15-20 मिनट की शांत, धीमी सैर करें।
❌ बिना डॉक्टर की अनुमति के कोई भी दवाई न लें।
❌ धूम्रपान, शराब, कच्चा पपीता और अत्यधिक कैफीन से पूरी तरह बचें।
❌ भारी वजन उठाना या अचानक झुकना-कूदना वर्जित रखें।

### मन और भावनाएं
गर्भधारण का पता चलने पर खुशी, विस्मय और थोड़ी घबराहट होना स्वाभाविक है। अपनी भावनाएं अपने साथी और परिवार से साझा करें।

**मुख्य निष्कर्ष:** पहला माह नींव रखने का समय है। फोलिक एसिड, संतुलित भोजन और मन की शांति आपके नन्हे शिशु का सबसे बड़ा संबल हैं।`,
        contentEn: `## Month 1 – The Miracle of Conception & Beginning of Life

The first month of pregnancy marks the sacred start of an extraordinary journey. A fertilised egg safely implants into the uterine lining, and the cellular foundations of a new life begin to form.

### Changes in Your Body
- **Missed Period:** Usually the earliest clear indicator of pregnancy.
- **Fatigue:** Rising progesterone levels naturally cause your body to request more rest.
- **Breast Tenderness:** Hormonal preparation of milk glands begins early.
- **Mild Nausea or Food Aversions:** Often triggered by heightened sensitivity to smells.
- **Frequent Urination:** Increased pelvic blood flow places gentle pressure on the bladder.

### Baby's Development
By the end of Month 1, the embryo grows from a microscopic dot to about 0.4 inches (1 cm).
- The tiny heart begins beating around Day 22.
- The neural tube, which forms the brain and spinal cord, closes and develops.
- Budding forms of facial features, eyes, and inner ears take shape.

### Nutrition & Lifestyle Essentials
- **Folic Acid (400–800 mcg/day):** Non-negotiable prenatal nutrient that prevents up to 70% of neural tube defects.
- **Balanced Plate:** Dark leafy greens, lentils, whole grains, nuts, and fresh seasonal fruits.
- **Hydration:** 8–10 glasses of clean, filtered water daily to support expanding blood volume.

### Key Takeaways
✅ Schedule your first prenatal doctor consultation.
✅ Get 8–9 hours of sleep and rest when tired.
❌ Avoid alcohol, smoking, raw papaya, and unprescribed medications.`,
        contentMr: `## महिना 1 – जीवनाची सुरुवात आणि गर्भाधानाचा चमत्कार

गर्भधारणेच्या पहिल्या महिन्यात आपल्या शरीरात एका अद्भुत, पवित्र प्रवासाची सुरुवात होते. फलित अंडे गर्भाशयात सुरक्षितपणे रुजते आणि नव्या जीवाची पायाभरणी होते.

### शरीरातील बदल
- **मासिक पाळी थांबणे:** गर्भधारणेचे पहिले आणि प्रमुख लक्षण.
- **थकवा व अशक्तपणा:** प्रोजेस्टेरॉन हार्मोन वाढल्यामुळे शरीराला विश्रांतीची गरज भासते.
- **स्तनांमध्ये कोमलता:** दूध ग्रंथींची पूर्वतयारी सुरू होते.
- **सौम्य मळमळ किंवा वास न आवडणे:** सकाळी विशेषतः जाणवते.

### बाळाचा विकास
पहिल्या महिन्याच्या शेवटी बाळ सुमारे 1 सेमी इतके असते. 22 व्या दिवसाच्या आसपास हृदयाचे ठोके सुरू होतात आणि मेंदू व मणक्याची निर्मिती सुरू होते.

### पोषण सूचना
- **फोलिक अॅसिड (400-800 mcg/दिवस):** मेंदू व मणक्याचे जन्मजात दोष रोखण्यासाठी अत्यंत आवश्यक.
- **आहार:** हिरव्या पालेभाज्या, डाळी, दूध, दही आणि सुकामेवा.`,
        keyTakeawaysEn: ['Start daily folic acid immediately', 'Schedule first prenatal visit', 'Rest adequately and stay hydrated', 'Avoid alcohol, smoking, and self-medication'],
        keyTakeawaysHi: ['प्रतिदिन फोलिक एसिड की गोली शुरू करें', 'डॉक्टर से पहली प्रसवपूर्व जांच कराएं', 'भरपूर पानी पिएं और पर्याप्त आराम करें', 'धूम्रपान, शराब व बिना सलाह दवाइयों से बचें'],
        keyTakeawaysMr: ['दररोज फोलिक अॅसिड गोळी सुरू करा', 'डॉक्टरांकडे पहिली तपासणी करून घ्या', 'भरपूर पाणी प्या आणि शांत विश्रांती घ्या', 'धूम्रपान व स्वतःहून औषधे घेणे टाळा']
      },
      {
        id: 'hp-ch2', number: 2,
        titleEn: 'Month 2 – Baby Features & Organ Formation',
        titleHi: 'माह 2 – शिशु के अंगों का निर्माण एवं शारीरिक परिवर्तन',
        titleMr: 'महिना 2 – बाळाचे अवयव व शरीराची निर्मिती',
        readTime: '5 min',
        contentHi: `## माह 2 – शिशु के अंगों का निर्माण एवं शारीरिक परिवर्तन

दूसरे माह में शिशु का विकास असाधारण गति से होता है। यह ऑर्गनोजेनेसिस (Organogenesis) यानी प्रमुख अंगों के बनने का सबसे संवेदनशील समय है।

### शिशु का विकास
- नन्हे हाथ-पैर की कलियां (Limb buds) निकलती हैं, उंगलियां और अंगूठे अलग होने लगते हैं।
- चेहरे पर नाक, ऊपरी होंठ, पलकें और कान की बनावट स्पष्ट होती है।
- यकृत, गुर्दे और पाचन तंत्र कार्य करना शुरू कर देते हैं।
- शिशु की लंबाई लगभग 1 से 1.2 इंच (2.5 सेमी) और वजन लगभग 2 ग्राम हो जाता है।

### माँ के लक्षण
- मॉर्निंग सिकनेस (उल्टी/जी मिचलाना) अपने चरम पर हो सकती है।
- मनोदशा में उतार-चढ़ाव (Mood Swings) हार्मोन्स के कारण सामान्य हैं।
- कपड़ों में कमर के आसपास हल्का कसाव महसूस हो सकता है।

### उपयोगी सुझाव
- खाली पेट न रहें; सुबह उठते ही सूखा बिस्कुट या भुने चने खाएं।
- दिन में 3 बड़े भोजन के बजाय 5-6 छोटे पौष्टिक भोजन लें।
- अदरक की चाय या नींबू पानी मतली में प्राकृतिक राहत देता है।`,
        contentEn: `## Month 2 – Baby Features & Organ Formation

Month 2 is the critical phase of organogenesis, where all major internal organs and external body structures begin their primary formation.

### Baby's Milestones
- Tiny limb buds emerge and gradually develop into fingers and toes.
- Facial features—eyelids, ears, tip of the nose, and lips—become identifiable.
- The neural network is expanding rapidly, generating thousands of brain cells per minute.
- By week 8, your baby is medically classified as a fetus rather than an embryo.

### Managing Morning Sickness
- Eat small, frequent meals throughout the day instead of 3 heavy meals.
- Keep roasted gram or whole grain crackers beside your bed for morning nausea.
- Sip ginger water or light lemon infusion to calm the stomach.`,
        contentMr: `## महिना 2 – बाळाचे अवयव व शरीराची निर्मिती

दुसऱ्या महिन्यात बाळाच्या अवयवांची निर्मिती वेगाने होते.

### बाळाची वाढ
- हात आणि पायांची नन्ही बोटे तयार होऊ लागतात.
- डोळे, कान आणि नाकाची ठेवण तयार होते.
- हृदय नियमित गतीने धडधडते.

### काळजी
- उपाशीपोटी राहू नका; थोडे-थोडे वारंवार खा.
- आले आणि लिंबू पाणी मळमळीवर उत्तम घरगुती उपाय आहे.`,
        keyTakeawaysEn: ['Critical organ formation phase', 'Manage morning sickness with small frequent meals', 'Keep hydrated with lemon or ginger water'],
        keyTakeawaysHi: ['प्रमुख अंगों के निर्माण का संवेदनशील समय', 'थोड़ा-थोड़ा बार-बार खाकर मतली नियंत्रित करें', 'नींबू-अदरक पानी से राहत पाएं'],
        keyTakeawaysMr: ['अवयव निर्मितीचा अत्यंत महत्त्वाचा काळ', 'थोडे-थोडे वारंवार खाऊन मळमळ कमी करा', 'लिंबू व आल्याच्या पाण्याचा वापर करा']
      },
      {
        id: 'hp-ch3', number: 3,
        titleEn: 'Month 3 – End of First Trimester & Vital Milestones',
        titleHi: 'माह 3 – पहली तिमाही का समापन एवं महत्वपूर्ण पड़ाव',
        titleMr: 'महिना 3 – पहिल्या तिमाहीची सांगता व महत्त्वाचे टप्पे',
        readTime: '6 min',
        contentHi: `## माह 3 – पहली तिमाही का समापन

तीसरे माह के अंत के साथ आपकी पहली तिमाही पूरी होती है। गर्भपात का जोखिम काफी कम हो जाता है और अधिकांश माताओं को मतली से राहत मिलने लगती है।

### शिशु के विकास के मील के पत्थर
- शिशु की लंबाई लगभग 3 से 3.5 इंच हो जाती है।
- हाथ की नन्हीं मुट्ठियां खुलना और बंद होना शुरू हो जाती हैं।
- शिशु के चेहरे पर हावभाव बनने लगते हैं और वह अंगूठा चूसना सीखता है।
- अल्ट्रासाउंड (NT Scan) में शिशु के हृदय की स्पष्ट धड़कन सुनी जा सकती है।`,
        contentEn: `## Month 3 – End of First Trimester & Vital Milestones

Completing Month 3 brings you to the finish line of the first trimester. Risk of complications drops markedly, and many women begin finding relief from early nausea.`,
        contentMr: `## महिना 3 – पहिल्या तिमाहीची सांगता

तिसऱ्या महिन्यासह पहिली तिमाही पूर्ण होते. बाळाची वाढ आता स्थिर होते.`,
        keyTakeawaysEn: ['NT scan and first-trimester screening', 'Morning sickness usually subsides', 'Placenta takes over hormone production'],
        keyTakeawaysHi: ['एनटी स्कैन एवं प्रथम तिमाही की जांच', 'मतली में कमी आने लगती है', 'प्लेसेंटा पोषण का पूर्ण कार्यभार संभालता है'],
        keyTakeawaysMr: ['एनटी स्कॅन व आवश्यक वैद्यकीय तपासण्या', 'मळमळ कमी होऊन भूक सुधारते']
      }
    ]
  },

  {
    id: 'book-nutrition',
    category: 'pregnancy',
    topic: 'nutrition',
    titleEn: 'Pregnancy Nutrition and Food Safety',
    titleHi: 'गर्भावस्था पोषण एवं भोजन सुरक्षा',
    titleMr: 'गर्भावस्था पोषण आणि अन्न सुरक्षा',
    descEn: 'Comprehensive, science-backed guidance on macro and micronutrients, seasonal Indian foods, and dietary safety.',
    descHi: 'गर्भावस्था के दौरान जरूरी विटामिन्स, खनिज, पारंपरिक भारतीय आहार और भोजन सुरक्षा के संपूर्ण नियम।',
    descMr: 'गर्भावस्थेतील आवश्यक जीवनसत्त्वे, खनिजे, पारंपरिक भारतीय आहार व अन्न सुरक्षेचे परिपूर्ण नियम.',
    authorEn: 'GarbhaSaathi Clinical Nutrition Panel',
    authorHi: 'गर्भसाथी पोषण विशेषज्ञ परिषद',
    authorMr: 'गर्भसाथी पोषणतज्ज्ञ मंडळ',
    coverGradient: 'from-amber-400 via-orange-400 to-amber-500',
    coverEmoji: '🥗',
    readTime: '30+ min',
    chapterCount: 5,
    audioAvailable: false,
    languages: ['hi', 'en', 'mr'],
    chapters: [
      {
        id: 'nu-ch1', number: 1,
        titleEn: 'Macro & Micro Nutrients for Two',
        titleHi: 'दो शरीरों के लिए आवश्यक पोषक तत्व',
        titleMr: 'दोन जिवांसाठी आवश्यक पोषक घटक',
        readTime: '7 min',
        contentHi: `## दो शरीरों के लिए आवश्यक पोषक तत्व

गर्भावस्था में केवल "दो लोगों जितना खाना" जरूरी नहीं है, बल्कि "दोगुना पोषक खाना" आवश्यक है।

### प्रमुख स्तंभ
1. **आयरन (Iron - 27-30 mg/दिन):** खून में हीमोग्लोबिन बढ़ाकर शिशु तक पर्याप्त ऑक्सीजन पहुंचाता है। पालक, चुकंदर, अनार, गुड़-चना और खजूर प्राकृतिक स्रोत हैं।
2. **कैल्शियम (Calcium - 1000-1200 mg/दिन):** शिशु की हड्डियों व दांतों का निर्माण। दूध, दही, पनीर, तिल, रागी और मखाना लें।
3. **प्रोटीन (Protein - 70-80 g/दिन):** ऊतकों और अंगों के निर्माण का आधार। दालें, राजमा, छोले, अंडे और पनीर नियमित लें।
4. **डीएचए / ओमेगा-3 (DHA/Omega-3):** शिशु के मस्तिष्क व आंखों के विकास के लिए अखरोट, अलसी के बीज और चिया सीड्स लें।`,
        contentEn: `## Macro & Micro Nutrients for Two

During pregnancy, eating for two does not mean doubling portion sizes; it means doubling the nutrient density of every meal.`,
        contentMr: `## दोन जिवांसाठी आवश्यक पोषक घटक

गर्भावस्थेत दोन लोकांचे अन्न खाण्याऐवजी दुप्पट पोषण असलेले अन्न खाणे महत्त्वाचे आहे.`,
        keyTakeawaysEn: ['Focus on nutrient density, not just calories', 'Iron with Vitamin C for optimal absorption', 'Include calcium-rich dairy or ragi daily'],
        keyTakeawaysHi: ['कैलोरी से अधिक पोषक तत्वों की गुणवत्ता पर ध्यान दें', 'आयरन के साथ नींबू पानी लें जिससे अवशोषण बढ़े', 'दूध, रागी और मखाने से कैल्शियम पूरा करें'],
        keyTakeawaysMr: ['कॅलरीजपेक्षा अन्नाच्या गुणवत्तेवर भर द्या', 'लोहाचे शोषण वाढवण्यासाठी क जीवनसत्त्व घ्या', 'दूध, नाचणी व मखाण्यातून कॅल्शियम मिळवा']
      }
    ]
  },

  {
    id: 'book-baby-development',
    category: 'pregnancy',
    topic: 'baby',
    titleEn: 'Understanding Baby Development',
    titleHi: 'गर्भस्थ शिशु का विकास एवं संवेदी चेतना',
    titleMr: 'गर्भातील बाळाचा विकास आणि संवेदी जाणीव',
    descEn: 'How your baby hears, feels, tastes, and responds to your voice and heartbeat week by week.',
    descHi: 'सप्ताह-दर-सप्ताह जानिए आपका शिशु कैसे सुनता है, स्वाद लेता है और आपकी आवाज पर प्रतिक्रिया देता है।',
    descMr: 'आठवड्यागणिक जाणून घ्या बाळ कसे ऐकते, चव ओळखते आणि तुमच्या आवाजाला प्रतिसाद देते.',
    authorEn: 'Dr. Ananya Sen, Fetal Medicine Specialist',
    authorHi: 'डॉ. अनन्या सेन, भ्रूण चिकित्सा विशेषज्ञ',
    authorMr: 'डॉ. अनन्या सेन, फिटल मेडिसिन तज्ज्ञ',
    coverGradient: 'from-blue-400 via-sky-400 to-indigo-500',
    coverEmoji: '👶',
    readTime: '25 min',
    chapterCount: 4,
    audioAvailable: false,
    languages: ['hi', 'en', 'mr'],
    chapters: [
      {
        id: 'bd-ch1', number: 1,
        titleEn: 'The Senses in the Womb: Hearing & Feeling',
        titleHi: 'गर्भ में इंद्रियों का जागरण: सुनना और महसूस करना',
        titleMr: 'गर्भातील संवेदनांचे जागरण: ऐकणे आणि अनुभवणे',
        readTime: '6 min',
        contentHi: `## गर्भ में इंद्रियों का जागरण

20वें सप्ताह से शिशु की सुनने की क्षमता सक्रिय हो जाती है। सबसे पहली और प्रिय ध्वनि जो शिशु सुनता है, वह है माँ के दिल की धड़कन (Mother's Heartbeat) और उसकी सांसों की लय।

- जब माँ गाती है या शांत स्वर में बात करती है, शिशु की हृदय गति स्थिर और शांत हो जाती है।
- शास्त्रीय संगीत, बांसुरी की धुन या मधुर श्लोक शिशु के तंत्रिका तंत्र (Nervous System) को सकारात्मक रूप से प्रभावित करते हैं।`,
        contentEn: `## The Senses in the Womb: Hearing & Feeling

From the 20th week onwards, the fetal auditory system becomes functional. The very first rhythm your baby imprints upon is your steady, reassuring heartbeat.`,
        contentMr: `## गर्भातील संवेदनांचे जागरण

20 व्या आठवड्यापासून बाळ आवाज ऐकू शकते. आईच्या हृदयाचे ठोके हा बाळाचा सर्वात प्रिय आणि शांत करणारा आवाज असतो.`,
        keyTakeawaysEn: ['Auditory system active from week 20', 'Mother voice calms fetal heart rate', 'Gentle music nurtures brain pathways'],
        keyTakeawaysHi: ['20वें सप्ताह से सुनने की क्षमता सक्रिय', 'माँ की आवाज शिशु को शांति देती है', 'मधुर संगीत शिशु के मस्तिष्क को पोषित करता है'],
        keyTakeawaysMr: ['20 व्या आठवड्यापासून ऐकण्याची क्षमता सुरू', 'आईचा आवाज बाळाला शांत करतो']
      }
    ]
  },

  {
    id: 'book-newborn-care',
    category: 'pregnancy',
    topic: 'newborn',
    titleEn: 'Preparing for Newborn Care',
    titleHi: 'नवजात शिशु देखभाल: प्रथम वर्ष की तैयारी',
    titleMr: 'नवजात बाळाची काळजी: पहिल्या वर्षाची पूर्वतयारी',
    descEn: 'Essential preparation for breastfeeding, bathing, swaddling, safe sleep, and newborn wellness.',
    descHi: 'स्तनपान, मालिश, सुरक्षित नींद, टीकाकरण और नवजात शिशु की प्राथमिक देखभाल की व्यावहारिक सीख।',
    descMr: 'स्तनपान, अंघोळ, सुरक्षित झोप, लसीकरण आणि बाळाच्या प्राथमिक काळजीचे प्रात्यक्षिक मार्गदर्शन.',
    authorEn: 'Sister Mary & GarbhaSaathi Pediatricians',
    authorHi: 'सिस्टर मेरी एवं गर्भसाथी बाल रोग विशेषज्ञ',
    authorMr: 'सिस्टर मेरी व गर्भसाथी बालरोगतज्ज्ञ',
    coverGradient: 'from-emerald-400 via-teal-400 to-green-500',
    coverEmoji: '🍼',
    readTime: '35 min',
    chapterCount: 5,
    audioAvailable: false,
    languages: ['hi', 'en', 'mr'],
    chapters: [
      {
        id: 'nb-ch1', number: 1,
        titleEn: 'The Golden Hour: First Breastfeed & Bonding',
        titleHi: 'गोल्डन ऑवर: प्रथम स्तनपान एवं त्वचा से त्वचा का स्पर्श',
        titleMr: 'गोल्डन अवर: पहिले स्तनपान आणि त्वचेचा स्पर्श',
        readTime: '7 min',
        contentHi: `## गोल्डन ऑवर: प्रथम स्तनपान

जन्म के पहले 60 मिनट को 'गोल्डन ऑवर' (Golden Hour) कहा जाता है। 
- बच्चे को जन्म के तुरंत बाद माँ की छाती पर नग्न त्वचा से त्वचा (Skin-to-Skin Contact) रखा जाना चाहिए।
- पहला गाढ़ा पीला दूध (Colostrum) शिशु का प्रथम प्राकृतिक टीका है, जो उसे आजीवन रोगों से लड़ने की रोग प्रतिरोधक क्षमता (Immunity) देता है।`,
        contentEn: `## The Golden Hour: First Breastfeed & Bonding

The first 60 minutes after birth are celebrated worldwide as the Golden Hour. Immediate skin-to-skin contact regulates the newborn's temperature, heart rate, and initiates the breastfeeding reflex.`,
        contentMr: `## गोल्डन अवर: पहिले स्तनपान

जन्मानंतरचा पहिला तास बाळाच्या आरोग्यासाठी अत्यंत महत्त्वाचा असतो. आईच्या छातीवर बाळाचा स्पर्श आणि पहिले पिवळे दूध (कोलोस्ट्रम) ही बाळाची पहिली नैसर्गिक लस आहे.`,
        keyTakeawaysEn: ['Skin-to-skin within 60 minutes', 'Colostrum is liquid gold immunity', 'Safe sleeping on baby back always'],
        keyTakeawaysHi: ['जन्म के 60 मिनट में त्वचा से त्वचा स्पर्श', 'पहला पीला दूध (कोलोस्ट्रम) अमृत तुल्य है', 'शिशु को हमेशा पीठ के बल सुलाएं'],
        keyTakeawaysMr: ['जन्मानंतर लगेच त्वचेचा स्पर्श', 'पहिले पिवळे दूध बाळाची प्रतिकारशक्ती वाढवते']
      }
    ]
  },

  {
    id: 'book-postpartum-care',
    category: 'pregnancy',
    topic: 'postpartum',
    titleEn: 'Postpartum Care and Recovery',
    titleHi: 'प्रसवोत्तर स्वास्थ्य एवं पुनर्प्राप्ति (सूतिका परिचर्या)',
    titleMr: 'प्रसूतीनंतरची काळजी आणि आरोग्य पुनर्प्राप्ती',
    descEn: 'Physical healing, emotional recovery, pelvic floor wellness, and traditional Indian postpartum care.',
    descHi: 'प्रसव के बाद शरीर का उपचार, मानसिक स्थिरता, पेल्विक फ्लोर व्यायाम और पारंपरिक सूतिका आहार।',
    descMr: 'प्रसूतीनंतर शरीराची झीज भरून काढणे, मानसिक स्वास्थ्य, पेल्विक व्यायाम व पारंपरिक सुतिका आहार.',
    authorEn: 'Dr. Radhika Joshi, Obstetrician & Gynaecologist',
    authorHi: 'डॉ. राधिका जोशी, स्त्री एवं प्रसूति रोग विशेषज्ञ',
    authorMr: 'डॉ. राधिका जोशी, स्त्रीरोगतज्ज्ञ',
    coverGradient: 'from-rose-400 via-pink-400 to-purple-500',
    coverEmoji: '🌸',
    readTime: '28 min',
    chapterCount: 4,
    audioAvailable: false,
    languages: ['hi', 'en', 'mr'],
    chapters: [
      {
        id: 'pp-ch1', number: 1,
        titleEn: 'The 4th Trimester: Restoring Your Strength',
        titleHi: 'चौथी तिमाही: शरीर और मन का पुनरुत्थान',
        titleMr: 'चौथी तिमाही: शरीर आणि मनाची पुनर्प्राप्ती',
        readTime: '6 min',
        contentHi: `## चौथी तिमाही: शरीर और मन का पुनरुत्थान

प्रसव के बाद के 6 सप्ताह को 'चौथी तिमाही' कहा जाता है। जैसे 9 महीने शिशु को पालने में लगे, वैसे ही शरीर को अपने पूर्व रूप में लौटने के लिए कम से कम 40 दिन का पूर्ण विश्राम और पौष्टिक पोषण चाहिए।`,
        contentEn: `## The 4th Trimester: Restoring Your Strength

The first 6 to 8 weeks after delivery are known as the Fourth Trimester. Rest, traditional nutrient-dense foods, and compassionate emotional support are essential for complete maternal healing.`,
        contentMr: `## चौथी तिमाही: शरीर आणि मनाची पुनर्प्राप्ती

प्रसूतीनंतरचे 40 दिवस बाळंतिणीसाठी अत्यंत विश्रांतीचे व पोषणाचे असायला हवेत.`,
        keyTakeawaysEn: ['40 days of gentle recovery and nourishment', 'Seek family support openly', 'Watch for postpartum mood changes with care'],
        keyTakeawaysHi: ['40 दिन का विश्राम और पौष्टिक सूतिका आहार', 'परिवार से खुलकर सहयोग लें', 'मनोदशा में बदलाव आने पर डॉक्टर से परामर्श लें'],
        keyTakeawaysMr: ['40 दिवसांची पुरेशी विश्रांती व सकस आहार', 'कुटुंबाची मदत आवर्जून घ्या']
      }
    ]
  },

  // ── Mindfulness & Emotional Wellness Series ──
  {
    id: 'book-mindfulness',
    category: 'wellness',
    topic: 'mindfulness',
    titleEn: 'Mindfulness During Pregnancy',
    titleHi: 'गर्भावस्था में माइंडफुलनेस एवं आत्म-शांति',
    titleMr: 'गर्भावस्थेत माइंडफुलनेस आणि आत्म-शांती',
    descEn: 'Gentle mindfulness, body scanning, and conscious breathing to dissolve pregnancy anxiety and cultivate calm.',
    descHi: 'सजग श्वास, माइंडफुलनेस ध्यान और तनावमुक्ति के सरल तरीके जो माँ और शिशु दोनों को शांत करते हैं।',
    descMr: 'सजग श्वास, ध्यान आणि ताणमुक्तीचे सोपे उपाय जे आई व बाळ दोघांनाही शांत ठेवतात.',
    authorEn: 'GarbhaSaathi Holistic Health Team',
    authorHi: 'गर्भसाथी समग्र स्वास्थ्य दल',
    authorMr: 'गर्भसाथी समग्र आरोग्य गट',
    coverGradient: 'from-purple-400 via-violet-400 to-indigo-500',
    coverEmoji: '🧘',
    readTime: '22 min',
    chapterCount: 3,
    audioAvailable: false,
    languages: ['hi', 'en', 'mr'],
    chapters: [
      {
        id: 'mf-ch1', number: 1,
        titleEn: 'The Present Moment in Motherhood',
        titleHi: 'मातृत्व में वर्तमान क्षण की शक्ति',
        titleMr: 'मातृत्वामध्ये वर्तमान क्षणाची शक्ती',
        readTime: '6 min',
        contentHi: `## मातृत्व में वर्तमान क्षण की शक्ति

माइंडफुलनेस का अर्थ है — बिना किसी भय या निर्णय के वर्तमान क्षण में पूरी तरह उपस्थित रहना।
- जब आप गहरी, शांत सांस लेती हैं, तो आपके रक्त में कोर्टिसोल (तनाव हार्मोन) का स्तर गिरता है।
- प्लेसेंटा के माध्यम से शिशु तक अधिक शुद्ध ऑक्सीजन और एंडोर्फिन (खुशी के हार्मोन्स) पहुंचते हैं।
- प्रतिदिन 5 मिनट अपने पेट पर दोनों हथेलियां रखकर शांत बैठना सबसे बड़ा ध्यान है।`,
        contentEn: `## The Present Moment in Motherhood

Mindfulness during pregnancy is the gentle art of being anchored in the present breath, free from past regrets and future labour anxieties.`,
        contentMr: `## मातृत्वामध्ये वर्तमान क्षणाची शक्ती

माइंडफुलनेस म्हणजे कोणताही ताण न घेता वर्तमानात जगणे. आई जेव्हा शांत श्वास घेते, तेव्हा बाळालाही मनाची शांती लाभते.`,
        keyTakeawaysEn: ['Daily 5-minute belly breathing', 'Reduces cortisol for both mother and baby', 'Transforms fear into calm trust'],
        keyTakeawaysHi: ['प्रतिदिन 5 मिनट नाभि श्वास का अभ्यास', 'माँ और शिशु दोनों का तनाव कम करता है', 'डर को विश्वास में बदलता है'],
        keyTakeawaysMr: ['रोज 5 मिनिटे शांत श्वास घेण्याचा सराव', 'आई व बाळाचा ताण कमी करतो']
      }
    ]
  },

  {
    id: 'book-confidence',
    category: 'wellness',
    topic: 'confidence',
    titleEn: 'Confidence and Self-Compassion',
    titleHi: 'आत्मविश्वास एवं आत्म-करुणा: माँ की आंतरिक शक्ति',
    titleMr: 'आत्मविश्वास आणि आत्म-करुणा: आईची अंतर्गत शक्ती',
    descEn: 'Overcoming self-doubt, embracing your changing body with love, and building unshakable maternal trust.',
    descHi: 'बदलते शरीर से प्रेम करना, हीनभावना दूर करना और स्वयं पर अटूट मातृत्व विश्वास जगाना।',
    descMr: 'बदलत्या शरीरावर प्रेम करणे, न्यूनगंड दूर करणे आणि स्वतःवर अढळ मातृत्व विश्वास निर्माण करणे.',
    authorEn: 'Dr. Meera Nambiar, Maternal Psychologist',
    authorHi: 'डॉ. मीरा नंबियार, मातृत्व मनोवैज्ञानिक',
    authorMr: 'डॉ. मीरा नंबियार, मानसोपचारतज्ज्ञ',
    coverGradient: 'from-rose-400 via-orange-400 to-amber-500',
    coverEmoji: '✨',
    readTime: '20 min',
    chapterCount: 3,
    audioAvailable: false,
    languages: ['hi', 'en', 'mr'],
    chapters: [
      {
        id: 'cf-ch1', number: 1,
        titleEn: 'Befriending Your Changing Body',
        titleHi: 'अपने बदलते शरीर को प्रेम और सम्मान दें',
        titleMr: 'आपल्या बदलत्या शरीराला आदर व प्रेम द्या',
        readTime: '5 min',
        contentHi: `## अपने बदलते शरीर को प्रेम और सम्मान दें

गर्भावस्था में शरीर का वजन बढ़ना, त्वचा पर खिंचाव के निशान (Stretch Marks) आना और चेहरे की चमक बदलना — यह सब एक नया जीवन रचने का पवित्र संकेत है।
- आपका शरीर कोई सजावटी वस्तु नहीं, वह जीवन का सबसे महान मंदिर है।
- शीशे के सामने खड़े होकर मुस्कुराएं और कहें: "मेरा शरीर मेरे बच्चे का सुंदर घर है।"`,
        contentEn: `## Befriending Your Changing Body

Stretch marks and softening curves are sacred maps of creation. Your body is not an ornament; it is the miraculous cradle of new human life.`,
        contentMr: `## आपल्या बदलत्या शरीराला आदर व प्रेम द्या

गर्भावस्थेतील बदल हे एका नव्या जीवाच्या आगमनाची सुंदर निशाणी आहेत. स्वतःबद्दल अभिमान बाळगा.`,
        keyTakeawaysEn: ['Your body is creating a human miracle', 'Speak kindly to yourself daily', 'Release comparison with others'],
        keyTakeawaysHi: ['आपका शरीर एक मानव चमत्कार रच रहा है', 'प्रतिदिन स्वयं से स्नेहपूर्वक बात करें', 'दूसरों से तुलना छोड़ें'],
        keyTakeawaysMr: ['शरीर एका नव्या जीवाला आकार देत आहे', 'स्वतःशी नेहमी प्रेमाने बोला']
      }
    ]
  },

  {
    id: 'book-relaxation-breathing',
    category: 'wellness',
    topic: 'relaxation',
    titleEn: 'Relaxation and Gentle Breathing',
    titleHi: 'विश्रांति एवं सौम्य प्राणायाम मार्गदर्शिका',
    titleMr: 'विश्रांती आणि सौम्य प्राणायाम मार्गदर्शिका',
    descEn: 'Safe pranayama, 4-7-8 breathing technique, and deep body relaxation techniques designed exclusively for pregnancy.',
    descHi: 'गर्भावस्था के लिए सुरक्षित अनुलोम-विलोम, भ्रामरी, शांत श्वास और प्रसव के लिए सांस की तैयारी।',
    descMr: 'गर्भावस्थेसाठी सुरक्षित अनुलोम-विलोम, भ्रामरी आणि प्रसूतीसाठी श्वासाची पूर्वतयारी.',
    authorEn: 'Acharya Vidya & Yogacharya Anand',
    authorHi: 'आचार्या विद्या एवं योगाचार्य आनंद',
    authorMr: 'आचार्या विद्या व योगाचार्य आनंद',
    coverGradient: 'from-teal-400 via-cyan-400 to-blue-500',
    coverEmoji: '🌬️',
    readTime: '24 min',
    chapterCount: 3,
    audioAvailable: false,
    languages: ['hi', 'en', 'mr'],
    chapters: [
      {
        id: 'rb-ch1', number: 1,
        titleEn: 'Safe Pranayama for Pregnancy',
        titleHi: 'गर्भावस्था में सुरक्षित प्राणायाम के नियम',
        titleMr: 'गर्भावस्थेतील सुरक्षित प्राणायाम',
        readTime: '6 min',
        contentHi: `## गर्भावस्था में सुरक्षित प्राणायाम

गर्भावस्था में केवल सौम्य और शांत प्राणायाम किए जाते हैं। कपालभाति और भस्त्रिका जैसे तीव्र प्राणायाम पूरी तरह वर्जित हैं।
- **अनुलोम-विलोम (नाड़ी शोधन):** दोनों नासिकाओं से धीमी, शांत सांस लेना और छोड़ना। यह रक्तचाप को संतुलित रखता है।
- **भ्रामरी प्राणायाम:** भौंरे की तरह मधुर गुंजन। यह मस्तिष्क में नाइट्रिक ऑक्साइड का स्राव बढ़ाता है, जो माँ और शिशु दोनों को गहरी शांति देता है।`,
        contentEn: `## Safe Pranayama for Pregnancy

Gentle, unforced breathing practices like Anulom Vilom and Bhramari are deeply nourishing. Forceful practices like Kapalabhati are strictly contraindicated.`,
        contentMr: `## गर्भावस्थेतील सुरक्षित प्राणायाम

अनुलोम-विलोम आणि भ्रामरी प्राणायाम गर्भवती मातेसाठी अत्यंत फायदेशीर व शांतता देणारे आहेत.`,
        keyTakeawaysEn: ['Gentle Nadi Shodhana balances blood pressure', 'Bhramari humming releases nitric oxide', 'Never hold breath forcibly during pregnancy'],
        keyTakeawaysHi: ['नाड़ी शोधन से रक्तचाप नियंत्रित रहता है', 'भ्रामरी से मानसिक शांति और गहरी नींद मिलती है', 'श्वास को कभी भी बलपूर्वक न रोकें'],
        keyTakeawaysMr: ['अनुलोम-विलोमाने रक्तदाब नियंत्रणात राहतो', 'भ्रामरीने गाढ झोप व शांती मिळते']
      }
    ]
  },

  {
    id: 'book-emotional-wellbeing',
    category: 'wellness',
    topic: 'wellbeing',
    titleEn: 'Healthy Emotional Wellbeing',
    titleHi: 'संतुलित भावनात्मक स्वास्थ्य एवं हार्मोनल सामंजस्य',
    titleMr: 'भावनिक स्वास्थ्य आणि हार्मोन्सचे संतुलन',
    descEn: 'Understanding pregnancy hormones, managing weepiness, anger, or worry, and fostering daily joy.',
    descHi: 'हार्मोनल बदलावों के बीच रोना, गुस्सा या घबराहट को समझना और सकारात्मक प्रसन्नता को जीवनशैली बनाना।',
    descMr: 'हार्मोन्सच्या चढउतारामुळे येणारा संताप किंवा रडू येणे यावर नियंत्रण आणि आनंदी राहण्याचे मार्ग.',
    authorEn: 'GarbhaSaathi Mental Health Clinic',
    authorHi: 'गर्भसाथी मानसिक स्वास्थ्य प्रकोष्ठ',
    authorMr: 'गर्भसाथी मानसिक आरोग्य विभाग',
    coverGradient: 'from-pink-400 via-purple-400 to-rose-400',
    coverEmoji: '💖',
    readTime: '22 min',
    chapterCount: 3,
    audioAvailable: false,
    languages: ['hi', 'en', 'mr'],
    chapters: [
      {
        id: 'ew-ch1', number: 1,
        titleEn: 'Riding the Waves of Pregnancy Emotions',
        titleHi: 'भावनाओं की लहरों को समझना',
        titleMr: 'भावनांचे हिंदोळे समजून घेणे',
        readTime: '6 min',
        contentHi: `## भावनाओं की लहरों को समझना

गर्भावस्था में एस्ट्रोजन और प्रोजेस्टेरोन का स्तर सामान्य से कई गुना अधिक होता है। छोटी बात पर आंसू आ जाना या अचानक हंसी छूटना पूरी तरह प्राकृतिक है।
- कभी भी अपनी भावनाओं को दबाएं नहीं।
- जब रोने का मन हो, रो लें। आंसू शरीर के अतिरिक्त तनाव को बाहर निकालते हैं।
- इसके बाद गहरी सांस लें, गुनगुना पानी पिएं और अपने पेट पर हाथ रखकर मुस्कुराएं।`,
        contentEn: `## Riding the Waves of Pregnancy Emotions

Hormonal surges mean rapid shifts in tears and laughter. Honour your emotions without guilt; crying cleanses the nervous system.`,
        contentMr: `## भावनांचे हिंदोळे समजून घेणे

गर्भावस्थेत रडू येणे किंवा चिडचिड होणे हे हार्मोन्समुळे स्वाभाविक आहे. भावनांना दाबून न ठेवता शांतपणे सामोरे जा.`,
        keyTakeawaysEn: ['Tears are natural emotional release', 'Do not judge your feelings', 'Communicate openly with loved ones'],
        keyTakeawaysHi: ['रोना एक प्राकृतिक भावनात्मक निकास है', 'अपनी भावनाओं पर ग्लानि न करें', 'अपनों से खुलकर संवाद करें'],
        keyTakeawaysMr: ['अश्रू हा ताणमुक्तीचा नैसर्गिक मार्ग आहे', 'आपल्या भावना मोकळेपणाने मांडा']
      }
    ]
  },

  {
    id: 'book-transition-parenthood',
    category: 'wellness',
    topic: 'parenthood',
    titleEn: 'Preparing for the Transition to Parenthood',
    titleHi: 'माता-पिता बनने की यात्रा: एक साझा संगम',
    titleMr: 'आई-बाबा होण्याचा सुंदर प्रवास: कौटुंबिक सांगड',
    descEn: 'Strengthening your partner bond, setting boundaries, handling unsolicited advice, and stepping into motherhood with grace.',
    descHi: 'पति-पत्नी के रिश्ते को मजबूत करना, बिन मांगी सलाह से निपटना और आत्मविश्वास के साथ मातृत्व का स्वागत।',
    descMr: 'जोडीदाराशी नाते घट्ट करणे, नको असलेल्या सल्ल्यांकडे दुर्लक्ष करणे आणि आत्मविश्वासाने पालकत्व स्वीकारणे.',
    authorEn: 'Kavita & Suresh Merchant, Family Counsellors',
    authorHi: 'कविता एवं सुरेश मर्चेंट, पारिवारिक परामर्शदाता',
    authorMr: 'कविता व सुरेश मर्चंट, कौटुंबिक समुपदेशक',
    coverGradient: 'from-orange-400 via-rose-400 to-pink-500',
    coverEmoji: '🏡',
    readTime: '26 min',
    chapterCount: 3,
    audioAvailable: false,
    languages: ['hi', 'en', 'mr'],
    chapters: [
      {
        id: 'tp-ch1', number: 1,
        titleEn: 'Partnership in Parenting: Growing Together',
        titleHi: 'साझेदारी का मातृत्व: एक साथ आगे बढ़ना',
        titleMr: 'पालकत्वातील भागीदारी: एकत्र पुढे जाणे',
        readTime: '7 min',
        contentHi: `## साझेदारी का मातृत्व

बच्चा केवल माँ का नहीं, दोनों का सपना है। पिता को भी गर्भावस्था के हर पल में शामिल करें।
- डॉक्टर की हर विज़िट में साथी को साथ ले जाएं।
- रात को सोने से पहले पिता को पेट पर हाथ रखकर शिशु से बात करने को कहें।
- शिशु माँ की आवाज के साथ-साथ पिता की गहरी आवाज को भी गर्भ में ही पहचानना सीखता है।`,
        contentEn: `## Partnership in Parenting: Growing Together

Involve your partner actively in prenatal visits and nightly belly-talk. A baby recognizes the father's lower pitch resonance in the womb as well.`,
        contentMr: `## पालकत्वातील भागीदारी: एकत्र पुढे जाणे

बाळाशी संवाद साधण्यात बाबांनाही सहभागी करून घ्या. गर्भातील बाळ वडिलांचा आवाजही ओळखू शकते.`,
        keyTakeawaysEn: ['Involve partner in prenatal visits', 'Father voice resonance bonds with baby', 'Teamwork builds calm parenting'],
        keyTakeawaysHi: ['प्रसवपूर्व जांच में साथी को साथ रखें', 'पिता की आवाज शिशु से गहरा रिश्ता बनाती है', 'आपसी समझ से सहज पालन-पोषण बनता है'],
        keyTakeawaysMr: ['तपासणीसाठी जोडीदाराला सोबत न्या', 'वडिलांचा आवाज बाळाशी नाते जोडतो']
      }
    ]
  }
];

// ── BHAGAVAD GITA — ALL 18 CHAPTERS ────────────────────────────────────────

export const GITA_CHAPTERS = [
  { id: 'gita-ch1', number: 1, nameEn: 'Arjuna Vishada Yoga', nameHi: 'अर्जुनविषादयोग', nameMr: 'अर्जुनविषादयोग', descEn: 'Observing the armies and facing inner doubts', descHi: 'कुरुक्षेत्र के मैदान में अर्जुन का विषाद और भय का निवारण', descMr: 'अर्जुनाचा विषाद आणि मनातील भीतीवर मात', shlokaCount: 47, readTime: '15 min', audioAvailable: false, maternalTheme: 'Facing fears bravely: Just as Arjuna faced overwhelming uncertainty, an expecting mother learns to confront delivery and parenting fears with faith.' },
  { id: 'gita-ch2', number: 2, nameEn: 'Sankhya Yoga', nameHi: 'सांख्ययोग (ज्ञानयोग)', nameMr: 'सांख्ययोग', descEn: 'The eternal soul, equanimity, and inner wisdom', descHi: 'आत्मा की अमरता, समत्व बुद्धि और स्थितप्रज्ञ के लक्षण', descMr: 'आत्म्याचे अमरत्व आणि मनाचे समतोलत्व', shlokaCount: 72, readTime: '20 min', audioAvailable: false, maternalTheme: 'The soul is eternal and pure: Your unborn baby is an immortal divine spirit taking shelter in your sacred womb.' },
  { id: 'gita-ch3', number: 3, nameEn: 'Karma Yoga', nameHi: 'कर्मयोग', nameMr: 'कर्मयोग', descEn: 'The path of selfless dedicated action', descHi: 'फल की आसक्ति छोड़कर निस्वार्थ कर्तव्य पालन', descMr: 'निःस्वार्थ कर्माचा आदर्श मार्ग', shlokaCount: 43, readTime: '12 min', audioAvailable: false, maternalTheme: 'Selfless maternal service: Caring for your body and your growing child without anxiety for outcomes is the purest form of karma yoga.' },
  { id: 'gita-ch4', number: 4, nameEn: 'Jnana Karma Sannyasa Yoga', nameHi: 'ज्ञानकर्मसंन्यासयोग', nameMr: 'ज्ञानकर्मसंन्यासयोग', descEn: 'Wisdom that burns away fear and confusion', descHi: 'दिव्य ज्ञान की अग्नि जो सभी संशयों को भस्म करती है', descMr: 'ज्ञानाचा प्रकाश जो भीती नाहीशी करतो', shlokaCount: 42, readTime: '12 min', audioAvailable: false, maternalTheme: 'Knowledge dispels anxiety: Learning scientifically and spiritually about pregnancy removes irrational fear.' },
  { id: 'gita-ch5', number: 5, nameEn: 'Karma Sannyasa Yoga', nameHi: 'कर्मसंन्यासयोग', nameMr: 'कर्मसंन्यासयोग', descEn: 'Inner peace through non-attachment', descHi: 'कर्म करते हुए भी मन में पूर्ण शांति और अनासक्ति', descMr: 'कर्म करतानाही मनातील शांतता', shlokaCount: 29, readTime: '10 min', audioAvailable: false, maternalTheme: 'Tranquil mind: Remaining undisturbed by external chatter, focusing solely on the pure energy inside you.' },
  { id: 'gita-ch6', number: 6, nameEn: 'Dhyana Yoga (Atmasamyama)', nameHi: 'ध्यानयोग (आत्मसंयमयोग)', nameMr: 'ध्यानयोग', descEn: 'Meditation, breath control, and stillness of mind', descHi: 'मन को वश में करने की विधि और नियमित ध्यान का फल', descMr: 'मनाचा संयम आणि नियमित ध्यान', shlokaCount: 47, readTime: '14 min', audioAvailable: false, maternalTheme: 'Daily meditation: Stillness of mother thoughts directly lulls the baby into deep, regenerative neurological rest.' },
  { id: 'gita-ch7', number: 7, nameEn: 'Jnana Vijnana Yoga', nameHi: 'ज्ञानविज्ञानयोग', nameMr: 'ज्ञानविज्ञानयोग', descEn: 'Realising the Supreme presence in all nature', descHi: 'प्रकृति और परमात्मा के गूढ़ संबंधों का ज्ञान', descMr: 'सृष्टीतील ईश्वरी तत्त्वाची जाणीव', shlokaCount: 30, readTime: '10 min', audioAvailable: false, maternalTheme: 'Seeing the divine in nature: Water in thirst, light in the sun, and the breath of life multiplying in your womb.' },
  { id: 'gita-ch8', number: 8, nameEn: 'Akshara Brahma Yoga', nameHi: 'अक्षरब्रह्मयोग', nameMr: 'अक्षरब्रह्मयोग', descEn: 'The imperishable absolute and the power of thoughts', descHi: 'जीवन के अंतिम ध्येय और सकारात्मक विचारों की शक्ति', descMr: 'शाश्वत सत्य आणि विचारांची शक्ती', shlokaCount: 28, readTime: '9 min', audioAvailable: false, maternalTheme: 'The power of your mindset: What you dwell upon during pregnancy deeply imprints your child character.' },
  { id: 'gita-ch9', number: 9, nameEn: 'Raja Vidya Raja Guhya Yoga', nameHi: 'राजविद्याराजगुह्ययोग', nameMr: 'राजविद्याराजगुह्ययोग', descEn: 'The supreme royal secret and divine assurance', descHi: 'परम गोपनीय ज्ञान और श्रीकृष्ण का महा-आश्वासन (श्लोक २२)', descMr: 'परम गुह्य ज्ञान आणि ईश्वराचे अभयवचन', shlokaCount: 34, readTime: '12 min', audioAvailable: false, maternalTheme: 'The ultimate maternal promise: "I carry what you need and protect what you possess" (Gita 9.22).' },
  { id: 'gita-ch10', number: 10, nameEn: 'Vibhuti Yoga', nameHi: 'विभूतियोग', nameMr: 'विभूतियोग', descEn: 'Glimpses of divine opulence and beauty in creation', descHi: 'सम्पूर्ण सृष्टि में परमात्मा के ऐश्वर्य और सौंदर्य का दर्शन', descMr: 'विश्वातील ईश्वरी सौंदर्याची अनुभूती', shlokaCount: 42, readTime: '13 min', audioAvailable: false, maternalTheme: 'Miracle of creation: Recognizing that the blossoming of a new life is the highest display of divine grandeur.' },
  { id: 'gita-ch11', number: 11, nameEn: 'Vishwaroopa Darshana Yoga', nameHi: 'विश्वरूपदर्शनयोग', nameMr: 'विश्वरूपदर्शनयोग', descEn: 'The awe-inspiring cosmic vision', descHi: 'परमेश्वर के अनंत विराट स्वरूप का प्रत्यक्ष दर्शन', descMr: 'विराटरूपाचे अथांग दर्शन', shlokaCount: 55, readTime: '16 min', audioAvailable: false, maternalTheme: 'Reverence and awe: Marveling at the infinite complexity of cells multiplying into a complete human being.' },
  { id: 'gita-ch12', number: 12, nameEn: 'Bhakti Yoga', nameHi: 'भक्तियोग', nameMr: 'भक्तियोग', descEn: 'The path of pure, tender, unconditional love', descHi: 'परमात्मा के प्रति अनन्य प्रेम, श्रद्धा और कोमलता', descMr: 'प्रेम आणि समर्पणाचा भक्तीमार्ग', shlokaCount: 20, readTime: '7 min', audioAvailable: false, maternalTheme: 'Pure maternal love: Unconditional devotion to your child is the living embodiment of Bhakti Yoga.' },
  { id: 'gita-ch13', number: 13, nameEn: 'Kshetra Kshetrajna Vibhaga', nameHi: 'क्षेत्रक्षेत्रज्ञविभागयोग', nameMr: 'क्षेत्रक्षेत्रज्ञविभागयोग', descEn: 'The body as the sacred field and the spirit within', descHi: 'यह शरीर एक पवित्र क्षेत्र है और आत्मा उसका जानने वाला', descMr: 'शरीर हे पवित्र क्षेत्र आणि आत्मा त्याचा साक्षी', shlokaCount: 35, readTime: '11 min', audioAvailable: false, maternalTheme: 'Your body is a sacred temple: The womb is the blessed soil in which the divine seed takes root.' },
  { id: 'gita-ch14', number: 14, nameEn: 'Gunatraya Vibhaga Yoga', nameHi: 'गुणत्रयविभागयोग', nameMr: 'गुणत्रयविभागयोग', descEn: 'Mastering the three modes: Sattva, Rajas, and Tamas', descHi: 'सत्त्व, रज और तम — तीनों गुणों का संतुलन और सात्विकता', descMr: 'सत्त्व, रज व तम गुणांचे संतुलन', shlokaCount: 27, readTime: '9 min', audioAvailable: false, maternalTheme: 'Cultivating Sattva: Eating pure food, speaking gently, and thinking clean thoughts to infuse pure qualities into your child.' },
  { id: 'gita-ch15', number: 15, nameEn: 'Purushottama Yoga', nameHi: 'पुरुषोत्तमयोग', nameMr: 'पुरुषोत्तमयोग', descEn: 'The eternal cosmic tree and the Supreme Person', descHi: 'संसार रूपी अश्वत्थ वृक्ष और परम पुरुष का सत्य', descMr: 'विश्वाचे मूळ आणि परमेश्वराचे स्वरूप', shlokaCount: 20, readTime: '7 min', audioAvailable: false, maternalTheme: 'Ancestral roots and blessings: Connecting with the eternal source that sustains all generations.' },
  { id: 'gita-ch16', number: 16, nameEn: 'Daivasura Sampad Vibhaga', nameHi: 'दैवासुरसंपद्विभागयोग', nameMr: 'दैवासुरसंपद्विभागयोग', descEn: 'Cultivating noble virtues and shedding negative traits', descHi: 'अभय, अहिंसा, दया, सरलता जैसे दैवी गुणों का अर्जन', descMr: 'सद्गुणांची जोपासना आणि दोषांचा त्याग', shlokaCount: 24, readTime: '8 min', audioAvailable: false, maternalTheme: 'Garbh Sanskar: Transmitting fearlessness (Abhayam), compassion, and truthfulness to the womb child.' },
  { id: 'gita-ch17', number: 17, nameEn: 'Shraddhatraya Vibhaga Yoga', nameHi: 'श्रद्धात्रयविभागयोग', nameMr: 'श्रद्धात्रयविभागयोग', descEn: 'The three types of faith, food, and lifestyle', descHi: 'आहार, वाणी, तप और श्रद्धा के तीन सात्विक स्वरूप', descMr: 'सात्विक श्रद्धा, आहार आणि जीवनशैली', shlokaCount: 28, readTime: '9 min', audioAvailable: false, maternalTheme: 'Satvik nourishment: Choosing wholesome, fresh, loving meals that delight both palate and soul.' },
  { id: 'gita-ch18', number: 18, nameEn: 'Moksha Sannyasa Yoga', nameHi: 'मोक्षसंन्यासयोग', nameMr: 'मोक्षसंन्यासयोग', descEn: 'Surrender, inner freedom, and supreme peace', descHi: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज — परम शांति', descMr: 'संपूर्ण समर्पण आणि अंतिम शांती', shlokaCount: 78, readTime: '22 min', audioAvailable: false, maternalTheme: 'Complete surrender and peace: "Surrender all your worries to Me, I shall deliver you from all fear" (Gita 18.66).' }
];

// Gita Chapter 2 Highlights (Featured in Hero / Design Reference)
export const GITA_CH2_DETAIL = {
  id: 'gita-ch2',
  number: 2,
  nameEn: 'Sankhya Yoga (The Wisdom of Life)',
  nameHi: 'सांख्ययोग (जीवन की बुद्धिमत्ता)',
  nameMr: 'सांख्ययोग (जीवनाचे गूढ ज्ञान)',
  introHi: `भगवद्गीता के द्वितीय अध्याय में श्रीकृष्ण अर्जुन को आत्मा के अमरत्व और समत्व बुद्धि का उपदेश देते हैं। मातृत्व की दृष्टि से यह अध्याय स्मरण कराता है कि आपके गर्भ में जो आत्मा आई है, वह दिव्य, नित्य और पवित्र है।`,
  introEn: `In Chapter 2, Lord Krishna reveals the immortality of the soul and the strength of an equanimous mind (Samatvam). For expecting mothers, it brings immense comfort knowing that your child is an eternal, divine spirit.`,
  introMr: `दुसऱ्या अध्यायात श्रीकृष्ण अर्जुनाला आत्म्याचे अमरत्व आणि समतोल बुद्धीचे महत्त्व समजावून सांगतात.`,
  shlokas: [
    {
      number: 20,
      sanskrit: "न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः।\nअजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे॥",
      transliteration: "na jāyate mriyate vā kadācin, nāyaṁ bhūtvā bhavitā vā na bhūyaḥ, ajo nityaḥ śāśvato 'yaṁ purāṇo, na hanyate hanyamāne śarīre",
      meaningHi: "यह आत्मा न कभी जन्म लेती है और न कभी मरती है। यह अजन्मी, नित्य, सनातन और पुरातन है। शरीर के नष्ट होने पर भी आत्मा कभी नष्ट नहीं होती।",
      meaningEn: "The soul is neither born nor does it ever die. It is unborn, eternal, ever-existing and primeval. It is not slain when the body is slain.",
      meaningMr: "हा आत्मा कधी जन्मत नाही आणि कधी मरतही नाही. तो नित्य, शाश्वत आणि अनादी आहे.",
      maternalGuidance: "माँ के लिए संदेश: आपके गर्भ में पल रहा नन्हा शिशु कोई नया आकस्मिक संयोग नहीं, बल्कि एक दिव्य सनातन चेतना है जो आपके स्नेह की गोद में आई है।"
    },
    {
      number: 47,
      sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
      transliteration: "karmaṇy evādhikāras te mā phaleṣu kadācana, mā karma-phala-hetur bhūr mā te saṅgo 'stvakarmaṇi",
      meaningHi: "तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। इसलिए फल की चिंता से मुक्त होकर प्रेमपूर्वक अपना कर्तव्य निभाओ।",
      meaningEn: "You have a right to perform your prescribed duty, but not to the fruits of action. Never let outcomes cause anxiety.",
      meaningMr: "फळाची चिंता न करता केवळ निष्ठेने आणि प्रेमाने आपले कर्तव्य करा.",
      maternalGuidance: "माँ के लिए संदेश: प्रसव या भविष्य की व्यर्थ चिंता छोड़ें। आज का आहार, आज का विश्राम और आज का आनंद ही आपका सच्चा कर्म है।"
    }
  ]
};

// Detailed content for Gita Chapter 9
export const GITA_CH9_DETAIL = {
  id: 'gita-ch9',
  number: 9,
  nameEn: 'Raja Vidya Raja Guhya Yoga',
  nameHi: 'राजविद्याराजगुह्ययोग',
  nameMr: 'राजविद्याराजगुह्ययोग',
  introHi: `अध्याय 9 — राजविद्याराजगुह्ययोग में भगवान श्रीकृष्ण अर्जुन को परम गोपनीय ज्ञान और महा-आश्वासन देते हैं। इसका श्लोक 22 गर्भवती माताओं के लिए परम संबल है कि उनके और शिशु के संपूर्ण योगक्षेम का भार स्वयं परमात्मा वहन करते हैं।`,
  introEn: `Chapter 9 — Raja Vidya Raja Guhya Yoga delivers the sovereign secret and divine assurance. Verse 22 is the supreme maternal anchor: "For those who worship Me with love, I personally carry what they lack and preserve what they possess."`,
  introMr: `अध्याय 9 — राजविद्याराजगुह्ययोग मध्ये श्रीकृष्ण अर्जुनाला परम गुह्य ज्ञान देतात. श्लोक 22 गर्भवती मातांसाठी परम आधार आहे.`
};

// ── INSPIRATIONAL STORIES ──────────────────────────────────────────────────

export const LEARNING_STORIES = [
  {
    id: 'story-journey-to-motherhood',
    titleEn: 'My Journey to Motherhood',
    titleHi: 'मातृत्व की मेरी यात्रा: आशा और धैर्य की किरण',
    titleMr: 'मातृत्वाचा माझा प्रवास: आशा आणि धैर्याची ज्योत',
    descEn: 'A heartwarming real-inspired story of hope, morning sickness fears, and finding unshakable inner maternal courage.',
    descHi: 'एक सच्ची प्रेरणादायक कहानी — शुरुआती भयों, घबराहटों और माँ के भीतर जागने वाले असीम साहस की।',
    descMr: 'एक सुंदर प्रेरणादायी कथा — भीती, चिंता आणि आईच्या मनातील अफाट धैर्याची.',
    category: 'motherhood',
    readTime: '10 min',
    audioAvailable: false,
    languages: ['hi', 'en', 'mr'],
    coverGradient: 'from-pink-300 via-rose-300 to-pink-400',
    coverEmoji: '🤱',
    isOriginal: true,
    contentHi: `## मातृत्व की मेरी यात्रा: आशा और धैर्य की किरण

*यह एक मूल प्रेरणादायक मातृत्व वृत्तांत है।*

सुहानी जब पहली बार अपनी गर्भावस्था की रिपोर्ट लेकर घर लौटी, तो उसके हाथ कांप रहे थे। खुशी इतनी गहरी थी कि आंखें छलक पड़ीं, लेकिन ठीक उसी पल मन के किसी कोने में एक अनजाना भय भी जाग उठा: *"क्या मेरा शरीर इस नन्हे जीव की रक्षा कर पाएगा? क्या मैं एक अच्छी माँ बन सकूंगी?"*

पहले तीन महीने सुहानी के लिए बहुत कठिन रहे। सुबह की लगातार मतली, कमजोरी और कमरे में हल्की सी भी गंध से घबराहट। कई बार वह आधी रात को उठकर बिस्तर पर बैठ जाती और अंधेरे में सोचती कि क्या सब ठीक होगा।

एक शाम, जब वह बहुत उदास बैठी थी, उसकी नानी उसके पास आकर बैठ गईं। उन्होंने सुहानी के सिर पर प्यार से हाथ फेरा और बोलीं:

> *"बिटिया, पेड़ पर जब नया फल आता है, तो डाली झुकती जरूर है, लेकिन टूटती नहीं। कुदरत ने औरत के सीने में केवल दूध ही नहीं, हर मुश्किल से लड़ने का असीम धीरज भी भरा है। तू डर मत, तेरा डर ही तेरा प्यार है।"*

नानी के उन शब्दों ने सुहानी के दिल से भय की गांठ खोल दी। उसने तय किया कि वह हर दिन चिंता करने के बजाय अपने बच्चे के साथ जुड़ेगी। उसने सुबह धूप में बैठकर गहरी सांसें लेना शुरू किया, डॉक्टर के बताए अनुसार संतुलित भोजन लिया और रोज रात को पेट पर हाथ रखकर मधुर लोरी गुनगुनाने लगी।

और फिर वह 19वां सप्ताह आया। एक शांत दोपहर, जब सुहानी किताब पढ़ रही थी, अचानक उसे अपनी नाभि के नीचे एक हल्की सी तितली फड़फड़ाने जैसी हलचल महसूस हुई — उसके शिशु की पहली किक!

उस पल सुहानी की आंखों से जो आंसू बहे, वे किसी भय के नहीं, बल्कि ब्रह्मांड के सबसे पवित्र आनंद के थे।

जब प्रसव का समय आया, दर्द गहरा था, लेकिन सुहानी का विश्वास उससे भी कहीं अधिक गहरा था। जब डॉक्टर ने उस नन्हे फरिश्ते को उसकी छाती पर लिटाया, तो उस नन्ही सांस ने सुहानी के दिल की हर पुरानी थकान एक ही पल में धो डाली।

**माँ के लिए पावन संदेश:** मातृत्व कोई परीक्षा नहीं, यह प्रकृति का दिया सबसे सुंदर वरदान है। आपके भीतर जो ताकत है, वह किसी भी भय से बहुत बड़ी है। आप अकेली नहीं हैं — पूरा संसार एक माँ की शक्ति का नमन करता है।`,
    contentEn: `## My Journey to Motherhood: Hope and Maternal Courage

*An original inspirational motherhood story.*

When Suhani first held her positive test result, her hands trembled with both boundless awe and quiet uncertainty. Could her body carry this fragile miracle? Was she strong enough?

The first trimester tested every ounce of her stamina. Nausea was constant, and quiet tears came easily in the evening stillness.

One evening, her grandmother sat beside her, gently stroking her hair:

> *"Child, when a tree bears sweet fruit, its branches bow low with the weight, yet they do not break. Nature did not merely create you to carry life; she wove boundless resilience into every fiber of your spirit."*

Those words dissolved the cloud of anxiety. Suhani chose trust over worry. She walked in morning sunshine, ate nourishing foods, and spoke daily blessings to her womb.

At week 19, in the quiet of an afternoon, came the gentlest flutter—her baby's very first kick. In that sacred moment, fear evaporated into pure maternal grace.

When delivery arrived, pain was met with deep serenity. And when her baby was nestled against her skin, every trial transformed into golden love.

**Message for Mothers:** You were built for this journey. Trust your body, trust your heart, and know you are never alone.`,
    contentMr: `## मातृत्वाचा माझा प्रवास: आशा आणि धैर्याची ज्योत

*एक मूळ प्रेरणादायक मातृत्व कथा.*

सुहानीच्या हातात जेव्हा गर्भधारणेचा अहवाल आला, तेव्हा आनंद आणि अनामिक भीती एकत्रच दाटून आली.

पहिल्या तीन महिन्यांत मळमळ आणि थकव्याने ती खचून जायची. एके दिवशी आजीने तिच्या पाठीवर मायेचा हात फिरवत सांगितले:

> *"मुली, झाडाला जेव्हा फळ येते तेव्हा फांदी झुकते, पण मोडत नाही. निसर्गाने आईच्या हृदयात अपार सोशिकतेची ताकद दिली आहे."*

त्या शब्दांनी सुहानीला नवी उमेद दिली. 19 व्या आठवड्यात जेव्हा बाळाची पहिली नाजूक हालचाल जाणवली, तेव्हा सर्व चिंता दूर पळून गेल्या.

**आईसाठी संदेश:** तुमच्यात एक अथांग शक्ती आहे. स्वतःवर आणि निसर्गावर विश्वास ठेवा.`
  },

  {
    id: 'story-family-support',
    titleEn: 'Support from My Family',
    titleHi: 'परिवार का सहारा: जब स्नेह बन गया संबल',
    titleMr: 'कुटुंबाचा आधार: मायेची उब आणि दिलासा',
    descEn: 'How a husband, in-laws, and gentle togetherness transformed a high-risk pregnancy into a calm celebration.',
    descHi: 'जब पति का साथ और सास-ससुर का लाड़ बन गया सबसे बड़ी औषधि — एक भावुक परिवार की सच्ची कहानी।',
    descMr: 'जोडीदाराची साथ आणि कुटुंबाचे प्रेम कशी मोठी ताकद बनते, याची हृदयस्पर्शी कथा.',
    category: 'family',
    readTime: '12 min',
    audioAvailable: false,
    languages: ['hi', 'en', 'mr'],
    coverGradient: 'from-amber-200 via-orange-200 to-amber-300',
    coverEmoji: '👨‍👩‍👧',
    isOriginal: true,
    contentHi: `## परिवार का सहारा: जब स्नेह बन गया संबल

*यह एक मूल प्रेरणादायक कहानी है।*

अनिता की गर्भावस्था के पांचवें महीने में जब डॉक्टर ने उसे 'कम्प्लीट बेड रेस्ट' की सलाह दी, तो पूरा घर सन्न रह गया। अनिता रोने लगी कि वह घर का कोई काम नहीं कर पाएगी और सब पर बोझ बन जाएगी।

तभी उसके पति विवेक ने उसके दोनों हाथ थामे:
*"अनिता, तुम बिस्तर पर नहीं लेटी हो, तुम हमारे कुल के दीपक को गढ़ रही हो। अगले चार महीने घर की हर जिम्मेदारी मेरी और माँ-बाबूजी की है।"*

उस दिन के बाद घर का माहौल ही बदल गया। सास सुबह-सुबह मेथी-गोंद के सात्विक लड्डू और बादाम का दूध खुद बनाकर लातीं। ससुर जी शाम को गीता के श्लोक और सुंदर प्रेरक कहानियां पढ़कर सुनाते ताकि अनिता का मन प्रसन्न रहे। विवेक हर रात उसके पैरों की तेल मालिश करता।

जब नौवें महीने में स्वस्थ शिशु ने जन्म लिया, तो डॉक्टर ने कहा: *"अनिता, दवाइयों से ज्यादा तुम्हारे परिवार के प्यार ने इस बच्चे को सुरक्षित रखा है।"*

**संदेश:** गर्भावस्था केवल माँ की नहीं, पूरे परिवार की सामूहिक तपस्या है। अपनों का प्यार सबसे बड़ी दवा है।`,
    contentEn: `## Support from My Family: The Power of Love

*An original inspirational family narrative.*

When prescribed strict bed rest at Month 5, Anita felt like a helpless burden. Her husband Vivek gently cupped her hands: *"You are not lying idle; you are crafting our future. Everything else is our duty."*

Her mother-in-law prepared wholesome nourishing soups; her father-in-law read uplifting stories each evening; her partner was a constant pillar of reassurance.

Love proved more potent than medicine, culminating in the joy of a thriving newborn.`,
    contentMr: `## कुटुंबाचा आधार: मायेची उब आणि दिलासा

कुटुंबाचे प्रेम आणि जोडीदाराची खंबीर साथ कोणत्याही संकटावर मात करू शकते.`
  },

  {
    id: 'story-overcoming-anxiety',
    titleEn: 'Overcoming Pregnancy Anxiety',
    titleHi: 'गर्भावस्था की चिंता पर विजय: मन की असीम शांति',
    titleMr: 'गर्भावस्थेच्या चिंतेवर मात: मनःशांतीचा प्रवास',
    descEn: 'Practical steps, daily gratitude, and breathwork that helped an expecting mother overcome panic attacks and birth anxiety.',
    descHi: 'चिंता और घबराहट के भंवर से निकलकर आत्म-विश्वास और ध्यान का सहारा लेने की एक प्रेरणादायी सीख।',
    descMr: 'चिंता आणि भीतीवर मात करून ध्यानाच्या माध्यमातून मन शांत करणाऱ्या मातेची गोष्ट.',
    category: 'wellness',
    readTime: '10 min',
    audioAvailable: false,
    languages: ['hi', 'en', 'mr'],
    coverGradient: 'from-teal-200 via-emerald-200 to-teal-300',
    coverEmoji: '🕊️',
    isOriginal: true,
    contentHi: `## गर्भावस्था की चिंता पर विजय

*एक मूल प्रेरणादायक कहानी।*

मीरा हर रिपोर्ट और हर अल्ट्रासाउंड से पहले पसीने से भीग जाती थी। इंटरनेट पर हर लक्षण को खोज-खोज कर वह अपनी नींद खराब कर चुकी थी।

एक दिन वरिष्ठ स्त्री रोग विशेषज्ञ डॉ. वंदना ने उसका हाथ पकड़ा और बोलीं:
*"मीरा, इंटरनेट पर जो लिखा है वह लाखों संभावनाओं का डेटा है, तुम्हारे अपने बच्चे का सच नहीं। अपने बच्चे को गूगल से नहीं, अपने दिल की धड़कन से जानो।"*

डॉक्टर ने उसे '3-चीजें कृतज्ञता' का नियम दिया:
1. हर सुबह उठकर उन 3 बातों को याद करना जो आज ठीक हैं।
2. जब भी चिंता आए, पेट पर हाथ रखकर 10 बार लंबी, धीमी सांस लेना।
3. नकारात्मक समाचारों और सोशल मीडिया से दूरी बनाना।

दो हफ्तों में मीरा का चेहरा खिल उठा। उसका रक्तचाप सामान्य हो गया और उसने अपने मातृत्व का आनंद लेना शुरू किया।

**संदेश:** चिंता करने से कल की समस्या नहीं टलती, बस आज की शांति छिन जाती है। वर्तमान में विश्वास रखें।`,
    contentEn: `## Overcoming Pregnancy Anxiety

A real-life lesson on replacing endless internet symptom-searching with deep breaths, daily gratitude, and grounded medical faith.`,
    contentMr: `## गर्भावस्थेच्या चिंतेवर मात

इंटरनेटवरील भीतीदायक माहितीऐवजी डॉक्टरांचा सल्ला आणि रोजचे शांत ध्यान कसे मन स्थिर करते, याची सत्य शिकवण.`
  }
];

// ── QUOTES & KNOWLEDGE ─────────────────────────────────────────────────────

export const LEARNING_QUOTES = [
  {
    id: 'q1',
    category: 'spiritual',
    categoryNameEn: 'Spiritual Wisdom',
    categoryNameHi: 'आध्यात्मिक ज्ञान',
    categoryNameMr: 'आध्यात्मिक विचार',
    textEn: 'You are not alone. The same divine force that moves the distant stars is gently nurturing the tiny heart beating inside you.',
    textHi: 'तुम कभी अकेली नहीं हो। जो दिव्य शक्ति अनंत ब्रह्मांड के तारों को गति देती है, वही तुम्हारे भीतर पल रहे नन्हे दिल को धड़का रही है।',
    textMr: 'तू कधीही एकटी नाहीस. जी ईश्वरी शक्ती ताऱ्यांना गतिमान करते, तीच तुझ्या गर्भातील नाजूक हृदयाला धडकवत आहे.',
    sourceEn: 'GarbhaSaathi Spiritual Wisdom',
    sourceHi: 'गर्भसाथी आध्यात्मिक संदेश',
    sourceMr: 'गर्भसाथी आध्यात्मिक विचार',
    color: 'from-violet-500 via-purple-500 to-indigo-600',
    badge: '🕉️ Divine'
  },
  {
    id: 'q2',
    category: 'courage',
    categoryNameEn: 'Courage & Strength',
    categoryNameHi: 'साहस एवं धैर्य',
    categoryNameMr: 'धैर्य व शक्ती',
    textEn: 'A mother’s heart is the only place in the universe where love begins long before eyes meet.',
    textHi: 'माँ का हृदय संसार का वह एकमात्र पवित्र स्थान है जहाँ मिलन से बहुत पहले ही असीम प्रेम का जन्म हो जाता है।',
    textMr: 'आईचे हृदय हे विश्वातील एकमेव असे स्थान आहे जिथे बाळाला पाहण्यापूर्वीच अथांग प्रेम सुरू होते.',
    sourceEn: 'Traditional Indian Maternal Lore',
    sourceHi: 'पारंपरिक भारतीय मातृत्व सूक्ति',
    sourceMr: 'पारंपरिक मातृ सूक्त',
    color: 'from-pink-500 via-rose-500 to-red-500',
    badge: '🌸 Love'
  },
  {
    id: 'q3',
    category: 'gita',
    categoryNameEn: 'Bhagavad Gita 9.22',
    categoryNameHi: 'श्रीमद्भगवद्गीता ९.२२',
    categoryNameMr: 'भगवद्गीता ९.२२',
    textEn: 'To those who constantly remember Me with dedicated love, I personally carry what they lack and safeguard what they possess.',
    textHi: 'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते। तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥ (जो मेरी शरण में हैं, उनके समस्त पोषण और सुरक्षा का भार मैं स्वयं उठाता हूँ।)',
    textMr: 'जे अनन्य भावाने माझे स्मरण करतात, त्यांच्या सर्व कल्याणाची व संरक्षणाची जबाबदारी मी स्वतः घेतो.',
    sourceEn: 'Lord Krishna in Bhagavad Gita',
    sourceHi: 'श्रीकृष्ण, भगवद्गीता अध्याय ९, श्लोक २२',
    sourceMr: 'श्रीकृष्ण, भगवद्गीता अध्याय ९',
    color: 'from-amber-500 via-orange-500 to-amber-600',
    badge: '🙏 Assurance'
  },
  {
    id: 'q4',
    category: 'wellness',
    categoryNameEn: 'Self-Compassion',
    categoryNameHi: 'आत्म-करुणा',
    categoryNameMr: 'आत्म-करुणा',
    textEn: 'The way you speak to yourself matters. You are literally growing a human life — be gentle, patient, and full of pride in yourself.',
    textHi: 'आप स्वयं से किस स्वर में बात करती हैं, यह बहुत मायने रखता है। आप एक मानव जीवन रच रही हैं — अपने साथ कोमल, दयालु और गौरवशाली रहें।',
    textMr: 'तुम्ही स्वतःशी कसे बोलता हे खूप महत्त्वाचे आहे. तुम्ही एका नव्या जीवाला आकार देत आहात — स्वतःशी प्रेमाने वागा.',
    sourceEn: 'Maternal Mindfulness Practice',
    sourceHi: 'मातृत्व माइंडफुलनेस सूत्र',
    sourceMr: 'माइंडफुलनेस विचार',
    color: 'from-teal-500 via-emerald-500 to-green-600',
    badge: '🌿 Calm'
  },
  {
    id: 'q5',
    category: 'gratitude',
    categoryNameEn: 'Daily Gratitude',
    categoryNameHi: 'कृतज्ञता',
    categoryNameMr: 'कृतज्ञता',
    textEn: 'Every gentle flutter, every little kick is a silent message from your baby: "I am safe, Mumma, and I love you."',
    textHi: 'गर्भ में महसूस होने वाली हर हल्की सी हलचल आपके शिशु का मौन संदेश है: "माँ, मैं सुरक्षित हूँ और आपसे बहुत प्यार करता हूँ।"',
    textMr: 'गर्भातील प्रत्येक नाजूक हालचाल बाळाचा प्रेमाचा निरोप असतो: "आई, मी सुरक्षित आहे आणि माझे तुझ्यावर खूप प्रेम आहे."',
    sourceEn: 'GarbhaSaathi Bond',
    sourceHi: 'गर्भसाथी मातृत्व प्रेम',
    sourceMr: 'गर्भसाथी विचार',
    color: 'from-rose-500 via-pink-500 to-purple-600',
    badge: '👶 Bond'
  },
  {
    id: 'q6',
    category: 'courage',
    categoryNameEn: 'Fearlessness',
    categoryNameHi: 'अभय',
    categoryNameMr: 'अभय',
    textEn: 'Strength does not come from physical might; it comes from an indomitable maternal will to protect and nurture.',
    textHi: 'सच्ची शक्ति बाहुबल से नहीं आती, बल्कि अपने शिशु की रक्षा और पोषण के अटूट मातृत्व संकल्प से पैदा होती है।',
    textMr: 'खरी ताकद शरीरातून नाही, तर बाळाच्या रक्षणासाठी आईच्या मनात निर्माण होणाऱ्या अढळ संकल्पातून येते.',
    sourceEn: 'Ancient Wisdom',
    sourceHi: 'प्राचीन मातृत्व ज्ञान',
    sourceMr: 'प्राचीन विचार',
    color: 'from-cyan-500 via-blue-500 to-indigo-600',
    badge: '🛡️ Courage'
  }
];

export const LEARNING_KNOWLEDGE = [
  {
    id: 'k1',
    category: 'facts',
    titleEn: 'Interesting Pregnancy Facts',
    titleHi: 'गर्भावस्था के अद्भुत वैज्ञानिक तथ्य',
    titleMr: 'गर्भावस्थेबद्दलचे थक्क करणारे वैज्ञानिक तथ्य',
    descEn: 'From baby tasting your food to amniotic fluid memory — science reveals the magic of the womb.',
    descHi: 'शिशु का भोजन का स्वाद लेना, गर्भाशय में संगीत सुनना और स्टेम सेल्स का माँ को ठीक करना।',
    descMr: 'गर्भातील बाळ अन्नाची चव कसे ओळखते आणि आईच्या आरोग्याची काळजी कशी घेते.',
    readTime: '6 min',
    color: 'from-blue-400 to-indigo-500',
    contentEn: `## Fascinating Scientific Facts About Your Pregnancy

1. **Your baby tastes what you eat:** Flavors from garlic, mint, turmeric, and fruits cross into the amniotic fluid. By 16 weeks, baby has taste buds and develops food preferences!
2. **Fetal microchimerism (The Healing Gift):** Cells from your baby migrate into your bloodstream and tissues. If a mother's heart or liver is damaged, fetal cells travel to the wound site and turn into specialized cells to repair it!
3. **The uterus expands 500 times:** Growing from the size of a lemon to a watermelon, returning naturally to original size after birth.
4. **Baby dreams in the womb:** Rapid Eye Movement (REM) sleep begins around week 28, indicating babies may dream about sounds and movements experienced during the day!`,
    contentHi: `## गर्भावस्था के अद्भुत वैज्ञानिक तथ्य

1. **शिशु आपके भोजन का स्वाद लेता है:** 16वें सप्ताह से शिशु की जीभ पर स्वाद कलिकाएं (Taste Buds) सक्रिय हो जाती हैं। आप जो मसाले या फल खाती हैं, उसका हल्का स्वाद एमनियोटिक द्रव में जाता है।
2. **शिशु माँ के अंगों को ठीक करता है (Microchimerism):** यदि गर्भावस्था में माँ के हृदय या लिवर में कोई चोट आ जाए, तो गर्भस्थ शिशु अपने स्टेम सेल्स भेजकर माँ के अंग की मरम्मत करता है!
3. **गर्भाशय 500 गुना बढ़ता है:** एक छोटे नींबू से लेकर बड़े तरबूज तक फैलना और प्रसव के बाद वापस सामान्य होना कुदरत का सबसे बड़ा अजूबा है।
4. **गर्भ में शिशु सपने देखता है:** 28वें सप्ताह से शिशु REM (Rapid Eye Movement) नींद लेता है, जिसका अर्थ है कि वह गर्भ में भी ध्वनियों के सपने देखता है!`,
    contentMr: `## गर्भावस्थेबद्दलचे वैज्ञानिक तथ्य

1. बाळ आईने खाल्लेल्या अन्नाची चव ओळखते.
2. बाळ आईच्या शरीरातील जखमा भरून काढण्यासाठी स्वतःच्या पेशी पाठवते.
3. 28 व्या आठवड्यापासून बाळ गर्भात स्वप्ने पाहू शकते.`
  },
  {
    id: 'k2',
    category: 'selfcare',
    titleEn: 'Self-Care Tips for a Calmer Mind',
    titleHi: 'शांत मन और प्रफुल्लित आत्मा के लिए दैनिक स्व-देखभाल',
    titleMr: 'शांत मनासाठी आणि प्रसन्नतेसाठी दैनंदिन स्व-काळजी',
    descEn: 'Practical micro-habits to reduce sensory overload, protect your energy, and sleep deeper.',
    descHi: 'तनाव से बचने, अच्छी नींद पाने और अपनी सकारात्मक ऊर्जा को संजोने के सरल व्यावहारिक नियम।',
    descMr: 'ताण कमी करण्याचे, चांगली झोप घेण्याचे आणि सकारात्मक राहण्याचे सोपे मार्ग.',
    readTime: '8 min',
    color: 'from-emerald-400 to-teal-500',
    contentEn: `## Self-Care Tips for a Calmer Mind

- **Morning Sunshine (15 mins):** Natural sunlight resets your circadian rhythm, boosts melatonin for nighttime sleep, and increases natural Vitamin D.
- **Warm Foot Soak:** A 10-minute warm water soak with a pinch of salt before bed soothes swollen ankles and calms the nervous system.
- **The Power of "No":** Politely decline stressful social visits or unwanted medical horror stories. Your peace is sacred.`,
    contentHi: `## शांत मन के लिए दैनिक स्व-देखभाल

- **सुबह की गुनगुनी धूप (15 मिनट):** प्राकृतिक धूप मेलाटोनिन और विटामिन डी बढ़ाकर रात की नींद को गहरा और शांत बनाती है।
- **गुनगुने पानी में पैर भिगोना:** रात को सोने से पहले हल्के गुनगुने पानी में थोड़ा सेंधा नमक डालकर 10 मिनट पैर रखें। यह सूजन और थकान को तुरंत हर लेता है।
- **नकारात्मकता को 'ना' कहना सीखें:** जो लोग गर्भावस्था के डरावने किस्से सुनाते हैं, उनसे विनम्रतापूर्वक दूरी बनाएं।`,
    contentMr: `## शांत मनासाठी स्व-काळजी

- सकाळी 15 मिनिटे कोवळ्या उन्हात बसा.
- रात्री झोपण्यापूर्वी कोमट पाण्यात पाय ठेवा, थकवा दूर होईल.
- नकारात्मक चर्चांपासून दूर राहा.`
  },
  {
    id: 'k3',
    category: 'parenting',
    titleEn: 'Parenting Knowledge & Newborn Instincts',
    titleHi: 'माता-पिता का ज्ञान एवं शिशु की स्वाभाविक प्रवृत्तियां',
    titleMr: 'पालकत्व ज्ञान आणि नवजात बाळाच्या नैसर्गिक सवयी',
    descEn: 'Deciphering newborn crying, cluster feeding, sleep patterns, and soothing white noise.',
    descHi: 'रोने के संकेतों को पहचानना, बार-बार दूध पीने की आदत और सुरक्षित सुलाने के नियम।',
    descMr: 'बाळाचे रडणे समजून घेणे आणि सुरक्षित झोपेचे नियम.',
    readTime: '10 min',
    color: 'from-amber-400 to-orange-500',
    contentEn: `## Essential Newborn Parenting Knowledge

- **Crying is communication:** Hunger, wet diaper, wind/burp needed, or simply craving the warmth of your chest.
- **Cluster feeding:** It is normal for babies to nurse frequently in the evening; this naturally builds mother's milk supply.
- **White noise comforts:** The womb sounded as loud as a vacuum cleaner! A gentle fan or shushing sound helps babies fall asleep safely.`,
    contentHi: `## नवजात शिशु का व्यवहार समझें

- **रोने का हर बार एक ही मतलब नहीं होता:** भूख, गीला डायपर, पेट में गैस या केवल आपकी गोद की गर्माहट की चाहत।
- **शाम को बार-बार दूध मांगना (Cluster Feeding):** यह पूरी तरह सामान्य है और यह माँ के दूध का उत्पादन बढ़ाने की कुदरती प्रक्रिया है।
- **गर्भ की आवाजें:** गर्भ में शिशु को निरंतर 80 डेसिबल का शोर सुनाई देता है। हल्की सुरीली आवाज या पंखे की धीमी ध्वनि उसे तुरंत सुला देती है।`,
    contentMr: `## नवजात बाळाचे वर्तन समजून घ्या

बाळाचे रडणे ही त्याची भाषा असते. भूक, गॅस किंवा आईच्या कुशीची ओढ यामुळे बाळ रडते.`
  }
];

// ── READING PROGRESS STORAGE HELPERS ───────────────────────────────────────

export const STORAGE_KEY = 'garbhasaathi_learning_garden_v2';

export function loadLearningProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch { /* ignore */ }
  // Realistic initial progress matching design reference
  return {
    bookmarks: ['gita-ch2', 'q3'],
    recentItems: [
      { id: 'hp-ch2', type: 'chapter', titleEn: 'Healthy Pregnancy: Month-by-Month Guide', subtitleEn: 'Last read: Month 2 – Baby Features Form', progressPct: 35, ts: Date.now() }
    ],
    chapterProgress: {
      'book-healthy-pregnancy': ['hp-ch1']
    }
  };
}

export function saveLearningProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch { /* ignore */ }
}
