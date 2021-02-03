function searchApi(search){
    return fetch('https://api.open5e.com/' + search)
        .then(checkStatus)  
        .then(response => response.json())
        .catch(error => console.log('Looks like there was a problem!', error));
};

function checkStatus(response) {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }