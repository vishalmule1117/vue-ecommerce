// ALWAYS export a function that returns the ref
export const useAuthModal = () => {
  return useState("authModal", () => false); // returns a reactive ref
};
