import multer from "multer";
import path from "path";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, `./src/uploads`);
  },
  filename: (request, file, callback) => {
    const originalName = path
      .parse(file.originalname)
      .name.toLowerCase()
      .split(" ")
      .join("-");
    const currentDate = new Date()
      .toLocaleString("en-US", { hour12: false })
      .replace(/[/:,\s]/g, "-")
      .replace(/-+/g, "-");
    const milliSeconds = Date.now() % 1000;
    const extention = path.extname(file.originalname);
    const randomString = uuid().slice(0, 4);
    callback(
      null,
      `${originalName}-${currentDate}-${milliSeconds}-${randomString}${extention}`,
    );
  },
});

export const upload = multer({ storage });
