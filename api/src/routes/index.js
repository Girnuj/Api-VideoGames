const { Router } = require("express");
const { GetGames, GetGamesById, GetGenres, GetPlatsfroms, PostGame } = require("./routes");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", GetGames());

router.get("/videogames/:id", GetGamesById());

router.get("/genres", GetGenres());

router.get("/platforms", GetPlatsfroms());

router.post("/videogame", PostGame());

module.exports = router;
