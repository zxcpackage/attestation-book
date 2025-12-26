import React, { useState, useEffect } from 'react';
import api from "../services/api";

function ListReportTypes() {
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/listReportTypes")
            .then(response => {
                setTypes(response.data);
                setLoading(false);
            })
            .catch(e => {
                console.log(e);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Загрузка типов отчётности...</div>;
    }

    return (
        <div>
            <h2>📋 Типы отчётности</h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '15px',
                marginTop: '20px'
            }}>
                {types.map(type => (
                    <div key={type.id} style={{
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        padding: '20px',
                        backgroundColor: '#f5f5f5',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ marginTop: 0 }}>{type.name}</h3>
                        <p>ID: {type.id}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListReportTypes;