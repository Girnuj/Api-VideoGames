const { Videogame, Genre, Platforms } = require("../db");
const { default: axios } = require("axios");
const e = require("express");
const { API_KEY } = process.env;


const MapApi = async (arr) => {
  try {
    const result = arr.map((el) => {
      return {
        id: el.id,
        name: el.name,

        imagen: el.background_image,
        genres: el.genres.map((e) => {
          return {
            name: e.name,
          };

          // return e.name
        }),
        platforms: el.platforms.map((e) => {
          return {
              name: e.platform.name
          }
          // return e.platform.name;
        }),
        rating: el.rating,
      };
    });
    return result;
  } catch (error) {
    console.log("error en la ruta MapApi:", error);
//         throw new Error(
//             `Mientras se proceso ${MapApi}`, {cause: error}
//         )
  }
};


const GamesApi = async () => {
  try {
    const apiGames = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}`
    );

    let apiGamesMapeados = await MapApi(apiGames.data.results);

    let next = apiGames.data.next;

    while (apiGamesMapeados.length < 100) {
      const proxNext = await axios.get(next);
      const resultSum = await MapApi(proxNext.data.results);
      apiGamesMapeados = [...apiGamesMapeados, ...resultSum];
      next = proxNext.data.next;
    }
    // console.log(apiGamesMapeados.length);
    return apiGamesMapeados;
  } catch (error) {
    console.log("error en la funcion Games Api:", error);
  }
};

const GamesDB = async () => {
  try {
    return await Videogame.findAll({
      include: [
        {
            model: Genre,
            attributes: ["name"],
            through: {
                attributes: []
            }
        },
        {
            model: Platforms,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    ]
      
    });
  } catch (error) {
    console.error("error en GamesDB", error);
  }
};

const AllGames = async () => {
  try {
    const ApiInfo = await GamesApi();
    const DBInfo = await GamesDB();
    // console.log(DBInfo)
    const AllInfo = ApiInfo.concat(DBInfo);
    return AllInfo;
  } catch (error) {
    console.error("error en AllGames", error);
  }
};

const ApiGenres = async () => {
  try {
    let gen = await Genre.count();
    if (gen === 0) {
      const genresApi = await axios.get(
        `https://api.rawg.io/api/genres?key=${API_KEY}`
      );
      const responseApi = genresApi.data.results;
      for (let i = 0; i < responseApi.length; i++) {
        const { name } = responseApi[i];
        await Genre.findOrCreate({
         where: { name: name}
        });
      }
    }
  } catch (error) {
    console.log("error en LoadGenres", error);
  }
};


// const ApiPlataforms = async() => {
//     try {
//         let plat = await Platforms.count();
//         if(plat === 0){
//             const platformApi = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
//             const platInfo = await platformApi.data?.results.map(el => {
//                 return {

//                     platforms: el.platforms.map(e => e.platforms).flat(5).reduce((acc,item)=>{
//                         if(!acc.includes(item)){
//                             acc.push(item);
//                         }
//                         return acc;
//                       },[]),
//                 }
//             })
//           //   platInfo.map((e) => {
//           //     Platforms.findOrCreate({
//           //         where: {
//           //             name: e
//           //         }
//           //     })
//           // })
                
//              res.status(200).send(platInfo);
//         }
//     } catch (error) {
//         console.log('error en ApiPlataforms',error);
//     }
// }


module.exports = {
  AllGames,
  GamesDB,
  ApiGenres,
  // ApiPlataforms,
  GamesApi,
};
