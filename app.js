import app from "./server.js";
const PORT = 8081;

app.listen(PORT, () => {
    console.log("App Start Port is " + PORT)
})