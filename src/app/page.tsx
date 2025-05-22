  import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Wave Pattern */}
      <div className="absolute top-0 right-0 w-full h-full">
        <svg className="w-full h-full opacity-5" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path d="M1000,0 L1000,1000 L0,1000 L0,0 Q200,150 500,0 T1000,0" fill="#1e3a8a"></path>
        </svg>
      </div>
      {/* Header */}
      <header className="bg-blue-950 shadow-lg">
        <div className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Image
                src="/Img/UA-Logo.png"
                alt="UA Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <Link 
                href="/" 
                className="text-white text-lg font-semibold hover:text-blue-200 transition-colors"
              >
                HOME
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link 
                href="/about" 
                className="text-white hover:text-blue-200 transition-colors"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-white hover:text-blue-200 transition-colors"
              >
                Contact
              </Link>
              <Link 
                href="/login" 
                className="bg-white text-blue-950 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors"
              >
                LOGIN
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-lg">
          <div className="flex justify-center mb-6">
            <Image
              src="/Img/UA-Logo.png"
              alt="UA Logo"
              width={150}
              height={150}
              priority
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="USER ID"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="PASSWORD"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
            >
              LOGIN
            </button>
          </div>

          <div className="mt-8 text-center text-gray-800">
            <p className="text-sm">THE FORMATOR of</p>
            <div className="space-y-1 mt-2">
              <p className="font-semibold">BIASA <span className="text-sm font-normal">(ACADEMICALLY COMPETENT)</span></p>
              <p className="font-semibold">MAGANACA <span className="text-sm font-normal">(MORALLY UPRIGHT)</span></p>
              <p className="font-semibold">MAYAP <span className="text-sm font-normal">(SOCIALLY RESPONSIBLE)</span></p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-950 text-white text-center p-4">
        © 2022 Ledipro Systems, Inc. All rights reserved.
      </footer>
    </div>
  );
}
