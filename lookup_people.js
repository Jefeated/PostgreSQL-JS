const pg = require("pg");
const settings = require("./settings"); // settings.json
const input = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE last_name = '" + input + "'", null, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    result.rows.forEach((row) => {
      console.log("Searching...");
      console.log("Found "+ row.id +" person(s) by the name : " +row.first_name+' '+row.last_name+', born '+row.birthdate);
    });
    client.end();
  })
});
