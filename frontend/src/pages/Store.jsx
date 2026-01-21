import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Store() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Old hardcoded data removed - now fetching from database
  /* const [products] = useState([
    // EZVIZ Wi-Fi Cameras
    { id: 1, name: 'EZVIZ H3C Wireless Smart Home AI Camera', brand: 'EZVIZ', price: 129.99, category: 'Wireless Camera', features: 'AI Human/Vehicle Detection, Color Night Vision, Two-Way Talk, Weatherproof' },
    { id: 2, name: 'EZVIZ H6C Pro 360 Color Night Vision Wi-Fi Camera', brand: 'EZVIZ', price: 119.99, category: 'Wireless Camera', features: '1080p Panoramic View, Motion Tracking, Two-Way Audio' },
    { id: 3, name: 'EZVIZ H6C Pro 2K 4MP Colorvu Two-Way Calling Pan-Tilt Wi-Fi Camera', brand: 'EZVIZ', price: 149.99, category: 'Wireless Camera', features: '2K Resolution, Human Detection, Auto-Tracking, Two-Way Talk' },
    { id: 4, name: 'EZVIZ H8C 4MP 2K Smart Home Siren & Strobe Pan-Tilt Wi-Fi Camera', brand: 'EZVIZ', price: 139.99, category: 'Wireless Camera', features: '360° Pan-Tilt, Siren & LED Alert, Color Night Vision' },
    { id: 5, name: 'EZVIZ H8C Pro 2K 3MP Pan-Tilt Human Detection Wi-Fi Camera', brand: 'EZVIZ', price: 149.99, category: 'Wireless Camera', features: 'AI Motion/Human Detection, Auto Tracking, 2K Quality' },
    { id: 6, name: 'EZVIZ H90 Dual Lens Dual Rotations 2K Pan-Tilt Wi-Fi Camera', brand: 'EZVIZ', price: 189.99, category: 'Wireless Camera', features: 'Dual Lenses, 360° Panoramic Coverage, AI Detection' },
    { id: 7, name: 'EZVIZ H9C Dual-Lens 2K+ Pan & Tilt Wi-Fi Camera', brand: 'EZVIZ', price: 179.99, category: 'Wireless Camera', features: 'Dual-Lens System, Intelligent Tracking, Color Night Vision' },
    { id: 8, name: 'EZVIZ EB3 Wi-Fi Smart Home 3MP Camera with Battery & Solar Panel', brand: 'EZVIZ', price: 199.99, category: 'Wireless Camera', features: 'Battery Powered, Solar Panel Optional, Long Battery Life' },
    { id: 9, name: 'EZVIZ H8C 4G Pan & Tilt Camera', brand: 'EZVIZ', price: 169.99, category: 'Wireless Camera', features: '4G Cellular Network + Wi-Fi Hybrid, Works Without Wi-Fi' },
    { id: 10, name: 'EZVIZ BM1 Battery-Powered Wi-Fi Baby Monitor Camera', brand: 'EZVIZ', price: 109.99, category: 'Wireless Camera', features: 'Wi-Fi Baby Monitoring, Alerts, Two-Way Audio' },
    { id: 11, name: 'EZVIZ C3WN Wireless Outdoor Wi-Fi Camera', brand: 'EZVIZ', price: 99.99, category: 'Wireless Camera', features: '1080p Outdoor Wi-Fi, Weatherproof, Night Vision' },
    
    // VStarcam Wireless / Wi-Fi / 4G Cameras
    { id: 12, name: 'Vstarcam CB71 Wi-Fi Mini Battery Camera', brand: 'VSTARCAM', price: 89.99, category: 'Wireless Camera', features: 'Compact Wi-Fi Camera, Battery Powered, Two-Way Audio, Night Vision' },
    { id: 13, name: 'Vstarcam CB75 3MP Battery Wireless Home Security 4G Camera', brand: 'VSTARCAM', price: 139.99, category: 'Wireless Camera', features: '3MP Resolution, Battery Powered, 4G Capability' },
    { id: 14, name: 'Vstarcam CB70 4G Mini 3MP HD Camera', brand: 'VSTARCAM', price: 129.99, category: 'Wireless Camera', features: '4G Network Camera, Battery Powered, Human Detection Alarm' },
    { id: 15, name: 'Vstarcam CB76-2 Wi-Fi Bullet Battery Camera', brand: 'VSTARCAM', price: 99.99, category: 'Wireless Camera', features: 'Compact 1080p, Wi-Fi, Motion Detection' },
    { id: 16, name: 'VStarcam BG622DR 2K Ultra HD 4G Dual Lens Solar Battery Camera', brand: 'VSTARCAM', price: 249.99, category: 'Wireless Camera', features: 'Dual Lens, 4G Network, Solar Battery Powered, Outdoor' },
    { id: 17, name: 'Vstarcam CG995DR 4G Dual Lens AI Human Tracking Camera', brand: 'VSTARCAM', price: 229.99, category: 'Wireless Camera', features: '4G Dual-Lens, AI Human Tracking, Two-Way Audio' },
    { id: 18, name: 'VStarcam 2K CG621SR Multi-Lens 3-Lens Outdoor 4G Wi-Fi Camera', brand: 'VSTARCAM', price: 249.99, category: 'Wireless Camera', features: 'Triple Lens 4G Outdoor Camera, AI Features' },
    { id: 19, name: 'Vstarcam CS622DR Dual-Lens Wi-Fi Camera', brand: 'VSTARCAM', price: 149.99, category: 'Wireless Camera', features: 'Wi-Fi Dual-Lens, Large Coverage, Night Vision' },
    { id: 20, name: 'Vstarcam C622DR Two-Eye 2MP Wi-Fi Camera', brand: 'VSTARCAM', price: 139.99, category: 'Wireless Camera', features: 'Dual-Lens Wi-Fi, Color Night Vision' },
    { id: 21, name: 'Vstarcam CV331S 2K HD Wi-Fi Battery Camera (Baby Monitor)', brand: 'VSTARCAM', price: 119.99, category: 'Wireless Camera', features: 'Wi-Fi Smart Home Monitor, Battery Power' },
    
    // Hikvision IP Cameras - Bullet
    { id: 22, name: 'Hikvision DS-2CD1223G0E-I 2MP Fixed Bullet IP Camera', brand: 'Hikvision', price: 89.99, category: 'IP Camera', features: '2MP Resolution, IR Night Vision, IP67 Weatherproof' },
    { id: 23, name: 'Hikvision DS-2CD2T23G2-4I 2MP Human Vehicle Detection', brand: 'Hikvision', price: 159.99, category: 'IP Camera', features: '80m IR Range, AI Detection, Smart Analytics' },
    
    // Hikvision IP Cameras - Dome & Varifocal
    { id: 24, name: 'Hikvision DS-2CD2723G2-IZS 2MP Face Detection Dome', brand: 'Hikvision', price: 189.99, category: 'IP Camera', features: 'Varifocal Lens, Face Detection, Motorized Zoom' },
    { id: 25, name: 'Hikvision DS-2CD2743G2-IZS 4MP Varifocal Camera', brand: 'Hikvison', price: 229.99, category: 'IP Camera', features: 'Line Crossing Detection, Face Detection, 4MP' },
    { id: 26, name: 'Hikvision DS-2CD2163G0-IU 6MP Audio Face Detection', brand: 'Hikvision', price: 249.99, category: 'IP Camera', features: 'Built-in Microphone, 6MP Resolution, Face Analytics' },
    { id: 27, name: 'Hikvision DS-2CD2183G0-IU 4K Audio Face Detection', brand: 'Hikvision', price: 299.99, category: 'IP Camera', features: '8MP 4K Quality, Audio Recording, Advanced AI' },
    
    // DVRs
    { id: 28, name: 'iDS-7208HUHI-M1/FA Face Detection DVR', brand: 'Hikvision', price: 349.99, category: 'DVR', features: '8 Channel, Supports up to 16 Cameras, Face Detection' },
    { id: 29, name: 'Hikvision DS-7108HGHI-M1 8 Channel DVR', brand: 'Hikvision', price: 229.99, category: 'DVR', features: '720p Recording, Motion Detection, 8 Channel' },
    { id: 30, name: 'Hikvision DS-7104HGHI-F1 4 Channel DVR', brand: 'Hikvision', price: 149.99, category: 'DVR', features: '4 Channel Recording, 1080p Support, Compact Design' },
    
    // NVRs
    { id: 31, name: 'EZVIZ X5S-16L2 16-24 Channel NVR', brand: 'EZVIZ', price: 449.99, category: 'NVR', features: 'Supports 5MP Cameras, 16-24 Channels, WiFi Support' },
    { id: 32, name: 'EZVIZ X5S-8W 8 Channel Wireless NVR', brand: 'EZVIZ', price: 299.99, category: 'NVR', features: 'WiFi Camera Support, 8 Channels, Plug & Play' },
    { id: 33, name: 'Hikvision DS-7608NI-K2/8P 8 Channel PoE NVR', brand: 'Hikvision', price: 379.99, category: 'NVR', features: '8 PoE Ports, 4K Recording, H.265+ Compression' },
    
    // Complete CCTV Packages
    { id: 34, name: 'EZVIZ 4 Camera WiFi CCTV Package', brand: 'EZVIZ', price: 599.99, category: 'CCTV Package', features: '4x WiFi Cameras, NVR, Cables, Complete Setup' },
    { id: 35, name: 'Hikvision 8 Camera Full HD Package', brand: 'Hikvision', price: 899.99, category: 'CCTV Package', features: '8x 1080p Cameras, DVR, 2TB HDD, All Cables' },
    { id: 36, name: 'Hikvision 4 Camera Outdoor Package', brand: 'Hikvision', price: 549.99, category: 'CCTV Package', features: '4x Outdoor Cameras, DVR, 1TB HDD, Installation Kit' },
    
    // Hard Drives & Storage
    { id: 37, name: 'Seagate 2TB Surveillance HDD', brand: 'Seagate', price: 89.99, category: 'Hard Drive Memory', features: '24/7 Recording Optimized, 3 Year Warranty' },
    { id: 38, name: 'WD Purple 4TB Surveillance Hard Drive', brand: 'Western Digital', price: 149.99, category: 'Hard Drive Memory', features: 'AllFrame Technology, 64MB Cache, 3 Year Warranty' },
    { id: 39, name: 'Seagate 1TB Surveillance HDD', brand: 'Seagate', price: 59.99, category: 'Hard Drive Memory', features: 'Reliable 24/7 Operation, Low Power Consumption' },
    { id: 40, name: 'Samsung 128GB MicroSD Card', brand: 'Samsung', price: 29.99, category: 'Hard Drive Memory', features: 'High Speed, Waterproof, For IP Cameras' },
    
    // Dome Cameras
    { id: 41, name: 'Hikvision DS-2CE56D0T-IRMMF 2MP Dome Camera', brand: 'Hikvision', price: 79.99, category: 'Cameras', features: '2MP Resolution, 20m IR Range, Vandal Proof' },
    { id: 42, name: 'Hikvision ColorVu 2MP Fixed Dome Camera', brand: 'Hikvision', price: 119.99, category: 'Cameras', features: 'Color Night Vision, 24/7 Color Imaging' },
    
    // Accessories
    { id: 43, name: 'CCTV Power Supply 12V 5A', brand: 'Generic', price: 19.99, category: 'Mobile Accessories', features: 'DC 12V Output, Overcurrent Protection' },
    { id: 44, name: 'BNC to RCA Video Cable 20m', brand: 'Generic', price: 15.99, category: 'Mobile Accessories', features: '20 Meter Length, Pre-made Connectors' },
    { id: 45, name: 'Camera Mounting Bracket', brand: 'Generic', price: 12.99, category: 'Mobile Accessories', features: 'Universal Mount, 360° Adjustment, Weather Resistant' },
    { id: 46, name: 'PoE Injector 48V', brand: 'TP-Link', price: 24.99, category: 'Mobile Accessories', features: 'Power over Ethernet, IEEE 802.3af/at' },
    
    // Monitors
    { id: 47, name: 'Samsung 24" LED CCTV Monitor', brand: 'Samsung', price: 199.99, category: 'TV and Monitor', features: 'Full HD, HDMI/VGA Input, 24/7 Operation' },
    { id: 48, name: 'LG 32" LED Surveillance Monitor', brand: 'LG', price: 299.99, category: 'TV and Monitor', features: '32 Inch Display, Multiple Inputs, IPS Panel' },
    
    // UPS & Power Backup
    { id: 49, name: 'APC 1500VA UPS Backup', brand: 'APC', price: 249.99, category: 'UPS Inverters', features: '1500VA Capacity, Battery Backup, Surge Protection' },
    { id: 50, name: 'CyberPower 1000VA UPS', brand: 'CyberPower', price: 179.99, category: 'UPS Inverters', features: 'Line Interactive, 8 Outlets, LCD Display' },
    
    // ASPOR Power Banks
    { id: 51, name: 'ASPOR A319 50000mAh Fast Charging Power Bank', brand: 'ASPOR', price: 89.99, category: 'Power Bank', features: '22.5W Fast Charge, Multiple Outputs, Long Trips' },
    { id: 52, name: 'ASPOR A396PD 20000mAh Power Bank', brand: 'ASPOR', price: 59.99, category: 'Power Bank', features: 'PD Fast Charging, LED Digital Display' },
    { id: 53, name: 'ASPOR A336 20000mAh Fast Charging Power Bank', brand: 'ASPOR', price: 54.99, category: 'Power Bank', features: '22.5W PD/QC, LCD Display, Multiple Ports' },
    { id: 54, name: 'ASPOR A316 20000mAh Built-in Cable Power Bank', brand: 'ASPOR', price: 57.99, category: 'Power Bank', features: '22.5W Fast Charge, Built-in Lightning/USB-C/Micro-USB' },
    { id: 55, name: 'ASPOR A385 PD 20W Magnetic Wireless 10000mAh', brand: 'ASPOR', price: 49.99, category: 'Power Bank', features: 'Magnetic Qi Wireless, 20W PD Fast Charge' },
    { id: 56, name: 'ASPOR A330 10000mAh LED Display Power Bank', brand: 'ASPOR', price: 34.99, category: 'Power Bank', features: 'LED Battery Display, Dual USB Outputs' },
    { id: 57, name: 'ASPOR A323 10000mAh Portable Charger', brand: 'ASPOR', price: 32.99, category: 'Power Bank', features: 'Dual USB-A, LED Indicator, Lightweight' },
    { id: 58, name: 'ASPOR A300 10000mAh Built-in Cables Power Bank', brand: 'ASPOR', price: 39.99, category: 'Power Bank', features: 'All-in-One Cables, USB-A/Type-C/Lightning/Micro-USB' },
    { id: 59, name: 'ASPOR A383 5000mAh Magnetic Wireless', brand: 'ASPOR', price: 29.99, category: 'Power Bank', features: '15W Wireless Charging, Compact & Lightweight' },
    { id: 60, name: 'ASPOR A352 5000mAh Built-in Cable', brand: 'ASPOR', price: 24.99, category: 'Power Bank', features: 'Built-in Type-C Connector, Portable Emergency Charger' },
    { id: 61, name: 'ASPOR A351 Smart Mini 5000mAh Power Bank', brand: 'ASPOR', price: 22.99, category: 'Power Bank', features: 'Ultra-Compact, Built-in Connector, Emergency Charger' },
    
    // Hikvision Analog CCTV (Turbo HD) - ColorVu & Hybrid Light Cameras
    { id: 62, name: 'Hikvision DS-2CE12DF0T-FS 2MP ColorVu Audio Fixed Bullet', brand: 'Hikvision', price: 89.99, category: 'Analog CCTV', features: 'Full-time Color Imaging, Built-in Audio, Night Vision' },
    { id: 63, name: 'Hikvision DS-2CE12DF0T-LFS 2MP ColorVu Audio Fixed Bullet (Silver)', brand: 'Hikvision', price: 94.99, category: 'Analog CCTV', features: 'Hybrid Light, Color Night Vision, Audio Recording' },
    { id: 64, name: 'Hikvision DS-2CE72KF3T-PIRXO 3K ColorVu PIR Siren 5MP Turret', brand: 'Hikvision', price: 129.99, category: 'Analog CCTV', features: 'PIR Motion Detection, Siren Alert, Color Night Vision' },
    { id: 65, name: 'Hikvision DS-2CE12KF3T-PIRXO 3K ColorVu PIR Siren 5MP Bullet', brand: 'Hikvision', price: 124.99, category: 'Analog CCTV', features: 'Smart PIR Alarm, Outdoor Bullet, 5MP Resolution' },
    { id: 66, name: 'Hikvision DS-2CE12DF3T-PIRXOS 2MP ColorVu PIR Siren Audio Bullet', brand: 'Hikvision', price: 119.99, category: 'Analog CCTV', features: 'PIR Alarm, Audio & Siren Functions, ColorVu' },
    { id: 67, name: 'Hikvision DS-2CE12KF3T-L 3K Gold 40m 5MP ColorVu', brand: 'Hikvision', price: 114.99, category: 'Analog CCTV', features: 'High-Res Color Imaging, 40m IR Range, 5MP' },
    { id: 68, name: 'Hikvision DS-2CE10KF0T-LPFS 3K ColorVu 5MP Smart Hybrid Light Mini Bullet', brand: 'Hikvision', price: 109.99, category: 'Analog CCTV', features: 'Hybrid Lighting, Night Image Quality, Compact Design' },
    { id: 69, name: 'Hikvision DS-2CE50DF3T-VPLSZE 2MP Smart Hybrid Light ColorVu Varifocal', brand: 'Hikvision', price: 139.99, category: 'Analog CCTV', features: 'Varifocal Lens, Adjustable Viewing Angle, Hybrid Light' },
    { id: 70, name: 'Hikvision DS-2CE70DF8T-MFSLN 2MP ColorVu Audio Turret', brand: 'Hikvision', price: 99.99, category: 'Analog CCTV', features: 'Fixed Turret Design, Built-in Audio, ColorVu' },
    { id: 71, name: 'Hikvision DS-2CE70DF8T-MF 2MP Rainbow ColorVu Camera', brand: 'Hikvision', price: 94.99, category: 'Analog CCTV', features: 'Standard Color Turret, Night Vision, 2MP' },
    { id: 72, name: 'Hikvision DS-2CE17D0T-EXLF 2MP Smart Hybrid Light 40m Fixed Bullet', brand: 'Hikvision', price: 84.99, category: 'Analog CCTV', features: 'Outdoor Camera, 40m Range, Hybrid Light' },
    { id: 73, name: 'Hikvision DS-2CE76D0T-EXLPF 2MP Smart Dual Light Dome Indoor', brand: 'Hikvision', price: 79.99, category: 'Analog CCTV', features: 'Indoor Dome, Dual LED Lighting, 2MP Resolution' },
    
    // Hikvision Wired IP Network Cameras - Motorized/Varifocal
    { id: 74, name: 'Hikvision DS-2CD2723G2-IZS 2MP Face Detection Varifocal Dome', brand: 'Hikvision', price: 189.99, category: 'IP Camera', features: 'Motorized Varifocal Lens, AcuSense Human Detection, Face Analytics' },
    { id: 75, name: 'Hikvision DS-2CD2743G2-IZS 4MP Face Detection Varifocal Dome', brand: 'Hikvision', price: 229.99, category: 'IP Camera', features: 'Higher Resolution Varifocal, 4MP, Face Detection' },
    { id: 76, name: 'Hikvision DS-2CD2623G2-IZS 2MP Line Cross Face Detection Varifocal', brand: 'Hikvision', price: 179.99, category: 'IP Camera', features: 'Line Crossing Analytics, Varifocal Lens, 2MP' },
    { id: 77, name: 'Hikvision DS-2CD2643G2-IZS 4MP Line Cross Face Detection Varifocal', brand: 'Hikvision', price: 219.99, category: 'IP Camera', features: '4MP Analytics, Line Crossing Detection, Motorized Zoom' },
    
    // Hikvision Wired IP - Fixed Bullet Cameras
    { id: 78, name: 'Hikvision DS-2CD2T23G2-4I 80m 2MP Human Vehicle Detection Fixed Bullet', brand: 'Hikvision', price: 159.99, category: 'IP Camera', features: 'Long Range Detection, 80m IR, Human/Vehicle AI' },
    { id: 79, name: 'Hikvision DS-2CD2T23G2-2I 60m 2MP Human Vehicle Detection Fixed Bullet', brand: 'Hikvision', price: 149.99, category: 'IP Camera', features: 'Standard Detection Range, 60m IR, AI Analytics' },
    { id: 80, name: 'Hikvision DS-2CD2T43G2-4I 80m 4MP Line Crossing Human Detection Fixed Bullet', brand: 'Hikvision', price: 189.99, category: 'IP Camera', features: '4MP Resolution, Line Crossing Analytics, 80m Range' },
    { id: 81, name: 'Hikvision DS-2CD2T43G2-2I 60m 2K Line Crossing Human Detection Fixed Bullet', brand: 'Hikvision', price: 179.99, category: 'IP Camera', features: 'Line Cross Analytics, 2K Resolution, 60m IR' },
    
    // Hikvision Wired IP - Fixed Turret & Dome (Audio/Detection)
    { id: 82, name: 'Hikvision DS-2CD2323G2-IU 2MP Line Crossing Face Detection Turret', brand: 'Hikvision', price: 169.99, category: 'IP Camera', features: 'Turret Design, Built-in Mic Option, Line Crossing Analytics' },
    { id: 83, name: 'Hikvision DS-2CD2343G2-IU 4MP Mic SD Card Face Detection Turret', brand: 'Hikvision', price: 199.99, category: 'IP Camera', features: '4MP Turret, Built-in Audio, SD Card Slot' },
    { id: 84, name: 'Hikvision DS-2CD2163G0-IU 6MP Audio Face Detection Fixed Network Camera', brand: 'Hikvision', price: 249.99, category: 'IP Camera', features: 'Compact IP Camera, 6MP, Built-in Microphone' },
    { id: 85, name: 'Hikvision DS-2CD2183G0-IU 4K Audio Face Detection Fixed Dome', brand: 'Hikvision', price: 299.99, category: 'IP Camera', features: '8MP 4K Resolution, Built-in Mic, Face Analytics' },
    { id: 86, name: 'Hikvision DS-2CD2123G2-IU 2MP Audio Face Detection IP Camera', brand: 'Hikvision', price: 139.99, category: 'IP Camera', features: 'Basic IP Dome, Built-in Audio, 2MP' },
    { id: 87, name: 'Hikvision DS-2CD2143G2-IU 4MP Audio Face Detection IP Camera', brand: 'Hikvision', price: 179.99, category: 'IP Camera', features: '4MP Dome, Built-in Microphone, Face Detection' },
    
  */

  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'Wireless Camera',
    'Analog CCTV',
    'IP Camera',
    'CCTV Package',
    'DVR',
    'NVR',
    'Hard Drive Memory',
    'Cameras',
    'Mobile Accessories',
    'Sound Devices',
    'TV and Monitor',
    'UPS Inverters',
    'Power Bank'
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Show loading state
  if (loading) {
    return (
      <div className="max-w-[1600px] mx-auto py-10 px-5">
        <h1 className="text-4xl text-slate-800 mb-8 text-center">Our Store</h1>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
            <p className="text-xl text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="max-w-[1600px] mx-auto py-10 px-5">
        <h1 className="text-4xl text-slate-800 mb-8 text-center">Our Store</h1>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center bg-red-50 p-8 rounded-lg">
            <p className="text-2xl text-red-600 mb-4">⚠️ Error Loading Products</p>
            <p className="text-gray-600 mb-4">{error}</p>
            <p className="text-sm text-gray-500">Please make sure the backend server is running on port 8080</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto py-10 px-5">
      <h1 className="text-4xl text-slate-800 mb-8 text-center">Our Store</h1>
      
      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search products..."
          className="py-3 px-5 border-2 border-gray-300 rounded-md text-base w-full max-w-[500px] transition-all focus:outline-none focus:border-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Main Content with Sidebar */}
      <div className="flex gap-8 flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="lg:w-64 w-full">
          <div className="bg-white rounded-lg shadow-lg p-5 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Categories</h2>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory('')}
                className={`w-full text-left px-4 py-3 rounded-md transition-all ${
                  selectedCategory === ''
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                }`}
              >
                All Products
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-3 rounded-md transition-all ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Section */}
        <div className="flex-1">
          <div className="mb-5 text-gray-600">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            {selectedCategory && <span className="font-semibold"> in {selectedCategory}</span>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <div className="bg-white rounded-xl p-5 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 h-48 rounded-lg flex flex-col items-center justify-center text-white mb-4 relative overflow-hidden">
                    <div className="text-6xl mb-2">📷</div>
                    <p className="text-sm px-2 text-center">Image Placeholder</p>
                    {product.brand && (
                      <div className="absolute top-2 right-2 bg-white/90 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold">
                        {product.brand}
                      </div>
                    )}
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-bold mb-2 text-slate-800 line-clamp-2 min-h-[3.5rem]">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-xs mb-2 font-semibold uppercase tracking-wide">
                      {product.category}
                    </p>
                    {product.features && product.features.length > 0 && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2 min-h-[2.5rem]">
                        {Array.isArray(product.features) 
                          ? product.features.slice(0, 2).join(', ') 
                          : product.features
                        }
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-3xl text-blue-500 font-bold">${product.price}</p>
                      <div className="flex flex-col gap-2">
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                            navigate('/checkout');
                          }}
                          className="bg-green-500 text-white border-none py-2 px-4 rounded-lg cursor-pointer text-sm transition-all hover:bg-green-600 hover:scale-105 font-semibold flex items-center justify-center gap-1"
                          title="Order Now"
                        >
                          ✅ Order Now
                        </button>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                            alert(`${product.name} added to cart!`);
                          }}
                          className="bg-blue-500 text-white border-none py-2 px-4 rounded-lg cursor-pointer text-sm transition-all hover:bg-blue-600 hover:scale-105 font-semibold flex items-center justify-center gap-1"
                          title="Add to Cart"
                        >
                          🛒 Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Banner */}
      <div className="mt-12 bg-slate-800 text-white rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Need Help Choosing? Call Us!</h3>
        <div className="flex justify-center gap-8 flex-wrap">
          <a href="tel:0777602018" className="flex items-center gap-2 text-xl hover:text-blue-400 transition-colors">
            <span className="text-2xl">📞</span>
            <span>077 760 2018</span>
          </a>
          <a href="tel:0770279136" className="flex items-center gap-2 text-xl hover:text-blue-400 transition-colors">
            <span className="text-2xl">📞</span>
            <span>077 027 9136</span>
          </a>
        </div>
        <p className="mt-4 text-gray-300">Our experts are ready to help you find the perfect security solution</p>
      </div>
    </div>
  );
}

export default Store;
