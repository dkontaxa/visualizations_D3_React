import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function OutlinedCard(props) {
  const { title, subtitle, subtitle2, description, buttonText } = props;
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {subtitle}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {subtitle2}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{buttonText}</Button>
      </CardActions>
    </React.Fragment>
  );

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
