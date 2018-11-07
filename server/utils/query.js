// 首先连接mysql数据库
// 分装query方法 方便我们
import mysql from 'mysql';
import { db, dbName } from '../config';
import fs from 'fs';
import path from 'path';
let pool
// import { endianness } from 'os';
// const sqlContent = fs.readFileSync(path)
const sqlContent = fs.readFileSync(path.resolve(__dirname, '..', './sql/sjy_blog.sql'), 'utf8');
// 第一次连接数据库的时候，没有指定数据库名称，这次连接的目的是为了创建一个sjy_blog的数据库
// 数据库文件执行，执行完毕之后sjy-blog数据库就有对应的表和数据了
const init = mysql.createConnection(db)
init.connect();

init.query('CREATE DATABASE sjy_blog', err => {
    Object.assign(db, dbName)
    // 第二次连接数据库，这时候sjy_blog已经创建成功，这时候，直接连接sjy_blog数据库
    // 然后执行sql文件夹下的sjy_blog文件，对应的表和测试数据就已经数据库里面了
    pool = mysql.createPool(db);
    if (err) {
        console.log('失败了')
    } else {
        // 将sjy_blog文件执行
        query(sqlContent).then(res => {
            console.log('success')
        }).catch(err=>{
            console.log(err)
        })
    }
})
init.end()
// 需要创建一个数据库，并且能够将sql文件夹下的sql语句执行
export default function query(sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, values, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                    connection.release()
                })
            }
        })
    })
}