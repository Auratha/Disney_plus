import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <div className="w-full bg-[#1b1b1f] text-white p-10 flex flex-col justify-center items-center">
      <img src={logo} alt="disney+" />
      <p className="w-1/2 sm:w-[90%]">
        Disney+ is a paid subscription service, and its content is subject to
        availability. The Disney+ service is marketed by Disney DTC LATAM, Inc.,
        2400 W Alameda Ave., Burbank, CA 91521.
      </p>
      <p className="mt-6">© Disney. All rights reserved.</p>
    </div>
  );
};

export default Footer;
