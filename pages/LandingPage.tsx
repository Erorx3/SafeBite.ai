import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      <nav className="fixed w-full z-50 top-0 start-0 border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-6 py-4">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 group">
            <div className="bg-black text-white p-1.5 rounded-lg group-hover:bg-emerald-600 transition-colors shadow-md">
              <span className="material-symbols-outlined text-[20px] leading-none">health_and_safety</span>
            </div>
            <span className="self-center text-lg font-bold tracking-tight text-slate-900">SafeBite</span>
          </button>
          
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 ml-auto" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-slate-100 rounded-lg bg-slate-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
              <li>
                <button onClick={() => scrollToSection('how-it-works')} className="block py-2 px-3 text-slate-600 rounded hover:bg-slate-100 md:hover:bg-transparent md:hover:text-black md:p-0 transition-colors">Process</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('features')} className="block py-2 px-3 text-slate-600 rounded hover:bg-slate-100 md:hover:bg-transparent md:hover:text-black md:p-0 transition-colors">Features</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('technology')} className="block py-2 px-3 text-slate-600 rounded hover:bg-slate-100 md:hover:bg-transparent md:hover:text-black md:p-0 transition-colors">Technology</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-semibold tracking-wider uppercase text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-full shadow-sm animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            AI-Powered Detection
          </div>
          <h1 className="text-balance text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 animate-slide-up">
            Is your food <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">really safe?</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed font-light text-balance animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Verify freshness and detect adulteration instantly with SafeBite's advanced computer vision technology. Lab-grade analysis in your pocket.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link className="group px-8 py-3.5 bg-black text-white font-medium rounded-full hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2" to="/app/upload">
              <span className="material-symbols-outlined text-[20px] group-hover:rotate-12 transition-transform">upload_file</span>
              Analyze Now
            </Link>
          </div>
          <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-slate-100 border border-slate-200/60 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="aspect-[16/9] w-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDEjaw--AGcfRdMs9z-L1HuE3G3undqf8VF29YKhvYQOubmhc1QY6rqyiLf3AaVvoC5d5s1TGe_uxgepRCakq4eJzttUEBetl1vWzFSmp6vavWyXXRq58xMzXZghm_gMRDiCB0QUYgkq5tMuvF04DqFgjHdVvAB2uSQQU8M1c0ESTsv4i2Z84Q2U5zC-1lXTsYtfmGmsFp72Ww_7L89NusYoiiRO5OazZf9mj_8l7rkGgRkCPmV2WFMRwQmW3-Lfcdrde3Qp75jYgE")' }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 hidden md:flex justify-between items-end">
              <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20 flex items-center gap-3 animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <div className="bg-green-100 p-2 rounded-lg text-green-600">
                  <span className="material-symbols-outlined text-xl">check_circle</span>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">Analysis</div>
                  <div className="text-sm font-bold text-slate-900">100% Verified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100 text-center">
            <div className="px-4">
              <div className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">500+</div>
              <div className="text-sm text-slate-500 mt-1 font-medium">Samples Analyzed</div>
            </div>
            <div className="px-4">
              <div className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">0.5s</div>
              <div className="text-sm text-slate-500 mt-1 font-medium">Processing Time</div>
            </div>
            <div className="px-4">
              <div className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">98.7%</div>
              <div className="text-sm text-slate-500 mt-1 font-medium">Accuracy Rate</div>
            </div>
            <div className="px-4">
              <div className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">50+</div>
              <div className="text-sm text-slate-500 mt-1 font-medium">Food Categories</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-50" id="how-it-works">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Simple Detection Process</h2>
            <p className="text-slate-600 text-lg">Three steps to ensure your food is free from contaminants using our advanced AI model.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-200 to-transparent z-0"></div>
            <div className="relative z-10 bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 flex items-center justify-center bg-slate-900 text-white rounded-xl mb-6 shadow-lg shadow-slate-900/20 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-2xl">photo_camera</span>
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-3">1. Snap a Photo</h3>
              <p className="text-slate-500 leading-relaxed">Take a clear picture of the food item using your smartphone or upload directly from your gallery.</p>
            </div>
            <div className="relative z-10 bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 flex items-center justify-center bg-emerald-500 text-white rounded-xl mb-6 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-2xl">analytics</span>
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-3">2. AI Analysis</h3>
              <p className="text-slate-500 leading-relaxed">Our algorithms scan for micro-textures and color inconsistencies indicating possible adulteration.</p>
            </div>
            <div className="relative z-10 bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 flex items-center justify-center bg-slate-900 text-white rounded-xl mb-6 shadow-lg shadow-slate-900/20 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-2xl">verified_user</span>
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-3">3. Get Results</h3>
              <p className="text-slate-500 leading-relaxed">Instantly receive a safety score, detailed report on potential adulterants, and health advice.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white overflow-hidden" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="order-2 lg:order-1" id="technology">
              <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-emerald-600 bg-emerald-50 rounded-full">TECHNOLOGY</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 tracking-tight">Lab-grade precision in your pocket.</h2>
              <p className="text-slate-600 mb-10 text-lg leading-relaxed">Identify what the naked eye cannot see. Our computer vision technology is trained on thousands of contaminated samples to protect your health.</p>
              <div className="space-y-6">
                <div className="flex gap-5 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-emerald-100 text-emerald-600 rounded-lg">
                    <span className="material-symbols-outlined text-2xl">texture</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Micro-texture Analysis</h4>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">Detects synthetic ripening agents, wax coatings, and unnatural surface irregularities.</p>
                  </div>
                </div>
                <div className="flex gap-5 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg">
                    <span className="material-symbols-outlined text-2xl">palette</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Synthetic Dye Detection</h4>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">Identifies harmful coloring agents like Malachite Green in vegetables.</p>
                  </div>
                </div>
                <div className="flex gap-5 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg">
                    <span className="material-symbols-outlined text-2xl">eco</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Freshness Index</h4>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">Estimates true shelf-life and helps separate organic from chemically treated produce.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-[2rem] transform rotate-3 opacity-50 blur-lg"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-slate-100">
                <div className="aspect-[4/3] bg-cover bg-center transition-transform duration-700 hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAY1UZikWUsGTDzUQYoGfOJYaJkOhStWCaVakBthbed8m9O3R5ZmrvVuIfkSaVdr73z7TJqadSXP9iRhn1vEs9g0oER0T6I-As60ToKzadxAcfHSMZf12rAmMwXNWeJkygXsGEwxDHed0sZ5lCtU9DWTbSGd36Mrbpo2x-SmxHpnqbTE6IhPXxDmHEgwOkozVbd4Vap6I07W5WVy8hhzapAMMOdYbvkjNF77wQIeAjmNnnCvxTspi5K0SnpqPe6jFRi_lBcbDJRvcw")' }}></div>
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur p-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-800">Analyzing Organic Texture...</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Safe</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-slate-200 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-slate-900 text-3xl">health_and_safety</span>
                <span className="text-xl font-bold text-slate-900 tracking-tight">SafeBite</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Democratizing food safety with advanced computer vision technology. We verify what you eat, so you can live healthier.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all">
                  <span className="text-lg font-bold">X</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all">
                  <span className="text-lg font-bold">In</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all">
                  <span className="text-lg font-bold">Fb</span>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-emerald-600 transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Technology</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Mobile App</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-emerald-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Partners</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Data Processing</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-400">
              © 2025 SafeBite AI Inc. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-slate-400">
              <a href="#" className="hover:text-slate-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-slate-600 transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};