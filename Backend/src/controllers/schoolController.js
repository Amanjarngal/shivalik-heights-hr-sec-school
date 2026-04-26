import School from '../models/schoolModel.js';

// @desc    Get school settings
// @route   GET /api/school
// @access  Public
export const getSchoolSettings = async (req, res) => {
  try {
    const school = await School.getInstance();
    res.status(200).json({ success: true, data: school });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Update school settings
// @route   PUT /api/school
// @access  Private/Admin
export const updateSchoolSettings = async (req, res) => {
  try {
    let school = await School.getInstance();
    
    // Update fields
    const fields = [
      'schoolName', 'shortName', 'address', 'phone', 
      'email', 'workingHours', 'facebookUrl', 'twitterUrl', 'instagramUrl',
      'mapUrl', 'boardAffiliation', 'heroTitle', 'heroSubtitle', 'admissionLastDate',
      'chairmanName', 'chairmanMessage', 'principalName', 'principalMessage'
    ];

    fields.forEach(field => {
      if (req.body[field] !== undefined) {
        school[field] = req.body[field];
      }
    });

    if (req.files && req.files.logo && req.files.logo.length > 0) {
      school.logoUrl = req.files.logo[0].path;
    }

    if (req.files && req.files.admissionImage && req.files.admissionImage.length > 0) {
      school.admissionImage = req.files.admissionImage[0].path;
    }

    if (req.files && req.files.aboutUsImage && req.files.aboutUsImage.length > 0) {
      school.aboutUsImage = req.files.aboutUsImage[0].path;
    }

    if (req.files && req.files.chairmanImage && req.files.chairmanImage.length > 0) {
      school.chairmanImage = req.files.chairmanImage[0].path;
    }

    if (req.files && req.files.principalImage && req.files.principalImage.length > 0) {
      school.principalImage = req.files.principalImage[0].path;
    }

    if (req.body.heroSlidesMetadata) {
      try {
        const parsedSlides = JSON.parse(req.body.heroSlidesMetadata);
        const heroImages = (req.files && req.files.heroImages) ? req.files.heroImages : [];
        
        school.heroSlides = parsedSlides.map(slide => {
          let imageUrl = slide.imageUrl || '';
          if (slide.imageIndex !== undefined && heroImages[slide.imageIndex]) {
            imageUrl = heroImages[slide.imageIndex].path;
          }
          return {
            imageUrl,
            title: slide.title || '',
            description: slide.description || ''
          };
        });
      } catch (err) {
        console.error("Error parsing heroSlidesMetadata:", err);
      }
    }

    const updatedSchool = await school.save();
    res.status(200).json({ success: true, data: updatedSchool });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
