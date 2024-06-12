import type { Metadata } from "next";
import NavigationHeader from "@/app/_ui/headers/NavigationHeader";
import "./globals.css";
import NotificationComponent from "@/app/_ui/global/NotificationComponent";
import Head from "next/head";

export const metadata: Metadata = {
  title: "TuneShift",
  description: "Transfer all your music between streaming services.",
  icons: {
    icon: "/favicon-32px.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="icon"
          href="/favicon.ico"
          sizes="16x16 32x32"
          type="image/x-icon"
        />
        <link
          rel="icon"
          href="/favicon-32px.png"
          sizes="32x32"
          type="image/png"
        />
        <link
          rel="icon"
          href="/favicon-16px.png"
          sizes="16x16"
          type="image/png"
        />
      </Head>
      <body className="h-screen flex flex-col">
        <div className="mt-20">
          <NavigationHeader />
        </div>
        <div className="flex min-w-screen min-h-[calc(100vh-5rem)]">
          <NotificationComponent />
          {children}
        </div>
      </body>
    </html>
  );
}
