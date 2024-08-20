"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import Placeholder from "@tiptap/extension-placeholder";

import {
  PiTextHOne,
  PiTextHTwo,
  PiTextHThree,
  PiTextHFour,
  PiParagraph,
  PiCode,
  PiTextB,
  PiTextItalic,
  PiTextStrikethrough,
  PiTextUnderline,
  PiHighlighter,
  PiTextAlignLeft,
  PiTextAlignRight,
  PiTextAlignCenter,
  PiTextAlignJustify,
  PiQuotes,
  PiLineVertical,
  PiSplitVertical,
  PiListNumbersLight,
  PiListBulletsLight,
} from "react-icons/pi";

import { LiaUndoAltSolid, LiaRedoAltSolid } from "react-icons/lia";

const MenuBar = ({ editor }: { editor: ReturnType<typeof useEditor> }) => {
  if (!editor) {
    return null;
  }

  const headings = [1, 2, 3, 4] as const;
  const icons = [
    <PiTextHOne key={0} />,
    <PiTextHTwo key={1} />,
    <PiTextHThree key={2} />,
    <PiTextHFour key={3} />,
  ] as const;

  return (
    <div className="rounded-t-lg grid grid-cols-12 md:grid-cols-15 place-items-center gap-1 [&>button]:p-2 [&>button]:rounded-md [&>button:hover]:bg-default-200 [&>button:hover]:text-black">
      <button
        type="button"
        title="Undo"
        onClick={() => editor.chain().focus().undo().run()}
      >
        <LiaUndoAltSolid />
      </button>
      <button
        type="button"
        title="Redo"
        onClick={() => editor.chain().focus().redo().run()}
      >
        <LiaRedoAltSolid />
      </button>
      <span className="h-6 border-l border-solid border-default-300"></span>
      {headings.map((level, index) => (
        <button
          key={level}
          type="button"
          title={`Heading ${level}`}
          onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
          className={
            editor.isActive("heading", { level }) ? "bg-black text-white" : ""
          }
        >
          {icons[index]}
        </button>
      ))}
      {/* <button
        type="button"
        title="Heading 1"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 }) ? "bg-black text-white" : ""
        }
      >
        <PiTextHOne />
      </button>
      <button
        type="button"
        title="Heading 2"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 }) ? "bg-black text-white" : ""
        }
      >
        <PiTextHTwo />
      </button>
      <button
        type="button"
        title="Heading 3"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 }) ? "bg-black text-white" : ""
        }
      >
        <PiTextHThree />
      </button>
      <button
        type="button"
        title="Heading 4"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={
          editor.isActive("heading", { level: 4 }) ? "bg-black text-white" : ""
        }
      >
        <PiTextHFour />
      </button> */}
      <button
        type="button"
        title="Paragraph"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "bg-black text-white" : ""}
      >
        <PiParagraph />
      </button>
      <button
        type="button"
        title="Code"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("code") ? "bg-black text-white" : ""}
      >
        <PiCode />
      </button>
      <button
        type="button"
        title="Bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-black text-white" : ""}
      >
        <PiTextB />
      </button>
      <button
        type="button"
        title="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-black text-white" : ""}
      >
        <PiTextItalic />
      </button>
      <button
        type="button"
        title="Underline"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "bg-black text-white" : ""}
      >
        <PiTextUnderline />
      </button>
      <button
        type="button"
        title="Strikethrough"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "bg-black text-white" : ""}
      >
        <PiTextStrikethrough />
      </button>
      <button
        type="button"
        title="Highlight"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={editor.isActive("highlight") ? "bg-black text-white" : ""}
      >
        <PiHighlighter />
      </button>
      <span className="h-6 border-l border-solid border-default-300"></span>
      <button
        type="button"
        title="Align Left"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={
          editor.isActive({ textAlign: "left" }) ? "bg-black text-white" : ""
        }
      >
        <PiTextAlignLeft />
      </button>
      <button
        type="button"
        title="Align Center"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={
          editor.isActive({ textAlign: "center" }) ? "bg-black text-white" : ""
        }
      >
        <PiTextAlignCenter />
      </button>
      <button
        type="button"
        title="Align Right"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={
          editor.isActive({ textAlign: "right" }) ? "bg-black text-white" : ""
        }
      >
        <PiTextAlignRight />
      </button>
      <button
        type="button"
        title="Justify"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={
          editor.isActive({ textAlign: "justify" }) ? "bg-black text-white" : ""
        }
      >
        <PiTextAlignJustify />
      </button>
      <button
        type="button"
        title="Blockquote"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "bg-black text-white" : ""}
      >
        <PiQuotes />
      </button>
      <button
        type="button"
        title="Horizontal Rule"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <PiLineVertical className="rotate-90" />
      </button>
      <button
        type="button"
        title="Line Break"
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        <PiSplitVertical />
      </button>
      <button
        type="button"
        title="Bullet list"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-black text-white" : ""}
      >
        <PiListBulletsLight />
      </button>
      <button
        type="button"
        title="Numbered list"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "bg-black text-white" : ""}
      >
        <PiListNumbersLight />
      </button>
    </div>
  );
};

export const Editor = ({
  html,
  setHtml,
  placeholder = "Start writing here...",
}: {
  html?: string;
  setHtml?: (html: string) => void;
  placeholder?: string;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        HTMLAttributes: {
          class: "m-0",
        },
      }),
      Paragraph.configure({
        HTMLAttributes: {
          class: "m-0 text-sm",
        },
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: "m-0",
        },
      }),
      Underline,
      Code,
      Placeholder.configure({
        placeholder,
        emptyNodeClass:
          "first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none",
      }),
      CodeBlock,
    ],
    content: ``,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      if (setHtml) {
        setHtml(editor.getHTML());
      }
    },
  });

  return (
    <div className="w-full flex flex-col justify-start items-start gap-4">
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="prose prose-code:font-mono [&>div]:bg-default-100 [&>div]:border-none [&>div]:outline-none w-full [&>div]:min-h-24 [&>div]:hover:bg-default-200 [&>div]:transition-all [&>div]:w-full [&>div]:rounded-lg [&>div]:p-4 flex-1"
      />
    </div>
  );
};
