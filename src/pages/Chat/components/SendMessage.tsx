import Grid from "@mui/material/Grid2";
import { IconButton, TextField } from "@mui/material";
import { FaFileUpload } from "react-icons/fa";
import { useSendMessage } from "../../../api/chats";
import { useChat } from "../Store/chatStore";
import { IoSend } from "react-icons/io5";
import { useFormik } from "formik";

const SendMessage = () => {
  const sendMessags = useSendMessage();
  const { selectedUser } = useChat();
  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      content: "",
      file: null,
    },
    onSubmit: (values, { resetForm }) => {
      sendMessags.mutateAsync({ ...values, user_id: selectedUser?.id });
      resetForm();
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <Grid container gap={1} alignItems={"center"}>
        <Grid size="grow">
          <TextField
            fullWidth
            value={values.content}
            onChange={handleChange}
            name="content"
            placeholder="type a message"
            sx={{
              "& .MuiFilledInput-input": {
                paddingTop: "15px",
              },
            }}
            variant="filled"
          />
        </Grid>
        <Grid size="auto">
          <IconButton
            sx={{
              borderRadius: "8px",
            }}
            color="default"
          >
            <FaFileUpload />
          </IconButton>
        </Grid>
        <Grid size="auto">
          <IconButton
            type="submit"
            sx={{
              borderRadius: "8px",
            }}
            color="primary"
          >
            <IoSend />
          </IconButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default SendMessage;
