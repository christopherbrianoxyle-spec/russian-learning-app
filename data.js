/* ============================================================
   DATA.JS — Banque de phrases russes par catégorie et niveau
   ============================================================ */

const PHRASES = [

  /* ==================== РАБОТА (Travail) ==================== */
  {
    id: 1, category: "travail", level: "A1",
    russian: "Я работаю в офисе.",
    phonetic: "Ya rabotayu v ofise.",
    fr: "Je travaille dans un bureau.",
    en: "I work in an office."
  },
  {
    id: 2, category: "travail", level: "A1",
    russian: "Где вы работаете?",
    phonetic: "Gde vy rabotaete?",
    fr: "Où travaillez-vous ?",
    en: "Where do you work?"
  },
  {
    id: 3, category: "travail", level: "A2",
    russian: "Я ищу новую работу.",
    phonetic: "Ya ishchu novuyu rabotu.",
    fr: "Je cherche un nouvel emploi.",
    en: "I am looking for a new job."
  },
  {
    id: 4, category: "travail", level: "A2",
    russian: "У меня есть встреча в два часа.",
    phonetic: "U menya est' vstreча v dva chasa.",
    fr: "J'ai une réunion à deux heures.",
    en: "I have a meeting at two o'clock."
  },
  {
    id: 5, category: "travail", level: "B1",
    russian: "Могу ли я поговорить с вашим менеджером?",
    phonetic: "Mogu li ya pogovorit' s vashim menedzherom?",
    fr: "Puis-je parler à votre responsable ?",
    en: "Can I speak to your manager?"
  },
  {
    id: 6, category: "travail", level: "B1",
    russian: "Я хотел бы обсудить условия контракта.",
    phonetic: "Ya khotel by obsudit' usloviya kontrakta.",
    fr: "Je voudrais discuter des termes du contrat.",
    en: "I would like to discuss the terms of the contract."
  },
  {
    id: 7, category: "travail", level: "B2",
    russian: "Компания переживает период реструктуризации.",
    phonetic: "Kompaniya perezhivaet period restrukturizatsii.",
    fr: "L'entreprise traverse une période de restructuration.",
    en: "The company is going through a restructuring period."
  },
  {
    id: 8, category: "travail", level: "B2",
    russian: "Нам необходимо оптимизировать производственный процесс.",
    phonetic: "Nam neobkhodimo optimizirovat' proizvodstvennyy protsess.",
    fr: "Nous devons optimiser le processus de production.",
    en: "We need to optimize the production process."
  },

  /* ==================== РАЗГОВОР (Conversation) ==================== */
  {
    id: 9, category: "conversation", level: "A1",
    russian: "Привет! Как дела?",
    phonetic: "Privet! Kak dela?",
    fr: "Salut ! Comment vas-tu ?",
    en: "Hi! How are you?"
  },
  {
    id: 10, category: "conversation", level: "A1",
    russian: "Меня зовут Алекс.",
    phonetic: "Menya zovut Aleks.",
    fr: "Je m'appelle Alex.",
    en: "My name is Alex."
  },
  {
    id: 11, category: "conversation", level: "A1",
    russian: "Приятно познакомиться!",
    phonetic: "Priyatno poznakomit'sya!",
    fr: "Enchanté(e) !",
    en: "Nice to meet you!"
  },
  {
    id: 12, category: "conversation", level: "A2",
    russian: "Сколько вам лет?",
    phonetic: "Skol'ko vam let?",
    fr: "Quel âge avez-vous ?",
    en: "How old are you?"
  },
  {
    id: 13, category: "conversation", level: "A2",
    russian: "Откуда вы родом?",
    phonetic: "Otkuda vy rodom?",
    fr: "D'où venez-vous ?",
    en: "Where are you from?"
  },
  {
    id: 14, category: "conversation", level: "B1",
    russian: "Не могли бы вы повторить, пожалуйста?",
    phonetic: "Ne mogli by vy povtorit', pozhaluysta?",
    fr: "Pourriez-vous répéter, s'il vous plaît ?",
    en: "Could you please repeat that?"
  },
  {
    id: 15, category: "conversation", level: "B1",
    russian: "Я не совсем понимаю, что вы имеете в виду.",
    phonetic: "Ya ne sovsem ponimayu, chto vy imeete v vidu.",
    fr: "Je ne comprends pas tout à fait ce que vous voulez dire.",
    en: "I don't quite understand what you mean."
  },
  {
    id: 16, category: "conversation", level: "B2",
    russian: "По моему мнению, это весьма спорный вопрос.",
    phonetic: "Po moemu mneniyu, eto ves'ma spornyy vopros.",
    fr: "À mon avis, c'est une question très controversée.",
    en: "In my opinion, this is a very controversial issue."
  },

  /* ==================== ПУТЕШЕСТВИЕ (Voyage) ==================== */
  {
    id: 17, category: "voyage", level: "A1",
    russian: "Где находится вокзал?",
    phonetic: "Gde nakhoditsya vokzal?",
    fr: "Où se trouve la gare ?",
    en: "Where is the train station?"
  },
  {
    id: 18, category: "voyage", level: "A1",
    russian: "Сколько стоит билет?",
    phonetic: "Skol'ko stoit bilet?",
    fr: "Combien coûte le billet ?",
    en: "How much does the ticket cost?"
  },
  {
    id: 19, category: "voyage", level: "A2",
    russian: "Я хотел бы снять номер в гостинице.",
    phonetic: "Ya khotel by snyat' nomer v gostinitse.",
    fr: "Je voudrais réserver une chambre d'hôtel.",
    en: "I would like to book a hotel room."
  },
  {
    id: 20, category: "voyage", level: "A2",
    russian: "В котором часу отправляется поезд?",
    phonetic: "V kotorom chasu otpravlyaetsya poyezd?",
    fr: "À quelle heure part le train ?",
    en: "What time does the train depart?"
  },
  {
    id: 21, category: "voyage", level: "B1",
    russian: "Мой паспорт истёк. Где можно его продлить?",
    phonetic: "Moy pasport istёk. Gde mozhno ego prodlit'?",
    fr: "Mon passeport est périmé. Où puis-je le renouveler ?",
    en: "My passport has expired. Where can I renew it?"
  },
  {
    id: 22, category: "voyage", level: "B1",
    russian: "Есть ли прямые рейсы до Москвы?",
    phonetic: "Est' li pryamye reysy do Moskvy?",
    fr: "Y a-t-il des vols directs pour Moscou ?",
    en: "Are there direct flights to Moscow?"
  },
  {
    id: 23, category: "voyage", level: "B2",
    russian: "Таможенный контроль занял несколько часов.",
    phonetic: "Tamozhennyy kontrol' zanyal neskol'ko chasov.",
    fr: "Le contrôle douanier a pris plusieurs heures.",
    en: "The customs check took several hours."
  },
  {
    id: 24, category: "voyage", level: "B2",
    russian: "Я потерял багаж и хотел бы подать заявление.",
    phonetic: "Ya poteryal bagozh i khotel by podat' zayavleniye.",
    fr: "J'ai perdu mes bagages et je voudrais déposer une plainte.",
    en: "I lost my luggage and would like to file a report."
  },

  /* ==================== ЕДА (Nourriture) ==================== */
  {
    id: 25, category: "nourriture", level: "A1",
    russian: "Я хочу есть.",
    phonetic: "Ya khochu yest'.",
    fr: "J'ai faim.",
    en: "I am hungry."
  },
  {
    id: 26, category: "nourriture", level: "A1",
    russian: "Что вы будете пить?",
    phonetic: "Chto vy budete pit'?",
    fr: "Que voulez-vous boire ?",
    en: "What would you like to drink?"
  },
  {
    id: 27, category: "nourriture", level: "A2",
    russian: "Я вегетарианец. Есть ли у вас подходящие блюда?",
    phonetic: "Ya vegetarianets. Est' li u vas podkhodyashchiye blyuda?",
    fr: "Je suis végétarien(ne). Avez-vous des plats adaptés ?",
    en: "I am a vegetarian. Do you have suitable dishes?"
  },
  {
    id: 28, category: "nourriture", level: "A2",
    russian: "Принесите, пожалуйста, счёт.",
    phonetic: "Prinesite, pozhaluysta, schёt.",
    fr: "L'addition, s'il vous plaît.",
    en: "Please bring the bill."
  },
  {
    id: 29, category: "nourriture", level: "B1",
    russian: "Это блюдо слишком острое для меня.",
    phonetic: "Eto blyudo slishkom ostroe dlya menya.",
    fr: "Ce plat est trop épicé pour moi.",
    en: "This dish is too spicy for me."
  },
  {
    id: 30, category: "nourriture", level: "B1",
    russian: "Можете ли вы порекомендовать местную кухню?",
    phonetic: "Mozhete li vy porekomendovat' mestnuyu kukhyu?",
    fr: "Pouvez-vous recommander la cuisine locale ?",
    en: "Can you recommend the local cuisine?"
  },
  {
    id: 31, category: "nourriture", level: "B2",
    russian: "У меня аллергия на орехи и морепродукты.",
    phonetic: "U menya allergiya na orekhi i moreproduky.",
    fr: "Je suis allergique aux noix et aux fruits de mer.",
    en: "I am allergic to nuts and seafood."
  },
  {
    id: 32, category: "nourriture", level: "B2",
    russian: "Шеф-повар использует исключительно местные органические продукты.",
    phonetic: "Shef-povar ispol'zuet isklyuchitel'no mestnyye organicheskiye produkty.",
    fr: "Le chef utilise exclusivement des produits biologiques locaux.",
    en: "The chef uses exclusively local organic products."
  },

  /* ==================== ОБРАЗОВАНИЕ (Éducation) ==================== */
  {
    id: 33, category: "education", level: "A1",
    russian: "Я учусь в университете.",
    phonetic: "Ya uchus' v universitete.",
    fr: "J'étudie à l'université.",
    en: "I study at university."
  },
  {
    id: 34, category: "education", level: "A1",
    russian: "Какой у вас любимый предмет?",
    phonetic: "Kakoy u vas lyubimyy predmet?",
    fr: "Quelle est votre matière préférée ?",
    en: "What is your favourite subject?"
  },
  {
    id: 35, category: "education", level: "A2",
    russian: "Мне нужна помощь с домашним заданием.",
    phonetic: "Mne nuzhna pomoshch' s domashnim zadaniyem.",
    fr: "J'ai besoin d'aide pour mes devoirs.",
    en: "I need help with my homework."
  },
  {
    id: 36, category: "education", level: "A2",
    russian: "Когда начинается урок?",
    phonetic: "Kogda nachinaletsya urok?",
    fr: "Quand commence le cours ?",
    en: "When does the lesson start?"
  },
  {
    id: 37, category: "education", level: "B1",
    russian: "Я готовлюсь к вступительным экзаменам.",
    phonetic: "Ya gotovlyus' k vstupitel'nym ekzamenam.",
    fr: "Je me prépare aux examens d'entrée.",
    en: "I am preparing for entrance exams."
  },
  {
    id: 38, category: "education", level: "B1",
    russian: "Мне нравится обучение в интерактивном формате.",
    phonetic: "Mne nravitsya obucheniye v interaktivnom formate.",
    fr: "J'aime apprendre dans un format interactif.",
    en: "I enjoy learning in an interactive format."
  },
  {
    id: 39, category: "education", level: "B2",
    russian: "Исследование охватывает широкий спектр академических дисциплин.",
    phonetic: "Issledovaniye okhvatyvayet shirokiy spektr akademicheskikh distsiplin.",
    fr: "La recherche couvre un large éventail de disciplines académiques.",
    en: "The research covers a wide range of academic disciplines."
  },
  {
    id: 40, category: "education", level: "B2",
    russian: "Критическое мышление — ключевой навык для академического успеха.",
    phonetic: "Kriticheskoye myshleniye — klyuchevoy navyk dlya akademicheskogo uspekha.",
    fr: "La pensée critique est une compétence clé pour la réussite académique.",
    en: "Critical thinking is a key skill for academic success."
  }
];

/* Merge all extra phrase banks (loaded via separate <script> tags) */
function getAllPhrases() {
  return [
    ...PHRASES,
    ...(typeof PHRASES_EXTRA1 !== 'undefined' ? PHRASES_EXTRA1 : []),
    ...(typeof PHRASES_EXTRA2 !== 'undefined' ? PHRASES_EXTRA2 : []),
    ...(typeof PHRASES_EXTRA3 !== 'undefined' ? PHRASES_EXTRA3 : []),
    ...(typeof PHRASES_EXTRA4 !== 'undefined' ? PHRASES_EXTRA4 : []),
    ...(typeof PHRASES_EXTRA5 !== 'undefined' ? PHRASES_EXTRA5 : []),
    ...(typeof PHRASES_EXTRA6 !== 'undefined' ? PHRASES_EXTRA6 : []),
    ...(typeof PHRASES_EXTRA7 !== 'undefined' ? PHRASES_EXTRA7 : [])
  ];
}

/* Category metadata */
const CATEGORIES = {
  all:          { label: "Все темы",    icon: "🌐", labelFr: "Toutes les catégories", labelEn: "All categories" },
  travail:      { label: "Работа",      icon: "💼", labelFr: "Travail",               labelEn: "Work" },
  conversation: { label: "Разговор",    icon: "💬", labelFr: "Conversation",          labelEn: "Conversation" },
  transport:    { label: "Транспорт",   icon: "🚇", labelFr: "Transport",             labelEn: "Transport" },
  temps:        { label: "Время",       icon: "🕐", labelFr: "Temps",                 labelEn: "Time" },
  voyage:       { label: "Путешествие", icon: "✈️", labelFr: "Voyage",                labelEn: "Travel" },
  nourriture:   { label: "Еда",         icon: "🍽️", labelFr: "Nourriture",            labelEn: "Food" },
  shopping:     { label: "Покупки",     icon: "🛒", labelFr: "Shopping",              labelEn: "Shopping" },
  sante:        { label: "Здоровье",    icon: "🏥", labelFr: "Santé",                 labelEn: "Health" },
  logement:     { label: "Жильё",       icon: "🏠", labelFr: "Logement",              labelEn: "Housing" },
  aeroport:     { label: "Аэропорт",    icon: "🛫", labelFr: "Aéroport",              labelEn: "Airport" },
  hotel:        { label: "Отель",       icon: "🏨", labelFr: "Hôtel",                 labelEn: "Hotel" },
  education:    { label: "Образование", icon: "📚", labelFr: "Éducation",             labelEn: "Education" },
  loisirs:      { label: "Досуг",       icon: "🎭", labelFr: "Loisirs",               labelEn: "Leisure" }
};

const LEVEL_LABELS = { all: "Tous", A1: "A1", A2: "A2", B1: "B1", B2: "B2" };
