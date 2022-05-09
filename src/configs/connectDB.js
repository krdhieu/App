import mysql2 from 'mysql2/promise';

const connectDB = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    database: 'qlsk',
});

export default connectDB;
