import React, { useContext } from 'react';
import { ThemeContext } from '../layouts/MainLayout';
import { getClasses } from '../utils/theme';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// تعريف الخدمات لكل مرحلة تعليمية (بالعربية)
const servicesByStage = {
  preparatory: [
    {
      id: 'selftest',
      icon: '📚',
      title: 'اختبار ذاتي',
      desc: 'تدرّب على أساسيات المعرفة العامة باستخدام الذكاء الاصطناعي لتوليد أسئلة ذكية وتقديم تغذية راجعة.',
      to: '/tools/selftest',
      btn: 'ابدأ',
    },
    {
      id: 'rooms',
      icon: '🧩',
      title: 'غرف التعلم التفاعلية',
      desc: 'انضم إلى غرف بتحديات منظمة لبناء المهارات.',
      to: '/rooms',
      btn: 'استكشف',
    },
    {
      id: 'personality',
      icon: '🧠',
      title: 'محلل الشخصية',
      desc: 'يساعدك في تحديد المسار الأكاديمي الأنسب (علمي أو أدبي) للمرحلة الثانوية.',
      to: '/tools/personality',
      btn: 'ابدأ',
    },
    {
      id: 'chatbot',
      icon: '🤖',
      title: 'مساعد الذكاء الاصطناعي',
      desc: 'اطرح أسئلتك حول المواد واحصل على شروحات مناسبة لعمرك.',
      to: '/ai-chat',
      btn: 'دردشة',
    },
  ],
  secondary: [
    {
      id: 'selftest',
      icon: '📚',
      title: 'اختبار ذاتي',
      desc: 'أسئلة مخصصة لمناهج التوجيهي مع شروحات ذكية من الذكاء الاصطناعي.',
      to: '/tools/selftest',
      btn: 'ابدأ',
    },
    {
      id: 'rooms',
      icon: '🧩',
      title: 'غرف التعلم التفاعلية',
      desc: 'غرف تركز على مواد التوجيهي الأساسية.',
      to: '/rooms',
      btn: 'استكشف',
    },
    {
      id: 'personality',
      icon: '🧠',
      title: 'محلل الشخصية',
      desc: 'يحدد لك التخصص أو المجال الجامعي الأنسب.',
      to: '/tools/personality',
      btn: 'ابدأ',
    },
    {
      id: 'recommendation',
      icon: '🏫',
      title: 'مُوصي الجامعات والتخصصات',
      desc: 'يقترح أفضل التخصصات والجامعات بناءً على نتائج تحليل الشخصية.',
      to: '/tools/universities',
      btn: 'استكشف',
    },
    {
      id: 'calculator',
      icon: '🎯',
      title: 'حاسبة القبول',
      desc: 'يعرض الجامعات التي تتناسب معدلاتك مع شروط قبولها.',
      to: '/tools/calculator',
      btn: 'ابدأ',
    },
    {
      id: 'chatbot',
      icon: '🤖',
      title: 'مساعد الذكاء الاصطناعي',
      desc: 'شروحات متقدمة للتحضير للجامعة.',
      to: '/ai-chat',
      btn: 'دردشة',
    },
  ],
  university: [
    {
      id: 'selftest',
      icon: '📚',
      title: 'اختبار ذاتي',
      desc: 'تدرّب على مواضيع متقدمة في تخصصك الجامعي.',
      to: '/tools/selftest',
      btn: 'ابدأ',
    },
    {
      id: 'rooms',
      icon: '🧩',
      title: 'غرف التعلم التفاعلية',
      desc: 'مسارات تعلم جامعية متقدمة.',
      to: '/rooms',
      btn: 'استكشف',
    },
    {
      id: 'infield',
      icon: '🔬',
      title: 'توصيات التخصص الدقيق',
      desc: 'يقترح لك مسارات تخصصية أعمق ضمن مجالك الحالي.',
      to: '/tools/infield',
      btn: 'استكشف',
    },
    {
      id: 'chatbot',
      icon: '🤖',
      title: 'مساعد الذكاء الاصطناعي',
      desc: 'يعمل كأستاذ جامعي يجيب عن أسئلتك التخصصية.',
      to: '/ai-chat',
      btn: 'دردشة',
    },
  ],
};

function getUserStage() {
  const userStr = localStorage.getItem('user');
  try {
    const user = JSON.parse(userStr || '{}');
    return user.level || 'preparatory';
  } catch {
    return 'preparatory';
  }
}

const ServicesPage = () => {
  const theme = useContext(ThemeContext);
  const classes = getClasses(theme);
  const navigate = useNavigate();
  const stage = getUserStage();
  const services = servicesByStage[stage] || [];

  return (
    <div className={`p-4 md:p-8 max-w-4xl mx-auto ${classes.text} text-right`} dir="rtl">
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <span role="img" aria-label="services">🎯</span> خدماتي
        </h1>
        <p className="opacity-70">أدوات ذكية تناسب مرحلتك التعليمية</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center items-center">
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            className={`rounded-2xl shadow-lg p-4 flex flex-col items-center text-center gap-2 cursor-pointer transition hover:scale-105 active:scale-95 ${classes.card}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(service.to)}
          >
            <div className="text-4xl mb-2">{service.icon}</div>
            <h2 className="text-lg font-bold mt-1">{service.title}</h2>
            <p className="text-sm opacity-70 mb-3">{service.desc}</p>
            <button className="bg-blue-600 text-white py-1 px-4 rounded-full text-sm mt-auto">
              {service.btn}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
 