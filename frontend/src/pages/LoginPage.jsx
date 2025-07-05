import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OAuthButton({ provider, onClick }) {
  const icons = {
    Google: <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />,
    Microsoft: <img src="/microsoft-icon.svg" alt="Microsoft" className="w-5 h-5" />,
  };
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white rounded-md py-2 font-semibold shadow mb-2 transition"
    >
      {icons[provider]} تسجيل الدخول عبر {provider}
    </button>
  );
}

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("[DEBUG] صفحة تسجيل الدخول تم تحميلها");
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(`[DEBUG] تغيير الحقل: ${e.target.name} =`, e.target.value);
  };

  // تسجيل دخول يدوي
  const handleSubmit = async e => {
    e.preventDefault();
    setError(""); setLoading(true);
    console.log("[DEBUG] محاولة تسجيل الدخول بالقيم:", { ...form, auth_provider: "manual" });
    try {
      const res = await axios.post("http://localhost/education-ai-2/backend/auth/login.php", {
        ...form,
        auth_provider: "manual"
      });
      console.log("[DEBUG] استجابة السيرفر:", res.data);
      if (res.data.success) {
        const role = res.data.user?.role || 'user';
        // حفظ بيانات المستخدم في localStorage
        localStorage.setItem("user", JSON.stringify(res.data.user));
        // توجيه إلى الصفحة الرئيسية بعد تسجيل الدخول
        navigate('/home', { replace: true });
      } else if (res.data.requires_2fa) {
        navigate(`/verify2fa?user_id=${res.data.user_id}`);
      } else {
        setError(res.data.message || "خطأ في تسجيل الدخول");
      }
    } catch (err) {
      setError("فشل الاتصال بالخادم");
      console.log("[DEBUG] خطأ axios:", err);
      if (err.response) {
        console.log("[DEBUG] استجابة الخطأ من السيرفر:", err.response.data);
      } else {
        console.log("[DEBUG] رسالة الخطأ:", err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // تسجيل دخول OAuth (Google/Microsoft)
  const handleOAuth = async provider => {
    setError(""); setLoading(true);
    try {
      const email = prompt(`أدخل بريدك الإلكتروني لتسجيل الدخول عبر ${provider}:`);
      if (!email) { setLoading(false); return; }
      console.log("[DEBUG] محاولة تسجيل دخول OAuth:", { email, auth_provider: provider.toLowerCase() });
      const res = await axios.post("http://localhost/education-ai-2/backend/auth/login.php", {
        email,
        auth_provider: provider.toLowerCase()
      });
      console.log("[DEBUG] استجابة السيرفر OAuth:", res.data);
      if (res.data.success) {
        const role = res.data.user?.role || 'user';
        // حفظ بيانات المستخدم في localStorage
        localStorage.setItem("user", JSON.stringify(res.data.user));
        // توجيه إلى الصفحة الرئيسية بعد تسجيل الدخول
        navigate('/home', { replace: true });
      } else if (res.data.requires_2fa) {
        navigate(`/verify2fa?user_id=${res.data.user_id}`);
      } else {
        setError(res.data.message || "خطأ في تسجيل الدخول");
      }
    } catch (err) {
      setError("فشل الاتصال بالخادم");
      console.log("[DEBUG] خطأ axios OAuth:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-900 text-white">
      {/* الصورة الجانبية */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-tr from-[#ff7e1d] to-[#a24fe5]">
        <img
          src="/ai-login.png"
          alt="AI Illustration"
          className="max-w-md rounded-2xl shadow-2xl opacity-90"
        />
      </div>
      {/* نموذج تسجيل الدخول */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md bg-slate-800 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-white mb-2 text-center">تسجيل الدخول</h2>
          <p className="text-slate-300 mb-6 text-center">ادخل بياناتك للولوج إلى عالم التعلم الذكي</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="البريد الإلكتروني أو اسم المستخدم"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-md px-4 py-2 bg-slate-700 text-white placeholder-slate-400 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="كلمة المرور"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full rounded-md px-4 py-2 bg-slate-700 text-white placeholder-slate-400 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <div className="text-red-400 text-sm">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-md py-2 text-white font-bold shadow"
            >
              {loading ? "...جاري الدخول" : "تسجيل الدخول"}
            </button>
          </form>
          <div className="mt-6 flex flex-col gap-2">
            <OAuthButton provider="Google" onClick={() => handleOAuth("Google")} />
            <OAuthButton provider="Microsoft" onClick={() => handleOAuth("Microsoft")} />
          </div>
          <div className="mt-6 text-center text-slate-400">
            ليس لديك حساب؟ <a href="/register" className="text-blue-400 hover:underline">إنشاء حساب جديد</a>
          </div>
        </div>
      </div>
    </div>
  );
} 