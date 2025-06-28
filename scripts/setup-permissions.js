const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

async function setupPermissions() {
  try {
    console.log('🔧 Setting up API permissions...');
    
    // First, we need to get the public role ID
    const rolesResponse = await axios.get(`${STRAPI_URL}/api/users-permissions/roles`);
    const publicRole = rolesResponse.data.roles.find(role => role.type === 'public');
    
    if (!publicRole) {
      throw new Error('Public role not found');
    }
    
    console.log('✅ Found public role:', publicRole.id);
    
    // Update permissions for the Lead content type
    const permissionsData = {
      permissions: {
        'api::lead.lead': {
          controllers: {
            lead: {
              create: {
                enabled: true,
                policy: ''
              },
              find: {
                enabled: false,
                policy: ''
              },
              findOne: {
                enabled: false,
                policy: ''
              },
              update: {
                enabled: false,
                policy: ''
              },
              delete: {
                enabled: false,
                policy: ''
              }
            }
          }
        }
      }
    };
    
    // Update the public role permissions
    await axios.put(`${STRAPI_URL}/api/users-permissions/roles/${publicRole.id}`, {
      ...publicRole,
      permissions: permissionsData.permissions
    });
    
    console.log('✅ Permissions updated successfully!');
    console.log('   - Public users can CREATE leads');
    console.log('   - Public users CANNOT read/update/delete leads');
    
  } catch (error) {
    console.error('❌ Error setting up permissions:', error.message);
    console.log('\n💡 Manual setup required:');
    console.log('1. Go to Settings → Users & Permissions → Roles');
    console.log('2. Click on "Public"');
    console.log('3. Under "Lead", enable only "create"');
    console.log('4. Save the changes');
  }
}

// Check if Strapi is running
async function checkStrapiStatus() {
  try {
    await axios.get(`${STRAPI_URL}/api/users-permissions/roles`);
    return true;
  } catch (error) {
    return false;
  }
}

async function main() {
  console.log('🚀 Strapi Permissions Setup Script');
  console.log('=====================================\n');
  
  const isRunning = await checkStrapiStatus();
  
  if (!isRunning) {
    console.log('❌ Strapi is not running or admin account not created yet.');
    console.log('\nPlease:');
    console.log('1. Start Strapi: npm run develop');
    console.log('2. Create admin account at http://localhost:1337/admin');
    console.log('3. Run this script again: node scripts/setup-permissions.js');
    return;
  }
  
  await setupPermissions();
}

main();
