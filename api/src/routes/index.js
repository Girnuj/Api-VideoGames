const { default: axios } = require("axios");
const { Router } = require("express");
const { AllGames, GamesDB, ApiGenres, GamesApi } = require("../Controllers/Games");
const { API_KEY } = process.env;
const { Videogame, Genre, Platforms} = require("../db");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.post('/gener', async(req, res) => {
//   try {
//     let { genre } = req.body
//     let genredbs = await Genre.findOrCreate({
//       where: {

//         name: genre
//       }
      
      
//     })
    
//     res.status(200).send(genredbs)
//   } catch (error) {
//     console.log(error)
//   }
// })

router.get("/videogames", async (req, res, next) => {
  try {
    const name = req.query.name;
    let allGames = await AllGames();
    if (name) {
      let gameName = await allGames.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      gameName.length
        ? res.status(200).send(gameName)
        : res
            // .status(404)
            .send([]);
    } else {
      res.status(200).send(allGames);
    }
  } catch (error) {
    next(error);
  }
});

// router.get("/videogames/:id", async (req, res) => {
//     try {
//         const id = req.params.id;
//         const todoId = await AllGames();
//         // console.log(todoId)
//         if (id) {
//             let gameId = await todoId.filter((el) => el.id == id);
//             gameId.length
//                 ? res.status(200).json(gameId)
//                 : res.status(404).send("No se ha encontrado ni un juego con ese id, Sorry :'(");
//         }
//     } catch (error) {
//         console.log('Error en la ruta /:id',error);
//     }
// });

router.get("/videogames/:id", async (req, res, next) => {
  const { id } = req.params;
  const arrApiInfo = [];
  if (id.includes("-")) {
    try {
      const dbInfoResult = await GamesDB();
      const filterId = dbInfoResult.filter((i) => i.id == id);

      if (filterId.length > 0) {
        return res.status(200).send(filterId);
      } else {
        return res.status(404).send("2No se encontro Video Game con ese ID");
      }
    } catch (error) {
      console.log("Error al traer los games de la DB en la ruta /:id", error);
    }
  } else {
    try {
      const gameByIdApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
      
      arrApiInfo.push(gameByIdApi.data);
      
      const dataApi = arrApiInfo.map((e) => {
        return {
          id: e.id,
          name: e.name,
          imagen: e.background_image,
          description: e.description ? e.description.replace(/<[^>]*>\n?/gm, " "): "",
          released: e.released,
          rating: e.rating,
          platforms: e.platforms.map((e) => {
            return {
              name: e.platform.name,
            };
          }),
          genres: e.genres.map((e) => {
            return {
              name: e.name,
            };
          }),
          imagen2: e.background_image_additional,
        };
      });
      const game = dataApi?.filter((e) => e.id == id);
      if (game.length > 0) {
        return res.status(200).send(game);
      } else {
        return res.status(404).send("3No se encontro Videojuego con ese ID");
      }
    } catch (error) {
        next(error);
    }
    // console.log(gameByIdApi);
  }
});

// router.get('/genres', async (req, res) => {
//     try {
//         const todo = await AllGames();
//         let games = await todo
//             .map((game) => game.genres)
//             .flat()
//             .reduce((acc, item) => {
//                 if (!acc.includes(item)) {
//                     acc.push(item);
//                 }
//                 return acc;
//             }, []);
//            console.log(games)
//            games.forEach(async (genre) => {
//             await Genre.create({
//                 name: genre,
//             });
//         });

//         res.status(200).send(games);
//     } catch (error) {
//         console.log('error en /genres',error);
//     }
// });


router.get("/genres", async (req, res, next) => {
  try {
    await ApiGenres();
    res.status(200).send(
      await Genre.findAll({
        attributes: { exclude: ["createdAt", "updatedAt", "id"] },
      })
    );
  } catch (error) {
    next(error);
  }
});



router.post("/videogame", async (req, res) => {
  let {
    name,
    description,
    released,
    rating,
    imagen,
    genre,
    platforms,
    created,
  } = req.body;

  let [createGame, boole ] = await Videogame.findOrCreate({
  
  where: {
    name,
     
  },
  defaults: {
    description,
    released,
    rating,
    imagen,
    created,
  }
 
    // name,
    // description,
    // released,
    // rating,
    // imagen,
    // created,
  });

  let genreDB = await Genre.findAll({
    where: { name: genre },
  });
  

  let  platformDB = await Platforms.findAll({
    where: {name : platforms}
  })



  await createGame.addGenre(genreDB);
  await createGame.addPlatforms(platformDB);
//   res.send("Video Game creado con exito :)");
  return res.status(200).send(createGame);
  // console.log(createGame)
});


router.get("/platforms", async function (req, res, next) {
  try {
    let plat = await GamesApi()
  
      let plat2 = plat?.map(e => e.platforms).flat(5)
  
      let plat3 = plat2?.map(e => e.name.trim()).reduce((acc, item) => {
          if(!acc.includes(item)){
            acc.push(item)
          }
          return acc
      }, [])
  
      plat3.map((e) => {
          Platforms.findOrCreate({
              where: {
                  name: e
              }
          })
      })
      const platfor = await Platforms.findAll({
          attributes: ["name"]
      })
      // console.log(platfor);
      res.send(platfor)
    
  } catch (error) {
    next(error)
  } 
  
})





module.exports = router;
