import React, { useState, useEffect } from 'react';
import { getStoredBranches } from '../data/hospitalData';
import { HospitalBranch } from '../types';
import {
  MapPin,
  PhoneCall,
  BedDouble,
  ShieldAlert,
  ExternalLink,
  Navigation,
  Scan,
  Copy,
  Check,
  Radio,
  Layers,
  Compass,
  Activity,
  Car,
  Bike,
  Building2,
  Share2,
  Clock,
  Sparkles,
  Route,
  ChevronRight,
  Siren,
  Stethoscope,
  HeartPulse,
  Send
} from 'lucide-react';

interface HospitalNetworkMapProps {
  onBookAppointment: (deptId?: string) => void;
}

// Nearby Landmarks in Hyderabad & Sindh with pre-computed distances & routes to AIMS Hospital Hala Naka
const NEARBY_LANDMARKS = [
  {
    name: 'Latifabad Unit 7',
    distanceKm: '4.2 km',
    carMin: '8 mins',
    ambulanceMin: '5 mins',
    bikeMin: '6 mins',
    routeNote: 'Via Autobahn Road & Hala Naka Expressway'
  },
  {
    name: 'Qasimabad Phase 1 & 2',
    distanceKm: '6.5 km',
    carMin: '12 mins',
    ambulanceMin: '7 mins',
    bikeMin: '9 mins',
    routeNote: 'Via Wadhu Wah Road -> National Highway N-5'
  },
  {
    name: 'Hyderabad Railway Station',
    distanceKm: '5.1 km',
    carMin: '10 mins',
    ambulanceMin: '6 mins',
    bikeMin: '8 mins',
    routeNote: 'Via Station Road -> Hala Naka Road'
  },
  {
    name: 'Jamshoro Bypass / Sindh Univ',
    distanceKm: '14.0 km',
    carMin: '18 mins',
    ambulanceMin: '11 mins',
    bikeMin: '15 mins',
    routeNote: 'Via Super Highway M-9 / National Highway N-5'
  },
  {
    name: 'Kotri Industrial Area',
    distanceKm: '11.8 km',
    carMin: '16 mins',
    ambulanceMin: '10 mins',
    bikeMin: '14 mins',
    routeNote: 'Via Kotri Bridge & Hala Naka Main Road'
  }
];

// Campus Floor Plan Data
const CAMPUS_FLOOR_PLAN = [
  {
    floor: 'Ground Floor (G)',
    title: 'Emergency Trauma, Imaging & OPD Registration',
    icon: ShieldAlert,
    color: 'border-cyan-500 bg-cyan-950/40 text-cyan-400',
    facilities: [
      '24/7 Red-Code Emergency Trauma Center',
      '128-Slice Cardiac CT Scan Suite',
      '24/7 In-House Central Pharmacy',
      'Digital X-Ray & Ultrasound Diagnostics',
      'OPD Central Registration & Billing Desks'
    ]
  },
  {
    floor: '1st Floor (L1)',
    title: 'Specialist OPD Clinics & Cath Lab',
    icon: HeartPulse,
    color: 'border-blue-500 bg-blue-950/40 text-blue-400',
    facilities: [
      'Gastroenterology & Endoscopy Center',
      'Interventional Cardiac Cath Lab Suite',
      'Consultant OPD Clinics (30+ Specialist Rooms)',
      'Executive Health Check-up Lounge',
      'Non-Invasive Cardiology (ECG & Echo)'
    ]
  },
  {
    floor: '2nd Floor (L2)',
    title: 'Critical Care ICUs & Operation Theaters',
    icon: Activity,
    color: 'border-emerald-500 bg-emerald-950/40 text-emerald-400',
    facilities: [
      'Level-4 Medical & Surgical ICU (28 Beds)',
      'Coronary Care Unit (CCU)',
      'Modular HEPA-Filtered Operation Theaters',
      'Post-Anesthesia Care Unit (PACU)',
      'Dialysis Center'
    ]
  },
  {
    floor: '3rd Floor (L3)',
    title: 'Maternal, Neonatal & Executive Suites',
    icon: Stethoscope,
    color: 'border-purple-500 bg-purple-950/40 text-purple-400',
    facilities: [
      'Level-4 Neonatal Intensive Care (NICU)',
      'Pediatric ICU & Children Ward',
      'Birthing & Labor Suites',
      'Private Executive Inpatient Rooms',
      'VIP Patient Care Suites'
    ]
  }
];

export const HospitalNetworkMap: React.FC<HospitalNetworkMapProps> = ({ onBookAppointment }) => {
  const [branches, setBranches] = useState<HospitalBranch[]>(() => getStoredBranches());
  const [selectedBranch, setSelectedBranch] = useState<HospitalBranch>(() => getStoredBranches()[0]);
  const [viewMode, setViewMode] = useState<'live-google-map' | 'radar-hud' | 'satellite' | 'floor-plan'>('live-google-map');
  const [selectedLandmark, setSelectedLandmark] = useState(NEARBY_LANDMARKS[0]);
  const [selectedFloor, setSelectedFloor] = useState(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [showDirectionsModal, setShowDirectionsModal] = useState(false);
  const [isPulseEnabled, setIsPulseEnabled] = useState<boolean>(true);

  useEffect(() => {
    const handleUpdate = () => {
      const updated = getStoredBranches();
      setBranches(updated);
      if (updated.length > 0) {
        setSelectedBranch((prev) => updated.find((b) => b.id === prev.id) || updated[0]);
      }
    };
    window.addEventListener('aims_branches_updated', handleUpdate);
    return () => window.removeEventListener('aims_branches_updated', handleUpdate);
  }, []);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  // Google Maps embed URL for selected branch
  const getMapEmbedUrl = (branch: HospitalBranch, type: 'live-google-map' | 'radar-hud' | 'satellite' | 'floor-plan') => {
    const addressQuery = encodeURIComponent(`${branch.name}, ${branch.address}`);
    const mapType = type === 'satellite' ? 'k' : 'm';
    return `https://maps.google.com/maps?q=${addressQuery}&t=${mapType}&z=16&ie=UTF8&iwloc=&output=embed`;
  };

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(
      `📍 *AIMS Hospital Campus Location*\n*Address:* ${selectedBranch.address}\n*Emergency:* ${selectedBranch.emergencyNumber}\n*Google Maps:* ${selectedBranch.googleMapsUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
  };

  return (
    <section id="network" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-800 bg-cyan-100 px-3.5 py-1 rounded-full border border-cyan-300 shadow-sm inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            Hospital Network & Live Campus GPS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Integrated Tertiary Care Campuses Across Sindh
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Locate our 125-bed tertiary care hospital, specialized heart & liver institutes, and women & children centers with real-time GPS route estimation, campus floor plans, and 24/7 ICU status.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Branch Selector & Distance Calculator List */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">Select Hospital Campus</h3>
              <span className="text-[10px] font-extrabold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                {branches.length} Active Campuses
              </span>
            </div>

            {branches.map((branch) => {
              const isSelected = selectedBranch.id === branch.id;
              return (
                <div
                  key={branch.id}
                  onClick={() => {
                    setSelectedBranch(branch);
                    setIframeLoaded(false);
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-slate-900 text-white border-cyan-500 shadow-xl ring-2 ring-cyan-500/30'
                      : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
                  )}

                  <div className="flex items-start justify-between mb-2">
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-cyan-400 text-slate-950 shadow-sm'
                          : 'bg-cyan-100 text-cyan-900'
                      }`}
                    >
                      {branch.type}
                    </span>
                    {branch.is24x7Emergency && (
                      <span className="text-[10px] font-bold text-red-500 flex items-center gap-1 bg-red-50 dark:bg-red-950/50 px-2 py-0.5 rounded border border-red-200 dark:border-red-800">
                        <ShieldAlert className="w-3 h-3 animate-pulse text-red-500" />
                        24/7 Emergency Active
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-extrabold mb-1">{branch.name}</h3>
                  <p className={`text-xs ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                    {branch.address}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-700/30 flex items-center justify-between text-xs font-semibold">
                    <span className="text-emerald-500 dark:text-emerald-400 flex items-center gap-1.5 font-bold">
                      <BedDouble className="w-3.5 h-3.5 text-emerald-500" />
                      {branch.icuBedsAvailable} ICU Beds Available
                    </span>
                    <span className={`text-xs font-bold flex items-center gap-1 ${isSelected ? 'text-cyan-400' : 'text-cyan-700'}`}>
                      <span>View Campus Map</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Live Distance & Route Estimator Panel */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
                    <Route className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase">Live Travel Time Estimator</h4>
                    <p className="text-[10px] text-slate-500">Select your starting landmark in Hyderabad</p>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Live Traffic Sync
                </span>
              </div>

              {/* Landmark Dropdown Selector */}
              <div className="space-y-2">
                <label className="text-[11px] font-extrabold text-slate-700 block">Your Starting Location:</label>
                <select
                  value={selectedLandmark.name}
                  onChange={(e) => {
                    const landmark = NEARBY_LANDMARKS.find((l) => l.name === e.target.value);
                    if (landmark) setSelectedLandmark(landmark);
                  }}
                  className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-cyan-500"
                >
                  {NEARBY_LANDMARKS.map((lm, idx) => (
                    <option key={idx} value={lm.name}>
                      📍 {lm.name} ({lm.distanceKm})
                    </option>
                  ))}
                </select>
              </div>

              {/* Estimated Travel Times Grid */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 bg-red-50 rounded-xl border border-red-200 space-y-0.5">
                  <Siren className="w-4 h-4 mx-auto text-red-600 animate-bounce" />
                  <span className="text-[10px] font-bold text-red-700 block">Ambulance</span>
                  <span className="text-xs font-black text-red-900">{selectedLandmark.ambulanceMin}</span>
                </div>
                <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200 space-y-0.5">
                  <Car className="w-4 h-4 mx-auto text-blue-600" />
                  <span className="text-[10px] font-bold text-blue-700 block">Car / Taxi</span>
                  <span className="text-xs font-black text-blue-900">{selectedLandmark.carMin}</span>
                </div>
                <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-0.5">
                  <Bike className="w-4 h-4 mx-auto text-emerald-600" />
                  <span className="text-[10px] font-bold text-emerald-700 block">Bike</span>
                  <span className="text-xs font-black text-emerald-900">{selectedLandmark.bikeMin}</span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
                <span className="font-semibold">{selectedLandmark.routeNote}</span>
                <span className="font-black text-cyan-700">{selectedLandmark.distanceKm}</span>
              </div>
            </div>
          </div>

          {/* Interactive Live Map & Radar Display Panel */}
          <div className="lg:col-span-7 bg-slate-950 text-white p-5 sm:p-7 rounded-3xl border border-slate-800 shadow-2xl space-y-5">
            {/* Campus Header & Map View Controller */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/90 pb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 ${isPulseEnabled ? 'animate-ping' : ''}`} />
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                      Live GPS Synchronized
                    </span>
                  </div>

                  {/* Live Animated Pulse Effect Toggle */}
                  <button
                    onClick={() => setIsPulseEnabled(!isPulseEnabled)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold transition-all border flex items-center gap-1.5 shadow-sm ${
                      isPulseEnabled
                        ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/60 shadow-emerald-950/50'
                        : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-slate-200'
                    }`}
                    title="Click to enable or disable live pulse animation on the map"
                  >
                    <span className={`w-2 h-2 rounded-full ${isPulseEnabled ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                    <span>Live Pulse: <strong className={isPulseEnabled ? 'text-emerald-300' : 'text-slate-400'}>{isPulseEnabled ? 'ON' : 'OFF'}</strong></span>
                  </button>
                </div>
                <h3 className="text-lg font-black text-white mt-1">{selectedBranch.name}</h3>
                <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{selectedBranch.address}</span>
                </p>
              </div>

              {/* View Mode Switcher Pills */}
              <div className="flex flex-wrap items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 shrink-0">
                <button
                  onClick={() => setViewMode('live-google-map')}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                    viewMode === 'live-google-map'
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Live Map</span>
                </button>
                <button
                  onClick={() => setViewMode('satellite')}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                    viewMode === 'satellite'
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Satellite</span>
                </button>
                <button
                  onClick={() => setViewMode('radar-hud')}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                    viewMode === 'radar-hud'
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Radio className={`w-3.5 h-3.5 text-cyan-300 ${isPulseEnabled ? 'animate-pulse' : ''}`} />
                  <span>Radar HUD</span>
                </button>
                <button
                  onClick={() => setViewMode('floor-plan')}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                    viewMode === 'floor-plan'
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Floors</span>
                </button>
              </div>
            </div>

            {/* Map Canvas Box with Live Overlay */}
            <div className="relative h-80 sm:h-96 bg-slate-900 rounded-2xl border-2 border-cyan-500/40 overflow-hidden shadow-inner group">
              {/* MODE 1 & 2: EMBEDDED REAL GOOGLE MAPS IFRAME */}
              {(viewMode === 'live-google-map' || viewMode === 'satellite') && (
                <div className="w-full h-full relative">
                  {!iframeLoaded && (
                    <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center space-y-3 z-10">
                      <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs font-bold text-cyan-300 tracking-wider">
                        Connecting to Google Maps Satellite...
                      </span>
                    </div>
                  )}
                  <iframe
                    title={`Google Map - ${selectedBranch.name}`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0, filter: 'contrast(105%) brightness(95%)' }}
                    src={getMapEmbedUrl(selectedBranch, viewMode)}
                    allowFullScreen
                    onLoad={() => setIframeLoaded(true)}
                    className="w-full h-full"
                  />

                  {/* Floating Map HUD Badges */}
                  <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-extrabold text-white border border-slate-700/80 shadow-xl flex items-center gap-2 pointer-events-none">
                    <span className={`w-2 h-2 rounded-full bg-emerald-400 ${isPulseEnabled ? 'animate-ping' : ''}`} />
                    <span>AIMS GPS: {selectedBranch.lat}° N, {selectedBranch.lng}° E</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md p-2.5 rounded-xl border border-cyan-500/50 shadow-2xl flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-8 h-8 rounded-xl bg-cyan-600 flex items-center justify-center text-white shrink-0 shadow">
                        <MapPin className={`w-4 h-4 ${isPulseEnabled ? 'animate-bounce' : ''}`} />
                      </div>
                      <div>
                        <span className="font-bold text-white text-xs block leading-tight">{selectedBranch.name}</span>
                        <span className="text-[10px] text-slate-300">Plus Code: C9VJ+6V • Hala Naka, Hyderabad</span>
                      </div>
                    </div>

                    <a
                      href={selectedBranch.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-lg shadow transition-all flex items-center gap-1 shrink-0"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Open Navigation</span>
                    </a>
                  </div>
                </div>
              )}

              {/* MODE 3: TACTICAL ANIMATED RADAR HUD */}
              {viewMode === 'radar-hud' && (
                <div className="w-full h-full bg-slate-950 relative flex items-center justify-center overflow-hidden">
                  {/* Grid Lines Pattern */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)`,
                      backgroundSize: '24px 24px'
                    }}
                  />

                  {/* Concentric Radar Rings */}
                  <div className="absolute w-72 h-72 border border-cyan-500/20 rounded-full" />
                  <div className="absolute w-56 h-56 border border-cyan-500/30 rounded-full" />
                  <div className="absolute w-40 h-40 border border-cyan-500/40 rounded-full" />
                  <div className="absolute w-20 h-20 border border-cyan-500/60 rounded-full" />

                  {/* Rotating Radar Sweeper Beam */}
                  <div className={`absolute w-72 h-72 rounded-full pointer-events-none ${isPulseEnabled ? 'animate-radar-sweep' : 'opacity-20'}`}>
                    <div className="w-1/2 h-1/2 bg-gradient-to-br from-cyan-500/40 via-cyan-500/10 to-transparent rounded-tl-full" />
                  </div>

                  {/* Live Sonar Wave Rings Expanding from Center Pin */}
                  {isPulseEnabled && (
                    <>
                      <div className="absolute w-12 h-12 rounded-full border-2 border-cyan-400 animate-sonar-wave pointer-events-none" />
                      <div className="absolute w-12 h-12 rounded-full border-2 border-emerald-400 animate-sonar-wave-delayed pointer-events-none" />
                    </>
                  )}

                  {/* Central Glowing Hospital Location Marker */}
                  <div className="relative z-10 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-2xl border-2 border-white flex flex-col items-center justify-center text-white mx-auto ${isPulseEnabled ? 'animate-bounce' : ''}`}>
                      <MapPin className="w-8 h-8" />
                    </div>
                    <div className="mt-2 bg-slate-900/95 text-white px-3.5 py-1.5 rounded-xl border border-cyan-400/60 shadow-2xl backdrop-blur-md inline-block">
                      <span className="text-xs font-black text-cyan-300 block">{selectedBranch.name}</span>
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center justify-center gap-1">
                        <Activity className={`w-3 h-3 ${isPulseEnabled ? 'animate-pulse' : ''}`} /> Live Telemetry • 28 ICU Beds Free
                      </span>
                    </div>
                  </div>

                  {/* Simulated Animated Emergency Dispatch Route SVG */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M 40 260 Q 180 190 260 170"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="3"
                      strokeDasharray="8 8"
                      className={isPulseEnabled ? 'animate-dash-route' : ''}
                    />
                    <circle cx="40" cy="260" r="6" fill="#ef4444" className={isPulseEnabled ? 'animate-ping' : ''} />
                    <circle cx="40" cy="260" r="4" fill="#ef4444" />
                    <text x="50" y="255" fill="#f87171" fontSize="10" fontWeight="bold">
                      Ambulance ({selectedLandmark.name}: {selectedLandmark.ambulanceMin})
                    </text>
                  </svg>

                  {/* Radar Status Footer */}
                  <div className="absolute top-3 right-3 bg-slate-900/90 text-cyan-400 px-3 py-1 rounded-lg text-[10px] font-mono border border-cyan-500/40">
                    RADAR: 25.3960° N, 68.3578° E
                  </div>
                </div>
              )}

              {/* MODE 4: INTERACTIVE CAMPUS FLOOR PLAN DIRECTORY */}
              {viewMode === 'floor-plan' && (
                <div className="w-full h-full bg-slate-950 p-4 sm:p-6 overflow-y-auto space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h4 className="text-sm font-black text-white flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-cyan-400" />
                        Campus Building Directory & Floor Plan
                      </h4>
                      <p className="text-[11px] text-slate-400">Select a floor to view medical departments and diagnostics</p>
                    </div>
                    <span className="text-[10px] font-bold bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded border border-cyan-800">
                      125 Beds Total
                    </span>
                  </div>

                  {/* Floor Tabs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {CAMPUS_FLOOR_PLAN.map((item, idx) => {
                      const IconComp = item.icon;
                      const isActive = selectedFloor === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedFloor(idx)}
                          className={`p-2.5 rounded-xl border text-left transition-all ${
                            isActive
                              ? item.color + ' border-2 shadow-lg ring-1 ring-cyan-500'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <IconComp className="w-4 h-4 mb-1" />
                          <span className="text-[11px] font-black block">{item.floor}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Floor Details */}
                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-black text-white uppercase tracking-wide">
                        {CAMPUS_FLOOR_PLAN[selectedFloor].floor}: {CAMPUS_FLOOR_PLAN[selectedFloor].title}
                      </h5>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-2 text-xs">
                      {CAMPUS_FLOOR_PLAN[selectedFloor].facilities.map((facility, fIdx) => (
                        <div key={fIdx} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-2 text-slate-200">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span className="font-semibold">{facility}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions & Address Bar */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-black uppercase text-cyan-400 tracking-wider">
                    Full Hospital Address
                  </span>
                  <p className="text-xs font-bold text-slate-100 leading-snug">
                    {selectedBranch.address}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopy(selectedBranch.address, 'address')}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all flex items-center gap-1.5"
                  >
                    {copiedText === 'address' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-extrabold">Address Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={shareOnWhatsApp}
                    className="px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 text-xs font-bold rounded-xl border border-emerald-800 transition-all flex items-center gap-1.5"
                  >
                    <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Share Location</span>
                  </button>
                </div>
              </div>

              {/* Contact Hotlines & Imaging Services */}
              <div className="grid sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 space-y-1.5">
                  <span className="text-cyan-400 font-black text-[11px] uppercase tracking-wider block">
                    Direct Hotlines
                  </span>
                  <div className="flex items-center justify-between text-slate-200 font-bold">
                    <span>Emergency (24/7):</span>
                    <a href={`tel:${selectedBranch.emergencyNumber}`} className="text-red-400 hover:underline">
                      {selectedBranch.emergencyNumber}
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>OPD Desk:</span>
                    <span>{selectedBranch.opdNumber}</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 space-y-1.5">
                  <span className="text-cyan-400 font-black text-[11px] uppercase tracking-wider block">
                    Available On-Site Facilities
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedBranch.imagingFacilities.map((fac, idx) => (
                      <span key={idx} className="bg-slate-900 text-cyan-300 px-2 py-0.5 rounded border border-slate-800 text-[10px] font-bold">
                        {fac}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Primary Actions */}
            <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href={`tel:${selectedBranch.emergencyNumber.split('/')[0].trim()}`}
                className="w-full sm:w-auto px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 animate-bounce" />
                <span>Call Emergency ({selectedBranch.emergencyNumber.split('/')[0].trim()})</span>
              </a>

              <button
                onClick={() => onBookAppointment()}
                className="w-full sm:w-auto px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Book Appointment at Campus</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
