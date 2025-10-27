import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

// icons
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import RoofingRoundedIcon from '@mui/icons-material/RoofingRounded';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import HourglassBottomTwoToneIcon from "@mui/icons-material/HourglassBottomTwoTone";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import NoteIcon from "@mui/icons-material/Note";

import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ExpandLess, ExpandMore, Logout, Settings } from "@mui/icons-material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Avatar, Collapse, Menu, MenuItem, Tooltip } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import SuccesMsg from "./SuccesMsg";

const drawerWidth = 300;

const openedMixin = (theme) => ({
   width: drawerWidth,
   transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
   }),
   overflowX: "hidden",
});

const closedMixin = (theme) => ({
   transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   overflowX: "hidden",
   width: `calc(${theme.spacing(7)} + 1px)`,
   [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
   },
});

const DrawerHeader = styled("div")(({ theme }) => ({
   display: "flex",
   alignItems: "center",
   justifyContent: "flex-end",
   padding: theme.spacing(0, 1),
   // necessary for content to be below app bar
   ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
   shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
   zIndex: theme.zIndex.drawer + 1,
   transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   variants: [
      {
         props: ({ open }) => open,
         style: {
            marginLeft: drawerWidth,
            backgroundColor: "#333f4f",
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
               easing: theme.transitions.easing.sharp,
               duration: theme.transitions.duration.enteringScreen,
            }),
         },
      },
   ],
}));

const Drawer = styled(MuiDrawer, {
   shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
   width: drawerWidth,
   flexShrink: 0,
   whiteSpace: "nowrap",
   boxSizing: "border-box",
   variants: [
      {
         props: ({ open }) => open,
         style: {
            ...openedMixin(theme),
            "& .MuiDrawer-paper": openedMixin(theme),
         },
      },
      {
         props: ({ open }) => !open,
         style: {
            ...closedMixin(theme),
            "& .MuiDrawer-paper": closedMixin(theme),
         },
      },
   ],
}));

export default function Frame() {
   const navigate = useNavigate();
   const getRole = sessionStorage.getItem("role");

   const theme = useTheme();
   const [open, setOpen] = React.useState(true);
   const location = useLocation();
   const [laporan, setLaporan] = React.useState(false);
   const [program, setProgram] = React.useState(false);

   // ==============
   // state logout berhasil
   // ==============
   const [isLogout, setIsLogout] = useState(false);
   const [message, setMessage] = useState("");

   const [anchorEl, setAnchorEl] = React.useState(null);
   const profile = Boolean(anchorEl);
   const handleOpenProfile = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleCloseProfile = () => {
      setAnchorEl(null);
   };

   const handleClick = () => {
      setLaporan(!laporan);
   };
   const handleClickProgram = () => {
      setProgram(!program);
   };

   const handleDrawerOpen = () => {
      setOpen(true);
   };

   const handleDrawerClose = () => {
      setOpen(false);
   };

   const [name, setName] = useState("");

   const Me = async () => {
      try {
         const response = await axios.get("http://localhost:3000/me", {
            withCredentials: true,
         });
         console.log(response.data.name);
         setName(response.data.name);
      } catch (error) {
         console.log(error);
      }
   };

   const logOut = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.delete("http://localhost:3000/logout");
         //  console.log(response.data);
         setMessage(response.data.msg);
         setIsLogout(true);
         setTimeout(() => {
            setIsLogout(false);
            navigate("/");
         }, 2000);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      Me();
   }, []);

   return (
      <Box sx={{ display: "flex" }}>
         {isLogout && <SuccesMsg message={message} />}
         <CssBaseline />
         <AppBar position="fixed" open={open}>
            <Toolbar>
               <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={[
                     {
                        marginRight: 5,
                     },
                     open && { display: "none" },
                  ]}
               >
                  <MenuIcon />
               </IconButton>
               <div className="w-full flex justify-between items-center ">
                  <Typography variant="h6" noWrap component="div">
                     MONITORING DESA KECAMATAN UJUNG BATU
                  </Typography>
                  <div className="flex justify-end items-center gap-2">
                     <h1>{name} </h1>
                     <React.Fragment>
                        <Box
                           sx={{
                              display: "flex",
                              alignItems: "center",
                              textAlign: "center",
                           }}
                        >
                           <Tooltip title="Account settings">
                              <IconButton
                                 onClick={handleOpenProfile}
                                 size="small"
                                 sx={{ ml: 2 }}
                                 aria-controls={
                                    open ? "account-menu" : undefined
                                 }
                                 aria-haspopup="true"
                                 aria-expanded={open ? "true" : undefined}
                              >
                                 <Avatar sx={{ width: 32, height: 32 }}>
                                    M
                                 </Avatar>
                              </IconButton>
                           </Tooltip>
                        </Box>
                        <Menu
                           anchorEl={anchorEl}
                           id="account-menu"
                           open={profile}
                           onClose={handleCloseProfile}
                           onClick={handleCloseProfile}
                           slotProps={{
                              paper: {
                                 elevation: 0,
                                 sx: {
                                    overflow: "visible",
                                    filter:
                                       "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                    mt: 1.5,
                                    "& .MuiAvatar-root": {
                                       width: 32,
                                       height: 32,
                                       ml: -0.5,
                                       mr: 1,
                                    },
                                    "&::before": {
                                       content: '""',
                                       display: "block",
                                       position: "absolute",
                                       top: 0,
                                       right: 14,
                                       width: 10,
                                       height: 10,
                                       bgcolor: "background.paper",
                                       transform:
                                          "translateY(-50%) rotate(45deg)",
                                       zIndex: 0,
                                    },
                                 },
                              },
                           }}
                           transformOrigin={{
                              horizontal: "right",
                              vertical: "top",
                           }}
                           anchorOrigin={{
                              horizontal: "right",
                              vertical: "bottom",
                           }}
                        >
                           <MenuItem onClick={handleCloseProfile}>
                              <Avatar /> Profile
                           </MenuItem>

                           <Divider />

                           <MenuItem onClick={handleCloseProfile}>
                              <ListItemIcon>
                                 <Settings fontSize="small" />
                              </ListItemIcon>
                              Settings
                           </MenuItem>
                           <MenuItem onClick={logOut}>
                              <ListItemIcon>
                                 <Logout fontSize="small" />
                              </ListItemIcon>
                              Logout
                           </MenuItem>
                        </Menu>
                     </React.Fragment>
                  </div>
               </div>
            </Toolbar>
         </AppBar>
         <Drawer variant="permanent" open={open}>
            <DrawerHeader>
               <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "rtl" ? (
                     <ChevronRightIcon />
                  ) : (
                     <ChevronLeftIcon />
                  )}
               </IconButton>
            </DrawerHeader>
            <Divider />
            <div className="flex flex-col justify-between items-start h-full">
               <List>
                  {getRole === "user" && (
                     <>
                        <Link to={"/beranda"}>
                           <ListItem disablePadding>
                              <ListItemButton
                                 sx={{
                                    color: `${
                                       location.pathname === "/beranda"
                                          ? "blue"
                                          : "black"
                                    }`,
                                    backgroundColor: `${
                                       location.pathname === "/beranda"
                                          ? "#dbdbdb"
                                          : ""
                                    }`,
                                 }}
                              >
                                 <ListItemIcon>
                                    <HomeRoundedIcon />
                                 </ListItemIcon>
                                 <Typography sx={{ fontSize: "15px" }}>
                                    Beranda
                                 </Typography>
                              </ListItemButton>
                           </ListItem>
                        </Link>
                        <Divider />

                        <Link to={"/desa"}>
                           <ListItem disablePadding>
                              <ListItemButton
                                 sx={{
                                    color: `${
                                       location.pathname === "/desa"
                                          ? "blue"
                                          : "black"
                                    }`,
                                    backgroundColor: `${
                                       location.pathname === "/desa"
                                          ? "#dbdbdb"
                                          : ""
                                    }`,
                                 }}
                              >
                                 <ListItemIcon>
                                    <RoofingRoundedIcon />
                                 </ListItemIcon>
                                 <Typography sx={{ fontSize: "15px" }}>
                                    Desa
                                 </Typography>
                              </ListItemButton>
                           </ListItem>
                        </Link>

                        <Link to={"/addProggram"}>
                           <ListItem disablePadding>
                              <ListItemButton
                                 sx={{
                                    color: `${
                                       location.pathname === "/addProggram"
                                          ? "blue"
                                          : "black"
                                    }`,
                                    backgroundColor: `${
                                       location.pathname === "/addProggram"
                                          ? "#dbdbdb"
                                          : ""
                                    }`,
                                 }}
                              >
                                 <ListItemIcon>
                                    <AddCircleOutlineIcon />
                                 </ListItemIcon>
                                 <Typography sx={{ fontSize: "15px" }}>
                                    Tambah Program
                                 </Typography>
                              </ListItemButton>
                           </ListItem>
                        </Link>

                        <Link to={"/listProgram"}>
                           <ListItem disablePadding>
                              <ListItemButton
                                 sx={{
                                    color: `${
                                       location.pathname === "/listProgram"
                                          ? "blue"
                                          : "black"
                                    }`,
                                    backgroundColor: `${
                                       location.pathname === "/listProgram"
                                          ? "#dbdbdb"
                                          : ""
                                    }`,
                                 }}
                              >
                                 <ListItemIcon>
                                    <InventoryRoundedIcon />
                                 </ListItemIcon>
                                 <Typography sx={{ fontSize: "15px" }}>
                                    List Program
                                 </Typography>
                              </ListItemButton>
                           </ListItem>
                        </Link>

                        <Link to={"/addLaporan"}>
                           <ListItem disablePadding>
                              <ListItemButton
                                 sx={{
                                    color: `${
                                       location.pathname === "/addLaporan"
                                          ? "blue"
                                          : "black"
                                    }`,
                                    backgroundColor: `${
                                       location.pathname === "/addLaporan"
                                          ? "#dbdbdb"
                                          : ""
                                    }`,
                                 }}
                              >
                                 <ListItemIcon>
                                    <NoteIcon />
                                 </ListItemIcon>
                                 <Typography sx={{ fontSize: "15px" }}>
                                    Tambah Laporan
                                 </Typography>
                              </ListItemButton>
                           </ListItem>
                        </Link>

                        <Link to={"/laporanDikirim"}>
                           <ListItem disablePadding>
                              <ListItemButton
                                 sx={{
                                    color: `${
                                       location.pathname === "/laporanDikirim"
                                          ? "blue"
                                          : "black"
                                    }`,
                                    backgroundColor: `${
                                       location.pathname === "/laporanDikirim"
                                          ? "#dbdbdb"
                                          : ""
                                    }`,
                                 }}
                              >
                                 <ListItemIcon>
                                    <TaskAltIcon />
                                 </ListItemIcon>
                                 <Typography sx={{ fontSize: "15px" }}>
                                    Laporan dikirim
                                 </Typography>
                              </ListItemButton>
                           </ListItem>
                        </Link>
                     </>
                  )}

                  {getRole == "admin" && (
                     <>
                        <Link to={"/beranda"}>
                           <ListItem disablePadding>
                              <ListItemButton
                                 sx={{
                                    color: `${
                                       location.pathname === "/beranda"
                                          ? "blue"
                                          : "black"
                                    }`,
                                    backgroundColor: `${
                                       location.pathname === "/beranda"
                                          ? "#dbdbdb"
                                          : ""
                                    }`,
                                 }}
                              >
                                 <ListItemIcon>
                                    <HomeRoundedIcon />
                                 </ListItemIcon>
                                 <Typography sx={{ fontSize: "15px" }}>
                                    Beranda
                                 </Typography>
                              </ListItemButton>
                           </ListItem>
                        </Link>
                        <Divider />

                        <ListItemButton onClick={handleClickProgram}>
                           <ListItemIcon>
                              <InsertDriveFileIcon />
                           </ListItemIcon>
                           <ListItemText primary="Program" />
                           {program ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={program} timeout="auto" unmountOnExit>
                           <List component="div" disablePadding>
                              <Link to={"/admin/allProgram"}>
                                 <ListItemButton
                                    sx={{
                                       color: `${
                                          location.pathname ===
                                          "/admin/allProgram"
                                             ? "blue"
                                             : "black"
                                       }`,
                                       pl: 4,
                                       backgroundColor: `${
                                          location.pathname ===
                                          "/admin/allProgram"
                                             ? "#dbdbdb"
                                             : ""
                                       }`,
                                    }}
                                 >
                                    <ListItemIcon>
                                       <ReceiptLongRoundedIcon />
                                    </ListItemIcon>
                                    <Typography sx={{ fontSize: "15px" }}>
                                       Semua Program
                                    </Typography>
                                 </ListItemButton>
                              </Link>
                              <Link to={"/admin/persetujuan"}>
                                 <ListItemButton
                                    sx={{
                                       color: `${
                                          location.pathname ===
                                          "/admin/persetujuan"
                                             ? "blue"
                                             : "black"
                                       }`,
                                       pl: 4,
                                       backgroundColor: `${
                                          location.pathname ===
                                          "/admin/persetujuan"
                                             ? "#dbdbdb"
                                             : ""
                                       }`,
                                    }}
                                 >
                                    <ListItemIcon>
                                       <HourglassBottomTwoToneIcon />
                                    </ListItemIcon>
                                    <Typography sx={{ fontSize: "15px" }}>
                                       Menunggu Persetujuan
                                    </Typography>
                                 </ListItemButton>
                              </Link>
                           </List>
                        </Collapse>
                        <ListItemButton onClick={handleClick}>
                           <ListItemIcon>
                              <ReceiptLongRoundedIcon />
                           </ListItemIcon>
                           <ListItemText primary="Laporans" />
                           {laporan ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={laporan} timeout="auto" unmountOnExit>
                           <List component="div" disablePadding>
                              <Link to={"/adminLaporan"}>
                                 <ListItemButton
                                    sx={{
                                       color: `${
                                          location.pathname === "/adminLaporan"
                                             ? "blue"
                                             : "black"
                                       }`,
                                       pl: 4,
                                       backgroundColor: `${
                                          location.pathname === "/adminLaporan"
                                             ? "#dbdbdb"
                                             : ""
                                       }`,
                                    }}
                                 >
                                    <ListItemIcon>
                                       <ReceiptLongRoundedIcon />
                                    </ListItemIcon>
                                    <Typography sx={{ fontSize: "15px" }}>
                                       Laporan
                                    </Typography>
                                 </ListItemButton>
                              </Link>
                           </List>
                        </Collapse>

                        <Link to={"/admin/analisis"}>
                           <ListItem disablePadding>
                              <ListItemButton
                                 sx={{
                                    color: `${
                                       location.pathname === "/admin/analisis"
                                          ? "blue"
                                          : "black"
                                    }`,
                                    backgroundColor: `${
                                       location.pathname === "/admin/analisis"
                                          ? "#dbdbdb"
                                          : ""
                                    }`,
                                 }}
                              >
                                 <ListItemIcon>
                                    <HomeRoundedIcon />
                                 </ListItemIcon>
                                 <Typography sx={{ fontSize: "15px" }}>
                                    Analisis
                                 </Typography>
                              </ListItemButton>
                           </ListItem>
                        </Link>
                     </>
                  )}
               </List>

               {/* account setting */}
               <div className="py-5 px-3 flex justify-center items-center gap-5 w-full border-t-[1px] border-gray-200">
                  <div>
                     <p>Icon</p>
                  </div>
                  <div>
                     <p>{name} </p>
                     <p> </p>
                  </div>
               </div>
            </div>
         </Drawer>
         <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, backgroundColor: "#ebedf0" }}
         >
            <DrawerHeader />
            <Outlet />
         </Box>
      </Box>
   );
}
