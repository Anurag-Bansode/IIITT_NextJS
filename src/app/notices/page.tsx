"use client";

import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import styles from "./notice.module.css";
import nextConfig from "../../../next.config";
import TimelineList from "@/components/Timeline/TimelineList";

interface Item {
  title: string;
  link: string;
  date?: string;
  isNew?: boolean;
  description?: string;
}

const Notices = () => {
  const [noticesData, setNoticesData] = useState<Record<string, Item[]> | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [oldNotices, setOldNotices] = useState<Item[]>([]);
  const [newNotices, setNewNotices] = useState<Item[]>([]);

  useEffect(() => {
    const fetchNoticesData = async () => {
      try {
        const response = await fetch("/json/general/notices.json");
        if (!response.ok) throw new Error("Failed to fetch notices data");

        const data = await response.json();
        console.info(data);

        const sortedNotices = [...data.data].sort(
          (a, b) =>
            new Date(b.date || "").getTime() - new Date(a.date || "").getTime()
        );

        setNewNotices(sortedNotices.filter((x) => x.isNew));
        setOldNotices(sortedNotices.filter((x) => !x.isNew));
        setNoticesData(data);
      } catch (error) {
        console.error("Error loading JSON data:", error);
        setError("Error loading notices data.");
      } finally {
        setLoading(false);
      }
    };

    fetchNoticesData();
  }, []);

  return (
    <div className="page-container">
      <Grid container className={styles.container}>
        <Grid size={1} />
        <Grid size={10}>
          <Typography variant="h2" gutterBottom className={styles.themeText}>
            <Box component="span" fontWeight={380}>
              Notices
            </Box>
          </Typography>

          {error && <Typography color="error">{error}</Typography>}
          {loading && <Typography>Loading...</Typography>}

          {!loading && !error && (
            <>
              <TimelineList
                title="New Notices"
                data={newNotices}
                documentBaseUrl={nextConfig.env?.DOCUMENT}
                icon={<AnnouncementIcon />}
              />
              <TimelineList
                title="Old Notices"
                data={oldNotices}
                documentBaseUrl={nextConfig.env?.DOCUMENT}
                icon={<AnnouncementIcon />}
              />
            </>
          )}
        </Grid>
        <Grid size={1} />
      </Grid>
    </div>
  );
};

export default Notices;
