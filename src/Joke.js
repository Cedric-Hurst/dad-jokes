import React, { Component } from "react";
import './Joke.css'
class Joke extends Component { 
    constructor(props) { 
        super(props);
        this.upVote = this.upVote.bind(this);
        this.downVote = this.downVote.bind(this);
    }
    getColor() {
        const { votes } = this.props;
        if (votes >= 15) return "#4CAF50";
        else if (votes >= 12) return "#8BC34A";
        else if (votes >= 9) return "#CDDC39";
        else if (votes >= 6) return "#FFEB3B";
        else if (votes >= 3) return "#FFC107";
        else if (votes >= 0) return "#FF9800";
        else return "#f44336";
    }
    getFace() {
        const { votes } = this.props;
        if (votes >= 15) return "ec ec-rofl";
        else if (votes >= 12) return "ec ec-laughing";
        else if (votes >= 9) return "ec ec-smile";
        else if (votes >= 6) return "ec ec-slightly-smiling-face";
        else if (votes >= 3) return "ec ec-neutral-face";
        else if (votes >= 0) return "ec ec-unamused";
        else return "ec ec-rage";
    }

    upVote() {
        this.props.vote(this.props.id, 1);
    }
    downVote() {
        this.props.vote(this.props.id, -1);
    }
    render() { 
        return (
            <div className="Joke">
                <div className="Joke-buttons">
                    <span onClick={this.upVote} className="ec ec-plus1"></span>
                    <span style={{borderColor: this.getColor()}} className="Joke-votes">{this.props.votes}</span>
                    <span onClick={this.downVote} className="ec ec--1"></span>
                </div>
                <div className="Joke-text">{this.props.joke}</div>
                <div className="Joke-smiley">
                    <span className={this.getFace()}></span>
                </div>
            </div>
        )
    }
}
export default Joke;