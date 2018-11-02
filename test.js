var dblite = require('dblite'),
    db = dblite('./db.sqlite');
 
// will call the implicit `info` console.log
db.query('.show');

db.query('CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, value TEXT)');
db.query('INSERT INTO test VALUES(null, ?)', ['some text']);
db.query('SELECT * FROM test');