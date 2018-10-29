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
        description TEXT,
        created TEXT,
        heroId INTEGER,
        CONSTRAINT hero_fk_id FOREIGN KEY (heroId)
          REFERENCES heroes(id) ON UPDATE CASCADE ON DELETE CASCADE)`;
    return await this.dao.run(sql);
  }
  async create(name, description, created, heroId) {
    return this.dao.run(
      `INSERT INTO events (name, description, created, heroId) VALUES (?, ?, ?, ?)`,
      [name, description, created, heroId]
    );
  }
  async update(event) {
    const { id, name, description, created, heroId } = event;
    return await this.dao.run(
      `
      UPDATE events 
      SET name = ?,
      description = ?,
      created = ?
      heroId = ?
      WHERE id = ?
    `,
      [name, description, created, heroId, id]
    );
  }
  async delete(id) {
    return await this.dao.run(`DELETE FROM events WHERE id = ?`, [id]);
  }
  async getById(id) {
    return await this.dao.get(`SELECT * FROM events WHERE id = ?`, [id]);
  }
  async getAll() {
    return await this.dao.all(`SELECT * FROM events`)
  }
}

module.exports = EventRepo;
