import React, { useState } from "react";
import {
  FormControl,
  InputAdornment,
  OutlinedInput,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import httpService from "../utils/http.js";
import { endpoints } from "../utils/http.js";
import Muitable from "./MuiTable.js";
import { useSelector } from "react-redux";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [advancedSearch, setAdvancedSearch] = useState(false); // State to toggle advanced search

  const [advancedSearchData, setAdvancedSearchData] = useState({
    erp: "",
    instructor: "",
    title: "",
    days: "",
  });

  const jwtToken = useSelector((state) => state.user.token);

  const handleSearch = async () => {
    try {
      const response = await httpService({
        endpoint: endpoints.course.search,
        base: endpoints.course.base,
        reqBody: { keyword: searchInput, ...advancedSearchData },
      });

      if (response) {
        setSearchResults(response.results);
        setShowResults(true);
      }

      console.log(response.results)
    } catch (error) {
      console.error(error);
    }
  
  };

  

  const handleAdvancedSearchToggle = () => {
    setAdvancedSearch(!advancedSearch);
     setSearchInput("");
  };

  return (
    <Box sx={{ width: "100%", ml: { xs: 0, md: 1 } }}>
      <FormControl sx={{ width: { xs: "100%", md: 224 } }}>
        <OutlinedInput
          size="small"
          id="header-search"
          startAdornment={
            <InputAdornment position="start" sx={{ mr: -0.5 }}>
              <SearchOutlined />
            </InputAdornment>
          }
          aria-describedby="header-search-text"
          inputProps={{
            "aria-label": "weight",
          }}
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
      <Button onClick={handleAdvancedSearchToggle}>
        {advancedSearch ? "Hide Advanced Search" : "Advanced Search"}
      </Button>
      {advancedSearch && (
        <Box sx={{ width: "100%", ml: { xs: 0, md: 1 } }}>
          <TextField
            label="ERP"
            value={advancedSearchData.erp}
            onChange={(e) =>
              setAdvancedSearchData({
                ...advancedSearchData,
                erp: e.target.value,
              })
            }
          />
          <TextField
            label="Instructor"
            value={advancedSearchData.instructor}
            onChange={(e) =>
              setAdvancedSearchData({
                ...advancedSearchData,
                instructor: e.target.value,
              })
            }
          />
          <TextField
            label="Title"
            value={advancedSearchData.title}
            onChange={(e) =>
              setAdvancedSearchData({
                ...advancedSearchData,
                title: e.target.value,
              })
            }
          />
          <TextField
            label="Days"
            value={advancedSearchData.days}
            onChange={(e) =>
              setAdvancedSearchData({
                ...advancedSearchData,
                days: e.target.value,
              })
            }
          />

          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Box>
      )}
      {showResults && <Muitable rows={searchResults} />}
    </Box>
  );
};

export default Search;
