const { model, Schema } = require("mongoose");

const productSchema = new Schema({
  ParentTitle: String,
  ImageLink: String,
  Alt: String,
  Family: String,
  Years: String,
  Frames: String,
  Generation: String,
  BreadcrumbsH1: String,
  TypesDiv: String,
  TextsDiv: String,
  createdAt: String,
  ListOfHrefs: [
    {
      H1Tag: String,
      cards: [
        {
          Href: String,
          ImageLink: String,
          Alt: String,
          hrefH1: String,
          hrefNumbers: [String],
          hrefNames: [String],
          hrefPrices: [String],
        },
      ],
    },
  ],
});

module.exports = model("Product", productSchema);
