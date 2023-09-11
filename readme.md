# ✨ Marp UI ✨

A simple interface for creating and exporting Marp presentations.

## Features

- 🛠️ custom tools for creating and editing presentations
- 📩 Export to PDF, PPTX, and MD
- 💾 Save presentations to your browser
- 🖼️ upload and crop images to your presentations
- 💄 Prettiefying your markdown


## pre-requisites

- [Node.js](https://nodejs.org/en/download/current)
- [marp-cli](https://github.com/marp-team/marp-cli)
- [npm concurrently](https://www.npmjs.com/package/concurrently) 

## Installation

```bash
    npm run init
```
This will run the install command for both the frond and back end.

## Usage

```bash
    npm run start
```
This will run the start command for both the frond and back end.

## docs 

### Layout
#### Columns
Select the columns tool and choose a style to insert it in your document
- 2 Columns
- 3 Columns
- Auto Columns

#### Rows
Select the rows tool and choose a style to insert it in your document
- 2 Rows
- 3 Rows
- Auto Rows

### Marks
Select the mark tool and choose a style to insert it in your document
- Info
- Question
- Success
- Warning
- Error

### Table Colors
While the whole table highlighted select the table color tool and choose a style to insert it in your document
- Default yellow
- Green
- Blue

### Keyboard
Select the keyboard tool to insert it in your document

### Challenge
Select the challenge tool to insert it in your document

### Shortcuts
| Shortcut | Action | Description |
| --- | --- | --- |
| TAB | Insert space | Insert space, the length equal to `tabWidth`, default: 2, supports multiline |
| SHIFT + TAB | Delete space | Delete space, setting is the same as `TAB` |
| CTRL + C | Copy | When selected, copy the selected content. When not selected, copy the content of the current line |
| CTRL + X | Cut | When selected, cut the selected content. When not selected, cut the current line |
| CTRL + D | Delete | When selected, delete the selected content. When not selected, delete the current line |
| CTRL + S | Save | Trigger `onSave` event |
| CTRL + B | Bold text | `**bold**` |
| CTRL + U | Underline | `<u>underline</u>` |
| CTRL + I | Italic | `*italic*` |
| CTRL + 1-6 | Heading | `# title` |
| CTRL + ↑ | Superscript | `<sup>superscript</sup>` |
| CTRL + ↓ | Subscript | `<sub>subscript</sub>` |
| CTRL + O | Ordered list | `1. ordered list` |
| CTRL + L | Link | `[link](https://github.com/imzbf/md-editor-v3)` |
| CTRL + Z | Undo | Undo history in editor, not the function of system |
| CTRL + SHIFT + S | Strikethrough | `~line-through~` |
| CTRL + SHIFT + U | Unordered list | `- unordered list` |
| CTRL + SHIFT + C | Code block |  |
| CTRL + SHIFT + I | Image | `![picture](https://imzbf.cc)` |
| CTRL + SHIFT + Z | Redo | Redo history in editor, not the function of system |
| CTRL + SHIFT + F | Beautify | Format markdown  |
| CTRL + ALT + C | Inline code |  |
| CTRL + SHIFT + ALT + T | Table | `|table|` |