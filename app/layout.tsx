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
      <body className="h-screen flex flex-col">
        <div className="mt-20">
          <NavigationHeader />
        </div>
        <div className="flex-grow">{children}</div>
      </body>
    </html>
  );
}
