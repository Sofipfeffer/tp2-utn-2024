document.addEventListener('DOMContentLoaded', async () => {
    const characterGrid = document.getElementById('character-grid');
    const response = await fetch('https://hp-api.onrender.com/api/characters');
    const characters = await response.json();
    const topCharacters = characters.slice(0, 16);

    topCharacters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'card';

        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';

        // Front of the card
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        const frontImg = document.createElement('img');
        frontImg.src = '../assets/frente.png';  // Reemplaza con una imagen predeterminada transparente o cualquier otra
        frontImg.style.backgroundImage = `url(${character.image || 'placeholder.jpg'})`;

        const frontTextOverlay = document.createElement('div');
        frontTextOverlay.className = 'text-overlay';
        frontTextOverlay.textContent = character.name;

        cardFront.appendChild(frontImg);
        cardFront.appendChild(frontTextOverlay);

        // Back of the card
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        const backImg = document.createElement('img');
        backImg.src = '../assets/dorso.png';  // Reemplaza con una imagen predeterminada transparente o cualquier otra
        backImg.style.backgroundImage = `url(${character.image || 'placeholder.jpg'})`;

        const backTextOverlay = document.createElement('div');
        backTextOverlay.className = 'text-overlay';
        backTextOverlay.textContent = character.name;

        const details = document.createElement('div');
        details.className = 'details';
        details.innerHTML = `
           <p><strong>Ancestry:</strong> ${character.ancestry}</p>
           <p><strong>Date of Birth:</strong> ${character.dateOfBirth}</p>
           <p><strong>House:</strong> ${character.house}</p>
       `;

        cardBack.appendChild(backImg);
        cardBack.appendChild(backTextOverlay);
        cardBack.appendChild(details);

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        characterGrid.appendChild(card);
    });
});