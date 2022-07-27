const { AllGames, GamesDB,  GamesApi } = require("../Controllers/Games");
const { default: axios } = require("axios");
const { API_KEY } = process.env;
const { Videogame, Genre, Platforms} = require("../db");


const GetGames = () => async (req, res, next) => {
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
}

const GetGamesById = () => async (req, res, next) => {
  const { id } = req.params;
  const arrApiInfo = [];

  if (id.includes("-")) {
    try {
      const dbInfoResult = await GamesDB();
      const filterId = dbInfoResult.filter( i => i.id == id);

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

  }
}

const GetGenres = () => async (req, res, next) => {
  try {
    res.status(200).send(
      await Genre.findAll({
        attributes: { exclude: ["createdAt", "updatedAt", "id"] },
      })
    );
  } catch (error) {
    next(error);
  }
} 

const GetPlatsfroms = () => async (req, res, next) => {
  try {
    const platfor = await Platforms.findAll({
        attributes: ["name"]
    });
    res.status(200).send(platfor)
    
  } catch (error) {
    next(error)
  } 
}

const PostGame = () =>  async (req, res) => {
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
  });

  let genreDB = await Genre.findAll({
    where: { name: genre },
  });

  let  platformDB = await Platforms.findAll({
    where: {name : platforms}
  })

  await createGame.addGenre(genreDB);
  await createGame.addPlatforms(platformDB);
  // res.send("Video Game creado con exito :)");
  return res.status(200).send(createGame);
  // console.log(createGame)
}

module.exports = {
  GetGames,
  GetGamesById,
  GetGenres,
  GetPlatsfroms,
  PostGame,
}