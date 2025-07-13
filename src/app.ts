import express, { Application, NextFunction, Request, Response } from "express";

import cors from "cors"
import { bookRoutes } from "./app/controllers/book-controller";
import { borrowRoutes } from "./app/controllers/borrow-controller";

const app: Application = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173"
      // "https://b5-a4-frontend-sazid.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: false,
  })
);

// routes
app.use("/api/books", bookRoutes);

app.use("/api/borrow", borrowRoutes);

// common route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome To Library Application");
});

// not found route error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found !",
    error: {}
  });
});

// all other error handler except validation error and route error

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    console.log("Error:", error);
    res.status(400).json({
      success: false,
      message: "Something went Wrong!",
      error,
    });
  }
});

export default app;
