/**
 * Environment Variable Validator
 * Run with: npm run validate-env
 */

const required = [
  "MONGO_URI",
  "ACCESS_TOKEN_SECRET",
  "ACCESS_TOKEN_EXPIRY",
  "REFRESH_TOKEN_SECRET",
  "REFRESH_TOKEN_EXPIRY",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

const optional = [
  "PORT",
  "NODE_ENV",
  "ALLOWED_ORIGINS",
  "EMAIL_SERVICE_URL",
];

const missing = required.filter((key) => !process.env[key]);
const missingOptional = optional.filter((key) => !process.env[key]);

console.log("\\n=== Environment Variable Validation ===\\n");

if (missing.length > 0) {
  console.error("ERROR: Missing required environment variables:");
  missing.forEach((key) => console.error(`  - ${key}`));
  console.log("\\nPlease check your .env file and ensure all required variables are set.");
  console.log("See .env.example for reference.\\n");
  process.exit(1);
}

console.log("All required environment variables are set.");

if (missingOptional.length > 0) {
  console.log("\\nINFO: Optional variables not set (using defaults):");
  missingOptional.forEach((key) => console.log(`  - ${key}`));
}

console.log("\\nEnvironment validation passed!\\n");
process.exit(0);
