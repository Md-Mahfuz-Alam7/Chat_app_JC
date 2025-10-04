const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes');
const connectDB = require('./config/db');
const { InitializeSocket } = require('./socket/socket');
dotenv.config();


const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'http://10.0.2.2:3000', 'http://192.168.1.*'],
    credentials: true
}));

app.use("/auth", authRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

// listen to socket event
InitializeSocket(server);

connectDB()
    .then(() => {
        console.log("Database connected successfully");
        server.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to start server due to database connection:", error);
    });
