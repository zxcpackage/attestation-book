import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../services/api";

function AddTeacher() {
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!fullName.trim()) {
            setError('Введите ФИО преподавателя');
            return;
        }

        setLoading(true);
        
        try {
            await api.post("/addTeacher", { full_name: fullName });
            navigate('/listTeachers');
        } catch (err) {
            console.error(err);
            setError('Ошибка при добавлении преподавателя: ' + (err.response?.data?.message || ''));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2>Добавить преподавателя</h2>
            
            {error && (
                <div style={{
                    color: 'red',
                    backgroundColor: '#ffe6e6',
                    padding: '10px',
                    borderRadius: '5px',
                    marginBottom: '15px'
                }}>
                    ❌ {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        ФИО преподавателя: *
                    </label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        placeholder="Например: Иванов Иван Иванович"
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
                        {loading ? 'Добавление...' : '✅ Добавить преподавателя'}
                    </button>
                    
                    <button 
                        type="button"
                        onClick={() => navigate('/listTeachers')}
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
        </div>
    );
}

export default AddTeacher;