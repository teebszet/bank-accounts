// import { useHistory } from 'react-router-dom';
import './MainLayout.scss';

export default function MainLayout({ children }) {
  // TODO create a back button
  // const history = useHistory();
  return (
    <div className="main-layout">
      <header className="main-layout__header">
        <h1>Account</h1>
      </header>
      <section className="main-layout__content">{children}</section>
    </div>
  );
}
