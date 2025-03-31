"use client";
import React, { useEffect, useState } from "react";
import { Typography, Box, Table, TableRow } from "@mui/material";
import Grid from "@mui/material/Grid2";
import styles from "./curriculum.module.css";
import TableCell from "@mui/material";
interface Department {
  name: string;
  description: string;
}

const Curriculum: React.FC = () => {
  const [depts, setDepts] = useState<Department[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    document.title = "Curriculum";
    return () => {
      document.title = "IIIT Trichy";
    };
  }, []);

  const cse15 = "Curriculum_IIITTUGCSE15.pdf";
  const cse16 = "CSE_Syllabus_16.pdf";
  const ece15 = "Curriculum_IIITTUGECE15.pdf";
  const ece16 = "Syllabus_ECE_16.pdf";
  const cse20 = "UG_CSE_2020.pdf";
  const ece20 = "UG_ECE_2020.pdf";
  const mcse21 = "CSE_M.Tech_Syllabus_2021-Revised.pdf";
  const mece21 = "ECE_M.Tech_Syllabus_2021-Revised.pdf";
  useEffect(() => {
    fetch("/json/general/departments.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch departments data");
        }
        return response.json();
      })
      .then((data) => {
        setDepts(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching department data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-container">
      <Grid container className={styles.container}>
        <Grid  size={1} />
        <Grid  size={10}>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            className={styles.themeText}
          >
            <Box component="span" fontWeight={380}>
              Curriculum
            </Box>
          </Typography>

          <section className={styles.sectionPadding}>
            <Typography variant="h5" gutterBottom>
              The&nbsp;
              <Box component="span" fontWeight="fontWeightBold">
                Undergraduate Program Curriculum
              </Box>
              &nbsp;has the following components:
            </Typography>
            <ul className={styles.list}>
              <li>Program Core Courses</li>
              <li>Programming Elective Courses</li>
              <li>Open Elective Courses</li>
              <li>Self Study/Online Courses</li>
              <li>Minor Courses</li>
              <li>Honours Courses</li>
              <li>Internship</li>
              <li>Project Work</li>
            </ul>
            <Typography className={styles.sectionPadding}>
              <Box component="span" fontSize="1.2em">
                Relative grading is used to assess the performance of the
                students.
                <Box component="span" fontWeight="fontWeightBold">
                  The Undergraduate Program Curriculum and Syllabus is similar
                  to NIT Trichy.
                </Box>
              </Box>
            </Typography>
            <Typography className={styles.sectionPadding}>
              <Box component="span" fontSize="1.2em">
                The curriculum for all the programs have been framed after
                extensive deliberations and discussions with IITs, NITs, IIITs,
                and Anna University and other reputed Institute faculty members
                and Industry stake holders.
              </Box>
            </Typography>
            <Typography className={styles.sectionPadding}>
              <Box component="span" fontSize="1.2em">
                The students may undergo internship from research labs CSIO -
                CSIR, CECRI – CSIR, IGCAR, and industries such as Navitas (TAKE
                Solutions), Compegence, Sanspareil, Infomak, Zod, etc.
                <br />
                The students and faculty are encouraged to publish research
                papers in International Journals, International Conferences, and
                National Conferences.
                <br />
                In IIIT Trichy, all the core theory courses are supplemented
                with laboratory exercises / mini projects / case studies. The
                curriculum is manipulated to make the students industry-ready,
                and is customized to suit the conditions prevailing in the
                industry by providing internal or external industry
                participation.
              </Box>
            </Typography>
            <Typography className={styles.sectionPadding}>
              <Box component="span" fontSize="1.2em">
                With the kind of support IIITT has with reputed industry
                partners and other software industries, this unique course
                should be able to meet the requirements of ‘industrial ready’
                students coming out of IIITs as envisaged in our objective.
              </Box>
            </Typography>
          </section>
          <section className={styles.sectionPadding}>
            <Typography variant="h5" className={styles.themeText} gutterBottom>
              <Box component="span" fontWeight="fontWeightBold">
                Syllabus
              </Box>
            </Typography>
            
          </section>
          <section className={styles.sectionPadding}>
            <Typography variant="h5" className={styles.themeText} gutterBottom>
              <Box component="span" fontWeight="fontWeightBold">
                PG curriculum
              </Box>
            </Typography>
            
          </section>
        </Grid>
      </Grid>
    </div>
  );
};

export default Curriculum;
