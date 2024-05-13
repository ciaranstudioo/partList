import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateContact } from "../data/contacts";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/admin/contacts/${params.contactId}`);
}

export default function EditContact() {
  const { contact } = useLoaderData();
  const navigate = useNavigate();
  console.log(contact);

  return (
    <>
      <Form method="post">
        <Box
          sx={{
            "& > :not(style)": { p: 1, width: "100%" },
          }}
        >
          <Box
            sx={{
              maxWidth: "md",
            }}
          >
            <TextField
              id="outlined-uncontrolled"
              label="First name"
              name="first"
              defaultValue={contact.first}
              size="small"
              sx={{ mr: 1, mb: { xs: 1, sm: 0 }, input: { color: "#546E7A" } }}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Last name"
              name="last"
              defaultValue={contact.last}
              size="small"
              sx={{ mr: 1, input: { color: "#546E7A" } }}
            />
          </Box>
          <Box
            sx={{
              maxWidth: "md",
            }}
          >
            <TextField
              id="outlined-uncontrolled"
              label="@instagram"
              defaultValue={contact.instagram}
              name="instagram"
              size="small"
              sx={{ mr: 1, mb: { xs: 1, sm: 0 }, input: { color: "#607D8B" } }}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Artist website"
              defaultValue={contact.website}
              name="website"
              size="small"
              sx={{ mr: 1, mb: 1, input: { color: "#607D8B" } }}
            />
          </Box>

          <TextField
            id="outlined-uncontrolled"
            label="Artist bio..."
            defaultValue={contact.notes}
            multiline
            minRows={12}
            name="notes"
            size="small"
            inputProps={{ style: { color: "#546E7A" } }}
          />
        </Box>

        <Box sx={{ display: "flex", pl: 0.25, pt: 1 }}>
          <Button
            type="submit"
            component="button"
            variant="outlined"
            color="primary"
            sx={{ ml: 0.75, mr: 1.25 }}
          >
            Save
          </Button>

          <Button
            component="button"
            variant="outlined"
            color="warning"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </Button>
        </Box>
      </Form>
    </>
  );
}
