
import type { ItihasChapter } from './types';
import { generateContentForChapter } from './itihas-content-generator';

const chapterDetails = [
  { id: 1, title: 'Renaissance in Europe and Development of Science', description: 'The intellectual and cultural rebirth of Europe.' },
  { id: 2, title: 'European Colonialism', description: 'The expansion of European powers across the globe.' },
  { id: 3, title: 'India and European Colonialism', description: 'The impact of colonial rule on the Indian subcontinent.' },
  { id: 4, title: 'Colonialism and the Marathas', description: 'The Maratha Empire\'s struggle against colonial forces.' },
  { id: 5, title: 'India: Social and Religious Reforms', description: 'Movements that reshaped Indian society in the 19th century.' },
  { id: 6, title: 'Indian Struggle Against Colonialism', description: 'The long and varied fight for freedom from British rule.' },
  { id: 7, title: 'Decolonisation to Political Integration of India', description: 'The process of becoming a unified, independent nation.' },
  { id: 8, title: 'World Wars and India', description: 'India\'s role and the impact of the two World Wars.' },
  { id: 9, title: 'World: Decolonisation', description: 'The global trend of decolonisation in Asia and Africa.' },
  { id: 10, title: 'Cold War', description: 'The ideological and political rivalry between the USA and the USSR.' },
  { id: 11, title: 'India Transformed – Part 1', description: 'Key developments in post-independence India.' },
  { id: 12, title: 'India Transformed – Part 2', description: 'Continuing the story of modern India\'s transformation.' },
];

export const itihasChapters: ItihasChapter[] = chapterDetails.map(chapter => ({
  id: chapter.id,
  title: chapter.title,
  description: chapter.description,
  ...generateContentForChapter(chapter.id, chapter.title)
}));
