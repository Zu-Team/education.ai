import React, { useState, useContext, useMemo } from 'react';
import { ThemeContext } from '../layouts/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { getClasses } from '../utils/theme';

const TABS = [
  { key: 'recommended', label: 'موصى به' },
  { key: 'in_progress', label: 'قيد الإنجاز' },
  { key: 'completed', label: 'مكتمل' },
  { key: 'new', label: 'جديد' },
];

// Mocked rooms data
const ROOMS = [
  {
    id: 1,
    title: 'مقدمة في التفاضل',
    desc: 'تعلم أساسيات التفاضل والتكامل بطريقة بصرية.',
    difficulty: 'easy',
    progress: 0,
    created_at: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
    recommended: true,
  },
  {
    id: 2,
    title: 'أساسيات الذكاء الاصطناعي',
    desc: 'مفاهيم الذكاء الاصطناعي وتطبيقاته.',
    difficulty: 'medium',
    progress: 40,
    created_at: Date.now() - 1000 * 60 * 60 * 24 * 10, // 10 days ago
    recommended: true,
  },
  {
    id: 3,
    title: 'البرمجة بلغة بايثون',
    desc: 'ابدأ البرمجة من الصفر مع بايثون.',
    difficulty: 'easy',
    progress: 100,
    created_at: Date.now() - 1000 * 60 * 60 * 24 * 20, // 20 days ago
    recommended: false,
  },
  {
    id: 4,
    title: 'الرياضيات المتقدمة',
    desc: 'محتوى متقدم في الجبر والتكامل.',
    difficulty: 'hard',
    progress: 0,
    created_at: Date.now() - 1000 * 60 * 60 * 24 * 1, // 1 day ago
    recommended: true,
  },
  {
    id: 5,
    title: 'مهارات التفكير النقدي',
    desc: 'طور مهاراتك في التحليل وحل المشكلات.',
    difficulty: 'medium',
    progress: 70,
    created_at: Date.now() - 1000 * 60 * 60 * 24 * 5, // 5 days ago
    recommended: false,
  },
  {
    id: 6,
    title: 'مقدمة في الكيمياء',
    desc: 'أساسيات الكيمياء للمرحلة الثانوية.',
    difficulty: 'easy',
    progress: 0,
    created_at: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
    recommended: false,
  },
];

function getRoomsByTab(tab) {
  const now = Date.now();
  switch (tab) {
    case 'recommended':
      return ROOMS.filter(r => r.recommended);
    case 'in_progress':
      return ROOMS.filter(r => r.progress > 0 && r.progress < 100);
    case 'completed':
      return ROOMS.filter(r => r.progress === 100);
    case 'new':
      return ROOMS.filter(r => now - r.created_at < 1000 * 60 * 60 * 24 * 14); // last 2 weeks
    default:
      return ROOMS;
  }
}

const DIFFICULTY = {
  easy: { label: 'سهل', color: 'bg-green-500' },
  medium: { label: 'متوسط', color: 'bg-yellow-500' },
  hard: { label: 'صعب', color: 'bg-red-500' },
};

const RoomsPage = () => {
  const theme = useContext(ThemeContext);
  const classes = getClasses(theme);
  const [activeTab, setActiveTab] = useState('recommended');
  const rooms = useMemo(() => getRoomsByTab(activeTab), [activeTab]);

  // Room Card
  function RoomCard(room, i) {
    const diff = DIFFICULTY[room.difficulty];
    let cta = 'انضمام';
    if (room.progress === 100) cta = 'مراجعة';
    else if (room.progress > 0) cta = 'متابعة';
    // Remove advanced warning overlay
    return (
      <motion.div
        key={room.id}
        className="relative rounded-2xl bg-white/10 p-4 shadow flex flex-col gap-2 backdrop-blur-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        layout
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">{room.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full text-white ${diff.color}`}>{diff.label}</span>
        </div>
        <p className="text-gray-300 mt-2 text-sm">{room.desc}</p>
        {room.progress > 0 && room.progress < 100 && (
          <div className="w-full bg-white/20 h-2 rounded-full mt-3">
            <div className="bg-primary h-2 rounded-full" style={{ width: `${room.progress}%` }} />
          </div>
        )}
        <button className="mt-3 w-full bg-primary text-white text-sm py-1 rounded-full z-20">{cta}</button>
      </motion.div>
    );
  }

  return (
    <div className={`min-h-screen ${classes.body} ${classes.text} p-0`} dir="rtl">
      {/* Header */}
      <div className="text-center mt-4 mb-2">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2 justify-center">🧠 غرف التعلم</h1>
      </div>
      {/* Tabs */}
      <div className="relative flex gap-2 overflow-x-auto px-4 pb-1 hide-scrollbar">
        {TABS.map((tab, idx) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative px-4 py-1 rounded-full text-sm font-medium transition whitespace-nowrap z-10 ${activeTab === tab.key ? `${classes.activeButtonBg} ${classes.activeButtonText}` : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
            style={{ minWidth: 90 }}
          >
            {tab.label}
            {activeTab === tab.key && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute inset-0 rounded-full bg-primary/30 z-[-1]"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
      {/* Room Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 px-4 max-w-6xl mx-auto">
        <AnimatePresence>
          {rooms.length === 0 ? (
            <motion.div
              key="no-rooms"
              className="col-span-full text-center text-gray-300 py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              لا توجد غرف في هذا القسم
            </motion.div>
          ) : (
            rooms.map((room, i) => RoomCard(room, i))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RoomsPage; 