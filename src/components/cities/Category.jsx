import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const Category = ({ title, data }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        {data.map((item, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              width: "30%",
              minWidth: "250px",
              p: 2,
              textAlign: "center",
              borderRadius: "8px",
            }}
          >
            <img
              src={item.imageUrl || "https://via.placeholder.com/300"}
              alt={item.name}
              style={{ width: "100%", height: "150px", borderRadius: "8px" }}
            />
            <Typography variant="h6" sx={{ mt: 1 }}>
              {item.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {item.description}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Category;