async function onLoad() {
    let user_details = await fbLogin();
    if (user_details!=='') {
        console.log('Got user details! its %o', user_details);
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
