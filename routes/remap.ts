import express = require("express");
const router: express.Router = express.Router();
import { getPages } from "../remapping/index";
const Page = require("../models/page");
router.get("/", async (req, res) => {
  try {
    const response = await getPages();
    const pagesRemapped = await remapPages(response);
    if (pagesRemapped) {
      const pagesDB = await Page.find({});
      res
        .status(200)
        .json({ "Content have been updated successfully!": pagesDB });
    } else {
      res.status(500).send("There was an error with the DB");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
const remapPages = async (response: any) => {
  try {
    const pageResults = response.page.results;
    const deleteDB = await Page.deleteMany({});
    if (deleteDB) {
      const promises = pageResults.map(async (page: any) => {
        const childrenId: Array<string> = [];
        page.children.page.results.forEach((child: any) => {
          childrenId.push(child.id);
        });
        if (page.title.includes("JAVA")) {
          console.log(page.title);
        }
        const onePage: PageI = {
          title: page.title,
          content: page.body.storage.value,
          conflPageId: page.id,
          conflChildrenId: childrenId,
          program:
            page.title.includes("Java ") ||
            page.title.includes("JAVA") ||
            page.title.includes("Mobile")
              ? "JAVA"
              : page.title.includes("MERN")
              ? "MERN"
              : "ALL"
        };
        const newPage = new Page(onePage);
        const savedPage = await newPage.save();
        return savedPage;
      });
      const pages = await Promise.all(promises);
      return pages;
    }
  } catch (error) {
    console.log("error", error);
  }
};
module.exports = router;
