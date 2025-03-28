import React from "react";
import Link from "next/link";
import { Card, CardActions, CardContent, Button, Typography, Paper } from "@mui/material";

interface Item {
  title: string;
  link: string;
  date?: string;
}

interface OutlinedCardProps {
  title: string;
  items: Item[]|undefined;
  linkToOlder: string;
}

const OutlinedCard: React.FC<OutlinedCardProps> = ({ title, items, linkToOlder }) => {
  return (
    <Card sx={{ minWidth: 237, padding: 2 }} id="simplecard">
      <CardContent>
        <Typography variant="h6" className="newshead mb-3">
          {title}
        </Typography>
        <ul className="space-y-4">
          {items?.map((item, index) => (
            <li key={index}>
              <Link href={item.link} className="text-blue-600 hover:underline">
                {item.title}
              </Link>
              {item.date && (
                <Typography variant="caption" color="textSecondary" className="block text-gray-500">
                  Posted: {item.date}
                </Typography>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardActions>
        <Link href={linkToOlder}>
          <Button size="small">View older</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

interface PaperCardProps {
  title: string;
  items: Item[]|undefined;
  linkToOlder: string;
}

const PaperCard: React.FC<PaperCardProps> = ({ title, items, linkToOlder }) => {
  return (
    <Paper sx={{ padding: 2, marginBottom: 2, width: "100%" }}>
      <OutlinedCard title={title} items={items} linkToOlder={linkToOlder} />
    </Paper>
  );
};

export default PaperCard;
