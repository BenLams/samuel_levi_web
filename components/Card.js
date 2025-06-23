import Image from 'next/image';
import PropTypes from 'prop-types';

export default function Card({ title, description, imageSrc, href }) {
    return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          width={400}
          height={192}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="mt-2 text-gray-600">{description}</p>
          <a
            href={href}
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Read More
          </a>
        </div>
      </div>
    );
  }
  
  Card.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  };