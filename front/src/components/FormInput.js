import '../css/FormInput.css';

export function FormInput(props) {
  return (
    <div className="input-unit">
      <span className="error-zone">{props.error}</span>
      <input
        type="text"
        placeholder={props.legend}
        value={props.value}
        className={props.error ? 'form-input error' : 'form-input'}
        onChange={props.onChange}
        onBlur={props.onBlur}
        name={props.name}
      ></input>
    </div>
  );
}
