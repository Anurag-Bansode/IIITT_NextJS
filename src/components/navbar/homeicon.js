"use client";
import React from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { Button } from "@mui/material";
import { usePathname } from "next/navigation";

const StyledHomeIcon = styled(HomeRoundedIcon)(({ theme, color, nopadding }) => ({
  color: color || theme.palette.primary.main,
  paddingLeft: nopadding ? "0" : "10px",
}));

export default function HomeIcon({ home = "/", color, nopadding }) {
  const pathname = usePathname(); // Get current route

  if (pathname === home) return null; // Hide if already on the home page

  return (
    <Link href={home} draggable="false" id="home_button">
      {nopadding ? (
        <StyledHomeIcon color={color} nopadding={nopadding} />
      ) : (
        <Button>
          <StyledHomeIcon color={color} nopadding={nopadding} />
        </Button>
      )}
    </Link>
  );
}
