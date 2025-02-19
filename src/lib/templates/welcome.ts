export const orderTemplate = `
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<meta name="viewport" content="width=device-width"/>
<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.container {
  width: 560px;
  margin: 0 auto;
  text-align: left;
}

@media (max-width: 600px) {
  .container {
    width: 94% !important;
  }
  
  .header {
    margin-top: 20px !important;
  }
  
  .customer-info__item {
    display: block;
    width: 100% !important;
  }
}
</style>
</head>
<body>
  <table class="body" style="width: 100%; border-spacing: 0; border-collapse: collapse;">
    <tr>
      <td>
        <!-- Header -->
        <table class="header" style="width: 100%; margin: 40px 0 20px;">
          <tr>
            <td>
              <center>
                <table class="container">
                  <tr>
                    <td align="center">
                      <img src="https://ik.imagekit.io/deiy5ty8y2/images/image_aTj4PCuUa" alt="Bindi's Cupcakery" width="180"/>
                    </td>
                  </tr>
                </table>
              </center>
            </td>
          </tr>
        </table>

        <!-- Content -->
        <table class="content" style="width: 100%;">
          <tr>
            <td>
              <center>
                <table class="container">
                  <tr>
                    <td>
                      <p style="color: #777; line-height: 150%; font-size: 16px; margin: 0;">
                        New order received!
                      </p>
                      <p style="color: #777; line-height: 150%; font-size: 16px; margin: 15px 0;">
                        Order #{{orderNumber}} has been placed by {{customerName}}.
                      </p>

                      <!-- Order Summary -->
                      <h3 style="font-weight: normal; font-size: 20px; margin: 40px 0 25px;">Order Summary</h3>
                      {{#each items}}
                      <table style="width: 100%; margin-bottom: 15px;">
                        <tr>
                          <td style="width: 60px;">
                            <img src="{{imageUrl}}" width="60" height="60" style="border-radius: 8px;"/>
                          </td>
                          <td style="padding-left: 15px;">
                            <span style="font-size: 16px; font-weight: 600; color: #555;">{{name}} x {{quantity}}</span>
                            <br/>
                            <span style="font-size: 14px; color: #999;">{{variant}}</span>
                          </td>
                          <td style="text-align: right; white-space: nowrap;">
                            <p style="font-size: 16px; font-weight: 600; color: #555; margin: 0;">
                              {{ price }}
                            </p>
                          </td>
                        </tr>
                      </table>
                      {{/each}}

                      <!-- Totals -->
                      <table style="width: 100%; margin-top: 20px; border-top: 1px solid #e5e5e5;">
                        <tr>
                          <td style="padding: 10px 0;">Subtotal</td>
                          <td style="text-align: right;">{{ subtotal }}</td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0;">Tax</td>
                          <td style="text-align: right;">{{ tax }}</td>
                        </tr>
                        <tr style="font-size: 18px; font-weight: bold;">
                          <td style="padding: 10px 0; border-top: 2px solid #e5e5e5;">Total</td>
                          <td style="text-align: right; border-top: 2px solid #e5e5e5;">{{ total }}</td>
                        </tr>
                      </table>

                      <!-- Customer Information -->
                      <h3 style="font-weight: normal; font-size: 20px; margin: 40px 0 25px;">Customer Information</h3>
                      <table style="width: 100%;">
                        <tr>
                          <td class="customer-info__item" style="width: 50%; padding-bottom: 20px;" valign="top">
                            <h4 style="font-weight: 500; font-size: 16px; color: #555; margin: 0 0 5px;">Contact Information</h4>
                            <p style="color: #777; line-height: 150%; font-size: 16px; margin: 0;">
                              {{customerName}}<br/>
                              {{customerEmail}}<br/>
                              {{customerPhone}}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td class="customer-info__item" style="width: 50%; padding-bottom: 20px;" valign="top">
                            <h4 style="font-weight: 500; font-size: 16px; color: #555; margin: 0 0 5px;">Instructions</h4>
                            <p style="color: #777; line-height: 150%; font-size: 16px; margin: 0;">
                              {{instructions}}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td class="customer-info__item" style="width: 50%; padding-bottom: 20px;" valign="top">
                            <h4 style="font-weight: 500; font-size: 16px; color: #555; margin: 0 0 5px;">Payment Type</h4>
                            <p style="color: #777; line-height: 150%; font-size: 16px; margin: 0;">
                              {{paymentType}}
                            </p>
                          </td>
                        </tr>
                      </table>

                      <!-- Footer -->
                      <table style="width: 100%; margin-top: 40px; border-top: 1px solid #e5e5e5;">
                        <tr>
                          <td style="padding: 40px 0;">
                            <p style="color: #777; line-height: 150%; font-size: 16px; margin: 0;">
                              Please prepare the order for {{fulfillmentMethod}}.
                            </p>
                            <p style="color: #777; line-height: 150%; font-size: 16px; margin: 15px 0 0;">
                              Best regards,<br/>
                              Your Automated System
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </center>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const reviewTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #4a86e8;
      padding: 20px;
      color: white;
      text-align: center;
    }
    .content {
      padding: 20px;
      background-color: #f9f9f9;
    }
    .message-box {
      background-color: white;
      padding: 15px;
      border-radius: 5px;
      border-left: 4px solid #4a86e8;
      margin-top: 20px;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #666666;
      padding: 20px;
    }
    .info-item {
      margin-bottom: 10px;
    }
    .info-label {
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
      <p>{{formattedDate}}</p>
    </div>
    
    <div class="content">
      <p>Dear {{companyName}} Team,</p>
      
      <p>You have received a new response from your website's contact form.</p>
      
      <div class="info-item">
        <span class="info-label">Name:</span> {{name}}
      </div>
      
      <div class="info-item">
        <span class="info-label">Email:</span> <a href="mailto:{{email}}">{{email}}</a>
      </div>
      
      {{#if phone}}
      <div class="info-item">
        <span class="info-label">Phone:</span> {{phone}}
      </div>
      {{/if}}
      
      {{#if subject}}
      <div class="info-item">
        <span class="info-label">Subject:</span> {{subject}}
      </div>
      {{/if}}
      
      <div class="message-box">
        <div class="info-label">Message:</div>
        <p>{{message}}</p>
      </div>
      
      <p>Please respond to this inquiry at your earliest convenience.</p>
    </div>
    
    <div class="footer">
      <p>This email was sent automatically from your website contact form.</p>
      <p>&copy; {{currentYear}} {{companyName}}. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`