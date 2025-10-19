// -- Functions -- 
async function getUserData(){
    const response = await fetch("http://127.0.0.1:8000/getUserData")
    if(!response.ok){
        throw new Error("Could Not Fetch User Data")
    }

    const data = await response.json()
    return data
}
getUserData()
    .then(userObject => {
        userData = JSON.parse(userObject)
        console.log(userData)
    })
    .catch(error => {
        console.error("Error handling user data:", error);
    });