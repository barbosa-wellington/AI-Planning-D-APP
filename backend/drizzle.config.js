import { ENV } from "./src/config/env.js";

//  Setting the configuration file for the communication database
export default {
    schema: "./src/db/schema.js",
    out: "./src/db/migrations", // The migrations will contained the translated code of a database table.
    dialect: "postgresql",
    dbCredentials: { url: ENV.DATABASE_URL},
};
