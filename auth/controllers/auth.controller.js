export const register = async (req, res) => {
  try {
    console.log(`Calling the auth register endpoint with ${req.body}`);
  } catch (error) {
    console.log(`Error: ${error}`);
    throw new Error(error);
  }
};
