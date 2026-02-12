## Notes app

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

It is based on the [React Crash Course](https://www.youtube.com/watch?v=bCpFbERgj7s) tutorial with some personal touches and added testing.

### Database

It runs on an [appwrite](https://cloud.appwrite.io/) database, and the `env-example` file gives the environment variables that you will need for your own database.

### Testing

The maestro e2e tests are set up to use a test user. Either use the same credentials or update the tests with the name and password of your own test user. You will need to manually verify the test user in the appwrite dashboard.

### Self-verification (optional)

New users can verify their own email via a link instead of manual verification in the Appwrite dashboard:

1. In Appwrite Console: configure your **Verification** email template (Auth → Templates).
2. Deploy the app's web build so the `/verify` route is publicly accessible (e.g. `expo export:web` then deploy to Vercel/Netlify).
3. Set `EXPO_PUBLIC_VERIFY_URL` in `.env` to your verify URL (e.g. `https://yourapp.vercel.app/verify`).
4. Add your verify URL's hostname to Appwrite Auth → Settings → Platform list.

If `EXPO_PUBLIC_VERIFY_URL` is not set, verification emails are not sent and you will need to verify users manually in the appwrite dashboard.
