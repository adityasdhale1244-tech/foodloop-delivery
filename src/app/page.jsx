'use client';

import { useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, BadgePercent, Bike, Check, ChevronDown, ChevronLeft, ChevronRight, Clock3, Heart, LocateFixed, MapPin, Minus, Plus, Search, ShoppingBag, SlidersHorizontal, Sparkles, Star, UtensilsCrossed, X } from 'lucide-react';

const categories = [
  { name: 'All', emoji: '✨' }, { name: 'Biryani', emoji: '🍛' }, { name: 'Pizza', emoji: '🍕' },
  { name: 'Burgers', emoji: '🍔' }, { name: 'South Indian', emoji: '🥞' }, { name: 'Desserts', emoji: '🍰' }, { name: 'Healthy', emoji: '🥗' }
];

const restaurants = [
  { id: 1, name: 'The Bombay Canteen', cuisine: 'Modern Indian · North Indian', rating: '4.8', time: '25–30 min', price: '₹350 for two', offer: 'Flat 20% OFF', category: 'Biryani', image: 'photo-1546833999-b9f581a1996d', dish: 'Smoky paneer tikka bowl', dishPrice: 289, dishImage: 'photo-1567188040759-fb8a883dc6d8', badge: 'Bestseller' },
  { id: 2, name: 'Little Italy', cuisine: 'Italian · Pizza · Pasta', rating: '4.6', time: '20–25 min', price: '₹500 for two', offer: 'Free delivery', category: 'Pizza', image: 'photo-1513104890138-7c749659a591', dish: 'Margherita pizza', dishPrice: 349, dishImage: 'photo-1574071318508-1cdbab80d002', badge: 'Wood-fired' },
  { id: 3, name: 'Burger Seigneur', cuisine: 'Burgers · American · Fast food', rating: '4.5', time: '15–20 min', price: '₹400 for two', offer: '20% OFF up to ₹100', category: 'Burgers', image: 'photo-1555396273-367ea4eb4db5', dish: 'Truffle smash burger', dishPrice: 319, dishImage: 'photo-1568901346375-23c9450c58cd', badge: 'Trending' },
  { id: 4, name: 'Mysore Cafe', cuisine: 'South Indian · Breakfast', rating: '4.7', time: '20–25 min', price: '₹250 for two', offer: 'Free delivery', category: 'South Indian', image: 'photo-1589301760014-d929f3979dbc', dish: 'Crispy masala dosa', dishPrice: 169, dishImage: 'photo-1630383249896-424e482df921', badge: 'Local favourite' },
  { id: 5, name: 'Sakura House', cuisine: 'Japanese · Sushi · Asian', rating: '4.7', time: '30–35 min', price: '₹650 for two', offer: 'Flat 15% OFF', category: 'Healthy', image: 'photo-1579027989536-b7b1f875659b', dish: 'Salmon avocado roll', dishPrice: 429, dishImage: 'photo-1579871494447-9811cf80d66c', badge: 'Chef’s pick' },
  { id: 6, name: 'Sweet Truth', cuisine: 'Desserts · Bakery · Cakes', rating: '4.4', time: '20–25 min', price: '₹300 for two', offer: 'Buy 1 get 1', category: 'Desserts', image: 'photo-1551024506-0bccd828d307', dish: 'Chocolate lava cake', dishPrice: 199, dishImage: 'photo-1606313564200-e75d5e30476c', badge: 'Sweet deal' }
];

const imageUrl = (id, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export default function Home() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [toast, setToast] = useState('');
  const [promo, setPromo] = useState(false);
  const [sortFast, setSortFast] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const filtered = useMemo(() => {
    let list = restaurants.filter((r) => (category === 'All' || r.category === category) && `${r.name} ${r.cuisine} ${r.category} ${r.dish}`.toLowerCase().includes(query.toLowerCase()));
    if (sortFast) list = [...list].sort((a, b) => parseInt(a.time) - parseInt(b.time));
    return list;
  }, [category, query, sortFast]);
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const delivery = subtotal ? (subtotal >= 499 ? 0 : 35) : 0;
  const discount = promo && subtotal ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + delivery - discount;

  function notify(message) {
    setToast(message);
    window.clearTimeout(window.toastTimer);
    window.toastTimer = window.setTimeout(() => setToast(''), 2400);
  }
  function addToCart(restaurant) {
    setCart((current) => {
      const found = current.find((item) => item.id === restaurant.id);
      return found ? current.map((item) => item.id === restaurant.id ? { ...item, qty: item.qty + 1 } : item) : [...current, { ...restaurant, qty: 1 }];
    });
    notify(`${restaurant.dish} added to your bag`);
  }
  function changeQty(id, amount) {
    setCart((current) => current.map((item) => item.id === id ? { ...item, qty: item.qty + amount } : item).filter((item) => item.qty > 0));
  }
  function checkout() {
    if (!cart.length) return notify('Add something delicious to get started');
    setOrderPlaced(true);
    setCart([]);
    setPromo(false);
    notify('Order confirmed! We’re finding your nearest delivery partner.');
  }

  return (
    <main>
      <header className="nav-wrap">
        <a className="logo" href="#home" aria-label="FoodLoop home"><span className="logo-mark">f</span><span>foodloop<span className="logo-dot">.</span></span></a>
        <button className="delivery-location" onClick={() => notify('Showing restaurants near Indiranagar, Bengaluru')}><MapPin size={18} fill="currentColor"/><span><b>Delivering to</b><strong>Indiranagar, Bengaluru</strong></span><ChevronDown size={16}/></button>
        <label className="nav-search"><Search size={19}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search restaurants, dishes..."/><kbd>⌘ K</kbd></label>
        <div className="nav-actions"><button className="icon-button account" onClick={() => notify('Sign in is coming soon')}>Log in</button><button className="signup" onClick={() => notify('Create your FoodLoop account soon')}>Sign up</button><button className="bag-button" onClick={() => setCartOpen(true)} aria-label="Open bag"><ShoppingBag size={19}/>{count > 0 && <span>{count}</span>}</button></div>
      </header>

      <section className="hero" id="home">
        <div className="hero-shade"/><div className="hero-content">
          <span className="eyebrow"><Sparkles size={14}/> GOOD FOOD. GOOD MOOD.</span>
          <h1>Your next<br/><em>great meal</em> is here.</h1>
          <p>Discover the best restaurants, handpicked dishes and little local favourites — delivered to your door.</p>
          <button className="hero-cta" onClick={() => document.getElementById('restaurants').scrollIntoView({ behavior: 'smooth' })}>Explore restaurants <ArrowRight size={17}/></button>
          <div className="hero-trust"><div className="avatar-stack"><i>👩🏽</i><i>👨🏻</i><i>👩🏼</i><i>+</i></div><span><b>4.9/5</b> from food lovers nearby</span></div>
        </div>
        <div className="hero-float"><span className="float-icon">🛵</span><div><b>At your door in 25 min</b><small>Fast, fresh, tracked live</small></div><span className="live-dot"/></div>
        <div className="hero-pagination"><span className="current"/><span/><span/></div>
      </section>

      <div className="main-container">
        <section className="category-section"><div className="section-title"><div><span className="overline">WHAT ARE YOU CRAVING?</span><h2>Explore by cuisine</h2></div><button className="text-link" onClick={() => setCategory('All')}>See all <ArrowRight size={16}/></button></div>
          <div className="categories">{categories.map((item) => <button key={item.name} className={`category ${category === item.name ? 'selected' : ''}`} onClick={() => setCategory(item.name)}><span>{item.emoji}</span><b>{item.name}</b></button>)}</div>
        </section>

        <section className="deal-banner"><div className="deal-copy"><span className="deal-pill"><BadgePercent size={14}/> YOUR FIRST ORDER</span><h2>A little treat<br/>on us.</h2><p>Get 10% off your first order.<br/>Good things start with <b>WELCOME10</b></p><button onClick={() => { setPromo(true); notify('WELCOME10 applied — 10% off your order'); }}>Claim your 10% off <ArrowRight size={16}/></button></div><div className="deal-image" style={{ backgroundImage: `url('${imageUrl('photo-1512621776951-a57141f2eefd', 1000)}')` }}><div className="deal-sticker"><span>10%</span><small>OFF</small></div></div></section>

        <section className="restaurants-section" id="restaurants"><div className="section-title"><div><span className="overline">THE GOOD STUFF, NEAR YOU</span><h2>Restaurants to love <span className="title-sparkle">✳</span></h2></div><button className="filter-button" onClick={() => { setSortFast((value) => !value); notify(sortFast ? 'Showing recommended restaurants' : 'Sorted by fastest delivery'); }}><SlidersHorizontal size={16}/>{sortFast ? 'Recommended' : 'Filters'}<ArrowDown size={14}/></button></div>
          <div className="restaurant-grid">{filtered.map((restaurant) => <article className="restaurant-card" key={restaurant.id}><div className="restaurant-photo" style={{ backgroundImage: `url('${imageUrl(restaurant.image)}')` }}><span className="photo-tag">{restaurant.badge}</span><button className={`favorite ${favorites.includes(restaurant.id) ? 'liked' : ''}`} aria-label="Save restaurant" onClick={() => setFavorites((current) => current.includes(restaurant.id) ? current.filter((id) => id !== restaurant.id) : [...current, restaurant.id])}><Heart size={18} fill={favorites.includes(restaurant.id) ? 'currentColor' : 'none'}/></button><span className="offer-tag"><BadgePercent size={13}/>{restaurant.offer}</span></div><div className="restaurant-info"><div className="restaurant-name"><h3>{restaurant.name}</h3><span className="rating"><Star size={13} fill="currentColor"/>{restaurant.rating}</span></div><p>{restaurant.cuisine}</p><div className="restaurant-meta"><span><Clock3 size={14}/>{restaurant.time}</span><span className="meta-dot"/><span>{restaurant.price}</span><span className="delivery-chip"><Bike size={13}/> Free delivery*</span></div></div></article>)}</div>
          {!filtered.length && <div className="no-results"><span>🍽️</span><h3>No bites found just yet</h3><p>Try another dish, cuisine or restaurant name.</p><button onClick={() => { setQuery(''); setCategory('All'); }}>Clear filters</button></div>}
        </section>

        <section className="popular-section"><div className="section-title"><div><span className="overline">CAN’T-MISS FAVOURITES</span><h2>Trending dishes</h2></div><div className="slider-controls"><button aria-label="Previous dishes" onClick={() => document.getElementById('dish-row').scrollBy({ left: -300, behavior: 'smooth' })}><ChevronLeft size={18}/></button><button aria-label="Next dishes" onClick={() => document.getElementById('dish-row').scrollBy({ left: 300, behavior: 'smooth' })}><ChevronRight size={18}/></button></div></div>
          <div className="dish-row" id="dish-row">{restaurants.map((restaurant) => <article className="dish-card" key={restaurant.id}><div className="dish-image" style={{ backgroundImage: `url('${imageUrl(restaurant.dishImage, 600)}')` }}><span className="dish-rating"><Star size={12} fill="currentColor"/>{restaurant.rating}</span></div><div className="dish-info"><div><h3>{restaurant.dish}</h3><p>{restaurant.name}</p><b>₹{restaurant.dishPrice}</b></div><button className="add-button" onClick={() => addToCart(restaurant)} aria-label={`Add ${restaurant.dish} to bag`}><Plus size={19}/></button></div></article>)}</div>
        </section>

        <section className="automation-strip"><div className="auto-icon"><LocateFixed size={21}/></div><div><span className="overline">A LITTLE FOODLOOP MAGIC</span><h3>Great food, minus the guesswork.</h3><p>We’ll help you find a favourite, spot the best deal and keep you in the loop from kitchen to doorstep.</p></div><div className="auto-benefits"><span><Check size={15}/> Smart local picks</span><span><Check size={15}/> Deals at checkout</span><span><Check size={15}/> Live order updates</span></div><button onClick={() => notify('Your personalised picks are ready!')}>See your picks <ArrowRight size={16}/></button></section>
      </div>

      <footer><a className="logo" href="#home"><span className="logo-mark">f</span><span>foodloop<span className="logo-dot">.</span></span></a><span>Made for good food and good days.</span><span>© 2025 FoodLoop</span></footer>

      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(e) => e.stopPropagation()}><div className="drawer-head"><div><span className="overline">YOUR GOOD STUFF</span><h2>Your bag <span>({count})</span></h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label="Close bag"><X/></button></div>
        {orderPlaced && <div className="order-success"><span>🎉</span><div><b>Order placed!</b><small>We’re getting your next meal ready.</small></div><Check size={18}/></div>}
        {cart.length ? <><div className="cart-lines">{cart.map((item) => <div className="cart-line" key={item.id}><div className="cart-thumb" style={{ backgroundImage: `url('${imageUrl(item.dishImage, 250)}')` }}/><div className="cart-line-info"><b>{item.dish}</b><small>{item.name}</small><strong>₹{item.price}</strong></div><div className="qty-control"><button onClick={() => changeQty(item.id, -1)} aria-label="Remove one"><Minus size={13}/></button><b>{item.qty}</b><button onClick={() => changeQty(item.id, 1)} aria-label="Add one"><Plus size={13}/></button></div></div>)}</div><button className="promo-row" onClick={() => { setPromo((value) => !value); notify(promo ? 'Promo removed' : '10% promo applied'); }}><BadgePercent size={17}/><span>{promo ? 'WELCOME10 applied' : 'Apply WELCOME10 for 10% off'}</span><ArrowRight size={16}/></button><div className="bill"><div><span>Item total</span><b>₹{subtotal}</b></div><div><span>Delivery fee</span><b>{delivery === 0 ? 'FREE' : `₹${delivery}`}</b></div>{discount > 0 && <div className="discount-line"><span>WELCOME10 discount</span><b>−₹{discount}</b></div>}<div className="bill-total"><span>To pay</span><b>₹{total}</b></div></div><button className="checkout-button" onClick={checkout}>Place order <span>₹{total}</span><ArrowRight size={17}/></button><p className="checkout-note"><Check size={13}/> Secure checkout · Free delivery over ₹499</p></> : <div className="empty-bag"><div>🥡</div><h3>Your bag is taking a break</h3><p>Add something delicious and we’ll take it from here.</p><button onClick={() => setCartOpen(false)}>Explore restaurants <ArrowRight size={15}/></button></div>}
      </aside></div>}
      {count > 0 && !cartOpen && <button className="floating-cart" onClick={() => setCartOpen(true)}><ShoppingBag size={18}/><span>{count} {count === 1 ? 'item' : 'items'} · ₹{total}</span><span>View bag <ArrowRight size={15}/></span></button>}
      <div className={`toast ${toast ? 'show' : ''}`}><span>✦</span>{toast}</div>
    </main>
  );
}
