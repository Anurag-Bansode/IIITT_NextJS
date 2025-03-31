"use client";

import React from "react";
import { Card, CardContent, CardActions, Button, Typography } from "@mui/material";
import Link from "next/link";
import DescriptionIcon from "@mui/icons-material/Description";
import EventNoteIcon from "@mui/icons-material/EventNote";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import "./PaperCard.css";

interface Item {
  title: string;
  link: string;
  date?: string;
}

interface PaperCardProps {
  title: string;
  items: Item[];
  linkToOlder: string;
}

const PaperCard: React.FC<PaperCardProps> = ({ title, items, linkToOlder }) => {
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <OutlinedCard title={title} items={items} linkToOlder={linkToOlder} />
    </div>
  );
};

const getIcon = (title: string) => {
  switch (title.toLowerCase()) {
    case "news":
      return <DescriptionIcon className="mr-2 text-blue-500" />;
    case "events":
      return <EventNoteIcon className="mr-2 text-green-500" />;
    case "notices":
      return <NotificationsIcon className="mr-2 text-red-500" />;
    case "achievements":
      return <EmojiEventsIcon className="mr-2 text-yellow-500" />;
    default:
      return null;
  }
};

const OutlinedCard: React.FC<PaperCardProps> = ({ title, items, linkToOlder }) => {
  return (
    <Card variant="outlined" className="w-full" id="simplecard" style={{ width: "100%" }}>
      <CardContent>
        <Typography variant="h6" className="newshead flex items-center">
          {getIcon(title)} {title}
        </Typography>
        <ul className={title}>
          {items.map((item, index) => (
            <li key={index} className="mb-4">
              <Link href={item.link} passHref>
                <Typography color="primary" component="a" className="hover:underline">
                  {item.title}
                </Typography>
              </Link>
              {item.date && (
                <Typography variant="caption" color="textSecondary" display="block">
                  Posted: {item.date}
                </Typography>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardActions>
        <Link href={linkToOlder} passHref>
          <Button variant="outlined" color="primary">View Older</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export { PaperCard, OutlinedCard };
