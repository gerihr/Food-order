
const defaultEntryPoint = "http://localhost:3001"

const DataSource = (url) => {

    const saveToken = (token) => {
        localStorage.setItem("jwt_token", token);
    }
    const getToken = () => {
        return localStorage.getItem("jwt_token");
    }

    const removeToken = () => {
        localStorage.removeItem("jwt_token");
    }

    const handleUnauthorized = (response) => {
        if(response.status){
            if(response.status > 300){
                
            }
        }
    }

  return {
    login: async ({ email, password }) => {
       const response = await fetch(`${url}/login`, {
            headers: new Headers({"Content-Type":"application/json"}),
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        if(response.ok){
            const data = await response.json();
            saveToken(data.token);
            return data;
        }else{
            throw await response.json();
        }
    },
    logout: async () => {
        //TODO: fetch logout
        removeToken();
    },
    register: async ({ email, password }) => {
        const response = await fetch(`${url}/register`, {
            headers: new Headers({"Content-Type":"application/json"}),
            method: 'POST',
            body: JSON.stringify({ email, password })
        })
        if(response.ok){
            const data = await response.json();
            saveToken(data.token);
            return data;
        }else{
            throw await response.json();
        }
    },
    get: async ({ source, options }) => {
        const defaultOptions = {
            id: null
        }
        options = { ...defaultOptions, ...options };
        if(!source)
            throw new Error("To get a source you need to pass a which source you need to get");
        const response = await fetch(`${url}/${source}/${(options.id || "")}`, {
            headers: new Headers({
                "Authorization": `Bearer ${getToken()}`,
                "Content-Type":"application/json"
            }),
            method: 'GET'
        })
        if(response.ok){
            return await response.json();
        }else{
            throw await response.json();
        }
    },
    update: async ({ source, options }) => {
        const defaultOptions = {
            id: null,
            newObject: null
        }
        options = { ...defaultOptions, ...options };
        if(options.id == null || options.newObject == null || !source){
            throw new Error("To update an entity you have to pass ID and/or new object");
        }
        const response = await fetch(`${url}/${source}/${(options.id)}`, {
            headers: new Headers({
                "Authorization": `Bearer ${getToken()}`,
                "Content-Type":"application/json"
            }),
            method: 'PUT',
            body: JSON.stringify({
                ...options.newObject
            })
        })
        if(response.ok){
            return await response.json();
        }else{
            throw await response.json();
        }
    },
    delete: async ({ source, options }) => {
        const defaultOptions = {
            id: null
        }
        options = { ...defaultOptions, ...options };
        if(options.id == null || !source){
            throw new Error("To delete an entity you have to pass ID and source");
        }
        const response = await fetch(`${url}/${source}/${(options.id)}`, {
            headers: new Headers({
                "Authorization": `Bearer ${getToken()}`,
                "Content-Type":"application/json"
            }),
            method: 'DELETE'
        })
        if(response.ok){
            return await response.json();
        }else{
            throw await response.json();
        }
    },
    post: async ({ source, options }) => {
        const defaultOptions = {
            object: null
        }
        options = { ...defaultOptions, ...options };
        if(options.object == null || !source){
            throw new Error("To post an entity you have to object and source");
        }
        const response = await fetch(`${url}/${source}`, {
            headers: new Headers({
                "Authorization": `Bearer ${getToken()}`,
                "Content-Type":"application/json"
            }),
            method: 'POST',
            body: JSON.stringify(options.object)
        })
        if(response.ok){
            return await response.json();
        }else{
            throw await response.json();
        }
    },
  }
};

export default DataSource(defaultEntryPoint);
