export function ProfileInput(props) {
  return (
    <div className={'info-item ' + props.field_class}>
      <div className="info-key">{props.label}</div>
      <div className="info-value">
        <input
          name={props.field_class}
          type="text"
          placeholder={props.place}
          className="profile-input"
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}
