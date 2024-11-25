const fs = require('fs');
const path = require('path');

// Generate a document based on a template and input data
const generateDocument = (templateId, inputData) => {
  return new Promise((resolve, reject) => {
    const templatePath = path.join(__dirname, `../templates/demoTemplate.txt`);

    // Read the template file
    fs.readFile(templatePath, 'utf8', (err, template) => {
      if (err) {
        return reject(`Template not found: ${err.message}`);
      }

      // Replace placeholders with user input data
      let documentContent = template;
      for (const key in inputData) {
        const placeholder = new RegExp(`{{${key}}}`, 'g');
        documentContent = documentContent.replace(placeholder, inputData[key]);
      }

      resolve(documentContent);
    });
  });
};

module.exports = { generateDocument };
