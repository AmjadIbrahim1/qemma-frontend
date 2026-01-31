// frontend/src/utils/usernameGenerator.js
// Utility for generating unique usernames for students and teachers

const adjectives = [
  'Smart', 'Quick', 'Bright', 'Clever', 'Sharp', 'Wise', 'Bold', 'Brave',
  'Strong', 'Swift', 'Noble', 'Mighty', 'Stellar', 'Epic', 'Prime', 'Elite',
  'Super', 'Ultra', 'Mega', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Omega',
  'Phoenix', 'Dragon', 'Eagle', 'Falcon', 'Hawk', 'Thunder', 'Lightning',
  'Storm', 'Blaze', 'Frost', 'Shadow', 'Light', 'Dark', 'Cosmic', 'Quantum'
];

const nouns = [
  'Lion', 'Tiger', 'Fox', 'Wolf', 'Bear', 'Eagle', 'Hawk', 'Falcon',
  'Panther', 'Jaguar', 'Cheetah', 'Leopard', 'Puma', 'Lynx', 'Cobra',
  'Viper', 'Python', 'Dragon', 'Phoenix', 'Griffin', 'Sphinx', 'Titan',
  'Giant', 'Warrior', 'Champion', 'Hero', 'Knight', 'Samurai', 'Ninja',
  'Master', 'Legend', 'King', 'Queen', 'Prince', 'Princess', 'Star', 'Comet'
];

/**
 * Generate a unique username based on role
 * @param {string} role - The user role ('student' or 'teacher' or 'assistant_teacher')
 * @returns {string} Generated username
 */
export const generateUsername = (role) => {
  // Determine prefix based on role
  let prefix = '';
  if (role === 'student') {
    prefix = 'student_';
  } else if (role === 'teacher') {
    prefix = 'teacher_';
  } else if (role === 'assistant_teacher') {
    prefix = 'asst_teacher_';
  } else {
    prefix = 'user_';
  }

  // Get random adjective and noun
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  
  // Generate random number (0-999)
  const randomNumber = Math.floor(Math.random() * 1000);

  // Combine to create username
  const username = `${prefix}${randomAdjective}${randomNoun}${randomNumber}`;

  return username;
};

/**
 * Get username warning message in Arabic
 * @param {string} username - The generated username
 * @returns {string} Warning message
 */
export const getUsernameWarningMessage = (username) => {
  return `⚠️ هذا اسم المستخدم محجوز ولا يمكن لأي شخص آخر استخدامه: ${username}`;
};

/**
 * Check if role should have a username generated
 * @param {string} role - The user role
 * @returns {boolean} True if username should be generated
 */
export const shouldGenerateUsername = (role) => {
  return role === 'student' || role === 'teacher' || role === 'assistant_teacher';
};