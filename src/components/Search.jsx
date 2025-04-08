
const Search = ({ searchInput, setSearchInput }) => {
    return (
        <div className="search">
            <div>
                <img src="/search.svg" alt="Search-icon"  />
                <input
                    placeholder="Search From Thousands of movies"
                    className="search-inpu"
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}/>
            </div>
        </div>
    )
}

export default Search;