import { useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Catalog from './pages/Catalog.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import './App.css'

function App() {
  const [tab, setTab] = useState('Catalog')
  const [cart, setCart] = useState([])

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  )

  function addToCart(gun) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.name === gun.name)
      if (existingItem) {
        return currentCart.map((item) =>
          item.name === gun.name
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }
      return [...currentCart, { ...gun, quantity: 1 }]
    })
  }

  function updateQuantity(name, change) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  return (
    <div className="shell">
      <Header
        tab={tab}
        onTab={setTab}
        cart={cart}
        cartCount={cartCount}
        onUpdateQuantity={updateQuantity}
      />
      <main className="main">
        {tab === 'Catalog' && <Catalog onAddToCart={addToCart} />}
        {tab === 'About' && <About />}
        {tab === 'Contact' && <Contact />}
      </main>
      <Footer />
    </div>
  )
}

export default App