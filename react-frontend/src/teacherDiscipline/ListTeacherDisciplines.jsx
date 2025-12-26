import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from "../services/api";

function ListTeacherDisciplines() {
    const [searchParams] = useSearchParams();
    const teacherId = searchParams.get('teacher');
    
    const [teacherDisciplines, setTeacherDisciplines] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(teacherId || '');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Загружаем всех преподавателей
        api.get("/listTeachers")
            .then(response => {
                setTeachers(response.data);
                
                // Если передан ID преподавателя, загружаем его дисциплины
                if (teacherId) {
                    loadTeacherDisciplines(teacherId);
                } else {
                    setLoading(false);
                }
            })
            .catch(e => {
                console.log(e);
                setLoading(false);
            });
    }, [teacherId]);

    const loadTeacherDisciplines = (teacherId) => {
        setLoading(true);
        api.get("/listTeacherDiscipline")
            .then(response => {
                // Фильтруем по преподавателю
                const filtered = response.data.filter(item => 
                    item.teacher_id == teacherId
                );
                setTeacherDisciplines(filtered);
                setLoading(false);
            })
            .catch(e => {
                console.log(e);
                setLoading(false);
            });
    };

    const handleTeacherChange = (e) => {
        const teacherId = e.target.value;
        setSelectedTeacher(teacherId);
        if (teacherId) {
            loadTeacherDisciplines(teacherId);
        } else {
            setTeacherDisciplines([]);
        }
    };

    if (loading) {
        return <div>Загрузка данных...</div>;
    }

    return (
        <div>
            <h2>👨‍🏫 Дисциплины преподавателей</h2>
            
            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Выберите преподавателя:
                </label>
                <select 
                    value={selectedTeacher}
                    onChange={handleTeacherChange}
                    style={{ width: '100%', maxWidth: '400px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                    <option value="">-- Все преподаватели --</option>
                    {teachers.map(teacher => (
                        <option key={teacher.id} value={teacher.id}>
                            {teacher.full_name}
                        </option>
                    ))}
                </select>
            </div>

            {selectedTeacher && teacherDisciplines.length > 0 ? (
                <div>
                    <h3>Дисциплины преподавателя: {
                        teachers.find(t => t.id == selectedTeacher)?.full_name
                    }</h3>
                    
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: '15px',
                        marginTop: '20px'
                    }}>
                        {teacherDisciplines.map(item => (
                            <div key={item.id} style={{
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                padding: '20px',
                                backgroundColor: '#f5f5f5',
                                textAlign: 'center'
                            }}>
                                <h4 style={{ marginTop: 0 }}>{item.discipline?.name}</h4>
                                <p><strong>Преподаватель:</strong> {item.teacher?.full_name}</p>
                                <p><strong>ID связи:</strong> {item.id}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : selectedTeacher ? (
                <div style={{
                    padding: '20px',
                    backgroundColor: '#fff3cd',
                    borderRadius: '5px',
                    border: '1px solid #ffeaa7',
                    marginTop: '20px'
                }}>
                    📝 У выбранного преподавателя пока нет дисциплин
                </div>
            ) : (
                <div style={{
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '5px',
                    border: '1px solid #dee2e6',
                    marginTop: '20px',
                    textAlign: 'center'
                }}>
                    👈 Выберите преподавателя слева, чтобы увидеть его дисциплины
                </div>
            )}
        </div>
    );
}

export default ListTeacherDisciplines;