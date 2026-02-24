export interface Product {
  id: string;
  name: string;
  sku: string;
  categoryId: string;
  supplierId: string;
  locationId: string;
  quantityOnHand: number;
  reorderLevel: number;
  reorderQuantity: number;
  unitCost: number;
  sellingPrice: number;
  unitOfMeasure: string;
  description: string;
  imageUrl?: string;
  isActive: boolean;
  createdOn: string;
  modifiedOn: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  colorCode: string;
  iconName: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  leadTimeDays: number;
  isActive: boolean;
}

export interface Location {
  id: string;
  code: string;
  warehouseName: string;
  zone: string;
  aisle: string;
  shelf: string;
  capacity: number;
  isActive: boolean;
}

export interface StockMovement {
  id: string;
  type: 'Inbound' | 'Outbound' | 'Adjustment' | 'Transfer';
  productId: string;
  qty: number;
  user: string;
  date: string;
  ref: string;
}

export const mockCategories: Category[] = [
  { id: "cat-001", name: "Electronics", description: "Electronic devices", colorCode: "#0078D4", iconName: "Electronics" },
  { id: "cat-002", name: "Furniture", description: "Office furniture", colorCode: "#107C10", iconName: "Furniture" },
];

export const mockSuppliers: Supplier[] = [
  { id: "sup-001", name: "TechSource Distributors", contactName: "Ahmad Raza", email: "ahmad@techsource.pk", phone: "+92-300-1234567", address: "12 Main Blvd, Lahore", leadTimeDays: 7, isActive: true },
];

export const mockLocations: Location[] = [
  { id: "loc-A1", code: "A-01-03", warehouseName: "Main Warehouse", zone: "Zone A", aisle: "Aisle 1", shelf: "Shelf 3", capacity: 500, isActive: true },
];

export const mockProducts: Product[] = [
  {
    id: "prod-001",
    name: "Wireless Keyboard K380",
    sku: "WK-K380-BLK",
    categoryId: "cat-002",
    supplierId: "sup-001",
    locationId: "loc-A1",
    quantityOnHand: 142,
    reorderLevel: 20,
    reorderQuantity: 50,
    unitCost: 29.99,
    sellingPrice: 49.99,
    unitOfMeasure: "Each",
    description: "Compact Bluetooth keyboard...",
    isActive: true,
    createdOn: "2024-01-15",
    modifiedOn: "2025-02-10",
  },
];

export const mockStockMovements: StockMovement[] = [
  { id: 'mov-1', type: 'Inbound', productId: 'prod-001', qty: 50, user: 'Sara Malik', date: '2024-02-18 09:30', ref: 'PO-2025-0042' },
  { id: 'mov-2', type: 'Outbound', productId: 'prod-001', qty: -12, user: 'Shaheer Ahmad', date: '2024-02-18 11:15', ref: 'SO-2025-1102' },
  { id: 'mov-3', type: 'Inbound', productId: 'prod-001', qty: 25, user: 'Ahmad Raza', date: '2024-02-16 10:00', ref: 'PO-2025-0039' },
];
