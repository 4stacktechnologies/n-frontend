import { useState } from 'react';
import { Package, Tag, Cpu, DollarSign, Shield, Image, Sparkles, AlertCircle, CheckCircle, Monitor, Code, Upload, ChevronRight, Save, Plus, X } from 'lucide-react';
import axios from 'axios';
import toast from "react-hot-toast";
import ExtractDetailsBox from '../../components/ExtractDetailsBox';
import { useNavigate } from 'react-router-dom';

const COLORS = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Silver', hex: '#C0C0C0' },
  { name: 'Gold', hex: '#FFD700' },
  { name: 'Rose Gold', hex: '#B76E79' },
  { name: 'Space Gray', hex: '#717378' },
  { name: 'Blue', hex: '#4A90E2' },
  { name: 'Red', hex: '#E74C3C' },
  { name: 'Green', hex: '#27AE60' },
  { name: 'Purple', hex: '#9B59B6' },
];

const CATEGORIES = ['Mobile', 'Laptop', 'Tablet', 'Smartwatch', 'Headphones', 'Other'];
const BRANDS = ['Apple', 'Samsung', 'Dell', 'HP', 'Lenovo', 'OnePlus', 'Xiaomi', 'Asus', 'Other'];

export const extractText = (value) =>
  typeof value === "string" ? value.trim() : value;

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_API_CLOUDINARY_PRESET
  );

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_API_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  console.log("Cloudinary response:", data);

  if (!res.ok) {
    throw new Error(data.error?.message || "Upload failed");
  }

  return {
    id: data.public_id,
    url: data.secure_url,
  };
};

export default function CreateProduct() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    brand: "",
    model: "",
    condition: "NEW",
    usageDuration: "",
    physicalCondition: "",
    isRefurbished: false,
    ram: { size: "", type: "" },
    storage: { size: "", type: "" },
    processor: {
      company: "",
      model: "",
      generation: "",
      baseClock: "",
      turboClock: "",
      cache: "",
    },
    graphics: "",
    display: {
      size: "",
      resolution: "",
      panel: "",
      refreshRate: "",
      brightness: "",
      aspectRatio: "",
    },
    operatingSystem: "",
    preInstalledSoftware: [],
    color: "",
    keyboard: { backlit: false, layout: "" },
    ports: {
      usbTypeC: 0,
      usbTypeA: 0,
      hdmi: 0,
      microSD: false,
      rj45: false,
      headphoneJack: true,
    },
    wifi: "",
    bluetooth: "",
    battery: { capacity: "" },
    charger: { power: "", type: "" },
    camera: { resolution: "" },
    audio: "",
    fingerprintReader: false,
    opticalDrive: false,
    originalPrice: "",
    sellingPrice: "",
    negotiable: false,
    warrantyAvailable: false,
    warrantyPeriod: "",
    status: "AVAILABLE",
    images: [],
  });

  const [uploading, setUploading] = useState(false);
  const [extractLoading, setExtractLoading] = useState(false);
  const [rawText, setRawText] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field) => {
    let error = '';
    const value = field.includes('.')
      ? formData[field.split('.')[0]][field.split('.')[1]]
      : formData[field];

    switch (field) {
      case 'title':
        if (!value || value.trim() === '') {
          error = 'Title is required';
        } else if (value.length < 3) {
          error = 'Title must be at least 3 characters';
        }
        break;
      case 'category':
        if (!value || value === '') {
          error = 'Category is required';
        }
        break;
      case 'brand':
        if (!value || value === '') {
          error = 'Brand is required';
        }
        break;
      case 'model':
        if (!value || value.trim() === '') {
          error = 'Model is required';
        }
        break;
      case 'sellingPrice':
        if (!value || value === '') {
          error = 'Selling price is required';
        } else if (isNaN(value) || parseFloat(value) <= 0) {
          error = 'Selling price must be greater than 0';
        } else if (formData.originalPrice && parseFloat(value) > parseFloat(formData.originalPrice)) {
          error = 'Selling price must be less than or equal to original price';
        }
        break;
      case 'originalPrice':
        if (value && (isNaN(value) || parseFloat(value) <= 0)) {
          error = 'Original price must be greater than 0';
        }
        if (value && formData.sellingPrice && parseFloat(formData.sellingPrice) > parseFloat(value)) {
          setErrors(prev => ({ ...prev, sellingPrice: 'Selling price must be less than or equal to original price' }));
        } else if (value && formData.sellingPrice && parseFloat(formData.sellingPrice) <= parseFloat(value)) {
          setErrors(prev => ({ ...prev, sellingPrice: '' }));
        }
        break;
      case 'ram.size':
        if (value && !/^\d+\s?(GB|MB)$/i.test(value)) {
          error = 'RAM size must be like 16GB';
        }
        break;
      case 'storage.size':
        if (value && !/^\d+\s?(GB|TB)$/i.test(value)) {
          error = 'Storage must be like 512GB';
        }
        break;
      case 'usageDuration':
        if (formData.condition === 'USED' && (!value || value.trim() === '')) {
          error = 'Usage duration is required for used products';
        }
        break;
      case 'physicalCondition':
        if (formData.condition === 'USED' && (!value || value === '')) {
          error = 'Physical condition is required for used products';
        }
        break;
      case 'warrantyPeriod':
        if (formData.warrantyAvailable && (!value || value.trim() === '')) {
          error = 'Warranty period is required when warranty is available';
        }
        break;
    }

    setErrors(prev => ({ ...prev, [field]: error }));
    return error;
  };

  const validateAllFields = () => {
    const newErrors = {};
    const requiredFields = ['title', 'category', 'brand', 'model', 'sellingPrice'];

    requiredFields.forEach(field => {
      const error = validateField(field);
      if (error) newErrors[field] = error;
    });

    if (formData.condition === 'USED') {
      const usageDurationError = validateField('usageDuration');
      if (usageDurationError) newErrors.usageDuration = usageDurationError;

      const physicalConditionError = validateField('physicalCondition');
      if (physicalConditionError) newErrors.physicalCondition = physicalConditionError;
    }

    if (formData.warrantyAvailable) {
      const warrantyError = validateField('warrantyPeriod');
      if (warrantyError) newErrors.warrantyPeriod = warrantyError;
    }

    if (formData.ram) {
      const ramError = validateField('ram');
      if (ramError) newErrors.ram = ramError;
    }

    if (formData.storage?.size) {
      validateField("storage.size");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateProgress = () => {
    const allFields = [
      'title', 'description', 'category', 'brand', 'model',
      'condition', 'color',
      'processor.company', 'processor.model', 'processor.generation',
      'graphics', 'display.size', 'display.resolution', 'display.panel', 'display.refreshRate',
      'operatingSystem', 'keyboard.layout',
      'originalPrice', 'sellingPrice',
      'ram.size',
      'ram.type',
      'storage.size',
      'storage.type',
      'processor.baseClock',
      'processor.turboClock',
      'processor.cache',
      'display.brightness',
      'display.aspectRatio',
      'wifi',
      'battery.capacity',
      'charger.power',
      'camera.resolution',
    ];

    const conditionalFields = [];
    if (formData.condition === 'USED') {
      conditionalFields.push('usageDuration', 'physicalCondition');
    }
    if (formData.warrantyAvailable) {
      conditionalFields.push('warrantyPeriod');
    }

    const totalFields = [...allFields, ...conditionalFields];
    const filledFields = totalFields.filter(field => {
      const value = field.includes('.')
        ? formData[field.split('.')[0]][field.split('.')[1]]
        : formData[field];
      return value !== '' && value !== null && value !== undefined;
    });

    return {
      filled: filledFields.length,
      total: totalFields.length,
      percentage: Math.round((filledFields.length / totalFields.length) * 100)
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allTouched = {};
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    const isValid = validateAllFields();
    if (!isValid) {
      toast.error("Please fix all validation errors before submitting");
      return;
    }

    const dataToSend = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      brand: formData.brand,
      model: formData.model.trim(),
      condition: formData.condition,
      usageDuration:
        formData.condition === "USED" ? formData.usageDuration.trim() : null,
      physicalCondition:
        formData.condition === "USED" ? formData.physicalCondition : null,
      isRefurbished:
        formData.condition === "USED" ? formData.isRefurbished : false,
      ram: {
        size: formData.ram.size || null,
        type: formData.ram.type || null,
      },
      storage: {
        size: formData.storage.size || null,
        type: formData.storage.type || null,
      },
      color: formData.color || null,
      processor: {
        company: formData.processor.company || null,
        model: formData.processor.model || null,
        generation: formData.processor.generation || null,
        baseClock: formData.processor.baseClock || null,
        turboClock: formData.processor.turboClock || null,
        cache: formData.processor.cache || null,
      },
      ports: formData.ports,
      wifi: formData.wifi || null,
      bluetooth: formData.bluetooth || null,
      battery: formData.battery,
      charger: formData.charger,
      camera: formData.camera,
      audio: formData.audio || null,
      fingerprintReader: formData.fingerprintReader,
      opticalDrive: formData.opticalDrive,
      graphics: formData.graphics.trim() || null,
      display: {
        size: formData.display.size || null,
        resolution: formData.display.resolution || null,
        panel: formData.display.panel || null,
        refreshRate: formData.display.refreshRate || null,
      },
      operatingSystem: formData.operatingSystem.trim() || null,
      preInstalledSoftware: formData.preInstalledSoftware,
      keyboard: {
        backlit: formData.keyboard.backlit,
        layout: formData.keyboard.layout.trim() || null,
      },
      originalPrice: formData.originalPrice
        ? parseFloat(formData.originalPrice)
        : null,
      sellingPrice: parseFloat(formData.sellingPrice),
      negotiable: formData.negotiable,
      warrantyAvailable: formData.warrantyAvailable,
      warrantyPeriod: formData.warrantyAvailable
        ? formData.warrantyPeriod.trim()
        : null,
      images: formData.images,
      status: formData.status || "AVAILABLE",
    };

    const toastId = toast.loading("Creating product...");

    try {
      const res = await axios.post(
        import.meta.env.VITE_API_PRODUCT || "/api/products",
        dataToSend,
        { withCredentials: true }
      );

      toast.success("Product created successfully!", { id: toastId });
      console.log("Response:", res.data);
      navigate("/products");

    } catch (error) {
      toast.error(
        error.response?.data?.msg || "Failed to create product",
        { id: toastId }
      );
      console.error("Error submitting form:", error);
    }
  };

  const handleExtract = async () => {
    if (!rawText.trim()) {
      toast.error("Please paste product details first");
      return;
    }

    try {
      setExtractLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_PRODUCT}/extract`,
        { text: rawText },
        { withCredentials: true }
      );

      const data = res.data;

      setFormData((prev) => ({
        ...prev,
        title: data.title || "",
        description: data.description || "",
        category: data.category || "Laptop",
        brand: data.brand || "",
        model: data.model || "",
        condition: data.condition || "NEW",
        usageDuration: data.usageDuration || "",
        physicalCondition: data.physicalCondition || "",
        isRefurbished: Boolean(data.isRefurbished),
        ram: {
          size: data.ram?.size || "",
          type: data.ram?.type || "",
        },
        storage: {
          size: data.storage?.size || "",
          type: data.storage?.type || "",
        },
        processor: {
          company: data.processor?.company || "",
          model: data.processor?.model || "",
          generation: data.processor?.generation || "",
          baseClock: data.processor?.baseClock || "",
          turboClock: data.processor?.turboClock || "",
          cache: data.processor?.cache || "",
        },
        graphics: data.graphics || "",
        display: {
          size: data.display?.size || "",
          resolution: data.display?.resolution || "",
          panel: data.display?.panel || "",
          refreshRate: data.display?.refreshRate || "",
          brightness: data.display?.brightness || "",
          aspectRatio: data.display?.aspectRatio || "",
        },
        operatingSystem: data.operatingSystem || "",
        preInstalledSoftware: Array.isArray(data.preInstalledSoftware)
          ? data.preInstalledSoftware
          : [],
        color: data.color || "",
        keyboard: {
          backlit: Boolean(data.keyboard?.backlit),
          layout: data.keyboard?.layout || "",
        },
        ports: {
          usbTypeC: data.ports?.usbTypeC ?? prev.ports.usbTypeC,
          usbTypeA: data.ports?.usbTypeA ?? prev.ports.usbTypeA,
          hdmi: data.ports?.hdmi ?? prev.ports.hdmi,
          microSD: Boolean(data.ports?.microSD),
          rj45: Boolean(data.ports?.rj45),
          headphoneJack:
            data.ports?.headphoneJack !== undefined
              ? Boolean(data.ports.headphoneJack)
              : prev.ports.headphoneJack,
        },
        wifi: data.wifi || "",
        bluetooth: data.bluetooth || "",
        battery: {
          capacity: data.battery?.capacity || "",
        },
        charger: {
          power: data.charger?.power || "",
          type: data.charger?.type || "",
        },
        camera: {
          resolution: data.camera?.resolution || "",
        },
        audio: data.audio || "",
        fingerprintReader: Boolean(data.fingerprintReader),
        opticalDrive: Boolean(data.opticalDrive),
        originalPrice: data.originalPrice ?? "",
        sellingPrice: data.sellingPrice ?? "",
        negotiable: true,
        warrantyAvailable: Boolean(data.warrantyAvailable),
        warrantyPeriod: data.warrantyPeriod || "",
        status: data.status || "AVAILABLE",
      }));

      toast.success("Product details extracted successfully ✨");
    } catch (err) {
      console.error(err);
      toast.error("Failed to extract product details");
    } finally {
      setExtractLoading(false);
    }
  };

  const progress = calculateProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3 md:p-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Compact Header */}
        <div className="mb-4 md:mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-200 flex-shrink-0">
              <Sparkles className="w-5 h-5 text-gray-700" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                Create Product
              </h1>
              <p className="text-gray-600 text-xs md:text-sm mt-0.5">
                Add new or second-hand product to your inventory
              </p>
            </div>
          </div>

          {/* Compact Progress Bar */}
          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 mb-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-gray-600" />
                <span className="text-xs text-gray-700">
                  <span className="font-bold">{progress.filled}</span>
                  <span className="text-gray-500">/{progress.total}</span> fields
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-900">{progress.percentage}%</div>
              </div>
            </div>
            <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gray-800 rounded-full transition-all duration-300"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Compact AI Extraction Box */}
        <div className="mb-4">
          <ExtractDetailsBox
            value={rawText}
            onChange={setRawText}
            onExtract={handleExtract}
            loading={extractLoading}
            compact={true}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Information */}
          <Section icon={Package} title="Basic Information" badge="Required">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                label="Product Title"
                required
                placeholder="e.g., iPhone 14 Pro Max"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                onBlur={() => handleBlur('title')}
                error={touched.title && errors.title}
              />

              <Select
                label="Category"
                required
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                onBlur={() => handleBlur('category')}
                error={touched.category && errors.category}
              >
                <option value="">Select category</option>
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </Select>

              <Select
                label="Brand"
                required
                value={formData.brand}
                onChange={(e) => handleChange('brand', e.target.value)}
                onBlur={() => handleBlur('brand')}
                error={touched.brand && errors.brand}
              >
                <option value="">Select brand</option>
                {BRANDS.map(brand => <option key={brand} value={brand}>{brand}</option>)}
              </Select>

              <Input
                label="Model"
                required
                placeholder="e.g., A2894"
                value={formData.model}
                onChange={(e) => handleChange('model', e.target.value)}
                onBlur={() => handleBlur('model')}
                error={touched.model && errors.model}
              />
            </div>

            <Textarea
              label="Description"
              placeholder="Describe the product features, condition, and other details..."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </Section>

          {/* Condition */}
          <Section icon={Tag} title="Condition & Status">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Condition *</label>
                <div className="grid grid-cols-2 gap-2">
                  {['NEW', 'USED'].map(cond => (
                    <button
                      key={cond}
                      type="button"
                      onClick={() => handleChange('condition', cond)}
                      className={`p-2.5 rounded border transition-all ${formData.condition === cond
                          ? 'border-gray-800 bg-gray-800 text-white'
                          : 'border-gray-300 bg-white text-gray-800 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                    >
                      <div className="font-medium text-sm">{cond === 'NEW' ? '🆕 New' : '♻️ Used'}</div>
                    </button>
                  ))}
                </div>
              </div>

              {formData.condition === 'USED' && (
                <>
                  <Input
                    label="Usage Duration"
                    placeholder="e.g., 6 months, 1 year"
                    value={formData.usageDuration}
                    onChange={(e) => handleChange('usageDuration', e.target.value)}
                    onBlur={() => handleBlur('usageDuration')}
                    error={touched.usageDuration && errors.usageDuration}
                    required
                  />

                  <Select
                    label="Physical Condition"
                    value={formData.physicalCondition}
                    onChange={(e) => handleChange('physicalCondition', e.target.value)}
                    onBlur={() => handleBlur('physicalCondition')}
                    error={touched.physicalCondition && errors.physicalCondition}
                    required
                  >
                    <option value="">Select condition</option>
                    <option value="EXCELLENT">Excellent - Like New</option>
                    <option value="GOOD">Good - Minor wear</option>
                    <option value="AVERAGE">Average - Normal wear</option>
                    <option value="POOR">Poor - Significant wear</option>
                  </Select>
                </>
              )}
            </div>

            {formData.condition === 'USED' && (
              <Checkbox
                label="This is a refurbished product"
                checked={formData.isRefurbished}
                onChange={(e) => handleChange('isRefurbished', e.target.checked)}
              />
            )}
          </Section>

          {/* Hardware Details */}
          <Section icon={Cpu} title="Hardware Specifications">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <Input
                label="RAM Size"
                placeholder="16GB"
                value={formData.ram.size}
                onChange={(e) => handleChange("ram.size", e.target.value)}
              />

              <Input
                label="RAM Type (LPDDR4X)"
                value={formData.ram.type}
                onChange={(e) => handleChange("ram.type", e.target.value)}
              />

              <Input
                label="Storage Size"
                placeholder="512GB"
                value={formData.storage.size}
                onChange={(e) => handleChange("storage.size", e.target.value)}
              />

              <Input
                label="Storage Type (SSD / HDD)"
                value={formData.storage.type}
                onChange={(e) => handleChange("storage.type", e.target.value)}
              />

              <div className="md:col-span-2 lg:col-span-1">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Color</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {COLORS.map(color => (
                    <button
                      key={color.name}
                      type="button"
                      title={color.name}
                      onClick={() => handleChange('color', color.name)}
                      className={`w-full aspect-square rounded border transition-all relative ${formData.color === color.name
                          ? 'border-gray-800 shadow-sm scale-105'
                          : 'border-gray-300 hover:border-gray-400'
                        }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {color.hex === '#FFFFFF' && (
                        <div className="absolute inset-0 border border-gray-300 rounded" />
                      )}
                      {formData.color === color.name && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full border-2 border-gray-800" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                {formData.color && (
                  <p className="text-xs text-gray-600 mt-1 text-center">{formData.color}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
              <Input
                label="Processor Company"
                placeholder="e.g., Intel, AMD, Apple"
                value={formData.processor.company}
                onChange={(e) => handleChange('processor.company', e.target.value)}
              />
              <Input
                label="Processor Model"
                placeholder="e.g., Core i5 120U, A16 Bionic"
                value={formData.processor.model}
                onChange={(e) => handleChange('processor.model', e.target.value)}
              />
              <Input
                label="Processor Generation"
                placeholder="e.g., 12th Gen, M2"
                value={formData.processor.generation}
                onChange={(e) => handleChange('processor.generation', e.target.value)}
              />
              <Input
                label="Base Clock (GHz)"
                value={formData.processor.baseClock}
                onChange={(e) => handleChange("processor.baseClock", e.target.value)}
              />

              <Input
                label="Turbo Clock (GHz)"
                value={formData.processor.turboClock}
                onChange={(e) => handleChange("processor.turboClock", e.target.value)}
              />

              <Input
                label="Cache (MB)"
                value={formData.processor.cache}
                onChange={(e) => handleChange("processor.cache", e.target.value)}
              />
            </div>

            <Input
              label="Graphics"
              placeholder="e.g., Integrated, RTX 3050, M1 GPU"
              value={formData.graphics}
              onChange={(e) => handleChange('graphics', e.target.value)}
            />
          </Section>

          {/* Display Specifications */}
          <Section icon={Monitor} title="Display Specifications">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                label="Display Size"
                placeholder="e.g., 15.6 inch, 13.3 inch"
                value={formData.display.size}
                onChange={(e) => handleChange('display.size', e.target.value)}
              />
              <Input
                label="Resolution"
                placeholder="e.g., FHD (1920x1080), QHD"
                value={formData.display.resolution}
                onChange={(e) => handleChange('display.resolution', e.target.value)}
              />
              <Input
                label="Panel Type"
                placeholder="e.g., IPS, OLED, AMOLED"
                value={formData.display.panel}
                onChange={(e) => handleChange('display.panel', e.target.value)}
              />
              <Input
                label="Refresh Rate"
                placeholder="e.g., 60Hz, 120Hz, 144Hz"
                value={formData.display.refreshRate}
                onChange={(e) => handleChange('display.refreshRate', e.target.value)}
              />
              <Input
                label="Brightness (nits)"
                value={formData.display.brightness}
                onChange={(e) => handleChange("display.brightness", e.target.value)}
              />

              <Input
                label="Aspect Ratio (16:9)"
                value={formData.display.aspectRatio}
                onChange={(e) => handleChange("display.aspectRatio", e.target.value)}
              />
            </div>
          </Section>

          {/* Ports & Connectivity */}
          <Section icon={Cpu} title="Ports & Connectivity">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <Input
                label="USB Type-C Count"
                type="number"
                value={formData.ports.usbTypeC}
                onChange={(e) =>
                  setFormData(prev => ({
                    ...prev,
                    ports: { ...prev.ports, usbTypeC: Number(e.target.value) }
                  }))
                }
              />

              <Input
                label="HDMI Count"
                type="number"
                value={formData.ports.hdmi}
                onChange={(e) =>
                  setFormData(prev => ({
                    ...prev,
                    ports: { ...prev.ports, hdmi: Number(e.target.value) }
                  }))
                }
              />

              <Input
                label="USB Type-A Count"
                type="number"
                value={formData.ports.usbTypeA}
                onChange={(e) =>
                  setFormData(prev => ({
                    ...prev,
                    ports: { ...prev.ports, usbTypeA: Number(e.target.value) }
                  }))
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
              <Checkbox
                label="MicroSD Card Slot"
                checked={formData.ports.microSD}
                onChange={(e) =>
                  setFormData(prev => ({
                    ...prev,
                    ports: { ...prev.ports, microSD: e.target.checked }
                  }))
                }
              />

              <Checkbox
                label="RJ45 LAN"
                checked={formData.ports.rj45}
                onChange={(e) =>
                  setFormData(prev => ({
                    ...prev,
                    ports: { ...prev.ports, rj45: e.target.checked }
                  }))
                }
              />

              <Checkbox
                label="Headphone Jack"
                checked={formData.ports.headphoneJack}
                onChange={(e) =>
                  setFormData(prev => ({
                    ...prev,
                    ports: { ...prev.ports, headphoneJack: e.target.checked }
                  }))
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <Input
                label="Wi-Fi Version (Wi-Fi 6)"
                value={formData.wifi}
                onChange={(e) => handleChange("wifi", e.target.value)}
              />

              <Input
                label="Bluetooth Version"
                value={formData.bluetooth}
                onChange={(e) => handleChange("bluetooth", e.target.value)}
              />
            </div>
          </Section>

          {/* Battery & Security */}
          <Section icon={Shield} title="Battery & Security">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <Input
                label="Battery Capacity (Wh)"
                value={formData.battery.capacity}
                onChange={(e) => handleChange("battery.capacity", e.target.value)}
              />

              <Input
                label="Charger Power (W)"
                value={formData.charger.power}
                onChange={(e) => handleChange("charger.power", e.target.value)}
              />

              <Input
                label="Charger Type (USB-C)"
                value={formData.charger.type}
                onChange={(e) => handleChange("charger.type", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
              <Input
                label="Camera Resolution (720p)"
                value={formData.camera.resolution}
                onChange={(e) => handleChange("camera.resolution", e.target.value)}
              />

              <Input
                label="Audio System"
                placeholder="e.g., Dolby Atmos, Stereo"
                value={formData.audio}
                onChange={(e) => handleChange("audio", e.target.value)}
              />

              <div className="space-y-2">
                <Checkbox
                  label="Fingerprint Reader"
                  checked={formData.fingerprintReader}
                  onChange={(e) => handleChange('fingerprintReader', e.target.checked)}
                />
                <Checkbox
                  label="Optical Drive"
                  checked={formData.opticalDrive}
                  onChange={(e) => handleChange('opticalDrive', e.target.checked)}
                />
              </div>
            </div>
          </Section>

          {/* Software & OS */}
          <Section icon={Code} title="Software & Operating System">
            <Input
              label="Operating System"
              placeholder="e.g., Windows 11, macOS Sonoma, Android 14"
              value={formData.operatingSystem}
              onChange={(e) => handleChange('operatingSystem', e.target.value)}
            />

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Pre-installed Software
              </label>
              <input
                type="text"
                placeholder="Press Enter to add"
                className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none transition-all text-sm"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    e.preventDefault();
                    handleChange('preInstalledSoftware', [...formData.preInstalledSoftware, e.target.value.trim()]);
                    e.target.value = '';
                  }
                }}
              />
              {formData.preInstalledSoftware.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {formData.preInstalledSoftware.map((software, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 border border-gray-200 text-gray-800 px-2 py-1 rounded text-xs flex items-center gap-1"
                    >
                      {software}
                      <button
                        type="button"
                        onClick={() => {
                          const updated = formData.preInstalledSoftware.filter((_, i) => i !== index);
                          handleChange('preInstalledSoftware', updated);
                        }}
                        className="hover:text-red-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Section>

          {/* Build & Design */}
          <Section icon={Tag} title="Build & Design">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Keyboard Features</label>
                <Checkbox
                  label="Backlit Keyboard"
                  checked={formData.keyboard.backlit}
                  onChange={(e) => handleChange('keyboard.backlit', e.target.checked)}
                />
              </div>

              <Input
                label="Keyboard Layout"
                placeholder="e.g., QWERTY, US International"
                value={formData.keyboard.layout}
                onChange={(e) => handleChange('keyboard.layout', e.target.value)}
              />
            </div>
          </Section>

          {/* Pricing */}
          <Section icon={DollarSign} title="Pricing" badge="Required">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                label="Original Price (MRP)"
                type="number"
                placeholder="₹ 0"
                value={formData.originalPrice}
                onChange={(e) => handleChange('originalPrice', e.target.value)}
                onBlur={() => handleBlur('originalPrice')}
                error={touched.originalPrice && errors.originalPrice}
              />
              <Input
                label="Selling Price"
                type="number"
                required
                placeholder="₹ 0"
                value={formData.sellingPrice}
                onChange={(e) => handleChange('sellingPrice', e.target.value)}
                onBlur={() => handleBlur('sellingPrice')}
                error={touched.sellingPrice && errors.sellingPrice}
              />
            </div>

            <Checkbox
              label="Price is negotiable"
              checked={formData.negotiable}
              onChange={(e) => handleChange('negotiable', e.target.checked)}
            />
          </Section>

          {/* Warranty */}
          <Section icon={Shield} title="Warranty Information">
            <Checkbox
              label="Warranty Available"
              checked={formData.warrantyAvailable}
              onChange={(e) => handleChange('warrantyAvailable', e.target.checked)}
            />

            {formData.warrantyAvailable && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <Input
                  label="Warranty Period"
                  placeholder="e.g., 6 months, 1 year"
                  required
                  value={formData.warrantyPeriod}
                  onChange={(e) => handleChange('warrantyPeriod', e.target.value)}
                  onBlur={() => handleBlur('warrantyPeriod')}
                  error={touched.warrantyPeriod && errors.warrantyPeriod}
                />
              </div>
            )}
          </Section>

          {/* Product Status */}
          <Section icon={Shield} title="Product Status">
            <Select
              label="Availability Status"
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="AVAILABLE">Available</option>
              <option value="UNAVAILABLE">Unavailable</option>
            </Select>
          </Section>

          {/* Images */}
          <Section icon={Image} title="Product Images">
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              id="imageUpload"
              onChange={async (e) => {
                const files = Array.from(e.target.files);
                if (!files.length) return;

                setUploading(true);
                try {
                  const uploads = [];
                  for (const file of files) {
                    const uploaded = await uploadToCloudinary(file);
                    uploads.push(uploaded);
                  }

                  handleChange("images", [...formData.images, ...uploads]);
                  toast.success("Images uploaded successfully");
                } catch (err) {
                  toast.error("Image upload failed");
                } finally {
                  setUploading(false);
                }
              }}
            />

            <label
              htmlFor="imageUpload"
              className="border-2 border-dashed border-gray-300 rounded p-4 text-center hover:border-gray-400 transition-all cursor-pointer bg-white block hover:bg-gray-50"
            >
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center">
                <Upload className="w-5 h-5 text-gray-600" />
              </div>
              <p className="text-gray-800 font-medium text-sm mb-0.5">
                {uploading ? "Uploading..." : "Click to upload images"}
              </p>
              <p className="text-xs text-gray-600">or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
            </label>

            {formData.images.length > 0 && (
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 mt-3">
                {formData.images.map((img, idx) => (
                  <div key={img.id} className="relative group">
                    <img
                      src={img.url}
                      className="rounded h-16 md:h-20 w-full object-cover border border-gray-300 group-hover:border-gray-400 transition-colors"
                      alt={`Product ${idx + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleChange(
                          "images",
                          formData.images.filter((_, i) => i !== idx)
                        )
                      }
                      className="absolute top-1 right-1 bg-white border border-gray-300 text-gray-700 rounded-full w-5 h-5 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center hover:bg-gray-50 hover:border-gray-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* Compact Actions */}
          <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 -mx-3 md:-mx-4 lg:-mx-6 px-3 md:px-4 lg:px-6 py-3 mt-4 flex flex-col sm:flex-row gap-2 justify-end">
            <button
              type="button"
              onClick={(e) => e.preventDefault()}
              className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center gap-1.5 text-sm"
            >
              <Save className="w-3 h-3" />
              Save as Draft
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded bg-gray-900 hover:bg-black text-white font-medium transition-all flex items-center justify-center gap-1.5 shadow-sm hover:shadow text-sm"
              onClick={handleSubmit}
            >
              Create Product
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Compact Components
const Section = ({ icon: Icon, title, badge, children }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow transition-shadow duration-300">
    <div className="flex items-center gap-2.5 mb-3">
      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-gray-700" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          {badge && (
            <span className="text-xs bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded font-medium">
              {badge}
            </span>
          )}
        </div>
        <div className="w-8 h-0.5 bg-gray-300 rounded-full mt-1" />
      </div>
    </div>
    <div className="space-y-3">{children}</div>
  </div>
);

const Input = ({ label, required, error, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    <input
      {...props}
      className={`w-full bg-white border border-gray-300 rounded px-3 py-2 text-gray-800 placeholder-gray-500 focus:ring-2 focus:border-transparent outline-none transition-all text-sm ${error ? 'border-red-400 focus:ring-red-500' : 'focus:ring-gray-800'
        }`}
    />
    {error && (
      <div className="flex items-center gap-1.5 mt-1">
        <AlertCircle className="w-3 h-3 text-red-500" />
        <span className="text-xs text-red-600">{error}</span>
      </div>
    )}
  </div>
);

const Textarea = ({ label, required, error, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    <textarea
      {...props}
      rows={3}
      className={`w-full bg-white border border-gray-300 rounded px-3 py-2 text-gray-800 placeholder-gray-500 focus:ring-2 focus:border-transparent outline-none resize-none transition-all text-sm ${error ? 'border-red-400 focus:ring-red-500' : 'focus:ring-gray-800'
        }`}
    />
    {error && (
      <div className="flex items-center gap-1.5 mt-1">
        <AlertCircle className="w-3 h-3 text-red-500" />
        <span className="text-xs text-red-600">{error}</span>
      </div>
    )}
  </div>
);

const Select = ({ label, required, error, children, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    <select
      {...props}
      className={`w-full bg-white border border-gray-300 rounded px-3 py-2 text-gray-800 focus:ring-2 focus:border-transparent outline-none transition-all text-sm ${error ? 'border-red-400 focus:ring-red-500' : 'focus:ring-gray-800'
        }`}
    >
      {children}
    </select>
    {error && (
      <div className="flex items-center gap-1.5 mt-1">
        <AlertCircle className="w-3 h-3 text-red-500" />
        <span className="text-xs text-red-600">{error}</span>
      </div>
    )}
  </div>
);

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 text-gray-800 cursor-pointer group text-sm">
    <div className="relative">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-2 border-gray-300 bg-white checked:bg-gray-800 checked:border-gray-800 focus:ring-2 focus:ring-gray-800 focus:ring-offset-1 focus:ring-offset-white transition-all cursor-pointer"
      />
    </div>
    <span className="group-hover:text-gray-900 transition-colors">{label}</span>
  </label>
);