import React from "react";
import anim from "./price_chart_anime.webm"

export default class Pattern extends React.Component {

    render() {
        return (
            <video className="pattern" autoPlay muted loop>
                <source src={anim} type="video/mp4"/>
            </video>
        );
    }
}
