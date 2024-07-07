module.exports = {
    apps: [
      {
        name: 'nextjs-app',
        script: 'node_modules/next/dist/bin/next',
        args: 'start',
        cwd: __dirname, // Thư mục gốc của dự án
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  