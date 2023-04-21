import { ChangeEvent, useContext, useRef } from "react"
import { PlacesContext } from "../context"

export const SearchBar = () => {

    const {searchPlacesByQuery} = useContext(PlacesContext)
    // Debounce manual implementation
    const debounceRef = useRef<ReturnType<typeof setTimeout>>()

    const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
        if (debounceRef.current)
            clearTimeout(debounceRef.current)

        debounceRef.current = setTimeout(() => {
            // Buscar o ejecutar la consulta
            searchPlacesByQuery(event.target.value)
            // Limpiar el input
            event.target.value = ''
            // console.log('Debounce value: ', event.target.value)
        }, 500)

    }

    return (
        <div
            className="search-container"
        >
            <input
                type="text"
                placeholder="Search..."
                className="search-input"
                onChange={onQueryChanged}
            />
        </div>
    )
}
