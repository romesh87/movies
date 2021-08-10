const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'admin',
        mongodb_password: 'admin',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'blog-dev',
      },
    };
  }

  return {
    env: {
      mongodb_username: 'admin',
      mongodb_password: 'admin',
      mongodb_clustername: 'cluster0',
      mongodb_database: 'blog',
    },
    eslint: {
      // Warning: Dangerously allow production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
  };
};
