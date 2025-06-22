import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';

const ServiceDetail = () => {
  const { service } = useParams();

  const handleWhatsAppContact = () => {
    const phoneNumber = '96176331818';
    const message = encodeURIComponent(`Hi! I'm interested in your ${serviceData[service || '']?.title || 'service'}. Please provide more information.`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const serviceData: Record<string, any> = {
    'computer-laptops-repair': {
      title: 'Computer and Laptops Repair',
      description: 'Expert computer and laptop repair services with professional diagnostics and quality parts',
      details: [
        'Comprehensive hardware and software diagnostics',
        'Component replacement with genuine parts',
        'Performance optimization and system tuning',
        'Data recovery and backup services',
        'Virus removal and system security',
        'Hardware upgrades and customization'
      ],
      features: [
        'Free diagnostic assessment',
        'Genuine replacement parts',
        'Same-day service for common issues',
        'Warranty on all repairs',
        'Data protection guarantee',
        'Performance optimization included'
      ]
    },
    'satellite-installation': {
      title: 'Satellite Installation',
      description: 'Professional satellite system installation, alignment, and maintenance services',
      details: [
        'Site survey and signal strength analysis',
        'Professional satellite dish installation',
        'Precise satellite alignment and positioning',
        'Receiver setup and channel programming',
        'Signal optimization and quality testing',
        'System maintenance and troubleshooting'
      ],
      features: [
        'Professional alignment tools',
        'Signal strength optimization',
        'Multi-satellite setup available',
        'HD and 4K receiver installation',
        'Remote control programming',
        'Ongoing maintenance support'
      ]
    },
    'fiber-installation': {
      title: 'Fiber Installation and Soldering',
      description: 'Professional fiber optic installation, splicing, and maintenance services',
      details: [
        'Fiber optic cable routing and installation',
        'Professional fiber splicing and termination',
        'OTDR testing and signal quality verification',
        'Fiber optic network design and planning',
        'Patch panel installation and management',
        'System troubleshooting and repair'
      ],
      features: [
        'Professional splicing equipment',
        'OTDR testing and certification',
        'High-speed fiber connections',
        'Network infrastructure design',
        'Quality assurance testing',
        'Maintenance and support services'
      ]
    },
    'interphone-installation': {
      title: 'Interphone Installation',
      description: 'Complete intercom system installation, configuration, and maintenance',
      details: [
        'Intercom system design and planning',
        'Professional installation and wiring',
        'System configuration and programming',
        'User interface setup and training',
        'Integration with security systems',
        'Ongoing maintenance and support'
      ],
      features: [
        'Video and audio intercom systems',
        'Multi-unit building installations',
        'Access control integration',
        'Mobile app connectivity',
        'Professional installation warranty',
        '24/7 technical support'
      ]
    },
    'it-support': {
      title: 'IT Support',
      description: 'Comprehensive IT support and technical assistance for businesses and individuals',
      details: [
        'Remote technical support and troubleshooting',
        'Network infrastructure maintenance',
        'Software installation and configuration',
        'System security and antivirus setup',
        'Data backup and recovery services',
        'IT consulting and planning'
      ],
      features: [
        '24/7 remote support available',
        'On-site technical assistance',
        'Preventive maintenance programs',
        'Security audit and implementation',
        'Cloud service setup and management',
        'IT infrastructure planning'
      ]
    },
    'formatting-software': {
      title: 'Formatting and Software Installation',
      description: 'Professional computer formatting, operating system installation, and software setup',
      details: [
        'Complete system formatting and cleanup',
        'Operating system installation and setup',
        'Driver installation and optimization',
        'Software installation and configuration',
        'System optimization and tuning',
        'Data backup and restoration'
      ],
      features: [
        'Complete data backup before formatting',
        'Genuine operating system installation',
        'All necessary driver installation',
        'Essential software package setup',
        'System performance optimization',
        'Post-installation support'
      ]
    },
    '3d-printer-maintenance': {
      title: '3D Printer Maintenance',
      description: 'Professional 3D printer maintenance, calibration, and repair services',
      details: [
        '3D printer calibration and leveling',
        'Component replacement and upgrades',
        'Print quality optimization',
        'Firmware updates and configuration',
        'Troubleshooting and repair services',
        'Performance tuning and optimization'
      ],
      features: [
        'Professional calibration tools',
        'Genuine replacement parts',
        'Print quality optimization',
        'Firmware and software updates',
        'Performance testing and tuning',
        'Maintenance training and support'
      ]
    },
    'cctv-installation': {
      title: 'CCTV Installation',
      description: 'Professional CCTV system installation and configuration services',
      details: [
        'Site security assessment and planning',
        'Professional camera installation and positioning',
        'DVR/NVR system setup and configuration',
        'Remote viewing setup for mobile and desktop',
        'System testing and user training',
        'Ongoing maintenance and support'
      ],
      features: [
        'HD and 4K camera options',
        'Night vision capabilities',
        'Motion detection alerts',
        'Cloud storage integration',
        '24/7 monitoring options',
        'Mobile app access'
      ]
    },
    'network-installation': {
      title: 'Network Installation',
      description: 'Complete network infrastructure setup and configuration',
      details: [
        'Network design and planning',
        'Cable installation and management',
        'Router and switch configuration',
        'WiFi network setup and optimization',
        'Security configuration and firewall setup',
        'Network testing and documentation'
      ],
      features: [
        'High-speed connectivity',
        'Secure network architecture',
        'Scalable infrastructure',
        'Guest network setup',
        'VPN configuration',
        'Network monitoring'
      ]
    },
    'automation-system': {
      title: 'Automation System Installation',
      description: 'Smart home and building automation solutions',
      details: [
        'Smart device consultation and selection',
        'System design and integration planning',
        'Professional installation of smart devices',
        'Central hub configuration',
        'Mobile app setup and training',
        'System testing and optimization'
      ],
      features: [
        'Voice control integration',
        'Smartphone app control',
        'Energy monitoring',
        'Security integration',
        'Scheduling and automation',
        'Remote access and control'
      ]
    }
  };

  const currentService = serviceData[service || ''] || {
    title: 'Service',
    description: 'Service details coming soon',
    details: [],
    features: []
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/services" className="inline-flex items-center text-indigo-200 hover:text-white mb-4">
            ← Back to Services
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            {currentService.title}
          </h1>
          <p className="text-xl mb-8 animate-fade-in">
            {currentService.description}
          </p>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Service Process */}
            <div className="bg-white rounded-xl shadow-lg p-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Process</h2>
              {currentService.details.length > 0 ? (
                <div className="space-y-4">
                  {currentService.details.map((detail: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <p className="text-gray-600">{detail}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Service process details coming soon.</p>
              )}
            </div>

            {/* Service Features */}
            <div className="bg-white rounded-xl shadow-lg p-8 animate-scale-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
              {currentService.features.length > 0 ? (
                <div className="space-y-3">
                  {currentService.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                      <p className="text-gray-600">{feature}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Service features coming soon.</p>
              )}
              
              <div className="mt-8">
                <button
                  onClick={handleWhatsAppContact}
                  className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>💬</span>
                  <span>Get Quote on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
