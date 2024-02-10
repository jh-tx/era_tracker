"use server"

export const submitId = async (formData) =>{
    const name = formData.get("name")
    pushId(name)
    return formData; 
}

export const getData = async () =>{
    const res = await 
fetch("https://jsonplaceholder.typicode.com/users");

    if(!res.ok){
        throw new Error("Something went wrong")
    }

    return res.json()
}

// Fetch users data from the API
const users = await getData();

export const pushId = (param) => {
    users.forEach((user) => {
        //console.log(user)
        if (user.name === param) {
            return user.name;
        } else {
            return null
        }
    });
};
