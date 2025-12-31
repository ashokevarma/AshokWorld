/**
 * Inspirational quotes collection
 * Topics: Happiness, Learning, Work, Growth
 */

export interface Quote {
  text: string;
  author: string;
  category: 'happiness' | 'learning' | 'work' | 'growth';
}

export const quotes: Quote[] = [
  // Happiness
  { text: "Happiness is not something ready-made. It comes from your own actions.", author: "Dalai Lama", category: "happiness" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "happiness" },
  { text: "Happiness is a direction, not a place.", author: "Sydney J. Harris", category: "happiness" },
  { text: "The purpose of our lives is to be happy.", author: "Dalai Lama", category: "happiness" },
  { text: "Count your age by friends, not years. Count your life by smiles, not tears.", author: "John Lennon", category: "happiness" },
  { text: "Happiness depends upon ourselves.", author: "Aristotle", category: "happiness" },
  { text: "Be happy for this moment. This moment is your life.", author: "Omar Khayyam", category: "happiness" },
  { text: "The greatest happiness you can have is knowing that you do not necessarily require happiness.", author: "William Saroyan", category: "happiness" },
  
  // Learning
  { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi", category: "learning" },
  { text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.", author: "Dr. Seuss", category: "learning" },
  { text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.", author: "Malcolm X", category: "learning" },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin", category: "learning" },
  { text: "The beautiful thing about learning is nobody can take it away from you.", author: "B.B. King", category: "learning" },
  { text: "I am still learning.", author: "Michelangelo", category: "learning" },
  { text: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.", author: "Brian Herbert", category: "learning" },
  { text: "Anyone who stops learning is old, whether at twenty or eighty.", author: "Henry Ford", category: "learning" },
  { text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.", author: "Benjamin Franklin", category: "learning" },
  { text: "Learning never exhausts the mind.", author: "Leonardo da Vinci", category: "learning" },
  
  // Work
  { text: "The only place where success comes before work is in the dictionary.", author: "Vidal Sassoon", category: "work" },
  { text: "Choose a job you love, and you will never have to work a day in your life.", author: "Confucius", category: "work" },
  { text: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke", category: "work" },
  { text: "Success is no accident. It is hard work, perseverance, learning, studying, sacrifice.", author: "Pelé", category: "work" },
  { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Anonymous", category: "work" },
  { text: "Dreams don't work unless you do.", author: "John C. Maxwell", category: "work" },
  { text: "There are no secrets to success. It is the result of preparation, hard work, and learning from failure.", author: "Colin Powell", category: "work" },
  { text: "Quality is not an act, it is a habit.", author: "Aristotle", category: "work" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes", category: "work" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson", category: "work" },
  
  // Growth
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins", category: "growth" },
  { text: "What we fear doing most is usually what we most need to do.", author: "Tim Ferriss", category: "growth" },
  { text: "Growth is painful. Change is painful. But nothing is as painful as staying stuck somewhere you don't belong.", author: "Mandy Hale", category: "growth" },
  { text: "Be not afraid of growing slowly, be afraid only of standing still.", author: "Chinese Proverb", category: "growth" },
  { text: "The only way to grow is to challenge yourself beyond your current abilities.", author: "Anonymous", category: "growth" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", category: "growth" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein", category: "growth" },
  { text: "The secret of change is to focus all of your energy not on fighting the old, but on building the new.", author: "Socrates", category: "growth" },
  { text: "Your life does not get better by chance, it gets better by change.", author: "Jim Rohn", category: "growth" },
  { text: "Progress is impossible without change, and those who cannot change their minds cannot change anything.", author: "George Bernard Shaw", category: "growth" },
];

/**
 * Get quote of the day based on current date
 * Uses date as seed to ensure same quote throughout the day
 */
export function getQuoteOfTheDay(): Quote {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  const index = dayOfYear % quotes.length;
  return quotes[index];
}

/**
 * Get a random quote
 */
export function getRandomQuote(): Quote {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

