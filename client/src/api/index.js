import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /top5list). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE CALL THE payload, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES

export const getWeather = (location) => api.get(`/weather/${location}`);

export const getCurrentSong = (access_token) => api.get(`/music/current_song/${access_token}`);
export const playMusic = (access_token) => api.put(`/music/play/${access_token}`);
export const pauseMusic = (access_token) => api.put(`/music/pause/${access_token}`);
export const nextSong = (access_token) => api.post(`/music/next/${access_token}`);
export const prevSong = (access_token) => api.post(`/music/prev/${access_token}`);

const apis = {
    getWeather,

    getCurrentSong,
    playMusic,
    pauseMusic,
    nextSong,
    prevSong
}

export default apis
