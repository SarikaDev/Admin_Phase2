// Drawer_Left_NavBar_Component
import { Avatar, Typography } from "@mui/material";
import profile_pic from "../../../assets/user.png";
import { useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
// ! Re_usable Component
import CollapsableNav from "./CollapsableNav";
import DvrIcon from "@mui/icons-material/Dvr";
import Link from "../../common/Links";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import { useCallback } from "react";
import { PATHS } from "../../../utils/constants";
import { useSelector } from "react-redux";
const DrawList = ({ setIsOpen }) => {
  const location = useLocation();
  const displayName = useSelector(state => state.userDetails.displayName);
  const roleName = useSelector(state => state.userDetails.roleName);
  const navItems = [
    {
      title: "Dashboard",
      link: PATHS.dashboard,
      icon: <DvrIcon />,
    },
    // {
    //   title: "Enrollments",
    //   icon: <ContactPageOutlinedIcon />,
    //   link: PATHS.enroll.root,
    //   children: [
    //     {
    //       title: "Total",
    //       link: PATHS.enroll.total,
    //     },
    //     {
    //       title: "Day",
    //       link: PATHS.enroll.day,
    //     },
    //     {
    //       title: "Week",
    //       link: PATHS.enroll.week,
    //     },
    //     {
    //       title: "Month",
    //       link: PATHS.enroll.month,
    //     },
    //     {
    //       title: "Date Range",
    //       link: PATHS.enroll.dataRange,
    //     },
    //   ],
    // },
    // {
    //   title: "Authentications",
    //   link: PATHS.authentication.root,
    //   icon: <GppGoodOutlinedIcon />,
    //   children: [
    //     {
    //       title: "Total",
    //       link: PATHS.authentication.total,
    //     },
    //     {
    //       title: "Day",
    //       link: PATHS.authentication.day,
    //     },
    //     {
    //       title: "Week",
    //       link: PATHS.authentication.week,
    //     },
    //     {
    //       title: "Month",
    //       link: PATHS.authentication.month,
    //     },
    //     {
    //       title: "Date Range",
    //       link: PATHS.authentication.dataRange,
    //     },
    //   ],
    // },
    // {
    //   title: "Adjudication",
    //   link: PATHS.adjudication.root,
    //   icon: <FlakyOutlinedIcon />,
    //   children: [
    //     {
    //       title: "Total",
    //       link: PATHS.adjudication.total,
    //     },
    //     // {
    //     //   title: "Day",
    //     //   link: PATHS.adjudication.day,
    //     // },
    //     // {
    //     //   title: "Week",
    //     //   link: PATHS.adjudication.week,
    //     // },
    //     // {
    //     //   title: "Month",
    //     //   link: PATHS.adjudication.month,
    //     // },
    //     // {
    //     //   title: "Date Range",
    //     //   link: PATHS.adjudication.dataRange,
    //     // },
    //   ],
    // },
    // {
    //   title: "Metric",
    //   link: PATHS.metric.root,
    //   icon: <InsertChartOutlinedIcon />,
    //   children: [
    //     {
    //       title: "Reports",
    //       link: PATHS.metric.reports,
    //     },
    //     {
    //       title: "Registrations",
    //       link: PATHS.metric.registrations,
    //     },
    //     {
    //       title: "User List",
    //       link: PATHS.metric.users,
    //     },
    //     {
    //       title: "Audit Trails",
    //       link: PATHS.metric.auditTrail,
    //     },
    //   ],
    // },
    // {
    //   title: "Device Registrations",
    //   link: PATHS.deviceRegistrations.root,
    //   icon: <RequestPageOutlined />,
    //   children: [
    //     {
    //       title: "User List",
    //       link: PATHS.deviceRegistrations.user,
    //     },
    //     {
    //       title: "Report List",
    //       link: PATHS.deviceRegistrations.report,
    //     },
    //     {
    //       title: "Sample List",
    //       link: PATHS.deviceRegistrations.Sample,
    //     },
    //   ],
    // },
    {
      title: "User Management",
      link: PATHS.userManagement.root,
      icon: <PersonAddAltRoundedIcon />,
      children: [
        {
          title: "Create User",
          link: PATHS.userManagement.createUser,
        },

        {
          title: "User Lists",
          link: PATHS.userManagement.userLists,
        },
      ],
    },
  ];

  const closeNavbar = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        marginY={4}
      >
        <Avatar
          alt="profile_pic"
          src={profile_pic}
          sx={{
            width: "90px",
            height: "90px",
            objectFit: "cover",
          }}
        />
        <Typography fontSize={{ xs: 16, md: 9, lg: 19 }} variant="body2">
          {displayName}
        </Typography>
        <Typography
          fontSize={{ xs: 12, md: 12, lg: 14 }}
          variant="h6"
          color="#343434"
          sx={{ fontWeight: "500" }}
        >
          {roleName}
        </Typography>
      </Box>
      <Box sx={{ width: "100%", position: "relative" }}>
        <List component="nav">
          {navItems?.map((navItem, index) =>
            !!navItem?.children?.length ? (
              <CollapsableNav
                key={index}
                onClick={closeNavbar}
                primary={navItem?.title}
                links={navItem?.children}
                icon={navItem?.icon}
                root={navItem?.link}
              />
            ) : (
              <Link to={navItem?.link} key={index}>
                <ListItemButton
                  selected={navItem?.link === location.pathname}
                  onClick={closeNavbar}
                >
                  <ListItemIcon>{navItem?.icon}</ListItemIcon>
                  <ListItemText
                    fontSize={{ xs: 12, md: 9, lg: 15 }}
                    primary={navItem?.title}
                  />
                </ListItemButton>
              </Link>
            ),
          )}
        </List>
      </Box>
    </Box>
  );
};

export default DrawList;
