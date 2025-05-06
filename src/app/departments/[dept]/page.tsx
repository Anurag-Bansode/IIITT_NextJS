"use client";

import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useParams } from "next/navigation";
import styles from "../department.module.css";

interface Department {
  department: string;
  about: string;
  message_from_hod: {
    name: string;
    designation: string;
    message: string;
  };
  faculty_members: {
    name: string;
    designation: string;
  }[];
  research_scholars: {
    name: string;
    topic: string;
  }[];
  research_areas: string[];
  announcements: {
    title: string;
    date: string;
  }[];
  latest_news: {
    title: string;
  }[];
  contact: {
    department: string;
    college: string;
    location: string;
    email: string;
    phone: string;
  };
}

const Cse: React.FC = () => {
  const params = useParams();
  const dept = params?.dept as string;
  const [cseData, setCseData] = useState<Department | null>(null);

  useEffect(() => {
    document.title = "CSE";
    return () => {
      document.title = "IIIT Trichy";
    };
  }, []);

  useEffect(() => {
    fetch(`/json/departments/${dept}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch CSE data");
        }
        return response.json();
      })
      .then((data) => {
        setCseData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching department data:", error);
      });
  }, []);

  return (
    <div>
      <Grid container className={styles.departmentContainer}>
        <Grid size={1} />
        <Grid size={10}>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            className={styles.departmentThemeText}
          >
            <Box
              component="span"
              sx={{
                fontSize: { xs: "32px", sm: "42px", md: "54px" },
                fontWeight: 600,
                display: "inline-block",
                background: "linear-gradient(45deg, #1a5d3a, #2e8b57)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "2rem",
                letterSpacing: "1px",
              }}
            >
              {cseData ? cseData.department : "Loading..."}
            </Box>
          </Typography>

          {cseData && (
            <>
              {/* About */}
              <div className={styles.departmentCard}>
                <Typography
                  variant="h5"
                  className={styles.departmentThemeText}
                  gutterBottom
                >
                  <Box component="span" fontWeight="fontWeightBold">
                    About
                  </Box>
                </Typography>
                <Box component="p" className={styles.departmentDesc}>
                  {cseData.about}
                </Box>
              </div>

              {/* HOD Message */}
              <div className={styles.departmentCard}>
                <Typography
                  variant="h5"
                  className={styles.departmentThemeText}
                  gutterBottom
                >
                  <Box component="span" fontWeight="fontWeightBold">
                    Message from the Head of Department
                  </Box>
                </Typography>
                <Box
                  component="p"
                  className={styles.departmentDesc}
                  sx={{ fontStyle: "italic" }}
                >
                  "{cseData.message_from_hod.message}"
                </Box>
                <Typography variant="subtitle2" color="text.secondary">
                  – {cseData.message_from_hod.name},{" "}
                  {cseData.message_from_hod.designation}
                </Typography>
              </div>

              {/* Faculty Members */}
              <div className={styles.departmentCard}>
                <Typography
                  variant="h5"
                  className={styles.departmentThemeText}
                  gutterBottom
                >
                  <Box component="span" fontWeight="fontWeightBold">
                    Faculty Members
                  </Box>
                </Typography>
                {cseData.faculty_members.map((faculty, index) => (
                  <Box key={index} mb={1}>
                    <Typography>{faculty.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {faculty.designation}
                    </Typography>
                  </Box>
                ))}
                <Box mt={2} textAlign="right">
                  <a
                    href="/faculty"
                    style={{
                      color: "#1a5d3a",
                      fontWeight: "bold",
                      textDecoration: "none",
                    }}
                  >
                    Know more &rarr;
                  </a>
                </Box>
              </div>

              {/* Research Scholars */}
              <div className={styles.departmentCard}>
                <Typography
                  variant="h5"
                  className={styles.departmentThemeText}
                  gutterBottom
                >
                  <Box component="span" fontWeight="fontWeightBold">
                    Research Scholars
                  </Box>
                </Typography>
                {cseData.research_scholars.map((scholar, index) => (
                  <Box key={index} mb={1}>
                    <Typography>{scholar.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Research Topic: {scholar.topic}
                    </Typography>
                  </Box>
                ))}
              </div>

              {/* Announcements */}
              <div className={styles.departmentCard}>
                <Typography
                  variant="h5"
                  className={styles.departmentThemeText}
                  gutterBottom
                >
                  <Box component="span" fontWeight="fontWeightBold">
                    Announcements
                  </Box>
                </Typography>
                {cseData.announcements.map((a, i) => (
                  <Box key={i} mb={1.5}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {a.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {a.date}
                    </Typography>
                  </Box>
                ))}
              </div>

              {/* Research Areas */}
              <div className={styles.departmentCard}>
                <Typography
                  variant="h5"
                  className={styles.departmentThemeText}
                  gutterBottom
                >
                  <Box component="span" fontWeight="fontWeightBold">
                    Research Areas
                  </Box>
                </Typography>
                {cseData.research_areas.map((area, i) => (
                  <Box key={i} mb={1.5}>
                    <Typography> {area}</Typography>
                  </Box>
                ))}
              </div>

              {/* Latest News */}
              <div className={styles.departmentCard}>
                <Typography
                  variant="h5"
                  className={styles.departmentThemeText}
                  gutterBottom
                >
                  <Box component="span" fontWeight="fontWeightBold">
                    Latest News
                  </Box>
                </Typography>
                {cseData.latest_news.map((news, i) => (
                  <Box key={i} mb={1.5}>
                    <Typography> {news.title}</Typography>
                  </Box>
                ))}
              </div>

              {/* Contact */}
              <div className={styles.departmentCard}>
                {cseData.contact && (
                  <>
                    <Typography
                      variant="h5"
                      className={styles.departmentThemeText}
                      gutterBottom
                    >
                      <Box component="span" fontWeight="fontWeightBold">
                        Contact Us
                      </Box>
                    </Typography>

                    {cseData.contact.department && (
                      <Typography>
                        <strong>Department:</strong> {cseData.contact.department}
                      </Typography>
                    )}
                    {cseData.contact.college && (
                      <Typography>
                        <strong>College:</strong> {cseData.contact.college}
                      </Typography>
                    )}
                    {cseData.contact.location && (
                      <Typography>
                        <strong>Location:</strong> {cseData.contact.location}
                      </Typography>
                    )}
                    {cseData.contact.email && (
                      <Typography>
                        <strong>Email:</strong> {cseData.contact.email}
                      </Typography>
                    )}
                    {cseData.contact.phone && (
                      <Typography>
                        <strong>Phone:</strong> {cseData.contact.phone}
                      </Typography>
                    )}
                  </>
                )}
              </div>

            </>
          )}
        </Grid>
        <Grid size={1} />
      </Grid>
    </div>
  );
};

export default Cse;
