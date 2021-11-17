import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {
   AppBar,
   Box,
   Button,
   CssBaseline,
   Divider,
   Drawer,
   IconButton,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   Toolbar,
   Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import * as React from "react";
import { Link, Route, Routes } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import AdminRoute from "../../AdminRoute/AdminRoute";
import AddDoctor from "../AddDoctor/AddDoctor";
import DashHome from "../DashHome/DashHome";
import MakeAdmin from "../MakeAdmin/MakeAdmin";
import Payment from "../Payment/Payment";

const drawerWidth = 200;

const Dashboard = (props) => {
   const { window } = props;
   const [mobileOpen, setMobileOpen] = React.useState(false);
   const { admin } = useAuth();
   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
   };

   const drawer = (
      <div>
         <Toolbar />
         <Divider />
         {/* ui showing */}
         <Link to="/appointment">
            <Button>Appointment</Button>
         </Link>
         <Link to="/dashboard">
            <Button>Dashboard</Button>
         </Link>
         {admin && (
            <Box>
               <Link to={`/dashboard/makeAdmin`}>
                  <Button>Make Admin</Button>
               </Link>
               <Link to={`/dashboard/addDoctor`}>
                  <Button>Add Doctor</Button>
               </Link>
            </Box>
         )}
         {/* ui showing  */}
         <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
               <ListItem button key={text}>
                  <ListItemIcon>
                     {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
               </ListItem>
            ))}
         </List>
      </div>
   );

   const container =
      window !== undefined ? () => window().document.body : undefined;

   return (
      <Box sx={{ display: "flex" }}>
         <CssBaseline />
         <AppBar
            position="fixed"
            sx={{
               width: { sm: `calc(100% - ${drawerWidth}px)` },
               ml: { sm: `${drawerWidth}px` },
            }}
         >
            <Toolbar>
               <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: "none" } }}
               >
                  <MenuIcon />
               </IconButton>
               <Typography variant="h6" noWrap component="div">
                  Dashboard
               </Typography>
            </Toolbar>
         </AppBar>
         <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
         >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
               container={container}
               variant="temporary"
               open={mobileOpen}
               onClose={handleDrawerToggle}
               ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
               }}
               sx={{
                  display: { xs: "block", sm: "none" },
                  "& .MuiDrawer-paper": {
                     boxSizing: "border-box",
                     width: drawerWidth,
                  },
               }}
            >
               {drawer}
            </Drawer>
            <Drawer
               variant="permanent"
               sx={{
                  display: { xs: "none", sm: "block" },
                  "& .MuiDrawer-paper": {
                     boxSizing: "border-box",
                     width: drawerWidth,
                  },
               }}
               open
            >
               {drawer}
            </Drawer>
         </Box>
         <Box
            component="main"
            sx={{
               flexGrow: 1,
               p: 3,
               width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
         >
            <Toolbar />
            <Routes>
               <Route path="/dashboard" element={<DashHome />}></Route>
               <Route
                  path={`/dashboard/payment/:appointmentId`}
                  element={
                     <AdminRoute>
                        <Payment />
                     </AdminRoute>
                  }
               />
               <Route
                  path={`/dashboard/makeAdmin`}
                  element={
                     <AdminRoute>
                        <MakeAdmin />
                     </AdminRoute>
                  }
               />
               <Route
                  path={`/dashboard/addDoctor`}
                  element={
                     <AdminRoute>
                        <AddDoctor />
                     </AdminRoute>
                  }
               />
            </Routes>
         </Box>
      </Box>
   );
};

Dashboard.propTypes = {
   /**
    * Injected by the documentation to work in an iframe.
    * You won't need it on your project.
    */
   window: PropTypes.func,
};

export default Dashboard;
