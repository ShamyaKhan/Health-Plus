import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* left section */}
        <div>
          <img src={assets.logo} className="mb-5 w-40" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, non
            consequatur dicta, sunt laudantium suscipit assumenda facere ullam
            veniam distinctio beatae, nobis sequi velit. Impedit nisi dolorum
            dolore non laboriosam.
          </p>
        </div>

        {/* center section */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* right section */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+880.....89</li>
            <li>HealthPlus@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        {/* copyright */}
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2026 @HealthPlus - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
