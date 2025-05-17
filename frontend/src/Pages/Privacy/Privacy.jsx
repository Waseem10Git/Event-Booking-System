import '../Terms/Terms.css';
import { useTranslation } from 'react-i18next';

const Privacy = () => {
    const { t } = useTranslation();

  return (
    <section className="page">
      <h1>{t('footer.privacy')}</h1>
      <div className="terms">
        <p>{t('terms.lastUpdated')}: {new Date().toLocaleDateString()}</p>
        <p>{t('privacy.description')}</p>
        <ul>
            <li>{t('privacy.personal')}</li>
            <li>{t('privacy.sharing')}</li>
            <li>{t('privacy.trackers')}</li>
        </ul>
        <p>{t('terms.contact')}: wasim10ghabour@gmail.com</p>
      </div>
    </section>
  );
}

export default Privacy;