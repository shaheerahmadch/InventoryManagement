import React, { useState } from 'react';
import {
    Button,
    Text,
    Field,
    Input,
    Textarea,
    Select,
    Divider,
    Tooltip
} from '@fluentui/react-components';
import {
    ArrowLeft24Regular,
    ArrowRight24Regular,
    Save24Regular,
    Wand24Regular,
    ImageAdd24Regular,
    Info24Regular
} from '@fluentui/react-icons';
import { mockCategories, mockSuppliers, mockLocations } from '../data/mockData';

interface AddProductProps {
    onBack: () => void;
    onSave: (product: any) => void;
}

export const AddProduct: React.FC<AddProductProps> = ({ onBack, onSave }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        categoryId: '',
        description: '',
        quantityOnHand: 0,
        reorderLevel: 20,
        reorderQuantity: 50,
        unitCost: 0,
        sellingPrice: 0,
        unitOfMeasure: 'Each',
        supplierId: '',
        locationId: ''
    });

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const generateSKU = () => {
        const prefix = formData.name.substring(0, 3).toUpperCase() || 'PROD';
        const timestamp = new Date().getTime().toString().slice(-4);
        handleInputChange('sku', `${prefix}-${timestamp}`);
    };

    const calculateMargin = () => {
        if (formData.sellingPrice <= 0) return '0%';
        const margin = ((formData.sellingPrice - formData.unitCost) / formData.sellingPrice) * 100;
        return `${margin.toFixed(1)}%`;
    };

    const isStepValid = () => {
        if (step === 1) return formData.name && formData.sku && formData.categoryId;
        if (step === 2) return formData.unitCost >= 0 && formData.sellingPrice >= 0;
        if (step === 3) return formData.supplierId && formData.locationId;
        return true;
    };

    return (
        <div className="add-product-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '20px' }}>
                <Button
                    appearance="subtle"
                    icon={<ArrowLeft24Regular />}
                    onClick={onBack}
                >
                    Cancel
                </Button>
            </div>

            <div className="card">
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 600 }}>Add New Product</h1>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <div style={{ flex: 1, height: '4px', background: step >= 1 ? 'var(--microsoft-blue)' : '#E0E0E0', borderRadius: '2px' }}></div>
                        <div style={{ flex: 1, height: '4px', background: step >= 2 ? 'var(--microsoft-blue)' : '#E0E0E0', borderRadius: '2px' }}></div>
                        <div style={{ flex: 1, height: '4px', background: step >= 3 ? 'var(--microsoft-blue)' : '#E0E0E0', borderRadius: '2px' }}></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                        <Text size={200} weight={step === 1 ? 'bold' : 'regular'}>1. Basic Info</Text>
                        <Text size={200} weight={step === 2 ? 'bold' : 'regular'}>2. Stock & Price</Text>
                        <Text size={200} weight={step === 3 ? 'bold' : 'regular'}>3. Logistics</Text>
                    </div>
                </div>

                {step === 1 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <Field label="Product Name" required>
                            <Input
                                value={formData.name}
                                onChange={(_, data) => handleInputChange('name', data.value)}
                                placeholder="e.g. Wireless Mouse M510"
                            />
                        </Field>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', alignItems: 'end' }}>
                            <Field label="SKU" required style={{ flex: 1 }}>
                                <Input
                                    value={formData.sku}
                                    onChange={(_, data) => handleInputChange('sku', data.value)}
                                    placeholder="e.g. WM-M510-BLK"
                                />
                            </Field>
                            <Button icon={<Wand24Regular />} onClick={generateSKU}>Auto-generate</Button>
                        </div>

                        <Field label="Category" required>
                            <Select
                                value={formData.categoryId}
                                onChange={(_, data) => handleInputChange('categoryId', data.value)}
                            >
                                <option value="">Select a category</option>
                                {mockCategories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </Select>
                        </Field>

                        <Field label="Description">
                            <Textarea
                                value={formData.description}
                                onChange={(_, data) => handleInputChange('description', data.value)}
                                rows={4}
                                placeholder="Briefly describe the product..."
                            />
                        </Field>

                        <div style={{
                            height: '120px',
                            border: '2px dashed #E0E0E0',
                            borderRadius: '8px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#6B6B6B',
                            cursor: 'pointer'
                        }}>
                            <ImageAdd24Regular style={{ fontSize: '32px', marginBottom: '8px' }} />
                            <Text>Click to upload image</Text>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                            <Field label="Unit Cost" required>
                                <Input
                                    type="number"
                                    contentBefore="$"
                                    value={formData.unitCost.toString()}
                                    onChange={(_, data) => handleInputChange('unitCost', parseFloat(data.value) || 0)}
                                />
                            </Field>
                            <Field label="Selling Price" required>
                                <Input
                                    type="number"
                                    contentBefore="$"
                                    value={formData.sellingPrice.toString()}
                                    onChange={(_, data) => handleInputChange('sellingPrice', parseFloat(data.value) || 0)}
                                />
                            </Field>
                        </div>

                        <div style={{ background: '#F9F9F9', padding: '12px 16px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Text weight="semibold">Expected Gross Margin</Text>
                                <Tooltip content="Calculated as (Selling Price - Unit Cost) / Selling Price" relationship="label">
                                    <Info24Regular style={{ fontSize: '16px', color: '#6B6B6B' }} />
                                </Tooltip>
                            </div>
                            <Text weight="bold" size={400} style={{ color: 'var(--microsoft-blue)' }}>{calculateMargin()}</Text>
                        </div>

                        <Divider />

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                            <Field label="Initial Quantity">
                                <Input
                                    type="number"
                                    value={formData.quantityOnHand.toString()}
                                    onChange={(_, data) => handleInputChange('quantityOnHand', parseInt(data.value) || 0)}
                                />
                            </Field>
                            <Field label="Unit of Measure">
                                <Select
                                    value={formData.unitOfMeasure}
                                    onChange={(_, data) => handleInputChange('unitOfMeasure', data.value)}
                                >
                                    <option>Each</option>
                                    <option>Box</option>
                                    <option>Kg</option>
                                    <option>Litre</option>
                                </Select>
                            </Field>
                            <Field label="Reorder Level">
                                <Input
                                    type="number"
                                    value={formData.reorderLevel.toString()}
                                    onChange={(_, data) => handleInputChange('reorderLevel', parseInt(data.value) || 0)}
                                />
                            </Field>
                            <Field label="Reorder Quantity">
                                <Input
                                    type="number"
                                    value={formData.reorderQuantity.toString()}
                                    onChange={(_, data) => handleInputChange('reorderQuantity', parseInt(data.value) || 0)}
                                />
                            </Field>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <Field label="Preferred Supplier" required>
                            <Select
                                value={formData.supplierId}
                                onChange={(_, data) => handleInputChange('supplierId', data.value)}
                            >
                                <option value="">Select a supplier</option>
                                {mockSuppliers.map(sup => (
                                    <option key={sup.id} value={sup.id}>{sup.name}</option>
                                ))}
                            </Select>
                        </Field>

                        <Field label="Storage Location" required>
                            <Select
                                value={formData.locationId}
                                onChange={(_, data) => handleInputChange('locationId', data.value)}
                            >
                                <option value="">Select a location</option>
                                {mockLocations.map(loc => (
                                    <option key={loc.id} value={loc.id}>{loc.warehouseName} - {loc.code}</option>
                                ))}
                            </Select>
                        </Field>

                        <Divider />

                        <div style={{ background: '#EFF6FC', padding: '16px', borderRadius: '8px', borderLeft: '4px solid var(--microsoft-blue)' }}>
                            <h4 style={{ margin: '0 0 8px 0' }}>Summary Before Save</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13px' }}>
                                <Text style={{ color: '#6B6B6B' }}>Product:</Text>
                                <Text weight="semibold">{formData.name || '-'}</Text>
                                <Text style={{ color: '#6B6B6B' }}>Initial Stock:</Text>
                                <Text weight="semibold">{formData.quantityOnHand} {formData.unitOfMeasure}</Text>
                                <Text style={{ color: '#6B6B6B' }}>Total Value:</Text>
                                <Text weight="semibold">${(formData.quantityOnHand * formData.unitCost).toFixed(2)}</Text>
                            </div>
                        </div>
                    </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px', borderTop: '1px solid #E0E0E0', paddingTop: '20px' }}>
                    {step > 1 && (
                        <Button onClick={() => setStep(step - 1)}>Back</Button>
                    )}

                    {step < 3 ? (
                        <Button
                            appearance="primary"
                            icon={<ArrowRight24Regular />}
                            iconPosition="after"
                            disabled={!isStepValid()}
                            onClick={() => setStep(step + 1)}
                        >
                            Continue
                        </Button>
                    ) : (
                        <Button
                            appearance="primary"
                            icon={<Save24Regular />}
                            disabled={!isStepValid()}
                            onClick={() => onSave(formData)}
                        >
                            Save Product
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
