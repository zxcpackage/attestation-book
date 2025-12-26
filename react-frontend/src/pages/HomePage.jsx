import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import api from "../services/api";

function HomePage() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        disciplines: 0,
        students: 0,
        teachers: 0,
        grades: 0
    });
    const [recentGrades, setRecentGrades] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            loadData();
        }
    }, [user]);

    const loadData = async () => {
        try {
            const [disciplinesRes, studentsRes, teachersRes, gradesRes] = await Promise.all([
                api.get("/listDisciplines"),
                api.get("/listStudents"),
                api.get("/listTeachers"),
                api.get("/listAttestationBooks")
            ]);

            setStats({
                disciplines: disciplinesRes.data.length,
                students: studentsRes.data.length,
                teachers: teachersRes.data.length,
                grades: gradesRes.data.length
            });

            // Последние 5 оценок
            setRecentGrades(gradesRes.data.slice(0, 5));
        } catch (err) {
            console.error('Error loading data:', err);
        } finally {
            setLoading(false);
        }
    };

    const getGradeColor = (grade) => {
        grade = grade.toString().toLowerCase();
        if (grade === '5' || grade === 'отл' || grade === 'зачёт' || grade === 'з') return '#28a745';
        if (grade === '4' || grade === 'хор') return '#20c997';
        if (grade === '3' || grade === 'удовл') return '#ffc107';
        if (grade === '2' || grade === 'неуд' || grade === 'незачёт' || grade === 'н') return '#dc3545';
        return '#6c757d';
    };

    if (loading && user) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid mt-4">
            {/* Заголовок в стиле зачётной книжки */}
            <div className="card border-primary mb-4 shadow">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <h2 className="mb-0">
                        📖 ЗАЧЁТНАЯ КНИЖКА
                        <small className="ms-2" style={{ fontSize: '0.6em', opacity: 0.8 }}>
                            Система управления учебным процессом
                        </small>
                    </h2>
                    <div className="badge bg-light text-dark fs-6">
                    </div>
                </div>
                <div className="card-body" style={{ background: 'linear-gradient(to right, #f8f9fa, #e9ecef)' }}>
                    <div className="row">
                        <div className="col-md-8">
                            <h4 className="text-primary">
                                {user ? `Добро пожаловать, ${user.username}!` : 'Добро пожаловать!'}
                            </h4>
                            <p className="lead mb-0">
                                {user 
                                    ? 'Управляйте учебным процессом, студентами и оценками'
                                    : 'Для доступа к системе требуется авторизация'}
                            </p>
                        </div>
                        <div className="col-md-4 text-end">
                            <div className="fs-1">🎓</div>
                        </div>
                    </div>
                </div>
            </div>

            {user ? (
                <>
                    {/* Статистика */}
                    <div className="row mb-4">
                        <div className="col-md-3 col-sm-6 mb-3">
                            <div className="card text-center border-success shadow-sm h-100">
                                <div className="card-body">
                                    <h1 className="display-4 text-success">{stats.disciplines}</h1>
                                    <h5 className="card-title">Дисциплины</h5>
                                    <Link to="/listDisciplines" className="btn btn-outline-success btn-sm">
                                        Перейти →
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 mb-3">
                            <div className="card text-center border-info shadow-sm h-100">
                                <div className="card-body">
                                    <h1 className="display-4 text-info">{stats.students}</h1>
                                    <h5 className="card-title">Студенты</h5>
                                    <Link to="/listStudents" className="btn btn-outline-info btn-sm">
                                        Перейти →
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 mb-3">
                            <div className="card text-center border-warning shadow-sm h-100">
                                <div className="card-body">
                                    <h1 className="display-4 text-warning">{stats.teachers}</h1>
                                    <h5 className="card-title">Преподаватели</h5>
                                    <Link to="/listTeachers" className="btn btn-outline-warning btn-sm">
                                        Перейти →
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 mb-3">
                            <div className="card text-center border-danger shadow-sm h-100">
                                <div className="card-body">
                                    <h1 className="display-4 text-danger">{stats.grades}</h1>
                                    <h5 className="card-title">Оценки</h5>
                                    <Link to="/listAttestationBooks" className="btn btn-outline-danger btn-sm">
                                        Перейти →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Последние оценки */}
                    <div className="row">
                        <div className="col-lg-8 mb-4">
                            <div className="card shadow">
                                <div className="card-header bg-dark text-white">
                                    <h5 className="mb-0">📝 Последние оценки</h5>
                                </div>
                                <div className="card-body">
                                    {recentGrades.length > 0 ? (
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th>Студент</th>
                                                        <th>Дисциплина</th>
                                                        <th>Тип</th>
                                                        <th>Оценка</th>
                                                        <th>Дата</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {recentGrades.map(grade => (
                                                        <tr key={grade.id}>
                                                            <td>
                                                                <strong>{grade.student?.full_name}</strong>
                                                            </td>
                                                            <td>{grade.discipline?.name}</td>
                                                            <td>
                                                                <span className="badge bg-secondary">
                                                                    {grade.report_type?.name}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span 
                                                                    className="badge" 
                                                                    style={{ 
                                                                        backgroundColor: getGradeColor(grade.grade),
                                                                        fontSize: '1em',
                                                                        padding: '5px 10px'
                                                                    }}
                                                                >
                                                                    {grade.grade}
                                                                </span>
                                                            </td>
                                                            <td>{new Date(grade.date).toLocaleDateString('ru-RU')}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="text-center py-4">
                                            <div className="fs-1 mb-3">📭</div>
                                            <h5>Оценки ещё не выставлены</h5>
                                            <Link to="/addAttestationBook" className="btn btn-primary mt-2">
                                                Выставить первую оценку
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Быстрые действия */}
                        <div className="col-lg-4 mb-4">
                            <div className="card shadow">
                                <div className="card-header bg-primary text-white">
                                    <h5 className="mb-0">⚡ Быстрые действия</h5>
                                </div>
                                <div className="card-body">
                                    <div className="d-grid gap-3">
                                        <Link to="/addDiscipline" className="btn btn-success btn-lg">
                                            📚 Добавить дисциплину
                                        </Link>
                                        <Link to="/addStudent" className="btn btn-info btn-lg">
                                            👨‍🎓 Добавить студента
                                        </Link>
                                        <Link to="/addTeacher" className="btn btn-warning btn-lg">
                                            👨‍🏫 Добавить преподавателя
                                        </Link>
                                        <Link to="/addAttestationBook" className="btn btn-danger btn-lg">
                                            📖 Выставить оценку
                                        </Link>
                                        <Link to="/profile" className="btn btn-outline-dark btn-lg">
                                            👤 Мой профиль
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Информация о проекте */}
                            <div className="card shadow mt-4">
                                <div className="card-body">
                                    <h5 className="card-title">ℹ️ О проекте</h5>
                                    <ul className="list-unstyled">
                                        <li className="mb-2">
                                            <strong>Версия:</strong> 666😈
                                        </li>
                                        <li className="mb-2">
                                            <strong>Разработчик:</strong> Соколов В.О. 😎
                                        </li>
                                        <li className="mb-2">
                                            <strong>База данных:</strong> MySQL
                                        </li>
                                        <li className="mb-2">
                                            <strong>Backend:</strong> Node.js + Express
                                        </li>
                                        <li>
                                            <strong>Frontend:</strong> React
                                        </li>
                                    </ul>
                                    <div className="mt-3 text-center">
                                        <div className="fs-4">🎓 🏫 📝 ✅</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                /* Страница для неавторизованных */
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-lg border-0">
                            <div className="card-body text-center p-5">
                                <div className="display-1 mb-4">🔒</div>
                                <h2 className="card-title mb-4">Доступ к системе</h2>
                                <p className="card-text lead mb-4">
                                    Для работы с системой "Зачётная книжка" необходимо авторизоваться.
                                    Система позволяет управлять студентами, дисциплинами, преподавателями и оценками.
                                </p>
                                
                                <div className="row mt-5">
                                    <div className="col-md-6 mb-3">
                                        <div className="card h-100 border-primary">
                                            <div className="card-body">
                                                <h5 className="card-title">👥 Уже есть аккаунт?</h5>
                                                <p className="card-text">Войдите в систему для доступа ко всем функциям</p>
                                                <Link to="/login" className="btn btn-primary w-100">
                                                    🔐 Войти в систему
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="card h-100 border-success">
                                            <div className="card-body">
                                                <h5 className="card-title">📝 Новый пользователь?</h5>
                                                <p className="card-text">Зарегистрируйтесь для получения доступа</p>
                                                <Link to="/register" className="btn btn-success w-100">
                                                    ✍️ Зарегистрироваться
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <h5>Возможности системы:</h5>
                                    <div className="row mt-3">
                                        <div className="col-md-3 mb-2">
                                            <span className="badge bg-primary p-2">📚 Дисциплины</span>
                                        </div>
                                        <div className="col-md-3 mb-2">
                                            <span className="badge bg-info p-2">👨‍🎓 Студенты</span>
                                        </div>
                                        <div className="col-md-3 mb-2">
                                            <span className="badge bg-warning p-2">👨‍🏫 Преподаватели</span>
                                        </div>
                                        <div className="col-md-3 mb-2">
                                            <span className="badge bg-danger p-2">📖 Оценки</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomePage;