import React, { useState } from 'react';
import {
    Text,
    Button,
    Badge,
    SearchBox,
    Divider,
    Field,
    Input,
    Textarea,
    Switch,
    Avatar
} from '@fluentui/react-components';
import {
    Add24Regular,
    Search24Regular,
    MoreHorizontal24Regular,
    Mail24Regular,
    Phone24Regular,
    History24Regular,
    Save24Regular,
    Dismiss24Regular
} from '@fluentui/react-icons';
import { mockSuppliers, mockProducts, mockStockMovements } from '../data/mockData';
import type { StockMovement } from '../data/mockData';

export const Suppliers: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const filteredSuppliers = mockSuppliers.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.contactName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedSupplier = mockSuppliers.find(s => s.id === selectedSupplierId);

    // Stats for selected supplier
    const supplierProducts = mockProducts.filter(p => p.supplierId === selectedSupplierId);
    const receivedMovements = mockStockMovements.filter((m: StockMovement) =>
        m.type === 'Inbound' &&
        mockProducts.find(p => p.id === m.productId)?.supplierId === selectedSupplierId
    );
    const totalReceivedUnits = receivedMovements.reduce((sum: number, m: StockMovement) => sum + m.qty, 0);

    const handleEdit = (id: string) => {
        setSelectedSupplierId(id);
        setIsPanelOpen(true);
    };

    const handleAdd = () => {
        setSelectedSupplierId(null);
        setIsPanelOpen(true);
    };

    return (
        <div className="suppliers-content" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>Suppliers</h1>
                    <Text size={200} style={{ color: '#6B6B6B' }}>Manage your inventory sources and lead times</Text>
                </div>
                <Button appearance="primary" icon={<Add24Regular />} onClick={handleAdd}>Add Supplier</Button>
            </div>

            <div className="card" style={{ padding: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <SearchBox
                        placeholder="Search by name, contact or email..."
                        style={{ flex: 1 }}
                        value={searchTerm}
                        onChange={(_, data) => setSearchTerm(data.value)}
                    />
                    <Button icon={<Search24Regular />}>Search</Button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                {filteredSuppliers.map(sup => (
                    <div key={sup.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <Avatar name={sup.name} size={40} color="colorful" />
                                <div>
                                    <Text weight="semibold" size={400} block>{sup.name}</Text>
                                    <Badge appearance="tint" color="brand">{sup.leadTimeDays} days lead time</Badge>
                                </div>
                            </div>
                            <Button appearance="subtle" icon={<MoreHorizontal24Regular />} onClick={() => handleEdit(sup.id)} />
                        </div>

                        <Divider />

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Mail24Regular style={{ color: '#6B6B6B', fontSize: '16px' }} />
                                <Text size={200}>{sup.email}</Text>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Phone24Regular style={{ color: '#6B6B6B', fontSize: '16px' }} />
                                <Text size={200}>{sup.phone}</Text>
                            </div>
                        </div>

                        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text size={100} style={{ color: '#6B6B6B' }}>Contact: {sup.contactName}</Text>
                            <Badge appearance="filled" color={sup.isActive ? 'success' : 'important'}>
                                {sup.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                        </div>
                    </div>
                ))}
            </div>

            {/* Slide-out Panel Logic (Simulated with a Modal/Overlay for UX) */}
            {isPanelOpen && (
                <div style={{
                    position: 'fixed', top: 0, right: 0, bottom: 0, width: '400px',
                    background: '#FFFFFF', boxShadow: '-4px 0 12px rgba(0,0,0,0.1)',
                    zIndex: 1000, padding: '32px', display: 'flex', flexDirection: 'column'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                        <h2 style={{ margin: 0 }}>{selectedSupplier ? 'Edit Supplier' : 'Add Supplier'}</h2>
                        <Button appearance="subtle" icon={<Dismiss24Regular />} onClick={() => setIsPanelOpen(false)} />
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', paddingRight: '8px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <Field label="Supplier Name" required>
                                <Input defaultValue={selectedSupplier?.name} />
                            </Field>
                            <Field label="Contact Person" required>
                                <Input defaultValue={selectedSupplier?.contactName} />
                            </Field>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <Field label="Email">
                                    <Input defaultValue={selectedSupplier?.email} />
                                </Field>
                                <Field label="Phone">
                                    <Input defaultValue={selectedSupplier?.phone} />
                                </Field>
                            </div>
                            <Field label="Address">
                                <Textarea defaultValue={selectedSupplier?.address} />
                            </Field>
                            <Field label="Lead Time (Days)">
                                <Input type="number" defaultValue={selectedSupplier?.leadTimeDays.toString()} />
                            </Field>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text weight="semibold">Status</Text>
                                <Switch defaultChecked={selectedSupplier?.isActive ?? true} label={selectedSupplier?.isActive ? 'Active' : 'Inactive'} />
                            </div>

                            {selectedSupplier && (
                                <>
                                    <Divider style={{ margin: '12px 0' }} />
                                    <h4 style={{ margin: '0 0 12px 0' }}>Supplier Insights</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                        <div style={{ padding: '12px', background: '#F5F5F5', borderRadius: '4px' }}>
                                            <Text size={100} block style={{ color: '#6B6B6B' }}>Managed SKUs</Text>
                                            <Text weight="bold" size={400}>{supplierProducts.length}</Text>
                                        </div>
                                        <div style={{ padding: '12px', background: '#F5F5F5', borderRadius: '4px' }}>
                                            <Text size={100} block style={{ color: '#6B6B6B' }}>Total Received</Text>
                                            <Text weight="bold" size={400}>{totalReceivedUnits} units</Text>
                                        </div>
                                    </div>
                                    <Button icon={<History24Regular />} appearance="subtle" style={{ marginTop: '8px' }}>View Recent Receipts</Button>
                                </>
                            )}
                        </div>
                    </div>

                    <div style={{ marginTop: '32px', display: 'flex', gap: '12px' }}>
                        <Button appearance="primary" icon={<Save24Regular />} style={{ flex: 1 }}>Save Changes</Button>
                        <Button appearance="secondary" onClick={() => setIsPanelOpen(false)}>Cancel</Button>
                    </div>
                </div>
            )}

            {isPanelOpen && (
                <div
                    onClick={() => setIsPanelOpen(false)}
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', zIndex: 999 }}
                />
            )}
        </div>
    );
};
