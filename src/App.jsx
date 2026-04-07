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
  { name: "Art", count: "92,110", Icon: GemIcon },
  { name: "Books & Comics", count: "884,420", Icon: BookIcon },
  { name: "Collectibles", count: "648,451", Icon: StarIcon },
  { name: "Electronics", count: "28,993", Icon: LaptopIcon },
  { name: "Home & Garden", count: "214,006", Icon: TagIcon },
  { name: "Sport Memorabilia", count: "77,483", Icon: StarIcon },
  { name: "Whatever's Left", count: "8,912", Icon: CarIcon }
];

const testImages = {
  watch: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=400",
  book: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
  console: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=400",
  desk: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=400",
};

const mockProducts = [
  {
    id: 1,
    title: "Vintage 1960s Omega Seamaster Automatic Gold Watch",
    price: "$450.00",
    type: "Auction",
    bids: 12,
    timeLeft: "2h 15m",
    category: "Antiques",
    image: testImages.watch,
  },
  {
    id: 2,
    title: "Antique Victorian Mahogany Writing Desk - 19th Century",
    price: "$850.00",
    type: "Buy Now",
    condition: "Good",
    category: "Antiques",
    image: testImages.desk,
  },
  {
    id: 3,
    title: "1960s Brass Desk Clock — Working, Clean Face",
    price: "$68.00",
    type: "Buy Now",
    condition: "Very Good",
    category: "Antiques",
    image: testImages.watch,
  },
  {
    id: 4,
    title: "Antique-Style Table Lamp (Warm Brass Finish)",
    price: "$39.00",
    type: "Auction",
    bids: 7,
    timeLeft: "6h 05m",
    category: "Antiques",
    image: testImages.desk,
  },

  {
    id: 5,
    title: "Original Abstract Canvas (Signed) — Modern Wall Art",
    price: "$120.00",
    type: "Buy Now",
    condition: "Excellent",
    category: "Art",
    image: testImages.desk,
  },
  {
    id: 6,
    title: "Limited-Run Art Print — Gallery-Quality Paper",
    price: "$35.00",
    type: "Auction",
    bids: 18,
    timeLeft: "1d 3h",
    category: "Art",
    image: testImages.book,
  },
  {
    id: 7,
    title: "Handmade Ceramic Vase — Minimal White Glaze",
    price: "$42.00",
    type: "Buy Now",
    condition: "New",
    category: "Art",
    image: testImages.desk,
  },
  {
    id: 8,
    title: "Vintage Film Poster Reprint — A2 Size",
    price: "$19.00",
    type: "Buy Now",
    condition: "New",
    category: "Art",
    image: testImages.book,
  },

  {
    id: 9,
    title: "First Edition Harry Potter and the Philosopher's Stone",
    price: "$1,200.00",
    type: "Buy Now",
    condition: "Like New",
    category: "Books & Comics",
    image: testImages.book,
  },
  {
    id: 10,
    title: "Classic Comic Lot (10 Issues) — Bagged & Boarded",
    price: "$54.00",
    type: "Auction",
    bids: 9,
    timeLeft: "9h 10m",
    category: "Books & Comics",
    image: testImages.book,
  },
  {
    id: 11,
    title: "Hardcover Mystery Bundle — 5 Books, Great Condition",
    price: "$26.00",
    type: "Buy Now",
    condition: "Very Good",
    category: "Books & Comics",
    image: testImages.book,
  },
  {
    id: 12,
    title: "Collector's Manga Volume (Out of Print)",
    price: "$18.00",
    type: "Auction",
    bids: 5,
    timeLeft: "3h 40m",
    category: "Books & Comics",
    image: testImages.book,
  },

  {
    id: 13,
    title: "Retro Trading Card Binder — Mixed Set Included",
    price: "$29.00",
    type: "Buy Now",
    condition: "Good",
    category: "Collectibles",
    image: testImages.watch,
  },
  {
    id: 14,
    title: "Limited Edition Coin Replica — Display Case",
    price: "$65.00",
    type: "Auction",
    bids: 14,
    timeLeft: "12h 25m",
    category: "Collectibles",
    image: testImages.watch,
  },
  {
    id: 15,
    title: "Vintage Pin Set (12 pcs) — Enamel & Metal",
    price: "$22.00",
    type: "Buy Now",
    condition: "Very Good",
    category: "Collectibles",
    image: testImages.desk,
  },
  {
    id: 16,
    title: "Collector Figure — Boxed, Display Ready",
    price: "$48.00",
    type: "Auction",
    bids: 11,
    timeLeft: "5h 55m",
    category: "Collectibles",
    image: testImages.desk,
  },

  {
    id: 17,
    title: "Sony PlayStation 5 Console - Disc Edition (Brand New)",
    price: "$480.00",
    type: "Auction",
    bids: 35,
    timeLeft: "45m",
    category: "Electronics",
    image: testImages.console,
  },
  {
    id: 18,
    title: "Wireless Noise-Canceling Headphones — All-Day Battery",
    price: "$79.00",
    type: "Buy Now",
    condition: "New",
    category: "Electronics",
    image: testImages.console,
  },
  {
    id: 19,
    title: "Refurbished Smartphone — Unlocked, 128GB",
    price: "$149.00",
    type: "Buy Now",
    condition: "Refurbished",
    category: "Electronics",
    image: testImages.console,
  },
  {
    id: 20,
    title: "Portable Bluetooth Speaker — Deep Bass",
    price: "$24.00",
    type: "Auction",
    bids: 21,
    timeLeft: "8h 05m",
    category: "Electronics",
    image: testImages.console,
  },

  {
    id: 21,
    title: "Solid Wood Side Table — Compact, Easy Assembly",
    price: "$59.00",
    type: "Buy Now",
    condition: "New",
    category: "Home & Garden",
    image: testImages.desk,
  },
  {
    id: 22,
    title: "Indoor Plant Pot Set — 3 Sizes (Matte Finish)",
    price: "$18.00",
    type: "Auction",
    bids: 13,
    timeLeft: "10h 30m",
    category: "Home & Garden",
    image: testImages.desk,
  },
  {
    id: 23,
    title: "Kitchen Storage Jars — Airtight (Set of 6)",
    price: "$27.00",
    type: "Buy Now",
    condition: "New",
    category: "Home & Garden",
    image: testImages.book,
  },
  {
    id: 24,
    title: "Modern Desk Organizer — Minimal Steel Design",
    price: "$15.00",
    type: "Buy Now",
    condition: "New",
    category: "Home & Garden",
    image: testImages.book,
  },

  {
    id: 25,
    title: "Signed Team Jersey (Framed) — Certificate Included",
    price: "$210.00",
    type: "Auction",
    bids: 16,
    timeLeft: "1d 1h",
    category: "Sport Memorabilia",
    image: testImages.watch,
  },
  {
    id: 26,
    title: "Collector Baseball Card — Protective Case",
    price: "$34.00",
    type: "Buy Now",
    condition: "Very Good",
    category: "Sport Memorabilia",
    image: testImages.watch,
  },
  {
    id: 27,
    title: "Game Day Cap — Embroidered, Adjustable Fit",
    price: "$12.00",
    type: "Buy Now",
    condition: "New",
    category: "Sport Memorabilia",
    image: testImages.desk,
  },
  {
    id: 28,
    title: "Vintage Sports Program — Clean Pages, Great Cover",
    price: "$17.00",
    type: "Auction",
    bids: 6,
    timeLeft: "7h 20m",
    category: "Sport Memorabilia",
    image: testImages.book,
  },

  {
    id: 29,
    title: "Mystery Box: Mixed Household Items (Fun Surprise Lot)",
    price: "$9.00",
    type: "Auction",
    bids: 28,
    timeLeft: "2h 05m",
    category: "Whatever's Left",
    image: testImages.desk,
  },
  {
    id: 30,
    title: "Bundle Deal: Cables & Accessories — Assorted",
    price: "$11.00",
    type: "Buy Now",
    condition: "Good",
    category: "Whatever's Left",
    image: testImages.console,
  },
  {
    id: 31,
    title: "Assorted Stickers Pack — 50 pcs",
    price: "$6.00",
    type: "Buy Now",
    condition: "New",
    category: "Whatever's Left",
    image: testImages.book,
  },
  {
    id: 32,
    title: "Random Finds Lot — Great for Resellers",
    price: "$14.00",
    type: "Auction",
    bids: 10,
    timeLeft: "4h 40m",
    category: "Whatever's Left",
    image: testImages.watch,
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
          {typeof body === 'string' ? <p>{body}</p> : body}
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

const PlatinumUpgradePanel = ({ onClose, showToast, onLearnMore }) => {
  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <div style={{
        padding: '0.9rem 1rem',
        borderRadius: 14,
        background: 'linear-gradient(135deg, #0b1120 0%, #1e293b 100%)',
        color: 'white',
        border: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.3px' }}>Platinum Lifetime</div>
        <div style={{ color: '#cbd5e1', marginTop: '0.25rem', fontSize: '0.95rem' }}>
          One-time upgrade. Keep more profit and unlock premium seller tools.
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.75rem' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--secondary)' }}>$49.99</div>
          <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>one-time payment</div>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '0.6rem' }}>
        <div style={{ fontWeight: 800, color: 'var(--primary)' }}>What you get</div>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          {[
            'Zero listing fees for life',
            'Priority customer support',
            'Boosted visibility in search (demo)',
            'Seller dashboard insights (demo)'
          ].map((text) => (
            <div
              key={text}
              style={{
                display: 'flex',
                gap: '0.6rem',
                alignItems: 'flex-start',
                padding: '0.75rem 0.85rem',
                borderRadius: 12,
                border: '1px solid var(--border-light)',
                background: 'var(--bg-white)'
              }}
            >
              <div style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: 'var(--secondary)',
                marginTop: '0.35rem',
                flex: '0 0 auto'
              }} />
              <div style={{ color: 'var(--text-main)', fontWeight: 600 }}>{text}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.25rem' }}>
        <button className="btn btn-outline" type="button" onClick={onLearnMore}>Learn more</button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            showToast('Platinum upgrade started (demo).');
            onClose();
          }}
        >
          Upgrade now
        </button>
      </div>
    </div>
  );
};

const PlatinumLearnMorePanel = ({ onClose, showToast, onUpgrade }) => {
  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
        Platinum Lifetime is designed for sellers who want predictable costs and stronger tools.
      </div>

      <div style={{
        border: '1px solid var(--border-light)',
        background: 'var(--bg-white)',
        borderRadius: 14,
        overflow: 'hidden'
      }}>
        <div style={{ padding: '0.9rem 1rem', borderBottom: '1px solid var(--border-light)', fontWeight: 800, color: 'var(--primary)' }}>
          Highlights
        </div>
        <div style={{ padding: '0.9rem 1rem', display: 'grid', gap: '0.7rem' }}>
          <div><span style={{ fontWeight: 800, color: 'var(--primary)' }}>Fees:</span> Zero listing fees for life (concept)</div>
          <div><span style={{ fontWeight: 800, color: 'var(--primary)' }}>Stores:</span> Create a branded storefront and promote your best items</div>
          <div><span style={{ fontWeight: 800, color: 'var(--primary)' }}>Support:</span> Faster help for account and listing issues</div>
          <div><span style={{ fontWeight: 800, color: 'var(--primary)' }}>Insights:</span> Track performance and optimize listings (demo)</div>
        </div>
      </div>

      <div style={{
        padding: '0.9rem 1rem',
        borderRadius: 14,
        background: '#fff7ed',
        border: '1px solid #fed7aa',
        color: '#9a3412',
        fontSize: '0.95rem'
      }}>
        Tip: If you list often, Platinum can pay for itself quickly.
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', alignItems: 'center', marginTop: '0.25rem' }}>
        <a
          href="#"
          style={{ fontSize: '0.9rem', color: 'var(--secondary)', textDecoration: 'none', fontWeight: 600 }}
          onClick={(e) => {
            e.preventDefault();
            showToast('Opening Platinum FAQ (demo).');
          }}
        >
          Read Platinum FAQ
        </a>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-outline" type="button" onClick={onClose}>Close</button>
          <button className="btn btn-primary" type="button" onClick={onUpgrade}>Upgrade</button>
        </div>
      </div>
    </div>
  );
};

const DailyDealsPanel = ({ deals, onClose, onShopCategory, onViewDeal }) => {
  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
        Today’s top picks across the marketplace. Limited-time prices while inventory lasts.
      </div>

      <div style={{ display: 'grid', gap: '0.75rem', maxHeight: '55vh', overflowY: 'auto', paddingRight: '0.25rem' }}>
        {deals.map((deal) => (
          <div
            key={deal.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '88px 1fr',
              gap: '0.9rem',
              padding: '0.85rem',
              border: '1px solid var(--border-light)',
              borderRadius: 14,
              background: 'var(--bg-white)'
            }}
          >
            <div style={{
              width: 88,
              height: 70,
              borderRadius: 12,
              overflow: 'hidden',
              background: 'var(--bg-light)'
            }}>
              <img src={deal.image} alt={deal.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ display: 'grid', gap: '0.35rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', alignItems: 'start' }}>
                <div style={{ fontWeight: 700, color: 'var(--primary)', lineHeight: 1.2 }}>
                  {deal.title}
                </div>
                <div style={{ fontWeight: 800, color: 'var(--secondary)', whiteSpace: 'nowrap' }}>
                  {deal.price}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{
                  fontSize: '0.78rem',
                  padding: '0.2rem 0.55rem',
                  borderRadius: 999,
                  background: '#fff7ed',
                  border: '1px solid #fed7aa',
                  color: '#9a3412',
                  fontWeight: 700
                }}>
                  {deal.dealTag}
                </span>
                <a
                  href="#"
                  style={{ fontSize: '0.85rem', color: 'var(--secondary)', textDecoration: 'none', fontWeight: 600 }}
                  onClick={(e) => {
                    e.preventDefault();
                    onShopCategory(deal.category);
                  }}
                >
                  {deal.category}
                </a>
              </div>

              <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'flex-end', marginTop: '0.2rem' }}>
                <button className="btn btn-outline" type="button" onClick={() => onViewDeal(deal)}>
                  View
                </button>
                <button className="btn btn-primary" type="button" onClick={() => onShopCategory(deal.category)}>
                  Shop deals
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.25rem' }}>
        <button className="btn btn-outline" type="button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const AuthPanel = ({ onClose, showToast }) => {
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const resetErrors = () => setError('');

  const onSubmit = (e) => {
    e.preventDefault();
    resetErrors();

    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    if (mode === 'register') {
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      showToast(`Account created for ${email}`);
      onClose();
      return;
    }

    showToast(`Signed in as ${email}`);
    onClose();
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
        <button
          className={`btn ${mode === 'signin' ? 'btn-primary' : 'btn-outline'}`}
          type="button"
          onClick={() => {
            setMode('signin');
            setConfirmPassword('');
            resetErrors();
          }}
        >
          Sign In
        </button>
        <button
          className={`btn ${mode === 'register' ? 'btn-primary' : 'btn-outline'}`}
          type="button"
          onClick={() => {
            setMode('register');
            resetErrors();
          }}
        >
          Create Account
        </button>
      </div>

      <form onSubmit={onSubmit}>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          <label style={{ display: 'grid', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              style={{
                padding: '0.75rem 0.9rem',
                borderRadius: 10,
                border: '1px solid var(--border)',
                outline: 'none',
                background: 'var(--bg-light)'
              }}
            />
          </label>

          <label style={{ display: 'grid', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>Password</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder={mode === 'register' ? 'At least 6 characters' : 'Your password'}
              style={{
                padding: '0.75rem 0.9rem',
                borderRadius: 10,
                border: '1px solid var(--border)',
                outline: 'none',
                background: 'var(--bg-light)'
              }}
            />
          </label>

          {mode === 'register' && (
            <label style={{ display: 'grid', gap: '0.35rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>Confirm password</span>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Re-enter password"
                style={{
                  padding: '0.75rem 0.9rem',
                  borderRadius: 10,
                  border: '1px solid var(--border)',
                  outline: 'none',
                  background: 'var(--bg-light)'
                }}
              />
            </label>
          )}

          {error && (
            <div style={{
              padding: '0.75rem 0.9rem',
              borderRadius: 10,
              background: '#fff7ed',
              border: '1px solid #fed7aa',
              color: '#9a3412',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
            <button className="btn btn-outline" type="button" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" type="submit">
              {mode === 'register' ? 'Create Account' : 'Sign In'}
            </button>
          </div>

          {mode === 'signin' && (
            <a
              href="#"
              style={{ fontSize: '0.9rem', color: 'var(--secondary)', textDecoration: 'none' }}
              onClick={(e) => {
                e.preventDefault();
                showToast('Password reset link sent (demo).');
              }}
            >
              Forgot password?
            </a>
          )}
        </div>
      </form>
    </div>
  );
};

// My eBid Dashboard Component
const MyEbidDashboard = ({ cart, wishlist, onClose, showToast }) => {
  const activeBids = mockProducts.slice(0, 3);
  const sellingItems = mockProducts.slice(5, 8);
  const recentViews = mockProducts.slice(10, 13);
  const accountStats = {
    reputation: 4.8,
    feedbackCount: 247,
    sellerLevel: 'Platinum',
    memberSince: 'Jan 15, 2020'
  };

  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      {/* Account Summary */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, #1e293b 100%)',
        borderRadius: 14,
        padding: '1.5rem',
        color: 'white'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <div style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>Username</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>PowerSeller25</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Reputation</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--secondary)' }}>⭐ {accountStats.reputation}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Feedback</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700 }}>{accountStats.feedbackCount}</div>
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: '0.9rem' }}>
            <span style={{ color: '#cbd5e1' }}>Status:</span> <span style={{ fontWeight: 600, color: 'var(--secondary)' }}>{accountStats.sellerLevel}</span>
          </div>
          <div style={{ fontSize: '0.9rem' }}>
            <span style={{ color: '#cbd5e1' }}>Member Since:</span> <span style={{ fontWeight: 600 }}>{accountStats.memberSince}</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <div style={{ padding: '1rem', border: '1px solid var(--border-light)', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--secondary)' }}>{cart.length}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>In Cart</div>
        </div>
        <div style={{ padding: '1rem', border: '1px solid var(--border-light)', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--secondary)' }}>{wishlist.length}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Watchlist</div>
        </div>
        <div style={{ padding: '1rem', border: '1px solid var(--border-light)', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--secondary)' }}>12</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Active Bids</div>
        </div>
        <div style={{ padding: '1rem', border: '1px solid var(--border-light)', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--secondary)' }}>8</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Selling</div>
        </div>
      </div>

      {/* Active Bids */}
      <div style={{ border: '1px solid var(--border-light)', borderRadius: 14, padding: '1rem' }}>
        <h4 style={{ marginBottom: '1rem', color: 'var(--primary)', fontWeight: 700 }}>Your Active Bids (12)</h4>
        <div style={{ display: 'grid', gap: '0.75rem', maxHeight: '25vh', overflowY: 'auto' }}>
          {activeBids.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem',
              border: '1px solid var(--border-light)',
              borderRadius: 10,
              background: 'var(--bg-white)'
            }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '0.9rem' }}>{item.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Your bid: <span style={{ fontWeight: 700, color: 'var(--secondary)' }}>$124.99</span></div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Time left: {item.timeLeft}</div>
                <button 
                  className="btn btn-outline"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', marginTop: '0.25rem' }}
                  onClick={() => showToast(`Updated bid on ${item.title}`)}
                >
                  Change Bid
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selling Items */}
      <div style={{ border: '1px solid var(--border-light)', borderRadius: 14, padding: '1rem' }}>
        <h4 style={{ marginBottom: '1rem', color: 'var(--primary)', fontWeight: 700 }}>Items You're Selling (8)</h4>
        <div style={{ display: 'grid', gap: '0.75rem', maxHeight: '25vh', overflowY: 'auto' }}>
          {sellingItems.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem',
              border: '1px solid var(--border-light)',
              borderRadius: 10,
              background: 'var(--bg-white)'
            }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '0.9rem' }}>{item.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Price: {item.price} • Views: 324</div>
              </div>
              <button 
                className="btn btn-outline"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                onClick={() => showToast(`Viewing stats for ${item.title}`)}
              >
                Stats
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Views */}
      <div style={{ border: '1px solid var(--border-light)', borderRadius: 14, padding: '1rem' }}>
        <h4 style={{ marginBottom: '1rem', color: 'var(--primary)', fontWeight: 700 }}>Recently Viewed</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '1rem' }}>
          {recentViews.map(item => (
            <div key={item.id} style={{
              borderRadius: 10,
              overflow: 'hidden',
              border: '1px solid var(--border-light)',
              cursor: 'pointer'
            }}>
              <img 
                src={item.image} 
                alt={item.title}
                style={{ width: '100%', height: '100px', objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
        <button className="btn btn-outline" onClick={onClose}>Close Dashboard</button>
        <button 
          className="btn btn-primary"
          onClick={() => showToast('Opening Account Settings...')}
        >
          Account Settings
        </button>
      </div>
    </div>
  );
};

// Cart Panel Component
const CartPanel = ({ cartItems, onRemoveItem, onClose, showToast, onCheckout }) => {
  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return sum + (price * (item.quantity || 1));
  }, 0);

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
          <p>Your cart is empty. Start shopping to add items!</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gap: '0.75rem', maxHeight: '50vh', overflowY: 'auto' }}>
            {cartItems.map((item) => (
              <div key={item.id} style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr 80px',
                gap: '1rem',
                padding: '1rem',
                border: '1px solid var(--border-light)',
                borderRadius: 12,
                background: 'var(--bg-white)'
              }}>
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: 8 }} />
                <div style={{ display: 'grid', gap: '0.25rem' }}>
                  <div style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '0.95rem' }}>
                    {item.title}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {item.price} × {item.quantity || 1}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  <div style={{ fontWeight: 700, color: 'var(--secondary)' }}>
                    ${(parseFloat(item.price.replace('$', '')) * (item.quantity || 1)).toFixed(2)}
                  </div>
                  <button 
                    className="btn btn-outline" 
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                    onClick={() => {
                      onRemoveItem(item.id);
                      showToast(`Removed: ${item.title}`);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 700 }}>
              <span>Total:</span>
              <span style={{ color: 'var(--secondary)' }}>${total.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-outline" onClick={onClose}>Continue Shopping</button>
              <button className="btn btn-primary" onClick={() => { onCheckout(); onClose(); }}>Proceed to Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Wishlist Panel Component
const WishlistPanel = ({ wishlistItems, onRemoveItem, onClose, showToast }) => {
  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {wishlistItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
          <p>Your wishlist is empty. Like items to save them for later!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '0.75rem', maxHeight: '60vh', overflowY: 'auto' }}>
          {wishlistItems.map((item) => (
            <div key={item.id} style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr 100px',
              gap: '1rem',
              padding: '1rem',
              border: '1px solid var(--border-light)',
              borderRadius: 12,
              background: 'var(--bg-white)',
              alignItems: 'center'
            }}>
              <img src={item.image} alt={item.title} style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: 8 }} />
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <div style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '0.95rem' }}>
                  {item.title}
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--secondary)' }}>{item.price}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({item.type})</span>
                </div>
              </div>
              <button 
                className="btn btn-outline" 
                style={{ padding: '0.5rem 0.8rem', fontSize: '0.85rem' }}
                onClick={() => {
                  onRemoveItem(item.id);
                  showToast(`Removed from wishlist: ${item.title}`);
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
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
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Handle showing toast that disappears after 3 seconds
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Cart & Wishlist handlers
  const addToCart = (product, e) => {
    e.stopPropagation();
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
      showToast(`Updated ${product.title} in cart`);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      showToast(`Added to cart: ${product.title}`);
    }
  };

  const addToWishlist = (product, e) => {
    e.stopPropagation();
    const isLiked = wishlist.find(item => item.id === product.id);
    if (isLiked) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
      showToast(`Removed from wishlist: ${product.title}`);
    } else {
      setWishlist([...wishlist, product]);
      showToast(`Added to wishlist: ${product.title}`);
    }
  };

  const placeBid = (product, e) => {
    e.stopPropagation();
    showToast(`Bid placed on ${product.title}. Current price: ${product.price}`);
  };

  const buyNow = (product, e) => {
    e.stopPropagation();
    setCart([...cart, { ...product, quantity: 1 }]);
    showToast(`${product.title} added to cart! Ready to checkout.`);
  };

  const openModal = (title, body) => {
    setModalState({ isOpen: true, title, body });
  };

  const closeModal = () => {
    setModalState(s => ({ ...s, isOpen: false }));
  };

  const openAuthModal = () => {
    setModalState({
      isOpen: true,
      title: 'Sign In or Register',
      body: <AuthPanel onClose={closeModal} showToast={showToast} />
    });
  };

  const openPlatinumUpgradeModal = () => {
    const onLearnMore = () => {
      openPlatinumLearnMoreModal();
    };

    setModalState({
      isOpen: true,
      title: 'Upgrade to Platinum',
      body: (
        <PlatinumUpgradePanel
          onClose={closeModal}
          showToast={showToast}
          onLearnMore={onLearnMore}
        />
      )
    });
  };

  const openPlatinumLearnMoreModal = () => {
    const onUpgrade = () => {
      openPlatinumUpgradeModal();
    };

    setModalState({
      isOpen: true,
      title: 'About eBid Platinum',
      body: (
        <PlatinumLearnMorePanel
          onClose={closeModal}
          showToast={showToast}
          onUpgrade={onUpgrade}
        />
      )
    });
  };

  const openDailyDealsModal = () => {
    const deals = mockProducts.slice(0, 6).map((p, idx) => ({
      ...p,
      dealTag: idx % 2 === 0 ? 'Hot Deal' : 'Today Only'
    }));

    const onShopCategory = (category) => {
      closeModal();
      setActiveCategory(category);
      setSearchQuery('');
      window.scrollTo({ top: document.querySelector('.products-grid').offsetTop - 100, behavior: 'smooth' });
      showToast(`Showing Daily Deals in ${category}`);
    };

    const onViewDeal = (deal) => {
      showToast(`Viewing deal: ${deal.title}`);
    };

    setModalState({
      isOpen: true,
      title: 'Daily Deals',
      body: (
        <DailyDealsPanel
          deals={deals}
          onClose={closeModal}
          onShopCategory={onShopCategory}
          onViewDeal={onViewDeal}
        />
      )
    });
  };

  // Filter products by category AND search query
  const filteredProducts = mockProducts.filter(p => {
    const matchesCategory = activeCategory === "All Categories" || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter(item => item.id !== productId));
  };

  const openCartModal = () => {
    setModalState({
      isOpen: true,
      title: 'Shopping Cart',
      body: (
        <CartPanel 
          cartItems={cart}
          onRemoveItem={removeFromCart}
          onClose={closeModal}
          showToast={showToast}
          onCheckout={() => showToast('Proceeding to checkout! (demo)')}
        />
      )
    });
  };

  const openWishlistModal = () => {
    setModalState({
      isOpen: true,
      title: 'Your Wishlist',
      body: (
        <WishlistPanel 
          wishlistItems={wishlist}
          onRemoveItem={removeFromWishlist}
          onClose={closeModal}
          showToast={showToast}
        />
      )
    });
  };

  const openDashboardModal = () => {
    setModalState({
      isOpen: true,
      title: 'My eBid Dashboard',
      body: (
        <MyEbidDashboard
          cart={cart}
          wishlist={wishlist}
          onClose={closeModal}
          showToast={showToast}
        />
      )
    });
  };

  return (
    <div className="app">
      {/* Utility Bar */}
      <div className="utility-bar">
        <div className="utility-links">
          <a href="#" onClick={(e) => { e.preventDefault(); openAuthModal(); }}>Hi, Sign In or Register</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openDailyDealsModal(); }}>Daily Deals</a>
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
           <button className="icon-btn" onClick={openDashboardModal}>
             <DashIcon />
             <span>My eBid</span>
           </button>
           <button className="icon-btn" onClick={openWishlistModal}>
             <HeartIcon />
             <span>Wishlist ({wishlist.length})</span>
           </button>
           <button className="icon-btn" onClick={() => openModal('Alerts & Notifications', 'You have no new notifications at this time.')}>
             <BellIcon />
             <span>Alerts</span>
           </button>
           <button className="icon-btn" onClick={openCartModal}>
             <CartIcon />
             <span>Cart ({cart.length})</span>
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
              <button className="btn btn-primary" onClick={openPlatinumUpgradeModal}>Upgrade to Platinum</button>
              <button className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }} onClick={openPlatinumLearnMoreModal}>Learn More</button>
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
             <div key={product.id} className="product-card">
               <div className={`product-badge ${product.type === 'Auction' ? 'badge-auction' : 'badge-fixed'}`}>
                 {product.type}
               </div>
               <div className="product-image">
                 <img src={product.image} alt={product.title} onClick={() => openModal(product.title, `You are viewing ${product.title}. It is currently listed for ${product.price} as a ${product.type} listing.`)} style={{cursor: 'pointer'}} />
               </div>
               <div className="product-content">
                  <h3 className="product-title" onClick={() => openModal(product.title, `You are viewing ${product.title}. It is currently listed for ${product.price} as a ${product.type} listing.`)} style={{cursor: 'pointer'}}>{product.title}</h3>
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
                  <div className="product-actions">
                     <button 
                       className="product-btn product-btn-wishlist" 
                       onClick={(e) => addToWishlist(product, e)}
                       title={wishlist.find(item => item.id === product.id) ? "Remove from wishlist" : "Add to wishlist"}
                     >
                       <HeartIcon /> {wishlist.find(item => item.id === product.id) ? "Liked" : "Like"}
                     </button>
                     {product.type === 'Auction' ? (
                       <button className="product-btn product-btn-primary" onClick={(e) => placeBid(product, e)}>
                         Place Bid
                       </button>
                     ) : (
                       <div style={{ display: 'flex', gap: '0.75rem' }}>
                         <button className="product-btn product-btn-secondary" onClick={(e) => addToCart(product, e)}>
                           <CartIcon /> Cart
                         </button>
                         <button className="product-btn product-btn-primary" style={{ flex: 1 }} onClick={(e) => buyNow(product, e)}>
                           Buy Now
                         </button>
                       </div>
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
