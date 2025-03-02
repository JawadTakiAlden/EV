import {
  alpha,
  Box,
  Button,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import {
  Editor,
  EditorState,
  RichUtils,
  ContentState,
  convertFromHTML,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { useEffect, useState } from "react";
import useGetGetDarkValue from "../../../utils/useGetGetDarkValue";
import { VscListOrdered } from "react-icons/vsc";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { useGetTerms, useUpdateTerms } from "../../../api/info";
import LoadingDataError from "../../../components/LoadingDataError";
import { LoadingButton } from "@mui/lab";
import { stateToHTML } from "draft-js-export-html";
import { useTranslation } from "react-i18next";

const TextEditorButton = styled(IconButton)(({ theme }) => ({
  borderRadius: "6px",
  backgroundColor: alpha(theme.palette.primary.light, 0.05),
  fontSize: "14px",
  minWidth: "30px",
}));

const TermsAndConditions = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [editorStateAR, setEditorStateAR] = useState(() =>
    EditorState.createEmpty()
  );

  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<"ar" | "en">(
    i18n.language as "ar" | "en"
  );

  const terms = useGetTerms();

  const updateTerms = useUpdateTerms();

  const { getVlaue } = useGetGetDarkValue();

  const handleKeyCommand = (command: string) => {
    const newState = RichUtils.handleKeyCommand(
      selectedLanguage === "ar" ? editorStateAR : editorState,
      command
    );
    if (newState) {
      selectedLanguage === "ar"
        ? setEditorStateAR(newState)
        : setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleInlineStyle = (style: string) => {
    selectedLanguage === "ar"
      ? setEditorStateAR(RichUtils.toggleInlineStyle(editorStateAR, style))
      : setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (blockType: string) => {
    selectedLanguage === "ar"
      ? setEditorStateAR(RichUtils.toggleBlockType(editorStateAR, blockType))
      : setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const handleSave = () => {
    const htmlContentAR = stateToHTML(editorStateAR.getCurrentContent());
    const htmlContentEN = stateToHTML(editorState.getCurrentContent());

    updateTerms.mutate({
      content_ar: htmlContentAR,
      content: htmlContentEN,
    });
  };

  useEffect(() => {
    if (!terms.isLoading && !terms.isError && terms.data?.data) {
      const html = terms.data.data.content;
      const htmlAr = terms.data.data.content_ar;

      const blocksFromHTML = convertFromHTML(html);
      const blocksFromHTML_AR = convertFromHTML(htmlAr);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      const contentStateAr = ContentState.createFromBlockArray(
        blocksFromHTML_AR.contentBlocks,
        blocksFromHTML_AR.entityMap
      );

      setEditorState(EditorState.createWithContent(contentState));
      setEditorStateAR(EditorState.createWithContent(contentStateAr));
    }
  }, [terms.isLoading, terms.isError, terms.data]);

  if (terms.isLoading) {
    return <Typography>{t("global.loading")} ...</Typography>;
  }

  if (terms.isError) {
    return <LoadingDataError refetch={terms.refetch} />;
  }

  return (
    <Box>
      <Box
        sx={{
          minHeight: "400px",
          backgroundColor: "background.paper",
          mb: 1,
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: (theme) =>
            `1px 1px 15px -5px ${getVlaue(
              theme.palette.grey[800],
              theme.palette.grey[400]
            )}`,
        }}
      >
        <Box>
          <Stack
            flexDirection={"row"}
            gap={1}
            alignItems={"flex-start"}
            flexWrap={"nowrap"}
          >
            <Stack
              gap={0.5}
              flexDirection={"column"}
              sx={{
                p: 1,
                //   backgroundColor: getVlaue("grey.900", "grey.200"),
                borderRadius: "8px",
              }}
            >
              <Stack flexDirection={"row"} gap={0.5}>
                <TextEditorButton onClick={() => toggleInlineStyle("BOLD")}>
                  B
                </TextEditorButton>
                <TextEditorButton onClick={() => toggleInlineStyle("ITALIC")}>
                  I
                </TextEditorButton>
              </Stack>
              <Stack flexDirection={"row"} gap={0.5}>
                <TextEditorButton
                  onClick={() => toggleBlockType("ordered-list-item")}
                >
                  <VscListOrdered />
                </TextEditorButton>
                <TextEditorButton
                  onClick={() => toggleBlockType("unordered-list-item")}
                >
                  <AiOutlineUnorderedList />
                </TextEditorButton>
              </Stack>
            </Stack>
            <Stack
              gap={0.5}
              flexDirection={"column"}
              sx={{
                p: 1,
                //   backgroundColor: getVlaue("grey.900", "grey.200"),
                borderRadius: "8px",
              }}
            >
              <Stack gap={0.5} flexDirection={"row"}>
                <TextEditorButton onClick={() => toggleBlockType("header-one")}>
                  h1
                </TextEditorButton>
                <TextEditorButton onClick={() => toggleBlockType("header-two")}>
                  h2
                </TextEditorButton>
                <TextEditorButton
                  onClick={() => toggleBlockType("header-three")}
                >
                  h3
                </TextEditorButton>
              </Stack>
              <Stack gap={0.5} flexDirection={"row"}>
                <TextEditorButton
                  onClick={() => toggleBlockType("header-four")}
                >
                  h4
                </TextEditorButton>
                <TextEditorButton
                  onClick={() => toggleBlockType("header-five")}
                >
                  h5
                </TextEditorButton>
                <TextEditorButton onClick={() => toggleBlockType("header-six")}>
                  h6
                </TextEditorButton>
              </Stack>
            </Stack>
          </Stack>
        </Box>
        <Box
          sx={{
            p: 1,
            backgroundColor: getVlaue("grey.900", "grey.100"),
            "& .DraftEditor-root": {
              minHeight: "400px",
            },
          }}
        >
          <Stack flexDirection={"row"} justifyContent={"center"} gap={1} mb={2}>
            <Button
              variant={selectedLanguage === "ar" ? "contained" : "outlined"}
              onClick={() => setSelectedLanguage("ar")}
            >
              العربية
            </Button>
            <Button
              variant={selectedLanguage === "en" ? "contained" : "outlined"}
              onClick={() => setSelectedLanguage("en")}
            >
              English
            </Button>
          </Stack>
          <Editor
            editorState={
              selectedLanguage === "ar" ? editorStateAR : editorState
            }
            onChange={
              selectedLanguage === "ar" ? setEditorStateAR : setEditorState
            }
            handleKeyCommand={handleKeyCommand}
            placeholder={t("editor.placeholder")}
          />
        </Box>
      </Box>
      <LoadingButton
        variant="contained"
        loading={updateTerms.isPending}
        onClick={handleSave}
      >
        {t("gbtn.save")}
      </LoadingButton>
    </Box>
  );
};

export default TermsAndConditions;
