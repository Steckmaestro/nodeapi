class HeroRepo {
  constructor(dao) {
    this.dao = dao;
  }

  // Methods
  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS heroes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      pin INTEGER NOT NULL)`;
    return this.dao.run(sql);
  }
  create(name, pin) {
    return this.dao.run(`INSERT INTO heroes (name, pin) VALUES (?, ?)`, [
      name,
      pin
    ]);
  }
  update(hero) {
    const { id, name, pin } = hero;
    return this.dao.run(`UPDATE heroes SET name = ?, PIN = ? WHERE id = ?`, [
      name,
      pin,
      id
    ]);
  }
  delete(id) {
    return this.dao.run(`DELETE FROM heroes WHERE id = ?`, [id]);
  }
  getById(id) {
    return this.dao.get(`SELECT * FROM heroes WHERE id = ?`, [id]);
  }
  getAll() {
    return this.dao.all(`SELECT * FROM events`);
  }
}

module.exports = HeroRepo;
