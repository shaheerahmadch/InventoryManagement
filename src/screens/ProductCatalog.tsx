import React, { useState } from 'react';
import {
    SearchBox,
    Button,
    Text,
    Badge,
    Table,
    TableHeader,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    TableCellLayout
} from '@fluentui/react-components';
import {
    Filter24Regular,
    Grid24Regular,
    List24Regular,
    Add24Filled,
    Box24Regular
} from '@fluentui/react-icons';
import { mockProducts, mockCategories } from '../data/mockData';

interface ProductCatalogProps {
    onSelectProduct: (id: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onSelectProduct }) => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = mockProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="catalog-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>Product Catalog</h1>
                    <Text size={200} style={{ color: '#6B6B6B' }}>Manage your inventory items and stock levels</Text>
                </div>
                <Button icon={<Add24Filled />} appearance="primary">Add Product</Button>
            </div>

            <div className="card" style={{ marginBottom: '24px', padding: '16px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <SearchBox
                        placeholder="Search by name, SKU..."
                        style={{ flex: 1 }}
                        value={searchTerm}
                        onChange={(_, data) => setSearchTerm(data.value)}
                    />
                    <Button icon={<Filter24Regular />}>Filters</Button>
                    <div style={{ display: 'flex', border: '1px solid #E0E0E0', borderRadius: '4px' }}>
                        <Button
                            appearance={viewMode === 'grid' ? 'subtle' : 'transparent'}
                            icon={<Grid24Regular />}
                            onClick={() => setViewMode('grid')}
                        />
                        <Button
                            appearance={viewMode === 'list' ? 'subtle' : 'transparent'}
                            icon={<List24Regular />}
                            onClick={() => setViewMode('list')}
                        />
                    </div>
                </div>
            </div>

            {viewMode === 'list' ? (
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderCell>Product Name</TableHeaderCell>
                                <TableHeaderCell>SKU</TableHeaderCell>
                                <TableHeaderCell>Category</TableHeaderCell>
                                <TableHeaderCell>Qty on Hand</TableHeaderCell>
                                <TableHeaderCell>Unit Cost</TableHeaderCell>
                                <TableHeaderCell>Status</TableHeaderCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProducts.map((product) => {
                                const category = mockCategories.find(c => c.id === product.categoryId);
                                const status = product.quantityOnHand <= product.reorderLevel ? 'warning' : 'success';

                                return (
                                    <TableRow key={product.id} onClick={() => onSelectProduct(product.id)} style={{ cursor: 'pointer' }}>
                                        <TableCell>
                                            <TableCellLayout>
                                                <Text weight="semibold">{product.name}</Text>
                                            </TableCellLayout>
                                        </TableCell>
                                        <TableCell>{product.sku}</TableCell>
                                        <TableCell>
                                            <Badge appearance="tint" color="brand">{category?.name || 'Uncategorized'}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Text weight="bold">{product.quantityOnHand}</Text>
                                            <Text size={100} style={{ marginLeft: '4px', color: '#6B6B6B' }}>{product.unitOfMeasure}</Text>
                                        </TableCell>
                                        <TableCell>${product.unitCost}</TableCell>
                                        <TableCell>
                                            <Badge appearance="filled" color={status as any}>
                                                {product.quantityOnHand <= product.reorderLevel ? 'Low Stock' : 'In Stock'}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="card product-card" style={{ padding: 0, cursor: 'pointer' }} onClick={() => onSelectProduct(product.id)}>
                            <div style={{ height: '160px', background: '#F0F0F0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
                                <Box24Regular style={{ fontSize: '48px', color: '#D1D1D1' }} />
                            </div>
                            <div style={{ padding: '16px' }}>
                                <Text weight="semibold" block style={{ marginBottom: '4px' }}>{product.name}</Text>
                                <Text size={100} style={{ color: '#6B6B6B' }} block>{product.sku}</Text>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                                    <Text size={400} weight="bold">${product.unitCost}</Text>
                                    <Badge color={product.quantityOnHand <= product.reorderLevel ? 'warning' : 'success'}>
                                        {product.quantityOnHand} in stock
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
