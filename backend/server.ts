import express, { type Request, type Response } from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

interface DatabaseConfig {
	host: string;
	user: string;
	password: string;
	database: string;
	port: number;
}

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "NCParksDemo!",
	database: "ncparks",
	port: 3306,
} as DatabaseConfig);

app.get("/api/parks", (req: Request, res: Response) => {
	console.log("Getting parks");
	connection.query("SELECT * FROM parks", (err, results) => {
		if (err) throw err;
		res.json(results);
	});
});

app.listen(3000, () => {
	console.log("Server running on port 3000");
});
