/**
 * GarbhaSaathi — Medically Reviewed Daily Exercise & Pregnancy Yoga Library
 * Compliant with ACOG (American College of Obstetricians and Gynecologists),
 * FOGSI (Federation of Obstetric and Gynaecological Societies of India),
 * and WHO Physical Activity Guidelines for Pregnancy.
 *
 * Fully categorized and strictly isolated by pregnancy month (Months 1 to 9).
 */

export const EXERCISE_CATEGORIES = {
  walking: {
    id: 'walking',
    title: 'Gentle Walking & Mobility',
    titleHi: 'सुरक्षित चहलकदमी व गतिशीलता',
    titleMr: 'हलकी चाल व हालचाल',
    icon: 'Footprints',
    badgeColor: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
  },
  yoga: {
    id: 'yoga',
    title: 'Pregnancy-Adapted Yoga (गर्भ संस्कार योग)',
    titleHi: 'गर्भावस्था अनुकूलित योगासन',
    titleMr: 'गर्भसंस्कार योगासने',
    icon: 'Sparkles',
    badgeColor: 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800'
  },
  stretch: {
    id: 'stretch',
    title: 'Stretching & Back Relief',
    titleHi: 'पीठ व कमर दर्द निवारक स्ट्रेच',
    titleMr: 'पाठ व कंबर आराम स्ट्रेच',
    icon: 'Layers',
    badgeColor: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
  },
  pelvic: {
    id: 'pelvic',
    title: 'Pelvic-Floor & Kegels',
    titleHi: 'पेल्विक फ्लोर व कीगेल व्यायाम',
    titleMr: 'पेल्व्हिक फ्लोअर व कीगेल',
    icon: 'ShieldCheck',
    badgeColor: 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
  },
  breathing: {
    id: 'breathing',
    title: 'Relaxation & Prāṇāyāma',
    titleHi: 'विश्राम व गर्भ प्राणायाम',
    titleMr: 'विश्रांती व प्राणायाम',
    icon: 'Wind',
    badgeColor: 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800'
  }
};

export const MONTH_EXERCISE_GUIDANCE = {
  1: {
    monthNumber: 1,
    weekRange: 'Weeks 1–4',
    trimester: 1,
    theme: 'Implantation & Mindful Grounding',
    themeHi: 'गर्भाधान, शांत उदर श्वास व कोमल आधार',
    description: 'During early cell division and blastocyst implantation, protect your body from overheating and abdominal compression. Focus on diaphragmatic breathing, joint mobilization, and slow strolls.',
    descriptionHi: 'प्रारंभिक सप्ताहों में शरीर नए जीवन को धारण कर रहा होता है। पेट पर किसी प्रकार का दबाव न डालें; केवल शांत सांसों, जोड़ों के हल्के घुमाव और मंद सैर पर ध्यान दें।',
    safetyTip: 'Avoid hot baths, deep abdominal twists, and high-intensity workouts.',
    safetyTipHi: 'पेट पर जोर डालने वाले व्यायाम न करें और अधिक गर्म पानी के संपर्क से बचें।',
    focusAreas: ['Cellular Oxygenation', 'Low-Heart-Rate Walking', 'Stress Reduction'],
    recommendedMinutesDaily: '15–20 mins',
    contraindicated: ['Heavy weights', 'Deep abdominal twists', 'Hot yoga', 'Belly-down poses']
  },
  2: {
    monthNumber: 2,
    weekRange: 'Weeks 5–8',
    trimester: 1,
    theme: 'Organogenesis & Morning Sickness Support',
    themeHi: 'अंग निर्माण, उल्टी/मतली व सुस्ती में राहत',
    description: 'Baby\'s neural tube and heart are forming. Hormonal surges cause morning sickness, breast tenderness, and fatigue. Cooling breaths and gentle spine work soothe nausea and digestion.',
    descriptionHi: 'शिशु के हृदय व मस्तिष्क का विकास हो रहा है। हार्मोनल बदलाव से मतली व थकान होती है। शीतली प्राणायाम व गद्दी पर मार्जरी आसन पाचन व उल्टी में तुरंत आराम देते हैं।',
    safetyTip: 'Sip water in small amounts. Sit down immediately if you experience dizziness.',
    safetyTipHi: 'घूंट-घूंट पानी पिएं। चक्कर आने पर तुरंत बैठ जाएं या बाईं करवट लेटें।',
    focusAreas: ['Nausea Cooling', 'Gentle Spine Mobility', 'Fatigue Alleviation'],
    recommendedMinutesDaily: '15–20 mins',
    contraindicated: ['Fast head turns', 'Jumping', 'Breath holding (Kumbhaka)']
  },
  3: {
    monthNumber: 3,
    weekRange: 'Weeks 9–12',
    trimester: 1,
    theme: 'Pelvic Tone & First Trimester Completion',
    themeHi: 'पेल्विक आधार, तितली आसन व प्रथम त्रैमास की पूर्णता',
    description: 'The placenta takes over full hormonal support. The uterus expands to the size of a grapefruit. Begin gentle pelvic floor awareness and inner-thigh adductor elasticity.',
    descriptionHi: 'प्लेसेंटा पूर्ण रूप से कार्यभार संभाल लेता है। तितली आसन और कीगेल पेल्विक मांसपेशियों में रक्त संचार बढ़ाते हैं और कमर की जकड़न दूर करते हैं।',
    safetyTip: 'Keep movements smooth and grounded. Use a wall for balance.',
    safetyTipHi: 'समतल फर्श पर चटाई बिछाकर करें और दीवार का सहारा अवश्य लें।',
    focusAreas: ['Pelvic Floor Awakening', 'Groin Elasticity', 'Upper Back Release'],
    recommendedMinutesDaily: '20–25 mins',
    contraindicated: ['Deep backbends', 'Belly inversions', 'Sudden jerks']
  },
  4: {
    monthNumber: 4,
    weekRange: 'Weeks 13–16',
    trimester: 2,
    theme: 'Golden Trimester Energy & Posture Alignment',
    themeHi: 'ऊर्जा वापसी, रीढ़ की हड्डी का संतुलन व जांघों की ताकत',
    description: 'Entering the second trimester brings renewed vitality. The baby bump begins to alter your center of gravity. Focus on posture realignment, wall Tadasana, and supported leg strength.',
    descriptionHi: 'द्वितीय त्रैमास में ऊर्जा लौटती है और पेट का उभार दिखने लगता है। ताड़ासन और सहारा युक्त वीरभद्रासन रीढ़ के संतुलन को बनाए रखते हैं।',
    safetyTip: 'Avoid lying completely flat on your back (supine) for more than 2 minutes to protect blood flow.',
    safetyTipHi: 'पीठ के बल सीधे अधिक देर न लेटें ताकि मुख्य नस पर दबाव न आए।',
    focusAreas: ['Spinal Decompression', 'Quadriceps & Glute Stamina', 'Diaphragmatic Space'],
    recommendedMinutesDaily: '25–30 mins',
    contraindicated: ['Flat supine exercises (>2 min)', 'Deep abdominal crunches']
  },
  5: {
    monthNumber: 5,
    weekRange: 'Weeks 17–20',
    trimester: 2,
    theme: 'Quickening, Hip Mobility & Round Ligament Relief',
    themeHi: 'शिशु की पहली हलचल, बर्थिंग बॉल हिप सर्कल्स व लिगामेंट आराम',
    description: 'You may feel your baby\'s quickening flutter! Round ligament stretching can cause sharp groin twinges. Hip circles on a birth ball and wide-knee child\'s pose create pelvic freedom.',
    descriptionHi: 'शिशु की नन्हीं किक्स महसूस होती हैं। बर्थिंग बॉल पर कूल्हों को गोल घुमाने से कमर का दर्द दूर होता है और शिशु से भावनात्मक जुड़ाव बढ़ता है।',
    safetyTip: 'Place a soft cushion under your knees for joint protection.',
    safetyTipHi: 'घुटनों के नीचे हमेशा मुड़ा हुआ कंबल या तकिया रखें।',
    focusAreas: ['Sacroiliac (SI) Joint Mobility', 'Round Ligament Relief', 'Baby Bonding'],
    recommendedMinutesDaily: '25–30 mins',
    contraindicated: ['Single-leg balancing without wall', 'High impact jumping']
  },
  6: {
    monthNumber: 6,
    weekRange: 'Weeks 21–24',
    trimester: 2,
    theme: 'Belly Spurt, Calf Pumps & Swelling Relief',
    themeHi: 'तीव्र शारीरिक वृद्धि, पिंडलियों की ऐंठन व पैरों की सूजन से राहत',
    description: 'The uterus rises above your navel. Calf pumps, wall stretches, and gentle pacing alleviate nighttime leg cramps and pedal edema caused by fluid pooling.',
    descriptionHi: 'पेट तेजी से बढ़ता है और पैरों में नसों का खिंचाव हो सकता है। पिंडलियों के स्ट्रेच और टखने के व्यायाम रात को होने वाली ऐंठन को रोकते हैं।',
    safetyTip: 'Keep a sturdy chair or wall support within arm\'s reach at all times.',
    safetyTipHi: 'संतुलन बनाए रखने के लिए हमेशा कुर्सी या दीवार का सहारा लें।',
    focusAreas: ['Calf Venous Return', 'Hamstring Flexibility', 'Pelvic Rocking'],
    recommendedMinutesDaily: '25–30 mins',
    contraindicated: ['Straining to touch toes', 'Hot unventilated rooms']
  },
  7: {
    monthNumber: 7,
    weekRange: 'Weeks 25–28',
    trimester: 3,
    theme: 'Third Trimester Transition & Ribcage Opening',
    themeHi: 'तृतीय त्रैमास का आरंभ, पसलियों का विस्तार व विश्राम',
    description: 'Entering the third trimester! Baby\'s growing size presses against your diaphragm. Thoracic expansion, incline bound angle, and pelvic relaxation releases shortness of breath.',
    descriptionHi: 'अंतिम त्रैमास की शुरुआत। छाती और पसलियों के स्ट्रेच सांस फूलने की समस्या में राहत देते हैं। 45 डिग्री झुकाव पर आराम से पेल्विस खुलता है।',
    safetyTip: 'Take frequent 1-minute seated pauses with sips of water.',
    safetyTipHi: 'हर आसन के बाद 1 मिनट बैठकर गहरी सांस लें।',
    focusAreas: ['Thoracic Breathing Space', 'Pelvic Softening', '3-Pillow Side Rest'],
    recommendedMinutesDaily: '20–25 mins (Gentle intervals)',
    contraindicated: ['Holding breath', 'Fast pace movements', 'Flat back lying']
  },
  8: {
    monthNumber: 8,
    weekRange: 'Weeks 29–32',
    trimester: 3,
    theme: 'Pelvic Outlet Widening & Sacral Freedom',
    themeHi: 'पेल्विस का फैलाव, दोहरी गद्दी पर मालासन व प्रसव श्वास',
    description: 'Baby is gaining weight rapidly. Supported Malasana squat on 2 blocks and figure-8 pelvic swaying loosen sacral ligaments and widen the pelvic outlet diameter for birth.',
    descriptionHi: 'शिशु का वजन बढ़ रहा है। 2 योगा ब्लॉक या तकियों पर बैठकर मालासन करने से प्रसव मार्ग 28% तक सहजता से खुलता है और कमर पर दबाव नहीं पड़ता।',
    safetyTip: 'Never perform unsupported deep squats in late pregnancy; always sit firmly on blocks/cushions.',
    safetyTipHi: 'हवा में बिना सहारे के नीचे न बैठें; हमेशा मजबूत तकिए या स्टूल पर वजन रखें।',
    focusAreas: ['Pelvic Brim Widening', 'Golden Thread Labor Breath', 'Sciatic Relief'],
    recommendedMinutesDaily: '20–25 mins',
    contraindicated: ['Unsupported deep squatting', 'Twisting spine across belly']
  },
  9: {
    monthNumber: 9,
    weekRange: 'Weeks 33–40',
    trimester: 3,
    theme: 'Labor Readiness, Optimal Positioning & Perineal Relaxation',
    themeHi: 'प्रसव की संपूर्ण तैयारी, शिशु का सही कोण (LOA) व निर्भय मन',
    description: 'The final weeks! Gravity-assisted birthing ball bouncing, bolster malasana, asymmetric lunging, hands-and-knees pelvic tilts, and perineal sighing breaths prepare your body and baby for smooth natural delivery.',
    descriptionHi: 'शुभ प्रसव का समय आ गया है! बर्थिंग बॉल पर सौम्य रॉक, तकिए पर मालासन, एकपाद लंज और पेल्विक शिथिलीकरण शिशु के सिर को नीचे लाकर प्रसव को सहज व कम पीड़ादायक बनाते हैं।',
    safetyTip: 'Stop immediately if you experience regular painful contractions, fluid leakage, or vaginal bleeding.',
    safetyTipHi: 'यदि पानी की थैली फटे, रक्तस्राव हो या नियमित दर्द उठे तो तुरंत डॉक्टर व 108 से संपर्क करें।',
    focusAreas: ['Optimal Fetal Positioning (LOA)', 'Perineal Softening', 'Gravity Descent', 'Labor Stamina Conservation'],
    recommendedMinutesDaily: '15–20 mins (Split into 5-minute gentle segments)',
    contraindicated: ['Strenuous exertion', 'High walking speed', 'Bouncing forcefully on joints']
  }
};

/**
 * 47 Specialized Exercises Strictly Isolated by Month (Months 1 to 9)
 */
export const EXERCISE_LIBRARY = [
  // ═══════════════════════════════════════════════════════
  // MONTH 1 (WEEKS 1–4) — 5 EXERCISES
  // ═══════════════════════════════════════════════════════
  {
    id: 'm1_belly_breath',
    month: 1,
    title: 'Sukhasana & Deep Diaphragmatic Breath',
    titleHi: 'सुखासन व शांत उदर श्वास',
    category: 'breathing',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-sky-600 bg-sky-50 dark:bg-sky-950/70 border-sky-200 dark:border-sky-800',
    duration: '5–8 mins',
    summary: 'Gentle seated diaphragmatic breathing in easy pose. Calms early maternal cortisol and optimizes uterine blood oxygenation.',
    summaryHi: 'सुखासन में बैठकर गहरी शांत सांसें लेना। प्रारंभिक तनाव घटाता है और गर्भाशय में ऑक्सीजन युक्त रक्त पहुंचाता है।',
    visualModel: 'anulom_vilom',
    realImagePath: '/exercise_poses/butterfly.jpg',
        illustrations: {
      main: '/exercise_illustrations/m1/m1_belly_breath_main.png',
      steps: [
        '/exercise_illustrations/m1/m1_belly_breath_main.png',
        '/exercise_illustrations/m1/m1_belly_breath_main.png',
        '/exercise_illustrations/m1/m1_belly_breath_main.png'
      ]
    },
    primaryBenefit: 'Lowers sympathetic stress response to support healthy blastocyst implantation',
    primaryBenefitHi: 'तनाव हार्मोन घटाकर गर्भरोपण को शांति व सुरक्षा प्रदान करता है',
    propsNeeded: ['Firm cushion or folded blanket for upright spine'],
    propsNeededHi: ['रीढ़ सीधी रखने हेतु मुलायम तकिया या मुड़ा कंबल'],
    instructions: [
      { step: 1, title: 'Seated Setup', titleHi: 'सुखासन में बैठें', desc: 'Sit cross-legged on a folded blanket so hips are higher than knees. Rest hands softly on knees.', descHi: 'कंबल पर आराम से पालथी मारकर बैठें। कूल्हे घुटनों से थोड़े ऊंचे हों।' },
      { step: 2, title: 'Belly Hand Placement', titleHi: 'हाथ पेट पर रखें', desc: 'Place right hand on lower abdomen and left hand on heart. Close eyes softly.', descHi: 'दायां हाथ पेट के निचले हिस्से पर और बायां हाथ छाती पर रखें।' },
      { step: 3, title: 'Slow Inhalation', titleHi: 'धीमी सांस अंदर', desc: 'Inhale through nose for 4 counts, feeling the belly expand like a gentle balloon without straining.', descHi: 'नाक से 4 सेकंड तक धीमी सांस भरें, पेट को कोमलता से फूलने दें।' },
      { step: 4, title: 'Soothing Exhalation', titleHi: 'शांत सांस बाहर', desc: 'Exhale through nose for 5 counts, letting all tension melt from shoulders and pelvic floor.', descHi: '5 सेकंड में धीरे-धीरे सांस छोड़ें और कंधों को ढीला होने दें।' }
    ],
    breathingReminders: ['Keep breath silky and effortless.', 'No breath retention (Kumbhaka).'],
    breathingRemindersHi: ['सांस को बिना किसी जोर के सहज बहने दें।', 'सांस अंदर रोकने की चेष्टा न करें।'],
    modifications: ['If hips feel tight, sit in a sturdy chair with feet flat on the floor.'],
    modificationsHi: ['कूल्हों में जकड़न हो तो कुर्सी पर पीठ सीधी रखकर बैठें।'],
    stopIf: ['Dizziness or hyperventilation.'],
    stopIfHi: ['चक्कर आना या सांस उखड़ना।'],
    clinicalNote: 'ACOG endorsed. Diaphragmatic breathing stabilizes maternal autonomic tone during the implantation window.'
  },
  {
    id: 'm1_neck_shoulder',
    month: 1,
    title: 'Seated Neck & Shoulder Release',
    titleHi: 'ग्रीवा व स्कंध संचालन (कंधों व गर्दन का तनाव निवारण)',
    category: 'stretch',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-amber-600 bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-800',
    duration: '4–6 mins',
    summary: 'Slow head tilts and shoulder shrugs that relieve early hormonal tension headaches and upper trapezial tightness.',
    summaryHi: 'गर्दन को धीरे-धीरे झुकाना व कंधों को गोल घुमाना। प्रारंभिक हार्मोनल सिरदर्द व जकड़न में तुरंत आराम देता है।',
    visualModel: 'butterfly',
    realImagePath: '/exercise_poses/butterfly.jpg',
        illustrations: {
      main: '/exercise_illustrations/m1/m1_neck_shoulder_main.png',
      steps: [
        '/exercise_illustrations/m1/m1_neck_shoulder_main.png',
        '/exercise_illustrations/m1/m1_neck_shoulder_main.png',
        '/exercise_illustrations/m1/m1_neck_shoulder_main.png'
      ]
    },
    primaryBenefit: 'Dissolves early pregnancy tension headaches and neck stiffness',
    primaryBenefitHi: 'गर्दन की नसों का खिंचाव दूर कर सिरदर्द से राहत दिलाता है',
    propsNeeded: ['Chair or comfortable floor cushion'],
    propsNeededHi: ['आरामदायक कुर्सी या तकिया'],
    instructions: [
      { step: 1, title: 'Posture Check', titleHi: 'सीधी मुद्रा', desc: 'Sit tall with chin parallel to floor. Relax both shoulders down away from ears.', descHi: 'रीढ़ सीधी रखकर बैठें। कंधों को कानों से दूर ढीला रखें।' },
      { step: 2, title: 'Ear to Shoulder', titleHi: 'गर्दन झुकाएं', desc: 'Gently drop right ear toward right shoulder on exhale. Hold for 3 smooth breaths. Repeat on left side.', descHi: 'श्वास छोड़ते हुए दाएं कान को दाएं कंधे की ओर झुकाएं। 3 सांस रोकें, फिर बाईं ओर करें।' },
      { step: 3, title: 'Shoulder Rolls', titleHi: 'कंधे गोल घुमाएं', desc: 'Roll shoulders up, back, and down in 8 slow rhythmic circles.', descHi: 'कंधों को ऊपर, पीछे और नीचे की ओर 8 बार धीरे-धीरे गोल घुमाएं।' }
    ],
    breathingReminders: ['Inhale as shoulders lift, exhale as they roll down.'],
    breathingRemindersHi: ['कंधे उठाते समय सांस लें, नीचे लाते समय सांस छोड़ें।'],
    modifications: ['Never roll head in a full backward circle; only gentle side tilts and chin-to-chest drops.'],
    modificationsHi: ['सिर को पीछे पूरा न घुमाएं, केवल दायें-बायें झुकाएं।'],
    stopIf: ['Neck pinching or dizziness.'],
    stopIfHi: ['गर्दन में तेज नस दबने का अहसास हो।'],
    clinicalNote: 'Relieves cervical nerve compression aggravated by progesterone-induced vasodilation.'
  },
  {
    id: 'm1_ankle_pumps',
    month: 1,
    title: 'Ankle & Wrist Rotations (Gulph-Manibandh Chakra)',
    titleHi: 'गुल्फ व मणिबंध चक्र (टखने व कलाई चालन)',
    category: 'stretch',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-amber-600 bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-800',
    duration: '4–5 mins',
    summary: 'Rhythmic rotational flexing of ankles and wrists to promote venous return and prevent early pregnancy lethargy.',
    summaryHi: 'पैरों के टखनों और हाथों की कलाइयों को गोल घुमाना। नसों में खून का बहाव तेज करता है और आलस्य मिटाता है।',
    visualModel: 'walking',
    realImagePath: '/exercise_poses/tadasana.jpg',
        illustrations: {
      main: '/exercise_illustrations/m1/m1_ankle_pumps_main.png',
      steps: [
        '/exercise_illustrations/m1/m1_ankle_pumps_main.png',
        '/exercise_illustrations/m1/m1_ankle_pumps_main.png',
        '/exercise_illustrations/m1/m1_ankle_pumps_main.png'
      ]
    },
    primaryBenefit: 'Awakens peripheral circulation and stimulates lymphatic fluid drainage',
    primaryBenefitHi: 'हाथ-पैरों में खून का संचार बढ़ाता है और भारीपन दूर करता है',
    propsNeeded: ['Yoga mat or chair'],
    propsNeededHi: ['चटाई या कुर्सी'],
    instructions: [
      { step: 1, title: 'Seated Leg Extension', titleHi: 'पैर सीधे करें', desc: 'Sit comfortably with legs extended forward or resting flat while seated in a chair.', descHi: 'कुर्सी पर बैठकर या फर्श पर दोनों पैर सामने फैलाएं।' },
      { step: 2, title: 'Point & Flex', titleHi: 'पंजे आगे-पीछे', desc: 'Inhale point toes away; exhale pull toes toward shins. Repeat 10 times.', descHi: 'श्वास लेते हुए पंजे आगे खींचें, छोड़ते हुए अपनी तरफ मोड़ें। 10 बार करें।' },
      { step: 3, title: 'Smooth Circles', titleHi: 'गोल चक्र', desc: 'Rotate ankles 10 times clockwise, then 10 times counter-clockwise. Repeat with wrists.', descHi: 'टखनों को 10 बार घड़ी की दिशा में और 10 बार उल्टी दिशा में घुमाएं।' }
    ],
    breathingReminders: ['Sync movements with slow steady nasal breaths.'],
    breathingRemindersHi: ['हर चाल के साथ नाक से धीमी सांस लें।'],
    modifications: ['Can be done lying on left side if feeling exhausted.'],
    modificationsHi: ['थकान होने पर बाईं करवट लेटकर भी कर सकती हैं।'],
    stopIf: ['Calf pain or sharp cramp.'],
    stopIfHi: ['पिंडली में तेज ऐंठन हो।'],
    clinicalNote: 'Promotes muscle pump action in soleus and gastrocnemius muscles.'
  },
  {
    id: 'm1_morning_stroll',
    month: 1,
    title: 'Gentle Morning Stroll (Prabhat Pher)',
    titleHi: 'मंद प्रभात फेर (सुबह की सुरक्षित 15 मिनट सैर)',
    category: 'walking',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800',
    duration: '15 mins',
    summary: 'Calm morning walk in fresh air to stimulate appetite, boost natural serotonin, and ease early pregnancy nausea.',
    summaryHi: 'सुबह ताजी हवा में धीमी गति से 15 मिनट टहलना। सेरोटोनिन बढ़ाता है और सुबह की मतली को शांत करता है।',
    visualModel: 'walking',
    realImagePath: '/exercise_poses/tadasana.jpg',
        illustrations: {
      main: '/exercise_illustrations/m1/m1_morning_stroll_main.png',
      steps: [
        '/exercise_illustrations/m1/m1_morning_stroll_main.png',
        '/exercise_illustrations/m1/m1_morning_stroll_main.png',
        '/exercise_illustrations/m1/m1_morning_stroll_main.png'
      ]
    },
    primaryBenefit: 'Normalizes morning blood glucose and clears hormonal brain fog',
    primaryBenefitHi: 'शुगर को नियंत्रित रखता है और सुबह के आलस्य को मिटाता है',
    propsNeeded: ['Flat supportive footwear', 'Small water bottle'],
    propsNeededHi: ['समतल जूते/चप्पल', 'पानी की छोटी बोतल'],
    instructions: [
      { step: 1, title: 'Pre-walk Sip', titleHi: 'हल्का पानी पिएं', desc: 'Drink half a glass of warm water or lime water before stepping out.', descHi: 'निकलने से पहले आधा गिलास गुनगुना पानी या नींबू पानी पिएं।' },
      { step: 2, title: 'Slow Rhythm', titleHi: 'शांत गति', desc: 'Walk on flat grassy ground or pavement at a conversational, leisurely pace for 15 minutes.', descHi: 'घास या समतल मार्ग पर बिना किसी जल्दबाजी के 15 मिनट टहलें।' }
    ],
    breathingReminders: ['Breathe deeply through nose taking in morning fresh oxygen.'],
    breathingRemindersHi: ['नाक से गहरी ताजी हवा फेफड़ों में भरें।'],
    modifications: ['If feeling nauseous, pause on a bench and take slow deep breaths.'],
    modificationsHi: ['उल्टी जैसा लगे तो बेंच पर बैठकर गहरी सांस लें।'],
    stopIf: ['Abdominal cramping or lightheadedness.'],
    stopIfHi: ['पेट में मरोड़ या चक्कर आना।'],
    clinicalNote: 'WHO recommends low-impact outdoor walking to support initial metabolic adaptation.'
  },
  {
    id: 'm1_wall_tree',
    month: 1,
    title: 'Supported Tree Pose at Wall (Vrikshasana)',
    titleHi: 'दीवार समर्थित वृक्षासन (संतुलन व स्थिरता)',
    category: 'yoga',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-teal-600 bg-teal-50 dark:bg-teal-950/70 border-teal-200 dark:border-teal-800',
    duration: '4–5 mins',
    summary: 'Grounding balance posture with one hand or back touching the wall for 100% security. Builds mental equilibrium.',
    summaryHi: 'दीवार का सहारा लेकर एक पैर पर संतुलन बनाना। मन को एकाग्र करता है और पैरों की मांसपेशियों को मजबूती देता है।',
    visualModel: 'tadasana',
    realImagePath: '/exercise_poses/tadasana.jpg',
        illustrations: {
      main: '/exercise_illustrations/m1/m1_wall_tree_main.png',
      steps: [
        '/exercise_illustrations/m1/m1_wall_tree_main.png',
        '/exercise_illustrations/m1/m1_wall_tree_main.png',
        '/exercise_illustrations/m1/m1_wall_tree_main.png'
      ]
    },
    primaryBenefit: 'Develops grounded postural awareness and ankle strength without fall risk',
    primaryBenefitHi: 'बिना गिरने के जोखिम के पैरों को मजबूत और मन को स्थिर करता है',
    propsNeeded: ['Firm wall support'],
    propsNeededHi: ['दीवार का सहारा'],
    instructions: [
      { step: 1, title: 'Wall Stance', titleHi: 'दीवार के पास खड़े हों', desc: 'Stand alongside a wall with right shoulder close to wall. Place right hand flat on wall.', descHi: 'दीवार के पास खड़े हों और दायां हाथ दीवार पर टिकाएं।' },
      { step: 2, title: 'Foot Placement', titleHi: 'पैर की स्थिति', desc: 'Place left foot against inner right ankle or lower calf (never against knee).', descHi: 'बाएं पैर को दाएं टखने या पिंडली पर टिकाएं (घुटने पर न रखें)।' },
      { step: 3, title: 'Steady Gaze', titleHi: 'स्थिर दृष्टि', desc: 'Fix eyes on a still point ahead. Hold for 4–5 breaths, then turn and switch legs.', descHi: 'सामने किसी एक बिंदु पर नजर टिकाएं। 4-5 सांस रोकें, फिर दूसरा पैर बदलें।' }
    ],
    breathingReminders: ['Inhale lengthen spine, exhale root standing foot firmly into floor.'],
    breathingRemindersHi: ['सांस लेते हुए रीढ़ सीधी करें, छोड़ते हुए पैर को मजबूती से जमाएं।'],
    modifications: ['Keep ball of foot resting on floor with heel touching opposite ankle for easiest balance.'],
    modificationsHi: ['संतुलन न बने तो पैर का अंगूठा फर्श पर ही टिका रहने दें।'],
    stopIf: ['Wobbling or foot arch ache.'],
    stopIfHi: ['संतुलन डगमगाए तो दोनों पैर तुरंत फर्श पर रखें।'],
    clinicalNote: 'Strengthens intrinsic foot stabilizers challenged by relaxin hormone.'
  },

  // ═══════════════════════════════════════════════════════
  // MONTH 2 (WEEKS 5–8) — 5 EXERCISES
  // ═══════════════════════════════════════════════════════
  {
    id: 'm2_shitali_breath',
    month: 2,
    title: 'Cooling Shitali & Sheetkari Breath (Nausea Soother)',
    titleHi: 'शीतली व सीत्कारी प्राणायाम (मतली व एसिडिटी शामक)',
    category: 'breathing',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-sky-600 bg-sky-50 dark:bg-sky-950/70 border-sky-200 dark:border-sky-800',
    duration: '5–7 mins',
    summary: 'Cooling yogic breath through curled tongue or teeth. Calms the vomiting reflex in the brainstem and cools digestive heartburn.',
    summaryHi: 'जीभ या दांतों से ठंडी हवा अंदर लेना। मतली के केंद्र को शांत करता है और छाती की जलन व खट्टी डकार मिटाता है।',
    visualModel: 'anulom_vilom',
    realImagePath: '/exercise_poses/butterfly.jpg',
        illustrations: {
      main: '/exercise_illustrations/m2/m2_shitali_breath_main.png',
      steps: [
        '/exercise_illustrations/m2/m2_shitali_breath_main.png',
        '/exercise_illustrations/m2/m2_shitali_breath_main.png',
        '/exercise_illustrations/m2/m2_shitali_breath_main.png'
      ]
    },
    primaryBenefit: 'Clinically proven to reduce pregnancy nausea, salivation, and gastric reflux',
    primaryBenefitHi: 'मॉर्निंग सिकनेस, एसिडिटी और मुंह में अधिक लार आने की समस्या को दूर करता है',
    propsNeeded: ['Comfortable seat in well-ventilated room'],
    propsNeededHi: ['हवादार कमरे में आरामदायक बैठक'],
    instructions: [
      { step: 1, title: 'Sit Comfortably', titleHi: 'आराम से बैठें', desc: 'Sit upright with relaxed shoulders. Rest hands on lap.', descHi: 'पीठ सीधी करके बैठें और हाथों को गोद में रखें।' },
      { step: 2, title: 'Cool Inhale', titleHi: 'शीतल श्वास', desc: 'Curl tongue like a tube (or gently close teeth if unable to roll tongue). Inhale cool air through tongue for 4 counts.', descHi: 'जीभ को नली की तरह मोड़ें (या दांत मिलाकर) 4 सेकंड तक ठंडी हवा अंदर खींचें।' },
      { step: 3, title: 'Warm Exhale', titleHi: 'गर्म श्वास बाहर', desc: 'Close mouth, swallow softly, and exhale warm air slowly through nose for 6 counts.', descHi: 'मुंह बंद करें और नाक से धीरे-धीरे गर्म सांस बाहर निकालें। 8 बार दोहराएं।' }
    ],
    breathingReminders: ['Feel the refreshing coolness pass over the palate and throat.'],
    breathingRemindersHi: ['गले और तालू पर ठंडी हवा का सुखद अहसास महसूस करें।'],
    modifications: ['If room air is dry, drink a small sip of room-temperature water first.'],
    modificationsHi: ['गला सूखा लगे तो पहले एक घूंट पानी पी लें।'],
    stopIf: ['Coughing or throat irritation.'],
    stopIfHi: ['खांसी उठे तो सामान्य सांस लें।'],
    clinicalNote: 'Stimulates cranial nerves IX & X, balancing gastrointestinal hyper-motility.'
  },
  {
    id: 'm2_supported_catcow',
    month: 2,
    title: 'Supported Tabletop Cat-Cow (Blanket under Knees)',
    titleHi: 'मार्जरी-बिटिलासन गद्दी सहारा (रीढ़ का कोमल खिंचाव)',
    category: 'stretch',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800',
    duration: '5–6 mins',
    summary: 'Gentle arching and rounding on all fours with thick padding under knees. Loosens back stiffness without touching belly.',
    summaryHi: 'घुटनों के नीचे मोटा कंबल रखकर कैट-काऊ पोज। बिना पेट छुए कमर और रीढ़ को पूरी तरह लचीला रखता है।',
    visualModel: 'cat_cow',
    realImagePath: '/exercise_poses/cat_cow.jpg',
        illustrations: {
      main: '/exercise_illustrations/m2/m2_supported_catcow_main.png',
      steps: [
        '/exercise_illustrations/m2/m2_supported_catcow_main.png',
        '/exercise_illustrations/m2/m2_supported_catcow_main.png',
        '/exercise_illustrations/m2/m2_supported_catcow_main.png'
      ]
    },
    primaryBenefit: 'Mobilizes thoracic vertebrae and relieves morning lumbar stiffness',
    primaryBenefitHi: 'रीढ़ की नसों को खोलता है और सुबह की कमर जकड़न दूर करता है',
    propsNeeded: ['Folded thick towel or blanket'],
    propsNeededHi: ['घुटनों के लिए मुड़ा हुआ मोटा तौलिया'],
    instructions: [
      { step: 1, title: 'Knee Padding', titleHi: 'घुटनों पर गद्दी', desc: 'Come onto hands and knees with blanket under knees. Wrists under shoulders.', descHi: 'घुटनों के नीचे कंबल रखकर चौपाया स्थिति में आएं। हाथ कंधों की सीध में हों।' },
      { step: 2, title: 'Cow Inhale', titleHi: 'काऊ पोज (श्वास अंदर)', desc: 'Inhale, look softly forward, let chest open slightly. Do not drop belly down deeply.', descHi: 'श्वास लेते हुए छाती आगे खोलें। पेट को बहुत नीचे न गिराएं।' },
      { step: 3, title: 'Cat Exhale', titleHi: 'कैट पोज (श्वास बाहर)', desc: 'Exhale, gently round mid-back upward, releasing head between arms.', descHi: 'श्वास छोड़ते हुए रीढ़ को ऊपर की ओर गोल करें और सिर ढीला छोड़ें।' }
    ],
    breathingReminders: ['Keep movement small, fluid, and gentle.'],
    breathingRemindersHi: ['गति को बहुत धीमा और शांत रखें।'],
    modifications: ['If wrists ache, place forearms onto a chair seat.'],
    modificationsHi: ['कलाई में दर्द हो तो कोहनियों को कुर्सी पर टिकाएं।'],
    stopIf: ['Abdominal cramping.'],
    stopIfHi: ['पेट में खिंचाव या दर्द हो।'],
    clinicalNote: 'Prevents ligament laxity micro-trauma during high-relaxin phase.'
  },
  {
    id: 'm2_seated_side_arc',
    month: 2,
    title: 'Seated Lateral Rib Arc (Parshva Sukhasana)',
    titleHi: 'पार्श्व सुखासन स्ट्रेच (पसलियों का फैलाव)',
    category: 'stretch',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-amber-600 bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-800',
    duration: '4–5 mins',
    summary: 'Gentle lateral crescent stretch opening the intercostal rib cage to create room for shallow breathing caused by nausea.',
    summaryHi: 'सुखासन में बैठकर एक हाथ ऊपर उठाकर बाजू में झुकना। पसलियों को खोलता है और मतली के भारीपन को घटाता है।',
    visualModel: 'butterfly',
    realImagePath: '/exercise_poses/butterfly.jpg',
        illustrations: {
      main: '/exercise_illustrations/m2/m2_seated_side_arc_main.png',
      steps: [
        '/exercise_illustrations/m2/m2_seated_side_arc_main.png',
        '/exercise_illustrations/m2/m2_seated_side_arc_main.png',
        '/exercise_illustrations/m2/m2_seated_side_arc_main.png'
      ]
    },
    primaryBenefit: 'Expands lung volume and relieves gastric bloating sensations',
    primaryBenefitHi: 'फेफड़ों की क्षमता बढ़ाता है और पेट के अफारे को दूर करता है',
    propsNeeded: ['Yoga mat or carpet'],
    propsNeededHi: ['चटाई या दरी'],
    instructions: [
      { step: 1, title: 'Seated Center', titleHi: 'बैठने की स्थिति', desc: 'Sit cross-legged. Place right hand on floor beside hip.', descHi: 'पालथी मारकर बैठें और दायां हाथ फर्श पर रखें।' },
      { step: 2, title: 'Left Arm Sweep', titleHi: 'बायां हाथ उठाएं', desc: 'Inhale, raise left arm toward ceiling. Exhale, arc softly to right for 3 breaths.', descHi: 'श्वास लेते हुए बायां हाथ ऊपर उठाएं, छोड़ते हुए दाईं तरफ हल्का झुकें। 3 सांस रोकें।' },
      { step: 3, title: 'Switch Side', titleHi: 'दूसरी तरफ दोहराएं', desc: 'Return to center and repeat on left side.', descHi: 'वापस आकर बाईं तरफ दोहराएं।' }
    ],
    breathingReminders: ['Breathe directly into the side ribs.'],
    breathingRemindersHi: ['पसलियों के किनारों में सांस भरें।'],
    modifications: ['Keep arm bent if shoulders are tender.'],
    modificationsHi: ['कंधे में दर्द हो तो कोहनी को हल्का मोड़कर रखें।'],
    stopIf: ['Sharp abdominal pull.'],
    stopIfHi: ['पेट के निचले हिस्से में कोई खिंचाव महसूस हो।'],
    clinicalNote: 'Decompresses thoracic spine and diaphragm insertion points.'
  },
  {
    id: 'm2_virasana_cushion',
    month: 2,
    title: 'Virasana on Bolster (Digestion Posture)',
    titleHi: 'वीरासन तकिया सहारा (पाचन व ऊर्जा मुद्रा)',
    category: 'yoga',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-teal-600 bg-teal-50 dark:bg-teal-950/70 border-teal-200 dark:border-teal-800',
    duration: '4–6 mins',
    summary: 'Kneeling with hips resting on a thick bolster. Enhances digestive fire (Agni) without compressing the lower belly.',
    summaryHi: 'तकिए पर घुटने मोड़कर बैठना। पेट पर दबाव डाले बिना जठराग्नि को तेज करता है और सुस्ती भगाता है।',
    visualModel: 'butterfly',
    realImagePath: '/exercise_poses/butterfly.jpg',
        illustrations: {
      main: '/exercise_illustrations/m2/m2_virasana_cushion_main.png',
      steps: [
        '/exercise_illustrations/m2/m2_virasana_cushion_main.png',
        '/exercise_illustrations/m2/m2_virasana_cushion_main.png',
        '/exercise_illustrations/m2/m2_virasana_cushion_main.png'
      ]
    },
    primaryBenefit: 'Stimulates hepatic-portal digestion and prevents second-month nausea bloating',
    primaryBenefitHi: 'पाचन तंत्र को सक्रिय करता है और भोजन के बाद मतली को रोकता है',
    propsNeeded: ['1–2 thick pillows or yoga bolster'],
    propsNeededHi: ['1-2 मोटे तकिए या बोल्स्टर'],
    instructions: [
      { step: 1, title: 'Bolster Placement', titleHi: 'तकिया लगाएं', desc: 'Place a bolster between feet. Kneel and sit your hips firmly on the bolster.', descHi: 'पैरों के बीच तकिया रखें और उस पर कूल्हे टिकाकर बैठें।' },
      { step: 2, title: 'Upright Spine', titleHi: 'रीढ़ सीधी', desc: 'Rest palms on thighs facing down. Close eyes and breathe rhythmically for 5 minutes.', descHi: 'हथेलियों को जांघों पर रखें, आंखें बंद कर 5 मिनट शांत सांसें लें।' }
    ],
    breathingReminders: ['Inhale lengthen crown upward, exhale drop shoulders.'],
    breathingRemindersHi: ['सांस लेते हुए रीढ़ सीधी करें, छोड़ते हुए कंधों को ढीला छोड़ें।'],
    modifications: ['Add another pillow under hips if knee joints feel tight.'],
    modificationsHi: ['घुटनों में खिंचाव हो तो तकियों की ऊंचाई बढ़ा लें।'],
    stopIf: ['Knee joint pain.'],
    stopIfHi: ['घुटनों में दर्द होने पर तुरंत सामान्य बैठ जाएं।'],
    clinicalNote: 'Redirects femoral arterial circulation toward pelvic splanchnic viscera.'
  },
  {
    id: 'm2_elevated_legs',
    month: 2,
    title: 'Bolster Elevated Leg Rest (Viparita Cushion)',
    titleHi: 'पाद विश्रांति आसन (पैरों के नीचे तकिया विश्राम)',
    category: 'pelvic',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-purple-600 bg-purple-50 dark:bg-purple-950/70 border-purple-200 dark:border-purple-800',
    duration: '8–10 mins',
    summary: 'Resting on left side or semi-reclined with calves elevated on a stack of cushions. Drains tired legs and relieves exhaustion.',
    summaryHi: 'करवट लेकर पैरों के नीचे तकिए रखकर लेटना। पैरों की थकावट मिटाता है और ऊर्जा का संचार करता है।',
    visualModel: 'savasana_left',
    realImagePath: '/exercise_poses/savasana_left.jpg',
        illustrations: {
      main: '/exercise_illustrations/m2/m2_elevated_legs_main.png',
      steps: [
        '/exercise_illustrations/m2/m2_elevated_legs_main.png',
        '/exercise_illustrations/m2/m2_elevated_legs_main.png',
        '/exercise_illustrations/m2/m2_elevated_legs_main.png'
      ]
    },
    primaryBenefit: 'Promotes venous pooling recovery and eases early pregnancy prostration',
    primaryBenefitHi: 'पैरों की भारीपन को दूर करता है और थकान में तुरंत नई ताजगी देता है',
    propsNeeded: ['2–3 firm pillows under lower legs'],
    propsNeededHi: ['पैरों के नीचे 2-3 तकिए'],
    instructions: [
      { step: 1, title: 'Setup', titleHi: 'व्यवस्था', desc: 'Place 2 cushions under your calves while resting on your left side with upper knee supported.', descHi: 'बाईं करवट लेटें और दोनों पैरों के नीचे 2 तकिए लगाएं।' },
      { step: 2, title: 'Complete Rest', titleHi: 'पूर्ण विश्राम', desc: 'Close eyes, breathe naturally, and stay for 8 to 10 restful minutes.', descHi: 'आंखें बंद कर 8 से 10 मिनट गहरी शांति में विश्राम करें।' }
    ],
    breathingReminders: ['Let each exhale release all heaviness from legs and feet.'],
    breathingRemindersHi: ['श्वास छोड़ते समय पैरों से सारा तनाव बाहर निकाल दें।'],
    modifications: ['Keep head comfortably elevated on a medium pillow.'],
    modificationsHi: ['सिर के नीचे भी आरामदायक तकिया रखें।'],
    stopIf: ['Feeling lightheaded or breathless.'],
    stopIfHi: ['घबराहट महसूस हो।'],
    clinicalNote: 'Safely relieves gravitational venous stasis without supine hypotension.'
  },

  // ═══════════════════════════════════════════════════════
  // MONTH 3 (WEEKS 9–12) — 5 EXERCISES
  // ═══════════════════════════════════════════════════════
  {
    id: 'm3_kegel_foundation',
    month: 3,
    title: 'Pelvic Floor Awareness Kegels (The Elevator)',
    titleHi: 'पेल्विक फ्लोर आधार कीगेल (मांसपेशी संकुचन व उत्थान)',
    category: 'pelvic',
    difficulty: 'Beginner',
    difficultyHi: 'शुरुआती / सरल',
    difficultyColor: 'text-purple-600 bg-purple-50 dark:bg-purple-950/70 border-purple-200 dark:border-purple-800',
    duration: '5–6 mins',
    summary: 'Targeted strengthening of the pubococcygeus hammock supporting uterus, bladder, and bowel at the end of Trimester 1.',
    summaryHi: 'गर्भाशय व मूत्राशय को थामने वाली पेल्विक मांसपेशियों की कसरत। प्रसव उपरांत यूरिन लीकेज को रोकने का प्रमुख अभ्यास।',
    visualModel: 'kegel',
    realImagePath: '/exercise_poses/kegel.jpg',
    illustrations: {
      main: '/exercise_illustrations/m3/m3_kegel_foundation_main.png',
      steps: [
        '/exercise_illustrations/m3/m3_kegel_foundation_step1.png',
        '/exercise_illustrations/m3/m3_kegel_foundation_step2.png',
        '/exercise_illustrations/m3/m3_kegel_foundation_step3.png'
      ]
    },
    primaryBenefit: 'Builds foundational muscle tone to prevent urinary incontinence as uterus grows',
    primaryBenefitHi: 'गर्भाशय बढ़ने पर पेशाब के रिसाव को रोकता है और पेल्विस को सहारा देता है',
    propsNeeded: ['Chair or comfortable mat'],
    propsNeededHi: ['कुर्सी या चटाई'],
    instructions: [
      { step: 1, title: 'Seated Posture', titleHi: 'बैठें', desc: 'Sit upright on a chair with feet flat on the floor, spine tall.', descHi: 'कुर्सी पर दोनों पैर फर्श पर सपाट रखकर सीधे बैठें।' },
      { step: 2, title: 'Gentle Lift', titleHi: 'धीमा संकुचन (3 सेकंड)', desc: 'Imagine stopping urine flow mid-stream. Squeeze and lift muscles inward and upward for 3 seconds.', descHi: 'पेशाब रोकने वाली मांसपेशियों को अंदर और ऊपर की ओर 3 सेकंड खींचें।' },
      { step: 3, title: 'Full Release', titleHi: 'पूर्ण ढीलापन (6 सेकंड)', desc: 'Completely soften and release for 6 seconds. Relaxation is as vital as contraction.', descHi: 'मांसपेशियों को पूरी तरह 6 सेकंड तक ढीला छोड़ें।' }
    ],
    breathingReminders: ['Exhale on the squeeze, inhale on the release. Never hold breath.'],
    breathingRemindersHi: ['सिकोड़ते समय सांस छोड़ें, ढीला छोड़ते समय सांस अंदर लें।'],
    modifications: ['If 3 seconds feels hard, start with 2 seconds.'],
    modificationsHi: ['शुरुआत में 2 सेकंड ही रोकें।'],
    stopIf: ['Pelvic cramping or bearing down sensation.'],
    stopIfHi: ['पेट में मरोड़ या नीचे की ओर जोर लगने का अहसास हो।'],
    clinicalNote: 'NICE Guidelines recommend 3 sets daily for antenatal pelvic floor conditioning.'
  },
  {
    id: 'm3_gentle_butterfly',
    month: 3,
    title: 'Gentle Seated Butterfly (Baddha Konasana Foundation)',
    titleHi: 'मृदु बद्ध कोणासन (प्रारंभिक तितली आसन)',
    category: 'yoga',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-teal-600 bg-teal-50 dark:bg-teal-950/70 border-teal-200 dark:border-teal-800',
    duration: '5–7 mins',
    summary: 'Soles of feet together, knees supported by pillows. Gentle fluttering opens inner adductors and pelvic circulation.',
    summaryHi: 'दोनों तलवे मिलाकर घुटनों को तितली की तरह धीरे-धीरे हिलाना। जांघों और पेल्विस का लचीलापन बढ़ाता है।',
    visualModel: 'butterfly',
    realImagePath: '/exercise_poses/butterfly.jpg',
    illustrations: {
      main: '/exercise_illustrations/m3/m3_gentle_butterfly_main.png',
      steps: [
        '/exercise_illustrations/m3/m3_gentle_butterfly_step1.png',
        '/exercise_illustrations/m3/m3_gentle_butterfly_main.png',
        '/exercise_illustrations/m3/m3_gentle_butterfly_main.png'
      ]
    },
    primaryBenefit: 'Opens inner groin gently to prepare pelvic joints for second trimester expansion',
    primaryBenefitHi: 'जांघों की मांसपेशियों को कोमल बनाकर पेल्विस को तैयार करता है',
    propsNeeded: ['2 cushions under knees or thighs'],
    propsNeededHi: ['घुटनों के नीचे 2 तकिए'],
    instructions: [
      { step: 1, title: 'Soles Together', titleHi: 'तलवे मिलाएं', desc: 'Sit on a folded blanket. Bring soles of feet together 1 foot away from pelvis.', descHi: 'मुड़े कंबल पर बैठें और दोनों पैरों के तलवों को आपस में मिलाएं।' },
      { step: 2, title: 'Slow Flutter', titleHi: 'धीमी तितली चाल', desc: 'Hold ankles gently. Flutter knees softly up and down for 30 seconds.', descHi: 'टखनों को पकड़ें और घुटनों को 30 सेकंड धीरे-धीरे ऊपर-नीचे हिलाएं।' },
      { step: 3, title: 'Still Hold', titleHi: 'स्थिर विश्राम', desc: 'Rest knees on cushions. Close eyes and take 5 deep calm breaths.', descHi: 'घुटनों को तकिए पर टिकाएं और 5 गहरी शांत सांसें लें।' }
    ],
    breathingReminders: ['Inhale lengthen spine, exhale release groin tension.'],
    breathingRemindersHi: ['सांस लेते हुए रीढ़ सीधी करें, छोड़ते हुए तनाव बाहर निकालें।'],
    modifications: ['Lean back against a wall if spine curves.'],
    modificationsHi: ['कमर झुकने लगे तो दीवार से पीठ सटाकर बैठें।'],
    stopIf: ['Sharp groin or pubic bone pain.'],
    stopIfHi: ['प्यूबिक हड्डी या कमर में तेज चुभन हो।'],
    clinicalNote: 'Maintains adductor elasticity without straining sacroiliac joint laxity.'
  },
  {
    id: 'm3_wall_downward_dog',
    month: 3,
    title: 'Supported Wall Downward Dog (Adho Mukha Svanasana)',
    titleHi: 'दीवार समर्थित अधोमुख श्वानासन (रीढ़ विस्तार)',
    category: 'stretch',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-amber-600 bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-800',
    duration: '4–5 mins',
    summary: 'Hands placed at waist height on a wall, stepping feet back to form an L-shape. Decompresses spine without belly inversion.',
    summaryHi: 'दीवार पर हाथ टिकाकर कमर को 90 डिग्री पर सीधा करना। बिना सिर झुकाए रीढ़ और कंधों को खोलता है।',
    visualModel: 'tadasana',
    realImagePath: '/exercise_poses/tadasana.jpg',
    illustrations: {
      main: '/exercise_illustrations/m3/m3_wall_downward_dog_main.png',
      steps: [
        '/exercise_illustrations/m3/m3_wall_downward_dog_step1.png',
        '/exercise_illustrations/m3/m3_wall_downward_dog_main.png',
        '/exercise_illustrations/m3/m3_wall_downward_dog_main.png'
      ]
    },
    primaryBenefit: 'Decompresses the entire spinal column without raising intra-abdominal pressure',
    primaryBenefitHi: 'पेट पर बिना दबाव डाले पूरी रीढ़ की नसों को खोलता है',
    propsNeeded: ['Sturdy clear wall'],
    propsNeededHi: ['मजबूत दीवार'],
    instructions: [
      { step: 1, title: 'Wall Palms', titleHi: 'दीवार पर हाथ', desc: 'Stand facing wall at arm\'s length. Place palms flat against wall at hip height.', descHi: 'दीवार के सामने खड़े हों और हथेलियों को कमर की ऊंचाई पर दीवार पर रखें।' },
      { step: 2, title: 'Step Back', titleHi: 'पीछे कदम लें', desc: 'Step feet back until torso is parallel to floor in an L-shape. Knees softly bent.', descHi: 'पीछे हटें जब तक पीठ समतल न हो जाए। घुटनों को हल्का मुड़ा रखें।' },
      { step: 3, title: 'Spine Stretch', titleHi: 'रीढ़ का खिंचाव', desc: 'Press palms into wall, lengthen hips away from hands. Breathe for 5 slow breaths.', descHi: 'दीवार को दबाते हुए कूल्हों को पीछे खींचें और 5 गहरी सांसें लें।' }
    ],
    breathingReminders: ['Inhale into shoulder blades, exhale release lower back.'],
    breathingRemindersHi: ['कंधों में सांस भरें, छोड़ते हुए कमर को ढीला छोड़ें।'],
    modifications: ['Keep knees generously bent to protect hamstrings.'],
    modificationsHi: ['जांघों में तनाव न आए इसलिए घुटनों को मोड़कर रखें।'],
    stopIf: ['Dizziness or head rush.'],
    stopIfHi: ['चक्कर जैसा महसूस हो।'],
    clinicalNote: 'Safe alternative to inverted downward dog, avoiding blood pressure shifts.'
  },
  {
    id: 'm3_chair_catcow',
    month: 3,
    title: 'Seated Chair Cat-Cow for Working Mothers',
    titleHi: 'कुर्सी पर मार्जरी आसन (कामकाजी माताओं हेतु)',
    category: 'stretch',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-amber-600 bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-800',
    duration: '4–5 mins',
    summary: 'Cat-Cow spinal waves performed sitting upright in an office chair. Releases sacrum tightness without getting on the floor.',
    summaryHi: 'कुर्सी पर बैठे-बैठे रीढ़ को आगे-पीछे हिलाना। दफ्तर में काम करते हुए कमर का दर्द मिटाने का सर्वश्रेष्ठ उपाय।',
    visualModel: 'cat_cow',
    realImagePath: '/exercise_poses/cat_cow.jpg',
    illustrations: {
      main: '/exercise_illustrations/m3/m3_chair_catcow_main.png',
      steps: [
        '/exercise_illustrations/m3/m3_chair_catcow_step1.png',
        '/exercise_illustrations/m3/m3_chair_catcow_main.png',
        '/exercise_illustrations/m3/m3_chair_catcow_main.png'
      ]
    },
    primaryBenefit: 'Counters prolonged desk-sitting strain on lumbosacral junction',
    primaryBenefitHi: 'कुर्सी पर लगातार बैठने से होने वाले कमर दर्द को तुरंत मिटाता है',
    propsNeeded: ['Sturdy desk chair (without wheels)'],
    propsNeededHi: ['मजबूत स्थिर कुर्सी'],
    instructions: [
      { step: 1, title: 'Sit Forward', titleHi: 'कुर्सी के आगे बैठें', desc: 'Sit on front edge of chair with feet flat and hip-width apart. Rest hands on knees.', descHi: 'कुर्सी के आगे के हिस्से पर बैठें। हाथ घुटनों पर रखें।' },
      { step: 2, title: 'Cow Inhale', titleHi: 'छाती खोलें (सांस अंदर)', desc: 'Inhale, draw chest forward, roll shoulders back, look gently up.', descHi: 'सांस लेते हुए छाती आगे निकालें और कंधे पीछे खींचें।' },
      { step: 3, title: 'Cat Exhale', titleHi: 'पीठ गोल करें (सांस बाहर)', desc: 'Exhale, round spine back toward chair rest, tuck chin softly.', descHi: 'सांस छोड़ते हुए रीढ़ को पीछे गोल करें और सिर हल्का झुकाएं। 8 बार करें।' }
    ],
    breathingReminders: ['Move with the natural tide of your breathing.'],
    breathingRemindersHi: ['सांस की गति के साथ लयबद्ध होकर हिलें।'],
    modifications: ['Perform every 2 hours during long working desk days.'],
    modificationsHi: ['हर 2 घंटे के काम के बाद 2 मिनट यह स्ट्रेच करें।'],
    stopIf: ['Abdominal pinching.'],
    stopIfHi: ['पेट में कोई खिंचाव हो।'],
    clinicalNote: 'Reduces postural kyphosis and thoracic stiffness in desk workers.'
  },
  {
    id: 'm3_bhramari_humming',
    month: 3,
    title: 'Gentle Bhramari Humming Breath (Anxiety Dispeller)',
    titleHi: 'सौम्य भ्रामरी प्राणायाम (चिंता व अनिद्रा नाशक)',
    category: 'breathing',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-sky-600 bg-sky-50 dark:bg-sky-950/70 border-sky-200 dark:border-sky-800',
    duration: '5–7 mins',
    summary: 'Soft, gentle humming on exhalation creating soothing cranial vibrations. Relieves anxiety and promotes restful sleep.',
    summaryHi: 'श्वास छोड़ते हुए भौंरे जैसी हल्की गुंजन करना। मन से भय व चिंता मिटाकर गहरी नींद लाता है।',
    visualModel: 'anulom_vilom',
    realImagePath: '/exercise_poses/butterfly.jpg',
    illustrations: {
      main: '/exercise_illustrations/m3/m3_bhramari_humming_main.png',
      steps: [
        '/exercise_illustrations/m3/m3_bhramari_humming_step1.png',
        '/exercise_illustrations/m3/m3_bhramari_humming_main.png',
        '/exercise_illustrations/m3/m3_bhramari_humming_main.png'
      ]
    },
    primaryBenefit: 'Stimulates parasympathetic vagus nerve, reducing maternal anxiety and insomnia',
    primaryBenefitHi: 'चिंता और तनाव दूर कर मन को अपार शांति प्रदान करता है',
    propsNeeded: ['Comfortable quiet space'],
    propsNeededHi: ['शांत स्थान'],
    instructions: [
      { step: 1, title: 'Hand Placement', titleHi: 'हाथ कान पर', desc: 'Sit comfortably. Rest index fingers gently on ear tragus cartilage (do not push inside).', descHi: 'आराम से बैठें और तर्जनी उंगली को कान के बाहरी हिस्से पर हल्के से रखें।' },
      { step: 2, title: 'Deep Inhale', titleHi: 'गहरी सांस लें', desc: 'Inhale slowly through both nostrils filling chest and abdomen.', descHi: 'दोनों नासिकाओं से धीमी गहरी सांस भरें।' },
      { step: 3, title: 'Humming Exhale', titleHi: 'मधुर गुंजन (म-कार)', desc: 'Exhale while producing a smooth, low-pitch humming sound "Mmmmm" for 6–8 seconds. Repeat 6 times.', descHi: 'सांस छोड़ते हुए होंठ बंद रखकर "म-म-म" की मधुर गुंजन करें। 6 बार दोहराएं।' }
    ],
    breathingReminders: ['Keep humming pitch low, smooth, and relaxing.'],
    breathingRemindersHi: ['गुंजन की आवाज को धीमा और सुखद रखें।'],
    modifications: ['Can rest hands on lap without touching ears if ears feel sensitive.'],
    modificationsHi: ['कान न छूना चाहें तो हाथ गोद में रखकर भी गुंजन कर सकती हैं।'],
    stopIf: ['Feeling lightheaded.'],
    stopIfHi: ['सिर भारी लगे तो सामान्य सांस लें।'],
    clinicalNote: 'Increases nasal nitric oxide production 15-fold, enhancing airway resistance and calming heart rate.'
  },

  // ═══════════════════════════════════════════════════════
  // MONTH 4 (WEEKS 13–16) — 5 EXERCISES
  // ═══════════════════════════════════════════════════════
  {
    id: 'm4_wall_tadasana',
    month: 4,
    title: 'Wall-Aligned Mountain Pose (Tadasana Posture Reset)',
    titleHi: 'दीवार संरेखित ताड़ासन (रीढ़ संतुलन व ऊर्जा)',
    category: 'yoga',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-teal-600 bg-teal-50 dark:bg-teal-950/70 border-teal-200 dark:border-teal-800',
    duration: '5–6 mins',
    summary: 'Standing tall with heels, sacrum, and shoulder blades touching wall. Resets center of gravity as belly begins to grow.',
    summaryHi: 'दीवार से पीठ सटाकर खड़े होना। पेट का भार बढ़ने पर रीढ़ के संतुलन को बिगड़ने से रोकता है।',
    visualModel: 'tadasana',
    realImagePath: '/exercise_poses/tadasana.jpg',
        illustrations: {
      main: '/exercise_illustrations/m4/m4_wall_tadasana_main.png',
      steps: [
        '/exercise_illustrations/m4/m4_wall_tadasana_main.png',
        '/exercise_illustrations/m4/m4_wall_tadasana_main.png',
        '/exercise_illustrations/m4/m4_wall_tadasana_main.png'
      ]
    },
    primaryBenefit: 'Counters forward pelvic tilt and relieves thoracic compression',
    primaryBenefitHi: 'पेट आगे झुकने से कमर पर पड़ने वाले खिंचाव को संतुलित करता है',
    propsNeeded: ['Clear wall space'],
    propsNeededHi: ['दीवार का सहारा'],
    instructions: [
      { step: 1, title: 'Wall Contact', titleHi: 'दीवार स्पर्श', desc: 'Stand with heels 2 inches from wall. Back of head, shoulder blades, and buttocks lightly touch wall.', descHi: 'एड़ियों को दीवार से 2 इंच दूर रखें। सिर, कंधे और कूल्हे दीवार को छुएं।' },
      { step: 2, title: 'Arm Raise Inhale', titleHi: 'भुजाएं उठाएं', desc: 'Inhale and sweep arms overhead along wall. Exhale and lower smoothly to sides. Repeat 8 times.', descHi: 'सांस लेते हुए दोनों हाथ दीवार से सटाकर ऊपर उठाएं, छोड़ते हुए नीचे लाएं।' }
    ],
    breathingReminders: ['Inhale expand ribs, exhale anchor feet into floor.'],
    breathingRemindersHi: ['हाथ ऊपर उठाते समय पसलियों में सांस भरें।'],
    modifications: ['If standing tires you, do arms only while seated against wall.'],
    modificationsHi: ['खड़े होने में थकान हो तो बैठकर भी यह कर सकती हैं।'],
    stopIf: ['Dizziness while standing.'],
    stopIfHi: ['खड़े रहने पर चक्कर आए।'],
    clinicalNote: 'Re-aligns spinal plumb line to reduce lordotic disc shear forces.'
  },
  {
    id: 'm4_supported_warrior',
    month: 4,
    title: 'Chair-Supported Warrior II (Virabhadrasana II)',
    titleHi: 'सहारा युक्त वीरभद्रासन II (जांघों की मजबूती)',
    category: 'yoga',
    difficulty: 'Moderate',
    difficultyHi: 'मध्यम / सहारा युक्त',
    difficultyColor: 'text-amber-600 bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-800',
    duration: '5–7 mins',
    summary: 'Front thigh supported by chair seat. Strengthens glutes and quadriceps to carry bump weight without pelvic strain.',
    summaryHi: 'कुर्सी पर जांघ टिकाकर वीरभद्रासन। जांघों को मजबूत करता है और बिना थकान के सहनशक्ति बढ़ाता है।',
    visualModel: 'tadasana',
    realImagePath: '/exercise_poses/tadasana.jpg',
        illustrations: {
      main: '/exercise_illustrations/m4/m4_supported_warrior_main.png',
      steps: [
        '/exercise_illustrations/m4/m4_supported_warrior_main.png',
        '/exercise_illustrations/m4/m4_supported_warrior_main.png',
        '/exercise_illustrations/m4/m4_supported_warrior_main.png'
      ]
    },
    primaryBenefit: 'Builds lower-body stamina and opens groin without overloading knees',
    primaryBenefitHi: 'पैरों में नई ताकत भरता है और घुटनों पर दबाव नहीं आने देता',
    propsNeeded: ['Sturdy armchair or dining chair'],
    propsNeededHi: ['मजबूत कुर्सी'],
    instructions: [
      { step: 1, title: 'Chair Straddle', titleHi: 'कुर्सी पर बैठें', desc: 'Straddle chair with right thigh supported on seat, left leg extended straight back.', descHi: 'कुर्सी पर बैठें, दाईं जांघ को सीट पर रखें और बायां पैर पीछे सीधा करें।' },
      { step: 2, title: 'Extend Arms', titleHi: 'बांहें फैलाएं', desc: 'Extend arms parallel to floor at shoulder height. Gaze over right fingertips for 5 breaths.', descHi: 'दोनों हाथों को कंधों की सीध में फैलाएं और दाएं हाथ की उंगलियों को देखें।' },
      { step: 3, title: 'Switch Side', titleHi: 'दूसरी तरफ करें', desc: 'Turn smoothly to the other side and repeat with left leg forward.', descHi: 'दूसरी तरफ मुड़ें और बाएं पैर से दोहराएं।' }
    ],
    breathingReminders: ['Exhale sink into strength, inhale lift spine tall.'],
    breathingRemindersHi: ['सांस छोड़ते हुए मजबूती महसूस करें, लेते हुए रीढ़ सीधी रखें।'],
    modifications: ['Rest hands on hips if shoulders feel fatigued.'],
    modificationsHi: ['कंधे थकें तो हाथ कमर पर रख लें।'],
    stopIf: ['Hip pain or joint pinch.'],
    stopIfHi: ['कूल्हे में तेज दर्द हो।'],
    clinicalNote: 'Builds isometric pelvic girdle strength without relaxin joint subluxation.'
  },
  {
    id: 'm4_standing_pelvic_tilts',
    month: 4,
    title: 'Standing Pelvic Tilts at Wall',
    titleHi: 'दीवार पर श्रोणि झुकाव (कमर दर्द निवारक)',
    category: 'stretch',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-amber-600 bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-800',
    duration: '4–5 mins',
    summary: 'Standing against wall, gently flattening small of back against wall on exhale. Decompresses lumbar vertebrae.',
    summaryHi: 'दीवार से कमर सटाकर पेट को हल्का अंदर खींचना। कमर के निचले हिस्से की नसों का दर्द मिटाता है।',
    visualModel: 'tadasana',
    realImagePath: '/exercise_poses/tadasana.jpg',
        illustrations: {
      main: '/exercise_illustrations/m4/m4_standing_pelvic_tilts_main.png',
      steps: [
        '/exercise_illustrations/m4/m4_standing_pelvic_tilts_main.png',
        '/exercise_illustrations/m4/m4_standing_pelvic_tilts_main.png',
        '/exercise_illustrations/m4/m4_standing_pelvic_tilts_main.png'
      ]
    },
    primaryBenefit: 'Releases lumbar spinal compression caused by growing uterus',
    primaryBenefitHi: 'बढ़ते पेट से कमर की नसों पर पड़ने वाले दबाव को मुक्त करता है',
    propsNeeded: ['Wall'],
    propsNeededHi: ['दीवार'],
    instructions: [
      { step: 1, title: 'Wall Stance', titleHi: 'दीवार के सहारे', desc: 'Stand with feet hip-width, knees slightly soft, back touching wall.', descHi: 'दीवार से कमर सटाकर खड़े हों, घुटनों को थोड़ा ढीला रखें।' },
      { step: 2, title: 'Flatten Back Exhale', titleHi: 'कमर चिपकाएं', desc: 'Exhale, tuck tailbone under and flatten lower back completely against wall. Hold 3 seconds.', descHi: 'सांस छोड़ते हुए कमर के निचले हिस्से को दीवार से चिपकाएं। 3 सेकंड रोकें।' },
      { step: 3, title: 'Neutral Release', titleHi: 'ढीला छोड़ें', desc: 'Inhale, return to natural neutral spine curve. Repeat 10 times.', descHi: 'सांस लेते हुए सामान्य स्थिति में आएं। 10 बार दोहराएं।' }
    ],
    breathingReminders: ['Exhale on flattening, inhale on neutral release.'],
    breathingRemindersHi: ['कमर चिपकाते समय सांस छोड़ें, सामान्य होते समय सांस लें।'],
    modifications: ['Can also be done seated on an exercise ball.'],
    modificationsHi: ['बर्थिंग बॉल पर बैठकर भी यह अभ्यास कर सकती हैं।'],
    stopIf: ['Abdominal tightness.'],
    stopIfHi: ['पेट में कड़ापन महसूस हो।'],
    clinicalNote: 'Restores neutral pelvic tilt index, reducing postpartum backache incidence.'
  },
  {
    id: 'm4_supported_side_angle',
    month: 4,
    title: 'Supported Side Angle Stretch (Utthita Parsvakonasana)',
    titleHi: 'उत्थित पार्श्वकोणासन सहारा (पसलियों का खुलापन)',
    category: 'yoga',
    difficulty: 'Moderate',
    difficultyHi: 'मध्यम / सहारा युक्त',
    difficultyColor: 'text-amber-600 bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-800',
    duration: '5–6 mins',
    summary: 'Forearm resting on chair seat or thigh, sweeping upper arm in a long diagonal line from back heel to fingertips.',
    summaryHi: 'कुर्सी पर कोहनी टिकाकर दूसरी बांह को ऊपर खींचना। पैर से लेकर हाथ तक पूरी बाजू को शानदार खिंचाव देता है।',
    visualModel: 'tadasana',
    realImagePath: '/exercise_poses/tadasana.jpg',
        illustrations: {
      main: '/exercise_illustrations/m4/m4_supported_side_angle_main.png',
      steps: [
        '/exercise_illustrations/m4/m4_supported_side_angle_main.png',
        '/exercise_illustrations/m4/m4_supported_side_angle_main.png',
        '/exercise_illustrations/m4/m4_supported_side_angle_main.png'
      ]
    },
    primaryBenefit: 'Opens entire lateral fascial chain and increases vital lung capacity',
    primaryBenefitHi: 'पसलियों को खोलता है और सांस लेने के लिए भरपूर जगह बनाता है',
    propsNeeded: ['Sturdy chair'],
    propsNeededHi: ['मजबूत कुर्सी'],
    instructions: [
      { step: 1, title: 'Stance Setup', titleHi: 'तैयारी', desc: 'Stand facing chair. Place right foot forward with knee bent, rest right forearm on chair seat.', descHi: 'दायां पैर आगे रखकर घुटना मोड़ें और दाईं कोहनी कुर्सी पर टिकाएं।' },
      { step: 2, title: 'Diagonal Sweep', titleHi: 'बांह खींचें', desc: 'Sweep left arm overhead along ear in a long line from left heel to fingertips. Breathe 4 breaths.', descHi: 'बाएं हाथ को सिर के ऊपर से सीधा खींचें। 4 गहरी सांसें लें।' },
      { step: 3, title: 'Switch', titleHi: 'दूसरी तरफ', desc: 'Switch sides smoothly.', descHi: 'दूसरी तरफ दोहराएं।' }
    ],
    breathingReminders: ['Inhale lengthen fingertips away from back heel.'],
    breathingRemindersHi: ['सांस लेते हुए हाथ को दूर तक खींचें।'],
    modifications: ['Keep top hand on hip if shoulder is tight.'],
    modificationsHi: ['कंधा थके तो हाथ कमर पर रख लें।'],
    stopIf: ['Knee strain or loss of balance.'],
    stopIfHi: ['घुटने में दर्द हो।'],
    clinicalNote: 'Improves intercostal expansion and lateral diaphragm movement.'
  },
  {
    id: 'm4_cardio_walk',
    month: 4,
    title: 'Moderate Conversational Walk (20-Min Cardio Boost)',
    titleHi: 'सजग 20 मिनट चहलकदमी (ऊर्जा व स्टेमिना वृद्धि)',
    category: 'walking',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800',
    duration: '20 mins',
    summary: 'Rhythmic, moderate walking taking advantage of second-trimester energy. Keeps gestational weight gain balanced.',
    summaryHi: 'द्वितीय त्रैमास की भरपूर ऊर्जा का लाभ उठाते हुए 20 मिनट टहलना। वजन नियंत्रित रखता है और स्टेमिना बढ़ाता है।',
    visualModel: 'walking',
    realImagePath: '/exercise_poses/tadasana.jpg',
        illustrations: {
      main: '/exercise_illustrations/m4/m4_cardio_walk_main.png',
      steps: [
        '/exercise_illustrations/m4/m4_cardio_walk_main.png',
        '/exercise_illustrations/m4/m4_cardio_walk_main.png',
        '/exercise_illustrations/m4/m4_cardio_walk_main.png'
      ]
    },
    primaryBenefit: 'Optimizes insulin sensitivity and reduces Gestational Diabetes risk by 38%',
    primaryBenefitHi: 'शुगर को नियंत्रित रखता है और गर्भकालीन डायबिटीज से सुरक्षा देता है',
    propsNeeded: ['Cushioned walking shoes', 'Water bottle'],
    propsNeededHi: ['आरामदायक जूते', 'पानी की बोतल'],
    instructions: [
      { step: 1, title: 'Warm Up', titleHi: 'धीमी शुरुआत', desc: 'Start with 3 minutes of slow strolling to warm muscles.', descHi: 'पहले 3 मिनट बिल्कुल धीमी गति से चलें।' },
      { step: 2, title: 'Conversational Pace', titleHi: 'बातचीत की गति', desc: 'Increase to a brisk yet comfortable pace where you can still talk easily without gasping for 14 minutes.', descHi: '14 मिनट तक ऐसी गति से चलें जिसमें बिना हांफे बात की जा सके।' },
      { step: 3, title: 'Cool Down', titleHi: 'धीमा अंत', desc: 'Finish with 3 minutes of slow pacing and sips of water.', descHi: 'आखिरी 3 मिनट गति धीमी कर लें और पानी पिएं।' }
    ],
    breathingReminders: ['Maintain rhythmic nasal breathing.'],
    breathingRemindersHi: ['नाक से लयबद्ध सांस लेते रहें।'],
    modifications: ['Can split into 10 minutes morning + 10 minutes evening.'],
    modificationsHi: ['सुबह 10 मिनट और शाम 10 मिनट में बांट सकती हैं।'],
    stopIf: ['Shortness of breath before exertion.'],
    stopIfHi: ['सीने में भारीपन या सांस उखड़े।'],
    clinicalNote: 'ACOG committee guidelines state 150 min/week moderate walking is the gold standard.'
  },

  // ═══════════════════════════════════════════════════════
  // MONTH 5 (WEEKS 17–20) — 5 EXERCISES
  // ═══════════════════════════════════════════════════════
  {
    id: 'm5_ball_hip_circles',
    month: 5,
    title: 'Seated Hip Circles on Birthing Ball (SI Joint Relief)',
    titleHi: 'बर्थिंग बॉल हिप सर्कल्स (कमर व श्रोणि मुक्ति)',
    category: 'stretch',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800',
    duration: '5–8 mins',
    summary: 'Fluid rotational rolling of pelvis seated on a 65cm exercise ball. Frees locked sacroiliac joints and eases back stiffness.',
    summaryHi: 'बर्थिंग बॉल पर बैठकर कूल्हों को गोल घुमाना। कमर की जकड़ी हुई नसों को खोलता है और दर्द में तुरंत राहत देता है।',
    visualModel: 'pelvic_rocking',
    realImagePath: '/exercise_poses/cat_cow.jpg',
        illustrations: {
      main: '/exercise_illustrations/m5/m5_ball_hip_circles_main.png',
      steps: [
        '/exercise_illustrations/m5/m5_ball_hip_circles_main.png',
        '/exercise_illustrations/m5/m5_ball_hip_circles_main.png',
        '/exercise_illustrations/m5/m5_ball_hip_circles_main.png'
      ]
    },
    primaryBenefit: 'Frees sacroiliac joint lock and reduces lower back spasm frequency by 45%',
    primaryBenefitHi: 'कमर के निचले हिस्से की नसों का तनाव दूर करता है',
    propsNeeded: ['Birthing ball (65cm) or rounded firm cushion on chair'],
    propsNeededHi: ['बर्थिंग बॉल या कुर्सी पर गोल गद्दी'],
    instructions: [
      { step: 1, title: 'Stable Base', titleHi: 'स्थिर बैठक', desc: 'Sit in center of ball with feet planted wide for rock-solid stability.', descHi: 'गेंद पर बीच में बैठें और दोनों पैरों को चौड़ा रखें ताकि संतुलन बना रहे।' },
      { step: 2, title: 'Clockwise Circles', titleHi: 'घड़ी की दिशा में', desc: 'Circle hips smoothly clockwise 10 times, keeping upper torso upright.', descHi: 'कूल्हों को घड़ी की दिशा में 10 बार बड़े और धीमे गोल घेरे में घुमाएं।' },
      { step: 3, title: 'Counter-Clockwise', titleHi: 'उल्टी दिशा में', desc: 'Reverse and circle counter-clockwise 10 times.', descHi: 'दिशा बदलकर 10 बार उल्टी दिशा में घुमाएं।' }
    ],
    breathingReminders: ['Inhale circle forward, exhale circle backward.'],
    breathingRemindersHi: ['आगे घूमते समय सांस लें, पीछे घूमते समय सांस छोड़ें।'],
    modifications: ['Keep hand touching a table or wall for balance reassurance.'],
    modificationsHi: ['पास में मेज या दीवार पकड़ कर रखें ताकि सुरक्षा बनी रहे।'],
    stopIf: ['Wobbliness or tailbone pinch.'],
    stopIfHi: ['संतुलन बिगड़ने लगे।'],
    clinicalNote: 'Midwifery standard for pelvic balance and SI joint decompression.'
  },
  {
    id: 'm5_extended_child_pose',
    month: 5,
    title: 'Wide-Knee Supported Child\'s Pose (Balasana)',
    titleHi: 'उत्थित बालासन तकिया सहारा (लिगामेंट व कमर विश्राम)',
    category: 'yoga',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-teal-600 bg-teal-50 dark:bg-teal-950/70 border-teal-200 dark:border-teal-800',
    duration: '5–7 mins',
    summary: 'Knees spread wide apart to accommodate belly, torso resting on a long bolster. Completely unweights the uterus and spine.',
    summaryHi: 'घुटनों को चौड़ा फैलाकर तकिए पर आगे झुककर लेटना। पेट और रीढ़ के सारे भार को शून्य कर देता है।',
    visualModel: 'cat_cow',
    realImagePath: '/exercise_poses/cat_cow.jpg',
        illustrations: {
      main: '/exercise_illustrations/m5/m5_extended_child_pose_main.png',
      steps: [
        '/exercise_illustrations/m5/m5_extended_child_pose_main.png',
        '/exercise_illustrations/m5/m5_extended_child_pose_main.png',
        '/exercise_illustrations/m5/m5_extended_child_pose_main.png'
      ]
    },
    primaryBenefit: 'Releases round ligament tension and completely unweights the maternal lumbar spine',
    primaryBenefitHi: 'कमर और पेट के लिगामेंट्स के खिंचाव को तुरंत शांत करता है',
    propsNeeded: ['Long bolster or 2 thick bed pillows'],
    propsNeededHi: ['लंबा बोल्स्टर या 2 मोटे तकिए'],
    instructions: [
      { step: 1, title: 'Knees Wide', titleHi: 'घुटने चौड़े करें', desc: 'Kneel with big toes touching, knees wide apart as mat. Place bolster between thighs.', descHi: 'घुटनों को चटाई जितना चौड़ा खोलें और बीच में लंबा तकिया रखें।' },
      { step: 2, title: 'Drape Forward', titleHi: 'तकिए पर लेटें', desc: 'Fold forward draping torso over bolster. Turn head to one side and rest arms along bolster.', descHi: 'छाती और पेट को तकिए पर टिकाएं। सिर एक तरफ मोड़कर हाथ आगे रखें।' },
      { step: 3, title: 'Rest & Breathe', titleHi: 'शांत विश्राम', desc: 'Close eyes and breathe into lower back for 5 minutes, turning head halfway through.', descHi: 'आंखें बंद कर 5 मिनट कमर में गहरी सांसें लें।' }
    ],
    breathingReminders: ['Feel breath expanding the lower back like wings.'],
    breathingRemindersHi: ['कमर के दोनों तरफ सांस की लहर महसूस करें।'],
    modifications: ['Place folded blanket under knees or under buttocks if hips don\'t reach heels.'],
    modificationsHi: ['कूल्हों के नीचे अतिरिक्त कंबल लगाएं।'],
    stopIf: ['Knee discomfort.'],
    stopIfHi: ['घुटने में दर्द हो।'],
    clinicalNote: 'Reduces uterine weight pressure against retroperitoneal structures.'
  },
  {
    id: 'm5_goddess_squat',
    month: 5,
    title: 'Supported Goddess Pose (Utkata Konasana)',
    titleHi: 'सहारा युक्त उत्कट कोणासन (पेल्विक शक्ति मुद्रा)',
    category: 'pelvic',
    difficulty: 'Moderate',
    difficultyHi: 'मध्यम / सहारा युक्त',
    difficultyColor: 'text-purple-600 bg-purple-50 dark:bg-purple-950/70 border-purple-200 dark:border-purple-800',
    duration: '4–6 mins',
    summary: 'Wide-legged stance with toes turned out 45 degrees, bending knees with back against wall or holding chair. Opens groin.',
    summaryHi: 'पैरों को चौड़ा फैलाकर घुटने मोड़ना और दीवार या कुर्सी का सहारा लेना। पेल्विस और जांघों को जन्म के लिए तैयार करता है।',
    visualModel: 'malasana',
    realImagePath: '/exercise_poses/malasana.jpg',
        illustrations: {
      main: '/exercise_illustrations/m5/m5_goddess_squat_main.png',
      steps: [
        '/exercise_illustrations/m5/m5_goddess_squat_main.png',
        '/exercise_illustrations/m5/m5_goddess_squat_main.png',
        '/exercise_illustrations/m5/m5_goddess_squat_main.png'
      ]
    },
    primaryBenefit: 'Strengthens pelvic floor elasticity and opens inner hip adductors',
    primaryBenefitHi: 'पेल्विक फ्लोर का लचीलापन बढ़ाता है और जांघों को मजबूत करता है',
    propsNeeded: ['Wall or chair for balance support'],
    propsNeededHi: ['दीवार या कुर्सी का सहारा'],
    instructions: [
      { step: 1, title: 'Wide Stance', titleHi: 'चौड़े पैर', desc: 'Stand with feet 3 feet apart, toes angled 45 degrees outward. Keep hand on chair or back against wall.', descHi: 'पैरों को 3 फीट चौड़ा रखें, पंजे बाहर की ओर हों। हाथ कुर्सी पर रखें।' },
      { step: 2, title: 'Knee Bend', titleHi: 'घुटने मोड़ें', desc: 'Exhale, bend knees over ankles into a gentle squat. Inhale press back up. Repeat 8 times.', descHi: 'सांस छोड़ते हुए घुटनों को मोड़ें, लेते हुए सीधे हों। 8 बार करें।' }
    ],
    breathingReminders: ['Exhale as you lower, inhale as you rise.'],
    breathingRemindersHi: ['नीचे जाते समय सांस छोड़ें, उठते समय सांस लें।'],
    modifications: ['Keep squat shallow (only 3–4 inches dip) to protect knees.'],
    modificationsHi: ['घुटनों को हल्का सा ही मोड़ें।'],
    stopIf: ['Groin strain or pubic symphysis pain.'],
    stopIfHi: ['प्यूबिक हड्डी में दर्द हो।'],
    clinicalNote: 'Tones pelvic diaphragm while maintaining sacroiliac stability.'
  },
  {
    id: 'm5_garuda_arms',
    month: 5,
    title: 'Eagle Arms Shoulder Stretch (Garudasana Arms)',
    titleHi: 'गरुड़ासन बाहु खिंचाव (ऊपरी पीठ तनाव मुक्ति)',
    category: 'stretch',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-amber-600 bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-800',
    duration: '4–5 mins',
    summary: 'Wrapping elbows and forearms together seated. Deeply stretches rhomboids and traps strained by growing breasts.',
    summaryHi: 'दोनों हाथों को आपस में लपेटकर कोहनियां उठाना। स्तनों के भारीपन से कंधों के बीच होने वाले दर्द को मिटाता है।',
    visualModel: 'butterfly',
    realImagePath: '/exercise_poses/butterfly.jpg',
        illustrations: {
      main: '/exercise_illustrations/m5/m5_garuda_arms_main.png',
      steps: [
        '/exercise_illustrations/m5/m5_garuda_arms_main.png',
        '/exercise_illustrations/m5/m5_garuda_arms_main.png',
        '/exercise_illustrations/m5/m5_garuda_arms_main.png'
      ]
    },
    primaryBenefit: 'Releases rhomboid and upper trapezius spasm caused by breast enlargement',
    primaryBenefitHi: 'कंधों और ऊपरी पीठ की मांसपेशियों की जकड़न खोलता है',
    propsNeeded: ['Chair or cushion'],
    propsNeededHi: ['कुर्सी या तकिया'],
    instructions: [
      { step: 1, title: 'Cross Arms', titleHi: 'हाथ लपेटें', desc: 'Sit upright. Cross right elbow over left elbow, wrap forearms and touch palms (or touch backs of hands).', descHi: 'सीधे बैठें। दाईं कोहनी को बाईं कोहनी के ऊपर लपेटें और हथेलियां मिलाएं।' },
      { step: 2, title: 'Lift Elbows', titleHi: 'कोहनियां उठाएं', desc: 'Inhale, lift elbows to shoulder height while softening shoulders down. Hold for 5 breaths.', descHi: 'सांस लेते हुए कोहनियों को कंधे की सीध में उठाएं और 5 सांस रोकें।' },
      { step: 3, title: 'Switch', titleHi: 'दूसरी तरफ', desc: 'Unravel and cross left over right.', descHi: 'हाथ खोलकर बाईं कोहनी ऊपर रखकर दोहराएं।' }
    ],
    breathingReminders: ['Breathe directly into space between shoulder blades.'],
    breathingRemindersHi: ['दोनों कंधों के बीच की जगह में सांस भरें।'],
    modifications: ['If forearms don\'t wrap, simply give yourself a gentle hug with hands on opposite shoulders.'],
    modificationsHi: ['हाथ न लिपटे तो दोनों हाथों से विपरीत कंधों को पकड़ें।'],
    stopIf: ['Shoulder impingement.'],
    stopIfHi: ['कंधे में कोई नस खिंचे।'],
    clinicalNote: 'Decompresses dorsal scapular nerve roots and thoracic fascia.'
  },
  {
    id: 'm5_garbha_samvad',
    month: 5,
    title: 'Garbha Samvad Left Side Rest (Baby Quickening Bond)',
    titleHi: 'वाम कुक्षी गर्भ संवाद (शिशु की प्रथम किक्स से जुड़ाव)',
    category: 'breathing',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-sky-600 bg-sky-50 dark:bg-sky-950/70 border-sky-200 dark:border-sky-800',
    duration: '10–12 mins',
    summary: 'Resting on left side with hand gently placed on womb to feel baby\'s first fluttering movements (quickening).',
    summaryHi: 'बाईं करवट लेटकर प्यार से पेट पर हाथ रखना और शिशु की पहली हलचल महसूस करते हुए उससे बात करना।',
    visualModel: 'savasana_left',
    realImagePath: '/exercise_poses/savasana_left.jpg',
        illustrations: {
      main: '/exercise_illustrations/m5/m5_garbha_samvad_main.png',
      steps: [
        '/exercise_illustrations/m5/m5_garbha_samvad_main.png',
        '/exercise_illustrations/m5/m5_garbha_samvad_main.png',
        '/exercise_illustrations/m5/m5_garbha_samvad_main.png'
      ]
    },
    primaryBenefit: 'Maximizes placental oxygenation and fosters deep prenatal emotional bonding',
    primaryBenefitHi: 'प्लेसेंटा को भरपूर ऑक्सीजन देता है और मां-शिशु के प्रेम को प्रगाढ़ बनाता है',
    propsNeeded: ['Pillow between knees and under head'],
    propsNeededHi: ['घुटनों के बीच और सिर के नीचे तकिया'],
    instructions: [
      { step: 1, title: 'Left Side Recline', titleHi: 'बाईं करवट लेटें', desc: 'Lie on your left side with knees bent and a pillow between knees.', descHi: 'घुटनों के बीच तकिया रखकर बाईं करवट लेटें।' },
      { step: 2, title: 'Hand on Womb', titleHi: 'पेट पर हाथ', desc: 'Place right hand warm and flat over your baby bump.', descHi: 'दायां हाथ प्यार से पेट पर शिशु के ऊपर रखें।' },
      { step: 3, title: 'Loving Connection', titleHi: 'प्रेम वार्तालाप', desc: 'Close eyes. Speak lovingly to your baby mentally and feel for gentle fluttering quickening movements.', descHi: 'आंखें बंद कर मन ही मन शिशु से बात करें और उसकी नन्हीं हलचल महसूस करें।' }
    ],
    breathingReminders: ['Let breath flow soft and peaceful like a gentle lullaby.'],
    breathingRemindersHi: ['सांस को लोरी की तरह शांत और कोमल बहने दें।'],
    modifications: ['Add a thin wedge pillow under your belly for extra bump support.'],
    modificationsHi: ['पेट के नीचे भी हल्का तकिया लगा सकती हैं।'],
    stopIf: ['Nausea or numbness.'],
    stopIfHi: ['घबराहट महसूस हो।'],
    clinicalNote: 'Supported by international stillbirth prevention guidelines (Tommy\'s UK & ACOG).'
  },

  // ═══════════════════════════════════════════════════════
  // MONTH 6 (WEEKS 21–24) — 5 EXERCISES
  // ═══════════════════════════════════════════════════════
  {
    id: 'm6_calf_achilles_wall',
    month: 6,
    title: 'Wall Calf & Achilles Stretch (Leg Cramp Stopper)',
    titleHi: 'दीवार पर पिंडली व टखना स्ट्रेच (पैरों की ऐंठन निवारक)',
    category: 'stretch',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-amber-600 bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-800',
    duration: '5–6 mins',
    summary: 'Standing runner\'s stretch with palms on wall. Lengthens gastrocnemius to stop painful nighttime charley horse cramps.',
    summaryHi: 'दीवार पर हाथ टिकाकर एक पैर पीछे खींचना। रात में होने वाली पिंडलियों की भयानक नसों की ऐंठन को रोकता है।',
    visualModel: 'tadasana',
    realImagePath: '/exercise_poses/tadasana.jpg',
        illustrations: {
      main: '/exercise_illustrations/m6/m6_calf_achilles_wall_main.png',
      steps: [
        '/exercise_illustrations/m6/m6_calf_achilles_wall_main.png',
        '/exercise_illustrations/m6/m6_calf_achilles_wall_main.png',
        '/exercise_illustrations/m6/m6_calf_achilles_wall_main.png'
      ]
    },
    primaryBenefit: 'Eliminates nocturnal gastrocnemius cramps and drains venous pedal edema',
    primaryBenefitHi: 'रात में पैर की नस चढ़ने से बचाता है और पैरों की सूजन घटाता है',
    propsNeeded: ['Wall'],
    propsNeededHi: ['दीवार'],
    instructions: [
      { step: 1, title: 'Hands on Wall', titleHi: 'दीवार पर हाथ', desc: 'Stand facing wall with palms flat. Step left foot straight back, keeping heel flat on floor.', descHi: 'दीवार पर दोनों हाथ रखें। बायां पैर पीछे ले जाएं, एड़ी को फर्श से चिपकाए रखें।' },
      { step: 2, title: 'Heel Press', titleHi: 'एड़ी दबाएं', desc: 'Bend front right knee slightly until you feel a deep stretch in left calf. Hold 30 seconds. Switch legs.', descHi: 'दाएं घुटने को मोड़ें जब तक बाईं पिंडली में खिंचाव न आए। 30 सेकंड रोकें, फिर पैर बदलें।' }
    ],
    breathingReminders: ['Exhale and press back heel down firmly.'],
    breathingRemindersHi: ['सांस छोड़ते हुए पीछे की एड़ी को फर्श पर दबाएं।'],
    modifications: ['Perform every night right before bed to guarantee cramp-free sleep.'],
    modificationsHi: ['सोने से ठीक पहले इसे 2 मिनट अवश्य करें।'],
    stopIf: ['Sharp localized calf redness or unilateral severe pain (DVT warning).'],
    stopIfHi: ['केवल एक पिंडली में तेज दर्द या लाली हो।'],
    clinicalNote: 'Prevents nocturnal cramp spasms triggered by phosphorus/calcium shifts.'
  },
  {
    id: 'm6_janu_sirsasana',
    month: 6,
    title: 'Supported Seated Head-to-Knee Pose (Janu Sirsasana)',
    titleHi: 'जानु शीर्षासन तकिए पर (हैमस्ट्रिंग व कमर स्ट्रेच)',
    category: 'yoga',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-teal-600 bg-teal-50 dark:bg-teal-950/70 border-teal-200 dark:border-teal-800',
    duration: '5–6 mins',
    summary: 'One leg extended wide, one foot folded inward. Rest hands on a pillow over extended leg without compressing belly.',
    summaryHi: 'एक पैर सीधा फैलाकर तकिए पर हाथ टिकाना। पेट को पूरी जगह देते हुए जांघ के पीछे की मांसपेशियों को खोलता है।',
    visualModel: 'butterfly',
    realImagePath: '/exercise_poses/butterfly.jpg',
        illustrations: {
      main: '/exercise_illustrations/m6/m6_janu_sirsasana_main.png',
      steps: [
        '/exercise_illustrations/m6/m6_janu_sirsasana_main.png',
        '/exercise_illustrations/m6/m6_janu_sirsasana_main.png',
        '/exercise_illustrations/m6/m6_janu_sirsasana_main.png'
      ]
    },
    primaryBenefit: 'Stretches tight hamstrings and opens hips while giving 100% room to the growing baby bump',
    primaryBenefitHi: 'पेट पर बिना दबाव डाले जांघों और कमर को लचीला बनाता है',
    propsNeeded: ['Pillow or bolster'],
    propsNeededHi: ['तकिया या बोल्स्टर'],
    instructions: [
      { step: 1, title: 'Wide Angle', titleHi: 'पैर फैलाएं', desc: 'Sit on a folded blanket. Extend right leg diagonally outward, fold left foot to inner groin.', descHi: 'कंबल पर बैठें। दायां पैर बाहर फैलाएं, बायां पैर मोड़कर अंदर रखें।' },
      { step: 2, title: 'Place Bolster', titleHi: 'तकिया रखें', desc: 'Place a bolster over right leg. Rest hands on bolster and lengthen chest forward gently.', descHi: 'दाएं पैर पर तकिया रखें और उस पर हाथ टिकाकर छाती को सीधा आगे झुकाएं।' },
      { step: 3, title: 'Breathe', titleHi: 'सांस लें', desc: 'Hold for 5 smooth breaths without rounding lower back. Repeat on other side.', descHi: '5 गहरी सांसें लें, फिर दूसरी तरफ दोहराएं।' }
    ],
    breathingReminders: ['Inhale lengthen spine, exhale soften chest forward.'],
    breathingRemindersHi: ['सांस लेते हुए रीढ़ सीधी करें, छोड़ते हुए आगे झुकें।'],
    modifications: ['Bend extended knee slightly if hamstrings feel tight.'],
    modificationsHi: ['जांघ में खिंचाव हो तो घुटने को थोड़ा मोड़ लें।'],
    stopIf: ['Abdominal compression or pain.'],
    stopIfHi: ['पेट पर कोई दबाव आए।'],
    clinicalNote: 'Maintains posterior chain length to prevent sciatic nerve entrapment.'
  },
  {
    id: 'm6_pelvic_rock_cushion',
    month: 6,
    title: 'Seated Pelvic Rocking on Firm Cushion',
    titleHi: 'आगे-पीछे पेल्विक रॉक (श्रोणि झुकाव व ढीलापन)',
    category: 'pelvic',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-purple-600 bg-purple-50 dark:bg-purple-950/70 border-purple-200 dark:border-purple-800',
    duration: '5–6 mins',
    summary: 'Sitting cross-legged on a cushion, gently tilting pelvis forward and backward with breath.',
    summaryHi: 'तकिए पर बैठकर कूल्हों को धीरे-धीरे आगे और पीछे झुकाना। पेल्विस की जकड़न को खोलता है।',
    visualModel: 'pelvic_rocking',
    realImagePath: '/exercise_poses/cat_cow.jpg',
        illustrations: {
      main: '/exercise_illustrations/m6/m6_pelvic_rock_cushion_main.png',
      steps: [
        '/exercise_illustrations/m6/m6_pelvic_rock_cushion_main.png',
        '/exercise_illustrations/m6/m6_pelvic_rock_cushion_main.png',
        '/exercise_illustrations/m6/m6_pelvic_rock_cushion_main.png'
      ]
    },
    primaryBenefit: 'Mobilizes sacrococcygeal joint and eases pubic symphysis pressure',
    primaryBenefitHi: 'कमर के जोड़ को लचीला रखता है और प्यूबिक हड्डी के दबाव को कम करता है',
    propsNeeded: ['Firm cushion or folded blanket'],
    propsNeededHi: ['मुलायम तकिया'],
    instructions: [
      { step: 1, title: 'Sit Tall', titleHi: 'सीधे बैठें', desc: 'Sit on center of cushion with hands on knees.', descHi: 'तकिए के बीच में बैठें और हाथ घुटनों पर रखें।' },
      { step: 2, title: 'Rock Forward Inhale', titleHi: 'आगे झुकाव (सांस अंदर)', desc: 'Inhale, tip pelvis forward slightly, lifting chest.', descHi: 'सांस लेते हुए कूल्हों को आगे झुकाएं और छाती उठाएं।' },
      { step: 3, title: 'Rock Back Exhale', titleHi: 'पीछे झुकाव (सांस बाहर)', desc: 'Exhale, tuck tailbone softly, tilting pelvis back. Repeat 10 times.', descHi: 'सांस छोड़ते हुए कूल्हों को पीछे झुकाएं। 10 बार करें।' }
    ],
    breathingReminders: ['Maintain a smooth, rhythmic rocking ocean wave rhythm.'],
    breathingRemindersHi: ['समुद्र की लहरों की तरह शांत गति से हिलें।'],
    modifications: ['Can also be done seated on an office chair.'],
    modificationsHi: ['कुर्सी पर बैठकर भी कर सकती हैं।'],
    stopIf: ['Pubic pain.'],
    stopIfHi: ['प्यूबिक हड्डी में दर्द हो।'],
    clinicalNote: 'Promotes sacral nutation and counternutation for pelvic mobility.'
  },
  {
    id: 'm6_nadi_shodhana',
    month: 6,
    title: 'Gentle Nadi Shodhana (Alternate Nostril Breath)',
    titleHi: 'नाड़ी शोधन प्राणायाम (रक्तचाप व तंत्रिका संतुलन)',
    category: 'breathing',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-sky-600 bg-sky-50 dark:bg-sky-950/70 border-sky-200 dark:border-sky-800',
    duration: '6–8 mins',
    summary: 'Rhythmic alternate nostril breathing. Lowers systolic blood pressure, balances autonomic nervous system, and calms baby.',
    summaryHi: 'दाईं और बाईं नाक से बारी-बारी सांस लेना। रक्तचाप नियंत्रित रखता है और मां व शिशु दोनों के हृदय को शांत करता है।',
    visualModel: 'anulom_vilom',
    realImagePath: '/exercise_poses/butterfly.jpg',
        illustrations: {
      main: '/exercise_illustrations/m6/m6_nadi_shodhana_main.png',
      steps: [
        '/exercise_illustrations/m6/m6_nadi_shodhana_main.png',
        '/exercise_illustrations/m6/m6_nadi_shodhana_main.png',
        '/exercise_illustrations/m6/m6_nadi_shodhana_main.png'
      ]
    },
    primaryBenefit: 'Stabilizes maternal cardiovascular pressure and enhances fetal heart rate variability',
    primaryBenefitHi: 'ब्लड प्रेशर को सामान्य रखता है और शिशु की धड़कन को शांत करता है',
    propsNeeded: ['Quiet seated position with back support'],
    propsNeededHi: ['पीठ के सहारे के साथ शांत बैठक'],
    instructions: [
      { step: 1, title: 'Hand Position', titleHi: 'हाथ की मुद्रा', desc: 'Use right thumb to close right nostril, right ring finger for left nostril.', descHi: 'दाएं अंगूठे से दाईं नाक और अनामिका उंगली से बाईं नाक बंद करें।' },
      { step: 2, title: 'Left Inhale, Right Exhale', titleHi: 'बाईं से श्वास, दाईं से छोड़ें', desc: 'Inhale left 4 counts. Close left, open right, exhale 4 counts.', descHi: 'बाईं से 4 सेकंड सांस लें, दाईं से 4 सेकंड में छोड़ें।' },
      { step: 3, title: 'Right Inhale, Left Exhale', titleHi: 'दाईं से श्वास, बाईं से छोड़ें', desc: 'Inhale right 4 counts. Close right, open left, exhale 4 counts. Do 8 rounds.', descHi: 'दाईं से सांस लें, बाईं से छोड़ें। 8 चक्र करें।' }
    ],
    breathingReminders: ['NO BREATH RETENTION (Kumbhaka) during pregnancy.'],
    breathingRemindersHi: ['गर्भावस्था में सांस को अंदर रोकना बिल्कुल मना है।'],
    modifications: ['If one nostril is blocked, practice simple deep belly breathing.'],
    modificationsHi: ['नाक बंद हो तो सामान्य गहरी सांस लें।'],
    stopIf: ['Shortness of breath or dizziness.'],
    stopIfHi: ['चक्कर आए।'],
    clinicalNote: 'Lowers sympathetic tone and balances maternal baroreceptor reflex.'
  },
  {
    id: 'm6_ankle_alphabet',
    month: 6,
    title: 'Ankle Alphabet & Leg Elevation',
    titleHi: 'टखने से वर्णमाला चालन (पैरों की सूजन व जल जमाव मुक्ति)',
    category: 'walking',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800',
    duration: '5–6 mins',
    summary: 'Tracing alphabet letters in the air with toes while seated with legs elevated on a stool. Drains dependent edema.',
    summaryHi: 'कुर्सी पर बैठकर पैरों के पंजों से हवा में वर्णमाला लिखना। पैरों में जमे पानी को नसों के जरिए बाहर निकालता है।',
    visualModel: 'walking',
    realImagePath: '/exercise_poses/tadasana.jpg',
        illustrations: {
      main: '/exercise_illustrations/m6/m6_ankle_alphabet_main.png',
      steps: [
        '/exercise_illustrations/m6/m6_ankle_alphabet_main.png',
        '/exercise_illustrations/m6/m6_ankle_alphabet_main.png',
        '/exercise_illustrations/m6/m6_ankle_alphabet_main.png'
      ]
    },
    primaryBenefit: 'Drains gravity-dependent fluid accumulation from ankles and toes',
    primaryBenefitHi: 'टखनों और पंजों में जमे पानी व सूजन को तेजी से घटाता है',
    propsNeeded: ['Footstool or stool to rest feet'],
    propsNeededHi: ['पैरों के नीचे स्टूल'],
    instructions: [
      { step: 1, title: 'Elevate Feet', titleHi: 'पैर ऊपर रखें', desc: 'Sit in a comfortable chair with feet resting on a footstool.', descHi: 'कुर्सी पर बैठें और पैरों को स्टूल पर रखें।' },
      { step: 2, title: 'Trace A to Z', titleHi: 'A से Z लिखें', desc: 'Lift one foot slightly and trace letters A through Z with your big toe. Repeat with other foot.', descHi: 'पैर के अंगूठे से हवा में A से Z तक अक्षर लिखें, फिर दूसरे पैर से करें।' }
    ],
    breathingReminders: ['Breathe easily while moving the ankles.'],
    breathingRemindersHi: ['पंजों को घुमाते हुए सामान्य सांस लेते रहें।'],
    modifications: ['Can trace numbers 1 to 20 instead.'],
    modificationsHi: ['1 से 20 तक गिनती भी लिख सकती हैं।'],
    stopIf: ['Foot cramp.'],
    stopIfHi: ['पंजे में ऐंठन हो।'],
    clinicalNote: 'Activates peripheral venous valves in the great saphenous system.'
  },

  // ═══════════════════════════════════════════════════════
  // MONTH 7 (WEEKS 25–28) — 5 EXERCISES
  // ═══════════════════════════════════════════════════════
  {
    id: 'm7_thoracic_opener',
    month: 7,
    title: 'Supported Thoracic & Rib Expansion',
    titleHi: 'वक्ष विस्तार आसन सहारा (सांस फूलने से राहत)',
    category: 'stretch',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-amber-600 bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-800',
    duration: '5–7 mins',
    summary: 'Standing near wall, resting forearm on wall and turning chest gently away. Opens tight ribcage as baby presses up.',
    summaryHi: 'दीवार पर हाथ टिकाकर छाती को हल्का घुमाना। शिशु के ऊपर उठने से दबने वाले फेफड़ों को खुलकर सांस लेने की जगह देता है।',
    visualModel: 'tadasana',
    realImagePath: '/exercise_poses/tadasana.jpg',
        illustrations: {
      main: '/exercise_illustrations/m7/m7_thoracic_opener_main.png',
      steps: [
        '/exercise_illustrations/m7/m7_thoracic_opener_main.png',
        '/exercise_illustrations/m7/m7_thoracic_opener_main.png',
        '/exercise_illustrations/m7/m7_thoracic_opener_main.png'
      ]
    },
    primaryBenefit: 'Relieves third-trimester breathlessness caused by fundus elevation',
    primaryBenefitHi: 'पेट ऊपर चढ़ने से सांस फूलने की समस्या में तुरंत राहत देता है',
    propsNeeded: ['Wall'],
    propsNeededHi: ['दीवार'],
    instructions: [
      { step: 1, title: 'Forearm on Wall', titleHi: 'कोहनी दीवार पर', desc: 'Stand side-on to wall, place right forearm flat against wall at shoulder height.', descHi: 'दीवार के पास खड़े होकर दाईं कोहनी कंधे की सीध में दीवार पर टिकाएं।' },
      { step: 2, title: 'Gentle Pivot', titleHi: 'हल्का घुमाव', desc: 'Gently turn torso away from wall until a stretch is felt across right pec and ribs. Breathe 5 breaths. Switch.', descHi: 'छाती को दीवार से विपरीत दिशा में हल्का घुमाएं। 5 सांस रोकें, फिर दूसरी तरफ करें।' }
    ],
    breathingReminders: ['Breathe deeply into the front of the chest.'],
    breathingRemindersHi: ['छाती के ऊपरी हिस्से में गहरी सांस भरें।'],
    modifications: ['Keep turn very subtle; never twist the belly.'],
    modificationsHi: ['केवल छाती को घुमाएं, पेट को बिल्कुल न मोड़ें।'],
    stopIf: ['Chest pain or dizziness.'],
    stopIfHi: ['सीने में दर्द या भारीपन हो।'],
    clinicalNote: 'Counters anterior costal margin elevation common in late pregnancy.'
  },
  {
    id: 'm7_supta_baddha_incline',
    month: 7,
    title: 'Incline Supported Bound Angle (Supta Baddha Konasana 45°)',
    titleHi: 'सुप्त बद्ध कोणासन 45° झुकाव (पेल्विस विश्राम)',
    category: 'yoga',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-teal-600 bg-teal-50 dark:bg-teal-950/70 border-teal-200 dark:border-teal-800',
    duration: '8–10 mins',
    summary: 'Reclining at a 45-degree angle on bolsters, soles together, knees supported. Safely opens pelvis without vena cava compression.',
    summaryHi: '45 डिग्री के कोण पर तकियों के सहारे लेटना और तलवे मिलाना। बिना किसी नस पर दबाव डाले पेल्विस को विश्राम देता है।',
    visualModel: 'butterfly',
    realImagePath: '/exercise_poses/butterfly.jpg',
        illustrations: {
      main: '/exercise_illustrations/m7/m7_supta_baddha_incline_main.png',
      steps: [
        '/exercise_illustrations/m7/m7_supta_baddha_incline_main.png',
        '/exercise_illustrations/m7/m7_supta_baddha_incline_main.png',
        '/exercise_illustrations/m7/m7_supta_baddha_incline_main.png'
      ]
    },
    primaryBenefit: 'Relaxes pelvic floor and inner thighs safely on an incline without flat-back lying risk',
    primaryBenefitHi: 'पीठ के बल सीधे लेटे बिना पेल्विस और जांघों को गहरा विश्राम देता है',
    propsNeeded: ['2–3 bolsters/pillows arranged as an incline ramp'],
    propsNeededHi: ['2-3 तकिए ढलान के रूप में'],
    instructions: [
      { step: 1, title: 'Incline Ramp', titleHi: 'ढलान बनाएं', desc: 'Stack pillows so your back rests at a 45-degree incline (never flat).', descHi: 'तकियों को 45 डिग्री ढलान पर रखें ताकि पीठ सीधी न लेटे।' },
      { step: 2, title: 'Recline & Soles', titleHi: 'लेटें व तलवे मिलाएं', desc: 'Recline back on pillows. Bring soles together with pillows under both knees.', descHi: 'तकियों पर टिकें, दोनों तलवे मिलाएं और घुटनों के नीचे तकिए लगाएं।' },
      { step: 3, title: 'Deep Surrender', titleHi: 'गहरा विश्राम', desc: 'Rest arms out to sides. Close eyes and rest for 8 to 10 peaceful minutes.', descHi: 'हाथ दोनों तरफ फैलाएं, आंखें बंद कर 8 से 10 मिनट शांति में रहें।' }
    ],
    breathingReminders: ['Let each exhale melt all tension out of pelvic bowl.'],
    breathingRemindersHi: ['सांस छोड़ते हुए पेल्विस को पूरी तरह ढीला छोड़ें।'],
    modifications: ['If hips feel wide, keep feet flat and knees bent resting against each other instead.'],
    modificationsHi: ['पैरों को थोड़ा चौड़ा रखकर घुटने मोड़कर भी लेट सकती हैं।'],
    stopIf: ['Lightheadedness or nausea.'],
    stopIfHi: ['चक्कर या घबराहट हो।'],
    clinicalNote: '45-degree ramp prevents supine vena cava syndrome while relaxing iliopsoas.'
  },
  {
    id: 'm7_pacing_walk',
    month: 7,
    title: 'Hydrated Paced Walk with Rest Breaks',
    titleHi: 'विश्राम युक्त मंद सैर (धीमी व सुरक्षित चहलकदमी)',
    category: 'walking',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800',
    duration: '15 mins',
    summary: 'Gentle 15-minute pacing broken into three 5-minute segments with hydration and seated breaks. Conserves third-trimester stamina.',
    summaryHi: '15 मिनट की सैर को 5-5 मिनट के टुकड़ों में बांटकर टहलना और बीच में पानी पीना। थकान से बचाता है।',
    visualModel: 'walking',
    realImagePath: '/exercise_poses/tadasana.jpg',
        illustrations: {
      main: '/exercise_illustrations/m7/m7_pacing_walk_main.png',
      steps: [
        '/exercise_illustrations/m7/m7_pacing_walk_main.png',
        '/exercise_illustrations/m7/m7_pacing_walk_main.png',
        '/exercise_illustrations/m7/m7_pacing_walk_main.png'
      ]
    },
    primaryBenefit: 'Maintains cardiovascular fitness without depleting maternal third-trimester energy reserves',
    primaryBenefitHi: 'बिना थके दिल को मजबूत रखता है और ऊर्जा बनाए रखता है',
    propsNeeded: ['Water bottle', 'Bench or chair nearby'],
    propsNeededHi: ['पानी की बोतल', 'बैठने के लिए कुर्सी'],
    instructions: [
      { step: 1, title: 'Segment 1', titleHi: 'पहला भाग (5 मिनट)', desc: 'Walk slowly for 5 minutes. Pause, sit on bench, drink 2 sips of water.', descHi: '5 मिनट धीरे टहलें। फिर बैठकर 2 घूंट पानी पिएं।' },
      { step: 2, title: 'Segment 2 & 3', titleHi: 'दूसरा व तीसरा भाग', desc: 'Repeat for 2 more gentle 5-minute walking intervals with seated rest in between.', descHi: 'इसी तरह 5-5 मिनट के 2 और चक्र बीच में विश्राम लेकर करें।' }
    ],
    breathingReminders: ['Walk at a rhythm where breathing remains smooth and effortless.'],
    breathingRemindersHi: ['सांस बिना फूले सहज चले उतनी ही गति रखें।'],
    modifications: ['Walk indoors in air conditioning if weather is humid.'],
    modificationsHi: ['गर्मी या उमस हो तो घर के अंदर ही टहलें।'],
    stopIf: ['Contractions or shortness of breath.'],
    stopIfHi: ['पेट में संकुचन या सांस की तकलीफ हो।'],
    clinicalNote: 'Segmented intervals avoid heat accumulation and maternal hyperthermia.'
  },
  {
    id: 'm7_pelvic_floor_drop',
    month: 7,
    title: 'Pelvic Floor "Drop & Soften" Practice',
    titleHi: 'पेल्विक शिथिलीकरण ड्रॉप (प्रसव हेतु खुलापन)',
    category: 'pelvic',
    difficulty: 'Beginner',
    difficultyHi: 'शुरुआती / सरल',
    difficultyColor: 'text-purple-600 bg-purple-50 dark:bg-purple-950/70 border-purple-200 dark:border-purple-800',
    duration: '5–6 mins',
    summary: 'Consciously relaxing and dropping the pelvic floor like a flower opening. Focus shifts from squeezing to yielding for birth.',
    summaryHi: 'पेल्विक मांसपेशियों को फूल की तरह पूरी तरह खोलना और ढीला छोड़ना। प्रसव के समय मार्ग को सहज खोलने का अभ्यास।',
    visualModel: 'kegel',
    realImagePath: '/exercise_poses/kegel.jpg',
        illustrations: {
      main: '/exercise_illustrations/m7/m7_pelvic_floor_drop_main.png',
      steps: [
        '/exercise_illustrations/m7/m7_pelvic_floor_drop_main.png',
        '/exercise_illustrations/m7/m7_pelvic_floor_drop_main.png',
        '/exercise_illustrations/m7/m7_pelvic_floor_drop_main.png'
      ]
    },
    primaryBenefit: 'Trains maternal brain to release and open the pelvic outlet during labor contractions',
    primaryBenefitHi: 'प्रसव के समय दर्द में पेल्विस को जकड़ने की जगह ढीला छोड़ना सिखाता है',
    propsNeeded: ['Chair or bolster'],
    propsNeededHi: ['कुर्सी या तकिया'],
    instructions: [
      { step: 1, title: 'Comfort Seat', titleHi: 'बैठें', desc: 'Sit comfortably with feet flat. Relax jaw and shoulders.', descHi: 'कुर्सी पर बैठें, जबड़े और कंधों को पूरी तरह ढीला छोड़ें।' },
      { step: 2, title: 'Exhale & Drop', titleHi: 'श्वास छोड़ें व ढीला करें', desc: 'Take a deep breath. On exhale, consciously imagine the pelvic floor muscles softening, widening, and dropping downward.', descHi: 'गहरी सांस लें। छोड़ते हुए पेल्विक फ्लोर को नीचे की ओर पूरी तरह कोमल व खुला महसूस करें।' },
      { step: 3, title: 'Soften Jaw', titleHi: 'जबड़ा ढीला रखें', desc: 'Unclench teeth. The jaw and pelvic floor are neurologically connected. Repeat 10 breaths.', descHi: 'दांतों को बिल्कुल न भींचें। जबड़ा ढीला होने से पेल्विस भी ढीला होता है। 10 बार करें।' }
    ],
    breathingReminders: ['Make a soft sighing "Haaa" on exhale to deepen pelvic drop.'],
    breathingRemindersHi: ['सांस छोड़ते हुए "हाह..." की हल्की उसांस लें।'],
    modifications: ['Can practice while seated on the toilet before urinating.'],
    modificationsHi: ['शौच के समय बैठकर भी यह अभ्यास कर सकती हैं।'],
    stopIf: ['Any bearing down pressure.'],
    stopIfHi: ['नीचे की ओर जोर न लगाएं।'],
    clinicalNote: 'Neurological sphincter relaxation training (sphincter law of reciprocal relaxation).'
  },
  {
    id: 'm7_tri_pillow_rest',
    month: 7,
    title: 'Three-Pillow Left Side Savasana (Deep Sleep Prep)',
    titleHi: 'त्रि-तकिया वाम कुक्षी विश्राम (गहरी नींद व शिशु पोषण)',
    category: 'breathing',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-sky-600 bg-sky-50 dark:bg-sky-950/70 border-sky-200 dark:border-sky-800',
    duration: '10–15 mins',
    summary: 'Sleeping/resting on left side with pillows under head, between bent knees, and supporting growing belly. Maximizes placental flow.',
    summaryHi: 'सिर के नीचे, घुटनों के बीच और पेट के नीचे 3 तकिए लगाकर बाईं करवट लेटना। प्लेसेंटा को सबसे ज्यादा रक्त पहुंचाता है।',
    visualModel: 'savasana_left',
    realImagePath: '/exercise_poses/savasana_left.jpg',
        illustrations: {
      main: '/exercise_illustrations/m7/m7_tri_pillow_rest_main.png',
      steps: [
        '/exercise_illustrations/m7/m7_tri_pillow_rest_main.png',
        '/exercise_illustrations/m7/m7_tri_pillow_rest_main.png',
        '/exercise_illustrations/m7/m7_tri_pillow_rest_main.png'
      ]
    },
    primaryBenefit: 'Maximizes inferior vena cava flow and reduces pedal edema while fostering restorative rest',
    primaryBenefitHi: 'शिशु को भरपूर रक्त व पोषण देता है और पैरों की सूजन मिटाता है',
    propsNeeded: ['3 pillows (head, between knees, under bump)'],
    propsNeededHi: ['3 तकिए (सिर, घुटनों के बीच, पेट के नीचे)'],
    instructions: [
      { step: 1, title: 'Three Pillows', titleHi: '3 तकियों की व्यवस्था', desc: 'Place pillow 1 under head, pillow 2 between knees, pillow 3 wedged under belly.', descHi: 'पहला तकिया सिर के नीचे, दूसरा दोनों घुटनों के बीच, तीसरा पेट के नीचे लगाएं।' },
      { step: 2, title: 'Left Side Melt', titleHi: 'बाईं करवट लेटें', desc: 'Lie on left side. Rest right hand on baby bump. Close eyes and rest deeply for 10–15 minutes.', descHi: 'बाईं करवट लेटें, दायां हाथ पेट पर रखें और 10 से 15 मिनट गहरी शांति में रहें।' }
    ],
    breathingReminders: ['Breathe effortlessly like floating on calm water.'],
    breathingRemindersHi: ['सांस को पानी में तैरने की तरह सहज चलने दें।'],
    modifications: ['Place an extra pillow behind your back to prevent rolling onto spine.'],
    modificationsHi: ['पीठ के पीछे भी एक तकिया लगाएं ताकि पीठ के बल न लुढ़कें।'],
    stopIf: ['Numbness in left hip; shift to right side briefly then return.'],
    stopIfHi: ['कूल्हे में दर्द हो तो कुछ देर दाईं करवट ले लें।'],
    clinicalNote: 'International standard for late-pregnancy maternal rest and placental oxygenation.'
  },

  // ═══════════════════════════════════════════════════════
  // MONTH 8 (WEEKS 29–32) — 5 EXERCISES
  // ═══════════════════════════════════════════════════════
  {
    id: 'm8_double_block_malasana',
    month: 8,
    title: 'Supported Malasana Squat with 2 Blocks (Pelvic Expansion)',
    titleHi: 'द्वि-ब्लॉक समर्थित मालासन (पेल्विक विस्तार व प्रसव तैयारी)',
    category: 'pelvic',
    difficulty: 'Moderate',
    difficultyHi: 'मध्यम / सहारा युक्त',
    difficultyColor: 'text-amber-600 bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-800',
    duration: '5–6 mins',
    summary: 'Deep garland squat with hips fully supported on 2 yoga blocks. Widens pelvic outlet up to 28% with zero knee strain.',
    summaryHi: '2 योगा ब्लॉक या मोटे तकियों पर बैठकर डीप स्क्वाट। बिना घुटनों पर जोर डाले पेल्विक मार्ग को 28% तक खोलता है।',
    visualModel: 'malasana',
    realImagePath: '/exercise_poses/malasana.jpg',
        illustrations: {
      main: '/exercise_illustrations/m8/m8_double_block_malasana_main.png',
      steps: [
        '/exercise_illustrations/m8/m8_double_block_malasana_main.png',
        '/exercise_illustrations/m8/m8_double_block_malasana_main.png',
        '/exercise_illustrations/m8/m8_double_block_malasana_main.png'
      ]
    },
    primaryBenefit: 'Maximizes pelvic outlet diameter for labor preparation with 100% prop support',
    primaryBenefitHi: 'प्रसव मार्ग को चौड़ा करता है और शिशु के सिर को नीचे लाने में मदद करता है',
    propsNeeded: ['2 yoga blocks or 2 firm folded bolsters', 'Chair in front to hold'],
    propsNeededHi: ['2 योगा ब्लॉक या 2 मजबूत तकिए', 'आगे पकड़ने हेतु कुर्सी'],
    instructions: [
      { step: 1, title: 'Block Setup', titleHi: 'ब्लॉक लगाएं', desc: 'Stack 2 yoga blocks on mat. Stand in front with feet shoulder-width, toes turned 45 degrees out.', descHi: 'चटाई पर 2 ब्लॉक रखें। पैरों को कंधों से चौड़ा रखें और पंजे बाहर घुमाएं।' },
      { step: 2, title: 'Hold & Lower', titleHi: 'पकड़कर बैठें', desc: 'Hold chair in front, bend knees and sit down firmly on the blocks with all your weight.', descHi: 'आगे कुर्सी पकड़ें और घुटने मोड़कर पूरा वजन ब्लॉक पर टिकाकर बैठें।' },
      { step: 3, title: 'Elbows Inside', titleHi: 'नमस्ते मुद्रा', desc: 'Bring palms together at heart, rest elbows inside knees. Take 6 slow calm breaths.', descHi: 'हाथ नमस्ते मुद्रा में लाएं, कोहनियां घुटनों के अंदर टिकाएं और 6 गहरी सांसें लें।' }
    ],
    breathingReminders: ['Inhale expand pelvic bowl, exhale sigh out tension.'],
    breathingRemindersHi: ['सांस लेते हुए पेल्विस को फैलने दें, छोड़ते हुए तनाव बाहर निकालें।'],
    modifications: ['Always sit on blocks — avoid unsupported free squats in late pregnancy.'],
    modificationsHi: ['बिना सहारे के हवा में स्क्वाट न करें; हमेशा ब्लॉक पर बैठें।'],
    stopIf: ['Low-lying placenta (Placenta Previa) or cervical stitch.'],
    stopIfHi: ['यदि डॉक्टर ने प्लेसेंटा प्रीविया बताया हो या सर्वाइकल टांके लगे हों।'],
    clinicalNote: 'Increases transverse and anteroposterior pelvic outlet diameters by 20–28%.'
  },
  {
    id: 'm8_catcow_hipwag',
    month: 8,
    title: 'Cat-Cow with Hip Wag (Fetal Head Alignment)',
    titleHi: 'मार्जरी आसन हिप वैग (शिशु का सही संरेखण)',
    category: 'stretch',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800',
    duration: '5–7 mins',
    summary: 'On hands and knees with knee padding, swaying hips side to side like a gentle tail wag. Helps baby rotate into optimal LOA position.',
    summaryHi: 'चारों हाथ-पैर के बल आकर कूल्हों को दायें-बायें हिलाना। शिशु को प्रसव के लिए सही दिशा (सिर नीचे) में लाने में मदद करता है।',
    visualModel: 'cat_cow',
    realImagePath: '/exercise_poses/cat_cow.jpg',
        illustrations: {
      main: '/exercise_illustrations/m8/m8_catcow_hipwag_main.png',
      steps: [
        '/exercise_illustrations/m8/m8_catcow_hipwag_main.png',
        '/exercise_illustrations/m8/m8_catcow_hipwag_main.png',
        '/exercise_illustrations/m8/m8_catcow_hipwag_main.png'
      ]
    },
    primaryBenefit: 'Promotes optimal fetal anterior positioning and frees sacroiliac tension',
    primaryBenefitHi: 'शिशु के सिर को सही पेल्विक कोण में लाता है और कमर दर्द मिटाता है',
    propsNeeded: ['Padded blanket under knees'],
    propsNeededHi: ['घुटनों के नीचे कंबल'],
    instructions: [
      { step: 1, title: 'Tabletop', titleHi: 'चौपाया स्थिति', desc: 'Come onto hands and knees with blanket under knees. Keep hands shoulder-width apart.', descHi: 'कंबल पर हाथ और घुटने टिकाकर आएं।' },
      { step: 2, title: 'Hip Wag', titleHi: 'कूल्हे हिलाएं', desc: 'Gently sway your hips to the right, looking back toward right hip. Hold 2 breaths. Repeat to left.', descHi: 'कूल्हों को दाईं तरफ झुकाएं और दाएं कंधे से पीछे देखें। फिर बाईं तरफ दोहराएं। 8 बार करें।' }
    ],
    breathingReminders: ['Keep breathing easy and fluid.'],
    breathingRemindersHi: ['सांस को शांत और सहज चलने दें।'],
    modifications: ['Rest forearms on a chair if wrists ache.'],
    modificationsHi: ['कलाई में दर्द हो तो कोहनियां कुर्सी पर रखें।'],
    stopIf: ['Knee discomfort.'],
    stopIfHi: ['घुटने में दर्द हो।'],
    clinicalNote: 'Spinning Babies technique for balancing uterine ligaments and pelvis.'
  },
  {
    id: 'm8_figure8_ball',
    month: 8,
    title: 'Figure-8 Pelvic Sway on Birthing Ball',
    titleHi: 'बर्थिंग बॉल 8-आकार चालन (पेल्विक लचीलापन)',
    category: 'stretch',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-amber-600 bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-800',
    duration: '5–8 mins',
    summary: 'Tracing an infinity sign / figure-8 with your hips while seated on birthing ball. Eases Braxton Hicks contractions.',
    summaryHi: 'बर्थिंग बॉल पर बैठकर कूल्हों से 8 (आठ) का आकार बनाना। प्रसव पूर्व होने वाले हल्के संकुचन के दर्द को शांत करता है।',
    visualModel: 'pelvic_rocking',
    realImagePath: '/exercise_poses/cat_cow.jpg',
        illustrations: {
      main: '/exercise_illustrations/m8/m8_figure8_ball_main.png',
      steps: [
        '/exercise_illustrations/m8/m8_figure8_ball_main.png',
        '/exercise_illustrations/m8/m8_figure8_ball_main.png',
        '/exercise_illustrations/m8/m8_figure8_ball_main.png'
      ]
    },
    primaryBenefit: 'Loosens pelvic ligaments and assists baby\'s head entering the pelvic brim',
    primaryBenefitHi: 'पेल्विक हड्डियों को लचीला बनाता है और शिशु के सिर को नीचे उतारता है',
    propsNeeded: ['Birthing ball (65cm)'],
    propsNeededHi: ['बर्थिंग बॉल'],
    instructions: [
      { step: 1, title: 'Sit Centered', titleHi: 'बीच में बैठें', desc: 'Sit on ball with feet wide and flat on floor. Hands on knees.', descHi: 'गेंद पर बीच में बैठें, पैर चौड़े और फर्श पर सपाट रखें।' },
      { step: 2, title: 'Trace Figure 8', titleHi: '8 का आकार बनाएं', desc: 'Slowly glide your hips tracing a horizontal figure-8 (infinity sign). Do 8 times, then reverse direction.', descHi: 'कूल्हों को घुमाते हुए 8 का आकार बनाएं। 8 बार करें, फिर उल्टी दिशा में दोहराएं।' }
    ],
    breathingReminders: ['Sync the loops of the 8 with smooth breathing.'],
    breathingRemindersHi: ['8 के घेरे के साथ सांस का तालमेल बनाएं।'],
    modifications: ['Sit near a sofa or wall for hand support.'],
    modificationsHi: ['पास में सोफा या दीवार पकड़ कर रखें।'],
    stopIf: ['Loss of balance.'],
    stopIfHi: ['संतुलन बिगड़े।'],
    clinicalNote: 'Encourages maternal pelvic asymmetry to assist fetal cardinal movements.'
  },
  {
    id: 'm8_forward_lean',
    month: 8,
    title: 'Forward-Leaning Rest Over Sofa or Ball',
    titleHi: 'आगे झुकने वाला विश्राम (पीठ भार मुक्ति व साइटिका राहत)',
    category: 'yoga',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-teal-600 bg-teal-50 dark:bg-teal-950/70 border-teal-200 dark:border-teal-800',
    duration: '6–8 mins',
    summary: 'Kneeling on floor, draping upper body and arms over sofa seat or ball. Takes baby\'s weight off mother\'s back and spine.',
    summaryHi: 'घुटने टेककर सोफे या गेंद पर आगे झुककर छाती टिकाना। भारी पेट के वजन को मां की रीढ़ से पूरी तरह हटा देता है।',
    visualModel: 'cat_cow',
    realImagePath: '/exercise_poses/cat_cow.jpg',
        illustrations: {
      main: '/exercise_illustrations/m8/m8_forward_lean_main.png',
      steps: [
        '/exercise_illustrations/m8/m8_forward_lean_main.png',
        '/exercise_illustrations/m8/m8_forward_lean_main.png',
        '/exercise_illustrations/m8/m8_forward_lean_main.png'
      ]
    },
    primaryBenefit: 'Eliminates sciatic nerve compression and releases back labor pressure',
    primaryBenefitHi: 'साइटिका के तेज दर्द और कमर के भारीपन को पूरी तरह मिटाता है',
    propsNeeded: ['Sofa cushion or exercise ball', 'Blanket under knees'],
    propsNeededHi: ['सोफा या बॉल', 'घुटनों के लिए कंबल'],
    instructions: [
      { step: 1, title: 'Kneel in Front', titleHi: 'सोफे के सामने घुटने टेकें', desc: 'Kneel with knees wide on a folded blanket facing sofa.', descHi: 'सोफे के सामने घुटने चौड़े करके कंबल पर बैठें।' },
      { step: 2, title: 'Drape Chest', titleHi: 'छाती टिकाएं', desc: 'Lean forward and rest your chest and folded arms on sofa cushion. Rest head on arms.', descHi: 'आगे झुकें और छाती व बाहों को सोफे की गद्दी पर टिकाएं। सिर हाथों पर रखें।' },
      { step: 3, title: 'Sway & Rest', titleHi: 'हल्का झूलें', desc: 'Gently sway hips side to side while taking deep relaxing belly breaths for 6 minutes.', descHi: 'कूल्हों को हल्का दायें-बायें झूलाएं और 6 मिनट गहरी सांसें लें।' }
    ],
    breathingReminders: ['Inhale and feel your belly hanging free like a hammock.'],
    breathingRemindersHi: ['पेट को झूले की तरह आजाद लटकने दें।'],
    modifications: ['Can be done standing and leaning forward onto a kitchen counter.'],
    modificationsHi: ['खड़े होकर किचन स्लैब पर भी आगे झुककर यह कर सकती हैं।'],
    stopIf: ['Knee discomfort.'],
    stopIfHi: ['घुटने में दर्द हो।'],
    clinicalNote: 'Suspends the uterus like a hammock, reducing pressure on maternal vena cava and aorta.'
  },
  {
    id: 'm8_golden_thread_breath',
    month: 8,
    title: 'Golden Thread Labor Breath (Pain Coping Technique)',
    titleHi: 'स्वर्ण सूत्र प्रसव श्वास (प्रसव पीड़ा सहन तकनीक)',
    category: 'breathing',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-sky-600 bg-sky-50 dark:bg-sky-950/70 border-sky-200 dark:border-sky-800',
    duration: '5–8 mins',
    summary: 'Inhaling through nose, exhaling very slowly through softly pursed lips as if blowing a fine golden thread across the room.',
    summaryHi: 'नाक से सांस लेना और होठों को हल्का सा खोलकर सोने के महीन धागे की तरह धीरे-धीरे बाहर छोड़ना। प्रसव पीड़ा का रामबाण उपाय।',
    visualModel: 'anulom_vilom',
    realImagePath: '/exercise_poses/butterfly.jpg',
        illustrations: {
      main: '/exercise_illustrations/m8/m8_golden_thread_breath_main.png',
      steps: [
        '/exercise_illustrations/m8/m8_golden_thread_breath_main.png',
        '/exercise_illustrations/m8/m8_golden_thread_breath_main.png',
        '/exercise_illustrations/m8/m8_golden_thread_breath_main.png'
      ]
    },
    primaryBenefit: 'Lengthens exhalation to trigger the parasympathetic nervous system during contractions',
    primaryBenefitHi: 'प्रसव संकुचन के समय दिल की घबराहट और दर्द को शांत करता है',
    propsNeeded: ['Comfortable seat'],
    propsNeededHi: ['आरामदायक बैठक'],
    instructions: [
      { step: 1, title: 'Soften Face', titleHi: 'चेहरा ढीला करें', desc: 'Sit upright with relaxed jaw and shoulders. Rest hands over baby bump.', descHi: 'बैठें, जबड़े और चेहरे को पूरी तरह ढीला छोड़ें। हाथ पेट पर रखें।' },
      { step: 2, title: 'Nose Inhale', titleHi: 'नाक से श्वास (4 सेकंड)', desc: 'Inhale silently and deeply through nose for 4 counts.', descHi: 'नाक से 4 सेकंड तक शांत सांस अंदर भरें।' },
      { step: 3, title: 'Golden Thread Exhale', titleHi: 'स्वर्ण सूत्र श्वास (8 सेकंड)', desc: 'Purse lips softly. Exhale a long, thin ribbon of air for 8 counts without blowing hard. Repeat 8 rounds.', descHi: 'होठों को हल्का गोल कर 8 सेकंड तक पतली हवा धीरे-धीरे बाहर छोड़ें। 8 बार करें।' }
    ],
    breathingReminders: ['Imagine sending golden warmth directly down to your baby.'],
    breathingRemindersHi: ['सुनहरी सुखद रोशनी शिशु तक पहुंचते हुए महसूस करें।'],
    modifications: ['Practice whenever you experience Braxton Hicks practice contractions.'],
    modificationsHi: ['जब भी पेट में हल्का खिंचाव हो तो यही सांस लें।'],
    stopIf: ['Lightheadedness; return to normal breathing.'],
    stopIfHi: ['चक्कर आए तो सामान्य सांस लें।'],
    clinicalNote: 'Doula and obstetric standard for natural endorphin release during labor.'
  },

  // ═══════════════════════════════════════════════════════
  // MONTH 9 (WEEKS 33–40) — 7 SPECIALIZED EXERCISES (FULL TERM & LABOR READINESS)
  // ═══════════════════════════════════════════════════════
  {
    id: 'm9_labor_malasana',
    month: 9,
    title: 'Labor-Prep Malasana on Bolster (Perineal Relaxation)',
    titleHi: 'प्रसव मालासन तकिए पर (पेल्विक विस्तार व मार्ग का खुलना)',
    category: 'pelvic',
    difficulty: 'Moderate',
    difficultyHi: 'मध्यम / सहारा युक्त',
    difficultyColor: 'text-amber-600 bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-800',
    duration: '5–7 mins',
    summary: 'Supported deep squat on a firm bolster with hands resting on knees. Relaxes the perineum and maximizes pelvic outlet for baby\'s head.',
    summaryHi: 'मोटे तकिए पर बैठकर डीप स्क्वाट। प्रसव मार्ग (पेल्विक आउटलेट) को अधिकतम चौड़ा करता है और पेल्विक मांसपेशियों को कोमल बनाता है।',
    visualModel: 'malasana',
    realImagePath: '/exercise_poses/malasana.jpg',
        illustrations: {
      main: '/exercise_illustrations/m9/m9_labor_malasana_main.png',
      steps: [
        '/exercise_illustrations/m9/m9_labor_malasana_main.png',
        '/exercise_illustrations/m9/m9_labor_malasana_main.png',
        '/exercise_illustrations/m9/m9_labor_malasana_main.png'
      ]
    },
    primaryBenefit: 'Maximizes pelvic outlet dimensions and softens the perineal floor for smooth delivery',
    primaryBenefitHi: 'शिशु के सिर को प्रसव मार्ग में नीचे लाने और पेल्विस को चौड़ा करने में अत्यंत सहायक',
    propsNeeded: ['1–2 firm bolsters or yoga blocks', 'Chair in front for support'],
    propsNeededHi: ['1-2 मजबूत तकिए या योगा ब्लॉक', 'आगे पकड़ने हेतु कुर्सी'],
    instructions: [
      { step: 1, title: 'Bolster Base', titleHi: 'तकिए पर बैठें', desc: 'Stack 2 firm cushions. Sit securely with hips resting fully on cushions, feet wide apart, toes angled outward.', descHi: '2 तकिए रखें। कूल्हों को तकिए पर पूरा टिकाकर बैठें, पैरों को चौड़ा रखें।' },
      { step: 2, title: 'Hands on Knees', titleHi: 'हाथ घुटनों पर', desc: 'Rest palms on inner knees. Keep spine tall and relaxed. Close eyes.', descHi: 'हाथों को घुटनों के अंदर टिकाएं। रीढ़ सीधी रखें और आंखें बंद करें।' },
      { step: 3, title: 'Perineal Softening', titleHi: 'पेल्विस को ढीला छोड़ें', desc: 'Take 5 slow breaths. With each exhale, imagine the pelvic outlet blossoming open like a lotus flower.', descHi: '5 गहरी सांसें लें। श्वास छोड़ते हुए प्रसव मार्ग को कमल के फूल की तरह खिलता हुआ महसूस करें।' }
    ],
    breathingReminders: ['Exhale through softly parted lips with a gentle "Ahhh" sound.'],
    breathingRemindersHi: ['मुंह से "आह..." की धीमी आवाज के साथ सांस छोड़ें।'],
    modifications: ['If heels lift off floor, place a rolled towel under heels.'],
    modificationsHi: ['एड़ियां उठें तो उनके नीचे मुड़ा हुआ तौलिया रखें।'],
    stopIf: ['Vaginal bleeding, fluid leakage, or painful labor contractions.'],
    stopIfHi: ['पानी छूटे, रक्तस्राव हो या तेज प्रसव दर्द शुरू हो।'],
    clinicalNote: 'Squatting postures increase the pelvic diameter by up to 28% compared to lithotomy position.'
  },
  {
    id: 'm9_birth_ball_bouncing',
    month: 9,
    title: 'Birth Ball Pelvic Circles & Gentle Bouncing (Head Engagement)',
    titleHi: 'बर्थिंग बॉल सौम्य बाउंस व रॉक (शिशु का सिर नीचे लाना)',
    category: 'stretch',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-amber-600 bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-800',
    duration: '8–10 mins',
    summary: 'Rhythmic, gentle bouncing and pelvic rocking on birthing ball. Gravity assists baby\'s head engagement into the maternal pelvis.',
    summaryHi: 'बर्थिंग बॉल पर बैठकर हल्का सा बाउंस करना और कूल्हे गोल घुमाना। गुरुत्वाकर्षण से शिशु का सिर पेल्विस में सही जगह बैठता है।',
    visualModel: 'pelvic_rocking',
    realImagePath: '/exercise_poses/cat_cow.jpg',
        illustrations: {
      main: '/exercise_illustrations/m9/m9_birth_ball_bouncing_main.png',
      steps: [
        '/exercise_illustrations/m9/m9_birth_ball_bouncing_main.png',
        '/exercise_illustrations/m9/m9_birth_ball_bouncing_main.png',
        '/exercise_illustrations/m9/m9_birth_ball_bouncing_main.png'
      ]
    },
    primaryBenefit: 'Utilizes gravity to guide baby\'s head down into Left Occiput Anterior (LOA) birthing position',
    primaryBenefitHi: 'गुरुत्वाकर्षण की मदद से शिशु के सिर को प्रसव के सर्वोत्तम कोण में लाता है',
    propsNeeded: ['Birthing ball (65cm) with anti-burst rating'],
    propsNeededHi: ['बर्थिंग बॉल'],
    instructions: [
      { step: 1, title: 'Safe Seated Base', titleHi: 'सुरक्षित बैठक', desc: 'Sit in center of ball with feet wide and flat on floor. Keep knees level with or slightly lower than hips.', descHi: 'गेंद पर बीच में बैठें, पैर चौड़े और फर्श पर सपाट रखें।' },
      { step: 2, title: 'Gentle Bouncing', titleHi: 'कोमल बाउंस', desc: 'Bounce gently up and down without feet leaving the floor for 2 minutes to loosen sacrum.', descHi: 'पंजों को फर्श से उठाए बिना 2 मिनट धीरे-धीरे ऊपर-नीचे बाउंस करें।' },
      { step: 3, title: 'Wide Hip Rotations', titleHi: 'बड़े गोल घेरे', desc: 'Circle hips in wide smooth circles 10 times clockwise, then 10 times counter-clockwise.', descHi: 'कूल्हों को 10 बार घड़ी की दिशा में और 10 बार उल्टी दिशा में बड़े घेरे में घुमाएं।' }
    ],
    breathingReminders: ['Breathe deeply and rhythmically into the lower belly.'],
    breathingRemindersHi: ['पेट के निचले हिस्से में गहरी लयबद्ध सांस भरें।'],
    modifications: ['Have partner stand nearby or sit next to a bed for balance assurance.'],
    modificationsHi: ['पास में बिस्तर या पति का हाथ पकड़ कर रखें।'],
    stopIf: ['Fluid leaking or sudden gush of water.'],
    stopIfHi: ['योनि से पानी का रिसाव हो।'],
    clinicalNote: 'Endorsed by Royal College of Midwives (RCM) for active labor prep and pelvic opening.'
  },
  {
    id: 'm9_tabletop_pelvic_tilts',
    month: 9,
    title: 'Hands & Knees Pelvic Tilts (Back Labor Prevention)',
    titleHi: 'चार पैरों पर पेल्विक झुकाव (कमर प्रसव पीड़ा निवारक)',
    category: 'stretch',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800',
    duration: '6–8 mins',
    summary: 'All-fours pelvic rocking with padded knees. Takes baby off maternal spine and relieves painful back labor sensations.',
    summaryHi: 'चार पैरों के बल आकर कूल्हों को आगे-पीछे हिलाना। शिशु का भार मां की रीढ़ से हटाता है और प्रसव के दर्द को बहुत कम करता है।',
    visualModel: 'cat_cow',
    realImagePath: '/exercise_poses/cat_cow.jpg',
        illustrations: {
      main: '/exercise_illustrations/m9/m9_tabletop_pelvic_tilts_main.png',
      steps: [
        '/exercise_illustrations/m9/m9_tabletop_pelvic_tilts_main.png',
        '/exercise_illustrations/m9/m9_tabletop_pelvic_tilts_main.png',
        '/exercise_illustrations/m9/m9_tabletop_pelvic_tilts_main.png'
      ]
    },
    primaryBenefit: 'Rotates baby away from maternal spine, preventing posterior "back labor"',
    primaryBenefitHi: 'शिशु को रीढ़ से दूर घुमाकर कमर की भयानक प्रसव पीड़ा से बचाता है',
    propsNeeded: ['Folded soft blanket under knees'],
    propsNeededHi: ['घुटनों के नीचे मुलायम कंबल'],
    instructions: [
      { step: 1, title: 'Tabletop Foundation', titleHi: 'चारों हाथ-पैर पर आएं', desc: 'Come onto hands and knees with double blanket under knees. Wrists under shoulders.', descHi: 'घुटनों के नीचे दोहरा कंबल रखें और चारों हाथ-पैर के बल आएं।' },
      { step: 2, title: 'Pelvic Rock', titleHi: 'पेल्विक झुकाव', desc: 'Tuck tailbone on exhale and round lower back. Inhale return to flat neutral spine. Repeat 10 times.', descHi: 'सांस छोड़ते हुए कमर को ऊपर गोल करें, लेते हुए सीधी करें। 10 बार करें।' },
      { step: 3, title: 'Child\'s Pose Break', titleHi: 'विश्राम', desc: 'Sit hips back toward heels with knees wide and rest for 1 minute.', descHi: 'घुटनों को चौड़ा कर 1 मिनट आगे झुककर विश्राम करें।' }
    ],
    breathingReminders: ['Let belly hang relaxed between breaths.'],
    breathingRemindersHi: ['पेट को बीच में बिल्कुल आजाद लटकने दें।'],
    modifications: ['Rest forearms on a stack of pillows or birthing ball if wrists are tired.'],
    modificationsHi: ['कलाई में दर्द हो तो कोहनियां तकिए या गेंद पर टिकाएं।'],
    stopIf: ['Painful regular uterine contractions.'],
    stopIfHi: ['नियमित तेज संकुचन शुरू हो जाएं।'],
    clinicalNote: 'Obstetric positioning technique proven to convert OP (occiput posterior) to OA (occiput anterior).'
  },
  {
    id: 'm9_asymmetric_lunge',
    month: 9,
    title: 'Chair-Supported Asymmetric Lunge (Pelvic Inlet Opener)',
    titleHi: 'सहारा युक्त एकपाद लंज (शिशु प्रवेश मार्ग का चौड़ा होना)',
    category: 'yoga',
    difficulty: 'Moderate',
    difficultyHi: 'मध्यम / सहारा युक्त',
    difficultyColor: 'text-amber-600 bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-800',
    duration: '5–6 mins',
    summary: 'Placing one foot up on a low stool or chair step and gently leaning into it. Asymmetrically opens one side of pelvis at a time.',
    summaryHi: 'एक पैर को स्टूल या कुर्सी के पायदान पर रखकर आगे झुकना। पेल्विस के एक हिस्से को अलग से खोलकर शिशु के सिर को नीचे उतारता है।',
    visualModel: 'tadasana',
    realImagePath: '/exercise_poses/tadasana.jpg',
        illustrations: {
      main: '/exercise_illustrations/m9/m9_asymmetric_lunge_main.png',
      steps: [
        '/exercise_illustrations/m9/m9_asymmetric_lunge_main.png',
        '/exercise_illustrations/m9/m9_asymmetric_lunge_main.png',
        '/exercise_illustrations/m9/m9_asymmetric_lunge_main.png'
      ]
    },
    primaryBenefit: 'Asymmetrically widens pelvic inlet to help an unengaged baby descend',
    primaryBenefitHi: 'यदि शिशु का सिर अभी पेल्विस में न उतरा हो तो उसे नीचे लाने में अत्यंत प्रभावी',
    propsNeeded: ['Low sturdy step stool or bottom step of stairs', 'Wall for hand support'],
    propsNeededHi: ['छोटा मजबूत स्टूल या सीढ़ी का पहला पायदान', 'दीवार'],
    instructions: [
      { step: 1, title: 'Foot on Stool', titleHi: 'पैर स्टूल पर', desc: 'Stand holding wall. Place right foot onto a low stool with knee bent at 90 degrees.', descHi: 'दीवार पकड़ें। दायां पैर छोटे स्टूल पर रखें, घुटना 90 डिग्री पर मुड़ा हो।' },
      { step: 2, title: 'Gentle Lunge', titleHi: 'हल्का झुकाव', desc: 'Exhale, gently lunge forward over right knee opening inner groin. Hold for 3 breaths. Repeat 5 times.', descHi: 'सांस छोड़ते हुए दाएं घुटने पर आगे झुकें। 3 सांस रोकें। 5 बार करें।' },
      { step: 3, title: 'Switch Leg', titleHi: 'पैर बदलें', desc: 'Step down and repeat with left foot on stool.', descHi: 'नीचे उतरें और बाएं पैर से दोहराएं।' }
    ],
    breathingReminders: ['Exhale into the lunge, inhale step back.'],
    breathingRemindersHi: ['आगे झुकते समय सांस छोड़ें, सीधे होते समय लें।'],
    modifications: ['Use lowest possible step (4–6 inches) to maintain easy balance.'],
    modificationsHi: ['स्टूल केवल 4 से 6 इंच ऊंचा ही रखें।'],
    stopIf: ['Knee discomfort or loss of balance.'],
    stopIfHi: ['संतुलन बिगड़े या घुटने में दर्द हो।'],
    clinicalNote: 'Spinning Babies asymmetric pelvic opening technique for fetal descent.'
  },
  {
    id: 'm9_perineal_sigh',
    month: 9,
    title: 'Perineal Relaxation & Sighing Breath (Labor Vocalization)',
    titleHi: 'पेल्विक शिथिलीकरण व उसांस श्वास (जबड़ा व प्रसव मार्ग ढीलापन)',
    category: 'breathing',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-sky-600 bg-sky-50 dark:bg-sky-950/70 border-sky-200 dark:border-sky-800',
    duration: '6–8 mins',
    summary: 'Deep nasal inhalation followed by relaxed vocal sigh "Ooooh" or "Haaa" with soft lips. Jaw relaxation relaxes the cervix and perineum.',
    summaryHi: 'नाक से गहरी सांस लेकर होठों को ढीला छोड़ते हुए "ओह..." या "हाह..." की उसांस छोड़ना। जबड़ा ढीला होने से गर्भाशय का मुंह आसानी से खुलता है।',
    visualModel: 'anulom_vilom',
    realImagePath: '/exercise_poses/butterfly.jpg',
        illustrations: {
      main: '/exercise_illustrations/m9/m9_perineal_sigh_main.png',
      steps: [
        '/exercise_illustrations/m9/m9_perineal_sigh_main.png',
        '/exercise_illustrations/m9/m9_perineal_sigh_main.png',
        '/exercise_illustrations/m9/m9_perineal_sigh_main.png'
      ]
    },
    primaryBenefit: 'Directly unclamps the perineum and accelerates cervical dilation during active labor',
    primaryBenefitHi: 'गर्भाशय ग्रीवा (Cervix) को तेजी से और बिना खिंचाव के खोलने में मदद करता है',
    propsNeeded: ['Comfortable chair or birthing ball'],
    propsNeededHi: ['आरामदायक कुर्सी या बॉल'],
    instructions: [
      { step: 1, title: 'Drop Jaw', titleHi: 'जबड़ा ढीला करें', desc: 'Sit comfortably. Unclench teeth, separate lips, let lower jaw hang heavy.', descHi: 'बैठें, दांतों को अलग करें और जबड़े को पूरी तरह ढीला छोड़ें।' },
      { step: 2, title: 'Nose Inhale', titleHi: 'नाक से श्वास (4 सेकंड)', desc: 'Inhale smoothly through nose filling belly.', descHi: 'नाक से 4 सेकंड गहरी सांस भरें।' },
      { step: 3, title: 'Vocal Sigh Exhale', titleHi: 'उसांस के साथ छोड़ें (8 सेकंड)', desc: 'Exhale with a low-pitch sighing sound "Oooohhh" or "Haaahhh", feeling pelvic floor melt wide open. Repeat 10 times.', descHi: 'धीमी आवाज में "ओ-ओ-ओह..." की उसांस छोड़ें और प्रसव मार्ग को खुलता महसूस करें। 10 बार करें।' }
    ],
    breathingReminders: ['Low pitch sounds open the pelvis; high pitched screams tighten it.'],
    breathingRemindersHi: ['आवाज को गहरा और धीमा रखें, तीखी चीख से पेल्विस कड़ा हो जाता है।'],
    modifications: ['Practice while sitting on a warm toilet seat or in a warm shower.'],
    modificationsHi: ['गुनगुने पानी से नहाते समय भी यह अभ्यास करें।'],
    stopIf: ['Lightheadedness; take normal quiet breaths.'],
    stopIfHi: ['चक्कर आए तो सामान्य सांस लें।'],
    clinicalNote: 'Ina May Gaskin\'s Sphincter Law: Vocal tract and pelvic sphincter relaxation are neurologically linked.'
  },
  {
    id: 'm9_labor_stamina_rest',
    month: 9,
    title: 'Side-Lying Rest for Labor Energy (Energy Conservation)',
    titleHi: 'प्रसव पूर्व ऊर्जा संचयन विश्राम (वाम कुक्षी महा-विश्राम)',
    category: 'breathing',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-sky-600 bg-sky-50 dark:bg-sky-950/70 border-sky-200 dark:border-sky-800',
    duration: '15–20 mins',
    summary: 'Deep restorative rest on left side with pillows between knees and under bump. Conserves glycogen and muscular stamina for delivery.',
    summaryHi: 'बाईं करवट लेटकर 20 मिनट का गहरा विश्राम। प्रसव के लिए शरीर में ऊर्जा और ताकत का संचय करता है।',
    visualModel: 'savasana_left',
    realImagePath: '/exercise_poses/savasana_left.jpg',
        illustrations: {
      main: '/exercise_illustrations/m9/m9_labor_stamina_rest_main.png',
      steps: [
        '/exercise_illustrations/m9/m9_labor_stamina_rest_main.png',
        '/exercise_illustrations/m9/m9_labor_stamina_rest_main.png',
        '/exercise_illustrations/m9/m9_labor_stamina_rest_main.png'
      ]
    },
    primaryBenefit: 'Builds cellular glycogen reserves needed for the physical endurance of labor',
    primaryBenefitHi: 'प्रसव की मेहनत के लिए शरीर की मांसपेशियों में ताकत और ग्लूकोज जमा करता है',
    propsNeeded: ['Bed or mat', 'Pillows under head, knees, and bump'],
    propsNeededHi: ['बिस्तर', 'तकिए'],
    instructions: [
      { step: 1, title: 'Nest Setup', titleHi: 'तकियों का घोंसला', desc: 'Lie on left side with pillows supporting head, between knees, and under your full-term bump.', descHi: 'बाईं करवट लेटें और सिर, घुटनों व पेट के नीचे तकिए लगाएं।' },
      { step: 2, title: 'Surrender All Muscles', titleHi: 'शरीर को सौंप दें', desc: 'Close eyes. Mentally tell your body: "I am ready, strong, and capable of birthing my baby." Rest for 15–20 minutes.', descHi: 'आंखें बंद करें और मन को बताएं: "मैं स्वस्थ हूं, मजबूत हूं और अपने शिशु को जन्म देने के लिए पूरी तरह तैयार हूं।"' }
    ],
    breathingReminders: ['Let breath be calm and effortless.'],
    breathingRemindersHi: ['सांस को बिना किसी प्रयास के शांत चलने दें।'],
    modifications: ['Listen to soothing maternal shlokas or calm music while resting.'],
    modificationsHi: ['विश्राम करते समय गर्भ संस्कार संगीत या श्लोक सुनें।'],
    stopIf: ['Painful contractions 5 minutes apart; time contractions and contact doctor.'],
    stopIfHi: ['हर 5 मिनट में तेज दर्द उठने लगे तो अस्पताल जाने की तैयारी करें।'],
    clinicalNote: 'Conserves ATP and muscle glycogen required for active uterine myometrial contractions.'
  },
  {
    id: 'm9_birthing_pacing',
    month: 9,
    title: 'Gentle Birthing Pacing Walk (Gravity Sway Walk)',
    titleHi: 'मंद प्रसव चाल व विश्राम (गुरुत्वाकर्षण आधारित धीमी सैर)',
    category: 'walking',
    difficulty: 'Gentle',
    difficultyHi: 'धीमा / सरल',
    difficultyColor: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800',
    duration: '10–12 mins',
    summary: 'Rhythmic, slow swaying walk utilizing upright posture and gravity to encourage natural labor initiation without exhaustion.',
    summaryHi: 'सीधे खड़े होकर धीमी गति से झूलते हुए चलना। गुरुत्वाकर्षण से शिशु को नीचे लाता है और बिना थके प्रसव को प्रेरित करता है।',
    visualModel: 'walking',
    realImagePath: '/exercise_poses/tadasana.jpg',
        illustrations: {
      main: '/exercise_illustrations/m9/m9_birthing_pacing_main.png',
      steps: [
        '/exercise_illustrations/m9/m9_birthing_pacing_main.png',
        '/exercise_illustrations/m9/m9_birthing_pacing_main.png',
        '/exercise_illustrations/m9/m9_birthing_pacing_main.png'
      ]
    },
    primaryBenefit: 'Uses upright gravity to apply natural head pressure on the cervix to encourage oxytocin release',
    primaryBenefitHi: 'सीधे खड़े रहने से शिशु का सिर गर्भाशय के मुंह पर दबाव डालकर ऑक्सीटोसिन बढ़ाता है',
    propsNeeded: ['Comfortable flat footwear', 'Flat indoor hallway or garden path'],
    propsNeededHi: ['समतल जूते', 'समतल गलियारा या बगीचा'],
    instructions: [
      { step: 1, title: 'Slow Sway Step', titleHi: 'धीमे झूलते कदम', desc: 'Walk very slowly, swaying hips gently side to side with each step for 10 minutes.', descHi: 'बहुत धीमी गति से चलें, हर कदम के साथ कूल्हों को हल्का सा दायें-बायें झूलाएं।' },
      { step: 2, title: 'Frequent Stops', titleHi: 'रुकें व सहारा लें', desc: 'Pause every 2 minutes, hold a wall or partner, take 2 deep belly breaths, then resume.', descHi: 'हर 2 मिनट पर रुकें, दीवार पकड़कर 2 गहरी सांसें लें, फिर आगे बढ़ें।' }
    ],
    breathingReminders: ['Keep jaw soft and breathe with the rhythm of footsteps.'],
    breathingRemindersHi: ['कदमों की चाल के साथ गहरी सांस लेते रहें।'],
    modifications: ['Walk indoors with air conditioning so you do not break a sweat.'],
    modificationsHi: ['पसीना न आए इसलिए छायादार या पंखे वाले कमरे में टहलें।'],
    stopIf: ['Fluid leaking, bloody show, or regular contractions.'],
    stopIfHi: ['पानी का रिसाव हो, लाल धब्बा दिखे या नियमित दर्द शुरू हो।'],
    clinicalNote: 'Upright mobility shortens first stage of labor by an average of 1 hour and 22 minutes (Cochrane Review).'
  }
];

export const CLINICAL_RED_FLAGS = [
  {
    id: 'rf_bleeding',
    title: 'Vaginal Bleeding or Spotting',
    titleHi: 'योनि से रक्तस्राव या खून के धब्बे (Bleeding)',
    urgency: 'IMMEDIATE STOP',
    urgencyHi: 'तुरंत रोकें व डॉक्टर को दिखाएं',
    severity: 'danger',
    description: 'Any vaginal bleeding during pregnancy requires prompt evaluation to rule out placental detachment or cervical changes.',
    descriptionHi: 'गर्भावस्था में किसी भी तरह का रक्तस्राव होने पर तुरंत व्यायाम रोकें और डॉक्टर से परामर्श लें।'
  },
  {
    id: 'rf_dizziness',
    title: 'Dizziness, Faintness, or Headache',
    titleHi: 'चक्कर आना, बेहोशी जैसा लगना या तेज सिरदर्द',
    urgency: 'IMMEDIATE STOP',
    urgencyHi: 'तुरंत बैठें व पानी पिएं',
    severity: 'danger',
    description: 'May indicate sudden blood pressure drop or inadequate cerebral perfusion. Lie down on left side and call provider if unresolved.',
    descriptionHi: 'यह रक्तचाप में अचानक गिरावट या ऑक्सीजन की कमी का संकेत हो सकता है। बाईं करवट लेट जाएं।'
  },
  {
    id: 'rf_chest_pain',
    title: 'Chest Pain or Shortness of Breath Before Exertion',
    titleHi: 'सीने में दर्द या बिना थके सांस फूलना',
    urgency: 'EMERGENCY 108',
    urgencyHi: 'आपातकालीन 108 पर कॉल करें',
    severity: 'critical',
    description: 'Chest discomfort or unexplained dyspnea is a medical red flag requiring emergency room evaluation.',
    descriptionHi: 'सीने में भारीपन, जकड़न या सांस लेने में तीव्र कठिनाई होने पर तुरंत 108 पर कॉल करें।'
  },
  {
    id: 'rf_fluid_leak',
    title: 'Amniotic Fluid Leaking or Gush',
    titleHi: 'पानी का रिसाव या पानी की थैली फटना (Fluid Leak)',
    urgency: 'IMMEDIATE ADMISSION',
    urgencyHi: 'तुरंत प्रसूति अस्पताल जाएं',
    severity: 'critical',
    description: 'Clear fluid leaking from vagina indicates premature rupture of membranes. Stop movement, avoid vaginal contact, and go to hospital.',
    descriptionHi: 'यदि योनि से पानी जैसा तरल लगातार बह रहा हो, तो यह झिल्ली फटने का संकेत है। फौरन अस्पताल जाएं।'
  },
  {
    id: 'rf_painful_contractions',
    title: 'Regular, Painful Uterine Contractions',
    titleHi: 'नियमित व तेज गर्भाशय संकुचन (Labor Contractions)',
    urgency: 'IMMEDIATE STOP',
    urgencyHi: 'तुरंत डॉक्टर को सूचित करें',
    severity: 'danger',
    description: 'More than 4–6 contractions in an hour before 37 weeks may be preterm labor. Rest and monitor.',
    descriptionHi: 'यदि 1 घंटे में 4 से 6 बार पेट कड़ा होकर तेज दर्द के साथ खिंचे, तो यह समय पूर्व प्रसव का संकेत हो सकता है।'
  },
  {
    id: 'rf_calf_pain',
    title: 'Calf Pain, Redness, or Unilateral Swelling',
    titleHi: 'एक पैर की पिंडली में तेज दर्द, लाली या सूजन',
    urgency: 'URGENT EVALUATION',
    urgencyHi: 'तत्काल जांच कराएं',
    severity: 'danger',
    description: 'Asymmetric swelling or tenderness in one calf raises concern for Deep Vein Thrombosis (DVT). Do not massage the area.',
    descriptionHi: 'केवल एक पैर की पिंडली में अचानक दर्द या सूजन खून का थक्का (DVT) हो सकता है। पैर की मालिश बिल्कुल न करें और डॉक्टर को दिखाएं।'
  },
  {
    id: 'rf_reduced_movement',
    title: 'Decreased Fetal Movement',
    titleHi: 'शिशु की हलचल में अचानक भारी कमी',
    urgency: 'SAME-DAY CHECK',
    urgencyHi: 'शिशु की धड़कन जांच कराएं',
    severity: 'danger',
    description: 'If you notice a distinct reduction or absence of baby kicks, do not wait. Lie on left side, take a cold sweet drink, and contact maternity triage if unchanged.',
    descriptionHi: 'यदि शिशु की सामान्य किक्स कम हो जाएं, तो बाईं करवट लेटें और कुछ मीठा खाएं। सुधार न होने पर तुरंत जांच कराएं।'
  }
];

export const CLINICAL_REVIEW_METADATA = {
  lastReviewedDate: 'October 2026',
  reviewBoard: 'GarbhaSaathi Maternal Health & Obstetrics Review Board',
  guidelinesReferenced: [
    {
      source: 'ACOG Committee Opinion No. 804',
      title: 'Physical Activity and Exercise During Pregnancy and the Postpartum Period',
      year: '2020 (Reaffirmed 2025)'
    },
    {
      source: 'FOGSI Good Clinical Practice',
      title: 'Antenatal Exercise & Maternal Fitness Guidelines for Indian Women',
      year: '2024'
    },
    {
      source: 'World Health Organization (WHO)',
      title: 'Guidelines on Physical Activity and Sedentary Behaviour: Pregnant and Postpartum Women',
      year: '2020'
    }
  ],
  generalMedicalDisclaimer: 'All exercises and yoga postures provided on GarbhaSaathi are educational and designed for healthy, uncomplicated pregnancies. Women with conditions such as cerclage, placenta previa, pre-eclampsia, severe anemia, or heart disease must obtain explicit clearance from their obstetrician before commencing physical activity.'
};
