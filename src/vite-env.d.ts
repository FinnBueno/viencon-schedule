/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** The git tag this build was released under, injected by CI. */
  readonly VITE_APP_VERSION: string;
}
