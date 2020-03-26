const 
  express = require("express"),
  request = require("request"),
  cors = require("cors"),
  querystring = require("querystring"),
  cookieParser = require("cookie-parser"),
  path = require("path");

const 
  UserController = require('./controllers/user_controller'),
  SpotifyController = require('./controllers/spotify_controller'),
  MongoHandler = require('./mongo/mongohandler');

const 
  {Middleware} = require('./middleware/auth'),
  middleware = new Middleware();

const PORT = process.env.PORT || 8888;

const app = express();

app
  .use(express.static(__dirname + "/../frontend/build/"))
  .use(cors())
  .use(cookieParser())
  .use(express.urlencoded())
  .use(express.json());

middleware.verify(app);

app.get("/login", UserController.login);

// app.get('/logout', (req, res) => {
//     res.clearCookie();
//     res.sendStatus(200);
// });

app.get("/callback", UserController.callback);

app.get("/refresh_token", UserController.refresh);

// app.get("/auth/top/tracks", cacheMiddleware("/top_tracks" + middleware.get_current_user(), 30), SpotifyController.tracks);

// testing function
app.get("/top/tracks", SpotifyController.tracks);

app.get("/top/tracks", SpotifyController.tracks);


app.get("/auth/top/artists", SpotifyController.artists);

app.post("/auth/top/common_tracks", UserController.common_tracks);

app.post("/auth/follow", UserController.follow);

app.post("/auth/unfollow", UserController.unfollow);

app.get("/auth/following/:user_id", UserController.getFollowings);

app.get("/auth/followers/:user_id", UserController.getFollowers);


app.get(/\/*/, function(req, res) {
  res.sendFile(path.join(__dirname + "/../frontend/build/"), "index.html");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
