export const sliderSettings = {
  slidesPerView: 1,
  spaceBetween: 50,
  breakpoints: {
    480: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2,
    },
    750: {
      slidesPerView: 3,
    },
    1100: {
      slidesPerView: 4,
    },
  },
};

export const updateFavourites = (_id, favourites) => {
  if (favourites.includes(_id)) {
    return favourites.filter((property_id) => property_id !== _id);
  } else {
    return { ...favourites, _id };
  }
};
