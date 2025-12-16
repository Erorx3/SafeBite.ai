import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeImage, analyzeText } from '../services/gemini';
import { saveResult } from '../services/storage';

const CATEGORIES = [
  { 
    id: 'liquid', 
    name: 'Liquid Essentials', 
    subtext: 'Milk, Oil, Honey, Ghee',
    icon: 'water_drop' 
  },
  { 
    id: 'produce', 
    name: 'Fresh Produce', 
    subtext: 'Fruits & Vegetables',
    icon: 'nutrition' 
  },
  { 
    id: 'pantry', 
    name: 'Spices & Pantry', 
    subtext: 'Powders, Pulses, Grains',
    icon: 'grain' 
  },
  { 
    id: 'packaged', 
    name: 'Packaged Goods', 
    subtext: 'Labels, Cans, Snacks',
    icon: 'inventory_2' 
  }
];

export const UploadPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'image' | 'text'>('image');
  const [category, setCategory] = useState('liquid'); // Category ID
  
  // File State
  const [file, setFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState('');
  
  // Text State
  const [textInput, setTextInput] = useState('');

  // App State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkKey = async () => {
      if ("AIzaSyDznScDqU2hVade6i5ODLnYXlQrhx-29N0") {
        setHasApiKey(true);
      } else if (window.aistudio && window.aistudio.hasSelectedApiKey) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(selected);
      } else {
        setHasApiKey(false);
      }
    };
    checkKey();
  }, []);

  const handleConnectKey = async () => {
    if (window.aistudio && window.aistudio.openSelectKey) {
      try {
        await window.aistudio.openSelectKey();
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(selected);
        setError(null);
      } catch (e) {
        console.error(e);
      }
    } else {
      alert("AI Studio key selection is not available.");
    }
  };

  // Image Handlers
  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setAdditionalNotes('');
      setError(null);
      setShowModal(true); // Open modal immediately
    } else {
      setError('Please upload an image file (JPG, PNG).');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) handleFileSelect(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Analysis Trigger
  const runAnalysis = async () => {
    setIsAnalyzing(true);
    setError(null);
    try {
      let result;
      const catName = CATEGORIES.find(c => c.id === category)?.name || category;

      if (activeTab === 'image' && file) {
        result = await analyzeImage(file, catName, additionalNotes);
      } else if (activeTab === 'text' && textInput.trim()) {
        result = await analyzeText(textInput, catName);
      } else {
        throw new Error("Input missing");
      }

      saveResult(result);
      navigate(`/app/dashboard/${result.id}`, { state: { result } });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Analysis failed. Please try again.");
      setIsAnalyzing(false);
      setShowModal(false); // Close modal on error to show error msg
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in pb-12">
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">AI Food Forensics</h2>
        <p className="text-slate-500 max-w-lg mx-auto">
          Detect adulteration using computer vision or text-based ingredient analysis grounded in Google Search.
        </p>
      </div>

      {!hasApiKey && (
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
               <span className="material-symbols-outlined">key</span>
             </div>
             <div>
               <h4 className="font-semibold text-slate-900 text-sm">Action Required</h4>
               <p className="text-xs text-slate-500">Connect Google Gemini API key to enable live analysis.</p>
             </div>
          </div>
          <button onClick={handleConnectKey} className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-black transition-colors">
            Connect Key
          </button>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
           <span className="material-symbols-outlined text-red-500">error</span>
           <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-card border border-slate-200 overflow-hidden">
        
        {/* Category Selection */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 ml-1">
            1. Select Food Category
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 relative overflow-hidden
                  ${category === cat.id 
                    ? 'bg-white border-emerald-500 text-emerald-700 shadow-md ring-1 ring-emerald-500' 
                    : 'bg-white border-slate-200 text-slate-500 hover:border-emerald-300 hover:bg-emerald-50/30'}
                `}
              >
                <span className="material-symbols-outlined text-2xl mb-1">{cat.icon}</span>
                <span className="font-semibold text-sm">{cat.name}</span>
                <span className="text-[10px] opacity-70 mt-0.5 hidden sm:block">{cat.subtext}</span>
                {category === cat.id && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Input Method Tabs */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('image')}
            className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors
              ${activeTab === 'image' 
                ? 'text-slate-900 border-b-2 border-slate-900 bg-white' 
                : 'text-slate-500 bg-slate-50 hover:bg-slate-100'}
            `}
          >
            <span className="material-symbols-outlined text-[20px]">image_search</span>
            Visual Scan
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors
              ${activeTab === 'text' 
                ? 'text-slate-900 border-b-2 border-slate-900 bg-white' 
                : 'text-slate-500 bg-slate-50 hover:bg-slate-100'}
            `}
          >
            <span className="material-symbols-outlined text-[20px]">edit_note</span>
            Text Analysis
          </button>
        </div>

        {/* Content Area */}
        <div className="p-8 min-h-[300px] flex flex-col justify-center">
          {activeTab === 'image' ? (
            <div className="space-y-4">
              <label className="block text-center space-y-4">
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`w-full h-64 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all
                    ${isDragging 
                      ? 'border-emerald-500 bg-emerald-50 scale-[1.01]' 
                      : 'border-slate-300 bg-slate-50 hover:bg-white hover:border-emerald-400'}
                  `}
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                     <span className="material-symbols-outlined text-3xl text-emerald-600">cloud_upload</span>
                  </div>
                  <p className="text-slate-900 font-medium">Drag & drop or click to upload</p>
                  <p className="text-sm text-slate-500 mt-1">Supports JPG, PNG (Max 5MB)</p>
                </div>
              </label>
            </div>
          ) : (
            <div className="space-y-6">
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-2">Describe the Product or Issue</label>
                 <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="E.g., 'Honey that dissolves instantly in cold water' or paste an ingredient list here..."
                    className="w-full h-48 rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 resize-none p-4 text-slate-900 placeholder:text-slate-400 text-base"
                 ></textarea>
                 <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                   <span className="material-symbols-outlined text-[14px]">tips_and_updates</span>
                   AI will cross-reference your description with common adulteration methods on Google Search.
                 </p>
               </div>
               <button 
                onClick={runAnalysis}
                disabled={!textInput.trim() || isAnalyzing}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 rounded-xl font-bold shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
               >
                 {isAnalyzing ? (
                   <span className="material-symbols-outlined animate-spin">progress_activity</span>
                 ) : (
                   <>Start Text Analysis <span className="material-symbols-outlined">arrow_forward</span></>
                 )}
               </button>
            </div>
          )}
        </div>
      </div>

      {/* Image Preview & Notes Modal */}
      {showModal && file && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-slide-up">
            <div className="relative h-56 bg-slate-100">
              <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-contain" />
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Add Context (Optional)</h3>
              <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="E.g., 'Smells like chemicals', 'Bought from street vendor', etc."
                  className="w-full h-24 rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 text-sm"
                ></textarea>
              </div>
              
              <button 
                onClick={runAnalysis}
                disabled={isAnalyzing}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 rounded-xl font-bold shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-70 transition-all"
              >
                {isAnalyzing ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    Analyzing
                  </>
                ) : (
                  <>
                    Confirm & Analyze
                    <span className="material-symbols-outlined">rocket_launch</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};