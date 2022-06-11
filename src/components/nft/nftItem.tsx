import {
  CardMedia,
  Container,
  CardActionArea,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Link,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import React from "react";

const MediaCard = styled(Card)((theme) => ({
  width: "94%",
  borderRadius: 12,
  "&:hover": {
    boxShadow: "10px 10px 66px 0px rgba(0,0,0,0.3)",
    "-webkit-box-shadow": "10px 10px 66px 0px rgba(0,0,0,0.3)",
    "-moz-box-shadow": "10px 10px 66px 0px rgba(0,0,0,0.3)",
  },
  marginBottom: 10,
}));

type Props = {};

const CardImage: React.FC<Props> = () => {
  return (
    <MediaCard>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image="https://openseauserdata.com/files/spacedrip_launch_image_4x3.jpg"
          alt="green iguana"
        />

        <CardContent sx={{ position: "relative" }}>
          <Avatar
            src="https://openseauserdata.com/files/spacedrip_launch_image_4x3.jpg"
            sx={{
              position: "absolute",
              width: 50,
              height: 50,
              left: "calc( 50% - 25px )",
              top: -25,
              border: "2px solid #fff",
            }}
          />
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{ paddingTop: 2 }}
          >
            <Typography gutterBottom variant="h6" component="div">
              Lizard
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
              by <Link>AhWeiHENGuEi</Link>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </Grid>
        </CardContent>
      </CardActionArea>
    </MediaCard>
  );
};

export default CardImage;
