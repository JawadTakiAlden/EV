import { Box, IconButton, styled, TextField } from "@mui/material";
import { useSendMessage } from "../../../api/chats";
import { useFormik } from "formik";
import { IoIosSend } from "react-icons/io";
import { IoDocumentText } from "react-icons/io5";
import { useChatContext } from "../../../providers/ChatProvider";

const ChatInputWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
  padding: theme.spacing(1),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

const ChatTextField = styled(TextField)(({ theme }) => ({
  flexGrow: 1,
  "& .MuiInputBase-root": {
    borderRadius: 25,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[200],
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
}));

const SendButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const SendMessage = () => {
  const sendMessags = useSendMessage();
  const { userSelectedId } = useChatContext();
  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      content: "",
      file: null,
    },
    onSubmit: (values, { resetForm }) => {
      sendMessags.mutateAsync({ ...values, user_id: userSelectedId });
      resetForm();
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <ChatInputWrapper>
        {!values.content && (
          <SendButton
            disabled={!!values.content}
            sx={{
              transition: "0.2s",
            }}
          >
            <IoDocumentText />
          </SendButton>
        )}
        <ChatTextField
          autoComplete="off"
          autoCorrect="off"
          placeholder="Message..."
          variant="outlined"
          size="small"
          name="content"
          value={values.content}
          onChange={handleChange}
        />
        <SendButton type="submit">
          <IoIosSend />
        </SendButton>
      </ChatInputWrapper>
    </form>
  );
};

export default SendMessage;
