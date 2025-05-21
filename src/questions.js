export const questions = {
  easy: [
    {
      type: 'match-flag',
      question: 'Match the flag to the country',
      pairs: [
        { flag: '🇴🇲', country: 'Oman' },
        { flag: '🇫🇷', country: 'France' },
        { flag: '🇯🇵', country: 'Japan' },
        { flag: '🇮🇳', country: 'India' },
      ],
    },
    {
      type: 'match-image',
      question: 'Match the famous place to the country',
      pairs: [
        { image: '🗼', place: 'Eiffel Tower', country: 'France' },
        { image: '🕌', place: 'Sultan Qaboos Grand Mosque', country: 'Oman' },
        { image: '🗽', place: 'Statue of Liberty', country: 'USA' },
        { image: '🐪', place: 'Desert Dunes', country: 'Arabia' },
      ],
    },
    {
      type: 'fill-blank',
      question: 'The capital of Oman is ______.',
      answer: 'Muscat',
    },
    {
      type: 'multiple-choice',
      question: 'Which of these is a continent?',
      options: ['Africa', 'Pacific', 'London', 'Amazon'],
      answer: 'Africa',
    },
    {
      type: 'drag-drop',
      question: 'Drag and drop oceans on the world map',
      items: ['Indian', 'Atlantic', 'Pacific'],
      map: 'oceans',
    },
    {
      type: 'true-false',
      question: 'Oman is in Asia.',
      answer: true,
    },
    {
      type: 'multiple-choice',
      question: 'Choose the correct flag for USA',
      options: ['🇴🇲', '🇸🇦', '🇦🇪', '🇺🇸'],
      answer: '🇺🇸',
    },
    {
      type: 'match',
      question: 'Match city to country',
      pairs: [
        { city: 'Muscat', country: 'Oman' },
        { city: 'Tokyo', country: 'Japan' },
        { city: 'Cairo', country: 'Egypt' },
        { city: 'Paris', country: 'France' },
      ],
    },
    {
      type: 'drag-drop',
      question: 'Drag continents into correct place on map outline',
      items: ['Africa', 'Asia', 'Europe'],
      map: 'continents',
    },
    {
      type: 'drag-drop',
      question: 'Label compass directions',
      items: ['North', 'South', 'East', 'West'],
      map: 'compass',
    },
  ],
  medium: [
    {
      type: 'multiple-choice',
      question: 'What is the capital of Japan?',
      options: ['Beijing', 'Tokyo', 'Seoul', 'Osaka'],
      answer: 'Tokyo',
    },
    {
      type: 'multiple-choice',
      question: 'Which of these is NOT a continent?',
      options: ['Europe', 'Antarctica', 'Canada', 'Asia'],
      answer: 'Canada',
    },
    {
      type: 'multiple-choice',
      question: 'Which country is in South America?',
      options: ['Kenya', 'Brazil', 'Spain', 'Thailand'],
      answer: 'Brazil',
    },
    {
      type: 'multiple-choice',
      question: 'Which direction is opposite of West on a compass?',
      options: ['East', 'South', 'North', 'Southeast'],
      answer: 'East',
    },
    {
      type: 'match',
      question: 'Match the river to the country it flows through',
      pairs: [
        { river: 'Nile', country: 'Egypt' },
        { river: 'Amazon', country: 'Brazil' },
        { river: 'Thames', country: 'United Kingdom' },
        { river: 'Ganges', country: 'India' },
      ],
    },
    {
      type: 'match',
      question: 'Match the landmark to the city',
      pairs: [
        { landmark: 'Eiffel Tower', city: 'Paris' },
        { landmark: 'Burj Khalifa', city: 'Dubai' },
        { landmark: 'Big Ben', city: 'London' },
        { landmark: 'Opera House', city: 'Sydney' },
      ],
    },
    {
      type: 'fill-blank',
      question: 'The country shaped like a boot is ______.',
      answer: 'Italy',
    },
    {
      type: 'fill-blank',
      question: '______ is the only continent that is also a country.',
      answer: 'Australia',
    },
    {
      type: 'fill-blank',
      question: 'The city of Nairobi is in the country of ______.',
      answer: 'Kenya',
    },
    {
      type: 'fill-blank',
      question: 'The ______ Ocean is between Africa and Australia.',
      answer: 'Indian',
    },
    {
      type: 'true-false',
      question: 'The equator passes through Africa.',
      answer: true,
    },
    {
      type: 'true-false',
      question: 'Canada is in the continent of Europe.',
      answer: false,
    },
    {
      type: 'true-false',
      question: 'The Pacific Ocean is the smallest ocean.',
      answer: false,
    },
    {
      type: 'true-false',
      question: 'Tokyo is in China.',
      answer: false,
    },
    {
      type: 'true-false',
      question: 'Europe and Asia are connected.',
      answer: true,
    },
    {
      type: 'drag-drop',
      question: 'Label these continents on a world map outline',
      items: ['North America', 'South America', 'Africa', 'Antarctica'],
      map: 'continents',
    },
    {
      type: 'match',
      question: 'Drag cities to their country',
      pairs: [
        { city: 'Madrid', country: 'Spain' },
        { city: 'Cairo', country: 'Egypt' },
        { city: 'New Delhi', country: 'India' },
        { city: 'Seoul', country: 'South Korea' },
      ],
    },
    {
      type: 'drag-drop',
      question: 'Place compass directions correctly around a globe image',
      items: ['North', 'South', 'East', 'West'],
      map: 'compass',
    },
  ],
  hard: [
    {
      type: 'multiple-choice',
      question: 'Which country is made of islands?',
      options: ['Oman', 'France', 'Japan', 'Egypt'],
      answer: 'Japan',
    },
    {
      type: 'match',
      question: 'Match country to language spoken',
      pairs: [
        { country: 'Egypt', language: 'Arabic' },
        { country: 'Spain', language: 'Spanish' },
        { country: 'China', language: 'Chinese (Mandarin)' },
        { country: 'France', language: 'French' },
      ],
    },
    {
      type: 'match',
      question: 'Match famous places to continent',
      pairs: [
        { place: 'Pyramids', continent: 'Africa' },
        { place: 'Eiffel Tower', continent: 'Europe' },
        { place: 'Great Wall', continent: 'Asia' },
        { place: 'Sydney Opera House', continent: 'Australia' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'Which one is NOT a continent?',
      options: ['Europe', 'Asia', 'Africa', 'China'],
      answer: 'China',
    },
    {
      type: 'multiple-choice',
      question: 'Which landmark is in London?',
      options: ['Blue Mosque', 'Taj Mahal', 'Big Ben', 'Christ the Redeemer'],
      answer: 'Big Ben',
    },
    {
      type: 'fill-blank',
      question: 'The longest river in the world is the ______.',
      answer: 'Nile',
    },
    {
      type: 'multiple-choice',
      question: 'Which country is known for the ancient city of Petra?',
      options: ['Greece', 'Jordan', 'Italy', 'Mexico'],
      answer: 'Jordan',
    },
    {
      type: 'true-false',
      question: 'The Sahara Desert is located in South America.',
      answer: false,
    },
    {
      type: 'multiple-choice',
      question: 'Which country spans 12 time zones?',
      options: ['China', 'Russia', 'Canada', 'USA'],
      answer: 'Russia',
    },
    {
      type: 'fill-blank',
      question: 'Which country is the world\'s largest exporter of coffee?',
      answer: 'Brazil',
    },
    {
      type: 'multiple-choice',
      question: 'Which country is landlocked?',
      options: ['Brazil', 'Mongolia', 'Italy', 'Japan'],
      answer: 'Mongolia',
    },
    {
      type: 'multiple-choice',
      question: 'Which country is NOT in the Middle East?',
      options: ['Iran', 'Turkey', 'Pakistan', 'Saudi Arabia'],
      answer: 'Pakistan',
    },
  ],
}; 