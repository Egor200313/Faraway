import '../index.css';
import { ProfileInput } from './ProfileInput';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { calculateArrival } from './dateParsing';
import { Flight } from './Flight';
import { useEffect, useState } from 'react';
import { getTickets } from '../features/tickets/ticketSlice';
import { ajaxMainService } from '../service/ajaxService';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../css/Profile.css';

export function Profile(props) {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();

  const tickets = useSelector((state) => state.ticket.tickets);

  const user = useSelector((state) => state.user.user);

  const [fields, setFields] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    phone: user.phone,
    city: user.city,
    country: user.country,
  });

  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    if (
      fields.first_name ||
      fields.last_name ||
      fields.phone ||
      fields.city ||
      fields.country
    ) {
      ajaxMainService(`/customer/${user.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fields),
      });
    }
  };

  const handleFieldChange = (field) => (event) => {
    setFields({
      ...fields,
      [field]: event.target.value,
    });
  };

  const logout = (event) => {
    window.localStorage.setItem('ACCESS', '');
    window.localStorage.setItem('REFRESH', '');
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    dispatch(getTickets());
  }, []);

  const status = (num_flights) => {
    if (num_flights < 30) {
      return 'Bronze';
    }
    if (num_flights < 60) {
      return 'Silver';
    }
    return 'Gold';
  };

  const countCities = (t) => {
    let cities = new Set();
    t.map((item, idx) => {
      cities.add(item.flight.route.origin.city);
      cities.add(item.flight.route.destination.city);
      return true;
    });
    return cities.size;
  };

  const countCountries = (t) => {
    let countries = new Set();
    t.map((item, idx) => {
      countries.add(item.flight.route.origin.country);
      countries.add(item.flight.route.destination.country);
      return true;
    });
    return countries.size;
  };

  try {
    return (
      <div>
        <div className="profile-info-box">
          <div className="container">
            <div className="info-boxes">
              <div className="avatar-btn-box">
                <div className="avatar-box">
                  <CircularProgressbar
                    value={100 * (tickets.length / 100)}
                    text={status(tickets.length)}
                    styles={buildStyles({
                      textColor: 'white',
                      textSize: '15px',
                      pathColor: 'rgb(125, 195, 20)',
                      trailColor: '#d9d9d9',
                    })}
                  />
                </div>
                <button className="red-btn" onClick={logout}>
                  Sign out
                </button>
              </div>
              <form className="profile-form">
                <div className="info-box">
                  <div className="progress-bar">Hello</div>
                  <ProfileInput
                    field_class="firstname"
                    label="First name"
                    place={user.first_name}
                    onChange={handleFieldChange('first_name')}
                  />
                  <ProfileInput
                    field_class="lastname"
                    label="Last name"
                    place={user.last_name}
                    onChange={handleFieldChange('last_name')}
                  />

                  <div className="info-item email">
                    <div className="info-key">E-mail</div>
                    <div className="info-value">
                      <div className="profile-input">{user.email}</div>
                    </div>
                  </div>

                  <ProfileInput
                    field_class="phone"
                    label="Phone"
                    place={user.phone || '---'}
                    onChange={handleFieldChange('phone')}
                  />
                  <ProfileInput
                    field_class="city"
                    label="City"
                    place={user.city}
                    onChange={handleFieldChange('city')}
                  />
                  <ProfileInput
                    field_class="country"
                    label="Country"
                    place={user.country}
                    onChange={handleFieldChange('country')}
                  />

                  <button className="update-btn" onClick={handleClick}>
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="stats">
          <div className="container">
            <div className="stats-box">
              <div className="stats-flights">
                <img
                  src="/img/ticket.png"
                  width="180"
                  height="180"
                  alt="flights"
                ></img>
                <div className="stat-header">Total flights</div>
                <div className="stat-digit">{tickets.length}</div>
              </div>
              <div className="stats-cities">
                <img
                  src="/img/city.png"
                  width="180"
                  height="180"
                  alt="cities"
                ></img>
                <div className="stat-header">Total cities</div>
                <div className="stat-digit">{countCities(tickets)}</div>
              </div>
              <div className="stats-countries">
                <img
                  src="/img/planet.png"
                  width="180"
                  height="180"
                  alt="countries"
                ></img>
                <div className="stat-header">Total countries</div>
                <div className="stat-digit">{countCountries(tickets)}</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="user-tickets">
            <div className="container">
              {tickets ? (
                tickets.map((item, idx) => {
                  const arrival = calculateArrival(
                    item.flight.timestamp,
                    item.flight.route.duration_hours
                  );
                  return (
                    <Flight
                      id={item.id}
                      key={item.id}
                      flight={item.flight}
                      arrival={arrival}
                      withoutBtn={true}
                    />
                  );
                })
              ) : (
                <div>No tickets</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    window.location.reload();
  }
}
