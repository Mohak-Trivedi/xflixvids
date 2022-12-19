import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, Button, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { config } from "../App";
// import { useSnackbar } from 'notistack';
import axios from "axios";
import Header from "./Header";
import Loading from "./Loading";
import VideoCard from "./VideoCard";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import "./VideoPage.css";

const VideoPage = () => {
    // const { enqueueSnackbar } = useSnackbar();

    let { id } = useParams();
    const moment = require('moment');

    const [videosData, setVideosData] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState({});
    const [upVotes, setUpVotes] = useState(0);
    const [downVotes, setDownVotes] = useState(0);
    const [loading, setLoading] = useState(false);

    const patchVoteData = async (vote) => {
        const voteData = {
            vote: vote,
            change: "increase"
        }

        try {
            const response = await axios.patch(`${config.endpoint}/v1/videos/${id}/votes`, voteData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            return response;
        } catch (err) {
            // enqueueSnackbar(error.response.data.message, {
            //     variant: "error",
            // });
            console.log(err);
        }
    }

    const handleUpVotes = () => {
        setUpVotes(upVotes + 1)
        patchVoteData("upVote")
    }

    const handleDownVotes = () => {
        setDownVotes(downVotes + 1)
        patchVoteData("downVote")
    }

    const updateViews = async () => {
        const response = await axios.patch(`${config.endpoint}/v1/videos/${id}/views`);
        return response;
    }

    const fetchVideos = async () => {
        const URL = `${config.endpoint}/videos`;
        
        try {
            const res = await axios.get(URL);
            setVideosData(res.data.videos);
        }
        catch(err) {
            console.log(err);
        }
    };

    const fetchVideoById = async (id) => {
        const URL = `${config.endpoint}/videos/${id}`;

        setLoading(true);
        try {
            const res = await axios.get(URL);
            setSelectedVideo(res.data);
            setUpVotes(res.data.votes.upVotes);
            setDownVotes(res.data.votes.downVotes);
        }
        catch(err) {
            console.log(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchVideos();
        fetchVideoById(id);
        updateViews();
    }, [id]);

    return (
        <>
        <Header />
        <Box>
            {loading ?
                <Loading /> :
                <div>
                    <Box className="video-container">
                        <Box className="iframe-container">
                            <iframe
                                className="iframe"
                                src={`https://www.${selectedVideo.videoLink}`}
                                title={selectedVideo.title}
                            />
                        </Box>
                        <Box className="videoDetails-container">
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Box>
                                    <Typography variant="h5">{selectedVideo.title}</Typography>
                                    <Typography variant="p">
                                        {selectedVideo.contentRating} | {" "}
                                        {moment(selectedVideo.releaseDate).fromNow()}
                                    </Typography>
                                </Box>

                                <Box>
                                    <Button onClick={handleUpVotes}>
                                        <Stack direction="row" gap="10px" alignItems="center">
                                            <ThumbUpIcon />
                                            <Typography
                                                variant="p"
                                                style={{ color: "white", fontWeight: "bold" }}
                                            >
                                                {upVotes}
                                            </Typography>
                                        </Stack>
                                    </Button>

                                    <Button onClick={handleDownVotes}>
                                        <Stack direction="row" gap="10px" alignItems="center">
                                            <ThumbDownIcon />
                                            <Typography
                                                variant="p"
                                                style={{ color: "white", fontWeight: "bold" }}
                                            >
                                                {downVotes}
                                            </Typography>
                                        </Stack>
                                    </Button>
                                </Box>
                            </Stack>
                        </Box>
                    </Box>
                    <Grid container rowSpacing={3} columnSpacing={1} pl={10} pr={10}>
                        {videosData.filter((video) => video._id !== id).map((data)=>{
                                return (
                                    <Grid item xs={12} sm={6} md={3} key={data._id}>
                                        <VideoCard videoData={data}/>
                                    </Grid>
                                );
                            })
                        }
                    </Grid>
                </div>
            }
        </Box>
        </>
    );
};

export default VideoPage;