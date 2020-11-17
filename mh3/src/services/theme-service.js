

const getTheme = brand => {    
    return fetch(`/${brand}/theme.json`).then(res => res.json())
}

export default getTheme