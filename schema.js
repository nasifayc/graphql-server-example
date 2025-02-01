export const typeDefs = `#graphql
    type Game{
        id: ID!
        title: String!
        platform: [String!]!
        reviews: [Review!]
    }

    type Review{
        id: ID!
        rating: Int!
        content: String!
        game:Game!
        author: Author!
    }

    type Author{
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }

    type Query{
        reviews: [Review]
        games: [Game]
        authors: [Author]
        review(id: ID!): Review
        game(id: ID!): Game
        author(id: ID!): Author
    }

    type Mutation{
        addGame(game: AddGameInput! ): Game
        editGame(id: ID!, game:EditGameInput!): Game
        deleteGame(id: ID!): [Game]
        deleteAuthor(id: ID!): [Author]
        deleteReview(id: ID!): [Review]
    }

    input AddGameInput{
        title: String!
        platform:[String!]!
    }

    input EditGameInput{
        title: String
        platform:[String!]
    }
`;
