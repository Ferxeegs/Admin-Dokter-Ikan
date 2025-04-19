/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["res.cloudinary.com"], // Tambahkan hostname Cloudinary
      },
};

export default nextConfig;
