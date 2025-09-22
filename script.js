// Replace with your own TMDB API Key
const API_KEY = "c55147e6819f9d8f3391375fa748cc72";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const movieContainer = document.getElementById("movieContainer");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("movieModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

// Fetch trending movies on load
getMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);

// Fetch Movies
function getMovies(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      displayMovies(data.results);
    });
}

// Display Movies
function displayMovies(movies) {
  movieContainer.innerHTML = "";
  movies.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `
      <img src="${movie.poster_path ? IMG_URL + movie.poster_path : 'https://via.placeholder.com/200x300'}" alt="${movie.title}">
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p>⭐ ${movie.vote_average}</p>
      </div>
    `;

    card.addEventListener("click", () => showDetails(movie.id));
    movieContainer.appendChild(card);
  });
}

// Show Movie Details
function showDetails(movieId) {
  fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`)
    .then(res => res.json())
    .then(movie => {
      modalBody.innerHTML = `
        <h2>${movie.title}</h2>
        <p><strong>Release Date:</strong> ${movie.release_date}</p>
        <p><strong>Rating:</strong> ${movie.vote_average}</p>
        <p>${movie.overview}</p>
      `;
      modal.style.display = "flex";
    });
}

// Close modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// Search movies
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    getMovies(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  }
});
