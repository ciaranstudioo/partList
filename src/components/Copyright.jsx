import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { authProvider } from "../data/authProvider";

export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {/* {"Copyright © "} */}
      <Link
        component={Link}
        color="inherit"
        to={"/"}
        onClick={() => {
          authProvider.signout();
        }}
        style={{ textDecoration: "none", color: "#9E9E9E" }}
      >
        {"(working title) "} {new Date().getFullYear()}
      </Link>
    </Typography>
  );
}
