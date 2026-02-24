import React, { useState } from 'react';
import {
    Text,
    Button,
    Divider,
    TabList,
    Tab,
    Field,
    Input,
    Select,
    Switch,
    Badge
} from '@fluentui/react-components';
import {
    Tag24Regular,
    Options24Regular,
    Info24Regular,
    Save24Regular,
    BuildingFactory24Regular
} from '@fluentui/react-icons';
import { mockCategories } from '../data/mockData';

export const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'categories' | 'preferences' | 'about'>('categories');

    return (
        <div className="settings-content">
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>Settings</h1>
                <Text size={200} style={{ color: '#6B6B6B' }}>System configuration and data management</Text>
            </div>

            <div className="card" style={{ padding: 0 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr' }}>
                    {/* Settings Nav */}
                    <div style={{ borderRight: '1px solid #E0E0E0', padding: '16px' }}>
                        <TabList
                            vertical
                            selectedValue={activeTab}
                            onTabSelect={(_, data) => setActiveTab(data.value as any)}
                        >
                            <Tab value="categories" icon={<Tag24Regular />}>Categories</Tab>
                            <Tab value="preferences" icon={<Options24Regular />}>App Preferences</Tab>
                            <Tab value="about" icon={<Info24Regular />}>About</Tab>
                        </TabList>
                    </div>

                    {/* Settings Panel */}
                    <div style={{ padding: '32px', minHeight: '500px' }}>
                        {activeTab === 'categories' && (
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                    <h3 style={{ margin: 0 }}>Manage Categories</h3>
                                    <Button appearance="primary">Add Category</Button>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {mockCategories.map(cat => (
                                        <div key={cat.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', border: '1px solid #F0F0F0', borderRadius: '4px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: cat.colorCode }}></div>
                                                <Text weight="semibold">{cat.name}</Text>
                                            </div>
                                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                <Badge appearance="tint">Active</Badge>
                                                <Button appearance="subtle" size="small">Edit</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'preferences' && (
                            <form style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '500px' }}>
                                <Field label="Default Warehouse">
                                    <Select defaultValue="main">
                                        <option value="main">Main Warehouse</option>
                                        <option value="dist">Distribution Center</option>
                                    </Select>
                                </Field>
                                <Field label="Currency Symbol">
                                    <Input defaultValue="$" />
                                </Field>
                                <Field label="Low Stock Notification Threshold">
                                    <Input type="number" defaultValue="20" />
                                </Field>

                                <Divider style={{ margin: '12px 0' }} />

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <Text block weight="semibold">Email Notifications</Text>
                                            <Text size={100} style={{ color: '#6B6B6B' }}>Receive alerts when stock is low</Text>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <Text block weight="semibold">Dark Mode</Text>
                                            <Text size={100} style={{ color: '#6B6B6B' }}>Use dark theme across the application</Text>
                                        </div>
                                        <Switch />
                                    </div>
                                </div>

                                <div style={{ marginTop: '24px' }}>
                                    <Button appearance="primary" icon={<Save24Regular />}>Save Changes</Button>
                                </div>
                            </form>
                        )}

                        {activeTab === 'about' && (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <BuildingFactory24Regular style={{ fontSize: '64px', color: 'var(--microsoft-blue)', marginBottom: '16px' }} />
                                <h2 style={{ margin: '0 0 8px 0' }}>Inventory Management App</h2>
                                <Text size={200} block style={{ color: '#6B6B6B', marginBottom: '32px' }}>Version 1.0.0 (Build 2026.02.24)</Text>

                                <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'left', background: '#F5F5F5', padding: '20px', borderRadius: '8px' }}>
                                    <Text weight="semibold" block style={{ marginBottom: '8px' }}>System Info</Text>
                                    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '8px', fontSize: '13px' }}>
                                        <Text style={{ color: '#6B6B6B' }}>Environment:</Text>
                                        <Text>Development</Text>
                                        <Text style={{ color: '#6B6B6B' }}>Data Store:</Text>
                                        <Text>Mock Dataverse</Text>
                                        <Text style={{ color: '#6B6B6B' }}>License:</Text>
                                        <Text>Power Apps Preview</Text>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
