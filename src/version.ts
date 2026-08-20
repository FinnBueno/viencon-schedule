/**
 * The git tag this build was released under. CI injects it from the pushed
 * tag; local builds have no tag, so they fall back to 'dev'.
 */
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || 'dev';
