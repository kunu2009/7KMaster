
import type { Era, HistoricalFigure, HistoricalEvent, QuizQuestion } from './types';

export const historicalEras: Era[] = [
  {
    id: 'era-1',
    name: 'Ancient India',
    period: 'c. 2500 BC - c. 700 AD',
    description: 'Home to the Indus Valley Civilization, the rise of major religions like Hinduism, Buddhism, and Jainism, and powerful empires like the Mauryan and Gupta.',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'ancient india civilization'
  },
  {
    id: 'era-2',
    name: 'Medieval India',
    period: 'c. 700 AD - c. 1750 AD',
    description: 'Characterized by the rise of regional kingdoms, the establishment of the Delhi Sultanate, the powerful Mughal Empire, and the Vijayanagara Empire in the south.',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'mughal empire'
  },
  {
    id: 'era-3',
    name: 'Modern India',
    period: 'c. 1750 AD - Present',
    description: 'Marked by the arrival of European traders, the establishment of British colonial rule, the struggle for independence, and the emergence of India as a sovereign republic.',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'indian independence'
  },
];

export const historicalFigures: HistoricalFigure[] = [
  {
    id: 'fig-1',
    name: 'Chandragupta Maurya',
    era: 'Ancient India',
    description: 'Founder of the Mauryan Empire, he unified most of the Indian subcontinent into one state for the first time.',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'indian king sculpture'
  },
  {
    id: 'fig-2',
    name: 'Ashoka the Great',
    era: 'Ancient India',
    description: 'A Mauryan emperor who, after the bloody Kalinga War, embraced Buddhism and preached the concept of Dhamma (duty/righteousness).',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'ashoka pillar'
  },
  {
    id: 'fig-3',
    name: 'Akbar',
    era: 'Medieval India',
    description: 'The third Mughal emperor, known for his policy of religious tolerance, administrative reforms (Mansabdari system), and patronage of art and architecture.',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'mughal emperor painting'
  },
  {
    id: 'fig-4',
    name: 'Mahatma Gandhi',
    era: 'Modern India',
    description: 'The leader of the Indian independence movement against British rule. Employed nonviolent civil disobedience and inspired movements for civil rights and freedom across the world.',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'mahatma gandhi'
  },
  {
    id: 'fig-5',
    name: 'Jawaharlal Nehru',
    era: 'Modern India',
    description: 'The first Prime Minister of India, a central figure in Indian politics before and after independence. He was a principal author of India\'s foreign policy.',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'jawaharlal nehru'
  },
  {
    id: 'fig-6',
    name: 'Shivaji Maharaj',
    era: 'Medieval India',
    description: 'Founder of the Maratha Empire. He is revered for his military prowess, administrative skills, and for challenging the Mughal authority.',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'maratha warrior'
  }
];

export const historicalEvents: HistoricalEvent[] = [
  {
    id: 'evt-1',
    name: 'Battle of Kalinga',
    era: 'Ancient India',
    date: 'c. 261 BC',
    description: 'A war fought between the Mauryan Empire under Ashoka and the state of Kalinga. The immense bloodshed led to Ashoka\'s conversion to Buddhism.',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'ancient indian war'
  },
  {
    id: 'evt-2',
    name: 'First Battle of Panipat',
    era: 'Medieval India',
    date: '1526 AD',
    description: 'Fought between Babur and Ibrahim Lodi. It marked the beginning of the Mughal Empire in India.',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'mughal battle'
  },
  {
    id: 'evt-3',
    name: 'Revolt of 1857',
    era: 'Modern India',
    date: '1857-1858 AD',
    description: 'A major, but ultimately unsuccessful, uprising against the rule of the British East India Company. It led to the direct rule of India by the British Crown.',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'indian sepoy rebellion'
  },
  {
    id: 'evt-4',
    name: 'Dandi March (Salt March)',
    era: 'Modern India',
    date: '1930 AD',
    description: 'An act of nonviolent civil disobedience led by Mahatma Gandhi to protest the British salt tax, which became a pivotal moment in the independence movement.',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'gandhi salt march'
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'quiz-1',
    question: 'Who founded the Mauryan Empire?',
    options: ['Ashoka', 'Bindusara', 'Chandragupta Maurya', 'Kautilya'],
    correctAnswer: 'Chandragupta Maurya',
    era: 'Ancient India'
  },
  {
    id: 'quiz-2',
    question: 'The First Battle of Panipat in 1526 led to the establishment of which empire?',
    options: ['Delhi Sultanate', 'Maratha Empire', 'Gupta Empire', 'Mughal Empire'],
    correctAnswer: 'Mughal Empire',
    era: 'Medieval India'
  },
  {
    id: 'quiz-3',
    question: 'The Dandi March was a protest against the tax on what commodity?',
    options: ['Cotton', 'Salt', 'Indigo', 'Spices'],
    correctAnswer: 'Salt',
    era: 'Modern India'
  },
  {
    id: 'quiz-4',
    question: 'Which Mauryan emperor embraced Buddhism after the Kalinga War?',
    options: ['Chandragupta Maurya', 'Bindusara', 'Ashoka the Great', 'Dasaratha Maurya'],
    correctAnswer: 'Ashoka the Great',
    era: 'Ancient India'
  },
  {
    id: 'quiz-5',
    question: 'The "Doctrine of Lapse" was a policy of annexation followed by:',
    options: ['Lord Curzon', 'Lord Dalhousie', 'Lord Wellesley', 'Robert Clive'],
    correctAnswer: 'Lord Dalhousie',
    era: 'Modern India'
  }
];
