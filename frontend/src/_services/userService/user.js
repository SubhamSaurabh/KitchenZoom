import urls from './../../conf';

var base_url = urls.dev_url;

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            "email": username, 
            "password": password
        })
    };
    
    return fetch(`${base_url}user/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                user.authdata = window.btoa(username + ':' + password);
                //localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', user.token);
                localStorage.setItem('staff', false);
                localStorage.setItem('email', user.email);
                //console.log("Success!!")
            }

            return user;
        }).catch((e) => {return ({'status':'fail', 'message': `Connection refused! ${e}`})});
}


function stafflogin(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            "email": username, 
            "password": password
        })
    };
    
    return fetch(`${base_url}user/stafflogin`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                user.authdata = window.btoa(username + ':' + password);
                //localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', user.token);
                localStorage.setItem('staff', true);
                localStorage.setItem('email', user.email);
                //console.log("Success!!")
            }

            return user;
        }).catch((e) => {return ({'status':'fail', 'message': `Connection refused! ${e}`})});
}


function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('staff');
    localStorage.removeItem('email');
    
    
}

function register(data) {
    //console.log(data);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(`${base_url}user/register`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                //user.authdata = window.btoa(username + ':' + password);
                //localStorage.setItem('user', JSON.stringify(user));
                //localStorage.setItem('token', user.token);
                console.log("Success Registration!!")
            }

            return user;
        }).catch((e) => {return ({'status':'fail', 'message': `Connection refused! ${e}`})});
}

const userService = {
    login,
    logout,
    register,
    stafflogin
};


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        // console.log(data)
        if (!response.ok) {
            if (response.status === 400) {
                // auto logout if 401 response returned from api
                logout();
                console.log(data.message);
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}


export default userService;