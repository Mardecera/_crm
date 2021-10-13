export function get_element(string) {
    return document.querySelector(string)
}

export function get_element_all(string) {
    return document.querySelectorAll(string)
}

export function fill_fields() {
    const number_random = Math.random().toFixed(1) * 10
    
    get_element('#name').value = 'Jhon'
    get_element('#email').value = `email.test.${number_random}@gmail.com`
    get_element('#phone').value = `9${number_random}71${number_random}64${number_random}4`
    get_element('#company').value = 'Atlanta'
}

export function getHTML({ type = 'div', classes = [], text_content = '', href = '', attributes = []}) {
    const element = document.createElement(type)

    classes.forEach(clas => element.classList.add(clas) )
    attributes.forEach(attribute => { element.setAttribute(attribute[0], attribute[1])})
    element.textContent = text_content
    if (!!href) { element.href = href }

    return element
}