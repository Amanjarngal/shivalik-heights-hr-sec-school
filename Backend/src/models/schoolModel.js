import mongoose from 'mongoose';

const schoolSchema = new mongoose.Schema({
  schoolName: {
    type: String,
    required: true,
    default: 'Shivalik Heights Higher Secondary School'
  },
  shortName: {
    type: String,
    required: true,
    default: 'SHHSS'
  },
  address: {
    type: String,
    required: true,
    default: 'Hiranagar., Kathua — J&K'
  },
  phone: {
    type: String,
    required: true,
    default: '+91 95968 14606'
  },
  email: {
    type: String,
    required: true,
    default: 'info@shivalikheights.edu.in'
  },
  workingHours: {
    type: String,
    default: 'Sun - Fri: 9:00 AM - 4:00 PM'
  },
  facebookUrl: {
    type: String,
    default: '#'
  },
  twitterUrl: {
    type: String,
    default: '#'
  },
  instagramUrl: {
    type: String,
    default: '#'
  },
  logoUrl: {
    type: String,
    default: ''
  },
  mapUrl: {
    type: String,
    default: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1679.5259972886756!2d74.47446153835639!3d33.045344400000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391e445dc3aaf475%3A0x890dcad516b4d923!2sNew%20Public%20High%20School%20Sunder%20Bani!5e0!3m2!1sen!2sin!4v1710500000000!5m2!1sen!2sin'
  },
  boardAffiliation: {
    type: String,
    default: 'JKBOSE'
  },
  heroTitle: {
    type: String,
    default: 'Building Leaders of Tomorrow, Today.'
  },
  heroSubtitle: {
    type: String,
    default: "Where your child's potential meets world-class opportunity in a nurturing environment."
  },
  heroSlides: [{
    imageUrl: String,
    title: String,
    description: String
  }],
  admissionImage: {
    type: String,
    default: 'https://images.unsplash.com/photo-1523050853063-bd388f9f79b5?q=80&w=2000&auto=format&fit=crop'
  },
  admissionLastDate: {
    type: String,
    default: '31st March 2026'
  },
  aboutUsImage: {
    type: String,
    default: 'https://lh3.googleusercontent.com/gps-cs-s/AHVAweplnOkPGyhzIB-khbCKbaoDfeBcfPGKQw5N5Itxbn1BiJUgFUoaAqYQmrXakV3YXlFB80cdCRNGSjYtLkmAemKm7IulKVnE30BIsaqmuvszup4ylJGT8f2AqQ9TvPjDoXVJ3Txq=s1360-w1360-h1020-rw'
  },
  chairmanName: {
    type: String,
    default: 'Sh. [Name]'
  },
  chairmanMessage: {
    type: String,
    default: '"At SHHSS, we believe that education is not just about books, but about building a foundation for life. Our vision is to create a community where every student feels valued and empowered. We are committed to providing the infrastructure and guidance necessary for our students to compete at the highest levels, while remaining rooted in our cultural values."'
  },
  chairmanImage: {
    type: String,
    default: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2000&auto=format&fit=crop'
  },
  principalName: {
    type: String,
    default: 'Ms. [Name]'
  },
  principalMessage: {
    type: String,
    default: '"Our school is a place of infinite possibilities. Every day, I see young minds blooming with curiosity and ambition. We strive to provide an environment that is both academically rigorous and emotionally supportive. Our faculty is dedicated to mentorship, ensuring that every SHHSS graduate is a well-rounded individual ready to contribute meaningfully to society."'
  },
  principalImage: {
    type: String,
    default: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2000&auto=format&fit=crop'
  }
}, { timestamps: true });

// Ensure only one document exists
schoolSchema.statics.getInstance = async function () {
  let config = await this.findOne();
  if (!config) {
    config = await this.create({});
  }
  return config;
};

const School = mongoose.model('School', schoolSchema);
export default School;
