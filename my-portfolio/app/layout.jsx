import "./globals.css";

export const metadata = {
  title: "Vivian Okechukwu",
  description: "Portfolio of Vivian Okechukwu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}