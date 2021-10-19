// const fs = require("fs");
// const albumsFile = "./albums.json";

// const saveAlbumsToJson = (albums) => {
//   const text = JSON.stringify(albums, null, 4);
//   fs.writeFileSync("/albums.json", text);
// };

// const getAlbumsDetailsFromJson = () => {
//   const text = fs.readFileSync(albumsFile);
//   const obj = JSON.parse(text);
//   return obj;
// };

// const api = () => {
//   const getAlbumsDetailsById = (request, response) => {
//     const albumsId = parseInt(request.params.albumsId);
//     const album = getAlbumsDetailsFromJson().find(
//       (q) => q.albumId === albumsId
//     );
//     response.send(album);
//   };

//   const getAlbumsDetails = (request, response) => {
//     response.json(getAlbumsDetailsFromJson());
//   };

//   const saveAlbumsDetail = (request, response) => {
//     const newAlbum = request.body;
//     const albums = getAlbumsDetailsFromJson();

//     //checking if same details already exist
//     const sameDetail = albums.find((q) => q.album == newAlbum.album);
//     if (sameDetail) {
//       response.status(400).send("Albums is already exist");
//     }

//     // providing unique albumId
//     const maxAlbumId = Math.max(...albums.map((q) => q.albumId));
//     newAlbum.albumId = maxAlbumId + 1;

//     //saving quotes
//     albums.push(newAlbum);
//     saveAlbumsToJson(albums);
//     response.status(201).send(newAlbum);
//   };

//   return {
//     getAlbumsDetails,
//     getAlbumsDetailsById,
//     saveAlbumsDetail,
//   };
// };

// module.exports = api;
