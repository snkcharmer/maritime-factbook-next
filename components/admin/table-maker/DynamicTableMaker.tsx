"use client";

import { useEffect, useState } from "react";
import {
  Button,
  TextInput,
  Select,
  Stack,
  SimpleGrid,
  Space,
  Title,
  Group,
  Drawer,
  Text,
} from "@mantine/core";
import { IconLink } from "@tabler/icons-react";
import { useFbCategory, useFbTable, useUser } from "@/hooks";
import {
  IFbSubCategoryByCategoryResponse,
  IFbTable,
  TFbTableResponse,
} from "@/types";
import { useDisclosure } from "@mantine/hooks";
import { FakeSkeleton, Toastify } from "@/components/reusable";
import { createPath } from "@/utils/route";
import { ADMIN_ROUTES } from "@/constants";
import UpsertTableMaker from "./UpsertTableMaker";
import { enumToDropdownOptions } from "@/utils/transform";
import { ChartTypesEnum } from "@/context/enum";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";

export default function DynamicTableMaker({ data }: { data?: IFbTable }) {
  const [opened, { open, close }] = useDisclosure(false);
  const {
    data: categories,
    fetchFbCategories,
    loading: fetchingCategories,
  } = useFbCategory<IFbSubCategoryByCategoryResponse>();
  const {
    data: fbTables,
    fetchFbTables,
    loading: fetchingFbTables,
  } = useFbTable<TFbTableResponse>();
  const { createFbTable, updateFbTable } = useFbTable();
  const { user } = useUser();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedChartType, setSelectedChartType] = useState<ChartTypesEnum>(
    ChartTypesEnum.BAR
  );
  const [tableName, setTableName] = useState<string>("");
  const [tableSource, setTableSource] = useState<string>("");
  const [tableNote, setTableNote] = useState<string>("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: tableNote,
    onUpdate: ({ editor }) => {
      setTableNote(editor.getHTML());
    },
  });

  const resetForm = () => {
    setTableName("");
    setTableNote("");
    setTableSource("");
  };

  const saveTable = async (tblData: any) => {
    const formData = {
      fbCategoryId: selectedCategory || "",
      userId: user?.id,
      name: tableName,
      source: tableSource,
      note: tableNote,
      chartType: selectedChartType,
      data: tblData,
    };
    try {
      let res;
      if (!data) {
        res = await createFbTable(formData);
        resetForm();
      } else {
        res = await updateFbTable(data.id!, formData);
      }
      if (!res) {
        Toastify({ message: res || "", type: "warning" });
        return;
      }

      Toastify({ message: "Table successfully saved.", type: "success" });
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    fetchFbCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      setTableName(data.name);
      setTableSource(data.source);
      setTableNote(data.note);
      setSelectedCategory(String(data.fbCategory?.id));
      setSelectedChartType(data.chartType);
    }
  }, [data]);

  useEffect(() => {
    if (editor && data) {
      editor.commands.setContent(data.note || "");
    }
  }, [editor, data]);

  return (
    <>
      <Stack gap={10}>
        <SimpleGrid cols={2}>
          <Select
            value={selectedCategory || ""}
            onChange={(val) => {
              setSelectedCategory(val);
            }}
            data={
              categories?.data.map(({ name, id }) => ({
                label: name,
                value: String(id),
              })) || []
            }
            placeholder="Select Category"
            label="Category"
            disabled={fetchingCategories}
          />

          <TextInput
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            placeholder="Enter Table Name"
            label="Table Name"
          />
        </SimpleGrid>
        <SimpleGrid cols={2}>
          <Select
            value={selectedChartType || ChartTypesEnum.BAR}
            // value="Bar"
            onChange={(value) => setSelectedChartType(value as ChartTypesEnum)}
            data={enumToDropdownOptions(ChartTypesEnum)}
            placeholder="Select Chart Type"
            label="Chart Type"
            // disabled
          />
          <TextInput
            value={tableSource}
            onChange={(e) => setTableSource(e.target.value)}
            placeholder="Enter Table Source"
            label="Table Source"
          />
        </SimpleGrid>
        <Text mb={0}>Description</Text>
        <RichTextEditor editor={editor}>
          <RichTextEditor.Toolbar sticky stickyOffset={60}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Highlight />
              <RichTextEditor.Code />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
              <RichTextEditor.H4 />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Blockquote />
              <RichTextEditor.Hr />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
              <RichTextEditor.Subscript />
              <RichTextEditor.Superscript />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.AlignLeft />
              <RichTextEditor.AlignCenter />
              <RichTextEditor.AlignJustify />
              <RichTextEditor.AlignRight />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Undo />
              <RichTextEditor.Redo />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content />
        </RichTextEditor>
        {/* <Textarea
          label="Description:"
          onChange={(e) => setTableNote(e.target.value)}
          minRows={4}
          rows={5}
        /> */}
      </Stack>
      <Space h={40} />
      <Group justify="space-between">
        <Title order={4}>Table Preview</Title>
        <Button
          size="xs"
          onClick={() => {
            open();
            fetchFbTables();
          }}
        >
          Recently Added
        </Button>
      </Group>
      <Drawer
        opened={opened}
        onClose={close}
        title="Added tables"
        position="right"
      >
        <Stack>
          {fetchingFbTables ? (
            <FakeSkeleton rows={5} />
          ) : (
            fbTables?.data.map((val, idx) => {
              return (
                <Button
                  component="a"
                  href={createPath({
                    path: ADMIN_ROUTES.resourceCategoriesTable,
                    dynamicParams: {
                      fbCategorySlug: String(val.fbCategory?.slug),
                      fbTableSlug: val.slug,
                    },
                  })}
                  variant="default"
                  leftSection={<IconLink size={16} />}
                  key={idx}
                  className="truncate max-w-auto text-xs"
                >
                  {val.name}
                </Button>
              );
            })
          )}
        </Stack>
      </Drawer>
      <UpsertTableMaker
        onSave={(data) => saveTable(data)}
        data={data?.data[0]}
      />
      <Space h={300} />
    </>
  );
}
