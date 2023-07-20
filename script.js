const apiUrl = 'https://emojihub.yurace.pro/api/all';

const mockApiResponse = [
  {
    name: 'Smiling Face',
    category: 'smileys',
    group: 'face',
    htmlCode: '&#x1F604;',
  },
  {
    name: 'Dog',
    category: 'animals',
    group: 'animal',
    htmlCode: '&#x1F436;',
  },
  {
    name: 'Pizza',
    category: 'food',
    group: 'food',
    htmlCode: '&#x1F355;',
  },
  {
    name: 'Airplane',
    category: 'travel',
    group: 'travel',
    htmlCode: '&#x2708;',
  },
  {
    name: 'Basketball',
    category: 'activities',
    group: 'activity',
    htmlCode: '&#x1F3C0;',
  },
  {
    name: 'Guitar',
    category: 'objects',
    group: 'musical_instrument',
    htmlCode: '&#x1F3B8;',
  },
  {
    name: 'Heart',
    category: 'symbols',
    group: 'heart',
    htmlCode: '&#x2764;',
  },
  {
    name: 'Flag: United States',
    category: 'flags',
    group: 'flag',
    htmlCode: '&#x1F1FA;&#x1F1F8;',
  },
  {
    name: 'Thinking Face',
    category: 'smileys',
    group: 'face',
    htmlCode: '&#x1F914;',
  },
  {
    name: 'Elephant',
    category: 'animals',
    group: 'animal',
    htmlCode: '&#x1F418;',
  },
  {
    name: 'Cake',
    category: 'food',
    group: 'food',
    htmlCode: '&#x1F370;',
  },
  {
    name: 'Rocket',
    category: 'travel',
    group: 'travel',
    htmlCode: '&#x1F680;',
  },
  {
    name: 'Soccer Ball',
    category: 'activities',
    group: 'activity',
    htmlCode: '&#x26BD;',
  },
  {
    name: 'Camera',
    category: 'objects',
    group: 'object',
    htmlCode: '&#x1F4F7;',
  },
  {
    name: 'Sun',
    category: 'symbols',
    group: 'sky_weather',
    htmlCode: '&#x2600;',
  },
  {
    name: 'Flag: Japan',
    category: 'flags',
    group: 'flag',
    htmlCode: '&#x1F1EF;&#x1F1F5;',
  },
];

let currentPage = 1;
const emojisPerPage = 10;

function displayEmojis(emojis) {
  const emojiContainer = document.getElementById('emoji-container');
  emojiContainer.innerHTML = '';

  emojis.forEach((emoji) => {
    const emojiCard = document.createElement('div');
    emojiCard.classList.add('emoji-card');
    emojiCard.innerHTML = `<span>${emoji.htmlCode}</span>
                           <p>Name: ${emoji.name}</p>
                           <p>Category: ${emoji.category}</p>
                           <p>Group: ${emoji.group}</p>`;

    emojiContainer.appendChild(emojiCard);
  });
}

function filterByCategory(emojis, category) {
  if (category === 'all') {
    return emojis;
  } else {
    return emojis.filter((emoji) => emoji.category === category);
  }
}

function paginateEmojis(emojis, page) {
  const startIndex = (page - 1) * emojisPerPage;
  return emojis.slice(startIndex, startIndex + emojisPerPage);
}

function updatePaginationButtons(totalPages) {
  const prevButton = document.getElementById('prev-btn');
  const nextButton = document.getElementById('next-btn');
  const pageNumber = document.getElementById('page-number');

  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;

  pageNumber.textContent = `Page ${currentPage}`;
}

async function fetchEmojis() {
  try {
    const emojis = mockApiResponse;

    const categoryFilter = document.getElementById('category-select');
    const selectedCategory = categoryFilter.value;
    const filteredEmojis = filterByCategory(emojis, selectedCategory);
    const totalPages = Math.ceil(filteredEmojis.length / emojisPerPage);

    currentPage = 1;
    displayEmojis(paginateEmojis(filteredEmojis, currentPage));
    updatePaginationButtons(totalPages);

    categoryFilter.addEventListener('change', () => {
      const selectedCategory = categoryFilter.value;
      const filteredEmojis = filterByCategory(emojis, selectedCategory);
      const totalPages = Math.ceil(filteredEmojis.length / emojisPerPage);

      currentPage = 1;
      displayEmojis(paginateEmojis(filteredEmojis, currentPage));
      updatePaginationButtons(totalPages);
    });

    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');

    prevButton.addEventListener('click', () => {
      currentPage--;
      displayEmojis(paginateEmojis(filteredEmojis, currentPage));
      updatePaginationButtons(totalPages);
    });

    nextButton.addEventListener('click', () => {
      currentPage++;
      displayEmojis(paginateEmojis(filteredEmojis, currentPage));
      updatePaginationButtons(totalPages);
    });
  } catch (error) {
    console.error('Error fetching emojis:', error);
  }
}

fetchEmojis();
