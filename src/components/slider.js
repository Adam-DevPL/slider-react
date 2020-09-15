import React, { useState, useEffect } from 'react';
import regeneratorRuntime from 'regenerator-runtime';

import './slider.scss';


const Slider = ({ slides }) => {
    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }



    const [curr, setCurr] = useState(0);
    const [user, setUser] = useState(slides[curr].user);
    const [avatar, setAvatar] = useState("");
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const goToNext = () => {

        let temp = (curr === slides.length - 1) ? 0 : (curr + 1);
        setCurr(temp);
        setUser(slides[temp].user);


    }

    const goToPrev = () => {

        let temp = (curr === 0) ? slides.length - 1 : (curr - 1);
        setCurr(temp);
        setUser(slides[temp].user);

    }

    useEffect(() => {

        const fetchData = async () => {

            setIsError(false);
            setIsLoading(true);

            try {
                const response = await fetch(`https://api.github.com/users/${user}`);
                const data = await response.json();
                if (data.message) {
                    setIsError(true);
                } else {
                    setData(data);

                }

            } catch (error) {
                setIsError(true);
                console.log(`Error ${error}`)
            }

            setIsLoading(false);
        }

        fetchData();

    }, [user]);

    const setData = ({ avatar_url }) => {
        setAvatar(avatar_url);
    }

    function checkError() {
        if (isError) {
            return ("");
        } else return (avatar);
    }

    return (
        <section className="slider">
            <h2 className="header">{user}</h2>
            <div className="slider__container">
                {isError && <span className="slider__error">Something went wrong...</span>}
                {isLoading ? (
                    <span className="slider__loading">Loading...</span>
                ) : (
                        <img className="image" src={checkError()} />
                    )}
            </div>
            <button className="buttonPrev" onClick={goToPrev}>Previous</button>
            <button className="buttonNext" onClick={goToNext}>Next</button>
        </section>
    );
}

export default Slider;