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

     if (comentario.length >= 25) {
        alert("Ingrese menos de 25 carácteres");
    } else {
        db.collection('Comentarios').add({
            comentario: comentario
        })       
        .then(function (docRef) {
            console.log('Comentario subido');
            // document.getElementById('comentario').value = '';
        })
        .catch(function (error) {
            console.log('Error');
        });
    }
    
 }

 //MOSTRAR COLECCION DE FIREBASE

 let contenido = document.getElementById('contenido');

 db.collection('Comentarios').onSnapshot((querySnapshot) => {
     contenido.innerHTML = '';
     querySnapshot.forEach((doc) => {
         contenido.innerHTML += `
        
                <div class='card'>
                        <div class='card-title'>
                            <div class='col m11 s11'> 
                                <span class="flow-text">Recordar:</span>
                            </div>
                            <div class='col m1 s1'>
                                <button class="btn pink darken-1" type="submit" onclick="eliminated('${doc.id}')"><i class="material-icons medium">
                                delete_forever
                                </i></button>
                            </div>
                        </div>
                                   
                        <div class='card-content'>
                            <p>${doc.data().comentario}</p>
                        </div>
                </div>
         
       
        `
     });
 });

 //BORRAR

 function eliminated(a) {
     db.collection('Comentarios').doc(a).delete()
         .then(function () {
             console.log('Borrado')
         }).catch(function (error) {
             console.log('Error al eliminar');
         })
 }