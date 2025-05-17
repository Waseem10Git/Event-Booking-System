import { useState } from 'react';
import './CreateEvent.css';
import eventApis from '../../Apis/eventApis';
import { useNavigate } from 'react-router-dom';
import { EventForm, ErrorMessage } from '../../Components';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const CreateEvent = () => {
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (formData) => {
    console.log(formData);
    setError('');
    try {
      const res = await eventApis.addEvent(formData);
      if (res.data.success) {
        navigate('/admin/events');        
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.messageKey);
    }
  };

  useEffect(() => {
    console.log('this is the error', error);
  }, [error]);

  return (
    <div className="event-form-container">
      <h2>{t('createEvent')}</h2>
      <EventForm onSubmit={handleSubmit} submitLabel={t('createEvent')} />
      {error && <ErrorMessage error={t(error)} />}
    </div>
  );
};

export default CreateEvent;
