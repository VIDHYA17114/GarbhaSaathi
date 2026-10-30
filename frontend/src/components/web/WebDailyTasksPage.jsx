import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckSquare,
  Square,
  Clock,
  SkipForward,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  RotateCcw,
  Info,
  Sparkles,
  Leaf,
  Droplets,
  Pill,
  BookOpen,
  Calendar,
  Heart
} from 'lucide-react';

const CATEGORY_META = {
  nutrition:    { icon: '🍽️', color: 'orange',  label: { hi: 'पोषण', mr: 'पोषण', en: 'Nutrition' } },
  hydration:    { icon: '💧', color: 'blue',    label: { hi: 'जलयोजन', mr: 'पाणी / हायड्रेशन', en: 'Hydration' } },
  medicine:     { icon: '💊', color: 'violet',  label: { hi: 'दवा', mr: 'औषध', en: 'Medicine' } },
  wellness:     { icon: '🧘', color: 'teal',    label: { hi: 'वेलनेस', mr: 'आरोग्य / वेलनेस', en: 'Wellness' } },
  education:    { icon: '📖', color: 'indigo',  label: { hi: 'शिक्षा', mr: 'माहिती / शिक्षण', en: 'Education' } },
  appointment:  { icon: '📅', color: 'rose',    label: { hi: 'अपॉइंटमेंट', mr: 'अपॉइंटमेंट', en: 'Appointment' } },
  custom:       { icon: '⭐', color: 'amber',   label: { hi: 'कस्टम', mr: 'इतर', en: 'Custom' } }
};

const STATUS_STYLES = {
  done:       'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 opacity-90',
  skipped:    'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-70',
  postponed:  'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800',
  pending:    'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-teal-300'
};

function TaskCard({ task, language, onStatus, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';
  const tr = (hi, mr, en) => isMarathi ? (mr || hi) : (isHindi ? hi : en);
  const label = isMarathi ? (task.textMr || task.textHi || task.text) : (isHindi ? task.textHi : task.text);
  const cat = CATEGORY_META[task.category] || CATEGORY_META.custom;

  const handleSaveEdit = () => {
    if (editText.trim()) {
      onEdit(task.id, editText);
      setEditing(false);
    }
  };

  return (
    <div className={`p-4 rounded-2xl border transition ${STATUS_STYLES[task.status] || STATUS_STYLES.pending}`}>
      <div className="flex items-start gap-3">

        {/* Status Toggle Button */}
        <button
          onClick={() => onStatus(task.id, task.status === 'done' ? 'pending' : 'done')}
          className={`shrink-0 mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center border-2 transition ${
            task.status === 'done'
              ? 'bg-[#157F66] border-[#157F66] text-white'
              : 'border-slate-300 hover:border-[#157F66]'
          }`}
        >
          {task.status === 'done' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          {editing ? (
            <div className="flex gap-2">
              <input
                autoFocus
                value={editText}
                onChange={e => setEditText(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSaveEdit(); if (e.key === 'Escape') setEditing(false); }}
                className="flex-1 px-3 py-1.5 bg-white border border-[#157F66] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-teal-300"
              />
              <button onClick={handleSaveEdit} className="p-1.5 bg-[#157F66] text-white rounded-lg">
                <Check className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setEditing(false)} className="p-1.5 bg-slate-100 text-slate-600 rounded-lg">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-semibold ${task.status === 'done' ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                  {label}
                </span>
                {task.isOptional && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-full font-medium">
                    {tr('ऐच्छिक', 'ऐच्छिक', 'Optional')}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <span>{cat.icon}</span>
                  <span>{tr(cat.label.hi, cat.label.mr, cat.label.en)}</span>
                </span>
                {task.status === 'skipped' && (
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                    {tr('छोड़ा', 'वगळले', 'Skipped')}
                  </span>
                )}
                {task.status === 'postponed' && (
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full">
                    {tr('स्थगित', 'पुढे ढकलले', 'Postponed')}
                  </span>
                )}
                {task.note && (
                  <span className="text-[10px] text-slate-400 italic">{task.note}</span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        {!editing && (
          <div className="flex items-center gap-1 shrink-0">
            {/* Skip */}
            {task.status === 'pending' && (
              <button
                onClick={() => onStatus(task.id, 'skipped')}
                title={tr('छोड़ें', 'वगळा', 'Skip')}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            )}
            {/* Postpone */}
            {task.status === 'pending' && (
              <button
                onClick={() => onStatus(task.id, 'postponed')}
                title={tr('बाद में करें', 'नंतर करा', 'Postpone')}
                className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-lg transition"
              >
                <Clock className="w-3.5 h-3.5" />
              </button>
            )}
            {/* Restore if skipped/postponed */}
            {(task.status === 'skipped' || task.status === 'postponed') && (
              <button
                onClick={() => onStatus(task.id, 'pending')}
                title={tr('वापस लाएं', 'पूर्ववत करा', 'Restore')}
                className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950/40 rounded-lg transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
            {/* Edit (user tasks only) */}
            {task.isUserDefined && (
              <button
                onClick={() => setEditing(true)}
                title={tr('संपादित करें', 'संपादित करा', 'Edit')}
                className="p-1.5 text-slate-400 hover:text-[#157F66] hover:bg-teal-50 dark:hover:bg-teal-950/40 rounded-lg transition"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            )}
            {/* Delete (user tasks only) */}
            {task.isUserDefined && (
              <button
                onClick={() => onDelete(task.id)}
                title={tr('हटाएं', 'हटवा', 'Delete')}
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function WebDailyTasksPage({ setActivePage }) {
  const { tasks, setTaskStatus, addUserTask, editUserTask, deleteUserTask, resetAllTasks, language, pregnancyProgress } = useApp();
  const [newTaskText, setNewTaskText] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';
  const tr = (hi, mr, en) => isMarathi ? (mr || hi) : (isHindi ? hi : en);

  const done = tasks.filter(t => t.status === 'done').length;
  const total = tasks.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const handleAdd = () => {
    if (!newTaskText.trim()) return;
    addUserTask(newTaskText);
    setNewTaskText('');
    setShowAddForm(false);
  };

  const today = new Date();
  const dateStr = today.toLocaleDateString(isMarathi ? 'mr-IN' : (isHindi ? 'hi-IN' : 'en-IN'), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 py-8 space-y-6 animate-in fade-in duration-300 text-left">

      {/* Page Header */}
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors duration-200">
        <div>
          <span className="text-xs font-bold text-[#157F66] dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full uppercase tracking-wider">
            {tr('आज की स्व-देखभाल सूची', 'आजची स्वतःची काळजी यादी', 'Daily Self-Care Checklist')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">
            {tr('दैनिक कार्य', 'दैनिक कामे', 'Daily Tasks')}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{dateStr}</p>
          {pregnancyProgress?.week && (
            <p className="text-xs text-[#157F66] dark:text-teal-400 font-semibold mt-1">
              {tr(
                `अनुमानित सप्ताह ${pregnancyProgress.week} — ${pregnancyProgress.trimesterLabels?.hi || ''}`,
                `अंदाजे आठवडा ${pregnancyProgress.week} — ${pregnancyProgress.trimesterLabels?.mr || pregnancyProgress.trimesterLabels?.hi || ''}`,
                `Estimated Week ${pregnancyProgress.week} — ${pregnancyProgress.trimesterLabels?.en || ''}`
              )}
            </p>
          )}
        </div>

        {/* Progress Circle */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <div className="relative w-20 h-20">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32" fill="none" stroke="#e2e8f0" strokeWidth="8" className="dark:stroke-slate-700" />
              <circle
                cx="40" cy="40" r="32" fill="none"
                stroke="#157F66" strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 32}`}
                strokeDashoffset={`${2 * Math.PI * 32 * (1 - pct / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-500 dark:stroke-teal-400"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-black text-[#157F66] dark:text-teal-400">{pct}%</span>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{done}/{total} {tr('पूर्ण', 'पूर्ण', 'done')}</span>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-2xl text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
        <Info className="w-4 h-4 shrink-0 mt-0.5 text-blue-500 dark:text-blue-400" />
        <p>
          {tr(
            'यह सूची स्व-देखभाल के लिए एक सहायक मार्गदर्शिका है। कोई भी कार्य छूट जाना सामान्य है — आप अच्छा कर रही हैं। दवाइयां केवल अपने डॉक्टर की सलाह से लें।',
            'ही यादी स्वतःच्या काळजीसाठी एक उपयुक्त मार्गदर्शिका आहे. एखादे काम राहून गेले तरी काळजी करू नका — तुम्ही उत्तम करत आहात. औषधे फक्त डॉक्टरांच्या सल्ल्यानेच घ्या.',
            'This checklist is a self-care guide. Missing a task is completely normal — you are doing great. Only take medicines as confirmed by your healthcare provider.'
          )}
        </p>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100">
            {tr('आज के कार्य', 'आजची कामे', "Today's Tasks")}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddForm(v => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#157F66] hover:bg-[#0e5947] text-white rounded-xl text-xs font-bold shadow-sm transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{tr('कार्य जोड़ें', 'काम जोडा', 'Add Task')}</span>
            </button>
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{tr('रीसेट करें', 'रीसेट करा', 'Reset')}</span>
            </button>
          </div>
        </div>

        {/* Add Task Form */}
        {showAddForm && (
          <div className="p-4 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900 rounded-2xl flex gap-3 items-center">
            <input
              autoFocus
              type="text"
              value={newTaskText}
              onChange={e => setNewTaskText(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleAdd(); if (e.key === 'Escape') setShowAddForm(false); }}
              placeholder={tr('नया कार्य लिखें...', 'नवीन काम लिहा...', 'Write a new task...')}
              className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-800 border border-teal-300 dark:border-teal-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <button onClick={handleAdd} className="px-4 py-2.5 bg-[#157F66] text-white rounded-xl text-xs font-bold hover:bg-[#0e5947] transition">
              {tr('जोड़ें', 'जोडा', 'Add')}
            </button>
            <button onClick={() => setShowAddForm(false)} className="p-2.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Reset Confirmation */}
        {showResetConfirm && (
          <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-2xl flex flex-wrap items-center gap-3">
            <span className="text-xs text-amber-800 dark:text-amber-200 font-semibold flex-1">
              {tr('सभी कार्यों की स्थिति रीसेट होगी। क्या जारी रखें?', 'सर्व कामांची स्थिती पूर्ववत होईल. पुढे जायचे का?', 'Reset all task statuses to pending. Continue?')}
            </span>
            <button
              onClick={() => { resetAllTasks(); setShowResetConfirm(false); }}
              className="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-700 transition"
            >
              {tr('हाँ, रीसेट करें', 'होय, रीसेट करा', 'Yes, Reset')}
            </button>
            <button
              onClick={() => setShowResetConfirm(false)}
              className="px-4 py-2 bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-200 rounded-xl text-xs font-bold transition"
            >
              {tr('रद्द करें', 'रद्द करा', 'Cancel')}
            </button>
          </div>
        )}

        {/* Pending Tasks */}
        {tasks.filter(t => t.status === 'pending').length > 0 && (
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
              {tr('बाकी कार्य', 'उर्वरित कामे', 'Pending')}
            </span>
            {tasks.filter(t => t.status === 'pending').map(task => (
              <TaskCard
                key={task.id}
                task={task}
                language={language}
                onStatus={setTaskStatus}
                onEdit={editUserTask}
                onDelete={deleteUserTask}
              />
            ))}
          </div>
        )}

        {/* Postponed Tasks */}
        {tasks.filter(t => t.status === 'postponed').length > 0 && (
          <div className="space-y-2 mt-2">
            <span className="text-[11px] font-bold text-amber-500 uppercase tracking-wider px-1">
              {tr('स्थगित कार्य', 'पुढे ढकललेली कामे', 'Postponed')}
            </span>
            {tasks.filter(t => t.status === 'postponed').map(task => (
              <TaskCard
                key={task.id}
                task={task}
                language={language}
                onStatus={setTaskStatus}
                onEdit={editUserTask}
                onDelete={deleteUserTask}
              />
            ))}
          </div>
        )}

        {/* Completed Tasks */}
        {tasks.filter(t => t.status === 'done').length > 0 && (
          <div className="space-y-2 mt-2">
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider px-1">
              {tr('पूर्ण कार्य ✓', 'पूर्ण झालेली कामे ✓', 'Completed ✓')}
            </span>
            {tasks.filter(t => t.status === 'done').map(task => (
              <TaskCard
                key={task.id}
                task={task}
                language={language}
                onStatus={setTaskStatus}
                onEdit={editUserTask}
                onDelete={deleteUserTask}
              />
            ))}
          </div>
        )}

        {/* Skipped Tasks */}
        {tasks.filter(t => t.status === 'skipped').length > 0 && (
          <div className="space-y-2 mt-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
              {tr('छोड़े गए कार्य', 'वगळलेली कामे', 'Skipped')}
            </span>
            {tasks.filter(t => t.status === 'skipped').map(task => (
              <TaskCard
                key={task.id}
                task={task}
                language={language}
                onStatus={setTaskStatus}
                onEdit={editUserTask}
                onDelete={deleteUserTask}
              />
            ))}
          </div>
        )}

        {tasks.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <CheckSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm font-semibold">{tr('कोई कार्य नहीं। ऊपर जोड़ें।', 'अद्याप कोणतीही कामे नाहीत. वर जोडा.', 'No tasks yet. Add one above.')}</p>
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <button
          onClick={() => setActivePage('nutrition')}
          className="p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-left hover:border-teal-300 hover:shadow-sm transition group"
        >
          <span className="text-2xl block mb-2">🍽️</span>
          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 group-hover:text-[#157F66] dark:group-hover:text-teal-400">
            {tr('पोषण योजना', 'पोषण योजना', 'Nutrition Plan')}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {tr('भोजन सुझाव और रसोई सामग्री देखें', 'आहाराच्या सूचना आणि स्वयंपाकघरातील साहित्य पहा', 'View meal suggestions and ingredients')}
          </p>
        </button>
        <button
          onClick={() => setActivePage('wellness')}
          className="p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-left hover:border-teal-300 hover:shadow-sm transition group"
        >
          <span className="text-2xl block mb-2">🧘</span>
          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 group-hover:text-[#157F66] dark:group-hover:text-teal-400">
            {tr('मन व मूड', 'मन आणि मनस्थिती', 'Mind & Mood')}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {tr('मूड चेक-इन और वेलनेस सामग्री', 'मूड तपासणी आणि निरोगी साहित्य', 'Mood check-in and wellness content')}
          </p>
        </button>
        <button
          onClick={() => setActivePage('records')}
          className="p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-left hover:border-teal-300 hover:shadow-sm transition group"
        >
          <span className="text-2xl block mb-2">📅</span>
          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 group-hover:text-[#157F66] dark:group-hover:text-teal-400">
            {tr('अपॉइंटमेंट और रिकॉर्ड', 'वैद्यकीय नोंदी आणि स्मरणपत्रे', 'Records & Reminders')}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {tr('जांच और दवा रिमाइंडर', 'तपासण्या आणि औषध स्मरणपत्रे', 'Appointments and medicine reminders')}
          </p>
        </button>
      </div>
    </div>
  );
}
