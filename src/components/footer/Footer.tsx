import React from "react";
import Image from "next/image";
import Icon from "@mui/icons-material/FavoriteBorder"
import "../../../public/css/style.css"
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
import Temperature from "./temperature";
import nextConfig from "../../../next.config";
import ScrollToTop from "./ScrollToTop";

const Footer: React.FC = () => {
    return (
<div>
      <footer className="footer">
        <div className="main-div">
          <div className="contact-main">
            <div className="contacts">
              <div className="logo">
              <Image src={`${nextConfig.env?.IMAGE}/iiitt-logo.png`} alt="IIITT Logo" priority width={40} height={80}/>
              </div>
              <h2>Indian Institute Of Information Technology</h2>
              <h3>Trichy Dindigul Highway,Pirattiyur,Tiruchirappalli-620009</h3>
              <a href="mailto:office@iiitt.ac.in">
                <MailIcon className="mailicon" />
                office@iiitt.ac.in
              </a>
              <a href="tel:8859167328">
                <CallIcon className="phoneicon" />
                +91 431 2500 539
              </a>
            </div>
            <div className="icon">
              <a href="https://twitter.com/iiittrichy?lang=en">
                <div className="icon-bg">
                  <TwitterIcon className="twitter" />
                </div>
              </a>
              <a href="https://www.facebook.com/IIITTrichy/">
                <div className="icon-bg">
                  <FacebookIcon className="facebook" />
                </div>
              </a>
              <a href="https://www.linkedin.com/school/iiitt/">
                <div className="icon-bg">
                  <LinkedInIcon className="linkedin" />
                </div>
              </a>
            </div>
          </div>
          <div className="line"></div>
          <hr className="mobile"></hr>
          <div className="acedemics">
            <h2>Academics</h2>
            <div className="main-hr ace"></div>
            <a href="/departments">Department</a>
            <hr />
            <a href="/curriculum">Curriculum</a>
            <hr />
            <a href="/programs">Programs</a>
            <hr />
            <a href="/calendar">Calender</a>
            <hr />
            <a href="/holidays">Holidays</a>
          </div>
          <div className="line"></div>
          <hr className="mobile" />
          <div className="quick-explore">
            <h2>Quick Explore</h2>
            <div className="main-hr  quick-ex"></div>
            <a href="/anti_ragging_committee">Anti Ragging Committee</a>
            <hr />
            <a href="/admission_procedure">Admission Procedure</a>
            <hr />
            <a href="/admission_fee_structure">Fee Structure</a>
            <hr />
            <a href="/faq">FAQ`&apos;`s</a>
          </div>
          <div className="last line"></div>
          <hr className="mobile" />
         <Temperature/>
        </div>
        <div>
          <a className="credits" href="webDevClub">
            &lt;/&gt; with <Icon id="favorite">favorite_border</Icon> by Web
            Dev-IIITT
          </a>
        </div>
        <ScrollToTop/>
      </footer>
    </div>
    );
  };
  
  
  export default Footer;
  