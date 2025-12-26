import React, { useState, useEffect } from 'react';
import api from "../services/api";
import { Navigate, useParams, useNavigate } from 'react-router-dom';

function DisciplineData() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [discipline, setDiscipline] = useState({
        id: id,
        name: ""
    });
    
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) {
            setError("ID дисциплины не указан");
            setLoading(false);
            return;
        }

        async function getDiscipline() {
            try {
                setLoading(true);
                const response = await api.get("/discipline/" + id);
                
                if (response.data) {
                    setDiscipline({
                        id: id,
                        name: response.data.name
                    });
                } else {
                    setError("Дисциплина не найдена");
                }
            } catch (err) {
                console.error("Error fetching discipline:", err);
                setError("Ошибка загрузки данных");
            } finally {
                setLoading(false);
            }
        }

        getDiscipline();
    }, [id]);

    function handleChange(event) {
        setDiscipline({
            ...discipline,
            name: event.target.value
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        
        try {
            const data = { name: discipline.name };
            await api.post("/updateDiscipline/" + discipline.id, data);
            setSubmitted(true);
        } catch (err) {
            console.error("Update error:", err);
            setError(err.response?.data?.message || "Ошибка обновления");
        }
    }

    async function deleteDiscipline() {
        if (!window.confirm("Вы уверены, что хотите удалить эту дисциплину?")) {
            return;
        }
        
        try {
            await api.post("/deleteDiscipline/" + discipline.id);
            setSubmitted(true);
        } catch (err) {
            console.error("Delete error:", err);
            setError(err.response?.data?.message || "Ошибка удаления");
        }
    }

    if (submitted) {
        return <Navigate to="/listDisciplines" />;
    }

    if (loading) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h3>Загрузка данных дисциплины...</h3>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '20px' }}>
                <h3 style={{ color: 'red' }}>Ошибка: {error}</h3>
                <button onClick={() => navigate('/listDisciplines')}>
                    Вернуться к списку
                </button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h2>Редактирование дисциплины</h2>
            <p><strong>ID:</strong> {discipline.id}</p>
            
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Наименование дисциплины:
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={discipline.name}
                        placeholder="Введите название дисциплины"
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            fontSize: '16px'
                        }}
                        required
                    />
                </div>
                
                {error && (
                    <div style={{
                        color: 'red',
                        marginBottom: '15px',
                        padding: '10px',
                        backgroundColor: '#ffe6e6',
                        borderRadius: '4px'
                    }}>
                        {error}
                    </div>
                )}
                
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        type="submit"
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        Обновить
                    </button>
                    
                    <button
                        type="button"
                        onClick={deleteDiscipline}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#f44336',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        Удалить
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => navigate('/listDisciplines')}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#2196F3',
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
                backgroundColor: '#f5f5f5',
                borderRadius: '5px'
            }}>
                <h4>Информация:</h4>
                <p>ID дисциплины: <strong>{discipline.id}</strong></p>
                <p>Название: <strong>{discipline.name}</strong></p>
                <p>После обновления или удаления вы вернетесь к списку дисциплин.</p>
            </div>
        </div>
    );
}

export default DisciplineData;