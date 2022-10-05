import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

import Search from "@/components/ui_kit/Search";
import CustomMenu, { MenuSection } from "@/components/ui_kit/Menu";

import Image from "next/image";
import NextjsLink from "next/link";
import { menuItems } from "@/constants/menuSetting";

type MenuSectionType = {
  selected?: Boolean;
};

type Props = {};

const Header: React.FC<Props> = ({}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, height: 64 }}>
      <AppBar position="fixed">
        <Toolbar sx={{ height: 64 }}>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton> */}
          <Link href="/" component={NextjsLink} sx={{ cursor: "pointer" }}>
            <a href="/">
              <Image
                src="/logo.png"
                width={50}
                height={50}
                style={{ cursor: "pointer" }}
              />
            </a>
          </Link>

          <Link href="/" component={NextjsLink}>
            <MenuSection href="/">
              <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" }, cursor: "pointer" }}
              >
                AhWNFT
              </Typography>
            </MenuSection>
          </Link>
          <Search />
          <Box sx={{ flexGrow: 1 }} />

          {/* 電腦版顯示 */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              height: "100%",
              alignItems: "center",
            }}
          >
            {/* <Link href="/wallet" component={NextjsLink}>
              <MenuSection variant="body1" noWrap sx={{ cursor: "pointer" }}>
                Explore
              </MenuSection>
            </Link> */}

            {menuItems.map((item) => (
              <CustomMenu
                title={item.title}
                href={item.href}
                key={item.href}
                menuItems={item.children}
              />
            ))}

            {/* <Link href="/myNfts" component={NextjsLink}>
              <MenuSection variant="body1" noWrap sx={{ cursor: "pointer" }}>
                Collections
              </MenuSection>
            </Link>

            <Link href="/wallet" component={NextjsLink}>
              <MenuSection variant="body1" noWrap sx={{ cursor: "pointer" }}>
                Create
              </MenuSection>
            </Link> */}

            <Link href="/wallet" component={NextjsLink}>
              <Button color="secondary" variant="outlined">
                Connect Wallet
              </Button>
            </Link>
          </Box>

          {/* 手機版顯示 */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Header;
