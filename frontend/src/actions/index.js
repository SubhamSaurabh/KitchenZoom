
const setToken = (token) => ({
    type: "LOGIN",
    token,
})
const setMenu = (menu) => ({
    type: "MENU",
    menu,
})


const setVeg = (veg) => ({
    type: "VEG",
    veg,
})

const addMeal = (meal) => ({
    type: "AVAIL",
    meal
})

const removeMeal = (meal) => ({
    type: "REMOVE",
    meal
})

const setStaff = (isStaff) => ({
    type: "ISSTAFF",
    isStaff
})

const logoutAction = () => ({
    type: 'LOGOUT'
})

export {setToken, setVeg, setStaff, logoutAction, setMenu, addMeal, removeMeal};