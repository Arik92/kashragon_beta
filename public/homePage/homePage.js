async function onLoad() {
    let user_details = await fbLogin();
    updateUserDetails(user_details);    
}

function updateUserDetails(details) {
  if (details!=='') {      
    document.getElementById('intro-message').innerText+=' '+details.name;
    document.getElementById('profile-pic').setAttribute('src', details.profileUrl);
  }
}

function fbLogin() {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/fbuser', true);
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
