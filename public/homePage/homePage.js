async function onLoad() {
    let user_details = await fbLogin();
    updateLayout(user_details);    
}

function updateLayout(details) {
  if (Object.getOwnPropertyNames(details).length > 0) {      
    document.getElementById('user-card').style.display = "flex";
    document.getElementById('intro-message').innerText+=' '+details.name;
    document.getElementById('profile-pic').setAttribute('src', details.profileUrl);
  } else {
    document.getElementById('login').style.display = "flex";
  }
}

function fbLogin() {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/users/fbuser', true);
      // Track the state changes of the request.
      xhr.onreadystatechange = function () {
        var DONE = 4; // request is done.
        var OK = 200; // successful return.
        if (xhr.readyState === DONE) {
            console.log('xhr done');
          if (xhr.status === OK) {
              console.log('xhr ok');              
            const responseObj = xhr.responseText !== '' ? JSON.parse(xhr.responseText): {};
            const login_credentials = responseObj;
            resolve(login_credentials);
          } else {
            reject(xhr.status);
          }
        }
      };
      xhr.send();
    });
  } // login

onLoad();
