import "./globals.css";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Highway Delite",
  description: "Experiences Booking App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-black">
        <header className="w-full bg-white border-b">
          <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <Image
                  src="/logo.png"
                  alt="Highway Delite Logo"
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </div>
            </Link>

            <div className="hidden md:flex gap-2">
              <input
                type="text"
                placeholder="Search experiences"
                className="placeholder:text-gray-500  bg-gray-200 rounded-lg px-4 py-2 w-72 text-sm text-black"
              />
              <button className=" bg-yellow-500 hover:bg-yellow-500 px-6 py-2 rounded-lg font-semibold text-black text-sm">
                Search
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4">{children}</main>
      </body>
    </html>
  );
}
