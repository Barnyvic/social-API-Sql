import app from "./app";
const Port = 3333;

import sequelizeConnection from "./db";

// connecting to Mysql database

sequelizeConnection
  .authenticate()
  .then(() => {
    console.log("databese is connected.....");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(Port, () => {
  console.log(`Server running on http://localhost:${Port}`);
});
