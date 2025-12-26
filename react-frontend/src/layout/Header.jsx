import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const navLinkStyle = {
        color: 'white',
        textDecoration: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        marginRight: '5px',
        display: 'inline-block',
        fontSize: '14px'
    };

    const navLinkHover = (e) => {
        e.target.style.backgroundColor = '#555';
        e.target.style.transform = 'translateY(-2px)';
    };

    const navLinkOut = (e) => {
        e.target.style.backgroundColor = 'transparent';
        e.target.style.transform = 'translateY(0)';
    };

    return (
        <nav style={{
            backgroundColor: '#2c3e50',
            padding: '15px 20px',
            marginBottom: '20px',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '5px' }}>
                <Link 
                    to={`/`} 
                    style={{
                        ...navLinkStyle,
                        backgroundColor: '#3498db',
                        fontWeight: 'bold'
                    }}
                    onMouseOver={navLinkHover}
                    onMouseOut={navLinkOut}
                >
                    🏠 Главная
                </Link>
                
                <span style={{ color: '#7f8c8d', margin: '0 5px' }}>|</span>
                
                <Link 
                    to={`/listDisciplines`}
                    style={navLinkStyle}
                    onMouseOver={navLinkHover}
                    onMouseOut={navLinkOut}
                >
                    📚 Дисциплины
                </Link>
                
                <Link 
                    to={`/listTeachers`}
                    style={navLinkStyle}
                    onMouseOver={navLinkHover}
                    onMouseOut={navLinkOut}
                >
                    👨‍🏫 Преподаватели
                </Link>
                
                <Link 
                    to={`/teacherDisciplines`}
                    style={navLinkStyle}
                    onMouseOver={navLinkHover}
                    onMouseOut={navLinkOut}
                >
                    📝 Дисциплины преподав.
                </Link>
                
                <Link 
                    to={`/listStudents`}
                    style={navLinkStyle}
                    onMouseOver={navLinkHover}
                    onMouseOut={navLinkOut}
                >
                    👨‍🎓 Студенты
                </Link>
                
                <Link 
                    to={`/listAttestationBooks`}
                    style={navLinkStyle}
                    onMouseOver={navLinkHover}
                    onMouseOut={navLinkOut}
                >
                    📖 Зачётная книжка
                </Link>
                
                <Link 
                    to={`/listReportTypes`}
                    style={navLinkStyle}
                    onMouseOver={navLinkHover}
                    onMouseOut={navLinkOut}
                >
                    📋 Типы отчётности
                </Link>
                
                {user && (
                    <>
                        <span style={{ color: '#7f8c8d', margin: '0 5px' }}>|</span>
                        <Link 
                            to={`/addDiscipline`}
                            style={{
                                ...navLinkStyle,
                                backgroundColor: '#27ae60'
                            }}
                            onMouseOver={navLinkHover}
                            onMouseOut={navLinkOut}
                        >
                            + Добавить
                        </Link>
                    </>
                )}
            </div>
            
            <div>
                {user ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ 
                            color: '#ecf0f1', 
                            fontSize: '14px',
                            padding: '6px 12px',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <span style={{ fontSize: '16px' }}>👤</span>
                            <span>{user.username}</span>
                        </div>
                        
                        <button 
                            onClick={handleLogout}
                            style={{
                                padding: '6px 15px',
                                backgroundColor: '#e74c3c',
                                color: 'white',
                                border: 'none',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                transition: 'all 0.3s'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}
                        >
                            Выйти
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Link 
                            to={`/login`} 
                            style={{
                                color: 'white',
                                textDecoration: 'none',
                                padding: '8px 16px',
                                borderRadius: '20px',
                                backgroundColor: '#3498db',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                transition: 'all 0.3s'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
                        >
                            🔐 Войти
                        </Link>
                        <Link 
                            to={`/register`} 
                            style={{
                                color: 'white',
                                textDecoration: 'none',
                                padding: '8px 16px',
                                borderRadius: '20px',
                                backgroundColor: '#2ecc71',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                transition: 'all 0.3s'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#27ae60'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#2ecc71'}
                        >
                            📝 Регистрация
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Header;