import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import dotenv from "dotenv";
import db from "./_db.js";

dotenv.config();

const port = process.env.PORT || 4000;

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    authors() {
      return db.authors;
    },
    reviews() {
      return db.reviews;
    },
    review(_, args) {
      const { id } = args;
      return db.reviews.find((review) => review.id === id);
    },
    game(_, args) {
      const { id } = args;
      return db.games.find((game) => game.id === id);
    },
    author(_, args) {
      const { id } = args;
      return db.authors.find((author) => author.id === id);
    },
  },

  Game: {
    reviews(parent) {
      return db.reviews.filter((review) => review.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((review) => review.author_id === parent.id);
    },
  },
  Review: {
    game(parent) {
      return db.games.find((game) => game.id === parent.game_id);
    },

    author(parent) {
      return db.authors.find((author) => author.id === parent.author_id);
    },
  },
  Mutation: {
    addGame(_, args) {
      const newGame = {
        ...args.game,
        id: (db.games.length + 1).toString(),
      };
      db.games.push(newGame);
      return newGame;
    },

    editGame(_, args) {
      db.games = db.games.map((game) => {
        if (game.id === args.id) {
          return { ...game, ...args.game };
        }

        return game;
      });

      return db.games.find((game) => game.id === args.id);
    },
    deleteGame(_, args) {
      const { id } = args;
      db.games = db.games.filter((game) => game.id !== id);
      return db.games;
    },

    deleteAuthor(_, args) {
      const { id } = args;
      db.authors = db.authors.filter((author) => author.id !== id);
      return db.authors;
    },

    deleteReview(paren_, args) {
      const { id } = args;
      db.reviews = db.reviews.filter((review) => review.id !== id);
      return db.reviews;
    },
  },
};

// server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: port },
});

console.log("Server Ready at port ", port);
