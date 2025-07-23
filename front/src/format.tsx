front/
├── public/                     # Các tài nguyên tĩnh (logo, favicon, v.v.)
├── src/
│   ├── assets/                 # Tài nguyên tĩnh (hình ảnh, font, v.v.)
│   ├── components/             # Các component tái sử dụng
│   │   ├── common/             # Component chung (Button, Input, Modal, v.v.)
│   │   ├── layout/             # Component bố cục (Header, Footer, Sidebar, v.v.)
│   │   ├── product/            # Component liên quan đến sản phẩm (ProductCard, ProductList, v.v.)
│   │   ├── cart/               # Component liên quan đến giỏ hàng (CartItem, CartSummary, v.v.)
│   │   ├── order/              # Component liên quan đến đơn hàng (OrderSummary, OrderItem, v.v.)
│   │   ├── review/             # Component liên quan đến đánh giá (ReviewForm, ReviewList, v.v.)
│   │   ├── wishlist/           # Component liên quan đến wishlist (WishlistItem, WishlistList, v.v.)
│   ├── pages/                  # Các trang (page components)
│   │   ├── public/             # Trang công khai (Home, ProductDetail, Category, v.v.)
│   │   ├── auth/               # Trang xác thực (Login, Register, v.v.)
│   │   ├── user/               # Trang cho người dùng (Profile, Cart, Orders, Wishlist, v.v.)
│   │   ├── admin/              # Trang cho admin (ManageProducts, ManageOrders, v.v.)
│   ├── services/               # Các hàm gọi API (tương ứng với backend endpoints)
│   ├── hooks/                  # Custom hooks (useAuth, useProducts, v.v.)
│   ├── types/                  # TypeScript interfaces và types (User, Product, Cart, v.v.)
│   ├── utils/                  # Các hàm tiện ích (formatPrice, handleError, v.v.)
│   ├── context/                # React Context (AuthContext, CartContext, v.v.)
│   ├── routes/                 # Cấu hình router (React Router)
│   ├── App.tsx                 # Component chính (chứa router)
│   ├── main.tsx                # Entry point (render App)
│   ├── index.css               # CSS toàn cục
├── eslint.config.js            # Cấu hình ESLint
├── package.json                # Phụ thuộc và scripts
├── tsconfig.json               # Cấu hình TypeScript
├── tsconfig.app.json           # Cấu hình TypeScript cho ứng dụng
├── tsconfig.node.json          # Cấu hình TypeScript cho Node
├── vite.config.ts              # Cấu hình Vite