import cron from "cron";
import https from "https";

// Sending a request every 14min to keep the API running.
// the console.log message is printing on the render log
const job =  new cron.CronJob("*/14 * * * *", function (){
    https
    .get(process.env.API_URL, (res) => {
        if (res.statusCode == 200) console.log("GET request sent successfully");
        else console.log("GET request failed", res.statusCode);
    })
    .on("Error", (e) => console.error("Error while sending request", e));
});

export default job;