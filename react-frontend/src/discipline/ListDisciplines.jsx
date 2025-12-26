import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Discipline from './Discipline';
import api from "../services/api"; 

function ListDisciplines() {
    const [disciplines, setDisciplines] = useState([]);

    useEffect(() => {
        api 
            .get("/listDisciplines")
            .then(response => {
                setDisciplines(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    const list = disciplines.map((item) => (
        <Link 
            to={`/discipline/${item.id}`} 
            key={item.id} 
            style={{
                textDecoration: 'none', 
                color: 'inherit',
                display: 'block',
                marginBottom: '10px'
            }}
        >
            <Discipline id={item.id} content={item.name}>
                <small>ID: {item.id}</small>
            </Discipline>
        </Link>
    ));

    return (
        <div>
            <h2>Список дисциплин</h2>
            {list.length ? list : "Подождите, идёт загрузка данных..."}
        </div>
    );
}

export default ListDisciplines;