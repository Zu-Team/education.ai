import React, { useState, useRef, useEffect } from 'react';
import { Send, Search, MoreVertical, Paperclip, Smile, Copy, Edit, Trash2, Reply, Star, Download } from 'lucide-react';

const FriendsChatPage = () => {
  const [activeFriend, setActiveFriend] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const messagesEndRef = useRef(null);

  // بيانات وهمية للأصدقاء
  const friends = [
    { 
      id: 1, 
      name: 'سارة أحمد', 
      avatar: 'س', 
      lastMessage: 'هل أنهيت الواجب؟', 
      time: '22:13',
      unread: 2,
      online: true
    },
    { 
      id: 2, 
      name: 'محمد علي', 
      avatar: 'م', 
      lastMessage: 'سأرسل لك الملف بعد قليل', 
      time: '21:45',
      unread: 0,
      online: false
    },
    { 
      id: 3, 
      name: 'لبان خالد', 
      avatar: 'ل', 
      lastMessage: 'شكراً لك على المساعدة', 
      time: '20:30',
      unread: 1,
      online: true
    },
  ];

  // بيانات وهمية للرسائل
  const initialMessages = {
    1: [
      { id: 1, senderId: 1, content: 'مرحباً! كيف حالك؟', timestamp: '22:10', isSent: false },
      { id: 2, senderId: 'me', content: 'بخير والحمد لله', timestamp: '22:11', isSent: true },
      { id: 3, senderId: 1, content: 'هل أنهيت الواجب؟', timestamp: '22:12', isSent: false },
      { id: 4, senderId: 'me', content: 'ليس بعد، أعمل عليه الآن', timestamp: '22:13', isSent: true },
    ],
    2: [
      { id: 1, senderId: 2, content: 'السلام عليكم', timestamp: '20:00', isSent: false },
      { id: 2, senderId: 'me', content: 'وعليكم السلام', timestamp: '20:01', isSent: true },
      { id: 3, senderId: 2, content: 'سأرسل لك الملف بعد قليل', timestamp: '21:45', isSent: false },
    ],
    3: [
      { id: 1, senderId: 'me', content: 'شكراً على المساعدة', timestamp: '19:30', isSent: true },
      { id: 2, senderId: 3, content: 'العفو، دائماً في الخدمة', timestamp: '20:30', isSent: false },
    ]
  };

  useEffect(() => {
    setMessages(initialMessages);
    setActiveFriend(friends[0]); // تحديد أول صديق كافتراضي
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeFriend]);

  const sendMessage = () => {
    if (!newMessage.trim() || !activeFriend) return;

    const newMsg = {
      id: Date.now(),
      senderId: 'me',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
      isSent: true
    };

    setMessages(prev => ({
      ...prev,
      [activeFriend.id]: [...(prev[activeFriend.id] || []), newMsg]
    }));

    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const MessageBubble = ({ message, onContextMenu }) => {
    const isMyMessage = message.isSent;
    
    return (
      <div 
        className={`flex mb-3 ${isMyMessage ? 'justify-end' : 'justify-start'}`}
        onContextMenu={(e) => onContextMenu(e, message)}
      >
        <div 
          className={`max-w-xs px-4 py-2 rounded-2xl relative ${
            isMyMessage 
              ? 'bg-blue-500 text-white rounded-br-sm' 
              : 'bg-gray-700 text-white rounded-bl-sm'
          }`}
        >
          <p className="text-sm leading-relaxed text-right">{message.content}</p>
          <div className={`text-xs mt-1 opacity-70 text-right`}>
            {message.timestamp}
            {isMyMessage && (
              <span className="mr-1">
                <svg className="inline w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                </svg>
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ContextMenu = ({ x, y, message, onClose }) => {
    const actions = [
      { icon: Reply, label: 'رد', action: () => console.log('Reply') },
      { icon: Copy, label: 'نسخ', action: () => navigator.clipboard.writeText(message.content) },
      { icon: Star, label: 'حفظ', action: () => console.log('Star') },
      { icon: Edit, label: 'تعديل', action: () => console.log('Edit'), show: message.isSent },
      { icon: Trash2, label: 'حذف', action: () => console.log('Delete'), show: message.isSent },
    ];

    return (
      <div 
        className="fixed bg-gray-800 rounded-lg shadow-xl border border-gray-600 py-2 z-50"
        style={{ left: x, top: y }}
        onMouseLeave={onClose}
      >
        {actions.filter(action => action.show !== false).map((action, index) => (
          <button
            key={index}
            onClick={() => {
              action.action();
              onClose();
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
          >
            <action.icon className="w-4 h-4 mr-3" />
            {action.label}
          </button>
        ))}
      </div>
    );
  };

  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (e, message) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      message
    });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  return (
    <div className="h-screen bg-gray-900 text-white font-arabic flex" onClick={closeContextMenu}>
      
      {/* قائمة الأصدقاء - يسار */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col h-screen">
        {/* Header */}
        <div className="p-4 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-bold">الرسائل</h1>
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="بحث عن صديق..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Friends List - ارتفاع ثابت */}
        <div className="flex-1 overflow-y-auto h-96">
          {friends
            .filter(friend => friend.name.includes(searchTerm))
            .map((friend) => (
            <div
              key={friend.id}
              onClick={() => setActiveFriend(friend)}
              className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors ${
                activeFriend?.id === friend.id ? 'bg-gray-700 border-l-4 border-blue-500' : ''
              }`}
            >
              <div className="flex items-center">
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {friend.avatar}
                  </div>
                  {friend.online && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-800"></div>
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-white">{friend.name}</h3>
                    <span className="text-xs text-gray-400">{friend.time}</span>
                  </div>
                  <p className="text-sm text-gray-400 truncate mt-1">{friend.lastMessage}</p>
                </div>
                {friend.unread > 0 && (
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {friend.unread}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* منطقة المحادثة - يمين */}
      <div className="flex-1 flex flex-col h-screen">
        {activeFriend ? (
          <>
            {/* Chat Header */}
            <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {activeFriend.avatar}
                </div>
                <div className="ml-3">
                  <h2 className="font-semibold text-white">{activeFriend.name}</h2>
                  <p className="text-sm text-gray-400">
                    {activeFriend.online ? 'متصل الآن' : 'آخر ظهور منذ ساعة'}
                  </p>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-white">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            {/* Messages - ارتفاع ثابت */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-900 h-96" dir="rtl">
              {(messages[activeFriend.id] || []).map((message) => (
                <MessageBubble 
                  key={message.id} 
                  message={message} 
                  onContextMenu={handleContextMenu}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-gray-800 border-t border-gray-700 p-4" dir="rtl">
              <div className="flex items-end space-x-3 space-x-reverse">
                <button className="p-2 text-gray-400 hover:text-white">
                  <Paperclip className="w-5 h-5" />
                </button>
                
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="اكتب رسالة..."
                    className="w-full p-3 pr-10 bg-gray-700 text-white border border-gray-600 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-32 placeholder-gray-400 text-right"
                    rows="1"
                    style={{ minHeight: '44px' }}
                  />
                  <button className="absolute left-3 bottom-2 p-1 text-gray-400 hover:text-white">
                    <Smile className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-900">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-12 h-12 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">اختر صديقاً للمحادثة</h3>
              <p className="text-gray-500">اختر محادثة من القائمة لبدء المراسلة</p>
            </div>
          </div>
        )}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          message={contextMenu.message}
          onClose={closeContextMenu}
        />
      )}

      <style jsx>{`
        .font-arabic {
          font-family: 'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
      `}</style>
    </div>
  );
};

export default FriendsChatPage;
 