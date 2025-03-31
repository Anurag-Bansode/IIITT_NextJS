"use client";
import React, { useEffect, useState } from "react";
import { Typography, Box, Table, TableRow } from "@mui/material";
import Grid from "@mui/material/Grid2";
import styles from "./calender.module.css";
import nextConfig from "../../../next.config";
import EventIcon from "@mui/icons-material/Event";
interface calendar {
  title: string;
  data: calendardata[];
}
interface calendardata {
  title: string;
  url: string;
}
const Curriculum: React.FC = () => {
  const [calendar, setDepts] = useState<calendar[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    document.title = "Calendar";
    return () => {
      document.title = "IIIT Trichy";
    };
  }, []);

  useEffect(() => {
    fetch("/json/general/calendar.json")
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
              Academic Calendar
            </Box>
          </Typography>
          {calendar &&
            calendar.map((d, id) => {
              return (
                <section key={id} className={styles.sectionPadding}>
                  <Typography variant="h5" className={styles.themeText}>
                    <Box component="span" fontWeight="fontWeightBold">
                      {d.title}
                    </Box>
                  </Typography>
                  {d.data.map((dd, idx) => (
                    <Box key={idx} display="flex" alignItems="center">
                      <EventIcon className="download" />
                      <a
                        href={`${nextConfig.env?.DOCUMENT}/${dd.url}`}
                        download={`${dd.title}`}
                        className={styles.link}
                      >
                        {dd.title}
                      </a>
                    </Box>
                  ))}
                  {id !== calendar.length - 1 && <hr />}
                </section>
              );
            })}
        </Grid>
        <Grid size={1} />
      </Grid>
    </div>
  );
};

export default Curriculum;
