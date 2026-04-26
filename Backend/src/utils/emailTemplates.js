/**
 * Email template for parent confirmation
 */
export const parentConfirmationTemplate = (data) => {
    const { parentName, studentName, classApplyingFor, admissionId, contactNumber } = data;
    const year = new Date().getFullYear();

    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
            <div style="background-color: #004a99; color: white; padding: 20px; text-align: center;">
                <h1 style="margin: 0;">SHHSS</h1>
                <p style="margin: 5px 0 0;">Shivalik Heights Higher Secondary School</p>
            </div>
            <div style="padding: 30px;">
                <h2 style="color: #004a99; margin-top: 0;">Admission Application Received</h2>
                <p>Dear <b>${parentName}</b>,</p>
                <p>Thank you for choosing SHHSS for your child's education. We have successfully received the online admission application for:</p>
                
                <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <p style="margin: 5px 0;"><b>Student Name:</b> ${studentName}</p>
                    <p style="margin: 5px 0;"><b>Class Applying For:</b> ${classApplyingFor}</p>
                    <p style="margin: 5px 0;"><b>Application ID:</b> ${admissionId}</p>
                </div>

                <p>Our admission team is currently reviewing your application. We will contact you shortly on <b>${contactNumber}</b> for the next steps in the admission process.</p>
                
                <p>If you have any urgent queries, please feel free to reply to this email or visit the school office.</p>
                
                <p style="margin-top: 30px;">Best Regards,<br>
                <b>The Admission Desk</b><br>
                Shivalik Heights Higher Secondary School</p>
            </div>
            <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #777;">
                <p>&copy; ${year} SHHSS. All Rights Reserved.</p>
            </div>
        </div>
    `;
};

/**
 * Email template for admin notification
 */
export const adminNotificationTemplate = (data) => {
    const { studentName, dateOfBirth, classApplyingFor, parentName, contactNumber, email, address, adminPanelUrl } = data;
    const formattedDate = new Date(dateOfBirth).toLocaleDateString();

    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
            <div style="background-color: #d9534f; color: white; padding: 20px; text-align: center;">
                <h2 style="margin: 0;">New Admission Alert</h2>
            </div>
            <div style="padding: 30px;">
                <p>A new admission application has been submitted through the website.</p>
                
                <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #333;">Student Details:</h3>
                    <p style="margin: 5px 0;"><b>Name:</b> ${studentName}</p>
                    <p style="margin: 5px 0;"><b>DOB:</b> ${formattedDate}</p>
                    <p style="margin: 5px 0;"><b>Class:</b> ${classApplyingFor}</p>
                    <hr style="border: 0; border-top: 1px solid #ddd; margin: 15px 0;">
                    <h3 style="color: #333;">Contact Information:</h3>
                    <p style="margin: 5px 0;"><b>Parent:</b> ${parentName}</p>
                    <p style="margin: 5px 0;"><b>Phone:</b> ${contactNumber}</p>
                    <p style="margin: 5px 0;"><b>Email:</b> ${email}</p>
                    <p style="margin: 5px 0;"><b>Address:</b> ${address}</p>
                </div>

                <p style="text-align: center;">
                    <a href="${adminPanelUrl || '#'}" style="background-color: #004a99; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block;">View in Admin Panel</a>
                </p>
            </div>
        </div>
    `;
};

/**
 * Email template for enquiry confirmation (Parent)
 */
export const enquiryConfirmationTemplate = (data) => {
    const { parentName, subject, message } = data;
    const year = new Date().getFullYear();

    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
            <div style="background-color: #004a99; color: white; padding: 20px; text-align: center;">
                <h1 style="margin: 0;">SHHSS</h1>
                <p style="margin: 5px 0 0;">Shivalik Heights Higher Secondary School</p>
            </div>
            <div style="padding: 30px;">
                <h2 style="color: #004a99; margin-top: 0;">We've Received Your Enquiry</h2>
                <p>Dear <b>${parentName}</b>,</p>
                <p>Thank you for reaching out to us. We have received your enquiry regarding "<b>${subject}</b>".</p>
                
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #004a99;">
                    <p style="margin: 0; font-style: italic;">"${message}"</p>
                </div>

                <p>Our team will review your message and get back to you as soon as possible via email or phone.</p>
                
                <p style="margin-top: 30px;">Best Regards,<br>
                <b>The School Office</b><br>
                Shivalik Heights Higher Secondary School</p>
            </div>
            <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #777;">
                <p>&copy; ${year} SHHSS. All Rights Reserved.</p>
            </div>
        </div>
    `;
};

/**
 * Email template for enquiry admin notification
 */
export const enquiryAdminNotificationTemplate = (data) => {
    const { parentName, parentPhone, parentEmail, subject, message, adminPanelUrl } = data;

    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
            <div style="background-color: #f0ad4e; color: white; padding: 20px; text-align: center;">
                <h2 style="margin: 0;">New Website Enquiry</h2>
            </div>
            <div style="padding: 30px;">
                <p>You have received a new contact/enquiry through the school website.</p>
                
                <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #333;">Sender Details:</h3>
                    <p style="margin: 5px 0;"><b>Name:</b> ${parentName}</p>
                    <p style="margin: 5px 0;"><b>Phone:</b> ${parentPhone}</p>
                    <p style="margin: 5px 0;"><b>Email:</b> ${parentEmail}</p>
                    <hr style="border: 0; border-top: 1px solid #ddd; margin: 15px 0;">
                    <h3 style="color: #333;">Message:</h3>
                    <p style="margin: 5px 0;"><b>Subject:</b> ${subject}</p>
                    <p style="margin: 10px 0; padding: 10px; background: white; border: 1px solid #eee;">${message}</p>
                </div>

                <p style="text-align: center;">
                    <a href="${adminPanelUrl || '#'}" style="background-color: #004a99; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block;">Manage Enquiries</a>
                </p>
            </div>
        </div>
    `;
};
