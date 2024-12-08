import Footer from "./components/Footer";
import Header from "./components/Header";
import "../styles/globals.css";
import { AppProvider } from "@/context";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <AppProvider>
          <Toaster position="top-right" />
          <Header />
          <main className="flex-grow ">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
