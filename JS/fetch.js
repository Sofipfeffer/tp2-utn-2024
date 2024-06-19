document.addEventListener('DOMContentLoaded', async () => {
    const characterGrid = document.getElementById('character-grid');
    const houseFilter = document.querySelector('.house-filter');

    const response = await fetch('https://hp-api.onrender.com/api/characters');
    const characters = await response.json();

    const charactersWithImages = characters.filter(character => character.image);
    let filteredCharacters = charactersWithImages.slice(0, 30);

    const getFrontImageByHouse = (house) => {
        switch (house) {
            case 'Gryffindor':
                return '../assets/cromos/grif.png';
            case 'Slytherin':
                return '../assets/cromos/slit.png';
            case 'Hufflepuff':
                return '../assets/cromos/huff.png';
            case 'Ravenclaw':
                return '../assets/cromos/rev.png';
            default:
                return '../assets/cromos/frente.png';
        }
    };

    const getBackImageByHouse = (house) => {
        switch (house) {
            case 'Gryffindor':
                return '../assets/cromos/grif-d.png';
            case 'Slytherin':
                return '../assets/cromos/slit-d.png';
            case 'Hufflepuff':
                return '../assets/cromos/huff-d.png';
            case 'Ravenclaw':
                return '../assets/cromos/rev-d.png';
            default:
                return '../assets/cromos/dorso.png';
        }
    };

    const showCharacters = () => {
        characterGrid.innerHTML = '';

        filteredCharacters.forEach(character => {
            const card = document.createElement('div');
            card.className = 'card';

            const cardInner = document.createElement('div');
            cardInner.className = 'card-inner';

            // Frente
            const cardFront = document.createElement('div');
            cardFront.className = 'card-front';
            const frontImg = document.createElement('img');
            frontImg.src = getFrontImageByHouse(character.house);
            frontImg.style.backgroundImage = `url(${character.image || 'placeholder.jpg'})`;

            const frontTextOverlay = document.createElement('div');
            frontTextOverlay.className = 'text-overlay';
            frontTextOverlay.textContent = character.name;

            cardFront.appendChild(frontImg);
            cardFront.appendChild(frontTextOverlay);

            // Dorso
            const cardBack = document.createElement('div');
            cardBack.className = 'card-back';
            const backImg = document.createElement('img');
            backImg.src = getBackImageByHouse(character.house);
            backImg.style.backgroundImage = `url(${character.image || 'placeholder.jpg'})`;

            const backTextOverlay = document.createElement('div');
            backTextOverlay.className = 'text-overlay';
            backTextOverlay.textContent = character.name;

            const details = document.createElement('div');
            details.className = 'details';

            if (character.ancestry) {
                const ancestry = document.createElement('p');
                ancestry.innerHTML = `<strong>Ancestry:</strong> ${character.ancestry}`;
                details.appendChild(ancestry);
            }
            if (character.dateOfBirth) {
                const dateOfBirth = document.createElement('p');
                dateOfBirth.innerHTML = `<strong>Date of Birth:</strong> ${character.dateOfBirth}`;
                details.appendChild(dateOfBirth);
            }
            if (character.house) {
                const house = document.createElement('p');
                house.innerHTML = `<strong>House:</strong> ${character.house}`;
                details.appendChild(house);
            }
            if (character.patronus) {
                const patronus = document.createElement('p');
                patronus.innerHTML = `<strong>Patronus:</strong> ${character.patronus}`;
                details.appendChild(patronus);
            }

            cardBack.appendChild(backImg);
            cardBack.appendChild(backTextOverlay);
            cardBack.appendChild(details);

            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            card.appendChild(cardInner);
            characterGrid.appendChild(card);
        });
    };

    houseFilter.addEventListener('click', (event) => {
        if (event.target.classList.contains('house-icon')) {
            const selectedHouse = event.target.getAttribute('data-house');
            if (selectedHouse === 'All') {
                filteredCharacters = charactersWithImages.slice(0, 30);
            } else {
                filteredCharacters = charactersWithImages.filter(character => character.house === selectedHouse);
            }
            showCharacters();
        }
    });

    showCharacters();

});
