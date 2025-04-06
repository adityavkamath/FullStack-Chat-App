import express from "express";
import authRoutes from "./routes/auth.route.js";
import { app, server } from "./lib/socket.js";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";

const port = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
  });
}

server.listen(port, () => {
  console.log("Server is running on http://localhost:5001");
  connectDB();
});
