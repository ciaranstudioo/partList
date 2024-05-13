import * as React from "react";
import { useState, useEffect } from "react";
import {
  Outlet,
  Link,
  useLoaderData,
  Form,
  redirect,
  useNavigate,
} from "react-router-dom";
import { getContacts, createContact } from "../data/contacts";
import { authProvider } from "../data/authProvider";
import AuthStatus from "../components/AuthStatus";
import Copyright from "../components/Copyright";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Collapse from "@mui/material/Collapse";
import StarIcon from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Clear from "@mui/icons-material/Clear";

export async function action() {
  const contact = await createContact();
  return redirect(`/admin/contacts/${contact.id}/edit`);
}

export async function loader({ request }) {
  const contacts = await getContacts();
  const email = authProvider.email;

  if (!authProvider.isAuthenticated) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  } else {
    return { contacts, email };
  }
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    height: "100vh",
    overflowX: "hidden",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",

    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function Root() {
  // useState
  const [open, setOpen] = useState(false);
  const [openNestedList, setOpenNestedList] = useState(false);

  // functions
  // toggle menu drawer open / closed
  const toggleDrawer = () => {
    setOpen(!open);
    setOpenNestedList(!open);
  };
  // click handlers
  const handleNestedClick = () => {
    setOpen(true);
    setOpenNestedList(!openNestedList);
  };
  const { contacts } = useLoaderData();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [value, setValue] = useState(contacts[0]);
  const [inputValue, setInputValue] = useState("");
  const loading = value && contacts.length === 0;

  const handleListItemClick = (id) => {
    setSelectedIndex(id);
  };

  // mui theme
  const theme = createTheme({
    palette: {
      primary: {
        main: "#424242",
        light: "#E0E0E0",
      },
      secondary: {
        main: "#E0E0E0",
        light: "#E0E0E0",
      },
    },
  });

  // useEffect
  useEffect(() => {
    if (value) {
      navigate(`contacts/${value.id}`);
      handleListItemClick(value.id);
    }
  }, [value]);

  useEffect(() => {
    setValue(null);
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open} color="primary">
            <Toolbar
              sx={{
                pr: "0",
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              ></Typography>
              <Autocomplete
                clearIcon={
                  <Clear fontSize="small" sx={{ color: "primary.light" }} />
                }
                selectOnFocus={false}
                forcePopupIcon={false}
                aria-label="Search contacts"
                value={value}
                onChange={(event, newValue) => {
                  console.log("newValue: ", newValue);
                  setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                isOptionEqualToValue={(option, value) =>
                  option.first + " " + option.last ===
                  value.first + " " + value.last
                }
                getOptionLabel={(option) => option.first + " " + option.last}
                options={contacts}
                loading={loading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Participant"
                    size="small"
                    InputLabelProps={{
                      sx: {
                        "&": { color: "primary.light" },
                        "&:hover": { color: "primary.light" },
                        "&.Mui-focused": { color: "primary.light" },
                      },
                    }}
                  />
                )}
                sx={{
                  width: "25ch",
                  marginRight: "2ch",
                  "& .MuiOutlinedInput-input": {
                    "&": {
                      color: "primary.light",
                    },
                    "&:hover": {
                      color: "primary.light",
                    },
                    "&.Mui-focused": {
                      color: "primary.light",
                    },
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "primary.light",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.light",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.light",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #E0E0E0",
                    },
                  },
                }}
              />
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />

            <List component="nav">
              <Form method="post">
                <ListItemButton
                  onClick={() => handleListItemClick(null)}
                  type="submit"
                  component="button"
                  sx={{ width: "100%" }}
                >
                  <ListItemIcon>
                    <AddCircleOutlineOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="New" />
                </ListItemButton>
              </Form>
              <Divider sx={{ my: 1 }} />
              <ListItemButton onClick={handleNestedClick}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Members" />
                {openNestedList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              <Collapse in={openNestedList} timeout="auto" unmountOnExit>
                {contacts.length ? (
                  <List component="div" disablePadding>
                    {contacts.map((contact, index) => (
                      <ListItemButton
                        sx={{ pl: 3 }}
                        key={contact.id}
                        component={Link}
                        to={`contacts/${contact.id}`}
                        selected={selectedIndex === contact.id}
                        onClick={() => handleListItemClick(contact.id)}
                      >
                        <ListItemIcon>
                          {contact.favorite ? <StarIcon /> : <StarBorder />}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            contact.first || contact.last ? (
                              <>
                                {contact.first} {contact.last}
                              </>
                            ) : (
                              <i>No Name</i>
                            )
                          }
                        />
                      </ListItemButton>
                    ))}
                  </List>
                ) : (
                  <p>
                    <i>No contacts</i>
                  </p>
                )}
              </Collapse>
              <Divider sx={{ my: 1 }} />
              <AuthStatus />
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: "primary",
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      maxWidth: "77.5ch",
                    }}
                  >
                    <Outlet />
                  </Paper>
                </Grid>
              </Grid>
              <Copyright
                sx={{
                  pt: 2.5,
                  pr: { md: 20 },
                }}
              />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
