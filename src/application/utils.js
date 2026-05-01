
export function component2json(component){
    if(!component) return null;

    const obj = {
        object: component.name, 
        class: component.constructor.name,
        properties: component.properties,
        children: []
    }
    for (const [key, compNode] of Object.entries(component.__owl__.children)) {
        obj.children.push(component2json(compNode.component))
    }

    return obj
}