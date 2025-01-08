import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./Header.css";
import logo from "../../images/logoB.png";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Kullanıcıyı localStorage'dan kontrol et
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.token) {
      setIsLoggedIn(true);
      setUser(userData);
    }
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Çıkış yapıldığında localStorage temizlenir
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AppBar className="appbar" position="static" sx={{ backgroundColor: "transparent" }}>
      <Toolbar className="toolbar">
        {/* Sol tarafta Tourify amblemi */}
        <img
          src={logo}
          alt="Tourify Logo"
          className="logo"
          height={100}
          width={100}
        />

        <div>
          <Button className="button" color="inherit" href="/explore">
            KEŞFEDİN
          </Button>
          <Button className="button" color="inherit" href="/favorites">
          FAVORİLER
          </Button>
          <Button className="button" color="inherit" href="/past-travels">
            GEZİLERİM
          </Button>
          <Button className="button" color="inherit" href="/contact">
            İLETİŞİM
          </Button>

          {/* Dropdown Butonu */}
          {isLoggedIn ? (
            <>
              {/* Kullanıcı Adı Gösterilir */}
              <Button
                className="dropdownButton"
                color="inherit"
                onClick={handleMenuClick}
              >
                {user?.username} <ArrowDropDownIcon />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>
                  <Button className="button" color="inherit">
                    Çıkış Yap
                  </Button>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              {/* Üyelik Menüsü */}
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
              </Menu>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;