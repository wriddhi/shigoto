import localFont from "next/font/local";

export const mabry = localFont({
  variable: "--font-mabry",
  src: [
    {
      path: "../../public/fonts/mabry/MabryPro-Light.woff2",
      style: "normal",
      weight: "300",
    },
    {
      path: "../../public/fonts/mabry/MabryPro-LightItalic.woff2",
      style: "italic",
      weight: "300",
    },
    {
      path: "../../public/fonts/mabry/MabryPro-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../public/fonts/mabry/MabryPro-Italic.woff2",
      style: "italic",
      weight: "400",
    },
    {
      path: "../../public/fonts/mabry/MabryPro-Medium.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "../../public/fonts/mabry/MabryPro-MediumItalic.woff2",
      style: "italic",
      weight: "500",
    },
    {
      path: "../../public/fonts/mabry/MabryPro-Bold.woff2",
      style: "normal",
      weight: "700",
    },
    {
      path: "../../public/fonts/mabry/MabryPro-BoldItalic.woff2",
      style: "italic",
      weight: "700",
    },
    {
      path: "../../public/fonts/mabry/MabryPro-Black.woff2",
      style: "normal",
      weight: "900",
    },
    {
      path: "../../public/fonts/mabry/MabryPro-BlackItalic.woff2",
      style: "italic",
      weight: "900",
    },
  ],
});