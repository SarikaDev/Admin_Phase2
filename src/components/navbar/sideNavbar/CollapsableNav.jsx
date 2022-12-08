import { useState, useEffect } from "react";
import Link from "../../common/Links";
import { useLocation } from "react-router-dom";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
// ! Icon's
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import ExpandMore from "@mui/icons-material/ExpandMore";
const CollapsableNav = ({ primary, links, icon, root, onClick }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setOpen(location.pathname.includes(root));
  }, [location.pathname, root]);
  return (
    <>
      <Link to={root}>
        <ListItemButton
          selected={location.pathname.includes(root)}
          onClick={() => {
            setOpen(prev => !prev);
          }}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText fontSize={{ xs: 2, md: 3, lg: 2 }} primary={primary} />
          {open ? <ExpandMore /> : <ChevronRightOutlinedIcon />}
        </ListItemButton>
      </Link>

      <Collapse in={open} timeout="auto">
        <List component="nav">
          {links.map(navItem => (
            <div key={navItem?.link}>
              <Link to={navItem?.link}>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={onClick}
                  selected={navItem?.link === location.pathname}
                >
                  {/* //! Icons  */}
                  <ListItemIcon>{navItem.icon}</ListItemIcon>
                  <ListItemText
                    fontSize={{ xs: 12, md: 9, lg: 15 }}
                    primary={navItem.title}
                  />
                </ListItemButton>
              </Link>
            </div>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default CollapsableNav;
