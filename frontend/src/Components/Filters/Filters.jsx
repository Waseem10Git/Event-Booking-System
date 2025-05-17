import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

const Filters = ({ events, onFilter }) => {

    const [filterCategory, setFilterCategory] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterTag, setFilterTag] = useState('');

    const { t } = useTranslation();

    const language = localStorage.getItem('language') || 'en';

    useEffect(() => {
  let filtered = [...events];

  if (filterCategory) {
    filtered = filtered.filter(event =>
      event.category?.[language]?.toLowerCase().includes(filterCategory.toLowerCase())
    );
  }

  if (filterDate) {
    filtered = filtered.filter(event =>
      event.date.slice(0, 10) === filterDate
    );
  }

  if (filterTag) {
    filtered = filtered.filter(event =>
      event.tags?.some(tag =>
        tag?.[language]?.toLowerCase().includes(filterTag.toLowerCase())
      )
    );
  }

  onFilter(filtered);
}, [filterCategory, filterDate, filterTag, events, language]);


    return (
    <div className="filters">
      <input
        type="text"
        placeholder={t('filters.category')}
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      />
      <input
        type="date"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
      />
      <input
        type="text"
        placeholder={t('filters.tag')}
        value={filterTag}
        onChange={(e) => setFilterTag(e.target.value)}
      />
      <button
        className="reset-btn"
        onClick={() => {
          setFilterCategory('');
          setFilterDate('');
          setFilterTag('');
        }}
      >
        {t('filters.reset')}
      </button>
    </div>
  );
}

export default Filters;