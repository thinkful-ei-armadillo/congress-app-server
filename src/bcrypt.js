const bcrypt = require('bcryptjs');
/* 'password' 'bo-password' 'charlie-password' 'sam-password' 'lex-password' 'ping-password' */
bcrypt.hash('bo-password', 12).then(hash => console.log({ hash }));
bcrypt.hash('charlie-password', 12).then(hash => console.log({ hash }));
bcrypt.hash('sam-password', 12).then(hash => console.log({ hash }));
bcrypt.hash('lex-password', 12).then(hash => console.log({ hash }));
bcrypt.hash('ping-password', 12).then(hash => console.log({ hash }));
