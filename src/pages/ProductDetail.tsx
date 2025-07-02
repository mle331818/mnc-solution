import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../hooks/use-toast';
import Header from '../components/Header';
import Barcode from 'react-barcode';
import { FaWhatsapp, FaFacebookF, FaSearch } from 'react-icons/fa';

// Place productData here, outside and above the component
export const productData: Record<string, any> = {
  'network-solution': {
    title: 'Network Solutions',
    description: 'Complete networking infrastructure and connectivity solutions',
    products: [
      {
        id: 'cisco-router-2900',
        name: 'Cisco Router 2900',
        price: 450.00,
        salePrice: 399.00,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
        description: 'Enterprise-grade router with advanced security features',
        features: [
          'Gigabit Ethernet',
          'Advanced security',
          'VPN support',
          'Modular design'
        ],
        sku: 'CISCO-2900',
        barcode: '1234567890123',
        stock: 5,
        relatedProductIds: ['tp-link-switch-24port', 'ubiquiti-access-point'],
        category: 'network-solution'
      },
      {
        id: 'tp-link-switch-24port',
        name: 'TP-Link Switch 24-Port',
        price: 180.00,
        salePrice: 159.00,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
        description: '24-port gigabit managed switch for small businesses',
        features: [
          '24 Gigabit ports',
          'Managed switch',
          'Rack mountable',
          'Energy efficient'
        ],
        sku: 'TPLINK-24G',
        barcode: '2345678901234',
        stock: 8,
        relatedProductIds: ['cisco-router-2900', 'ubiquiti-access-point'],
        category: 'network-solution'
      },
      {
        id: 'ubiquiti-access-point',
        name: 'Ubiquiti Access Point',
        price: 120.00,
        salePrice: 99.00,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
        description: 'High-performance WiFi 6 access point',
        features: [
          'WiFi 6 support',
          'High coverage',
          'Easy setup',
          'Cloud management'
        ],
        sku: 'UBNT-AP',
        barcode: '3456789012345',
        stock: 12,
        relatedProductIds: ['cisco-router-2900', 'tp-link-switch-24port'],
        category: 'network-solution'
      },
      {
        id: 'network-cable-cat6',
        name: 'Network Cable Cat6',
        price: 0.50,
        salePrice: 0.40,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
        description: 'Cat6 shielded cable for high-speed networking',
        features: [
          'Cat6 standard',
          'Shielded',
          'High-speed',
          'Flexible length'
        ],
        sku: 'CAT6-CABLE',
        barcode: '4567890123456',
        stock: 100,
        relatedProductIds: ['tp-link-switch-24port'],
        category: 'network-solution'
      },
      {
        id: 'network-cabinet-19inch',
        name: 'Network Cabinet 19"',
        price: 350.00,
        salePrice: 299.00,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
        description: '19-inch server rack cabinet with cooling',
        features: [
          '19-inch rack',
          'Cooling fan',
          'Lockable door',
          'Sturdy build'
        ],
        sku: 'CABINET-19',
        barcode: '5678901234567',
        stock: 3,
        relatedProductIds: ['cisco-router-2900'],
        category: 'network-solution'
      },
      {
        id: 'poe-injector-48v',
        name: 'PoE Injector 48V',
        price: 25.00,
        salePrice: 20.00,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
        description: 'Power over Ethernet injector for cameras and APs',
        features: [
          '48V output',
          'PoE standard',
          'Compact design',
          'Plug & play'
        ],
        sku: 'POE-48V',
        barcode: '6789012345678',
        stock: 15,
        relatedProductIds: ['ubiquiti-access-point'],
        category: 'network-solution'
      }
    ]
  },
  'softwares': {
    title: 'Software Solutions',
    description: 'Custom software development and business applications',
    products: [
      {
        id: 'inventory-management-system',
        name: 'Inventory Management System',
        price: '$2,500',
        image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80',
        description: 'Complete inventory tracking and management solution',
        category: 'softwares'
      },
      {
        id: 'point-of-sale-pos',
        name: 'Point of Sale (POS)',
        price: '$1,800',
        image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80',
        description: 'Modern POS system with payment integration',
        category: 'softwares'
      },
      {
        id: 'customer-management-crm',
        name: 'Customer Management CRM',
        price: '$3,200',
        image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80',
        description: 'Customer relationship management platform',
        category: 'softwares'
      },
      {
        id: 'accounting-software',
        name: 'Accounting Software',
        price: '$1,500',
        image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80',
        description: 'Complete accounting and bookkeeping solution',
        category: 'softwares'
      },
      {
        id: 'ecommerce-website',
        name: 'E-commerce Website',
        price: '$4,000',
        image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80',
        description: 'Custom online store with payment gateway',
        category: 'softwares'
      },
      {
        id: 'mobile-app-development',
        name: 'Mobile App Development',
        price: '$5,000',
        image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80',
        description: 'iOS and Android mobile application development',
        category: 'softwares'
      }
    ]
  },
  'computer-laptops': {
    title: 'Computers & Laptops',
    description: 'High-quality computers, laptops, and accessories',
    products: [
      {
        id: 'dell-optiplex-7090',
        name: 'Dell OptiPlex 7090',
        price: '$850',
        image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80',
        description: 'Business desktop with Intel i7, 16GB RAM, 512GB SSD',
        category: 'computer-laptops'
      },
      {
        id: 'hp-elitebook-840',
        name: 'HP EliteBook 840',
        price: '$1,200',
        image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80',
        description: 'Professional laptop with 14" display and long battery',
        category: 'computer-laptops'
      },
      {
        id: 'gaming-pc-custom-build',
        name: 'Gaming PC Custom Build',
        price: '$1,500',
        image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80',
        description: 'Custom gaming PC with RTX 3060 and Ryzen 5',
        category: 'computer-laptops'
      },
      {
        id: 'macbook-air-m2',
        name: 'MacBook Air M2',
        price: '$1,300',
        image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80',
        description: 'Apple MacBook Air with M2 chip and 13" display',
        category: 'computer-laptops'
      },
      {
        id: 'dell-precision-workstation',
        name: 'Dell Precision Workstation',
        price: '$2,200',
        image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80',
        description: 'Professional workstation for CAD and 3D modeling',
        category: 'computer-laptops'
      },
      {
        id: 'lenovo-thinkpad-x1',
        name: 'Lenovo ThinkPad X1',
        price: '$1,600',
        image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80',
        description: 'Ultra-lightweight business laptop with premium features',
        category: 'computer-laptops'
      }
    ]
  },
  'satellite': {
    title: 'Satellite Solutions',
    description: 'Satellite communication and broadcasting equipment',
    products: [
      {
        id: 'satellite-dish-1-2m',
        name: 'Satellite Dish 1.2m',
        price: '$180',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
        description: '1.2 meter satellite dish for TV reception',
        category: 'satellite'
      },
      {
        id: 'satellite-receiver-hd',
        name: 'Satellite Receiver HD',
        price: '$85',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
        description: 'High-definition satellite receiver with recording',
        category: 'satellite'
      },
      {
        id: 'satellite-modem',
        name: 'Satellite Modem',
        price: '$450',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
        description: 'VSAT satellite internet modem for remote areas',
        category: 'satellite'
      },
      {
        id: 'satellite-tv-package',
        name: 'Satellite TV Package',
        price: '$320',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
        description: 'Complete satellite TV installation package',
        category: 'satellite'
      },
      {
        id: 'satellite-finder-meter',
        name: 'Satellite Finder Meter',
        price: '$65',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
        description: 'Professional satellite signal finder and meter',
        category: 'satellite'
      },
      {
        id: 'satellite-lnb',
        name: 'Satellite LNB',
        price: '$35',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
        description: 'Low Noise Block converter for satellite dishes',
        category: 'satellite'
      }
    ]
  },
  'fiber-solution': {
    title: 'Fiber Solutions',
    description: 'Fiber optic networking and connectivity solutions',
    products: [
      {
        id: 'fiber-optic-cable-100m',
        name: 'Fiber Optic Cable 100m',
        price: '$120',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80',
        description: '100-meter single-mode fiber optic cable',
        category: 'fiber-solution'
      },
      {
        id: 'fiber-splicing-machine',
        name: 'Fiber Splicing Machine',
        price: '$2,500',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80',
        description: 'Professional fiber optic splicing equipment',
        category: 'fiber-solution'
      },
      {
        id: 'fiber-optic-tester',
        name: 'Fiber Optic Tester',
        price: '$350',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80',
        description: 'OTDR fiber optic cable tester',
        category: 'fiber-solution'
      },
      {
        id: 'fiber-termination-kit',
        name: 'Fiber Termination Kit',
        price: '$180',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80',
        description: 'Complete fiber optic termination kit',
        category: 'fiber-solution'
      },
      {
        id: 'fiber-patch-panel',
        name: 'Fiber Patch Panel',
        price: '$95',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80',
        description: '24-port fiber optic patch panel',
        category: 'fiber-solution'
      },
      {
        id: 'fiber-installation-service',
        name: 'Fiber Installation Service',
        price: '$500/day',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80',
        description: 'Professional fiber optic installation service',
        category: 'fiber-solution'
      }
    ]
  },
  'interphone-solution': {
    title: 'Interphone Solutions',
    description: 'Professional intercom and communication systems',
    products: [
      {
        id: 'door-entry-system',
        name: 'Door Entry System',
        price: '$280',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
        description: 'Video door entry system with camera and speaker',
        category: 'interphone-solution'
      },
      {
        id: 'intercom-panel-4way',
        name: 'Intercom Panel 4-Way',
        price: '$150',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
        description: '4-way intercom panel for buildings',
        category: 'interphone-solution'
      },
      {
        id: 'wireless-intercom',
        name: 'Wireless Intercom',
        price: '$95',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
        description: 'Wireless intercom system for homes',
        category: 'interphone-solution'
      },
      {
        id: 'security-intercom',
        name: 'Security Intercom',
        price: '$220',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
        description: 'Security intercom with access control',
        category: 'interphone-solution'
      },
      {
        id: 'intercom-handset',
        name: 'Intercom Handset',
        price: '$45',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
        description: 'Replacement intercom handset unit',
        category: 'interphone-solution'
      },
      {
        id: 'intercom-installation',
        name: 'Intercom Installation',
        price: '$200',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
        description: 'Professional intercom system installation',
        category: 'interphone-solution'
      }
    ]
  },
  '3d-printers-cnc': {
    title: '3D Printers & CNC',
    description: '3D printing and CNC machining solutions',
    products: [
      {
        id: 'creality-ender-3-v2',
        name: 'Creality Ender 3 V2',
        price: '$280',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
        description: 'Popular 3D printer with 220x220x250mm build volume',
        category: '3d-printers-cnc'
      },
      {
        id: 'prusa-i3-mk3s-plus',
        name: 'Prusa i3 MK3S+',
        price: '$750',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
        description: 'High-quality 3D printer with auto-bed leveling',
        category: '3d-printers-cnc'
      },
      {
        id: 'cnc-router-3018',
        name: 'CNC Router 3018',
        price: '$350',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
        description: 'Desktop CNC router for wood and plastic',
        category: '3d-printers-cnc'
      },
      {
        id: '3d-printer-filament',
        name: '3D Printer Filament',
        price: '$25/kg',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
        description: 'PLA and ABS filament in various colors',
        category: '3d-printers-cnc'
      },
      {
        id: 'cnc-mill-desktop',
        name: 'CNC Mill Desktop',
        price: '$1,200',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
        description: 'Desktop CNC mill for metal and plastic',
        category: '3d-printers-cnc'
      },
      {
        id: '3d-scanner',
        name: '3D Scanner',
        price: '$450',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
        description: '3D scanner for reverse engineering',
        category: '3d-printers-cnc'
      }
    ]
  },
  'automation-system': {
    title: 'Automation System',
    description: 'Smart automation and control systems for modern homes and businesses',
    products: [
      {
        id: 'tuya-smart-switch',
        name: 'Tuya Smart Switch',
        price: '$25',
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=400&q=80',
        description: 'WiFi-enabled smart switch with voice control',
        category: 'automation-system'
      },
      {
        id: 'tuya-smart-thermostat',
        name: 'Tuya Smart Thermostat',
        price: '$89',
        image: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&w=400&q=80',
        description: 'Programmable smart thermostat with app control',
        category: 'automation-system'
      },
      {
        id: 'tuya-smart-door-lock',
        name: 'Tuya Smart Door Lock',
        price: '$159',
        image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=400&q=80',
        description: 'Keyless entry with fingerprint and app access',
        category: 'automation-system'
      },
      {
        id: 'tuya-smart-camera',
        name: 'Tuya Smart Camera',
        price: '$79',
        image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80',
        description: '1080P security camera with night vision',
        category: 'automation-system'
      },
      {
        id: 'tuya-smart-sensor-kit',
        name: 'Tuya Smart Sensor Kit',
        price: '$45',
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=400&q=80',
        description: 'Motion, door, and temperature sensors',
        category: 'automation-system'
      },
      {
        id: 'tuya-smart-hub',
        name: 'Tuya Smart Hub',
        price: '$55',
        image: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&w=400&q=80',
        description: 'Central control hub for all smart devices',
        category: 'automation-system'
      }
    ]
  },
  'cctv': {
    title: 'CCTV Systems',
    description: 'Professional security cameras and surveillance systems',
    products: [
      {
        id: 'dahua-ups-800va',
        name: 'Dahua Line Interactive UPS 800VA | 480Watt | DH-PFM350-480-A',
        brand: 'Dahua',
        price: 40.00,
        salePrice: 36.00,
        image: '/images/products/dahualineups.png',
        description: 'Line Interactive UPS 800VA, 480Watt, model DH-PFM350-480-A. Reliable backup for your CCTV system.',
        sku: 'DH-PFM350-480-A',
        barcode: '',
        stock: 5,
        category: 'cctv',
      },
      {
        id: 'dahua-monitor-27',
        name: 'Dahua 27-inch FHD 100HZ LED Business Monitor DHI-LM27-B201S',
        price: 110.00,
        salePrice: 89.00,
        image: '/images/products/dahua-monitor-27.png',
        description: '27-inch FHD 100Hz LED monitor, model DHI-LM27-B201S. Perfect for surveillance setups.',
        sku: 'DHI-LM27-B201S',
        barcode: '',
        stock: 2,
        category: 'cctv',
      },
      {
        id: 'dahua-nvr-1108hs',
        name: 'Dahua NVR DHI-NVR1108HS-8P-S3/H',
        price: 99.00,
        image: '/images/products/DahuaNVRDHI.png',
        description: 'Network Video Recorder, 8 channels, model DHI-NVR1108HS-8P-S3/H.',
        sku: 'DHI-NVR1108HS-8P-S3/H',
        barcode: '',
        stock: 3,
        category: 'cctv',
      },
      {
        id: 'dahua-ups-1200va',
        name: 'Dahua Line Interactive UPS 1200VA | 720Watt | DH-PFM350-720-A | X2 Batteries 12V 7Amp',
        price: 70.00,
        image: '/images/products/dahualineups.png',
        description: 'Line Interactive UPS 1200VA, 720Watt, model DH-PFM350-720-A, with 2x 12V 7Amp batteries.',
        sku: 'DH-PFM350-720-A',
        barcode: '',
        stock: 4,
        category: 'cctv',
      },
      {
        id: 'dahua-xvr1b04h-i',
        name: 'Dahua Hybrid Video Recorder DH-XVR1B04H-I 4-Channel',
        price: 39.00,
        image: '/images/products/dahuahybrid.png',
        description: 'Hybrid Video Recorder, 4 channels, model DH-XVR1B04H-I.',
        sku: 'DH-XVR1B04H-I',
        barcode: '',
        stock: 6,
        category: 'cctv',
      },
      {
        id: 'dahua-hero-h2a',
        name: 'Dahua Hero H2A 2MP Indoor Wi-Fi Pan & Tilt Network Camera',
        price: 35.00,
        image: '/images/products/dahuaHero.png',
        description: '2MP Indoor Wi-Fi Pan & Tilt Network Camera, model Hero H2A.',
        sku: 'Hero H2A',
        barcode: '',
        stock: 7,
        category: 'cctv',
      },
      {
        id: 'dahua-xvr1b08h-i',
        name: 'Dahua Hybrid Video Recorder DH-XVR1B08H-I 8-Channel',
        price: 70.00,
        image: '/images/products/dahuahybrid.png',
        description: 'Hybrid Video Recorder, 8 channels, model DH-XVR1B08H-I.',
        sku: 'DH-XVR1B08H-I',
        barcode: '',
        stock: 5,
        category: 'cctv',
      },
      {
        id: 'dahua-ups-600va',
        name: 'Dahua Line Interactive UPS 600VA | 360Watt | DH-PFM350-360-A',
        price: 30.00,
        salePrice: 26.00,
        image: '/images/products/dahualineups.png',
        description: 'Line Interactive UPS 600VA, 360Watt, model DH-PFM350-360-A.',
        sku: 'DH-PFM350-360-A',
        barcode: '',
        stock: 4,
        category: 'cctv',
      },
      {
        id: 'dahua-bullet-2mp',
        name: 'Dahua Bullet Network Camera 2MP 3.6mm DH-IPC-HFW1230S-S5',
        price: 35.00,
        image: '/images/products/dahuabullet.png',
        description: '2MP Bullet Network Camera, 3.6mm, model DH-IPC-HFW1230S-S5.',
        sku: 'DH-IPC-HFW1230S-S5',
        barcode: '',
        stock: 8,
        category: 'cctv',
      },
      {
        id: 'dahua-dome-2mp',
        name: 'Dahua Dome Network Camera 2MP 2.8MM DH-IPC-HDW1239T1-A-LED S5',
        price: 39.00,
        image: '/images/products/dahuadome2mp.png',
        description: '2MP Dome Network Camera, 2.8mm, model DH-IPC-HDW1239T1-A-LED S5.',
        sku: 'DH-IPC-HDW1239T1-A-LED S5',
        barcode: '',
        stock: 6,
        category: 'cctv',
      },
      {
        id: 'dahua-ups-1500va',
        name: 'Dahua Line Interactive UPS 1500VA | 900Watt | DH-PFM350-900-A | X2 Batteries 12V 9Amp',
        price: 80.00,
        image: '/images/products/dahualineups.png',
        description: 'Line Interactive UPS 1500VA, 900Watt, model DH-PFM350-900-A, with 2x 12V 9Amp batteries.',
        sku: 'DH-PFM350-900-A',
        barcode: '',
        stock: 2,
        category: 'cctv',
      },
      {
        id: 'dahua-bullet-4mp',
        name: 'Dahua Bullet Network Camera 4MP 3.6MM DH-IPC-HFW1439S1-LED',
        price: 49.00,
        image: '/images/products/dahuabullet4mp.png',
        description: '4MP Bullet Network Camera, 3.6mm, model DH-IPC-HFW1439S1-LED.',
        sku: 'DH-IPC-HFW1439S1-LED',
        barcode: '',
        stock: 0,
        category: 'cctv',
      },
      {
        id: 'dahua-xvr1b16h-i',
        name: 'Dahua Hybrid Video Recorder XVR1B16H-I 16 Channel + 8 IP Full HD',
        price: 159.84,
        image: '/images/products/dahuahybrid.png',
        description: 'Hybrid Video Recorder, 16 channels + 8 IP, model XVR1B16H-I.',
        sku: 'XVR1B16H-I',
        barcode: '',
        stock: 0,
        category: 'cctv',
      },
      {
        id: 'dahua-dome-hdcvi-2mp',
        name: 'Dahua 2MP HDCVI Dome Camera 3.6mm HAC-T1A21-U',
        price: 25.00,
        image: '/images/products/dahuadomehdcvi.png',
        description: '2MP HDCVI Dome Camera, 3.6mm, model HAC-T1A21-U.',
        sku: 'HAC-T1A21-U',
        barcode: '',
        stock: 0,
        category: 'cctv',
      },
      {
        id: 'dahua-dome-4mp',
        name: 'Dahua Dome Network Camera 4MP 2.8MM DH-IPC-HDW1439T1-A-LED',
        price: 49.00,
        image: '/images/products/dahuadome4mp.png',
        description: '4MP Dome Network Camera, 2.8mm, model DH-IPC-HDW1439T1-A-LED.',
        sku: 'DH-IPC-HDW1439T1-A-LED',
        barcode: '',
        stock: 0,
        category: 'cctv',
      },
      {
        id: 'dahua-nvr-4116hs',
        name: 'Dahua Network Video Recorder 16Channel up to 12MP DHI-NVR4116HS-2N-4KS3',
        price: 115.00,
        image: '/images/products/dahuaNVR16CH.png',
        description: 'Network Video Recorder, 16 channels, up to 12MP, model DHI-NVR4116HS-2N-4KS3.',
        sku: 'DHI-NVR4116HS-2N-4KS3',
        barcode: '',
        stock: 0,
        category: 'cctv',
      }
    ]
  }
};

const ProductDetail = () => {
  const { category, productId } = useParams();
  const { dispatch } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showDahuaOnly, setShowDahuaOnly] = useState(false);
  const [showHikvisionOnly, setShowHikvisionOnly] = useState(false);
  const [showXiaomiOnly, setShowXiaomiOnly] = useState(false);
  const [showTplinkOnly, setShowTplinkOnly] = useState(false);
  const [showTuyaOnly, setShowTuyaOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category, productId]);

  const handleWhatsAppOrder = (productName: string, price: string) => {
    const phoneNumber = '96176331818';
    const message = encodeURIComponent(`Hi! I'm interested in ordering ${productName} for ${price}. Please provide more details.`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleAddToCart = (product: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast({
      title: "Product Added!",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  const currentProduct = productData[category || ''] || {
    title: 'Product Category',
    description: 'Product details coming soon',
    products: []
  };

  // Find the selected product if productId is present
  const selectedProduct = productId && category
    ? productData[category]?.products.find((p: any) => p.id === productId)
    : null;

  // If all are off, show all. If one is on, show only that brand. If multiple are on, show those brands.
  let filteredProducts = currentProduct.products;
  if (category === 'cctv') {
    const brandFilters = [];
    if (showDahuaOnly) brandFilters.push('dahua');
    if (showHikvisionOnly) brandFilters.push('hikvision');
    if (showXiaomiOnly) brandFilters.push('xiaomi');
    if (showTplinkOnly) brandFilters.push('tp-link');
    if (showTuyaOnly) brandFilters.push('tuya');
    if (brandFilters.length > 0) {
      filteredProducts = currentProduct.products.filter((p: any) =>
        brandFilters.some(brand =>
          p.name?.toLowerCase().includes(brand) ||
          p.sku?.toLowerCase().includes(brand)
        )
      );
    }
  }
  // Apply search filter
  if (searchTerm.trim() !== '') {
    const terms = searchTerm.trim().toLowerCase().split(/\s+/);
    filteredProducts = filteredProducts.filter((p: any) => {
      const text = `${p.name} ${p.sku} ${p.description}`.toLowerCase();
      return terms.every(term => text.includes(term));
    });
  }

  if (productId && selectedProduct) {
    const isLowStock = selectedProduct.stock && selectedProduct.stock <= 5;
    return (
      <div className="min-h-screen bg-neutral-100 flex flex-col items-center py-8 px-2">
        <Header />
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden mt-8">
          {/* Product Image */}
          <div className="md:w-1/2 w-full flex items-center justify-center bg-neutral-50 p-8 border-b md:border-b-0 md:border-r">
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full max-w-xs h-80 object-contain" />
          </div>
          {/* Product Details */}
          <div className="md:w-1/2 w-full flex flex-col p-6 md:p-10">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">{selectedProduct.name}</h1>
            <div className="flex items-center gap-3 mb-2">
              {selectedProduct.salePrice && (
                <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-semibold">Save {Math.round(100 - (selectedProduct.salePrice / selectedProduct.price) * 100)}%</span>
              )}
              <span className="text-lg md:text-2xl font-bold text-gray-900">
                {selectedProduct.salePrice ? (
                  <>
                    <span className="line-through text-gray-400 mr-2">${selectedProduct.price}</span>
                    <span className="text-red-500">${selectedProduct.salePrice}</span>
                  </>
                ) : (
                  <>${selectedProduct.price}</>
                )}
              </span>
            </div>
            {isLowStock && (
              <div className="text-red-600 font-semibold mb-2">Hurry, only {selectedProduct.stock} item{selectedProduct.stock > 1 ? 's' : ''} left in stock!</div>
            )}
            <div className="mb-4 text-gray-700 text-base">{selectedProduct.description}</div>
            {/* Features/Specs */}
            {selectedProduct.features && (
              <div className="mb-4">
                <h2 className="font-semibold text-base mb-1 text-gray-800">Key Features</h2>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                  {selectedProduct.features.map((feature: string, idx: number) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            {/* Info Box */}
            <div className="mb-4 flex flex-wrap gap-6 items-center">
              <div className="text-xs text-gray-600"><span className="font-semibold">SKU:</span> {selectedProduct.sku}</div>
              <div className="flex flex-col items-center">
                <span className="font-semibold text-xs text-gray-600">Barcode:</span>
                {selectedProduct.barcode && (
                  <Barcode value={selectedProduct.barcode} height={40} width={1.5} fontSize={12} displayValue />
                )}
              </div>
              <div className="text-xs text-gray-600">
                <span className="font-semibold">Stock:</span> {selectedProduct.stock > 0 ? (
                  <span className="text-green-600 ml-1">In Stock ({selectedProduct.stock})</span>
                ) : (
                  <span className="text-red-600 ml-1">Out of Stock</span>
                )}
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mb-6">
              <button onClick={() => handleAddToCart(selectedProduct)} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 text-base shadow-md">Add to Cart</button>
              <button onClick={() => handleWhatsAppOrder(selectedProduct.name, selectedProduct.salePrice || selectedProduct.price)} className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-200 text-base shadow-md flex items-center justify-center gap-2">
                <FaWhatsapp className="text-lg" /> Buy on WhatsApp
              </button>
            </div>
            {/* Share Buttons */}
            <div className="flex gap-3 mb-4 items-center">
              <span className="text-gray-500 font-medium text-sm">Share:</span>
              <a href={`https://wa.me/?text=Check%20out%20this%20product%20on%20MyWebsite:%20${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="bg-green-100 text-green-700 p-2 rounded-full hover:bg-green-200 transition-colors"><FaWhatsapp /></a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="bg-blue-100 text-blue-700 p-2 rounded-full hover:bg-blue-200 transition-colors"><FaFacebookF /></a>
            </div>
          </div>
        </div>
        {/* Related Products */}
        {category && (
          <div className="w-full max-w-4xl mt-12">
            <h3 className="font-bold text-lg mb-4 text-gray-900">You may also like</h3>
            <div className="flex gap-6 overflow-x-auto pb-2">
              {productData[category]?.products
                .filter((p: any) => p.id !== selectedProduct.id)
                .map((relProd: any) => (
                  <div key={relProd.id} className="min-w-[200px] max-w-[220px] bg-white border rounded-lg shadow hover:shadow-lg transition cursor-pointer flex-shrink-0 hover:scale-105 duration-200" onClick={() => navigate(`/products/${category}/${relProd.id}`)}>
                    <img src={relProd.image} alt={relProd.name} className="h-32 w-full object-contain rounded-t-lg" />
                    <div className="p-3">
                      <div className="font-semibold text-sm mb-1 line-clamp-2">{relProd.name}</div>
                      <div className="text-blue-600 font-bold text-base">{relProd.salePrice ? <><span className='line-through text-gray-400 mr-1'>${relProd.price}</span> <span>${relProd.salePrice}</span></> : <>${relProd.price}</>}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/products" className="inline-flex items-center text-blue-200 hover:text-white mb-4">
            ← Back to Products
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            {currentProduct.title}
          </h1>
          <p className="text-xl mb-8 animate-fade-in">
            {currentProduct.description}
          </p>
        </div>
      </section>

      {/* Search Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-4">
        <form
          onSubmit={e => {
            e.preventDefault();
            if (searchTerm.trim() !== '') {
              navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
              setSearchTerm('');
            }
          }}
          className="w-full max-w-md mx-auto flex items-center bg-gray-100 rounded-full px-4 py-2 shadow focus-within:ring-2 focus-within:ring-blue-400"
        >
          <FaSearch className="text-gray-400 text-lg mr-2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search products by name, model, or description..."
            className="flex-1 bg-transparent border-none outline-none px-2 py-1 text-base"
          />
          <button
            type="submit"
            className="ml-2 px-5 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition shadow"
          >
            Go
          </button>
        </form>
      </div>

      {/* Brand Cards */}
      {category === 'cctv' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex gap-4 flex-wrap">
          <button
            className={`flex items-center gap-3 bg-white border rounded-lg shadow px-6 py-3 hover:bg-blue-50 transition cursor-pointer ${showDahuaOnly ? 'ring-2 ring-blue-400' : ''}`}
            onClick={() => setShowDahuaOnly((prev) => !prev)}
          >
            <img src="/images/dahua.png" alt="Dahua Logo" className="h-8 w-auto" />
            <span className="font-bold text-lg text-gray-800">Dahua</span>
            {showDahuaOnly && <span className="ml-2 text-blue-600 font-semibold">(Show All)</span>}
          </button>
          <button
            className={`flex items-center gap-3 bg-white border rounded-lg shadow px-6 py-3 hover:bg-blue-50 transition cursor-pointer ${showHikvisionOnly ? 'ring-2 ring-blue-400' : ''}`}
            onClick={() => setShowHikvisionOnly((prev) => !prev)}
          >
            <img src="/images/hikvision.png" alt="Hikvision Logo" className="h-8 w-auto" />
            <span className="font-bold text-lg text-gray-800">Hikvision</span>
            {showHikvisionOnly && <span className="ml-2 text-blue-600 font-semibold">(Show All)</span>}
          </button>
          <button
            className={`flex items-center gap-3 bg-white border rounded-lg shadow px-6 py-3 hover:bg-blue-50 transition cursor-pointer ${showXiaomiOnly ? 'ring-2 ring-blue-400' : ''}`}
            onClick={() => setShowXiaomiOnly((prev) => !prev)}
          >
            <img src="/images/xiaomi.png" alt="Xiaomi Logo" className="h-8 w-auto" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <span className="font-bold text-lg text-gray-800">Xiaomi</span>
            {showXiaomiOnly && <span className="ml-2 text-blue-600 font-semibold">(Show All)</span>}
          </button>
          <button
            className={`flex items-center gap-3 bg-white border rounded-lg shadow px-6 py-3 hover:bg-blue-50 transition cursor-pointer ${showTplinkOnly ? 'ring-2 ring-blue-400' : ''}`}
            onClick={() => setShowTplinkOnly((prev) => !prev)}
          >
            <img src="/images/tplink.png" alt="TP-Link Logo" className="h-8 w-auto" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <span className="font-bold text-lg text-gray-800">TP-Link</span>
            {showTplinkOnly && <span className="ml-2 text-blue-600 font-semibold">(Show All)</span>}
          </button>
          <button
            className={`flex items-center gap-3 bg-white border rounded-lg shadow px-6 py-3 hover:bg-blue-50 transition cursor-pointer ${showTuyaOnly ? 'ring-2 ring-blue-400' : ''}`}
            onClick={() => setShowTuyaOnly((prev) => !prev)}
          >
            <img src="/images/tuya.png" alt="Tuya Logo" className="h-8 w-auto" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <span className="font-bold text-lg text-gray-800">Tuya</span>
            {showTuyaOnly && <span className="ml-2 text-blue-600 font-semibold">(Show All)</span>}
          </button>
        </div>
      )}

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div 
                    className="cursor-pointer"
                    onClick={() => navigate(`/products/${category}/${product.id}`)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 sm:h-48 object-cover"
                    />
                    <div className="p-3 sm:p-6">
                      <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                        {product.name}
                      </h3>
                      <p className="text-xs sm:text-gray-600 sm:text-base mb-2 sm:mb-4">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mb-2 sm:mb-4">
                        <span className="text-lg sm:text-2xl font-bold text-blue-600">
                          {product.salePrice ? (
                            <>
                              <span className="line-through text-gray-400 mr-2">${product.price}</span>
                              <span className="text-red-500">${product.salePrice}</span>
                            </>
                          ) : (
                            <>${product.price}</>
                          )}
                        </span>
                        {product.salePrice && (
                          <span className="inline-block bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-semibold ml-2">
                            Save {Math.round(100 - (product.salePrice / product.price) * 100)}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div className="px-3 sm:px-6 pb-3 sm:pb-6 space-y-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 text-sm shadow-md"
                    >
                      Add to Cart
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWhatsAppOrder(product.name, product.salePrice || product.price);
                      }}
                      className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition-all duration-200 text-sm shadow-md flex items-center justify-center gap-2"
                    >
                      <FaWhatsapp className="text-sm" /> Buy on WhatsApp
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h3>
              <p className="text-gray-600">Product details for this category will be available soon.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
