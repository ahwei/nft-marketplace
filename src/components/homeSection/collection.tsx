import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Box, Grid, Typography, Button } from "@mui/material";
import CardItem from "@/components/nft/nftItem";

type Props = {};

const Collection: React.FC<Props> = ({}) => {
  return (
    <Box sx={{ marginTop: 1, marginBottom: 1, padding: 5 }}>
      <Typography variant="h4" gutterBottom>
        Trending Collections
      </Typography>

      <Grid container>
        <Grid xs={12} sm={6} md={3}>
          <CardItem />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <CardItem />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <CardItem />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <CardItem />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Collection;
