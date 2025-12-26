import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../services/api";

function AddAttestationBook() {
    const [form, setForm] = useState({
        student_id: '',
        discipline_id: '',
        report_type_id: '',
        grade: '',
        date: ''
    });
    const [students, setStudents] = useState([]);
    const [disciplines, setDisciplines] = useState([]);
    const [reportTypes, setReportTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Загружаем данные для выпадающих списков
        Promise.all([
            api.get("/listStudents"),
            api.get("/listDisciplines"),
            api.get("/listReportTypes")
        ]).then(([studentsRes, disciplinesRes, reportTypesRes]) => {
            setStudents(studentsRes.data);
            setDisciplines(disciplinesRes.data);
            setReportTypes(reportTypesRes.data);
        });
    }, []);

    const validateGrade = (grade, reportType) => {
        const gradeStr = grade.toString().toLowerCase().trim();
        
        // Если тип отчётности "Зачёт"
        if (reportType && reportType.name && reportType.name.toLowerCase().includes('зачёт')) {
            const validGrades = ['зачёт', 'незачёт', 'з', 'н', 'зачет', 'незачет'];
            if (!validGrades.includes(gradeStr)) {
                return "Для зачёта допустимы оценки: 'зачёт', 'незачёт', 'з', 'н'";
            }
        } 
        // Если экзамен
        else {
            const validGrades = ['2', '3', '4', '5', 'неуд', 'удовл', 'хор', 'отл'];
            if (!validGrades.includes(gradeStr)) {
                return "Для экзамена допустимы оценки: '2', '3', '4', '5' или 'неуд', 'удовл', 'хор', 'отл'";
            }
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        // Валидация оценки
        const selectedReportType = reportTypes.find(type => type.id === parseInt(form.report_type_id));
        if (selectedReportType) {
            const gradeError = validateGrade(form.grade, selectedReportType);
            if (gradeError) {
                setError(gradeError);
                return;
            }
        }

        setLoading(true);
        
        try {
            await api.post("/addAttestationBook", form);
            navigate('/listAttestationBooks');
        } catch (err) {
            console.error(err);
            setError('Ошибка при добавлении записи: ' + (err.response?.data?.message || ''));
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
        
        // Сбрасываем ошибку при изменении
        if (name === 'grade' || name === 'report_type_id') {
            setError('');
        }
    };

    const getGradePlaceholder = () => {
        if (!form.report_type_id) return "Сначала выберите тип отчётности";
        
        const selectedReportType = reportTypes.find(type => type.id === parseInt(form.report_type_id));
        if (selectedReportType) {
            if (selectedReportType.name.toLowerCase().includes('зачёт')) {
                return "зачёт, незачёт, з, н";
            } else {
                return "2, 3, 4, 5 или неуд, удовл, хор, отл";
            }
        }
        return "Введите оценку";
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2>Добавить запись в зачётную книжку</h2>
            
            {error && (
                <div style={{
                    color: 'red',
                    backgroundColor: '#ffe6e6',
                    padding: '10px',
                    borderRadius: '5px',
                    marginBottom: '15px',
                    border: '1px solid #ffcccc'
                }}>
                    ❌ {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Студент: *
                    </label>
                    <select 
                        name="student_id" 
                        value={form.student_id}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        required
                    >
                        <option value="">-- Выберите студента --</option>
                        {students.map(student => (
                            <option key={student.id} value={student.id}>
                                {student.full_name} (Группа: {student.student_group?.name})
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Дисциплина: *
                    </label>
                    <select 
                        name="discipline_id" 
                        value={form.discipline_id}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        required
                    >
                        <option value="">-- Выберите дисциплину --</option>
                        {disciplines.map(discipline => (
                            <option key={discipline.id} value={discipline.id}>
                                {discipline.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Тип отчётности: *
                    </label>
                    <select 
                        name="report_type_id" 
                        value={form.report_type_id}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        required
                    >
                        <option value="">-- Выберите тип --</option>
                        {reportTypes.map(type => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Оценка: *
                    </label>
                    <input
                        type="text"
                        name="grade"
                        value={form.grade}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        placeholder={getGradePlaceholder()}
                        required
                    />
                    <small style={{ color: '#666', marginTop: '5px', display: 'block' }}>
                        {form.report_type_id ? (
                            reportTypes.find(t => t.id === parseInt(form.report_type_id))?.name.toLowerCase().includes('зачёт') 
                                ? "Допустимые значения: зачёт, незачёт, з, н"
                                : "Допустимые значения: 2, 3, 4, 5, неуд, удовл, хор, отл"
                        ) : "Выберите тип отчётности для подсказки"}
                    </small>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Дата: *
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        required
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: loading ? '#ccc' : '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontSize: '16px',
                            flex: 1
                        }}
                    >
                        {loading ? 'Добавление...' : '✅ Добавить запись'}
                    </button>
                    
                    <button 
                        type="button"
                        onClick={() => navigate('/listAttestationBooks')}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        Отмена
                    </button>
                </div>
            </form>
            
            <div style={{
                marginTop: '30px',
                padding: '15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '5px',
                border: '1px solid #dee2e6'
            }}>
                <h4 style={{ marginTop: 0 }}>📋 Правила выставления оценок:</h4>
                <ul style={{ marginBottom: 0 }}>
                    <li><strong>Для экзамена:</strong> 2, 3, 4, 5 или неуд, удовл, хор, отл</li>
                    <li><strong>Для зачёта:</strong> зачёт, незачёт, з, н</li>
                    <li><strong>Для курсовой работы:</strong> зачёт, незачёт или оценка 2-5</li>
                </ul>
            </div>
        </div>
    );
}

export default AddAttestationBook;