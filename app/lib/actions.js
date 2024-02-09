"use server"

export const submitId = async (formData) =>{
    const id = formData.get("id")
    pushId(parseInt(id))
    return formData; 
}

const getData = async () =>{
    const res = await 
fetch("https://jsonplaceholder.typicode.com/users");

    if(!res.ok){
        throw new Error("Something went wrong")
    }

    return res.json()
}

// Fetch users data from the API
const users = await getData();

export const pushId = (id) => {
    users.forEach((user) => {
        //console.log(user)
        if (user.id === id) {
            console.log(user.name);
        } else {
            return null
        }
    });
};
