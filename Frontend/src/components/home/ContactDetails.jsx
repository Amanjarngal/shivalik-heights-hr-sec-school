import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSchool } from '../../context/SchoolContext';

const getContacts = (settings) => [
  {
    icon: Mail,
    title: 'Email Us',
    value: settings.email,
    sub: 'We reply within 24 hours',
    gradient: 'from-[#a81d1d] to-rose-600',
    glow: 'shadow-red-100',
    href: `mailto:${settings.email}`,
  },
  {
    icon: Phone,
    title: 'Call Us',
    value: settings.phone,
    sub: settings.workingHours,
    gradient: 'from-blue-700 to-blue-500',
    glow: 'shadow-blue-100',
    href: `tel:${settings.phone}`,
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    value: settings.address.split(',')[0],
    sub: settings.address.split(',').slice(1).join(',').trim() || 'J&K',
    gradient: 'from-green-600 to-emerald-500',
    glow: 'shadow-green-100',
    href: '/contact',
  },
  {
    icon: Clock,
    title: 'Office Hours',
    value: settings.workingHours.split(' ').slice(4).join(' ') || '9:00 AM – 4:00 PM',
    sub: settings.workingHours.split(' ').slice(0, 3).join(' ') || 'Monday to Saturday',
    gradient: 'from-purple-700 to-purple-500',
    glow: 'shadow-purple-100',
    href: '/contact',
  },
];

const ContactDetails = () => {
  const { schoolSettings } = useSchool();
  const contacts = getContacts(schoolSettings);
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 text-xs font-black uppercase tracking-[0.25em] text-[#a81d1d] bg-red-50 border border-red-200 rounded-full mb-4">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
            Connect <span className="text-[#a81d1d]">With Us</span>
          </h2>
          <div className="w-16 h-1.5 bg-[#a81d1d] mx-auto rounded-full mb-5" />
          <p className="text-gray-500 text-base max-w-md mx-auto font-medium">
            Have questions? We're here to help every step of the way.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contacts.map((c, i) => (
            <motion.a
              key={c.title}
              href={c.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`group relative bg-white rounded-3xl p-7 shadow-lg ${c.glow} hover:shadow-2xl border border-gray-100 transition-all overflow-hidden flex flex-col gap-4 cursor-pointer`}
            >
              {/* Background gradient circle on hover */}
              <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${c.gradient} opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-300`} />

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.gradient} flex items-center justify-center shadow-lg`}>
                <c.icon className="w-7 h-7 text-white" />
              </div>

              {/* Text */}
              <div className="flex-1">
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">{c.title}</p>
                <p className="text-base font-black text-gray-900 leading-tight mb-1">{c.value}</p>
                <p className="text-xs text-gray-400 font-medium">{c.sub}</p>
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-1 text-xs font-black text-gray-300 group-hover:text-[#a81d1d] transition-colors">
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 text-sm mb-4 font-medium">Want to visit us in person?</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#a81d1d] to-rose-600 hover:from-[#8f1818] text-white font-black rounded-2xl shadow-lg shadow-red-100 hover:shadow-red-200 transition-all group"
          >
            View Full Contact Page
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default ContactDetails;
