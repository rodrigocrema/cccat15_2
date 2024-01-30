import { IMain, IDatabase } from 'pg-promise';

export default interface AccountDAO {
  save(account: any): Promise<void>;
  getByEmail(email: string): Promise<any>;
  getById(accountId: string): Promise<any>;
}

export class AccountDAODatabase implements AccountDAO {
  private static instance: AccountDAODatabase;
  private db: IDatabase<any>;

  private constructor(pgp: IMain) {
    this.db = pgp("postgres://postgres:123456@db:5432/cccat15");
  }

  public static getInstance(pgp: IMain): AccountDAODatabase {
    if (!AccountDAODatabase.instance) {
      AccountDAODatabase.instance = new AccountDAODatabase(pgp);
    }
    return AccountDAODatabase.instance;
  }
    
  async save(account: any): Promise<void> {
    await this.db.none("insert into cccat15.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)", [
      account.accountId,
      account.name,
      account.email,
      account.cpf,
      account.carPlate,
      !!account.isPassenger,
      !!account.isDriver
    ]);
  }
    
  async getByEmail(email: string): Promise<any> {
    return await this.db.oneOrNone("select * from cccat15.account where email = $1", [email]);
  }
    
  async getById(accountId: string): Promise<any> {
    return await this.db.oneOrNone("select * from cccat15.account where account_id = $1", [accountId]);
  }
}

// Adaptador de memória para testes
export class AccountDAOMemory implements AccountDAO {
  private accounts: any[] = [];

  async save(account: any): Promise<void> {
    this.accounts.push(account);
  }
    
  async getByEmail(email: string): Promise<any> {
    return this.accounts.find((account: any) => account.email === email);
  }
    
  async getById(accountId: string): Promise<any> {
    return this.accounts.find((account: any) => account.accountId === accountId);
  }
}
