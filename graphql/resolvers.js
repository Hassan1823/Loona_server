const Product = require("../model/Product");
const Recipe = require("../model/Recipe");

module.exports = {
  Query: {
    // ! for recipe
    async recipe(_, { name }) {
      return await Recipe.findOne({ name: name });
    },
    async getRecipes(_, { amount }) {
      return await Recipe.find().sort({ createdAt: 1 }).limit(amount);
    },

    //! for products
    async product(_, { ParentTitle }) {
      const product = await Product.findOne({ ParentTitle: ParentTitle });
      if (!product) {
        return "No product found with the provided ID";
      }
      return product;
    },
    async getProducts(_, { limit }) {
      if (limit) {
        return await Product.find().sort({ createdAt: 1 }).limit(limit);
      } else {
        return await Product.find().sort({ createdAt: -1 });
      }
    },
  },
  Mutation: {
    // ! fro recipe
    async createRecipe(_, { recipeInput: { name, description } }) {
      const createdRecipe = new Recipe({
        name: name,
        description: description,
        createdAt: new Date().toISOString(),
        thumbsUp: 0,
        thumbsDown: 0,
      });

      // ! save to MongoDB
      const res = await createdRecipe.save();

      console.log("DB Result For Recipe: ");
      console.log(res._doc);
      return {
        id: res.id,
        ...res._doc,
      };
    },
    async deleteRecipe(_, { ID }) {
      const wasDeleted = (await Recipe.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted; //return 0 or 1
    },
    async editRecipe(_, { ID, recipeInput: { name, description } }) {
      const wasEdited = (
        await Recipe.updateOne(
          { _id: ID },
          { name: name, description: description }
        )
      ).modifiedCount;
      return wasEdited;
    },

    //! for products
    async createProduct(
      _,
      {
        productInput: {
          ParentTitle,
          ImageLink,
          Alt,
          Family,
          Years,
          Frames,
          Generation,
          BreadcrumbsH1,
          TypesDiv,
          TextsDiv,
          ListOfHrefs,
        },
      }
    ) {
      const createdProduct = new Product({
        ParentTitle,
        ImageLink,
        Alt,
        Family,
        Years,
        Frames,
        Generation,
        BreadcrumbsH1,
        TypesDiv,
        TextsDiv,
        createdAt: new Date().toISOString(),
        ListOfHrefs, // Set the ListOfHrefs field to the mapped listOfHrefs
      });

      const res = await createdProduct.save();

      console.log(`DB Result For Products: `);
      console.log(res._doc);
      return {
        id: res.id,
        ...res._doc,
      };
    },
    async deleteProduct(_, { ID }) {
      const wasDeleted = (await Product.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted;
    },
    async editProduct(
      _,
      {
        ID,
        productInput: {
          ParentTitle,
          ImageLink,
          Alt,
          Family,
          Years,
          Frames,
          Generation,
          BreadcrumbsH1,
          TypesDiv,
          TextsDiv,
        },
      }
    ) {
      const wasEdited = (
        await Product.updateOne(
          { _id: ID },
          {
            ParentTitle: ParentTitle,
            ImageLink: ImageLink,
            Alt: Alt,
            Family: Family,
            Years: Years,
            Frames: Frames,
            Generation: Generation,
            BreadcrumbsH1: BreadcrumbsH1,
            TypesDiv: TypesDiv,
            TextsDiv: TextsDiv,
          }
        )
      ).modifiedCount;
      return wasEdited;
    },
  },
};
