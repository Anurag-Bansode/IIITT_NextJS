"use client";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import styles from "./programs.module.css";

const Programs: React.FC = () => {
  useEffect(() => {
    document.title = "Programs";
    return () => {
      document.title = "IIIT Trichy";
    };
  }, []);

  return (
    <Grid container className={styles.container}>
      <Grid size={1} />
      <Grid size={10}>
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          className={styles.themeText}
        >
          <Box component="span" fontWeight={380}>
            Programs
          </Box>
        </Typography>

        <section className={styles.sectionPadding}>
          <Typography variant="h5" className={styles.themeText} gutterBottom>
            <Box component="span" fontWeight="fontWeightBold">
              Undergraduate Program
            </Box>
          </Typography>
          <Box component="span" fontSize="1.2rem">
            The admission to Undergraduate Programs is done through JEE Mains.
            The JEE-Mains qualified candidates are admitted to UG program
            through Centralized Seat Allocation Board (CSAB) and Joint Seat
            Allocation Authority (JoSAA) following the reservation policy of
            Government of India.
          </Box>
          <Typography className={styles.sectionPadding}>
            <Box component="span" fontSize="1.2rem">
              IIIT Tiruchirappalli offers the following two&nbsp;
              <Box component="span" fontWeight="fontWeightBold">
                Undergraduate Programs
              </Box>
              :
            </Box>
          </Typography>
          <ul className={styles.list}>
            <li>
              <Box
                component="span"
                fontSize="1.2rem"
                fontWeight="fontWeightBold"
              >
                Computer Science and Engineering (4 years, Bachelor of
                Technology)
              </Box>
            </li>
            <li>
              <Box
                component="span"
                fontSize="1.2rem"
                fontWeight="fontWeightBold"
              >
                Electronics and Communication Engineering (4 years, Bachelor of
                Technology)
              </Box>
            </li>
          </ul>
          <br></br>
        </section>
        <Divider />
        <section className={styles.sectionPadding}>
          <Typography variant="h5" className={styles.themeText} gutterBottom>
            <Box component="span" fontWeight="fontWeightBold">
              Postgraduate Program
            </Box>
          </Typography>

          <Typography className={styles.sectionPadding}>
            <Box component="span" fontSize="1.2rem">
              IIIT Tiruchirappalli offers the following two&nbsp;
              <Box component="span" fontWeight="fontWeightBold">
                Postgraduate Programs
              </Box>
              :
            </Box>
          </Typography>
          <ul className={styles.list}>
            <li>
              <Box
                component="span"
                fontSize="1.2rem"
                fontWeight="fontWeightBold"
              >
                Computer Science and Engineering (2 years, Masters of
                Technology)
              </Box>
            </li>
            <li>
              <Box
                component="span"
                fontSize="1.2rem"
                fontWeight="fontWeightBold"
              >
                VLSI Systems (2 years, Masters of Technology)
              </Box>
            </li>
          </ul>
        </section>
        <br></br>
        <Divider />
        <section>
          <Typography variant="h5" className={styles.themeText} gutterBottom>
            <Box component="span" fontWeight="fontWeightBold">
              Doctoral Program
            </Box>
          </Typography>

          <Typography className={styles.sectionPadding}>
            <Box component="span" fontSize="1.2rem">
              IIIT Tiruchirappalli offers the &nbsp;
              <Box component="span" fontWeight="fontWeightBold">
                Ph.D programs
              </Box>
              &nbsp; in the following Departments.
            </Box>
          </Typography>

          <ul className={styles.list}>
            <li>
              <Box
                component="span"
                fontSize="1.2rem"
                fontWeight="fontWeightBold"
              >
                Computer Science and Engineering
              </Box>
              <Typography>
                Data Analytics, Machine Learning, Deep Learning, IoT, Cloud
                Computing, Medical Image Processing
              </Typography>
            </li>
            <li>
              <Box
                component="span"
                fontSize="1.2rem"
                fontWeight="fontWeightBold"
              >
                Electronics and Communication Engineering
              </Box>
              <Typography>
                VLSI Design, Wireless Communication, Micro & Nano Electronics,
                Compact Modeling & Simulation
              </Typography>
            </li>
            <li>
              <Box
                component="span"
                fontSize="1.2rem"
                fontWeight="fontWeightBold"
              >
                Mechanical Engineering
              </Box>
              <Typography>
                Additive Manufacturing, Powder Metallurgy, Smart Materials,
                Energy storage materials
              </Typography>
            </li>
            <li>
              <Box
                component="span"
                fontSize="1.2rem"
                fontWeight="fontWeightBold"
              >
                Science and Humanities
              </Box>
              <ul className={styles.list}>
                <li>
                  <Box
                    component="span"
                    fontSize="1.2rem"
                    fontWeight="fontWeightBold"
                  >
                    Physics
                  </Box>
                  <Typography>
                    Optoelectronic Materials & Devices, Fiber optics,
                    Plasmonics, Semiconductor heterostructures
                  </Typography>
                </li>
                <li>
                  <Box
                    component="span"
                    fontSize="1.2rem"
                    fontWeight="fontWeightBold"
                  >
                    Mathematics
                  </Box>
                  <Typography>Fluid Dynamics</Typography>
                </li>
                <li>
                  <Box
                    component="span"
                    fontSize="1.2rem"
                    fontWeight="fontWeightBold"
                  >
                    Economics
                  </Box>
                  <Typography>
                    Health Economics, Health Technology Assessment, Global
                    issues in health and development
                  </Typography>
                </li>
                <li>
                  <Box
                    component="span"
                    fontSize="1.2rem"
                    fontWeight="fontWeightBold"
                  >
                    English
                  </Box>
                  <Typography>
                    Applied Linguistics, Indian Writing in English
                  </Typography>
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </Grid>
    </Grid>
  );
};

export default Programs;
