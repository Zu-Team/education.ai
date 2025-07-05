import React, { useState, useContext, createContext } from 'react';
import { ThemeContext } from '../layouts/MainLayout';
import { getClasses } from '../utils/theme';
import { User, Edit3, Upload, Camera, Settings, Shield, Palette, Users, Star, Heart, MessageCircle, Trash2, Eye, Lock, Phone, Mail, Globe, Bell, Volume2, VolumeX, Moon, Sun, Monitor, FileText, Video, Pause, Play, MoreHorizontal, ThumbsUp, Share2, Send, BookOpen, Music, Bookmark, ThumbsDown, Repeat2 } from 'lucide-react';

// Mock Context for demo
const UserContext = createContext();
const useUser = () => useContext(UserContext);

// بيانات المستخدم بالعربية
const mockUser = {
  id: 1,
  username: "أحمد محمد",
  email: "ahmed.mohammed@university.edu",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  education_level: "جامعي",
  country: "المملكة العربية السعودية",
  major: "علوم الحاسوب",
  gpa: "3.8",
  lastPasswordUpdate: "2024-12-15",
  friends: [
    { id: 1, name: "سارة أحمد", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face", status: "online" },
    { id: 2, name: "محمد علي", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", status: "offline" },
    { id: 3, name: "فاطمة حسن", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", status: "online" }
  ],
  posts: [
    {
      id: 1,
      type: "text",
      content: "تعلمت اليوم خوارزمية جديدة في علم البيانات! الذكاء الاصطناعي يتطور بسرعة مذهلة 🤖",
      timestamp: "2024-12-28T14:30:00Z",
      likes: 45,
      comments: [
        { author: "سارة أحمد", authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face", content: "رائع! شاركنا التفاصيل.", timestamp: "2024-12-28T15:00:00Z" }
      ],
      shares: 8,
      isLiked: true,
      isSaved: false,
      tags: ["برمجة", "ذكاء_اصطناعي", "تعلم"],
      views: 1200
    },
    {
      id: 2,
      type: "image",
      content: "إنجازي الجديد في مشروع التخرج! 🎓✨",
      media: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop",
      timestamp: "2024-12-27T09:15:00Z",
      likes: 89,
      comments: [],
      shares: 15,
      isLiked: false,
      isSaved: true,
      location: "جامعة الملك سعود",
      tags: ["تخرج", "مشروع", "نجاح"],
      views: 2400
    },
    {
      id: 3,
      type: "video",
      content: "شرح مبسط لمفهوم Machine Learning في دقيقتين! 🎬",
      media: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=450&fit=crop",
      video_duration: "2:15",
      timestamp: "2024-12-26T16:45:00Z",
      likes: 156,
      comments: [],
      shares: 42,
      isLiked: true,
      isSaved: false,
      tags: ["تعليم", "machine_learning", "شرح"],
      views: 5600
    },
    {
      id: 4,
      type: "poll",
      content: "أي لغة برمجة تفضلون للمبتدئين؟",
      poll: {
        options: [
          { text: "Python", votes: 45, percentage: 52 },
          { text: "JavaScript", votes: 28, percentage: 32 },
          { text: "Java", votes: 14, percentage: 16 }
        ],
        total_votes: 87,
        user_voted: true,
        user_choice: "Python"
      },
      timestamp: "2024-12-25T11:20:00Z",
      likes: 67,
      comments: [],
      shares: 12,
      isLiked: false,
      isSaved: false,
      tags: ["برمجة", "استطلاع", "python"],
      views: 3200
    },
    {
      id: 5,
      type: "achievement",
      content: "حصلت على شهادة AWS Cloud Practitioner! 🏆",
      achievement: {
        title: "AWS Cloud Practitioner",
        issuer: "Amazon Web Services",
        date: "2024-12-24",
        badge: "🏆"
      },
      timestamp: "2024-12-24T13:30:00Z",
      likes: 112,
      comments: [],
      shares: 35,
      isLiked: true,
      isSaved: true,
      tags: ["aws", "شهادة", "cloud"],
      views: 4100
    }
  ],
  favorites: {
    posts: [
      { id: 1, title: "أساسيات الجبر الخطي", category: "رياضيات", author: "د. أحمد سمير", likes: 45 },
      { id: 2, title: "مبادئ ميكانيكا الكم", category: "فيزياء", author: "أ. فاطمة علي", likes: 32 },
      { id: 3, title: "هياكل البيانات والخوارزميات", category: "حاسوب", author: "سارة أحمد", likes: 67 }
    ],
    rooms: [
      { id: 1, name: "مجموعة دراسة التفاضل والتكامل المتقدم", members: 12, progress: 75 },
      { id: 2, name: "ورشة تعلم الآلة", members: 8, progress: 45 }
    ],
    toComplete: [
      { id: 1, name: "مراجعة نهائية للإحصاء", deadline: "2025-01-15", progress: 60 },
      { id: 2, name: "دورة برمجة Python", deadline: "2025-02-01", progress: 30 }
    ]
  },
  settings: {
    theme: "dark",
    language: "العربية",
    audioEnabled: true,
    notifications: {
      messages: true,
      assignments: true,
      friends: false
    },
    twoFactorEnabled: false,
    recoveryEmail: "ahmed.backup@gmail.com",
    phoneNumber: "+966 50 123 4567"
  }
};

const ProfilePage = () => {
  const theme = useContext(ThemeContext);
  const classes = getClasses(theme);
  const [user, setUser] = useState(mockUser);
  const [activeTab, setActiveTab] = useState("info");
  const [editingField, setEditingField] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: "info", label: "المعلومات الشخصية", icon: User },
    { id: "posts", label: "منشوراتي", icon: FileText },
    { id: "friends", label: "الأصدقاء", icon: Users },
    { id: "favorites", label: "المفضلة", icon: Star },
    { id: "security", label: "الأمان", icon: Shield },
    { id: "experience", label: "تجربة المستخدم", icon: Palette }
  ];

  const handleFieldEdit = (field, value) => {
    setUser(prev => ({
      ...prev,
      [field]: value
    }));
    setEditingField(null);
  };

  const handleSettingsChange = (setting, value) => {
    setUser(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [setting]: value
      }
    }));
  };

  const handleNotificationChange = (type, value) => {
    setUser(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        notifications: {
          ...prev.settings.notifications,
          [type]: value
        }
      }
    }));
  };

  const EditableField = ({ label, value, field, type = "text" }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <div className="flex items-center gap-2">
        {editingField === field ? (
          <input
            type={type}
            value={value}
            onChange={(e) => handleFieldEdit(field, e.target.value)}
            onBlur={() => setEditingField(null)}
            onKeyPress={(e) => e.key === 'Enter' && setEditingField(null)}
            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <div className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white">
            {value}
          </div>
        )}
        <button
          onClick={() => setEditingField(field)}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Edit3 size={16} />
        </button>
      </div>
    </div>
  );

  const FriendCard = ({ friend }) => (
    <div className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${classes.card} ${classes.text} border-gray-700 hover:border-gray-600`}>
      <div className="flex items-center gap-3">
        <div className="relative">
          <img src={friend.avatar} alt={friend.name} className="w-12 h-12 rounded-full" />
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${
            friend.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
          }`} />
        </div>
        <div>
          <h3 className="text-white font-medium">{friend.name}</h3>
          <p className="text-gray-400 text-sm capitalize">{friend.status}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors">
          <MessageCircle size={16} />
        </button>
        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
          <Eye size={16} />
        </button>
        <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );

  const FavoriteCard = ({ item, type }) => (
    <div className={`p-4 rounded-lg border transition-colors ${classes.card} ${classes.text} border-gray-700 hover:border-gray-600`}>
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-white font-medium text-sm">{item.title || item.name}</h3>
        <Heart className="text-red-500 fill-current" size={16} />
      </div>
      {type === 'posts' && (
        <div className="space-y-1">
          <p className="text-gray-400 text-xs">by {item.author}</p>
          <div className="flex items-center justify-between">
            <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">{item.category}</span>
            <span className="text-gray-400 text-xs">{item.likes} likes</span>
          </div>
        </div>
      )}
      {type === 'rooms' && (
        <div className="space-y-2">
          <p className="text-gray-400 text-xs">{item.members} members</p>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${item.progress}%` }} />
          </div>
          <p className="text-gray-400 text-xs">{item.progress}% complete</p>
        </div>
      )}
      {type === 'toComplete' && (
        <div className="space-y-2">
          <p className="text-gray-400 text-xs">Due: {item.deadline}</p>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${item.progress}%` }} />
          </div>
          <p className="text-gray-400 text-xs">{item.progress}% complete</p>
        </div>
      )}
    </div>
  );

  // Switch Component (moved inside ProfilePage)
  const Switch = ({ checked, onChange, label, description, icon: Icon }) => (
    <div className={`flex items-center justify-between p-4 rounded-lg border ${classes.card} ${classes.text} border-gray-700`} dir="ltr">
      <div 
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
          checked ? 'bg-blue-600' : 'bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </div>
      <div className="flex items-center gap-3" dir="rtl">
        <div className="text-right">
          <p className="text-white font-medium">{label}</p>
          {description && <p className="text-gray-400 text-sm">{description}</p>}
        </div>
        {Icon && <Icon className="text-gray-400" size={20} />}
      </div>
    </div>
  );

  // Notification Switch Component (moved inside ProfilePage)
  const NotificationSwitch = ({ checked, onChange, label, type }) => (
    <div className={`flex items-center justify-between rounded-lg border ${classes.card} ${classes.text} border-gray-700 p-4`} dir="ltr">
      <div 
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
          checked ? 'bg-blue-600' : 'bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </div>
      <div className="flex items-center gap-3" dir="rtl">
        <span className="text-white">{label}</span>
        <Bell className="text-gray-400" size={16} />
      </div>
    </div>
  );

  // PostCard component
  const PostCard = ({ post, onLike, onComment, onShare, onSave }) => {
    const [showComments, setShowComments] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [newComment, setNewComment] = useState('');

    const getPostTypeIcon = (type) => {
      switch (type) {
        case 'video': return <Video size={16} />;
        case 'image': return <Camera size={16} />;
        case 'audio': return <Music size={16} />;
        case 'document': return <FileText size={16} />;
        default: return <BookOpen size={16} />;
      }
    };

    const formatTime = (timestamp) => {
      const now = new Date();
      const postTime = new Date(timestamp);
      const diff = now - postTime;
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(diff / 86400000);

      if (minutes < 60) return `${minutes}د`;
      if (hours < 24) return `${hours}س`;
      return `${days}ي`;
    };

    return (
      <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:border-gray-600 transition-colors">
        {/* Post Header */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={post.authorAvatar}
              alt={post.author}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="text-white font-medium">{post.author}</h3>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>{formatTime(post.timestamp)}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  {getPostTypeIcon(post.type)}
                  <span className="capitalize">{post.type}</span>
                </div>
              </div>
            </div>
          </div>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
            <MoreHorizontal size={18} />
          </button>
        </div>
        {/* Post Content */}
        <div className="px-4 pb-3">
          <p className="text-white leading-relaxed">{post.content}</p>
          {post.tags && (
            <div className="flex flex-wrap gap-1 mt-2">
              {post.tags.map((tag, index) => (
                <span key={index} className="text-blue-400 hover:text-blue-300 cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {/* Media Content */}
        {post.media && (
          <div className="relative">
            {post.type === 'image' && (
              <img
                src={post.media}
                alt="Post media"
                className="w-full h-64 object-cover"
              />
            )}
            {post.type === 'video' && (
              <div className="relative bg-black h-64 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute z-10 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {isPlaying ? <Pause size={24} className="text-white" /> : <Play size={24} className="text-white ml-1" />}
                </button>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-white/20 rounded-full h-1">
                      <div className="bg-white h-1 rounded-full w-1/3" />
                    </div>
                    <span className="text-sm">2:45</span>
                  </div>
                </div>
              </div>
            )}
            {post.type === 'audio' && (
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {isPlaying ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white ml-1" />}
                </button>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-white text-sm mb-2">
                    <span>محاضرة أساسيات الجبر</span>
                    <span>15:30</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full w-2/5" />
                  </div>
                </div>
              </div>
            )}
            {post.type === 'document' && (
              <div className="bg-gray-750 p-6 border-t border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <FileText size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">ملخص محاضرة التفاضل والتكامل</h4>
                    <p className="text-gray-400 text-sm">PDF • 2.5 MB</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    تحميل
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        {/* Post Stats */}
        <div className="px-4 py-3 border-t border-gray-700">
          <div className="flex items-center justify-between text-gray-400 text-sm">
            <div className="flex items-center gap-4">
              <span>{post.likes} إعجاب</span>
              <span>{post.comments?.length || 0} تعليق</span>
              <span>{post.shares || 0} مشاركة</span>
            </div>
            <span>{post.views || 0} مشاهدة</span>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="px-4 py-3 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button
                onClick={() => onLike(post.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  post.isLiked
                    ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <ThumbsUp size={16} className={post.isLiked ? 'fill-current' : ''} />
                <span className="hidden sm:inline">أعجبني</span>
              </button>
              <button
                onClick={() => setShowComments(!showComments)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              >
                <MessageCircle size={16} />
                <span className="hidden sm:inline">تعليق</span>
              </button>
              <button
                onClick={() => onShare(post.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              >
                <Share2 size={16} />
                <span className="hidden sm:inline">مشاركة</span>
              </button>
            </div>
            <button
              onClick={() => onSave(post.id)}
              className={`p-2 rounded-lg transition-colors ${
                post.isSaved
                  ? 'bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Bookmark size={16} className={post.isSaved ? 'fill-current' : ''} />
            </button>
          </div>
        </div>
        {/* Comments Section */}
        {showComments && (
          <div className="border-t border-gray-700 bg-gray-750">
            {/* Add Comment */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <img
                  src={post.authorAvatar}
                  alt="You"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="اكتب تعليقاً..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 bg-gray-800 border border-gray-600 rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => {
                      if (newComment.trim()) {
                        onComment(post.id, newComment);
                        setNewComment('');
                      }
                    }}
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
            {/* Comments List */}
            <div className="max-h-64 overflow-y-auto">
              {post.comments?.map((comment, index) => (
                <div key={index} className="p-4 border-b border-gray-700 last:border-b-0">
                  <div className="flex items-start gap-3">
                    <img
                      src={comment.authorAvatar}
                      alt={comment.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="bg-gray-800 rounded-2xl px-4 py-2">
                        <h4 className="text-white font-medium text-sm">{comment.author}</h4>
                        <p className="text-gray-300 text-sm">{comment.content}</p>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                        <span>{formatTime(comment.timestamp)}</span>
                        <button className="hover:text-white">أعجبني</button>
                        <button className="hover:text-white">رد</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Post interaction handlers
  const handlePostLike = (postId) => {
    setUser(prev => ({
      ...prev,
      posts: prev.posts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    }));
  };

  const handlePostComment = (postId, comment) => {
    setUser(prev => ({
      ...prev,
      posts: prev.posts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              comments: [
                ...(post.comments || []),
                {
                  author: user.username,
                  authorAvatar: user.avatar,
                  content: comment,
                  timestamp: new Date().toISOString()
                }
              ]
            }
          : post
      )
    }));
  };

  const handlePostShare = (postId) => {
    setUser(prev => ({
      ...prev,
      posts: prev.posts.map(post => 
        post.id === postId 
          ? { ...post, shares: (post.shares || 0) + 1 }
          : post
      )
    }));
  };

  const handlePostSave = (postId) => {
    setUser(prev => ({
      ...prev,
      posts: prev.posts.map(post => 
        post.id === postId 
          ? { ...post, isSaved: !post.isSaved }
          : post
      )
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "info":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EditableField label="Full Name" value={user.username} field="username" />
              <EditableField label="Email" value={user.email} field="email" type="email" />
              <EditableField label="Country" value={user.country} field="country" />
              <EditableField label="Education Level" value={user.education_level} field="education_level" />
              <EditableField label="Major" value={user.major} field="major" />
              <EditableField label="GPA" value={user.gpa} field="gpa" />
            </div>
            <div className="pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400">Last password update: {user.lastPasswordUpdate}</p>
            </div>
          </div>
        );

      case "posts":
        return (
          <div className="space-y-6">
            {user.posts && user.posts.length > 0 ? (
              user.posts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handlePostLike}
                  onComment={handlePostComment}
                  onShare={handlePostShare}
                  onSave={handlePostSave}
                />
              ))
            ) : (
              <div className="text-center text-gray-400 py-12">لا توجد منشورات بعد.</div>
            )}
          </div>
        );

      case "friends":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Your Friends ({user.friends.length})</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Add Friend
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {user.friends.map(friend => (
                <FriendCard key={friend.id} friend={friend} />
              ))}
            </div>
          </div>
        );

      case "favorites":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Favorite Posts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {user.favorites.posts.map(post => (
                  <FavoriteCard key={post.id} item={post} type="posts" />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Favorite Learning Rooms</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.favorites.rooms.map(room => (
                  <FavoriteCard key={room.id} item={room} type="rooms" />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">To Complete</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.favorites.toComplete.map(item => (
                  <FavoriteCard key={item.id} item={item} type="toComplete" />
                ))}
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="flex flex-col items-center justify-center min-h-[40vh]">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 w-full max-w-md flex flex-col items-center text-center">
              <User size={40} className="mb-4 text-blue-400" />
              <h2 className="text-2xl font-bold text-white mb-2">مركز إدارة الحسابات</h2>
              <p className="text-gray-300 mb-6">يمكنك إدارة كلمة المرور، الأمان، بياناتك الشخصية، وخصوصيتك من مكان واحد.</p>
              <a
                href="/account-settings"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-semibold transition-colors"
              >
                إعدادات الحساب
              </a>
            </div>
          </div>
        );

      case "experience":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
                <h3 className="text-white font-medium mb-3">Theme</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['Light', 'Dark', 'Purple', 'Auto'].map(themeOpt => (
                    <button
                      key={themeOpt}
                      onClick={() => handleSettingsChange('theme', themeOpt.toLowerCase())}
                      className={`p-3 rounded-lg border transition-colors ${
                        user.settings.theme === themeOpt.toLowerCase()
                          ? 'border-blue-500 bg-blue-600/20 text-blue-400'
                          : 'border-gray-600 text-gray-400 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {themeOpt === 'Light' && <Sun size={16} />}
                        {themeOpt === 'Dark' && <Moon size={16} />}
                        {themeOpt === 'Purple' && <Palette size={16} />}
                        {themeOpt === 'Auto' && <Monitor size={16} />}
                        <span className="text-sm">{themeOpt}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
                <h3 className="text-white font-medium mb-3">Language</h3>
                <select
                  value={user.settings.language}
                  onChange={(e) => handleSettingsChange('language', e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="العربية">العربية</option>
                  <option value="English">English</option>
                  <option value="Spanish">Español</option>
                  <option value="French">Français</option>
                  <option value="German">Deutsch</option>
                </select>
              </div>

              <Switch
                checked={user.settings.audioEnabled}
                onChange={() => handleSettingsChange('audioEnabled', !user.settings.audioEnabled)}
                label="التفاعل الصوتي"
                description="تفعيل الردود الصوتية للذكاء الاصطناعي"
                icon={user.settings.audioEnabled ? Volume2 : VolumeX}
              />

              <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
                <h3 className="text-white font-medium mb-3 text-right">الإشعارات</h3>
                <div className="space-y-3">
                  {Object.entries(user.settings.notifications).map(([type, enabled]) => {
                    const typeLabels = {
                      messages: 'الرسائل',
                      assignments: 'المهام',
                      friends: 'الأصدقاء'
                    };
                    return (
                      <NotificationSwitch
                        key={type}
                        checked={enabled}
                        onChange={() => handleNotificationChange(type, !enabled)}
                        label={typeLabels[type]}
                        type={type}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className={`min-h-screen ${classes.body} ${classes.text}`} dir="rtl">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 flex-row-reverse">
            <div className="flex items-center gap-3 flex-row-reverse">
              <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2 flex-row-reverse">
                <span>الإعدادات</span>
                <Settings size={16} />
              </button>
              {user.education_level === 'جامعي' && (
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 flex-row-reverse">
                  <span>رفع محتوى</span>
                  <Upload size={16} />
                </button>
              )}
            </div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3 flex-row-reverse">
              <span>ملفك الشخصي</span>
              <User size={32} />
            </h1>
          </div>

          {/* Profile Overview */}
          <div className={`${classes.card} ${classes.text} border rounded-xl p-6 mb-8 border-gray-700`}>
            <div className="flex items-center gap-6 flex-row-reverse">
              <div className="flex-1 text-right">
                <h2 className="text-2xl font-bold text-white mb-1">{user.username}</h2>
                <p className="text-gray-400 mb-2">{user.education_level} • {user.country}</p>
                {user.major && <p className="text-gray-300">التخصص: {user.major}</p>}
                {user.gpa && <p className="text-gray-300">المعدل التراكمي: {user.gpa}</p>}
              </div>
              <div className="relative group">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="text-white" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-700 flex-row-reverse">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-t-lg transition-colors flex-row-reverse ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white border-b-2 border-blue-600'
                      : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <span className="hidden sm:inline">{tab.label}</span>
                  <Icon size={18} />
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className={`${classes.card} ${classes.text} border rounded-xl p-6 border-gray-700`}>
            {renderTabContent()}
          </div>
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default ProfilePage; 