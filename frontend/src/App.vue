<script setup>
import { MdEditor, NormalToolbar, DropdownToolbar } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { ref, onMounted } from "vue";
import Spinner from "./components/spinner.vue";
</script>

<template>
  <div>
    <div class="layout">
      <div class="left">
        <MdEditor
          :model-value="src"
          @onSave="handleSave"
          @onChange="setSource"
          language="en-US"
          preview="false"
          theme="dark"
          :toolbars="toolbars"
          @onUploadImg="onUploadImg"
          :footers="footerEditor"
          ref="editorRef"
        >
          <template #defToolbars>
            <DropdownToolbar
              :visible="visible"
              title="columns"
              @onChange="handleVisibleChangeColumns"
            >
              <template #trigger>
                <div class="md-editor-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22"
                    viewBox="0 -960 960 960"
                    width="22"
                  >
                    <path
                      d="M140-220h187v-520H140v520Zm247 0h186v-520H387v520Zm246 0h187v-520H633v520Zm-493 60q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Z"
                    />
                  </svg>
                </div>
              </template>
              <template #overlay>
                <div>
                  <p @click="columns2">2 Columns</p>
                  <p @click="columns3">3 Columns</p>
                  <p @click="columnsAuto">Auto Columns</p>
                </div>
              </template>
            </DropdownToolbar>
            <DropdownToolbar
              :visible="visible"
              title="rows"
              @onChange="handleVisibleChangeRows"
            >
              <template #trigger>
                <div class="md-editor-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22"
                    viewBox="0 -960 960 960"
                    width="22"
                  >
                    <path
                      d="M780-180v-157H180v157h600Zm0-217v-166H180v166h600Zm0-226v-157H180v157h600ZM180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Z"
                    />
                  </svg>
                </div>
              </template>
              <template #overlay>
                <div>
                  <p @click="rows2">2 Rows</p>
                  <p @click="rows3">3 Rows</p>
                  <p @click="rowsAuto">Auto Rows</p>
                </div>
              </template>
            </DropdownToolbar>
            <DropdownToolbar
              :visible="visible"
              title="mark"
              @onChange="handleVisibleChangeMark"
            >
              <template #trigger>
                <div class="md-editor-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22"
                    viewBox="0 -960 960 960"
                    width="22"
                  >
                    <path
                      d="M479.911-120Q451-120 430.5-140.589q-20.5-20.588-20.5-49.5Q410-219 430.589-239.5q20.588-20.5 49.5-20.5Q509-260 529.5-239.411q20.5 20.588 20.5 49.5Q550-161 529.411-140.5q-20.588 20.5-49.5 20.5ZM410-360v-480h140v480H410Z"
                    />
                  </svg>
                </div>
              </template>
              <template #overlay>
                <div>
                  <p @click="markInfo">Info</p>
                  <p @click="markQuestion">Question</p>
                  <p @click="markSuccess">Success</p>
                  <p @click="markWarning">Warning</p>
                  <p @click="markError">Error</p>
                </div>
              </template>
            </DropdownToolbar>
            <NormalToolbar title="kbd" @click="kbd">
              <template #trigger>
                <svg class="md-editor-icon" xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="22"><path d="M140-200q-24 0-42-18.5T80-260v-440q0-24 18-42t42-18h680q24 0 42 18t18 42v440q0 23-18 41.5T820-200H140Zm0-60h680v-440H140v440Zm160-65h360v-60H300v60Zm-97-125h60v-60h-60v60Zm124 0h60v-60h-60v60Zm123 0h60v-60h-60v60Zm124 0h60v-60h-60v60Zm123 0h60v-60h-60v60ZM203-575h60v-60h-60v60Zm124 0h60v-60h-60v60Zm123 0h60v-60h-60v60Zm124 0h60v-60h-60v60Zm123 0h60v-60h-60v60ZM140-260v-440 440Z"/></svg>
              </template>
            </NormalToolbar>
            <NormalToolbar title="kbd" @click="challenge">
              <template #trigger>
                <svg class="md-editor-icon" xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="22"><path d="m323-205 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178ZM233-80l65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Zm247-355Z"/></svg>
              </template>
            </NormalToolbar>
            <DropdownToolbar
              :visible="visible"
              title="tableColor"
              @onChange="handleVisibleChangeTableColor"
            >
              <template #trigger>
                <div class="md-editor-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="22"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-85 32-158t87.5-127q55.5-54 130-84.5T489-880q79 0 150 26.5T763.5-780q53.5 47 85 111.5T880-527q0 108-63 170.5T650-294h-75q-18 0-31 14t-13 31q0 27 14.5 46t14.5 44q0 38-21 58.5T480-80Zm0-400Zm-233 26q20 0 35-15t15-35q0-20-15-35t-35-15q-20 0-35 15t-15 35q0 20 15 35t35 15Zm126-170q20 0 35-15t15-35q0-20-15-35t-35-15q-20 0-35 15t-15 35q0 20 15 35t35 15Zm214 0q20 0 35-15t15-35q0-20-15-35t-35-15q-20 0-35 15t-15 35q0 20 15 35t35 15Zm131 170q20 0 35-15t15-35q0-20-15-35t-35-15q-20 0-35 15t-15 35q0 20 15 35t35 15ZM480-140q11 0 15.5-4.5T500-159q0-14-14.5-26T471-238q0-46 30-81t76-35h73q76 0 123-44.5T820-527q0-132-100-212.5T489-820q-146 0-247.5 98.5T140-480q0 141 99.5 240.5T480-140Z"/></svg>
                </div>
              </template>
              <template #overlay>
                <div>
                  <p @click="tableGreen">Green</p>
                  <p @click="tableBlue">Blue</p>
                </div>
              </template>
            </DropdownToolbar>
          </template>
        </MdEditor>
      </div>
      <div class="right">
        <div class="preview">
          <div id="loading" :class="{ active: showLoading }">
            <Spinner />
            Loading...
          </div>
          <div id="placeholder">
            <p>Save to see the preview.</p>
          </div>
          <embed
            :src="htmlPresentation"
            type="text/html"
            width="100%"
            height="100%"
          />
        </div>
        <div class="tools">
          <div>
            <h2>Settings</h2>
            <label for="title">File Name: </label>
            <div class="titleInput">
              <input
                type="text"
                id="title"
                v-model="title"
                name="title"
                placeholder="File Name"
              />
              <button @click="clearTitle">X</button>
            </div>
          </div>
          <!-- button that downloads the pptx  make a fetch call to http://localhost:3001/md2pptx-->
          <div class="exportBtn">
            <button @click="download">{{ exportText }}</button>
            <select
              name="extension"
              id="fileExtension"
              v-model="selectedExtension"
            >
              <option value="pptx" default>.pttx</option>
              <option value="pdf">.pdf</option>
              <option value="md">.md</option>
            </select>
          </div>
          <button @click="model" class="btn-help">Help</button>
          <button @click="reset" class="btn">Reset</button>

          <p id="lastSaved">Last saved at: {{ lastSavedTime }}</p>
        </div>
      </div>
    </div>
    <dialog ref="dialog">
      <button @click="close">X</button>
      <h2>Layout</h2>
      <h2>Columns</h2>
      <p>Select the columns tool and choose a style to instert it in your document</p>
      <ul>
        <li>2 Columns</li>
        <li>3 Columns</li>
        <li>Auto Columns</li>
      </ul>
      <h2>Rows</h2>
      <p>Select the rows tool and choose a style to instert it in your document</p>
      <ul>
        <li>2 Rows</li>
        <li>3 Rows</li>
        <li>Auto Rows</li>
      </ul>
      <h2>Marks</h2>
      <p>Select the mark tool and choose a style to instert it in your document</p>
      <ul>
        <li>Info</li>
        <li>Question</li>
        <li>Success</li>
        <li>Warning</li>
        <li>Error</li>
      </ul>
      <h2>Table Colors</h2>
      <p>while the whole table highlighted select the table color tool and choose a style to instert it in your document</p>
      <ul>
        <li>Default yellow</li>
        <li>Green</li>
        <li>Blue</li>
      </ul>
      <h2>Keyboard</h2>
      <p>Select the keyboard tool to instert it in your document</p>
      <h2>Challenge</h2>
      <p>Select the challenge tool to instert it in your document</p>
      <h2>shortcuts</h2>
      <table>
        <thead>
          <tr>
            <th>Shortcut</th>
            <th>Action</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>TAB</td>
            <td>Insert space</td>
            <td>
              Insert space, the length equal to `tabWidth`, default: 2, supports
              multiline
            </td>
          </tr>
          <tr>
            <td>SHIFT + TAB</td>
            <td>Delete space</td>
            <td>Delete space, setting is the same as `TAB`</td>
          </tr>
          <tr>
            <td>CTRL + C</td>
            <td>Copy</td>
            <td>
              When selected, copy the selected content. When not selected, copy
              the content of the current line
            </td>
          </tr>
          <tr>
            <td>CTRL + X</td>
            <td>Cut</td>
            <td>
              When selected, cut the selected content. When not selected, cut
              the current line
            </td>
          </tr>
          <tr>
            <td>CTRL + D</td>
            <td>Delete</td>
            <td>
              When selected, delete the selected content. When not selected,
              delete the current line
            </td>
          </tr>
          <tr>
            <td>CTRL + S</td>
            <td>Save</td>
            <td>Trigger `onSave` event</td>
          </tr>
          <tr>
            <td>CTRL + B</td>
            <td>Bold text</td>
            <td>`**bold**`</td>
          </tr>
          <tr>
            <td>CTRL + U</td>
            <td>Underline</td>
            <td>`<u>underline</u>`</td>
          </tr>
          <tr>
            <td>CTRL + I</td>
            <td>Italic</td>
            <td>`*italic*`</td>
          </tr>
          <tr>
            <td>CTRL + 1-6</td>
            <td>Heading</td>
            <td>`# title`</td>
          </tr>
          <tr>
            <td>CTRL + ↑</td>
            <td>Superscript</td>
            <td>`<sup>superscript</sup>`</td>
          </tr>
          <tr>
            <td>CTRL + ↓</td>
            <td>Subscript</td>
            <td>`<sub>subscript</sub>`</td>
          </tr>
          <tr>
            <td>CTRL + O</td>
            <td>Ordered list</td>
            <td>`1. ordered list`</td>
          </tr>
          <tr>
            <td>CTRL + L</td>
            <td>Link</td>
            <td>`[link](https://github.com/imzbf/md-editor-v3)`</td>
          </tr>
          <tr>
            <td>CTRL + Z</td>
            <td>Undo</td>
            <td>Undo history in editor, not the function of system</td>
          </tr>
          <tr>
            <td>CTRL + SHIFT + S</td>
            <td>Strikethrough</td>
            <td>`~line-through~`</td>
          </tr>
          <tr>
            <td>CTRL + SHIFT + U</td>
            <td>Unordered list</td>
            <td>`- unordered list`</td>
          </tr>
          <tr>
            <td>CTRL + SHIFT + C</td>
            <td>Code block</td>
            <td></td>
          </tr>
          <tr>
            <td>CTRL + SHIFT + I</td>
            <td>Image</td>
            <td>`![picture](https://imzbf.cc)`</td>
          </tr>
          <tr>
            <td>CTRL + SHIFT + Z</td>
            <td>Redo</td>
            <td>Redo history in editor, not the function of system</td>
          </tr>
          <tr>
            <td>CTRL + SHIFT + F</td>
            <td>Beautify</td>
            <td></td>
          </tr>
          <tr>
            <td>CTRL + ALT + C</td>
            <td>Inline code</td>
            <td></td>
          </tr>
          <tr>
            <td>CTRL + SHIFT + ALT + T</td>
            <td>Table</td>
            <td>`|table|`</td>
          </tr>
        </tbody>
      </table>
    </dialog>
  </div>
</template>

<script>
import parseMdToJson from "./assets/utility/parseMdToJson";

const editorRef = ref(null);

onMounted(() => {
  editorRef.value?.on("catalog", console.log);
});
export default {
  name: "MyComponent",
  data() {
    return {
      src:
        localStorage.getItem("markdown") ||
        "---\rmarp: true\rtheme: codecafe\r# class: invert\rfooter: by [](https://code-cafe.nl)\r---\r\r# PRESENTATIE_TITEL\r\r---\r\r## Vragen?\r\r- E-mail mij op noah.beij@code-cafe.nl\r- Join de CodeCafé-community op Discord!\r\r![bg right 80%](https://assets.nbeij.nl/marp/assets/codecafe.png)",
      toolbars: [
        "bold",
        "underline",
        "italic",
        "-",
        "title",
        "strikeThrough",
        "sub",
        "sup",
        "quote",
        "unorderedList",
        "orderedList",
        4,
        "-",
        "codeRow",
        "code",
        3,
        "link",
        "image",
        "table",
        5,
        "katex",
        "-",
        0,
        1,
        2,
        "-",
        "revoke",
        "next",
        "save",
      ],
      footerEditor: ["markdownTotal"],
      htmlPresentation: "",
      downloadBtnText: "Download File",
      title: localStorage.getItem("title") || "Untitled",
      showLoading: false,
      selectedExtension: "pptx",
      lastSavedTime: localStorage.getItem("lastSavedTime") || "Not yet Saved",
      isDownloading: false,
      visable: false,
    };
  },
  methods: {
    parseHTML(html) {
      const htmlContainer = this.$refs.htmlContainer;
      htmlContainer.innerHTML = html;
    },
    setSource(value) {
      this.src = value;
    },

    handleVisibleChangeColumns(visible) {
      console.log(visible);
      this.visible = visible;
      // get the element with the class of md-editor-overlay in the dropdowntoolbar with title test
      const dropdown = document.querySelector(
        "div[title='columns']"
      ).parentNode;
      console.log(dropdown);
      const overlay = dropdown.querySelectorAll(".md-editor-dropdown");
      overlay[5].classList.toggle("md-editor-dropdown-hidden", !visible);
      // overlay.classList.remove("md-editor-dropdown-hidden");
      console.log(overlay);
    },
    handleVisibleChangeRows(visible) {
      console.log(visible);
      this.visible = visible;
      // get the element with the class of md-editor-overlay in the dropdowntoolbar with title test
      const dropdown = document.querySelector("div[title='rows']").parentNode;
      console.log(dropdown);
      const overlay = dropdown.querySelectorAll(".md-editor-dropdown");
      overlay[6].classList.toggle("md-editor-dropdown-hidden", !visible);
      // overlay.classList.remove("md-editor-dropdown-hidden");
      console.log(overlay);
    },

    handleVisibleChangeMark(visible) {
      console.log(visible);
      this.visible = visible;
      // get the element with the class of md-editor-overlay in the dropdowntoolbar with title test
      const dropdown = document.querySelector("div[title='rows']").parentNode;
      console.log(dropdown);
      const overlay = dropdown.querySelectorAll(".md-editor-dropdown");
      overlay[7].classList.toggle("md-editor-dropdown-hidden", !visible);
      // overlay.classList.remove("md-editor-dropdown-hidden");
      console.log(overlay);
    },

    handleVisibleChangeTableColor(visible) {
      console.log(visible);
      this.visible = visible;
      // get the element with the class of md-editor-overlay in the dropdowntoolbar with title test
      const dropdown = document.querySelector("div[title='tableColor']").parentNode;
      console.log(dropdown);
      const overlay = dropdown.querySelectorAll(".md-editor-dropdown");
      overlay[3].classList.toggle("md-editor-dropdown-hidden", !visible);
      // overlay.classList.remove("md-editor-dropdown-hidden");
      console.log(overlay);
    },

    clearTitle() {
      this.title = "";
    },

    columns2() {
      editorRef.value?.insert((selectedText) => {
        /**
         * @return targetValue    Content to be inserted
         * @return select         Automatically select content
         * @return deviationStart Start position of the selected content
         * @return deviationEnd   End position of the selected content
         */
        return {
          targetValue: `<div class="columns">\n<div>\n${selectedText}\n</div>\n<div>\n\n</div>\n</div>`,
          select: true,
          deviationStart: 0,
          deviationEnd: 0,
        };
      });
    },
    columns3() {
      editorRef.value?.insert((selectedText) => {
        /**
         * @return targetValue    Content to be inserted
         * @return select         Automatically select content
         * @return deviationStart Start position of the selected content
         * @return deviationEnd   End position of the selected content
         */
        return {
          targetValue: `<div class="columns-3">\n<div>\n${selectedText}\n</div>\n<div>\n\n</div>\n<div>\n\n</div>\n</div>`,
          select: true,
          deviationStart: 0,
          deviationEnd: 0,
        };
      });
    },
    columnsAuto() {
      editorRef.value?.insert((selectedText) => {
        /**
         * @return targetValue    Content to be inserted
         * @return select         Automatically select content
         * @return deviationStart Start position of the selected content
         * @return deviationEnd   End position of the selected content
         */
        return {
          targetValue: `<div class="auto">\n<div>\n${selectedText}\n</div>\n<div>\n\n</div>\n</div>`,
          select: true,
          deviationStart: 0,
          deviationEnd: 0,
        };
      });
    },

    rows2() {
      editorRef.value?.insert((selectedText) => {
        /**
         * @return targetValue    Content to be inserted
         * @return select         Automatically select content
         * @return deviationStart Start position of the selected content
         * @return deviationEnd   End position of the selected content
         */
        return {
          targetValue: `<div class="rows">\n<div>\n${selectedText}\n</div>\n<div>\n\n</div>\n</div>`,
          select: true,
          deviationStart: 0,
          deviationEnd: 0,
        };
      });
    },
    rows3() {
      editorRef.value?.insert((selectedText) => {
        /**
         * @return targetValue    Content to be inserted
         * @return select         Automatically select content
         * @return deviationStart Start position of the selected content
         * @return deviationEnd   End position of the selected content
         */
        return {
          targetValue: `<div class="rows-3">\n<div>\n${selectedText}\n</div>\n<div>\n\n</div>\n<div>\n\n</div>\n</div>`,
          select: true,
          deviationStart: 0,
          deviationEnd: 0,
        };
      });
    },
    rowsAuto() {
      editorRef.value?.insert((selectedText) => {
        /**
         * @return targetValue    Content to be inserted
         * @return select         Automatically select content
         * @return deviationStart Start position of the selected content
         * @return deviationEnd   End position of the selected content
         */
        return {
          targetValue: `<div class="rows-auto">\n<div>\n${selectedText}\n</div>\n<div>\n\n</div>\n</div>`,
          select: true,
          deviationStart: 0,
          deviationEnd: 0,
        };
      });
    },

    markInfo() {
      editorRef.value?.insert((selectedText) => {
        /**
         * @return targetValue    Content to be inserted
         * @return select         Automatically select content
         * @return deviationStart Start position of the selected content
         * @return deviationEnd   End position of the selected content
         */
        return {
          targetValue: `<mark class="info">\n${selectedText}\n</mark>`,
          select: true,
          deviationStart: 0,
          deviationEnd: 0,
        };
      });
    },
    markQuestion() {
      editorRef.value?.insert((selectedText) => {
        /**
         * @return targetValue    Content to be inserted
         * @return select         Automatically select content
         * @return deviationStart Start position of the selected content
         * @return deviationEnd   End position of the selected content
         */
        return {
          targetValue: `<mark class="question">\n${selectedText}\n</mark>`,
          select: true,
          deviationStart: 0,
          deviationEnd: 0,
        };
      });
    },
    markSuccess() {
      editorRef.value?.insert((selectedText) => {
        /**
         * @return targetValue    Content to be inserted
         * @return select         Automatically select content
         * @return deviationStart Start position of the selected content
         * @return deviationEnd   End position of the selected content
         */
        return {
          targetValue: `<mark class="success">\n${selectedText}\n</mark>`,
          select: true,
          deviationStart: 0,
          deviationEnd: 0,
        };
      });
    },
    markWarning() {
      editorRef.value?.insert((selectedText) => {
        /**
         * @return targetValue    Content to be inserted
         * @return select         Automatically select content
         * @return deviationStart Start position of the selected content
         * @return deviationEnd   End position of the selected content
         */
        return {
          targetValue: `<mark class="warning">\n${selectedText}\n</mark>`,
          select: true,
          deviationStart: 0,
          deviationEnd: 0,
        };
      });
    },
    markError() {
      editorRef.value?.insert((selectedText) => {
        /**
         * @return targetValue    Content to be inserted
         * @return select         Automatically select content
         * @return deviationStart Start position of the selected content
         * @return deviationEnd   End position of the selected content
         */
        return {
          targetValue: `<mark class="error">\n${selectedText}\n</mark>`,
          select: true,
          deviationStart: 0,
          deviationEnd: 0,
        };
      });
    },

    kbd() {
      editorRef.value?.insert((selectedText) => {
        /**
         * @return targetValue    Content to be inserted
         * @return select         Automatically select content
         * @return deviationStart Start position of the selected content
         * @return deviationEnd   End position of the selected content
         */
        return {
          targetValue: `<kbd>${selectedText}</kbd>`,
          select: true,
          deviationStart: 0,
          deviationEnd: 0,
        };
      });
    },

     challenge() {
      editorRef.value?.insert((selectedText) => {
        /**
         * @return targetValue    Content to be inserted
         * @return select         Automatically select content
         * @return deviationStart Start position of the selected content
         * @return deviationEnd   End position of the selected content
         */
        return {
          targetValue: `<div class="challenge">\n${selectedText}\n</div>`,
          select: true,
          deviationStart: 0,
          deviationEnd: 0,
        };
      });
    },

    tableGreen() {
      editorRef.value?.insert((selectedText) => {
        /**
         * @return targetValue    Content to be inserted
         * @return select         Automatically select content
         * @return deviationStart Start position of the selected content
         * @return deviationEnd   End position of the selected content
         */
        return {
          targetValue: `<div class="tableGreen">\n\n${selectedText}\n\n</div>`,
          select: true,
          deviationStart: 0,
          deviationEnd: 0,
        };
      });
    },
    tableBlue() {
      editorRef.value?.insert((selectedText) => {
        /**
         * @return targetValue    Content to be inserted
         * @return select         Automatically select content
         * @return deviationStart Start position of the selected content
         * @return deviationEnd   End position of the selected content
         */
        return {
          targetValue: `<div class="tableBlue">\n\n${selectedText}\n\n</div>`,
          select: true,
          deviationStart: 0,
          deviationEnd: 0,
        };
      });
    },

    download() {
      this.isDownloading = true;
      switch (this.selectedExtension) {
        case "pptx":
          this.downloadPPTX();
          break;
        case "pdf":
          this.downloadPDF();
          break;
        case "md":
          this.downloadMD();
          break;
        default:
          console.error("Invalid file extension");
      }
    },

    downloadPPTX() {
      // call http://localhost:3001/md2pptx with in the body the fileName and markdown that downloads the file it gives back
      fetch("http://localhost:3001/md2pptx", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: "test",
          markdown: this.src,
        }),
      })
        .then((res) => res.blob())
        .then((blob) => {
          this.downloadBtnText = "downloading...";
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${this.title}.pptx`);
          document.body.appendChild(link);
          link.click();
          this.isDownloading = false;
        });
    },

    downloadMD() {
      // call http://localhost:3001/md2pptx with in the body the fileName and markdown that downloads the file it gives back
      fetch("http://localhost:3001/md", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: "test",
          markdown: this.src,
        }),
      })
        .then((res) => res.blob())
        .then((blob) => {
          this.downloadBtnText = "downloading...";
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${this.title}.md`);
          document.body.appendChild(link);
          link.click();
          this.isDownloading = false;
        });
    },

    downloadPDF() {
      // call http://localhost:3001/md2pptx with in the body the fileName and markdown that downloads the file it gives back
      fetch("http://localhost:3001/md2pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: "test",
          markdown: this.src,
        }),
      })
        .then((res) => res.blob())
        .then((blob) => {
          this.downloadBtnText = "downloading...";
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${this.title}.pdf`);
          document.body.appendChild(link);
          link.click();
          this.isDownloading = false;
        });
    },

    async onUploadImg(files, callback) {
      const res = await Promise.all(
        files.map((file) => {
          return new Promise((rev, rej) => {
            const form = new FormData();
            form.append("image", file);
            console.log(file);
            console.log(form);
            fetch("http://localhost:3001/imgUpload", {
              method: "POST",
              body: form,
            })
              .then((res) => res.json())
              .then((res) => {
                rev(res);
              })
              .catch((err) => {
                rej(err);
              });
          });
        })
      );

      callback(
        res.map((item) => {
          console.log(item);
          console.log(item.url);
          return item.url;
        })
      );
    },

    reset() {
      if (!confirm("Are you sure you want to reset?")) return;
      localStorage.setItem(
        "markdown",
        "---\rmarp: true\rtheme: codecafe\r# class: invert\rfooter: by [](https://code-cafe.nl)\r---\r\r# PRESENTATIE_TITEL\r\r---\r\r## Vragen?\r\r- E-mail mij op noah.beij@code-cafe.nl\r- Join de CodeCafé-community op Discord!\r\r![bg right 80%](https://assets.nbeij.nl/marp/assets/codecafe.png)"
      );
      localStorage.setItem("lastSavedTime", "Not yet Saved");
      localStorage.setItem("title", "Untitled");
      this.title = localStorage.getItem("title");
      this.src = localStorage.getItem("markdown");
      this.lastSavedTime = localStorage.getItem("lastSavedTime");
    },

    model() {
      const dialog = this.$refs.dialog;
      dialog.showModal();
    },
    close() {
      const dialog = this.$refs.dialog;
      dialog.close();
    },

    // handleSave function that calls http://localhost:3000/md2html with the in the body a filename and the markdown parsejsontomd that sets it in a n iframe
    async handleSave() {
      const markdown = JSON.parse(parseMdToJson(this.src));
      if (!markdown) {
        console.error("Markdown is undefined");
        return;
      }
      // save time in hh:mm dd/mm/yyyy format
      this.lastSavedTime = new Date().toLocaleString("nl-NL");
      localStorage.setItem("lastSavedTime", this.lastSavedTime);
      localStorage.setItem("markdown", markdown);
      localStorage.setItem("title", this.title);
      // html page for loading
      this.showLoading = true;

      // const blob = new Blob(["loading"], { type: "text/html" });
      // this.htmlPresentation = URL.createObjectURL(blob);

      console.log("markdown", markdown);

      fetch("http://localhost:3001/md2html", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: "test",
          markdown: markdown,
        }),
      })
        .then((res) => res.blob())
        .then((blob) => {
          this.htmlPresentation = URL.createObjectURL(blob);
          this.showLoading = false;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  computed: {
    htmlEscapedText() {
      console.log(parseMdToJson(this.src));
      return parseMdToJson(this.src);
    },
    exportText() {
      if (this.isDownloading) return "Downloading...";

      return `Export ${this.title}`;
    },
  },
};
</script>

<style>
.layout {
  display: grid;
  grid-template-columns: 3fr 2fr;
  width: 100%;
  height: 100%;
}

.left {
  height: 100vh;
  resize: horizontal;
}

.left .md-editor {
  height: 100%;
}

.right {
  height: 100vh;
  resize: horizontal;
}
.preview {
  width: 100%;
  aspect-ratio: 16/9;
  position: relative;
}

.preview #loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: none;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  color: #ccc;
}

.preview #loading.active {
  display: flex;
}

.preview #placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: bottom;
  font-size: 2rem;
  font-weight: bold;
  color: #2f2f2f;
  z-index: 1;
}

.preview embed {
  position: relative;
  z-index: 2;
}

.tools {
  border-top: 1px solid #ccc;
  width: 100%;
  height: 50%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
}

.tools .titleInput {
  display: inline-flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
}

.tools .titleInput button {
  background: none;
  border: none;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tools .titleInput:hover button {
  opacity: 1;
}
.tools input {
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  padding: 0.5em;
}

#lastSaved {
  position: absolute;
  bottom: 1rem;
  right: 3rem;
  font-size: 0.8rem;
  color: #2f2f2f;
}

/* export btn */

.exportBtn {
  display: infline-flex;
}

.exportBtn button {
  border: none;
  /* background: red; */
  border-radius: 0.5em 0 0 0.5em;
}

.exportBtn select {
  border: none;
  /* background: yellow; */
  border-radius: 0 0.5em 0.5em 0;
  /* padding: 0 5px; */
  /* color: white; */
  text-align: left;
}

.exportBtn button,
.exportBtn select {
  padding: 0.5em 1em;
  border: 1px solid #638caa;
  background: #92cefa;
  font-size: 1.2rem;
  cursor: pointer;
}

.btn {
  padding: 0.5em 1em;
  border: 1px solid #8f2b32;
  background: #d33f49;
  font-size: 1.2rem;
  width: fit-content;
  border-radius: 0.5em;
  cursor: pointer;
}
.btn-help {
  padding: 0.5em 1em;
  border: 1px solid #638caa;
  background: #92cefa;
  font-size: 1.2rem;
  width: fit-content;
  border-radius: 0.5em;
  cursor: pointer;
}

dialog {
  border-radius: 0.5em;
  background: #1f1f1f;
  color: white;
  border: none;
  position: relative;
  max-height: 80vh;
}

dialog::backdrop {
  background: rgba(0, 0, 0, 0.7);
}

dialog button {
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  padding: 0.5em;
}

dialog table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

dialog table th,
dialog table td {
  border: 1px solid #ccc;
  padding: 0.5em;
}

.md-editor-dropdown-overlay{
  border: .5px solid #999999;
  display: inline-block;
  padding: 0 4px;
  transition: all .3s;
  border-radius: 0;
  cursor: pointer;
  list-style: none;
  user-select: none;
  text-align: center;
  font-size: 12px;
}

.md-editor-dropdown-overlay p {
  margin: 0;
  padding: 5px 10px;
}
</style>
