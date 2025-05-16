"use client";

import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Construction } from "@mui/icons-material";
import { useEffect } from "react";

const cmp = () => {
  useEffect(() => {
    document.title = "C2S Project";
    return () => {
      document.title = "IIIT Trichy";
    };
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      sx={{

        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        p: 2,
      }}
    >
          <Construction color="warning" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Page Under Development
          </Typography>


    </Box>
  );
};

export default cmp;
