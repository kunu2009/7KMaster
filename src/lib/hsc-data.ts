
import type { HscProseChapter, HscPoetryChapter } from './types';

export const hscEnglishProse: HscProseChapter[] = [
    {
        id: 1,
        title: "An Astrologer’s Day",
        author: "R.K. Narayan",
        contentAvailable: true,
        summaries: {
            short: "An astrologer, running his business under a tamarind tree, encounters a stranger who challenges him. The stranger, Guru Nayak, is revealed to be a man the astrologer tried to kill years ago. The astrologer cleverly uses his knowledge of the past to convince Guru Nayak that his attacker is dead, thus saving his own life and finding relief from his guilt.",
            detailed: `In "An Astrologer's Day," a man who presents himself as an astrologer conducts his daily business in a bustling town square. He has no genuine knowledge of astrology but relies on shrewd guesswork, common sense, and psychological reading of his clients. His appearance—with sacred ash, vermilion, and a turban—lends him an air of mystical wisdom.\n\nLate one evening, a skeptical man named Guru Nayak confronts him, bets a significant amount of money, and demands a substantial answer to a specific question about his past. The astrologer, initially hesitant, agrees. As they talk, the astrologer recognizes the man as the very person he had stabbed and left for dead in a drunken quarrel years ago, which was the reason he fled his village and adopted this new identity.\n\nUsing this secret knowledge, the astrologer "divines" the details of the attack: that the man was stabbed and left in a well to die. He tells Guru Nayak that his attacker died under a lorry months ago. He warns Guru Nayak to never travel southward again and to return home immediately to avoid another threat to his life.\n\nGuru Nayak is astonished by the accuracy and leaves, satisfied and paying the astrologer. The astrologer returns home late and confesses to his wife that a great load is gone from him because he has learned that the man he thought he had killed is actually alive.`,
        },
        characters: [
            {
                name: "The Astrologer",
                sketch: "The protagonist. He is not a real astrologer but a clever, perceptive man who fled his village after a violent incident in his youth. He is resourceful and uses his wits to make a living and, ultimately, to save himself from his past. He carries a heavy burden of guilt, which is lifted by the end of the story."
            },
            {
                name: "Guru Nayak",
                sketch: "The antagonist and the astrologer's final client of the day. He is portrayed as aggressive, skeptical, and vengeful, seeking the man who tried to kill him years ago. His encounter with the astrologer provides the central conflict of the story."
            }
        ],
        theme: "The central theme revolves around fate, guilt, and the power of disguise. It explores how a single past event can shape a person's entire life. The story also touches on the theme of appearance versus reality, as the astrologer's entire persona is a fabrication to hide his true identity and escape his past. The climax brings a sense of poetic justice and relief, as the astrologer uses his deception to bring closure to both himself and his victim.",
        glossary: [
            { word: "Punctilious", meaning: "Showing great attention to detail or correct behavior." },
            { word: "Prophetic", meaning: "Accurately describing or predicting what will happen in the future." },
            { word: "Dalliance", meaning: "A casual romantic or sexual relationship." },
            { word: "Pique", meaning: "A feeling of irritation or resentment resulting from a slight, especially to one's pride." },
            { word: "Cowrie shells", meaning: "Polished, often colorful shells used in the past as currency in parts of Africa and Asia." }
        ],
        lineByLineExplanation: `**Paragraph 1-2: The Astrologer's Setup**
The story opens by describing the astrologer's professional setup. He works daily under a tamarind tree in a busy town path, surrounded by various vendors. His equipment is simple: a dozen cowrie shells, charts, and a notebook. This setup, combined with his appearance (saffron turban, sacred ash), creates a powerful, mystical image for his clients, despite his complete lack of actual astrological knowledge. The lighting from the neighboring shops creates an enchanting atmosphere that enhances his mystique.

**Paragraph 3-5: The Astrologer's Method**
The author reveals that the astrologer's success comes from experience and shrewd guesswork, not star-reading. He left his village years ago without a plan and fell into this profession by chance. He listens to his clients for ten minutes, allowing them to provide enough information for him to offer vague but satisfying advice. He is a master psychologist, understanding the common troubles of humanity: marriage, money, and relationships.

**Paragraph 6-10: The Arrival of Guru Nayak**
As the astrologer is about to pack up, a new client, Guru Nayak, appears. He is portrayed as aggressive and challenging. He scoffs at the astrologer and makes a bet: if the astrologer can give a satisfactory answer, he will pay well; if not, the astrologer must return his money with interest. This sets up the central conflict. The astrologer, seeing a challenge, accepts.

**Paragraph 11-15: The Recognition**
The astrologer begins his usual routine, but as he looks at the man's face in the dim light of a match, he has a moment of shock and recognition. He tries to back out of the deal, but the stranger holds him to it. This moment is the turning point; the astrologer realizes this stranger is connected to his hidden past.

**Paragraph 16-20: The "Divination"**
Forced to continue, the astrologer uses his secret knowledge. He "divines" that the stranger was once stabbed with a knife and left for dead in a well. He correctly names the man, Guru Nayak, further astonishing him. The astrologer then fabricates a story that the attacker was crushed under a lorry and is now dead, bringing a sense of closure to Guru Nayak's quest for revenge. He warns Nayak to stay away from his village to avoid future danger.

**Paragraph 21-25: The Confession and Relief**
Guru Nayak, completely convinced, pays the astrologer and leaves. The astrologer returns home and, in a moment of honesty with his wife, reveals the truth. He confesses that he thought he had murdered a man years ago in a drunken fight. Seeing Guru Nayak alive has lifted a great weight of guilt from his conscience. He can now sleep peacefully, free from the fear of being a murderer.`,
        qa: {
            seenPassages: [
                {
                    passage: "He had a working analysis of mankind’s troubles: marriage, money, and the tangles of human ties. Long practice had sharpened his perception. Within five minutes he understood what was wrong. He charged three pies per question, never opened his mouth till the other had spoken for at least ten minutes, which provided him enough stuff for a dozen answers and advices.",
                    questions: [
                        {
                            question: "What was the astrologer's method for understanding his clients' problems?",
                            answer: "The astrologer's method was to let the client speak for at least ten minutes. This gave him enough information about their life and troubles to provide a dozen convincing answers and pieces of advice. He relied on long practice and perception, not astrology."
                        },
                        {
                            question: "What were the common troubles of mankind according to the astrologer?",
                            answer: "According to the astrologer, the common troubles of mankind were marriage, money, and the complexities of human relationships."
                        },
                         {
                            question: "What does the phrase 'sharpened his perception' mean in this context?",
                            answer: "It means that through continuous practice over a long time, his ability to observe, understand, and make shrewd judgments about people had become very keen and accurate."
                        }
                    ]
                }
            ],
            shortQuestions: [
                {
                    question: "Why did the astrologer leave his village?",
                    answer: "He left his village because he had stabbed a man in a drunken quarrel and, believing he had killed him, fled to escape the consequences."
                },
                {
                    question: "How did the astrologer give Guru Nayak a sense of closure?",
                    answer: "He convinced Guru Nayak that the man who attacked him was dead, having been crushed under a lorry. This ended Nayak's quest for revenge."
                }
            ],
            longQuestions: [
                {
                    question: "Describe the role of irony in 'An Astrologer's Day'.",
                    answer: "Irony is central to the story. The greatest irony is that the astrologer, a fake, gives his most accurate and life-altering prediction to the very man he once tried to kill. He saves his own life by telling a lie (that the attacker is dead) which is based on a profound truth (he *is* the attacker). Furthermore, the client, Guru Nayak, seeks truth and revenge but leaves satisfied with a complete fabrication. The final irony is that the astrologer's relief comes not from his successful deception, but from the accidental discovery that his victim is alive, freeing him from a lifetime of guilt."
                }
            ],
            grammarQuestions: [
                {
                    question: "He charged three pies per question. (Rewrite using the past perfect continuous tense)",
                    answer: "He had been charging three pies per question."
                },
                {
                    question: "Long practice had sharpened his perception. (Change the voice)",
                    answer: "His perception had been sharpened by long practice."
                }
            ]
        }
    },
    {
        id: 2,
        title: "On Saying \"Please\"",
        author: "A.G. Gardiner",
        contentAvailable: true,
        summaries: {
            short: "A.G. Gardiner, in his essay, explores the importance of courtesy and good manners in daily social interactions. He argues that while bad manners are not a legally punishable offense, they can poison the social atmosphere. Conversely, small courtesies like saying 'please' and 'thank you' sweeten life and make social exchanges smoother. He uses the example of a lift-man who throws a passenger out for not saying 'please' to distinguish between legal offenses and social discourtesies.",
            detailed: `In his insightful essay "On Saying 'Please'," A.G. Gardiner examines the value of politeness in everyday life. He begins by discussing a lift-man who ejected a passenger for rudely demanding to be taken to the "Top" instead of saying "Top, please." While Gardiner does not condone the lift-man's violent reaction, he sympathizes with the frustration caused by such incivility. He makes a clear distinction between actions that are legally punishable (like assault and battery) and those that are not (like bad manners). The law, he argues, cannot regulate our social civilities or moods.\n\nHowever, Gardiner emphasizes that this does not diminish the importance of good manners. He suggests that discourtesy is a social disease that can infect the entire stream of life. Rudeness from one person often provokes rudeness in another, creating a vicious cycle of ill-will. In contrast, courtesy and civility act as social lubricants. Words like "please" and "thank you" are the small change of social life that help make interactions run smoothly and pleasantly. He illustrates this with the example of a cheerful bus conductor who brightens the day for his passengers with his kindness. Gardiner concludes that while the law is a necessary institution, the real sweetness and health of society depend on the small, voluntary courtesies we extend to one another.`,
        },
        characters: [
             {
                name: "The Lift-man",
                sketch: "A character used as the primary example to illustrate the central argument. He reacts improperly to a passenger's rudeness by physically ejecting him, thus confusing a moral offense with a legal one. He represents the frustration people feel when faced with discourtesy."
            },
            {
                name: "The 'Polite' Bus Conductor",
                sketch: "Presented as a counter-example to the lift-man. This conductor spreads cheer and goodwill through his consistent kindness and good humor, showing how positive manners can have a ripple effect on society."
            }
        ],
        theme: "The primary theme is the distinction between law and morality, and the profound social importance of good manners. Gardiner argues that while discourtesy is not illegal, it is socially destructive. Politeness, on the other hand, is a cornerstone of a healthy society, fostering goodwill and making life more pleasant for everyone. The essay advocates for a voluntary adoption of civility to improve our collective experience.",
        glossary: [
            { word: "Discourtesy", meaning: "Rudeness; lack of courtesy." },
            { word: "Haughty", meaning: "Arrogantly superior and disdainful." },
            { word: "Retaliate", meaning: "Make an attack or assault in return for a similar attack." },
            { word: "Morose", meaning: "Sullen and ill-tempered." },
            { word: "Uncouth", meaning: "Lacking good manners, refinement, or grace." }
        ],
        lineByLineExplanation: `**Paragraph 1: The Lift-man Incident**
Gardiner introduces the central anecdote: a lift-man in London threw a passenger out for refusing to say "Please." The author acknowledges that while the passenger was rude, the lift-man's violent reaction was legally wrong. This sets up the core distinction between legal offenses and social discourtesies.

**Paragraph 2: Law vs. Manners**
The author explains that the law does not compel us to be polite. There is no legal penalty for being rude, haughty, or boorish. The law protects us from direct physical harm (assault, battery), but it cannot regulate our social behavior, tone of voice, or facial expressions. Allowing legal retaliation for rudeness would lead to chaos.

**Paragraph 3: The Ripple Effect of Discourtesy**
While bad manners aren't a crime, Gardiner argues they are a serious social problem. If the lift-man had been wronged, he likely would have passed on his bad mood to his wife, creating a ripple effect of negativity. Discourtesy is infectious and can "poison the stream" of daily life.

**Paragraph 4: The Power of Courtesy**
In contrast, good manners are also infectious. Small courtesies like "Please" and "Thank you" are the "little courtesies" that act as social lubricants. They are the "oil" that makes the "machine of life" run smoothly and sweetly. They help create a cooperative and friendly atmosphere.

**Paragraph 5: The Cheerful Bus Conductor**
Gardiner provides a positive example: a good-natured bus conductor. This conductor maintains his cheerfulness and spreads it to his passengers, making their journey more pleasant. He treats everyone with kindness and good humor, even when dealing with minor problems like someone tripping. He acts as a source of "sunshine" in the daily grind.

**Paragraph 6: Conclusion**
The author concludes that while the law is necessary to prevent major aggressions, it is the small, everyday civilities that truly define a civilized society. We must rely on voluntary politeness to make life pleasant. The lift-man's mistake was in resorting to physical force for a social slight, a battle that can only be won with grace and kindness.`
    },
    {
        id: 3,
        title: "The Cop and the Anthem",
        author: "O. Henry",
        contentAvailable: true,
        summaries: {
            short: "Soapy, a homeless man in New York City, wants to get arrested to spend the winter in the warmth of a jail cell on Blackwell's Island. He makes several attempts to break the law—dining without money, vandalism, disorderly conduct—but each attempt ironically fails as the police ignore him or mistake his intentions. Just as he gives up and decides to reform his life after hearing a church anthem, a cop arrests him for loitering. He is sentenced to three months on the island, the very fate he had sought but no longer wanted.",
            detailed: `The story centers on Soapy, a homeless man facing the approaching winter in New York City. His annual solution is to get arrested for a minor crime so he can be sentenced to three months in the relative comfort of the prison on Blackwell's Island. With this goal, Soapy sets out to break the law.\n\nHis first attempt involves dining at an expensive restaurant with no money to pay, but the head waiter sees his tattered clothes and prevents him from even entering. Next, he smashes a shop window, but the policeman refuses to believe he is the culprit and chases someone else. He then eats at a more modest restaurant and, upon revealing he is penniless, is simply thrown out by the waiters without police involvement. He tries to harass a woman, hoping she will call a cop, but she turns out to be a prostitute who is receptive to his advances. He then pretends to be drunk and disorderly, but a policeman dismisses him as a harmless Yale student celebrating a victory. Finally, he steals a man's umbrella, but the man, having stolen it himself, gladly gives it to him.\n\nDejected, Soapy wanders to a quiet street where he stops before a church. An organist is playing an anthem that reminds him of his past life of ambition and honor. In a moment of epiphany, he decides to reform himself, find a job, and reclaim his life. As he stands there, filled with this new resolve, a policeman taps him on the shoulder, arrests him for loitering, and the next day a judge sentences him to "three months on the Island."`,
        },
        characters: [
            {
                name: "Soapy",
                sketch: "The protagonist, a homeless man who is resourceful but down on his luck. He is a character of contradictions—he seeks imprisonment for comfort but possesses a deep-seated sense of dignity and a forgotten ambition. His journey highlights the story's central irony."
            }
        ],
        theme: "The main theme is the irony of fate and the futility of human plans. Soapy's repeated, deliberate attempts to get arrested all fail, yet the moment he resolves to lead an honest life, he is arrested for doing nothing at all. The story is a social commentary on the nature of justice, law, and the lack of compassion for the unfortunate. It critiques a society where the only way for a poor man to find food and shelter is through imprisonment.",
        glossary: [
            { word: "Anthem", meaning: "A rousing or uplifting song identified with a particular group, body, or cause." },
            { word: "Arcadian", meaning: "Relating to an idealized country life; rustic, simple, and peaceful." },
            { word: "Penitentiary", meaning: "A prison for people convicted of serious crimes." },
            { word: "Harangue", meaning: "To lecture (someone) at length in an aggressive and critical manner." },
            { word: "Epiphany", meaning: "A moment of sudden and great revelation or realization." }
        ],
        lineByLineExplanation: `**Paragraph 1-2: Soapy's Winter Plan**
The story introduces Soapy, a homeless man in Madison Square. As winter approaches, he knows he needs to find shelter. His goal is not a trip to Florida or the Mediterranean but three months of food and lodging in the prison on Blackwell's Island. This has been his winter resort for years.

**Paragraph 3-7: The First Three Attempts**
Soapy begins his mission to get arrested.
1.  **The Luxury Cafe:** He tries to enter a fancy cafe, planning to order a meal and then get arrested for not paying. However, the head waiter notices his shabby shoes and torn trousers and turns him away.
2.  **The Plate-Glass Window:** Soapy throws a stone through a shop window. He stands still, waiting for the cop to arrest him. Ironically, the cop refuses to believe that the person who committed the crime would wait around and instead chases an innocent man who was running away.
3.  **The Second Restaurant:** He enters a less pretentious restaurant, eats a meal, and then declares he has no money. Instead of calling the police, two waiters simply throw him out onto the pavement.

**Paragraph 8-10: More Failed Attempts**
Soapy's frustration grows.
4.  **Disorderly Conduct:** He pretends to be drunk, yelling and dancing on the street. A policeman observes him but assumes he is a harmless Yale student celebrating a college victory and lets him go.
5.  **Harassing a Woman:** He approaches a well-dressed woman, hoping to be arrested for harassment. The woman, however, turns out to be a prostitute who welcomes his advance, foiling his plan again.

**Paragraph 11-12: The Umbrella Incident**
Soapy sees a man with a silk umbrella at a cigar store. He grabs it and walks off. The man follows, but when Soapy challenges him to call a cop, the man admits he found the umbrella himself and retreats. Soapy's final attempt at crime fails spectacularly.

**Paragraph 13-15: The Epiphany at the Church**
Disgusted with his luck, Soapy drifts towards a quiet old church. He hears a church organ playing an anthem, a piece of music that reminds him of his past life of family, ambition, and clean living. A sudden and powerful change comes over him. He realizes the mess he has made of his life and resolves to reform. He decides he will find a job the next day and become "somebody in the world."

**Paragraph 16-17: The Final Irony**
As Soapy stands there, filled with this new hope and purpose, a policeman approaches, asks what he's doing, and arrests him for loitering. The next morning, the magistrate sentences him to "three months on the Island"—the very fate he had tried so hard to achieve, but which he now no longer desires.`
    },
    {
        id: 4,
        title: "Big Data – Big Insights",
        author: "",
        contentAvailable: true,
        summaries: {
            short: "This informative piece explains the concept of 'Big Data'—the massive volume of data that organizations collect. It details how this data is used across various sectors like healthcare, education, and finance to gain deep insights, identify trends, and make informed decisions. The text highlights that Big Data analytics helps in understanding customer behavior, optimizing processes, and even in fields like sports to enhance player performance. It's described as a revolutionary force in the modern world.",
            detailed: `The chapter "Big Data – Big Insights" introduces the concept of Big Data, which refers to the large and complex datasets that traditional data-processing application software are inadequate to deal with. The author explains that Big Data is everywhere, generated by our daily activities on social media, online shopping, travel, and more.\n\nThe text outlines the "Uses of Big Data" across numerous industries:\n1.  **Location Tracking:** GPS and Google Maps use big data to provide real-time traffic updates and optimal routing.\n2.  **Healthcare Industry:** It helps in maintaining patient records, predicting disease outbreaks (like flu), and providing evidence-based medicine.\n3.  **Education Industry:** Big Data is used to customize learning programs, understand student performance, and design better courses.\n4.  **Banking, Finance and Trading:** It helps in fraud detection, risk analysis, and predicting market trends.\n5.  **Sports Analytics:** It's used to analyze player performance, team strategies, and even fan engagement.\n6.  **Advertising:** Companies use customer data to create highly targeted and personalized advertisements.\n\nThe chapter emphasizes that Big Data is not just about the volume of data but about the 'insights' that can be extracted from it. This ability to analyze massive datasets quickly allows organizations to be more efficient, competitive, and innovative.`,
        },
        characters: [],
        theme: "The central theme is the revolutionary impact of Big Data on modern society and industry. It highlights the shift from traditional data handling to advanced analytics that can uncover hidden patterns and correlations. The text portrays Big Data as a powerful tool for optimization, prediction, and personalization, transforming how businesses operate, how healthcare is delivered, and even how we learn and entertain ourselves. It presents a world where data is the new fuel for economic and social progress.",
        glossary: [
            { word: "Analytics", meaning: "The systematic computational analysis of data or statistics." },
            { word: "Optimize", meaning: "Make the best or most effective use of (a situation, opportunity, or resource)." },
            { word: "Logistics", meaning: "The detailed coordination of a complex operation involving many people, facilities, or supplies." },
            { word: "E-commerce", meaning: "Commercial transactions conducted electronically on the Internet." },
            { word: "Insights", meaning: "A deep understanding of a person or thing." }
        ],
        lineByLineExplanation: `**Introduction: What is Big Data?**
The text defines Big Data as the huge amount of data organizations collect, which can be analyzed to reveal patterns, trends, and associations, especially relating to human behavior. It explains that our online activities—social media, shopping, GPS—all contribute to this data explosion, measured in petabytes or exabytes. The key takeaway is that data analysis, or "insights," is what makes Big Data valuable.

**Section 1: Uses in Location Tracking & Transportation**
Big Data is fundamental to services like GPS and Google Maps. By tracking our locations and speeds, these systems provide real-time traffic data, calculate optimal routes, and predict travel times. This helps in logistics, allowing companies to track goods and reduce transportation risks.

**Section 2: Uses in the Healthcare Industry**
The healthcare sector uses Big Data to maintain digital patient records, making care more efficient. Wearable devices (like smartwatches) generate health data that can predict health issues. It also helps in identifying disease outbreak patterns (epidemics) and allows for evidence-based medicine, where treatments are based on vast datasets of patient outcomes.

**Section 3: Uses in the Education Industry**
In education, Big Data allows for customized learning experiences. By analyzing student data (like course choices and test results), institutions can understand student needs, identify at-risk students, and design more effective curricula. This leads to a better learning environment and improved student outcomes.

**Section 4: Uses in Banking, Finance, and Trading**
This section details how financial institutions use Big Data. It's crucial for fraud detection by identifying unusual patterns in transactions. It's also used for risk analysis in insurance and lending. In trading, algorithms use Big Data to analyze market trends and make automated trading decisions.

**Section 5: Uses in Sports Analytics**
Modern sports heavily rely on Big Data. Sensors on equipment and video analytics help track every aspect of player performance, from a bowler's speed to a batsman's shot selection. This data is used to improve player skills, formulate team strategies, and enhance the viewing experience for fans.

**Section 6: Uses in Advertising and Media**
Big Data is the engine of targeted advertising. Companies like Facebook, Google, and Amazon analyze user data (likes, searches, purchases) to show highly relevant ads. This increases the effectiveness of advertising campaigns. Similarly, streaming services like Netflix analyze viewing data to recommend shows and even produce original content they predict will be popular.

**Conclusion: The Power of Insights**
The chapter concludes by reinforcing that Big Data is beneficial to everyone, from large corporations to individuals. It has the power to solve problems, improve efficiency, and drive innovation across all sectors of life.`
    },
    {
        id: 5,
        title: "The New Dress",
        author: "Virginia Woolf",
        contentAvailable: true,
        summaries: {
            short: "Mabel Waring attends a party wearing a new yellow dress she had specially made. Instead of feeling confident, she is consumed by feelings of insecurity, social anxiety, and self-consciousness. She imagines that all the other guests are judging her and her dress, seeing her as inferior and foolish. Through a stream-of-consciousness narrative, the story delves into Mabel's deep-seated insecurities about her social class and self-worth, revealing that her torment is entirely internal.",
            detailed: `Virginia Woolf's "The New Dress" uses a stream-of-consciousness narrative to explore the mind of its protagonist, Mabel Waring, at a party hosted by Clarissa Dalloway. Mabel has put great effort into her new yellow dress, hoping it will make her feel beautiful and confident. However, from the moment she arrives, she is overwhelmed by intense feelings of inadequacy and self-doubt.\n\nShe constantly compares herself to the other, more fashionable and wealthy guests, and imagines they are mocking her dress and her attempts to fit in. She sees her dress not as stylish but as "frightful, foolish, [and] old-fashioned." The narrative dives deep into her thoughts, which are a turbulent mix of past memories, self-criticism, and imagined judgments. She recalls her humble origins and feels like an insignificant "fly" trying to crawl out of a saucer of milk.\n\nMabel tries to engage in conversations but can only offer insincere platitudes, feeling disconnected and fraudulent. Her internal monologue reveals a profound sense of loneliness and alienation, even in a crowded room. She fantasizes about escaping her social anxiety by imagining a new life devoted to solitude and intellectual pursuits. In the end, defeated by her own mind, she leaves the party abruptly, still trapped in her cycle of self-deprecation, murmuring "Lies, lies, lies!" as she departs.`,
        },
        characters: [
            {
                name: "Mabel Waring",
                sketch: "The central character. Mabel is a middle-aged woman plagued by deep-seated insecurity and social anxiety. Her perception of the world is entirely filtered through her own self-consciousness. She longs for acceptance and validation but is her own worst critic, turning a social event into an experience of intense psychological torment."
            }
        ],
        theme: "The story explores themes of social anxiety, self-consciousness, and class insecurity. It masterfully illustrates the gap between external reality and internal perception, showing how personal insecurities can distort one's experience of the world. Woolf critiques the superficiality of high-society gatherings and delves into the psychological suffering that can lie beneath a placid social exterior. The dress itself becomes a symbol of Mabel's vulnerability and her failed attempt to craft a confident identity.",
        glossary: [
            { word: "Stream of consciousness", meaning: "A narrative mode that seeks to portray an individual's point of view by giving the written equivalent of the character's thought processes." },
            { word: "Inadequacy", meaning: "The state or quality of being inadequate; lack of the quality or quantity required." },
            { word: "Self-deprecation", meaning: "Modesty about or criticism of oneself." },
            { word: "Platitude", meaning: "A remark or statement, especially one with a moral content, that has been used too often to be interesting or thoughtful." },
            { word: "Alienation", meaning: "The state or experience of being isolated from a group or an activity to which one should belong or in which one should be involved." }
        ],
        lineByLineExplanation: `**The Arrival and First Doubt**
Mabel arrives at Mrs. Dalloway's party. Her first thought upon seeing herself in a mirror is one of profound self-doubt: "No. It was not 'right'." This immediately establishes her internal conflict. She feels her new yellow dress is inappropriate and old-fashioned compared to the other guests' attire.

**The "Fly in the Saucer" Metaphor**
Her insecurity deepens into a powerful metaphor. She sees herself and all of humanity as flies trying to crawl out of a saucer of milk—struggling, making things messy, and ultimately failing to reach the "brim." This image represents her feeling of helplessness, social awkwardness, and the futility of her efforts to fit in.

**Internal Monologue and Social Interactions**
The narrative follows Mabel's stream of consciousness as she interacts with guests. Externally, she is polite and makes small talk with people like Rose Shaw. Internally, however, she is in torment, imagining they are all judging her. She feels her conversations are hollow and insincere. Every compliment she receives about her dress, she interprets as pity or mockery.

**Memories and Insecurities**
Mabel's thoughts drift back to her past, her childhood, her "obscure" family, and her marriage. She remembers the process of choosing the dress pattern from an old fashion magazine and her sessions with the dressmaker, Miss Milan. At the time, she felt creative and original, but now, in the context of the party, she sees her choice as pathetic and out of touch. This reveals that her insecurity is rooted in her perception of her social and economic class.

**Fantasies of Escape**
Overwhelmed by her anxiety, Mabel fantasizes about escaping her current self. She imagines a new life where she can be her "real" self—someone who reads books, lives in the country, and is free from the pressure of social gatherings. This desire for a different life is a coping mechanism for her present misery.

**The Departure**
Unable to bear the self-inflicted psychological torture any longer, Mabel decides to leave the party. She says a quick, awkward goodbye to Mrs. Dalloway, still feeling like a failure. As she leaves, she repeats the words, "Lies, lies, lies!" This signifies her feeling that her entire social performance, and perhaps her entire life, is built on a foundation of pretense and insincerity. Her final thought is about her own "cowardice," as she runs away from the situation rather than confronting her feelings.`
    },
    {
        id: 6,
        title: "Into the Wild",
        author: "Kiran Purandare (extract from)",
        contentAvailable: true,
        summaries: {
            short: "This is an autobiographical account by Kiran Purandare, a wildlife expert and conservationist. The excerpt details his experiences living in the wild. One part describes his journey to a village named Umbarzara for his work with a nature conservation organization. The other part recounts a harrowing experience where he gets lost in the forest and has a close encounter with a leopard, highlighting the beauty, unpredictability, and danger of the jungle.",
            detailed: `The excerpt from Kiran Purandare's "Into the Wild" is divided into two parts.\n\n**Part I:** The author describes his work at the Navegaon National Park and his journey to Umbarzara, a village surrounded by forests. He details his solitary life in a small, run-down room, his simple daily routine, and his deep connection with nature. He spends his days roaming the jungle, observing its flora and fauna, and encountering various animals. This part establishes his passion for wildlife and his comfort with the solitude of the forest.\n\n**Part II:** This part narrates a specific, tense incident. One evening, while exploring the jungle, Purandare gets lost as dusk falls. He describes his growing anxiety and the disorientation of being alone in the darkening wilderness. As he tries to find his way back, he hears alarm calls from langurs and deer, signaling the presence of a predator. He soon comes face-to-face with a leopard. The narrative builds suspense as he describes the encounter, his fear, and his eventual relief as the leopard moves away. The experience leaves him with a profound sense of awe and a deeper respect for the raw, untamed nature of the wild. He realizes his own insignificance in the grand scheme of the jungle.`,
        },
        characters: [
            {
                name: "Kiran Purandare",
                sketch: "The author and protagonist. He is a passionate naturalist, conservationist, and writer. He is portrayed as someone who is deeply connected to the natural world, finding solace and purpose in the wilderness. He is observant, resilient, and possesses a deep respect for wildlife, even in the face of danger."
            }
        ],
        theme: "The primary theme is the relationship between humans and nature. It showcases the immense beauty and tranquility of the wild, but also its inherent dangers and unpredictability. The text explores the idea of finding oneself in solitude and nature, away from the chaos of civilization. A key message is the importance of respecting the forest and its inhabitants, acknowledging that humans are merely visitors in their world. It also highlights the thrill and awe that come from direct encounters with wildlife.",
        glossary: [
            { word: "Conservationist", meaning: "A person who advocates for or acts for the protection and preservation of the environment and wildlife." },
            { word: "Machete", meaning: "A broad, heavy knife used as an implement or weapon, originating in Central and South America." },
            { word: "Avifauna", meaning: "The birds of a particular region, habitat, or geological period." },
            { word: "Languor", meaning: "The state or feeling, often pleasant, of tiredness or inertia." },
            { word: "Sanctum sanctorum", meaning: "A very private or sacred place." }
        ],
        lineByLineExplanation: `**Part I: Lost in the Jungle**

**Setting the Scene:** The author narrates his experience working as a naturalist in Navegaon National Park. He is stationed in a village called Umbarzara, living a solitary life in a basic room, which allows him to be close to nature. His daily routine involves exploring the jungle, observing wildlife, and learning from the local villagers.

**A Typical Day:** He describes a typical afternoon where he goes into the forest. He is deeply absorbed in observing the sights and sounds of the jungle—the chirping of birds, the rustling of leaves, the calls of different animals. This section highlights his deep connection and familiarity with the forest environment.

**Getting Lost:** As evening approaches, he ventures too far into the jungle while following a trail. He loses his bearings and realizes he is lost. The narrative builds tension as the sun sets and the jungle transforms from a place of beauty to one of potential danger. He describes his feelings of anxiety and the "numbing" of his senses as he tries to find his way back.

**Part II: The Encounter**

**Signs of a Predator:** While desperately trying to find a path, he hears the alarm calls of a langur, followed by other animals. As a naturalist, he immediately understands that these calls signal the presence of a large predator like a leopard or tiger. His fear intensifies.

**Face to Face with the Leopard:** He follows the sounds cautiously. Suddenly, he sees a leopard on a rock nearby. The author describes the animal in detail—its color, its muscular body, and its intense gaze. He freezes, filled with a mix of terror and awe. There is a tense moment where man and beast stare at each other.

**The Leopard's Retreat:** The leopard, after a few moments, seems to lose interest. It snarls, turns, and disappears back into the wilderness. The author is left shaken but unharmed.

**Reflection and Realization:** The encounter has a profound effect on him. He realizes the raw power and unpredictability of nature. He understands that in the jungle, he is just a "puny" and insignificant creature. The experience deepens his respect for the wild and reinforces his understanding that humans are merely visitors in this domain. He eventually finds his way back, carrying with him the unforgettable memory of the encounter.`
    },
    {
        id: 7,
        title: "Why We Travel",
        author: "Pico Iyer",
        contentAvailable: true,
        summaries: {
            short: "Pico Iyer's essay argues that we travel not just to see new places, but to lose ourselves and, in doing so, to find ourselves again. He suggests that travel takes us out of our familiar contexts and forces us to see the world—and our own lives—with fresh eyes. It's a way to become a 'blank slate,' to challenge our assumptions, and to bring a renewed sense of perspective back home. Ultimately, Iyer posits that the real journey is internal, and travel is merely the catalyst for this personal transformation.",
            detailed: `In his reflective essay "Why We Travel," Pico Iyer delves into the deeper, more philosophical reasons behind our urge to explore the world. He moves beyond the simple idea of tourism for pleasure or escape. Iyer's central argument is that we travel to step outside the boundaries of our own identity and see ourselves and our lives from an objective distance. It is in this state of being an "anonymous observer" that we can gain true perspective.\n\nHe contends that travel makes us "younger," not in age, but in our sense of wonder and perception. In a foreign land, where we don't know the language or customs, our senses are heightened, and we see everything with the intensity of a child. This process of "unlearning" our assumptions is crucial. Iyer also touches upon the idea that by immersing ourselves in a different culture, we can better understand the universal aspects of human nature.\n\nThe essay concludes that the true value of travel lies not in the destinations we visit but in the changes they provoke within us. The goal is to bring a "wiser, more tolerant, and renewed" self back home. The physical journey is a metaphor for an internal journey of self-discovery, and the most profound sights we see are the new perspectives we gain on our own lives.`,
        },
        characters: [],
        theme: "The central theme is travel as a means of self-discovery and transformation. Iyer explores the paradox that by 'losing ourselves' in a foreign environment, we ultimately 'find ourselves.' Key related themes include: \n- **Perspective:** Gaining a fresh, objective view on one's own life and culture. \n- **Transformation:** The idea that travel changes us internally, making us more open-minded and self-aware. \n- **Anonymity:** The freedom that comes from being unknown in a new place, which allows for introspection and reinvention. \n- **The Inner Journey:** The ultimate purpose of travel is not just to move across the globe, but to move within oneself.",
        glossary: [
            { word: "Catalyst", meaning: "A person or thing that precipitates an event or change." },
            { word: "Provincial", meaning: "Having or showing the manners, viewpoints, etc., considered characteristic of unsophisticated inhabitants of a province; rustic; narrow or illiberal." },
            { word: "Introspection", meaning: "The examination or observation of one's own mental and emotional processes." },
            { word: "Abstract", meaning: "Existing in thought or as an idea but not having a physical or concrete existence." },
            { word: "Paradox", meaning: "A seemingly absurd or self-contradictory statement or proposition that when investigated or explained may prove to be well founded or true." }
        ],
        lineByLineExplanation: `**Introduction: Beyond Simple Movement**
Iyer starts by establishing that real travel is more than just motion. While we can move around physically, true travel is about a change in perspective. He argues the first question is not where we are going, but *why*.

**Travel to Lose Ourselves**
The first major point is a paradox: we travel to lose ourselves. By leaving behind our familiar identity—our job, our social roles, our daily routines—we become anonymous. This anonymity is liberating. It allows us to become a "blank slate" and see the world without the filter of our own preconceived notions.

**Travel to Find Ourselves**
The other side of the paradox is that in losing ourselves, we find ourselves. When we are stripped of our usual context, we are forced to confront who we really are. We rely on our inner resources. Travel also helps us see our own life from a distance, allowing us to appreciate what we have or realize what we need to change.

**The World as a Source of Wonder**
Iyer argues that travel makes us "younger" by restoring a sense of wonder. In a foreign place, everything is new and strange. Simple tasks like buying a stamp or asking for directions become adventures. This heightened state of awareness is what makes travel so enriching. We are forced to pay attention in a way we rarely do at home.

**Bringing a New Perspective Home**
The ultimate goal of travel, according to Iyer, is not to stay in a foreign place forever but to bring a transformed self back home. We return with new ideas, a better understanding of the world, and a renewed appreciation for our own life. The "foreign" perspectives we gain help us see our own "provincial" or narrow viewpoints.

**The Inner Journey**
Iyer concludes by emphasizing that the real journey is always internal. The outer world is just a mirror or a catalyst for what happens inside us. Travel is a "strategy for renewing our vision." The most important discoveries we make are not on a map, but within our own minds and hearts.`
    },
    {
        id: 8,
        title: "Voyaging Towards Excellence",
        author: "Achyut Godbole",
        contentAvailable: true,
        summaries: {
            short: "This autobiographical piece by Achyut Godbole traces his journey from a middle-class, Marathi-medium student with an inferiority complex to a successful IT professional and author. He emphasizes that his 'thirst for knowledge,' curiosity, and dedication to self-improvement were the keys to his success. He argues that there is no shortcut to excellence and that one must embrace learning in all fields, from science to humanities, to develop a well-rounded personality.",
            detailed: `In "Voyaging Towards Excellence," Achyut Godbole recounts his personal and professional journey, highlighting the principles that led to his success. He starts by describing his childhood and education in a Marathi-medium school, which initially led to a severe inferiority complex when he entered IIT. He felt out of place due to his poor English and limited exposure. However, he overcame this by developing a positive attitude and a deep-seated 'thirst for knowledge.'\n\nGodbole explains his philosophy of learning, which involved not just mastering his own field of Science and Technology but also delving deep into Music, Literature, and Art. He believed that this interdisciplinary approach was crucial for holistic development and for understanding the world in a broader context. He details his successful career at Patni Computers, where he rose to the position of General Manager at a young age, and his later ventures as a prolific author.\n\nThe author argues against the idea of 'shortcuts' to success. For him, excellence is a continuous process of hard work, curiosity, and perseverance. He concludes by stating that his journey has been a 'voyage' towards excellence, not a destination, emphasizing the importance of lifelong learning and the relentless pursuit of one's full potential.`,
        },
        characters: [
            {
                name: "Achyut Godbole",
                sketch: "The author and protagonist of this autobiographical account. He portrays himself as an individual driven by an insatiable curiosity and a desire for self-improvement. He is humble about his beginnings but confident in his philosophy of hard work and broad, interdisciplinary learning. He serves as an inspirational figure who overcame personal insecurities to achieve great success in multiple fields."
            }
        ],
        theme: "The central theme is the pursuit of excellence through continuous learning and hard work. Godbole's narrative is a testament to the power of curiosity and the importance of overcoming mental barriers like inferiority complexes. He advocates for a holistic approach to knowledge, integrating both sciences and arts to achieve a well-rounded and successful life. The key message is that true success is not about achieving a single goal but about the lifelong journey ('voyage') of growth and improvement.",
        glossary: [
            { word: "Voyage", meaning: "A long journey involving travel by sea or in space; here, used metaphorically for a life's journey." },
            { word: "Excellence", meaning: "The quality of being outstanding or extremely good." },
            { word: "Holistic", meaning: "Characterized by the belief that the parts of something are intimately interconnected and explicable only by reference to the whole." },
            { word: "Inferiority Complex", meaning: "An unrealistic feeling of general inadequacy caused by actual or supposed inferiority in one sphere, sometimes marked by aggressive behavior in compensation." },
            { word: "Prolific", meaning: "(Of an artist, author, or composer) producing many works." }
        ],
        lineByLineExplanation: `**Part I: Overcoming Inferiority**
The author begins by describing his background. He was a successful student in his Marathi-medium school but developed a severe inferiority complex upon joining IIT Bombay. He felt his English was poor, his vocabulary weak, and his general knowledge limited compared to his peers from more privileged backgrounds. This created a feeling of depression and a desire to run away.

**Part II: The Thirst for Knowledge**
Godbole decides to fight back. He realizes that the key to overcoming his complex is not just academic success but a broader quest for knowledge. He develops a "thirst for knowledge" and begins to read voraciously on a wide range of subjects outside of his engineering curriculum, including literature, philosophy, economics, and art. This helps him build confidence and a more rounded personality.

**Part III: The Importance of Humanities**
He argues that studying science and technology is not enough. True excellence requires an understanding of the arts, literature, and social sciences. This holistic approach helps one understand the world and human nature more deeply. He gives examples of how he delved into music, painting, and literature, which enriched his life and thinking.

**Part IV: Professional Success**
Godbole narrates his successful career in the IT industry. He joins Patni Computer Systems (PCS) and quickly rises through the ranks, becoming a General Manager at a young age. He credits his success to his problem-solving skills, hard work, and the broad perspective he gained from his diverse studies. He emphasizes that there is no shortcut to the top; it requires dedication and continuous learning.

**Part V: A New Voyage as an Author**
After a long and successful corporate career, he embarks on a new "voyage" as a writer. He begins writing books in Marathi on a variety of subjects, from science and technology to music and economics. This new phase of his life is a continuation of his lifelong passion for learning and sharing knowledge.

**Conclusion: The Never-Ending Journey**
The author concludes that his life has been a continuous journey or "voyage" towards excellence. He stresses that excellence is not a destination but a process. It is about having a thirst for knowledge, working hard, and constantly striving to be better. This spirit of curiosity and perseverance is the central message of his story.`
    }
];

export const hscEnglishPoetry: HscPoetryChapter[] = [
    {
        id: 1,
        title: "Song of the Open Road",
        author: "Walt Whitman",
        contentAvailable: true,
        poemText: [
            "Afoot and light-hearted I take to the open road,",
            "Healthy, free, the world before me,",
            "The long brown path before me leading wherever I choose.",
            "Henceforth I ask not good-fortune, I myself am good-fortune,",
            "Henceforth I whimper no more, postpone no more, need nothing,",
            "Done with indoor complaints, libraries, querulous criticisms,",
            "Strong and content I travel the open road."
        ],
        summaries: {
            overall: "The poem is a celebration of freedom, mobility, and the journey of life. The speaker embraces the open road as a symbol of a life of free will and endless possibilities. He declares his independence from societal expectations and material needs, finding contentment and strength in the act of traveling and experiencing the world directly. It's a call to live a simple, unburdened, and self-reliant life.",
            stanzaWise: `The poem, presented as a single stanza, conveys a powerful message of liberation.
- **Lines 1-3:** The speaker begins his journey on foot, feeling cheerful and healthy. The "open road" symbolizes a life of choice and freedom, where he can go wherever he wishes.
- **Lines 4-5:** He rejects the need for external luck, declaring that he is the creator of his own fortune. He resolves to stop complaining or delaying his life, shedding all dependencies.
- **Lines 6-7:** He leaves behind the constraints of indoor life, which represents intellectual but detached experiences ('libraries') and constant complaining ('querulous criticisms'). He feels strong and content, ready to face the world on his own terms.`
        },
        centralIdea: "The central idea of the poem is the joy of a free and independent life. It emphasizes the importance of self-reliance, optimism, and the connection with nature and the world. The 'road' is a metaphor for the journey of life, and the poet encourages readers to travel it with a light heart, free from social constraints and full of confidence in their own abilities.",
        figuresOfSpeech: [
            { name: "Metaphor", line: "the open road", explanation: "The 'open road' is a metaphor for the journey of life, representing freedom, opportunity, and new beginnings." },
            { name: "Repetition", line: "Henceforth I ask not good-fortune... Henceforth I whimper no more...", explanation: "The word 'Henceforth' is repeated to emphasize the speaker's firm resolution to change his life from this moment forward." },
            { name: "Paradox", line: "I myself am good-fortune", explanation: "This is a paradoxical statement where the speaker claims to be an abstract concept (good-fortune), expressing his ultimate self-confidence and rejection of reliance on external luck." },
            { name: "Alliteration", line: "not good-fortune", explanation: "Repetition of the 'n' sound in 'not' and 'fortune' (although not at the beginning of the word, it creates a consonance effect)." }
        ],
        poeticDevices: {
            rhymeScheme: "The poem is written in free verse and does not have a consistent rhyme scheme or meter.",
        },
        appreciation: `The poem "Song of the Open Road" by Walt Whitman is an inspiring ode to freedom and the journey of life. The central theme is about breaking free from societal constraints and embracing a life of self-reliance and optimism. The poet uses the "open road" as a powerful metaphor for life itself, full of choices and possibilities.
The poem is written in free verse, which complements its theme of freedom as it is not bound by a strict rhyme scheme or meter. Key figures of speech include Metaphor ('the open road'), Repetition ('Henceforth...'), and Paradox ('I myself am good-fortune'). These devices effectively convey the poet's message of empowerment and joy. The tone is uplifting and confident.
My favorite line is "Henceforth I ask not good-fortune, I myself am good-fortune," as it's a powerful declaration of self-belief. I appreciate this poem for its timeless message about taking control of one's own destiny and finding happiness in the journey, not just the destination.`
    },
     {
        id: 2,
        title: "Indian Weavers",
        author: "Sarojini Naidu",
        contentAvailable: true,
        poemText: [
            "Weavers, weaving at break of day,",
            "Why do you weave a garment so gay?...",
            "Blue as the wing of a halcyon wild,",
            "We weave the robes of a new-born child.",
            "",
            "Weavers, weaving at fall of night,",
            "Why do you weave a garment so bright?...",
            "Like the plumes of a peacock, purple and green,",
            "We weave the marriage-veils of a queen.",
            "",
            "Weavers, weaving solemn and still,",
            "What do you weave in the moonlight chill?...",
            "White as a feather and white as a cloud,",
            "We weave a dead man's funeral shroud."
        ],
        summaries: {
            overall: "Sarojini Naidu's 'Indian Weavers' uses the craft of weaving as a metaphor for the cycle of human life. The poem is structured around three questions asked to weavers at three different times of the day. Their answers reveal that they are weaving garments for the three key stages of life: birth (child's robes), adulthood (queen's marriage-veil), and death (funeral shroud). The changing colors and moods of the stanzas reflect the journey from joyful beginnings to solemn ends.",
            stanzaWise: `
- **Stanza 1 (Morning):** At the beginning of the day, the weavers are creating bright, gay, blue robes for a newborn child. This represents the joyful and hopeful start of human life.
- **Stanza 2 (Evening):** At dusk, they weave a vibrant, multi-colored marriage veil for a queen. This symbolizes the prime of life—adulthood, with its passions, celebrations, and responsibilities.
- **Stanza 3 (Night):** In the dead of night, the weavers are silent and serious, weaving a plain white cloth for a dead man's funeral shroud. This represents the final, somber stage of life: death.`
        },
        centralIdea: "The central idea of the poem is that life is a journey through three distinct stages: birth, adulthood, and death. The poet beautifully connects the weavers' work at different times of the day to these stages, using colors and imagery to evoke the corresponding emotions—joy, celebration, and sorrow. It's a profound meditation on the human life cycle.",
        figuresOfSpeech: [
            { name: "Simile", line: "Blue as the wing of a halcyon wild", explanation: "The color of the newborn's robe is directly compared to the blue wing of a kingfisher, suggesting beauty and preciousness." },
            { name: "Simile", line: "Like the plumes of a peacock, purple and green", explanation: "The marriage-veil's brightness and color are directly compared to a peacock's feathers, symbolizing celebration and royalty." },
            { name: "Simile", line: "White as a feather and white as a cloud", explanation: "The funeral shroud's color is compared to a feather and a cloud, evoking feelings of lightness, ethereality, and solemnity." },
            { name: "Metaphor", line: "The entire poem uses the weavers' work as a metaphor for the stages of human life.", explanation: "The act of weaving garments represents the unfolding of life from birth to death." }
        ],
        poeticDevices: {
            rhymeScheme: "The poem follows a consistent rhyme scheme of 'aabb', 'ccdd', 'eeff'.",
        },
        appreciation: `Sarojini Naidu's "Indian Weavers" is a short but profound poem that beautifully captures the cycle of human life. Its central theme is the three stages of life—birth, adulthood, and death—symbolized by the garments woven at different times of the day. The poem's strength lies in its simple yet powerful imagery and symbolism.
The poet employs a consistent 'aabb' rhyme scheme, giving the poem a lyrical, song-like quality. The primary figure of speech is the Simile, used effectively in each stanza to connect the garments to nature ("Blue as the wing of a halcyon wild," "Like the plumes of a peacock," "White as a feather"). The entire poem itself functions as a metaphor for life's journey. The changing tone, from joyful in the morning to solemn at night, perfectly reflects the progression from birth to death.
I admire this poem for its elegant simplicity and deep philosophical message. In just twelve lines, it conveys a universal truth about human existence with grace and emotional resonance.`
    },
    { id: 3, title: "The Inchcape Rock", author: "Robert Southey", contentAvailable: true, poemText: ["Content unavailable"], summaries: { overall: "A narrative poem about the benevolent Abbot of Aberbrothok, who places a bell on the dangerous Inchcape Rock to warn sailors. The bell is maliciously cut by the pirate Sir Ralph the Rover, who later perishes on the very same rock during a storm, unable to hear the warning he destroyed. The poem is a moral lesson on the theme that those who do evil ultimately fall into their own trap.", stanzaWise: ""}, centralIdea: "The central idea is that evil deeds ultimately bring about one's own downfall. It illustrates the principle of poetic justice, where a person's malevolent actions lead to their own destruction. The poem serves as a cautionary tale against envy and malice.", figuresOfSpeech: [], poeticDevices: { rhymeScheme: "'aabb' ballad stanza" }, appreciation: "" },
    { id: 4, title: "Have You Earned Your Tomorrow", author: "Edgar Guest", contentAvailable: true, poemText: ["Content unavailable"], summaries: { overall: "This didactic poem poses a series of questions to the reader, asking whether their actions throughout the day have positively impacted anyone. It urges the reader to reflect on whether they have been kind, helpful, and considerate, thereby 'earning' the right to another day. The poem suggests that a life is well-lived only if it brings comfort and hope to others.", stanzaWise: ""}, centralIdea: "The central idea is the importance of living a life of kindness, empathy, and service to others. The poem posits that the value of our day is measured not by personal gain, but by the good we do for our fellow human beings. It is a moral call to make each day count by making a positive difference in someone else's life.", figuresOfSpeech: [], poeticDevices: { rhymeScheme: "'aabb' with some variations" }, appreciation: "" },
    { id: 5, title: "Father Returning Home", author: "Dilip Chitre", contentAvailable: true, poemText: ["Content unavailable"], summaries: { overall: "The poem paints a poignant portrait of an elderly father's monotonous and alienated life in a bustling modern city. It describes his dreary train journey home, his isolation from his own family, and his retreat into a world of solitude. The poem highlights the loneliness and estrangement felt by the older generation in a fast-paced, indifferent urban environment.", stanzaWise: ""}, centralIdea: "The central theme is the profound sense of alienation and isolation experienced by an individual within his own family and society. It explores the communication gap between generations and the quiet suffering of the elderly, who feel like outsiders in a world they helped build. The poem is a commentary on the dehumanizing nature of modern urban life.", figuresOfSpeech: [], poeticDevices: { rhymeScheme: "Free verse" }, appreciation: "" },
    { id: 6, title: "Money", author: "W.H. Davies", contentAvailable: true, poemText: ["Content unavailable"], summaries: { overall: "The poem reflects on the poet's contrasting experiences with money. When he was rich, he had many false friends and felt anxious. Now that he is poor, he has few but real friends and feels a greater sense of happiness and freedom. The poem argues that money cannot buy true happiness and that poverty can bring a simpler, more genuine form of joy.", stanzaWise: ""}, centralIdea: "The poem's central idea is that true happiness and genuine relationships are more valuable than material wealth. It critiques the superficiality that often accompanies riches and celebrates the simple, authentic joys that can be found in a life of poverty. The theme revolves around the corrupting influence of money versus the freedom of a life without it.", figuresOfSpeech: [], poeticDevices: { rhymeScheme: "abab" }, appreciation: "" },
    { id: 7, title: "She Walks in Beauty", author: "Lord Byron", contentAvailable: true, poemText: ["Content unavailable"], summaries: { overall: "This famous lyrical poem describes the beauty of a woman, comparing her to a starry night. The poet emphasizes that her beauty is a perfect balance of 'dark and bright.' He goes beyond her physical appearance, suggesting that her outer beauty is a reflection of her inner goodness, peace, and innocence. The poem is a celebration of a beauty that is both physical and spiritual.", stanzaWise: ""}, centralIdea: "The central theme is the celebration of a woman's perfect beauty, which is a harmonious blend of outer appearance and inner virtue. The poem argues that true beauty arises from a peaceful mind and an innocent heart. It is not just about physical features but about the grace and purity that radiate from within.", figuresOfSpeech: [], poeticDevices: { rhymeScheme: "ababab" }, appreciation: "" },
    { id: 8, title: "Small Towns and Rivers", author: "Mamang Dai", contentAvailable: true, poemText: ["Content unavailable"], summaries: { overall: "The poem reflects on the relationship between nature, memory, and mortality in the context of the poet's small hometown. The river is depicted as a silent witness to life and death, holding the 'soul of the town.' The poem contrasts the permanence of nature with the transient nature of human life, filled with rituals, sorrow, and the inevitability of death. It evokes a sense of melancholy and a deep connection to one's roots.", stanzaWise: ""}, centralIdea: "The central idea is the exploration of life, death, and nature's permanence in a small town. The river symbolizes the eternal, carrying the memories and spirits of the people. The poem conveys a deep sense of place and laments the ephemeral nature of human existence against the backdrop of an enduring natural world. It is a meditation on memory, loss, and the spiritual connection between a community and its landscape.", figuresOfSpeech: [], poeticDevices: { rhymeScheme: "Free verse" }, appreciation: "" }
];
