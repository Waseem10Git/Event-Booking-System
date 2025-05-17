import './Home.css';
import { useEffect, useState } from 'react';
import { EventCard, Filters } from '../../Components';
import eventApis from '../../Apis/eventApis';
import bookingApis from '../../Apis/bookingApis';
import { useTranslation } from 'react-i18next';

const  Home = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [bookedEvents, setBookedEvents] = useState([]);

  const { t } = useTranslation();
  
  const fetchEvents = async () => {
      try {
        const res = await eventApis.getEvents();
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events", err);
      }
    };

    const fetchUserBookings = async () => {
          try {
              const res = await bookingApis.getMyBookings();
              setBookedEvents(res.data);
          } catch (err) {
              console.error('Error fetching user bookings', err);
          }
        };
  
  useEffect(() => {
    fetchUserBookings();
    fetchEvents();
  }, []);

  return (
    <div className="home-container">
      <div>
        <Filters events={events} onFilter={setFilteredEvents} />
        <h2>{t('exploreEvents')}</h2>
        <div className="events-grid">
          {filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} bookedEvents={bookedEvents}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
