import React from 'react';
import {
    Text,
    Button,
    Select,
    Subtitle1
} from '@fluentui/react-components';
import {
    ArrowDownload24Regular,
    ChartMultiple24Regular,
    Filter24Regular
} from '@fluentui/react-icons';
import { KPICard } from '../components/KPICard';

export const Reports: React.FC = () => {
    return (
        <div className="reports-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>Reports & Analytics</h1>
                    <Text size={200} style={{ color: '#6B6B6B' }}>Advanced inventory trends and valuation</Text>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Select defaultValue="30">
                        <option value="7">Last 7 Days</option>
                        <option value="30">Last 30 Days</option>
                        <option value="90">Last 90 Days</option>
                    </Select>
                    <Button icon={<ArrowDownload24Regular />} appearance="primary">Export Report</Button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '24px' }}>
                <KPICard title="Inventory Turnover" value="4.2x" icon={<ChartMultiple24Regular />} color="#0078D4" />
                <KPICard title="Avg. Days to Sell" value="18 Days" icon={<ChartMultiple24Regular />} color="#107C10" />
                <KPICard title="Order Fulfillment" value="98.5%" icon={<ChartMultiple24Regular />} color="#8764B8" />
                <KPICard title="Write-off Value" value="$1,240" icon={<ChartMultiple24Regular />} color="#C50F1F" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <Subtitle1>Stock Value Trend</Subtitle1>
                        <Button icon={<Filter24Regular />} appearance="subtle" size="small" />
                    </div>
                    <div style={{ height: '300px', background: '#FAFAFA', border: '1px dashed #E0E0E0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Text italic style={{ color: '#6B6B6B' }}>Line Chart: Stock Value over Time</Text>
                    </div>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <Subtitle1>Turnover by Category</Subtitle1>
                        <Button icon={<Filter24Regular />} appearance="subtle" size="small" />
                    </div>
                    <div style={{ height: '300px', background: '#FAFAFA', border: '1px dashed #E0E0E0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Text italic style={{ color: '#6B6B6B' }}>Bar Chart: Inventory Turnover Ratio</Text>
                    </div>
                </div>

                <div className="card" style={{ gridColumn: 'span 2' }}>
                    <Subtitle1 block style={{ marginBottom: '16px' }}>Stock Valuation Analysis</Subtitle1>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
                        <div style={{ padding: '16px', background: '#F5F5F5', borderRadius: '8px' }}>
                            <Text block size={100} weight="semibold" style={{ color: '#6B6B6B' }}>Highest Value Item</Text>
                            <Text size={400} weight="bold">MacBook Pro M3 Max</Text>
                            <Text block mt-2>$3,499.00 / unit</Text>
                        </div>
                        <div style={{ padding: '16px', background: '#F5F5F5', borderRadius: '8px' }}>
                            <Text block size={100} weight="semibold" style={{ color: '#6B6B6B' }}>Slowest Moving Item</Text>
                            <Text size={400} weight="bold">Ergonomic Mouse Pad</Text>
                            <Text block mt-2>Last Sold: 42 days ago</Text>
                        </div>
                        <div style={{ padding: '16px', background: '#F5F5F5', borderRadius: '8px' }}>
                            <Text block size={100} weight="semibold" style={{ color: '#6B6B6B' }}>Top Reorder Source</Text>
                            <Text size={400} weight="bold">TechSource Dist.</Text>
                            <Text block mt-2>14 Pending Items</Text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
