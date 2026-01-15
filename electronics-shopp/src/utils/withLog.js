export const withLog = (C, name) => (props) => {
  // eslint-disable-next-line no-console
  console.log("Render:", name || C.name);
  return <C {...props} />;
};
