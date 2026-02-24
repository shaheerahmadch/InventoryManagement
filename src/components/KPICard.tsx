import React from 'react';
import { Card, Text } from '@fluentui/react-components';

interface KPICardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: {
        value: number;
        isUp: boolean;
    };
    color?: string;
}

export const KPICard: React.FC<KPICardProps> = ({ title, value, icon, trend, color }) => {
    return (
        <Card className="card kpi-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <Text size={200} weight="regular" style={{ color: '#6B6B6B' }}>{title}</Text>
                    <div style={{ marginTop: '8px', fontSize: '32px', fontWeight: 600, color: color || '#1B1B1B' }}>
                        {value}
                    </div>
                </div>
                <div style={{
                    backgroundColor: color ? `${color}15` : '#EFF6FC',
                    color: color || '#0F6CBD',
                    padding: '12px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {icon}
                </div>
            </div>
            {trend && (
                <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{
                        color: trend.isUp ? '#10893A' : '#C50F1F',
                        fontSize: '13px',
                        fontWeight: 600
                    }}>
                        {trend.isUp ? '▲' : '▼'} {Math.abs(trend.value)}%
                    </span>
                    <Text size={100} style={{ color: '#6B6B6B' }}>vs last week</Text>
                </div>
            )}
        </Card>
    );
};
