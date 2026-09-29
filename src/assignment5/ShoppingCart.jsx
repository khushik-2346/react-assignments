import { useReducer, useState } from "react";
import "./ShoppingCart.css";

// Sample catalog of products
const PRODUCTS = [
  { id: 1, name: "Organic Brown Basmati Rice", price: 180, category: "Grains", emoji: "🌾" },
  { id: 2, name: "Cold Pressed Mustard Oil", price: 240, category: "Oils", emoji: "🫒" },
  { id: 3, name: "Farm Fresh Honey (500g)", price: 320, category: "Organic", emoji: "🍯" },
  { id: 4, name: "Roasted Almonds (250g)", price: 390, category: "Nuts", emoji: "🥜" },
  { id: 5, name: "Whole Wheat Atta (5kg)", price: 295, category: "Staples", emoji: "🍞" },
  { id: 6, name: "Artisanal Green Tea (100g)", price: 210, category: "Beverages", emoji: "🍵" },
];

// Valid coupons and their discount percentages
const VALID_COUPONS = {
  SAVE10: 10,
  FARM20: 20,
  WELCOME15: 15,
};

// Initial state for useReducer
const initialState = {
  cart: [],
  appliedCoupon: null,
  discountPercent: 0,
};

// Reducer function handling cart actions
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.cart.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== id),
        };
      }
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }

    case "APPLY_COUPON":
      return {
        ...state,
        appliedCoupon: action.payload.code,
        discountPercent: action.payload.percent,
      };

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
}

export default function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  // Subtotal calculation
  const subtotal = state.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Discount calculation
  const discountAmount = (subtotal * state.discountPercent) / 100;
  const priceAfterDiscount = subtotal - discountAmount;

  // 18% GST calculation
  const gstAmount = priceAfterDiscount > 0 ? priceAfterDiscount * 0.18 : 0;

  // Grand Total calculation
  const grandTotal = priceAfterDiscount + gstAmount;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const cleanCode = couponInput.trim().toUpperCase();

    if (!cleanCode) return;

    if (VALID_COUPONS[cleanCode]) {
      dispatch({
        type: "APPLY_COUPON",
        payload: {
          code: cleanCode,
          percent: VALID_COUPONS[cleanCode],
        },
      });
      setCouponError("");
      setCouponInput("");
    } else {
      setCouponError("Invalid coupon code! Try SAVE10, FARM20, or WELCOME15.");
    }
  };

  return (
    <div className="cart-app">
      {/* Header */}
      <header className="cart-header">
        <h1>Online Shopping Cart</h1>
        <p>State Management using React useReducer Hook</p>
      </header>

      <div className="shop-layout">
        {/* Product Catalog */}
        <section>
          <div className="section-title">
            <span>Available Products</span>
            <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
              {PRODUCTS.length} items
            </span>
          </div>

          <div className="products-grid">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-emoji">{product.emoji}</div>
                <div className="product-category">{product.category}</div>
                <div className="product-name">{product.name}</div>
                <div className="product-price">₹{product.price}</div>
                <button
                  className="btn-add-cart"
                  onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Shopping Cart & Billing Breakdown */}
        <section className="cart-panel">
          <div className="section-title">
            <span>Your Cart</span>
            <span style={{ fontSize: "0.85rem", color: "#34d399" }}>
              {state.cart.reduce((total, item) => total + item.quantity, 0)} items
            </span>
          </div>

          {state.cart.length === 0 ? (
            <div className="empty-cart-msg">Your shopping cart is currently empty.</div>
          ) : (
            <>
              {/* Cart Items List */}
              <div className="cart-items-list">
                {state.cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-price">
                        ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                      </div>
                    </div>

                    <div className="quantity-controls">
                      <button
                        className="btn-qty"
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_QUANTITY",
                            payload: { id: item.id, quantity: item.quantity - 1 },
                          })
                        }
                      >
                        -
                      </button>
                      <span className="qty-display">{item.quantity}</span>
                      <button
                        className="btn-qty"
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_QUANTITY",
                            payload: { id: item.id, quantity: item.quantity + 1 },
                          })
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="btn-remove"
                      title="Remove item"
                      onClick={() =>
                        dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
                      }
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="coupon-section">
                <input
                  type="text"
                  className="coupon-input"
                  placeholder="Coupon (e.g. SAVE10, FARM20)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                />
                <button type="submit" className="btn-apply-coupon">
                  Apply
                </button>
              </form>

              {couponError && (
                <div style={{ color: "#f87171", fontSize: "0.8rem", marginBottom: "0.75rem" }}>
                  {couponError}
                </div>
              )}

              {state.appliedCoupon && (
                <div className="coupon-badge">
                  ✓ Coupon <strong>{state.appliedCoupon}</strong> Applied ({state.discountPercent}% OFF)
                </div>
              )}

              {/* Bill Summary */}
              <div className="bill-summary">
                <div className="bill-row">
                  <span>Cart Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                {state.discountPercent > 0 && (
                  <div className="bill-row discount">
                    <span>Coupon Discount ({state.discountPercent}%)</span>
                    <span>- ₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="bill-row">
                  <span>GST (18%)</span>
                  <span>₹{gstAmount.toFixed(2)}</span>
                </div>

                <div className="bill-row total">
                  <span>Grand Total</span>
                  <span style={{ color: "#38bdf8" }}>₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}