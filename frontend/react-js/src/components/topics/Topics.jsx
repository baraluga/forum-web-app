import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { endpoints } from '../../utils';

export const Topics = ({ token }) => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(loading);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    Axios.get(endpoints.topics.getTopics)
      .then(({ data }) => setTopics(data.data))
      .catch(({ response }) => setError(response.data.message))
      .finally(_ => setLoading(false));
  }, []);

  return <div>topics page</div>;
};
