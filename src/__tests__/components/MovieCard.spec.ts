import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";

import MovieCard from "@/components/movies/MovieCard.vue";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const createComponent = () => shallowMount(MovieCard, { propsData: { movie } });

const movie = {
  id: 1,
  title: "Predator",
  poster_url: "img/predator.png",
  description:
    "A team of commandos on a mission in a Central American jungle find themselves hunted by an extraterrestrial warrior.",
  genre: {
    name: "Action",
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
    expect(wrapper.find(".movie__title").text()).toMatch("Predator");
  });

  it("display image from url", () => {
    const wrapper = createComponent();
    expect(wrapper.find("img").attributes("src")).toBeTruthy;
  });

  it("display correct genre", () => {
    const wrapper = createComponent();
    expect(wrapper.find(".movie__genre").text()).toMatch("Action");
  });

  it("display correct time", () => {
    const wrapper = createComponent();
    expect(wrapper.find(".movie__length").text()).toMatch("1h 27min");
  });
});
