const setPageTitle=(title)=>{
    document.title=title;
};

const isUserLoggedIn=()=>{
        const userJwtToken=localStorage.getItem("userJwtToken");
        return !!userJwtToken;
}

const getUserJwtToken=()=>{
    const userJwtToken=localStorage.getItem("userJwtToken")
    return userJwtToken;
}

const getUserData=()=>{
    const userData=localStorage.getItem("userData")||"{}";
    return JSON.parse(userData);
}

export {isUserLoggedIn,setPageTitle,getUserJwtToken,getUserData};