import { useMemo, useState } from 'react'
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

function Catalog({ onAddToCart }) {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('All')
  const [sort, setSort] = useState({ field: 'name', direction: 'asc' })

  const types = ['All', ...new Set(GUNS.map((gun) => gun.type))]
  const visibleGuns = useMemo(() => {
    const query = search.trim().toLowerCase()
    return GUNS
      .filter((gun) => gun.name.toLowerCase().includes(query))
      .filter((gun) => type === 'All' || gun.type === type)
      .toSorted((a, b) => {
        const comparison =
          sort.field === 'price'
            ? a.price - b.price
            : a.name.localeCompare(b.name)
        return sort.direction === 'asc' ? comparison : -comparison
      })
  }, [search, sort, type])

  return (
    <>
      <section className="masthead">
        <h1 className="display">Hardware, by the spec sheet.</h1>
        <p className="lede">
          A small armory of pistols, rifles, and shotguns. Every piece listed
          with its type, caliber, and price — nothing else.
        </p>
      </section>

      <section>
        <div className="list-head">
          <h2>Current stock</h2>
          <span className="count">{visibleGuns.length} pieces</span>
        </div>

        <div className="catalog-tools">
          <label className="search-field">
            <span>Search products</span>
            <input
              type="search"
              placeholder="Search by name..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <label className="filter-field">
            <span>Product type</span>
            <select value={type} onChange={(event) => setType(event.target.value)}>
              {types.map((item) => (
                <option key={item} value={item}>
                  {item === 'All' ? 'All types' : item}
                </option>
              ))}
            </select>
          </label>
          <label className="sort-field">
            <span>Sort by</span>
            <select
              value={`${sort.field}-${sort.direction}`}
              onChange={(event) => {
                const [field, direction] = event.target.value.split('-')
                setSort({ field, direction })
              }}
            >
              <option value="name-asc">Name (A–Z)</option>
              <option value="name-desc">Name (Z–A)</option>
              <option value="price-asc">Price (Low–High)</option>
              <option value="price-desc">Price (High–Low)</option>
            </select>
          </label>
        </div>

        <ul className="stock">
          {visibleGuns.map((gun) => (
            <GunCard key={gun.name} gun={gun} onAddToCart={onAddToCart} />
          ))}
        </ul>
        {visibleGuns.length === 0 && (
          <p className="empty-state">No products match your search.</p>
        )}
      </section>
    </>
  )
}

export default Catalog