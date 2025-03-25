"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import FeedIcon from "@mui/icons-material/Feed";
import styles from "../senate/senate.module.css";

interface BoardMember {
  name: string;
  designation: string;
  role: string;
}

interface SenateMeeting {
  title: string;
  description: string;
  url: string;
}

export default function bog() {
  const [senate, setSenate] = useState<BoardMember[] | null>(null);
  const [senateMeeting, setSenateMeeting] = useState<SenateMeeting[] | null>(
    null
  );

  const fetchSenateData = useCallback(async () => {
    try {
      const senateResponse = await fetch("/json/bog.json");
      const senateJson = await senateResponse.json();
      setSenate(senateJson.data);

      const meetingResponse = await fetch("/json/bogMeeting.json");
      const meetingJson: Record<string, { description: string; url: string }> =
        await meetingResponse.json();

      // Convert JSON object to an array of SenateMeeting
      const meetingsArray: SenateMeeting[] = Object.entries(meetingJson).map(
        ([title, details]) => ({
          title,
          description: details.description,
          url: details.url,
        })
      );

      setSenateMeeting(meetingsArray);
    } catch (error) {
      console.error("Error fetching Senate or meeting data:", error);
    }
  }, []);

  useEffect(() => {
    document.title = "Senate";
    fetchSenateData();

    return () => {
      document.title = "IIIT Trichy";
    };
  }, [fetchSenateData]);

  return (
    <div className={styles.pageContainer}>
      <Typography variant="h2" className={styles.themeText}>
      Board of Governors (BoG) 
      </Typography>

      {/* Senate Members Table */}  
      <Typography variant="h3" className={styles.title}>
        Members of Board of Governors (BoG) 
      </Typography>
      {senate && (
        <TableContainer component={Paper} className={styles.table}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={styles.tableHead}>S. No.</TableCell>
                <TableCell className={styles.tableHead}>Name</TableCell>
                <TableCell className={styles.tableHead}>Designation</TableCell>
                <TableCell className={styles.tableHead}>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {senate.map((gov, index) => (
                <TableRow key={gov.name} className={styles.tableRow}>
                  <TableCell className={styles.tableCell}>{index + 1}</TableCell>
                  <TableCell className={styles.tableCell}>{gov.name}</TableCell>
                  <TableCell className={styles.tableCell}>
                    {gov.designation}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {gov.role}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Senate Meeting Minutes (Aligned with Table) */}
      <Typography variant="h3" className={styles.title} sx={{ mt: 4 }}>
        Senate Minutes
      </Typography>
      {senateMeeting && (
        <TableContainer component={Paper} className={styles.table}>
          <Box p={2}>
            {senateMeeting.map((meeting, index) => (
              <Box key={index} display="flex" alignItems="center" gap={1} mb={1}>
                <FeedIcon fontSize="small" className={styles.meetingIcon} />
                <Typography
                  variant="body1"
                  gutterBottom
                  className={styles.meetingTitle}
                >
                  {meeting.title}
                </Typography>
              </Box>
            ))}
          </Box>
        </TableContainer>
      )}
    </div>
  );
}
