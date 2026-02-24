import React, { useState } from 'react';
import {
    Button,
    Text,
    Badge,
    TabList,
    Tab,
    Divider,
    SearchBox,
    Select
} from '@fluentui/react-components';
import {
    Alert24Regular,
    ArrowDownload24Regular,
    MoreHorizontal24Regular,
    ArrowClockwise24Regular,
    Filter24Regular
} from '@fluentui/react-icons';
import { mockProducts, mockCategories } from '../data/mockData';

export const LowStockAlerts: React.FC<{ onReceive: (productId: string) => void }> = ({ onReceive }) => {
    const [activeTab, setActiveTab] = useState<'out' | 'below' | 'approaching'>('below');

    const outOfStock = mockProducts.filter(p => p.quantityOnHand === 0);
    const belowReorder = mockProducts.filter(p => p.quantityOnHand > 0 && p.quantityOnHand <= p.reorderLevel);
    const approaching = mockProducts.filter(p => p.quantityOnHand > p.reorderLevel && p.quantityOnHand <= p.reorderLevel * 1.5);

    const getActiveList = () => {
        if (activeTab === 'out') return outOfStock;
        if (activeTab === 'below') return belowReorder;
        return approaching;
    };

    const getSeverityColor = () => {
        if (activeTab === 'out') return '#C50F1F';
        if (activeTab === 'below') return '#CA5010';
        return '#EBC815';
    };

    return (
        <div className="alerts-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Alert24Regular style={{ color: '#CA5010', fontSize: '28px' }} />
                    <div>
                        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>Low Stock Alerts</h1>
                        <Text size={200} style={{ color: '#6B6B6B' }}>{getActiveList().length} items require attention</Text>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button icon={<ArrowClockwise24Regular />}>Refresh</Button>
                    <Button icon={<Filter24Regular />}>Filter</Button>
                </div>
            </div>

            <div className="card" style={{ padding: 0 }}>
                <TabList
                    selectedValue={activeTab}
                    onTabSelect={(_, data) => setActiveTab(data.value as any)}
                    style={{ padding: '4px 16px 0 16px', borderBottom: '1px solid #E0E0E0' }}
                >
                    <Tab value="out">
                        Out of Stock
                        <Badge appearance="filled" color="important" style={{ marginLeft: '8px' }}>{outOfStock.length}</Badge>
                    </Tab>
                    <Tab value="below">
                        Below Reorder Level
                        <Badge appearance="filled" color="warning" style={{ marginLeft: '8px' }}>{belowReorder.length}</Badge>
                    </Tab>
                    <Tab value="approaching">
                        Approaching Reorder
                        <Badge appearance="tint" color="warning" style={{ marginLeft: '8px' }}>{approaching.length}</Badge>
                    </Tab>
                </TabList>

                <div style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                        <SearchBox placeholder="Search alerts..." style={{ flex: 1 }} />
                        <Select defaultValue="critical">
                            <option value="critical">Sort by: Criticality</option>
                            <option value="name">Sort by: Name</option>
                            <option value="qty">Sort by: Quantity</option>
                        </Select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {getActiveList().length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '40px', color: '#6B6B6B' }}>
                                <Text italic>No alerts found in this category.</Text>
                            </div>
                        ) : (
                            getActiveList().map(product => {
                                const category = mockCategories.find(c => c.id === product.categoryId);
                                return (
                                    <div key={product.id} className="alert-card" style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'auto 1fr auto',
                                        gap: '20px',
                                        padding: '16px',
                                        background: '#FFFFFF',
                                        border: '1px solid #E0E0E0',
                                        borderRadius: '8px',
                                        borderLeft: `4px solid ${getSeverityColor()}`,
                                        alignItems: 'center'
                                    }}>
                                        <div style={{ width: '48px', height: '48px', background: '#F5F5F5', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Alert24Regular style={{ color: getSeverityColor() }} />
                                        </div>

                                        <div>
                                            <Text weight="semibold" block>{product.name}</Text>
                                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
                                                <Text size={100} style={{ color: '#6B6B6B' }}>{product.sku}</Text>
                                                <Divider vertical style={{ height: '12px' }} />
                                                <Badge appearance="tint" color="brand">{category?.name}</Badge>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                                            <div style={{ textAlign: 'right' }}>
                                                <Text block weight="bold" size={400} style={{ color: product.quantityOnHand === 0 ? '#C50F1F' : '#CA5010' }}>
                                                    {product.quantityOnHand} {product.unitOfMeasure}
                                                </Text>
                                                <Text size={100} style={{ color: '#6B6B6B' }}>Reorder at {product.reorderLevel}</Text>
                                            </div>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <Button appearance="primary" size="small" icon={<ArrowDownload24Regular />} onClick={() => onReceive(product.id)}>Receive</Button>
                                                <Button appearance="subtle" size="small" icon={<MoreHorizontal24Regular />} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
