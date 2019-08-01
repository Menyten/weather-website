console.log('Client side js file is loaded');



const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const weather = document.querySelector("#location");
const locat = document.querySelector("#forecast");



weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;

  fetch(`http://localhost:3000/weather?address=${location}`)
    .then(res => {
      res.json()
        .then(data => {
          if (data.err) {
            weather.textContent = data.err;
            locat.textContent = '';
          } else {
            weather.textContent = data.location
            locat.textContent = data.forecast
          }
        })
    });
});