module.exports = {
  async rewrites() {
    return [
      {
        source: '/services/:path*', // Qualquer requisição para "/services/*"
        destination: 'http://localhost:5252/services/:path*', // Redireciona para o backend
      },
    ];
  },
};
