"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import PersonCard from "@/components/PersonCard/PersonCard";
import { Typography } from "@mui/material";
import Link from "next/link";
import styles from "./faculty.module.css"; // Custom CSS module

interface FacultyMember {
  name: string;
  emailID: string;
  src: string;
  designation: string;
  researchArea: string;
  id: {
    dept: string;
    deptID: string;
  };
  Incharge?: string;
  VidhwanLink?: string;
  Institute?: string;
}

const Faculty = () => {
  const [facultyData, setFacultyData] = useState<Record<string, FacultyMember[]> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const response = await fetch("/json/faculty.json");
        if (!response.ok) throw new Error("Failed to fetch faculty data");

        const data = await response.json();
        console.info(data);
        setFacultyData(data);
      } catch (error) {
        console.error("Error loading JSON data:", error);
        setError("Error loading faculty data.");
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyData();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>Faculty</title>
      </Head>
      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <div className={styles.facultyContainer}>
          {facultyData &&
            Object.entries(facultyData).map(([group, members]) => (
              <React.Fragment key={group}>
                <Typography variant="h3" className={styles.groupTitle}>
                  {group}
                </Typography>
                <div className={styles.gridContainer}>
                  {members.map((member, index) => (
                    <div className={styles.gridItem} key={index}>
                      <PersonCard
                        name={member.name}
                        emailID={member.emailID}
                        src={member.src}
                        src_type="faculty"
                        designation={member.designation}
                        researchArea={member.researchArea}
                        dept={member.id.dept}
                        deptID={member.id.deptID}
                        Incharge={member.Incharge}
                        VidhwanLink={member.VidhwanLink}
                        Institute={member.Institute}
                      />
                    </div>
                  ))}
                </div>
              </React.Fragment>
            ))}
        </div>
      )}

      {/* Faculty Rule Book Section */}
      <Typography align="center" variant="h5" gutterBottom>
        <span className={styles.boldText}>Faculty Rule Book</span>
      </Typography>
      <Typography align="center">
        <Link href="/docs/C-StaffHandbook.pdf" download className={styles.downloadLink}>
          📄 Download Faculty Rule Book
        </Link>
      </Typography>
    </div>
  );
};

export default Faculty;
