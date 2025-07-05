import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const countries = [
  { id: 1, name: "مصر" },
  { id: 2, name: "السعودية" },
  { id: 3, name: "الأردن" },
  // أضف المزيد حسب قاعدة البيانات
];
const stages = [
  { value: "preparatory", label: "إعدادي" },
  { value: "secondary", label: "ثانوي" },
  { value: "university", label: "جامعي" },
];

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    country_id: "",
    educational_stage: "",
    study_field: "",
    birth_date: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError(""); setSuccess(""); setLoading(true);
    try {
      const res = await axios.post("http://localhost/education-ai-2/backend/auth/register.php", {
        ...form,
        auth_provider: "manual"
      });
      if (res.data.success) {
        // حفظ بيانات المستخدم في localStorage
        localStorage.setItem("user", JSON.stringify(res.data.user));
        // توجيه إلى الصفحة الرئيسية بعد إنشاء الحساب
        navigate('/home', { replace: true });
      } else {
        setError(res.data.message || "خطأ في إنشاء الحساب");
      }
    } catch {
      setError("فشل الاتصال بالخادم");
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
      {/* نموذج إنشاء الحساب */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md bg-slate-800 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-white mb-2 text-center">إنشاء حساب جديد</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="الاسم الكامل"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-md px-4 py-2 bg-slate-700 text-white placeholder-slate-400 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="البريد الإلكتروني"
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
            <select
              name="country_id"
              value={form.country_id}
              onChange={handleChange}
              className="w-full rounded-md px-4 py-2 bg-slate-700 text-white shadow focus:outline-none"
              required
            >
              <option value="">اختر الدولة</option>
              {countries.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <select
              name="educational_stage"
              value={form.educational_stage}
              onChange={handleChange}
              className="w-full rounded-md px-4 py-2 bg-slate-700 text-white shadow focus:outline-none"
              required
            >
              <option value="">اختر المرحلة التعليمية</option>
              {stages.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            <input
              type="text"
              name="study_field"
              placeholder="التخصص الدراسي (اختياري)"
              value={form.study_field}
              onChange={handleChange}
              className="w-full rounded-md px-4 py-2 bg-slate-700 text-white placeholder-slate-400 shadow focus:outline-none"
            />
            <input
              type="date"
              name="birth_date"
              placeholder="تاريخ الميلاد"
              value={form.birth_date}
              onChange={handleChange}
              required
              className="w-full rounded-md px-4 py-2 bg-slate-700 text-white placeholder-slate-400 shadow focus:outline-none"
            />
            {error && <div className="text-red-400 text-sm">{error}</div>}
            {success && <div className="text-green-400 text-sm">{success}</div>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-md py-2 text-white font-bold shadow"
            >
              {loading ? "...جاري التسجيل" : "إنشاء الحساب"}
            </button>
          </form>
          <div className="mt-6 text-center text-slate-400">
            لديك حساب بالفعل؟ <a href="/login" className="text-blue-400 hover:underline">تسجيل الدخول</a>
          </div>
        </div>
      </div>
    </div>
  );
} 