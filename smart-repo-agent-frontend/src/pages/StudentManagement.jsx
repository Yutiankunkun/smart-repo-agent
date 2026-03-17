import { useState, useEffect } from 'react';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../api/students';
import { getTeachers, createTeacher, updateTeacher, deleteTeacher } from '../api/teachers';
import StudentModal from '../components/StudentModal';
import TeacherModal from '../components/TeacherModal';

export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teacherFilter, setTeacherFilter] = useState('');
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [teacherTab, setTeacherTab] = useState(false);
  const [teacherModalOpen, setTeacherModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await getStudents(teacherFilter || undefined);
      setStudents(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await getTeachers();
      setTeachers(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      await Promise.all([fetchStudents(), fetchTeachers()]);
      setLoading(false);
    };
    load();
  }, [teacherFilter]);

  const handleAddStudent = () => {
    setEditingStudent(null);
    setStudentModalOpen(true);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setStudentModalOpen(true);
  };

  const handleSaveStudent = async (data) => {
    try {
      if (editingStudent) {
        await updateStudent(editingStudent.id, data);
      } else {
        await createStudent(data);
      }
      setStudentModalOpen(false);
      fetchStudents();
    } catch (err) {
      throw err;
    }
  };

  const handleDeleteStudent = async (student) => {
    if (!confirm(`「${student.name}」を削除しますか？`)) return;
    try {
      await deleteStudent(student.id);
      fetchStudents();
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    }
  };

  const handleAddTeacher = () => {
    setEditingTeacher(null);
    setTeacherModalOpen(true);
  };

  const handleEditTeacher = (teacher) => {
    setEditingTeacher(teacher);
    setTeacherModalOpen(true);
  };

  const handleSaveTeacher = async (data) => {
    try {
      if (editingTeacher) {
        await updateTeacher(editingTeacher.id, data);
      } else {
        await createTeacher(data);
      }
      setTeacherModalOpen(false);
      fetchTeachers();
      fetchStudents();
    } catch (err) {
      throw err;
    }
  };

  const handleDeleteTeacher = async (teacher) => {
    if (!confirm(`「${teacher.name}」を削除しますか？`)) return;
    try {
      await deleteTeacher(teacher.id);
      fetchTeachers();
      fetchStudents();
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    }
  };

  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-200">
          <button
            onClick={() => setTeacherTab(false)}
            className={`px-4 py-2 font-medium -mb-px ${
              !teacherTab ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            学生一覧
          </button>
          <button
            onClick={() => setTeacherTab(true)}
            className={`px-4 py-2 font-medium -mb-px ${
              teacherTab ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            担当教員管理
          </button>
        </div>

        {!teacherTab ? (
          <>
            {/* Student section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold text-slate-800">学生管理</h2>
              <div className="flex flex-wrap gap-3">
                <select
                  value={teacherFilter}
                  onChange={(e) => setTeacherFilter(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">全教員</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAddStudent}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  学生を追加
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>
            )}

            {loading ? (
              <div className="text-slate-500 py-16 text-center bg-white rounded-xl border border-slate-200">読み込み中...</div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50/80">
                      <tr>
                        <th className="px-5 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">ID</th>
                        <th className="px-5 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">氏名</th>
                        <th className="px-5 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">大学</th>
                        <th className="px-5 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">専攻</th>
                        <th className="px-5 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">TOEIC</th>
                        <th className="px-5 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">JLPT</th>
                        <th className="px-5 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">担当教員</th>
                        <th className="px-5 sm:px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {students.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-5 sm:px-6 py-3.5 text-sm text-slate-900 font-medium">{s.id}</td>
                          <td className="px-5 sm:px-6 py-3.5 text-sm text-slate-900">{s.name}</td>
                          <td className="px-5 sm:px-6 py-3.5 text-sm text-slate-600">{s.university}</td>
                          <td className="px-5 sm:px-6 py-3.5 text-sm text-slate-600">{s.major}</td>
                          <td className="px-5 sm:px-6 py-3.5 text-sm text-slate-600">{s.toeic}</td>
                          <td className="px-5 sm:px-6 py-3.5 text-sm text-slate-600">{s.jlpt}</td>
                          <td className="px-5 sm:px-6 py-3.5 text-sm text-slate-600">{s.teacher_name}</td>
                          <td className="px-5 sm:px-6 py-3.5 text-right space-x-2">
                            <button
                              onClick={() => handleEditStudent(s)}
                              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                            >
                              編集
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(s)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              削除
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {students.length === 0 && !loading && (
                  <div className="py-12 text-center text-slate-500">学生が登録されていません</div>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Teacher section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold text-slate-800">担当教員管理</h2>
              <button
                onClick={handleAddTeacher}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                教員を追加
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50/80">
                    <tr>
                      <th className="px-5 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">ID</th>
                      <th className="px-5 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">氏名</th>
                      <th className="px-5 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">専門</th>
                      <th className="px-5 sm:px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {teachers.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 sm:px-6 py-3.5 text-sm text-slate-900 font-medium">{t.id}</td>
                        <td className="px-5 sm:px-6 py-3.5 text-sm text-slate-900">{t.name}</td>
                        <td className="px-5 sm:px-6 py-3.5 text-sm text-slate-600">{t.specialty}</td>
                        <td className="px-5 sm:px-6 py-3.5 text-right space-x-2">
                          <button
                            onClick={() => handleEditTeacher(t)}
                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                          >
                            編集
                          </button>
                          <button
                            onClick={() => handleDeleteTeacher(t)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            削除
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {teachers.length === 0 && !loading && (
                <div className="py-12 text-center text-slate-500">教員が登録されていません</div>
              )}
            </div>
          </>
        )}
      </div>

      <StudentModal
        open={studentModalOpen}
        onClose={() => setStudentModalOpen(false)}
        onSave={handleSaveStudent}
        student={editingStudent}
        teachers={teachers}
      />

      <TeacherModal
        open={teacherModalOpen}
        onClose={() => setTeacherModalOpen(false)}
        onSave={handleSaveTeacher}
        teacher={editingTeacher}
      />
    </div>
  );
}
