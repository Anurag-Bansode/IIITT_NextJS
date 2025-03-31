"use client";
import React, { useEffect, useState } from "react";
import { Typography, Box} from "@mui/material";
import Grid from "@mui/material/Grid2"
import EventIcon from "@mui/icons-material/Event";
import styles from "./holiday.module.css";
import nextConfig from "../../../next.config";

interface CalendarItem {
  title: string;
  url: string;
}

const Holidays: React.FC = () => {
  const [calendar, setCalendar] = useState<CalendarItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    document.title = "Holidays";
    return () => {
      document.title = "IIIT Trichy";
    };
  }, []);

  useEffect(() => {
    fetch("/json/general/holidays.json")
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
            calendar.map((item, id) => (
              <section key={id} className={styles.sectionPadding}>
                <Box display="flex" alignItems="center">
                  <EventIcon className={styles.icon} />
                  <a
                    href={`${nextConfig.env?.DOCUMENT}/${item.url}`}
                    download={`${item.title}`}
                    className={styles.link}
                  >
                    {item.title}
                  </a>
                </Box>
              </section>
            ))}
        </Grid>
        <Grid size={1} />
      </Grid>
    </div>
  );
};

export default Holidays;