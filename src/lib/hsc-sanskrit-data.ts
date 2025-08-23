
import type { HscProseChapter, HscPoetryChapter } from './types';

export const hscSanskritProse: HscProseChapter[] = [
    {
        id: 1,
        title: "ननु मूर्खः एव सः",
        author: "भोजप्रबन्धः",
        contentAvailable: true,
        summaries: {
            short: "A tale from the 'Bhojaprabandha' about King Bhoja and a foolish scholar. The king tests the scholar's supposed wisdom, only to reveal his ignorance. The story humorously illustrates that true wisdom is not about memorization but about practical understanding.",
            detailed: `This story is an extract from the famous 'Bhojaprabandha', a collection of tales about the wise King Bhoja of Dhara. In this chapter, a scholar known for his memorization skills comes to King Bhoja's court, claiming to be a great 'pandit'. To test him, King Bhoja engages him in a philosophical debate. The king asks simple, practical questions, but the scholar can only respond with memorized 'shlokas' (verses) that are often out of context.\n\nThrough clever questioning, King Bhoja exposes the scholar's lack of true understanding. The courtiers are amused as the king demonstrates that the scholar is, in fact, a fool ('murkha') who has learned texts by rote without grasping their meaning. The story concludes with King Bhoja rewarding the scholar not for his wisdom, but for his effort in memorization, while gently advising him to seek true knowledge.`,
        },
        characters: [
            {
                name: "King Bhoja",
                sketch: "A wise, just, and witty king known for his patronage of arts and literature. He values true understanding over superficial knowledge and is adept at testing the character and intelligence of those in his court."
            },
            {
                name: "The Scholar (Pandit)",
                sketch: "A man who has memorized many scriptures but lacks practical wisdom and understanding. He is proud of his learning but is ultimately shown to be foolish. He represents rote learning without comprehension."
            }
        ],
        theme: "The central theme is the difference between knowledge and wisdom. The story critiques rote learning and emphasizes that true intelligence lies in the practical application and deep understanding of concepts, not just in the ability to recite texts from memory. It celebrates wit, practical wisdom, and the importance of humility in the pursuit of knowledge.",
        glossary: [
            { word: "ननु", meaning: "Indeed, surely (used to raise an objection or ask a question)" },
            { word: "मूर्खः", meaning: "A fool, an ignorant person." },
            { word: "पण्डितः", meaning: "A learned man, a scholar." },
            { word: "सभा", meaning: "Assembly, court." },
            { word: "ज्ञानम्", meaning: "Knowledge, wisdom." }
        ],
    },
    {
        id: 2,
        title: "आज्ञापत्रम्",
        author: "छत्रपतिशिवाजीमहाराजः",
        contentAvailable: false,
        summaries: {
            short: "A chapter detailing the administrative orders and principles of governance laid down by Chhatrapati Shivaji Maharaj. This content is coming soon.",
            detailed: "Detailed summary and line-by-line explanation for 'Ajnapatram' will be added shortly.",
        },
        characters: [],
        theme: "This chapter focuses on the principles of effective and just governance, administration, and military strategy as documented in the 'Ajnapatra'.",
        glossary: [],
    },
];

export const hscSanskritPoetry: HscPoetryChapter[] = [
    {
        id: 1,
        title: "विद्यैव धनम्",
        author: "भर्तृहरिः (नीतिशतकम्)",
        contentAvailable: true,
        poemText: [
            "विद्या नाम नरस्य रूपमधिकं प्रच्छन्नगुप्तं धनम्",
            "विद्या भोगकरी यशःसुखकरी विद्या गुरूणां गुरुः।",
            "विद्या बन्धुजनो विदेशगमने विद्या परं दैवतम्",
            "विद्या राजसु पूज्यते न हि धनं विद्याविहीनः पशुः॥"
        ],
        summaries: {
            overall: "This verse from Bhartrihari's 'Nitishatakam' extols the supreme importance of knowledge ('Vidya'). It declares that knowledge is a person's true beauty, a hidden treasure, and the source of all comforts and fame. It is the teacher of teachers, a friend in foreign lands, and the highest deity. Kings worship knowledge, not wealth, and a person without it is no better than an animal.",
            stanzaWise: `
- **Line 1:** Knowledge is a person's greatest beauty and a hidden, secure treasure. Unlike physical beauty or wealth, it cannot be stolen or diminished.
- **Line 2:** Knowledge brings worldly pleasures, fame, and happiness. It is the 'guru of gurus', meaning it is the ultimate source of all wisdom.
- **Line 3:** Knowledge acts as a true companion when one travels abroad. It is the supreme deity to be worshipped.
- **Line 4:** Knowledge is revered by kings and rulers, not material wealth. A person devoid of knowledge is equated to an animal, emphasizing that knowledge is what truly elevates human beings.`,
        },
        centralIdea: "The central idea is the supremacy of knowledge over all other forms of wealth and beauty. The poem systematically proves how knowledge is the most valuable and permanent asset a person can possess. It is a source of security, honor, and success, and is the fundamental quality that distinguishes humans from animals.",
        figuresOfSpeech: [
            { name: "Metaphor", line: "विद्या नाम नरस्य... प्रच्छन्नगुप्तं धनम्", explanation: "Knowledge is metaphorically described as a hidden and secret treasure." },
            { name: "Metaphor", line: "विद्याविहीनः पशुः", explanation: "A person without knowledge is directly equated to an animal, creating a powerful metaphor for the importance of learning." },
        ],
        poeticDevices: {
            rhymeScheme: "The verse is composed in the ' शार्दूलविक्रीडितम्' meter, a common meter in classical Sanskrit poetry. It does not follow a simple end-rhyme scheme like English poetry.",
        },
        appreciation: `This verse from Bhartrihari's Nitishatakam is a timeless and powerful tribute to the importance of knowledge. The central theme is that 'Vidya' (knowledge) is the supreme wealth. The poet masterfully uses metaphors, comparing knowledge to a hidden treasure and the ultimate guru, to convey his message. The final line, "A person without knowledge is an animal," is a striking statement that highlights the transformative power of education. The poem's enduring appeal lies in its universal message and its eloquent praise of intellectual wealth over material possessions. It inspires one to pursue knowledge above all else.`
    }
];
