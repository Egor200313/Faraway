import '../css/PasswordInput.css';
import { PasswordBar } from './PasswordBar';

export function PasswordInput(props) {
  return (
    <div className="pwd">
      <div className="input-pwd-zone">
        <input
          className="pwd-input"
          type={props.type}
          placeholder={props.placeholder || 'Password...'}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        ></input>
        {props.quality && <PasswordBar quality={props.quality} />}
        {!props.quality && <div className="pwd-error">{props.error}</div>}
      </div>

      <button
        className="eye-btn"
        onClick={props.handleClick}
        style={{ backgroundImage: `url(/img/${props.iconName})` }}
      ></button>
    </div>
  );
}
