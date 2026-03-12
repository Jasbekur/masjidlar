import { useState, useEffect } from "react";

const REGIONS = [
  "Toshkent", "Samarqand", "Buxoro", "Farg'ona", "Andijon",
  "Namangan", "Xorazm", "Qashqadaryo", "Surxondaryo",
  "Jizzax", "Sirdaryo", "Navoiy", "Toshkent viloyati"
];

const TASK_TYPES = ["Cleaning", "Renovation", "Gardening", "Cooking", "Teaching", "Security", "Other"];

const INITIAL_MOSQUES = [
  { id: 1, name: "Minor Masjidi", region: "Toshkent", address: "Tashkent, Mirzo Ulugbek", volunteers: 24, rating: 4.8, telegramChatId: "",
    tasks: [
      { id: 101, type: "Cleaning", title: "Friday deep cleaning", date: "2026-03-13", time: "08:00", spots: 10, filled: 6, urgency: "normal" },
      { id: 102, type: "Gardening", title: "Spring garden preparation", date: "2026-03-15", time: "09:00", spots: 5, filled: 2, urgency: "low" },
    ],
    charity: { goal: 15000000, raised: 9200000, currency: "UZS", purpose: "Roof renovation for winter season", deadline: "2026-04-30" }
  },
  { id: 2, name: "Xo'ja Ahror Valiy Masjidi", region: "Toshkent", address: "Tashkent, Shaykhantakhur", volunteers: 18, rating: 4.6, telegramChatId: "",
    tasks: [
      { id: 201, type: "Renovation", title: "Wall painting & repair", date: "2026-03-14", time: "07:00", spots: 15, filled: 11, urgency: "high" },
      { id: 202, type: "Cooking", title: "Iftar meal preparation", date: "2026-03-20", time: "14:00", spots: 8, filled: 3, urgency: "normal" },
    ],
    charity: { goal: 25000000, raised: 18500000, currency: "UZS", purpose: "New sound system & carpets", deadline: "2026-05-15" }
  },
  { id: 3, name: "Registon Masjidi", region: "Samarqand", address: "Samarkand, Registan Square", volunteers: 35, rating: 4.9, telegramChatId: "",
    tasks: [
      { id: 301, type: "Cleaning", title: "Post-holiday thorough cleaning", date: "2026-03-16", time: "06:00", spots: 20, filled: 20, urgency: "filled" },
      { id: 302, type: "Teaching", title: "Youth Quran class assistant", date: "2026-03-17", time: "16:00", spots: 3, filled: 1, urgency: "high" },
    ],
    charity: { goal: 50000000, raised: 42000000, currency: "UZS", purpose: "Historical preservation fund", deadline: "2026-06-01" }
  },
  { id: 4, name: "Kalon Masjidi", region: "Buxoro", address: "Bukhara, Po-i-Kalyan", volunteers: 28, rating: 4.7, telegramChatId: "",
    tasks: [
      { id: 401, type: "Renovation", title: "Minaret area restoration help", date: "2026-03-18", time: "08:00", spots: 12, filled: 4, urgency: "high" },
    ],
    charity: { goal: 35000000, raised: 12000000, currency: "UZS", purpose: "Heating system upgrade", deadline: "2026-04-15" }
  },
  { id: 5, name: "Jome Masjidi", region: "Andijon", address: "Andijan, city center", volunteers: 15, rating: 4.5, telegramChatId: "",
    tasks: [
      { id: 501, type: "Gardening", title: "Courtyard landscaping", date: "2026-03-19", time: "09:00", spots: 8, filled: 1, urgency: "normal" },
      { id: 502, type: "Cooking", title: "Weekly osh for community", date: "2026-03-21", time: "10:00", spots: 6, filled: 4, urgency: "normal" },
    ],
    charity: { goal: 20000000, raised: 5500000, currency: "UZS", purpose: "New wudu area construction", deadline: "2026-05-01" }
  },
  { id: 6, name: "Oq Masjid", region: "Xorazm", address: "Khiva, Ichan-Kala", volunteers: 12, rating: 4.4, telegramChatId: "",
    tasks: [
      { id: 601, type: "Cleaning", title: "Weekly mosque cleaning", date: "2026-03-15", time: "07:00", spots: 6, filled: 0, urgency: "high" },
    ],
    charity: { goal: 10000000, raised: 8700000, currency: "UZS", purpose: "Air conditioning for summer", deadline: "2026-04-20" }
  },
  { id: 7, name: "Namangan Jome Masjidi", region: "Namangan", address: "Namangan, Babur street", volunteers: 20, rating: 4.6, telegramChatId: "",
    tasks: [
      { id: 701, type: "Teaching", title: "Arabic language class helper", date: "2026-03-16", time: "10:00", spots: 4, filled: 2, urgency: "normal" },
      { id: 702, type: "Renovation", title: "Entrance door replacement", date: "2026-03-22", time: "08:00", spots: 10, filled: 3, urgency: "high" },
    ],
    charity: { goal: 18000000, raised: 11000000, currency: "UZS", purpose: "Water purification system", deadline: "2026-05-10" }
  },
  { id: 8, name: "Shahrisabz Masjidi", region: "Qashqadaryo", address: "Shahrisabz, Amir Temur street", volunteers: 10, rating: 4.3, telegramChatId: "",
    tasks: [
      { id: 801, type: "Gardening", title: "Tree planting around mosque", date: "2026-03-17", time: "09:00", spots: 15, filled: 5, urgency: "normal" },
    ],
    charity: { goal: 30000000, raised: 7000000, currency: "UZS", purpose: "Expansion of prayer hall", deadline: "2026-07-01" }
  },
];

function formatUZS(amount) { return new Intl.NumberFormat('uz-UZ').format(amount) + " so'm"; }

function getUrgencyColor(u) {
  switch (u) {
    case "high": return { bg: "#FEF2F2", text: "#DC2626", border: "#FECACA", label: "Shoshilinch" };
    case "filled": return { bg: "#F0FDF4", text: "#16A34A", border: "#BBF7D0", label: "To'lgan" };
    case "low": return { bg: "#F0F9FF", text: "#0284C7", border: "#BAE6FD", label: "Past" };
    default: return { bg: "#FFFBEB", text: "#D97706", border: "#FDE68A", label: "Ochiq" };
  }
}

function ProgressBar({ value, max, color = "#1a5c3a" }) {
  const pct = Math.min((value / max) * 100, 100);
  return <div style={{ width: "100%", height: 10, borderRadius: 5, background: "#e8e0d4", overflow: "hidden" }}><div style={{ width: `${pct}%`, height: "100%", borderRadius: 5, background: `linear-gradient(90deg, ${color}, ${color}cc)`, transition: "width 1s ease-out" }} /></div>;
}

function StarIcon({ size = 14 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="#D4A017" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>;
}

function Field({ label, children, hint }) {
  return <div style={{ marginBottom: 16 }}><label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#4a4132", marginBottom: 5 }}>{label}</label>{children}{hint && <p style={{ fontSize: 11, color: "#a89d8c", margin: "4px 0 0" }}>{hint}</p>}</div>;
}

const inputStyle = { width: "100%", padding: "11px 14px", border: "2px solid #ddd5c5", borderRadius: 10, fontSize: 14, fontFamily: "'Noto Naskh Arabic', Georgia, serif", color: "#2d2418", outline: "none", boxSizing: "border-box", background: "#fff" };
const selectStyle = { ...inputStyle, cursor: "pointer" };
const baseFont = `'Noto Naskh Arabic', Georgia, serif`;
const headingFont = `'Playfair Display', Georgia, serif`;

export default function MosquePlatform() {
  const [mosques, setMosques] = useState(INITIAL_MOSQUES);
  const [activeTab, setActiveTab] = useState("Mosques");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedTaskType, setSelectedTaskType] = useState("All");
  const [selectedMosque, setSelectedMosque] = useState(null);
  const [animateIn, setAnimateIn] = useState(false);

  // Signup modal state
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupTask, setSignupTask] = useState(null);
  const [signupStatus, setSignupStatus] = useState("idle"); // idle | sending | success | error
  const [signupForm, setSignupForm] = useState({ name: "", phone: "", email: "", message: "" });

  // Admin state
  const [adminPanel, setAdminPanel] = useState(null);
  const [adminPin, setAdminPin] = useState("");
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminToast, setAdminToast] = useState(null);
  const [newMosque, setNewMosque] = useState({ name: "", region: "Toshkent", address: "", telegramChatId: "" });
  const [newTask, setNewTask] = useState({ mosqueId: "", type: "Cleaning", title: "", date: "", time: "", spots: "", urgency: "normal" });
  const [newCharity, setNewCharity] = useState({ mosqueId: "", goal: "", purpose: "", deadline: "" });

  useEffect(() => { setTimeout(() => setAnimateIn(true), 100); }, []);
  const showToast = (msg) => { setAdminToast(msg); setTimeout(() => setAdminToast(null), 3000); };

  /* ── Signup handler — sends to Telegram ── */
  const handleSignup = (task) => {
    setSignupTask(task);
    setSignupForm({ name: "", phone: "", email: "", message: "" });
    setSignupStatus("idle");
    setShowSignupModal(true);
  };

  const submitSignup = async () => {
    if (!signupForm.name.trim() || !signupForm.phone.trim()) {
      showToast("⚠️ Ism va telefon raqamini kiriting");
      return;
    }

    setSignupStatus("sending");

    try {
      // Find the mosque to get its Telegram chat ID
      const mosque = mosques.find(m => m.id === signupTask.mosqueId) || {};

      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          volunteerName: signupForm.name.trim(),
          phone: signupForm.phone.trim(),
          email: signupForm.email.trim(),
          message: signupForm.message.trim(),
          taskTitle: signupTask.title,
          taskDate: signupTask.date,
          taskTime: signupTask.time,
          mosqueName: signupTask.mosqueName || mosque.name || "Unknown",
          mosqueChatId: mosque.telegramChatId || "",
        }),
      });

      if (response.ok) {
        setSignupStatus("success");
        // Update filled count
        setMosques(prev => prev.map(m => ({
          ...m,
          tasks: m.tasks.map(t => t.id === signupTask.id ? { ...t, filled: t.filled + 1 } : t)
        })));
        setTimeout(() => { setShowSignupModal(false); setSignupTask(null); setSignupStatus("idle"); }, 2500);
      } else {
        setSignupStatus("error");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setSignupStatus("error");
    }
  };

  /* ── Admin handlers ── */
  const addMosque = () => {
    if (!newMosque.name.trim() || !newMosque.address.trim()) { showToast("⚠️ Nom va manzilni kiriting"); return; }
    setMosques(prev => [...prev, { id: Date.now(), name: newMosque.name.trim(), region: newMosque.region, address: newMosque.address.trim(), volunteers: 0, rating: 0, telegramChatId: newMosque.telegramChatId.trim(), tasks: [], charity: null }]);
    setNewMosque({ name: "", region: "Toshkent", address: "", telegramChatId: "" });
    showToast("✅ Masjid qo'shildi!");
  };

  const addTask = () => {
    const mid = parseInt(newTask.mosqueId);
    if (!mid || !newTask.title.trim() || !newTask.date || !newTask.time || !newTask.spots) { showToast("⚠️ Barcha maydonlarni to'ldiring"); return; }
    const task = { id: Date.now(), type: newTask.type, title: newTask.title.trim(), date: newTask.date, time: newTask.time, spots: parseInt(newTask.spots), filled: 0, urgency: newTask.urgency };
    setMosques(prev => prev.map(m => m.id === mid ? { ...m, tasks: [...m.tasks, task] } : m));
    setNewTask({ mosqueId: "", type: "Cleaning", title: "", date: "", time: "", spots: "", urgency: "normal" });
    showToast("✅ Vazifa qo'shildi!");
  };

  const addCharity = () => {
    const mid = parseInt(newCharity.mosqueId);
    if (!mid || !newCharity.goal || !newCharity.purpose.trim() || !newCharity.deadline) { showToast("⚠️ Barcha maydonlarni to'ldiring"); return; }
    setMosques(prev => prev.map(m => m.id === mid ? { ...m, charity: { goal: parseInt(newCharity.goal), raised: 0, currency: "UZS", purpose: newCharity.purpose.trim(), deadline: newCharity.deadline } } : m));
    setNewCharity({ mosqueId: "", goal: "", purpose: "", deadline: "" });
    showToast("✅ Xayriya yaratildi!");
  };

  const updateMosqueTelegram = (mosqueId, chatId) => {
    setMosques(prev => prev.map(m => m.id === mosqueId ? { ...m, telegramChatId: chatId } : m));
    showToast("✅ Telegram chat ID saqlandi!");
  };

  const deleteMosque = (id) => { if (window.confirm("Bu masjidni o'chirmoqchimisiz?")) { setMosques(prev => prev.filter(m => m.id !== id)); showToast("🗑️ Masjid o'chirildi"); } };
  const deleteTask = (mosqueId, taskId) => { setMosques(prev => prev.map(m => m.id === mosqueId ? { ...m, tasks: m.tasks.filter(t => t.id !== taskId) } : m)); showToast("🗑️ Vazifa o'chirildi"); };
  const deleteCharity = (mosqueId) => { setMosques(prev => prev.map(m => m.id === mosqueId ? { ...m, charity: null } : m)); showToast("🗑️ Xayriya o'chirildi"); };

  /* ── Filtering ── */
  const filteredMosques = mosques.filter(m => {
    const matchS = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.address.toLowerCase().includes(searchQuery.toLowerCase());
    return (selectedRegion === "All" || m.region === selectedRegion) && matchS;
  });

  const allTasks = mosques.flatMap(m => m.tasks.map(t => ({ ...t, mosqueName: m.name, mosqueRegion: m.region, mosqueId: m.id }))).filter(t => {
    const matchS = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.mosqueName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchR = selectedRegion === "All" || mosques.find(m => m.id === t.mosqueId)?.region === selectedRegion;
    return matchS && matchR && (selectedTaskType === "All" || t.type === selectedTaskType);
  });

  const allCharity = mosques.filter(m => m.charity).map(m => ({ ...m.charity, mosqueName: m.name, mosqueRegion: m.region, mosqueId: m.id })).filter(c => {
    const matchS = c.mosqueName.toLowerCase().includes(searchQuery.toLowerCase()) || c.purpose.toLowerCase().includes(searchQuery.toLowerCase());
    return (selectedRegion === "All" || mosques.find(m => m.id === c.mosqueId)?.region === selectedRegion) && matchS;
  });

  const totalVolunteers = mosques.reduce((s, m) => s + m.volunteers, 0);
  const totalOpenSpots = allTasks.reduce((s, t) => s + Math.max(t.spots - t.filled, 0), 0);
  const totalCharityGoal = mosques.reduce((s, m) => s + (m.charity?.goal || 0), 0);
  const totalCharityRaised = mosques.reduce((s, m) => s + (m.charity?.raised || 0), 0);

  const tabs = ["Mosques", "Volunteer", "Charity"];
  const adminTabs = [{ key: "mosque", icon: "🕌", label: "Masjid Qo'shish" }, { key: "task", icon: "📋", label: "Vazifa Qo'shish" }, { key: "charity", icon: "💚", label: "Xayriya" }, { key: "telegram", icon: "📱", label: "Telegram" }, { key: "manage", icon: "⚙️", label: "Boshqarish" }];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(170deg, #f5f0e8 0%, #ede7db 40%, #e8dfd0 100%)", fontFamily: baseFont, color: "#2d2418", position: "relative", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* HEADER */}
      <header style={{ background: "linear-gradient(135deg, #1a5c3a 0%, #0f3d26 60%, #0a2e1c 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(212,160,23,0.03) 20px, rgba(212,160,23,0.03) 40px)` }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px 24px", position: "relative", zIndex: 1, opacity: animateIn ? 1 : 0, transform: animateIn ? "translateY(0)" : "translateY(-20px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, #D4A017, #b8860b)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, boxShadow: "0 4px 20px rgba(212,160,23,0.3)" }}>☪</div>
              <div>
                <h1 style={{ fontFamily: headingFont, fontSize: 28, fontWeight: 800, color: "#fff", margin: 0 }}>Masjidlar.uz</h1>
                <p style={{ color: "#D4A017", fontSize: 12, margin: 0, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase" }}>Uzbekiston Masjidlari — Volontyorlik & Xayriya</p>
              </div>
            </div>
            <button onClick={() => { if (adminPanel) setAdminPanel(null); else setAdminPanel(adminUnlocked ? "mosque" : "login"); }}
              style={{ padding: "10px 20px", borderRadius: 10, border: adminPanel ? "2px solid rgba(212,160,23,0.6)" : "2px solid rgba(255,255,255,0.15)", background: adminPanel ? "rgba(212,160,23,0.15)" : "rgba(255,255,255,0.08)", color: adminPanel ? "#D4A017" : "rgba(255,255,255,0.7)", fontFamily: baseFont, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.3s" }}>
              {adminPanel ? "✕ Yopish" : "🔑 Admin Panel"}
            </button>
          </div>
          <div style={{ display: "flex", gap: 20, marginTop: 18, flexWrap: "wrap" }}>
            {[{ label: "Masjidlar", value: mosques.length, icon: "🕌" }, { label: "Volontyorlar", value: totalVolunteers, icon: "🤝" }, { label: "Bo'sh joylar", value: totalOpenSpots, icon: "📋" }, { label: "Xayriya", value: Math.round(totalCharityRaised / 1000000) + "M", icon: "💚" }].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "7px 14px", border: "1px solid rgba(212,160,23,0.12)" }}>
                <span style={{ fontSize: 16 }}>{s.icon}</span>
                <div>
                  <div style={{ color: "#D4A017", fontFamily: headingFont, fontSize: 17, fontWeight: 700 }}>{s.value}</div>
                  <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 24px 60px", position: "relative", zIndex: 1 }}>

        {/* ═══ ADMIN PANEL ═══ */}
        {adminPanel && (
          <div style={{ background: "#fff", borderRadius: 16, marginBottom: 24, overflow: "hidden", border: "2px solid #D4A017", boxShadow: "0 8px 32px rgba(212,160,23,0.12)" }}>
            <div style={{ background: "linear-gradient(135deg, #D4A017, #b8860b)", padding: "16px 24px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>🔑</span>
              <h2 style={{ fontFamily: headingFont, fontSize: 20, fontWeight: 700, color: "#fff", margin: 0 }}>Admin Panel</h2>
            </div>

            {!adminUnlocked ? (
              <div style={{ padding: "40px 24px", textAlign: "center", maxWidth: 360, margin: "0 auto" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🔒</div>
                <h3 style={{ fontFamily: headingFont, fontSize: 18, marginBottom: 6 }}>Admin PIN kiriting</h3>
                <p style={{ color: "#8a7e6b", fontSize: 13, marginBottom: 20 }}>Standart PIN: <strong>1234</strong></p>
                <input type="password" placeholder="PIN" value={adminPin} onChange={e => setAdminPin(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") { if (adminPin === "1234") { setAdminUnlocked(true); setAdminPanel("mosque"); } else showToast("⚠️ Noto'g'ri PIN"); } }}
                  style={{ ...inputStyle, textAlign: "center", fontSize: 22, letterSpacing: 8, maxWidth: 200, margin: "0 auto" }} />
                <button onClick={() => { if (adminPin === "1234") { setAdminUnlocked(true); setAdminPanel("mosque"); } else showToast("⚠️ Noto'g'ri PIN"); }}
                  style={{ display: "block", margin: "16px auto 0", padding: "12px 40px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #D4A017, #b8860b)", color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: headingFont, cursor: "pointer" }}>
                  Ochish
                </button>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", borderBottom: "1px solid #e8e0d4", background: "#faf7f0", overflowX: "auto" }}>
                  {adminTabs.map(t => (
                    <button key={t.key} onClick={() => setAdminPanel(t.key)} style={{
                      flex: 1, minWidth: 90, padding: "13px 6px", border: "none", cursor: "pointer", fontFamily: baseFont, fontSize: 12, fontWeight: 600,
                      background: adminPanel === t.key ? "#fff" : "transparent", color: adminPanel === t.key ? "#D4A017" : "#8a7e6b",
                      borderBottom: adminPanel === t.key ? "3px solid #D4A017" : "3px solid transparent", transition: "all .2s", whiteSpace: "nowrap",
                    }}>{t.icon} {t.label}</button>
                  ))}
                </div>
                <div style={{ padding: 24 }}>

                  {adminPanel === "mosque" && (
                    <div style={{ maxWidth: 520 }}>
                      <h3 style={{ fontFamily: headingFont, fontSize: 18, color: "#1a5c3a", margin: "0 0 20px" }}>🕌 Yangi Masjid Qo'shish</h3>
                      <Field label="Masjid nomi *"><input style={inputStyle} placeholder="masalan: Tilla Sheikh Masjidi" value={newMosque.name} onChange={e => setNewMosque({ ...newMosque, name: e.target.value })} /></Field>
                      <Field label="Viloyat *"><select style={selectStyle} value={newMosque.region} onChange={e => setNewMosque({ ...newMosque, region: e.target.value })}>{REGIONS.map(r => <option key={r} value={r}>{r}</option>)}</select></Field>
                      <Field label="Manzil *"><input style={inputStyle} placeholder="masalan: Toshkent, Hazrati Imom maydoni" value={newMosque.address} onChange={e => setNewMosque({ ...newMosque, address: e.target.value })} /></Field>
                      <Field label="Telegram Chat ID" hint="Ixtiyoriy — masjid guruhining chat ID raqami (📱 Telegram bo'limida qanday olishni o'qing)">
                        <input style={inputStyle} placeholder="masalan: -1001234567890" value={newMosque.telegramChatId} onChange={e => setNewMosque({ ...newMosque, telegramChatId: e.target.value })} />
                      </Field>
                      <button onClick={addMosque} style={{ padding: "13px 32px", borderRadius: 10, border: "none", cursor: "pointer", background: "linear-gradient(135deg, #1a5c3a, #0f3d26)", color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: headingFont }}>+ Masjid Qo'shish</button>
                    </div>
                  )}

                  {adminPanel === "task" && (
                    <div style={{ maxWidth: 520 }}>
                      <h3 style={{ fontFamily: headingFont, fontSize: 18, color: "#1a5c3a", margin: "0 0 20px" }}>📋 Volontyorlik Vazifasi Qo'shish</h3>
                      <Field label="Masjidni tanlang *"><select style={selectStyle} value={newTask.mosqueId} onChange={e => setNewTask({ ...newTask, mosqueId: e.target.value })}><option value="">— Masjid tanlang —</option>{mosques.map(m => <option key={m.id} value={m.id}>{m.name} ({m.region})</option>)}</select></Field>
                      <Field label="Vazifa turi *"><select style={selectStyle} value={newTask.type} onChange={e => setNewTask({ ...newTask, type: e.target.value })}>{TASK_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select></Field>
                      <Field label="Vazifa nomi *"><input style={inputStyle} placeholder="masalan: Juma tozalash" value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} /></Field>
                      <div style={{ display: "flex", gap: 12 }}>
                        <Field label="Sana *"><input type="date" style={inputStyle} value={newTask.date} onChange={e => setNewTask({ ...newTask, date: e.target.value })} /></Field>
                        <Field label="Vaqt *"><input type="time" style={inputStyle} value={newTask.time} onChange={e => setNewTask({ ...newTask, time: e.target.value })} /></Field>
                      </div>
                      <div style={{ display: "flex", gap: 12 }}>
                        <Field label="Joylar soni *"><input type="number" min="1" style={inputStyle} placeholder="10" value={newTask.spots} onChange={e => setNewTask({ ...newTask, spots: e.target.value })} /></Field>
                        <Field label="Shoshilinchlik"><select style={selectStyle} value={newTask.urgency} onChange={e => setNewTask({ ...newTask, urgency: e.target.value })}><option value="low">Past</option><option value="normal">Oddiy</option><option value="high">Shoshilinch</option></select></Field>
                      </div>
                      <button onClick={addTask} style={{ padding: "13px 32px", borderRadius: 10, border: "none", cursor: "pointer", background: "linear-gradient(135deg, #1a5c3a, #0f3d26)", color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: headingFont }}>+ Vazifa Qo'shish</button>
                    </div>
                  )}

                  {adminPanel === "charity" && (
                    <div style={{ maxWidth: 520 }}>
                      <h3 style={{ fontFamily: headingFont, fontSize: 18, color: "#D4A017", margin: "0 0 20px" }}>💚 Xayriya Kampaniyasi Yaratish</h3>
                      <Field label="Masjidni tanlang *"><select style={selectStyle} value={newCharity.mosqueId} onChange={e => setNewCharity({ ...newCharity, mosqueId: e.target.value })}><option value="">— Masjid tanlang —</option>{mosques.map(m => <option key={m.id} value={m.id}>{m.name} {m.charity ? "⚠️" : ""}</option>)}</select></Field>
                      <Field label="Maqsad summasi (UZS) *">
                        <input type="number" min="0" style={inputStyle} placeholder="20000000" value={newCharity.goal} onChange={e => setNewCharity({ ...newCharity, goal: e.target.value })} />
                        {newCharity.goal && <p style={{ fontSize: 12, color: "#1a5c3a", margin: "4px 0 0", fontWeight: 600 }}>= {formatUZS(parseInt(newCharity.goal) || 0)}</p>}
                      </Field>
                      <Field label="Maqsadi *"><input style={inputStyle} placeholder="masalan: Isitish tizimini yangilash" value={newCharity.purpose} onChange={e => setNewCharity({ ...newCharity, purpose: e.target.value })} /></Field>
                      <Field label="Muddat *"><input type="date" style={inputStyle} value={newCharity.deadline} onChange={e => setNewCharity({ ...newCharity, deadline: e.target.value })} /></Field>
                      <button onClick={addCharity} style={{ padding: "13px 32px", borderRadius: 10, border: "none", cursor: "pointer", background: "linear-gradient(135deg, #D4A017, #b8860b)", color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: headingFont }}>+ Kampaniya Yaratish</button>
                    </div>
                  )}

                  {/* ── TELEGRAM SETUP ── */}
                  {adminPanel === "telegram" && (
                    <div style={{ maxWidth: 640 }}>
                      <h3 style={{ fontFamily: headingFont, fontSize: 18, color: "#0088cc", margin: "0 0 8px" }}>📱 Telegram Sozlamalari</h3>
                      <p style={{ color: "#8a7e6b", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
                        Volontyorlar ro'yxatdan o'tganda Telegram orqali xabar olasiz. Har bir masjidning o'z guruhiga xabar yuboriladi.
                      </p>

                      {/* Step by step guide */}
                      <div style={{ background: "#f0f8ff", borderRadius: 12, padding: 20, marginBottom: 24, border: "1px solid #bae0ff" }}>
                        <h4 style={{ fontFamily: headingFont, fontSize: 16, color: "#0088cc", margin: "0 0 14px" }}>Telegram Bot Yaratish (bir marta):</h4>
                        <div style={{ fontSize: 14, lineHeight: 1.8, color: "#333" }}>
                          <p><strong>1.</strong> Telegram'da <span style={{ background: "#e3f2fd", padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>@BotFather</span> ni oching</p>
                          <p><strong>2.</strong> <span style={{ background: "#e3f2fd", padding: "2px 8px", borderRadius: 4 }}>/newbot</span> yozing va botga nom bering (masalan: "Masjidlar Volunteer Bot")</p>
                          <p><strong>3.</strong> BotFather sizga <strong>Bot Token</strong> beradi (masalan: <code style={{ background: "#eee", padding: "2px 6px", borderRadius: 3, fontSize: 12 }}>7123456789:AAHfiqksKZ8...</code>)</p>
                          <p><strong>4.</strong> Bu tokenni Vercel'da <strong>TELEGRAM_BOT_TOKEN</strong> deb saqlang</p>
                        </div>
                      </div>

                      <div style={{ background: "#f0fff4", borderRadius: 12, padding: 20, marginBottom: 24, border: "1px solid #b7e4c7" }}>
                        <h4 style={{ fontFamily: headingFont, fontSize: 16, color: "#1a5c3a", margin: "0 0 14px" }}>Har bir masjid uchun Telegram guruh:</h4>
                        <div style={{ fontSize: 14, lineHeight: 1.8, color: "#333" }}>
                          <p><strong>1.</strong> Telegram'da yangi guruh yarating (masalan: "Minor Masjidi - Volontyorlar")</p>
                          <p><strong>2.</strong> Botingizni guruhga qo'shing va admin qiling</p>
                          <p><strong>3.</strong> Guruhga biror xabar yozing, keyin brauzerda oching:</p>
                          <code style={{ display: "block", background: "#eee", padding: 10, borderRadius: 8, fontSize: 12, margin: "8px 0", wordBreak: "break-all" }}>
                            https://api.telegram.org/bot[YOUR_TOKEN]/getUpdates
                          </code>
                          <p><strong>4.</strong> Javobdan <strong>"chat": {`{"id": -100...}`}</strong> raqamini ko'chirib oling</p>
                          <p><strong>5.</strong> Pastdagi masjidlar ro'yxatiga shu raqamni kiriting</p>
                        </div>
                      </div>

                      {/* Per-mosque Telegram setup */}
                      <h4 style={{ fontFamily: headingFont, fontSize: 16, color: "#2d2418", margin: "0 0 14px" }}>Masjidlar Telegram Chat ID:</h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {mosques.map(m => (
                          <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 10, background: "#faf7f0", borderRadius: 10, padding: "10px 14px", border: "1px solid #e8e0d4", flexWrap: "wrap" }}>
                            <div style={{ flex: "1 1 180px" }}>
                              <span style={{ fontWeight: 600, fontSize: 14 }}>🕌 {m.name}</span>
                              <span style={{ fontSize: 12, color: "#8a7e6b", marginLeft: 8 }}>{m.region}</span>
                            </div>
                            <div style={{ display: "flex", gap: 8, flex: "1 1 260px", alignItems: "center" }}>
                              <input
                                style={{ ...inputStyle, fontSize: 13, padding: "8px 12px" }}
                                placeholder="masalan: -1001234567890"
                                value={m.telegramChatId || ""}
                                onChange={e => setMosques(prev => prev.map(mo => mo.id === m.id ? { ...mo, telegramChatId: e.target.value } : mo))}
                              />
                              {m.telegramChatId ? <span style={{ color: "#16A34A", fontSize: 18 }} title="Chat ID kiritilgan">✅</span> : <span style={{ color: "#ccc", fontSize: 18 }} title="Chat ID kiritilmagan">⭕</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {adminPanel === "manage" && (
                    <div>
                      <h3 style={{ fontFamily: headingFont, fontSize: 18, color: "#2d2418", margin: "0 0 20px" }}>⚙️ Barcha Kontentni Boshqarish</h3>
                      {mosques.length === 0 && <p style={{ color: "#8a7e6b" }}>Hali masjid yo'q.</p>}
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {mosques.map(m => (
                          <div key={m.id} style={{ background: "#faf7f0", borderRadius: 12, padding: 16, border: "1px solid #e8e0d4" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                              <div>
                                <h4 style={{ fontFamily: headingFont, fontSize: 16, margin: 0, color: "#1a5c3a" }}>🕌 {m.name} {m.telegramChatId ? "📱" : ""}</h4>
                                <p style={{ fontSize: 13, color: "#8a7e6b", margin: "2px 0" }}>{m.region} — {m.address}</p>
                              </div>
                              <button onClick={() => deleteMosque(m.id)} style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid #FECACA", background: "#FEF2F2", color: "#DC2626", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: baseFont }}>🗑️ O'chirish</button>
                            </div>
                            {m.tasks.length > 0 && (
                              <div style={{ marginTop: 10 }}>
                                <p style={{ fontSize: 12, fontWeight: 600, color: "#6b5d48", marginBottom: 6 }}>Vazifalar ({m.tasks.length}):</p>
                                {m.tasks.map(t => (
                                  <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 10px", background: "#fff", borderRadius: 8, marginBottom: 4, fontSize: 13 }}>
                                    <span>📋 {t.title} <span style={{ color: "#8a7e6b" }}>({t.type}, {t.date})</span></span>
                                    <button onClick={() => deleteTask(m.id, t.id)} style={{ background: "none", border: "none", color: "#DC2626", cursor: "pointer", fontSize: 14, padding: "2px 6px" }}>✕</button>
                                  </div>
                                ))}
                              </div>
                            )}
                            {m.charity && (
                              <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", background: "#fff", borderRadius: 8, fontSize: 13 }}>
                                <span>💚 {m.charity.purpose} — {formatUZS(m.charity.goal)}</span>
                                <button onClick={() => deleteCharity(m.id)} style={{ background: "none", border: "none", color: "#DC2626", cursor: "pointer", fontSize: 14, padding: "2px 6px" }}>✕</button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══ MAIN TABS ═══ */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "#ddd5c5", borderRadius: 14, padding: 4 }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, padding: "12px 8px", border: "none", cursor: "pointer", borderRadius: 11, fontFamily: headingFont, fontSize: 15, fontWeight: 600, background: activeTab === tab ? "#fff" : "transparent", color: activeTab === tab ? "#1a5c3a" : "#8a7e6b", boxShadow: activeTab === tab ? "0 2px 8px rgba(0,0,0,0.08)" : "none", transition: "all 0.3s" }}>
              {tab === "Mosques" && "🕌 "}{tab === "Volunteer" && "🤝 "}{tab === "Charity" && "💚 "}{tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 300px", position: "relative" }}>
            <input type="text" placeholder="Qidirish..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ ...inputStyle, paddingLeft: 44 }} />
            <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 18, opacity: 0.4 }}>🔍</span>
          </div>
          <select value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)} style={{ ...selectStyle, width: "auto", minWidth: 160 }}><option value="All">Barcha viloyatlar</option>{REGIONS.map(r => <option key={r} value={r}>{r}</option>)}</select>
          {activeTab === "Volunteer" && <select value={selectedTaskType} onChange={e => setSelectedTaskType(e.target.value)} style={{ ...selectStyle, width: "auto", minWidth: 140 }}><option value="All">Barcha turlar</option>{TASK_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select>}
        </div>

        {/* ═══ MOSQUES TAB ═══ */}
        {activeTab === "Mosques" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
            {filteredMosques.map((mosque, i) => (
              <div key={mosque.id} onClick={() => setSelectedMosque(selectedMosque?.id === mosque.id ? null : mosque)} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: selectedMosque?.id === mosque.id ? "2px solid #1a5c3a" : "2px solid transparent", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", cursor: "pointer", opacity: animateIn ? 1 : 0, transform: animateIn ? "translateY(0)" : "translateY(30px)", transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s` }}>
                <div style={{ background: "linear-gradient(135deg, #1a5c3a, #0f3d26)", padding: "18px 20px 14px", position: "relative" }}>
                  <div style={{ position: "absolute", inset: 0, opacity: 0.08, background: `repeating-linear-gradient(60deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)` }} />
                  <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <h3 style={{ fontFamily: headingFont, fontSize: 18, fontWeight: 700, color: "#fff", margin: "0 0 3px" }}>{mosque.name}</h3>
                      <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, margin: 0 }}>📍 {mosque.address}</p>
                    </div>
                    {mosque.rating > 0 && <div style={{ background: "rgba(212,160,23,0.2)", borderRadius: 8, padding: "3px 9px", display: "flex", alignItems: "center", gap: 3 }}><StarIcon /><span style={{ color: "#D4A017", fontSize: 13, fontWeight: 600 }}>{mosque.rating}</span></div>}
                  </div>
                </div>
                <div style={{ padding: "16px 20px" }}>
                  <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
                    <div style={{ textAlign: "center" }}><div style={{ fontSize: 20, fontWeight: 700, fontFamily: headingFont, color: "#1a5c3a" }}>{mosque.volunteers}</div><div style={{ fontSize: 10, color: "#8a7e6b", textTransform: "uppercase", letterSpacing: 1 }}>Volontyorlar</div></div>
                    <div style={{ width: 1, background: "#e8e0d4" }} />
                    <div style={{ textAlign: "center" }}><div style={{ fontSize: 20, fontWeight: 700, fontFamily: headingFont, color: "#1a5c3a" }}>{mosque.tasks.length}</div><div style={{ fontSize: 10, color: "#8a7e6b", textTransform: "uppercase", letterSpacing: 1 }}>Vazifalar</div></div>
                    <div style={{ width: 1, background: "#e8e0d4" }} />
                    <div style={{ textAlign: "center" }}><div style={{ fontSize: 16, fontWeight: 700, fontFamily: headingFont, color: "#D4A017" }}>{mosque.region}</div><div style={{ fontSize: 10, color: "#8a7e6b", textTransform: "uppercase", letterSpacing: 1 }}>Viloyat</div></div>
                  </div>
                  {mosque.charity && (
                    <div style={{ background: "#faf7f0", borderRadius: 10, padding: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}><span style={{ fontSize: 11, fontWeight: 600, color: "#1a5c3a" }}>💚 Xayriya</span><span style={{ fontSize: 11, color: "#8a7e6b" }}>{Math.round((mosque.charity.raised / mosque.charity.goal) * 100)}%</span></div>
                      <ProgressBar value={mosque.charity.raised} max={mosque.charity.goal} />
                      <p style={{ fontSize: 11, color: "#8a7e6b", margin: "5px 0 0" }}>{mosque.charity.purpose}</p>
                    </div>
                  )}
                </div>
                {selectedMosque?.id === mosque.id && (
                  <div style={{ borderTop: "1px solid #e8e0d4", padding: 20, background: "#faf7f0" }}>
                    <h4 style={{ fontFamily: headingFont, fontSize: 15, marginBottom: 10, color: "#1a5c3a" }}>Volontyorlik Imkoniyatlari</h4>
                    {mosque.tasks.length === 0 && <p style={{ fontSize: 13, color: "#8a7e6b" }}>Hali vazifa yo'q.</p>}
                    {mosque.tasks.map(task => { const urg = getUrgencyColor(task.urgency); const isFull = task.filled >= task.spots; return (
                      <div key={task.id} style={{ background: "#fff", borderRadius: 10, padding: 12, marginBottom: 8, border: `1px solid ${isFull ? "#BBF7D0" : urg.border}` }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                          <div><span style={{ display: "inline-block", padding: "2px 7px", borderRadius: 6, background: isFull ? "#F0FDF4" : urg.bg, color: isFull ? "#16A34A" : urg.text, fontSize: 10, fontWeight: 600, marginRight: 6 }}>{isFull ? "To'lgan" : urg.label}</span><span style={{ display: "inline-block", padding: "2px 7px", borderRadius: 6, background: "#f0f0f0", color: "#666", fontSize: 10, fontWeight: 500 }}>{task.type}</span></div>
                          {!isFull && <button onClick={e => { e.stopPropagation(); handleSignup({ ...task, mosqueName: mosque.name, mosqueId: mosque.id }); }} style={{ padding: "5px 14px", borderRadius: 8, border: "none", cursor: "pointer", background: "linear-gradient(135deg, #1a5c3a, #0f3d26)", color: "#fff", fontSize: 11, fontWeight: 600, fontFamily: baseFont }}>Ro'yxatdan o'tish</button>}
                        </div>
                        <p style={{ fontWeight: 600, margin: "6px 0 3px", fontSize: 13 }}>{task.title}</p>
                        <p style={{ fontSize: 12, color: "#8a7e6b", margin: 0 }}>📅 {task.date} · 🕐 {task.time} · 👥 {task.filled}/{task.spots}</p>
                      </div>
                    ); })}
                    {mosque.charity && (<>
                      <h4 style={{ fontFamily: headingFont, fontSize: 15, margin: "18px 0 10px", color: "#D4A017" }}>💚 Xayriya Kampaniyasi</h4>
                      <div style={{ background: "#fff", borderRadius: 10, padding: 14, border: "1px solid #e8e0d4" }}>
                        <p style={{ fontWeight: 600, margin: "0 0 8px", fontSize: 14 }}>{mosque.charity.purpose}</p>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 12, color: "#8a7e6b" }}>Yig'ildi: <strong style={{ color: "#1a5c3a" }}>{formatUZS(mosque.charity.raised)}</strong></span><span style={{ fontSize: 12, color: "#8a7e6b" }}>Maqsad: <strong>{formatUZS(mosque.charity.goal)}</strong></span></div>
                        <ProgressBar value={mosque.charity.raised} max={mosque.charity.goal} color="#D4A017" />
                      </div>
                    </>)}
                  </div>
                )}
              </div>
            ))}
            {filteredMosques.length === 0 && <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: 60, color: "#8a7e6b" }}><div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div><p style={{ fontFamily: headingFont, fontSize: 18 }}>Masjid topilmadi</p></div>}
          </div>
        )}

        {/* ═══ VOLUNTEER TAB ═══ */}
        {activeTab === "Volunteer" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {allTasks.length === 0 && <div style={{ textAlign: "center", padding: 60, color: "#8a7e6b" }}><div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div><p style={{ fontFamily: headingFont, fontSize: 18 }}>Vazifa topilmadi</p></div>}
            {allTasks.map((task, i) => { const urg = getUrgencyColor(task.urgency); const isFull = task.filled >= task.spots; return (
              <div key={task.id + "-" + i} style={{ background: "#fff", borderRadius: 14, padding: 18, border: `1px solid ${isFull ? "#BBF7D0" : urg.border}`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, opacity: animateIn ? 1 : 0, transform: animateIn ? "translateX(0)" : "translateX(-20px)", transition: `all 0.5s ease ${i * 0.05}s` }}>
                <div style={{ flex: "1 1 260px" }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap" }}><span style={{ padding: "2px 8px", borderRadius: 6, background: isFull ? "#F0FDF4" : urg.bg, color: isFull ? "#16A34A" : urg.text, fontSize: 10, fontWeight: 600 }}>{isFull ? "To'lgan" : urg.label}</span><span style={{ padding: "2px 8px", borderRadius: 6, background: "#f0ebe0", color: "#6b5d48", fontSize: 10, fontWeight: 600 }}>{task.type}</span></div>
                  <h3 style={{ fontFamily: headingFont, fontSize: 16, fontWeight: 700, margin: "0 0 3px" }}>{task.title}</h3>
                  <p style={{ color: "#1a5c3a", fontSize: 13, fontWeight: 600, margin: "0 0 3px" }}>🕌 {task.mosqueName}</p>
                  <p style={{ fontSize: 12, color: "#8a7e6b", margin: 0 }}>📅 {task.date} · 🕐 {task.time} · 👥 {task.filled}/{task.spots}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                  <div style={{ width: 90 }}><ProgressBar value={task.filled} max={task.spots} color={isFull ? "#16A34A" : urg.text} /></div>
                  {!isFull ? <button onClick={() => handleSignup(task)} style={{ padding: "10px 24px", borderRadius: 10, border: "none", cursor: "pointer", background: "linear-gradient(135deg, #1a5c3a, #0f3d26)", color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: baseFont, boxShadow: "0 4px 12px rgba(26,92,58,0.3)" }}>Volontyor bo'lish</button> : <span style={{ color: "#16A34A", fontSize: 12, fontWeight: 600 }}>✅ To'lgan</span>}
                </div>
              </div>
            ); })}
          </div>
        )}

        {/* ═══ CHARITY TAB ═══ */}
        {activeTab === "Charity" && (
          <div>
            <div style={{ background: "linear-gradient(135deg, #1a5c3a, #0f3d26)", borderRadius: 16, padding: 24, marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16, textAlign: "center" }}>
                <div><div style={{ color: "#D4A017", fontFamily: headingFont, fontSize: 22, fontWeight: 700 }}>{formatUZS(totalCharityRaised)}</div><div style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginTop: 3 }}>Yig'ildi</div></div>
                <div style={{ width: 1, background: "rgba(255,255,255,0.1)" }} />
                <div><div style={{ color: "#fff", fontFamily: headingFont, fontSize: 22, fontWeight: 700 }}>{formatUZS(totalCharityGoal)}</div><div style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginTop: 3 }}>Maqsad</div></div>
                <div style={{ width: 1, background: "rgba(255,255,255,0.1)" }} />
                <div><div style={{ color: "#D4A017", fontFamily: headingFont, fontSize: 22, fontWeight: 700 }}>{totalCharityGoal > 0 ? Math.round((totalCharityRaised / totalCharityGoal) * 100) : 0}%</div><div style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginTop: 3 }}>Jarayon</div></div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))", gap: 20 }}>
              {allCharity.map((c, i) => { const pct = Math.round((c.raised / c.goal) * 100); return (
                <div key={c.mosqueId} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", opacity: animateIn ? 1 : 0, transform: animateIn ? "translateY(0)" : "translateY(20px)", transition: `all 0.6s ease ${i * 0.08}s` }}>
                  <div style={{ background: pct >= 80 ? "linear-gradient(135deg, #D4A017, #b8860b)" : "linear-gradient(135deg, #1a5c3a, #0f3d26)", padding: "14px 18px" }}><h3 style={{ fontFamily: headingFont, fontSize: 16, fontWeight: 700, color: "#fff", margin: 0 }}>🕌 {c.mosqueName}</h3><p style={{ color: "rgba(255,255,255,0.65)", fontSize: 11, margin: "2px 0 0" }}>{c.mosqueRegion}</p></div>
                  <div style={{ padding: 18 }}>
                    <p style={{ fontWeight: 600, fontSize: 14, margin: "0 0 14px", lineHeight: 1.4 }}>{c.purpose}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 12, color: "#8a7e6b" }}>Jarayon</span><span style={{ fontSize: 13, fontWeight: 700, color: pct >= 80 ? "#D4A017" : "#1a5c3a" }}>{pct}%</span></div>
                    <ProgressBar value={c.raised} max={c.goal} color={pct >= 80 ? "#D4A017" : "#1a5c3a"} />
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, padding: "10px 0 0", borderTop: "1px solid #e8e0d4" }}>
                      <div><div style={{ fontSize: 10, color: "#8a7e6b", textTransform: "uppercase", letterSpacing: 1 }}>Yig'ildi</div><div style={{ fontSize: 14, fontWeight: 700, color: "#1a5c3a" }}>{formatUZS(c.raised)}</div></div>
                      <div style={{ textAlign: "right" }}><div style={{ fontSize: 10, color: "#8a7e6b", textTransform: "uppercase", letterSpacing: 1 }}>Qoldi</div><div style={{ fontSize: 14, fontWeight: 700, color: "#D4A017" }}>{formatUZS(c.goal - c.raised)}</div></div>
                    </div>
                    <button style={{ width: "100%", padding: "11px", marginTop: 12, borderRadius: 10, border: "none", cursor: "pointer", background: pct >= 80 ? "linear-gradient(135deg, #D4A017, #b8860b)" : "linear-gradient(135deg, #1a5c3a, #0f3d26)", color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: headingFont }}>{pct >= 100 ? "🎉 Maqsadga erishildi!" : "Xayriya qilish"}</button>
                  </div>
                </div>
              ); })}
            </div>
          </div>
        )}
      </main>

      <footer style={{ background: "linear-gradient(135deg, #0f3d26, #0a2e1c)", padding: 20, textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, margin: 0 }}>Masjidlar.uz — Jamiyatlarni bog'laymiz</p>
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 10, margin: "3px 0 0" }}>❤️ bilan yaratilgan · Barcha huquqlar himoyalangan</p>
      </footer>

      {/* ═══ SIGNUP MODAL with Telegram ═══ */}
      {showSignupModal && signupTask && (
        <div onClick={() => { if (signupStatus !== "sending") setShowSignupModal(false); }} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 20, padding: 28, maxWidth: 440, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", animation: "scaleIn .3s ease" }}>
            {signupStatus === "success" ? (
              <div style={{ textAlign: "center", padding: "12px 0" }}>
                <div style={{ fontSize: 52, marginBottom: 10 }}>✅</div>
                <h3 style={{ fontFamily: headingFont, fontSize: 20, color: "#1a5c3a" }}>JazakAllahu Khayran!</h3>
                <p style={{ color: "#8a7e6b", fontSize: 14 }}>Ro'yxatdan muvaffaqiyatli o'tdingiz.</p>
                <p style={{ color: "#0088cc", fontSize: 13, marginTop: 8 }}>📱 Masjid ma'muriga Telegram orqali xabar yuborildi</p>
              </div>
            ) : signupStatus === "error" ? (
              <div style={{ textAlign: "center", padding: "12px 0" }}>
                <div style={{ fontSize: 52, marginBottom: 10 }}>⚠️</div>
                <h3 style={{ fontFamily: headingFont, fontSize: 20, color: "#DC2626" }}>Xatolik yuz berdi</h3>
                <p style={{ color: "#8a7e6b", fontSize: 14 }}>Iltimos, qaytadan urinib ko'ring yoki masjid bilan to'g'ridan-to'g'ri bog'laning.</p>
                <button onClick={() => setSignupStatus("idle")} style={{ marginTop: 12, padding: "10px 24px", borderRadius: 10, border: "none", background: "#1a5c3a", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: baseFont }}>Qaytadan urinish</button>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: headingFont, fontSize: 20, color: "#1a5c3a", margin: "0 0 4px" }}>Volontyor Ro'yxatdan O'tish</h3>
                <p style={{ color: "#8a7e6b", margin: "0 0 6px", fontSize: 13 }}>{signupTask.title} — {signupTask.mosqueName || ""}</p>
                <p style={{ color: "#0088cc", margin: "0 0 18px", fontSize: 12 }}>📱 Ma'lumotlaringiz Telegram orqali masjid ma'muriga yuboriladi</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div>
                    <input placeholder="Ism va familiya *" style={inputStyle} value={signupForm.name} onChange={e => setSignupForm({ ...signupForm, name: e.target.value })} />
                  </div>
                  <div>
                    <input placeholder="Telefon raqam * (masalan: +998901234567)" type="tel" style={inputStyle} value={signupForm.phone} onChange={e => setSignupForm({ ...signupForm, phone: e.target.value })} />
                  </div>
                  <input placeholder="Email (ixtiyoriy)" type="email" style={inputStyle} value={signupForm.email} onChange={e => setSignupForm({ ...signupForm, email: e.target.value })} />
                  <textarea placeholder="Qo'shimcha xabar..." rows={3} style={{ ...inputStyle, resize: "vertical" }} value={signupForm.message} onChange={e => setSignupForm({ ...signupForm, message: e.target.value })} />
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
                  <button onClick={() => setShowSignupModal(false)} style={{ flex: 1, padding: "11px", borderRadius: 10, border: "2px solid #e8e0d4", background: "transparent", fontSize: 13, fontWeight: 600, fontFamily: baseFont, cursor: "pointer", color: "#8a7e6b" }}>Bekor qilish</button>
                  <button onClick={submitSignup} disabled={signupStatus === "sending"} style={{ flex: 1, padding: "11px", borderRadius: 10, border: "none", background: signupStatus === "sending" ? "#8a7e6b" : "linear-gradient(135deg, #1a5c3a, #0f3d26)", color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: baseFont, cursor: signupStatus === "sending" ? "wait" : "pointer" }}>
                    {signupStatus === "sending" ? "Yuborilmoqda..." : "✓ Tasdiqlash"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* TOAST */}
      {adminToast && (
        <div style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", background: adminToast.startsWith("⚠") ? "#FEF2F2" : "#F0FDF4", color: adminToast.startsWith("⚠") ? "#DC2626" : "#16A34A", padding: "12px 28px", borderRadius: 12, fontSize: 14, fontWeight: 600, boxShadow: "0 8px 30px rgba(0,0,0,0.15)", zIndex: 2000, fontFamily: baseFont, border: `1px solid ${adminToast.startsWith("⚠") ? "#FECACA" : "#BBF7D0"}` }}>
          {adminToast}
        </div>
      )}

      <style>{`
        @keyframes scaleIn { from { transform: scale(0.9); opacity: 0 } to { transform: scale(1); opacity: 1 } }
        * { box-sizing: border-box; }
        input:focus, select:focus, textarea:focus { border-color: #1a5c3a !important; }
      `}</style>
    </div>
  );
}
