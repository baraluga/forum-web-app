import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { endpoints } from '../../utils';

export const Topics = ({ token }) => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError('');
    Axios.get(endpoints.topics.getTopics, {
      headers: { token: token },
    })
      .then(({ data }) => (!ignore ? setTopics(data.data) : null))
      .catch(({ response }) =>
        !ignore ? setError(response.data.message) : null,
      )
      .finally(_ => (!ignore ? setLoading(false) : null));
    return () => (ignore = true);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="topic-container">
      <h2>Your Topics</h2>
      {loading && <div className="loading">Loading topics...</div>}
      {error && <div className="error">{error}</div>}
      {(topics || []).map(topic => renderTopic(topic))}
    </div>
  );
};

// render functions;

const renderTopic = ({ subject, description, updatedAt }) => (
  <div className="topic">
    <h4>{subject}</h4>
    <h5>{description}</h5>
    Last updated at: {updatedAt}
  </div>
);
