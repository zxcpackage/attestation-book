import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from "../services/api";

function ListTeachers() {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/listTeachers")
            .then(response => {
                setTeachers(response.data);
                setLoading(false);
            })
            .catch(e => {
                console.log(e);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Загрузка преподавателей...</div>;
    }

    return (
        <div>
            <h2>👨‍🏫 Преподаватели</h2>
            <Link to="/addTeacher" style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
                marginBottom: '20px'
            }}>
                + Добавить преподавателя
            </Link>
            
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '15px'
            }}>
                {teachers.map(teacher => (
                    <div key={teacher.id} style={{
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        padding: '20px',
                        backgroundColor: '#f9f9f9'
                    }}>
                        <h3 style={{ marginTop: 0 }}>
                            <Link to={`/teacher/${teacher.id}`}>
                                {teacher.full_name}
                            </Link>
                        </h3>
                        <p><strong>ID:</strong> {teacher.id}</p>
                        <p style={{ marginTop: '10px' }}>
                            <Link to={`/teacherDisciplines?teacher=${teacher.id}`} style={{
                                color: '#2196F3',
                                textDecoration: 'none',
                                fontSize: '14px'
                            }}>
                                👁️ Посмотреть дисциплины
                            </Link>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListTeachers;