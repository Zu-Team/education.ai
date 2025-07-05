import React, { useState, useMemo, useContext } from 'react';
import { ThemeContext } from '../layouts/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Brain, User, Wrench } from 'lucide-react';
import { getClasses } from '../utils/theme';

const FILTERS = [
  { key: 'all', label: 'الكل', icon: <Search size={18} /> },
  { key: 'posts', label: 'منشورات', icon: <BookOpen size={18} /> },
  { key: 'rooms', label: 'غرف', icon: <Brain size={18} /> },
  { key: 'users', label: 'مستخدمون', icon: <User size={18} /> },
];

// Mocked data
const MOCK_DATA = [
  // Posts
  { type: 'posts', title: 'أفضل طرق المذاكرة', desc: 'نصائح فعالة لتحسين الحفظ والفهم.', subject: 'مهارات الدراسة' },
  { type: 'posts', title: 'مقدمة في الذكاء الاصطناعي', desc: 'مقال تعريفي حول الذكاء الاصطناعي وتطبيقاته.', subject: 'الذكاء الاصطناعي' },
  // Rooms
  { type: 'rooms', title: 'غرفة الرياضيات', desc: 'مستوى متوسط - 12 مشترك', level: 'متوسط', members: 12 },
  { type: 'rooms', title: 'غرفة اللغة الإنجليزية', desc: 'مستوى مبتدئ - 8 مشتركين', level: 'مبتدئ', members: 8 },
  // Users
  { type: 'users', title: 'سارة أحمد', desc: 'ثانوي', img: '', },
  { type: 'users', title: 'محمد علي', desc: 'جامعي', img: '', },
  // Services
  { type: 'services', title: 'مولد الاختبارات الذكي', desc: 'أنشئ اختبارات تفاعلية باستخدام الذكاء الاصطناعي.', icon: <Wrench size={22} /> },
  { type: 'services', title: 'مساعد الواجبات', desc: 'حل واجباتك بسرعة وذكاء.', icon: <Wrench size={22} /> },
];

function getFilteredResults({ searchTerm, activeFilter }) {
  let results = MOCK_DATA;
  if (activeFilter !== 'all') {
    results = results.filter(r => r.type === activeFilter);
  }
  if (searchTerm.trim()) {
    const term = searchTerm.trim().toLowerCase();
    results = results.filter(r =>
      r.title.toLowerCase().includes(term) ||
      (r.desc && r.desc.toLowerCase().includes(term)) ||
      (r.subject && r.subject.toLowerCase().includes(term))
    );
  }
  return results;
}

const SearchPage = () => {
  const theme = useContext(ThemeContext);
  const classes = getClasses(theme);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  // Debounce search term
  React.useEffect(() => {
    const handler = setTimeout(() => setDebouncedTerm(searchTerm), 250);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const results = useMemo(() => getFilteredResults({ searchTerm: debouncedTerm, activeFilter }), [debouncedTerm, activeFilter]);

  // Card rendering logic
  function renderCard(item, i) {
    switch (item.type) {
      case 'posts':
        return (
          <motion.div
            key={i}
            className="rounded-xl bg-white/10 p-4 backdrop-blur-md shadow flex flex-col gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            layout
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <span className="text-sm bg-primary text-white rounded-full px-3 py-1">{item.subject}</span>
            </div>
            <p className="text-sm text-gray-300 mt-2">{item.desc}</p>
            <button className="mt-4 bg-primary text-sm text-white px-4 py-1 rounded-full">مشاهدة</button>
          </motion.div>
        );
      case 'rooms':
        return (
          <motion.div
            key={i}
            className="rounded-xl bg-white/10 p-4 backdrop-blur-md shadow flex flex-col gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            layout
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <span className="text-sm bg-primary text-white rounded-full px-3 py-1">{item.level}</span>
            </div>
            <p className="text-sm text-gray-300 mt-2">{item.desc}</p>
            <button className="mt-4 bg-primary text-sm text-white px-4 py-1 rounded-full">انضمام</button>
          </motion.div>
        );
      case 'users':
        return (
          <motion.div
            key={i}
            className="rounded-xl bg-white/10 p-4 backdrop-blur-md shadow flex flex-col gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            layout
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                {item.title[0]}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.desc}</p>
              </div>
            </div>
            <button className="mt-4 bg-primary text-sm text-white px-4 py-1 rounded-full">تواصل</button>
          </motion.div>
        );
      case 'services':
        return (
          <motion.div
            key={i}
            className="rounded-xl bg-white/10 p-4 backdrop-blur-md shadow flex flex-col gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            layout
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">{item.icon}{item.title}</h3>
              <span className="text-sm bg-primary text-white rounded-full px-3 py-1">خدمة</span>
            </div>
            <p className="text-sm text-gray-300 mt-2">{item.desc}</p>
            <button className="mt-4 bg-primary text-sm text-white px-4 py-1 rounded-full">ابدأ الآن</button>
          </motion.div>
        );
      default:
        return null;
    }
  }

  return (
    <div className={`min-h-screen ${classes.body} ${classes.text} p-0`} dir="rtl">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-transparent pt-4 pb-2 px-4" style={{backdropFilter:'blur(8px)'}}>
        {/* Search Input */}
        <div className="flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 shadow-inner w-full max-w-2xl mx-auto">
          <Search size={20} className="text-white opacity-70" />
          <input
            type="text"
            className="bg-transparent outline-none border-none flex-1 text-white placeholder:text-gray-400 text-base"
            placeholder="ابحث عن منشور أو غرفة أو مستخدم أو خدمة..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{direction:'rtl'}}
          />
        </div>
        {/* Filter Chips */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 hide-scrollbar">
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition font-medium whitespace-nowrap ${activeFilter === f.key ? `${classes.activeButtonBg} ${classes.activeButtonText}` : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              {f.icon} {f.label}
            </button>
          ))}
        </div>
      </div>
      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 px-4 max-w-6xl mx-auto">
        <AnimatePresence>
          {results.length === 0 ? (
            <motion.div
              key="no-results"
              className="col-span-full text-center text-gray-300 py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              لا توجد نتائج مطابقة
            </motion.div>
          ) : (
            results.map((item, i) => renderCard(item, i))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchPage; 