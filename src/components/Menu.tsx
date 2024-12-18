import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { AlignJustify } from "lucide-react";
import { useNavigate } from "react-router-dom"; 

type Anchor = "top" | "left" | "bottom" | "right";

export default function Menu() {
  const [activeLink, setActiveLink] = React.useState("Home");
  const navigate = useNavigate(); 

  const navLinks = [
    { label: "Home", path: "/", onClick: () => handleNavigation("/") },
    { label: "About", path: "/about", onClick: () => handleNavigation("/about") },
    { label: "Contact", path: "/contact", onClick: () => handleNavigation("/contact") },
    { label: "Login", path: "/login", onClick: () => handleNavigation("/login") },
  ];

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };

  const handleNavigation = (path: string) => {
    setActiveLink(path);
    navigate(path); 
  };

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        background: "black",
        color: "white",
        height: "100vh",
        padding: "20px",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {navLinks.map((link) => (
          <div key={link.label}>
            <div
              className={`text-white hover:text-yellow-500 transition-colors cursor-pointer mx-20 my-4 ${activeLink === link.path ? "font-bold" : ""}`}
              onClick={link.onClick} 
            >
              {link.label}
            </div>
          </div>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <AlignJustify className="text-white" />
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
