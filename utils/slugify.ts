export const slugify = (string: string, separator = "-") => {
  return string
    .toString() // Cast to string (optional)
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, separator) // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/_/g, separator) // Replace  with -
    .replace(/--+/g, separator) // Replace multiple - with single -
    .replace(/-$/g, ""); // Remove trailing -
};
