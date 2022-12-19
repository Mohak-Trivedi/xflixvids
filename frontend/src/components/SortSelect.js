import React, { useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import axios from "axios";
import { config } from "../App";

const SortSelect = ({ updateVids }) => {
    const [sortBy, setSortBy] = useState("releaseDate");

    const handleSelect = async (e) => {
      setSortBy(e.target.value);

      const url = `${config.endpoint}/videos?sortBy=${e.target.value}`;
      try {
        console.log(url);
        const res = await axios.get(url);
        updateVids(res.data.videos);
      } catch(err) {
        console.log(err);
      }
    };

    return (
        <Select
          value={sortBy}
          onChange={(e) => handleSelect(e)}
          startDecorator={<SwapVertIcon color="white" />}
          sx={{ height: 35, width: 240, borderRadius: 6 }}
        >
          <MenuItem value="releaseDate">Sort By: Release Date</MenuItem>
          <MenuItem value="viewCount">Sort By: View Count</MenuItem>
        </Select>
    );
};

export default SortSelect;