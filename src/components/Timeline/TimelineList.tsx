import React from "react";
import { Typography, Box } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import styles from "./timeline.module.css";

interface TimelineItem {
  title: string;
  url?: string;
  description?: string; // Only for notices
  date?: string; // Optional date for sorting
}

interface TimelineListProps {
  title: string;
  data: TimelineItem[];
  documentBaseUrl?: string;
  icon?: React.ReactNode;
}

const TimelineList: React.FC<TimelineListProps> = ({ title, data, documentBaseUrl, icon = <EventIcon /> }) => {
  return (
    <div className={styles.timelineSection}>
      <div className={styles.timelineIcon}>{icon}</div>
      <Typography variant="h5" className={styles.themeText}>
        {title}
      </Typography>

      {data.length === 0 ? (
        <Typography variant="body1" color="textSecondary">No notices available.</Typography>
      ) : (
        <ul className={styles.timelineList}>
          {data.map((item, idx) => (
            <li key={idx} className={styles.timelineItem}>
              <div className={styles.timelineContent}>
                {item.date && (
                  <Typography variant="caption" color="textSecondary">
                    📅 {new Date(item.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                  </Typography>
                )}
                <a href={`${documentBaseUrl}/${item.url}`} download={item.title} className={styles.link}>
                  📌 {item.title}
                </a>
                {item.description && (
                  <Typography variant="body2" color="textSecondary">{item.description}</Typography>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TimelineList;
