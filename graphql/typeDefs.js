const { gql } = require("apollo-server");
module.exports = gql`
  type Recipe {
    name: String
    description: String
    createdAt: String
    thumbsUp: Int
    thumbsDown: Int
  }

  input RecipeInput {
    name: String
    description: String
  }

  type Product {
    ParentTitle: String
    ImageLink: String
    Alt: String
    Family: String
    Years: String
    Frames: String
    Generation: String
    BreadcrumbsH1: String
    TypesDiv: String
    TextsDiv: String
    createdAt: String
    ListOfHrefs: [ListOfHrefs]
  }

  type ListOfHrefs {
    H1Tag: String
    cards: [cards]
  }
  type cards {
    Href: String
    ImageLink: String
    Alt: String
    hrefH1: String
    hrefNumbers: [String]
    hrefNames: [String]
    hrefPrices: [String]
  }

  input ProductInput {
    ParentTitle: String
    ImageLink: String
    Alt: String
    Family: String
    Years: String
    Frames: String
    Generation: String
    BreadcrumbsH1: String
    TypesDiv: String
    TextsDiv: String
    ListOfHrefs: [ListOfHrefsInput]
  }

  input ListOfHrefsInput {
    H1Tag: String
    cards: [cardsInput]
  }

  input cardsInput {
    Href: String
    ImageLink: String
    Alt: String
    hrefH1: String
    hrefNumbers: [String]
    hrefNames: [String]
    hrefPrices: [String]
  }

  type Query {
    recipe(name: String!): Recipe!
    getRecipes(amount: Int): [Recipe]

    product(ParentTitle: String!): Product!
    getProducts(limit: Int): [Product]
  }

  type Mutation {
    createRecipe(recipeInput: RecipeInput): Recipe!
    deleteRecipe(ID: ID!): Boolean
    editRecipe(ID: ID!, recipeInput: RecipeInput): Boolean

    createProduct(productInput: ProductInput): Product!
    deleteProduct(ID: ID!): Boolean
    editProduct(ID: ID, productInput: ProductInput): Boolean
  }
`;
