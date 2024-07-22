/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  typescript: {
    ignoreBuildErrors: true
  }

  
  },
  typescript: {
  ignoreBuildErrors: true
},
  webpack: (config, { isServer }) => {
    // Modify config for client-side only
    if (!isServer) {
      // Add your custom webpack rules here
      config.module.rules.push({
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      });

    }

    return config;
  },
};

export default nextConfig;