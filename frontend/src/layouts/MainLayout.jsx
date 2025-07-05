import React, { useEffect, useState, createContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { getClasses } from "../utils/theme";
import BottomNavBar from '../components/BottomNavBar';

export const ThemeContext = createContext('dark');

export default function MainLayout() {
  const location = useLocation();
  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('[DEBUG] MainLayout: mount, start loading');
    const userStr = localStorage.getItem("user");
    console.log('[DEBUG] MainLayout: userStr from localStorage =', userStr);
    const user = JSON.parse(userStr || "{}");
    if (!user?.id) {
      setError("لم يتم العثور على مستخدم. يرجى تسجيل الدخول.");
      setLoading(false);
      setTheme("dark");
      console.log('[DEBUG] MainLayout: no user found, set dark theme, error');
      return;
    }
    console.log('[DEBUG] MainLayout: found user.id =', user.id);
    fetch("http://localhost/education-ai-2/backend/user/get_experience_settings.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id }),
    })
      .then(res => {
        console.log('[DEBUG] MainLayout: got response from API', res);
        return res.json();
      })
      .then(data => {
        console.log('[DEBUG] MainLayout: data from API =', data);
        if (data.success && data.theme) {
          setTheme(data.theme);
          setError(null);
          console.log('[DEBUG] MainLayout: theme from DB =', data.theme);
        } else {
          setError("تعذر جلب إعدادات الثيم. سيتم استخدام الثيم الداكن.");
          setTheme("dark");
          console.log('[DEBUG] MainLayout: failed to get theme, fallback to dark');
        }
        setLoading(false);
      })
      .catch((e) => {
        setError("حدث خطأ أثناء جلب إعدادات الثيم. سيتم استخدام الثيم الداكن.");
        setTheme("dark");
        setLoading(false);
        console.log('[DEBUG] MainLayout: fetch error', e);
      });
  }, []);

  useEffect(() => {
    console.log('[DEBUG] MainLayout: theme changed to', theme, '| loading:', loading, '| error:', error);
  }, [theme, loading, error]);

  const classes = getClasses(theme);

  if (loading) {
    console.log('[DEBUG] MainLayout: loading...');
    return <div className="min-h-screen flex items-center justify-center">...جاري تحميل الثيم</div>;
  }
  if (error) {
    console.log('[DEBUG] MainLayout: error:', error);
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center ${classes.body}`}>
        <div className="text-center p-8 rounded-xl shadow bg-white/80 dark:bg-gray-800/80">
          <h2 className="text-xl font-bold mb-2">⚠️ مشكلة في تحميل الصفحة</h2>
          <p className="mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 rounded bg-blue-600 text-white">إعادة المحاولة</button>
        </div>
      </div>
    );
  }

  console.log('[DEBUG] MainLayout: render page, theme =', theme);

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`min-h-screen flex flex-col ${classes.body} transition-colors duration-300`} style={{ minHeight: "100vh" }}>
        <main className="flex-1">
          {/* Elastic overscroll bounce container for all pages */}
          <div
            className="overscroll-bounce-container h-full w-full"
            style={{
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch', // iOS smooth bounce
              overscrollBehavior: 'contain',   // CSS overscroll bounce
              height: 'calc(100vh - 5rem)', // يمنع التمرير خلف الـ navbar
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
        <BottomNavBar theme={theme} />
      </div>
    </ThemeContext.Provider>
  );
} 