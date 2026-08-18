type InAppBrowser = 'Instagram' | 'Facebook';

export const detectInAppBrowser = (): InAppBrowser | undefined => {
  const userAgent = navigator.userAgent;
  if (/Instagram/i.test(userAgent)) return 'Instagram';
  if (/FBAN|FBAV|FB_IAB|FB4A|FBIOS/i.test(userAgent)) return 'Facebook';
  return undefined;
};

export const isAndroid = () => /Android/i.test(navigator.userAgent);

// automatically go to your preferred browser
export const getChromeIntentLink = () => {
  const { host, pathname, search, href } = window.location;
  const fallbackUrl = encodeURIComponent(href);
  return `intent://${host}${pathname}${search}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${fallbackUrl};end`;
};
