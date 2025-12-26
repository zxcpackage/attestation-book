var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var flash = require('connect-flash');

var db = require('./app/config/db.config.js');

var corsOptions = {
    origin: ['http://localhost:4200', "http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174"],
    credentials: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOptions)); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'attestation_book_secret_key_2024',
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: db.sequelize,
        tableName: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 день
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    }
}));


app.use(flash());


var passport = require('./passport');
app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
    console.log('\n=== Request Debug ===');
    console.log('URL:', req.url);
    console.log('Method:', req.method);
    console.log('Session ID:', req.sessionID);
    console.log('Authenticated:', req.isAuthenticated());
    console.log('Cookies:', req.headers.cookie);
    if (req.user) {
        console.log('User:', req.user.id, req.user.username);
    }
    console.log('=====================\n');
    next();
});


app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});


db.sequelize.sync({force: false})
    .then(() => {
        console.log('Модели синхронизированы с базой данных');
    })
    .catch((error) => {
        console.error('Ошибка при синхронизации моделей:', error.message);
    });


require('./app/route/user')(app);
require('./app/route/studentGroup')(app);
require('./app/route/student')(app);
require('./app/route/discipline')(app);
require('./app/route/teacher')(app);
require('./app/route/reportType')(app);        
require('./app/route/attestationBook')(app);  


var authRoutes = require('./app/route/auth');
app.use('/api/auth', authRoutes);


var authMiddleware = require('./app/middleware/auth');


app.get('/api/protected', authMiddleware.isAuthenticated, (req, res) => {
    res.json({
        success: true,
        message: 'Это защищенный маршрут',
        user: req.user
    });
});



app.get('/test-all-models', async (req, res) => {
    try {
        const results = {};
        
        const models = [
            'attestation_book', 
            'discipline', 
            'report_type', 
            'student', 
            'student_group', 
            'student_group_session', 
            'teacher', 
            'teacher_discipline', 
            'user'
        ];
        
        for (const modelName of models) {
            try {
                if (db[modelName]) {
                    const count = await db[modelName].count();
                    results[modelName] = { success: true, count: count };
                } else {
                    results[modelName] = { success: false, error: 'Модель не найдена' };
                }
            } catch (error) {
                results[modelName] = { success: false, error: error.message };
            }
        }
        
        res.json({
            success: true,
            message: 'Проверка моделей Sequelize',
            results: results
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.get('/', (req, res) => {
    res.json({
        message: 'API для проекта "Зачётная книжка"',
        version: '1.0.0',
        author: 'Соколов Владислав Олегович',
        endpoints: {
            login: 'POST /api/auth/login - Вход в систему',
            register: 'POST /api/auth/register - Регистрация',
            logout: 'GET /api/auth/logout - Выход',
            currentUser: 'GET /api/auth/current - Текущий пользователь',
            protected: 'GET /api/protected - Защищенный маршрут',
            
            users: '/api/users - Все пользователи',
            addUser: '/api/addUser - Добавить пользователя (POST)',
            userById: '/api/user/:id - Пользователь по ID',
            
            groups: '/api/listStudentGroups - Все группы',
            addGroup: '/api/addStudentGroup - Добавить группу (POST)',
            groupById: '/api/studentGroup/:id - Группа по ID',
            
            students: '/api/listStudents - Все студенты',
            studentsSQL: '/api/listStudentsSQL - Все студенты (SQL)',
            addStudent: '/api/addStudent - Добавить студента (POST)',
            studentById: '/api/student/:id - Студент по ID',
            
            disciplines: '/api/listDisciplines - Все дисциплины',
            addDiscipline: '/api/addDiscipline - Добавить дисциплину (POST)',
            disciplineById: '/api/discipline/:id - Дисциплина по ID',
            
            teachers: '/api/listTeachers - Все преподаватели',
            addTeacher: '/api/addTeacher - Добавить преподавателя (POST)',
            teacherById: '/api/teacher/:id - Преподаватель по ID',
            teacherDisciplines: '/api/listTeacherDiscipline - Дисциплины преподавателей',
            
            testModels: '/test-all-models - Проверка всех моделей'
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('\n Сервер запущен');
    console.log(` Доступен по адресу: http://localhost:${PORT}`);
    console.log('\n Основные маршруты API:');
    console.log('    GET  /                    - Документация API');
    console.log('    POST /api/auth/login      - Вход в систему');
    console.log('    POST /api/auth/register   - Регистрация');
    console.log('    GET  /api/auth/logout     - Выход');
    console.log('    GET  /api/protected       - Защищенный маршрут (требуется вход)');
    console.log('    GET  /api/listStudents    - Все студенты');
    console.log('\n React фронтенд будет доступен по: http://localhost:5173/');
    console.log('\n .');
});