import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from './Loader.js';
import { parseDate } from './dateParsing';

import { getFlights } from '../features/flights/flightSlice';
import { getOffers } from '../features/offers/offerSlice';
import { setInput } from '../features/search/searchSlice';

import '../css/Offers.css';

const DEFAULT_CITY = 'Rome';

function OfferCard(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleClick = (event) => {
    if (!user) {
      dispatch(
        setInput({
          field: 'from',
          value: DEFAULT_CITY,
        })
      );
    } else {
      dispatch(
        setInput({
          field: 'from',
          value: user.city,
        })
      );
    }

    dispatch(
      setInput({
        field: 'to',
        value: props.offer.city,
      })
    );
    dispatch(
      setInput({
        field: 'date',
        value: parseDate(props.offer.dates),
      })
    );

    const params = {
      origin: user ? user.city.toUpperCase() : DEFAULT_CITY.toUpperCase(),
      destination: props.offer.city,
      date: parseDate(props.offer.dates),
    };

    dispatch(getFlights(params));
    window.scrollTo(0, 0);
    navigate('/search');
  };
  return (
    <button className="card-btn" to="/search" onClick={handleClick}>
      <div
        className="card"
        style={{ backgroundImage: `url(${props.offer.image})` }}
      >
        <div className="card-text">
          <div className="card-city">{props.offer.city}</div>
          <div className="card-price">$ {props.offer.price.toFixed(2)}</div>
          <div className="card-dates">{props.offer.departureDate} - {props.offer.arrivalDate}</div>
        </div>
      </div>
    </button>
  );
}

export function Offers(props) {
  const [limitCards, setLimitCards] = useState(3);
  const [isLoading, setLoading] = useState(false);

  const offers = useSelector((state) => state.offer.offers);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  const params = {
    from: user ? user.city : DEFAULT_CITY,
  };

  useEffect(() => {
    dispatch(getOffers(params));
  }, []);

  return (
    <div className="container">
      <div className="offers-container">
        <div id="offers"></div>
        <h1 className="offers-h">
          Best offers from {user ? user.city : DEFAULT_CITY}
        </h1>

        {offers ? (
          offers.map((item, idx) => {
            if (idx < limitCards) {
              return <OfferCard key={idx} offer={item} />;
            } else return false;
          })
        ) : (
          <div>No offers</div>
        )}

        {!isLoading ? (
          <button
            className="more-btn"
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                //dispatch(getOffers('s'));
                setLimitCards(limitCards + 3);
                setLoading(false);
              }, 0);
            }}
          >
            More
          </button>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
