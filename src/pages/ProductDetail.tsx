import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../hooks/use-toast';
import Header from '../components/Header';
import Barcode from 'react-barcode';
import { FaWhatsapp, FaFacebookF } from 'react-icons/fa';

const ProductDetail = () => {
  const { category, productId } = useParams();
  const { dispatch } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

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

  const productData: Record<string, any> = {
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
          id: 'Dahua Camera 4mp',
          name: 'Dahua Camera 4mp',
          price: '$120',
          image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80',
          description: '1080P HD security camera with night vision',
          category: 'cctv'
        },
        {
          id: '4k-security-camera',
          name: '4K Security Camera',
          price: '$250',
          image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80',
          description: '4K Ultra HD camera with advanced features',
          category: 'cctv'
        },
        {
          id: 'dvr-system-8channel',
          name: 'DVR System 8-Channel',
          price: '$320',
          image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80',
          description: '8-channel digital video recorder',
          category: 'cctv'
        },
        {
          id: 'ptz-security-camera',
          name: 'PTZ Security Camera',
          price: '$380',
          image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80',
          description: 'Pan-tilt-zoom camera with remote control',
          category: 'cctv'
        },
        {
          id: 'nvr-system-16channel',
          name: 'NVR System 16-Channel',
          price: '$450',
          image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80',
          description: '16-channel network video recorder',
          category: 'cctv'
        },
        {
          id: 'cctv-installation-kit',
          name: 'CCTV Installation Kit',
          price: '$180',
          image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80',
          description: 'Complete CCTV installation package',
          category: 'cctv'
        },
        {
          id: 'dahua-monitor-27',
          name: 'Dahua 27-inch FHD 100HZ LED Business Monitor DHI-LM27-B201S',
          price: 110.00,
          salePrice: 89.00,
          image: '/images/products/dahua-monitor-27.png',
          description: '27-inch Full HD monitor, 100Hz refresh rate.',
          features: [
            'Screen Size: 27 inches',
            'Panel Type: IPS',
            'Aspect Ratio: 16:9',
            'Resolution: 1920×1080 (Full HD)',
            'Backlight: LED',
            'Brightness: 250 cd/㎡ (max)',
            'Contrast Ratio: 1000:1',
            'Display Colors: 16.7 million (8-bit)',
            'Viewing Angle: 178° (Horizontal)/178° (Vertical)',
            'Response Time: 5ms (typical)',
            'Refresh Rate: 100Hz (max)',
            'Inputs: VGA ×1, HDMI ×1',
            'Built-in Speakers: 1W ×2'
          ],
          sku: '1006555',
          barcode: '6923172545909',
          stock: 2,
          relatedProductIds: ['dahua-ups-800va', 'dahua-nvr-1108hs'],
          category: 'cctv'
        }
      ]
    }
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

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentProduct.products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProduct.products.map((product: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-scale-in cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
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
