import '../css/Flight.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { minutesToHoursMinutes } from './dateParsing';
import { ajaxMainService } from '../service/ajaxService';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Checkmark } from 'react-checkmark';

export function Flight(props) {
  const [purchased, setPurchased] = useState(false);
  const user = useSelector((state) => state.user.user);
  const [deptime, deppart] = moment(props.ticket.flight.depTime)
    .format('LT')
    .split(' ');
  const [artime, arpart] = moment(props.arrival).format('LT').split(' ');

  let extra_day = '';
  if (
    moment(props.ticket.flight.depTime).format('YYYYDDMM') !==
    moment(props.arrival).format('YYYYDDMM')
  ) {
    extra_day = moment(props.arrival).format('MMM D');
  }

  const navigate = useNavigate();

  const selectTicket = (e) => {
    if (window.localStorage.getItem('ACCESS') === '') {
      navigate('/login');
      return;
    }
    ajaxMainService('/tickets/', {
      method: 'POST',
      body: JSON.stringify({
        flight: props.flight.id,
        owner: user.id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      setPurchased(true);
    });
  };

  return (
    <div className="cont">
      <div className="backside" id={'0' + props.id}>
        <h1>Success</h1>
      </div>
      <div className="trip-entity" id={props.id}>
        <div className="trip-head">
          <div className="airline">{props.ticket.flight.airline} </div>
          <div className="trip-date">
            {moment(props.ticket.flight.depTime).format('MMM Do YYYY')}
          </div>
        </div>
        <div className="trip-content">
          <div className="time">
            <div className="time-port">
              <div className="stamp">
                <span>
                  {deptime}
                  <span className="lit">{deppart}</span>
                </span>
              </div>
              <div className="port">{props.ticket.flight.route.origin.name}</div>
            </div>
            <div className="line-item"></div>
            <div className="time-port">
              <div className="stamp">
                <span>
                  {artime}
                  <span className="lit">{arpart}</span>
                  {extra_day && <span className="uppertext">{extra_day}</span>}
                </span>
              </div>
              <div className="port">{props.ticket.flight.route.destination.name}</div>
            </div>
          </div>
          <div className="baggage-info-box">
            <div>
              <div className="baggage-line">
                <div className="bag-img handbag"></div>
                <span>Carry-on baggage:</span>
                <span className="av">{props.ticket.luggageKg} kg</span>
              </div>
              <div className="baggage-line">
                <div className="bag-img luggage"></div>
                <span>Checked baggage</span>
                <span className="av">{props.ticket.handLuggageKg} kg</span>
              </div>
            </div>
          </div>
          <div className="price-select">
            <div className="price-route">
              <span className="price">
                <span>$ {props.ticket.price.toFixed(2)}</span>
              </span>

              <div className="direction">One way</div>
            </div>

            {!props.withoutBtn && !purchased && (
              <button
                className="select-btn"
                type="button"
                onClick={selectTicket}
              >
                Select
              </button>
            )}
            {purchased && (
              <div className="selected-icon">
                <Checkmark />
                <div className="success-select">Purchased!</div>
              </div>
            )}
          </div>

          <div className="layouts">
            <div>
              <div className="lay-type">Non-stop</div>
            </div>
            <div className="trip-time">
              <span className="dur">
                {minutesToHoursMinutes(props.ticket.flight.route.durationMinutes)}
              </span>
              duration
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
