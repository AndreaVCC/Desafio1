 
 firebase.initializeApp({
      apiKey: "AIzaSyAMqZJ62i7jgOj8GL51lC5M4sK4bpxYdcw",
      authDomain: "desafio1comentarios.firebaseapp.com",
      databaseURL: "https://desafio1comentarios.firebaseio.com",
      projectId: "desafio1comentarios",
      storageBucket: "desafio1comentarios.appspot.com",
      messagingSenderId: "441785957167"
  })
  let db = firebase.firestore();



  //GUARDAR VALOR INPUT EN FIREBASE
  function uploadComment() {
      let comentario = document.getElementById('comment').value;

      
      db.collection('Comentarios').add({
              comentario: comentario
          })
          .then(function (docRef) {
              console.log('Comentario subido');
              document.getElementById('comentario').value = '';

          })
          .catch(function (error) {
              console.log('Error');
          });
  }

  //MOSTRAR COLECCION DE FIREBASE

  let contenido = document.getElementById('contenido');

db.collection('Comentarios').onSnapshot((querySnapshot) => {
    contenido.innerHTML ='';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        contenido.innerHTML += `
        <div class='container row'>
            <div class=' col s12'>
                <div class='card'>
                    <div class ='row'>
                        <div class='col s10'>
                            <p>Comentario:</p>
                        </div>
                        <div class='col s2'>
                            <button class="btn red darken-1" type="submit" id="btnsave"onclick="eliminated('${doc.id}')">X</button>
                        </div>
                    </div>
                    <div class='row'>
                        <div class='col s12'>
                            ${doc.data().comentario}
                        </div>
                    </div>
                </div>
            </div>            
        </div>
       
        `
    });
});

//BORRAR

function eliminated(a){
    db.collection('Comentarios').doc(a).delete()
    .then(function() {
        console.log ('Borrado')
    }).catch(function(error) {
        console.log('Error al eliminar');
    })
}


