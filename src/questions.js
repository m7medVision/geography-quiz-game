export const questions = {
  asia: {
    easy: [
      {
        type: 'match-flag',
        question: 'Match the flag to the country',
        pairs: [
          { flag: '🇮🇳', country: 'India' },
          { flag: '🇯🇵', country: 'Japan' },
          { flag: '🇨🇳', country: 'China' },
          { flag: '🇰🇷', country: 'South Korea' },
        ],
      },
      {
        type: 'match-image',
        question: 'Match the famous place to the country',
        pairs: [
          { image: '🗼', place: 'Tokyo Tower', country: 'Japan' },
          { image: '🕌', place: 'Taj Mahal', country: 'India' },
          { image: '🏯', place: 'Forbidden City', country: 'China' },
          { image: '🐉', place: 'Dragon Gate', country: 'Taiwan' },
        ],
      },
      {
        type: 'fill-blank',
        question: 'The capital of Japan is ______.',
        answer: 'Tokyo',
      },
      {
        type: 'multiple-choice',
        question: 'Which of these Asian countries is an island nation?',
        options: ['India', 'Japan', 'China', 'Thailand'],
        answer: 'Japan',
      },
      {
        type: 'true-false',
        question: 'Mount Everest is located in China.',
        answer: false,
      },
    ],
    medium: [
      {
        type: 'multiple-choice',
        question: 'Which river is considered sacred in India?',
        options: ['Yangtze', 'Ganges', 'Mekong', 'Yellow River'],
        answer: 'Ganges',
      },
      {
        type: 'match',
        question: 'Match the city to its Asian country',
        pairs: [
          { city: 'Seoul', country: 'South Korea' },
          { city: 'Mumbai', country: 'India' },
          { city: 'Bangkok', country: 'Thailand' },
          { city: 'Beijing', country: 'China' },
        ],
      },
      {
        type: 'true-false',
        question: 'The Great Wall of China is visible from space with the naked eye.',
        answer: false,
      },
    ],
    hard: [
      {
        type: 'multiple-choice',
        question: 'Which Asian country has the most islands?',
        options: ['Japan', 'Philippines', 'Indonesia', 'Malaysia'],
        answer: 'Indonesia',
      },
      {
        type: 'fill-blank',
        question: 'The currency of Japan is called the ______.',
        answer: 'Yen',
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
        question: 'Match the flag to the European country',
        pairs: [
          { flag: '🇫🇷', country: 'France' },
          { flag: '🇩🇪', country: 'Germany' },
          { flag: '🇮🇹', country: 'Italy' },
          { flag: '🇬🇧', country: 'United Kingdom' },
        ],
      },
      {
        type: 'multiple-choice',
        question: 'Which city is the capital of France?',
        options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
        answer: 'Paris',
      },
    ],
    medium: [
      {
        type: 'match',
        question: 'Match the landmark to the European city',
        pairs: [
          { landmark: 'Eiffel Tower', city: 'Paris' },
          { landmark: 'Big Ben', city: 'London' },
          { landmark: 'Colosseum', city: 'Rome' },
          { landmark: 'Sagrada Familia', city: 'Barcelona' },
        ],
      },
      {
        type: 'true-false',
        question: 'Switzerland is a member of the European Union.',
        answer: false,
      },
    ],
    hard: [
      {
        type: 'fill-blank',
        question: 'The country shaped like a boot is ______.',
        answer: 'Italy',
      },
      {
        type: 'multiple-choice',
        question: 'Which European mountain range separates Spain and France?',
        options: ['Alps', 'Pyrenees', 'Carpathians', 'Apennines'],
        answer: 'Pyrenees',
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
        type: 'multiple-choice',
        question: 'Which is the largest country by area in North America?',
        options: ['USA', 'Canada', 'Mexico', 'Cuba'],
        answer: 'Canada',
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
        type: 'true-false',
        question: 'Brazil is the largest country in South America.',
        answer: true,
      },
      {
        type: 'multiple-choice',
        question: 'Which of these is NOT a South American country?',
        options: ['Colombia', 'Panama', 'Peru', 'Uruguay'],
        answer: 'Panama',
      },
    ],
    medium: [
      {
        type: 'match',
        question: 'Match the famous site to its South American country',
        pairs: [
          { site: 'Machu Picchu', country: 'Peru' },
          { site: 'Christ the Redeemer', country: 'Brazil' },
          { site: 'Iguazu Falls', country: 'Argentina/Brazil' },
          { site: 'Galapagos Islands', country: 'Ecuador' },
        ],
      },
    ],
    hard: [
      {
        type: 'fill-blank',
        question: 'The highest mountain peak in South America is ______.',
        answer: 'Aconcagua',
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
        type: 'match',
        question: 'Match these Australian animals to their descriptions',
        pairs: [
          { animal: 'Kangaroo', description: 'Marsupial that hops' },
          { animal: 'Koala', description: 'Tree-dwelling marsupial' },
          { animal: 'Platypus', description: 'Egg-laying mammal' },
          { animal: 'Emu', description: 'Large flightless bird' },
        ],
      },
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