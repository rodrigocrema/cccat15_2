import pgPromise, { IMain } from 'pg-promise';
import { AccountDAODatabase } from "./AccountDAO";

export default class GetAccount {
  private readonly accountDAO: AccountDAODatabase;

  constructor(private readonly pgp: IMain<{}, any>) {
    this.accountDAO = AccountDAODatabase.getInstance(this.pgp);
  }

  async execute(accountId: string) {
    return this.accountDAO.getById(accountId);
  }
}