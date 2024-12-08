import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 py-6 px-4 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Image
            src="/logo.png"
            alt="Massive Bioinformatics Logo"
            width={120}
            height={120}
            className="object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="text-sm sm:text-base text-gray-300 font-medium bg-gray-800 bg-opacity-50 px-4 py-2 rounded-full transition-all duration-300 hover:bg-opacity-70 hover:text-white">
          Frontend Internship Assessment - Doğukan Öztürk
        </div>
      </div>
    </header>
  );
}
