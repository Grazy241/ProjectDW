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

  const fetchData = async () => {
    try {
        const response = await fetch(apiURL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        locaties = data.records.map(item => ({
            title: item.naam_van_de_winkel || 'Onbekende winkel',
            description: item.locatie || item.adres || 'Geen locatie'
        }));

        renderList();
    } catch (error) {
        console.error("Fout bij ophalen:", error);
        locatielijst.innerHTML = '<li>Fout bij ophalen van data.</li>';
    }
};

const renderList = () => {
  let filtered = [...locaties];
  const query = searchInput.value.toLowerCase();
  filtered = filtered.filter(locatie => locatie.title.toLowerCase().includes(query));

  if (filtered.length === 0) {
      locatielijst.innerHTML = '<li>Geen resultaat gevonden</li>';
      return;
  }

  filtered.sort((a, b) => sortAscending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));

  locatielijst.innerHTML = '';
  filtered.forEach(locatie => {
      const li = document.createElement('li');
      li.innerHTML = `
          <strong>${locatie.title}</strong><br>
          <em>${locatie.description}</em><br>
          <button class="favBtn">❤️</button>
      `;
      locatielijst.appendChild(li);

      li.querySelector('.favBtn').addEventListener('click', () => toggleFavorite(locatie.title));
  });
};

const toggleFavorite = (title) => {
  if (favorieten.includes(title)) {
      favorieten = favorieten.filter(fav => fav !== title);
  } else {
      favorieten.push(title);
  }
  localStorage.setItem('favorieten', JSON.stringify(favorieten));
  renderFavorieten();
};

const renderFavorieten = () => {
  favLijst.innerHTML = '';
  favorieten.forEach(title => {
      const li = document.createElement('li');
      li.textContent = title;

      const btn = document.createElement('button');
      btn.textContent = '🗑️';
      btn.onclick = () => toggleFavorite(title);
      li.appendChild(btn);
      favLijst.appendChild(li);
  });
};

themaswitch.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("thema", document.body.classList.contains("dark") ? "dark" : "light");
});

if (localStorage.getItem("thema") === "dark") {
  document.body.classList.add("dark");
}

searchInput.addEventListener("input", renderList);
sortBtn.addEventListener("click", () => {
  sortAscending = !sortAscending;
  renderList();
});

fetchData();
renderFavorieten();
});










