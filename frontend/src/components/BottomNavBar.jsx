import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, Brain, Target, MessageCircle, User, PlaySquare, TreeDeciduous, Video } from 'lucide-react';
import { getClasses } from '../utils/theme';

const navItems = [
  { path: '/home', icon: Home, label: 'الرئيسية' },
  { path: '/videos', icon: Video, label: 'الفيديوهات' },
  { path: '/search', icon: Search, label: 'بحث' },
  { path: '/rooms', icon: Brain, label: 'غرف' },
  { path: '/study-tree', icon: TreeDeciduous, label: 'شجرة الخطة' },
  { path: '/services', icon: Target, label: 'خدمات' },
  { path: '/chat', icon: MessageCircle, label: 'دردشة' },
  { path: '/profile', icon: User, label: 'حسابي' }
];

const BottomNavBar = ({ theme }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const classes = getClasses(theme);
  return (
    <motion.div 
      className={`fixed bottom-0 left-0 right-0 z-50 px-4 py-3 ${classes.nav}`}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map(({ path, icon, label }, idx) => {
          const Icon = icon;
          const isActive = location.pathname === path || (path === '/home' && location.pathname === '/');
          return (
            <motion.button
              key={path}
              onClick={() => navigate(path)}
              className={`p-3 rounded-full transition-all duration-300 ${isActive ? classes.active : classes.inactive}`}
              style={{ backgroundColor: isActive ? '' : 'transparent' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={label}
            >
              <Icon size={20} />
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default BottomNavBar; 