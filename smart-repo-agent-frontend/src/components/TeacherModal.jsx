import { useState, useEffect } from 'react';

export default function TeacherModal({ open, onClose, onSave, teacher }) {
  const [form, setForm] = useState({
    id: '',
    name: '',
    specialty: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (teacher) {
      setForm({
        id: teacher.id,
        name: teacher.name,
        specialty: teacher.specialty,
      });
    } else {
      setForm({ id: '', name: '', specialty: '' });
    }
    setError(null);
  }, [teacher, open]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (teacher) {
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
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            {teacher ? '教員を編集' : '教員を追加'}
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
                disabled={!!teacher}
                placeholder="例: tid0001"
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
              <label className="block text-sm font-medium text-slate-700 mb-1">専門</label>
              <input
                type="text"
                name="specialty"
                value={form.specialty}
                onChange={handleChange}
                required
                placeholder="例: 情報"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
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
                {teacher ? '更新' : '追加'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
