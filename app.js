import app from "./js/testserver.js";
const PORT = 8081;

app.listen(PORT, () => {
    console.log("App Start Port is " + PORT)
})