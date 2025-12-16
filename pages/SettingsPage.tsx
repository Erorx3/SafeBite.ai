import React, { useState, useEffect } from 'react';
import { getSettings, saveSettings } from '../services/storage';

export const SettingsPage: React.FC = () => {
  const [sensitivity, setSensitivity] = useState(85);
  const [detectArtificial, setDetectArtificial] = useState(true);
  const [analyzeTexture, setAnalyzeTexture] = useState(true);
  const [freshnessIndex, setFreshnessIndex] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const s = getSettings();
    setSensitivity(s.sensitivity);
    setDetectArtificial(s.detectArtificialColors);
    setAnalyzeTexture(s.analyzeTexture);
    setFreshnessIndex(s.freshnessIndex);
  }, []);

  const handleSave = () => {
    saveSettings({
      sensitivity,
      detectArtificialColors: detectArtificial,
      analyzeTexture,
      freshnessIndex
    });
    setMessage("Settings saved successfully");
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 animate-fade-in relative">
      {message && (
        <div className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-fade-in flex items-center gap-2 z-50">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          {message}
        </div>
      )}
      <aside className="py-6 px-2 lg:col-span-3 lg:py-0 lg:px-0">
        <nav className="space-y-1">
          <a className="bg-white text-gray-900 hover:bg-gray-50 group rounded-md px-3 py-2 flex items-center text-sm font-medium shadow-sm ring-1 ring-gray-200 border-l-4 border-gray-900" href="#">
            <span className="material-symbols-outlined mr-3 text-[20px] text-gray-900">person</span>
            <span className="truncate">Profile & Settings</span>
          </a>
          <a className="text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm group rounded-md px-3 py-2 flex items-center text-sm font-medium transition-all" href="#">
            <span className="material-symbols-outlined mr-3 text-[20px] text-gray-400 group-hover:text-gray-500">lock</span>
            <span className="truncate">Security</span>
          </a>
          <a className="text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm group rounded-md px-3 py-2 flex items-center text-sm font-medium transition-all" href="#">
            <span className="material-symbols-outlined mr-3 text-[20px] text-gray-400 group-hover:text-gray-500">tune</span>
            <span className="truncate">Preferences</span>
          </a>
        </nav>
      </aside>

      <main className="lg:col-span-9">
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
          <div className="px-4 py-6 sm:p-8">
            <div className="flex items-start justify-between border-b border-gray-100 pb-8 mb-8">
              <div>
                <h2 className="text-xl font-semibold leading-7 text-gray-900">Profile Settings</h2>
                <p className="mt-1 text-sm leading-6 text-gray-500">Update your personal information and application preferences.</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">Pro Account</span>
              </div>
            </div>

            <div className="flex items-center gap-x-8 mb-10">
              <div className="size-20 rounded-full overflow-hidden bg-gray-100 ring-4 ring-gray-50">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBA_OoR84Mf7ApNCBsPEU0yA30tEDr78hpYIDDD3Lu-UpRr1V8xCpOGDMqMel2dCDMtzI-7xYNOETuYEGiPVuWL2-hd8IRdYAkMJ9T7a0Rj8ExQY1Af-nZtPyyMvuZ1lGvGlS3kxszF6myVku5zuoaQ9H8k9naU6r9mBERiaquYVgWTyiqO1SPN6PfL-IrCHCFoqeoi0vHQnzLa3JBsjiYlmmbEYzOi8xU8KX11ozmH500qpxz_np-oSfmK26kyCDa6WpqNTUnqx0Q")' }}></div>
              </div>
              <div>
                <button className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors" type="button">
                    Change avatar
                </button>
                <p className="mt-2 text-xs leading-5 text-gray-500">JPG, GIF or PNG. 1MB max.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <h3 className="text-sm font-medium leading-6 text-gray-900 mb-5 flex items-center gap-2">
                  <span className="material-symbols-outlined text-gray-400 text-[18px]">badge</span>
                  Personal Details
                </h3>
                <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <label className="block text-sm font-medium leading-6 text-gray-700">Full Name</label>
                    <div className="mt-2">
                      <input className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 bg-gray-50/50 focus:bg-white transition-all" type="text" defaultValue="Sarah Chen"/>
                    </div>
                  </div>
                  <div className="sm:col-span-1">
                    <label className="block text-sm font-medium leading-6 text-gray-700">Email address</label>
                    <div className="mt-2">
                      <input className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 bg-gray-50/50 focus:bg-white transition-all" type="email" defaultValue="sarah.chen@safebite.ai"/>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="sm:col-span-6 border-gray-100 my-2"/>

              <div className="sm:col-span-6">
                <h3 className="text-sm font-medium leading-6 text-gray-900 mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-gray-400 text-[18px]">tune</span>
                  AI Configuration
                </h3>
                
                <div className="bg-gray-50 rounded-lg p-5 mb-6 border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-900">Sensitivity Threshold</label>
                      <span className="text-xs text-gray-500">Adjusts the strictness of the detection algorithm.</span>
                    </div>
                    <span className="inline-flex items-center rounded-md bg-white px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-300 font-mono">{sensitivity}%</span>
                  </div>
                  <div className="relative w-full h-6 flex items-center">
                    <input 
                      className="w-full absolute z-20 opacity-0 cursor-pointer h-full" 
                      max="100" 
                      min="1" 
                      type="range" 
                      value={sensitivity} 
                      onChange={(e) => setSensitivity(Number(e.target.value))}
                    />
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden relative z-10">
                      <div className="h-full bg-gray-900 rounded-full" style={{ width: `${sensitivity}%` }}></div>
                    </div>
                    <div className="absolute w-4 h-4 bg-white border-2 border-gray-900 rounded-full z-10 -ml-2 shadow-sm pointer-events-none transition-all" style={{ left: `${sensitivity}%` }}></div>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase tracking-wider text-gray-400 mt-2 font-medium">
                    <span>Balanced</span>
                    <span>Strict</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-1">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700">Detect Artificial Colors</span>
                      <span className="text-xs text-gray-500">Flags non-natural color spectrums in food items.</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={detectArtificial}
                        onChange={() => setDetectArtificial(!detectArtificial)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                    </label>
                  </div>
                  <div className="w-full h-px bg-gray-100"></div>
                  <div className="flex items-center justify-between py-1">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700">Analyze Texture Patterns</span>
                      <span className="text-xs text-gray-500">Deep scan for surface irregularities indicating spoilage.</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={analyzeTexture}
                        onChange={() => setAnalyzeTexture(!analyzeTexture)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                    </label>
                  </div>
                  <div className="w-full h-px bg-gray-100"></div>
                  <div className="flex items-center justify-between py-1">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700">Calculate Freshness Index</span>
                      <span className="text-xs text-gray-500">Experimental feature to estimate days until expiration.</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={freshnessIndex}
                        onChange={() => setFreshnessIndex(!freshnessIndex)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-4 border-t border-gray-900/10 bg-gray-50 px-4 py-4 sm:px-8">
            <button className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700 transition-colors" type="button">Cancel</button>
            <button 
              onClick={handleSave}
              className="rounded-md bg-gray-900 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors" 
              type="submit"
            >
              Save changes
            </button>
          </div>
        </div>

        <div className="mt-8 bg-white shadow-sm ring-1 ring-red-100 sm:rounded-xl overflow-hidden mb-12">
          <div className="px-4 py-6 sm:p-8">
            <h3 className="text-sm font-medium leading-6 text-red-600 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">warning</span>
              Danger Zone
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>Permanently remove your account and all of its contents. This action is not reversible, so please continue with caution.</p>
            </div>
            <div className="mt-5">
              <button className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-50 transition-colors" type="button">Delete account</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
