
function initDb(heroRepo, eventRepo) {

  const createTables = async () => {
    let heroTable = await heroRepo.createTable();
    let eventTable = await eventRepo.createTable();
  };
  
  // Async
  createTables();
}

module.exports = initDb;


//   heroRepo
//     .createTable()
//     .then(() => {
//       eventRepo.createTable();
//     })
//     .then(() => {
//       eturrn heroRepo.create(heroData.name, heroData.pin);
//     })
//     .then(data => {
//       console.log(data);
//       heroId = data.id;
//       const events = [
//         {
//           name: 'Rensa Diskmaskin',
//           description: 'Rensade di
// skmaskinen woohooo!',
//           created: '20181029 17:37',
//           heroId: heroId
//         },
//         {
//           name: 'Fyllde Diskmaskin',
//           description: 'Fyllde diskmaskinen woohooo!',
//           created: '20181029 17:42',
//           heroId: heroId
//         }
//       ];
//       return Promise.all(
//         events.map(event => {
//           const { name, description, created, heroId } = event;
//           return eventRepo.create(name, description, created, heroId);
//         })
//       );
//     })
//     .then(() => heroRepo.getById(heroId))
//     .then(hero => {
//       console.log(`\n Retrieved hero from database: ${hero.name} (${hero.id})`);
//       return heroRepo.getEvents(hero.id);
//     })
//     .then(events => {
//       console.log(`\n Retrieved events from database`);
//       return new Promise((resolve, reject) => {
//         events.forEach(event => {
//           console.log(
//             `id: ${event.id} name: ${event.name} created: ${event.created} `
//           );
//         });
//       });
//       resolve('success');
//     })
//     .catch(err => {
//       console.log('Error');
//       console.log(JSON.stringify(err));
//     });
// }


