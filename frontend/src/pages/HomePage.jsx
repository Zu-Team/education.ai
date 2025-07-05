import React, { useContext } from 'react';
import { ThemeContext } from '../layouts/MainLayout';
import { motion } from 'framer-motion';
import { getClasses } from '../utils/theme';
import { BookOpen, Brain, Flame, Star, Calculator, Globe, User } from 'lucide-react';

// Mocked function to generate personalized feed (replace with real API later)
function getFeedByPreferences({ level, interests, weaknesses, favorites }) {
  // Arabic content, icons, and CTAs
  return {
    recommended: [
      {
        icon: <BookOpen size={28} />, title: 'مقدمة في الذكاء الاصطناعي', desc: 'ابدأ رحلتك مع الذكاء الاصطناعي وتعلم الأساسيات.', cta: 'شاهد', type: 'video', color: 'bg-blue-600',},
      {
        icon: <Calculator size={28} />, title: 'أساسيات الجبر', desc: 'تعلم كيفية حل المعادلات وتبسيط المنطق الرياضي.', cta: 'ابدأ الاختبار', type: 'quiz', color: 'bg-purple-600',},
      {
        icon: <Globe size={28} />, title: 'اللغة الإنجليزية اليومية', desc: 'طور مهاراتك في المحادثة والاستماع.', cta: 'اقرأ', type: 'article', color: 'bg-green-600',},
    ],
    weaknesses: [
      {
        icon: <Brain size={28} />, title: 'تطوير مهارات التفكير النقدي', desc: 'تمارين لتحسين التفكير التحليلي وحل المشكلات.', cta: 'جرب الآن', type: 'exercise', color: 'bg-yellow-500',},
      {
        icon: <Flame size={28} />, title: 'الكسور العشرية', desc: 'تدريبات تفاعلية على الكسور العشرية.', cta: 'ابدأ التدريب', type: 'quiz', color: 'bg-red-500',},
      {
        icon: <Star size={28} />, title: 'التركيز والانتباه', desc: 'نصائح وتمارين لزيادة التركيز.', cta: 'اقرأ', type: 'article', color: 'bg-indigo-500',},
    ],
  };
}

const HomePage = () => {
  const theme = useContext(ThemeContext);
  const classes = getClasses(theme);
  // Get user info from localStorage (mocked)
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const firstName = user?.first_name || 'المستخدم';
  // Mocked preferences (replace with real user data)
  const preferences = {
    level: user?.education_level || 'متوسط',
    interests: user?.interests || ['الذكاء الاصطناعي', 'الرياضيات'],
    weaknesses: user?.weakSubjects || ['الكسور العشرية'],
    favorites: user?.favorites || ['الجبر'],
  };
  const feed = getFeedByPreferences(preferences);

  // Card component
  const ContentCard = ({ icon, title, desc, cta, color }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`rounded-xl bg-white/10 p-4 backdrop-blur-md shadow-md flex flex-col gap-2 transition ${classes.card}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      layout
    >
      <div className="flex justify-between items-center">
        <span className="text-3xl">{icon}</span>
        <button className={`text-white px-4 py-1 rounded-full text-sm font-medium ${color} shadow`}>{cta}</button>
      </div>
      <h3 className="text-white mt-2 font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-200">{desc}</p>
    </motion.div>
  );

  return (
    <div className={`p-4 md:p-8 max-w-5xl mx-auto ${classes.text}`} dir="rtl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-8"
      >
        <h1 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <span role="img" aria-label="graduation">🎓</span> مرحباً بعودتك، {firstName}
        </h1>
        <p className="text-sm text-gray-300 mt-2">منصتك الذكية للتعلم والتطور</p>
      </motion.div>

      {/* Sections */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-8"
      >
        <h2 className="text-lg font-bold text-primary border-b border-white/10 pb-2 mb-4 flex items-center gap-2">
          <span role="img" aria-label="recommended">🧠</span> موصى به لك
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {feed.recommended.map((item, i) => (
            <ContentCard key={i} {...item} />
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <h2 className="text-lg font-bold text-primary border-b border-white/10 pb-2 mb-4 flex items-center gap-2">
          <span role="img" aria-label="weak">📈</span> نقاط تحتاج لتحسين
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {feed.weaknesses.map((item, i) => (
            <ContentCard key={i} {...item} />
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage; 