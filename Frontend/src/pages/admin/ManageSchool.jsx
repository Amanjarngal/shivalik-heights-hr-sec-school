import React, { useState, useEffect } from 'react';
import {
  Settings, Save, Loader2, Edit3, Building, Mail, Phone, Clock,
  MapPin, Image, Map, Plus, Trash2, Layout, Calendar, CheckCircle2,
  AlertCircle, Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getApiUrl } from '../../utils/api';
import { getStoredToken } from '../../context/AuthContext';

// ── Toast notification component ────────────────────────────────────
const Toast = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: -20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -20 }}
    className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl text-sm font-bold ${
      type === 'success'
        ? 'bg-green-600 text-white'
        : 'bg-red-600 text-white'
    }`}
  >
    {type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
    {message}
    <button onClick={onClose} className="ml-2 text-white/70 hover:text-white transition-colors text-lg leading-none">×</button>
  </motion.div>
);

// ── Section wrapper ──────────────────────────────────────────────────
const Section = ({ icon: Icon, title, children, onSave, saving, savingKey, currentKey }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-[2rem] shadow-lg shadow-black/5 border border-gray-100 overflow-hidden"
  >
    <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 bg-gray-50/50">
      <h3 className="text-sm font-black uppercase tracking-widest text-[#a81d1d] flex items-center gap-2">
        <Icon className="w-4 h-4" />
        {title}
      </h3>
      <button
        type="button"
        onClick={onSave}
        disabled={saving && savingKey === currentKey}
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-[#a81d1d] text-white px-4 py-2.5 rounded-xl hover:bg-red-800 transition-all shadow-md shadow-red-900/20 disabled:opacity-60 disabled:grayscale"
      >
        {saving && savingKey === currentKey
          ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...</>
          : <><Save className="w-3.5 h-3.5" /> Save</>
        }
      </button>
    </div>
    <div className="p-8">{children}</div>
  </motion.div>
);

// ── Input helpers ────────────────────────────────────────────────────
const InputField = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">{label}</label>
    <input
      className="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#a81d1d]/30 outline-none transition-all font-semibold text-gray-800 placeholder:text-gray-300 shadow-inner text-sm"
      {...props}
    />
  </div>
);

const TextareaField = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">{label}</label>
    <textarea
      className="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#a81d1d]/30 outline-none transition-all font-semibold text-gray-800 shadow-inner resize-none text-sm"
      {...props}
    />
  </div>
);

// ── Main Component ───────────────────────────────────────────────────
const ManageSchool = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingKey, setSavingKey] = useState(null);
  const [toast, setToast] = useState(null);

  // Form state per section
  const [basicInfo, setBasicInfo] = useState({
    schoolName: '', shortName: '', address: '', boardAffiliation: '', mapUrl: ''
  });
  const [heroContent, setHeroContent] = useState({ heroTitle: '', heroSubtitle: '' });
  const [heroSlides, setHeroSlides] = useState([]);
  const [admissionInfo, setAdmissionInfo] = useState({ admissionLastDate: '' });
  const [contactInfo, setContactInfo] = useState({ phone: '', email: '', workingHours: '' });
  const [socialLinks, setSocialLinks] = useState({ facebookUrl: '', twitterUrl: '', instagramUrl: '' });
  const [leadershipInfo, setLeadershipInfo] = useState({ chairmanName: '', chairmanMessage: '', principalName: '', principalMessage: '' });

  // Media state
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoUrl, setLogoUrl] = useState('');
  const [admissionFile, setAdmissionFile] = useState(null);
  const [admissionPreview, setAdmissionPreview] = useState(null);
  const [admissionImageUrl, setAdmissionImageUrl] = useState('');
  
  const [aboutUsFile, setAboutUsFile] = useState(null);
  const [aboutUsPreview, setAboutUsPreview] = useState(null);
  const [aboutUsImageUrl, setAboutUsImageUrl] = useState('');

  const [chairmanFile, setChairmanFile] = useState(null);
  const [chairmanPreview, setChairmanPreview] = useState(null);
  const [chairmanImageUrl, setChairmanImageUrl] = useState('');

  const [principalFile, setPrincipalFile] = useState(null);
  const [principalPreview, setPrincipalPreview] = useState(null);
  const [principalImageUrl, setPrincipalImageUrl] = useState('');
  // ── Fetch ──────────────────────────────────────────────────────────
  const fetchSettings = async () => {
    try {
      const response = await fetch(getApiUrl('/api/school'));
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();
      if (result.success && result.data) {
        const d = result.data;
        setBasicInfo({
          schoolName: d.schoolName || '',
          shortName: d.shortName || '',
          address: d.address || '',
          boardAffiliation: d.boardAffiliation || '',
          mapUrl: d.mapUrl || ''
        });
        setHeroContent({ heroTitle: d.heroTitle || '', heroSubtitle: d.heroSubtitle || '' });
        setHeroSlides(d.heroSlides || []);
        setAdmissionInfo({ admissionLastDate: d.admissionLastDate || '' });
        setContactInfo({ phone: d.phone || '', email: d.email || '', workingHours: d.workingHours || '' });
        setSocialLinks({ facebookUrl: d.facebookUrl || '', twitterUrl: d.twitterUrl || '', instagramUrl: d.instagramUrl || '' });
        setLogoUrl(d.logoUrl || '');
        setAdmissionImageUrl(d.admissionImage || '');
        setLeadershipInfo({
          chairmanName: d.chairmanName || '',
          chairmanMessage: d.chairmanMessage || '',
          principalName: d.principalName || '',
          principalMessage: d.principalMessage || ''
        });
        setAboutUsImageUrl(d.aboutUsImage || '');
        setChairmanImageUrl(d.chairmanImage || '');
        setPrincipalImageUrl(d.principalImage || '');
      }
    } catch (err) {
      showToast(`Failed to load settings: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSettings(); }, []);

  // ── Toast helper ───────────────────────────────────────────────────
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // ── Generic save ──────────────────────────────────────────────────
  const saveSection = async (key, formData) => {
    setSaving(true);
    setSavingKey(key);
    try {
      const token = getStoredToken();
      const res = await fetch(getApiUrl('/api/school'), {
        method: 'PUT',
        credentials: 'include',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server ${res.status}: ${text.slice(0, 100)}`);
      }
      const result = await res.json();
      if (result.success) {
        showToast(`${key} updated successfully!`, 'success');
        return result.data;
      } else {
        throw new Error(result.message || 'Update failed');
      }
    } catch (err) {
      showToast(err.message || 'Network error — check console.', 'error');
      console.error(`[ManageSchool] Save ${key} error:`, err);
      return null;
    } finally {
      setSaving(false);
      setSavingKey(null);
    }
  };

  // ── Section savers ─────────────────────────────────────────────────
  const saveBasicInfo = async () => {
    const fd = new FormData();
    Object.entries(basicInfo).forEach(([k, v]) => fd.append(k, v || ''));
    const data = await saveSection('Basic Info', fd);
    if (data) setBasicInfo(prev => ({ ...prev, ...data }));
  };

  const saveHeroContent = async () => {
    const fd = new FormData();
    Object.entries(heroContent).forEach(([k, v]) => fd.append(k, v || ''));

    // Also include slides metadata + files
    const heroSlidesMetadata = [];
    let imageIndex = 0;
    heroSlides.forEach((slide) => {
      const meta = { title: slide.title, description: slide.description, imageUrl: slide.imageUrl };
      if (slide.file) {
        fd.append('heroImages', slide.file);
        meta.imageIndex = imageIndex++;
      }
      heroSlidesMetadata.push(meta);
    });
    fd.append('heroSlidesMetadata', JSON.stringify(heroSlidesMetadata));

    const data = await saveSection('Hero & Slides', fd);
    if (data) {
      setHeroContent({ heroTitle: data.heroTitle || '', heroSubtitle: data.heroSubtitle || '' });
      setHeroSlides(data.heroSlides || []);
    }
  };

  const saveAdmission = async () => {
    const fd = new FormData();
    fd.append('admissionLastDate', admissionInfo.admissionLastDate || '');
    if (admissionFile) fd.append('admissionImage', admissionFile);
    const data = await saveSection('Admission', fd);
    if (data) {
      setAdmissionInfo({ admissionLastDate: data.admissionLastDate || '' });
      if (data.admissionImage) setAdmissionImageUrl(data.admissionImage);
      setAdmissionFile(null);
      setAdmissionPreview(null);
    }
  };

  const saveLogo = async () => {
    if (!logoFile) { showToast('Please select a logo image first.', 'error'); return; }
    const fd = new FormData();
    fd.append('logo', logoFile);
    const data = await saveSection('Logo', fd);
    if (data) {
      setLogoUrl(data.logoUrl || '');
      setLogoFile(null);
      setLogoPreview(null);
    }
  };

  const saveContact = async () => {
    const fd = new FormData();
    Object.entries(contactInfo).forEach(([k, v]) => fd.append(k, v || ''));
    await saveSection('Contact Info', fd);
  };

  const saveSocial = async () => {
    const fd = new FormData();
    Object.entries(socialLinks).forEach(([k, v]) => fd.append(k, v || ''));
    await saveSection('Social Links', fd);
  };

  const saveAboutUsMedia = async () => {
    if (!aboutUsFile) { showToast('Please select an About Us image first.', 'error'); return; }
    const fd = new FormData();
    fd.append('aboutUsImage', aboutUsFile);
    const data = await saveSection('About Us Media', fd);
    if (data) {
      setAboutUsImageUrl(data.aboutUsImage || '');
      setAboutUsFile(null);
      setAboutUsPreview(null);
    }
  };

  const saveLeadership = async () => {
    const fd = new FormData();
    Object.entries(leadershipInfo).forEach(([k, v]) => fd.append(k, v || ''));
    if (chairmanFile) fd.append('chairmanImage', chairmanFile);
    if (principalFile) fd.append('principalImage', principalFile);
    
    const data = await saveSection('Leadership', fd);
    if (data) {
      setLeadershipInfo({
        chairmanName: data.chairmanName || '',
        chairmanMessage: data.chairmanMessage || '',
        principalName: data.principalName || '',
        principalMessage: data.principalMessage || ''
      });
      if (data.chairmanImage) setChairmanImageUrl(data.chairmanImage);
      if (data.principalImage) setPrincipalImageUrl(data.principalImage);
      setChairmanFile(null);
      setChairmanPreview(null);
      setPrincipalFile(null);
      setPrincipalPreview(null);
    }
  };

  // ── Slide helpers ──────────────────────────────────────────────────
  const handleAddSlide = () => setHeroSlides(prev => [...prev, { title: '', description: '', imageUrl: '', file: null }]);
  const handleRemoveSlide = (i) => setHeroSlides(prev => prev.filter((_, idx) => idx !== i));
  const handleSlideChange = (i, field, value) => setHeroSlides(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s));
  const handleSlideFile = (i, file) => setHeroSlides(prev => prev.map((s, idx) => idx === i ? { ...s, file } : s));

  // ── Loading ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#a81d1d]" />
        <p className="text-gray-400 font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Loading Settings...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 lg:p-10 max-w-4xl mx-auto space-y-6 min-h-screen">

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase flex items-center gap-3">
            <Settings className="w-8 h-8 text-[#a81d1d]" />
            School Settings
          </h2>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest bg-gray-50 inline-block px-3 py-1 rounded-full border border-gray-100 italic">
            Each section saves independently
          </p>
        </div>
      </div>

      {/* ── 1. Basic Info ── */}
      <Section icon={Building} title="Basic Information" onSave={saveBasicInfo} saving={saving} savingKey={savingKey} currentKey="Basic Info">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField label="Full School Name" value={basicInfo.schoolName} onChange={e => setBasicInfo(p => ({ ...p, schoolName: e.target.value }))} required />
          <InputField label="Short Name / Abbreviation" value={basicInfo.shortName} onChange={e => setBasicInfo(p => ({ ...p, shortName: e.target.value }))} required />
          <InputField label="Board Affiliation" value={basicInfo.boardAffiliation} onChange={e => setBasicInfo(p => ({ ...p, boardAffiliation: e.target.value }))} placeholder="e.g., JKBOSE" />
          <InputField label="Address" value={basicInfo.address} onChange={e => setBasicInfo(p => ({ ...p, address: e.target.value }))} required />
          <div className="md:col-span-2">
            <InputField label="Google Maps Embed URL" type="url" value={basicInfo.mapUrl} onChange={e => setBasicInfo(p => ({ ...p, mapUrl: e.target.value }))} placeholder="https://www.google.com/maps/embed?..." />
            {basicInfo.mapUrl && (
              <div className="mt-3 rounded-xl overflow-hidden border border-gray-100 shadow-sm h-44 w-full">
                <iframe src={basicInfo.mapUrl} className="w-full h-full border-0" allowFullScreen loading="lazy" />
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* ── 2. Hero Content + Slides ── */}
      <Section icon={Layout} title="Hero Content & Image Slides" onSave={saveHeroContent} saving={saving} savingKey={savingKey} currentKey="Hero & Slides">
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-4">
            <InputField label="Main Hero Title" value={heroContent.heroTitle} onChange={e => setHeroContent(p => ({ ...p, heroTitle: e.target.value }))} />
            <TextareaField label="Main Hero Subtitle" rows={2} value={heroContent.heroSubtitle} onChange={e => setHeroContent(p => ({ ...p, heroSubtitle: e.target.value }))} />
          </div>

          {/* Slides */}
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-2xl border border-gray-200">
              <span className="text-xs font-black text-gray-600 uppercase tracking-widest">Image Slides ({heroSlides.length})</span>
              <button type="button" onClick={handleAddSlide} className="flex items-center gap-1 text-xs font-bold bg-[#a81d1d] text-white px-3 py-1.5 rounded-lg hover:bg-red-800 transition">
                <Plus className="w-3.5 h-3.5" /> Add Slide
              </button>
            </div>

            {heroSlides.length === 0 && (
              <p className="text-center text-xs text-gray-400 py-6 font-semibold italic">No slides yet. Click "Add Slide" to add images for the hero section.</p>
            )}

            {heroSlides.map((slide, index) => (
              <div key={index} className="border border-gray-200 bg-gray-50/50 p-5 rounded-2xl flex flex-col md:flex-row gap-5 relative group hover:shadow-md transition-all">
                <button type="button" onClick={() => handleRemoveSlide(index)} className="absolute -top-2.5 -right-2.5 bg-red-100 text-red-600 p-1.5 rounded-full shadow hover:bg-red-600 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <div className="w-full md:w-1/3 space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Slide {index + 1} Image</label>
                  {slide.imageUrl && !slide.file && (
                    <div className="w-full h-24 rounded-xl border border-gray-200 overflow-hidden bg-white flex items-center justify-center">
                      <img src={slide.imageUrl} className="max-h-full max-w-full object-cover rounded-xl" alt={`slide ${index + 1}`} />
                    </div>
                  )}
                  {slide.file && (
                    <div className="w-full h-24 rounded-xl border border-gray-200 overflow-hidden bg-white flex items-center justify-center">
                      <img src={URL.createObjectURL(slide.file)} className="max-h-full max-w-full object-cover rounded-xl" alt="preview" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleSlideFile(index, e.target.files[0])}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#a81d1d] file:text-white hover:file:bg-red-800 cursor-pointer"
                  />
                </div>

                <div className="w-full md:w-2/3 space-y-3">
                  <input
                    type="text"
                    placeholder="Slide Title (shown in Highlights)"
                    value={slide.title || ''}
                    onChange={(e) => handleSlideChange(index, 'title', e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#a81d1d]/40 transition-all font-semibold text-gray-800 text-sm"
                  />
                  <textarea
                    placeholder="Short description..."
                    rows={3}
                    value={slide.description || ''}
                    onChange={(e) => handleSlideChange(index, 'description', e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#a81d1d]/40 transition-all font-semibold text-gray-800 text-sm resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 3. Admission ── */}
      <Section icon={Calendar} title="Admission Details" onSave={saveAdmission} saving={saving} savingKey={savingKey} currentKey="Admission">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Admission Last Date" value={admissionInfo.admissionLastDate} onChange={e => setAdmissionInfo(p => ({ ...p, admissionLastDate: e.target.value }))} placeholder="e.g., 31st March 2026" />

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Admission Flyer Image</label>
            {(admissionPreview || admissionImageUrl) && (
              <div className="w-full h-32 rounded-2xl bg-gray-50 border border-gray-200 overflow-hidden flex items-center justify-center">
                <img src={admissionPreview || admissionImageUrl} className="max-w-full max-h-full object-cover rounded-xl" alt="Admission Flyer" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                const f = e.target.files[0];
                if (f) { setAdmissionFile(f); setAdmissionPreview(URL.createObjectURL(f)); }
              }}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#a81d1d] file:text-white hover:file:bg-red-800 cursor-pointer"
            />
          </div>
        </div>
      </Section>

      {/* ── 4. About Us Media ── */}
      <Section icon={Image} title="About Us Media" onSave={saveAboutUsMedia} saving={saving} savingKey={savingKey} currentKey="About Us Media">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-48 h-32 shrink-0 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 overflow-hidden flex items-center justify-center">
            {(aboutUsPreview || aboutUsImageUrl) ? (
              <img src={aboutUsPreview || aboutUsImageUrl} className="w-full h-full object-cover" alt="About Us Preview" />
            ) : (
              <Image className="w-10 h-10 text-gray-300" />
            )}
          </div>
          <div className="flex-1 space-y-3">
            <p className="text-sm font-semibold text-gray-500">Upload the image used in the "A Journey of Excellence" section on the About Us page.</p>
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                const f = e.target.files[0];
                if (f) { setAboutUsFile(f); setAboutUsPreview(URL.createObjectURL(f)); }
              }}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#a81d1d] file:text-white hover:file:bg-red-800 cursor-pointer"
            />
            {!aboutUsFile && <p className="text-[10px] text-gray-400 italic">Select a new file then click Save to update.</p>}
          </div>
        </div>
      </Section>

      {/* ── 5. Leadership Settings ── */}
      <Section icon={Users} title="Leadership Messages" onSave={saveLeadership} saving={saving} savingKey={savingKey} currentKey="Leadership">
        <div className="space-y-10">
          
          {/* Chairman */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-3xl border border-gray-100">
            <div className="space-y-4">
              <h4 className="text-sm font-black text-[#a81d1d] uppercase tracking-widest border-b border-gray-200 pb-2">Chairman Section</h4>
              <InputField label="Chairman Name" value={leadershipInfo.chairmanName} onChange={e => setLeadershipInfo(p => ({ ...p, chairmanName: e.target.value }))} placeholder="e.g., Sh. John Doe" />
              <TextareaField label="Chairman Message" rows={4} value={leadershipInfo.chairmanMessage} onChange={e => setLeadershipInfo(p => ({ ...p, chairmanMessage: e.target.value }))} placeholder="Message content..." />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Chairman Image</label>
              {(chairmanPreview || chairmanImageUrl) && (
                <div className="w-full h-40 rounded-2xl bg-white border border-gray-200 overflow-hidden flex items-center justify-center">
                  <img src={chairmanPreview || chairmanImageUrl} className="max-w-full max-h-full object-cover rounded-xl" alt="Chairman" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  const f = e.target.files[0];
                  if (f) { setChairmanFile(f); setChairmanPreview(URL.createObjectURL(f)); }
                }}
                className="w-full mt-2 px-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs font-bold text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#a81d1d] file:text-white hover:file:bg-red-800 cursor-pointer"
              />
            </div>
          </div>

          {/* Principal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50/50 p-6 rounded-3xl border border-blue-100/50">
            <div className="space-y-4">
              <h4 className="text-sm font-black text-blue-900 uppercase tracking-widest border-b border-blue-200 pb-2">Principal Section</h4>
              <InputField label="Principal Name" value={leadershipInfo.principalName} onChange={e => setLeadershipInfo(p => ({ ...p, principalName: e.target.value }))} placeholder="e.g., Ms. Jane Smith" />
              <TextareaField label="Principal Message" rows={4} value={leadershipInfo.principalMessage} onChange={e => setLeadershipInfo(p => ({ ...p, principalMessage: e.target.value }))} placeholder="Message content..." />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] ml-2">Principal Image</label>
              {(principalPreview || principalImageUrl) && (
                <div className="w-full h-40 rounded-2xl bg-white border border-blue-200 overflow-hidden flex items-center justify-center">
                  <img src={principalPreview || principalImageUrl} className="max-w-full max-h-full object-cover rounded-xl" alt="Principal" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  const f = e.target.files[0];
                  if (f) { setPrincipalFile(f); setPrincipalPreview(URL.createObjectURL(f)); }
                }}
                className="w-full mt-2 px-4 py-3 bg-white border border-blue-200 rounded-2xl text-xs font-bold text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#1e3a8a] file:text-white hover:file:bg-blue-900 cursor-pointer"
              />
            </div>
          </div>

        </div>
      </Section>

      {/* ── 6. School Logo ── */}
      <Section icon={Image} title="School Logo" onSave={saveLogo} saving={saving} savingKey={savingKey} currentKey="Logo">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-32 h-32 shrink-0 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 overflow-hidden flex items-center justify-center">
            {(logoPreview || logoUrl) ? (
              <img src={logoPreview || logoUrl} className="max-w-full max-h-full object-contain p-2" alt="Logo Preview" />
            ) : (
              <Image className="w-10 h-10 text-gray-300" />
            )}
          </div>
          <div className="flex-1 space-y-3">
            <p className="text-sm font-semibold text-gray-500">Upload the school logo. It will appear in the navbar, watermarks, and branding across the site.</p>
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                const f = e.target.files[0];
                if (f) { setLogoFile(f); setLogoPreview(URL.createObjectURL(f)); }
              }}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#a81d1d] file:text-white hover:file:bg-red-800 cursor-pointer"
            />
            {!logoFile && <p className="text-[10px] text-gray-400 italic">Select a new file then click Save to update the logo.</p>}
          </div>
        </div>
      </Section>

      {/* ── 7. Contact Info ── */}
      <Section icon={Phone} title="Contact Details" onSave={saveContact} saving={saving} savingKey={savingKey} currentKey="Contact Info">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField label="Primary Phone" type="text" value={contactInfo.phone} onChange={e => setContactInfo(p => ({ ...p, phone: e.target.value }))} required />
          <InputField label="Official Email" type="email" value={contactInfo.email} onChange={e => setContactInfo(p => ({ ...p, email: e.target.value }))} required />
          <div className="md:col-span-2">
            <InputField label="Working Hours" value={contactInfo.workingHours} onChange={e => setContactInfo(p => ({ ...p, workingHours: e.target.value }))} placeholder="e.g., Mon - Sat: 9:00 AM - 4:00 PM" />
          </div>
        </div>
      </Section>

      {/* ── 6. Social Links ── */}
      <Section icon={Edit3} title="Social Media Links" onSave={saveSocial} saving={saving} savingKey={savingKey} currentKey="Social Links">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <InputField label="Facebook URL" type="url" value={socialLinks.facebookUrl} onChange={e => setSocialLinks(p => ({ ...p, facebookUrl: e.target.value }))} placeholder="https://facebook.com/..." />
          <InputField label="Instagram URL" type="url" value={socialLinks.instagramUrl} onChange={e => setSocialLinks(p => ({ ...p, instagramUrl: e.target.value }))} placeholder="https://instagram.com/..." />
          <InputField label="YouTube URL" type="url" value={socialLinks.twitterUrl} onChange={e => setSocialLinks(p => ({ ...p, twitterUrl: e.target.value }))} placeholder="https://youtube.com/..." />
        </div>
      </Section>

    </div>
  );
};

export default ManageSchool;
