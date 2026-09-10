import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import PageLoader from './components/common/PageLoader';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flexGrow: 1 }}>
          <Suspense fallback={<PageLoader />}>
            <AppRoutes />
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
