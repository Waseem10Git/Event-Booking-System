import './Footer.css';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {year} {t('footer.copyright')}</p>
        <div className="footer-links">
          <a href="/terms">{t('footer.terms')}</a>
          <a href="/privacy">{t('footer.privacy')}</a>
          <a href="/contacts">{t('contacts')}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
