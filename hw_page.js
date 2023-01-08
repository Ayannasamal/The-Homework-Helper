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
    console.log(firebase);
    function uploadImage() {
       const ref = firebase.storage().ref();
       const file = document.querySelector("#photo").files[0];
       const name = +new Date() + "-" + file.name;
       const metadata = {
          contentType: file.type
       };
       const task = ref.child(name).put(file, metadata);task
       .then(snapshot => snapshot.ref.getDownloadURL())
       .then(url => {
       console.log(url);
       alert('image uploaded successfully');
       document.querySelector("#image").src = url;
    })
    .catch(console.error);
    }
    const errorMsgElement = document.querySelector('span#errorMsg');


function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
       firebase_message_id = childKey;
       message_data = childData;
//Start code
username = message_data['name'];
message = message_data['message'];
like = message_data['like'];
name_with_tag = "<h4>" + username + "<img class='user_tick' src='tick.png'> </h4> ";
message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +" </span></button><hr>";
row = name_with_tag + message_with_tag + like_button + span_with_tag;
document.getElementById("output").innerHTML += row;
//End code
    } });  }); }


var user_name=localStorage.getItem("user_name");
var room_name=localStorage.getItem("room_name");

function logOut(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location="index.html";
}

function send(){
    msg=document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
          name:user_name,
          message:msg,
          like:0
    });
    document.getElementById("msg").value="";
}

function updateLike(message_id){
    console.log("like button has been clicked with the id"+ message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updatedLike = Number(likes) + 1;
    console.log(updatedLike);

    firebase.database().ref(room_name).child(message_id).update({ like : updatedLike});
}

getData();