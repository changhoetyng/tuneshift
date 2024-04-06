import type { Metadata } from "next";
import NavigationHeader from "@/app/_ui/headers/NavigationHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "TuneShift",
  description: "Transfer all your music between streaming services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>
          <NavigationHeader />
        </div>
        {children}
      </body>
    </html>
  );
}
