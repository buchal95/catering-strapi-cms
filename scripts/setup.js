const fs = require('fs');
const path = require('path');

// Create the Lead content type schema
const leadSchema = {
  kind: 'collectionType',
  collectionName: 'leads',
  info: {
    singularName: 'lead',
    pluralName: 'leads',
    displayName: 'Lead',
    description: 'Catering lead submissions from the website'
  },
  options: {
    draftAndPublish: false,
  },
  pluginOptions: {},
  attributes: {
    name: {
      type: 'string',
      required: true,
      maxLength: 100
    },
    email: {
      type: 'email',
      required: true
    },
    phone: {
      type: 'string',
      maxLength: 20
    },
    company: {
      type: 'string',
      maxLength: 100
    },
    eventType: {
      type: 'enumeration',
      enum: ['firemni', 'svatba', 'narozeniny', 'konference', 'ostatni']
    },
    eventDate: {
      type: 'date'
    },
    guestCount: {
      type: 'integer',
      min: 1,
      max: 10000
    },
    budget: {
      type: 'enumeration',
      enum: ['do-10000', '10000-25000', '25000-50000', '50000-100000', 'nad-100000']
    },
    message: {
      type: 'richtext',
      required: true
    },
    utmSource: {
      type: 'string',
      maxLength: 100
    },
    utmMedium: {
      type: 'string',
      maxLength: 100
    },
    utmCampaign: {
      type: 'string',
      maxLength: 100
    }
  }
};

// Create the content type file
const contentTypesDir = path.join(__dirname, '../src/api/lead/content-types/lead');
const schemaPath = path.join(contentTypesDir, 'schema.json');

// Ensure directory exists
if (!fs.existsSync(contentTypesDir)) {
  fs.mkdirSync(contentTypesDir, { recursive: true });
}

// Write the schema file
fs.writeFileSync(schemaPath, JSON.stringify(leadSchema, null, 2));

console.log('✅ Lead content type schema created at:', schemaPath);

// Create controller
const controllerDir = path.join(__dirname, '../src/api/lead/controllers');
const controllerPath = path.join(controllerDir, 'lead.js');

if (!fs.existsSync(controllerDir)) {
  fs.mkdirSync(controllerDir, { recursive: true });
}

const controllerContent = `'use strict';

/**
 * lead controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::lead.lead', ({ strapi }) => ({
  async create(ctx) {
    // Add timestamp and IP tracking
    const { data } = ctx.request.body;
    
    data.submittedAt = new Date();
    data.ipAddress = ctx.request.ip;
    
    // Call the default create method
    const response = await super.create(ctx);
    
    // Log the lead creation
    strapi.log.info('New lead created:', {
      id: response.data.id,
      email: data.email,
      eventType: data.eventType
    });
    
    return response;
  }
}));
`;

fs.writeFileSync(controllerPath, controllerContent);
console.log('✅ Lead controller created at:', controllerPath);

// Create routes
const routesDir = path.join(__dirname, '../src/api/lead/routes');
const routesPath = path.join(routesDir, 'lead.js');

if (!fs.existsSync(routesDir)) {
  fs.mkdirSync(routesDir, { recursive: true });
}

const routesContent = `'use strict';

/**
 * lead router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::lead.lead');
`;

fs.writeFileSync(routesPath, routesContent);
console.log('✅ Lead routes created at:', routesPath);

// Create services
const servicesDir = path.join(__dirname, '../src/api/lead/services');
const servicesPath = path.join(servicesDir, 'lead.js');

if (!fs.existsSync(servicesDir)) {
  fs.mkdirSync(servicesDir, { recursive: true });
}

const servicesContent = `'use strict';

/**
 * lead service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::lead.lead');
`;

fs.writeFileSync(servicesPath, servicesContent);
console.log('✅ Lead services created at:', servicesPath);

console.log('\n🎉 Strapi Lead content type setup complete!');
console.log('\nNext steps:');
console.log('1. Restart Strapi: npm run develop');
console.log('2. Go to http://localhost:1337/admin');
console.log('3. Create your admin account');
console.log('4. Configure API permissions for public access');
