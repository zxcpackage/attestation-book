import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from "../services/api";

function ListAttestationBooks() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/listAttestationBooks")
            .then(response => {
                setRecords(response.data);
                setLoading(false);
            })
            .catch(e => {
                console.log(e);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Загрузка записей зачётной книжки...</div>;
    }

    return (
        <div>
            <h2>📖 Зачётная книжка</h2>
            <Link to="/addAttestationBook" style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
                marginBottom: '20px'
            }}>
                + Добавить запись
            </Link>
            
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '15px'
            }}>
                {records.map(record => (
                    <div key={record.id} style={{
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        padding: '15px',
                        backgroundColor: '#f9f9f9'
                    }}>
                        <h3 style={{ marginTop: 0 }}>
                            <Link to={`/attestationBook/${record.id}`}>
                                Запись #{record.id}
                            </Link>
                        </h3>
                        <p><strong>Студент:</strong> {record.student?.full_name}</p>
                        <p><strong>Дисциплина:</strong> {record.discipline?.name}</p>
                        <p><strong>Тип:</strong> {record.report_type?.name}</p>
                        <p><strong>Оценка:</strong> {record.grade}</p>
                        <p><strong>Дата:</strong> {record.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListAttestationBooks;