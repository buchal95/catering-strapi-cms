const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

async function testLeadCreation() {
  console.log('🧪 Testing Lead API endpoint...\n');
  
  const testLead = {
    data: {
      name: 'Jan Testovací',
      email: 'jan.test@example.com',
      phone: '+420 123 456 789',
      company: 'Test s.r.o.',
      eventType: 'firemni',
      eventDate: '2024-07-15',
      guestCount: 50,
      budget: 'od_25000_do_50000',
      message: 'Toto je testovací zpráva pro ověření funkčnosti API.',
      utmSource: 'test',
      utmMedium: 'script',
      utmCampaign: 'api_test'
    }
  };

  try {
    console.log('📤 Sending test lead...');
    const response = await axios.post(`${STRAPI_URL}/api/leads`, testLead);
    
    console.log('✅ Success! Lead created with ID:', response.data.data.id);
    console.log('📊 Response data:', JSON.stringify(response.data, null, 2));
    
    console.log('\n🎉 API is working correctly!');
    console.log('You can now:');
    console.log('1. Check the lead in Strapi admin: http://localhost:1337/admin/content-manager/collection-types/api::lead.lead');
    console.log('2. Test the frontend form submission');
    
  } catch (error) {
    console.error('❌ Error creating lead:', error.response?.data || error.message);
    
    if (error.response?.status === 403) {
      console.log('\n💡 This is likely a permissions issue.');
      console.log('Please set up API permissions:');
      console.log('1. Go to Settings → Users & Permissions → Roles');
      console.log('2. Click on "Public"');
      console.log('3. Under "Lead", enable "create"');
      console.log('4. Save and try again');
    }
  }
}

testLeadCreation();
