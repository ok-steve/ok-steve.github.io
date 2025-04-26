export default (value, options = {}) => {
  const date = new Date(value);
  const format = new Intl.DateTimeFormat("en-US", {
    ...options,
    timeZone: "Etc/UTC",
  });
  return format.format(date);
};
