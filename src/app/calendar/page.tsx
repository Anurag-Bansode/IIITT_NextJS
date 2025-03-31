"use client";
import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2"
import styles from "./calendar.module.css";
import nextConfig from "../../../next.config";
import EventIcon from "@mui/icons-material/Event";

interface Calendar {
  title: string;
  data: CalendarData[];
}
interface CalendarData {
  title: string;
  url: string;
}

const calendar: React.FC = () => {
  const [calendar, setCalendar] = useState<Calendar[] | null>(null);
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
          throw new Error("Failed to fetch calendar data");
        }
        return response.json();
      })
      .then((data) => {
        setCalendar(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching calendar data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.pageContainer}>
      <Grid container className={styles.container}>
        <Grid size={1} />
        <Grid size={10}>
          <Typography variant="h2" component="h2" gutterBottom className={styles.themeText}>
            <Box component="span" fontWeight={380}>Academic Calendar</Box>
          </Typography>

          <div className={styles.timeline}>
            {calendar &&
              calendar.map((d, id) => (
                <div key={id} className={styles.timelineSection}>
                   <div className={styles.timelineIcon}><EventIcon /></div>
                  <Typography variant="h5" className={styles.themeText}>
                    {d.title}
                  </Typography>
                  {d.data.map((dd, idx) => (
                    <div key={idx} className={styles.timelineItem}>
                      <div className={styles.timelineContent}>
                        <a href={`${nextConfig.env?.DOCUMENT}/${dd.url}`} download={`${dd.title}`} className={styles.link}>
                          {dd.title}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </Grid>
        <Grid size={1} />
      </Grid>
    </div>
  );
};

export default calendar
