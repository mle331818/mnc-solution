import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';

const ProductDetail = () => {
  const { category } = useParams();

  const handleWhatsAppOrder = (productName: string, price: string) => {
    const phoneNumber = '96176331818';
    const message = encodeURIComponent(`Hi! I'm interested in ordering ${productName} for ${price}. Please provide more details.`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const productData: Record<string, any> = {
    'network-solution': {
      title: 'Network Solutions',
      description: 'Complete networking infrastructure and connectivity solutions',
      products: [
        {
          name: 'Cisco Router 2900',
          price: '$450',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
          description: 'Enterprise-grade router with advanced security features'
        },
        {
          name: 'TP-Link Switch 24-Port',
          price: '$180',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
          description: '24-port gigabit managed switch for small businesses'
        },
        {
          name: 'Ubiquiti Access Point',
          price: '$120',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
          description: 'High-performance WiFi 6 access point'
        },
        {
          name: 'Network Cable Cat6',
          price: '$0.50/m',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
          description: 'Cat6 shielded cable for high-speed networking'
        },
        {
          name: 'Network Cabinet 19"',
          price: '$350',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
          description: '19-inch server rack cabinet with cooling'
        },
        {
          name: 'PoE Injector 48V',
          price: '$25',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
          description: 'Power over Ethernet injector for cameras and APs'
        }
      ]
    },
    'softwares': {
      title: 'Software Solutions',
      description: 'Custom software development and business applications',
      products: [
        {
          name: 'Inventory Management System',
          price: '$2,500',
          image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80',
          description: 'Complete inventory tracking and management solution'
        },
        {
          name: 'Point of Sale (POS)',
          price: '$1,800',
          image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80',
          description: 'Modern POS system with payment integration'
        },
        {
          name: 'Customer Management CRM',
          price: '$3,200',
          image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80',
          description: 'Customer relationship management platform'
        },
        {
          name: 'Accounting Software',
          price: '$1,500',
          image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80',
          description: 'Complete accounting and bookkeeping solution'
        },
        {
          name: 'E-commerce Website',
          price: '$4,000',
          image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80',
          description: 'Custom online store with payment gateway'
        },
        {
          name: 'Mobile App Development',
          price: '$5,000',
          image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80',
          description: 'iOS and Android mobile application development'
        }
      ]
    },
    'computer-laptops': {
      title: 'Computers & Laptops',
      description: 'High-quality computers, laptops, and accessories',
      products: [
        {
          name: 'Dell OptiPlex 7090',
          price: '$850',
          image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80',
          description: 'Business desktop with Intel i7, 16GB RAM, 512GB SSD'
        },
        {
          name: 'HP EliteBook 840',
          price: '$1,200',
          image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80',
          description: 'Professional laptop with 14" display and long battery'
        },
        {
          name: 'Gaming PC Custom Build',
          price: '$1,500',
          image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80',
          description: 'Custom gaming PC with RTX 3060 and Ryzen 5'
        },
        {
          name: 'MacBook Air M2',
          price: '$1,300',
          image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80',
          description: 'Apple MacBook Air with M2 chip and 13" display'
        },
        {
          name: 'Dell Precision Workstation',
          price: '$2,200',
          image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80',
          description: 'Professional workstation for CAD and 3D modeling'
        },
        {
          name: 'Lenovo ThinkPad X1',
          price: '$1,600',
          image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80',
          description: 'Ultra-lightweight business laptop with premium features'
        }
      ]
    },
    'satellite': {
      title: 'Satellite Solutions',
      description: 'Satellite communication and broadcasting equipment',
      products: [
        {
          name: 'Satellite Dish 1.2m',
          price: '$180',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
          description: '1.2 meter satellite dish for TV reception'
        },
        {
          name: 'Satellite Receiver HD',
          price: '$85',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
          description: 'High-definition satellite receiver with recording'
        },
        {
          name: 'Satellite Modem',
          price: '$450',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
          description: 'VSAT satellite internet modem for remote areas'
        },
        {
          name: 'Satellite TV Package',
          price: '$320',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
          description: 'Complete satellite TV installation package'
        },
        {
          name: 'Satellite Finder Meter',
          price: '$65',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
          description: 'Professional satellite signal finder and meter'
        },
        {
          name: 'Satellite LNB',
          price: '$35',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
          description: 'Low Noise Block converter for satellite dishes'
        }
      ]
    },
    'fiber-solution': {
      title: 'Fiber Solutions',
      description: 'Fiber optic networking and connectivity solutions',
      products: [
        {
          name: 'Fiber Optic Cable 100m',
          price: '$120',
          image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80',
          description: '100-meter single-mode fiber optic cable'
        },
        {
          name: 'Fiber Splicing Machine',
          price: '$2,500',
          image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80',
          description: 'Professional fiber optic splicing equipment'
        },
        {
          name: 'Fiber Optic Tester',
          price: '$350',
          image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80',
          description: 'OTDR fiber optic cable tester'
        },
        {
          name: 'Fiber Termination Kit',
          price: '$180',
          image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80',
          description: 'Complete fiber optic termination kit'
        },
        {
          name: 'Fiber Patch Panel',
          price: '$95',
          image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80',
          description: '24-port fiber optic patch panel'
        },
        {
          name: 'Fiber Installation Service',
          price: '$500/day',
          image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80',
          description: 'Professional fiber optic installation service'
        }
      ]
    },
    'interphone-solution': {
      title: 'Interphone Solutions',
      description: 'Professional intercom and communication systems',
      products: [
        {
          name: 'Door Entry System',
          price: '$280',
          image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
          description: 'Video door entry system with camera and speaker'
        },
        {
          name: 'Intercom Panel 4-Way',
          price: '$150',
          image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
          description: '4-way intercom panel for buildings'
        },
        {
          name: 'Wireless Intercom',
          price: '$95',
          image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
          description: 'Wireless intercom system for homes'
        },
        {
          name: 'Security Intercom',
          price: '$220',
          image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
          description: 'Security intercom with access control'
        },
        {
          name: 'Intercom Handset',
          price: '$45',
          image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
          description: 'Replacement intercom handset unit'
        },
        {
          name: 'Intercom Installation',
          price: '$200',
          image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
          description: 'Professional intercom system installation'
        }
      ]
    },
    '3d-printers-cnc': {
      title: '3D Printers & CNC',
      description: '3D printing and CNC machining solutions',
      products: [
        {
          name: 'Creality Ender 3 V2',
          price: '$280',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
          description: 'Popular 3D printer with 220x220x250mm build volume'
        },
        {
          name: 'Prusa i3 MK3S+',
          price: '$750',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
          description: 'High-quality 3D printer with auto-bed leveling'
        },
        {
          name: 'CNC Router 3018',
          price: '$350',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
          description: 'Desktop CNC router for wood and plastic'
        },
        {
          name: '3D Printer Filament',
          price: '$25/kg',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
          description: 'PLA and ABS filament in various colors'
        },
        {
          name: 'CNC Mill Desktop',
          price: '$1,200',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
          description: 'Desktop CNC mill for metal and plastic'
        },
        {
          name: '3D Scanner',
          price: '$450',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
          description: '3D scanner for reverse engineering'
        }
      ]
    },
    'automation-system': {
      title: 'Automation System',
      description: 'Smart automation and control systems for modern homes and businesses',
      products: [
        {
          name: 'Tuya Smart Switch',
          price: '$25',
          image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=400&q=80',
          description: 'WiFi-enabled smart switch with voice control'
        },
        {
          name: 'Tuya Smart Thermostat',
          price: '$89',
          image: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&w=400&q=80',
          description: 'Programmable smart thermostat with app control'
        },
        {
          name: 'Tuya Smart Door Lock',
          price: '$159',
          image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=400&q=80',
          description: 'Keyless entry with fingerprint and app access'
        },
        {
          name: 'Tuya Smart Camera',
          price: '$79',
          image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80',
          description: '1080P security camera with night vision'
        },
        {
          name: 'Tuya Smart Sensor Kit',
          price: '$45',
          image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=400&q=80',
          description: 'Motion, door, and temperature sensors'
        },
        {
          name: 'Tuya Smart Hub',
          price: '$55',
          image: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&w=400&q=80',
          description: 'Central control hub for all smart devices'
        }
      ]
    },
    'cctv': {
      title: 'CCTV Systems',
      description: 'Professional security cameras and surveillance systems',
      products: [
        {
          name: 'HD Security Camera',
          price: '$120',
          image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80',
          description: '1080P HD security camera with night vision'
        },
        {
          name: '4K Security Camera',
          price: '$250',
          image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80',
          description: '4K Ultra HD camera with advanced features'
        },
        {
          name: 'DVR System 8-Channel',
          price: '$320',
          image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80',
          description: '8-channel digital video recorder'
        },
        {
          name: 'PTZ Security Camera',
          price: '$380',
          image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80',
          description: 'Pan-tilt-zoom camera with remote control'
        },
        {
          name: 'NVR System 16-Channel',
          price: '$450',
          image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80',
          description: '16-channel network video recorder'
        },
        {
          name: 'CCTV Installation Kit',
          price: '$180',
          image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80',
          description: 'Complete CCTV installation package'
        }
      ]
    }
  };

  const currentProduct = productData[category || ''] || {
    title: 'Product Category',
    description: 'Product details coming soon',
    products: []
  };

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProduct.products.map((product: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-blue-600">
                        {product.price}
                      </span>
                    </div>
                    <button
                      onClick={() => handleWhatsAppOrder(product.name, product.price)}
                      className="w-full bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <span>💬</span>
                      <span>Buy on WhatsApp</span>
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
