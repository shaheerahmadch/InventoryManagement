import React from 'react';
import {
  Button,
  FluentProvider,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem
} from '@fluentui/react-components';
import { inventoryTheme } from './styles/theme';
import {
  Add24Regular,
  ArrowDownload24Regular,
  ArrowUpload24Regular,
  Box24Regular,
  Home24Regular,
  ClipboardTask24Regular,
  Alert24Regular,
  BuildingFactory24Regular,
  Settings24Regular,
  Person24Regular
} from '@fluentui/react-icons';
import { Dashboard } from './screens/Dashboard';
import { ProductCatalog } from './screens/ProductCatalog';
import { ProductDetail } from './screens/ProductDetail';
import { AddProduct } from './screens/AddProduct';
import { StockLog } from './screens/StockLog';
import { ReceiveStock } from './screens/ReceiveStock';
import { IssueStock } from './screens/IssueStock';
import { LowStockAlerts } from './screens/LowStockAlerts';
import { LocationManager } from './screens/LocationManager';
import { Reports } from './screens/Reports';
import { Settings } from './screens/Settings';
import { Suppliers } from './screens/Suppliers';

const NavigationItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}> = ({ icon, label, active, onClick }) => (
  <div
    className={`nav-item ${active ? 'active' : ''}`}
    title={label}
    onClick={onClick}
  >
    {icon}
  </div>
);

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = React.useState<'dashboard' | 'products' | 'detail' | 'add-product' | 'stock-log' | 'receive' | 'issue' | 'alerts' | 'locations' | 'reports' | 'settings' | 'suppliers'>('dashboard');
  const [selectedProductId, setSelectedProductId] = React.useState<string | null>(null);

  const navigateToDetail = (id: string) => {
    setSelectedProductId(id);
    setCurrentScreen('detail');
  };

  const handleNavClick = (screen: 'dashboard' | 'products' | 'stock-log' | 'receive' | 'issue' | 'alerts' | 'locations' | 'reports' | 'settings' | 'suppliers') => {
    setCurrentScreen(screen);
    setSelectedProductId(null);
  };

  const handleSaveProduct = (data: any) => {
    console.log('Product Saved:', data);
    setCurrentScreen('products');
  };

  const navigateToReceive = (productId?: string) => {
    setSelectedProductId(productId || null);
    setCurrentScreen('receive');
  };

  return (
    <FluentProvider theme={inventoryTheme}>
      <div className="app-container">
        {/* Header */}
        <header className="header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
            <Box24Regular style={{ color: 'var(--microsoft-blue)' }} />
            <span style={{ fontWeight: 600, fontSize: '18px' }}>Inventory Management</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Alert24Regular style={{ cursor: 'pointer' }} onClick={() => setCurrentScreen('alerts')} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', color: '#6B6B6B' }}>Shaheer Ahmad</span>
              <Person24Regular />
            </div>
          </div>
        </header>

        {/* Sidebar Nav Rail */}
        <nav className="nav-rail">
          <NavigationItem
            icon={<Home24Regular />}
            label="Dashboard"
            active={currentScreen === 'dashboard'}
            onClick={() => handleNavClick('dashboard')}
          />
          <NavigationItem
            icon={<Box24Regular />}
            label="Products"
            active={currentScreen === 'products' || currentScreen === 'detail' || currentScreen === 'add-product'}
            onClick={() => handleNavClick('products')}
          />
          <NavigationItem
            icon={<ClipboardTask24Regular />}
            label="Stock Log"
            active={currentScreen === 'stock-log'}
            onClick={() => handleNavClick('stock-log')}
          />
          <NavigationItem
            icon={<ArrowDownload24Regular />}
            label="Receive"
            active={currentScreen === 'receive'}
            onClick={() => handleNavClick('receive')}
          />
          <NavigationItem
            icon={<ArrowUpload24Regular />}
            label="Issue"
            active={currentScreen === 'issue'}
            onClick={() => handleNavClick('issue')}
          />
          <NavigationItem
            icon={<Alert24Regular />}
            label="Alerts"
            active={currentScreen === 'alerts'}
            onClick={() => handleNavClick('alerts')}
          />
          <NavigationItem
            icon={<BuildingFactory24Regular />}
            label="Locations"
            active={currentScreen === 'locations'}
            onClick={() => handleNavClick('locations')}
          />
          <NavigationItem
            icon={<Person24Regular />}
            label="Suppliers"
            active={currentScreen === 'suppliers'}
            onClick={() => handleNavClick('suppliers')}
          />
          <NavigationItem
            icon={<Settings24Regular />}
            label="Settings"
            active={currentScreen === 'settings'}
            onClick={() => handleNavClick('settings')}
          />
        </nav>

        {/* Main Content Area */}
        <main className="main-content">
          {currentScreen === 'dashboard' && <Dashboard />}
          {currentScreen === 'products' && <ProductCatalog onSelectProduct={navigateToDetail} />}
          {currentScreen === 'detail' && selectedProductId && (
            <ProductDetail
              productId={selectedProductId}
              onBack={() => setCurrentScreen('products')}
            />
          )}
          {currentScreen === 'add-product' && (
            <AddProduct onBack={() => setCurrentScreen('products')} onSave={handleSaveProduct} />
          )}
          {currentScreen === 'stock-log' && <StockLog />}
          {currentScreen === 'receive' && <ReceiveStock onBack={() => setCurrentScreen('dashboard')} />}
          {currentScreen === 'issue' && <IssueStock onBack={() => setCurrentScreen('dashboard')} />}
          {currentScreen === 'alerts' && <LowStockAlerts onReceive={navigateToReceive} />}
          {currentScreen === 'locations' && <LocationManager />}
          {currentScreen === 'reports' && <Reports />}
          {currentScreen === 'settings' && <Settings />}
          {currentScreen === 'suppliers' && <Suppliers />}
        </main>

        {/* Floating Action buttons (Quick Actions) */}
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 100 }}>
          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <Button
                appearance="primary"
                shape="circular"
                size="large"
                style={{
                  width: '56px',
                  height: '56px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  fontSize: '24px'
                }}
                icon={<Add24Regular />}
              />
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem
                  icon={<ArrowDownload24Regular />}
                  onClick={() => setCurrentScreen('receive')}
                >
                  Receive Stock
                </MenuItem>
                <MenuItem
                  icon={<ArrowUpload24Regular />}
                  onClick={() => setCurrentScreen('issue')}
                >
                  Issue Stock
                </MenuItem>
                <MenuItem
                  icon={<Box24Regular />}
                  onClick={() => setCurrentScreen('add-product')}
                >
                  Add New Product
                </MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
        </div>
      </div>
    </FluentProvider>
  );
};

export default App;
