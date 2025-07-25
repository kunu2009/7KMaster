
import type { LawNote, LawFlashcard, CareerPath } from './types';

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

export const lawFlashcards: LawFlashcard[] = [
  { id: 'fc-1', term: 'Habeas Corpus', definition: 'A writ requiring a person under arrest to be brought before a judge or into court, especially to secure the person\'s release unless lawful grounds are shown for their detention.', topic: 'Legal Writs' },
  { id: 'fc-2', term: 'Mens Rea', definition: 'The intention or knowledge of wrongdoing that constitutes part of a crime, as opposed to the action or conduct of the accused (actus reus).', topic: 'Criminal Law' },
  { id: 'fc-3', term: 'Stare Decisis', definition: 'The legal principle of determining points in litigation according to precedent.', topic: 'Legal Principles' },
  { id: 'fc-4', term: 'Caveat Emptor', definition: 'The principle that the buyer alone is responsible for checking the quality and suitability of goods before a purchase is made. "Let the buyer beware".', topic: 'Contract Law' },
  { id: 'fc-5', term: 'Void ab initio', definition: 'A contract or legal document that is void from the very beginning.', topic: 'Contract Law' },
  { id: 'fc-6', term: 'Doli Incapax', definition: 'A legal presumption that a child under a certain age is incapable of forming criminal intent.', topic: 'Criminal Law' },
  { id: 'fc-7', term: 'Amicus Curiae', definition: 'An impartial adviser, often voluntary, to a court of law in a particular case. Translates to "friend of the court".', topic: 'Legal Roles'},
];

export const careerRoadmaps: CareerPath[] = [
  {
    id: 'cr-1',
    title: 'The Judiciary',
    description: 'Path to becoming a judge in the Indian judicial system.',
    steps: [
      { title: 'Step 1: Law Degree (LLB)', content: 'Complete a 3-year or 5-year LLB program from a recognized university.' },
      { title: 'Step 2: Qualify for Judicial Services Examination', content: 'Appear for the competitive exam conducted by state public service commissions. Eligibility often requires a few years of practice as an advocate.' },
      { title: 'Step 3: Become a Civil Judge / Magistrate', content: 'Upon clearing the exam and interview, you start as a Civil Judge (Junior Division) or Judicial Magistrate.' },
      { title: 'Step 4: Promotion & Higher Judiciary', content: 'Through seniority and performance, you can be promoted to Senior Civil Judge, District Judge, and potentially be elevated to the High Court and Supreme Court.' }
    ]
  },
  {
    id: 'cr-2',
    title: 'Corporate Law',
    description: 'Advising businesses on their legal rights, responsibilities, and obligations.',
    steps: [
      { title: 'Step 1: Law Degree (LLB)', content: 'A strong academic record in a 5-year integrated program from a top National Law University (NLU) or a 3-year LLB from a reputable institution is highly valued.' },
      { title: 'Step 2: Internships', content: 'Gain practical experience through multiple internships at corporate law firms, companies, and with senior advocates during your law school years.' },
      { title: 'Step 3: Specialize', content: 'Develop expertise in areas like Mergers & Acquisitions (M&A), Corporate Finance, Intellectual Property (IP), or Compliance. An LLM in a specialized field can be beneficial.' },
      { title: 'Step 4: Join a Law Firm or Company', content: 'Start as an associate in a law firm or as an in-house counsel for a company. Networking and continuous learning are key to growth.' }
    ]
  },
  {
    id: 'cr-3',
    title: 'Litigation',
    description: 'Representing clients in civil or criminal court proceedings.',
    steps: [
      { title: 'Step 1: Law Degree (LLB)', content: 'Obtain your law degree and enroll with your state Bar Council.' },
      { title: 'Step 2: Clear the All India Bar Examination (AIBE)', content: 'Pass the AIBE within two years of enrollment to receive your "Certificate of Practice".' },
      { title: 'Step 3: Join a Senior Advocate or Law Firm', content: 'Work as a junior under a senior advocate to learn courtroom craft, drafting, and client management. This is the most crucial phase for learning.' },
      { title: 'Step 4: Build Your Own Practice', content: 'After gaining sufficient experience (usually 5-7 years), you can start handling your own cases and build an independent practice. Strong oratory and analytical skills are essential.' }
    ]
  },
];
