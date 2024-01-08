function getGoogleOAuthURL() {
    const rootUrl = "https://accounts.google.com/o/oauth2/auth";
  
    const options = {
      redirect_uri: process.env.REACT_APP_CLIENT_REDIRECT_GOOGLE,
      client_id: process.env.REACT_APP_CLIENT_ID_GOOGLE,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };
  
    const qs = new URLSearchParams(options);
    return `${rootUrl}?${qs.toString()}`;
  }
  
  export default getGoogleOAuthURL;