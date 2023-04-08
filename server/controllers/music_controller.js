const querystring = require('querystring');
const axios = require('axios');

// var spotifyApi = new SpotifyWebApi({
//     clientId: '41a7d2f2bc1e42ab86019a6c41895737',
//     clientSecret: '9365895f270b414083b21d46f36bdbe0',
//     redirectUri: 'localhost:4000/api/music/callback',
//     response_type: "code"
// });

login = (req, res) => {
    var client_id = '41a7d2f2bc1e42ab86019a6c41895737';
    var redirect_uri = 'http://localhost:4000/api/music/callback';
    var scope = 'user-read-playback-state user-modify-playback-state';

    res.redirect("https://accounts.spotify.com/authorize?" + 
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            redirect_uri: redirect_uri,
            scope: scope
        }));
}

callback = async (req, res) => {
    const code = req.query.code || null;
    var redirect_uri = 'http://localhost:4000/api/music/callback';
    var client_id = '41a7d2f2bc1e42ab86019a6c41895737';
    var client_secret = '9365895f270b414083b21d46f36bdbe0';

    axios({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        data: querystring.stringify({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: redirect_uri
        }),
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${new Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
        },
    })
    .then(response => {
        if (response.status === 200){
            const {access_token, refresh_token} = response.data;

            queryParams = querystring.stringify({
                access_token,
                refresh_token
            });

            res.redirect(`http://localhost:3000?${queryParams}`)
        }
    })
}

refresh = async (req, res) => {
    const {refresh_token} = req.query;

    axios({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        data: querystring.stringify({
            grant_type: "refresh_token",
            refresh_token: refresh_token
        }),
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${new Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
        },
    })
    .then(response => {
        if (response.status === 200){
            const {access_token} = response.data;
            return res.status(200).json({access_token: access_token});
        }
    });
}

getCurrentSong = async (req, res) => {
    // Get the User's Currently Playing Track 
    const access_token = req.params.access_token;

    axios({
        method: "get",
        url: "https://api.spotify.com/v1/me/player/currently-playing",
        headers: {
            Authorization: `Bearer ${access_token}` 
        }
    })
    .then(response => {
        if(response.status == 204){
            console.log("No Music Playing");
            return res.status(200).json(null)
        }
        return res.status(200).json(response.data);
    })
    .catch(err => {
        console.log(err);
        //res.send(err);
        if(response.status == 401 && response.statusText == "Unauthorized"){
            return res.status(200).json({"message": "refreshToken"});
        }
        return res.status(200).json(null);
    })

}

pauseMusic = async (req, res) => {
    const access_token = req.params.access_token;

    axios({
        method: "put",
        url: "https://api.spotify.com/v1/me/player/pause",
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
    .then(response => {
        if(response.status == 204){
            return res.status(200).json({})
        }
        return res.status(200);
    })
    .catch(err => {
        console.log(err);
        res.send(err);
    })
}

playMusic = async (req, res) => {
    const access_token = req.params.access_token;

    axios({
        method: "put",
        url: "https://api.spotify.com/v1/me/player/play",
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
    .then(response => {
        if(response.status == 204){
            return res.status(200).json({})
        }
        return res.status(200);
    })
    .catch(err => {
        console.log(err);
        res.send(err);
    })
}

nextSong = async (req, res) => {
    const access_token = req.params.access_token;

    axios({
        method: "post",
        url: "https://api.spotify.com/v1/me/player/next",
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
    .then(response => {
        if(response.status == 204){
            return res.status(200).json({})
        }
        return res.status(200);
    })
    .catch(err => {
        console.log(err);
        res.send(err);
    })
}

prevSong = async (req, res) => {
    const access_token = req.params.access_token;

    axios({
        method: "post",
        url: "https://api.spotify.com/v1/me/player/previous",
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
    .then(response => {
        if(response.status == 204){
            return res.status(200).json({})
        }
        return res.status(200);
    })
    .catch(err => {
        console.log(err);
        res.send(err);
    })
}

module.exports = {
    login,
    callback,
    refresh,
    getCurrentSong,
    playMusic,
    pauseMusic,
    nextSong,
    prevSong
    
}