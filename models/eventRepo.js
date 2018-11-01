class EventRepo {
  constructor(dao) {
    this.dao = dao;
  }
  // Methods
  async createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        created DATE,
        love INTEGER DEFAULT 0,
        heroId INTEGER,
        CONSTRAINT hero_fk_id FOREIGN KEY (heroId)
          REFERENCES heroes(id) ON UPDATE CASCADE ON DELETE CASCADE)`;
    return await this.dao.run(sql);
  }
  async create(name, created, love, heroId) {
    return this.dao.run(
      `INSERT INTO events (name, created, love, heroId) VALUES (?, ?, ?, ?)`,
      [name, created, love, heroId]
    );
  }
  async update(event) {
    const { id, name, created, heroId } = event;
    return await this.dao.run(
      `
      UPDATE events 
      SET name = ?,
      created = ?,
      love = ?,
      heroId = ?
      WHERE id = ?
    `,
      [name, created, love, heroId, id]
    );
  }
  async delete(id) {
    return await this.dao.run(`DELETE FROM events WHERE id = ?`, [id]);
  }
  async getById(id) {
    return await this.dao.get(`SELECT * FROM events WHERE id = ?`, [id]);
  }
  async getAll() {
    return await this.dao.all(`SELECT * FROM events`);
  }
  async sendLove(id) {
    return await this.dao.run(
      `UPDATE events SET love = love + 1 WHERE id = ?`,
      [id]
    );
  }
}

module.exports = EventRepo;
