import { useEffect, useState } from "react";
import bookingApis from "../../Apis/bookingApis";
import { EventCard } from "../../Components";
import '../Home/Home.css';
import { useTranslation } from 'react-i18next';

const UserBookings = () => {
    const [bookings, setBookings] = useState([]);

    const { t } = useTranslation();

    useEffect(() => {
        const fetchUserBookings = async () => {
            try {
                const res = await bookingApis.getMyBookings();
                setBookings(res.data);
            } catch (err) {
                console.error('Error fetching user bookings', err);
            }
        };
        fetchUserBookings();
    }, []);
    
    return(
        <div className="home-container">
            <h2>{t('myBookings')}</h2>
            <div className="events-grid">
                {bookings.map((event) => (
                    <EventCard key={event.event._id} event={event.event} />
                ))}
            </div>
        </div>
    )
}

export default UserBookings;