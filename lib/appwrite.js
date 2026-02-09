import { Client } from 'react-native-appwrite';

const client = new Client()
  .setProject('6989e8c6001b722c5c0f')
  .setEndpoint('https://fra.cloud.appwrite.io/v1');

export default client;
