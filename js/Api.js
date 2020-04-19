class Api {
    constructor(options) {
      // тело конструктора
    }
  
    getInitialCards() {
      
    }
  
    getUserInfo(){
        fetch('https://praktikum.tk/cohort10/users/me',{
            headers: {
                authorization: 'b7bf284d-e98b-46e7-a116-decc877d1eec'
              }
        })
        .then(res => {
            if(res.ok) {
            console.log(res.json)
            return res.json();
            
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(data => console.log(data));
        
        
    }
  }
  
  const api = new Api({
    baseUrl: 'https://praktikum.tk/cohort10',
    headers: {
      authorization: 'b7bf284d-e98b-46e7-a116-decc877d1eec',
      'Content-Type': 'application/json'
    }
  });

  api.getUserInfo()

  

  