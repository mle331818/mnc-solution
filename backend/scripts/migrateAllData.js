const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

// All existing product data converted to MongoDB format
const allProducts = [
  // CCTV Products
  {
    name: "Dahua Line Interactive UPS 800VA | 480Watt | DH-PFM350-480-A",
    sku: "DH-PFM350-480-A",
    description: "Line Interactive UPS 800VA, 480Watt, model DH-PFM350-480-A. Reliable backup for your CCTV system.",
    price: 40.00,
    brand: "Dahua",
    category: "cctv",
    image: "/images/products/dahualineups.png",
    stock: 5,
    isActive: true,
    features: ["Line Interactive", "800VA", "480Watt", "Reliable Backup"]
  },
  {
    name: "Dahua 27-inch FHD 100HZ LED Business Monitor DHI-LM27-B201S",
    sku: "DHI-LM27-B201S",
    description: "27-inch FHD 100Hz LED monitor, model DHI-LM27-B201S. Perfect for surveillance setups.",
    price: 110.00,
    brand: "Dahua",
    category: "cctv",
    image: "/images/products/dahua-monitor-27.png",
    stock: 2,
    isActive: true,
    features: ["27-inch", "FHD", "100Hz", "LED"]
  },
  {
    name: "Dahua NVR DHI-NVR1108HS-8P-S3/H",
    sku: "DHI-NVR1108HS-8P-S3/H",
    description: "Network Video Recorder, 8 channels, model DHI-NVR1108HS-8P-S3/H.",
    price: 99.00,
    brand: "Dahua",
    category: "cctv",
    image: "/images/products/DahuaNVRDHI.png",
    stock: 3,
    isActive: true,
    features: ["8 Channels", "Network Video Recorder", "Professional"]
  },
  {
    name: "Dahua Line Interactive UPS 1200VA | 720Watt | DH-PFM350-720-A | X2 Batteries 12V 7Amp",
    sku: "DH-PFM350-720-A",
    description: "Line Interactive UPS 1200VA, 720Watt, model DH-PFM350-720-A, with 2x 12V 7Amp batteries.",
    price: 70.00,
    brand: "Dahua",
    category: "cctv",
    image: "/images/products/dahualineups.png",
    stock: 4,
    isActive: true,
    features: ["1200VA", "720Watt", "2x 12V 7Amp Batteries"]
  },
  {
    name: "Dahua Hybrid Video Recorder DH-XVR1B04H-I 4-Channel",
    sku: "DH-XVR1B04H-I",
    description: "Hybrid Video Recorder, 4 channels, model DH-XVR1B04H-I.",
    price: 39.00,
    brand: "Dahua",
    category: "cctv",
    image: "/images/products/dahuahybrid.png",
    stock: 6,
    isActive: true,
    features: ["4 Channels", "Hybrid", "Video Recorder"]
  },
  {
    name: "Dahua Hero H2A 2MP Indoor Wi-Fi Pan & Tilt Network Camera",
    sku: "Hero H2A",
    description: "2MP Indoor Wi-Fi Pan & Tilt Network Camera, model Hero H2A.",
    price: 35.00,
    brand: "Dahua",
    category: "cctv",
    image: "/images/products/dahuaHero.png",
    stock: 7,
    isActive: true,
    features: ["2MP", "Wi-Fi", "Pan & Tilt", "Indoor"]
  },
  {
    name: "Dahua Hybrid Video Recorder DH-XVR1B08H-I 8-Channel",
    sku: "DH-XVR1B08H-I",
    description: "Hybrid Video Recorder, 8 channels, model DH-XVR1B08H-I.",
    price: 70.00,
    brand: "Dahua",
    category: "cctv",
    image: "/images/products/dahuahybrid.png",
    stock: 5,
    isActive: true,
    features: ["8 Channels", "Hybrid", "Video Recorder"]
  },
  {
    name: "Dahua Line Interactive UPS 600VA | 360Watt | DH-PFM350-360-A",
    sku: "DH-PFM350-360-A",
    description: "Line Interactive UPS 600VA, 360Watt, model DH-PFM350-360-A.",
    price: 30.00,
    brand: "Dahua",
    category: "cctv",
    image: "/images/products/dahualineups.png",
    stock: 4,
    isActive: true,
    features: ["600VA", "360Watt", "Line Interactive"]
  },
  {
    name: "Dahua Bullet Network Camera 2MP 3.6mm DH-IPC-HFW1230S-S5",
    sku: "DH-IPC-HFW1230S-S5",
    description: "2MP Bullet Network Camera, 3.6mm, model DH-IPC-HFW1230S-S5.",
    price: 35.00,
    brand: "Dahua",
    category: "cctv",
    image: "/images/products/dahuabullet.png",
    stock: 8,
    isActive: true,
    features: ["2MP", "Bullet", "3.6mm", "Network Camera"]
  },
  {
    name: "Dahua Dome Network Camera 2MP 2.8MM DH-IPC-HDW1239T1-A-LED S5",
    sku: "DH-IPC-HDW1239T1-A-LED S5",
    description: "2MP Dome Network Camera, 2.8mm, model DH-IPC-HDW1239T1-A-LED S5.",
    price: 39.00,
    brand: "Dahua",
    category: "cctv",
    image: "/images/products/dahuadome2mp.png",
    stock: 6,
    isActive: true,
    features: ["2MP", "Dome", "2.8mm", "LED"]
  },
  {
    name: "Dahua Line Interactive UPS 1500VA | 900Watt | DH-PFM350-900-A | X2 Batteries 12V 9Amp",
    sku: "DH-PFM350-900-A",
    description: "Line Interactive UPS 1500VA, 900Watt, model DH-PFM350-900-A, with 2x 12V 9Amp batteries.",
    price: 80.00,
    brand: "Dahua",
    category: "cctv",
    image: "/images/products/dahualineups.png",
    stock: 2,
    isActive: true,
    features: ["1500VA", "900Watt", "2x 12V 9Amp Batteries"]
  },
  {
    name: "Dahua Bullet Network Camera 4MP 3.6MM DH-IPC-HFW1439S1-LED",
    sku: "DH-IPC-HFW1439S1-LED",
    description: "4MP Bullet Network Camera, 3.6mm, model DH-IPC-HFW1439S1-LED.",
    price: 49.00,
    brand: "Dahua",
    category: "cctv",
    image: "/images/products/dahuabullet4mp.png",
    stock: 0,
    isActive: true,
    features: ["4MP", "Bullet", "3.6mm", "LED"]
  },
  {
    name: "Dahua Hybrid Video Recorder XVR1B16H-I 16 Channel + 8 IP Full HD",
    sku: "XVR1B16H-I",
    description: "Hybrid Video Recorder, 16 channels + 8 IP, model XVR1B16H-I.",
    price: 159.84,
    brand: "Dahua",
    category: "cctv",
    image: "/images/products/dahuahybrid.png",
    stock: 5,
    isActive: true,
    features: ["16 Channels", "8 IP", "Full HD", "Hybrid"]
  },
  {
    name: "Dahua 2MP HDCVI Dome Camera 3.6mm HAC-T1A21-U",
    sku: "HAC-T1A21-U",
    description: "2MP HDCVI Dome Camera, 3.6mm, model HAC-T1A21-U.",
    price: 25.00,
    brand: "Dahua",
    category: "cctv",
    image: "/images/products/dahuadomehdcvi.png",
    stock: 0,
    isActive: true,
    features: ["2MP", "HDCVI", "Dome", "3.6mm"]
  },
  {
    name: "Dahua Dome Network Camera 4MP 2.8MM DH-IPC-HDW1439T1-A-LED",
    sku: "DH-IPC-HDW1439T1-A-LED",
    description: "4MP Dome Network Camera, 2.8mm, model DH-IPC-HDW1439T1-A-LED.",
    price: 49.00,
    brand: "Dahua",
    category: "cctv",
    image: "/images/products/dahuadome4mp.png",
    stock: 0,
    isActive: true,
    features: ["4MP", "Dome", "2.8mm", "LED"]
  },
  {
    name: "Dahua Network Video Recorder 16Channel up to 12MP DHI-NVR4116HS-2N-4KS3",
    sku: "DHI-NVR4116HS-2N-4KS3",
    description: "Network Video Recorder, 16 channels, up to 12MP, model DHI-NVR4116HS-2N-4KS3.",
    price: 115.00,
    brand: "Dahua",
    category: "cctv",
    image: "/images/products/dahuaNVR16CH.png",
    stock: 0,
    isActive: true,
    features: ["16 Channels", "12MP", "4K", "Network Video Recorder"]
  },

  // Network Solution Products
  {
    name: "Cisco Router 2900",
    sku: "CISCO-2900",
    description: "Enterprise-grade router with advanced security features",
    price: 450.00,
    brand: "Cisco",
    category: "network-solution",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
    stock: 5,
    isActive: true,
    features: ["Gigabit Ethernet", "Advanced security", "VPN support", "Modular design"]
  },
  {
    name: "TP-Link Switch 24-Port",
    sku: "TPLINK-24G",
    description: "24-port gigabit managed switch for small businesses",
    price: 180.00,
    brand: "TP-Link",
    category: "network-solution",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
    stock: 8,
    isActive: true,
    features: ["24 Gigabit ports", "Managed switch", "Rack mountable", "Energy efficient"]
  },
  {
    name: "Ubiquiti Access Point",
    sku: "UBNT-AP",
    description: "High-performance WiFi 6 access point",
    price: 120.00,
    brand: "Ubiquiti",
    category: "network-solution",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
    stock: 12,
    isActive: true,
    features: ["WiFi 6 support", "High coverage", "Easy setup", "Cloud management"]
  },
  {
    name: "Network Cable Cat6",
    sku: "CAT6-CABLE",
    description: "Cat6 shielded cable for high-speed networking",
    price: 0.50,
    brand: "Generic",
    category: "network-solution",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
    stock: 100,
    isActive: true,
    features: ["Cat6 standard", "Shielded", "High-speed", "Flexible length"]
  },
  {
    name: "Network Cabinet 19\"",
    sku: "CABINET-19",
    description: "19-inch server rack cabinet with cooling",
    price: 350.00,
    brand: "Generic",
    category: "network-solution",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
    stock: 3,
    isActive: true,
    features: ["19-inch rack", "Cooling fan", "Lockable door", "Sturdy build"]
  },
  {
    name: "PoE Injector 48V",
    sku: "POE-48V",
    description: "Power over Ethernet injector for cameras and APs",
    price: 25.00,
    brand: "Generic",
    category: "network-solution",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
    stock: 15,
    isActive: true,
    features: ["48V output", "PoE standard", "Compact design", "Plug & play"]
  },

  // Software Products
  {
    name: "Inventory Management System",
    sku: "INV-MGT-SYS",
    description: "Complete inventory tracking and management solution",
    price: 2500.00,
    brand: "Custom",
    category: "softwares",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80",
    stock: 999,
    isActive: true,
    features: ["Inventory tracking", "Management solution", "Custom software"]
  },
  {
    name: "Point of Sale (POS)",
    sku: "POS-SYSTEM",
    description: "Modern POS system with payment integration",
    price: 1800.00,
    brand: "Custom",
    category: "softwares",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80",
    stock: 999,
    isActive: true,
    features: ["POS system", "Payment integration", "Modern interface"]
  },
  {
    name: "Customer Management CRM",
    sku: "CRM-SYSTEM",
    description: "Customer relationship management platform",
    price: 3200.00,
    brand: "Custom",
    category: "softwares",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80",
    stock: 999,
    isActive: true,
    features: ["CRM platform", "Customer management", "Relationship tracking"]
  },
  {
    name: "Accounting Software",
    sku: "ACC-SOFT",
    description: "Complete accounting and bookkeeping solution",
    price: 1500.00,
    brand: "Custom",
    category: "softwares",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80",
    stock: 999,
    isActive: true,
    features: ["Accounting", "Bookkeeping", "Complete solution"]
  },
  {
    name: "E-commerce Website",
    sku: "ECOMM-WEB",
    description: "Custom online store with payment gateway",
    price: 4000.00,
    brand: "Custom",
    category: "softwares",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80",
    stock: 999,
    isActive: true,
    features: ["E-commerce", "Payment gateway", "Custom website"]
  },
  {
    name: "Mobile App Development",
    sku: "MOBILE-APP",
    description: "iOS and Android mobile application development",
    price: 5000.00,
    brand: "Custom",
    category: "softwares",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80",
    stock: 999,
    isActive: true,
    features: ["iOS", "Android", "Mobile development"]
  },

  // Computer & Laptops
  {
    name: "Dell OptiPlex 7090",
    sku: "DELL-7090",
    description: "Business desktop with Intel i7, 16GB RAM, 512GB SSD",
    price: 850.00,
    brand: "Dell",
    category: "computer-laptops",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80",
    stock: 10,
    isActive: true,
    features: ["Intel i7", "16GB RAM", "512GB SSD", "Business desktop"]
  },
  {
    name: "HP EliteBook 840",
    sku: "HP-840",
    description: "Professional laptop with 14\" display and long battery",
    price: 1200.00,
    brand: "HP",
    category: "computer-laptops",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80",
    stock: 8,
    isActive: true,
    features: ["14\" display", "Long battery", "Professional", "Laptop"]
  },
  {
    name: "Gaming PC Custom Build",
    sku: "GAMING-PC",
    description: "Custom gaming PC with RTX 3060 and Ryzen 5",
    price: 1500.00,
    brand: "Custom",
    category: "computer-laptops",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80",
    stock: 5,
    isActive: true,
    features: ["RTX 3060", "Ryzen 5", "Custom build", "Gaming"]
  },
  {
    name: "MacBook Air M2",
    sku: "MACBOOK-M2",
    description: "Apple MacBook Air with M2 chip and 13\" display",
    price: 1300.00,
    brand: "Apple",
    category: "computer-laptops",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80",
    stock: 12,
    isActive: true,
    features: ["M2 chip", "13\" display", "Apple", "MacBook Air"]
  },
  {
    name: "Dell Precision Workstation",
    sku: "DELL-PRECISION",
    description: "Professional workstation for CAD and 3D modeling",
    price: 2200.00,
    brand: "Dell",
    category: "computer-laptops",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80",
    stock: 3,
    isActive: true,
    features: ["Professional", "CAD", "3D modeling", "Workstation"]
  },
  {
    name: "Lenovo ThinkPad X1",
    sku: "LENOVO-X1",
    description: "Ultra-lightweight business laptop with premium features",
    price: 1600.00,
    brand: "Lenovo",
    category: "computer-laptops",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80",
    stock: 7,
    isActive: true,
    features: ["Ultra-lightweight", "Business", "Premium features", "ThinkPad"]
  },

  // Satellite Products
  {
    name: "Satellite Dish 1.2m",
    sku: "SAT-DISH-1.2M",
    description: "1.2 meter satellite dish for TV reception",
    price: 180.00,
    brand: "Generic",
    category: "satellite",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
    stock: 15,
    isActive: true,
    features: ["1.2m", "Satellite dish", "TV reception"]
  },
  {
    name: "Satellite Receiver HD",
    sku: "SAT-REC-HD",
    description: "High-definition satellite receiver with recording",
    price: 85.00,
    brand: "Generic",
    category: "satellite",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
    stock: 20,
    isActive: true,
    features: ["HD", "Satellite receiver", "Recording"]
  },
  {
    name: "Satellite Modem",
    sku: "SAT-MODEM",
    description: "VSAT satellite internet modem for remote areas",
    price: 450.00,
    brand: "Generic",
    category: "satellite",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
    stock: 8,
    isActive: true,
    features: ["VSAT", "Satellite internet", "Remote areas"]
  },
  {
    name: "Satellite TV Package",
    sku: "SAT-TV-PKG",
    description: "Complete satellite TV installation package",
    price: 320.00,
    brand: "Generic",
    category: "satellite",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
    stock: 10,
    isActive: true,
    features: ["Complete package", "Satellite TV", "Installation"]
  },
  {
    name: "Satellite Finder Meter",
    sku: "SAT-FINDER",
    description: "Professional satellite signal finder and meter",
    price: 65.00,
    brand: "Generic",
    category: "satellite",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
    stock: 25,
    isActive: true,
    features: ["Signal finder", "Professional", "Satellite meter"]
  },
  {
    name: "Satellite LNB",
    sku: "SAT-LNB",
    description: "Low Noise Block converter for satellite dishes",
    price: 35.00,
    brand: "Generic",
    category: "satellite",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
    stock: 30,
    isActive: true,
    features: ["Low Noise Block", "Converter", "Satellite dish"]
  },

  // Fiber Solution Products
  {
    name: "Fiber Optic Cable 100m",
    sku: "FIBER-100M",
    description: "100-meter single-mode fiber optic cable",
    price: 120.00,
    brand: "Generic",
    category: "fiber-solution",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
    stock: 50,
    isActive: true,
    features: ["100m", "Single-mode", "Fiber optic", "Cable"]
  },
  {
    name: "Fiber Splicing Machine",
    sku: "FIBER-SPLICE",
    description: "Professional fiber optic splicing equipment",
    price: 2500.00,
    brand: "Generic",
    category: "fiber-solution",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
    stock: 2,
    isActive: true,
    features: ["Professional", "Fiber optic", "Splicing", "Equipment"]
  },
  {
    name: "Fiber Optic Tester",
    sku: "FIBER-TESTER",
    description: "OTDR fiber optic cable tester",
    price: 350.00,
    brand: "Generic",
    category: "fiber-solution",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
    stock: 5,
    isActive: true,
    features: ["OTDR", "Fiber optic", "Cable tester"]
  },
  {
    name: "Fiber Termination Kit",
    sku: "FIBER-TERM-KIT",
    description: "Complete fiber optic termination kit",
    price: 180.00,
    brand: "Generic",
    category: "fiber-solution",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
    stock: 8,
    isActive: true,
    features: ["Complete kit", "Fiber optic", "Termination"]
  },
  {
    name: "Fiber Patch Panel",
    sku: "FIBER-PATCH-24",
    description: "24-port fiber optic patch panel",
    price: 95.00,
    brand: "Generic",
    category: "fiber-solution",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
    stock: 12,
    isActive: true,
    features: ["24-port", "Fiber optic", "Patch panel"]
  },
  {
    name: "Fiber Installation Service",
    sku: "FIBER-INSTALL",
    description: "Professional fiber optic installation service",
    price: 500.00,
    brand: "Service",
    category: "fiber-solution",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
    stock: 999,
    isActive: true,
    features: ["Professional", "Fiber optic", "Installation", "Service"]
  },

  // Interphone Solution Products
  {
    name: "Door Entry System",
    sku: "DOOR-ENTRY",
    description: "Video door entry system with camera and speaker",
    price: 280.00,
    brand: "Generic",
    category: "interphone-solution",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    stock: 15,
    isActive: true,
    features: ["Video", "Door entry", "Camera", "Speaker"]
  },
  {
    name: "Intercom Panel 4-Way",
    sku: "INTERCOM-4WAY",
    description: "4-way intercom panel for buildings",
    price: 150.00,
    brand: "Generic",
    category: "interphone-solution",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    stock: 20,
    isActive: true,
    features: ["4-way", "Intercom panel", "Buildings"]
  },
  {
    name: "Wireless Intercom",
    sku: "WIRELESS-INTERCOM",
    description: "Wireless intercom system for homes",
    price: 95.00,
    brand: "Generic",
    category: "interphone-solution",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    stock: 25,
    isActive: true,
    features: ["Wireless", "Intercom", "Homes"]
  },
  {
    name: "Security Intercom",
    sku: "SEC-INTERCOM",
    description: "Security intercom with access control",
    price: 220.00,
    brand: "Generic",
    category: "interphone-solution",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    stock: 12,
    isActive: true,
    features: ["Security", "Intercom", "Access control"]
  },
  {
    name: "Intercom Handset",
    sku: "INTERCOM-HANDSET",
    description: "Replacement intercom handset unit",
    price: 45.00,
    brand: "Generic",
    category: "interphone-solution",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    stock: 30,
    isActive: true,
    features: ["Replacement", "Intercom", "Handset"]
  },
  {
    name: "Intercom Installation",
    sku: "INTERCOM-INSTALL",
    description: "Professional intercom system installation",
    price: 200.00,
    brand: "Service",
    category: "interphone-solution",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    stock: 999,
    isActive: true,
    features: ["Professional", "Intercom", "Installation", "Service"]
  },

  // 3D Printers & CNC Products
  {
    name: "Creality Ender 3 V2",
    sku: "ENDER-3-V2",
    description: "Popular 3D printer with 220x220x250mm build volume",
    price: 280.00,
    brand: "Creality",
    category: "3d-printers-cnc",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80",
    stock: 8,
    isActive: true,
    features: ["220x220x250mm", "3D printer", "Popular", "Build volume"]
  },
  {
    name: "Prusa i3 MK3S+",
    sku: "PRUSA-MK3S+",
    description: "High-quality 3D printer with auto-bed leveling",
    price: 750.00,
    brand: "Prusa",
    category: "3d-printers-cnc",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80",
    stock: 3,
    isActive: true,
    features: ["High-quality", "3D printer", "Auto-bed leveling"]
  },
  {
    name: "CNC Router 3018",
    sku: "CNC-3018",
    description: "Desktop CNC router for wood and plastic",
    price: 350.00,
    brand: "Generic",
    category: "3d-printers-cnc",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80",
    stock: 5,
    isActive: true,
    features: ["Desktop", "CNC router", "Wood", "Plastic"]
  },
  {
    name: "3D Printer Filament",
    sku: "FILAMENT-PLA",
    description: "PLA and ABS filament in various colors",
    price: 25.00,
    brand: "Generic",
    category: "3d-printers-cnc",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80",
    stock: 100,
    isActive: true,
    features: ["PLA", "ABS", "Filament", "Various colors"]
  },
  {
    name: "CNC Mill Desktop",
    sku: "CNC-MILL-DESK",
    description: "Desktop CNC mill for metal and plastic",
    price: 1200.00,
    brand: "Generic",
    category: "3d-printers-cnc",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80",
    stock: 2,
    isActive: true,
    features: ["Desktop", "CNC mill", "Metal", "Plastic"]
  },
  {
    name: "3D Scanner",
    sku: "3D-SCANNER",
    description: "3D scanner for reverse engineering",
    price: 450.00,
    brand: "Generic",
    category: "3d-printers-cnc",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80",
    stock: 4,
    isActive: true,
    features: ["3D scanner", "Reverse engineering"]
  },

  // Automation System Products
  {
    name: "Tuya Smart Switch",
    sku: "TUYA-SWITCH",
    description: "WiFi-enabled smart switch with voice control",
    price: 25.00,
    brand: "Tuya",
    category: "automation-system",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=400&q=80",
    stock: 50,
    isActive: true,
    features: ["WiFi-enabled", "Smart switch", "Voice control"]
  },
  {
    name: "Tuya Smart Thermostat",
    sku: "TUYA-THERMOSTAT",
    description: "Programmable smart thermostat with app control",
    price: 89.00,
    brand: "Tuya",
    category: "automation-system",
    image: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&w=400&q=80",
    stock: 20,
    isActive: true,
    features: ["Programmable", "Smart thermostat", "App control"]
  },
  {
    name: "Tuya Smart Door Lock",
    sku: "TUYA-LOCK",
    description: "Keyless entry with fingerprint and app access",
    price: 159.00,
    brand: "Tuya",
    category: "automation-system",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=400&q=80",
    stock: 15,
    isActive: true,
    features: ["Keyless entry", "Fingerprint", "App access"]
  },
  {
    name: "Tuya Smart Camera",
    sku: "TUYA-CAMERA",
    description: "1080P security camera with night vision",
    price: 79.00,
    brand: "Tuya",
    category: "automation-system",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80",
    stock: 25,
    isActive: true,
    features: ["1080P", "Security camera", "Night vision"]
  },
  {
    name: "Tuya Smart Sensor Kit",
    sku: "TUYA-SENSOR-KIT",
    description: "Motion, door, and temperature sensors",
    price: 45.00,
    brand: "Tuya",
    category: "automation-system",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=400&q=80",
    stock: 30,
    isActive: true,
    features: ["Motion", "Door", "Temperature", "Sensors"]
  },
  {
    name: "Tuya Smart Hub",
    sku: "TUYA-HUB",
    description: "Central control hub for all smart devices",
    price: 55.00,
    brand: "Tuya",
    category: "automation-system",
    image: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&w=400&q=80",
    stock: 18,
    isActive: true,
    features: ["Central control", "Smart hub", "All devices"]
  }
];

async function migrateAllData() {
  try {
    // Connect to MongoDB Atlas
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://mle331818:fUHKho52UwPsmPwQ@mnc.u1irpbo.mongodb.net/?retryWrites=true&w=majority&appName=mnc';
    
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB Atlas');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');
    
    // Insert all products with progress output
    const total = allProducts.length;
    let uploaded = 0;

    for (const prod of allProducts) {
      await Product.create(prod);
      uploaded++;

      const percent = Math.round((uploaded / total) * 100);
      // Real-time progress in the same console line
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      process.stdout.write(`Uploading products: ${percent}% (${uploaded}/${total})`);
    }

    console.log(`\n✅ Successfully migrated ${total} products`);
    
    // Display migration summary
    console.log('\n📋 Migration Summary:');
    const categories = await Product.distinct('category');
    const brands = await Product.distinct('brand');
    
    console.log(`Total Products: ${total}`);
    console.log(`Categories: ${categories.join(', ')}`);
    console.log(`Brands: ${brands.join(', ')}`);
    
    // Show products by category
    console.log('\n📊 Products by Category:');
    for (const category of categories) {
      const count = await Product.countDocuments({ category });
      console.log(`- ${category}: ${count} products`);
    }
    
    // Show products by brand
    console.log('\n🏷️ Products by Brand:');
    for (const brand of brands) {
      const count = await Product.countDocuments({ brand });
      console.log(`- ${brand}: ${count} products`);
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrateAllData();
}

module.exports = migrateAllData; 