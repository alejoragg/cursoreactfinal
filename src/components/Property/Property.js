import { useEffect, useState } from "react"
import ItemList from "../ItemList/ItemList"

const Property = () => {
    const [properties, setProperties] = useState([])
    useEffect(()=>{
        const data = `{
            "current_localization_id":1,
            "current_localization_type":"country",
            "price_from":1,
            "price_to":999999999999,
            "operation_types":[1,2,3],
            "property_types":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
            "currency":"ANY",
            "filters":[]
        }`
        fetch(`http://tokkobroker.com/api/v1/property/search/?order_by=price&order=desc&format=json&key=5940ea45eb7cfb55228bec0b958ea9c0be151757&lang=es_ar&offset=4&limit=10&data=${data}`)
        .then(response => {
            return response.json()
        }).then(json => {
            setProperties(json.objects)
        })
    },[])
    console.log(properties)
    return(
            <div>
                {properties.map(p => {
                    return (
                        <div>
                            {<ItemList key={p.id} {...p} initial={1}/>}
                        </div>
                    )
                })}            
            </div>
    )
}
export default Property