"use client";
import { useState, useEffect } from "react";
import {
  Building2,
  Truck,
  Package,
  Calculator,
  FileText,
  Download,
  Copy,
  Plus,
  Trash2,
  CheckCircle,
  XCircle
} from "lucide-react";

/* 🔹 Reusable Input Component */
const Field = ({ label, children, icon: Icon, error, isValid, touched } : {
  label: string;
  children: React.ReactNode;
  icon?: React.ElementType;
  error?: string;
  isValid?: boolean;
  touched?: boolean;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
      {Icon && <Icon size={14} />}
      {label}
      {touched && isValid && <CheckCircle size={14} className="text-green-500" />}
      {touched && error && <XCircle size={14} className="text-red-500" />}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1 flex items-center gap-1">{error}</p>}
  </div>
);

// Define types
type CompanyDetails = {
  name: string;
  address: string;
  mobile: string;
  gst: string;
};

type Item = {
  id: number;
  particular: string;
  hsn: string;
  qty: number;
  unit: string;
  rate: number;
  discount: number;
  gst: number;
};

type Totals = {
  taxableValue: string;
  gstAmount: string;
  totalAmount: string;
};

type FieldName = 'name' | 'address' | 'mobile' | 'gst';
type SectionName = 'receiver' | 'consignee';
type ValidationRules = {
  name: (value: string) => string | null;
  address: (value: string) => string | null;
  mobile: (value: string) => string | null;
  gst?: (value: string) => string | null;
};

type TouchedFields = {
  receiver: Partial<Record<FieldName, boolean>>;
  consignee: Partial<Record<FieldName, boolean>>;
};

type ValidationErrors = {
  receiver: Partial<Record<FieldName, string>>;
  consignee: Partial<Record<FieldName, string>>;
};

export default function InvoiceForm() {
  // 🔒 Default Company Details (Editable but pre-filled)
  const DEFAULT_COMPANY: CompanyDetails = {
    name: "Sunburn Renewable Energy.",
    address: " UG 12, Shree Krishna AC Mall, near Flower Garden Road, beside smc community hall, Royal Star Town ship, Dindoli, Surat, Gujarat 394210",
    mobile: "9081424287",
    gst: "24FIHPR5445A1ZC",
  };

  // 🔒 Default GST %
  const DEFAULT_GST_PERCENT = 18;

  // Updated to only one item with quantity 0
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      particular: "",
      hsn: "995468",
      qty: 0,
      unit: "PCS",
      rate: 0,
      discount: 0,
      gst: DEFAULT_GST_PERCENT,
    }
  ]);

  const [totals, setTotals] = useState<Totals>({
    taxableValue: "0.00",
    gstAmount: "0.00",
    totalAmount: "0.00",
  });

  const [receiver, setReceiver] = useState<CompanyDetails>({
    ...DEFAULT_COMPANY,
  });

  const [consignee, setConsignee] = useState<CompanyDetails>({
    name: "",
    address: "",
    mobile: "",
    gst: "",
  });

  // Track touched fields for validation display
  const [touchedFields, setTouchedFields] = useState<TouchedFields>({
    receiver: {},
    consignee: {},
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    receiver: {},
    consignee: {},
  });

  const [remarks, setRemarks] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [invoiceNumber, setInvoiceNumber] = useState('');

  
  /* 🔢 Calculate totals for all items */
  useEffect(() => {
    let totalTaxable = 0;
    let totalGST = 0;

    
    items.forEach(item => {
      const gross = item.qty * item.rate;
      const discountAmt = (gross * item.discount) / 100;
      const taxable = gross - discountAmt;
      const gstAmt = (taxable * item.gst) / 100;

      totalTaxable += taxable;
      totalGST += gstAmt;
    });

    
    setTotals({
      taxableValue: totalTaxable.toFixed(2),
      gstAmount: totalGST.toFixed(2),
      totalAmount: (totalTaxable + totalGST).toFixed(2),
    });
  }, [items]);

  // Validation rules for each field
  const validationRules: ValidationRules = {
    name: (value: string) => {
      if (!value) return "Name is required";
      if (value.length < 2) return "Name must be at least 2 characters";
      return null;
    },
    address: (value: string) => {
      if (!value) return "Address is required";
      if (value.length < 10) return "Address must be at least 10 characters";
      return null;
    },
    mobile: (value: string) => {
      if (!/^\d{10}$/.test(value)) return "Invalid mobile number";
      return null;
    },
  };
  
  const validateField = (
    section: SectionName,
    field: FieldName,
    value: string
  ): boolean => {
    const error = validationRules[field]?.(value) ?? null;
  
    setValidationErrors(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: error,
      },
    }));
  
    return !error;
  };
  
  // Validate entire section
  const validateSection = (
    section: SectionName,
    data: Partial<CompanyDetails>
  ): boolean => {
    const newErrors: Partial<Record<FieldName, string>> = {};
    let isValid = true;
  
    (Object.keys(data) as FieldName[]).forEach(field => {
      const value = data[field];
      const error = validationRules[field]?.(value ?? "") ?? null;
  
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });
  
    setValidationErrors(prev => ({
      ...prev,
      [section]: newErrors,
    }));
  
    return isValid;
  };
  
  // Handle field blur (mark as touched and validate)
  const handleFieldBlur = (section: SectionName, field: FieldName) => {
    setTouchedFields(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: true
      }
    }));

    // Validate the field on blur
    if (section === 'receiver') {
      validateField('receiver', field, receiver[field]);
    } else if (section === 'consignee') {
      validateField('consignee', field, consignee[field]);
    }
  };

  // Handle receiver changes
  const handleReceiverChange = (field: FieldName, value: string) => {
    setReceiver(prev => ({ ...prev, [field]: value }));
    
    // Auto-validate if field was touched
    if (touchedFields.receiver[field]) {
      validateField('receiver', field, value);
    }
  };

  // Handle consignee changes
  const handleConsigneeChange = (field: FieldName, value: string) => {
    setConsignee(prev => ({ ...prev, [field]: value }));
    
    // Auto-validate if field was touched
    if (touchedFields.consignee[field]) {
      validateField('consignee', field, value);
    }
  };

  const handleItemChange = (id: number, field: keyof Item, value: string | number) => {
    // Clear errors for this field
    const errorKey = `item${field.charAt(0).toUpperCase() + field.slice(1)}_${id - 1}`;
    if (errors[errorKey]) {
      const newErrors = { ...errors };
      delete newErrors[errorKey];
      setErrors(newErrors);
    }

    // Handle numeric fields
    let processedValue: string | number = value;
    if (['qty', 'rate', 'discount', 'gst'].includes(field)) {
      processedValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
      if (field === 'qty' && processedValue < 0) processedValue = 0;
      if (field === 'rate' && processedValue < 0) processedValue = 0;
      if (field === 'discount' && processedValue < 0) processedValue = 0;
      if (field === 'discount' && processedValue > 100) processedValue = 100;
      if (field === 'gst' && processedValue < 0) processedValue = 0;
      if (field === 'gst' && processedValue > 100) processedValue = 100;
    }

    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, [field]: processedValue } : item
    ));
  };

  const addNewItem = () => {
    const newId = Math.max(...items.map(item => item.id)) + 1;
    setItems([
      ...items,
      {
        id: newId,
        particular: "",
        hsn: "995468",
        qty: 0,
        unit: "PCS",
        rate: 0,
        discount: 0,
        gst: 18,
      }
    ]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const copyConsigneeToReceiver = () => {
    // Only copy non-empty fields
    const newReceiver = { ...receiver };
    (Object.keys(consignee) as FieldName[]).forEach(field => {
      if (consignee[field].trim()) {
        (newReceiver[field] as string) = consignee[field];
      }
    });
    
    setReceiver(newReceiver);
    
    // Mark copied fields as touched and validate them
    const newTouched = { ...touchedFields.receiver };
    (Object.keys(consignee) as FieldName[]).forEach(field => {
      if (consignee[field].trim()) {
        newTouched[field] = true;
        validateField('receiver', field, consignee[field]);
      }
    });
    
    setTouchedFields(prev => ({ ...prev, receiver: newTouched }));
  };

  // Check if all required fields in receiver are filled and valid
  const isReceiverValid = () => {
    const requiredFields: FieldName[] = ['name', 'address', 'mobile'];
    return requiredFields.every(field => {
      const error = validationRules[field]?.(receiver[field]) ?? null;
      return !error;
    });
  };

  const validateForm = () => {
    // Validate receiver section
    const isReceiverValid = validateSection('receiver', receiver);
    
    // Validate consignee section (only if any field is filled)
    const consigneeHasData = Object.values(consignee).some(value => value.trim());
    const isConsigneeValid = !consigneeHasData || validateSection('consignee', consignee);

    // Item validation
    const itemErrors: Record<string, string> = {};
    items.forEach((item, index) => {
      if (!item.particular.trim()) itemErrors[`itemParticular_${index}`] = "Particulars are required";
      if (item.qty < 0) itemErrors[`itemQty_${index}`] = "Quantity cannot be negative";
      if (item.rate < 0) itemErrors[`itemRate_${index}`] = "Rate cannot be negative";
      if (item.discount < 0 || item.discount > 100) itemErrors[`itemDiscount_${index}`] = "Discount must be between 0-100%";
      if (item.gst < 0 || item.gst > 100) itemErrors[`itemGST_${index}`] = "GST must be between 0-100%";
    });

    setErrors(itemErrors);

    // Mark all receiver fields as touched for error display
    const allTouched: Partial<Record<FieldName, boolean>> = {};
    (Object.keys(receiver) as FieldName[]).forEach(field => {
      allTouched[field] = true;
    });
    setTouchedFields(prev => ({ ...prev, receiver: allTouched }));

    return isReceiverValid && isConsigneeValid && Object.keys(itemErrors).length === 0;
  };

  const saveAndDownloadInvoice = async () => {
    if (!validateForm()) {
      alert("Please fix the validation errors before proceeding.");
      return;
    }

    try {
      // 1️⃣ Save Invoice
      const payload = {
        receiver,
        consignee,
        items,
        totals,
        remarks,
        invoiceNo: invoiceNumber,
        date: new Date(),
      };

      const saveRes = await fetch("/api/invoice/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const saveData = await saveRes.json();

      if (!saveData.success) {
        alert("Failed to save invoice ❌");
        return;
      }

      const invoiceId = saveData.invoice._id;

      const res = await fetch("/api/invoice/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ invoiceId }),
      });

      if (!res.ok) {
        alert("Failed to generate PDF ❌");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Invoice-${invoiceNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      alert("Invoice saved & downloaded successfully ✅");
    } catch (error) {
      console.error(error);
      alert("Server error ❌");
    }
  };

  // Helper to get field validation status
 // Helper to get field validation status
const getFieldStatus = (section: SectionName, field: FieldName) => {
  const touched = touchedFields[section]?.[field];
  const error = validationErrors[section]?.[field];
  const value = section === 'receiver' ? receiver[field] : consignee[field];
  const hasValue = !!value.trim();
  
  return {
    touched: touched || false,
    error,
    isValid: touched && !error && hasValue,
    hasError: touched && !!error
  };
};

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE4IDZMNyAxN0w3IDM3SDQxVjE3TDMwIDZIMThaIiBmaWxsPSIjMzY2RkNDIi8+CjxwYXRoIGQ9Ik0xOC40OTQxIDIxLjQwMzdDMTguNDk0MSAxOC4yNTEgMjAuOTUxMSAxNS42OTkyIDIzLjk5NDEgMTUuNjk5MkMyNy4wMzcxIDE1LjY5OTIgMjkuNDk0MSAxOC4yNTEgMjkuNDk0MSAyMS40MDM3QzI5LjQ5NDEgMjQuNTU2NCAyNy4wMzcxIDI3LjEwODIgMjMuOTk0MSAyNy4xMDgyQzIwLjk1MTEgMjcuMTA4MiAxOC40OTQxIDI0LjU1NjQgMTguNDk0MSAyMS40MDM3WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTM1IDQwSDQxVjM0TDM1IDQwWiIgZmlsbD0iIzRGRUFFRSIvPgo8L3ZnPgo=";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 p-6 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl shadow-xl text-white">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            {/* Logo Image */}
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg">
              <img
                src="/logo.jpeg"
                alt="Sunburn Renewable Energy Logo"
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Sunburn Renewable Energy</h1>
              <p className="text-blue-100">Renewable Energy Invoice System</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">TAX INVOICE</p>
            <p className="text-blue-100">{invoiceNumber}</p>
            <p className="text-sm mt-1">{new Date().toLocaleDateString('en-IN')}</p>
          </div>
        </div>

        {/* Receiver & Consignee */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Receiver */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-blue-100">
              <div className="flex items-center gap-2">
                <Building2 className="text-blue-600" size={20} />
                <h2 className="font-bold text-lg text-gray-800">Bill To (Receiver) *</h2>
                <div className={`ml-2 px-2 py-1 text-xs rounded-full ${isReceiverValid() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {isReceiverValid() ? '✓ All Required Fields Valid' : '✗ Required'}
                </div>
              </div>
              <button
                onClick={copyConsigneeToReceiver}
                className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded-lg flex items-center gap-1 transition-colors"
                disabled={!Object.values(consignee).some(val => val.trim())}
              >
                <Copy size={12} /> Copy from Consignee
              </button>
            </div>

            <div className="space-y-4">
              <Field 
                label="Company/Client Name" 
                icon={Building2}
                error={getFieldStatus('receiver', 'name').error}
                isValid={getFieldStatus('receiver', 'name').isValid}
                touched={getFieldStatus('receiver', 'name').touched}
              >
                <input
                  className={`input-field ${getFieldStatus('receiver', 'name').hasError ? 'border-red-500' : getFieldStatus('receiver', 'name').isValid ? 'border-green-500' : ''}`}
                  value={receiver.name}
                  onChange={(e) => handleReceiverChange('name', e.target.value)}
                  onBlur={() => handleFieldBlur('receiver', 'name')}
                  placeholder="Enter company name"
                />
              </Field>

              <Field 
                label="Address"
                error={getFieldStatus('receiver', 'address').error}
                isValid={getFieldStatus('receiver', 'address').isValid}
                touched={getFieldStatus('receiver', 'address').touched}
              >
                <textarea
                  className={`input-field h-20 ${getFieldStatus('receiver', 'address').hasError ? 'border-red-500' : getFieldStatus('receiver', 'address').isValid ? 'border-green-500' : ''}`}
                  value={receiver.address}
                  onChange={(e) => handleReceiverChange('address', e.target.value)}
                  onBlur={() => handleFieldBlur('receiver', 'address')}
                  placeholder="Full address with state and PIN"
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field 
                  label="Mobile No"
                  error={getFieldStatus('receiver', 'mobile').error}
                  isValid={getFieldStatus('receiver', 'mobile').isValid}
                  touched={getFieldStatus('receiver', 'mobile').touched}
                >
                  <input
                    className={`input-field ${getFieldStatus('receiver', 'mobile').hasError ? 'border-red-500' : getFieldStatus('receiver', 'mobile').isValid ? 'border-green-500' : ''}`}
                    value={receiver.mobile}
                    onChange={(e) => handleReceiverChange('mobile', e.target.value)}
                    onBlur={() => handleFieldBlur('receiver', 'mobile')}
                    placeholder="10-digit mobile"
                    type="tel"
                    maxLength={10}
                  />
                </Field>

                <Field 
                  label="GST No"
                  error={getFieldStatus('receiver', 'gst').error}
                  isValid={getFieldStatus('receiver', 'gst').isValid}
                  touched={getFieldStatus('receiver', 'gst').touched}
                >
                  <input
                    className={`input-field font-mono ${getFieldStatus('receiver', 'gst').hasError ? 'border-red-500' : getFieldStatus('receiver', 'gst').isValid ? 'border-green-500' : ''}`}
                    value={receiver.gst}
                    onChange={(e) => handleReceiverChange('gst', e.target.value.toUpperCase())}
                    onBlur={() => handleFieldBlur('receiver', 'gst')}
                    placeholder="29XXXXXXX"
                    maxLength={15}
                  />
                </Field>
              </div>
            </div>
          </div>

          {/* Consignee */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-emerald-100">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-emerald-100">
              <Truck className="text-emerald-600" size={20} />
              <h2 className="font-bold text-lg text-gray-800">Ship To (Consignee)</h2>
              <div className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                Optional
              </div>
            </div>

            <div className="space-y-4">
              <Field 
                label="Company/Client Name" 
                icon={Building2}
                error={getFieldStatus('consignee', 'name').error}
                isValid={getFieldStatus('consignee', 'name').isValid}
                touched={getFieldStatus('consignee', 'name').touched}
              >
                <input
                  className={`input-field ${getFieldStatus('consignee', 'name').hasError ? 'border-red-500' : getFieldStatus('consignee', 'name').isValid ? 'border-green-500' : ''}`}
                  value={consignee.name}
                  onChange={(e) => handleConsigneeChange('name', e.target.value)}
                  onBlur={() => handleFieldBlur('consignee', 'name')}
                  placeholder="Enter consignee name"
                />
              </Field>

              <Field 
                label="Address"
                error={getFieldStatus('consignee', 'address').error}
                isValid={getFieldStatus('consignee', 'address').isValid}
                touched={getFieldStatus('consignee', 'address').touched}
              >
                <textarea
                  className={`input-field h-20 ${getFieldStatus('consignee', 'address').hasError ? 'border-red-500' : getFieldStatus('consignee', 'address').isValid ? 'border-green-500' : ''}`}
                  value={consignee.address}
                  onChange={(e) => handleConsigneeChange('address', e.target.value)}
                  onBlur={() => handleFieldBlur('consignee', 'address')}
                  placeholder="Shipping address"
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field 
                  label="Mobile No"
                  error={getFieldStatus('consignee', 'mobile').error}
                  isValid={getFieldStatus('consignee', 'mobile').isValid}
                  touched={getFieldStatus('consignee', 'mobile').touched}
                >
                  <input
                    className={`input-field ${getFieldStatus('consignee', 'mobile').hasError ? 'border-red-500' : getFieldStatus('consignee', 'mobile').isValid ? 'border-green-500' : ''}`}
                    value={consignee.mobile}
                    onChange={(e) => handleConsigneeChange('mobile', e.target.value)}
                    onBlur={() => handleFieldBlur('consignee', 'mobile')}
                    placeholder="10-digit mobile"
                    type="tel"
                    maxLength={10}
                  />
                </Field>

                <Field 
                  label="GST No"
                  error={getFieldStatus('consignee', 'gst').error}
                  isValid={getFieldStatus('consignee', 'gst').isValid}
                  touched={getFieldStatus('consignee', 'gst').touched}
                >
                  <input
                    className={`input-field font-mono ${getFieldStatus('consignee', 'gst').hasError ? 'border-red-500' : getFieldStatus('consignee', 'gst').isValid ? 'border-green-500' : ''}`}
                    value={consignee.gst}
                    onChange={(e) => handleConsigneeChange('gst', e.target.value.toUpperCase())}
                    onBlur={() => handleFieldBlur('consignee', 'gst')}
                    placeholder="29XXXXXXX"
                    maxLength={15}
                  />
                </Field>
              </div>
            </div>
          </div>
        </div>

        {/* Item Details - Single Row */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="text-blue-600" size={20} />
                <h2 className="font-bold text-lg text-gray-800">Solar Equipment Details</h2>
              </div>
              <button
                onClick={addNewItem}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
              >
                <Plus size={16} /> Add Item
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-left text-sm font-semibold text-gray-700">
                  <th className="p-4">#</th>
                  <th className="p-4 min-w-[300px]">Particulars *</th>
                  <th className="p-4">HSN / SAC</th>
                  <th className="p-4">Qty *</th>
                  <th className="p-4">Unit</th>
                  <th className="p-4">Rate (₹)</th>
                  <th className="p-4">Disc %</th>
                  <th className="p-4">GST %</th>
                  <th className="p-4">Amount (₹)</th>
                  {items.length > 1 && <th className="p-4">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  const gross = item.qty * item.rate;
                  const discountAmt = (gross * item.discount) / 100;
                  const taxable = gross - discountAmt;
                  const gstAmt = (taxable * item.gst) / 100;
                  const total = taxable + gstAmt;

                  return (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">
                        <input
                          className={`input-field-no-border w-full ${errors[`itemParticular_${index}`] ? 'border border-red-500 rounded' : ''}`}
                          value={item.particular}
                          onChange={(e) => handleItemChange(item.id, 'particular', e.target.value)}
                          placeholder="e.g., Solar Panel 540W Bifacial"
                        />
                        {errors[`itemParticular_${index}`] && (
                          <p className="text-red-500 text-xs mt-1">{errors[`itemParticular_${index}`]}</p>
                        )}
                      </td>
                      <td className="p-4">
                        <input
                          type="text"
                          className="input-field-no-border w-full font-mono text-center"
                          value={item.hsn}
                          onChange={(e) => handleItemChange(item.id, 'hsn', e.target.value)}
                        />
                      </td>
                      <td className="p-4">
                        <input
                          type="number"
                          className={`input-field-no-border w-20 text-center ${errors[`itemQty_${index}`] ? 'border border-red-500 rounded' : ''}`}
                          value={item.qty}
                          onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)}
                          min="0"
                          step="1"
                        />
                        {errors[`itemQty_${index}`] && (
                          <p className="text-red-500 text-xs mt-1">{errors[`itemQty_${index}`]}</p>
                        )}
                      </td>
                      <td className="p-4">
                        <select
                          className="input-field-no-border w-24"
                          value={item.unit}
                          onChange={(e) => handleItemChange(item.id, 'unit', e.target.value)}
                        >
                          <option value="PCS">PCS</option>
                          <option value="SET">SET</option>
                          <option value="KW">KW</option>
                          <option value="MTR">MTR</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <input
                          type="number"
                          className={`input-field-no-border w-32 ${errors[`itemRate_${index}`] ? 'border border-red-500 rounded' : ''}`}
                          value={item.rate}
                          onChange={(e) => handleItemChange(item.id, 'rate', e.target.value)}
                          min="0"
                          step="0.01"
                        />
                        {errors[`itemRate_${index}`] && (
                          <p className="text-red-500 text-xs mt-1">{errors[`itemRate_${index}`]}</p>
                        )}
                      </td>
                      <td className="p-4">
                        <input
                          type="number"
                          className={`input-field-no-border w-20 text-center ${errors[`itemDiscount_${index}`] ? 'border border-red-500 rounded' : ''}`}
                          value={item.discount}
                          onChange={(e) => handleItemChange(item.id, 'discount', e.target.value)}
                          min="0"
                          max="100"
                          step="0.01"
                        />
                        {errors[`itemDiscount_${index}`] && (
                          <p className="text-red-500 text-xs mt-1">{errors[`itemDiscount_${index}`]}</p>
                        )}
                      </td>
                      <td className="p-4">
                        <input
                          type="number"
                          className={`input-field-no-border w-24 text-center ${errors[`itemGST_${index}`] ? 'border border-red-500 rounded' : ''}`}
                          value={item.gst}
                          onChange={(e) => handleItemChange(item.id, 'gst', e.target.value)}
                          min="0"
                          max="100"
                          step="0.01"
                        />
                        {errors[`itemGST_${index}`] && (
                          <p className="text-red-500 text-xs mt-1">{errors[`itemGST_${index}`]}</p>
                        )}
                      </td>
                      <td className="p-4 font-semibold">
                        ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                      {items.length > 1 && (
                        <td className="p-4">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals & Remarks */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Total Summary */}
          <div className="md:col-span-2 bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="text-blue-600" size={20} />
              <h2 className="font-bold text-lg text-gray-800">Amount Summary</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Taxable Value</p>
                <p className="text-2xl font-bold text-blue-700">
                  ₹{parseFloat(totals.taxableValue).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-emerald-100 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">GST Amount</p>
                <p className="text-2xl font-bold text-emerald-700">
                  ₹{parseFloat(totals.gstAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
              </div>

              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-5 rounded-xl shadow-lg">
                <p className="text-sm text-emerald-100 mb-1">Grand Total</p>
                <p className="text-3xl font-bold text-white">
                  ₹{parseFloat(totals.totalAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-emerald-100 mt-2">Inclusive of all taxes</p>
              </div>
            </div>
          </div>

          {/* Remarks */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="text-gray-600" size={20} />
              <h2 className="font-bold text-lg text-gray-800">Terms & Remarks</h2>
            </div>

            <textarea
              className="input-field h-40"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Payment terms, delivery instructions, warranty details..."
            />

            <div className="mt-4 text-sm text-gray-500">
              <p>Standard Terms:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Payment within 15 days</li>
                <li>25% advance with order</li>
                <li>5 years panel warranty</li>
                <li>Delivery: 7-10 working days</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Single Action Button */}
        <div className="flex flex-col items-center pt-6 border-t border-gray-200">
          <button
            onClick={saveAndDownloadInvoice}
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center gap-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isReceiverValid()}
          >
            <Download size={22} />
            {isReceiverValid() ? 'Save & Download PDF Invoice' : 'Fill Required Fields First'}
          </button>
          <p className="text-sm text-gray-500 mt-3">
            {isReceiverValid() 
              ? "Click to save the invoice and download as PDF" 
              : "Please complete all required fields in Bill To section"}
          </p>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Solar Solutions Pro • GST No: 29AAICS1234M1Z5 • solar@solutionspro.in • +91 9876543210</p>
          <p className="mt-1">Empowering Green Energy Across India • ISO 9001:2015 Certified</p>
        </div>
      </div>

      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 0.75rem;
          border: 1.5px solid #cbd5e1;
          border-radius: 0.75rem;
          font-size: 0.95rem;
          background: #ffffff;
          color: #111827;
          transition: all 0.2s ease;
        }

        .input-field.error {
          border-color: #ef4444;
        }

        .input-field::placeholder {
          color: #6b7280;
          opacity: 1;
        }

        .input-field:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }

        .input-field.border-red-500 {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
        }

        .input-field.border-green-500 {
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
        }

        .input-field-no-border {
          width: 100%;
          padding: 0.5rem;
          border: none;
          background: #ffffff;
          color: #111827;
        }

        .input-field-no-border::placeholder {
          color: #9ca3af;
        }

        .input-field-no-border:focus {
          outline: none;
          background: #eff6ff;
          border-radius: 0.375rem;
        }

        table th {
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
        }

        table tr:hover {
          background-color: rgba(219, 234, 254, 0.3);
        }
      `}</style>
    </div>
  );
}