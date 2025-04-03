document.addEventListener("DOMContentLoaded", () => {
  const apiURL = 'https://bruxellesdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/commerces-recenses-par-hubbrussels-vbx/records?limit=20';

  const favLijst = document.querySelector('#favLijst');
  const locatielijst = document.querySelector('#locatielijst');
  const searchInput = document.querySelector('#searchInput');
  const sortBtn = document.querySelector('#sortBtn');
  const themaswitch = document.querySelector('#themaswitch');
  let favorieten = JSON.parse(localStorage.getItem('favorieten')) || [];
  let locaties = [];
  let sortAscending = true;

  



});









