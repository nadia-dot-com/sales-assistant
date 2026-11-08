// Extend the NodeJS namespace with our-defined properties
declare namespace NodeJS {
  type EnvUrl = `http${string}`;
  type EnvNumber = `${number}`;
  type EnvBoolean = `${boolean}`;

  interface NextPublicEnv {
    /**
     * @example "https://localhost:3000"
     */
    readonly NEXT_PUBLIC_SITE_URL: EnvUrl;
    /**
     * @example "local"
     * @example "dev"
     * @example "staging"
     * @example "prod"
     */
    readonly NEXT_PUBLIC_ENV: string;
    /**
     * Date of the build in ISO format.
     */
    readonly NEXT_PUBLIC_BUILD_DATE: string;
    /**
     * Version of the application from `package.json` file.
     * Provided automatically by the build system. Do not set it manually.
     */
    readonly NEXT_PUBLIC_VERSION: string;
  }

  interface ProcessEnv extends NextPublicEnv {}
}
