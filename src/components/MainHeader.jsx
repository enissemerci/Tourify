import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // İkonu import et

import "./homepage/Header.css";
import logo from "../images/logoB.png";
import { Link } from "react-router-dom";

export const MainHeader = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <AppBar className="appbar" position="static" sx={{ backgroundColor:"#3A6D8C" }}>
        <Toolbar className="toolbar">
          {/* Sol tarafta Tourify amblemi */}
          <Link to="/">
        <img
          src={logo}
          alt="Tourify Logo"
          className="logo"
          height={100}
          width={100}
        />
      </Link>
  
          <div>
            <Button className="button" color="inherit" href="/explore">
              KEŞFEDİN
            </Button>
            <Button className="button" color="inherit" href="/past-travels">
              SEYAHATLER
            </Button>
            <Button className="button" color="inherit" href="/contact">
              İLETİŞİM
            </Button>
  
            {/* Dropdown Butonu */}
            <Button
              className="dropdownButton"
              color="inherit"
              onClick={handleMenuClick}
            >
              Üyelik <ArrowDropDownIcon />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>
                <Button className="button" color="inherit" href="/login">
                  Giriş Yap
                </Button>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Button className="button" color="inherit" href="/register">
                  Kaydol
                </Button>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Button className="button" color="inherit" href="/past-travels">
                  Seyahatlerim
                </Button>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    );
}
