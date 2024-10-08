import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { VStack } from "panda";
import { Box } from "panda";
import { Footer } from "@/libs/components/core/Footer"
import { Providers } from "@/libs/utility/providers/Providers";
import { Header } from "@/libs/components/core/Header";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BrandSync",
  description: "Integrate Ai with your personal brand or buisness",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
})  {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <Box
        width={'screen'}
        overflowX={'hidden'}
        minHeight={'screen'}>
          {children}
        </Box>
      </body>
    </html>
  );
}
