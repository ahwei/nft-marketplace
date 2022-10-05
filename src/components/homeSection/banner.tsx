import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Grid, Typography, Button } from "@mui/material";
import CardImage from "@/components/nft/nftCard";

const SectionBanner = styled(Box)(({ theme }) => ({
  width: "100%",
  position: "relative",
  height: 1200,
  [theme.breakpoints.up("sm")]: {
    height: 600,
  },
}));

const BackgroundImage = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  position: "absolute",
  backgroundBlendMode: "multiply",
  opacity: 0.1,
  backgroundImage:
    'url("https://openseauserdata.com/files/spacedrip_launch_image_4x3.jpg")',
  backgroundSize: "cover",
  backgroundColor: "rgb(255,255,255)",
  top: 0,
  zIndex: -1,
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  width: 150,
  margin: 8,
  height: 45,
}));

type Props = {};

const Banner: React.FC<Props> = ({}) => {
  return (
    <SectionBanner>
      <BackgroundImage />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Grid sm={12} md={6} sx={{ padding: 10 }} item>
          <Typography variant="h3">
            Discover, collect, and sell extraordinary NFTs
          </Typography>
          <Typography variant="h5">AhWei make NFT marketplace</Typography>
          <Grid container justifyContent="center" alignItems="center">
            <ActionButton color="secondary" variant="contained">
              Expore
            </ActionButton>
            <ActionButton
              color="secondary"
              variant="outlined"
              sx={{ background: "#fff" }}
            >
              Create
            </ActionButton>
          </Grid>
        </Grid>
        <Grid item sm={12} md={6} sx={{ padding: { xs: 0, md: 10 } }}>
          <Grid container justifyContent="center" alignItems="center">
            <CardImage />
          </Grid>
        </Grid>
      </Grid>
      <BackgroundImage />
    </SectionBanner>
  );
};

Banner.propTypes = {};

export default Banner;
