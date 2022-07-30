const{Client} = require('pg');

const client = new Client({
  host: "44.202.81.48",
  user: "postgres",
  password: "22683055",
  port: 5432,
  database: 'qa'
})
// const client = new Client({
//   host: "localhost",
//   user: "shengnanhuang",
//   password: "22683055",
//   port: 5432,
//   database: 'qa'
// })
client.connect();

module.exports = client;
// client.query(`select * from questions limit 3`, (err, res) => {
//   if(err) {
//     console.log(err.message)
//   } else {
//     console.log(res.rows);
//   }
//   client.end;
// })