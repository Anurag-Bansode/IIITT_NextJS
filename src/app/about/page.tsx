"use client";

import { useEffect } from "react";
import {
  Typography,
  Card,
  Divider,
  CardContent,
  Box,
  Link,
  Grid,
} from "@mui/material";
import Image from "next/image";
import nextConfig from "../../../next.config";
import ArticleIcon from "@mui/icons-material/Article";
import "./about.module.css";

const About = () => {
  useEffect(() => {
    document.title = "About Us | IIIT Tiruchirappalli";
    return () => {
      document.title = "IIIT Trichy";
    };
  }, []);

  const bull = <span>•</span>;

  return (
    <div>
      <div className="parent">
        <Typography
          variant="h2"
          sx={{
            color: "#2e8b57",
            pb: "1.5rem",
            mt: "40px",
            textAlign: "center",
          }}
        >
          About us | IIIT Tiruchirappalli
        </Typography>
        <Card
          sx={{
            border: "none",
            borderRadius: 0,
            boxShadow: "none",
            overflow: "visible",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ color: "#555", textAlign: "left", lineHeight: 2 }}
          >
            <Box fontWeight="bold">
              Indian Institute of Information Technology Tiruchirappalli
              (IIITT), also known as IIIT Trichy,is an Institute of National
              Importance and one among the 21 IIITs proposed under the
              non-profit Public-Private Partnership (PPP) Model by MHRD. IIIT
              Tiruchirappalli is an academic and research institute fully funded
              by Government of India Government of Tamil Nadu, and{" "}
              <Box fontWeight="bold">Industry Partners</Box> in the ratio of
              50:35:15
            </Box>
            .
            <br />
            <Box>Industry Partners include:</Box>
            <Link href="https://www.tcs.com/" target="_blank">
              Tata Consultancy Services (TCS)
            </Link>
            ,
            <Link href="https://www.cognizant.com/" target="_blank">
              {" "}
              Cognizant Technology Solutions (CTS)
            </Link>
            ,
            <Link href="https://www.infosys.com/" target="_blank">
              {" "}
              Infosys
            </Link>
            ,
            <Link href="https://www.ramco.com/" target="_blank">
              {" "}
              Ramco Systems
            </Link>
            ,
            <Link href="https://elcot.in" target="_blank">
              {" "}
              ELCOT
            </Link>
            ,
            <Link href="https://www.navitaslifesciences.com/" target="_blank">
              {" "}
              Navitas (TAKE Solutions)
            </Link>
          </Typography>
          <br />
          <Divider />
          <br />
          <div className="missionVisionContainer">
            <Card sx={{ height: "100%", boxShadow: "none" }}>
              <CardContent>
                <Typography variant="h5" sx={{ color: "#2e8b57" }}>
                  Vision
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography color="textSecondary">
                  To achieve "World Class Excellence in Information and
                  Communication Technology".
                </Typography>
                <br />
                <Typography variant="h5" sx={{ color: "#2e8b57" }}>
                  Mission
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography color="textSecondary">
                  {bull} To impart Information Technology education to students
                  and future leaders.
                  <br />
                  {bull} To establish Center of Excellences in Information
                  Technology.
                  <br />
                  {bull} To engage in cutting-edge technology research to meet
                  the current needs and future challenges of India and the world
                  at large.
                </Typography>
              </CardContent>
            </Card>
          </div>
          <br />
          <div className="logoContainer">
            <Image
              src={`${nextConfig.env?.IMAGE}/iiitt-logo.png`}
              alt="IIIT Trichy Logo"
              layout="intrinsic"
              width={200}
              height={200}
            />
          </div>
          <Typography
            variant="subtitle1"
            sx={{ color: "#555", textAlign: "left", lineHeight: 2 }}
          >
            The focus is to address the challenges faced by the Indian IT
            industry and the growth of the domestic IT market. The Ministry of
            Human Resource Development (MHRD), Government of India, has
            established IIIT Tiruchirappalli on a Not-for-profit Public Private
            Partnership (N-PPP) basis like 21 other IIITs.
            <br />
            A major objective in establishing IIIT Tiruchirappalli is to set up
            a model of education that produces best-in-class human resources in
            IT and harnesses the multidimensional facets of IT in various
            domains. While the number of students produced would be small, the
            impact they create would be great.
            <br />
            <br />
            As of June 14, 2021, IIIT Tiruchirappalli has started operating from
            its permanent campus at Sethurappatti. Before that, it operated from
            a temporary campus within the premises of Oxford Engineering
            College, Tiruchirappalli, and earlier within the premises of NIT
            Tiruchirappalli since March 2016.
          </Typography>
        </Card>
        <Typography align="center">
          <a href={""} download>
            <ArticleIcon></ArticleIcon>
            GST Certificate
          </a>
        </Typography>
        <br />
      </div>
    </div>
  );
};

export default About;
