import express from "express";
import cors from "cors";
import * as dotenv from "dotenv"

import connectDB from './mongodb/connect.js'
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

dotenv.config();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors());

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes)

app.get("/", async (req, res) => {
    res.status(200).json({
        message: 'Hello From Dall-E 2.0!'
    })
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(8080, () => console.log("Server has started running on port 8080!"))
    } catch (error) {
        console.log(error)
    }
}

startServer();
