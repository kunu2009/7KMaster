
import type { MCQ, LawFlashcard, Reel } from './types';

// This is a placeholder content generator. In a real app, this might come from a database or a more complex system.
// For this prototype, we'll generate repetitive but uniquely identifiable content.

const keywords: Record<number, { events: string[], figures: string[], concepts: string[], places: string[] }> = {
    1: { events: ["Fall of Constantinople", "Invention of Printing Press", "Medici Family Patronage", "Council of Florence"], figures: ["Leonardo da Vinci", "Copernicus", "Galileo Galilei", "Martin Luther", "Michelangelo"], concepts: ["Humanism", "Rationalism", "Scientific Method", "Protestant Reformation", "Perspective in art"], places: ["Florence", "Rome", "Venice", "Wittenberg"] },
    2: { events: ["Discovery of the Americas", "Treaty of Tordesillas", "Vasco da Gama reaches India", "Conquest of the Aztec Empire"], figures: ["Vasco da Gama", "Christopher Columbus", "Ferdinand Magellan", "Hernán Cortés"], concepts: ["Mercantilism", "Imperialism", "Slave Trade", "Columbian Exchange", "Triangular Trade"], places: ["Goa", "Americas", "Cape of Good Hope", "Spice Islands"] },
    3: { events: ["Battle of Plassey", "Battle of Buxar", "Establishment of East India Company", "Regulating Act of 1773"], figures: ["Robert Clive", "Tipu Sultan", "Mir Jafar", "Warren Hastings"], concepts: ["Doctrine of Lapse", "Subsidiary Alliance", "Permanent Settlement", "Diwani Rights"], places: ["Bengal", "Mysore", "Calcutta", "Surat"] },
    4: { events: ["First Anglo-Maratha War", "Third Anglo-Maratha War", "Treaty of Salbai", "Treaty of Bassein"], figures: ["Shivaji Maharaj", "Peshwa Bajirao I", "Mahadji Scindia", "Nana Phadnavis"], concepts: ["Chauth", "Sardeshmukhi", "Maratha Confederacy", "Ashta Pradhan Mandal"], places: ["Pune", "Panipat", "Raigad", "Delhi"] },
    5: { events: ["Abolition of Sati", "Widow Remarriage Act", "Female Infanticide Prevention Act", "Formation of Prarthana Samaj"], figures: ["Raja Ram Mohan Roy", "Jyotiba Phule", "Savitribai Phule", "Swami Dayananda Saraswati"], concepts: ["Brahmo Samaj", "Arya Samaj", "Satyashodhak Samaj", "Western Education"], places: ["Calcutta", "Maharashtra", "Punjab", "Pune"] },
    6: { events: ["Revolt of 1857", "Non-Cooperation Movement", "Quit India Movement", "Jallianwala Bagh massacre", "Dandi March"], figures: ["Mahatma Gandhi", "Jawaharlal Nehru", "Subhas Chandra Bose", "Bhagat Singh", "Rani Lakshmibai"], concepts: ["Satyagraha", "Swadeshi", "Civil Disobedience", "Purna Swaraj"], places: ["Meerut", "Dandi", "Amritsar", "Chauri Chaura"] },
    7: { events: ["Partition of India", "Integration of Princely States", "Formation of the Constituent Assembly", "Operation Polo"], figures: ["Sardar Vallabhbhai Patel", "Lord Mountbatten", "Jawaharlal Nehru", "Muhammad Ali Jinnah"], concepts: ["Instrument of Accession", "Linguistic Reorganisation", "Two-Nation Theory", "Standstill Agreement"], places: ["Hyderabad", "Kashmir", "Junagadh", "New Delhi"] },
    8: { events: ["Gallipoli Campaign", "Singapore Campaign", "Mesopotamian Campaign", "Formation of the Indian National Army (INA)"], figures: ["Indian soldiers in WW1", "INA soldiers", "Mahatma Gandhi", "Subhas Chandra Bose"], concepts: ["Colonial contribution", "Strengthening of nationalism", "Khilafat Movement", "Montagu-Chelmsford Reforms"], places: ["Mesopotamia", "Burma", "France", "East Africa"] },
    9: { events: ["Bandung Conference", "Suez Crisis", "Ghanaian Independence", "Indonesian War of Independence"], figures: ["Ho Chi Minh", "Kwame Nkrumah", "Sukarno", "Gamal Abdel Nasser"], concepts: ["Non-Aligned Movement", "Third World", "Neocolonialism", "Pan-Africanism"], places: ["Vietnam", "Ghana", "Egypt", "Indonesia"] },
    10: { events: ["Cuban Missile Crisis", "Vietnam War", "Berlin Wall construction", "Korean War", "Soviet invasion of Afghanistan"], figures: ["John F. Kennedy", "Nikita Khrushchev", "Fidel Castro", "Mao Zedong"], concepts: ["Bipolar World", "NATO vs Warsaw Pact", "Arms Race", "Iron Curtain", "Containment"], places: ["Berlin", "Cuba", "Korea", "Afghanistan"] },
    11: { events: ["First Five-Year Plan", "Indo-China War of 1962", "Adoption of the Constitution", "States Reorganisation Act, 1956"], figures: ["Jawaharlal Nehru", "Dr. B.R. Ambedkar", "Sardar Patel", "Dr. Rajendra Prasad"], concepts: ["Mixed Economy", "Panchsheel", "Planned Development", "Secularism"], places: ["Bhakra Dam", "New Delhi", "Bandung", "Aksai Chin"] },
    12: { events: ["Green Revolution", "Economic Liberalization 1991", "The Emergency (1975-77)", "Pokhran Nuclear Tests"], figures: ["Indira Gandhi", "P.V. Narasimha Rao", "M.S. Swaminathan", "Dr. Manmohan Singh"], concepts: ["LPG Reforms (Liberalization, Privatization, Globalization)", "JP Movement", "Operation Blue Star", "IT Revolution"], places: ["Punjab", "Bangalore", "Pokhran", "Sriharikota"] },
};


export function generateContentForChapter(chapterId: number, chapterTitle: string, chapterSummary: string) {
    const chapterKeywords = keywords[chapterId] || { events: [], figures: [], concepts: [], places: [] };

    const mcqs: MCQ[] = Array.from({ length: 75 }, (_, i) => {
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
            `Unrelated option Alpha from another era`,
            `Unrelated option Beta from another era`,
            `Unrelated option Gamma from another era`
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

    const flashcards: LawFlashcard[] = Array.from({ length: 75 }, (_, i) => {
        const term = chapterKeywords.concepts[i % chapterKeywords.concepts.length] || `Key Term ${i + 1}`;
        return {
            id: `ch${chapterId}-fc-${i + 1}`,
            term: `${term} in ${chapterTitle}`,
            definition: `This is the detailed definition for ${term}, explaining its significance within the context of "${chapterTitle}". It represents a core idea from this historical period.`,
            topic: chapterTitle,
        };
    });

    const reels: Reel[] = Array.from({ length: 75 }, (_, i) => {
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

    