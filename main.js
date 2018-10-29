const AppDAO = require('./dao');
const HeroRepo = require('./herorepo');
const EventRepo = require('./eventrepo');

function main() {
  const dao = new AppDAO('./database.sqlite3');
  const heroRepo = new HeroRepo(dao);
  const eventRepo = new EventRepo(dao);

  heroRepo
    .createTable()
    .then(() => {
      eventRepo.createTable();
    })
    .then(() => {
      heroRepo.create('Steck', '123');
    })
    .then(data => {
      console.log(data);
    });
}

main();
