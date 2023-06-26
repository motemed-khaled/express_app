import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.DB_URI).then(conn => {
        console.log(`database connection : ${conn.connection.host}`);
    }).catch(err => {
        console.log(err)
    })
}