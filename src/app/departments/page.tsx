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
            depts.map((dept, index) => (
              <Grid size={12} key={index}>
                <div
                  className={styles.card}
                  style={{ marginTop:"3px", animationDelay: `${index * 0.2}s` }}
                  //onClick={() => router.push(dept.url)}  Redirect on click
                >
                  <Typography
                    variant="h5"
                    className={styles.themeText}
                    gutterBottom
                  >
                    <Box component="span" fontWeight="fontWeightBold">
                      {dept.name}
                    </Box>
                  </Typography>
                  <Box component="p" className={styles.deptDesc}>
                    {dept.description}
                  </Box>
                </div>
              </Grid>
            ))}
        </Grid>
        <Grid size={1} />
      </Grid>
    </div>
  );
};

export default Departments;
