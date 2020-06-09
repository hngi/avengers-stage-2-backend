module.exports = (token, name, domain) => {
  const url = `${domain ||
    `http://localhost:${process.env.PORT}`}/api/v1/change-password/${token}`;
  const template = `
<div>
  <h2>Reset password </h2>
  <p>Hi, ${
    name ? name : "valuable customer"
  } kindly follow this <a href=${url}>link</a> to reset your password</p>
  Or copy the link below to your browser <br/>
  <strong>${url}</strong>
</div>

  `;
  return template;
};
