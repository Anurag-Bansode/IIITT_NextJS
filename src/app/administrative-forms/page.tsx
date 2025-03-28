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
  Button,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import styles from "../senate/senate.module.css";

interface FormData {
  title: string;
  link: string;
}

export default function AdministrativeForms() {
  const [forms, setForms] = useState<FormData[] | null>(null);

  const fetchFormsData = useCallback(async () => {
    try {
      const response = await fetch("/json/administrativeForms.json");
      const data = await response.json();
      setForms(data);
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  }, []);

  useEffect(() => {
    document.title = "ADMINISTRATIVE FORMS | IIITT";
    fetchFormsData();
    return () => {
      document.title = "IIIT Trichy";
    };
  }, [fetchFormsData]);

  return (
    <div className={styles.pageContainer}>
      <Typography variant="h2" className={styles.themeText}>
        Administrative Forms
      </Typography>

      {forms && (
        <TableContainer component={Paper} className={styles.table}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={styles.tableHead}>S. No.</TableCell>
                <TableCell className={styles.tableHead}>Form Title</TableCell>
                <TableCell className={styles.tableHead}>Download</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {forms.map((form, index) => (
                <TableRow key={index} className={styles.tableRow}>
                  <TableCell className={styles.tableCell}>{index + 1}</TableCell>
                  <TableCell className={styles.tableCell}>{form.title}</TableCell>
                  <TableCell className={styles.tableCell}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<DownloadIcon />}
                      href={form.link}
                      download
                    >
                      Download
                    </Button>
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
