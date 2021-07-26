const mariadb = require('mariadb'); 
const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, '../','.env') });



const pool = mariadb.createPool({
    database:process.env.NODE_ENV === 'production'? process.env.DBNAME:process.env.DBNAME_LOCAL,
    host:process.env.NODE_ENV === 'production'? process.env.HOST:process.env.HOST_LOCAL,
    user:process.env.NODE_ENV === 'production'? process.env.AUSER:process.env.USER_LOCAL,
    password:process.env.NODE_ENV === 'production'? process.env.PASSWORD:process.env.PASSWORD_LOCAL, 
    port:process.env.NODE_ENV === 'production'? process.env.PORT:process.env.PORT_LOCAL, 
}); 
module.exports =  pool; 