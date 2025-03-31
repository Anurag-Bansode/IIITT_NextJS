"use client";
import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import styles from "./departments.module.css";
interface Department {
  name: string;
  description: string;
}

const Departments: React.FC = () => {
  const [depts, setDepts] = useState<Department[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    document.title = "Departments";
    return () => {
      document.title = "IIIT Trichy";
    };
  }, []);

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
        <Grid size={1} />
        <Grid size={10}>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            className={styles.themeText}
          >
            <Box component="span" fontWeight={380}>
              Departments
            </Box>
          </Typography>
          {depts &&
            depts.map((dept) => {
              return (
                <section className={styles.sectionPadding}>
                  <Typography
                    variant="h5"
                    className={styles.themeText}
                    gutterBottom
                  >
                    <Box component="span" fontWeight="fontWeightBold">
                      {dept.name}
                    </Box>
                  </Typography>
                  <Box
                    component="span"
                    fontSize="1.2em"
                    className={styles.dept_desc}
                  >
                    {dept.description}
                  </Box>
                </section>
              );
            })}
        </Grid>
      </Grid>
    </div>
  );
};

export default Departments;
