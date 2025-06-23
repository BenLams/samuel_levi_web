'use client';


import Image from 'next/image';


export default function About() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">About Us</h1>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="mb-4 text-gray-700">
              Bugema Adventist Primary School is committed to raising children who are academically
              excellent and spiritually grounded. Our vision is to be a center of excellence in
              Christian education in Uganda.
            </p>
            <p className="mb-4 text-gray-700">
              With qualified teachers, a safe environment, and co-curricular activities, we aim to
              nurture the whole child — mentally, physically, emotionally, and spiritually.
            </p>
          </div>
          <Image
            src="/images/school-building.jpg"
            alt="Our School"
            width={600}
            height={400}
            className="rounded-lg shadow-md object-cover"
          />
        </div>
      </section>
    </div>
  );
}
