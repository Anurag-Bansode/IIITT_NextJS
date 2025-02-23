import React from "react";
import Link from "next/link";
import { Card, CardActions, CardContent, Button, Typography, Paper } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

interface Item {
  title: string;
  link: string;
  date?: string;
}

interface OutlinedCardProps {
  title: string;
  items: Item[];
  linkToOlder: string;
}

const OutlinedCard: React.FC<OutlinedCardProps> = ({ title, items, linkToOlder }) => {
  return (
    <Card sx={{ minWidth: 237, padding: 2 }} id="simplecard">
      <CardContent>
        <Typography variant="h6" className="newshead">
          {title}
        </Typography>
        <ul>
          {items?.map((item, index) => (
            <li key={index} style={{ marginBottom: "15px" }}>
              <Link href={item.link} passHref>
                <Typography component="a" color="primary">
                  {item.title}
                </Typography>
              </Link>
              {item.date && (
                <Typography variant="caption" color="textSecondary">
                  Posted: {item.date}
                </Typography>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardActions>
        <Link href={linkToOlder} passHref>
          <Button size="small">View older</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

interface PaperCardProps {
  title: string;
  items: Item[];
  linkToOlder: string;
}

const PaperCard: React.FC<PaperCardProps> = (props) => {
  return (
    <Paper sx={{ padding: 2, marginBottom: 2, width: "100%" }}>
      <OutlinedCard title={props.title} items={props.items} linkToOlder={props.linkToOlder} />
    </Paper>
  );
};

export default PaperCard;
