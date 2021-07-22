const mariadb = require('mariadb'); 
const dotenv = require('dotenv');
dotenv.config();

const pool = mariadb.createPool({
    database:process.env.NODE_ENV === 'production'? process.env.DBNAME:process.env.DBNAME_LOCAL,
    host:process.env.NODE_ENV === 'production'? process.env.HOST:process.env.HOST_LOCAL,
    user:process.env.NODE_ENV === 'production'? process.env.USER:process.env.USER_LOCAL,
    password:process.env.NODE_ENV === 'production'? process.env.PASSWORD:process.env.PASSWORD_LOCAL, 
    port:process.env.NODE_ENV === 'production'? process.env.PORT:process.env.PORT_LOCAL, 
}); 
module.exports =  pool; 