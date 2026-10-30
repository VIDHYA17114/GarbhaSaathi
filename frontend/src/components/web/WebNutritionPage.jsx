import React, { useState, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import api from '../../services/api';
import { nutritionDatabase } from '../../data/nutritionDatabase';
import { 
  safeFoodCheckerData, 
  symptomMealSwaps, 
  weeklyGroceryData, 
  doNotMixRules 
} from '../../data/nutritionFeaturesData';
import { 
  Utensils, 
  Check, 
  CheckCircle2, 
  RefreshCw, 
  Plus, 
  Trash2, 
  Edit3, 
  X, 
  Search, 
  ShieldCheck, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Save, 
  AlertCircle,
  ShoppingCart,
  AlertTriangle,
  ShieldAlert,
  Ban,
  Printer,
  Copy,
  CheckSquare,
  Square,
  Share2,
  Clock,
  Heart
} from 'lucide-react';

// ── Budget configuration ──
const BUDGET_OPTIONS = [
  { id: 'low',    labelHi: 'कम बजट',    labelMr: 'कमी बजेट',    labelEn: 'Low',    rangeHi: '₹0–₹100/दिन',   rangeMr: '₹0–₹100/दिवस',   rangeEn: '₹0–₹100/day' },
  { id: 'medium', labelHi: 'मध्यम बजट', labelMr: 'मध्यम बजेट',  labelEn: 'Medium', rangeHi: '₹101–₹200/दिन', rangeMr: '₹101–₹200/दिवस', rangeEn: '₹101–₹200/day' },
  { id: 'high',   labelHi: 'अधिक बजट',  labelMr: 'जास्त बजेट',  labelEn: 'High',   rangeHi: '₹200+/दिन',     rangeMr: '₹200+/दिवस',     rangeEn: '₹200+/day' },
  { id: 'custom', labelHi: 'कस्टम बजट', labelMr: 'स्वतःचे बजेट', labelEn: 'Custom', rangeHi: 'राशि दर्ज करें', rangeMr: 'रक्कम टाका',      rangeEn: 'Enter amount' }
];

// ── Suggested ingredient list for kitchen pantry ──
const SUGGESTED_INGREDIENTS = [
  { name: 'Rice / चावल', nameHi: 'चावल' },
  { name: 'Dal / दाल', nameHi: 'दाल' },
  { name: 'Wheat / गेहूं', nameHi: 'गेहूं / आटा' },
  { name: 'Milk / दूध', nameHi: 'दूध' },
  { name: 'Curd / दही', nameHi: 'दही' },
  { name: 'Spinach / पालक', nameHi: 'पालक' },
  { name: 'Potato / आलू', nameHi: 'आलू' },
  { name: 'Tomato / टमाटर', nameHi: 'टमाटर' },
  { name: 'Onion / प्याज', nameHi: 'प्याज' },
  { name: 'Banana / केला', nameHi: 'केला' },
  { name: 'Peanuts / मूंगफली', nameHi: 'मूंगफली' },
  { name: 'Egg / अंडे', nameHi: 'अंडे' },
  { name: 'Poha / पोहा', nameHi: 'पोहा' },
  { name: 'Oats / ओट्स', nameHi: 'ओट्स' },
  { name: 'Moong Dal / मूंग दाल', nameHi: 'मूंग दाल' },
  { name: 'Paneer / पनीर', nameHi: 'पनीर' },
  { name: 'Vegetables / सब्जियां', nameHi: 'मिक्स सब्जियां' },
  { name: 'Fruits / फल', nameHi: 'मौसमी फल' }
];

// ── Budget-specific standard meal plans ──
const MEAL_PLANS = {
  low: {
    label: { en: 'Low Budget', hi: 'कम बजट (₹0–₹100/दिन)' },
    budgetNote: {
      en: 'These meals use the most affordable staples — dal, rice, roti, peanuts, seasonal vegetables and banana. A healthy pregnancy is absolutely possible on a low budget.',
      hi: 'ये भोजन सबसे किफायती सामग्री से बने हैं — दाल, चावल, रोटी, मूंगफली, मौसमी सब्जियां और केला। कम बजट में भी स्वस्थ गर्भावस्था संभव है।'
    },
    breakfast: {
      title: 'Poha + Peanuts + Lemon',
      titleHi: 'पोहा + मूंगफली + नींबू',
      benefit: 'Iron, energy & Vitamin C',
      benefitHi: 'आयरन, ऊर्जा और विटामिन C',
      img: '🥣',
      time: '7:00 – 8:30 AM',
      ingredientsList: ['Poha (पोहा)', 'Peanuts (मूंगफली)', 'Lemon (नींबू)', 'Mustard seeds (राई)', 'Salt (नमक)', 'Oil (तेल)'],
      prep: 'Rinse and soak 1 cup poha for 5 minutes. Heat 1 tsp oil, add mustard seeds. Add poha, peanuts, salt. Squeeze lemon before serving.',
      prepHi: '1 कप पोहा 5 मिनट भिगोएं। 1 चम्मच तेल में राई चटकाएं। पोहा, मूंगफली, नमक डालें। परोसने से पहले नींबू निचोड़ें।',
      estimatedCost: '₹10–₹20',
      nutrientNote: 'Peanuts add protein and iron. Lemon\'s Vitamin C doubles iron absorption from poha.',
      nutrientNoteHi: 'मूंगफली से प्रोटीन और आयरन। नींबू की विटामिन C पोहे का आयरन अवशोषण दोगुना करती है।'
    },
    lunch: {
      title: 'Moong Dal + Rice + Seasonal Sabzi',
      titleHi: 'मूंग दाल + चावल + मौसमी सब्जी',
      benefit: 'Protein, iron & carbohydrates',
      benefitHi: 'प्रोटीन, आयरन और कार्बोहाइड्रेट',
      img: '🍛',
      time: '12:30 – 1:30 PM',
      ingredientsList: ['Moong dal (मूंग दाल)', 'Rice (चावल)', 'Seasonal vegetable (मौसमी सब्जी)', 'Turmeric (हल्दी)', 'Salt (नमक)', 'Oil (तेल)'],
      prep: 'Cook moong dal with turmeric and salt. Cook rice separately. Sauté any available seasonal vegetable with minimal spices. Serve together.',
      prepHi: 'मूंग दाल को हल्दी और नमक के साथ पकाएं। चावल अलग से पकाएं। मौसमी सब्जी को हल्के मसालों के साथ भूनें। साथ परोसें।',
      estimatedCost: '₹20–₹35',
      nutrientNote: 'Moong dal is one of the most affordable complete proteins available.',
      nutrientNoteHi: 'मूंग दाल सबसे सस्ते और सुलभ प्रोटीन स्रोतों में से एक है।'
    },
    eveningSnack: {
      title: 'Roasted Chana + Jaggery',
      titleHi: 'भुना चना + गुड़',
      benefit: 'Iron, protein & energy',
      benefitHi: 'आयरन, प्रोटीन और ऊर्जा',
      img: '🥜',
      time: '4:00 – 5:00 PM',
      ingredientsList: ['Roasted chana (भुना चना)', 'Jaggery (गुड़)'],
      prep: 'Eat a small handful of roasted chana (kala chana or kabuli) with a small piece of jaggery. No cooking needed.',
      prepHi: 'एक मुट्ठी भुना चना (काला चना या काबुली) और एक छोटा टुकड़ा गुड़ खाएं। पकाने की ज़रूरत नहीं।',
      estimatedCost: '₹5–₹15',
      nutrientNote: 'Jaggery + chana is one of India\'s oldest iron-boosting combinations. Very affordable.',
      nutrientNoteHi: 'गुड़ + चना आयरन बढ़ाने का सबसे पुराना और सस्ता भारतीय संयोजन है।'
    },
    dinner: {
      title: 'Chapati + Aloo Sabzi + Onion Salad',
      titleHi: 'रोटी + आलू सब्जी + प्याज सलाद',
      benefit: 'Carbs, potassium & fiber',
      benefitHi: 'कार्बोहाइड्रेट, पोटैशियम और फाइबर',
      img: '🥗',
      time: '7:30 – 8:30 PM',
      ingredientsList: ['Wheat flour (गेहूं आटा)', 'Potato (आलू)', 'Onion (प्याज)', 'Tomato (टमाटर)', 'Salt & spices (नमक व मसाले)', 'Oil (तेल)'],
      prep: 'Make 2–3 chapatis from whole wheat flour. Prepare aloo sabzi with tomato and minimal spices. Slice raw onion as salad with lemon.',
      prepHi: 'गेहूं के आटे से 2–3 रोटियां बनाएं। टमाटर और हल्के मसालों के साथ आलू सब्जी बनाएं। कच्चा प्याज नींबू के साथ सलाद के रूप में परोसें।',
      estimatedCost: '₹15–₹30',
      nutrientNote: 'Light, filling and easy to digest. Raw onion with lemon adds Vitamin C for better iron absorption.',
      nutrientNoteHi: 'हल्का, पेट भरने वाला और सुपाच्य। नींबू के साथ कच्चा प्याज आयरन अवशोषण में मदद करता है।'
    }
  },

  medium: {
    label: { en: 'Medium Budget', hi: 'मध्यम बजट (₹101–₹200/दिन)' },
    budgetNote: {
      en: 'A balanced plan with better protein variety — dal, eggs or curd, greens, whole grains and fruits. Good nutrition without overspending.',
      hi: 'बेहतर प्रोटीन विविधता के साथ संतुलित योजना — दाल, अंडे या दही, हरी सब्जियां, साबुत अनाज और फल। अधिक खर्च किए बिना अच्छा पोषण।'
    },
    breakfast: {
      title: 'Vegetable Upma + Boiled Egg / Banana',
      titleHi: 'सब्जी उपमा + उबला अंडा / केला',
      benefit: 'Protein, folate & complex carbs',
      benefitHi: 'प्रोटीन, फोलेट और जटिल कार्बोहाइड्रेट',
      img: '🥣',
      time: '7:00 – 8:30 AM',
      ingredientsList: ['Semolina (सूजी)', 'Mixed vegetables (मिक्स सब्जियां)', 'Egg or Banana (अंडा या केला)', 'Mustard seeds (राई)', 'Curry leaves (करी पत्ता)', 'Oil & salt (तेल व नमक)'],
      prep: 'Dry roast semolina. Sauté mustard seeds and curry leaves, add chopped vegetables, pour water and semolina. Cook to a thick upma. Serve with 1 boiled egg or banana.',
      prepHi: 'सूजी को सूखा भूनें। राई और करी पत्ता का तड़का लगाएं, कटी सब्जियां डालें, पानी और सूजी डालें। उपमा बनाएं। 1 उबले अंडे या केले के साथ परोसें।',
      estimatedCost: '₹25–₹45',
      nutrientNote: 'Egg provides complete protein and choline for baby brain development. Skip egg for vegetarian option.',
      nutrientNoteHi: 'अंडा शिशु के मस्तिष्क विकास के लिए संपूर्ण प्रोटीन और कोलीन प्रदान करता है। शाकाहारी विकल्प के लिए अंडा छोड़ें।'
    },
    lunch: {
      title: 'Dal + Rice + Spinach + Curd',
      titleHi: 'दाल + चावल + पालक + दही',
      benefit: 'Protein, calcium, iron & probiotics',
      benefitHi: 'प्रोटीन, कैल्शियम, आयरन और प्रोबायोटिक्स',
      img: '🍛',
      time: '12:30 – 1:30 PM',
      ingredientsList: ['Masoor or Toor dal (मसूर / तूर दाल)', 'Rice (चावल)', 'Spinach (पालक)', 'Curd (दही)', 'Turmeric, cumin, salt (हल्दी, जीरा, नमक)'],
      prep: 'Cook dal with turmeric. Sauté spinach in garlic and oil. Serve dal, rice, spinach sabzi and a bowl of fresh curd together.',
      prepHi: 'हल्दी के साथ दाल पकाएं। लहसुन और तेल में पालक भूनें। दाल, चावल, पालक और ताजा दही एक साथ परोसें।',
      estimatedCost: '₹35–₹60',
      nutrientNote: 'Spinach is the highest-iron vegetable. Curd adds calcium and helps digestion.',
      nutrientNoteHi: 'पालक सबसे अधिक आयरन वाली सब्जी है। दही कैल्शियम देता है और पाचन में मदद करता है।'
    },
    eveningSnack: {
      title: 'Sprouted Moong + Lemon + Amla / Fruit',
      titleHi: 'अंकुरित मूंग + नींबू + आंवला / फल',
      benefit: 'Folate, Vitamin C & plant protein',
      benefitHi: 'फोलेट, विटामिन C और वनस्पति प्रोटीन',
      img: '🌱',
      time: '4:00 – 5:00 PM',
      ingredientsList: ['Sprouted moong (अंकुरित मूंग)', 'Lemon (नींबू)', 'Amla or any seasonal fruit (आंवला या मौसमी फल)', 'Rock salt (सेंधा नमक)'],
      prep: 'Rinse sprouted moong, add rock salt and lemon juice. Eat alongside amla or any locally available fruit.',
      prepHi: 'अंकुरित मूंग धोएं, सेंधा नमक और नींबू रस डालें। आंवला या कोई भी स्थानीय मौसमी फल के साथ खाएं।',
      estimatedCost: '₹15–₹30',
      nutrientNote: 'Sprouting increases folate content by up to 30%. Amla has 20x more Vitamin C than lemon.',
      nutrientNoteHi: 'अंकुरित करने से फोलेट 30% तक बढ़ता है। आंवले में नींबू से 20 गुना अधिक विटामिन C होता है।'
    },
    dinner: {
      title: 'Chapati + Mixed Vegetable + Buttermilk',
      titleHi: 'रोटी + मिक्स सब्जी + छाछ',
      benefit: 'Balanced macros, calcium & fiber',
      benefitHi: 'संतुलित पोषण, कैल्शियम और फाइबर',
      img: '🥗',
      time: '7:30 – 8:30 PM',
      ingredientsList: ['Whole wheat chapati (गेहूं रोटी)', 'Mixed vegetables (मिक्स सब्जी)', 'Buttermilk (छाछ)', 'Spices (मसाले)'],
      prep: 'Make 2–3 whole wheat chapatis. Prepare a mixed vegetable sabzi (carrots, beans, potato). Serve with a glass of fresh buttermilk.',
      prepHi: '2–3 गेहूं की रोटियां बनाएं। मिक्स सब्जी (गाजर, बींस, आलू) की सब्जी बनाएं। ताजा छाछ के एक गिलास के साथ परोसें।',
      estimatedCost: '₹30–₹55',
      nutrientNote: 'Buttermilk aids digestion and prevents heartburn, which is common in pregnancy.',
      nutrientNoteHi: 'छाछ पाचन में मदद करती है और एसिडिटी से बचाती है, जो गर्भावस्था में आम है।'
    }
  },

  high: {
    label: { en: 'High Budget', hi: 'अधिक बजट (₹200+/दिन)' },
    budgetNote: {
      en: 'A varied, protein-rich plan with paneer, nuts, dry fruits, milk and multiple fruits for comprehensive pregnancy nutrition.',
      hi: 'पनीर, मेवे, सूखे मेवे, दूध और विभिन्न फलों के साथ विविध, प्रोटीन-समृद्ध योजना।'
    },
    breakfast: {
      title: 'Oats Porridge + Milk + Dry Fruits + Fruit',
      titleHi: 'ओट्स खीर + दूध + मेवे + फल',
      benefit: 'Protein, calcium, omega-3 & vitamins',
      benefitHi: 'प्रोटीन, कैल्शियम, ओमेगा-3 और विटामिन',
      img: '🥣',
      time: '7:00 – 8:30 AM',
      ingredientsList: ['Oats (ओट्स)', 'Milk (दूध)', 'Almonds (बादाम)', 'Walnuts (अखरोट)', 'Banana or Pomegranate (केला या अनार)', 'Honey (शहद)'],
      prep: 'Cook oats in 1 cup warm milk for 5 min. Top with soaked almonds, walnuts, sliced banana or pomegranate seeds. Add a drizzle of honey.',
      prepHi: '1 कप गर्म दूध में ओट्स 5 मिनट पकाएं। भिगोए बादाम, अखरोट, कटा केला या अनार दाने डालें। शहद की बूंदें डालें।',
      estimatedCost: '₹50–₹80',
      nutrientNote: 'Walnuts are the best plant source of omega-3, vital for baby brain and eye development.',
      nutrientNoteHi: 'अखरोट ओमेगा-3 का सर्वोत्तम वनस्पति स्रोत है, जो शिशु के मस्तिष्क और आंखों के विकास के लिए आवश्यक है।'
    },
    lunch: {
      title: 'Brown Rice + Paneer Palak + Dal + Curd',
      titleHi: 'ब्राउन चावल + पनीर पालक + दाल + दही',
      benefit: 'Complete protein, calcium, iron & folate',
      benefitHi: 'संपूर्ण प्रोटीन, कैल्शियम, आयरन और फोलेट',
      img: '🍛',
      time: '12:30 – 1:30 PM',
      ingredientsList: ['Brown rice (ब्राउन चावल)', 'Paneer (पनीर)', 'Spinach (पालक)', 'Dal (दाल)', 'Curd (दही)', 'Spices (मसाले)'],
      prep: 'Cook brown rice. Prepare paneer palak by cooking spinach with paneer cubes in mild spices. Serve with dal and fresh curd.',
      prepHi: 'ब्राउन चावल पकाएं। पालक को पनीर के टुकड़ों के साथ हल्के मसालों में पकाएं। दाल और ताजा दही के साथ परोसें।',
      estimatedCost: '₹60–₹90',
      nutrientNote: 'Paneer provides complete dairy protein and calcium without digestion issues common with liquid milk.',
      nutrientNoteHi: 'पनीर तरल दूध की तुलना में पाचन समस्याओं के बिना संपूर्ण डेयरी प्रोटीन और कैल्शियम प्रदान करता है।'
    },
    eveningSnack: {
      title: 'Makhana + Milk / Seasonal Fruit Chaat',
      titleHi: 'मखाना + दूध / मौसमी फल चाट',
      benefit: 'Calcium, magnesium & antioxidants',
      benefitHi: 'कैल्शियम, मैग्नीशियम और एंटीऑक्सिडेंट',
      img: '🍈',
      time: '4:00 – 5:00 PM',
      ingredientsList: ['Makhana / Fox nuts (मखाना)', 'Milk or fruit (दूध या फल)', 'Pomegranate (अनार)', 'Guava / Apple (अमरूद / सेब)'],
      prep: 'Dry roast makhana and eat with warm milk. Or prepare a fresh fruit chaat with pomegranate, guava, and apple with lemon and cumin.',
      prepHi: 'मखाना सूखा भूनें और गर्म दूध के साथ खाएं। या अनार, अमरूद और सेब से नींबू और जीरा के साथ ताजा फल चाट बनाएं।',
      estimatedCost: '₹30–₹60',
      nutrientNote: 'Makhana is very high in calcium and low in calories — ideal for pregnancy.',
      nutrientNoteHi: 'मखाना कैल्शियम में बहुत समृद्ध और कैलोरी में कम है — गर्भावस्था के लिए आदर्श।'
    },
    dinner: {
      title: 'Multigrain Roti + Methi Sabzi + Raita + Salad',
      titleHi: 'मल्टीग्रेन रोटी + मेथी सब्जी + रायता + सलाद',
      benefit: 'Iron, folate, calcium & fiber',
      benefitHi: 'आयरन, फोलेट, कैल्शियम और फाइबर',
      img: '🥗',
      time: '7:30 – 8:30 PM',
      ingredientsList: ['Multigrain flour (मल्टीग्रेन आटा)', 'Fenugreek leaves (मेथी)', 'Curd for raita (दही रायता)', 'Fresh salad vegetables (सलाद सब्जियां)'],
      prep: 'Make 2–3 multigrain rotis. Prepare methi sabzi with minimal oil. Make a simple raita with curd, cucumber and cumin. Serve with raw salad.',
      prepHi: '2–3 मल्टीग्रेन रोटियां बनाएं। कम तेल में मेथी सब्जी बनाएं। दही, खीरे और जीरे के साथ रायता बनाएं। कच्चे सलाद के साथ परोसें।',
      estimatedCost: '₹45–₹75',
      nutrientNote: 'Fenugreek (methi) is among the highest plant sources of iron and folic acid.',
      nutrientNoteHi: 'मेथी पौधे-आधारित आयरन और फोलिक एसिड के उच्चतम स्रोतों में से एक है।'
    }
  }
};

function getBudgetTierForCustom(amount) {
  if (!amount || amount <= 100) return 'low';
  if (amount <= 200) return 'medium';
  return 'high';
}

function generateMealPlan(budgetTier, customBudget, ingredients, trimester, activeSymptom = 'none') {
  // If a symptom is actively selected, return symptom-adapted meals!
  if (activeSymptom && activeSymptom !== 'none' && symptomMealSwaps[activeSymptom]) {
    const sym = symptomMealSwaps[activeSymptom];
    return {
      ...sym.meals,
      _meta: {
        isSymptomAdaptive: true,
        symptomId: activeSymptom,
        title: sym.title,
        taglineHi: sym.taglineHi,
        tipsHi: sym.tipsHi
      }
    };
  }

  // Otherwise standard budget tier
  const effectiveTier = budgetTier === 'custom'
    ? getBudgetTierForCustom(customBudget)
    : (budgetTier || 'medium');

  const tierPlan = MEAL_PLANS[effectiveTier] || MEAL_PLANS.medium;
  const availableSet = new Set((ingredients || []).map(i => i.toLowerCase()));

  function annotateIngredients(mealIngredients) {
    return mealIngredients.map(ing => ({
      name: ing,
      available: availableSet.size === 0
        ? null
        : availableSet.has(ing.toLowerCase().split('(')[0].trim().toLowerCase()) ||
          availableSet.has(ing.toLowerCase().split('/')[0].trim().toLowerCase())
    }));
  }

  const meals = {};
  for (const [key, meal] of Object.entries({ 
    breakfast: tierPlan.breakfast, 
    lunch: tierPlan.lunch, 
    eveningSnack: tierPlan.eveningSnack, 
    dinner: tierPlan.dinner 
  })) {
    meals[key] = {
      ...meal,
      img: meal.img,
      ingredients: annotateIngredients(meal.ingredientsList || [])
    };
  }

  return { ...meals, _meta: { tier: effectiveTier, budgetNote: tierPlan.budgetNote } };
}

// ── MealCard Component ──
function MealCard({ meal, mealKey, language }) {
  const [expanded, setExpanded] = useState(false);
  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';
  const tr = (hi, mr, en) => isMarathi ? (mr || hi) : (isHindi ? hi : en);

  const MEAL_STYLES = {
    breakfast:    { color: 'orange', labelHi: 'नाश्ता',        labelMr: 'सकाळचा नाश्ता',  labelEn: 'Breakfast',     emoji: '🌅' },
    lunch:        { color: 'teal',   labelHi: 'दोपहर का भोजन', labelMr: 'दुपारचे जेवण',    labelEn: 'Lunch',       emoji: '☀️' },
    eveningSnack: { color: 'amber',  labelHi: 'शाम का नाश्ता', labelMr: 'संध्याकाळचा खाऊ', labelEn: 'Evening Snack', emoji: '🌤️' },
    dinner:       { color: 'blue',   labelHi: 'रात का भोजन',   labelMr: 'रात्रीचे जेवण',  labelEn: 'Dinner',      emoji: '🌙' }
  };

  const style = MEAL_STYLES[mealKey] || MEAL_STYLES.breakfast;

  const colorMap = {
    orange: 'bg-orange-100 text-orange-800 border-orange-200',
    teal:   'bg-teal-100 text-teal-800 border-teal-200',
    amber:  'bg-amber-100 text-amber-800 border-amber-200',
    blue:   'bg-blue-100 text-blue-800 border-blue-200'
  };

  const availableIngredients = meal.ingredients?.filter(i => i.available === true) || [];
  const missingIngredients = meal.ingredients?.filter(i => i.available === false) || [];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-teal-300 dark:hover:border-teal-600 transition-all shadow-2xs hover:shadow-sm overflow-hidden flex flex-col justify-between">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${colorMap[style.color]}`}>
              {style.emoji} {tr(style.labelHi, style.labelMr, style.labelEn)}
            </span>
            {meal.time && (
              <span className="text-[10px] text-slate-400 dark:text-slate-400 font-medium">{meal.time}</span>
            )}
          </div>
          <span className="text-2xl">{meal.img || '🥣'}</span>
        </div>

        <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 leading-tight">
          {isMarathi ? (meal.titleMr || meal.titleHi) : (isHindi ? meal.titleHi : meal.title)}
        </h4>
        <p className="text-xs text-[#157F66] dark:text-teal-400 font-semibold mt-1">
          {isMarathi ? (meal.benefitMr || meal.benefitHi) : (isHindi ? meal.benefitHi : meal.benefit)}
        </p>

        {/* Ingredient availability badges */}
        {meal.ingredients && meal.ingredients.length > 0 && meal.ingredients.some(i => i.available !== null) && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {availableIngredients.length > 0 && (
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                ✓ {availableIngredients.length} {tr('उपलब्ध', 'उपलब्ध', 'available')}
              </span>
            )}
            {missingIngredients.length > 0 && (
              <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-800">
                + {missingIngredients.length} {tr('खरीदें', 'खरेदी करा', 'to buy')}
              </span>
            )}
          </div>
        )}

        <button
          onClick={() => setExpanded(v => !v)}
          className="mt-2.5 text-[11px] font-bold text-[#157F66] dark:text-teal-400 flex items-center gap-1 hover:underline"
        >
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {expanded ? tr('कम देखें', 'कमी पहा', 'Show less') : tr('तैयारी व सामग्री विवरण', 'कृती व सविस्तर माहिती', 'View recipe & details')}
        </button>
      </div>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-slate-100 dark:border-slate-800 pt-3 bg-slate-50/50 dark:bg-slate-800/40">
          {/* Ingredients */}
          {meal.ingredients && meal.ingredients.length > 0 && (
            <div>
              <h5 className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                {tr('सामग्री', 'साहित्य व घटक', 'Ingredients')}
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {meal.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${
                      ing.available === true
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        : ing.available === false
                          ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {ing.available === true && '✓ '}
                    {ing.available === false && '+ '}
                    {ing.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Preparation */}
          <div>
            <h5 className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              {tr('तैयारी विधि', 'कृती व पद्धत', 'Preparation')}
            </h5>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
              {isMarathi ? (meal.prepMr || meal.prepHi) : (isHindi ? meal.prepHi : meal.prep)}
            </p>
          </div>

          {/* Nutrition note */}
          {(meal.nutrientNoteHi || meal.nutrientNote || meal.benefitHi) && (
            <div className="p-2.5 bg-teal-50 dark:bg-teal-950/40 rounded-xl border border-teal-100 dark:border-teal-900/50">
              <p className="text-[11px] text-teal-800 dark:text-teal-300 font-semibold">
                🌿 {isMarathi ? (meal.nutrientNoteMr || meal.nutrientNoteHi || meal.benefitHi) : (isHindi ? (meal.nutrientNoteHi || meal.benefitHi) : (meal.nutrientNote || meal.benefit))}
              </p>
            </div>
          )}

          {/* Cost estimate */}
          {meal.estimatedCost && (
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                {tr('अनुमानित लागत:', 'अंदाजे खर्च:', 'Estimated cost:')}
              </span>
              <span className="font-bold text-slate-700 dark:text-slate-200">{meal.estimatedCost}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main Nutrition Page Component ──
export default function WebNutritionPage() {
  const { 
    budgetTier, setBudgetTier, 
    customBudget, setCustomBudget,
    ingredients, addIngredient, removeIngredient, clearIngredients,
    pregnancyProgress, language 
  } = useApp();

  // Active tab: 'schedule' | 'pantry' | 'grocery' | 'safety'
  const [activeTab, setActiveTab] = useState('schedule');
  
  // Budget & Schedule state
  const [selectedBudget, setSelectedBudget] = useState(budgetTier || 'medium');
  const [customAmount, setCustomAmount] = useState(customBudget > 0 ? String(customBudget) : '');
  const [customError, setCustomError] = useState('');
  const [ingredientSearch, setIngredientSearch] = useState('');
  const [ingredientInput, setIngredientInput] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [mealPlan, setMealPlan] = useState(null);

  // 1. Symptom-Adaptive state: 'none' | 'nausea' | 'acidity' | 'constipation'
  const [activeSymptom, setActiveSymptom] = useState('none');

  // 2. "Do Not Mix" guide toggle
  const [showDoNotMixGuide, setShowDoNotMixGuide] = useState(false);

  // 3. Weekly Grocery checklist state
  const [selectedGroceryBudget, setSelectedGroceryBudget] = useState(budgetTier || 'low');
  const [groceryChecks, setGroceryChecks] = useState({});
  const [copySuccess, setCopySuccess] = useState(false);

  // 4. Safe Food Checker state
  const [safetySearch, setSafetySearch] = useState('');
  const [safetyCategory, setSafetyCategory] = useState('all'); // 'all' | 'avoid' | 'caution' | 'safe'

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';
  const tr = (hi, mr, en) => isMarathi ? (mr || hi) : (isHindi ? hi : en);
  const trimester = pregnancyProgress?.trimester || 1;

  // Budget selection handlers
  const handleBudgetSelect = (id) => {
    setSelectedBudget(id);
    setCustomError('');
    setBudgetTier(id);
    const amt = id === 'custom' ? (parseFloat(customAmount) || customBudget || 150) : 0;
    const generated = generateMealPlan(id, amt, ingredients, trimester, activeSymptom);
    setMealPlan(generated);
  };

  const handleCustomAmountChange = (val) => {
    setCustomAmount(val);
    const num = parseFloat(val);
    if (val && (isNaN(num) || num < 0)) {
      setCustomError(tr('कृपया वैध राशि दर्ज करें', 'कृपया योग्य रक्कम टाका', 'Please enter a valid positive amount'));
    } else {
      setCustomError('');
      if (!isNaN(num) && num >= 0) {
        setCustomBudget(num);
        const generated = generateMealPlan('custom', num, ingredients, trimester, activeSymptom);
        setMealPlan(generated);
      }
    }
  };

  const handleGeneratePlan = async () => {
    let amt = 0;
    if (selectedBudget === 'custom') {
      const num = parseFloat(customAmount);
      if (!customAmount || isNaN(num) || num < 0) {
        setCustomError(tr('कृपया वैध राशि दर्ज करें', 'कृपया योग्य रक्कम टाका', 'Enter a valid positive amount'));
        return;
      }
      amt = num;
      setCustomBudget(num);
    }
    setBudgetTier(selectedBudget);
    const effectiveTier = selectedBudget === 'custom' ? getBudgetTierForCustom(amt) : (selectedBudget || 'medium');

    // Call FastAPI backend nutrition suggestions
    try {
      const backendRes = await api.getNutritionSuggestions({
        budget_tier: effectiveTier,
        available_foods: ingredients || [],
        has_nausea: activeSymptom === 'nausea'
      });
      if (backendRes?.meals) {
        console.log('Backend nutrition suggestions loaded:', backendRes.strategy);
      }
    } catch (err) {
      console.warn('Backend nutrition suggestions notice:', err.message);
    }

    const generated = generateMealPlan(selectedBudget, amt, ingredients, trimester, activeSymptom);
    setMealPlan(generated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Symptom-Adaptive toggle handler
  const handleSymptomSelect = (symId) => {
    setActiveSymptom(symId);
    const amt = selectedBudget === 'custom' ? (parseFloat(customAmount) || customBudget || 150) : 0;
    const generated = generateMealPlan(selectedBudget, amt, ingredients, trimester, symId);
    setMealPlan(generated);
  };

  // Kitchen Pantry ingredient management
  const handleAddIngredient = () => {
    const name = ingredientInput.trim();
    if (!name) return;
    addIngredient(name);
    setIngredientInput('');
    const amt = selectedBudget === 'custom' ? (parseFloat(customAmount) || customBudget) : 0;
    const updated = generateMealPlan(selectedBudget, amt, [...ingredients, name], trimester, activeSymptom);
    setMealPlan(updated);
  };

  const filteredSuggestions = SUGGESTED_INGREDIENTS.filter(s => {
    if (!ingredientSearch) return true;
    const q = ingredientSearch.toLowerCase();
    return s.name.toLowerCase().includes(q) || s.nameHi.toLowerCase().includes(q);
  });

  const mealKeys = ['breakfast', 'lunch', 'eveningSnack', 'dinner'];
  const displayPlan = mealPlan || generateMealPlan(selectedBudget || budgetTier, customBudget, ingredients, trimester, activeSymptom);

  // Grocery checklist checkbox toggle
  const toggleGroceryCheck = (itemName) => {
    setGroceryChecks(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const currentGroceryData = weeklyGroceryData[selectedGroceryBudget] || weeklyGroceryData.low;

  // Copy grocery list to clipboard for WhatsApp sharing
  const handleCopyGrocery = () => {
    let text = `🛒 *गर्भसाथी साप्ताहिक राशन व मंडी पर्ची*\n`;
    text += `💰 बजट श्रेणी: ${currentGroceryData.budgetTier}\n`;
    text += `💵 अनुमानित कुल खर्च: ${currentGroceryData.estimatedWeeklyTotal}\n\n`;

    currentGroceryData.categories.forEach(cat => {
      text += `*${cat.icon} ${cat.category}*\n`;
      cat.items.forEach(item => {
        text += `• ${item.name} (${item.qty}) - लगभग ${item.est}\n`;
      });
      text += `\n`;
    });

    text += `🌸 गर्भसाथी (GarbhaSaathi) मातृत्व पोषण साथी`;
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  // Safe Food Checker filter
  const filteredSafetyData = safeFoodCheckerData.filter(item => {
    const matchesCategory = safetyCategory === 'all' || item.status === safetyCategory;
    const matchesSearch = !safetySearch || 
      item.name.toLowerCase().includes(safetySearch.toLowerCase()) ||
      item.reasonHi.toLowerCase().includes(safetySearch.toLowerCase()) ||
      item.safeAlternativeHi.toLowerCase().includes(safetySearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-7 animate-in fade-in duration-300 text-left">
      
      {/* ── Page Header ── */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5 transition-colors">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-[#157F66] dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full uppercase tracking-wider border border-teal-100 dark:border-teal-900/40">
              {tr("किफायती एवं संपूर्ण मातृत्व पोषण", "किफायतशीर व परिपूर्ण मातृत्व पोषण", "Affordable & Balanced Pregnancy Nutrition")}
            </span>
            {pregnancyProgress?.week && (
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                {pregnancyProgress.formattedText} • {isMarathi ? (pregnancyProgress.trimesterLabels?.mr || pregnancyProgress.trimesterLabels?.hi) : (isHindi ? pregnancyProgress.trimesterLabels?.hi : pregnancyProgress.trimesterLabels?.en)}
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">
            {tr("पोषण योजना एवं भोजन साथी", "पोषण योजना व आहार सोबती", "Pregnancy Nutrition & Meal Companion")}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            {tr(
              "दैनिक संतुलित आहार, लक्षण-अनुसार भोजन बदलाव, साप्ताहिक राशन पर्ची और खाद्य सुरक्षा निर्देश।",
              "दैनंदिन संतुलित आहार, लक्षणानुसार आहारातील बदल, साप्ताहिक किराणा यादी आणि अन्न सुरक्षा मार्गदर्शक.",
              "Daily budget meal schedules, symptom-adaptive swaps, weekly grocery checklist, and food safety rules."
            )}
          </p>
        </div>

        {/* Quick action buttons in header */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <button
            onClick={() => setActiveTab('grocery')}
            className="flex items-center gap-1.5 py-2.5 px-4 bg-teal-50 dark:bg-teal-950/50 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-[#157F66] dark:text-teal-400 rounded-2xl text-xs font-bold transition border border-teal-200 dark:border-teal-900/50 shadow-2xs"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{tr("साप्ताहिक राशन पर्ची", "साप्ताहिक किराणा यादी", "Weekly Grocery")}</span>
          </button>
          <button
            onClick={() => setActiveTab('safety')}
            className="flex items-center gap-1.5 py-2.5 px-4 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/60 text-red-700 dark:text-red-300 rounded-2xl text-xs font-bold transition border border-red-200 dark:border-red-900/50 shadow-2xs"
          >
            <Ban className="w-4 h-4" />
            <span>{tr("क्या न खाएं (Red Flags)", "काय खाऊ नये (Red Flags)", "Food Safety")}</span>
          </button>
        </div>
      </div>

      {/* ── 4 Main Tabs Switcher ── */}
      <div className="flex bg-slate-200/70 dark:bg-slate-800/80 p-1.5 rounded-2xl gap-1.5 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-2 ${
            activeTab === 'schedule'
              ? 'bg-white dark:bg-slate-900 text-[#157F66] dark:text-teal-400 shadow-xs border border-teal-100 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>{tr("दैनिक भोजन अनुसूची", "दैनिक भोजन वेळापत्रक", "Daily Meal Schedule")}</span>
        </button>

        <button
          onClick={() => setActiveTab('pantry')}
          className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-2 ${
            activeTab === 'pantry'
              ? 'bg-white dark:bg-slate-900 text-[#157F66] dark:text-teal-400 shadow-xs border border-teal-100 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{tr("रसोई की उपलब्ध सामग्री", "घरातील उपलब्ध अन्नधान्य", "Available Food at Home")}</span>
        </button>

        <button
          onClick={() => setActiveTab('grocery')}
          className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-2 ${
            activeTab === 'grocery'
              ? 'bg-white dark:bg-slate-900 text-[#157F66] dark:text-teal-400 shadow-xs border border-teal-100 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{tr("साप्ताहिक राशन पर्ची", "साप्ताहिक किराणा यादी", "Weekly Grocery Checklist")}</span>
        </button>

        <button
          onClick={() => setActiveTab('safety')}
          className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-2 ${
            activeTab === 'safety'
              ? 'bg-white dark:bg-slate-900 text-red-700 dark:text-red-400 shadow-xs border border-red-200 dark:border-red-900/50'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Ban className="w-4 h-4 text-red-600 dark:text-red-400" />
          <span>{tr("क्या न खाएं (Red Flags)", "काय खाऊ नये (Red Flags)", "Safe Food Checker")}</span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAB 1: DAILY MEAL SCHEDULE (Includes Symptom-Adaptive Swaps & Do-Not-Mix)
         ───────────────────────────────────────────────────────────── */}
      {activeTab === 'schedule' && (
        <div className="space-y-6">

          {/* 1. SYMPTOM-ADAPTIVE SWAPS TOGGLE BAR */}
          <div className="bg-gradient-to-r from-amber-50 via-teal-50/40 to-emerald-50 dark:from-amber-950/20 dark:via-teal-950/20 dark:to-emerald-950/20 border border-teal-200/70 dark:border-teal-900/50 p-5 sm:p-6 rounded-3xl shadow-2xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <span>🩺</span>
                  <span>{tr("आज आप कैसा महसूस कर रही हैं? (लक्षण अनुसार तुरंत भोजन बदलाव)", "आज तुम्हाला कसे वाटत आहे? (लक्षणानुसार तात्काळ आहार बदल)", "How are you feeling today? (Symptom-Adaptive Swaps)")}</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  {tr(
                    "यदि जी मिचला रहा है या एसिडिटी है, तो 1-क्लिक में उपयुक्त भोजन व घरेलू उपाय देखें:",
                    "मळमळ किंवा ॲसिडिटी असल्यास, 1-क्लिकमध्ये योग्य आहार व घरगुती उपाय पहा:",
                    "Select your daily symptom to instantly adapt today's meals to gentle, soothing foods:"
                  )}
                </p>
              </div>

              {activeSymptom !== 'none' && (
                <button
                  onClick={() => handleSymptomSelect('none')}
                  className="text-xs font-bold text-[#157F66] dark:text-teal-400 bg-white dark:bg-slate-800 border border-[#157F66] dark:border-teal-600 px-3 py-1.5 rounded-xl hover:bg-teal-50 dark:hover:bg-slate-700 transition shrink-0"
                >
                  {tr("सामान्य आहार पर वापस जाएं", "सामान्य आहारावर परत या", "Reset to Normal Plan")}
                </button>
              )}
            </div>

            {/* 4 Symptom Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'none', labelHi: 'सामान्य (All Good)', labelMr: 'सर्व ठीक (All Good)', emoji: '🌸' },
                { id: 'nausea', labelHi: 'जी मिचलाना (Nausea)', labelMr: 'मळमळ/उलटी (Nausea)', emoji: '🍋' },
                { id: 'acidity', labelHi: 'सीने में जलन (Acidity)', labelMr: 'छातीत जळजळ (Acidity)', emoji: '🔥' },
                { id: 'constipation', labelHi: 'कब्ज (Constipation)', labelMr: 'बद्धकोष्ठता (Constipation)', emoji: '🌾' }
              ].map(s => {
                const isSelected = activeSymptom === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleSymptomSelect(s.id)}
                    className={`py-3 px-3.5 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 transition transform active:scale-98 ${
                      isSelected
                        ? 'bg-[#157F66] text-white shadow-sm ring-2 ring-teal-300 dark:ring-teal-700'
                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span className="text-base">{s.emoji}</span>
                    <span className="truncate">{tr(s.labelHi, s.labelMr, s.id)}</span>
                  </button>
                );
              })}
            </div>

            {/* If a symptom is active, show the symptom relief tips banner */}
            {activeSymptom !== 'none' && displayPlan._meta?.tipsHi && (
              <div className="mt-4 p-4 bg-white/90 dark:bg-slate-900/90 rounded-2xl border border-teal-200 dark:border-teal-900/60 text-xs text-slate-700 dark:text-slate-300 space-y-1.5 animate-in fade-in duration-200">
                <span className="font-extrabold text-[#157F66] dark:text-teal-400 block flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>{displayPlan._meta.title} — घरेलू राहत उपाय:</span>
                </span>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300 pl-1">
                  {displayPlan._meta.tipsHi.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 2. "DO NOT MIX" RULE GUIDE (Interactive Banner) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-rose-200/80 dark:border-rose-900/60 p-5 sm:p-6 shadow-2xs transition-colors">
            <div 
              onClick={() => setShowDoNotMixGuide(v => !v)}
              className="flex items-center justify-between cursor-pointer select-none"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/60 flex items-center justify-center text-xl shrink-0">
                  ⚠️
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <span>{tr("आयरन व कैल्शियम अवशोषण नियम (Do Not Mix Rule)", "लोह व कॅल्शियम शोषण नियम (Do Not Mix Rule)", "Maternal Absorption Rules (Do Not Mix)")}</span>
                    <span className="text-[10px] bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 px-2 py-0.5 rounded-full font-bold">
                      {tr("अत्यंत महत्वपूर्ण", "अतिशय महत्त्वाचे", "Crucial")}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {tr(
                      "दूध और चाय के साथ आयरन (पालक, दाल, गोली) कभी न लें — जानें सही समय चक्र",
                      "दूध व चहा सोबत लोह (पालक, डाळ, गोळी) कधीही घेऊ नका — योग्य वेळ चक्र समजून घ्या",
                      "Never mix milk/tea with iron supplements or spinach. Learn the 2-hour separation rule."
                    )}
                  </p>
                </div>
              </div>

              <button className="text-slate-400 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1">
                {showDoNotMixGuide ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>

            {/* Expandable Guide Cards */}
            {showDoNotMixGuide && (
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {/* Card 1: Iron + Calcium */}
                  <div className="p-4 rounded-2xl bg-red-50/80 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-xs">
                    <span className="font-extrabold text-red-700 dark:text-red-300 block mb-1 text-sm flex items-center gap-1.5">
                      <span>❌</span>
                      <span>{tr("आयरन + कैल्शियम साथ में नहीं", "लोह + कॅल्शियम एकत्र घेऊ नका", "Do Not Mix Iron + Calcium")}</span>
                    </span>
                    <p className="text-red-900 dark:text-red-200 leading-relaxed">
                      {tr(
                        "कैल्शियम आंत में आयरन के अवशोषण को 80% तक रोक देता है। दूध, दही या कैल्शियम की गोली और पालक/आयरन गोली में कम से कम 2 घंटे का अंतर रखें।",
                        "कॅल्शियम आतड्यांमध्ये लोहाचे शोषण 80% पर्यंत रोखते. दूध, दही किंवा कॅल्शियमची गोळी आणि पालक/लोहाच्या गोळीमध्ये किमान 2 तासांचे अंतर ठेवा.",
                        "Calcium inhibits iron absorption by up to 80%. Keep at least 2 hours gap between calcium foods/tablets and iron-rich foods/supplements."
                      )}
                    </p>
                  </div>

                  {/* Card 2: Iron + Vitamin C */}
                  <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-xs">
                    <span className="font-extrabold text-emerald-800 dark:text-emerald-300 block mb-1 text-sm flex items-center gap-1.5">
                      <span>✅</span>
                      <span>{tr("आयरन + विटामिन C हमेशा साथ", "लोह + व्हिटॅमिन C नेहमी एकत्र", "Always Pair Iron + Vitamin C")}</span>
                    </span>
                    <p className="text-emerald-950 dark:text-emerald-200 leading-relaxed">
                      {tr(
                        "पोहा, दाल या हरी सब्जी पर हमेशा ताजा नींबू निचोड़ें या साथ में अमरूद/आंवला खाएं। विटामिन C आयरन के अवशोषण को 2 से 3 गुना बढ़ा देता है।",
                        "पोहे, डाळ किंवा पालेभाज्यांवर नेहमी ताजा लिंबू पिळा किंवा सोबत पेरू/आवळा खा. व्हिटॅमिन C लोहाचे शोषण 2 ते 3 पटीने वाढवते.",
                        "Always squeeze fresh lemon on poha, dal, or greens, or eat guava/amla. Vitamin C doubles iron absorption."
                      )}
                    </p>
                  </div>

                  {/* Card 3: Tea/Coffee */}
                  <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs">
                    <span className="font-extrabold text-amber-900 dark:text-amber-300 block mb-1 text-sm flex items-center gap-1.5">
                      <span>⏳</span>
                      <span>{tr("खाने के तुरंत बाद चाय न पिएं", "जेवणानंतर लगेच चहा पिऊ नका", "Avoid Tea/Coffee Right After Meals")}</span>
                    </span>
                    <p className="text-amber-950 dark:text-amber-200 leading-relaxed">
                      {tr(
                        "चाय और कॉफी के टैनिन भोजन के आयरन को शरीर से बाहर बहा देते हैं। भोजन के बाद कम से कम 60 से 90 मिनट तक चाय बिल्कुल न पिएं।",
                        "चहा आणि कॉफीमधील टॅनिन अन्नातील लोह शरीरात शोषून न घेता बाहेर टाकतात. जेवणानंतर किमान 60 ते 90 मिनिटे चहा पिणे टाळा.",
                        "Tannins in tea and coffee flush out dietary iron. Avoid tea/coffee for at least 60-90 minutes after meals."
                      )}
                    </p>
                  </div>
                </div>

                {/* Timing Schedule Banner */}
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-200">{tr("⏰ सही समय सारणी:", "⏰ योग्य वेळ वेळापत्रक:", "⏰ Optimal Timing Schedule:")}</span>
                  <span className="text-slate-600 dark:text-slate-300">🌅 <strong>{tr("सुबह:", "सकाळ:", "Morning:")}</strong> {tr("कैल्शियम व दूध", "कॅल्शियम व दूध", "Calcium & Milk")}</span>
                  <span className="text-slate-600 dark:text-slate-300">☀️ <strong>{tr("दोपहर:", "दुपार:", "Afternoon:")}</strong> {tr("दाल-पालक + नींबू + आयरन गोली", "डाळ-पालक + लिंबू + लोहाची गोळी", "Dal-Spinach + Lemon + Iron tablet")}</span>
                  <span className="text-slate-600 dark:text-slate-300">🌙 <strong>{tr("रात:", "रात्र:", "Night:")}</strong> {tr("हल्का भोजन + गुनगुना दूध", "हलके जेवण + कोमट दूध", "Light Dinner + Warm Milk")}</span>
                </div>
              </div>
            )}
          </div>

          {/* 3. BUDGET SELECTOR & DAILY MEAL CARDS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">

            {/* Left Column: Budget Selector (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
                <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 mb-1">
                  {tr("दैनिक बजट चुनें", "दैनिक बजेट निवडा", "Select Daily Budget")}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                  {tr(
                    "अपने खर्च के अनुसार चुनें। कम बजट में भी पूरा पोषण मिलता है:",
                    "आपल्या खर्चानुसार निवडा. कमी बजेटमध्येही पूर्ण पोषण मिळते:",
                    "Select your daily budget tier. Wholesome nutrition is available at every tier:"
                  )}
                </p>

                <div className="space-y-2">
                  {BUDGET_OPTIONS.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => handleBudgetSelect(opt.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition border ${
                        selectedBudget === opt.id
                          ? 'bg-[#157F66] text-white border-[#157F66] shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      <span>{tr(opt.labelHi, opt.labelMr, opt.labelEn)}</span>
                      <span className={`text-[10px] font-semibold ${selectedBudget === opt.id ? 'text-teal-100' : 'text-slate-400 dark:text-slate-400'}`}>
                        {tr(opt.rangeHi, opt.rangeMr, opt.rangeEn)}
                      </span>
                    </button>
                  ))}
                </div>

                {selectedBudget === 'custom' && (
                  <div className="mt-3">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                      {tr("कस्टम बजट (₹ में)", "स्वतःचे बजेट (₹ मध्ये)", "Custom Budget (in ₹)")}
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={customAmount}
                      onChange={e => handleCustomAmountChange(e.target.value)}
                      placeholder={tr("जैसे: 150", "उदा: 150", "e.g. 150")}
                      className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-2xl text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-[#157F66] outline-none ${
                        customError ? 'border-red-400' : 'border-slate-200 dark:border-slate-700'
                      }`}
                    />
                    {customError && (
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {customError}
                      </p>
                    )}
                  </div>
                )}

                <button
                  onClick={handleGeneratePlan}
                  className="w-full mt-4 py-3 bg-[#157F66] hover:bg-[#0e5947] text-white rounded-2xl font-bold text-xs shadow-xs transition active:scale-98 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  {tr("भोजन तालिका अपडेट करें", "आहार वेळापत्रक अपडेट करा", "Update Meal Schedule")}
                </button>
              </div>

              {/* Nausea & Morning Sickness Tips Card */}
              <div className="bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-3xl p-5 text-amber-950 dark:text-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🍋</span>
                  <h4 className="font-bold text-xs">
                    {tr("मॉर्निंग सिकनेस के घरेलू उपाय", "सकाळच्या मळमळीवर घरगुती उपाय", "Morning Sickness Tips")}
                  </h4>
                </div>
                <ul className="text-xs space-y-1.5 text-amber-900/90 dark:text-amber-200/90 list-disc list-inside">
                  <li>{tr("बिस्तर से उठने से पहले सूखा खाखरा या भुने चने खाएं।", "बेडवरून उठण्यापूर्वी सुका खाकरा किंवा भाजलेले चणे खा.", "Eat dry snacks before getting out of bed.")}</li>
                  <li>{tr("गुनगुने पानी में अदरक व नींबू डालकर पिएं।", "कोमट पाण्यात आले व लिंबू टाकून प्या.", "Sip ginger-lemon water throughout the day.")}</li>
                  <li>{tr("हर 2 घंटे में थोड़ा-थोड़ा खाएं।", "दर 2 तासांनी थोडे-थोडे खा.", "Eat small, frequent meals rather than large portions.")}</li>
                </ul>
              </div>
            </div>

            {/* Right Column: Meal Cards (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
                
                {/* Schedule Header */}
                <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                      {tr("आज की संपूर्ण भोजन तालिका", "आजचे संपूर्ण आहार वेळापत्रक", "Daily Meal Schedule")}
                    </h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {activeSymptom !== 'none'
                        ? (tr(`लक्षण विशेष आहार: ${displayPlan._meta?.title || 'अनुकूलित'}`, `लक्षण विशेष आहार: ${displayPlan._meta?.title || 'अनुकूलित'}`, 'Symptom-Adapted Meals'))
                        : (selectedBudget === 'custom' && customAmount
                            ? `${tr('बजट: ₹', 'बजेट: ₹', 'Budget: ₹')}${customAmount}${tr('/दिन', '/दिवस', '/day')}`
                            : BUDGET_OPTIONS.find(o => o.id === selectedBudget)?.[isMarathi ? 'rangeMr' : (isHindi ? 'rangeHi' : 'rangeEn')])}
                      {' • '}
                      {tr("अनुमानित शैक्षणिक सुझाव", "अंदाजे शैक्षणिक सल्ले", "Educational suggestions")}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab('grocery')}
                      className="flex items-center gap-1.5 py-2 px-3.5 bg-teal-50 dark:bg-teal-950/50 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-[#157F66] dark:text-teal-400 rounded-xl text-xs font-bold transition border border-teal-200 dark:border-teal-900/50"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>{tr("राशन पर्ची", "किराणा यादी", "Grocery List")}</span>
                    </button>
                    <button
                      onClick={handleGeneratePlan}
                      className="flex items-center gap-1.5 py-2 px-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>{tr("रिफ्रेश", "रिफ्रेश करा", "Refresh")}</span>
                    </button>
                  </div>
                </div>

                {/* Budget Focus Banner */}
                {displayPlan._meta?.budgetNote && (
                  <div className={`p-4 rounded-2xl border mb-5 flex items-start gap-3.5 transition-all ${
                    (displayPlan._meta?.tier === 'low')
                      ? 'bg-emerald-50/90 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50 text-emerald-950 dark:text-emerald-200 shadow-2xs'
                      : (displayPlan._meta?.tier === 'high')
                        ? 'bg-purple-50/90 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900/50 text-purple-950 dark:text-purple-200 shadow-2xs'
                        : 'bg-teal-50/90 dark:bg-teal-950/30 border-teal-200 dark:border-teal-900/50 text-teal-950 dark:text-teal-200 shadow-2xs'
                  }`}>
                    <span className="text-2xl shrink-0 mt-0.5">
                      {displayPlan._meta?.tier === 'low' ? '🌱' : displayPlan._meta?.tier === 'high' ? '🥑' : '🌾'}
                    </span>
                    <div className="text-xs leading-relaxed">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-extrabold uppercase tracking-wider text-[11px] px-2 py-0.5 rounded-md bg-white/70 dark:bg-slate-800/80 border border-current">
                          {displayPlan._meta?.tier === 'low'
                            ? tr("कम बजट पोषण मार्गदर्शन (₹0–₹100)", "कमी बजेट पोषण मार्गदर्शन (₹0–₹100)", "Affordable Low-Budget Nutrition (₹0–₹100)")
                            : displayPlan._meta?.tier === 'high'
                              ? tr("विविध व उच्च प्रोटीन पोषण (₹200+)", "विविध व उच्च प्रथिने पोषण (₹200+)", "Varied High-Protein Nutrition (₹200+)")
                              : tr("संतुलित पोषण योजना (₹101–₹200)", "संतुलित पोषण योजना (₹101–₹200)", "Balanced Nutrition Plan (₹101–₹200)")
                          }
                        </span>
                      </div>
                      <p className="font-medium text-slate-700 dark:text-slate-300">
                        {isMarathi ? (displayPlan._meta?.budgetNote?.mr || displayPlan._meta?.budgetNote?.hi) : (isHindi ? displayPlan._meta?.budgetNote?.hi : displayPlan._meta?.budgetNote?.en)}
                      </p>
                    </div>
                  </div>
                )}

                {/* 4 Daily Meal Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mealKeys.map((key) => (
                    displayPlan[key] && <MealCard key={key} mealKey={key} meal={displayPlan[key]} language={language} />
                  ))}
                </div>
              </div>

              {/* Food Category Guide */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 mb-3">
                  {tr("गर्भावस्था के लिए महत्वपूर्ण पोषण समूह", "गर्भधारणेसाठी महत्त्वाचे पोषण गट", "Key Nutritional Food Groups for Pregnancy")}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {nutritionDatabase.categories.map(cat => (
                    <div key={cat.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                      <span className="text-2xl shrink-0">{cat.icon}</span>
                      <div>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block leading-tight">
                          {tr(cat.nameHi, cat.nameMr || cat.nameHi, cat.name)}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 block">
                          {cat.items?.slice(0, 2).join(', ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 2: AVAILABLE FOOD AT HOME (Pantry Management)
         ───────────────────────────────────────────────────────────── */}
      {activeTab === 'pantry' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
          
          {/* Left: Ingredient Management */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 mb-1">
                {tr("अपनी रसोई की सामग्री", "तुमच्या स्वयंपाकघरातील साहित्य", "Your Kitchen Ingredients")}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                {tr(
                  "घर में जो सामग्री उपलब्ध है वह जोड़ें। केवल वही जोड़ें जो आज वास्तव में है:",
                  "घरात जे साहित्य उपलब्ध आहे ते जोडा. फक्त तेच जोडा जे आज खरोखर आहे:",
                  "Add ingredients currently available in your kitchen. Add only what you actually have today:"
                )}
              </p>

              {/* Custom ingredient input */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={ingredientInput}
                  onChange={e => setIngredientInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleAddIngredient(); }}
                  placeholder={tr("सामग्री का नाम लिखें...", "साहित्याचे नाव लिहा...", "Type ingredient name...")}
                  className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-2xl text-xs focus:ring-2 focus:ring-[#157F66] outline-none"
                />
                <button
                  onClick={handleAddIngredient}
                  className="px-4 py-3 bg-[#157F66] text-white rounded-2xl text-xs font-bold hover:bg-[#0e5947] transition flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  {isHindi ? "जोड़ें" : isMarathi ? "जोडा" : "Add"}
                </button>
              </div>

              {/* Current Ingredients */}
              {ingredients.length > 0 ? (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {tr("उपलब्ध सामग्री", "उपलब्ध साहित्य", "Available")} ({ingredients.length})
                    </span>
                    <button
                      onClick={clearIngredients}
                      className="text-[10px] font-bold text-red-500 dark:text-red-400 hover:text-red-700 hover:underline"
                    >
                      {tr("सब हटाएं", "सर्व काढा", "Clear All")}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                    {ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 dark:bg-teal-950/60 border border-[#157F66]/30 dark:border-teal-800 text-[#157F66] dark:text-teal-400 rounded-full text-xs font-bold"
                      >
                        {ing}
                        <button
                          onClick={() => removeIngredient(ing)}
                          className="ml-0.5 text-teal-600 dark:text-teal-400 hover:text-red-500 transition"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-slate-400">
                  <span className="text-4xl block mb-2">🫙</span>
                  <p className="text-xs font-semibold">
                    {tr("कोई सामग्री नहीं जोड़ी गई।", "अद्याप कोणतेही साहित्य जोडले नाही.", "No ingredients added yet.")}
                  </p>
                </div>
              )}
            </div>

            {/* Ingredient Suggestions */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
              <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 mb-2">
                {tr("सुझाव (ऐच्छिक)", "सूचना (ऐच्छिक)", "Suggestions (Optional)")}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                {tr("ये केवल सुझाव हैं। कोई भी सामग्री जोड़ना ज़रूरी नहीं।", "या केवळ सूचना आहेत. कोणतेही साहित्य जोडणे आवश्यक नाही.", "These are suggestions only. You are never required to use this list.")}
              </p>

              {/* Search suggestions */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={ingredientSearch}
                  onChange={e => setIngredientSearch(e.target.value)}
                  placeholder={tr("सुझाव खोजें...", "सूचना शोधा...", "Search suggestions...")}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl text-xs focus:ring-2 focus:ring-[#157F66] outline-none"
                />
              </div>

              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                {filteredSuggestions.map((s, i) => {
                  const isAdded = ingredients.some(ing => ing.toLowerCase() === s.name.toLowerCase() || ing.toLowerCase() === s.nameHi.toLowerCase());
                  return (
                    <button
                      key={i}
                      onClick={() => !isAdded && addIngredient(isHindi ? s.nameHi : s.name)}
                      disabled={isAdded}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition border ${
                        isAdded
                          ? 'bg-teal-50 dark:bg-teal-950/60 border-[#157F66]/30 dark:border-teal-800 text-[#157F66] dark:text-teal-400 cursor-default'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-[#157F66] hover:text-[#157F66] dark:hover:text-teal-300'
                      }`}
                    >
                      {isAdded && <span className="mr-1">✓</span>}
                      {isHindi ? s.nameHi : s.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Generated suggestions from pantry */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                    {tr("उपलब्ध सामग्री से भोजन सुझाव", "उपलब्ध साहित्यावरून जेवणाचे पर्याय", "Meal Suggestions From Your Ingredients")}
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {ingredients.length > 0
                      ? tr(
                          `${ingredients.length} उपलब्ध सामग्री के आधार पर`,
                          `${ingredients.length} उपलब्ध साहित्याच्या आधारे`,
                          `Based on ${ingredients.length} available ingredients`
                        )
                      : tr("पहले सामग्री जोड़ें", "प्रथम साहित्य जोडा", "Add ingredients to see suggestions")}
                  </span>
                </div>
                <button
                  onClick={handleGeneratePlan}
                  disabled={ingredients.length === 0}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold shadow-xs transition ${
                    ingredients.length > 0
                      ? 'bg-[#157F66] hover:bg-[#0e5947] text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  {tr("सुझाव बनाएं", "सूचना तयार करा", "Generate Suggestions")}
                </button>
              </div>

              {ingredients.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <span className="text-5xl block mb-3">🥘</span>
                  <p className="text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">
                    {tr("कोई सामग्री नहीं मिली", "कोणतेही साहित्य सापडले नाही", "No ingredients added yet")}
                  </p>
                  <p className="text-xs">
                    {tr(
                      "बाईं तरफ अपनी रसोई की सामग्री जोड़ें और फिर सुझाव देखें।",
                      "डाव्या बाजूला आपल्या स्वयंपाकघरातील साहित्य जोडा आणि नंतर सूचना पहा.",
                      "Add your kitchen ingredients on the left, then generate suggestions."
                    )}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {mealKeys.map((key) => (
                    displayPlan[key] && <MealCard key={key} mealKey={key} meal={displayPlan[key]} language={language} />
                  ))}
                </div>
              )}
            </div>

            {/* How to interpret */}
            <div className="p-5 bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/50 rounded-2xl flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#157F66] dark:text-teal-400 shrink-0 mt-0.5" />
              <div className="text-xs text-teal-900 dark:text-teal-200 leading-relaxed space-y-1">
                <p className="font-bold">{tr("सामग्री संकेत पढ़ने का तरीका:", "साहित्य चिन्ह समजून घेण्याची पद्धत:", "How to read the ingredient badges:")}</p>
                <p><span className="font-bold text-emerald-700 dark:text-emerald-400">✓ {tr("हरा", "हिरवा", "Green")}</span> = {tr("आपकी सूची में उपलब्ध", "तुमच्या यादीत उपलब्ध", "available in your list")}</p>
                <p><span className="font-bold text-rose-700 dark:text-rose-400">+ {tr("लाल", "लाल", "Red")}</span> = {tr("खरीदना होगा", "खरेदी करावे लागेल", "needs to be purchased")}</p>
                <p className="text-teal-700 dark:text-teal-300 italic">{tr("कोई भी सुझाई गई सामग्री बिना आपकी पुष्टि के सूची में नहीं जोड़ी जाएगी।", "कोणतेही सुचवलेले साहित्य आपल्या संमतीशिवाय यादीत जोडले जाणार नाही.", "No suggested ingredient is added to your list without your confirmation.")}</p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 3: WEEKLY KIRANA & MANDI GROCERY CHECKLIST (Print/Save)
         ───────────────────────────────────────────────────────────── */}
      {activeTab === 'grocery' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
            
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-[#157F66] dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full uppercase tracking-wider border border-teal-100 dark:border-teal-900/40">
                  {tr("किराना व सब्जी मंडी पर्ची", "किराणा व भाजीपाला यादी", "Weekly Grocery & Mandi Checklist")}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">
                  {tr("साप्ताहिक राशन व खरीदारी सूची", "साप्ताहिक किराणा व खरेदी यादी", "Weekly Pregnancy Grocery Checklist")}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {tr(
                    "पूरे 7 दिनों के पोषण के लिए आवश्यक राशन। खरीदारी करते समय चेक करें या परिवार को भेजें:",
                    "पूर्ण 7 दिवसांच्या पोषणासाठी आवश्यक किराणा. खरेदी करताना तपासा किंवा कुटुंबाला पाठवा:",
                    "Complete 7-day grocery list calculated for your pregnancy budget tier:"
                  )}
                </p>
              </div>

              {/* Action buttons: Print & WhatsApp copy */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  onClick={handleCopyGrocery}
                  className="flex items-center gap-1.5 py-2.5 px-4 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 rounded-2xl text-xs font-extrabold transition border border-emerald-200 dark:border-emerald-800 shadow-2xs"
                >
                  <Share2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>
                    {copySuccess 
                      ? tr("कॉपी हो गया! ✓", "कॉपी झाले! ✓", "Copied! ✓") 
                      : tr("व्हाट्सएप पर शेयर करें", "व्हॉट्सॲपवर शेअर करा", "Copy for WhatsApp")}
                  </span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 py-2.5 px-4 bg-[#157F66] hover:bg-[#0e5947] text-white rounded-2xl text-xs font-extrabold transition shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>{tr("प्रिंट / सेव PDF", "प्रिंट / सेव्ह PDF", "Print / Save PDF")}</span>
                </button>
              </div>
            </div>

            {/* Budget Switcher for Grocery */}
            <div className="py-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {tr("बजट श्रेणी चुनें:", "बजेट श्रेणी निवडा:", "Select Budget Tier:")}
                </span>
                <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 gap-1">
                  {['low', 'medium', 'high'].map(b => (
                    <button
                      key={b}
                      onClick={() => setSelectedGroceryBudget(b)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition ${
                        selectedGroceryBudget === b
                          ? 'bg-[#157F66] text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      {b === 'low' 
                        ? tr('कम बजट', 'कमी बजेट', 'Low') 
                        : b === 'medium' 
                          ? tr('मध्यम', 'मध्यम', 'Medium') 
                          : tr('उच्च', 'उच्च', 'High')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {tr("अनुमानित साप्ताहिक खर्च:", "अंदाजे साप्ताहिक खर्च:", "Estimated Weekly Cost:")}
                </span>
                <span className="text-sm font-black text-[#157F66] dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-xl border border-teal-200 dark:border-teal-900/50">
                  {currentGroceryData.estimatedWeeklyTotal}
                </span>
              </div>
            </div>

            {/* Grocery Checklist Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {currentGroceryData.categories.map((cat, catIdx) => (
                <div key={catIdx} className="bg-slate-50/70 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200/70 dark:border-slate-700">
                    <span className="font-extrabold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      <span className="text-xl">{cat.icon}</span>
                      <span>{cat.category}</span>
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      {cat.items.filter(i => groceryChecks[i.name]).length}/{cat.items.length} {tr("लिया", "घेतले", "checked")}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {cat.items.map((item, itemIdx) => {
                      const isChecked = !!groceryChecks[item.name];
                      return (
                        <div
                          key={itemIdx}
                          onClick={() => toggleGroceryCheck(item.name)}
                          className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition select-none ${
                            isChecked
                              ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-900/50 opacity-60'
                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-600'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                              isChecked ? 'bg-[#157F66] border-[#157F66] text-white' : 'border-slate-300 dark:border-slate-600'
                            }`}>
                              {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <span className={`text-xs font-semibold ${isChecked ? 'line-through text-slate-500 dark:text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                              {item.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-md text-[11px]">
                              {item.qty}
                            </span>
                            <span className="font-bold text-[#157F66] dark:text-teal-400">
                              {item.est}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Reset Grocery Checks */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>{tr("खरीदारी पूरी होने के बाद चेकलिस्ट रीसेट करें:", "खरेदी पूर्ण झाल्यावर यादी पूर्ववत करा:", "Reset checklist after shopping:")}</span>
              <button
                onClick={() => setGroceryChecks({})}
                className="text-red-600 dark:text-red-400 font-bold hover:underline"
              >
                {tr("सभी चेक मार्क हटाएं (Reset All)", "सर्व चेक निशाण्या काढा (Reset All)", "Clear Checkmarks")}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 4: PREGNANCY SAFETY RED FLAGS (Safe Food Checker)
         ───────────────────────────────────────────────────────────── */}
      {activeTab === 'safety' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
            
            {/* Header */}
            <div className="pb-6 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/60 px-3 py-1 rounded-full uppercase tracking-wider border border-red-200 dark:border-red-900/50">
                {tr("खाद्य सुरक्षा एवं रेड फ्लैग्स", "अन्न सुरक्षा आणि धोक्याच्या सूचना", "Pregnancy Food Safety & Red Flags")}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">
                {tr("क्या न खाएं — सुरक्षित भोजन जांचकर्ता (Safe Food Checker)", "काय खाऊ नये — सुरक्षित अन्न तपासक (Safe Food Checker)", "What to Avoid — Pregnancy Safe Food Checker")}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
                {tr(
                  "गर्भावस्था में कुछ खाद्य पदार्थ संक्रमण, संकुचन या भ्रूण के लिए जोखिम पैदा कर सकते हैं। किसी भी भोजन की सुरक्षा तुरंत जांचें:",
                  "गरोदरपणात काही अन्नपदार्थ संसर्ग, आकुंचन किंवा बाळासाठी धोका निर्माण करू शकतात. कोणत्याही अन्नाची सुरक्षितता त्वरित तपासा:",
                  "Certain foods carry bacterial, chemical, or contraction risks during pregnancy. Check safety guidelines instantly:"
                )}
              </p>

              {/* Search & Filter Bar */}
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={safetySearch}
                    onChange={e => setSafetySearch(e.target.value)}
                    placeholder={tr(
                      "कोई भी भोजन खोजें (जैसे: पपीता, अनानास, चाय, अंडा, दूध, मछली)...",
                      "कोणताही अन्नपदार्थ शोधा (उदा. पपई, अननस, चहा, अंडे, दूध, मासे)...",
                      "Search any food (e.g., Papaya, Pineapple, Tea, Eggs)..."
                    )}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-2xl text-xs focus:ring-2 focus:ring-red-400 outline-none"
                  />
                  {safetySearch && (
                    <button onClick={() => setSafetySearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Filter Pills */}
                <div className="flex bg-slate-100 dark:bg-slate-800 rounded-2xl p-1 gap-1">
                  {[
                    { id: 'all', labelHi: 'सभी (All)', labelMr: 'सर्व (All)', labelEn: 'All' },
                    { id: 'avoid', labelHi: '🛑 कड़ा परहेज (Avoid)', labelMr: '🛑 पूर्णपणे टाळा (Avoid)', labelEn: '🛑 Avoid' },
                    { id: 'caution', labelHi: '⚠️ सीमित (Caution)', labelMr: '⚠️ मर्यादित (Caution)', labelEn: '⚠️ Caution' },
                    { id: 'safe', labelHi: '✅ सुरक्षित (Safe)', labelMr: '✅ सुरक्षित (Safe)', labelEn: '✅ Safe' }
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setSafetyCategory(f.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                        safetyCategory === f.id
                          ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                      }`}
                    >
                      {tr(f.labelHi, f.labelMr, f.labelEn)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Safety Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {filteredSafetyData.map((item) => {
                const isAvoid = item.status === 'avoid';
                const isCaution = item.status === 'caution';
                const isSafe = item.status === 'safe';

                return (
                  <div
                    key={item.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      isAvoid
                        ? 'bg-red-50/70 dark:bg-red-950/20 border-red-200/90 dark:border-red-900/40'
                        : isCaution
                          ? 'bg-amber-50/70 dark:bg-amber-950/20 border-amber-200/90 dark:border-amber-900/40'
                          : 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200/90 dark:border-emerald-900/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                        isAvoid
                          ? 'bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 border-red-300 dark:border-red-800'
                          : isCaution
                            ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                            : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                      }`}>
                        {item.riskLevel}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">{item.category}</span>
                    </div>

                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 mt-1">
                      {item.name}
                    </h4>

                    {/* Medical Reason */}
                    <div className="mt-2.5 p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-xs">
                      <span className="font-bold text-slate-700 dark:text-slate-200 block mb-0.5">
                        {tr("चिकित्सकीय कारण (Why avoid):", "वैद्यकीय कारण (टाळण्याचे कारण):", "Medical Reason:")}
                      </span>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {isHindi || isMarathi ? item.reasonHi : item.reason}
                      </p>
                    </div>

                    {/* Safe Alternative */}
                    <div className="mt-2 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                      <span className="font-bold text-[#157F66] dark:text-teal-400 shrink-0">
                        {tr("सुरक्षित विकल्प:", "सुरक्षित पर्याय:", "Safe Alternative:")}
                      </span>
                      <span>{isHindi || isMarathi ? item.safeAlternativeHi : item.safeAlternative}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredSafetyData.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <Search className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-xs font-semibold">{tr("कोई मिलान नहीं मिला।", "काहीही सापडले नाही.", "No matching items found.")}</p>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
