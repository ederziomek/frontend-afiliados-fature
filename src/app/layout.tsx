import type { Metadata } from "next";
import { Inter, Exo_2 } from "next/font/google"; // Import Exo_2
import "./globals.css";
import Layout from "@/components/layout"; // Import the custom Layout component
import { Toaster } from "@/components/ui/toaster"; // Import Toaster component

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
// Configure Exo 2 with weights and styles needed, make it a variable
const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ['400', '700', '900'], // Include weights needed, e.g., 900 for bold
  style: ['normal', 'italic'], // Include italic
  variable: '--font-exo2' // CSS variable name
});

export const metadata: Metadata = {
  title: "Fature100x - UPBET Afiliados",
  description: "Painel de Afiliados Fature100x da UPBET",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      {/* Apply both font variables to the body or html tag */}
      <body className={`${inter.variable} ${exo2.variable} font-sans`}> {/* Use font-sans as default */}
        <Layout>{children}</Layout> {/* Wrap children with the Layout component */}
        <Toaster /> {/* Add Toaster component for toast notifications */}
      </body>
    </html>
  );
}

