// // import type { NextConfig } from "next";

// // const nextConfig: NextConfig = {
// //   images: {
// //     remotePatterns: [
// //       {
// //         protocol: "https",
// //         hostname: "flagcdn.com",
// //         pathname: "/**",
// //       },
// //     ],
// //   },
// // };

// // export default nextConfig;

// // next.config.ts
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: ["flagcdn.com"],
//   },
//   async rewrites() {
//     return [
//       {
//         source: "/api/reference/:path*",
//         // destination: 'https://api.test.armat.school/api/v1/reference/:path*',
//         destination: "http://localhost:8090/api/v1/reference/:path*",
//       },
//       {
//         source: "/api/sanctum/csrf-cookie",
//         // destination: 'https://api.test.armat.school/sanctum/csrf-cookie',
//         destination: "http://localhost:8090/sanctum/csrf-cookie",
//       },
//       {
//         source: "/api/auth/register",
//         // destination: 'https://api.test.armat.school/api/v1/auth/register',
//         destination: "http://localhost:8090/api/v1/auth/register",
//       },
//       {
//         source: "/api/auth/login",
//         // destination: 'https://api.test.armat.school/api/v1/auth/login',
//         destination: "http://localhost:8090/api/v1/auth/login",
//       },
//       {
//         source: "/api/auth/forgot-password",
//         // destination: "https://api.test.armat.school/api/v1/auth/forgot-password",
//         destination: "http://localhost:8090/api/v1/auth/forgot-password",
//       },
//       {
//         source: "/api/auth/reset-password",
//         // destination: "https://api.test.armat.school/api/v1/auth/reset-password",
//         destination: "http://localhost:8090/api/v1/auth/reset-password",
//       },
//       {
//         source: "/api/auth/verify-email/:path*",
//         // destination: "https://api.test.armat.school/api/v1/auth/verify-email/:path*",
//         destination: "http://localhost:8090/api/v1/auth/verify-email/:path*",
//       },
//       {
//         source: "/api/auth/email/verification-notification",
//         destination:
//           // "https://api.test.armat.school/api/v1/auth/email/verification-notification",
//           "http://localhost:8090/api/v1/auth/email/verification-notification",
//       },
//     ];
//   },
// };

// export default nextConfig;



// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["flagcdn.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/me",
        destination: "http://localhost:8090/api/v1/me",
      },
      {
        source: "/api/reference/:path*",
        destination: "http://localhost:8090/api/v1/reference/:path*",
      },
      {
        source: "/api/sanctum/csrf-cookie",
        destination: "http://localhost:8090/sanctum/csrf-cookie",
      },
      {
        source: "/api/auth/register",
        destination: "http://localhost:8090/api/v1/auth/register",
      },
      {
        source: "/api/auth/login",
        destination: "http://localhost:8090/api/v1/auth/login",
      },
      {
        source: "/api/auth/logout", // <-- Այս կանոնը պարտադիր է
        destination: "http://localhost:8090/api/v1/auth/logout",
      },
      {
        source: "/api/auth/forgot-password",
        destination: "http://localhost:8090/api/v1/auth/forgot-password",
      },
      {
        source: "/api/auth/reset-password",
        destination: "http://localhost:8090/api/v1/auth/reset-password",
      },
      {
        source: "/api/auth/verify-email/:path*",
        destination: "http://localhost:8090/api/v1/auth/verify-email/:path*",
      },
      {
        source: "/api/auth/email/verification-notification",
        destination: "http://localhost:8090/api/v1/auth/email/verification-notification",
      },
    ];
  },
};

export default nextConfig;