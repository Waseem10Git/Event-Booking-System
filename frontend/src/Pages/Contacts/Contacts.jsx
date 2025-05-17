import './Contacts.css';
import { TfiEmail } from "react-icons/tfi";
import { FaPhoneAlt, FaLinkedin } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const ContactUs = () => {
  const { t } = useTranslation();

  return (
    <div className="contact-container">
      <h2>{t('contacts')}</h2>
      <p>{t('contacts.description')}: </p>
      <div className="contact-info">

        <div className="contact-item">
          <div className='contact-icon'><FaPhoneAlt /></div>
          <div className='contact-text'>
            <strong>{t('contacts.phone')}: </strong>
            <a href="tel:+201234567890">+20 112 307 0503</a>
          </div>
        </div>

        <div className="contact-item">
          <div className='contact-icon'><TfiEmail /></div>
          <div className='contact-text'>
            <strong>{t('contacts.email')}: </strong>
            <a href="mailto:youremail@example.com">wasim10ghabour@gmail.com</a>
          </div>
        </div>

        <div className="contact-item">
          <div className='contact-icon'><FaLinkedin /></div>
          <div className='contact-text'>
            <strong>{t('contacts.linkedin')}: </strong>
            <a href="https://www.linkedin.com/in/wasim-ghabour-a0a14a26b/" target="_blank" rel="noopener noreferrer">
            linkedin.com/in/wasim-ghabour-a0a14a26b
          </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
