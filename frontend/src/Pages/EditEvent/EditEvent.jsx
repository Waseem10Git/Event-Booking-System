import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { EventForm } from '../../Components'
import '../CreateEvent/CreateEvent.css';
import eventApis from '../../Apis/eventApis';
import { useTranslation } from 'react-i18next';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await eventApis.getEvent(id);
        setEventData({
          ...res.data,
          date: formatDateForInput(res.data.date)
        });
        
        console.log(res.data);
      } catch (err) {
        console.error('Error fetching event details', err);
      }
    };
    fetchEvent();
  }, [id]);

  const formatDateForInput = (isoString) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = (`0${date.getMonth() + 1}`).slice(-2);
  const day = (`0${date.getDate()}`).slice(-2);
  const hours = (`0${date.getHours()}`).slice(-2);
  const minutes = (`0${date.getMinutes()}`).slice(-2);
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};


  const handleUpdate = async (data) => {
    try {
      await eventApis.updateEvent(id, data);
      navigate('/admin/events');
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <div className="event-form-container">
      <h2>{t('updateEvent')}</h2>
      {eventData && <EventForm initialData={eventData} onSubmit={handleUpdate} submitLabel={t('updateEvent')} />}
    </div>
  );
};

export default EditEvent;
