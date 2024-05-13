import { useFetcher } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function AuthStatus() {
  let fetcher = useFetcher();
  let isLoggingOut = fetcher.formData != null;

  return (
    <div>
      <fetcher.Form method="post" action="/logout">
        <ListItemButton
          component="button"
          sx={{ width: "100%" }}
          type="submit"
          disabled={isLoggingOut}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary={isLoggingOut ? "Signing out..." : "Sign out"}
          />
        </ListItemButton>
      </fetcher.Form>
    </div>
  );
}
