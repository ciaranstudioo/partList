import { Form, useLoaderData, useFetcher } from "react-router-dom";
import { getContact, updateContact } from "../data/contacts";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import StarIcon from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import IconButton from "@mui/material/IconButton";

export async function action({ request, params }) {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { contact };
}

export default function Contact() {
  const { contact } = useLoaderData();

  return (
    <>
      <Box
        sx={{
          position: "relative",
          p: { xs: 3, md: 6 },
          pr: { md: 0 },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Typography
            component="h4"
            variant="h4"
            color="inherit"
            gutterBottom
            sx={{ flexGrow: 1, color: "#424242", mb: 2 }}
          >
            {contact.first || contact.last ? (
              <>
                {contact.first} {contact.last}
              </>
            ) : (
              <i>No Name</i>
            )}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", mb: 1, pr: { xs: 0, sm: 1, md: 6 } }}>
          <Favorite contact={contact} />
          <Form action="edit">
            <Button
              type="submit"
              component="button"
              variant="outlined"
              color="primary"
              sx={{ mx: 1 }}
            >
              Edit
            </Button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <Button
              type="submit"
              component="button"
              variant="outlined"
              color="error"
            >
              Delete
            </Button>
          </Form>
        </Box>

        <Typography variant="subtitle1" color="inherit" sx={{ mt: 0, py: 0 }}>
          {contact.instagram && (
            <Link
              href={`https://instagram.com/${contact.instagram}`}
              rel="noreferrer"
              sx={{ mr: 3, textDecoration: "none" }}
            >
              {contact.instagram}
            </Link>
          )}
        </Typography>
        <Typography variant="subtitle1" color="inherit" sx={{ mt: 0 }}>
          {contact.website && (
            <Link
              href={`https://instagram.com/${contact.instagram}`}
              rel="noreferrer"
              sx={{ textDecoration: "none" }}
            >
              {contact.website}
            </Link>
          )}
        </Typography>

        <Typography
          variant="body2"
          color="inherit"
          paragraph
          sx={{ pt: 1, pr: { sm: 2, md: 6 }, color: "#455A64" }}
        >
          {contact.notes && <>{contact.notes}</>}
        </Typography>
      </Box>
    </>
  );
}

function Favorite({ contact }) {
  const fetcher = useFetcher();

  let favorite = contact.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <fetcher.Form method="post">
      <IconButton
        type="submit"
        component="button"
        name="favorite"
        value={favorite ? "false" : "true"}
        sx={{ p: 0 }}
      >
        {favorite ? <StarIcon /> : <StarBorder />}
      </IconButton>
    </fetcher.Form>
  );
}
