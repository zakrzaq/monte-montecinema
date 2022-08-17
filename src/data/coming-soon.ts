import type { Movie } from '@/types/movie'

export const comingSoon: Movie[] = [
  {
    id: 1,
    title: "Harry Potter and the Philosopher's Stone",
    genre: {
      id: 3,
      name: "Fantasy",
    },
    poster_url:
      "https://images-na.ssl-images-amazon.com/images/I/713KEd-8jyL._AC_SL1500_.jpg",
    length: 159,
    release_date: "2001-11-16",
    description:
      "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.",
  },
  {
    id: 2,
    title: "You've got Mail",
    genre: {
      id: 5,
      name: "Romance",
    },
    poster_url: "https://miro.medium.com/max/520/0*JeA6QiQ6BzuNzKHP.jpg",
    length: 120,
    release_date: "1994-02-26",
    description:
      "Book superstore magnate, Joe Fox and independent book shop owner, Kathleen Kelly fall in love in the anonymity of the Internet both blissfully unaware that he is trying to put her out of business.",
  },
  {
    id: 3,
    title: "Star Wars Episode IV: A New Hope",
    genre: {
      id: 4,
      name: "Sci-Fi",
    },
    poster_url:
      "https://img01.mgo-images.com/image/thumbnail/v2/content/MMVD85527F13D6BC8CB6518D4B8DF956FAD2.jpeg",
    length: 125,
    release_date: "1977-05-25",
    description:
      "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
  },
];

