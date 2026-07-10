import { Client, Databases } from 'node-appwrite';

const PROJECT_ID = '6a4f8178002dec192690';
const API_KEY = 'standard_f639dd7f5382bebab83a85b1d679cae4c5aae30959dbee07fb663103792923d217625dc43c2de191c92169a90e80f2725cecf95f9816342afd30f258c0fbf0119161f2166196e94bd101afb9086324ff3a428eacbab23bad6464a1e4c66897cb905e02f3832733dd821bfa752e6c564c5b9c8e0c6741cd88aa89aa7b3dbab94e';
const ENDPOINT = 'https://sgp.cloud.appwrite.io/v1';

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);

const DB_ID = 'portfolioDB';
const COLLECTION_ID = 'pageContent';

const seedData = [
  {
    section: 'socials',
    data: JSON.stringify({
      twitter: 'https://twitter.com/pixelpeak',
      linkedin: 'https://linkedin.com/company/pixelpeak',
      instagram: 'https://instagram.com/pixelpeak',
      github: 'https://github.com/pixelpeak'
    })
  },
  {
    section: 'whatsapp',
    data: JSON.stringify({
      phone: '1234567890',
      message: 'Hi Pixelpeak! I\'d like to scale my brand.'
    })
  }
];

async function seedNew() {
  console.log("Seeding new documents...");
  for (const item of seedData) {
    try {
      await databases.createDocument(DB_ID, COLLECTION_ID, item.section, {
        section: item.section,
        data: item.data
      });
      console.log(`Seeded document: ${item.section}`);
    } catch (err) {
      if (err.code === 409) {
        console.log(`Document ${item.section} already exists. Skipping...`);
      } else {
        console.error(`Failed to seed ${item.section}:`, err.message);
      }
    }
  }
}

seedNew();
