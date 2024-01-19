/**
 * An Array of routes that are accessible to public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/api/post"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /dashboard
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

// Define the regex pattern for dynamic routes
const dynamicRoutePattern = /^\/post\/[\w\d-]+$/;

// Define the regex pattern for API post URLs
const apiPostUrlPattern = /^\/api\/post\/[\w\d-]+$/;

// Test the dynamic route against the pattern
export const DynamicPublicRoute = (url: string) => {
  if (dynamicRoutePattern.test(url)) {
    return true;
  } else if (apiPostUrlPattern.test(url)) {
    return true;
  } else {
    return false;
  }
};
