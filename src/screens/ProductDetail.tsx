import React, { useState } from 'react';
import {
    Button,
    Text,
    Badge,
    TabList,
    Tab,
    Divider,
    Field,
    Input,
    Textarea
} from '@fluentui/react-components';
import {
    ArrowLeft24Regular,
    History24Regular,
    Info24Regular,
    Edit24Regular,
    QrCode24Regular,
    MoreHorizontal24Regular,
    ArrowDownload24Filled,
    ArrowUpload24Filled
} from '@fluentui/react-icons';
import { mockProducts, mockCategories, mockSuppliers, mockLocations } from '../data/mockData';

interface ProductDetailProps {
    productId: string;
    onBack: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ productId, onBack }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'edit' | 'qr'>('overview');

    const product = mockProducts.find(p => p.id === productId);
    if (!product) return <div>Product not found</div>;

    const category = mockCategories.find(c => c.id === product.categoryId);
    const supplier = mockSuppliers.find(s => s.id === product.supplierId);
    const location = mockLocations.find(l => l.id === product.locationId);

    return (
        <div className="detail-content">
            <div style={{ marginBottom: '20px' }}>
                <Button
                    appearance="subtle"
                    icon={<ArrowLeft24Regular />}
                    onClick={onBack}
                >
                    Back to Catalog
                </Button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '24px' }}>
                {/* Left Column: Product Info Card */}
                <div className="card" style={{ height: 'fit-content' }}>
                    <div style={{
                        height: '240px',
                        background: '#F0F0F0',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px'
                    }}>
                        <QrCode24Regular style={{ fontSize: '80px', color: '#D1D1D1' }} />
                    </div>

                    <h2 style={{ margin: '0 0 4px 0' }}>{product.name}</h2>
                    <Text size={200} style={{ color: '#6B6B6B' }}>{product.sku}</Text>

                    <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                        <Badge appearance="tint" color="brand">{category?.name}</Badge>
                        <Badge appearance="outline">{product.unitOfMeasure}</Badge>
                    </div>

                    <Divider style={{ margin: '24px 0' }} />

                    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                        <Text block size={200} style={{ color: '#6B6B6B', marginBottom: '8px' }}>Quantity on Hand</Text>
                        <div style={{ fontSize: '48px', fontWeight: 700, color: product.quantityOnHand <= product.reorderLevel ? '#CA5010' : '#1B1B1B' }}>
                            {product.quantityOnHand}
                        </div>
                        <Text size={200} style={{ color: '#6B6B6B' }}>Reorder at {product.reorderLevel}</Text>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Button appearance="primary" icon={<ArrowDownload24Filled />} style={{ width: '100%' }}>Receive Stock</Button>
                        <Button icon={<ArrowUpload24Filled />} style={{ width: '100%' }}>Issue Stock</Button>
                        <Button icon={<MoreHorizontal24Regular />} appearance="subtle">More Actions</Button>
                    </div>
                </div>

                {/* Right Column: Tabs */}
                <div className="card" style={{ padding: 0 }}>
                    <TabList
                        selectedValue={activeTab}
                        onTabSelect={(_, data) => setActiveTab(data.value as any)}
                        style={{ padding: '4px 16px 0 16px', borderBottom: '1px solid #E0E0E0' }}
                    >
                        <Tab value="overview" icon={<Info24Regular />}>Overview</Tab>
                        <Tab value="history" icon={<History24Regular />}>Movement History</Tab>
                        <Tab value="edit" icon={<Edit24Regular />}>Edit Details</Tab>
                        <Tab value="qr" icon={<QrCode24Regular />}>QR / Barcode</Tab>
                    </TabList>

                    <div style={{ padding: '24px' }}>
                        {activeTab === 'overview' && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <Text weight="semibold" block style={{ marginBottom: '8px' }}>Description</Text>
                                    <Text>{product.description}</Text>
                                </div>
                                <div>
                                    <Text weight="semibold" block style={{ marginBottom: '4px' }}>Unit Cost</Text>
                                    <Text>${product.unitCost}</Text>
                                </div>
                                <div>
                                    <Text weight="semibold" block style={{ marginBottom: '4px' }}>Selling Price</Text>
                                    <Text>${product.sellingPrice}</Text>
                                </div>
                                <div>
                                    <Text weight="semibold" block style={{ marginBottom: '4px' }}>Supplier</Text>
                                    <Text>{supplier?.name}</Text>
                                </div>
                                <div>
                                    <Text weight="semibold" block style={{ marginBottom: '4px' }}>Location</Text>
                                    <Text>{location?.warehouseName} - {location?.code}</Text>
                                </div>
                                <div>
                                    <Text weight="semibold" block style={{ marginBottom: '4px' }}>Date Added</Text>
                                    <Text>{product.createdOn}</Text>
                                </div>
                                <div>
                                    <Text weight="semibold" block style={{ marginBottom: '4px' }}>Last Modified</Text>
                                    <Text>{product.modifiedOn}</Text>
                                </div>
                            </div>
                        )}

                        {activeTab === 'history' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ borderLeft: '2px solid #E0E0E0', paddingLeft: '20px', position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '-6px', top: '0', width: '10px', height: '10px', borderRadius: '50%', background: '#0F6CBD' }}></div>
                                    <Text weight="semibold">Initial Stock Entry</Text>
                                    <Text block size={200} style={{ color: '#6B6B6B' }}>2024-01-15 09:00 AM</Text>
                                    <Text block style={{ marginTop: '8px' }}>Received 50 units for startup inventory.</Text>
                                </div>
                                <Text italic style={{ color: '#6B6B6B', textAlign: 'center', marginTop: '40px' }}>Only simulated history is available in this demo.</Text>
                            </div>
                        )}

                        {activeTab === 'edit' && (
                            <form style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                                <Field label="Product Name" style={{ gridColumn: 'span 2' }}>
                                    <Input defaultValue={product.name} />
                                </Field>
                                <Field label="SKU">
                                    <Input defaultValue={product.sku} />
                                </Field>
                                <Field label="Category">
                                    <Input defaultValue={category?.name} />
                                </Field>
                                <Field label="Unit Cost">
                                    <Input defaultValue={product.unitCost.toString()} contentBefore="$" />
                                </Field>
                                <Field label="Selling Price">
                                    <Input defaultValue={product.sellingPrice.toString()} contentBefore="$" />
                                </Field>
                                <Field label="Description" style={{ gridColumn: 'span 2' }}>
                                    <Textarea defaultValue={product.description} rows={4} />
                                </Field>
                                <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
                                    <Button>Cancel</Button>
                                    <Button appearance="primary">Save Changes</Button>
                                </div>
                            </form>
                        )}

                        {activeTab === 'qr' && (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <div style={{ background: 'white', padding: '20px', display: 'inline-block', border: '1px solid #E0E0E0', borderRadius: '8px' }}>
                                    <QrCode24Regular style={{ fontSize: '150px' }} />
                                </div>
                                <div style={{ marginTop: '24px' }}>
                                    <Text block weight="semibold">{product.sku}</Text>
                                    <Text block size={200} style={{ color: '#6B6B6B' }}>Product Label QR Code</Text>
                                </div>
                                <Button icon={<ArrowDownload24Filled />} style={{ marginTop: '24px' }}>Download Label</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
