import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { nutritionDatabase } from '../data/nutritionDatabase';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';

export default function Screen11_BudgetFoodAvailability() {
  const { setCurrentScreen, budgetTier, setBudgetTier, availableFoods, setAvailableFoods, language, t } = useApp();
  const [selectedBudget, setSelectedBudget] = useState(budgetTier || 'medium');
  const [pantry, setPantry] = useState(availableFoods || ['Rice', 'Wheat', 'Milk', 'Dal', 'Vegetables']);

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';

  const allPantryItems = [
    { id: 'Rice', label: isHindi ? 'चावल (Rice)' : 'Rice' },
    { id: 'Wheat', label: isHindi ? 'गेहूं / आटा (Wheat)' : 'Wheat' },
    { id: 'Milk', label: isHindi ? 'दूध / दही (Milk)' : 'Milk' },
    { id: 'Egg', label: isHindi ? 'अंडे (Egg)' : 'Egg' },
    { id: 'Vegetables', label: isHindi ? 'सब्जियां (Vegetables)' : 'Vegetables' },
    { id: 'Fruits', label: isHindi ? 'फल (Fruits)' : 'Fruits' },
    { id: 'Dal', label: isHindi ? 'दालें (Dal)' : 'Dal' },
    { id: 'Other', label: isHindi ? 'अन्य (Other)' : 'Other' }
  ];

  const togglePantryItem = (item) => {
    setPantry(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleGetSuggestions = () => {
    setBudgetTier(selectedBudget);
    setAvailableFoods(pantry);
    setCurrentScreen(10); // return to meal plan with updated choices
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-4 bg-[#FAF9F5] text-left select-none overflow-y-auto no-scrollbar pb-6">
      <div>
        {/* Top Header */}
        <div className="flex items-center gap-3 pb-2">
          <button
            onClick={() => setCurrentScreen(10)}
            className="p-1.5 -ml-1.5 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-sm font-bold text-slate-800">
            {t.budgetTitle}
          </h2>
        </div>

        {/* Budget Pills [Low (₹)] [Medium (₹₹)] [High (₹₹₹)] (Matching Mockup 11) */}
        <div className="grid grid-cols-3 gap-2 my-2">
          <button
            onClick={() => setSelectedBudget('low')}
            className={`py-2 px-1 rounded-2xl text-xs font-bold transition text-center ${
              selectedBudget === 'low'
                ? 'bg-[#157F66] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700'
            }`}
          >
            {t.lowBudget}
          </button>
          <button
            onClick={() => setSelectedBudget('medium')}
            className={`py-2 px-1 rounded-2xl text-xs font-bold transition text-center ${
              selectedBudget === 'medium'
                ? 'bg-[#157F66] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700'
            }`}
          >
            {t.mediumBudget}
          </button>
          <button
            onClick={() => setSelectedBudget('high')}
            className={`py-2 px-1 rounded-2xl text-xs font-bold transition text-center ${
              selectedBudget === 'high'
                ? 'bg-[#157F66] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700'
            }`}
          >
            {t.highBudget}
          </button>
        </div>

        {/* Available Food At Home Section (Matching Mockup 11) */}
        <div className="mt-4 bg-white p-3.5 rounded-3xl border border-slate-100 shadow-xs">
          <h3 className="font-bold text-xs text-slate-800 mb-2.5">
            {t.availableFood}
          </h3>

          <div className="grid grid-cols-3 gap-2">
            {allPantryItems.map((item) => {
              const isChecked = pantry.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => togglePantryItem(item.id)}
                  className={`p-2 rounded-xl border text-xs font-medium flex items-center justify-between transition ${
                    isChecked
                      ? 'bg-teal-50/80 border-[#157F66] text-[#157F66]'
                      : 'bg-slate-50/70 border-slate-200 text-slate-600'
                  }`}
                >
                  <span className="truncate">{item.id}</span>
                  <div
                    className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center shrink-0 ml-1 ${
                      isChecked ? 'bg-[#157F66] text-white' : 'border border-slate-300'
                    }`}
                  >
                    {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleGetSuggestions}
            className="w-full mt-3.5 py-2.5 bg-[#157F66] hover:bg-[#0e5947] text-white rounded-2xl font-bold text-xs shadow-md shadow-teal-700/20 transition active:scale-98"
          >
            {t.getSuggestions}
          </button>
        </div>

        {/* "Suggestions for you" Grid (Matching Mockup 11) */}
        <div className="mt-5">
          <h3 className="font-bold text-xs text-slate-800 mb-2.5">
            {t.suggestionsForYou}
          </h3>

          <div className="grid grid-cols-3 gap-2">
            {nutritionDatabase.categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white p-2.5 rounded-2xl border border-slate-100 shadow-xs flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-50/60 border border-orange-100 flex items-center justify-center text-2xl mb-1.5 shadow-2xs">
                  {cat.icon}
                </div>
                <span className="text-[10px] font-bold text-slate-700 leading-tight">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
