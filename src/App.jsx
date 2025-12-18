import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetailPage from './features/products/pages/ProductDetailsPage.tsx';
import ProductListPage from './features/products/pages/ProductsListPage.tsx';
import Header from './features/common/components/Header';
import Footer from './features/common/components/Footer';

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50 ">
                <Header />
                <Routes>
                    <Route path="/" element={<ProductListPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
