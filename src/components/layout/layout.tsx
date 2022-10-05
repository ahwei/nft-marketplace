import React from "react";
import PropTypes from "prop-types";
import Header from "./header";
import Footer from "./footer";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Topper from "./topper";
type Props = {
  children: JSX.Element;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "calc( 100vh - 64px )",
        }}
      >
        <CssBaseline />
        {children} <Footer />
      </Box>
    </React.Fragment>
  );
};

Layout.propTypes = {};

export default Layout;
