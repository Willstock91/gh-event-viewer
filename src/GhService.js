import axios from 'axios';
const EventEmitter = require('events');

const api = axios.create({baseURL: 'https://api.github.com'});
api.interceptors.request.use((config) => {
    let token = sessionStorage.getItem('token');
    if(token) {
        config.headers.common.Authorization = 'token ' + sessionStorage.getItem('token');    
    }
    return config;
});

export const GhService = {

    getEventData: function() {    
        return api.get('/events').then(res => res.data);
    },

    getEventsForUser: function(username) {
        const url = `/users/${username}/events/public`;
        return api.get(url).then(res => res.data);
    },

    getToken: function(code) {
        const corsProxy = 'https://cors-anywhere.herokuapp.com/';
        const url = `https://github.com/login/oauth/access_token`;
        return axios.post(corsProxy + url, {
            client_id: process.env.REACT_APP_CLIENT_ID,
            client_secret: process.env.REACT_APP_CLIENT_SECRET,
            code: code
        }, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json'
            },
        }).then(res => res.data);
    },

    authorizeUser: function(code) {
        return this.getToken(code).then(token => {
            sessionStorage.setItem('token', token.access_token);
            return api.get('/user').then(res => {
                sessionStorage.setItem('user', JSON.stringify(res.data));
                this.logon.emit('success');
                return res.data;
            });
        })
        
    },

    logon: new EventEmitter()
}


export default GhService;