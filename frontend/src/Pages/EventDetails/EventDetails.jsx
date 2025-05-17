import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EventDetails.css';
import eventApis from '../../Apis/eventApis';
import bookingApis from '../../Apis/bookingApis';
import { FaCalendarAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { IoIosPricetags } from "react-icons/io";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { useTranslation } from 'react-i18next';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [bookedEvents, setBookedEvents] = useState([]);
  const [isBooked, setIsBooked] = useState(false);

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const language = i18n.language;

  const fetchEvent = async () => {
      try {
        const res = await eventApis.getEvent(id);
        setEvent(res.data);
      } catch (err) {
        console.error('Error fetching event details', err);
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
    fetchEvent();
  }, [id]);

  useEffect(() => {
  if (!event || bookedEvents.length === 0) return;

  const bookedEventIds = bookedEvents.map(booking =>
    typeof booking.event === 'string' ? booking.event : booking.event._id
  );

  setIsBooked(bookedEventIds.includes(event._id));
}, [event, bookedEvents]);

  const handleBooking = async () => {
    if (isBooked) return;
    try {
      await bookingApis.createBooking(id);
      // Add the event to the booked list
      const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
      bookings.push(id);
      localStorage.setItem('bookings', JSON.stringify(bookings));
      setIsBooked(true);
      navigate('/congratulations');
    } catch (err) {
      console.error('Error booking event', err);
    }
  };

  const handleCancelBooking = async () => {
    try {
      await bookingApis.deleteBooking(id);
      // Remove the event from the booked list
      const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
      const index = bookings.indexOf(id);
      if (index !== -1) {
        bookings.splice(index, 1);
        localStorage.setItem('bookings', JSON.stringify(bookings));
      }
      setIsBooked(false);
      navigate('/bookings/my');
    } catch (err) {
      console.error('Error canceling booking', err);
    }
  }

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
  <div className="event-details-container">
    <div className="event-header">
      <FaCalendarAlt className="event-icon" />
      <h2>{event.name?.[language]}</h2>
    </div>

    <div className="event-details-card">
      <div className="event-image-wrapper">
        <img
          src={`http://localhost:5000/${event.image.path}`}
          alt={event.name?.[language]}
          className="event-details-image"
        />
        <p className="event-description">{event.description?.[language]}</p>
      </div>

      <div className="event-info-card">
        <p><span className='event-details-icon'><IoLocationSharp/></span><strong>{t('venue')}:</strong> {event.venue?.[language]}</p>
        <p><span className='event-details-icon'><BiSolidCategory/></span><strong>{t('category')}:</strong> {event.category?.[language]}</p>
        <p><span className='event-details-icon'><IoIosPricetags/></span><strong>{t('price')}:</strong> {event.price} {t('EGP')}</p>
        <p><span className='event-details-icon'><FaCalendarAlt/></span><strong>{t('date')}:</strong> {new Date(event.date).toLocaleDateString(language)}</p>

        {isBooked ? (
          <>
            <p className="booked-label"><span className='event-details-icon'><BsFillBookmarkCheckFill/></span> {t('booked')}</p>
            <button className="booked-button" onClick={() => handleCancelBooking(event._id)}>{t('cancelBooking')}</button>
          </>
        ) : (
          <button className="book-now-button" onClick={handleBooking}>{t('bookNow')}</button>
        )}
      </div>
    </div>

    <hr className="divider-line" />
    <div className="other-events-section">
      <h3>{t('otherEvents')}</h3>
      {/* You can map other events here */}
    </div>
  </div>
);
}

export default EventDetails;
