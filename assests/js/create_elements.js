export function create_element({ type = 'div', classes = [], text_content = '', href = '', attributes = []}) {
    const element = document.createElement(type)

    classes.forEach(clas => { element.classList.add(clas) })
    attributes.forEach(attribute => { element.setAttribute(attribute[0], attribute[1])})
    element.textContent = text_content
    if (!!href) { element.href = href }

    return element
}