import '../css/Bar.css';

export function ProgressBar(props) {
  const { completed } = props;

  return (
    <div className="bar-container">
      <div className="filler" style={{ width: `${completed}%` }}>
        <span></span>
      </div>
    </div>
  );
}
