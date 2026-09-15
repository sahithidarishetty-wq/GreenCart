// ==========================================
// GREENCART JAVASCRIPT
// ==========================================


// ==========================================
// PRODUCT DATA
// ==========================================

const products = [

    {
        id: 1,
        name: "Bamboo Water Bottle",
        price: 499,
        category: "Home",
        icon: "🥤",
        rating: 4.5
    },

    {
        id: 2,
        name: "Organic Cotton Bag",
        price: 299,
        category: "Bags",
        icon: "👜",
        rating: 4.7
    },

    {
        id: 3,
        name: "Indoor Plant",
        price: 349,
        category: "Plants",
        icon: "🌱",
        rating: 4.8
    },

    {
        id: 4,
        name: "Bamboo Toothbrush",
        price: 149,
        category: "Personal Care",
        icon: "🪥",
        rating: 4.4
    },

    {
        id: 5,
        name: "Recycled Notebook",
        price: 199,
        category: "Stationery",
        icon: "📓",
        rating: 4.6
    },

    {
        id: 6,
        name: "Reusable Coffee Cup",
        price: 399,
        category: "Home",
        icon: "☕",
        rating: 4.5
    },

    {
        id: 7,
        name: "Eco Lunch Box",
        price: 599,
        category: "Home",
        icon: "🍱",
        rating: 4.7
    },

    {
        id: 8,
        name: "Jute Shopping Bag",
        price: 249,
        category: "Bags",
        icon: "🛍️",
        rating: 4.3
    },

    {
        id: 9,
        name: "Aloe Vera Plant",
        price: 299,
        category: "Plants",
        icon: "🪴",
        rating: 4.8
    },

    {
        id: 10,
        name: "Natural Soap",
        price: 179,
        category: "Personal Care",
        icon: "🧼",
        rating: 4.4
    },

    {
        id: 11,
        name: "Bamboo Pen Set",
        price: 199,
        category: "Stationery",
        icon: "🖊️",
        rating: 4.2
    },

    {
        id: 12,
        name: "Solar Garden Light",
        price: 799,
        category: "Home",
        icon: "🔆",
        rating: 4.6
    }

];


// ==========================================
// CART
// ==========================================

let cart = JSON.parse(
    localStorage.getItem("greenCart")
) || [];


// Save cart

function saveCart() {

    localStorage.setItem(
        "greenCart",
        JSON.stringify(cart)
    );

}


// Update cart count

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) return;

    let count = 0;

    cart.forEach(item => {

        count += item.quantity;

    });

    cartCount.textContent = count;

}


// Add product

function addToCart(productId) {

    const product = products.find(
        p => p.id === productId
    );

    if (!product) return;


    const existing =
        cart.find(item => item.id === productId);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            icon: product.icon,

            quantity: 1

        });

    }


    saveCart();

    updateCartCount();


    alert(
        product.name +
        " added to cart!"
    );

}


// Remove product

function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    saveCart();

    displayCart();

    updateCartCount();

}


// Increase quantity

function increaseQuantity(productId) {

    const item =
        cart.find(item => item.id === productId);

    if (item) {

        item.quantity++;

    }

    saveCart();

    displayCart();

    updateCartCount();

}


// Decrease quantity

function decreaseQuantity(productId) {

    const item =
        cart.find(item => item.id === productId);

    if (!item) return;


    if (item.quantity > 1) {

        item.quantity--;

    } else {

        removeFromCart(productId);

        return;

    }


    saveCart();

    displayCart();

    updateCartCount();

}


// Calculate total

function calculateTotal() {

    let total = 0;

    cart.forEach(item => {

        total +=
            item.price * item.quantity;

    });

    return total;

}


// ==========================================
// DISPLAY PRODUCTS
// ==========================================

function displayProducts(productList = products) {

    const container =
        document.getElementById(
            "productContainer"
        );

    if (!container) return;


    if (productList.length === 0) {

        container.innerHTML = `
            <div class="no-products">
                <h2>No products found</h2>
                <p>Try another search or category.</p>
            </div>
        `;

        return;

    }


    container.innerHTML =
        productList.map(product => `

        <div class="product-card">

            <div class="product-image">
                ${product.icon}
            </div>

            <div class="product-info">

                <span class="category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p class="rating">
                    ⭐ ${product.rating}
                </p>

                <div class="product-bottom">

                    <span class="price">
                        ₹${product.price}
                    </span>

                    <button
                        class="cart-btn"
                        onclick="addToCart(${product.id})"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        </div>

    `).join("");

}


// ==========================================
// FILTER PRODUCTS
// ==========================================

function filterProducts() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    const categoryFilter =
        document.getElementById(
            "categoryFilter"
        );

    const priceFilter =
        document.getElementById(
            "priceFilter"
        );


    if (
        !searchInput ||
        !categoryFilter ||
        !priceFilter
    ) return;


    const search =
        searchInput.value.toLowerCase();


    const category =
        categoryFilter.value;


    const maxPrice =
        priceFilter.value;


    const filtered =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =
                category === "All" ||
                product.category === category;


            const matchesPrice =
                maxPrice === "All" ||
                product.price <= Number(maxPrice);


            return (
                matchesSearch &&
                matchesCategory &&
                matchesPrice
            );

        });


    displayProducts(filtered);

}


// ==========================================
// CART DISPLAY
// ==========================================

function displayCart() {

    const container =
        document.getElementById(
            "cartContainer"
        );

    const summary =
        document.getElementById(
            "cartSummary"
        );


    if (!container) return;


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <div class="empty-icon">
                    🛒
                </div>

                <h2>Your cart is empty</h2>

                <p>
                    Add some sustainable products
                    to your cart.
                </p>

                <br>

                <a
                    href="products.html"
                    class="btn"
                >
                    Start Shopping
                </a>

            </div>

        `;


        if (summary) {

            summary.innerHTML = "";

        }

        return;

    }


    container.innerHTML =
        cart.map(item => `

        <div class="cart-item">

            <div class="cart-product">

                <div class="cart-icon">
                    ${item.icon}
                </div>

                <div>

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ₹${item.price}
                    </p>

                </div>

            </div>


            <div class="quantity">

                <button
                    onclick="decreaseQuantity(${item.id})"
                >
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="increaseQuantity(${item.id})"
                >
                    +
                </button>

            </div>


            <div class="item-total">

                ₹${item.price * item.quantity}

            </div>


            <button
                class="remove-btn"
                onclick="removeFromCart(${item.id})"
            >
                Remove
            </button>

        </div>

    `).join("");


    const subtotal =
        calculateTotal();


    const delivery =
        subtotal >= 500 ? 0 : 50;


    const total =
        subtotal + delivery;


    summary.innerHTML = `

        <h2>Order Summary</h2>

        <div class="summary-row">

            <span>Subtotal</span>

            <span>₹${subtotal}</span>

        </div>

        <div class="summary-row">

            <span>Delivery</span>

            <span>
                ${delivery === 0
                    ? "FREE"
                    : "₹" + delivery}
            </span>

        </div>

        <hr>

        <div class="summary-row total-row">

            <strong>Total</strong>

            <strong>₹${total}</strong>

        </div>

        <button
            class="btn checkout-btn"
            onclick="checkout()"
        >
            Proceed to Checkout
        </button>

    `;

}


// ==========================================
// CHECKOUT
// ==========================================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    alert(
        "Thank you for shopping with GreenCart! " +
        "Your order has been placed successfully."
    );


    cart = [];

    saveCart();

    displayCart();

    updateCartCount();

}


// ==========================================
// REGISTER
// ==========================================

const registerForm =
    document.getElementById(
        "registerForm"
    );


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "registerName"
                ).value.trim();


            const email =
                document.getElementById(
                    "registerEmail"
                ).value.trim();


            const phone =
                document.getElementById(
                    "registerPhone"
                ).value.trim();


            const password =
                document.getElementById(
                    "registerPassword"
                ).value;


            const confirmPassword =
                document.getElementById(
                    "confirmPassword"
                ).value;


            if (
                password !==
                confirmPassword
            ) {

                alert(
                    "Passwords do not match."
                );

                return;

            }


            if (password.length < 6) {

                alert(
                    "Password must contain at least 6 characters."
                );

                return;

            }


            const user = {

                name: name,

                email: email,

                phone: phone,

                password: password

            };


            localStorage.setItem(
                "greenCartUser",
                JSON.stringify(user)
            );


            alert(
                "Account created successfully!"
            );


            window.location.href =
                "login.html";

        }
    );

}


// ==========================================
// LOGIN
// ==========================================

const loginForm =
    document.getElementById(
        "loginForm"
    );


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document.getElementById(
                    "loginEmail"
                ).value.trim();


            const password =
                document.getElementById(
                    "loginPassword"
                ).value;


            const storedUser =
                JSON.parse(
                    localStorage.getItem(
                        "greenCartUser"
                    )
                );


            if (!storedUser) {

                alert(
                    "No account found. Please register first."
                );

                return;

            }


            if (
                email === storedUser.email &&
                password === storedUser.password
            ) {

                alert(
                    "Login successful!"
                );


                localStorage.setItem(
                    "greenCartLoggedIn",
                    "true"
                );


                window.location.href =
                    "index.html";

            } else {

                alert(
                    "Invalid email or password."
                );

            }

        }
    );

}


// ==========================================
// CONTACT FORM
// ==========================================

const contactForm =
    document.getElementById(
        "contactForm"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            alert(
                "Thank you! Your message has been sent."
            );


            contactForm.reset();

        }
    );

}


// ==========================================
// EVENT LISTENERS
// ==========================================

const searchInput =
    document.getElementById(
        "searchInput"
    );

const categoryFilter =
    document.getElementById(
        "categoryFilter"
    );

const priceFilter =
    document.getElementById(
        "priceFilter"
    );


if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterProducts
    );

}


if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filterProducts
    );

}


if (priceFilter) {

    priceFilter.addEventListener(
        "change",
        filterProducts
    );

}


// ==========================================
// INITIALIZE
// ==========================================

displayProducts();

displayCart();

updateCartCount();