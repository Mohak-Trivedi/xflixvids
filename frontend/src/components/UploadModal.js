import { React, useState } from "react";
import Button from "@mui/material/Button";
import UploadIcon from '@mui/icons-material/Upload';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { config } from "../App";
import axios from "axios";
// import { useSnackbar } from 'notistack';
import "./UploadModal.css";

const UploadModal = () => {
    // const { enqueueSnackbar } = useSnackbar();

    const allGenres = [
        {label: "Education", value:"Education"},
        {label: "Sports", value: "Sports"},
        {label: "Comedy", value: "Comedy"},
        {label: "Lifestyle", value: "Lifestyle"}
    ];

    const allAges = [
        {label: "7+", value:"7"},
        {label: "12+", value: "12"},
        {label: "16+", value: "16"},
        {label: "18+", value: "18"}
      ];

    const [openDialog, setOpenDialog] = useState(false);
    const [dateValue, setDateValue] = useState(new Date());
    const [genre, setGenre] = useState("");
    const [age, setAge] = useState("");
    // Even though age and genre are stored below in object state, I have 
    // created separate states for both as they don't resume to empty
    // in textfield of Modal when we go for uploading new video
    // rather what is stored in below object shows up.
    // To prevent this I have create separate states for these.
    const [videoPostData, setVideoPostData] = useState({
        videoLink: "",
        previewImage: "",
        title: "",
        genre: "",
        contentRating: "",
        releaseDate: dateValue,
    });

    const handleClickUpload = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleLink = (link) => {
        if(link === '') {
            setVideoPostData({ ...videoPostData, videoLink: '' });
        }
        else {
            let urlLink = new URL(link);
            console.log(urlLink);
            let videoParam = urlLink.searchParams.get("v");
            console.log(videoParam);
            const finalVideoLink = `youtube.com/embed/${videoParam}`;
            setVideoPostData({ ...videoPostData, videoLink: finalVideoLink });
        }
    }

    const handleGenreChange = (event) => {
        setGenre(event.target.value);
        setVideoPostData({ ...videoPostData, genre: event.target.value })
    };
    
    const handleAgeChange = (event) => {
        setAge(event.target.value);
        setVideoPostData({ ...videoPostData, contentRating: event.target.value })
    };

    const handleDateChange = (newValue) => {
        console.log("newvalue :", newValue);
        setDateValue(newValue);

        const years = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ]

        const date = newValue.getDate();

        const month = years[newValue.getMonth()];

        const fullYear = newValue.getFullYear();

        let dateString = date + " " + month + " " + fullYear;

        setVideoPostData({ ...videoPostData, releaseDate: dateString });
    };

    const handleUploadVideo = async () => {
        const data = videoPostData;
        if (
            data.videoLink &&
            data.title &&
            data.genre &&
            data.contentRating &&
            data.releaseDate &&
            data.previewImage
        ) {
            try {
                const response = await axios.post(`${config.endpoint}/v1/videos`, data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                handleClose();
                alert("Uploaded Successfully");
            } catch (error) {
                alert(error.response.data.message);
            }
        } else if (!data.videoLink) {
            alert("Link must be a valid url");
        } else {
            alert("All fields are required");
        }
    };

    return (
        <>
            <Button
                id="upload-btn"
                className="upload-button"
                startIcon={<UploadIcon />}
                variant="contained"
                onClick={handleClickUpload}
            >
                Upload
            </Button>
            <Dialog className="UploadModal-dialog" open={openDialog} onClose={handleClose}>
                <div className="UploadModal-header">
                    <DialogTitle>Upload Video</DialogTitle>
                    <CloseIcon className="closeIcon" onClick={handleClose} />
                </div>
                <DialogContent>
                    <TextField
                        fullWidth
                        className="formInput"
                        id="videoLink"
                        label="Video Link"
                        helperText="This link will be used to derive the video"
                        onChange={(e) => handleLink(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        className="formInput"
                        id="imageLink"
                        label="Thumbnail Image Link"
                        helperText="This link will be used to preview the Thumbnail Image"
                        onChange={(e) =>
                            setVideoPostData({ ...videoPostData, previewImage: e.target.value })
                        }
                    />
                    <TextField
                        fullWidth
                        className="formInput"
                        id="title"
                        label="Title"
                        helperText="The title will be the representative text for video"
                        onChange={(e) =>
                            setVideoPostData({ ...videoPostData, title: e.target.value })
                        }
                    />
                    <TextField
                        fullWidth
                        className="formInput"
                        id="genre"
                        select
                        label="Genre"
                        value={genre}
                        onChange={(e) => handleGenreChange(e)}
                        helperText="Genre will help you in categorizing your videos"
                        >
                            {allGenres.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                    </TextField>
                    <TextField
                        fullWidth
                        className="formInput"
                        id="age"
                        select
                        label="Suitable age group for the clip"
                        value={age}
                        onChange={(e) => handleAgeChange(e)}
                        helperText="This will be used to filter videos on age group suitability"
                        >
                            {allAges.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                    </TextField>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Release Date"
                            inputFormat="dd/MM/yyyy"
                            value={dateValue}
                            onChange={(newValue) => {
                            handleDateChange(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            helperText="This will be used to sort videos"
                        />
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions className="DialogModal-buttons">
                    <Button id="upload-btn-submit" className="uploadVideo-btn" onClick={handleUploadVideo}>Upload Video</Button>
                    <Button id="upload-btn-cancel" onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UploadModal;