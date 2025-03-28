import React, { useEffect, useState } from 'react';
import SearchBar from "material-ui-search-bar";
import Back_Button from '../button/Back_Button';
import { Link } from 'react-router-dom';
import './search_option.css'
import axios from 'axios';

const Search_option = () => {
    const [showSearchBox, setShowSearchBox] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [showRelated, setShowRelated] = useState(false);
    const [Searchresults, setSearchresults] = useState([]);
    const [TopSearches, setTopSearches] = useState([]);

    const ainmate_slideInRight = "animate__animated animate__slideInRight animate__faster";
    const ainmate_fadeIn = "animate__animated animate__fadeIn";
    const ainmate_fadeInUp = "animate__animated animate__fadeInUp animate__faster ";

    var api_base_url = import.meta.env.VITE_API_BASE_URL + "/files/products/";

    const handleshowSearchBox = () => {
        setShowSearchBox(true)
        setShowRelated(true)
    }

    const handleSearchInputFocus = () => {
        setShowRelated(true)
    }

    const closeSearchBox = () => {
        setSearchValue("");
        setShowSearchBox(false)
        setShowRelated(false);
    }

    const searchProductByName = async (newValue) => {
        setSearchValue(newValue)

        if (newValue.length >= 2) {

            try {
                const response = await axios.get(import.meta.env.VITE_API_USER_PRODUCT_SEARCH_BY_NAME, {
                    params: { pro_name: newValue }
                });
                if (response.data.msg == 'success') {
                    setSearchresults(response.data.product_list);
                    saveRecentSearch(newValue);
                }
            }// return response.data;
            catch (error) {
                console.error("Error fetching product:", error);
                setSearchresults([]);
                return null;
            }

        } else {
            setSearchresults([]);
        }
    }

    const saveRecentSearch = (searchTerm) => {
        let searches = JSON.parse(localStorage.getItem('topsearches')) || [];

        // Remove if already exists to avoid duplicates
        searches = searches.filter(term => term !== searchTerm);

        // Add the new search term at the beginning
        searches.unshift(searchTerm);

        // Keep only the top 5 searches
        searches = searches.slice(0, 5);

        // Save back to localStorage
        localStorage.setItem('topsearches', JSON.stringify(searches));
    };

    const doSomethingWith = (value) => {
        console.log("Search initiated with:", value);
    };

    // useEffect to load recent searches when the component mounts
    useEffect(() => {
        const savedSearches = JSON.parse(localStorage.getItem('topsearches')) || [];
        setTopSearches(savedSearches);
    }, []);

    return (
        <div className={`container-fluid p-0 w-100 searchMainBox  ${showRelated ? `searchFocus ${ainmate_slideInRight}` : "searchblur"}`}  >
            <div className='container  p-0'>
                <div className="d-flex justify-content-center p-3 ">
                    {showRelated && (
                        <div className='fw-bold me-2' style={{ width: "10%" }} onClick={() => {
                            closeSearchBox()
                        }} > < Back_Button /> </div>
                    )}
                    {
                        showSearchBox
                            ?
                            <SearchBar
                                style={{ width: "90%", height: "40px", fontSize: "12px" }}
                                value={searchValue}
                                onChange={(newValue) => searchProductByName(newValue)}
                                onRequestSearch={() => doSomethingWith(searchValue)}
                                onFocus={() => handleSearchInputFocus()}
                            />
                            :
                            <div onClick={() => handleshowSearchBox()} className='cp' >
                                <i className='fa fa-search f20 ' style={{ color: "#2b5ffd" }}></i>
                            </div>
                    }

                </div>

                {
                    Searchresults.length > 0 ? (
                        <div className={` relatedsearch   ${ainmate_fadeIn}`} >
                            <div className='d-flex  flex-wrap p-md-5 p-2'>
                                {
                                    Searchresults.map((item, index) => {
                                        const formattedSlug = item.slug.replace(/\s+/g, '-'); // Replace spaces with '-'
                                        const formattedCatName = item.cat_name.replace(/\s+/g, '-'); // Replace spaces with '-'

                                        return (
                                            <a href={`/${formattedCatName}/${formattedSlug}/${item.product_id}`} key={index} className='searchedItem'>
                                                <div className='f16'>
                                                    <img src={`${api_base_url}${item.cat_id}/${item.product_id}/${item.img1}`} className='searchItemImage' alt="" />
                                                    {item.title.length > 21 ? item.title.slice(0, 21) + "..." : item.title}
                                                </div>
                                            </a>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    ) : null
                }


                {TopSearches.length ? (
                    <div className={` relatedsearch bg-white  ${ainmate_fadeInUp}`} >
                        <div className='d-flex  flex-wrap p-md-5 p-2'>
                            {
                                TopSearches.map((item, index) => {
                                    return (
                                        <a href="search/atatas" key={index}
                                            className='recently_searched'><div className='f12'>{item}</div>
                                        </a>
                                    )
                                })
                            }
                        </div>
                    </div>
                ) : null
                }
            </div>
        </div >
    );
};

export default Search_option;
