import crypto from 'crypto';
import { AccountDAODatabase } from "./AccountDAO";
import MailerGateway from './MailerGateway';
import { IMain } from 'pg-promise';
import { validateCpf } from './validateCpf';

export default class Signup {

    
    constructor(readonly AccountDAODatabase: AccountDAODatabase, private pgp: IMain<{}, any>) { }

    async execute(input: any) {
        input.accountId = crypto.randomUUID();
        const existingAccount = await this.AccountDAODatabase.getByEmail(input.email);
        if (existingAccount) throw new Error('Account already exists');
        if (!input.name.match(/[a-zA-Z]+\s[a-zA-Z]+/)) throw new Error('Invalid name');
        if (!input.email.match(/^(.+)@(.+)$/)) throw new Error('Invalid email');
        if (!validateCpf(input.cpf)) throw new Error('Invalid cpf');
        if (input.isDriver && !input.carPlate.match(/[A-Z]{3}[0-9]{4}/)) throw new Error('Invalid car plate');
        await this.AccountDAODatabase.save(input);
        const mailerGateway = new MailerGateway();
        mailerGateway.send('Welcome', input.email, 'Use this link to confirm your account');
        return {
            accountId: input.accountId,
        };
    }
}
