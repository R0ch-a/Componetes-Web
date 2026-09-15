/** @type {import('next').NextConfig} */
const nextConfig = {
  // Permite rodar `npm run build` sem derrubar o dev server:
  // NEXT_DIST_DIR=.next-build npx next build
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
