import express from "express";
import fileUpload from "express-fileupload";
import cp from "child_process";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import cors from "cors";

const app = express();
const port = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  fileUpload({
    limits: {
      fileSize: 10000000,
    },
    abortOnLimit: true,
  })
);

app.use(express.static("public"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/", function (req, res) {
  const filePath = path.join(__dirname, "index.html");
  res.sendFile(filePath);
});

app.post("/md2pptx", (req, res) => {
  // set cors headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  const fileName = req.body.fileName;
  const markdown = req.body.markdown;

  fs.writeFile(`backend/files/${fileName}.md`, markdown, (err) => {
    if (err) {
      console.error(err);
      return;
    } else {
      //  execute marp command to convert the file in the folder files to pptx
      cp.execSync(
        `npx @marp-team/marp-cli --allow-local-files --html --theme backend/src/theme.css backend/files/${fileName}.md  -o backend/files/${fileName}.pptx`
      );
      // wait until the file is created
      console.log("done");

      res.download(`backend/files/${fileName}.pptx`, (err) => {
        if (err) {
          console.error(err);
          return;
        } else {
          console.log("file downloaded");
        }
      });

      // delete all files from files folder
      fs.readdir("backend/files", (err, files) => {
        if (err) throw err;

        for (const file of files) {
          fs.unlink(path.join("backend/files", file), (err) => {
            if (err) throw err;
          });
        }
      });
    }
  });
});

app.post("/md2pdf", (req, res) => {
  // set cors headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  const fileName = req.body.fileName;
  const markdown = req.body.markdown;

  fs.writeFile(`backend/files/${fileName}.md`, markdown, (err) => {
    if (err) {
      console.error(err);
      return;
    } else {
      //  execute marp command to convert the file in the folder files to pptx
      cp.execSync(
        `npx @marp-team/marp-cli --allow-local-files --html --theme backend/src/theme.css backend/files/${fileName}.md  -o backend/files/${fileName}.pdf`
      );
      // wait until the file is created
      console.log("done");

      res.download(`backend/files/${fileName}.pdf`, (err) => {
        if (err) {
          console.error(err);
          return;
        } else {
          console.log("file downloaded");
        }
      });

      // delete all files from files folder
      fs.readdir("backend/files", (err, files) => {
        if (err) throw err;

        for (const file of files) {
          fs.unlink(path.join("backend/files", file), (err) => {
            if (err) throw err;
          });
        }
      });
    }
  });
});

app.post("/md2html", (req, res) => {
  // set cors headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  const fileName = req.body.fileName;
  const markdown = req.body.markdown;
//   console.log(req)
  console.log(req.body)
    console.log(markdown)
    console.log(fileName)
  if (markdown === undefined) {
    console.log(markdown)
    console.error("Markdown is undefined");
    return;
  }


  fs.writeFile(`backend/files/${fileName}.md`, markdown, (err) => {
    if (err) {
      console.error(err);
      return;
    } else {
      //  execute marp command to convert the file in the folder files to pptx
      cp.execSync(
        `npx @marp-team/marp-cli --allow-local-files --html --theme backend/src/theme.css backend/files/${fileName}.md  -o backend/files/${fileName}.html`
      );
      // wait until the file is created
      console.log("done");

      res.download(`backend/files/${fileName}.html`, (err) => {
        if (err) {
          console.error(err);
          return;
        } else {
          console.log("file downloaded");
        }
      });

      // delete all files from files folder
      //   fs.readdir("files", (err, files) => {
      //     if (err) throw err;

      //     for (const file of files) {
      //       fs.unlink(path.join("files", file), (err) => {
      //         if (err) throw err;
      //       });
      //     }
      //   });
    }
  });
});

app.post("/md", (req, res) => {
  // set cors headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  const fileName = req.body.fileName;
  const markdown = req.body.markdown;

  fs.writeFile(`backend/files/${fileName}.md`, markdown, (err) => {
    if (err) {
      console.error(err);
      return;
    } else {
       res.download(`backend/files/${fileName}.md`, (err) => {
        if (err) {
          console.error(err);
          return;
        } else {
          console.log("backend/file downloaded");
        }
      });

      // delete all files from files folder
      fs.readdir("backend/files", (err, files) => {
        if (err) throw err;

        for (const file of files) {
          fs.unlink(path.join("backend/files", file), (err) => {
            if (err) throw err;
          });
        }
      });
    }
  });
});




app.post("/imgUpload", (req, res) => {
  // Get the file that was set to our field named "image"
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader(
     "Access-Control-Allow-Methods",
     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
   );
  const { image } = req.files;

  // If no image submitted, exit
  if (!image) return res.sendStatus(400);

  // Move the uploaded image to our upload folder
  image.mv(__dirname + "/images/" + image.name);

//   send back the url of the image
    res.send({ url: `http://localhost:3000/images/${image.name}` });
});

// serve image
app.get("/images/:name", (req, res) => {
     res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader(
       "Access-Control-Allow-Methods",
       "GET, POST, OPTIONS, PUT, PATCH, DELETE"
     );
    console.log(req.params.name);
    console.log(__dirname + "/images/" + req.params.name)
   
    res.sendFile(__dirname + "/images/" + req.params.name);
});
