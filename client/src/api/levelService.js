import axios from 'axios'

const service = axios.create({
  
  baseURL: `${process.env.REACT_APP_API_URL}/level`,
  // withCredentials: true // => you might need this when having the users in the app 
});

const errorHandler = err => {
  // console.error(err);
  if (err.response && err.response.data) {
    // console.error("API response", err.response.data);
    throw err.response.data.message
  }
  throw err;
}

export default {
  service,

  getPieces(type) {
    return service.get('/pieces', {
        params: {
            type
        }})
      .then(res => res.data)
      .catch(errorHandler);
  },

  saveNewLevel (level) {
    return service.post('/save', level)
      .then(res => res.data)
      .catch(errorHandler);
  },

  getLevel (id) {
    return service.get(`/${id}`)
      .then(res => res.data)
      .catch(errorHandler);
  },

  getLevelList() {
    return service.get('/list')
      .then(res => res.data)
      .catch(errorHandler);
  },
}

