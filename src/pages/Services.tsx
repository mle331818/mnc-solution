import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const Services = () => {
  const serviceCategories = [
    {
      name: 'CCTV Installation',
      description: 'Professional CCTV system installation and setup',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=600&q=80',
      features: ['Security Assessment', 'Professional Installation', 'System Configuration'],
      slug: 'cctv-installation'
    },
    {
      name: 'Network Installation',
      description: 'Complete network infrastructure setup and configuration',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      features: ['Network Design', 'Cable Installation', 'Router Configuration'],
      slug: 'network-installation'
    },
    {
      name: 'Computer and Laptops Repair',
      description: 'Expert computer and laptop repair services',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80',
      features: ['Hardware Diagnosis', 'Component Replacement', 'Performance Optimization'],
      slug: 'computer-laptops-repair'
    },
    {
      name: 'Satellite Installation',
      description: 'Professional satellite system installation and maintenance',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      features: ['Satellite Alignment', 'Signal Optimization', 'System Setup'],
      slug: 'satellite-installation'
    },
    {
      name: 'Fiber Installation and Soldering',
      description: 'Fiber optic installation and professional soldering services',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
      features: ['Fiber Splicing', 'Cable Installation', 'Quality Testing'],
      slug: 'fiber-installation'
    },
    {
      name: 'Interphone Installation',
      description: 'Intercom system installation and configuration',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
      features: ['System Design', 'Professional Installation', 'User Training'],
      slug: 'interphone-installation'
    },
    {
      name: 'Automation System',
      description: 'Smart home and building automation solutions',
      image: 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&w=600&q=80',
      features: ['Smart Controls', 'Integration Setup', 'System Programming'],
      slug: 'automation-system'
    },
    {
      name: 'IT Support',
      description: 'Comprehensive IT support and troubleshooting',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80',
      features: ['Technical Support', 'System Maintenance', 'Remote Assistance'],
      slug: 'it-support'
    },
    {
      name: 'Formatting and Software Installation',
      description: 'Computer formatting and software installation services',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80',
      features: ['System Formatting', 'OS Installation', 'Software Setup'],
      slug: 'formatting-software'
    },
    {
      name: '3D Printer Maintenance',
      description: 'Professional 3D printer maintenance and repair',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
      features: ['Calibration', 'Parts Replacement', 'Performance Tuning'],
      slug: '3d-printer-maintenance'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Our Services
          </h1>
          <p className="text-xl mb-8 animate-fade-in">
            Professional services tailored to your business needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCategories.map((service, index) => (
              <Link
                key={index}
                to={`/services/${service.slug}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-32 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 sm:p-6">
                  <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                    {service.name}
                  </h3>
                  <p className="text-xs sm:text-gray-600 sm:text-base mb-2 sm:mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-1 sm:space-y-2 mb-3 sm:mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-xs sm:text-sm text-gray-600">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 text-center text-xs sm:text-base">
                    Learn More
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
