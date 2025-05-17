import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './manageEvents.css';
import eventApis from '../../Apis/eventApis';
import { Filters } from '../../Components';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const language = localStorage.getItem('language') || 'en'; // or use context

  const fetchEvents = async () => {
    try {
      const res = await eventApis.getEvents();
      setEvents(res.data);
      console.log(res.data);
      setFilteredEvents(res.data);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await eventApis.deleteEvent(id);
        fetchEvents(); // refresh data
      } catch (err) {
        console.error('Error deleting event:', err);
      }
    }
  };

  return (
    <div className="manage-events-container">
      <div className="header">
        <h2>{language === 'ar' ? 'إدارة الأحداث' : 'Manage Events'}</h2>
        <Link to="/admin/events/create" className="create-btn">
          {language === 'ar' ? '+ إنشاء حدث' : '+ Create Event'}
        </Link>
      </div>

      <Filters events={events} onFilter={setFilteredEvents}/>

      <div className="table-wrapper">
        <table className="events-table">
          <thead>
            <tr>
              <th>{language === 'ar' ? 'الاسم' : 'Name'}</th>
              <th>{language === 'ar' ? 'التاريخ' : 'Date'}</th>
              <th>{language === 'ar' ? 'الفئة' : 'Category'}</th>
              <th>{language === 'ar' ? 'المكان' : 'Venue'}</th>
              <th>{language === 'ar' ? 'السعر (ج.م)' : 'Price (EGP)'}</th>
              <th>{language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <tr key={event._id}>
                  <td>{event.name?.[language]}</td>
                  <td>{new Date(event.date).toLocaleString()}</td>
                  <td>{event.category?.[language]}</td>
                  <td>{event.venue?.[language]}</td>
                  <td>{event.price}</td>
                  <td>
                    <Link to={`/admin/events/edit/${event._id}`} className="edit-btn">
                      {language === 'ar' ? 'تعديل' : 'Edit'}
                    </Link>
                    <button onClick={() => handleDelete(event._id)} className="delete-btn">
                      {language === 'ar' ? 'حذف' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">{language === 'ar' ? 'لا توجد أحداث.' : 'No Events.'}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageEvents;
