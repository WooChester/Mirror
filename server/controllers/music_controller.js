//var SpotifyWebApi = require('spotify-web-api-node');
const querystring = require('querystring');
const axios = require('axios');

// var spotifyApi = new SpotifyWebApi({
//     clientId: '41a7d2f2bc1e42ab86019a6c41895737',
//     clientSecret: '9365895f270b414083b21d46f36bdbe0',
//     redirectUri: 'localhost:4000/api/music/callback',
//     response_type: "code"
// });

// spotifyApi.clientCredentialsGrant().then(
//     function(data) {
//         console.log('The access token is ' + data.body['access_token']);
//         spotifyApi.setAccessToken(data.body['access_token']);
//     },
//     function(err) {
//         console.log('Something went wrong!', err);
//     }
// );

login = (req, res) => {
    var client_id = '41a7d2f2bc1e42ab86019a6c41895737';
    var redirect_uri = 'http://localhost:4000/api/music/callback';
    var scope = 'user-read-playback-state';

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
  
getPlayBackState = async () => {
    spotifyApi.getMyCurrentPlaybackState()
        .then(function(data) {
            // Output items
            if (data.body && data.body.is_playing) {
            console.log("User is currently playing something!");
            } else {
            console.log("User is not playing anything, or doing so in private.");
            }
            return data.body.is_playing;
        }, function(err) {
            console.log('Something went wrong!', err);
        });
}

getUserDevices = async () => {
    spotifyApi.getMyDevices()
        .then(function(data) {
            let availableDevices = data.body.devices;
            console.log(availableDevices);
            return availableDevices;
        }, function(err) {
            console.log('Something went wrong!', err);
        });
    
}

getCurrentSong = async (req, res) => {
    // Get the User's Currently Playing Track 
    const access_token = req.params.access_token;
    
    axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
            Authorization: `Bearer ${access_token}` 
        }
    })
    .then(response => {
        console.log(response.data);
        if(response.status == 204){
            return res.status(200).json({})
        }
        return res.status(200).json(response.data);
    })
    .catch(err => {
        console.log(err);
        res.send(err);
    })

    // spotifyApi.getMyCurrentPlayingTrack()
    //     .then(function(data) {
    //         console.log(data);
    //         console.log('Now playing: ' + data.body.item.name);
    //         return res.status(200).json(data.body);
    //     }, function(err) {
    //         console.log('Something went wrong!', err);
    //     });
}

pauseSong = async () => {
    spotifyApi.pause()
        .then(function() {
            console.log('Playback paused');
            return true;
        }, function(err) {
            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
            console.log('Something went wrong!', err);
        });
}

playSong = async () => {
    spotifyApi.play()
        .then(function() {
            console.log('Playback started');
        }, function(err) {
            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
            console.log('Something went wrong!', err);
        });
}

module.exports = {
    getPlayBackState,
    getUserDevices,
    getCurrentSong,
    pauseSong,
    playSong,
    login,
    callback
}