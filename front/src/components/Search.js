import '../css/Search.css';
import { ProgressBar } from './Bar';
import { Flight } from './Flight';
import { normalizeDate, calculateArrival } from './dateParsing';
import { useSelector } from 'react-redux';

export function SearchPage(props) {
  const data = useSelector((state) => state.search);

  const collapseTicket = () => {};

  const flights = useSelector((state) => state.flight.flights);
  const complete = useSelector((state) => state.flight.complete);

  return (
    <div className="search-page">
      <div className="extra-header">
        <div className="search-params-box">
          <div className="points">
            {data.from} --- {data.to + ', '}
          </div>
          {data.date ? normalizeDate(data.date) : 'all dates'}, 1 passenger,
          economy
        </div>
      </div>
      <div className="container dark">
        <ProgressBar completed={complete} />
        <div className="results-container">
          {!flights.length && (
            <h1 className="sorry">Sorry, no flights on chosen dates.</h1>
          )}
          {flights ? (
            flights.map((item, idx) => {
              const arrival = calculateArrival(
                item.flight.depTime,
                item.flight.route.durationMinutes
              );
              return (
                <Flight
                  id={item.id}
                  key={item.id}
                  ticket={item}
                  arrival={arrival}
                  collapse={collapseTicket}
                />
              );
            })
          ) : (
            <div>No offers</div>
          )}
        </div>
      </div>
    </div>
  );
}
