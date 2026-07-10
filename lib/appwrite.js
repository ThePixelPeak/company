import { Client, Databases, Account } from 'appwrite';

const client = new Client()
    .setEndpoint('https://sgp.cloud.appwrite.io/v1')
    .setProject('6a4f8178002dec192690');

export const databases = new Databases(client);
export const account = new Account(client);

export const DB_ID = 'portfolioDB';
export const COLLECTION_ID = 'pageContent';
