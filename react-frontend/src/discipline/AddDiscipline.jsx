import React, { useState } from 'react';
import api from "../services/api";
import { Navigate } from 'react-router-dom';

function AddDiscipline() {
    const [name, setName] = useState(""); 
    const [submitted, setSubmitted] = useState(false); 

    const handleChange = (event) => {
        setName(event.target.value);
    };

    // Обработчик отправки формы
    const handleSubmit = (event) => {
        event.preventDefault(); 
        
        const data = {
            name: name
        };
        
        api
            .post("/addDiscipline", data)
            .then(() => {
                setSubmitted(true); 
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        !submitted ? (
            <div>
                <h2>Добавить новую дисциплину</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="name" 
                        value={name} 
                        placeholder="Наименование дисциплины" 
                        onChange={handleChange}
                        style={{marginRight: '10px', padding: '5px'}}
                    />
                    <input 
                        type="submit" 
                        value="Добавить" 
                        style={{padding: '5px 15px'}}
                    />
                </form>
            </div>
        ) : (
            <Navigate to="/listDisciplines" />
        )
    );
}

export default AddDiscipline;