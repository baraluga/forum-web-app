import React, { useState } from 'react';
import Axios from 'axios';
import { endpoints } from '../../utils';

const _initialForm = { subject: '', description: '' };

export const CreateTopic = ({ token, addTopic }) => {
  // states
  const [form, setForm] = useState(_initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // event handlers
  const onSubjectChange = ({ target: { value } }) =>
    setForm({ ...form, subject: value });
  const onDescriptionChange = ({ target: { value } }) =>
    setForm({ ...form, description: value });
  const handleCreate = ({ subject, description }, token) => {
    setLoading(true);
    setError('');
    Axios.post(endpoints.topics.createTopic, { subject, description, token })
      .then(({ data }) => {
        addTopic(data);
        setForm(_initialForm);
      })
      .catch(({ response }) => setError(response.data.message))
      .finally(_ => setLoading(false));
  };

  return (
    <div className="create-topic">
      Subject:{' '}
      <input
        type="text"
        onChange={onSubjectChange}
        disabled={loading}
        value={form.subject}
      />
      Description:{' '}
      <input
        type="text"
        onChange={onDescriptionChange}
        disabled={loading}
        value={form.description}
      />
      <button onClick={() => handleCreate(form, token)}>Create Topic</button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};
