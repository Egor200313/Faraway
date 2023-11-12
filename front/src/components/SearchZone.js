import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/SearchZone.css';
import { useDispatch, useSelector } from 'react-redux';
import { setInput } from '../features/search/searchSlice';
import { getFlights } from '../features/flights/flightSlice';

const normalizeCity = (city) => {
  return city.charAt(0).toUpperCase() + city.slice(1);
};

export function SearchZone(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const values = useSelector((state) => state.search);

  const search = (e) => {
    e.preventDefault();

    const params = {
      origin: values.from.toUpperCase(),
      destination: values.to.toUpperCase(),
      date: values.date.toUpperCase(),
    };

    dispatch(getFlights(params));
    window.scrollTo(0, 0);
    navigate('/search');
  };

  const handleChange = (field_name) => (event) => {
    if (event.target.name !== 'date')
      dispatch(
        setInput({
          field: field_name,
          value: normalizeCity(event.target.value),
        })
      );
    else dispatch(setInput({ field: field_name, value: event.target.value }));
  };

  return (
    <div className="search-zone">
      <div className="container">
        <form onSubmit={search}>
          <input
            type="text"
            name="origin"
            className="text-input first-input no-focus-decoration"
            placeholder="From"
            value={values.from || ''}
            onChange={handleChange('from')}
            required
          ></input>
          <div className="plane-zone"></div>
          <input
            type="text"
            name="destination"
            className="text-input no-focus-decoration"
            placeholder="To"
            value={values.to || ''}
            onChange={handleChange('to')}
            required
          ></input>
          <select className="select-input no-focus-decoration">
            <option>1 passenger, economy</option>
            <option>1 passenger, business</option>
          </select>
          <input
            type="date"
            name="date"
            className="date-input no-focus-decoration"
            value={values.date}
            onChange={handleChange('date')}
          ></input>
          <button type="submit" className="blue-btn">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
