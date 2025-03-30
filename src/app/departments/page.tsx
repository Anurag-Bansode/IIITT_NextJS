"use client";
import React, { useEffect, useState } from "react";
import { Typography, Box, CircularProgress } from "@mui/material";
import "./departments.module.css";

interface Department {
  name: string;
  description: string;
}

const Departments: React.FC = () => {
  const [depts, setDepts] = useState<Department[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    document.title = "Departments";
    return () => {
      document.title = "IIIT Trichy";
    };
  }, []);

  useEffect(() => {
    fetch("/json/departments.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch departments data");
        }
        return response.json();
      })
      .then((data) => {
        setDepts(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching department data:", error);
        setLoading(false);
      });
  }, []);

  return (
      <div className="content-container">
        <Typography variant="h2" className="themeText" gutterBottom>
          <Box component="span" fontWeight={380}>
            Departments
          </Box>
        </Typography>

        {loading ? (
          <div className="loading-container">
            <CircularProgress />
          </div>
        ) : (
          depts &&
          depts.map((dept, index) => (
            <section key={index} className="sectionPadding">
              <Typography variant="h5" className="themeText" gutterBottom>
                <Box component="span" fontWeight="fontWeightBold">
                  {dept.name}
                </Box>
              </Typography>
              <Box component="span" className="dept_desc">
                {dept.description}
              </Box>
            </section>
          ))
        )}
      </div>
  );
};

export default Departments;
