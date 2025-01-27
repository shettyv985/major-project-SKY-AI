/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://skyaidb_owner:O6lQZ0bnzjdW@ep-weathered-wildflower-a1kenhk2.ap-southeast-1.aws.neon.tech/skyaidb?sslmode=require',
    }
  };
  
