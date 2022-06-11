import {
  CardMedia,
  Container,
  CardActionArea,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import React from "react";

const MediaCard = styled(Card)((theme) => ({
  width: "80%",
  borderRadius: 12,
  "&:hover": {
    boxShadow: "10px 10px 66px 0px rgba(0,0,0,0.3)",
    "-webkit-box-shadow": "10px 10px 66px 0px rgba(0,0,0,0.3)",
    "-moz-box-shadow": "10px 10px 66px 0px rgba(0,0,0,0.3)",
  },
  //   [theme.breakpoints.down("sm")]: {
  //     width: "100%",
  //   },
}));

type Props = {};

const CardImage: React.FC<Props> = () => {
  return (
    <MediaCard>
      <CardActionArea>
        <CardMedia
          component="img"
          height="350"
          image="https://openseauserdata.com/files/spacedrip_launch_image_4x3.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Grid container>
            <Grid>
              <Grid container>
                <Avatar
                  src="https://openseauserdata.com/files/spacedrip_launch_image_4x3.jpg"
                  sx={{ marginRight: 1 }}
                />
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
              </Grid>
            </Grid>
            <Grid>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </MediaCard>
  );
};

export default CardImage;
