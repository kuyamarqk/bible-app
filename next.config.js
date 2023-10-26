/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
require('dotenv').config();
const webpack = require('webpack');

module.exports = {
  webpack: (config) => {
    config.plugins.push(new webpack.EnvironmentPlugin(['ESV_API_KEY']));
    return config;
  },
};