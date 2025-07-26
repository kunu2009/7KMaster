
import type { MCQ, LawNote, StudyEvent, LawFlashcard, Reel, CareerPath, CaseSimulation, VisualLawItem } from './types';

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
  {
    id: 'mcq-11',
    topic: 'General Knowledge',
    question: 'Which of these is not a permanent member of the UN Security Council?',
    options: ['China', 'France', 'Germany', 'Russia'],
    correctAnswerIndex: 2,
    explanation: 'The permanent members of the UN Security Council are China, France, Russia, the United Kingdom, and the United States. Germany is not a permanent member.',
  },
  {
    id: 'mcq-12',
    topic: 'English',
    question: 'What is the antonym of "garrulous"?',
    options: ['Talkative', 'Loquacious', 'Taciturn', 'Friendly'],
    correctAnswerIndex: 2,
    explanation: '"Garrulous" means excessively talkative. "Taciturn" means reserved or uncommunicative in speech, making it the correct antonym.',
  },
  {
    id: 'mcq-13',
    topic: 'Constitution',
    question: "Which amendment to the Constitution is often called the 'Mini-Constitution'?",
    options: ['42nd Amendment', '44th Amendment', '24th Amendment', '73rd Amendment'],
    correctAnswerIndex: 0,
    explanation: 'The 42nd Amendment Act, 1976, is known as the "Mini-Constitution" because it made widespread and significant changes to the Constitution.',
  },
  {
    id: 'mcq-14',
    topic: 'Legal Aptitude',
    question: 'What is the standard of proof required in a criminal case for the prosecution?',
    options: ['Preponderance of probabilities', 'Beyond a reasonable doubt', 'Clear and convincing evidence', 'Some credible evidence'],
    correctAnswerIndex: 1,
    explanation: 'In criminal law, the prosecution has the burden of proving the defendant\'s guilt "beyond a reasonable doubt," which is the highest standard of proof.',
  },
  {
    id: 'mcq-15',
    topic: 'Current Affairs',
    question: 'India\'s first mission to study the Sun is named:',
    options: ['Surya-1', 'Chandrayaan-3', 'Gaganyaan', 'Aditya-L1'],
    correctAnswerIndex: 3,
    explanation: 'Aditya-L1 is the first Indian space-based observatory-class solar mission to study the Sun.',
  },
  {
    id: 'mcq-16',
    topic: 'Logical Reasoning',
    question: 'Find the next number in the series: 2, 6, 12, 20, 30, ?',
    options: ['40', '42', '44', '46'],
    correctAnswerIndex: 1,
    explanation: 'The pattern is n*(n+1): 1*2=2, 2*3=6, 3*4=12, 4*5=20, 5*6=30, so the next is 6*7=42.',
  },
  {
    id: 'mcq-17',
    topic: 'General Knowledge',
    question: 'Where is the headquarters of the International Court of Justice located?',
    options: ['New York, USA', 'Geneva, Switzerland', 'The Hague, Netherlands', 'Paris, France'],
    correctAnswerIndex: 2,
    explanation: 'The International Court of Justice (ICJ) has its seat at the Peace Palace in The Hague, Netherlands.',
  },
  {
    id: 'mcq-18',
    topic: 'English',
    question: 'What does the idiom "to hit the nail on the head" mean?',
    options: ['To make a mistake', 'To do or say something exactly right', 'To work very hard', 'To give up'],
    correctAnswerIndex: 1,
    explanation: 'The idiom means to describe a situation or problem with perfect accuracy.',
  },
  {
    id: 'mcq-19',
    topic: 'Constitution',
    question: 'How long did it take the Constituent Assembly to draft the Constitution of India?',
    options: ['1 year, 10 months, 12 days', '2 years, 11 months, 18 days', '3 years, 5 months, 26 days', '4 years, 2 months, 5 days'],
    correctAnswerIndex: 1,
    explanation: 'The Constituent Assembly took 2 years, 11 months, and 18 days to finalize the Indian Constitution.',
  },
  {
    id: 'mcq-20',
    topic: 'Legal Aptitude',
    question: 'The legal term "obiter dicta" refers to:',
    options: ['The legally binding part of a judgment', 'A saying by the way that is not legally binding', 'The final order of the court', 'A previously decided case'],
    correctAnswerIndex: 1,
    explanation: '"Obiter dicta" are remarks or observations made by a judge that are not essential to the decision and are not legally binding as precedent.',
  },
  {
    id: 'mcq-21',
    topic: 'Current Affairs',
    question: 'The G20 Summit in 2023 was hosted by which country?',
    options: ['Brazil', 'South Africa', 'India', 'Indonesia'],
    correctAnswerIndex: 2,
    explanation: 'India hosted the 18th G20 Heads of State and Government Summit in New Delhi in September 2023.',
  },
  {
    id: 'mcq-22',
    topic: 'Logical Reasoning',
    question: 'A man points to a photograph and says, "The lady in the photograph is my nephew\'s maternal grandmother." How is the lady in the photograph related to the man\'s sister who has no other sister?',
    options: ['Cousin', 'Sister-in-law', 'Mother', 'Mother-in-law'],
    correctAnswerIndex: 2,
    explanation: 'My nephew\'s maternal grandmother is my mother. The lady is the man\'s mother.',
  },
  {
    id: 'mcq-23',
    topic: 'English',
    question: 'Choose the correct antonym for "mitigate".',
    options: ['Alleviate', 'Lessen', 'Aggravate', 'Soothe'],
    correctAnswerIndex: 2,
    explanation: 'To mitigate is to make something less severe or painful. To "aggravate" is to make a problem worse, which is the direct opposite.',
  },
  {
    id: 'mcq-24',
    topic: 'General Knowledge',
    question: 'Who was the first woman to become a judge of the Supreme Court of India?',
    options: ['Leila Seth', 'Anna Chandy', 'M. Fathima Beevi', 'Sujata Manohar'],
    correctAnswerIndex: 2,
    explanation: 'Justice M. Fathima Beevi was the first female judge appointed to the Supreme Court of India in 1989.',
  },
  {
    id: 'mcq-25',
    topic: 'Constitution',
    question: 'The words "SOCIALIST SECULAR" were added to the Preamble by which amendment?',
    options: ['42nd Amendment', '44th Amendment', '1st Amendment', '24th Amendment'],
    correctAnswerIndex: 0,
    explanation: 'The words "SOCIALIST" and "SECULAR" were added to the Preamble of the Indian Constitution by the 42nd Amendment Act, 1976.',
  },
  {
    id: 'mcq-26',
    topic: 'Constitution',
    question: 'Under which Article can the President of India declare a financial emergency?',
    options: ['Article 352', 'Article 356', 'Article 360', 'Article 368'],
    correctAnswerIndex: 2,
    explanation: 'Article 360 of the Constitution empowers the President to proclaim a financial emergency if he is satisfied that a situation has arisen whereby the financial stability or credit of India or of any part of the territory thereof is threatened.',
  },
  {
    id: 'mcq-27',
    topic: 'Legal Aptitude',
    question: 'The principle of "Vicarious Liability" is primarily a part of:',
    options: ['Criminal Law', 'Law of Torts', 'Contract Law', 'Constitutional Law'],
    correctAnswerIndex: 1,
    explanation: 'Vicarious liability holds one person responsible for the actions of another. It is a key concept in the Law of Torts, particularly in employer-employee relationships.',
  },
  {
    id: 'mcq-28',
    topic: 'Legal Aptitude',
    question: 'What is the essential element that distinguishes theft from criminal misappropriation?',
    options: ['The value of the property', 'The intention to cause wrongful gain', 'Taking property without the owner\'s consent', 'The type of property involved'],
    correctAnswerIndex: 2,
    explanation: 'In theft, the initial taking of the property is dishonest and without the owner\'s consent. In criminal misappropriation, the offender initially possesses the property legally but then dishonestly converts it for their own use.',
  },
  {
    id: 'mcq-29',
    topic: 'General Knowledge',
    question: 'The "Dandi March" led by Mahatma Gandhi was associated with:',
    options: ['The Non-Cooperation Movement', 'The Quit India Movement', 'The Civil Disobedience Movement', 'The Khilafat Movement'],
    correctAnswerIndex: 2,
    explanation: 'The Dandi March, or Salt March, was a major act of nonviolent civil disobedience that initiated the Civil Disobedience Movement in 1930.',
  },
  {
    id: 'mcq-30',
    topic: 'English',
    question: 'Choose the correct meaning of the idiom "To bite the bullet".',
    options: ['To eat very quickly', 'To get injured', 'To face a difficult situation with courage', 'To reject an offer'],
    correctAnswerIndex: 2,
    explanation: 'The idiom "to bite the bullet" means to decide to do something difficult or unpleasant that one has been putting off or hesitating over.',
  },
  {
    id: 'mcq-31',
    topic: 'Current Affairs',
    question: 'The \'BRICS\' group of emerging economies originally consisted of Brazil, Russia, India, and China. Which country was added later to form "BRICS"?',
    options: ['Singapore', 'South Africa', 'Saudi Arabia', 'Spain'],
    correctAnswerIndex: 1,
    explanation: 'South Africa was formally invited to join the BRIC group in 2010, resulting in the acronym being changed to BRICS.',
  },
  {
    id: 'mcq-32',
    topic: 'Logical Reasoning',
    question: 'In a certain code, "TEACHER" is written as "VGCEJGT". How is "CHILDREN" written in that code?',
    options: ['EJKNEGTP', 'EJKNFTGP', 'EJNFITP', 'EJKNFTGQ'],
    correctAnswerIndex: 1,
    explanation: 'The pattern is +2 for each letter. T(+2)=V, E(+2)=G, A(+2)=C, and so on. Applying this to CHILDREN: C(+2)=E, H(+2)=J, I(+2)=K, L(+2)=N, D(+2)=F, R(+2)=T, E(+2)=G, N(+2)=P. So, EJKNFTGP.',
  },
  {
    id: 'mcq-33',
    topic: 'Constitution',
    question: 'The power of the Supreme Court of India to decide disputes between the Centre and the States falls under its:',
    options: ['Advisory Jurisdiction', 'Appellate Jurisdiction', 'Original Jurisdiction', 'Writ Jurisdiction'],
    correctAnswerIndex: 2,
    explanation: 'Under Article 131, the Supreme Court has original jurisdiction in any dispute between the Government of India and one or more States, or between two or more States.',
  },
  {
    id: 'mcq-34',
    topic: 'Legal Aptitude',
    question: 'Legal Principle: "Quid pro quo" means something in return. A contract is not valid without consideration. Fact: A agrees to sell his house to B for 10 rupees. Is this a valid contract?',
    options: ['No, because 10 rupees is not adequate consideration.', 'Yes, because consideration need not be adequate, but it must be real.', 'No, it is a gift, not a contract.', 'Yes, but it is a voidable contract.'],
    correctAnswerIndex: 1,
    explanation: 'The law states that consideration must be present ("something in return"), but it does not require that the consideration be adequate. As long as some value is exchanged, the contract is valid.',
  },
  {
    id: 'mcq-35',
    topic: 'English',
    question: 'A person who is fluent in many languages is called a:',
    options: ['Linguist', 'Polyglot', 'Orator', 'Bilingual'],
    correctAnswerIndex: 1,
    explanation: 'A polyglot is someone who knows and is able to use several languages. A linguist studies language, but may not speak many.',
  },
  {
    id: 'mcq-36',
    topic: 'Logical Reasoning',
    question: 'Pointing to a girl, Rajan said, "She is the daughter of my mother\'s daughter." How is the girl related to Rajan?',
    options: ['Aunt', 'Niece', 'Cousin', 'Sister'],
    correctAnswerIndex: 1,
    explanation: 'Rajan\'s mother\'s daughter is Rajan\'s sister. The girl is the daughter of Rajan\'s sister. Therefore, the girl is Rajan\'s niece.',
  },
  {
    id: 'mcq-37',
    topic: 'General Knowledge',
    question: 'The Indus Valley Civilization is also known as the:',
    options: ['Mesopotamian Civilization', 'Harappan Civilization', 'Egyptian Civilization', 'Vedic Civilization'],
    correctAnswerIndex: 1,
    explanation: 'The Indus Valley Civilization is also called the Harappan Civilization after Harappa, the first of its sites to be excavated in the 1920s.',
  },
  {
    id: 'mcq-38',
    topic: 'Constitution',
    question: 'The idea of "Directive Principles of State Policy" in the Indian Constitution has been borrowed from the Constitution of:',
    options: ['France', 'USA', 'Ireland', 'UK'],
    correctAnswerIndex: 2,
    explanation: 'The Directive Principles of State Policy are inspired by the Irish Constitution.',
  },
  {
    id: 'mcq-39',
    topic: 'Legal Aptitude',
    question: 'An assault is:',
    options: ['The intentional application of force to another person.', 'An act which causes another person to apprehend the infliction of immediate, unlawful force.', 'A false statement that harms someone\'s reputation.', 'The unlawful confinement of a person.'],
    correctAnswerIndex: 1,
    explanation: 'Assault is an act that creates a reasonable apprehension of immediate harmful or offensive contact. The actual contact itself is called battery.',
  },
  {
    id: 'mcq-40',
    topic: 'English',
    question: 'Find the correctly spelt word.',
    options: ['Accomodate', 'Acommodate', 'Accommodate', 'Acomodate'],
    correctAnswerIndex: 2,
    explanation: 'The correct spelling is "Accommodate", with double \'c\' and double \'m\'.',
  },
  {
    id: 'mcq-41',
    topic: 'Constitution',
    question: "The concept of 'Judicial Review' in India is taken from which country's constitution?",
    options: ['United Kingdom', 'USA', 'Canada', 'Australia'],
    correctAnswerIndex: 1,
    explanation: 'The concept of Judicial Review, the power of the judiciary to examine the constitutionality of legislative enactments and executive orders, was borrowed from the Constitution of the USA.',
  },
  {
    id: 'mcq-42',
    topic: 'Constitution',
    question: 'Who administers the oath of office to the President of India?',
    options: ['The Prime Minister', 'The Speaker of the Lok Sabha', 'The Chief Justice of India', 'The outgoing President'],
    correctAnswerIndex: 2,
    explanation: 'The oath of office to the President of India is administered by the Chief Justice of India, and in their absence, the senior-most judge of the Supreme Court available.',
  },
  {
    id: 'mcq-43',
    topic: 'Constitution',
    question: 'Which schedule of the Indian Constitution deals with the allocation of seats in the Rajya Sabha?',
    options: ['Third Schedule', 'Fourth Schedule', 'Fifth Schedule', 'Sixth Schedule'],
    correctAnswerIndex: 1,
    explanation: 'The Fourth Schedule of the Constitution deals with the allocation of seats for states and union territories in the Rajya Sabha (Council of States).',
  },
  {
    id: 'mcq-44',
    topic: 'Constitution',
    question: 'What is the minimum age for becoming a member of the Lok Sabha?',
    options: ['21 years', '25 years', '30 years', '35 years'],
    correctAnswerIndex: 1,
    explanation: 'According to Article 84(b) of the Indian Constitution, the minimum age for a person to be a member of the Lok Sabha is 25 years.',
  },
  {
    id: 'mcq-45',
    topic: 'Constitution',
    question: 'The total number of members nominated by the President to the Rajya Sabha is:',
    options: ['2', '10', '12', '14'],
    correctAnswerIndex: 2,
    explanation: 'The President of India can nominate 12 members to the Rajya Sabha for their contributions to art, literature, science, and social services. The provision for nominating Anglo-Indians to Lok Sabha has been abolished.',
  },
  {
    id: 'mcq-46',
    topic: 'Constitution',
    question: 'Who is the ex-officio Chairman of the Rajya Sabha?',
    options: ['President of India', 'Vice-President of India', 'Prime Minister of India', 'Speaker of Lok Sabha'],
    correctAnswerIndex: 1,
    explanation: 'The Vice-President of India is the ex-officio Chairman of the Rajya Sabha (Council of States).',
  },
  {
    id: 'mcq-47',
    topic: 'Constitution',
    question: 'Which part of the Indian Constitution deals with the Panchayats?',
    options: ['Part VIII', 'Part IX', 'Part IX-A', 'Part X'],
    correctAnswerIndex: 1,
    explanation: 'Part IX of the Constitution, titled "The Panchayats," was added by the 73rd Constitutional Amendment Act of 1992.',
  },
  {
    id: 'mcq-48',
    topic: 'Constitution',
    question: 'A Money Bill can only be introduced in:',
    options: ['The Rajya Sabha', 'The Lok Sabha', 'Either House of Parliament', 'A joint session of Parliament'],
    correctAnswerIndex: 1,
    explanation: 'As per Article 110 of the Constitution, a Money Bill can only be introduced in the Lok Sabha, and that too on the recommendation of the President.',
  },
  {
    id: 'mcq-49',
    topic: 'Legal Aptitude',
    question: 'The maxim "Ubi jus ibi remedium" means:',
    options: ['No one is a judge in his own cause', 'Where there is a right, there is a remedy', 'The law does not concern itself with trifles', 'An act of God'],
    correctAnswerIndex: 1,
    explanation: 'This legal maxim means that for every legal right that is violated, the law provides a remedy to the injured person.',
  },
  {
    id: 'mcq-50',
    topic: 'Legal Aptitude',
    question: 'What does "pro bono publico" mean?',
    options: ['For the public good', 'In good faith', 'A guilty mind', 'Something for something'],
    correctAnswerIndex: 0,
    explanation: '"Pro bono publico" is a Latin phrase that means "for the public good." It often refers to legal work undertaken voluntarily and without payment.',
  },
  {
    id: 'mcq-51',
    topic: 'Legal Aptitude',
    question: "'Battery' in the Law of Torts is defined as:",
    options: ['Threatening to cause harm', 'The intentional and direct application of force to another person', 'Damaging someone\'s reputation', 'Unlawful entry onto another\'s land'],
    correctAnswerIndex: 1,
    explanation: 'Battery is the actual act of inflicting unlawful physical harm or offensive contact upon a person. It is intentional and non-consensual.',
  },
  {
    id: 'mcq-52',
    topic: 'Legal Aptitude',
    question: 'The principle of "Res Ipsa Loquitur" is used to infer:',
    options: ['Malice', 'Intention', 'Negligence', 'Consent'],
    correctAnswerIndex: 2,
    explanation: '"Res Ipsa Loquitur" means "the thing speaks for itself." It is a doctrine that allows a plaintiff to infer negligence from the very nature of an accident or injury in the absence of direct evidence on how any defendant behaved.',
  },
  {
    id: 'mcq-53',
    topic: 'Legal Aptitude',
    question: "A 'plaintiff' is a person who:",
    options: ['Defends against a lawsuit', 'Files a lawsuit', 'Acts as a judge in a case', 'Is a witness in a case'],
    correctAnswerIndex: 1,
    explanation: 'The plaintiff is the party who initiates a lawsuit (also known as an action) before a court.',
  },
  {
    id: 'mcq-54',
    topic: 'Legal Aptitude',
    question: "An 'injunction' is a court order that:",
    options: ['Awards monetary compensation', 'Declares a law unconstitutional', 'Compels or prevents a specific action', 'Sentences a person to prison'],
    correctAnswerIndex: 2,
    explanation: 'An injunction is a judicial remedy issued in the form of a court order that compels a party to do or refrain from doing specific acts.',
  },
  {
    id: 'mcq-55',
    topic: 'Legal Aptitude',
    question: "The term 'alibi' in criminal law is a:",
    options: ['Type of evidence', 'Confession of guilt', 'Defense of being elsewhere', 'Plea for a lighter sentence'],
    correctAnswerIndex: 2,
    explanation: 'An alibi is a defense in which a defendant claims to have been at another place at the time a crime was committed.',
  },
  {
    id: 'mcq-56',
    topic: 'Legal Aptitude',
    question: "'Slander' is a form of defamation that is communicated through:",
    options: ['Writing', 'Spoken words', 'Gestures', 'All of the above'],
    correctAnswerIndex: 1,
    explanation: 'Defamation is divided into slander (spoken defamation) and libel (written or published defamation).',
  },
  {
    id: 'mcq-57',
    topic: 'General Knowledge',
    question: "Who is the author of 'Arthashastra'?",
    options: ['Kalidasa', 'Vishakhadatta', 'Kautilya', 'Banabhatta'],
    correctAnswerIndex: 2,
    explanation: 'The Arthashastra is an ancient Indian treatise on statecraft, economic policy, and military strategy, attributed to Kautilya (also known as Chanakya).',
  },
  {
    id: 'mcq-58',
    topic: 'General Knowledge',
    question: 'The First Battle of Panipat in 1526 was fought between:',
    options: ['Akbar and Hemu', 'Babur and Ibrahim Lodi', 'Humayun and Sher Shah Suri', 'Ahmed Shah Abdali and the Marathas'],
    correctAnswerIndex: 1,
    explanation: 'The First Battle of Panipat was fought between the invading forces of Babur and the Lodi dynasty, which marked the beginning of the Mughal Empire in India.',
  },
  {
    id: 'mcq-59',
    topic: 'General Knowledge',
    question: 'What is the capital city of Australia?',
    options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
    correctAnswerIndex: 2,
    explanation: 'While Sydney and Melbourne are larger and more famous, Canberra was chosen as the capital city of Australia in 1908 as a compromise between the two rivals.',
  },
  {
    id: 'mcq-60',
    topic: 'General Knowledge',
    question: 'The Durand Line forms the border between:',
    options: ['India and Pakistan', 'India and Afghanistan', 'Afghanistan and Pakistan', 'India and China'],
    correctAnswerIndex: 2,
    explanation: 'The Durand Line is the international 2,670-kilometer land border between Afghanistan and Pakistan in South-Central Asia.',
  },
  {
    id: 'mcq-61',
    topic: 'General Knowledge',
    question: 'Who was the first Indian to win a Nobel Prize?',
    options: ['C. V. Raman', 'Mother Teresa', 'Amartya Sen', 'Rabindranath Tagore'],
    correctAnswerIndex: 3,
    explanation: 'Rabindranath Tagore was the first Indian (and first non-European) to win the Nobel Prize in Literature in 1913 for his work "Gitanjali".',
  },
  {
    id: 'mcq-62',
    topic: 'General Knowledge',
    question: 'Which planet in our solar system is known as the "Red Planet"?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswerIndex: 1,
    explanation: 'Mars is often called the "Red Planet" because the iron oxide prevalent on its surface gives it a reddish appearance.',
  },
  {
    id: 'mcq-63',
    topic: 'General Knowledge',
    question: 'The scientific study of earthquakes is called:',
    options: ['Geology', 'Seismology', 'Meteorology', 'Volcanology'],
    correctAnswerIndex: 1,
    explanation: 'Seismology is the scientific study of earthquakes and the propagation of elastic waves (seismic waves) through the Earth.',
  },
  {
    id: 'mcq-64',
    topic: 'General Knowledge',
    question: 'Who founded the Mauryan Empire?',
    options: ['Ashoka', 'Bindusara', 'Chandragupta Maurya', 'Bimbisara'],
    correctAnswerIndex: 2,
    explanation: 'The Mauryan Empire was founded in 322 BCE by Chandragupta Maurya, who had overthrown the Nanda Dynasty.',
  },
  {
    id: 'mcq-65',
    topic: 'General Knowledge',
    question: 'The headquarters of UNESCO is located in:',
    options: ['Geneva, Switzerland', 'New York, USA', 'Paris, France', 'Rome, Italy'],
    correctAnswerIndex: 2,
    explanation: 'The headquarters of the United Nations Educational, Scientific and Cultural Organization (UNESCO) is located in Paris, France.',
  },
  {
    id: 'mcq-66',
    topic: 'English',
    question: "What is the one-word substitution for 'a place where birds are kept'?",
    options: ['Aquarium', 'Apiary', 'Aviary', 'Zoo'],
    correctAnswerIndex: 2,
    explanation: 'An aviary is a large cage, building, or enclosure for keeping birds in. An apiary is for bees.',
  },
  {
    id: 'mcq-67',
    topic: 'English',
    question: "What is the synonym for 'obfuscate'?",
    options: ['Clarify', 'Simplify', 'Explain', 'Confuse'],
    correctAnswerIndex: 3,
    explanation: 'To obfuscate means to make something obscure, unclear, or unintelligible. "Confuse" is the closest synonym.',
  },
  {
    id: 'mcq-68',
    topic: 'English',
    question: "What is the antonym for 'benevolent'?",
    options: ['Generous', 'Kind', 'Malevolent', 'Helpful'],
    correctAnswerIndex: 2,
    explanation: 'Benevolent means well-meaning and kindly. Malevolent means having or showing a wish to do evil to others.',
  },
  {
    id: 'mcq-69',
    topic: 'English',
    question: "What does the idiom 'a blessing in disguise' mean?",
    options: ['A solution that is obvious', 'A bad thing that seems good at first', 'A good thing that seemed bad at first', 'Something that is impossible to achieve'],
    correctAnswerIndex: 2,
    explanation: 'The idiom refers to something that appears to be a misfortune at first but turns out to have unexpected benefits.',
  },
  {
    id: 'mcq-70',
    topic: 'English',
    question: 'Choose the correctly spelled word.',
    options: ['Entreprenuer', 'Entrepranur', 'Entrepreneur', 'Entreprenur'],
    correctAnswerIndex: 2,
    explanation: 'The correct spelling for a person who sets up a business, taking on financial risks, is "Entrepreneur".',
  },
  {
    id: 'mcq-71',
    topic: 'English',
    question: "The idiom 'to be in a tight corner' means:",
    options: ['To be in a small room', 'To be in a difficult situation', 'To be very organized', 'To be secretive'],
    correctAnswerIndex: 1,
    explanation: 'Being "in a tight corner" or "in a tight spot" means being in a situation that is hard to get out of.',
  },
  {
    id: 'mcq-72',
    topic: 'English',
    question: 'A person who is indifferent to the pleasures and pains of life is known as a:',
    options: ['Hedonist', 'Ascetic', 'Stoic', 'Epicurean'],
    correctAnswerIndex: 2,
    explanation: 'A stoic is a person who can endure pain or hardship without showing their feelings or complaining.',
  },
  {
    id: 'mcq-73',
    topic: 'English',
    question: "Find the synonym of 'lucid'.",
    options: ['Vague', 'Murky', 'Clear', 'Complicated'],
    correctAnswerIndex: 2,
    explanation: 'Lucid means expressed clearly or easy to understand. "Clear" is a direct synonym.',
  },
  {
    id: 'mcq-74',
    topic: 'Logical Reasoning',
    question: 'Which word does NOT belong with the others?',
    options: ['Guitar', 'Flute', 'Violin', 'Cello'],
    correctAnswerIndex: 1,
    explanation: 'Guitar, Violin, and Cello are string instruments. A flute is a wind instrument.',
  },
  {
    id: 'mcq-75',
    topic: 'Logical Reasoning',
    question: "If 'Book' is to 'Read', then 'Fork' is to:",
    options: ['Cut', 'Eat', 'Spoon', 'Food'],
    correctAnswerIndex: 1,
    explanation: 'A book is an object used for the action of reading. A fork is an object used for the action of eating.',
  },
  {
    id: 'mcq-76',
    topic: 'Logical Reasoning',
    question: 'Complete the series: 3, 7, 15, 31, 63, ?',
    options: ['125', '126', '127', '128'],
    correctAnswerIndex: 2,
    explanation: 'The pattern is (previous number * 2) + 1. (3*2)+1=7, (7*2)+1=15, (15*2)+1=31, (31*2)+1=63, so (63*2)+1=127.',
  },
  {
    id: 'mcq-77',
    topic: 'Logical Reasoning',
    question: "A is B's sister. C is B's mother. D is C's father. How is A related to D?",
    options: ['Grandmother', 'Grandfather', 'Granddaughter', 'Daughter'],
    correctAnswerIndex: 2,
    explanation: "If C is B's mother, and A is B's sister, then C is also A's mother. If D is C's father, then D is A's maternal grandfather. Therefore, A is D's granddaughter.",
  },
  {
    id: 'mcq-78',
    topic: 'Logical Reasoning',
    question: 'Arrange the words in a meaningful sequence: 1. Police 2. Punishment 3. Crime 4. Judge 5. Judgment',
    options: ['3, 1, 4, 5, 2', '3, 1, 2, 4, 5', '1, 2, 3, 4, 5', '3, 1, 5, 4, 2'],
    correctAnswerIndex: 0,
    explanation: 'The logical sequence of events is: A Crime is committed (3), the Police investigate (1), the case goes to a Judge (4), who delivers a Judgment (5), which results in a Punishment (2).',
  },
  {
    id: 'mcq-79',
    topic: 'Logical Reasoning',
    question: "'Odometer' is to 'Mileage' as 'Compass' is to:",
    options: ['Speed', 'Direction', 'Needle', 'Hiking'],
    correctAnswerIndex: 1,
    explanation: 'An odometer is an instrument used to measure mileage (distance). A compass is an instrument used to determine direction.',
  },
  {
    id: 'mcq-80',
    topic: 'Current Affairs',
    question: 'Who won the Wimbledon Men\'s Singles title in 2023?',
    options: ['Novak Djokovic', 'Roger Federer', 'Rafael Nadal', 'Carlos Alcaraz'],
    correctAnswerIndex: 3,
    explanation: 'Carlos Alcaraz of Spain won the 2023 Wimbledon Championships Men\'s Singles title, defeating Novak Djokovic in the final.',
  },
  {
    id: 'mcq-81',
    topic: 'Current Affairs',
    question: 'The term \'Fintech\' is a portmanteau of:',
    options: ['Finance and Technology', 'Final Technique', 'Finish and Text', 'Future Technology'],
    correctAnswerIndex: 0,
    explanation: 'Fintech is a combination of the words "finance" and "technology" and refers to any technology used to improve or automate financial services.',
  },
  {
    id: 'mcq-82',
    topic: 'Current Affairs',
    question: 'Which country successfully landed the Chandrayaan-3 spacecraft on the south pole of the Moon in 2023?',
    options: ['USA', 'China', 'Russia', 'India'],
    correctAnswerIndex: 3,
    explanation: 'India made history by becoming the first country to successfully land a spacecraft, Chandrayaan-3, on the lunar south pole in August 2023.',
  },
  {
    id: 'mcq-83',
    topic: 'Current Affairs',
    question: 'The \'BRICS\' group of emerging economies originally consisted of Brazil, Russia, India, and China. Which country was added later to form "BRICS"?',
    options: ['Singapore', 'South Africa', 'Saudi Arabia', 'Spain'],
    correctAnswerIndex: 1,
    explanation: 'South Africa was formally invited to join the BRIC group in 2010, resulting in the acronym being changed to BRICS.',
  },
  {
    id: 'mcq-84',
    topic: 'Current Affairs',
    question: 'What does \'ChatGPT\' stand for?',
    options: ['Chat Global Protocol Technology', 'Chat Generative Pre-trained Transformer', 'Chat General Purpose Tool', 'Chat Graphical Processing Task'],
    correctAnswerIndex: 1,
    explanation: 'ChatGPT stands for Chat Generative Pre-trained Transformer. It is a large language model-based chatbot developed by OpenAI.',
  },
  {
    id: 'mcq-85',
    topic: 'Current Affairs',
    question: 'The Nobel Peace Prize for 2023 was awarded to Narges Mohammadi for her fight against the oppression of women in which country?',
    options: ['Afghanistan', 'Saudi Arabia', 'Iran', 'Syria'],
    correctAnswerIndex: 2,
    explanation: 'Narges Mohammadi, an imprisoned Iranian human rights activist, was awarded the Nobel Peace Prize 2023 for her work fighting for women\'s rights and democracy in Iran.',
  },
  {
    id: 'mcq-86',
    topic: 'Current Affairs',
    question: "'Operation Ganga' was an initiative by the Indian government to evacuate its citizens from:",
    options: ['Afghanistan', 'Ukraine', 'Sudan', 'Israel'],
    correctAnswerIndex: 1,
    explanation: 'Operation Ganga was an evacuation mission by the Government of India to evacuate its citizens stranded in neighboring countries during the 2022 Russian invasion of Ukraine.',
  },
  {
    id: 'mcq-87',
    topic: 'Current Affairs',
    question: 'Who was appointed as the CEO of YouTube in February 2023?',
    options: ['Susan Wojcicki', 'Sundar Pichai', 'Neal Mohan', 'Satya Nadella'],
    correctAnswerIndex: 2,
    explanation: 'Indian-American executive Neal Mohan was appointed as the new CEO of YouTube in February 2023, succeeding Susan Wojcicki.',
  },
  {
    id: 'mcq-88',
    topic: 'Current Affairs',
    question: 'The 2024 Summer Olympics are scheduled to be held in which city?',
    options: ['Los Angeles', 'Brisbane', 'Tokyo', 'Paris'],
    correctAnswerIndex: 3,
    explanation: 'The 2024 Summer Olympics, officially the Games of the XXXIII Olympiad, are scheduled to take place in Paris, France.',
  },
  {
    id: 'mcq-89',
    topic: 'Constitution',
    question: 'The Eighth Schedule of the Indian Constitution recognizes how many official languages?',
    options: ['18', '20', '22', '24'],
    correctAnswerIndex: 2,
    explanation: 'The Eighth Schedule to the Constitution of India lists the official languages of the Republic of India. It currently recognizes 22 languages.',
  },
  {
    id: 'mcq-90',
    topic: 'Legal Aptitude',
    question: 'In the context of a contract, \'coercion\' as defined by the Indian Contract Act, 1872, involves:',
    options: ['Persuasion', 'Emotional pressure', 'Committing or threatening to commit an act forbidden by the IPC', 'Providing false information'],
    correctAnswerIndex: 2,
    explanation: 'Section 15 of the Indian Contract Act defines coercion as committing, or threatening to commit, any act forbidden by the Indian Penal Code, or the unlawful detaining, or threatening to detain, any property.',
  },
  {
    id: 'mcq-91',
    topic: 'Constitution',
    question: 'Who has the power to promulgate ordinances when the Parliament is not in session?',
    options: ['The Prime Minister', 'The Chief Justice of India', 'The President of India', 'The Speaker of the Lok Sabha'],
    correctAnswerIndex: 2,
    explanation: 'Article 123 of the Constitution grants the President of India the power to promulgate ordinances during the recess of Parliament. These ordinances have the same force and effect as an Act of Parliament.',
  },
  {
    id: 'mcq-92',
    topic: 'Legal Aptitude',
    question: 'The legal maxim "audi alteram partem" means:',
    options: ['No one can be a judge in his own case', 'Let the other side be heard as well', 'The thing speaks for itself', 'An act of God'],
    correctAnswerIndex: 1,
    explanation: 'A fundamental principle of natural justice, "audi alteram partem" means that no person should be judged without a fair hearing in which each party is given the opportunity to respond to the evidence against them.',
  },
  {
    id: 'mcq-93',
    topic: 'English',
    question: 'What does the idiom "to steal someone\'s thunder" mean?',
    options: ['To physically steal something valuable', 'To take credit for someone else\'s work or idea', 'To make a loud noise', 'To scare someone'],
    correctAnswerIndex: 1,
    explanation: 'The idiom means to win praise for oneself by pre-empting someone else\'s attempt to impress.',
  },
  {
    id: 'mcq-94',
    topic: 'General Knowledge',
    question: 'The Saka Era was started by which ruler?',
    options: ['Ashoka', 'Kanishka', 'Harsha', 'Chandragupta Vikramaditya'],
    correctAnswerIndex: 1,
    explanation: 'The Saka Era, which is used as the official civil calendar in India, is believed to have been founded by the Kushan king Kanishka in 78 CE.',
  },
  {
    id: 'mcq-95',
    topic: 'Logical Reasoning',
    question: 'Find the odd one out: January, May, July, November',
    options: ['January', 'May', 'July', 'November'],
    correctAnswerIndex: 3,
    explanation: 'January, May, and July all have 31 days. November has 30 days.',
  },
  {
    id: 'mcq-96',
    topic: 'Constitution',
    question: 'The procedure for the amendment of the Indian Constitution is provided in which article?',
    options: ['Article 360', 'Article 368', 'Article 370', 'Article 356'],
    correctAnswerIndex: 1,
    explanation: 'Article 368 in Part XX of the Constitution of India provides for the procedure for amending the Constitution by the Parliament.',
  },
  {
    id: 'mcq-97',
    topic: 'Legal Aptitude',
    question: 'What is a "tort"?',
    options: ['A criminal offense', 'A breach of contract', 'A civil wrong for which a remedy is usually damages', 'A type of tax'],
    correctAnswerIndex: 2,
    explanation: 'A tort is an act or omission that gives rise to injury or harm to another and amounts to a civil wrong for which courts impose liability. The most common remedy is an award of damages.',
  },
  {
    id: 'mcq-98',
    topic: 'English',
    question: 'A person who hates humankind and avoids human society is called a:',
    options: ['Philanthropist', 'Misanthrope', 'Optimist', 'Altruist'],
    correctAnswerIndex: 1,
    explanation: 'A misanthrope is a person who dislikes humankind and avoids human society. A philanthropist is someone who seeks to promote the welfare of others.',
  },
  {
    id: 'mcq-99',
    topic: 'Logical Reasoning',
    question: 'Look at this series: 7, 10, 8, 11, 9, 12, ... What number should come next?',
    options: ['7', '10', '12', '13'],
    correctAnswerIndex: 1,
    explanation: 'This is an alternating series. The first pattern is 7, 8, 9, ... (add 1). The second pattern is 10, 11, 12, ... (add 1). The next number in the first pattern is 10.',
  },
  {
    id: 'mcq-100',
    topic: 'General Knowledge',
    question: 'Who wrote the Indian National Anthem, "Jana Gana Mana"?',
    options: ['Bankim Chandra Chatterjee', 'Rabindranath Tagore', 'Sarojini Naidu', 'Swami Vivekananda'],
    correctAnswerIndex: 1,
    explanation: 'The Indian National Anthem, "Jana Gana Mana," was composed by Rabindranath Tagore in its original Bengali version.',
  },
  {
    id: 'mcq-101',
    topic: 'Constitution',
    question: 'The concept of a "Union of States" in the Indian Constitution was adopted from which country?',
    options: ['USA (American Model)', 'Australia', 'Canada (Canadian Model)', 'United Kingdom'],
    correctAnswerIndex: 2,
    explanation: 'The phrase "Union of States" has been preferred to "Federation of States" to indicate that the Indian federation is not the result of an agreement by the states to join a federation and that states have no right to secede. This is a key feature of the Canadian model.',
  },
  {
    id: 'mcq-102',
    topic: 'Legal Aptitude',
    question: 'What is the literal meaning of the term "Locus Standi"?',
    options: ['A place of standing', 'A pending suit', 'A friend of the court', 'A matter decided'],
    correctAnswerIndex: 0,
    explanation: 'Locus standi means the right or capacity to bring an action or to appear in a court. Literally, it means a place of standing.',
  },
  {
    id: 'mcq-103',
    topic: 'English',
    question: 'What is the meaning of the idiom "to throw in the towel"?',
    options: ['To start a fight', 'To go to sleep', 'To admit defeat', 'To clean up a mess'],
    correctAnswerIndex: 2,
    explanation: 'The phrase "to throw in the towel" originates from boxing, where a fighter\'s corner would throw a towel into the ring to signal they were conceding the fight. It means to give up.',
  },
  {
    id: 'mcq-104',
    topic: 'General Knowledge',
    question: 'The "Chipko Movement" was primarily concerned with:',
    options: ['Water conservation', 'Forest conservation', 'Soil conservation', 'Wildlife protection'],
    correctAnswerIndex: 1,
    explanation: 'The Chipko movement was a forest conservation movement in India where villagers, especially women, would hug trees to prevent them from being cut down.',
  },
  {
    id: 'mcq-105',
    topic: 'Current Affairs',
    question: 'What is a "Unicorn" in the context of business startups?',
    options: ['A startup with a unique idea', 'A startup that has failed', 'A privately held startup company with a value of over $1 billion', 'A government-funded startup'],
    correctAnswerIndex: 2,
    explanation: 'The term "unicorn" is used in the venture capital industry to refer to a privately held startup company with a valuation of over US$1 billion.',
  },
  {
    id: 'mcq-106',
    topic: 'Logical Reasoning',
    question: 'CUP is to LIP as BIRD is to:',
    options: ['BUSH', 'GRASS', 'FOREST', 'BEAK'],
    correctAnswerIndex: 3,
    explanation: 'A cup is used by touching it to the lips. A bird uses its beak to interact with the world in a similar way (eating, etc.).',
  },
  {
    id: 'mcq-107',
    topic: 'Constitution',
    question: 'What does the "Right to Constitutional Remedies" under Article 32 empower a citizen to do?',
    options: ['To amend the Constitution', 'To move the Supreme Court to enforce their Fundamental Rights', 'To seek advisory opinions from the President', 'To appeal any High Court decision'],
    correctAnswerIndex: 1,
    explanation: 'Article 32 is called the "heart and soul" of the Constitution by Dr. Ambedkar because it provides a guaranteed remedy for the enforcement of all other Fundamental Rights. A citizen can directly approach the Supreme Court if their rights are violated.',
  },
  {
    id: 'mcq-108',
    topic: 'Legal Aptitude',
    question: 'A "contingent contract" is a contract to do or not to do something, if some event, collateral to such contract, _____ or _____ happen.',
    options: ['does, does not', 'will, will not', 'may, may not', 'should, should not'],
    correctAnswerIndex: 0,
    explanation: 'As per Section 31 of the Indian Contract Act, 1872, a contingent contract is based on the happening or non-happening of a future uncertain event.',
  },
  {
    id: 'mcq-109',
    topic: 'English',
    question: 'A person who can do many different jobs or activities well is called:',
    options: ['Specialist', 'Versatile', 'Amateur', 'Professional'],
    correctAnswerIndex: 1,
    explanation: 'Versatile means being able to adapt or be adapted to many different functions or activities.',
  },
  {
    id: 'mcq-110',
    topic: 'General Knowledge',
    question: 'The first "Law Commission" in independent India was established in which year?',
    options: ['1950', '1952', '1955', '1960'],
    correctAnswerIndex: 2,
    explanation: 'The first Law Commission of independent India was established in 1955, with its first chairman being the then Attorney-General of India, Mr. M. C. Setalvad.',
  }
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
    topic: 'Fundamental Duties (Art 51A)',
    category: 'Constitution',
    content: `Added to Part IV-A of the Constitution by the 42nd Amendment in 1976 on the recommendations of the Swaran Singh Committee.
- **Nature:** Like DPSPs, they are non-justiciable.
- **Total Duties:** Originally 10, one more was added by the 86th Amendment Act, 2002. Total 11 duties now.
- **Examples:**
  - To abide by the Constitution and respect its ideals and institutions.
  - To uphold and protect the sovereignty, unity, and integrity of India.
  - To promote harmony and the spirit of common brotherhood.
  - To develop the scientific temper, humanism, and the spirit of inquiry and reform.
  - To provide opportunities for education to one's child or ward between the age of six and fourteen years (added in 2002).`,
    links: [],
  },
  {
    topic: 'The President of India',
    category: 'Constitution',
    content: `The President is the head of the Indian State and the first citizen of India.
- **Election (Art. 54 & 55):** Elected not directly by the people but by an electoral college consisting of elected members of both Houses of Parliament and elected members of the Legislative Assemblies of the States.
- **Qualification (Art. 58):** Must be a citizen of India, 35 years of age, and qualified for election as a member of the Lok Sabha.
- **Powers:**
  - **Executive:** Appoints Prime Minister, Council of Ministers, Governors, etc.
  - **Legislative:** Summons and prorogues Parliament, promulgates ordinances (Art. 123).
  - **Financial:** Money bills can be introduced only with his prior recommendation.
  - **Judicial:** Appoints judges, has the power to grant pardons (Art. 72).
  - **Emergency:** Can declare National, State (President's Rule), and Financial emergencies.
- **Impeachment (Art. 61):** Can be removed from office for 'violation of the Constitution' by a quasi-judicial process in Parliament.`,
    links: [],
  },
  {
    topic: 'The Parliament',
    category: 'Constitution',
    content: `The Parliament is the supreme legislative body of India, consisting of the President and two Houses.
- **Rajya Sabha (Council of States):** The Upper House. It represents the states and union territories.
  - **Composition:** Maximum 250 members (238 elected, 12 nominated by the President).
  - **Tenure:** It is a permanent body and not subject to dissolution. One-third of its members retire every two years. The term of a member is 6 years.
- **Lok Sabha (House of the People):** The Lower House. Represents the people of India.
  - **Composition:** Maximum 550 members (530 from states, 20 from UTs).
  - **Tenure:** Normal term is 5 years, but can be dissolved earlier by the President.
- **Legislative Procedure:** A bill passes through three readings in each House, then receives Presidential assent to become an Act. In case of a deadlock between the two Houses, a joint sitting can be convened (Art. 108). Money bills (Art. 110) can only originate in the Lok Sabha.`,
    links: [],
  },
  {
    topic: 'The Supreme Court',
    category: 'Constitution',
    content: `The Supreme Court of India is the highest judicial court and the final court of appeal under the Constitution.
- **Composition (Art. 124):** Consists of the Chief Justice of India (CJI) and not more than 33 other judges.
- **Appointment:** Judges are appointed by the President after consultation with other judges (collegium system).
- **Jurisdiction:**
  - **Original Jurisdiction (Art. 131):** Decides disputes between the Centre and states, or between states.
  - **Writ Jurisdiction (Art. 32):** Issues writs for the enforcement of Fundamental Rights.
  - **Appellate Jurisdiction (Art. 132-136):** Hears appeals from High Courts in civil, criminal, and constitutional matters. Special Leave to Appeal (SLP) under Art. 136 is a discretionary power.
  - **Advisory Jurisdiction (Art. 143):** President can seek the opinion of the Supreme Court on any question of law or fact.
- **Judicial Review:** Power to examine the constitutionality of legislative and executive actions.`,
    links: [],
  },
  {
    topic: 'Emergency Provisions',
    category: 'Constitution',
    content: `Part XVIII of the Constitution deals with situations of crisis.
- **National Emergency (Art. 352):** Can be declared on the grounds of 'war', 'external aggression', or 'armed rebellion'. During this, the federal structure becomes unitary.
- **State Emergency / President's Rule (Art. 356):** Can be imposed in a state on the ground of failure of constitutional machinery. The President assumes the functions of the state government.
- **Financial Emergency (Art. 360):** Can be proclaimed if the financial stability or credit of India is threatened. The Centre can give financial directions to any state. This has never been imposed in India.`,
    links: [],
  },
  {
    topic: 'Constitutional Amendments',
    category: 'Constitution',
    content: `The procedure for amendment is laid down in Article 368.
- **Procedure:** An amendment can be initiated only by the introduction of a bill in either House of Parliament. It must be passed in each House by a special majority (a majority of the total membership of that House and a majority of not less than two-thirds of the members present and voting).
- **Types of Amendment:**
  1. **By Simple Majority:** For matters like formation of new states, citizenship, etc. (Outside the scope of Art. 368).
  2. **By Special Majority:** For most provisions, including Fundamental Rights and DPSPs.
  3. **By Special Majority + Ratification by half of the States:** For federal provisions like the election of the President, powers of Supreme Court/High Courts, etc.
- **Basic Structure Doctrine:** The Supreme Court in the Kesavananda Bharati case ruled that Parliament can amend any part of the Constitution but cannot alter its 'basic structure'.`,
    links: [{ title: 'List of Important Amendments', url: 'https://www.drishtiias.com/to-the-points/Paper2/important-amendments-in-the-indian-constitution-part-1' }],
  },
  {
    topic: 'Panchayati Raj & Municipalities',
    category: 'Constitution',
    content: `Constitutional status was granted through the 73rd and 74th Amendment Acts of 1992.
- **73rd Amendment (Panchayati Raj):** Added Part IX and the 11th Schedule. Established a three-tier system of panchayats in every state:
  1. **Village Panchayat** at the village level.
  2. **Panchayat Samiti** at the block level.
  3. **Zila Parishad** at the district level.
- **74th Amendment (Municipalities):** Added Part IX-A and the 12th Schedule. Established three types of municipalities:
  1. **Nagar Panchayat** for a transitional area.
  2. **Municipal Council** for a smaller urban area.
  3. **Municipal Corporation** for a larger urban area.
These amendments aimed to decentralize power and promote local self-government.`,
    links: [],
  },
  // Legal Aptitude
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
  {
    topic: 'Negligence',
    category: 'Legal Aptitude',
    content: `Negligence is a breach of a legal duty to take care which results in damage to the claimant.
- **Essential Elements:** To prove negligence, the plaintiff must establish four things:
  1. **Duty of Care:** The defendant owed a legal duty of care to the plaintiff. This is based on the 'neighbour principle' from the case of *Donoghue v. Stevenson*.
  2. **Breach of Duty:** The defendant breached that duty by failing to act as a 'reasonable person' would have.
  3. **Causation:** The defendant's breach of duty was the actual and proximate cause of the plaintiff's injury.
  4. **Damages:** The plaintiff suffered legally recognizable harm or injury as a result.
- **Defenses:**
  - **Contributory Negligence:** The plaintiff's own negligence contributed to their injury.
  - **Volenti non fit injuria:** Voluntary assumption of risk.`,
    links: [],
  },
  {
    topic: 'Defamation',
    category: 'Legal Aptitude',
    content: `Defamation is the publication of a statement which tends to lower a person in the estimation of right-thinking members of society generally.
- **Types:**
  - **Libel:** Defamation in a permanent form (e.g., writing, printing, pictures). It is actionable per se (without proof of actual damage).
  - **Slander:** Defamation in a transient form (e.g., spoken words, gestures). It is generally actionable only on proof of actual damage.
- **Essentials:**
  1. The statement must be defamatory.
  2. The statement must refer to the plaintiff.
  3. The statement must be published (communicated to a third party).
- **Defenses:**
  - **Justification or Truth:** The statement was true.
  - **Fair Comment:** The statement was an opinion, not an assertion of fact, on a matter of public interest.
  - **Privilege:** The statement was made on a privileged occasion (e.g., in Parliament, court proceedings).`,
    links: [],
  },
  {
    topic: 'Vicarious Liability',
    category: 'Legal Aptitude',
    content: `Vicarious liability is a situation where one person is held legally responsible for the torts committed by another.
- **Basis:** It's a form of strict liability (no-fault). The person held liable is not at fault themselves.
- **Common Relationships:**
  - **Master and Servant (Employer and Employee):** An employer is liable for torts committed by their employee *in the course of employment*.
  - **Principal and Agent:** A principal is liable for the torts of their agent committed within the scope of their authority.
  - **Partners:** All partners in a firm are liable for the torts of any one partner committed in the ordinary course of the firm's business.
- **Reasoning:** The doctrine is based on principles like 'respondeat superior' (let the master answer) and the idea that the employer, who profits from the employee's work, should also bear the losses caused by it.`,
    links: [],
  },
  {
    topic: 'Trespass',
    category: 'Legal Aptitude',
    content: `Trespass is a direct and unlawful interference with another person or their property.
- **Trespass to Person:**
  - **Assault:** An act that causes a reasonable apprehension of the infliction of immediate, unlawful force. (e.g., pointing a loaded gun).
  - **Battery:** The intentional and direct application of force to another person without consent. (e.g., actually hitting someone).
  - **False Imprisonment:** Unlawful restraint on a person's liberty which restricts their freedom of movement.
- **Trespass to Land:** Unjustifiable interference with the possession of land. This can be by entering the land, remaining on it, or placing objects on it. It is actionable per se.
- **Trespass to Goods:** Wrongful interference with goods that are in the possession of another. This includes taking the goods or damaging them.`,
    links: [],
  },
  {
    topic: 'Introduction to Contracts',
    category: 'Legal Aptitude',
    content: `A contract is an agreement enforceable by law. The primary legislation is the Indian Contract Act, 1872.
- **Key Equation:** Contract = Agreement + Enforceability by Law
- **Agreement:** An agreement is formed by an 'offer' from one party and an 'acceptance' by another. Agreement = Offer + Acceptance.
- **Essentials of a Valid Contract (Section 10):**
  1. **Offer and Acceptance:** A lawful offer and a lawful acceptance.
  2. **Intention to Create Legal Relations:** Parties must intend their agreement to have legal consequences.
  3. **Lawful Consideration:** 'Quid pro quo' or 'something in return'.
  4. **Capacity of Parties:** Parties must be competent to contract (age of majority, sound mind).
  5. **Free Consent:** Consent must not be obtained through coercion, undue influence, fraud, misrepresentation, or mistake.
  6. **Lawful Object:** The purpose of the agreement must not be illegal, immoral, or against public policy.
  7. **Certainty of Meaning:** The terms of the agreement must be clear and not vague.
  8. **Possibility of Performance:** The act agreed upon must be possible to perform.`,
    links: [],
  },
  {
    topic: 'Offer and Acceptance',
    category: 'Legal Aptitude',
    content: `The foundation of any contract is a valid offer and its acceptance.
- **Offer (Proposal):** When one person signifies to another their willingness to do or to abstain from doing anything, with a view to obtaining the assent of that other.
  - An offer must be certain, definite, and not vague.
  - An 'invitation to offer' (e.g., price tags, menus, advertisements) is not an offer. It invites the other party to make an offer.
- **Acceptance:** When the person to whom the proposal is made signifies their assent thereto.
  - Acceptance must be absolute and unconditional. A conditional acceptance is a 'counter-offer'.
  - It must be communicated to the offeror.
  - It must be in the prescribed mode, if any.
- **Communication:** Communication of offer is complete when it comes to the knowledge of the person to whom it is made. Communication of acceptance is complete against the proposer when it is put in a course of transmission to him.`,
    links: [],
  },
  {
    topic: 'Consideration and Capacity',
    category: 'Legal Aptitude',
    content: `**Consideration (Section 2(d)):** 'Something in return'. It is the price for which the promise of the other is bought.
- **Rules:**
  - It must move at the desire of the promisor.
  - It may be past, present, or future.
  - It need not be adequate, but it must be real and not illusory.
  - An agreement without consideration is void ('nudum pactum'), with some exceptions.
**Capacity to Contract (Section 11):** Every person is competent to contract who is:
1. **Of the age of majority:** According to the law to which they are subject (18 years in India). A contract with a minor is **void ab initio** (void from the beginning), as held in *Mohori Bibee v. Dharmodas Ghose*.
2. **Of sound mind:** A person is of sound mind if, at the time of making the contract, they are capable of understanding it and forming a rational judgment as to its effect upon their interests.
3. **Not disqualified from contracting by any law:** e.g., alien enemies, convicts.`,
    links: [],
  },
  {
    topic: 'Free Consent',
    category: 'Legal Aptitude',
    content: `For a contract to be valid, the consent of the parties must be free. Consent is not free when it is caused by (Section 14):
1. **Coercion (Section 15):** Committing or threatening to commit any act forbidden by the Indian Penal Code, or unlawfully detaining property to the prejudice of any person, with the intention of causing any person to enter into an agreement.
2. **Undue Influence (Section 16):** Where one party is in a position to dominate the will of the other and uses that position to obtain an unfair advantage. (e.g., doctor-patient, lawyer-client).
3. **Fraud (Section 17):** Includes intentionally making a false statement, active concealment of a fact, or any other act fitted to deceive.
4. **Misrepresentation (Section 18):** An innocent false statement. The person making it believes it to be true.
5. **Mistake (Section 20-22):** A mistake of fact by both parties on an essential matter makes the agreement void. A mistake of law is generally not an excuse.
Contracts caused by coercion, undue influence, fraud, or misrepresentation are **voidable** at the option of the aggrieved party.`,
    links: [],
  },
  {
    topic: 'Breach of Contract & Remedies',
    category: 'Legal Aptitude',
    content: `A breach of contract occurs when a party fails to perform their obligations under the contract. The aggrieved party is entitled to certain remedies.
- **Types of Breach:**
  - **Actual Breach:** Failure to perform when performance is due.
  - **Anticipatory Breach:** A party indicates their intention not to perform the contract before the performance is due.
- **Remedies:**
  1. **Rescission of the Contract:** The aggrieved party can cancel the contract and is absolved of their obligations.
  2. **Suit for Damages:** The primary remedy. The aim is to compensate the injured party for the loss suffered.
     - **Types of Damages:** Ordinary, Special, Exemplary (punitive), Nominal.
     - The rule in *Hadley v. Baxendale* governs the calculation: only losses that arise naturally from the breach or were in the contemplation of both parties are recoverable.
  3. **Suit for Specific Performance:** The court directs the defaulting party to perform the promise as per the contract terms. This is granted when damages are not an adequate remedy.
  4. **Suit for Injunction:** An order of the court restraining a person from doing a particular act.
  5. **Suit upon Quantum Meruit:** 'As much as is earned'. A claim for reasonable remuneration for the part of the contract already performed.`,
    links: [],
  },
  {
    topic: 'Introduction to Criminal Law',
    category: 'Legal Aptitude',
    content: `Criminal law deals with offenses against the state or society at large. The main statutes are the Indian Penal Code (IPC), 1860, and the Code of Criminal Procedure (CrPC), 1973.
- **Core Principle:** An act does not make a person guilty unless the mind is also guilty. This is expressed in the maxim: **Actus non facit reum nisi mens sit rea**.
- **Elements of a Crime:**
  1. **Human Being:** The act must be committed by a human being.
  2. **Mens Rea (Guilty Mind):** The mental element of the crime. It can be intention, knowledge, recklessness, or negligence.
  3. **Actus Reus (Guilty Act):** The physical element of the crime, i.e., the prohibited act or omission.
  4. **Injury:** The act must cause some harm or injury to another person or society.
- **Standard of Proof:** The prosecution has the burden to prove the guilt of the accused **beyond a reasonable doubt**.
- **Types of Offences:** Cognizable (police can arrest without a warrant) and Non-cognizable (warrant required). Bailable and Non-bailable.`,
    links: [],
  },
  {
    topic: 'General Exceptions (IPC)',
    category: 'Legal Aptitude',
    content: `Chapter IV of the IPC (Sections 76-106) lists general defenses that can absolve a person of criminal liability. These include: Mistake of fact, Judicial acts, Accident, Infancy (doli incapax), Insanity (McNaughten rules), Intoxication (if involuntary), Consent, Private Defence.`,
    links: []
  },
  {
    topic: 'Offences Against the Body',
    category: 'Legal Aptitude',
    content: `Covers major crimes affecting human life and body. Key distinctions:
- **Culpable Homicide (Sec 299) vs. Murder (Sec 300):** All murders are culpable homicides, but not vice-versa. Murder is an aggravated form of culpable homicide with a higher degree of intent/knowledge.
- **Kidnapping vs. Abduction:** Kidnapping is from lawful guardianship (victim is a minor/unsound mind). Abduction involves force/deceit (victim can be anyone).
- **Assault and Criminal Force.**`,
    links: []
  },
  {
    topic: 'Offences Against Property',
    category: 'Legal Aptitude',
    content: `Focuses on crimes related to property. Key distinctions:
- **Theft (Sec 378):** Dishonest taking of movable property out of another's possession without consent.
- **Extortion (Sec 383):** Dishonestly inducing a person to deliver property by putting them in fear of injury.
- **Robbery (Sec 390):** An aggravated form of either theft or extortion, involving violence or threat of violence.
- **Dacoity (Sec 391):** Robbery committed by five or more persons.`,
    links: []
  },
  {
    topic: 'Audi Alteram Partem',
    category: 'Legal Maxims',
    content: `Means "let the other side be heard as well". It is a fundamental principle of natural justice. No person should be judged without a fair hearing where each party is given the opportunity to respond to the evidence against them. It ensures fairness in legal proceedings.`,
    links: []
  },
  {
    topic: 'Res Ipsa Loquitur',
    category: 'Legal Maxims',
    content: `Means "the thing speaks for itself". In tort law, it is a doctrine that allows a plaintiff to infer negligence from the very nature of an accident or injury, even without direct evidence of the defendant's behavior. The accident must be of a kind that does not ordinarily occur without negligence.`,
    links: []
  },
  {
    topic: 'Volenti Non Fit Injuria',
    category: 'Legal Maxims',
    content: `Means "to a willing person, injury is not done". It is a defense in tort law where a person who knowingly and voluntarily puts themselves at risk cannot sue for any resulting injury. The consent must be free and informed.`,
    links: []
  },
  {
    topic: 'Ubi Jus Ibi Remedium',
    category: 'Legal Maxims',
    content: `Means "where there is a right, there is a remedy". This maxim states that for every legal right that is violated, the law provides a remedy to the injured person. It underscores the principle that legal rights are meaningless without a mechanism to enforce them.`,
    links: []
  },
  {
    topic: 'Actus Non Facit Reum Nisi Mens Sit Rea',
    category: 'Legal Maxims',
    content: `Means "an act does not make a person guilty unless the mind is also guilty". This is the foundational principle of criminal law, establishing that a crime consists of two elements: the guilty act (Actus Reus) and the guilty mind (Mens Rea).`,
    links: []
  },
  {
    topic: 'Ancient Indian History',
    category: 'General Knowledge',
    content: `Covers the period from pre-history to the 7th century AD.
- **Indus Valley Civilization (c. 2500-1900 BC):** A Bronze Age civilization known for urban planning (Harappa, Mohenjo-Daro), drainage systems, and seals.
- **Vedic Period (c. 1500-500 BC):** Characterized by the composition of the Vedas. Early Vedic (Rigvedic) society was pastoral, later Vedic society saw the rise of kingdoms (Mahajanapadas).
- **Buddhism and Jainism (6th century BC):** Rise of new religious movements led by Gautama Buddha and Mahavira.
- **Mauryan Empire (c. 322-185 BC):** Founded by Chandragupta Maurya. Ashoka the Great is its most famous ruler, known for promoting Buddhism after the Kalinga War.
- **Gupta Empire (c. 320-550 AD):** Known as the "Golden Age of India" for its achievements in science, mathematics (concept of zero), astronomy, religion, and Sanskrit literature.`,
    links: [],
  },
  {
    topic: 'Medieval Indian History',
    category: 'General Knowledge',
    content: `Covers the period from the 8th to the 18th century.
- **Delhi Sultanate (1206-1526):** A series of five dynasties (Slave, Khilji, Tughlaq, Sayyid, Lodi) that ruled from Delhi.
- **Mughal Empire (1526-1857):** Founded by Babur after the First Battle of Panipat. Known for great rulers like Akbar (religious tolerance, Din-i-Ilahi), Shah Jahan (architecture, Taj Mahal), and Aurangzeb.
- **Vijayanagara Empire (c. 1336-1646):** A powerful South Indian empire known for its rich culture and administration, particularly under Krishnadevaraya.
- **Bhakti and Sufi Movements:** Religious reform movements that preached devotion and love for God.`,
    links: [],
  },
  {
    topic: 'Modern Indian History',
    category: 'General Knowledge',
    content: `Covers the period from the arrival of Europeans to Indian independence.
- **Arrival of Europeans:** Portuguese, Dutch, English, and French trading companies established bases in India.
- **British Rule:** The British East India Company gained political power after the Battle of Plassey (1757) and Battle of Buxar (1764).
- **Revolt of 1857:** First major uprising against British rule, leading to the transfer of power from the Company to the British Crown.
- **Indian National Movement:** Formation of the Indian National Congress (1885). The movement had moderate and extremist phases.
- **Gandhian Era (1915-1947):** Mahatma Gandhi led major movements like Non-Cooperation (1920), Civil Disobedience (Dandi March, 1930), and Quit India (1942).
- **Independence and Partition:** India gained independence on August 15, 1947, but was also partitioned into India and Pakistan.`,
    links: [],
  },
  {
    topic: 'Indian Geography',
    category: 'General Knowledge',
    content: `Key aspects of the physical and political geography of India.
- **Location:** Located in the Northern Hemisphere, with the Tropic of Cancer passing through it.
- **Physical Features:** The Himalayan Mountains, the Northern Plains, the Peninsular Plateau, the Indian Desert (Thar), the Coastal Plains, and the Islands (Andaman & Nicobar, Lakshadweep).
- **River Systems:** The Himalayan rivers (Indus, Ganga, Brahmaputra) and the Peninsular rivers (Narmada, Tapi, Godavari, Krishna, Kaveri).
- **Climate:** Primarily a tropical monsoon climate.
- **States and Capitals:** Knowledge of all states, union territories, and their capitals.`,
    links: [],
  },
  {
    topic: 'World Geography',
    category: 'General Knowledge',
    content: `Basic knowledge about the world's geography.
- **Continents and Oceans:** Seven continents (Asia, Africa, North America, South America, Antarctica, Europe, Australia) and five oceans (Pacific, Atlantic, Indian, Southern, Arctic).
- **Major Landforms:** Important mountain ranges (Andes, Rockies, Alps), plateaus, deserts (Sahara, Gobi), and plains.
- **Important Rivers:** Nile, Amazon, Yangtze, Mississippi.
- **Imaginary Lines:** Equator, Tropics of Cancer and Capricorn, Prime Meridian, International Date Line.
- **Capitals and Currencies:** Knowledge of major countries, their capitals, and currencies.`,
    links: [],
  },
  {
    topic: 'Indian Economy Basics',
    category: 'General Knowledge',
    content: `Fundamental concepts of the Indian economy.
- **Sectors of Economy:** Primary (Agriculture), Secondary (Industry), and Tertiary (Services). The service sector is the largest contributor to India's GDP.
- **Key Terms:**
  - **GDP (Gross Domestic Product):** Total value of goods and services produced within a country's borders in a year.
  - **Inflation:** The rate at which the general level of prices for goods and services is rising, and subsequently, purchasing power is falling.
  - **Fiscal Policy:** The use of government spending and taxation to influence the economy.
  - **Monetary Policy:** Actions undertaken by the central bank (RBI) to manipulate the money supply and credit conditions.
- **Institutions:**
  - **RBI (Reserve Bank of India):** India's central bank.
  - **SEBI (Securities and Exchange Board of India):** Regulator for the securities market.
  - **NITI Aayog:** The government's policy think-tank, which replaced the Planning Commission.`,
    links: [],
  },
  {
    topic: 'International Organizations',
    category: 'General Knowledge',
    content: `Knowledge of major global bodies, their functions, and headquarters.
- **United Nations (UN):** Founded in 1945 to maintain international peace and security. Headquarters in New York. Key organs include the General Assembly, Security Council, and International Court of Justice.
- **World Trade Organization (WTO):** Deals with the rules of trade between nations. Headquarters in Geneva.
- **International Monetary Fund (IMF):** Works to foster global monetary cooperation and secure financial stability. Headquarters in Washington, D.C.
- **World Bank:** Provides financial and technical assistance to developing countries. Headquarters in Washington, D.C.
- **Other bodies:** WHO (Geneva), UNESCO (Paris), ASEAN, SAARC, BRICS, G20.`,
    links: [],
  },
  {
    topic: 'Reading Comprehension Strategies',
    category: 'English',
    content: `Skills to effectively read and understand passages.
1. **Skim the Passage First:** Get a general idea of the topic, main idea, and structure.
2. **Identify the Main Idea:** What is the central point the author is trying to make?
3. **Understand the Tone:** Is the author's tone objective, critical, supportive, or something else?
4. **Focus on Keywords:** Pay attention to transition words (e.g., however, therefore, because) that signal relationships between ideas.
5. **Paraphrase:** After reading a paragraph, try to summarize it in your own words.
6. **Tackle Questions:** Read questions carefully. Refer back to the passage to find answers. Distinguish between questions asking for explicit details and those asking for inferences.`,
    links: [],
  },
  {
    topic: 'Idioms and Phrases',
    category: 'English',
    content: `Commonly used expressions with figurative meanings.
- **Bite the bullet:** To face a difficult situation with courage.
- **Blessing in disguise:** A good thing that seemed bad at first.
- **Spill the beans:** To reveal a secret.
- **Hit the nail on the head:** To say something exactly right.
- **Once in a blue moon:** Happens very rarely.
- **A piece of cake:** Something very easy to do.
- **Cost an arm and a leg:** Very expensive.
- **Break a leg:** Good luck (often said to actors).`,
    links: [],
  },
  {
    topic: 'Grammar: Tenses',
    category: 'English',
    content: `Correct usage of verb tenses is crucial for clear communication.
- **Simple Present:** For habits, universal truths, and facts. (e.g., The sun rises in the east.)
- **Present Continuous:** For actions happening now. (e.g., He is reading a book.)
- **Present Perfect:** For actions completed in the recent past with a present effect. (e.g., I have finished my work.)
- **Simple Past:** For actions completed at a specific time in the past. (e.g., They went to Delhi yesterday.)
- **Past Continuous:** For actions that were ongoing in the past. (e.g., She was sleeping when I called.)
- **Future Tense:** For actions that will happen in the future. (e.g., We will watch a movie tonight.)`,
    links: [],
  },
  {
    topic: 'Grammar: Subject-Verb Agreement',
    category: 'English',
    content: `The verb in a sentence must agree with its subject in number (singular or plural).
- **Rule 1:** A singular subject takes a singular verb; a plural subject takes a plural verb. (e.g., The dog barks. The dogs bark.)
- **Rule 2:** Words like 'each', 'every', 'either', 'neither', 'everyone', 'everybody' are singular and require a singular verb. (e.g., Each of the students is smart.)
- **Rule 3:** When two subjects are joined by 'and', they typically require a plural verb. (e.g., The cat and the dog are friends.)
- **Rule 4:** When subjects are joined by 'or' or 'nor', the verb agrees with the subject nearer to it. (e.g., Neither the students nor the teacher is present.)
- **Rule 5:** Collective nouns (e.g., team, committee, family) can be singular or plural depending on whether they are treated as a single unit or as individuals. (e.g., The team is winning. The team are arguing among themselves.)`,
    links: [],
  },
  {
    topic: 'Syllogisms',
    category: 'Logical Reasoning',
    content: `A syllogism is a form of deductive reasoning consisting of a major premise, a minor premise, and a conclusion.
- **Technique:** Use Venn diagrams to solve these questions accurately.
- **Example:**
  - **Statements:**
    1. All pens are pencils.
    2. All pencils are books.
  - **Conclusions:**
    I. All pens are books.
    II. All books are pens.
- **Solution:** Draw a small circle for 'Pens' inside a larger circle for 'Pencils'. Then draw the 'Pencils' circle inside an even larger circle for 'Books'. From the diagram, you can see that all Pens are indeed Books (Conclusion I follows). However, you cannot conclude that all Books are Pens (Conclusion II does not follow).`,
    links: [],
  },
  {
    topic: 'Blood Relations',
    category: 'Logical Reasoning',
    content: `These questions test your ability to decipher family relationships.
- **Technique:** Draw a family tree diagram. Use symbols like \`+\` for male, \`-\` for female, \`=\` for married couple, and vertical lines for generations.
- **Example:** Pointing to a man, a woman said, "His mother is the only daughter of my mother." How is the woman related to the man?
- **Solution:**
  - "The only daughter of my mother" is the woman herself.
  - So, "His mother is the woman herself."
  - Therefore, the woman is the man's mother.`,
    links: [],
  },
  {
    topic: 'Coding-Decoding',
    category: 'Logical Reasoning',
    content: `In these questions, a word or message is coded in a particular way, and you need to decipher the code to answer the question.
- **Types of Coding:**
  - **Letter Coding:** Letters are shifted by a certain number (e.g., \`A\` becomes \`C\`, \`B\` becomes \`D\`).
  - **Number Coding:** Words are assigned numerical codes.
  - **Substitution Coding:** Letters are substituted with other letters or symbols.
- **Example:** If \`TEACHER\` is coded as \`VGCEJGT\`, how is \`CHILDREN\` coded?
- **Solution:** Each letter is moved two steps forward. \`T+2=V\`, \`E+2=G\`, etc. So, \`CHILDREN\` becomes \`EJKNFTGP\`.`,
    links: [],
  },
  {
    topic: 'Critical Reasoning',
    category: 'Logical Reasoning',
    content: `This involves analyzing arguments, assumptions, and conclusions.
- **Argument:** A set of statements, one of which (the conclusion) is claimed to be supported by the others (the premises).
- **Assumption:** An unstated premise that is necessary for the conclusion to be valid. It's something the author takes for granted.
- **Conclusion:** The main point of the argument.
- **Inference:** Something that must be true if the given statements are true.
- **Strengthening/Weakening Arguments:** A statement that strengthens an argument provides additional support for the conclusion. A statement that weakens an argument attacks the link between the premises and the conclusion.`,
    links: [],
  },
  {
    topic: 'Major National Events',
    category: 'Current Affairs',
    content: `Stay updated on significant happenings within India.
- **Government Schemes:** Key initiatives like 'Make in India', 'Swachh Bharat Abhiyan', 'Ayushman Bharat'.
- **Political Developments:** State and general elections, major policy changes, new appointments.
- **Economic News:** Union Budget highlights, RBI policy changes, trends in GDP and inflation.
- **Social Issues:** Major social movements, reports on health, education, etc.
- **Awards and Honors:** National awards like Padma Awards, Khel Ratna.`,
    links: [],
  },
  {
    topic: 'Key International Summits',
    category: 'Current Affairs',
    content: `Knowledge of major global meetings and India's role in them.
- **G20 (Group of Twenty):** Forum for international economic cooperation. India hosted the 2023 summit in New Delhi.
- **BRICS:** Brazil, Russia, India, China, and South Africa. Focuses on economic cooperation and development.
- **SCO (Shanghai Cooperation Organisation):** A Eurasian political, economic, and security alliance.
- **G7 (Group of Seven):** Advanced economies. India is often invited as an outreach country.
- **COP (Conference of the Parties):** Annual UN climate change conference.`,
    links: [],
  },
  {
    topic: 'Recent Landmark Judgments',
    category: 'Current Affairs',
    content: `Awareness of recent important decisions by the Supreme Court and High Courts.
- **Right to Privacy (Puttaswamy case):** Declared as a Fundamental Right under Article 21.
- **Decriminalization of Homosexuality (Navtej Singh Johar case):** Struck down parts of Section 377 of the IPC.
- **Ayodhya Verdict:** The dispute over the Babri Masjid site.
- **Sabarimala Temple Entry:** Allowed women of all age groups to enter the temple.
- **Triple Talaq:** Declared unconstitutional.
It's important to know the name of the case and the core legal principle laid down.`,
    links: [],
  },
  {
    topic: 'Science, Tech & Space',
    category: 'Current Affairs',
    content: `Key developments in the world of science and technology.
- **ISRO Missions:**
  - **Chandrayaan-3:** Successful soft landing on the lunar south pole (2023).
  - **Aditya-L1:** India's first solar observatory mission.
  - **Gaganyaan:** India's first human spaceflight mission (upcoming).
- **Defense:** New inductions of fighter jets, submarines, and missiles.
- **Technology:** Developments in AI (like 'ChatGPT'), 5G technology, and biotechnology.
- **Health:** News about vaccines, new diseases, and major health initiatives.`,
    links: [],
  },
  {
    topic: 'Citizenship (Art 5-11)',
    category: 'Constitution',
    content: `Part II of the Constitution deals with citizenship. The Citizenship Act, 1955 prescribes five ways of acquiring citizenship: birth, descent, registration, naturalization, and incorporation of territory. It also provides for three ways of losing citizenship: renunciation, termination, and deprivation.`,
    links: []
  },
  {
    topic: 'Writs in Indian Constitution',
    category: 'Constitution',
    content: `The Supreme Court (Art 32) and High Courts (Art 226) can issue writs to enforce Fundamental Rights. The five types are:
- **Habeas Corpus:** 'To have the body of'. Protects against illegal detention.
- **Mandamus:** 'We command'. Orders a public official to perform their official duty.
- **Prohibition:** Prohibits a lower court from exceeding its jurisdiction.
- **Certiorari:** 'To be certified'. Quashes an order of a lower court for an error of law.
- **Quo Warranto:** 'By what authority?'. Inquires into the legality of a person's claim to a public office.`,
    links: []
  },
  {
    topic: 'Nuisance in Tort Law',
    category: 'Legal Aptitude',
    content: `Nuisance is an unlawful interference with a person's use or enjoyment of land.
- **Public Nuisance:** An act causing any common injury, danger or annoyance to the public. It is a crime under the IPC.
- **Private Nuisance:** An interference with the enjoyment of land of a particular person. It is a civil wrong.
- **Essentials:** To prove private nuisance, one must show unreasonable interference, interference with the use or enjoyment of land, and resulting damage.`,
    links: []
  },
  {
    topic: 'Strict and Absolute Liability',
    category: 'Legal Aptitude',
    content: `These doctrines create liability without fault (no need to prove negligence).
- **Strict Liability (Rylands v. Fletcher):** A person who brings a dangerous thing onto their land is strictly liable for any harm caused if it escapes. Defenses like 'Act of God' are available.
- **Absolute Liability (M.C. Mehta v. Union of India):** A more stringent rule for enterprises in hazardous activities. If harm results, the enterprise is absolutely liable, with no exceptions. The enterprise must pay compensation based on its size and capacity.`,
    links: []
  },
  {
    topic: 'Void vs. Illegal Agreements',
    category: 'Legal Aptitude',
    content: `A key distinction in Contract Law.
- **Void Agreement:** An agreement not enforceable by law (e.g., an agreement with a minor). It is not necessarily forbidden by law.
- **Illegal Agreement:** An agreement whose object or consideration is forbidden by law (e.g., an agreement to commit a crime).
- **Key difference:** All illegal agreements are void, but not all void agreements are illegal. Collateral agreements to an illegal agreement are also void, which is not the case for void agreements.`,
    links: []
  },
  {
    topic: 'Bailment and Pledge',
    category: 'Legal Aptitude',
    content: `Special types of contracts under the Indian Contract Act.
- **Bailment (Sec 148):** The delivery of goods by one person to another for some purpose, upon a contract that they shall, when the purpose is accomplished, be returned. The person delivering is the 'bailor'; the person receiving is the 'bailee'.
- **Pledge (Sec 172):** A bailment of goods as security for payment of a debt or performance of a promise. The bailor is the 'pawnor' and the bailee is the 'pawnee'. It's a specific type of bailment.`,
    links: []
  },
  {
    topic: 'Right of Private Defence',
    category: 'Legal Aptitude',
    content: `Sections 96 to 106 of the IPC deal with the right of private defence of person and property.
- **Principle:** Everyone has the right to defend their own body and property, and the body and property of another person, against an unlawful act.
- **Limitations:** The right is not available if there is time to have recourse to public authorities. The harm inflicted should not be more than necessary for the purpose of defence.
- **Causing Death:** The right extends to causing death in certain serious cases, such as an assault which reasonably causes the apprehension of death or grievous hurt.`,
    links: []
  },
  {
    topic: 'Criminal Conspiracy',
    category: 'Legal Aptitude',
    content: `Defined under Section 120A of the IPC. It occurs when two or more persons agree to do, or cause to be done:
1. An illegal act, or
2. An act which is not illegal by illegal means.
- **Key element:** The agreement itself constitutes the offense. No overt act is necessary, except for an agreement to commit an offense.
- **Punishment:** Defined under Section 120B.`,
    links: []
  },
  {
    topic: 'UN Security Council',
    category: 'General Knowledge',
    content: `One of the six principal organs of the United Nations (UN), charged with ensuring international peace and security.
- **Members:** It has 15 members.
  - **5 Permanent Members (P5):** China, France, Russia, the United Kingdom, and the United States. They hold the power of veto.
  - **10 Non-Permanent Members:** Elected for two-year terms by the General Assembly.
- **Powers:** Its decisions (resolutions) are binding on all UN member states.`,
    links: []
  },
  {
    topic: 'Vocabulary: Homonyms & Homophones',
    category: 'English',
    content: `Often confusing but important for verbal ability.
- **Homonyms:** Words that are spelled the same and sound the same but have different meanings (e.g., 'bat' the animal vs. 'bat' the sports equipment).
- **Homophones:** Words that sound the same but have different meanings and spellings (e.g., 'to', 'too', 'two'; 'their', 'there', 'they're').
- **Homographs:** Words that are spelled the same but may have different pronunciations and meanings (e.g., 'lead' the metal vs. 'lead' to guide).`,
    links: []
  },
  {
    topic: 'Series Completion',
    category: 'Logical Reasoning',
    content: `A common type of logical reasoning question.
- **Number Series:** Identify the pattern (arithmetic, geometric, squares, cubes, alternating patterns, etc.). E.g., 1, 4, 9, 16, 25, ? (Answer: 36, as it's a series of squares).
- **Alphabet Series:** Identify the pattern based on the position of letters in the alphabet. E.g., A, C, E, G, ? (Answer: I, as it's a series of alternate letters).
- **Alpha-Numeric Series:** A mix of letters and numbers. Identify the pattern for each separately.`,
    links: []
  },
  {
    topic: 'Analogies',
    category: 'Logical Reasoning',
    content: `These questions test your ability to identify relationships between pairs of words or concepts.
- **Relationship Types:**
  - Cause and Effect (Virus : Disease)
  - Part to Whole (Wheel : Car)
  - Object to Function (Pen : Write)
  - Synonym/Antonym (Happy : Joyful / Sad : Happy)
  - Worker and Tool (Carpenter : Saw)
- **Example:** Doctor : Hospital :: Teacher : ?
- **Solution:** A doctor works in a hospital. A teacher works in a School. The answer is 'School'.`,
    links: []
  },
  {
    topic: 'Sports Personalities & Events',
    category: 'Current Affairs',
    content: `Knowledge of recent major sporting events and achievements.
- **Olympics:** Host cities, major medal winners for India.
- **Cricket:** Winners of ICC World Cups (T20 and ODI), IPL.
- **Tennis:** Winners of the four Grand Slams (Australian Open, French Open, Wimbledon, US Open).
- **Football:** Winners of the FIFA World Cup.
- **Awards:** Major sports awards like the Khel Ratna and Arjuna Award in India.`,
    links: []
  },
  {
    topic: 'Sources of Indian Constitution',
    category: 'Constitution',
    content: `The Indian Constitution is known for borrowing features from various other constitutions. Key sources include:
- **Government of India Act, 1935:** Federal Scheme, Office of Governor, Judiciary, Public Service Commissions.
- **USA:** Fundamental Rights, Judicial Review, Independence of Judiciary, Impeachment of President.
- **UK:** Parliamentary government, Rule of Law, Single citizenship, Cabinet system, Writs.
- **Ireland:** Directive Principles of State Policy (DPSP), Nomination of members to Rajya Sabha.
- **Canada:** Federation with a strong Centre, Residuary powers with the Centre.
- **Australia:** Concurrent List, Freedom of trade, Joint sitting of the two Houses of Parliament.`,
    links: []
  },
  {
    topic: 'Nemo Judex in Causa Sua',
    category: 'Legal Maxims',
    content: `This maxim translates to "no one should be a judge in their own cause." It is a fundamental principle of natural justice known as the rule against bias. It ensures impartiality in legal proceedings, stating that a decision-maker must not have any personal interest in the outcome of a case.`,
    links: []
  },
  {
    topic: 'Bail',
    category: 'Legal Aptitude',
    content: `Bail is the conditional release of a person accused of a crime, pending trial. The Code of Criminal Procedure (CrPC) classifies offenses into:
- **Bailable Offence:** An offence where bail is a matter of right. The police or court are bound to grant bail.
- **Non-bailable Offence:** An offence where bail is a matter of judicial discretion. The court considers factors like the seriousness of the offense, the risk of the accused absconding, and the potential for tampering with evidence.
- **Anticipatory Bail (Sec. 438 CrPC):** A direction to release a person on bail, issued even before the person is arrested.`,
    links: []
  },
  {
    topic: 'Alternative Dispute Resolution (ADR)',
    category: 'Legal Aptitude',
    content: `ADR refers to methods of resolving disputes without litigation. It's generally faster and less expensive than going to court. Main forms include:
- **Arbitration:** A private process where a neutral third party (arbitrator) hears the dispute and makes a decision (an award) that is legally binding.
- **Mediation:** A process where a neutral third party (mediator) helps the parties reach a mutually acceptable settlement. The mediator does not impose a decision.
- **Conciliation:** Similar to mediation, but the conciliator may suggest a solution.
- **Lok Adalat:** 'People's Court'. An informal setting where disputes are settled by compromise. Its awards are deemed to be decrees of a civil court.`,
    links: []
  },
  {
    topic: 'Public Interest Litigation (PIL)',
    category: 'Constitution',
    content: `PIL is litigation filed in a court of law for the protection of "public interest," such as pollution, terrorism, road safety, etc. It is not filed to enforce the right of one individual.
- **Origin:** A significant innovation of the Indian judiciary, pioneered by Justices P.N. Bhagwati and V.R. Krishna Iyer.
- **Relaxation of 'Locus Standi':** The traditional rule that only the person whose rights are affected can file a case was relaxed. Now, any public-spirited citizen can move the court on behalf of a group of people whose rights are affected.`,
    links: []
  },
  {
    topic: 'Union & State Executive',
    category: 'Constitution',
    content: `The executive branch enforces laws.
- **Union Executive:** Consists of the President, Vice-President, Prime Minister, and the Council of Ministers. The President is the nominal head, while the Prime Minister is the real executive authority. The Council of Ministers is collectively responsible to the Lok Sabha.
- **State Executive:** Consists of the Governor, Chief Minister, and the Council of Ministers. The Governor is the nominal head, appointed by the President, while the Chief Minister is the real head. The State Council of Ministers is collectively responsible to the State Legislative Assembly.`,
    links: []
  },
  {
    topic: 'Union & State Legislature',
    category: 'Constitution',
    content: `The legislative branch makes laws.
- **Union Legislature (Parliament):** Consists of two houses: Lok Sabha (House of the People) and Rajya Sabha (Council of States).
- **State Legislature:** Can be unicameral (only a Legislative Assembly - Vidhan Sabha) or bicameral (also has a Legislative Council - Vidhan Parishad). Most states have a unicameral legislature. The Legislative Council is a permanent body, similar to the Rajya Sabha.`,
    links: []
  },
  {
    topic: 'Union & State Judiciary',
    category: 'Constitution',
    content: `India has an integrated and independent judiciary.
- **Supreme Court:** The apex court of the country. Its decisions are binding on all other courts.
- **High Courts:** Each state has a High Court, which is the highest court in that state. It can also issue writs for the enforcement of Fundamental Rights.
- **Subordinate Courts:** These are the courts below the High Court, including District Courts, Sessions Courts, and others, which handle civil and criminal cases at the local level.`,
    links: []
  }
];

export const studyEvents: StudyEvent[] = [
    { date: new Date(new Date().setDate(new Date().getDate() + 1)), title: 'Revise Fundamental Rights', description: 'Go through Articles 12-35 of the Constitution.' },
    { date: new Date(new Date().setDate(new Date().getDate() + 2)), title: 'Practice 50 MCQs on Torts', description: 'Focus on negligence and defamation.' },
    { date: new Date(new Date().setDate(new Date().getDate() + 3)), title: 'Read a newspaper editorial', description: 'Summarize the main arguments and identify logical fallacies.' },
    { date: new Date(new Date().setDate(new Date().getDate() + 4)), title: 'Topic Notes: Contracts', description: 'Cover Offer, Acceptance, and Consideration.' },
    { date: new Date(new Date().setDate(new Date().getDate() + 5)), title: 'Solve 20 Logical Reasoning Puzzles', description: 'Focus on blood relations and syllogisms.' },
    { date: new Date(new Date().setDate(new Date().getDate() + 6)), title: 'Review Legal Maxims Flashcards', description: 'Go through all maxims added so far.' },
    { date: new Date(new Date().setDate(new Date().getDate() + 7)), title: 'Weekly Revision Day', description: 'Revise all topics covered in the past week.' },
    { date: new Date(new Date().setDate(new Date().getDate() + 8)), title: 'Revise DPSP and Fundamental Duties', description: 'Understand the difference and significance of both.' },
    { date: new Date(new Date().setDate(new Date().getDate() + 9)), title: 'Practice 50 MCQs on Criminal Law', description: 'Focus on theft, extortion, and assault.' },
    { date: new Date(new Date().setDate(new Date().getDate() + 10)), title: 'Current Affairs Update', description: 'Read about the last 30 days of national and international news.' },
    { date: new Date(new Date().setDate(new Date().getDate() + 11)), title: 'Topic Notes: Constitutional Bodies', description: 'Study the Election Commission, UPSC, and Finance Commission.' },
    { date: new Date(new Date().setDate(new Date().getDate() + 12)), title: 'Solve 20 English Grammar Questions', description: 'Focus on subject-verb agreement and tenses.' },
    { date: new Date(new Date().setDate(new Date().getDate() + 13)), title: 'Review General Knowledge Flashcards', description: 'Go through history and geography cards.' },
    { date: new Date(new Date().setDate(new Date().getDate() + 14)), title: 'Full-Length Mock Test', description: 'Simulate exam conditions and analyze performance.' }
];

export const lawFlashcards: LawFlashcard[] = [
  { id: 'fc-1', term: 'Habeas Corpus', definition: 'A writ requiring a person under arrest to be brought before a judge or into court, especially to secure the person\'s release unless lawful grounds are shown for their detention.', topic: 'Legal Writs' },
  { id: 'fc-2', term: 'Mens Rea', definition: 'The intention or knowledge of wrongdoing that constitutes part of a crime, as opposed to the action or conduct of the accused (actus reus).', topic: 'Criminal Law' },
  { id: 'fc-3', term: 'Stare Decisis', definition: 'The legal principle of determining points in litigation according to precedent.', topic: 'Legal Principles' },
  { id: 'fc-4', term: 'Caveat Emptor', definition: 'The principle that the buyer alone is responsible for checking the quality and suitability of goods before a purchase is made. "Let the buyer beware".', topic: 'Contract Law' },
  { id: 'fc-5', term: 'Void ab initio', definition: 'A contract or legal document that is void from the very beginning.', topic: 'Contract Law' },
  { id: 'fc-6', term: 'Doli Incapax', definition: 'A legal presumption that a child under a certain age is incapable of forming criminal intent.', topic: 'Criminal Law' },
  { id: 'fc-7', term: 'Amicus Curiae', definition: 'An impartial adviser, often voluntary, to a court of law in a particular case. Translates to "friend of the court".', topic: 'Legal Roles'},
  { id: 'fc-8', term: 'Ratio Decidendi', definition: 'The rule of law on which a judicial decision is based. It is the legally binding part of a judgment.', topic: 'Legal Principles'},
  { id: 'fc-9', term: 'Mandamus', definition: 'A writ from a superior court to a lower court or government officer commanding them to perform a mandatory public duty. Translates to "we command".', topic: 'Legal Writs' },
  { id: 'fc-10', term: 'Certiorari', definition: 'A writ by which a higher court reviews a decision of a lower court for errors of law. Translates to "to be certified".', topic: 'Legal Writs' },
  { id: 'fc-11', term: 'Quo Warranto', definition: 'A writ requiring a person to show by what authority they exercise a public office. Translates to "by what authority?".', topic: 'Legal Writs' },
  { id: 'fc-12', term: 'Prohibition', definition: 'A writ from a superior court to a lower court or tribunal to prevent it from exceeding its jurisdiction.', topic: 'Legal Writs' },
  { id: 'fc-13', term: 'Actus Reus', definition: 'The wrongful act or omission that comprises the physical component of a crime.', topic: 'Criminal Law' },
  { id: 'fc-14', term: 'Ab Initio', definition: 'From the beginning.', topic: 'Legal Maxims' },
  { id: 'fc-15', term: 'Alibi', definition: 'A defense that the accused was in another place at the time the crime was committed.', topic: 'Criminal Law' },
  { id: 'fc-16', term: 'Bona fide', definition: 'In good faith; genuine.', topic: 'Legal Maxims' },
  { id: 'fc-17', term: 'De facto', definition: 'In fact; in reality. Describes practices that exist in reality, even if not legally recognized.', topic: 'Legal Maxims' },
  { id: 'fc-18', term: 'De jure', definition: 'By law. Describes practices that are legally recognized, regardless of whether they exist in reality.', topic: 'Legal Maxims' },
  { id: 'fc-19', term: 'Ipso facto', definition: 'By the fact itself. A direct consequence of an action.', topic: 'Legal Maxims' },
  { id: 'fc-20', term: 'Lis pendens', definition: 'A pending lawsuit. A written notice that a lawsuit has been filed concerning real estate.', topic: 'Civil Law' },
  { id: 'fc-21', term: 'Modus operandi', definition: 'A particular way or method of doing something, especially one that is characteristic or well-established.', topic: 'Legal Maxims' },
  { id: 'fc-22', term: 'Prima facie', definition: 'Based on the first impression; accepted as correct until proved otherwise.', topic: 'Legal Maxims' },
  { id: 'fc-23', term: 'Quid pro quo', definition: 'Something for something. An exchange of goods or services, where one transfer is contingent upon the other.', topic: 'Contract Law' },
  { id: 'fc-24', term: 'Sine die', definition: '(Of a proceeding) adjourned indefinitely, without a day appointed for resumption.', topic: 'Legal Procedure' },
  { id: 'fc-25', term: 'Sub judice', definition: 'Under judicial consideration and therefore prohibited from public discussion elsewhere.', topic: 'Legal Procedure' },
  { id: 'fc-26', term: 'Suo motu', definition: 'On its own motion. An action by a court without any request by the parties involved.', topic: 'Legal Procedure' },
  { id: 'fc-27', term: 'Ultra vires', definition: 'Beyond the powers. An act which requires legal authority but is done without it.', topic: 'Legal Principles' },
  { id: 'fc-28', term: 'Volenti non fit injuria', definition: 'To a willing person, injury is not done. A defense in tort that a person who knowingly puts themselves at risk cannot sue for damages.', topic: 'Law of Torts' },
  { id: 'fc-29', term: 'Plaintiff', definition: 'A person who brings a case against another in a court of law.', topic: 'Legal Roles' },
  { id: 'fc-30', term: 'Defendant', definition: 'An individual, company, or institution sued or accused in a court of law.', topic: 'Legal Roles' },
  { id: 'fc-31', term: 'Cognizable Offence', definition: 'An offence in which a police officer can arrest without a warrant.', topic: 'Criminal Law' },
  { id: 'fc-32', term: 'Non-cognizable Offence', definition: 'An offence in which a police officer cannot arrest without a warrant.', topic: 'Criminal Law' },
  { id: 'fc-33', term: 'Acquittal', definition: 'A judgment that a person is not guilty of the crime with which they have been charged.', topic: 'Criminal Law' },
  { id: 'fc-34', term: 'Conviction', definition: 'A formal declaration that someone is guilty of a criminal offence, made by the verdict of a jury or the decision of a judge.', topic: 'Criminal Law' },
  { id: 'fc-35', term: 'Affidavit', definition: 'A written statement confirmed by oath or affirmation, for use as evidence in court.', topic: 'Legal Documents' },
  { id: 'fc-36', term: 'Appeal', definition: 'An application to a higher court for a reversal of the decision of a lower court.', topic: 'Legal Procedure' },
  { id: 'fc-37', term: 'Arbitration', definition: 'A form of alternative dispute resolution (ADR), is a way to resolve disputes outside the judiciary courts.', topic: 'Legal Procedure' },
  { id: 'fc-38', term: 'Coercion', definition: 'The practice of persuading someone to do something by using force or threats.', topic: 'Contract Law' },
  { id: 'fc-39', term: 'Damages', definition: 'A sum of money awarded by a court to compensate for loss or injury.', topic: 'Law of Torts' },
  { id: 'fc-40', term: 'Decree', definition: 'An official order that has the force of law.', topic: 'Legal Procedure' },
  { id: 'fc-41', term: 'Estoppel', definition: 'A legal principle that prevents someone from arguing something or asserting a right that contradicts what they previously said or agreed to by law.', topic: 'Legal Principles' },
  { id: 'fc-42', term: 'FIR (First Information Report)', definition: 'A written document prepared by police organizations when they receive information about the commission of a cognizable offence.', topic: 'Criminal Law' },
  { id: 'fc-43', term: 'Injunction', definition: 'A judicial order restraining a person from beginning or continuing an action, or compelling a person to carry out a certain act.', topic: 'Civil Law' },
  { id: 'fc-44', term: 'Indemnity', definition: 'Security or protection against a loss or other financial burden.', topic: 'Contract Law' },
  { id: 'fc-45', term: 'Jurisdiction', definition: 'The official power to make legal decisions and judgments.', topic: 'Legal Principles' },
  { id: 'fc-46', term: 'Libel', definition: 'A published false statement that is damaging to a person\'s reputation; a written defamation.', topic: 'Law of Torts' },
  { id: 'fc-47', term: 'Slander', definition: 'The action or crime of making a false spoken statement damaging to a person\'s reputation.', topic: 'Law of Torts' },
  { id: 'fc-48', term: 'Lien', definition: 'A right to keep possession of property belonging to another person until a debt owed by that person is discharged.', topic: 'Civil Law' },
  { id: 'fc-49', term: 'Litigation', definition: 'The process of taking legal action.', topic: 'Legal Procedure' },
  { id: 'fc-50', term: 'Negligence', definition: 'Failure to take proper care over something, resulting in damage or injury to another.', topic: 'Law of Torts' },
  { id: 'fc-51', term: 'Ordinance', definition: 'A law promulgated by the President/Governor when the Parliament/State Legislature is not in session.', topic: 'Constitutional Law' },
  { id: 'fc-52', term: 'Parole', definition: 'The temporary or permanent release of a prisoner before the expiry of a sentence, on the promise of good behavior.', topic: 'Criminal Law' },
  { id: 'fc-53', term: 'Petition', definition: 'A formal written request, typically one signed by many people, appealing to authority in respect of a particular cause.', topic: 'Legal Procedure' },
  { id: 'fc-54', term: 'Precedent', definition: 'An earlier event or action that is regarded as an example or guide to be considered in subsequent similar circumstances.', topic: 'Legal Principles' },
  { id: 'fc-55', term: 'Summons', definition: 'An order to appear before a judge or magistrate.', topic: 'Legal Procedure' },
  { id: 'fc-56', term: 'Warrant', definition: 'A document issued by a legal or government official authorizing the police or another body to make an arrest, search premises, or carry out some other action.', topic: 'Criminal Law' },
  { id: 'fc-57', term: 'Secularism', definition: 'The principle of separation of the state from religious institutions.', topic: 'Constitutional Law' },
  { id: 'fc-58', term: 'Sovereignty', definition: 'The supreme power or authority of a state to govern itself or another state.', topic: 'Constitutional Law' },
  { id: 'fc-59', term: 'Republic', definition: 'A state in which supreme power is held by the people and their elected representatives, and which has an elected or nominated president rather than a monarch.', topic: 'Constitutional Law' },
  { id: 'fc-60', term: 'Federalism', definition: 'A system of government in which entities such as states or provinces share power with a national government.', topic: 'Constitutional Law' },
  { id: 'fc-61', term: 'Separation of Powers', definition: 'The division of government responsibilities into distinct branches (legislative, executive, judicial) to limit any one branch from exercising the core functions of another.', topic: 'Constitutional Law' },
  { id: 'fc-62', term: 'Judicial Review', definition: 'The power of a court to review the constitutionality of legislative acts and executive orders.', topic: 'Constitutional Law' },
  { id: 'fc-63', term: 'Double Jeopardy', definition: 'A procedural defence that prevents an accused person from being tried again on the same (or similar) charges following a valid acquittal or conviction.', topic: 'Criminal Law' },
  { id: 'fc-64', term: 'Ex post facto law', definition: 'A law that retroactively changes the legal consequences of actions that were committed before the enactment of the law.', topic: 'Criminal Law' },
  { id: 'fc-65', term: 'Locus standi', definition: 'The right or capacity to bring an action or to appear in a court.', topic: 'Legal Principles' },
  { id: 'fc-66', term: 'Natural Justice', definition: 'Principles of justice that are based on the common-sense notions of fairness, including the right to a fair hearing and the rule against bias.', topic: 'Legal Principles' },
  { id: 'fc-67', term: 'Obiter Dicta', definition: 'A judge\'s incidental expression of opinion, not essential to the decision and not legally binding as a precedent. "A saying by the way".', topic: 'Legal Principles' },
  { id: 'fc-68', term: 'Res judicata', definition: 'A matter that has been adjudicated by a competent court and therefore may not be pursued further by the same parties. "A matter decided".', topic: 'Civil Law' },
  { id: 'fc-69', term: 'Vicarious Liability', definition: 'A situation where someone is held responsible for the actions or omissions of another person.', topic: 'Law of Torts' },
  { id: 'fc-70', term: 'Tortfeasor', definition: 'A person who commits a tort (a civil wrong).', topic: 'Law of Torts' },
  { id: 'fc-71', term: 'Trespass', definition: 'Unlawful interference with one\'s person, property, or rights.', topic: 'Law of Torts' },
  { id: 'fc-72', term: 'Nuisance', definition: 'An act which is harmful or offensive to the public or a member of it and for which there is a legal remedy.', topic: 'Law of Torts' },
  { id: 'fc-73', term: 'Pacta Sunt Servanda', definition: 'Agreements must be kept. A fundamental principle of international and contract law.', topic: 'Contract Law' },
  { id: 'fc-74', term: 'Assault', definition: 'An act that creates an apprehension in another of an imminent, harmful, or offensive contact.', topic: 'Law of Torts' },
  { id: 'fc-75', term: 'Battery', definition: 'The actual intentional striking of someone, with intent to harm, or in a rude and insolent manner even if the injury is slight.', topic: 'Law of Torts' },
  { id: 'fc-76', term: 'Bailment', definition: 'A legal relationship in common law where physical possession of personal property is transferred from one person (the bailor) to another (the bailee).', topic: 'Contract Law' },
  { id: 'fc-77', term: 'Consideration', definition: 'The benefit that each party receives, or expects to receive when entering into a contract. It is a necessary element of a valid contract.', topic: 'Contract Law' },
  { id: 'fc-78', term: 'Duress', definition: 'Threats, violence, constraints, or other action used to coerce someone into doing something against their will or better judgment.', topic: 'Contract Law' },
  { id: 'fc-79', term: 'Frustration of Contract', definition: 'A situation where unforeseen events make the performance of a contract impossible, illegal, or radically different from what was intended.', topic: 'Contract Law' },
  { id: 'fc-80', term: 'Misrepresentation', definition: 'A false statement of fact made by one party to another, which has the effect of inducing that party into the contract.', topic: 'Contract Law' },
  { id: 'fc-81', term: 'Offer', definition: 'A definite promise to be bound provided that certain specified terms are accepted.', topic: 'Contract Law' },
  { id: 'fc-82', term: 'Acceptance', definition: 'An unconditional agreement to all the terms of an offer.', topic: 'Contract Law' },
  { id: 'fc-83', term: 'Specific Performance', definition: 'A court order which requires a party to perform a specific act, usually what is stated in a contract.', topic: 'Contract Law' },
  { id: 'fc-84', term: 'Plea Bargaining', definition: 'An agreement between a defendant and a prosecutor, in which the defendant agrees to plead guilty to a particular charge in return for some concession from the prosecutor.', topic: 'Criminal Law' },
  { id: 'fc-85', term: 'Extortion', definition: 'The practice of obtaining something, especially money, through force or threats.', topic: 'Criminal Law' },
  { id: 'fc-86', term: 'Theft', definition: 'Dishonestly taking any movable property out of the possession of any person without that person\'s consent.', topic: 'Criminal Law' },
  { id: 'fc-87', term: 'Robbery', definition: 'Theft by force or by threatening force.', topic: 'Criminal Law' },
  { id: 'fc-88', term: 'Dacoity', definition: 'Robbery committed by five or more persons.', topic: 'Criminal Law' },
  { id: 'fc-89', term: 'Culpable Homicide', definition: 'The act of causing death with the intention of causing death, or with the intention of causing such bodily injury as is likely to cause death.', topic: 'Criminal Law' },
  { id: 'fc-90', term: 'Murder', definition: 'A more severe form of culpable homicide, committed with specific intentions like intent to kill or cause bodily injury sufficient in the ordinary course of nature to cause death.', topic: 'Criminal Law' },
  { id: 'fc-91', term: 'Kidnapping', definition: 'Taking or enticing away a minor or a person of unsound mind out of the keeping of the lawful guardian without their consent.', topic: 'Criminal Law' },
  { id: 'fc-92', term: 'Abduction', definition: 'Forcibly or by deceitful means compelling a person to go from any place.', topic: 'Criminal Law' },
  { id: 'fc-93', term: 'Attorney', definition: 'A person appointed to act for another in business or legal matters; a lawyer.', topic: 'Legal Roles' },
  { id: 'fc-94', term: 'Advocate', definition: 'A person who puts a case on someone else\'s behalf. In India, a legal professional who is registered with the Bar Council.', topic: 'Legal Roles' },
  { id: 'fc-95', term: 'Public Prosecutor', definition: 'A law officer who conducts criminal proceedings on behalf of the state or in the public interest.', topic: 'Legal Roles' },
  { id: 'fc-96', term: 'Bail', definition: 'The temporary release of an accused person awaiting trial, sometimes on condition that a sum of money is lodged to guarantee their appearance in court.', topic: 'Criminal Law' },
  { id: 'fc-97', term: 'Adjournment', definition: 'The postponement of a court session or hearing until another date or time.', topic: 'Legal Procedure' },
  { id: 'fc-98', term: 'Charge Sheet', definition: 'A final report prepared by the police after investigating a case. It contains all the charges against the accused.', topic: 'Criminal Law' },
  { id: 'fc-99', term: 'Testimony', definition: 'A formal written or spoken statement, especially one given in a court of law.', topic: 'Legal Procedure' },
  { id: 'fc-100', term: 'Fundamental Rights', definition: 'A group of rights that have been recognized by a high degree of protection from encroachment. These are the rights which are fundamental for the development of any human being.', topic: 'Constitutional Law' },
  { id: 'fc-101', term: 'Directive Principles', definition: 'Guidelines for the central and state governments of India, to be kept in mind while framing laws and policies. They are not enforceable by any court.', topic: 'Constitutional Law' },
  { id: 'fc-102', term: 'Amendment', definition: 'A formal or official change made to a law, contract, constitution, or other legal document.', topic: 'Constitutional Law' },
  { id: 'fc-103', term: 'Impeachment', definition: 'A formal process in which an official is accused of unlawful activity, the outcome of which may include the removal of that official from office.', topic: 'Constitutional Law' },
  { id: 'fc-104', term: 'Defamation', definition: 'The action of damaging the good reputation of someone; slander or libel.', topic: 'Law of Torts' },
  { id: 'fc-105', term: 'Plaint', definition: 'The first document filed in a civil suit, which states the plaintiff\'s claim and the relief sought.', topic: 'Civil Law' },
  { id: 'fc-106', term: 'Written Statement', definition: 'The defendant\'s reply to the plaint, in which they admit or deny the allegations.', topic: 'Civil Law' },
  { id: 'fc-107', term: 'Will', definition: 'A legal document by which a person expresses their wishes as to how their property is to be distributed at death.', topic: 'Family Law' },
  { id: 'fc-108', term: 'Perjury', definition: 'The offence of willfully telling an untruth or making a misrepresentation under oath.', topic: 'Criminal Law' }
];

export const reels: Reel[] = [
  { id: 'reel-1', title: 'Actus Reus', content: 'The "guilty act." It is the physical component of a crime. No act, no crime!', icon: 'Gavel'},
  { id: 'reel-2', title: 'Mens Rea', content: 'The "guilty mind." It is the mental element, the intention to commit a crime.', icon: 'BrainCircuit'},
  { id: 'reel-3', title: 'Ubi Jus Ibi Remedium', content: 'A famous maxim meaning "Where there is a right, there is a remedy." The law will provide a way to enforce a right.', icon: 'ShieldCheck'},
  { id: 'reel-4', title: 'Article 14: Equality', content: 'The State shall not deny to any person equality before the law or the equal protection of the laws within India.', icon: 'Scale'},
  { id: 'reel-5', title: 'Article 21: Heart of Rights', content: 'No person shall be deprived of their life or personal liberty except according to the procedure established by law.', icon: 'HeartPulse'},
  { id: 'reel-6', title: 'Preamble Keywords', content: 'Sovereign, Socialist, Secular, Democratic, Republic. Remember the order!', icon: 'BookMark'},
  { id: 'reel-7', title: 'Libel vs. Slander', content: 'Libel is written defamation (permanent). Slander is spoken defamation (transient). Both harm reputation!', icon: 'MessagesSquare'},
  { id: 'reel-8', title: 'Vicarious Liability', content: 'Holding one person responsible for the actions of another, like an employer for an employee\'s torts.', icon: 'Users'},
  { id: 'reel-9', title: 'What makes a contract?', content: 'Offer + Acceptance + Consideration + Intention to create legal relations = A valid contract.', icon: 'FileSignature'},
  { id: 'reel-10', title: 'Void vs. Voidable', content: 'A void contract is invalid from the start. A voidable contract is valid until one party chooses to cancel it.', icon: 'FileX2'},
  { id: 'reel-11', title: 'Theft vs. Extortion', content: 'Theft is taking property without consent. Extortion is getting property by threatening harm.', icon: 'AlertTriangle'},
  { id: 'reel-12', title: 'Writ of Habeas Corpus', content: 'A powerful writ that means "You may have the body." It protects against unlawful detention.', icon: 'Link'},
  { id: 'reel-13', title: 'Basic Structure Doctrine', content: 'Parliament can amend the Constitution, but it cannot alter its "basic structure." A landmark ruling from Kesavananda Bharati case.', icon: 'Building'},
  { id: 'reel-14', title: 'Donoghue v Stevenson', content: 'The famous "snail in the bottle" case that established the modern concept of negligence and the "neighbour principle".', icon: 'Bug'},
  { id: 'reel-15', title: 'Res Ipsa Loquitur', content: 'A maxim meaning "the thing speaks for itself." Used in torts when negligence is obvious from the facts.', icon: 'Pointer'},
  { id: 'reel-16', title: 'Quid Pro Quo', content: 'A Latin phrase meaning "something for something." It\'s the foundation of consideration in a contract.', icon: 'GitCommit'},
  { id: 'reel-17', title: 'Doli Incapax', content: 'A presumption in criminal law that a child under a certain age is incapable of having criminal intent.', icon: 'Baby'},
  { id: 'reel-18', title: 'Federalism in India', content: 'India is "quasi-federal," a union of states with a strong central government, combining federal and unitary features.', icon: 'Library'},
  { id: 'reel-19', title: '42nd Amendment', content: 'Known as the "Mini-Constitution" for its vast changes, it added "Socialist," "Secular," and "Integrity" to the Preamble.', icon: 'FileEdit'},
  { id: 'reel-20', title: 'President vs. Governor Pardon', content: 'The President can pardon a death sentence (Article 72), but a Governor cannot (Article 161).', icon: 'UserCheck'},
  { id: 'reel-21', title: 'Double Jeopardy', content: 'You cannot be tried for the same crime twice. Protected under Article 20(2) of the Constitution.', icon: 'CopyX'},
  { id: 'reel-22', title: 'Right to Privacy', content: 'Declared a Fundamental Right under Article 21 by the Supreme Court in the Puttaswamy case.', icon: 'EyeOff'},
  { id: 'reel-23', title: 'PIL: Public Interest Litigation', content: 'Allows any public-spirited citizen to file a lawsuit on behalf of a group that cannot do so themselves.', icon: 'UsersRound'},
  { id: 'reel-24', title: 'Lok Adalat', content: 'The "People\'s Court." A form of alternative dispute resolution where disputes are settled by compromise.', icon: 'Handshake'},
  { id: 'reel-25', title: 'Ordinance Power', content: 'The President (Art. 123) and Governor (Art. 213) can issue laws when Parliament/Legislature is not in session.', icon: 'PenSquare'},
  { id: 'reel-26', title: 'Nemo judex in causa sua', content: 'A key principle of natural justice: "No one should be a judge in their own cause." Rule against bias!', icon: 'ShieldBan'},
  { id: 'reel-27', title: 'Audi alteram partem', content: 'Another principle of natural justice: "Let the other side be heard." Right to a fair hearing.', icon: 'Ear'},
  { id: 'reel-28', title: 'Bailment', content: 'Temporarily transferring possession of goods to another person for a specific purpose (e.g., giving a watch for repair).', icon: 'Package'},
  { id: 'reel-29', title: 'Pledge', content: 'A type of bailment where goods are delivered as security for a loan. Think "pawn shop".', icon: 'Lock'},
  { id: 'reel-30', title: 'Contingent Contract', content: 'A contract that depends on the happening or non-happening of a future event (e.g., an insurance contract).', icon: 'HelpCircle'},
  { id: 'reel-31', title: 'Adultery is Not a Crime', content: 'The Supreme Court struck down Section 497 of the IPC, decriminalizing adultery. It remains a ground for divorce.', icon: 'HeartCrack'},
  { id: 'reel-32', title: 'Directive Principles', content: 'These are goals and guidelines for the state, but unlike Fundamental Rights, they are not enforceable in court.', icon: 'Goal'},
  { id: 'reel-33', title: 'First Woman SC Judge', content: 'Justice M. Fathima Beevi was the first woman appointed to the Supreme Court of India in 1989.', icon: 'PersonStanding'},
  { id: 'reel-34', title: 'Joint Sitting of Parliament', content: 'Called by the President (Art. 108) to resolve a deadlock on a bill between Lok Sabha and Rajya Sabha.', icon: 'Combine'},
  { id: 'reel-35', title: 'Money Bill', content: 'Can only be introduced in the Lok Sabha. The Speaker decides if a bill is a Money Bill or not.', icon: 'IndianRupee'},
  { id: 'reel-36', title: 'Concurrent List', content: 'Subjects on which both the Union and State governments can make laws (e.g., education, forests).', icon: 'List'},
  { id: 'reel-37', title: 'Assault vs. Battery', content: 'Assault is the threat of force. Battery is the actual use of force.', icon: 'Wind'},
  { id: 'reel-38', title: 'Nuisance', content: 'Unlawful interference with a person\'s use or enjoyment of their land.', icon: 'VolumeX'},
  { id: 'reel-39', title: 'Absolute Liability', content: 'A strict legal standard for hazardous activities. No exceptions if harm occurs!', icon: 'Skull'},
  { id: 'reel-40', title: 'Attorney General of India', content: 'The highest law officer in the country, appointed by the President. Has the right to speak in Parliament.', icon: 'Briefcase'},
  { id: 'reel-41', title: 'Zero Hour in Parliament', content: 'The time immediately following the Question Hour. An Indian parliamentary innovation.', icon: 'Hourglass'},
  { id: 'reel-42', title: 'Uniform Civil Code', content: 'A DPSP under Article 44, aiming for one law for all citizens in personal matters like marriage and divorce.', icon: 'BookUser'},
  { id: 'reel-43', title: 'Right to Vote', content: 'A constitutional right under Article 326. The voting age was lowered from 21 to 18 by the 61st Amendment.', icon: 'Vote'},
  { id: 'reel-44', title: 'Sources of Law', content: 'Primary sources include legislation, precedents (judgments), and customs.', icon: 'BookOpenCheck'},
  { id: 'reel-45', title: 'Anticipatory Bail', content: 'Bail granted to a person in anticipation of an arrest. A pre-arrest legal remedy.', icon: 'ShieldAlert'},
  { id: 'reel-46', title: 'FIR: First Information Report', content: 'Information recorded by the police about a cognizable offence. It sets the criminal law process in motion.', icon: 'FileText'},
  { id: 'reel-47', title: 'Res Judicata', content: 'A legal doctrine meaning "a matter decided." Prevents the same case from being tried again.', icon: 'ClipboardCheck'},
  { id: 'reel-48', title: 'What is a "Will"?', content: 'A legal document declaring a person\'s wishes regarding the disposal of their property after death.', icon: 'ScrollText'},
  { id: 'reel-49', title: 'Indemnity', content: 'A contract to save a party from loss caused by the conduct of the promisor or any other person.', icon: 'FileHeart'},
  { id: 'reel-50', title: 'Guarantee', content: 'A contract to perform the promise or discharge the liability of a third person in case of their default.', icon: 'ThumbsUp'},
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
  {
    id: 'cr-4',
    title: 'Civil Services (UPSC)',
    description: 'Using a law degree to enter administrative services like IAS, IPS, or IFS.',
    steps: [
      { title: 'Step 1: Law Degree (LLB)', content: 'A law degree provides a strong foundation in polity, governance, and social justice, which are key components of the UPSC syllabus.' },
      { title: 'Step 2: Prepare for UPSC Civil Services Exam', content: 'Choose Law as an optional subject, as your degree gives you a significant advantage. Focus on General Studies, current affairs, and essay writing.' },
      { title: 'Step 3: Clear Prelims, Mains, and Interview', content: 'The exam is a three-stage process. Consistent and dedicated preparation is required to succeed.' },
      { title: 'Step 4: Join the Service', content: 'Upon selection, you will undergo training at LBSNAA (for IAS) or other respective academies and then join the government as a civil servant.' }
    ]
  }
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
