import { useNavigate } from 'react-router-dom';
import { useState, useEffect,useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import './EventCard.css';
import { useTranslation } from 'react-i18next';
import { IoLocationSharp } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";

const EventCard = ({ event, bookedEvents }) => {
  const [isBooked, setIsBooked] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const language = i18n.language;

  const handleBookClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate(`/events/${event._id}`);
    }
  };

  useEffect(() => {
    if (!event || bookedEvents?.length === 0) return;
  
    const bookedEventIds = bookedEvents?.map(booking =>
      typeof booking.event === 'string' ? booking.event : booking.event._id
    );
  
    setIsBooked(bookedEventIds?.includes(event._id));
  }, [event, bookedEvents]);

  return (
    <div className="event-card">
      <img src={`http://localhost:5000/${event.image.path}`} alt={event.name?.[language]} className="event-card-image" />
      <div className="event-card-content">
        <h3>{event.name?.[language]}</h3>
        <div className='event-card-date-price'>
          <p className="event-card-date"><span className='event-card-icon'><FaCalendarAlt/></span> {new Date(event.date).toLocaleDateString(language)}</p>
          <p className="event-card-price"><span className='event-card-icon'>{t('EGP')}</span> {event.price}</p>
        </div>
        <p className="event-card-venue"><span className='event-card-icon'><IoLocationSharp/></span> {event.venue?.[language]}</p>
        <div className='event-card-button-container'>
          <button
          className={`event-card-button`}
          onClick={handleBookClick}
        >
          {isBooked ? t('seeDetails') : t('bookNow')}
        </button>
        {isBooked && <p>{t('booked')}</p>}
        </div>
      </div>
    </div>
  );
}

export default EventCard;
