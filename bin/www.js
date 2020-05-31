import app from "../index";
import syncDb from "../bin/sync-db";

const port = 3000;

// sequelize sync function은 promise를 return
syncDb().then((_) => {
  console.log("Sync DB!");
  app.listen(port, () => {
    console.log(`Server is running on port ${port} !!`);
  });
});
