import { Link } from 'react-router-dom';
import './NotFound.css';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className='container'>
      <h1 className='heading'>{t('notFound.title')}</h1>
      <p className='text'>{t('notFound.message')}</p>
      <Link to="/" className='link'>{t('notFound.backHome')}</Link>
    </div>
  );
};

export default NotFound;