import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { NavigationRoutes } from "@/model/navigationRoutes";
import ConvexClientProvider from "./(components)/ConvexClientComponent";
import Header from "@/components/upperPart/Header";
import { twMerge } from "tailwind-merge";
import { ThemeProvider } from "@/components/theme/themeProvider";
import { useRouter } from "next/navigation";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export const metadata: Metadata = {
  title: "Disaster Management",
  description: "A disaster Management App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //const router = useRouter()
  //const isAccountRoute = router.

  return (
    //<AuthProvider>
    <html lang="en" suppressHydrationWarning>
      <body
        className={twMerge(
          jetbrainsMono.variable,
          "font-jetbrainsMono antialiased"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main>
            <ConvexClientProvider>{children}</ConvexClientProvider>
          </main>
        </ThemeProvider>
      </body>
    </html>
    //</AuthProvider>
  );
}
