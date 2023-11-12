import '../css/PasswordBar.css';

const setStyle = (quality) => {
  if (quality === 'weak') return [' weak', '', '', ' weak-text'];
  if (quality === 'good') return [' good', ' good', '', ' good-text'];
  if (quality === 'strong')
    return [' strong', ' strong', ' strong', ' strong-text'];
};

export function PasswordBar(props) {
  let styles = setStyle(props.quality);
  return (
    <div className="cnt">
      <div className="blocks">
        <div className={'block' + styles[0]}></div>
        <div className={'block' + styles[1]}></div>
        <div className={'block' + styles[2]}></div>
      </div>
      <div className={'text' + styles[3]}>{props.quality}</div>
    </div>
  );
}
