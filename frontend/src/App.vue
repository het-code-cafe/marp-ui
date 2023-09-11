<script setup>
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import Spinner from "./components/spinner.vue";
import { ref } from "vue";

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
          :toolbarsExclude="excludedTools"
          @onUploadImg="onUploadImg"
        />
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
            <label for="title">File Name: </label>
            <div class="titleInput">
            <input
            type="text"
            id="title"
            v-model="title"
            name="title"
            placeholder="File Name">
            <button @click="clearTitle">X</button>
            </div>
          </div>
          <!-- button that downloads the pptx  make a fetch call to http://localhost:3001/md2pptx-->
          <div class="exportBtn">
            <button @click="download">{{exportText}}</button>
            <select name="extension" id="fileExtension" v-model="selectedExtension">
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
      <td>Insert space, the length equal to `tabWidth`, default: 2, supports multiline</td>
    </tr>
    <tr>
      <td>SHIFT + TAB</td>
      <td>Delete space</td>
      <td>Delete space, setting is the same as `TAB`</td>
    </tr>
    <tr>
      <td>CTRL + C</td>
      <td>Copy</td>
      <td>When selected, copy the selected content. When not selected, copy the content of the current line</td>
    </tr>
    <tr>
      <td>CTRL + X</td>
      <td>Cut</td>
      <td>When selected, cut the selected content. When not selected, cut the current line</td>
    </tr>
    <tr>
      <td>CTRL + D</td>
      <td>Delete</td>
      <td>When selected, delete the selected content. When not selected, delete the current line</td>
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
export default {
  name: "MyComponent",
  data() {
    return {
      src: localStorage.getItem("markdown") || "---\rmarp: true\rtheme: codecafe\r# class: invert\rfooter: by [](https://code-cafe.nl)\r---\r\r# PRESENTATIE_TITEL\r\r---\r\r## Vragen?\r\r- E-mail mij op noah.beij@code-cafe.nl\r- Join de CodeCafé-community op Discord!\r\r![bg right 80%](https://assets.nbeij.nl/marp/assets/codecafe.png)",
      excludedTools: ["github", "fullscreen", "preview", "catalog", "pageFullscreen", "htmlPreview", "prettier", "mermaid"],
      htmlPresentation: "",
      downloadBtnText: "Download File",
      title: localStorage.getItem("title") || "Untitled",
    showLoading: false,
    selectedExtension: "pptx",
    lastSavedTime: localStorage.getItem("lastSavedTime") || "Not yet Saved",
    isDownloading: false,
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

     clearTitle(){
      this.title = "";
    },

    download(){
      this.isDownloading = true;
      switch(this.selectedExtension) {
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

    reset(){
      if(!confirm("Are you sure you want to reset?")) return;
      localStorage.setItem("markdown", "---\rmarp: true\rtheme: codecafe\r# class: invert\rfooter: by [](https://code-cafe.nl)\r---\r\r# PRESENTATIE_TITEL\r\r---\r\r## Vragen?\r\r- E-mail mij op noah.beij@code-cafe.nl\r- Join de CodeCafé-community op Discord!\r\r![bg right 80%](https://assets.nbeij.nl/marp/assets/codecafe.png)");
      localStorage.setItem("title", "Untitled");
      this.title = localStorage.getItem("title");
      this.src = localStorage.getItem("markdown");
    },

    model(){
      const dialog = this.$refs.dialog;
      dialog.showModal();
    },
    close(){
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

      console.log("markdown",markdown);

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
    exportText(){
      if(this.isDownloading) return "Downloading...";

      return `Export ${this.title}`
    }
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
  border-radius: .5em 0 0 .5em;
}

.exportBtn select {
  border: none;
  /* background: yellow; */
  border-radius: 0 .5em .5em 0;
  /* padding: 0 5px; */
  /* color: white; */
  text-align: left;
}

.exportBtn button, .exportBtn select {
  padding: .5em 1em;
  border: 1px solid #638CAA;
  background: #92cefa;
  font-size: 1.2rem;
}

.btn {
    padding: .5em 1em;
  border: 1px solid #8F2B32;
  background: #D33F49;
  font-size: 1.2rem;
  width: fit-content;
  border-radius: .5em;
}
.btn-help {
    padding: .5em 1em;
  border: 1px solid #638CAA;
  background: #92cefa;
  font-size: 1.2rem;
  width: fit-content;
  border-radius: .5em;
}

dialog {
  border-radius: .5em;
  background: #1f1f1f;
  color: white;
  border: none;
  position: relative;
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

dialog table th, dialog table td {
  border: 1px solid #ccc;
  padding: 0.5em;
}
</style>
