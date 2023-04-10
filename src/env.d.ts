// This should work in most cases
declare var process: {
  env: {
    NG_APP_ENV: string;
    NG_APP_IS_PRODUCTION: string;
    NG_APP_API_KEY: string;
    NG_APP_AUTH_DOMAIN: string;
    NG_APP_PROJECT_ID: string;
    NG_APP_MESSAGING_SENDER_ID: string;
    NG_APP_APP_ID: string;
    NG_APP_VAPID_KEY: string;
    NG_APP_FIREBASE_MESSAGING_SW_VERSION: string;
    NG_APP_ENABLE_NGSW: string;
    [key: string]: any;
  };
};

// If your project references @types/node directly (in you) or indirectly (as in RxJS < 7.6.0),
// you might need to use the following declaration merging.
declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NG_APP_ENV: string;
    // Add your environment variables below
  }
}

// If you're using Angular Universal, you'll need to add the following to your tsconfig.server.json:
/* In your tsconfig.server.json */
// {
//   "extends": "./tsconfig.app.json",
//   ...
//   "exclude": [
//     "src/env.d.ts"
//   ]
// }
