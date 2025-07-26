
import type { MCQ, LawFlashcard, Reel } from './types';

// This is a placeholder content generator. In a real app, this might come from a database or a more complex system.
// For this prototype, we'll generate repetitive but uniquely identifiable content.

const keywords: Record<number, { events: string[], figures: string[], concepts: string[], places: string[] }> = {
    1: { events: ["Fall of Constantinople", "Invention of Printing Press"], figures: ["Leonardo da Vinci", "Copernicus", "Galileo"], concepts: ["Humanism", "Rationalism", "Scientific Method"], places: ["Florence", "Rome"] },
    2: { events: ["Discovery of the Americas", "Treaty of Tordesillas"], figures: ["Vasco da Gama", "Christopher Columbus"], concepts: ["Mercantilism", "Imperialism", "Slave Trade"], places: ["Goa", "Americas"] },
    3: { events: ["Battle of Plassey", "Battle of Buxar"], figures: ["Robert Clive", "Tipu Sultan"], concepts: ["Doctrine of Lapse", "Subsidiary Alliance"], places: ["Bengal", "Mysore"] },
    4: { events: ["First Anglo-Maratha War", "Third Anglo-Maratha War"], figures: ["Shivaji Maharaj", "Peshwa Bajirao I"], concepts: ["Chauth", "Sardeshmukhi", "Maratha Confederacy"], places: ["Pune", "Panipat"] },
    5: { events: ["Abolition of Sati", "Widow Remarriage Act"], figures: ["Raja Ram Mohan Roy", "Jyotiba Phule", "Savitribai Phule"], concepts: ["Brahmo Samaj", "Arya Samaj", "Satyashodhak Samaj"], places: ["Calcutta", "Maharashtra"] },
    6: { events: ["Revolt of 1857", "Non-Cooperation Movement", "Quit India Movement"], figures: ["Mahatma Gandhi", "Jawaharlal Nehru", "Subhas Chandra Bose"], concepts: ["Satyagraha", "Swadeshi", "Civil Disobedience"], places: ["Meerut", "Dandi"] },
    7: { events: ["Partition of India", "Integration of Princely States"], figures: ["Sardar Vallabhbhai Patel", "Lord Mountbatten"], concepts: ["Instrument of Accession", "Linguistic Reorganisation"], places: ["Hyderabad", "Kashmir"] },
    8: { events: ["Gallipoli Campaign", "Singapore Campaign"], figures: ["Indian soldiers in WW1", "INA soldiers"], concepts: ["Colonial contribution", "Strengthening of nationalism"], places: ["Mesopotamia", "Burma"] },
    9: { events: ["Bandung Conference", "Suez Crisis"], figures: ["Ho Chi Minh", "Kwame Nkrumah"], concepts: ["Non-Aligned Movement", "Third World", "Neocolonialism"], places: ["Vietnam", "Ghana"] },
    10: { events: ["Cuban Missile Crisis", "Vietnam War"], figures: ["John F. Kennedy", "Nikita Khrushchev"], concepts: ["Bipolar World", "NATO vs Warsaw Pact", "Arms Race"], places: ["Berlin", "Cuba"] },
    11: { events: ["First Five-Year Plan", "Indo-China War"], figures: ["Jawaharlal Nehru", "Dr. B.R. Ambedkar"], concepts: ["Mixed Economy", "Panchsheel", "Planned Development"], places: ["Bhakra Dam", "New Delhi"] },
    12: { events: ["Green Revolution", "Economic Liberalization 1991"], figures: ["Indira Gandhi", "P.V. Narasimha Rao"], concepts: ["Emergency", "Pokhran Nuclear Tests", "IT Revolution"], places: ["Punjab", "Bangalore"] },
};


export function generateContentForChapter(chapterId: number, chapterTitle: string, chapterSummary: string) {
    const chapterKeywords = keywords[chapterId] || { events: [], figures: [], concepts: [], places: [] };

    const mcqs: MCQ[] = Array.from({ length: 50 }, (_, i) => {
        const type = i % 4;
        let question = '';
        let correctAnswer = '';

        switch (type) {
            case 0:
                correctAnswer = chapterKeywords.figures[i % chapterKeywords.figures.length] || `Figure from ${chapterTitle}`;
                question = `Who was a prominent figure during the period of "${chapterTitle}"?`;
                break;
            case 1:
                correctAnswer = chapterKeywords.events[i % chapterKeywords.events.length] || `Event from ${chapterTitle}`;
                question = `Which of these events is associated with "${chapterTitle}"?`;
                break;
            case 2:
                correctAnswer = chapterKeywords.concepts[i % chapterKeywords.concepts.length] || `Concept from ${chapterTitle}`;
                question = `What is a key concept related to the historical context of "${chapterTitle}"?`;
                break;
            default:
                correctAnswer = chapterKeywords.places[i % chapterKeywords.places.length] || `Place from ${chapterTitle}`;
                question = `Which place was significant during the events of "${chapterTitle}"?`;
                break;
        }

        const options = [
            correctAnswer,
            `Unrelated option Alpha`,
            `Unrelated option Beta`,
            `Unrelated option Gamma`
        ].sort(() => Math.random() - 0.5);
        const correctAnswerIndex = options.indexOf(correctAnswer);

        return {
            id: `ch${chapterId}-mcq-${i + 1}`,
            topic: chapterTitle,
            question: `${question} (MCQ #${i + 1})`,
            options,
            correctAnswerIndex,
            explanation: `The correct answer is ${correctAnswer}. This is because of its direct relevance to the developments and themes discussed in "${chapterTitle}".`,
        };
    });

    const flashcards: LawFlashcard[] = Array.from({ length: 50 }, (_, i) => {
        const term = chapterKeywords.concepts[i % chapterKeywords.concepts.length] || `Key Term ${i + 1}`;
        return {
            id: `ch${chapterId}-fc-${i + 1}`,
            term: `${term} in ${chapterTitle}`,
            definition: `This is the detailed definition for ${term}, explaining its significance within the context of "${chapterTitle}". It represents a core idea from this historical period.`,
            topic: chapterTitle,
        };
    });

    const reels: Reel[] = Array.from({ length: 50 }, (_, i) => {
        const fact = chapterKeywords.events[i % chapterKeywords.events.length] || `An important event`;
        return {
            id: `ch${chapterId}-reel-${i + 1}`,
            title: `Quick Fact #${i + 1}: ${chapterTitle}`,
            content: `Did you know? ${fact} was a pivotal moment discussed in "${chapterTitle}".`,
            icon: 'BookOpenCheck',
        };
    });

    return {
        summary: chapterSummary,
        mcqs,
        flashcards,
        reels,
    };
}
