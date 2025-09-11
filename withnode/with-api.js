import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());


export const runServer = (getResponse) => {
    app.post("/chat", async (req, res) => {
    const userInput = req.body.input;
    try {
        const response = await getResponse(userInput);
        res.json({ response: response });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    });

    app.listen(3000, () => console.log("Server running on http://localhost:3000"));    
}

