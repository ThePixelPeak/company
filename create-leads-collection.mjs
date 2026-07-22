import { Client, Databases, Permission, Role } from 'node-appwrite';

const PROJECT_ID = '6a4f8178002dec192690';
const API_KEY = 'standard_f639dd7f5382bebab83a85b1d679cae4c5aae30959dbee07fb663103792923d217625dc43c2de191c92169a90e80f2725cecf95f9816342afd30f258c0fbf0119161f2166196e94bd101afb9086324ff3a428eacbab23bad6464a1e4c66897cb905e02f3832733dd821bfa752e6c564c5b9c8e0c6741cd88aa89aa7b3dbab94e';
const ENDPOINT = 'https://sgp.cloud.appwrite.io/v1';

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);
const DB_ID = 'portfolioDB';
const LEADS_COLLECTION_ID = 'leads';

async function setupLeads() {
  try {
    console.log("Checking if leads collection exists...");
    try {
      await databases.getCollection(DB_ID, LEADS_COLLECTION_ID);
      console.log("Leads collection already exists.");
    } catch (e) {
      if (e.code === 404) {
        console.log("Creating leads collection...");
        // Anyone can create a lead, but only logged-in users (admins) can read them
        await databases.createCollection(DB_ID, LEADS_COLLECTION_ID, 'Leads', [
            Permission.create(Role.any()),
            Permission.read(Role.users()),
            Permission.update(Role.users()),
            Permission.delete(Role.users())
        ]);
        
        console.log("Creating attributes...");
        await databases.createStringAttribute(DB_ID, LEADS_COLLECTION_ID, 'name', 255, true);
        await databases.createStringAttribute(DB_ID, LEADS_COLLECTION_ID, 'email', 255, true);
        await databases.createStringAttribute(DB_ID, LEADS_COLLECTION_ID, 'phone', 255, false);
        await databases.createStringAttribute(DB_ID, LEADS_COLLECTION_ID, 'message', 5000, true);
        
        console.log("Waiting for attributes to be ready...");
        await new Promise(r => setTimeout(r, 5000));
        console.log("Leads collection setup complete!");
      } else {
        throw e;
      }
    }
  } catch (err) {
    console.error("Failed:", err);
  }
}

setupLeads();
