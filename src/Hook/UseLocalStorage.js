import {useState, useEffect} from "react";
/**Custom hook for keeping state data synced with localStorage.
 * 
 * this creates `item` as state and look in localStorage for current value
 * (if not found, default to `firstValue`)
 * 
 * when `item` changes, effect re-runs:
 * -if new state is null, removes from lcoalStorage
 * -else, updates localStorage
 * 
 * To the component, this kist act like state that is also synced to/from
 * localStorage::
 * 
 * const [myThing, setMyThing] = useLocalStorage("myThing")
 */


function useLocalStorage(key, firstValue = null){
    const initialValue = localStorage.getItem(key) || firstValue

    const [item, setItem] = useState(initialValue)

    useEffect(function setKeyInLocalStorage(){
        console.debug("hooks useLocalStorage useEffect", "item", item);

        if(item === null){
            localStorage.removeItem(key)
        }else{
            localStorage.setItem(key, item)
        }
    }, [key, item])

    return [item, setItem]

}

export default useLocalStorage