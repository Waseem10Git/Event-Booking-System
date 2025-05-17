import React, { useState, useEffect } from 'react';
import './Register.css';
import authApis from '../../Apis/authApis';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '../../Components';
import { useTranslation } from 'react-i18next';
import { Input } from '../../Components';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
    setError('passwordMismatch'); 
    return;
  }

    setIsLoading(true);

    try {
      await authApis.register(formData);
      navigate('/login');
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>{t('signup')}</h2>

        <Input name='username' label={t('fullname')} handleChange={handleChange} required />

        <Input name='email' label={t('email')} handleChange={handleChange} type='email' required />

        <Input name='password' label={t('password')} handleChange={handleChange} type='password' required />

        <Input name='confirmPassword' label={t('confirmPassword')} handleChange={handleChange} type='password' required />

        <button type="submit" disabled={isLoading}>{t('createAccount')}</button>

        {error && <ErrorMessage message={t(error)} />}

        <p onClick={() => navigate('/login')}>{t('alreadyHaveAccount')} <span>{t('signin')}</span></p>
      </form>
    </div>
  );
};

export default Register;
