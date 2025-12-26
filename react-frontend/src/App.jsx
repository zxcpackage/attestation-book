import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './layout/Header';
import HomePage from './pages/HomePage';
import 'bootswatch/dist/flatly/bootstrap.min.css';
import './index.css';

// Аутентификация
import Login from './auth/Login';
import Register from './auth/Register';
import Profile from './auth/Profile';

// Дисциплины
import ListDisciplines from './discipline/ListDisciplines';
import AddDiscipline from './discipline/AddDiscipline';
import DisciplineData from './discipline/DisciplineData';

// Преподаватели
import ListTeachers from './teacher/ListTeachers';
import AddTeacher from './teacher/AddTeacher';

// Студенты
import ListStudents from './student/ListStudents';

// Дисциплины преподавателей
import ListTeacherDisciplines from './teacherDiscipline/ListTeacherDisciplines';

// Зачётная книжка
import ListAttestationBooks from './attestationBook/ListAttestationBooks';
import AddAttestationBook from './attestationBook/AddAttestationBook';

// Типы отчётности
import ListReportTypes from './reportType/ListReportTypes';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <BrowserRouter>
            <div className="glass-effect">
                <Header />
                <div style={{ marginTop: '20px' }}>
                    <Routes>
                        {/* Главная страница - новая зачётная книжка */}
                        <Route path='/' element={<HomePage />} />
                        
                        {/* Аутентификация */}
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        
                        {/* Дисциплины */}
                        <Route path='/listDisciplines' element={<ListDisciplines />} />
                        <Route path='/addDiscipline' element={
                            <ProtectedRoute><AddDiscipline /></ProtectedRoute>
                        } />
                        <Route path='/discipline/:id' element={
                            <ProtectedRoute><DisciplineData /></ProtectedRoute>
                        } />
                        
                        {/* Преподаватели */}
                        <Route path='/listTeachers' element={<ListTeachers />} />
                        <Route path='/addTeacher' element={
                            <ProtectedRoute><AddTeacher /></ProtectedRoute>
                        } />
                        
                        {/* Студенты */}
                        <Route path='/listStudents' element={<ListStudents />} />
                        
                        {/* Дисциплины преподавателей */}
                        <Route path='/teacherDisciplines' element={<ListTeacherDisciplines />} />
                        
                        {/* Зачётная книжка */}
                        <Route path='/listAttestationBooks' element={<ListAttestationBooks />} />
                        <Route path='/addAttestationBook' element={
                            <ProtectedRoute><AddAttestationBook /></ProtectedRoute>
                        } />
                        
                        {/* Типы отчётности */}
                        <Route path='/listReportTypes' element={<ListReportTypes />} />
                        
                        {/* Профиль */}
                        <Route path='/profile' element={
                            <ProtectedRoute><Profile /></ProtectedRoute>
                        } />
                        
                        {/* 404 */}
                        <Route path='*' element={
                            <div className="text-center py-5">
                                <h2>404 - Страница не найдена</h2>
                                <a href="/" className="btn btn-primary mt-3">
                                    Вернуться на главную
                                </a>
                            </div>
                        } />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;