export const questions = {
  asia: {
    easy: [
      {
        type: 'true-false',
        question: 'Jerusalem is the capital of Palestine.',
        answer: true,
      },
      {
        type: 'match-flag',
        question: 'Match the flag to the country',
        pairs: [
          { flag: '🇴🇲', country: 'Oman' },
          { flag: '🇮🇳', country: 'India' },
          { flag: '🇸🇦', country: 'Saudi Arabia' },
          { flag: '🇯🇵', country: 'Japan' },
          { flag: '🇨🇳', country: 'China' },
        ],
      },
      {
        type: 'match-image',
        question: 'Match the famous place to the country',
        pairs: [
          { image: 'https://images.unsplash.com/photo-1596891347912-212c389463b9?q=80&w=2107&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', place: 'Sultan Qaboos Grand Mosque', country: 'Oman' },
          { image: 'https://plus.unsplash.com/premium_photo-1661964177687-57387c2cbd14?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', place: 'Mount Fuji', country: 'Japan' },
          { image: 'https://images.unsplash.com/photo-1583759604327-f9dcd23499d5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', place: 'Burj Khalifa', country: 'United Arab Emirates' },
          { image: 'https://images.unsplash.com/photo-1608037521277-154cd1b89191?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', place: 'Great Wall of China', country: 'China' },
        ],
      },
    ],
    medium: [
      {
        type: 'match',
        question: 'Match the city to its country',
        pairs: [
          { city: 'Muscat', country: 'Oman' },
          { city: 'Doha', country: 'Qatar' },
          { city: 'Tokyo', country: 'Japan' },
          { city: 'Beijing', country: 'China' },
        ],
      },
    ],
    hard: [
      {
        type: 'fill-blank',
        question: 'The official language spoken in Saudi Arabia is ______.',
        answer: 'Arabic',
      },
    ],
  },
  
  africa: {
    easy: [
      {
        type: 'multiple-choice',
        question: 'Which of these is the largest country in Africa by area?',
        options: ['Egypt', 'Nigeria', 'Algeria', 'South Africa'],
        answer: 'Algeria',
      },
      {
        type: 'true-false',
        question: 'The Nile is the longest river in the world.',
        answer: true,
      },
      {
        type: 'match',
        question: 'Match the capital city to its African country',
        pairs: [
          { city: 'Cairo', country: 'Egypt' },
          { city: 'Nairobi', country: 'Kenya' },
          { city: 'Lagos', country: 'Nigeria' },
          { city: 'Cape Town', country: 'South Africa' },
        ],
      },
    ],
    medium: [
      {
        type: 'fill-blank',
        question: 'The ______ Desert is the largest hot desert in the world.',
        answer: 'Sahara',
      },
      {
        type: 'multiple-choice',
        question: 'Which African country was never colonized by Europeans?',
        options: ['Kenya', 'Egypt', 'Ethiopia', 'Nigeria'],
        answer: 'Ethiopia',
      },
    ],
    hard: [
      {
        type: 'match',
        question: 'Match the landmark to its African country',
        pairs: [
          { landmark: 'Pyramids of Giza', country: 'Egypt' },
          { landmark: 'Victoria Falls', country: 'Zimbabwe/Zambia' },
          { landmark: 'Mount Kilimanjaro', country: 'Tanzania' },
          { landmark: 'Table Mountain', country: 'South Africa' },
        ],
      },
    ],
  },
  
  europe: {
    easy: [
      {
        type: 'match-flag',
        question: 'Match the flag to the country',
        pairs: [
          { flag: '🇫🇷', country: 'France' },
          { flag: '🇮🇹', country: 'Italy' },
          { flag: '🇪🇸', country: 'Spain' },
          { flag: '🇩🇪', country: 'Germany' },
          { flag: '🇬🇧', country: 'United Kingdom' },
        ],
      },
      {
        type: 'match-image',
        question: 'Match the famous place to the country',
        pairs: [
          { image: 'https://images.unsplash.com/photo-1570097703229-b195d6dd291f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RWlmZmVsJTIwVG93ZXJ8ZW58MHx8MHx8fDA%3D', place: 'Eiffel Tower', country: 'France' },
          { image: 'https://images.unsplash.com/photo-1534313314376-a72289b6181e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', place: 'Neuschwanstein Castle', country: 'Germany' },
          { image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q29sb3NzZXVtfGVufDB8fDB8fHww', place: 'Colosseum', country: 'Italy' },
          { image: 'https://plus.unsplash.com/premium_photo-1661962345279-4d1d7a98409a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UGFydGhlbm9ufGVufDB8fDB8fHww', place: 'Parthenon', country: 'Greece' },
        ],
      },
      {
        type: 'fill-blank',
        question: 'The capital city of France is ______.',
        answer: 'Paris',
      },
      {
        type: 'multiple-choice',
        question: 'Which of these is a country in Europe?',
        options: ['Spain', 'China', 'Egypt', 'Canada'],
        answer: 'Spain',
      },
    ],
    medium: [
      {
        type: 'true-false',
        question: 'Germany and Italy are both in the continent of Europe.',
        answer: true,
      },
      {
        type: 'multiple-choice',
        question: 'What is the capital of Germany?',
        options: ['Berlin', 'Muscat', 'London'],
        answer: 'Berlin',
      },
    ],
    hard: [
      {
        type: 'multiple-choice',
        question: 'What is the largest country in Europe?',
        options: ['Russia', 'France', 'Germany'],
        answer: 'Russia',
      },
    ],
  },
  
  northAmerica: {
    easy: [
      {
        type: 'match',
        question: 'Match the city to its North American country',
        pairs: [
          { city: 'New York', country: 'USA' },
          { city: 'Toronto', country: 'Canada' },
          { city: 'Mexico City', country: 'Mexico' },
          { city: 'Havana', country: 'Cuba' },
        ],
      },
      {
        type: 'true-false',
        question: 'The United States is the largest country by population in North America.',
        answer: true,
      },
    ],
    medium: [
      {
        type: 'true-false',
        question: 'The Grand Canyon is located in California.',
        answer: false,
      },
      {
        type: 'fill-blank',
        question: 'The ______ Falls are located on the border between the USA and Canada.',
        answer: 'Niagara',
      },
    ],
    hard: [
      {
        type: 'multiple-choice',
        question: 'Which US state is NOT on the mainland of North America?',
        options: ['California', 'Texas', 'Hawaii', 'Florida'],
        answer: 'Hawaii',
      },
    ],
  },
  
  southAmerica: {
    easy: [
      {
        type: 'multiple-choice',
        question: 'Which is the largest country in South America?',
        options: ['Argentina', 'Colombia', 'Brazil', 'Peru'],
        answer: 'Brazil',
      },
      {
        type: 'fill-blank',
        question: 'The ______ Rainforest is the largest rainforest in the world.',
        answer: 'Amazon',
      },
      {
        type: 'true-false',
        question: 'The Andes Mountains are in Europe.',
        answer: false,
      },
    ],
    medium: [
      {
        type: 'match',
        question: 'Match each country to its capital city',
        pairs: [
          { country: 'Brazil', city: 'Brasília' },
          { country: 'Peru', city: 'Lima' },
          { country: 'Argentina', city: 'Buenos Aires' },
          { country: 'Chile', city: 'Santiago' },
        ],
      },
    ],
    hard: [
      {
        type: 'match',
        question: 'Sort these into "Natural" or "Man-made"',
        pairs: [
          { feature: 'Amazon River', category: 'Natural' },
          { feature: 'Christ the Redeemer', category: 'Man-made' },
          { feature: 'Andes Mountains', category: 'Natural' },
          { feature: 'Machu Picchu', category: 'Man-made' },
        ],
      },
      {
        type: 'multiple-choice',
        question: 'I speak Portuguese, I\'m the biggest in South America, and my capital is Brasília. Who am I?',
        options: ['Peru', 'Argentina', 'Brazil', 'Venezuela'],
        answer: 'Brazil',
      },
    ],
  },
  
  australia: {
    easy: [
      {
        type: 'multiple-choice',
        question: 'Which city is the capital of Australia?',
        options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
        answer: 'Canberra',
      },
      {
        type: 'true-false',
        question: 'Australia is both a continent and a country.',
        answer: true,
      },
    ],
    medium: [
      {
        type: 'multiple-choice',
        question: 'Which of these facts is NOT true about Australia?',
        options: [
          '🇦🇺 Australia is both a country and a continent',
          '🐍 Australia has more snakes than people',
          '🌏 The Great Barrier Reef is found in Australia',
          '🐑 Australia has more sheep than people'
        ],
        answer: '🐍 Australia has more snakes than people',
      }

    ],
    hard: [
      {
        type: 'fill-blank',
        question: 'The Great ______ Reef is the world\'s largest coral reef system.',
        answer: 'Barrier',
      },
    ],
  },
  
  antarctica: {
    easy: [
      {
        type: 'true-false',
        question: 'Antarctica is the coldest continent on Earth.',
        answer: true,
      },
    ],
    medium: [
      {
        type: 'multiple-choice',
        question: 'What is the approximate area of Antarctica?',
        options: ['5 million sq km', '10 million sq km', '14 million sq km', '20 million sq km'],
        answer: '14 million sq km',
      },
    ],
    hard: [
      {
        type: 'true-false',
        question: 'There are permanent human settlements in Antarctica with indigenous populations.',
        answer: false,
      },
    ],
  },
}; 