var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var db = require('./app/config/db.config.js');

passport.use('register', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, username, password, done) {
        db.user.findOne({ where: { username: username } })
            .then(user => {
                if (user) {
                    return done(null, false, { message: 'Пользователь с данным логином существует' });
                } else {
                    bcrypt.hash(password, 10, (err, hash) => {
                        if (err) {
                            return done(err);
                        }
                        
                        db.user.create({
                            username: username,
                            password: hash
                        })
                        .then(newUser => {
                            return done(null, newUser);
                        })
                        .catch(err => {
                            return done(err);
                        });
                    });
                }
            })
            .catch(err => {
                return done(err);
            });
    }
));

passport.use('login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, username, password, done) {
        db.user.findOne({ where: { username: username } })
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'Неверно введенный логин и/или пароль' });
                }
                
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        return done(err);
                    }
                    
                    if (result) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Неверно введенный логин и/или пароль' });
                    }
                });
            })
            .catch(err => {
                return done(err);
            });
    }
));


passport.serializeUser((user, done) => {
    console.log('Serialize user:', user.id); // Для отладки
    done(null, user.id);
});


passport.deserializeUser((id, done) => {
    console.log('Deserialize user ID:', id); // Для отладки
    db.user.findByPk(id)
        .then(user => {
            if (!user) {
                console.log('User not found for ID:', id);
                return done(null, false);
            }
            console.log('Deserialize user found:', user.username);
            done(null, user);
        })
        .catch(err => {
            console.log('Deserialize error:', err);
            done(err, null);
        });
});

module.exports = passport;