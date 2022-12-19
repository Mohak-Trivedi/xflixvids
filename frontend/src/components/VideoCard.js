import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useHistory } from "react-router-dom";

const VideoCard = ({videoData}) => {
    const history = useHistory();
    const moment = require('moment');

    console.log(videoData);
    return (
        <Card sx={{ maxWidth: 345, height: 273}}>
          <CardActionArea onClick={() => history.push(`/video/${videoData._id}`)}>
            <CardMedia
              component="img"
              height="140"
              image={videoData.previewImage}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {videoData.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {moment(videoData.releaseDate).fromNow()}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
    );
};

export default VideoCard;