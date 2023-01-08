var firebaseConfig = {
    apiKey: "AIzaSyCEIE6PA_rlp6RlTr4bn91CBAhpVbZgUTo",
    authDomain: "hw-helper-54e7c.firebaseapp.com",
    databaseURL: "https://hw-helper-54e7c-default-rtdb.firebaseio.com",
    projectId: "hw-helper-54e7c",
    storageBucket: "hw-helper-54e7c.appspot.com",
    messagingSenderId: "1066712248068",
    appId: "1:1066712248068:web:0802051d69c7ac2ddeea51",
    measurementId: "G-C868PR7MG8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
     Room_names = childKey;
    
    row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
    document.getElementById("output").innerHTML += row ;
    
    });});}
getData();


user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom(){
    room_name = document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
          purpose : "adding the Room name"
    });
    localStorage.setItem("room_name" , room_name);
    window.location="hw_page.html"


}

function redirectToRoomName(name){
    console.log(name);
    localStorage.setItem("room_name" , name);
    window.location="hw_page.html";
}

function logOut() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location="index.html";

}
