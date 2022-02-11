module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/admin",
        headers: [
          {
            key: "Location",
            value: "/admin",
          },
        ],
      },
      {
        source: "/",
        headers: [
          {
            key: "Location",
            value: "/",
          },
        ],
      },
    ];
  },
};
