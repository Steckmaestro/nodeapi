class EventRepo {
  constructor(dao) {
    this.dao = dao;
  }
  // Methods
  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        created TEXT,
        heroId INTEGER,
        CONSTRAINT hero_fk_id FOREIGN KEY (heroId)
          REFERENCES heroes(id) ON UPDATE CASCADE ON DELETE CASCADE)`;
    return this.dao.run(sql);
  }
  create(name, description, created, heroId) {
    return this.dao.run(
      `INSERT INTO events (name, description, created, heroId) VALUES (?, ?, ?, ?)`,
      [name, description, created, heroId]
    );
  }
}

module.exports = EventRepo;