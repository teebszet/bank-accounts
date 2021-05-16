import './Button.scss';

export default function Button({children}) {
  return (
    <button className="primary-button">{children}</button>
  );
}
