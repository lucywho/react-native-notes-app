import { Client, Databases, Account } from 'react-native-appwrite';
import { Platform } from 'react-native';

const config = {
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  db: process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
  col: { notes: process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID },
  iosBundleName: process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID,
  androidPackageName: process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME,
};

const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId);

switch (Platform.OS) {
  case 'ios':
    client.setPlatform(config.iosBundleName);
    break;
  case 'android':
    client.setPlatform(config.androidPackageName);
    break;
  case 'web':
    if (typeof window !== 'undefined' && window.location?.origin) {
      client.setPlatform(window.location.origin);
    }
    break;
  default:
    break;
}

const database = new Databases(client);
const account = new Account(client);

export { database, account, config, client };
