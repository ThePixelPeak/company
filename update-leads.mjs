import { Client, Databases, Permission, Role } from 'node-appwrite';

const PROJECT_ID = '6a4f8178002dec192690';
const API_KEY = 'standard_f639dd7f5382bebab83a85b1d679cae4c5aae30959dbee07fb663103792923d217625dc43c2de191c92169a90e80f2725cecf95f9816342afd30f258c0fbf0119161f2166196e94bd101afb9086324ff3a428eacbab23bad6464a1e4c66897cb905e02f3832733dd821bfa752e6c564c5b9c8e0c6741cd88aa89aa7b3dbab94e';
const ENDPOINT = 'https://sgp.cloud.appwrite.io/v1';

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);

async function run() {
    try {
        console.log("Dropping leads collection...");
        try {
            await databases.deleteCollection('portfolioDB', 'leads');
            console.log("Deleted old leads collection.");
        } catch (e) {
            console.log("Could not delete (might not exist).");
        }
        
        console.log("Recreating leads collection...");
        await databases.createCollection('portfolioDB', 'leads', 'Leads', [
            Permission.create(Role.any()),
            Permission.read(Role.users()),
            Permission.update(Role.users()),
            Permission.delete(Role.users())
        ]);
        
        console.log("Creating attributes...");
        await databases.createStringAttribute('portfolioDB', 'leads', 'name', 255, true);
        await databases.createStringAttribute('portfolioDB', 'leads', 'email', 255, true);
        await databases.createStringAttribute('portfolioDB', 'leads', 'phone', 255, true); // PHONE IS NOW REQUIRED
        await databases.createStringAttribute('portfolioDB', 'leads', 'message', 5000, false); // MESSAGE IS NOW OPTIONAL
        
        console.log("Done.");
    } catch (e) {
        console.error(e);
    }
}
run();
