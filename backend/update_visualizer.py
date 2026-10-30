path = r'C:\Users\ASUS\GarbhaSaathi\frontend\src\components\web\Exercise3DVisualizer.jsx'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

norm = text.replace('\r\n', '\n')

# 1. State initialization
t1 = "const [displayMode, setDisplayMode] = useState('realGuide'); // 'realGuide' (photographic women guide) | '3d' (3D geometry)"
r1 = """const [displayMode, setDisplayMode] = useState(() => exercise?.illustrations ? 'main' : 'realGuide'); // 'main' | 'step' | 'realGuide' | '3d'

  // Sync displayMode when exercise changes
  useEffect(() => {
    if (exercise?.illustrations) {
      setDisplayMode('main');
    }
  }, [exercise?.id]);"""

# 2. handleStepClick
t2 = """  const handleStepClick = (index) => {
    setCurrentStepIndex(index);
    setCycleProgress((index / totalSteps) * 100);
  };"""
r2 = """  const handleStepClick = (index) => {
    setCurrentStepIndex(index);
    setCycleProgress((index / totalSteps) * 100);
    if (exercise?.illustrations) {
      setDisplayMode('step');
    }
  };"""

# 3. Viewport rendering
t3 = """        {/* Display Mode: Photographic Real Guidance of Pregnant Women OR 3D Kinetic Simulation */}
        {displayMode === 'realGuide' ? (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
            <div className="relative rounded-2xl overflow-hidden border border-teal-500/30 shadow-2xl bg-black/60 max-w-[360px] max-h-[220px]">
              <img
                src={exercise?.realImagePath || (exercise?.visualModel && `/exercise_poses/${exercise.visualModel}.jpg`) || "/pregnancy_yoga_guide.jpg"}
                alt={exercise?.title || "Realistic Pregnancy Yoga and Exercise Guidance"}
                className="w-full h-full object-cover max-h-[190px]"
                style={{
                  filter: 'contrast(1.05) brightness(0.95)'
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/pregnancy_yoga_guide.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-white font-bold">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  <span>{isMarathi ? (exercise?.titleMr || exercise?.titleHi) : (isHindi ? exercise?.titleHi : exercise?.title)}</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-teal-500/30 border border-teal-400/40 text-[10px] text-teal-200">
                  {exercise?.difficulty || 'Safe & Gentle'}
                </span>
              </div>
            </div>
            
            <p className="text-[10px] text-slate-400 mt-2 italic text-center max-w-sm">
              {tr(
                '* वास्तविक गर्भवती महिलांसाठी सुरक्षित प्रमाणित योगासने व शारीरिक हालचाली मार्गदर्शिका',
                '* वास्तविक गर्भवती महिलांसाठी सुरक्षित प्रमाणित योगासने व शारीरिक हालचाली मार्गदर्शिका',
                '* Real-world prenatal yoga guide for expectant mothers with medical modifications'
              )}
            </p>
          </div>
        ) : (
          /* Main 3D Render Model */
          renderVisualModel()
        )}"""

r3 = """        {/* Display Mode: AI Illustration Demonstration OR 3D Kinetic Simulation */}
        {displayMode !== '3d' ? (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-3 sm:p-4">
            <div className="relative rounded-2xl overflow-hidden border border-teal-500/30 shadow-2xl bg-black/70 max-w-[380px] w-full max-h-[225px] flex items-center justify-center">
              {(() => {
                const activeIllustrationSrc = exercise?.illustrations ? (
                  displayMode === 'step'
                    ? (exercise.illustrations.steps?.[currentStepIndex] || exercise.illustrations.main)
                    : exercise.illustrations.main
                ) : (
                  exercise?.realImagePath || (exercise?.visualModel && `/exercise_poses/${exercise.visualModel}.jpg`) || '/pregnancy_yoga_guide.jpg'
                );

                return (
                  <img
                    src={activeIllustrationSrc}
                    alt={exercise?.title || "Pregnancy Exercise Demonstration"}
                    className="w-full h-full object-contain max-h-[195px] transition-all duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = exercise?.realImagePath || '/pregnancy_yoga_guide.jpg';
                    }}
                  />
                );
              })()}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-white font-bold">
                <span className="flex items-center gap-1.5 truncate pr-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span className="truncate">
                    {displayMode === 'step' && currentStep ? (
                      `${tr('चरण', 'चरण', 'Step')} ${currentStepIndex + 1}: ${isMarathi ? (currentStep.titleMr || currentStep.titleHi) : (isHindi ? currentStep.titleHi : currentStep.title)}`
                    ) : (
                      isMarathi ? (exercise?.titleMr || exercise?.titleHi) : (isHindi ? exercise?.titleHi : exercise?.title)
                    )}
                  </span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-teal-500/30 border border-teal-400/40 text-[10px] text-teal-200 shrink-0">
                  {exercise?.illustrations ? (
                    displayMode === 'step' ? `Step ${currentStepIndex + 1}/${totalSteps}` : tr('मुख्य मुद्रा', 'मुख्य आसन', 'Main Pose')
                  ) : (
                    exercise?.difficulty || 'Safe & Gentle'
                  )}
                </span>
              </div>
            </div>
            
            <p className="text-[10px] text-slate-400 mt-2 italic text-center max-w-sm">
              {exercise?.illustrations ? (
                tr(
                  '* गर्भासाक्षी विशेष सचित्र योग मार्गदर्शिका (Prenatal Healthcare Illustration)',
                  '* गर्भासाक्षी सचित्र योग मार्गदर्शिका (Prenatal Healthcare Illustration)',
                  '* GarbhaSaathi Original Prenatal Healthcare Illustration Guide'
                )
              ) : (
                tr(
                  '* वास्तविक गर्भवती महिलांसाठी सुरक्षित प्रमाणित योगासने व शारीरिक हालचाली मार्गदर्शिका',
                  '* वास्तविक गर्भवती महिलांसाठी सुरक्षित प्रमाणित योगासने व शारीरिक हालचाली मार्गदर्शिका',
                  '* Real-world prenatal yoga guide for expectant mothers with medical modifications'
                )
              )}
            </p>
          </div>
        ) : (
          /* Main 3D Render Model */
          renderVisualModel()
        )}"""

# 4. View Switchers Controls
t4 = """          {/* Center: View Switchers (Real Woman Photographic Guide vs 3D Angle) */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs">
              <button
                onClick={() => setDisplayMode('realGuide')}
                className={`px-2.5 py-1 rounded-xl font-bold transition cursor-pointer ${
                  displayMode === 'realGuide' ? 'bg-[#157F66] text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                {tr('वास्तविक योग मुद्रा', 'वास्तविक योग मुद्रा', 'Real Photo Guide')}
              </button>
              <button
                onClick={() => setDisplayMode('3d')}
                className={`px-2.5 py-1 rounded-xl font-bold transition cursor-pointer ${
                  displayMode === '3d' ? 'bg-[#157F66] text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                {tr('3D मोशन', '3D गती', '3D Kinetic')}
              </button>
            </div>"""

r4 = """          {/* Center: View Switchers (Main Pose vs Step Breakdown vs 3D Angle) */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs">
              {exercise?.illustrations ? (
                <>
                  <button
                    onClick={() => setDisplayMode('main')}
                    className={`px-2.5 py-1 rounded-xl font-bold transition cursor-pointer ${
                      displayMode === 'main' ? 'bg-[#157F66] text-white shadow-xs' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tr('मुख्य आसन', 'मुख्य आसन', 'Main Pose')}
                  </button>
                  <button
                    onClick={() => setDisplayMode('step')}
                    className={`px-2.5 py-1 rounded-xl font-bold transition cursor-pointer ${
                      displayMode === 'step' ? 'bg-[#157F66] text-white shadow-xs' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tr('चरणबद्ध क्रम', 'चरणबद्ध क्रम', 'Step Sequence')}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setDisplayMode('realGuide')}
                  className={`px-2.5 py-1 rounded-xl font-bold transition cursor-pointer ${
                    displayMode === 'realGuide' ? 'bg-[#157F66] text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tr('वास्तविक योग मुद्रा', 'वास्तविक योग मुद्रा', 'Real Photo Guide')}
                </button>
              )}
              <button
                onClick={() => setDisplayMode('3d')}
                className={`px-2.5 py-1 rounded-xl font-bold transition cursor-pointer ${
                  displayMode === '3d' ? 'bg-[#157F66] text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                {tr('3D मोशन', '3D गती', '3D Kinetic')}
              </button>
            </div>"""

for target, repl in [(t1, r1), (t2, r2), (t3, r3), (t4, r4)]:
    if target in norm:
        norm = norm.replace(target, repl, 1)
        print("Replacement successful")
    else:
        print("Target not found:", target[:40])

crlf_text = norm.replace('\n', '\r\n')
with open(path, 'w', encoding='utf-8', newline='') as f:
    f.write(crlf_text)
print("Saved Exercise3DVisualizer.jsx successfully")
