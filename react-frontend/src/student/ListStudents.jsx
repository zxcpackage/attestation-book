import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from "../services/api";

function ListStudents() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/listStudents")
            .then(response => {
                setStudents(response.data);
                setLoading(false);
            })
            .catch(e => {
                console.log(e);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Загрузка студентов...</div>;
    }

    return (
        <div>
            <h2>👨‍🎓 Студенты</h2>
            <Link to="/addStudent" style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
                marginBottom: '20px'
            }}>
                + Добавить студента
            </Link>
            
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '15px'
            }}>
                {students.map(student => (
                    <div key={student.id} style={{
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        padding: '20px',
                        backgroundColor: '#f9f9f9'
                    }}>
                        <h3 style={{ marginTop: 0 }}>
                            <Link to={`/student/${student.id}`}>
                                {student.full_name}
                            </Link>
                        </h3>
                        <p><strong>ID:</strong> {student.id}</p>
                        <p><strong>Группа:</strong> {student.student_group?.name || 'Не указана'}</p>
                        <p style={{ marginTop: '10px' }}>
                            <Link to={`/listAttestationBooks`} style={{
                                color: '#2196F3',
                                textDecoration: 'none',
                                fontSize: '14px'
                            }}>
                                📖 Посмотреть оценки
                            </Link>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListStudents;