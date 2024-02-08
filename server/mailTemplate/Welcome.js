const Welcome = (emailContent) => {
    const description = `
        <h1>Hello ${emailContent.name}</h1>
Welcome To Our Chat App
        <p>Now You can Succesfully login to User Webiste  </p>
    `;
    const title = "Welcome";

    return {
        title,
        description
    };
};

module.exports = Welcome;
