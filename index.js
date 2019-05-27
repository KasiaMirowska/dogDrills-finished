'use strict';
/* global $ */



const STATE = {
  dogs: [],
};

function addDogsToState(dogs){
  STATE.dogs = dogs;
}

function render(){
  let html;
  if (typeof STATE.dogs === 'string') {
    return $('ul').html(`<li><img src= ${STATE.dogs}></li>`); 
  } else {
    html = STATE.dogs.map(dogImg => {
      return `<li> 
         <img src= ${dogImg}></li>`; 
    });
  }
  return $('ul').html(html.join(''));
}

function getDogImage(n){
  return fetch(`https://dog.ceo/api/breeds/image/random/${n}`)
    .then(response => response.json())
}


function getBreedImage(breed) {
  return fetch(`https://dog.ceo/api/breed/${breed}/images`)
  .then(response => {
    return response.json();
  })
  .then(response => {
    if(response.status === 'success'){
      return response;
    }
    else {
      return fetch(`https://dog.ceo/api/breeds/image/random`)
      .then(response => {
        return response.json();
      })
    }
  })
}


function handleClick(){
  $('#forms').submit( event => {
    event.stopPropagation();
    event.preventDefault();
    console.log(event.target[0].id,'hi')
    const inputVar = $('#for-dog-image-entry').val();
    const breedInput = $('#random-dog-breed').val();
    if (event.target[0].id  === 'for-dog-image-entry') {
      console.log(event.currentTarget ,'hi')
      getDogImage(inputVar)
      .then(response => {
        addDogsToState(response.message);
        render();
      });
    } 
    if (event.target[0].id === 'random-dog-breed') {
      console.log(event.currentTarget ,'here')
      getBreedImage(breedInput)
      .then(response => {
        addDogsToState(response.message);
        render();
      });
    }
  })
}





// function handleClick(){
//   $('#forms').submit(e => {
//     e.preventDefault();
//     const inputVar = $('#for-dog-image-entry').val();
//     const breedInput = $('#random-dog-breed').val();
//     console.log(breedInput)
//     console.log(typeof inputVar, inputVar)
//     if (/^\d+$/.test(inputVar)) {
//       getDogImage(inputVar)
//       .then(response => {
//         addDogsToState(response.message);
//         render();
//       });
//     }
//     else if (typeof breedInput === 'string') {
//       getBreedImage(breedInput)
//       .then(response => {
//         addDogsToState(response.message);
//         render();
//       });
//     }
//   });
// }   

$(() =>{
  handleClick();
});
