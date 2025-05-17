import './Terms.css';
import { useTranslation } from 'react-i18next';

const Terms = () => {
    const { t } = useTranslation();

  return (
    <section className="page">
      <h1>{t('footer.terms')}</h1>
      <div className='terms'>
        <p>{t('terms.lastUpdated')}: {new Date().toLocaleDateString()}</p>
        <p>{t('terms.description')}</p>
        <ul>
            <li>{t('terms.voluntary')}</li>
            <li>{t('terms.accuracy')}</li>
            <li>{t('terms.profit')}</li>
            <li>{t('terms.damages')}</li>
        </ul>
        <p>{t('terms.contact')}: wasim10ghabour@gmail.com</p>
        </div>
    </section>
  );
}

export default Terms;