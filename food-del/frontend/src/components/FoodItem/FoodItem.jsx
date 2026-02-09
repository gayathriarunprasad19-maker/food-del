import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import { Link } from "react-router-dom"

const FoodItem = ({ image, name, price, description, id }) => {

    const { cartItems, addToCart, removeFromCart, currency } = useContext(StoreContext);

    return (
        <div className='food-item'>
            <div className='food-item-img-container'>

                <Link to={`/food/${id}`}>
                    <img
                        className='food-item-image'
                        src={image}
                        alt={name}
                    />
                </Link>

                {!cartItems[id]
                    ? <img
                        className='add'
                        onClick={() => addToCart(id)}
                        src={assets.add_icon_white}
                        alt=""
                    />
                    : <div className="food-item-counter">
                        <img
                            src={assets.remove_icon_red}
                            onClick={() => removeFromCart(id)}
                            alt=""
                        />
                        <p>{cartItems[id]}</p>
                        <img
                            src={assets.add_icon_green}
                            onClick={() => addToCart(id)}
                            alt=""
                        />
                    </div>
                }
            </div>

            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <Link to={`/food/${id}`} className="food-link">
                        <p>{name}</p>
                    </Link>
                    <img src={assets.rating_starts} alt="" />
                </div>

                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">{currency}{price}</p>
            </div>
        </div>
    )
}

export default FoodItem
