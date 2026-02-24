import React, { useState } from 'react';
import {
    Text,
    Badge,
    Button,
    SearchBox,
    ProgressBar,
    Avatar
} from '@fluentui/react-components';
import {
    Add24Regular,
    MoreHorizontal24Regular,
    Box24Regular,
    Location24Regular,
    ArrowRight24Regular
} from '@fluentui/react-icons';
import { mockLocations, mockProducts } from '../data/mockData';

export const LocationManager: React.FC = () => {
    const [selectedLocationId, setSelectedLocationId] = useState(mockLocations[0]?.id);

    const selectedLocation = mockLocations.find(l => l.id === selectedLocationId);
    const locationProducts = mockProducts.filter(p => p.locationId === selectedLocationId);

    // Calculate capacity utilization
    const totalQty = locationProducts.reduce((sum, p) => sum + p.quantityOnHand, 0);
    const capacity = selectedLocation?.capacity || 1000;


    const getUtilizationColor = (val: number) => {
        if (val > 90) return 'error';
        if (val > 70) return 'warning';
        return 'success';
    };

    return (
        <div className="location-manager-content" style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '24px', height: '100%' }}>
            {/* Left Panel: Location Tree */}
            <div className="card" style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '16px', borderBottom: '1px solid #E0E0E0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={{ margin: 0 }}>Locations</h3>
                        <Button appearance="subtle" icon={<Add24Regular />} size="small" />
                    </div>
                    <SearchBox placeholder="Search locations..." style={{ width: '100%' }} size="small" />
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
                    {mockLocations.map(loc => (
                        <div
                            key={loc.id}
                            onClick={() => setSelectedLocationId(loc.id)}
                            style={{
                                padding: '12px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                background: selectedLocationId === loc.id ? '#EFF6FC' : 'transparent',
                                marginBottom: '4px'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Location24Regular style={{ color: selectedLocationId === loc.id ? 'var(--microsoft-blue)' : '#6B6B6B' }} />
                                    <div>
                                        <Text weight="semibold" block>{loc.warehouseName}</Text>
                                        <Text size={100} style={{ color: '#6B6B6B' }}>{loc.code}</Text>
                                    </div>
                                </div>
                                <Badge appearance="tint" color="brand">{mockProducts.filter(p => p.locationId === loc.id).length} SKUs</Badge>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Text size={100} style={{ color: '#6B6B6B' }}>Utilization</Text>
                                    <Text size={100} weight="semibold">{Math.round((mockProducts.filter(p => p.locationId === loc.id).reduce((s, p) => s + p.quantityOnHand, 0) / loc.capacity) * 100)}%</Text>
                                </div>
                                <ProgressBar
                                    value={mockProducts.filter(p => p.locationId === loc.id).reduce((s, p) => s + p.quantityOnHand, 0) / loc.capacity}
                                    color={getUtilizationColor((mockProducts.filter(p => p.locationId === loc.id).reduce((s, p) => s + p.quantityOnHand, 0) / loc.capacity) * 100) as any}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Panel: Detail View */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <div>
                            <Text size={200} weight="semibold" style={{ color: '#6B6B6B', textTransform: 'uppercase' }}>Location Details</Text>
                            <h2 style={{ margin: '4px 0 0 0' }}>{selectedLocation?.warehouseName} — {selectedLocation?.code}</h2>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <Button icon={<Add24Regular />} appearance="primary">Move Stock</Button>
                            <Button icon={<MoreHorizontal24Regular />} appearance="subtle" />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                        <div>
                            <Text block size={100} style={{ color: '#6B6B6B' }}>Zone</Text>
                            <Text weight="semibold">{selectedLocation?.zone}</Text>
                        </div>
                        <div>
                            <Text block size={100} style={{ color: '#6B6B6B' }}>Aisle</Text>
                            <Text weight="semibold">{selectedLocation?.aisle}</Text>
                        </div>
                        <div>
                            <Text block size={100} style={{ color: '#6B6B6B' }}>Shelf</Text>
                            <Text weight="semibold">{selectedLocation?.shelf}</Text>
                        </div>
                        <div>
                            <Text block size={100} style={{ color: '#6B6B6B' }}>Capacity</Text>
                            <Text weight="semibold">{totalQty} / {capacity} units</Text>
                        </div>
                    </div>
                </div>

                <div className="card" style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 16px 0' }}>Stored Products</h3>
                    {locationProducts.length === 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', color: '#6B6B6B' }}>
                            <Box24Regular style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.3 }} />
                            <Text>No products stored at this location.</Text>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {locationProducts.map(p => (
                                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '8px 12px', border: '1px solid #F0F0F0', borderRadius: '4px' }}>
                                    <Avatar name={p.name} shape="square" size={32} color="neutral" />
                                    <div style={{ flex: 1 }}>
                                        <Text weight="semibold">{p.name}</Text>
                                        <Text size={100} block style={{ color: '#6B6B6B' }}>{p.sku}</Text>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <Text weight="bold">{p.quantityOnHand}</Text>
                                        <Text size={100} block style={{ color: '#6B6B6B' }}>{p.unitOfMeasure}</Text>
                                    </div>
                                    <Button icon={<ArrowRight24Regular />} appearance="subtle" size="small" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
