import "dotenv/config";

export const ENV = {
    PORT: process.env.PORT,
    // Using the create connection on the database
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV:process.env.NODE_ENV,

}