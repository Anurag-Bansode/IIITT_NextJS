import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import styles from "./noticelist.module.css";
import nextConfig from "../../../next.config";

interface Item {
  title: string;
  link: string;
  date?: string;
  isNew?: boolean;
  description?: string;
}

interface NoticeListProps {
  title: string;
  notices: Item[];
}
const NoticeList: React.FC<NoticeListProps> = ({ title, notices }) => {
  return (
    <section className={styles.item_section}>
      <Typography variant="h5" className={styles.themeText}>
        <Box component="span" fontWeight="fontWeightBold">
          {title}
        </Box>
      </Typography>
      <ul className="doclist">
        {notices.map((item) => (
          <li key={item.title}>
            <a
              href={
                validURL(item.link)
                  ? item.link
                  : `${nextConfig.env?.DOCUMENT}/${item.link}`
              }
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.item}>
                <Typography>
                  {item.date && (
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      gutterBottom
                    >
                      Posted on: {item.date}
                    </Typography>
                  )}
                  <br />
                  <Box className={styles.themeText} component="span">
                    {item.title}
                  </Box>
                  <br />
                  <Box component="span">{item.description}</Box>
                </Typography>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NoticeList;
export function validURL(str: string) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}
