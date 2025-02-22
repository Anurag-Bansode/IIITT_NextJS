import Image from "next/image";
import nextConfig from "../../next.config";

const Header: React.FC = () => {
  return (
    <div className="head-banner hidden-sm hidden-xs hidden-md">
      <center>
        <div className="w-[50%] max-w-[600px] min-w-[200px]">
          <Image 
            src={`${nextConfig.env?.IMAGE}/logo-iiit-new.png`}
            alt="IIITT Logo"
            width={600} // Set max width
            height={150} // Fixed height
            className="w-full h-auto" // Responsive width
            priority
          />
        </div>
      </center>
    </div>
  );
};

export default Header;
