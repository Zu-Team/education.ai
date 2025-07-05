import React, { useContext } from 'react';
import { ThemeContext } from '../layouts/MainLayout';
import { motion } from 'framer-motion';
import { TreeDeciduous } from 'lucide-react';
import { getClasses } from '../utils/theme';

const StudyTreePage = () => {
  const theme = useContext(ThemeContext);
  const classes = getClasses(theme);
  return (
    <div className={`flex flex-col items-center justify-center min-h-[60vh] ${classes.text}`} dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg flex flex-col items-center"
      >
        <TreeDeciduous size={48} className="mb-4 text-green-600" />
        <h1 className="text-2xl font-bold mb-2">شجرة الخطة الدراسية الذكية</h1>
        <p className="text-lg text-gray-200">قريباً!</p>
      </motion.div>
    </div>
  );
};

export default StudyTreePage; 