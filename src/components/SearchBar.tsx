import { ChangeEvent, useRef } from "react"


export const SearchBar = () => {

    // Debounce manual implementation
    const debounceRef = useRef<ReturnType<typeof setTimeout>>()

    const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
        if (debounceRef.current)
            clearTimeout(debounceRef.current)

        debounceRef.current = setTimeout(() => {
            // Buscar o ejecutar la consulta
            

            console.log('Debounce value: ', event.target.value)
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
