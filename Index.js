
// Importa os dados dos filmes
import { movies } from './movies.js';

// Adiciona um ouvinte de eventos ao formulário
document.getElementById('filmForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Obtém a idade e as categorias selecionadas pelo usuário
    const age = parseInt(document.getElementById('age').value); // Converte a idade para um número inteiro
    const categories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
                            .map(checkbox => checkbox.value); // Coleta os valores das categorias selecionadas

    // Filtra os filmes com base na idade e categorias selecionadas
    const filteredMovies = movies.filter(movie => {
        // Se a idade for válida (entre 1 e 9 anos), filtra pelos filmes com classificação etária adequada e gênero correspondente
        if (age >= 1 && age <= 9) {
            return movie.ageRating <= 9 && categories.includes(movie.genre);
        } else { // Senão, filtra apenas pelo gênero
            return categories.includes(movie.genre) && movie.ageRating <= age;
        }
    });

    // Limpa os resultados anteriores
    const movieResults = document.getElementById('movieResults');
    movieResults.innerHTML = '';

    // Exibe os filmes filtrados
    if (filteredMovies.length > 0) {
        filteredMovies.forEach(movie => {
            // Cria um elemento div para cada filme
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie');

            // Define o conteúdo HTML do elemento div
            movieDiv.innerHTML = `
                <h3>${movie.title}</h3>
                <p><strong>Gênero:</strong> ${movie.genre}</p>
                <p><strong>Sinopse:</strong> ${movie.synopsis}</p>
                <iframe width="560" height="315" src="${movie.trailer}" 
                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;
