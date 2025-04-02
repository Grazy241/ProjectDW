const apiURL = 'https://opendata.brussels.be/api/records/1.0/search/?dataset=cultureel-aanbod&q=';


const locatielijst = document.getElementById('locatielijst');
const instructie = document.getElementById('instructie');
const favLijst = document.getElementById('favLijst');
const themaswitch = document.getElementsByClassName('themaswitch');
const sortBtn = document.getElementById('sortBtn');
const searchInput = document.getElementById('searchInput');
const favBtn = document.getElementsByClassName('favBtn');

let locaties = [];
let favorieten = JSON.parse(localStorage.getItem('favorieten')) || [];
let sortAscending = true; 

// api intialisen etc. //

const fetchData = async () => {
  try {
    const res = await fetch(apiURL);
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    const wrapper = await res.json();
    const data = JSON.parse(wrapper.contents);
  } catch (error) {
    
  }
  
}
// sorteren //

Filtered.sort((a,b) => sortAscending ? a.title.localCompare(b.title) : b.title.localCompare(a.title)
);

favLijst.innerHTML = '';
if (filtered.length === 0) {
  favLijst.innerHTML = '<li>Leeg...</li>';
  return;
}

// sorteerknop A-Z //
sortBtn.addEventListener('click', () => {
  sortAscending = !sortAscending;
  sortBtn.textContent = sortAscending ? 'Sorteer A-Z' : 'Sorteer Z-A';
  renderList();
});

themaswitch.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

searchInput.addEventListener('input', renderList);

// ❤️ - knop events

const addFavoriet = (title) => {
  if(!favorieten.includes(title)) {
    favorieten.push(title);
    localStorage.setItem('favorieten', JSON.stringify(favorieten));
    renderFavoriet();
  }
};

const renderFavorieten = () => {
  favLijst.innerHTML = '';
  favorieten.forEach(title => {
    const li = document.createElement('li');
    li.textContext = title;
    const btn = document.createElement('button');
    btn.textContent = '🗑️';
    btn.onclick = () => removeFavoriet(title);
    li.appendChild(btn);
    favLijst.appendChild(li);
  });
}

const removeFavoriet = (title) => {
  favorieten = favorieten.filter(fav => fav !== title);
  localStorage.setItem('favorieten', JSON.stringify(favorieten));
  renderFavorieten();
};

document.addEventListener('DOMContentLoaded', () => {
  fetchData();
  updateFavList();
})







