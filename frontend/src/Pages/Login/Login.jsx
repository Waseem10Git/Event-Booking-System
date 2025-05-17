import React, { useState, useEffect, useContext } from 'react';
import './login.css';
import authApis from '../../Apis/authApis';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { ErrorMessage } from '../../Components';
import { Input } from '../../Components';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { updateUser } = useContext(AuthContext);
    const { t } = useTranslation();

    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value});
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setIsLoading(true);
  
      try {
        const res = await authApis.login(formData);
        updateUser(res.data);
        navigate('/');
      } catch (error) {
        setError(error.response.data.messageKey);
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{t('signin')}</h2>
        <Input id="email" type="email" label={t('email')} value={formData.email} handleChange={handleChange} />
        <Input id="password" type="password" label={t('password')} value={formData.password} handleChange={handleChange} />
        <button type="submit" disabled={isLoading}>{t('signin')}</button>

        {error && <ErrorMessage message={t(error)} />}

        <p onClick={() => navigate('/register')}>{t('dontHaveAccount')} <span>{t('signup')}</span></p>
      </form>
    </div>
  );
};

export default Login;
