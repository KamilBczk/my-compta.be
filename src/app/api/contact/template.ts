interface ContactInfo {
    website: string;
    email: string;
    phone: string;
    address: string;
  }
  
  interface TemplateProps {
    primaryColor: string;
    logoUrl: string;
    contactInfo: ContactInfo;
    content: string; // Contenu dynamique de l'email
  }
  
  export const EmailTemplate = ({
    primaryColor,
    logoUrl,
    contactInfo,
    content,
  }: TemplateProps) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Template</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #ffffff; font-family: Arial, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="min-width: 100%; background-color: #ffffff; padding: 20px;">
            <tr>
              <td align="center">
                <table style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <tr>
                    <td style="padding: 40px 20px; text-align: center;">
                      <div style="margin-bottom: 10px;">
                        <img src="${logoUrl}" alt="Logo" style="width: 150px; height: auto;">
                      </div>
                      
                      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
                          <div style="text-align: left; margin-bottom: 30px;">
                          ${content}
                          </div>
                      </div>
  
                      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
                        <p style="margin: 10px 0;">
                          <a href="${contactInfo.website}" style="color: ${primaryColor}; text-decoration: none;">
                            ${contactInfo.website}
                          </a>
                        </p>
                        <p style="margin: 10px 0;">
                          <a href="mailto:${contactInfo.email}" style="color: ${primaryColor}; text-decoration: none;">
                            ${contactInfo.email}
                          </a>
                        </p>
                        <p style="margin: 10px 0;">
                          <a href="tel:${contactInfo.phone}" style="color: ${primaryColor}; text-decoration: none;">
                            ${contactInfo.phone}
                          </a>
                        </p>
                        <p style="margin: 10px 0; color: #666;">
                          ${contactInfo.address}
                        </p>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;
  };