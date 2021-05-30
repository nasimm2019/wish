import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import StarIcon from '@material-ui/icons/Star';
export default function Card({ item }) {
    return (
        <div className="main-card">
            <div className="main-card__details">
                <div>
                    <StaticImage src="./icon.png" alt="wish" />
                </div>
                <div className="main-card__content">
                    <h3>{item.name}</h3>
                    <h4>Price:{item.price}$ </h4>
                    <div className="d-flex justify-content-between main-card__rate-section">
                        <div className="main-card__rate">
                            <StarIcon style={{ color: "#EAE21C" }} />{item.rate}
                        </div>
                        <div className="grren-color">
                            {
                                item.available ? 'Available' : 'UnAvailable'
                            }

                        </div>
                    </div>
                </div>
            </div>
            <div className="main-card__btn">
                <button>Buy</button>
            </div>
        
        </div>
    )
}