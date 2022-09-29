import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import MovieCard from "@/components/movies/MovieCard.vue";
import type { Movie } from "@/types/movie";

const createComponent = () =>
  shallowMount(MovieCard, {
    props: { movie },
  });

const movie: Movie = {
  id: 1,
  title: "Predator",
  poster_url: "img/predator.png",
  release_date: "",
  description:
    "A team of commandos on a mission in a Central American jungle find themselves hunted by an extraterrestrial warrior.",
  genre: {
    name: "Action",
    id: 1,
  },
  length: 87,
};

describe("MovieCard.vue", () => {
  it("expect to mounted", () => {
    const wrapper = createComponent();
    expect(wrapper).toBeTruthy();
  });

  it("display header title", () => {
    const wrapper = createComponent();
    expect(wrapper.find('[data-spec="title"]').text()).toMatch("Predator");
  });

  it("display image from url", () => {
    const wrapper = createComponent();
    expect(wrapper.find('[data-spec="poster"]').attributes("src")).toBeTruthy;
  });

  it("display correct genre", () => {
    const wrapper = createComponent();
    expect(wrapper.find('[data-spec="genre"]').text()).toMatch("Action");
  });

  it("display correct time", () => {
    const wrapper = createComponent();
    expect(wrapper.find('[data-spec="length"]').text()).toMatch("1h 27min");
  });
});
