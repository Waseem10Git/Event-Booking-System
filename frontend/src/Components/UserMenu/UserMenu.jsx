import './UserMenu.css'
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const UserMenu = ({ currentUser, handleSignOut, language }) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef();

    const { t } = useTranslation();

  // Close menu on click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getInitials = () => {
    if (!currentUser || !currentUser.username) return 'WM'; // default for non-logged-in users
    const names = currentUser.username.trim().split(' ');
    const first = names[0]?.[0]?.toUpperCase() || '';
    const second = names[1]?.[0]?.toUpperCase() || '';
    return `${first}${second}`;
};
    
    return (
        <div className='profile pointer' onClick={() => setShowMenu(!showMenu)}>
            {getInitials()}
            {showMenu && (
                <div className='profile-menu' ref={menuRef}>
                    <Link to="/bookings/my" className='my-bookings'>{t('myBookings')}</Link>
                    {currentUser && currentUser.role === 'Admin' && 
                    <Link to="/admin/events">{t('adminPanel')}</Link>}
                    <Link to="/contacts">{t('contacts')}</Link>
                    <hr />
                    <button className='sign-out' onClick={handleSignOut}>{t('signout')}</button>
                </div>
            )}
        </div>
    )
}

export default UserMenu;