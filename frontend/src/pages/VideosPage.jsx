import React, { useState, useEffect } from 'react';
import { Home, Play, Clock, Heart, List, Users, History, Search, Upload, Bell, User as UserIcon, Settings, LogOut, BookOpen, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getClasses } from '../utils/theme';

const mockVideos = [
  {
    id: 1,
    title: "مقدمة في البرمجة - الدرس الأول",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
    channel: "أكاديمية البرمجة",
    channelAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    views: "15K",
    duration: "12:45",
    uploadDate: "منذ يومين",
    isShort: false,
    description: "في هذا الدرس سنتعلم أساسيات البرمجة والمفاهيم الأساسية التي يحتاجها كل مبتدئ في عالم البرمجة."
  },
  {
    id: 2,
    title: "كيفية تعلم الذكاء الاصطناعي",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop",
    channel: "AI Academy",
    channelAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    views: "8.2K",
    duration: "0:58",
    uploadDate: "منذ ساعة",
    isShort: true,
    description: "دليل سريع لتعلم الذكاء الاصطناعي من البداية"
  },
  {
    id: 3,
    title: "تطوير المواقع الإلكترونية - React.js",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
    channel: "ويب ديف",
    channelAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    views: "25K",
    duration: "28:15",
    uploadDate: "منذ 3 أيام",
    isShort: false,
    description: "تعلم كيفية بناء تطبيقات الويب الحديثة باستخدام React.js"
  },
  {
    id: 4,
    title: "أساسيات التسويق الرقمي",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
    channel: "التسويق الذكي",
    channelAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    views: "12K",
    duration: "18:30",
    uploadDate: "منذ أسبوع",
    isShort: false,
    description: "دورة شاملة في التسويق الرقمي والوسائل الحديثة"
  },
  {
    id: 5,
    title: "نصائح سريعة للنجاح",
    thumbnail: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=300&h=200&fit=crop",
    channel: "محفز النجاح",
    channelAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    views: "5.5K",
    duration: "0:45",
    uploadDate: "منذ 6 ساعات",
    isShort: true,
    description: "نصائح مهمة للنجاح في الحياة والعمل"
  }
];

const sidebarItems = [
  { id: 'home', label: 'الصفحة الرئيسية', icon: Home },
  { id: 'shorts', label: 'Shorts', icon: Play },
  { id: 'posts', label: 'المنشورات', icon: FileText },
  { id: 'watchlater', label: 'المشاهدة لاحقًا', icon: Clock },
  { id: 'favorites', label: 'المفضلة', icon: Heart },
  { id: 'playlists', label: 'قوائم التشغيل', icon: List },
  { id: 'subscriptions', label: 'الاشتراكات', icon: Users },
  { id: 'history', label: 'سجل المشاهدة', icon: History },
  { id: 'search-history', label: 'سجل البحث', icon: Search },
];

const VideosPage = () => {
  const [search, setSearch] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const user = JSON.parse(userStr || "{}");
    if (!user?.id) {
      setTheme('dark');
      setLoading(false);
      setError(null);
      return;
    }
    fetch("http://localhost/education-ai-2/backend/user/get_experience_settings.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.theme) {
          setTheme(data.theme);
          setError(null);
        } else {
          setTheme('dark');
          setError('تعذر جلب إعدادات الثيم. سيتم استخدام الثيم الداكن.');
        }
        setLoading(false);
      })
      .catch(() => {
        setTheme('dark');
        setError('حدث خطأ أثناء جلب إعدادات الثيم. سيتم استخدام الثيم الداكن.');
        setLoading(false);
      });
  }, []);

  const classes = getClasses(theme);

  // فصل الفيديوهات
  const shorts = mockVideos.filter(v => v.isShort);
  const normalVideos = mockVideos.filter(v => !v.isShort);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">...جاري تحميل الثيم</div>;
  }
  if (error) {
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

  return (
    <div className={`min-h-screen flex ${classes.body} text-white`}>
      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-[#181818] border-l border-zinc-800 py-6 px-2">
        <nav className="space-y-2">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors text-right"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-[#181818] border-b border-zinc-800 h-16 flex items-center px-6 justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-7 h-7 text-red-500" />
            <span className="font-bold text-lg">Education.ai</span>
          </div>
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن فيديو..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-zinc-900 text-white px-4 py-2 pl-10 rounded-full border border-zinc-700 focus:border-zinc-500 focus:outline-none"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-white hover:text-gray-300 transition-colors">
              <Upload className="w-6 h-6" />
            </button>
            <button className="text-white hover:text-gray-300 transition-colors relative">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
            <div className="relative">
              <button onClick={() => setShowProfile(!showProfile)}>
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="الحساب" className="w-8 h-8 rounded-full" />
              </button>
              {showProfile && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg">
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-zinc-800 rounded">
                      <Settings className="w-4 h-4" />
                      <span>الإعدادات</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-zinc-800 rounded">
                      <LogOut className="w-4 h-4" />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        {/* Videos Grid */}
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 px-4">
            {normalVideos.filter(v => v.title.includes(search)).map(video => (
              <div key={video.id} className="cursor-pointer hover:scale-105 transition-transform duration-200 bg-transparent rounded-xl overflow-hidden shadow-lg min-w-[340px] max-w-full">
                <div className="relative aspect-video w-full">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  {/* Overlay info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 pt-10 pb-4">
                    <div className="flex items-center mb-2">
                      <img src={video.channelAvatar} alt={video.channel} className="w-10 h-10 rounded-full border-2 border-white mr-2" />
                      <div>
                        <h3 className="text-white font-bold text-base line-clamp-1">{video.title}</h3>
                        <p className="text-gray-300 text-xs">{video.channel}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-300 text-xs gap-2">
                      <span>{video.views} مشاهدة</span>
                      <span>•</span>
                      <span>{video.uploadDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
        {/* Shorts Section */}
        {shorts.length > 0 && (
          <section className="px-6 pt-6 pb-8">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span className="text-pink-500">&#9835;</span> Shorts
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2" style={{direction: 'ltr'}}>
              {shorts.map(short => (
                <div key={short.id} className="min-w-[140px] max-w-[160px] flex-shrink-0 bg-zinc-900 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200">
                  <div className="relative">
                    <img src={short.thumbnail} alt={short.title} className="w-full h-60 object-cover" />
                  </div>
                  <div className="p-2">
                    <h3 className="text-white text-xs font-bold truncate mb-1">{short.title}</h3>
                    <p className="text-gray-400 text-xs truncate">{short.channel}</p>
                    <div className="flex items-center text-gray-400 text-xs gap-1">
                      <span>{short.views} مشاهدة</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default VideosPage; 