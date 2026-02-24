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
    TableCell,
    Badge
} from '@fluentui/react-components';
import {
    ArrowLeft24Regular,
    Delete24Regular,
    Add24Regular,
    Save24Regular,
    Alert24Regular
} from '@fluentui/react-icons';
import { mockProducts } from '../data/mockData';

interface IssueLine {
    id: string;
    productId: string;
    locationId: string;
    qty: number;
    available: number;
}

export const IssueStock: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [issuedTo, setIssuedTo] = useState('');
    const [refNumber, setRefNumber] = useState(`ISS-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`);
    const [lines, setLines] = useState<IssueLine[]>([
        { id: '1', productId: '', locationId: '', qty: 1, available: 0 }
    ]);

    const addLine = () => {
        setLines([...lines, { id: Date.now().toString(), productId: '', locationId: '', qty: 1, available: 0 }]);
    };

    const removeLine = (id: string) => {
        if (lines.length > 1) {
            setLines(lines.filter(l => l.id !== id));
        }
    };

    const updateLine = (id: string, field: keyof IssueLine, value: any) => {
        setLines(lines.map(l => {
            if (l.id === id) {
                const newLine = { ...l, [field]: value };
                if (field === 'productId') {
                    const product = mockProducts.find(p => p.id === value);
                    if (product) newLine.available = product.quantityOnHand;
                }
                return newLine;
            }
            return l;
        }));
    };

    const totalQty = lines.reduce((sum, l) => sum + (l.qty || 0), 0);
    const hasInsufficientStock = lines.some(l => l.productId && l.qty > l.available);

    return (
        <div className="issue-content">
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
                    <h2 style={{ margin: '0 0 24px 0', color: '#C45000' }}>Issue Stock</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '32px' }}>
                        <Field label="Issued To / Account" required>
                            <Input
                                value={issuedTo}
                                onChange={(_, data) => setIssuedTo(data.value)}
                                placeholder="e.g. Marketing Dept"
                            />
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
                                <TableHeaderCell>Available</TableHeaderCell>
                                <TableHeaderCell style={{ width: '100px' }}>Qty to Issue</TableHeaderCell>
                                <TableHeaderCell style={{ width: '120px' }}>Status</TableHeaderCell>
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
                                        <Text weight="semibold">{line.productId ? line.available : '-'}</Text>
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
                                        {line.productId && (
                                            <Badge
                                                appearance="tint"
                                                color={line.qty > line.available ? 'important' : 'success'}
                                            >
                                                {line.qty > line.available ? 'Insufficient' : 'Available'}
                                            </Badge>
                                        )}
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

                <div className="card" style={{ position: 'sticky', top: '24px', borderTop: '4px solid #C45000' }}>
                    <Text weight="semibold" block style={{ marginBottom: '16px' }}>Issue Summary</Text>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text size={200} style={{ color: '#6B6B6B' }}>Total Units to Issue</Text>
                            <Text weight="bold">{totalQty}</Text>
                        </div>
                        {hasInsufficientStock && (
                            <div style={{ display: 'flex', gap: '8px', color: '#C50F1F', alignItems: 'flex-start', marginTop: '8px' }}>
                                <Alert24Regular style={{ minWidth: '20px' }} />
                                <Text size={200}>Some items have insufficient stock level.</Text>
                            </div>
                        )}
                    </div>
                    <Divider style={{ margin: '20px 0' }} />
                    <Button
                        appearance="primary"
                        icon={<Save24Regular />}
                        style={{ width: '100%', background: '#C45000' }}
                        disabled={!issuedTo || hasInsufficientStock || lines.some(l => !l.productId || l.qty <= 0)}
                        onClick={() => {
                            console.log('Posting Issue:', { issuedTo, refNumber, lines });
                            onBack();
                        }}
                    >
                        Post Issue
                    </Button>
                </div>
            </div>
        </div>
    );
};
