class HeroRepo {
  constructor(dao) {
    this.dao = dao;
  }

  // Methods
  async createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS heroes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      pin INTEGER NOT NULL)`;
    return await this.dao.run(sql);
  }
  async create(name, pin) {
    return this.dao.run(`INSERT INTO heroes (name, pin) VALUES (?, ?)`, [
      name,
      pin
    ]);
  }
  async update(hero) {
    const { id, name, pin } = hero;
    return await this.dao.run(`UPDATE heroes SET name = ?, PIN = ? WHERE id = ?`, [
      name,
      pin,
      id
    ]);
  }
  async delete(id) {
    return await this.dao.run(`DELETE FROM heroes WHERE id = ?`, [id]);
  }
  async getById(id) {
    return await this.dao.get(`SELECT * FROM heroes WHERE id = ?`, [id]);
  }
  async getAll() {
    return await this.dao.all(`SELECT * FROM events`);
  }
  async getEvents(id) {
    return await this.dao.all(`SELECT * FROM events WHERE heroId = ?`, [id]);
  }
}

module.exports = HeroRepo;
