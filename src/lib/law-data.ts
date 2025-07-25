
import type { MCQ, LawNote, StudyEvent, LawFlashcard, Reel, CareerPath, CaseSimulation } from './types';

export const mcqs: MCQ[] = [
  {
    id: 'mcq-1',
    topic: 'Constitution',
    question: 'Who is known as the "Father of the Indian Constitution"?',
    options: ['Mahatma Gandhi', 'Jawaharlal Nehru', 'Dr. B. R. Ambedkar', 'Sardar Vallabhbhai Patel'],
    correctAnswerIndex: 2,
    explanation: 'Dr. B. R. Ambedkar was the chairman of the Drafting Committee of the Constituent Assembly and played a pivotal role in drafting the Indian Constitution.',
  },
  {
    id: 'mcq-2',
    topic: 'Constitution',
    question: 'The Fundamental Rights in the Indian Constitution are inspired by the Constitution of which country?',
    options: ['USA', 'UK', 'Canada', 'Ireland'],
    correctAnswerIndex: 0,
    explanation: 'The concept of Fundamental Rights was borrowed from the Bill of Rights of the United States Constitution.',
  },
  {
    id: 'mcq-3',
    topic: 'Legal Aptitude',
    question: 'What does the legal principle "actus reus" refer to?',
    options: ['The guilty mind', 'The guilty act', 'The burden of proof', 'The right to remain silent'],
    correctAnswerIndex: 1,
    explanation: '"Actus reus" is a Latin term for the "guilty act." It is the physical element of a crime, as distinguished from the "mens rea" (guilty mind).',
  },
  {
    id: 'mcq-4',
    topic: 'Legal Aptitude',
    question: 'A contract entered into by a minor is considered:',
    options: ['Valid', 'Voidable', 'Void', 'Illegal'],
    correctAnswerIndex: 2,
    explanation: 'As per the Indian Contract Act, 1872, an agreement with a minor is void ab initio, meaning it is void from the very beginning.',
  },
  {
    id: 'mcq-5',
    topic: 'General Knowledge',
    question: 'The book "Discovery of India" was written by:',
    options: ['Mahatma Gandhi', 'Jawaharlal Nehru', 'Rabindranath Tagore', 'S. Radhakrishnan'],
    correctAnswerIndex: 1,
    explanation: 'Jawaharlal Nehru wrote "The Discovery of India" during his imprisonment at Ahmednagar fort in British India from 1942–1945.',
  },
  {
    id: 'mcq-6',
    topic: 'English',
    question: 'Choose the synonym for "ephemeral".',
    options: ['Eternal', 'Transient', 'Beautiful', 'Strong'],
    correctAnswerIndex: 1,
    explanation: 'Ephemeral means lasting for a very short time. "Transient" is the closest synonym.',
  },
  {
    id: 'mcq-7',
    topic: 'Current Affairs',
    question: 'Who is the current Chief Justice of India? (As of late 2023)',
    options: ['N. V. Ramana', 'U. U. Lalit', 'D. Y. Chandrachud', 'S. A. Bobde'],
    correctAnswerIndex: 2,
    explanation: 'Dhananjaya Y. Chandrachud assumed office as the 50th Chief Justice of India in November 2022.',
  },
  {
    id: 'mcq-8',
    topic: 'Logical Reasoning',
    question: 'If all cats are mammals, and all mammals have hearts, then:',
    options: ['All cats have hearts', 'Some cats have hearts', 'No cats have hearts', 'Cannot be determined'],
    correctAnswerIndex: 0,
    explanation: 'This is a simple syllogism. If A is B, and B is C, then A must be C. Therefore, all cats have hearts.',
  },
  {
    id: 'mcq-9',
    topic: 'Constitution',
    question: 'Which article of the Constitution deals with the Right to Equality?',
    options: ['Article 14', 'Article 19', 'Article 21', 'Article 32'],
    correctAnswerIndex: 0,
    explanation: 'Article 14 of the Indian Constitution guarantees to every person the right to equality before the law or the equal protection of the laws within the territory of India.',
  },
  {
    id: 'mcq-10',
    topic: 'Legal Aptitude',
    question: 'The term "defamation" refers to:',
    options: ['Harming someone\'s reputation', 'Physical assault', 'Theft of property', 'Breach of contract'],
    correctAnswerIndex: 0,
    explanation: 'Defamation is the act of communicating false statements about a person that injure the reputation of that person.',
  },
];

export const lawNotes: LawNote[] = [
  // Constitution
  {
    topic: 'Preamble of the Constitution',
    category: 'Constitution',
    content: `The Preamble is the introductory statement to the Constitution that sets out its guiding purpose and principles.
- **Keywords:** It declares India to be a SOVEREIGN, SOCIALIST, SECULAR, and DEMOCRATIC REPUBLIC.
- **Objectives:** It aims to secure for all its citizens:
  - **JUSTICE:** Social, economic, and political.
  - **LIBERTY:** Of thought, expression, belief, faith, and worship.
  - **EQUALITY:** Of status and of opportunity.
  - **FRATERNITY:** Assuring the dignity of the individual and the unity and integrity of the Nation.
- **Amendment:** It was amended once by the 42nd Constitutional Amendment Act, 1976, which added three new words: Socialist, Secular, and Integrity.
- **Is it part of the Constitution?** Yes, the Supreme Court in the Kesavananda Bharati case (1973) held that the Preamble is part of the Constitution and can be amended, subject to the basic structure doctrine.`,
    links: [{ title: 'Kesavananda Bharati v. State of Kerala', url: 'https://en.wikipedia.org/wiki/Kesavananda_Bharati_v._State_of_Kerala' }],
  },
  {
    topic: 'Fundamental Rights (Art 12-35)',
    category: 'Constitution',
    content: `Contained in Part III of the Constitution, these are basic human rights guaranteed to all citizens. They are justiciable, meaning they can be enforced by courts.
- **Right to Equality (Art. 14-18):** Guarantees equality before the law, prohibits discrimination on grounds of religion, race, caste, sex, or place of birth, and abolishes untouchability.
- **Right to Freedom (Art. 19-22):** Includes freedom of speech and expression, assembly, association, movement, residence, and profession. Article 21 (Right to Life and Personal Liberty) is a vital right with a wide scope.
- **Right against Exploitation (Art. 23-24):** Prohibits human trafficking, forced labor, and employment of children in hazardous jobs.
- **Right to Freedom of Religion (Art. 25-28):** Guarantees freedom of conscience and free profession, practice, and propagation of religion.
- **Cultural and Educational Rights (Art. 29-30):** Protects the interests of minorities.
- **Right to Constitutional Remedies (Art. 32):** Considered the "heart and soul" of the Constitution by Dr. Ambedkar. It allows citizens to move the Supreme Court to enforce their Fundamental Rights. The SC can issue writs like Habeas Corpus, Mandamus, Prohibition, Certiorari, and Quo Warranto.`,
    links: [{ title: 'All about Fundamental Rights', url: 'https://byjus.com/ias/fundamental-rights/' }],
  },
  {
    topic: 'Directive Principles of State Policy (DPSP)',
    category: 'Constitution',
    content: `Contained in Part IV (Art. 36-51), these are ideals that the state should keep in mind while formulating policies and enacting laws.
- **Nature:** Unlike Fundamental Rights, DPSPs are non-justiciable (not enforceable by courts).
- **Objective:** To establish a 'welfare state' by promoting social and economic democracy.
- **Key Principles:**
  - **Socialist:** Secure adequate means of livelihood, prevent concentration of wealth (Art 39).
  - **Gandhian:** Organize village panchayats (Art 40), promote cottage industries.
  - **Liberal-Intellectual:** Secure for all citizens a Uniform Civil Code (Art 44), protect and improve the environment (Art 48A).`,
    links: [],
  },
  {
    topic: 'Introduction to Torts',
    category: 'Legal Aptitude',
    content: `A tort is a civil wrong that causes a claimant to suffer loss or harm, resulting in legal liability for the person who commits the tortious act (tortfeasor).
- **Distinction from Crime:** A tort is a wrong against an individual, whereas a crime is a wrong against society. Tort litigation is initiated by the injured person (plaintiff), while criminal proceedings are initiated by the state. The remedy in tort is usually damages (compensation), while in crime, it is punishment.
- **Key Maxims:**
  - **Injuria sine damno:** Legal injury without actual damage. This is actionable. (e.g., trespassing).
  - **Damnum sine injuria:** Damage without legal injury. This is not actionable. (e.g., loss from lawful competition).
- **Types of Torts:**
  - **Intentional Torts:** e.g., Battery, Assault, Defamation.
  - **Negligence:** The most common type of tort.
  - **Strict Liability:** Liability without fault (e.g., keeping dangerous animals).`,
    links: [],
  },
];

export const studyEvents: StudyEvent[] = [
    { date: new Date(new Date().setDate(new Date().getDate() + 1)), title: 'Revise Fundamental Rights', description: 'Go through Articles 12-35 of the Constitution.' },
    { date: new Date(new Date().setDate(new Date().getDate() + 2)), title: 'Practice 50 MCQs on Torts', description: 'Focus on negligence and defamation.' },
];

export const lawFlashcards: LawFlashcard[] = [
  { id: 'fc-1', term: 'Habeas Corpus', definition: 'A writ requiring a person under arrest to be brought before a judge or into court, especially to secure the person\'s release unless lawful grounds are shown for their detention.', topic: 'Legal Writs' },
  { id: 'fc-2', term: 'Mens Rea', definition: 'The intention or knowledge of wrongdoing that constitutes part of a crime, as opposed to the action or conduct of the accused (actus reus).', topic: 'Criminal Law' },
  { id: 'fc-3', term: 'Stare Decisis', definition: 'The legal principle of determining points in litigation according to precedent.', topic: 'Legal Principles' },
];

export const reels: Reel[] = [
  {
    id: 'reel-1',
    title: 'Actus Reus',
    content: 'The "guilty act." It is the physical component of a crime. No act, no crime!',
    icon: 'Gavel',
  },
  {
    id: 'reel-2',
    title: 'Mens Rea',
    content: 'The "guilty mind." It is the mental element, the intention to commit a crime.',
    icon: 'BrainCircuit',
  },
];

export const careerRoadmaps: CareerPath[] = [
  {
    id: 'cr-1',
    title: 'The Judiciary',
    description: 'Path to becoming a judge in the Indian judicial system.',
    steps: [
      { title: 'Step 1: Law Degree (LLB)', content: 'Complete a 3-year or 5-year LLB program from a recognized university.' },
      { title: 'Step 2: Qualify for Judicial Services Examination', content: 'Appear for the competitive exam conducted by state public service commissions. Eligibility often requires a few years of practice as an advocate.' },
    ]
  },
  {
    id: 'cr-2',
    title: 'Corporate Law',
    description: 'Advising businesses on their legal rights, responsibilities, and obligations.',
    steps: [
      { title: 'Step 1: Law Degree (LLB)', content: 'A strong academic record in a 5-year integrated program from a top National Law University (NLU) or a 3-year LLB from a reputable institution is highly valued.' },
      { title: 'Step 2: Internships', content: 'Gain practical experience through multiple internships at corporate law firms, companies, and with senior advocates during your law school years.' },
    ]
  },
];

export const caseSimulations: CaseSimulation[] = [
  {
    id: 'cs-1',
    title: 'The Cheque Bounce Case',
    scenario: 'Your client, Mr. Sharma, gave a cheque of ₹50,000 to Mr. Gupta for goods supplied. The cheque was dishonored due to "insufficient funds". Mr. Gupta sent a legal notice, but Mr. Sharma could not pay within the stipulated time. The case is now in court.',
    playerRole: 'You are the defense lawyer for Mr. Sharma. Your goal is to defend him against the charge under Section 138 of the Negotiable Instruments Act.',
  },
  {
    id: 'cs-2',
    title: 'The Trespass Dispute',
    scenario: 'Your client, Mrs. Verma, owns a residential property. Her neighbor, Mr. Singh, has constructed a shed that partially extends over her property line by two feet. Repeated requests to remove the encroachment have been ignored.',
    playerRole: 'You are the lawyer for Mrs. Verma. Your goal is to argue for an injunction to have the shed removed and claim damages for trespass.',
  },
];

export const revisionTopics: string[] = [
  'Constitution',
  'Legal Aptitude',
  'General Knowledge',
  'English',
  'Logical Reasoning',
  'Current Affairs',
  'Legal Maxims'
];
