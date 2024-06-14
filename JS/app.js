document.addEventListener('DOMContentLoaded', async () => {
    const housesFilter = document.getElementById('hogwarts-houses');
    const spellsFilter = document.getElementById('spells');
    const professorsFilter = document.getElementById('professors');
    const resultsContainer = document.getElementById('results-container');

    let charactersData = [];

    const response = await fetch('https://hp-api.onrender.com/api/characters');
    charactersData = await response.json();

    housesFilter.addEventListener('click', function () {
        const houses = charactersData.filter(character => character.house);
        const uniqueHouses = [...new Set(houses.map(character => character.house))];
        displayResults(uniqueHouses);
    });

    spellsFilter.addEventListener('click', function () {
        const spellsList = getSpellsList(charactersData);
        displayResults(spellsList);
    });

    professorsFilter.addEventListener('click', function () {
        const professors = charactersData.filter(character => character.hogwartsStaff === true);
        const professorNames = professors.map(professor => professor.name);
        displayResults(professorNames);
    });

    function displayResults(results) {
        resultsContainer.innerHTML = '';
        if (results.length === 0) {
            resultsContainer.innerHTML = '<p>No se encontraron resultados.</p>';
        } else {
            results.forEach(result => {
                const item = document.createElement('div');
                item.classList.add('result-item');
                item.innerHTML = `<p>${result}</p>`;
                resultsContainer.appendChild(item);
            });
        }
    }
    function getSpellsList(characters) {
        const spellsList = characters.reduce((acc, character) => {
            if (character.spells) {
                character.spells.forEach(spell => {
                    if (!acc.includes(spell.spell)) {
                        acc.push(spell.spell);
                    }
                });
            }
            return acc;
        }, []);
        return spellsList;
    }
});
