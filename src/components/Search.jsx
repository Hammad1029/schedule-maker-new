import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputAdornment,
  OutlinedInput,
  Button,
  TextField,
  Box,
  Grid,
  ButtonGroup,
} from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import httpService from "../utils/http.js";
import { endpoints } from "../utils/http.js";
import { useFormik } from 'formik';
import SearchResults from "./SearchResults.jsx";
import Muitable from "./MuiTable";

const Search = ({ addCourses }) => {
  const [searchResults, setSearchResults] = useState({
    results: [],
    currentPage: 0,
    totalResults: 0,
    totalPages: 0,
    hasNextPage: false,
    pageSize: 0,
    loading: false
  });

  const [selected, setSelected] = useState([]);
  const selectCourses = (ids) =>
    setSelected(searchResults.results.filter((row) => ids.includes(row.id)))


  const [advanced, setAdvanced] = useState(false);

  const toggleAdvanced = () => {
    setAdvanced(prev => !prev);
    formik.setValues(initialValues)
  }

  useEffect(() => {
    handleSearch(initialValues)
  }, [])

  const initialValues = {
    keyword: "",
    erp: "",
    instructor: "",
    title: "",
    days: "",
    page: 1,
    pageSize: 10
  }

  const handleSearch = async (values) => {
    try {
      setSearchResults(prev => ({ ...prev, loading: true }))
      const response = await httpService({
        endpoint: endpoints.course.search,
        base: endpoints.course.base,
        reqBody: values,
      });
      if (response) setSearchResults(response);
    } catch (error) {
      console.error(error);
    } finally {
      setSearchResults(prev => ({ ...prev, loading: false }))
    }
  }

  const handlePageChange = async (page) => handleSearch({ ...formik.values, page })

  const formik = useFormik({
    initialValues,
    onSubmit: handleSearch
  });

  return (
    <Box component="form">
      <Grid spacing={1} container>
        {advanced ? (
          <>
            <Grid item xs={6}>
              <TextField
                label="ERP"
                name="erp"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.erp}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Instructor"
                name="instructor"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.instructor}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Title"
                name="title"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.title}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Days"
                name="days"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.days}
              />
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <OutlinedInput
              fullWidth
              size="small"
              startAdornment={
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              }
              placeholder="Search"
              name="keyword"
              onChange={formik.handleChange}
              value={formik.values.keyword}
            />
          </Grid>
        )}
        <ButtonGroup sx={{ ml: "auto", mt: 1 }} variant="contained">
          <Button onClick={() => addCourses(selected)}>Add Selected</Button>
          <Button variant="contained" onClick={toggleAdvanced}>
            {advanced ? "Keyword Search" : "Advanced Search"}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={formik.handleSubmit}
          >
            Search
          </Button>
        </ButtonGroup>
      </Grid>
      {/* <SearchResults selectCourses={selectCourses} handlePageChange={handlePageChange} data={searchResults} /> */}
      {/* <Muitable /> */}
      {<Muitable handlePageChange={handlePageChange} searchResults={searchResults} selectCourses={selectCourses} />}
    </Box>
  );
};

export default Search;
