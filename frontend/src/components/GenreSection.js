import React, { useState } from "react";
import { config } from "../App";
import {Box, Stack, Chip} from "@mui/material";
import SortSelect from "./SortSelect";
import "./GenreSection.css";
import axios from "axios";

const GenreSection = ({ uniqGenres, uniqContentRating, updateProducts, search }) => {
    const [selectGenres, setSelectGenres] = useState([]);
    const [selectContentRating, setSelectContentRating] = useState('');

    const handleGenreChange = async (addGenre) => {
        let url;

        let genreQuery = '';
        let contentRateQuery = '';
        let titleQuery = '';

        let currVidGenArr;

        if(selectGenres.includes(addGenre)) {
            currVidGenArr = selectGenres.filter(genre => genre!==addGenre);
        }
        else {
            currVidGenArr = [...selectGenres, addGenre];
        }
        setSelectGenres(currVidGenArr);
        
        if(selectGenres.includes('All Genre') || addGenre==='All Genre' || currVidGenArr.length===0) {
            genreQuery = 'genres=All';
        }
        else {
            const selGen = currVidGenArr.join(',');
            genreQuery = `genres=${selGen}`;
        }

        if(selectContentRating.length > 0) {
            if(selectContentRating==='' || selectContentRating==='Any age group') {
                contentRateQuery = `contentRating=${selectContentRating}`;
            }
            else {
                const contRate = selectContentRating.replace('+', '%2B');
                contentRateQuery = `contentRating=${contRate}`;
            }
        }

        if(search.length > 0) {
            titleQuery = `title=${search}`;
        }

        if(contentRateQuery.length>0 && titleQuery.length>0) {
            url = `${config.endpoint}/videos?${titleQuery}&${genreQuery}&${contentRateQuery}`;
        }
        else if(contentRateQuery.length>0) {
            url = `${config.endpoint}/videos?${genreQuery}&${contentRateQuery}`;
        }
        else if(titleQuery.length>0) {
            url = `${config.endpoint}/videos?${titleQuery}&${genreQuery}`;
        }
        else {
            url = `${config.endpoint}/videos?${genreQuery}`;
        }

        console.log(url);
        try {
            const response = await axios.get(url);
            console.log(response.data.videos);
            updateProducts(response.data.videos);
        } catch(e) {
            console.log(e);
        }
    };

    const handleContentRatingChange = async (newContentRating) => {
        let url;

        let contentRateQuery;

        if(newContentRating === selectContentRating) {
            newContentRating = 'Any age group';
        }

        setSelectContentRating(newContentRating);

        if(newContentRating==='Any age group') {
            contentRateQuery = '';
        }
        else {
            newContentRating = newContentRating.replace('+', '%2B');

            contentRateQuery = `contentRating=${newContentRating}`;
        }
        console.log(url);
        console.log('Selected genres: ',selectGenres);
        console.log('Search: ', search);
        if(search.length>0 && selectGenres.length>0 && contentRateQuery.length>0)
        {
            const searchQuery = `title=${search}`;
            console.log(searchQuery);
            const genreQuery = `genres=${selectGenres.join(',')}`;
            console.log(genreQuery);
            url = `${config.endpoint}/videos?${searchQuery}&${genreQuery}&${contentRateQuery}`;
            console.log(url);
        }
        else if(search.length>0 && selectGenres.length>0) {
            const searchQuery = `title=${search}`;
            console.log(searchQuery);
            const genreQuery = `genres=${selectGenres.join(',')}`;
            console.log(genreQuery);
            url = `${config.endpoint}/videos?${searchQuery}&${genreQuery}`;
            console.log(url);
        }
        else if(search.length > 0) {
            const searchQuery = `title=${search}`;
            console.log(searchQuery);
            url = `${config.endpoint}/videos?${searchQuery}&${contentRateQuery}`;
            console.log(url);
        }
        else if(selectGenres.length > 0) {
            const genreQuery = `genres=${selectGenres.join(',')}`;
            console.log(genreQuery);
            url = `${config.endpoint}/videos?${genreQuery}&${contentRateQuery}`;
            console.log(url);
        }
        else {
            url = `${config.endpoint}/videos?${contentRateQuery}`;
            console.log(url);
        }
        console.log(url);
        
        try {
            const response = await axios.get(url);
            console.log(response.data.videos);
            updateProducts(response.data.videos);
        } catch(e) {
            console.log(e);
        }
    };
    
    return (
        <Box sx={{my: 1}}>
            <Stack direction="row" spacing={2} justifyContent="center" sx={{my: 2}}>
                {uniqGenres.map(
                        (genre) => 
                        (<Chip label={genre} variant={(selectGenres.includes(genre)) ? "filled" : "outlined"} onClick={() => handleGenreChange(genre)} />)
                    )
                }
                <SortSelect updateVids={updateProducts} />
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="center" sx={{my: 2}}>
                {uniqContentRating.map(
                        (contentRating) => 
                        (<Chip label={contentRating} variant={(contentRating === selectContentRating) ? "filled" : "outlined"} onClick={() => handleContentRatingChange(contentRating)} />)
                    )
                }
            </Stack>
        </Box>
    );
};

export default GenreSection;