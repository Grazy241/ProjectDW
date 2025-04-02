

const favLijst = document.getElementById('favLijst');
const themaswitch = document.getElementById('themaswitch');
const sortBtn = document.getElementById('sortBtn');
const searchInput = document.getElementById('searchInput');

let favorieten = JSON.parse(localStorage.getItem('favorieten')) || [];
let sortAscending = true; 

// sorteren //

Filtered.sort((a,b) => sortAscending ? a.title.localCompare(b.title) : b.title.localCompare(a.title)
);

favLijst.innerHTML = '';
if (filtered.length === 0) {
  favLijst.innerHTML = '<li>Leeg...</li>';
  return;
}

// ❤️ - knop events

const addFavoriet = (title) => {
  if(!favorieten.includes(title)) {
    favorieten.push(title);
    localStorage.setItem('favorieten', JSON.stringify(favorieten));
    renderFavoriet();
  }
};

const renderFavoriet = () => {
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




