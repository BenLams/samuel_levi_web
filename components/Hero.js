import Image from 'next/image';

export default function Hero() {
    return (
      <div className="relative w-full h-[500px]">
        <Image
          className="w-full h-full object-cover"
          src="/images/placeholder.jpg"
          alt="Bugema Adventist Primary School"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-blue-600 opacity-50" />
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Welcome to Bugema Adventist Primary School
          </h1>
          <p className="mt-4 text-lg">
            Providing holistic Christian education for a brighter future.
          </p>
          <a
            href="/about"
            className="mt-6 inline-block bg-yellow-400 text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-yellow-500"
          >
            Learn More
          </a>
        </div>
      </div>
    );
  }