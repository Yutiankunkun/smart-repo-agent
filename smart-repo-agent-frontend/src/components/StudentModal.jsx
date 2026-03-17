import { useState, useEffect } from 'react';

export default function StudentModal({ open, onClose, onSave, student, teachers }) {
  const [form, setForm] = useState({
    id: '',
    name: '',
    university: '',
    major: '',
    toeic: '',
    jlpt: '',
    teacher_id: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (student) {
      setForm({
        id: student.id,
        name: student.name,
        university: student.university,
        major: student.major,
        toeic: student.toeic,
        jlpt: student.jlpt,
        teacher_id: student.teacher_id,
      });
    } else {
      setForm({
        id: '',
        name: '',
        university: '',
        major: '',
        toeic: '',
        jlpt: '',
        teacher_id: teachers?.[0]?.id || '',
      });
    }
    setError(null);
  }, [student, teachers, open]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (student) {
        const { id, ...updateData } = form;
        await onSave(updateData);
      } else {
        await onSave(form);
      }
      onClose();
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            {student ? '学生を編集' : '学生を追加'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">ID</label>
              <input
                type="text"
                name="id"
                value={form.id}
                onChange={handleChange}
                required
                disabled={!!student}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-slate-100 disabled:text-slate-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">氏名</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">大学</label>
              <input
                type="text"
                name="university"
                value={form.university}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">専攻</label>
              <input
                type="text"
                name="major"
                value={form.major}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">TOEIC</label>
              <input
                type="text"
                name="toeic"
                value={form.toeic}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">JLPT</label>
              <input
                type="text"
                name="jlpt"
                value={form.jlpt}
                onChange={handleChange}
                required
                placeholder="例: N1"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">担当教員</label>
              <select
                name="teacher_id"
                value={form.teacher_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">選択してください</option>
                {teachers?.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.id})
                  </option>
                ))}
              </select>
            </div>
            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>
            )}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                {student ? '更新' : '追加'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
