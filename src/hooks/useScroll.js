export const useScroll = (ref) => {
  const scrollToElement = () => {
    const { current } = ref;
    if (current) {
      current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return scrollToElement;
};
