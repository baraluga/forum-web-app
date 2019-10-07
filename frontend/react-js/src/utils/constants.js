const BASE_URL =
  'https://us-central1-forum-web-app-baraluga.cloudfunctions.net';
const BASE_ENDPOINTS = {
  user: `${BASE_URL}/user`,
  content: `${BASE_URL}/topic`,
  topics: `${BASE_URL}/topics`,
};

export const endpoints = {
  user: {
    register: `${BASE_ENDPOINTS.user}/register`,
    login: `${BASE_ENDPOINTS.user}/login`,
    validate: `${BASE_ENDPOINTS.user}/validate`,
  },
  topics: {
    getTopics: BASE_ENDPOINTS.topics,
    createTopic: BASE_ENDPOINTS.content,
  },
  messages: {},
};
