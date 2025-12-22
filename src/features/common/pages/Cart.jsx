import { useCart } from "../../../context/CartContext";
import { getProductImage } from "../../../utils/imageUtils";

const Cart = () => {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        totalPrice
    } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2"> Start Shopping 🛒</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added any items to the cart yet.</p>
                <a href="/" className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl">
                    Start Shopping
                </a>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                Shopping Cart
                <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{cartItems.length} items</span>
            </h2>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="divide-y divide-gray-100">
                    {cartItems.map(item => (
                        <div key={item.id} className="p-6 flex gap-6 items-center flex-col sm:flex-row">
                            {/* Product Image */}
                            <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                                <img
                                    src={item.images?.[0] || getProductImage(item.id, item.name)}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 text-center sm:text-left">
                                <h4 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h4>
                                <p className="text-purple-600 font-bold">{item.price} EGP</p>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center gap-6">
                                <div className="flex items-center bg-gray-50 rounded-lg p-1">
                                    <button
                                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-white rounded-md transition-colors"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.id, Math.max(1, Number(e.target.value)))}
                                        className="w-12 text-center bg-transparent border-none focus:ring-0 text-gray-900 font-medium"
                                    />
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-white rounded-md transition-colors"
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors p-2"
                                    title="Remove item"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="bg-gray-50 p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="text-center sm:text-left">
                        <p className="text-gray-500 mb-1">Total Amount</p>
                        <h3 className="text-3xl font-bold text-gray-900">{totalPrice.toLocaleString()} EGP</h3>
                    </div>

                    <button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                        Proceed to Checkout
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
