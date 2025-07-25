
import type { MCQ, LawFlashcard, Reel } from './types';

// This is a placeholder content generator. In a real app, this might come from a database or a more complex system.
// For this prototype, we'll generate repetitive but uniquely identifiable content.

export function generateContentForChapter(chapterId: number, chapterTitle: string) {
    const summary = `This chapter, "${chapterTitle}", delves into the key events, figures, and concepts of its period. It covers the political, social, and economic transformations that defined this era. A thorough study of this chapter is essential for understanding the historical narrative and its long-term consequences. Key themes include [Theme 1], [Theme 2], and [Theme 3], which collectively illustrate the complexities and developments of the time. Students should focus on the cause-and-effect relationships and the significant turning points discussed throughout the chapter.`;

    const mcqs: MCQ[] = Array.from({ length: 50 }, (_, i) => ({
        id: `ch${chapterId}-mcq-${i + 1}`,
        topic: chapterTitle,
        question: `What is a key aspect of "${chapterTitle}"? (Question ${i + 1})`,
        options: ['Correct Answer', 'Option B', 'Option C', 'Option D'],
        correctAnswerIndex: 0,
        explanation: `This is the correct explanation for question ${i + 1} regarding ${chapterTitle}. It elaborates on the key aspect discussed.`,
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
        summary,
        mcqs,
        flashcards,
        reels,
    };
}
