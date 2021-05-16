import { Link } from 'react-router-dom';

export default function MainLayout({children}) {
  return (
    <div className="main-layout">
      <header className="main-layout__header">
        <nav>
          <ul>
            <li>
              <Link to="/transactions">Transactions</Link>
            </li>
            <li>
              <Link to="/transfer">Transfer</Link>
            </li>
          </ul>
        </nav>
      </header>
      <section className="main-layout__content">
        { children }
      </section>
    </div>
  );
}
