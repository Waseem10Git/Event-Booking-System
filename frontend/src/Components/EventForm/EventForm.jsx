import { useState } from 'react';
import './EventForm.css';
import { Input } from '../../Components';
import { useTranslation } from 'react-i18next';

const EventForm = ({ initialData, onSubmit, submitLabel }) => {
  const [formData, setFormData] = useState(initialData || {
    name: { en: '', ar: '' }, description: { en: '', ar: '' }, category: { en: '', ar: '' },
    tags: [], date: '', venue: { en: '', ar: '' }, price: '', image: null
  });

  const [tagInput, setTagInput] = useState({ en: '', ar: '' });
  const { t, i18n } = useTranslation();

  const handleChange = (e) => {
    const { name, value, type, files, dataset } = e.target;

    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else if (dataset.lang) {
      setFormData({
        ...formData,
        [name]: { ...formData[name], [dataset.lang]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addTag = () => {
    const en = tagInput.en.trim();
    const ar = tagInput.ar.trim();

    if (en && ar && !formData.tags.some(tag => tag.en === en && tag.ar === ar)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, { en, ar }]
      }));
      setTagInput({ en: '', ar: '' });
    }
  };

  const removeTag = (index) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append('name', JSON.stringify(formData.name));
    data.append('description', JSON.stringify(formData.description));
    data.append('category', JSON.stringify(formData.category));
    data.append('tags', JSON.stringify(formData.tags));
    data.append('date', formData.date);
    data.append('venue', JSON.stringify(formData.venue));
    data.append('price', formData.price);
    data.append('image', formData.image);

    onSubmit(data);
  };

  return (
    <form className="create-event-form" onSubmit={handleSubmit}>
      <Input id="name" label={t('eventNameEn')} value={formData.name.en} handleChange={handleChange} required data-lang="en" />
      <Input id="name" label={t('eventNameAr')} value={formData.name.ar} handleChange={handleChange} required data-lang="ar" />

      <div className="form-group">
        <label>{t('descriptionEn')}</label>
        <textarea name="description" value={formData.description.en} onChange={handleChange} required data-lang="en" />
      </div>

      <div className="form-group">
        <label>{t('descriptionAr')}</label>
        <textarea name="description" value={formData.description.ar} onChange={handleChange} required data-lang="ar" />
      </div>

      <Input id="category" label={t('categoryEn')} value={formData.category.en} handleChange={handleChange} required data-lang="en" />
      <Input id="category" label={t('categoryAr')} value={formData.category.ar} handleChange={handleChange} required data-lang="ar" />

      <div className="form-group">
        <label>{t('tags')}</label>
        <div className="tags-input-wrapper">
          <input
            type="text"
            value={tagInput.en}
            onChange={(e) => setTagInput({ ...tagInput, en: e.target.value })}
            placeholder={t('enterTagEn')}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
          />
          <input
            type="text"
            value={tagInput.ar}
            onChange={(e) => setTagInput({ ...tagInput, ar: e.target.value })}
            placeholder={t('enterTagAr')}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
          />
          <button type="button" onClick={addTag}>{t('add')}</button>
        </div>
        <div className="tags-preview">
          {formData.tags.map((tag, index) => (
            <span key={index} className="tag-chip" onClick={() => removeTag(index)}>
              {tag.en} / {tag.ar} ×
            </span>
          ))}
        </div>
      </div>

      <Input id="date" type="datetime-local" label={t('date')} value={formData.date} handleChange={handleChange} required />
      <Input id="venue" label={t('venueEn')} value={formData.venue.en} handleChange={handleChange} required data-lang="en" />
      <Input id="venue" label={t('venueAr')} value={formData.venue.ar} handleChange={handleChange} required data-lang="ar" />
      <Input id="price" type="number" label={t('priceEGP')} value={formData.price} handleChange={handleChange} required />
      <Input id="image" type="file" label={t('image')} handleChange={handleChange} accept="image/*" />

      <button type="submit" className="submit-btn">{t(submitLabel)}</button>
    </form>
  );
};

export default EventForm;
