import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white py-16 px-4">
      <section className="w-full max-w-3xl text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900">
          We are a security company
        </h1>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {/* Camera Product Placeholder */}
          <div className="w-64 h-40 bg-black flex items-center justify-center rounded-lg shadow-md">
            <span className="text-gray-400 text-lg">Camera Product</span>
          </div>
          {/* Alarm Chip Placeholder */}
          <div className="w-64 h-40 bg-black flex items-center justify-center rounded-lg shadow-md">
            <span className="text-gray-400 text-lg">Alarm Chip</span>
          </div>
        </div>
      </section>
    </main>
  );
}
