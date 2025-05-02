"use client";
import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import styles from './Admission_pg.module.css';

const Admission_pg: React.FC = () => {
    const [admissionData, setAdmissionData] = useState<any>(null);

    // Fetch JSON data
    useEffect(() => {
        fetch('/json/admission/pg.json')
            .then((response) => response.json())
            .then((data) => setAdmissionData(data))
            .catch((error) => console.error("Error loading admission data:", error));
    }, []);

    if (!admissionData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Grid container className={styles.container}>
                <Grid size={1} />
                <Grid size={10}>
                    <Typography
                        variant="h3"
                        component="h3"
                        gutterBottom
                        className={styles.themeText}
                    >
                        <Box component="span">M.Tech Admission</Box>
                    </Typography>

                    {/* Display CCMT 2024 content */}
                    <h3><strong>{admissionData.ccmt2024.title}</strong></h3>
                    <hr />
                    <p>
                        <a
                            target="_blank"
                            href={admissionData.ccmt2024.onlineReporting.url}
                            className={styles.link}
                        >
                            {admissionData.ccmt2024.onlineReporting.text}
                        </a>
                    </p>
                    <p>
                        <a
                            target="_blank"
                            href={admissionData.ccmt2024.nicPortal.url}
                            className={styles.link}
                        >
                            {admissionData.ccmt2024.nicPortal.text}
                        </a>
                    </p>
                    <p>
                        <a
                            target="_blank"
                            href={admissionData.ccmt2024.feeStructure.url}
                            className={styles.link}
                        >
                            {admissionData.ccmt2024.feeStructure.text}
                        </a>
                    </p>
                    <p>
                        <a
                            target="_blank"
                            href={admissionData.ccmt2024.feeRefund.url}
                            className={styles.link}
                        >
                            {admissionData.ccmt2024.feeRefund.text}
                        </a>
                    </p>

                    <br></br>


                    {/* Display CCMN 2024 content */}

                    <h3><strong>{admissionData.ccmn2024.title}</strong></h3>
                    <hr />
                    <p>
                        <a
                            target="_blank"
                            href={admissionData.ccmn2024.onlineReporting.url}
                            className={styles.link}
                        >
                            {admissionData.ccmn2024.onlineReporting.text}
                        </a>
                    </p>
                    <p>
                        <a
                            target="_blank"
                            href={admissionData.ccmn2024.nicPortal.url}
                            className={styles.link}
                        >
                            {admissionData.ccmn2024.nicPortal.text}
                        </a>
                    </p>
                    <p>
                        <a
                            target="_blank"
                            href={admissionData.ccmn2024.feeStructure.url}
                            className={styles.link}
                        >
                            {admissionData.ccmn2024.feeStructure.text}
                        </a>
                    </p>
                    <p>
                        <a
                            target="_blank"
                            href={admissionData.ccmn2024.feeRefund.url}
                            className={styles.link}
                        >
                            {admissionData.ccmn2024.feeRefund.text}
                        </a>
                    </p>
                </Grid>
            </Grid>
        </div>
    );
};

export default Admission_pg;
