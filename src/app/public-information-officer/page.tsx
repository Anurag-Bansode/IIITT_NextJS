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

interface FinanceMember {
  name: string;
  designation: string;
  role: string;
}

interface FinanceMeeting {
  title: string;
  description: string;
  url: string;
}

export default function fc() {
  const [senate, setSenate] = useState<FinanceMember[] | null>(null);
  const [senateMeeting, setSenateMeeting] = useState<FinanceMeeting[] | null>(
    null
  );

  const fetchSenateData = useCallback(async () => {
    try {
      const senateResponse = await fetch("/json/publicInformationOfficer.json");
      const senateJson = await senateResponse.json();
      setSenate(senateJson.data);
    } catch (error) {
      console.error("Error fetching Senate or meeting data:", error);
    }
  }, []);

  useEffect(() => {
    document.title = "PIO| IIITT";
    fetchSenateData();

    return () => {
      document.title = "IIIT Trichy";
    };
  }, [fetchSenateData]);

  return (
    <div className={styles.pageContainer}>
      <Typography variant="h2" className={styles.themeText}>
       Public Information Officer
      </Typography>

      <Typography variant="h3" className={styles.title}>
        PIO
      </Typography>
      {senate && (
        <TableContainer component={Paper} className={styles.table}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={styles.tableHead}>S. No.</TableCell>
                <TableCell className={styles.tableHead}>Name</TableCell>
                <TableCell className={styles.tableHead}>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {senate.map((gov, index) => (
                <TableRow key={gov.name} className={styles.tableRow}>
                  <TableCell className={styles.tableCell}>{index + 1}</TableCell>
                  <TableCell className={styles.tableCell}>{gov.name}</TableCell>
                  <TableCell className={styles.tableCell}>
                    {gov.role}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
