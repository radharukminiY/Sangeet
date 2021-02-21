const URL = 'https://deezerdevs-deezer.p.rapidapi.com/';
const KEY = process.env.REACT_APP_API_KEY;
const CONFIG = {
  method: 'GET',
  headers: {
    'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
    'x-rapidapi-key': '3a769325a6msh225851b5fee5bedp1ff988jsnab6b6e72adb8',
    'Retry-After': 6,
  },
};

const fetchData = (params) => fetch(URL + params, CONFIG).then((res) => res.json());

export default fetchData;
