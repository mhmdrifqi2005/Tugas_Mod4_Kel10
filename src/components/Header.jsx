const NAV = ['Catalog', 'About', 'Contact']

function Header({ tab, onTab, cart, cartCount, onUpdateQuantity }) {
  return (
    <header className="header">
      <span className="brand display">Bore &amp; Barrel</span>
      <nav className="nav">
        {NAV.map((item) => (
          <button
            key={item}
            type="button"
            className={tab === item ? 'nav-link active' : 'nav-link'}
            onClick={() => onTab(item)}
          >
            {item}
          </button>
        ))}
      </nav>
      <details className="cart-menu">
        <summary className="cart-trigger">
          Cart <span className="cart-badge">{cartCount}</span>
        </summary>
        <div className="cart-panel">
          <h2>Your cart</h2>
          {cart.length === 0 ? (
            <p className="cart-empty">Your cart is empty.</p>
          ) : (
            <>
              <ul className="cart-list">
                {cart.map((item) => (
                  <li className="cart-item" key={item.name}>
                    <div>
                      <strong>{item.name}</strong>
                      <span>${item.price.toLocaleString()} each</span>
                    </div>
                    <div className="quantity-control">
                      <button type="button" onClick={() => onUpdateQuantity(item.name, -1)} aria-label={`Remove one ${item.name}`}>−</button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => onUpdateQuantity(item.name, 1)} aria-label={`Add one ${item.name}`}>+</button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <span>Total</span>
                <strong>${cart.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()}</strong>
              </div>
            </>
          )}
        </div>
      </details>
    </header>
  )
}

export default Header
