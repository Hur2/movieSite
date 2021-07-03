import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Popover } from 'antd';
import './FavoritePage.css';
import { IMAGE_BASE_URL } from '../../Config';

function FavoritePage() {

    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
        fetchFavoredMovie()
    })

    const fetchFavoredMovie = () => {
        Axios.post('/api/favorite/getFavoritedMovie', { userFrom: localStorage.getItem('userId') })
        .then(response => {
            if(response.data.success) {
                setFavorites(response.data.favorites)
            } else {
                alert('영화 정보를 불러오는데 실패.')
            }
        })
    }

    const renderCards = Favorites.map((favorite, index) => {

        const content = (
            <div>
                {favorite.moviePost ?
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}/> : "no longer"
                }
            </div>
        )

        return <tr key={index}>
            <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
            </Popover>
            <td>{favorite.movieRunTime} mins</td>
            <td><Button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</Button></td>
        </tr>
    })

    const onClickDelete = (movieId, userFrom) => {

        const variables = {
            movieId,
            userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if(response.data.success) {
                    fetchFavoredMovie()    
                } else {
                    alert('리스트에서 삭제 실패.')
                }
            })
    }

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2> Favorite Movies </h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                        <td>Remove from favorite</td>
                    </tr>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>
        </div>
    );
}

export default FavoritePage;