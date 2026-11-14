
import { useMemo, useState } from "react";
import "./App.css";

const foods = [
  {
    id: 1,
    name: "Jollof Rice & Grilled Chicken",
    category: "Rice",
    price: 6500,
    description: "Smoky Nigerian jollof rice with grilled chicken.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700",
    tag: "Bestseller",
    rating: "4.9",
  },
  {
    id: 2,
    name: "Special Fried Rice",
    category: "Rice",
    price: 5500,
    description: "Delicious fried rice with fresh vegetables.",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=700",
    tag: "Popular",
    rating: "4.8",
  },
  {
    id: 3,
    name: "Grilled Chicken",
    category: "Chicken",
    price: 7500,
    description: "Juicy, seasoned and perfectly grilled chicken.",
    image:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=700",
    tag: "Chef's choice",
    rating: "4.9",
  },
  {
    id: 4,
    name: "Classic Beef Burger",
    category: "Fast Food",
    price: 6000,
    description: "Fresh burger with beef, cheese and vegetables.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700",
    tag: "Popular",
    rating: "4.7",
  },
  {
    id: 5,
    name: "Chicken Pizza",
    category: "Fast Food",
    price: 8500,
    description: "Loaded pizza with chicken and melted cheese.",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700",
    tag: "Favourite",
    rating: "4.8",
  },
  {
    id: 6,
    name: "Fresh Garden Salad",
    category: "Healthy",
    price: 4000,
    description: "Fresh vegetables with a delicious dressing.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700",
    tag: "Fresh",
    rating: "4.6",
  },
  {
    id: 7,
    name: "Chicken & Chips",
    category: "Chicken",
    price: 7000,
    description: "Crispy chicken served with golden fries.",
    image:
      "https://images.unsplash.com/photo-1562967914-608f82629710?w=700",
    tag: "Popular",
    rating: "4.8",
  },
  {
    id: 8,
    name: "Fresh Fruit Bowl",
    category: "Healthy",
    price: 3500,
    description: "A refreshing selection of fresh fruits.",
    image:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=700",
    tag: "Fresh",
    rating: "4.7",
  },
];

const categories = [
  { name: "All", icon: "✦" },
  { name: "Rice", icon: "🍚" },
  { name: "Chicken", icon: "🍗" },
  { name: "Fast Food", icon: "🍔" },
  { name: "Healthy", icon: "🥗" },
];

function formatPrice(amount) {
  return "₦" + amount.toLocaleString("en-NG");
}

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "Cash on Delivery",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const filteredFoods = foods.filter((food) => {
    const matchesCategory =
      activeCategory === "All" ||
      food.category === activeCategory;

    const matchesSearch =
      food.name.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = subtotal > 0 ? 1000 : 0;
  const total = subtotal + deliveryFee;

  const featuredFoods = useMemo(
    () => foods.filter((food) => food.tag === "Bestseller" || food.tag === "Chef's choice"),
    []
  );

  function addToCart(food) {
    setCart((previousCart) => {
      const existing = previousCart.find(
        (item) => item.id === food.id
      );

      if (existing) {
        return previousCart.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...food, quantity: 1 }];
    });

    setOrderPlaced(false);
  }

  function changeQuantity(id, amount) {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function placeOrder(event) {
    event.preventDefault();

    if (!cart.length) return;

    setOrderPlaced(true);
    setCheckoutOpen(false);
    setCartOpen(false);
  }

  function closeOrderMessage() {
    setOrderPlaced(false);
    setCart([]);
    setCustomer({
      name: "",
      phone: "",
      address: "",
      payment: "Cash on Delivery",
    });
  }

  return (
    <div className="app">

      {/* HEADER */}

      <header className="header">
        <a href="#home" className="brand">
          <span className="brand-mark">P</span>
          <span>
            <strong>PELE'S PLACE</strong>
            <small>GOOD FOOD. GREAT MOMENTS.</small>
          </span>
        </a>

        <nav className="desktop-nav">
          {["Home", "Explore", "About"].map((nav) => (
            <a
              key={nav}
              href={nav === "Home" ? "#home" : nav === "Explore" ? "#menu" : "#about"}
              className={activeNav === nav ? "nav-link active" : "nav-link"}
              onClick={() => setActiveNav(nav)}
            >
              {nav}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="cart-button"
            onClick={() => setCartOpen(true)}
          >
            <span>♧</span>
            <span className="cart-label">My Cart</span>
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </header>

      {/* MAIN */}

      <main id="home">

        {/* LOCATION */}

        <div className="location-bar">
          <div>
            <span className="location-icon">⌖</span>
            <span className="location-caption">Delivering to</span>
            <strong>Otuoke, Bayelsa</strong>
          </div>
          <span className="delivery-status">● Accepting orders</span>
        </div>

        {/* HERO */}

        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">WELCOME TO PELE'S PLACE</span>

            <h1>
              Your cravings.
              <br />
              <span>Our passion.</span>
            </h1>

            <p>
              Delicious meals, freshly prepared and delivered
              straight to your doorstep.
            </p>

            <a href="#menu" className="primary-button">
              Explore our menu <span>↗</span>
            </a>

            <div className="hero-features">
              <span>✦ Freshly prepared</span>
              <span>✦ Quality ingredients</span>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1000"
              alt="Freshly prepared restaurant meal"
            />
            <div className="hero-image-label">
              <span>✦</span>
              Made with passion
            </div>
          </div>

          <div className="hero-decoration"></div>
        </section>

        {/* SEARCH */}

        <section className="search-section">
          <div>
            <span className="eyebrow">WHAT ARE YOU CRAVING?</span>
            <h2>Find your favourite meal.</h2>
          </div>

          <div className="search-box">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search rice, chicken, burgers..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            {search && (
              <button onClick={() => setSearch("")}>✕</button>
            )}
          </div>
        </section>

        {/* CATEGORIES */}

        <section className="category-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">EXPLORE</span>
              <h2>What sounds good?</h2>
            </div>
          </div>

          <div className="category-list">
            {categories.map((category) => (
              <button
                key={category.name}
                className={
                  activeCategory === category.name
                    ? "category-chip selected"
                    : "category-chip"
                }
                onClick={() => setActiveCategory(category.name)}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {/* PROMOTION */}

        <section className="promotion">
          <div className="promotion-content">
            <span className="eyebrow">A LITTLE SOMETHING SPECIAL</span>
            <h2>Good food deserves<br />great moments.</h2>
            <p>Discover delicious meals made with care.</p>
            <a href="#menu" className="promotion-link">
              Discover our menu ↗
            </a>
          </div>
          <div className="promotion-image">
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800"
              alt="Delicious grilled food"
            />
          </div>
        </section>

        {/* POPULAR FOOD */}

        <section className="menu-section" id="menu">
          <div className="section-heading">
            <div>
              <span className="eyebrow">MADE FOR YOU</span>
              <h2>Popular right now</h2>
              <p>Our customers' favourite picks.</p>
            </div>

            <a href="#all-food" className="view-all">
              View all meals ↗
            </a>
          </div>

          <div className="food-grid">
            {featuredFoods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                addToCart={addToCart}
              />
            ))}
          </div>
        </section>

        {/* FULL MENU */}

        <section className="menu-section all-food-section" id="all-food">
          <div className="section-heading">
            <div>
              <span className="eyebrow">THE GOOD STUFF</span>
              <h2>Explore our menu</h2>
              <p>Something delicious for every craving.</p>
            </div>
          </div>

          <div className="food-grid">
            {filteredFoods.length > 0 ? (
              filteredFoods.map((food) => (
                <FoodCard
                  key={food.id}
                  food={food}
                  addToCart={addToCart}
                />
              ))
            ) : (
              <div className="empty-search">
                <span>⌕</span>
                <h3>No meals found</h3>
                <p>Try another search or food category.</p>
                <button
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                  }}
                >
                  Show all meals
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ABOUT */}

        <section className="about-section" id="about">
          <div>
            <span className="eyebrow">OUR PROMISE</span>
            <h2>Good food.<br /><span>Made with care.</span></h2>
            <p>
              At Pele's Place, every meal is prepared with
              attention to flavour, freshness and quality.
              We're here to make your food experience special.
            </p>
          </div>
          <div className="about-badge">
            <span>✦</span>
            <strong>PELE'S</strong>
            <small>MADE WITH LOVE</small>
          </div>
        </section>

      </main>

      {/* FOOTER */}

      <footer className="footer">
        <div className="brand footer-brand">
          <span className="brand-mark">P</span>
          <span>
            <strong>PELE'S PLACE</strong>
            <small>GOOD FOOD. GREAT MOMENTS.</small>
          </span>
        </div>
        <p>© 2026 Pele's Place. All rights reserved.</p>
        <span>Made for food lovers in Otuoke.</span>
      </footer>

      {/* MOBILE BOTTOM NAV */}

      <nav className="mobile-nav">
        <a href="#home" onClick={() => setActiveNav("Home")}>
          <span>⌂</span>Home
        </a>
        <a href="#menu" onClick={() => setActiveNav("Explore")}>
          <span>▦</span>Explore
        </a>
        <button onClick={() => setCartOpen(true)}>
          <span>♧</span>Cart ({cartCount})
        </button>
        <a href="#about">
          <span>♡</span>About
        </a>
      </nav>

      {/* CART DRAWER */}

      {cartOpen && (
        <div className="overlay" onClick={() => setCartOpen(false)}>
          <div
            className="cart-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawer-header">
              <div>
                <span className="eyebrow">YOUR SELECTION</span>
                <h2>Your shopping cart</h2>
              </div>
              <button
                className="close-button"
                onClick={() => setCartOpen(false)}
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <span>♧</span>
                <h3>Your cart is waiting</h3>
                <p>Add some delicious meals to get started.</p>
                <button
                  className="primary-button"
                  onClick={() => setCartOpen(false)}
                >
                  Explore menu
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-info">
                        <h4>{item.name}</h4>
                        <strong>{formatPrice(item.price)}</strong>
                        <div className="quantity-control">
                          <button onClick={() => changeQuantity(item.id, -1)}>
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => changeQuantity(item.id, 1)}>
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div>
                    <span>Subtotal</span>
                    <strong>{formatPrice(subtotal)}</strong>
                  </div>
                  <div>
                    <span>Delivery fee</span>
                    <strong>{formatPrice(deliveryFee)}</strong>
                  </div>
                  <div className="total-row">
                    <span>Total</span>
                    <strong>{formatPrice(total)}</strong>
                  </div>
                  <button
                    className="primary-button checkout-button"
                    onClick={() => {
                      setCartOpen(false);
                      setCheckoutOpen(true);
                    }}
                  >
                    Proceed to checkout ↗
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* CHECKOUT */}

      {checkoutOpen && (
        <div className="overlay" onClick={() => setCheckoutOpen(false)}>
          <form
            className="checkout-modal"
            onSubmit={placeOrder}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawer-header">
              <div>
                <span className="eyebrow">ALMOST THERE</span>
                <h2>Complete your order</h2>
              </div>
              <button
                type="button"
                className="close-button"
                onClick={() => setCheckoutOpen(false)}
              >
                ✕
              </button>
            </div>

            <label>
              Full name
              <input
                required
                value={customer.name}
                onChange={(e) =>
                  setCustomer({ ...customer, name: e.target.value })
                }
                placeholder="Enter your full name"
              />
            </label>

            <label>
              Phone number
              <input
                required
                type="tel"
                value={customer.phone}
                onChange={(e) =>
                  setCustomer({ ...customer, phone: e.target.value })
                }
                placeholder="Enter your phone number"
              />
            </label>

            <label>
              Delivery address
              <textarea
                required
                value={customer.address}
                onChange={(e) =>
                  setCustomer({ ...customer, address: e.target.value })
                }
                placeholder="Enter your full delivery address"
              />
            </label>

            <label>
              Payment method
              <select
                value={customer.payment}
                onChange={(e) =>
                  setCustomer({ ...customer, payment: e.target.value })
                }
              >
                <option>Cash on Delivery</option>
                <option>Bank Transfer</option>
                <option>Online Payment</option>
              </select>
            </label>

            <div className="checkout-total">
              <span>Order total</span>
              <strong>{formatPrice(total)}</strong>
            </div>

            <button type="submit" className="primary-button checkout-button">
              Place order
            </button>

            <p className="checkout-note">
              Payment processing and order submission will be connected
              to the restaurant backend in the next development stage.
            </p>
          </form>
        </div>
      )}

      {/* ORDER MESSAGE */}

      {orderPlaced && (
        <div className="overlay">
          <div className="success-modal">
            <span className="success-icon">✓</span>
            <span className="eyebrow">ORDER DETAILS CAPTURED</span>
            <h2>Thank you, {customer.name}!</h2>
            <p>
              Your order details have been collected in this demo.
              The live restaurant order system is not connected yet.
            </p>
            <button
              className="primary-button"
              onClick={closeOrderMessage}
            >
              Continue shopping
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

function FoodCard({ food, addToCart }) {
  return (
    <article className="food-card">
      <div className="food-image">
        <img src={food.image} alt={food.name} loading="lazy" />
        <span className="food-tag">{food.tag}</span>
        <span className="food-rating">★ {food.rating}</span>
      </div>

      <div className="food-info">
        <span className="food-category">{food.category}</span>
        <h3>{food.name}</h3>
        <p>{food.description}</p>

        <div className="food-bottom">
          <strong>{formatPrice(food.price)}</strong>
          <button
            onClick={() => addToCart(food)}
            aria-label={`Add ${food.name} to cart`}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}

export default App;
