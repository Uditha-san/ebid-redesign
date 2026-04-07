import React, { useState, useEffect } from 'react';
import './index.css';

// --- Inline SVGs for no-dependency icons ---
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const HeartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>;
const CartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
const StoreIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const ForumIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>;
const HelpIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
const BellIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
const DashIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>;
const XIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

// Category Icons
const TagIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>;
const BookIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>;
const StarIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const LaptopIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>;
const GemIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 22 22 7 12 2"></polygon><polyline points="2 7 12 7 22 7"></polyline><polyline points="12 22 12 7"></polyline><polyline points="12 2 12 7"></polyline></svg>;
const CarIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H8.3a2 2 0 0 0-1.6.8L4 11l-5.16.86a1 1 0 0 0-.84.99V16h3m10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM4 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"></path></svg>;


const categories = [
  { name: "Antiques", count: "1,319", Icon: TagIcon },
  { name: "Books & Comics", count: "884,420", Icon: BookIcon },
  { name: "Collectibles", count: "648,451", Icon: StarIcon },
  { name: "Electronics", count: "28,993", Icon: LaptopIcon },
  { name: "Jewelry", count: "16,662", Icon: GemIcon },
  { name: "Cars & Vehicles", count: "20,111", Icon: CarIcon }
];

const mockProducts = [
  {
    id: 1,
    title: "Vintage 1960s Omega Seamaster Automatic Gold Watch",
    price: "$450.00",
    type: "Auction",
    bids: 12,
    timeLeft: "2h 15m",
    category: "Antiques",
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    title: "First Edition Harry Potter and the Philosopher's Stone",
    price: "$1,200.00",
    type: "Buy Now",
    condition: "Like New",
    category: "Books & Comics",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    title: "Sony PlayStation 5 Console - Disc Edition (Brand New)",
    price: "$480.00",
    type: "Auction",
    bids: 35,
    timeLeft: "45m",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 4,
    title: "Antique Victorian Mahogany Writing Desk - 19th Century",
    price: "$850.00",
    type: "Buy Now",
    condition: "Good",
    category: "Home & Garden",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=400",
  }
];

const menuCategories = ["All Categories", "Antiques", "Art", "Books & Comics", "Collectibles", "Electronics", "Home & Garden", "Sport Memorabilia", "Whatever's Left"];

// Micro-Component: Modal
const Modal = ({ isOpen, title, body, onClose, actions }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><XIcon /></button>
        </div>
        <div className="modal-body">
          <p>{body}</p>
        </div>
        {actions && (
          <div className="modal-footer">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

// Micro-Component: Toast
const Toast = ({ message }) => {
  if (!message) return null;
  return (
    <div className="toast">
      {message}
    </div>
  );
}

function App() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState("All Categories");
  
  // Interaction States
  const [modalState, setModalState] = useState({ isOpen: false, title: '', body: '' });
  const [toastMessage, setToastMessage] = useState('');

  // Handle showing toast that disappears after 3 seconds
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const openModal = (title, body) => {
    setModalState({ isOpen: true, title, body });
  };

  const closeModal = () => {
    setModalState(s => ({ ...s, isOpen: false }));
  };

  // Filter products by category AND search query
  const filteredProducts = mockProducts.filter(p => {
    const matchesCategory = activeCategory === "All Categories" || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="app">
      {/* Utility Bar */}
      <div className="utility-bar">
        <div className="utility-links">
          <a href="#" onClick={(e) => { e.preventDefault(); openModal('Sign In or Register', 'Login to your eBid account to manage your listings and bids.'); }}>Hi, Sign In or Register</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openModal('Daily Deals', 'Discover the best deals across all categories today! Savings up to 80%.'); }}>Daily Deals</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openModal('eBid Stores', 'Browse dedicated storefronts built by our Power Sellers.'); }}><StoreIcon /> eBid Stores</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openModal('Community Forum', 'Connect with other buyers and sellers in the eBid community.'); }}><ForumIcon /> Community</a>
        </div>
        <div className="utility-links">
          <a href="#" onClick={(e) => { e.preventDefault(); openModal('Help & Contact', 'Need assistance? Our Customer Support team is here 24/7.'); }}><HelpIcon /> Help & Contact</a>
          <select className="utility-select" defaultValue="US" onChange={(e) => showToast(`Currency changed to ${e.target.value}`)}>
            <option value="US">🇺🇸 USD</option>
            <option value="UK">🇬🇧 GBP</option>
            <option value="EU">🇪🇺 EUR</option>
          </select>
        </div>
      </div>

      {/* Header */}
      <header className="header">
        <a href="#" className="logo" onClick={(e) => { e.preventDefault(); showToast('Navigating to Homepage...'); }}>
          e<span>Bid</span>
        </a>

        <div className={`search-bar-container ${searchFocused ? 'focused' : ''}`}>
          <div className="search-icon">
            <SearchIcon />
          </div>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search for anything (e.g., Antiques, PlayStation, Watch)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            onKeyDown={(e) => { if(e.key === 'Enter') showToast(`Searching for "${searchQuery}"`); }}
          />
          <button className="search-btn" onClick={() => showToast(`Searching for "${searchQuery}"`)}>Search</button>
        </div>

        <div className="header-actions">
           <button className="icon-btn active" onClick={() => openModal('My eBid Dashboard', 'Welcome back to your dashboard! Here you can check your sales, active bids, and account metrics.')}>
             <DashIcon />
             <span>My eBid</span>
           </button>
           <button className="icon-btn" onClick={() => openModal('Your Watchlist', 'You currently have 0 items in your watchlist. Start browsing to save items for later.')}>
             <HeartIcon />
             <span>Watchlist</span>
           </button>
           <button className="icon-btn" onClick={() => openModal('Alerts & Notifications', 'You have no new notifications at this time.')}>
             <BellIcon />
             <span>Alerts</span>
           </button>
           <button className="icon-btn" onClick={() => openModal('Shopping Cart', 'Your shopping cart is currently empty. Shop fixed-price items to add them to your cart.')}>
             <CartIcon />
             <span>Cart</span>
           </button>
           <button className="btn btn-primary" style={{marginLeft: '0.5rem'}} onClick={() => openModal('Sell an Item', 'Ready to make some money? Upload photos, set a description, and list your item with zero fees!')}>
             Sell Item
           </button>
        </div>
      </header>

      {/* Categories Mega Menu */}
      <nav className="nav-categories">
        {menuCategories.map((cat) => (
          <a 
            key={cat}
            href="#" 
            className={`nav-item ${activeCategory === cat ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveCategory(cat);
              setSearchQuery(''); // Reset search when clicking a category
              window.scrollTo({ top: document.querySelector('.products-grid').offsetTop - 100, behavior: 'smooth' });
            }}
          >
            {cat}
          </a>
        ))}
      </nav>

      <main className="main-container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <span className="hero-badge">Zero Fees for Life</span>
            <h1>The smarter way to buy and sell online.</h1>
            <p>Join the secure, fee-free alternative marketplace. Upgrade to Platinum Lifetime today and never pay listing fees again.</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-primary" onClick={() => openModal('Platinum Lifetime Upgrade', 'Upgrade to Platinum Lifetime for a one-time fee of $49.99 and enjoy ZERO listing fees forever.')}>Upgrade to Platinum</button>
              <button className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }} onClick={() => openModal('About eBid Platinum', 'Learn how the Platinum tier gives you full access to eBid Stores, priority support, and advanced seller tools.')}>Learn More</button>
            </div>
          </div>
          
          <div className="hero-image-placeholder">
             <div className="floating-card" style={{ top: '10%', left: '-20%' }}>
               <TagIcon />
               <div>
                 <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>0%</div>
                 <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Listing Fees</div>
               </div>
             </div>
             <div className="floating-card" style={{ bottom: '15%', right: '-15%', animationDelay: '1s' }}>
                <StarIcon />
               <div>
                  <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>4M+</div>
                 <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Items</div>
               </div>
             </div>
             
             <div style={{ textAlign: 'center', opacity: 0.8 }}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 22 22 7 12 2"></polygon><polyline points="2 7 12 7 22 7"></polyline><polyline points="12 22 12 7"></polyline></svg>
             </div>
          </div>
        </section>

        {/* Categories Section */}
        <div className="section-header">
           <h2 className="section-title">Shop Top Categories</h2>
           <button className="btn btn-outline" onClick={() => { setActiveCategory("All Categories"); window.scrollTo({ top: document.querySelector('.products-grid').offsetTop - 100, behavior: 'smooth' }); }}>View All</button>
        </div>
        <div className="categories-grid">
           {categories.map((cat, idx) => (
             <a href="#" key={idx} className="category-card" onClick={(e) => { 
                e.preventDefault(); 
                setActiveCategory(cat.name); 
                window.scrollTo({ top: document.querySelector('.products-grid').offsetTop - 100, behavior: 'smooth' });
             }}>
                <div className="category-icon">
                   <cat.Icon />
                </div>
                <div>
                   <div className="category-name">{cat.name}</div>
                   <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cat.count} listings</div>
                </div>
             </a>
           ))}
        </div>

        {/* Trending Deals Section */}
        <div className="section-header">
           <h2 className="section-title">{searchQuery ? `Search Results for "${searchQuery}"` : 'Trending Now'}</h2>
        </div>
        <div className="products-grid">
           {filteredProducts.length > 0 ? filteredProducts.map((product) => (
             <div key={product.id} className="product-card" style={{ cursor: 'pointer' }} onClick={() => openModal(product.title, `You are viewing ${product.title}. It is currently listed for ${product.price} as a ${product.type} listing.`)}>
               <div className={`product-badge ${product.type === 'Auction' ? 'badge-auction' : 'badge-fixed'}`}>
                 {product.type}
               </div>
               <div className="product-image">
                 <img src={product.image} alt={product.title} />
               </div>
               <div className="product-content">
                  <h3 className="product-title">{product.title}</h3>
                  <div className="product-meta">
                     {product.type === 'Auction' ? (
                        <>
                          <ClockIcon /> {product.timeLeft} left
                        </>
                     ) : (
                        <span>Condition: {product.condition}</span>
                     )}
                  </div>
                  <div className="product-price-row">
                     <div className="product-price">{product.price}</div>
                     {product.type === 'Auction' && (
                        <div className="product-bids">{product.bids} Bids</div>
                     )}
                  </div>
               </div>
             </div>
           )) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                 <p>No products found matching your criteria. Try adjusting your search or category!</p>
                 <button className="btn btn-outline" style={{ marginTop: '1rem' }} onClick={() => { setSearchQuery(''); setActiveCategory('All Categories'); }}>Clear Filters</button>
              </div>
           )}
        </div>
      </main>

      {/* Footer Mockup */}
      <footer className="footer">
         <div className="main-container">
           <div className="footer-content">
             <div className="footer-col">
                <a href="#" className="logo" style={{ color: 'white', marginBottom: '1.5rem', display: 'inline-block' }}>
                   e<span style={{ color: 'var(--secondary)' }}>Bid</span>
                </a>
                <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>The world's premium alternative marketplace. Fair fees, safe transactions, and millions of items.</p>
             </div>
             <div className="footer-col">
                <h4>Buy</h4>
                <ul>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); showToast('Navigating to Categories...'); }}>Categories</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); showToast('Navigating to Recent Sales...'); }}>Recent Sales</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); showToast('Navigating to Trust & Safety...'); }}>Trust & Safety</a></li>
                </ul>
             </div>
             <div className="footer-col">
                <h4>Sell</h4>
                <ul>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); openModal('Start Selling', 'Ready to list your item?'); }}>Start Selling</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); openModal('Seller Fees', 'Learn about our zero-fee structure!'); }}>Seller Fees</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); showToast('Navigating to Affiliate Program...'); }}>Affiliate Program</a></li>
                </ul>
             </div>
             <div className="footer-col">
                <h4>About</h4>
                <ul>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); showToast('Navigating to About Us...'); }}>About Us</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); showToast('Navigating to Contact Support...'); }}>Contact Support</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); showToast('Navigating to Privacy Policy...'); }}>Privacy Policy</a></li>
                </ul>
             </div>
           </div>
           <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center', fontSize: '0.9rem' }}>
              &copy; {new Date().getFullYear()} eBid Redesign Concept. For educational purposes only.
           </div>
         </div>
      </footer>
      
      {/* Portals / Overlay Components */}
      <Modal isOpen={modalState.isOpen} title={modalState.title} body={modalState.body} onClose={closeModal} />
      <Toast message={toastMessage} />
    </div>
  );
}

export default App;
