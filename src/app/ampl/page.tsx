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
import LabPage from "@/components/LabComponent/LabComponent";

const cmp = () => {
  useEffect(() => {
    document.title = "Advanced Manufacturing and Processing Lab";
    return () => {
      document.title = "IIIT Trichy";
    };
  }, []);

  return (
    <LabPage labName="ampl"/>
  );
};

export default cmp;
