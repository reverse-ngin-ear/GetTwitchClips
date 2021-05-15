const fetch = require('node-fetch')

const client_id = ''
const client_secret = ''


fetch('https://id.twitch.tv/oauth2/token?client_id=' + client_id + '&client_secret=' + client_secret + '&grant_type=client_credentials&scope=openid', {
method: 'post'
}).then(response => response.json()).then(data => console.log(data))