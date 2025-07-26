
import type { MCQ, LawFlashcard, Reel } from './types';

// This is a placeholder content generator. In a real app, this might come from a database or a more complex system.
// For this prototype, we'll generate repetitive but uniquely identifiable content.

export function generateContentForChapter(chapterId: number, chapterTitle: string, chapterSummary: string) {

    const mcqs: MCQ[] = Array.from({ length: 50 }, (_, i) => ({
        id: `ch${chapterId}-mcq-${i + 1}`,
        topic: chapterTitle,
        question: `Regarding "${chapterTitle}", which of the following is true? (Question ${i + 1})`,
        options: ['Correct Answer A', 'Option B', 'Option C', 'Option D'],
        correctAnswerIndex: 0,
        explanation: `This is the correct explanation for question ${i + 1} regarding ${chapterTitle}. It provides context on why option A is correct based on the chapter's content.`,
    }));

    const flashcards: LawFlashcard[] = Array.from({ length: 50 }, (_, i) => ({
        id: `ch${chapterId}-fc-${i + 1}`,
        term: `Key Term ${i + 1} from ${chapterTitle}`,
        definition: `This is the detailed definition for Key Term ${i + 1}, explaining its significance within the context of "${chapterTitle}".`,
        topic: chapterTitle,
    }));

    const reels: Reel[] = Array.from({ length: 50 }, (_, i) => ({
        id: `ch${chapterId}-reel-${i + 1}`,
        title: `Quick Fact #${i + 1}`,
        content: `A memorable fact or concept from "${chapterTitle}" to aid in quick revision. Fact number ${i + 1}.`,
        icon: 'BookOpenCheck',
    }));

    return {
        summary: chapterSummary,
        mcqs,
        flashcards,
        reels,
    };
}
