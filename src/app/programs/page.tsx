"use client";
import React, { useEffect } from "react";
import { Typography, Box, Divider } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import MemoryIcon from "@mui/icons-material/Memory";
import ScienceIcon from "@mui/icons-material/Science";
import PsychologyIcon from "@mui/icons-material/Psychology";
import EngineeringIcon from "@mui/icons-material/Engineering";
import "./programs.module.css";

const AdmissionFeeStructure: React.FC = () => {
  useEffect(() => {
    document.title = "Programs";
    return () => {
      document.title = "IIIT Trichy";
    };
  }, []);

  return (
      <div className="grid-container">
        <Typography variant="h2" className="themeText heading" gutterBottom>
          <Box component="span">Programs</Box>
        </Typography>

        {/* Undergraduate Program */}
        <section className="section">
          <Typography variant="h4" className="subheading" gutterBottom>
            <SchoolIcon className="icon" /> Undergraduate Program
          </Typography>
          <Typography className="text">
            The admission to Undergraduate Programs is done through{" "}
            <strong>JEE Mains</strong>. The JEE-Mains qualified candidates are
            admitted through <strong>CSAB</strong> and{" "}
            <strong>JoSAA</strong> following the reservation policy of the
            Government of India.
          </Typography>
          <Typography className="text">
            IIIT Tiruchirappalli offers the following{" "}
            <strong>Undergraduate Programs:</strong>
          </Typography>
          <ul className="list">
            <li>
              <LaptopMacIcon className="list-icon" />
              Computer Science and Engineering (B.Tech - 4 Years)
            </li>
            <li>
              <MemoryIcon className="list-icon" />
              Electronics and Communication Engineering (B.Tech - 4 Years)
            </li>
          </ul>
        </section>

        <Divider className="divider" />

        {/* Postgraduate Program */}
        <section className="section">
          <Typography variant="h4" className="subheading" gutterBottom>
            <SchoolIcon className="icon" /> Postgraduate Program
          </Typography>
          <Typography className="text">
            IIIT Tiruchirappalli offers the following{" "}
            <strong>Postgraduate Programs:</strong>
          </Typography>
          <ul className="list">
            <li>
              <LaptopMacIcon className="list-icon" />
              Computer Science and Engineering (M.Tech - 2 Years)
            </li>
            <li>
              <MemoryIcon className="list-icon" />
              Computer Science (M.Sc - 2 Years)
            </li>
            <li>
              <MemoryIcon className="list-icon" />
              VLSI Systems (M.Tech - 2 Years)
            </li>
            <li>
              <MemoryIcon className="list-icon" />
              Electronics with VLSI Design (M.Sc - 2 Years)
            </li>
          </ul>
        </section>

        <Divider className="divider" />

        {/* Doctoral Program */}
        <section className="section">
          <Typography variant="h4" className="subheading" gutterBottom>
            <SchoolIcon className="icon" /> Doctoral Program
          </Typography>
          <Typography className="text">
            IIIT Tiruchirappalli offers <strong>Ph.D Programs</strong> in the
            following Departments:
          </Typography>
          <ul className="list">
            <li>
              <EngineeringIcon className="list-icon" />
              <strong>Computer Science and Engineering</strong>
              <p>Data Analytics, Machine Learning, Deep Learning, IoT</p>
              <p>Cloud Computing, Medical Image Processing and allied areas</p>
            </li>
            <li>
              <MemoryIcon className="list-icon" />
              <strong>Electronics and Communication Engineering</strong>
              <p>VLSI Design, Wireless Communication</p>
              <p>Micro & Nano Electronics, Compact Modeling & Simulation and allied areas</p>
            </li>
            <li>
              <EngineeringIcon className="list-icon" />
              <strong>Mechanical Engineering</strong>
              <p>Additive Manufacturing, Powder Metallurgy, Smart Materials</p>
              <p>Energy storage materials</p>
            </li>
            <li>
              <ScienceIcon className="list-icon" />
              <strong>Science and Humanities</strong>
              <ul className="nested-list">
                <li>
                  <PsychologyIcon className="list-icon" />
                  <strong>Physics:</strong> Optoelectronic Materials & Devices, Fiber optics, Plasmonics, Semiconductor heterostructures
                </li>
                <li>
                  <PsychologyIcon className="list-icon" />
                  <strong>Mathematics:</strong> Fluid Dynamics
                </li>
                <li>
                  <PsychologyIcon className="list-icon" />
                  <strong>Economics:</strong> Health Economics, Health Technology Assessment, Global issues in health and development
                </li>
                <li>
                  <PsychologyIcon className="list-icon" />
                  <strong>English:</strong> Applied Linguistics, Indian Writing in English
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </div>
  );
};

export default AdmissionFeeStructure;
