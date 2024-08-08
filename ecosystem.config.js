module.exports = {
  apps: [
    {
      name: "writing-recommendation",
      script: "pnpm",
      args: "start",
      cwd: "/home/ubuntu/deploy/apps/web",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
