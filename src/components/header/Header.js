import React, { useState } from "react"
import { StaticImage } from "gatsby-plugin-image"
export default function Header() {
    const [open, setOpen] = useState(false)
    return (
        <div className={`${open ? 'header__open' : ''} header`}>
            <div>
                <StaticImage src="../../assets/images/logo.png" alt="wish" />
            </div>
            <div className="header__btns">
                <button>Login</button>
                <button className="header__sign-up">Signup</button>
            </div>
            <div className="header__expand" onClick={() => setOpen(!open)}>
                {
                    open ? <StaticImage src="../../assets/images/close.png" alt="wish" /> :
                        <StaticImage src="../../assets/images/expand.png" alt="wish" />
                }
            </div>
            {
                open && (
                    <div className="header__drawer">
                        <div className="header__drawer__btns">
                            <button>Login</button>
                            <button className="header__sign-up">Signup</button>
                        </div>

                    </div>
                )
            }

        </div>
    )
}