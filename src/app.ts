import express, { Request, Response } from "express";
import Signup from "./Signup";
import { AccountDAODatabase } from "./AccountDAO";
import GetAccount from "./GetAccount";
import { IMain } from 'pg-promise';
import pgPromise from 'pg-promise';

const app = express();
app.use(express.json());

const pgp: IMain = pgPromise();
const accountDAO = AccountDAODatabase.getInstance(pgp);

app.post("/signup", async function (req: Request, res: Response) {
    const signup = new Signup(accountDAO,pgp);
    const output = await signup.execute(req.body);
    res.json(output);
});

app.get("/accounts/:accountId", async function (req: Request, res: Response) {
    const getAccount = new GetAccount(pgp);
    const output = await getAccount.execute(req.params.accountId);
    res.json(output);
});

app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000");
});
