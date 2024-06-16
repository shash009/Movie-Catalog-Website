document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("search-input");
    const genreFilter = document.getElementById("genre-filter");
    const movieGrid = document.getElementById("movie-grid");
    
    searchInput.addEventListener("input", searchMovies);
    genreFilter.addEventListener("change", searchMovies);
    
    function searchMovies() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedGenre = genreFilter.value;
        const movies = document.querySelectorAll(".movie-info");
        
        movies.forEach(movie => {
            const title = movie.querySelector("h2").textContent.toLowerCase();
            const genre = movie.getAttribute("data-genre");
            
            if ((title.includes(searchTerm) || searchTerm === "") &&
                (genre === selectedGenre || selectedGenre === "")) {
                movie.style.display = "block";
            } else {
                movie.style.display = "none";
            }
        });
    }
    
    // Modal functionality
    const modal = document.createElement("div");
    modal.classList.add("modal");
    document.body.appendChild(modal);
    
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modal.appendChild(modalContent);
    
    const modalClose = document.createElement("span");
    modalClose.classList.add("modal-close");
    modalClose.innerHTML = "&times;";
    modalContent.appendChild(modalClose);
    
    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");
    modalContent.appendChild(modalBody);
    
    document.querySelectorAll(".movie-info").forEach(movie => {
        movie.addEventListener("click", function() {
            const movieTitle = this.querySelector("h2").textContent;
            const moviePoster = this.querySelector("img").src;
            const movieYear = this.querySelector("p").textContent.split(": ")[1];
            
            modalBody.innerHTML = `
                <img src="${moviePoster}" alt="${movieTitle}">
                <h2>${movieTitle}</h2>
                <p>Released In: ${movieYear}</p>
                <p>Genre: ${this.getAttribute("data-genre")}</p>
                <p>Director: John Doe</p>
                <p>Cast: Actor 1, Actor 2, Actor 3</p>
                <p>Rating: 8.5/10</p>
            `;
            
            modal.style.display = "block";
        });
    });
    
    modalClose.addEventListener("click", function() {
        modal.style.display = "none";
    });
    
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
