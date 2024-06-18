document.addEventListener('DOMContentLoaded', async () => {
    const housesFilter = document.querySelector('#hogwarts-houses');
    const professorsFilter = document.querySelector('#professors');
    const spellsFilter = document.querySelector('#spells');
    const houseFilter = document.querySelector('#house-filter');
    const resultsContainer = document.querySelector('#results-container');
    const spellListContainer = document.querySelector('#spell-list-container');
    const professorsFilterContainer = document.querySelector('#professors-filter-container');
    const resultsList = document.querySelector('#results');
    const spellList = document.querySelector('#spell-list');
    const professorList = document.querySelector('#professor-list');
    const searchBar = document.querySelector('#search-bar');

    let charactersData = [];
    let spellsData = [];


    // Llamada a la API de personajes y hechizos
    try {
        const [charactersResponse, spellsResponse] = await Promise.all([
            fetch('https://hp-api.onrender.com/api/characters'),
            fetch('https://hp-api.onrender.com/api/spells')
        ]);
        charactersData = await charactersResponse.json();
        spellsData = await spellsResponse.json();
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return;
    }

    // Descripciones de las casas
    const houseDescriptions = {
        Gryffindor: 'Valentía, coraje y determinación.',
        Hufflepuff: 'Trabajo duro, paciencia, justicia y lealtad.',
        Ravenclaw: 'Inteligencia, sabiduría y creatividad.',
        Slytherin: 'Astucia, liderazgo y ambición.'
    };

    // Función para ocultar todas las secciones
    function hideAllSections() {
        resultsContainer.style.display = 'none';
        spellListContainer.style.display = 'none';
        professorsFilterContainer.style.display = 'none';
    }

    // Event listener para las casas de Hogwarts
    housesFilter.addEventListener('click', function () {
        hideAllSections();
        resultsContainer.style.display = 'block';

        const houses = charactersData.filter(character => character.house);
        const uniqueHouses = [...new Set(houses.map(character => character.house))];
        const housesWithDescriptions = uniqueHouses.map(house => `${house}: ${houseDescriptions[house]}`);
        displayResults(housesWithDescriptions, resultsList);
    });

    // Event listener para los profesores de Hogwarts
    professorsFilter.addEventListener('click', function () {
        hideAllSections();
        professorsFilterContainer.style.display = 'block';
        const filteredProfessors = charactersData.filter(professor => professor.hogwartsStaff === true);
        displayProfessors(filteredProfessors, professorList);
    });

    // Event listener para el selector de casas
    houseFilter.addEventListener('change', function () {
        const selectedHouse = this.value;
        const filteredProfessors = charactersData.filter(professor => professor.hogwartsStaff === true && (!selectedHouse || professor.house === selectedHouse));
        displayProfessors(filteredProfessors, professorList);
    });

    // Event listener para los hechizos
    spellsFilter.addEventListener('click', function () {
        hideAllSections();
        spellListContainer.style.display = 'block';
        displaySpells(spellsData, spellList);
    });

    // Función para mostrar los hechizos
    function displaySpells(spells, container) {
        container.innerHTML = '';

        spells.forEach(spell => {
            const listItem = document.createElement('div');
            listItem.innerHTML = `
                <h1>${spell.name}</h1>
                <p>${spell.description}</p>
            `;
            container.appendChild(listItem);
        });

        // Añadir funcionalidad de búsqueda
        searchBar.addEventListener('input', function () {
            const query = this.value.toLowerCase();
            const filteredSpells = spells.filter(spell => spell.name.toLowerCase().includes(query));
            displayFilteredSpells(filteredSpells, container);
        });
    }

    // Función para mostrar los hechizos filtrados
    function displayFilteredSpells(spells, container) {
        container.innerHTML = '';

        spells.forEach(spell => {
            const listItem = document.createElement('div');
            listItem.innerHTML = `
                <h1>${spell.name}</h1>
                <p>${spell.description}</p>
            `;
            container.appendChild(listItem);
        });
    }

    // Función para mostrar profesores
    function displayProfessors(professors, container) {
        container.innerHTML = '';

        professors.forEach(professor => {
            const listItem = document.createElement('div');
            listItem.innerHTML = `
            <h1>${professor.name}</h1>
        `;
            container.appendChild(listItem);
        });
    }

    const ImageHouse = (house) => {
        switch (house) {
            case 'Gryffindor':
                return '../assets/casas/grif.png';
            case 'Slytherin':
                return '../assets/casas/slit.png';
            case 'Hufflepuff':
                return '../assets/casas/huf.png';
            case 'Ravenclaw':
                return '../assets/casas/rev.png';
            default:
                return '../assets/frente.png';
        }
    };
    // Función para mostrar resultados generales
    function displayResults(results, container) {
        container.innerHTML = '';

        results.forEach(result => {
            const [houseName, houseDescription] = result.split(': ');
            const houseListItem = document.createElement('div');
            houseListItem.innerHTML = `
                <img src="${ImageHouse(houseName)}">
                <h1>${houseName}</h1>
                <p>${houseDescription}</p>
            `;
            container.appendChild(houseListItem);


            // Mostrar información de la casa seleccionada
            houseListItem.addEventListener('click', () => {
                document.getElementById('house-name').textContent = houseName;
                document.getElementById('house-description').textContent = houseDescription;
                document.getElementById('house-image').src = houseImage.src;
            });
        });
    }

    // Ocultar todas las secciones al cargar la página
    hideAllSections();

});