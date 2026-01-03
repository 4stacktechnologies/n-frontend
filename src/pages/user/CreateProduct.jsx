import { useState } from 'react';
import { Package, Tag, Cpu, DollarSign, Shield, Image, Sparkles, AlertCircle, CheckCircle, Monitor, Code } from 'lucide-react';
import axios from 'axios';
import toast from "react-hot-toast";


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

/* ===============================
   Cloudinary Upload + Text Extractor
================================ */

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

  console.log("Cloudinary response:", data); // 👈 IMPORTANT

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
    // Basic Info
    title: '',
    description: '',
    category: '',
    brand: '',
    model: '',

    // Condition
    condition: 'NEW',
    usageDuration: '',
    physicalCondition: '',
    isRefurbished: false,

    // Hardware
    ram: '',
    rom: '',
    processor: {
      company: '',
      model: '',
      generation: ''
    },
    graphics: '',

    // Display
    display: {
      size: '',
      resolution: '',
      panel: '',
      refreshRate: ''
    },

    // Software
    operatingSystem: '',
    preInstalledSoftware: [],

    // Build & Design
    color: '',
    keyboard: {
      backlit: false,
      layout: ''
    },

    // Pricing
    originalPrice: '',
    sellingPrice: '',
    negotiable: false,

    // Warranty
    warrantyAvailable: false,
    warrantyPeriod: '',
    status: "AVAILABLE",


    // Images
    images: []
  });
  const [uploading, setUploading] = useState(false);


  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (field, value) => {
    // Handle nested objects
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
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

      case 'ram':
        if (value && !/^\d+\s?(GB|MB|gb|mb)$/i.test(value.trim())) {
          error = 'RAM format should be like "8GB" or "16GB"';
        }
        break;

      case 'rom':
        if (value && !/^\d+\s?(GB|TB|gb|tb)$/i.test(value.trim())) {
          error = 'Storage format should be like "128GB" or "256GB"';
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

    if (formData.rom) {
      const romError = validateField('rom');
      if (romError) newErrors.rom = romError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateProgress = () => {
    const allFields = [
      'title', 'description', 'category', 'brand', 'model',
      'condition', 'ram', 'rom', 'color',
      'processor.company', 'processor.model', 'processor.generation',
      'graphics', 'display.size', 'display.resolution', 'display.panel', 'display.refreshRate',
      'operatingSystem', 'keyboard.layout',
      'originalPrice', 'sellingPrice'
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

  // Mark all fields as touched
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

    ram: formData.ram.trim() || null,
    rom: formData.rom.trim() || null,
    color: formData.color || null,

    processor: {
      company: formData.processor.company.trim() || null,
      model: formData.processor.model.trim() || null,
      generation: formData.processor.generation.trim() || null,
    },

    graphics: formData.graphics.trim() || null,

    display: {
      size: formData.display.size.trim() || null,
      resolution: formData.display.resolution.trim() || null,
      panel: formData.display.panel.trim() || null,
      refreshRate: formData.display.refreshRate.trim() || null,
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
  } catch (error) {
    toast.error(
      error.response?.data?.msg || "Failed to create product",
      { id: toastId }
    );
    console.error("Error submitting form:", error);
  }
};


  const progress = calculateProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">Create Product</h1>
            </div>

            <div className="bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-slate-300">
                  <span className="font-bold text-cyan-400">{progress.filled}</span>
                  <span className="text-slate-500"> / {progress.total}</span> fields
                </span>
                <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
                <span className="text-xs text-slate-400">{progress.percentage}%</span>
              </div>
            </div>
          </div>
          <p className="text-slate-400">Add new or second-hand product to your inventory</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Section icon={Package} title="Basic Information" badge="Required">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-300 mb-3 block">Condition *</label>
                <div className="grid grid-cols-2 gap-3">
                  {['NEW', 'USED'].map(cond => (
                    <button
                      key={cond}
                      type="button"
                      onClick={() => handleChange('condition', cond)}
                      className={`p-4 rounded-xl border-2 transition-all ${formData.condition === cond
                        ? 'border-cyan-400 bg-cyan-400/10 text-cyan-400'
                        : 'border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600'
                        }`}
                    >
                      <div className="font-semibold">{cond === 'NEW' ? '🆕 New' : '♻️ Used'}</div>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="RAM"
                placeholder="e.g., 8GB, 16GB"
                value={formData.ram}
                onChange={(e) => handleChange('ram', e.target.value)}
                onBlur={() => handleBlur('ram')}
                error={touched.ram && errors.ram}
              />
              <Input
                label="Storage (ROM)"
                placeholder="e.g., 128GB, 256GB"
                value={formData.rom}
                onChange={(e) => handleChange('rom', e.target.value)}
                onBlur={() => handleBlur('rom')}
                error={touched.rom && errors.rom}
              />

              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">Color</label>
                <div className="grid grid-cols-5 gap-2">
                  {COLORS.map(color => (
                    <button
                      key={color.name}
                      type="button"
                      title={color.name}
                      onClick={() => handleChange('color', color.name)}
                      className={`w-full aspect-square rounded-lg border-2 transition-all relative ${formData.color === color.name
                        ? 'border-cyan-400 shadow-lg shadow-cyan-400/30 scale-110'
                        : 'border-slate-700 hover:border-slate-600'
                        }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {color.hex === '#FFFFFF' && (
                        <div className="absolute inset-0 border border-slate-300 rounded-lg" />
                      )}
                      {formData.color === color.name && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-4 h-4 bg-cyan-400 rounded-full border-2 border-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                {formData.color && (
                  <p className="text-xs text-slate-400 mt-2 text-center">{formData.color}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <label className="text-sm font-medium text-slate-300 mb-2 block">
                Pre-installed Software
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="e.g., MS Office 2024, Adobe Photoshop (Press Enter to add)"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-all"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      e.preventDefault();
                      handleChange('preInstalledSoftware', [...formData.preInstalledSoftware, e.target.value.trim()]);
                      e.target.value = '';
                    }
                  }}
                />
                <p className="text-xs text-slate-400">Press Enter to add software</p>

                {formData.preInstalledSoftware.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.preInstalledSoftware.map((software, index) => (
                      <span
                        key={index}
                        className="bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 px-3 py-1 rounded-lg text-sm flex items-center gap-2"
                      >
                        {software}
                        <button
                          type="button"
                          onClick={() => {
                            const updated = formData.preInstalledSoftware.filter((_, i) => i !== index);
                            handleChange('preInstalledSoftware', updated);
                          }}
                          className="hover:text-red-400 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Section>

          {/* Build & Design */}
          <Section icon={Tag} title="Build & Design">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-300 mb-3 block">Keyboard Features</label>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
              className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-cyan-400/50 transition-all cursor-pointer bg-slate-900/30 block"
            >
              <Image className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <p className="text-slate-300 font-medium mb-1">
                {uploading ? "Uploading..." : "Click to upload images"}
              </p>
              <p className="text-sm text-slate-500">or drag and drop</p>
              <p className="text-xs text-slate-600 mt-2">PNG, JPG up to 10MB</p>
            </label>

            {formData.images.length > 0 && (
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                {formData.images.map((img, idx) => (
                  <div key={img.id} className="relative group">
                    <img
                      src={img.url}
                      className="rounded-lg h-24 w-full object-cover border border-slate-700"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleChange(
                          "images",
                          formData.images.filter((_, i) => i !== idx)
                        )
                      }
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 opacity-0 group-hover:opacity-100 transition"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Section>


          {/* Actions */}
          <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 -mx-4 md:-mx-8 px-4 md:px-8 py-4 flex flex-col sm:flex-row gap-3 justify-end">
            <button
              type="button"
              onClick={(e) => e.preventDefault()}
              className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-all"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/40"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Components
const Section = ({ icon: Icon, title, badge, children }) => (
  <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-8 h-8 bg-cyan-400/10 rounded-lg flex items-center justify-center">
        <Icon className="w-4 h-4 text-cyan-400" />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {badge && (
        <span className="ml-auto text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded-full">
          {badge}
        </span>
      )}
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

const Input = ({ label, required, error, ...props }) => (
  <div>
    <label className="text-sm font-medium text-slate-300 mb-2 block">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <input
      {...props}
      className={`w-full bg-slate-900/50 border rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:ring-2 focus:border-transparent outline-none transition-all ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 focus:ring-cyan-400'
        }`}
    />
    {error && (
      <div className="flex items-center gap-1 mt-1">
        <AlertCircle className="w-3 h-3 text-red-400" />
        <span className="text-xs text-red-400">{error}</span>
      </div>
    )}
  </div>
);

const Textarea = ({ label, required, error, ...props }) => (
  <div>
    <label className="text-sm font-medium text-slate-300 mb-2 block">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <textarea
      {...props}
      rows={4}
      className={`w-full bg-slate-900/50 border rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:ring-2 focus:border-transparent outline-none resize-none transition-all ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 focus:ring-cyan-400'
        }`}
    />
    {error && (
      <div className="flex items-center gap-1 mt-1">
        <AlertCircle className="w-3 h-3 text-red-400" />
        <span className="text-xs text-red-400">{error}</span>
      </div>
    )}
  </div>
);

const Select = ({ label, required, error, children, ...props }) => (
  <div>
    <label className="text-sm font-medium text-slate-300 mb-2 block">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <select
      {...props}
      className={`w-full bg-slate-900/50 border rounded-xl px-4 py-3 text-slate-100 focus:ring-2 focus:border-transparent outline-none transition-all ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 focus:ring-cyan-400'
        }`}
    >
      {children}
    </select>
    {error && (
      <div className="flex items-center gap-1 mt-1">
        <AlertCircle className="w-3 h-3 text-red-400" />
        <span className="text-xs text-red-400">{error}</span>
      </div>
    )}
  </div>
);

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-3 text-slate-300 cursor-pointer group">
    <div className="relative">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 rounded border-2 border-slate-700 bg-slate-900/50 checked:bg-cyan-400 checked:border-cyan-400 focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all cursor-pointer"
      />
    </div>
    <span className="group-hover:text-white transition-colors">{label}</span>
  </label>
);