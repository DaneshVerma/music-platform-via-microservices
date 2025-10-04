import app from "./src/app.js";
import { connect } from "./src/broker/rabbit.js";
import startConsuming from "./src/broker/listner.js";

connect().then(()=>{
  startConsuming();
})
app.listen(3001, () => {
  console.log("notification is running on port 3001");
});
