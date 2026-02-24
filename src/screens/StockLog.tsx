import React, { useState } from 'react';
import {
    Text,
    Badge,
    Table,
    TableHeader,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Button,
    SearchBox
} from '@fluentui/react-components';
import {
    Filter24Regular,
    ArrowDownload24Regular,
    History24Regular
} from '@fluentui/react-icons';
import { mockProducts, mockStockMovements } from '../data/mockData';

export const StockLog: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const getBadgeColor = (type: string) => {
        switch (type) {
            case 'Inbound': return 'success';
            case 'Outbound': return 'warning';
            case 'Adjustment': return 'important';
            default: return 'brand';
        }
    };



    return (
        <div className="log-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>Stock Movement Log</h1>
                    <Text size={200} style={{ color: '#6B6B6B' }}>Complete audit trail of all inventory changes</Text>
                </div>
                <Button icon={<ArrowDownload24Regular />}>Export CSV</Button>
            </div>

            <div className="card" style={{ marginBottom: '24px', padding: '16px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <SearchBox
                        placeholder="Search by product, reference or user..."
                        style={{ flex: 1 }}
                        value={searchTerm}
                        onChange={(_, data) => setSearchTerm(data.value)}
                    />
                    <Button icon={<Filter24Regular />}>Filter by Date</Button>
                    <Button icon={<History24Regular />}>Last 30 Days</Button>
                </div>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>Date & Time</TableHeaderCell>
                            <TableHeaderCell>Product</TableHeaderCell>
                            <TableHeaderCell>Type</TableHeaderCell>
                            <TableHeaderCell>Quantity</TableHeaderCell>
                            <TableHeaderCell>Reference</TableHeaderCell>
                            <TableHeaderCell>User</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockStockMovements.map((mov) => {
                            const product = mockProducts.find(p => p.id === mov.productId);
                            return (
                                <TableRow key={mov.id}>
                                    <TableCell>
                                        <Text size={200}>{mov.date}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <Text weight="semibold">{product?.name || 'Unknown'}</Text>
                                            <Text size={100} style={{ color: '#6B6B6B' }}>{product?.sku}</Text>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge appearance="filled" color={getBadgeColor(mov.type) as any}>{mov.type}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Text weight="bold" style={{ color: mov.qty > 0 ? '#10893A' : '#C50F1F' }}>
                                            {mov.qty > 0 ? `+${mov.qty}` : mov.qty}
                                        </Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text size={200} style={{ fontFamily: 'monospace' }}>{mov.ref}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text size={200}>{mov.user}</Text>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Button appearance="subtle">Load More Activity</Button>
            </div>
        </div>
    );
};
