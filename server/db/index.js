const{Client} = require('pg');

const client = new Client({
  host: "localhost",
  user: "shengnanhuang",
  port: 5432,
  database: 'qa'
})

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