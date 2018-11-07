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
      avatar TEXT NOT NULL,
      pin INTEGER NOT NULL)`;
    return await this.dao.run(sql);
  }
  async create(name, avatar, pin) {
    return this.dao.run(
      `INSERT INTO heroes (name, avatar, pin) VALUES (?, ?, ?)`,
      [name, avatar, pin]
    );
  }
  async update(hero) {
    const { id, name, pin } = hero;
    return await this.dao.run(
      `UPDATE heroes SET name = ?, PIN = ? WHERE id = ?`,
      [name, pin, id]
    );
  }
  async delete(id) {
    return await this.dao.run(`DELETE FROM heroes WHERE id = ?`, [id]);
  }
  async getById(id) {
    return await this.dao.get(`SELECT * FROM heroes WHERE id = ?`, [id]);
  }
  async getAll() {
    return await this.dao.all(`SELECT * FROM heroes`);
  }
  async getEvents(id) {
    return await this.dao.all(`SELECT * FROM events WHERE heroId = ?`, [id]);
  }
  async getWithMostLove() {
    return await this.dao.get(`
    Select heroId as id, sum as totalLove
    from (
      Select heroId, sum(love) as sum
      from events
      group by heroId
      )
      where sum = (
        select max(sum) from (
          Select heroId, sum(love) as sum
          from events
          group by heroId
      )
    )
    `);
  }
  async getWithMostCoffees() {
    return await this.dao.get(`
    Select heroId as id, noCoffee 
    from (
      select heroId, count(heroId) as noCoffee from events
      where name = 'made coffee!'
      group by name, heroId
      ) 
      where noCoffee = (
        select max(noCoffee) from (
          select heroId, count(heroId) as noCoffee from events
          where name = 'made coffee!'
          group by name, heroId
        )
      )
  ORDER BY heroId ASC LIMIT 1;`);
  }
}

module.exports = HeroRepo;
