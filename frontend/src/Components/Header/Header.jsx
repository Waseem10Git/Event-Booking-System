import './Header.css'
import logo from './logo.jpeg'
import { MdLanguage, MdLightMode, MdDarkMode } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import authApis from '../../Apis/authApis';
import { useNavigate } from 'react-router-dom';
import UserMenu from '../UserMenu/UserMenu';
import { useTranslation } from 'react-i18next';

const Header = ({ darkMode, setDarkMode, language, setLanguage }) => {
    const { currentUser, updateUser } = useContext(AuthContext);
    
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const toggleTheme = () => setDarkMode(!darkMode);
    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ar' : 'en');
        i18n.changeLanguage(language === 'en' ? 'ar' : 'en');
        console.log(language);
    };

    const handleSignOut = async() => {
        try {
            await authApis.logout();
            updateUser(null);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <header>
            <Link to='/' className='header-left pointer'><img src={logo} alt='logo' /></Link>
            <div className='header-right'>
                <div className='language pointer' onClick={toggleLanguage}>
                    <span className='icon'><MdLanguage /></span>
                    <p>{language === 'ar' ? 'ع' : 'En'}</p>
                </div>
                <div className='pointer icon' onClick={toggleTheme}>
                    {darkMode ? <MdLightMode /> : <MdDarkMode/>}
                </div>
                {currentUser ? (
                    <UserMenu currentUser={currentUser} handleSignOut={handleSignOut} language={language} />
                ) : (
                    <div className='auth'>
                        <Link to="/register" className='header-button signup pointer'>{t('signup')}</Link>
                        <Link to="/login" className='header-button signin pointer'>{t('signin')}</Link>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header;