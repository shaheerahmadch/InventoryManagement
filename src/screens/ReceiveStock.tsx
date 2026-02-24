import React, { useState } from 'react';
import {
    Button,
    Text,
    Field,
    Input,
    Select,
    Divider,
    Table,
    TableHeader,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell
} from '@fluentui/react-components';
import {
    ArrowLeft24Regular,
    Delete24Regular,
    Add24Regular,
    Save24Regular
} from '@fluentui/react-icons';
import { mockProducts, mockSuppliers, mockLocations } from '../data/mockData';

interface LineItem {
    id: string;
    productId: string;
    locationId: string;
    qty: number;
    unitCost: number;
}

export const ReceiveStock: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [supplierId, setSupplierId] = useState('');
    const [refNumber, setRefNumber] = useState(`PO-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`);
    const [lines, setLines] = useState<LineItem[]>([
        { id: '1', productId: '', locationId: '', qty: 1, unitCost: 0 }
    ]);

    const addLine = () => {
        setLines([...lines, { id: Date.now().toString(), productId: '', locationId: '', qty: 1, unitCost: 0 }]);
    };

    const removeLine = (id: string) => {
        if (lines.length > 1) {
            setLines(lines.filter(l => l.id !== id));
        }
    };

    const updateLine = (id: string, field: keyof LineItem, value: any) => {
        setLines(lines.map(l => {
            if (l.id === id) {
                const newLine = { ...l, [field]: value };
                if (field === 'productId') {
                    const product = mockProducts.find(p => p.id === value);
                    if (product) newLine.unitCost = product.unitCost;
                }
                return newLine;
            }
            return l;
        }));
    };

    const totalQty = lines.reduce((sum, l) => sum + (l.qty || 0), 0);
    const totalValue = lines.reduce((sum, l) => sum + ((l.qty || 0) * (l.unitCost || 0)), 0);

    return (
        <div className="receive-content">
            <div style={{ marginBottom: '20px' }}>
                <Button
                    appearance="subtle"
                    icon={<ArrowLeft24Regular />}
                    onClick={onBack}
                >
                    Cancel
                </Button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', alignItems: 'start' }}>
                <div className="card">
                    <h2 style={{ margin: '0 0 24px 0' }}>Receive Stock</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '32px' }}>
                        <Field label="Supplier" required>
                            <Select value={supplierId} onChange={(_, data) => setSupplierId(data.value)}>
                                <option value="">Select supplier</option>
                                {mockSuppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </Select>
                        </Field>
                        <Field label="Reference Number" required>
                            <Input value={refNumber} onChange={(_, data) => setRefNumber(data.value)} />
                        </Field>
                    </div>

                    <Divider style={{ marginBottom: '24px' }} />

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderCell style={{ width: '40%' }}>Product</TableHeaderCell>
                                <TableHeaderCell>Location</TableHeaderCell>
                                <TableHeaderCell style={{ width: '100px' }}>Quantity</TableHeaderCell>
                                <TableHeaderCell style={{ width: '120px' }}>Unit Cost</TableHeaderCell>
                                <TableHeaderCell style={{ width: '40px' }}></TableHeaderCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {lines.map((line) => (
                                <TableRow key={line.id}>
                                    <TableCell>
                                        <Select
                                            value={line.productId}
                                            onChange={(_, data) => updateLine(line.id, 'productId', data.value)}
                                            style={{ width: '100%' }}
                                        >
                                            <option value="">Select product</option>
                                            {mockProducts.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            value={line.locationId}
                                            onChange={(_, data) => updateLine(line.id, 'locationId', data.value)}
                                            style={{ width: '100%' }}
                                        >
                                            <option value="">Select location</option>
                                            {mockLocations.map(l => <option key={l.id} value={l.id}>{l.warehouseName}</option>)}
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            value={line.qty.toString()}
                                            onChange={(_, data) => updateLine(line.id, 'qty', parseInt(data.value) || 0)}
                                            style={{ width: '80px' }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            contentBefore="$"
                                            value={line.unitCost.toString()}
                                            onChange={(_, data) => updateLine(line.id, 'unitCost', parseFloat(data.value) || 0)}
                                            style={{ width: '100px' }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            appearance="subtle"
                                            icon={<Delete24Regular />}
                                            onClick={() => removeLine(line.id)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Button
                        appearance="subtle"
                        icon={<Add24Regular />}
                        onClick={addLine}
                        style={{ marginTop: '16px' }}
                    >
                        Add Line Item
                    </Button>
                </div>

                <div className="card" style={{ position: 'sticky', top: '24px' }}>
                    <Text weight="semibold" block style={{ marginBottom: '16px' }}>Summary</Text>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text size={200} style={{ color: '#6B6B6B' }}>Total Units</Text>
                            <Text weight="bold">{totalQty}</Text>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text size={200} style={{ color: '#6B6B6B' }}>Total Value</Text>
                            <Text weight="bold">${totalValue.toFixed(2)}</Text>
                        </div>
                    </div>
                    <Divider style={{ margin: '20px 0' }} />
                    <Button
                        appearance="primary"
                        icon={<Save24Regular />}
                        style={{ width: '100%' }}
                        disabled={!supplierId || lines.some(l => !l.productId || !l.locationId || l.qty <= 0)}
                        onClick={() => {
                            console.log('Posting Receipt:', { supplierId, refNumber, lines });
                            onBack();
                        }}
                    >
                        Post Receipt
                    </Button>
                </div>
            </div>
        </div>
    );
};
