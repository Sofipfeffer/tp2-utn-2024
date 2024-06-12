const $section = document.querySelector("section");

fetch("https://hp-api.onrender.com/api/characters")
    .then((respuesta) => {
        return respuesta.json();
    })
    .then((data) => {
        const personajes = data;
        console.log(personajes);

        personajes.forEach((personaje) => {
            $section.innerHTML += ` <div>
            <img src="${personaje.image} alt="Imegen de ${personaje.name}">
            <h4>${personaje.name}</h4>
            <p></p>
            <p></p>
            <p></p>
            </div>
            `;
        });
    })