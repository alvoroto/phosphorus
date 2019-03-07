import axios from 'axios'

const service = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
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

  handleUpload (file) {
    const formData = new FormData();
    formData.append("imageUrl", file)
    return service
      .post('/admin/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errorHandler);
  },

  saveNewThing (newThing) {
    // console.log('new thing is: ', newThing)
    return service.post('/admin/newPiece', newThing)
      .then(res => res.data)
      .catch(errorHandler);
  },







  // // You can have as many methods as you want

  // //este método se utiliza para obtener desdfe la base de datos, via nuestra API express la información concerniente al user id 
  // //que solicitamos, gracias a pasar el id de usuario que queramos de mongo
  // getUserdata(id) {
  //   //utlizamos nuestro servicio de axios para interrogar a nuestra API via GET
  //   return service
  //   .get('/users/' + id)
  //   .then(res => res.data)
  //   .catch(errHandler);
  // },
  

  // //aquí usamos nuesto servicio de axios para pasar la información al back con el nuevo username
  // //por favor advierte de que estamos comunicándonos con el server via verbo PUT
  // updateUsername(newUsername) {
  //   //esta parte es la que me envía la información nueva del usuario al endpoint de actualización
  //   //este {username: newUsername} es el payload que mandamos al back y con el cual queremos efectuar la actualización
  //   return service
  //     .put('/users/update', {username: newUsername})
  //     .then(res => res.data)
  //     .catch(errHandler);
  // },

  // // Method addPicture
  // addPicture(file) {
  //   const formData = new FormData();
  //   formData.append("photo", file)
  //   return service
  //     .post('/users/first-user/pictures', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })
  //     .then(res => res.data)
  //     .catch(errHandler);
  // }
}