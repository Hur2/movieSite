import Axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'antd';

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber,setFavoriteNumber] = useState(0)
    const [Favorited,setFavorited] = useState(false)

    let variables = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }

    useEffect(() => {

        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(response.data.favoriteNumber)
                } else {
                    alert('숫자 정보를 가져오는데 실패 했습니다.')
                }
            })

        Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if(response.data.success){
                    setFavorited(response.data.favorited)
                } else {
                    alert('정보를 가져오는데 실패 했습니다.')
                }
            })
    }, [])

    const onClickFavorite = () => {
        if(Favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if(response.data.success){
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Favorite 리스트에서 지우기 실패.')
                    }
                })
        } else {
            Axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if(response.data.success){
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Favorite 리스트에 추가 실패.')
                    }
                })
        }
    }

    return (
        <div>
            <Button onClick={onClickFavorite}>{Favorited? "Not Favorite":"Add to Favorite"} {FavoriteNumber}</Button>
        </div>
    );
}

export default Favorite;