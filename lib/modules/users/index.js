import { query } from '../datastore/index.js';

export default class Users {

  async getUsers() {
    return await query(`select 'email', 'uuid', 'last_updated' from users`);
  }

}
