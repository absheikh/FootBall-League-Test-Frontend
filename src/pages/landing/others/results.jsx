import React, { useState, useEffect } from "react";
import PageLayout from "../../../components/pageLayout";
import { Grid } from "@mui/material";
import SingleResult from "../../../components/singleResult";
import { axiosClient } from "../../../config/axios";

const Results = () => {
  const [results, setResults] = useState([]);

  const getResults = async () => {
    try {
      const res = await axiosClient.get(`/results`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setResults(res.data.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getResults();
  }, []);
  return (
    <PageLayout title="Results">
      <div className="wrapper">
        <Grid container spacing={2} my={10} alignItems={""}>
          {results.map((result) => (
            <Grid item xs={12} md={4}>
              <SingleResult result={result} />
            </Grid>
          ))}
        </Grid>
      </div>
    </PageLayout>
  );
};

export default Results;
