import React from 'react';
import { KPICard } from '../components/KPICard';
import {
    Box24Regular,
    ArrowTrending24Regular,
    Alert24Regular,
    ArrowSwap24Regular,
    Add24Filled,
    ArrowDownload24Filled,
    ArrowUpload24Filled
} from '@fluentui/react-icons';
import { Button, Subtitle1, Text, Badge } from '@fluentui/react-components';

export const Dashboard: React.FC = () => {
    return (
        <div className="dashboard-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>Operational Overview</h1>
                    <Text size={200} style={{ color: '#6B6B6B' }}>Real-time inventory health and metrics</Text>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button icon={<ArrowDownload24Filled />} appearance="primary">Receive</Button>
                    <Button icon={<ArrowUpload24Filled />}>Issue</Button>
                    <Button icon={<Add24Filled />} appearance="subtle">Product</Button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '24px' }}>
                <KPICard
                    title="Total Products"
                    value="156"
                    icon={<Box24Regular />}
                    trend={{ value: 4, isUp: true }}
                />
                <KPICard
                    title="Total Stock Value"
                    value="$42,500"
                    icon={<ArrowTrending24Regular />}
                    trend={{ value: 12, isUp: true }}
                />
                <KPICard
                    title="Low Stock Items"
                    value="7"
                    icon={<Alert24Regular />}
                    color="#CA5010"
                />
                <KPICard
                    title="Movements Today"
                    value="24"
                    icon={<ArrowSwap24Regular />}
                    trend={{ value: 2, isUp: false }}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '6fr 4fr', gap: '24px', marginBottom: '24px' }}>
                <div className="card" style={{ minHeight: '300px' }}>
                    <Subtitle1 block style={{ marginBottom: '16px' }}>Stock Movement (7 Days)</Subtitle1>
                    <div style={{ height: '200px', background: '#F9F9F9', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #E0E0E0' }}>
                        <Text italic style={{ color: '#6B6B6B' }}>Movement Bar Chart Placeholder</Text>
                    </div>
                </div>
                <div className="card" style={{ minHeight: '300px' }}>
                    <Subtitle1 block style={{ marginBottom: '16px' }}>Value by Category</Subtitle1>
                    <div style={{ height: '200px', background: '#F9F9F9', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #E0E0E0' }}>
                        <Text italic style={{ color: '#6B6B6B' }}>Category Donut Chart Placeholder</Text>
                    </div>
                </div>
            </div>

            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <Subtitle1>Recent Inventory Activity</Subtitle1>
                    <Button appearance="subtle">View All</Button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', backgroundColor: '#E0E0E0' }}>
                    {[
                        { type: 'Inbound', product: 'Wireless Keyboard K380', qty: '+50', user: 'Sara Malik', time: '2 hours ago', color: 'success' },
                        { type: 'Outbound', product: 'Logitech G Pro Mouse', qty: '-12', user: 'Shaheer Ahmad', time: '4 hours ago', color: 'warning' },
                        { type: 'Adjustment', product: 'Monitor Dell U2412M', qty: '-1', user: 'Admin', time: 'Yesterday', color: 'important' },
                    ].map((activity, i) => (
                        <div key={i} style={{
                            display: 'grid',
                            gridTemplateColumns: '120px 1fr 100px 150px 120px',
                            padding: '12px 16px',
                            backgroundColor: 'white',
                            alignItems: 'center',
                            fontSize: '14px'
                        }}>
                            <Badge appearance="filled" color={activity.color as any}>{activity.type}</Badge>
                            <Text weight="semibold">{activity.product}</Text>
                            <Text style={{ color: activity.color === 'success' ? '#10893A' : '#C50F1F' }}>{activity.qty}</Text>
                            <Text size={200} style={{ color: '#6B6B6B' }}>{activity.user}</Text>
                            <Text size={200} style={{ color: '#6B6B6B' }}>{activity.time}</Text>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
