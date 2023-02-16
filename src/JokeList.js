import React, { Component } from "react";
import Joke from "./Joke"
import axios from "axios";
import './JokeList.css';
import { v4 as uuidv4 } from 'uuid';
class JokeList extends Component { 
    static defaultProps = {
        amtJokes: 10
    }
    constructor(props) { 
        super(props);
        this.state = {
            jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
            loading: false
        };
        this.seenJokes = new Set(this.state.jokes.map(t => t.joke))
        this.vote = this.vote.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    componentDidMount() {
        if (this.state.jokes.length === 0) {
            this.getJokes();
        }
    }
    async getJokes() {
        try {
            const dadJokes = [];
            while (dadJokes.length < this.props.amtJokes) {
                const response = await axios.get('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } });
                if (!this.seenJokes.has(response.data.joke)) {
                    dadJokes.push({ id: uuidv4(), joke: response.data.joke, votes: 0 });
                } else {
                    console.log('dupe found');
                    console.log(response.data.joke);
                }
            }
            this.setState(
                { jokes: [...this.state.jokes, ...dadJokes], loading: false },
                () => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
            );
        } catch (e) { 
            console.alert(e.message);
            this.setState({ loading: false });
        }
    }
    handleClick() {
        this.setState({ loading: true }, this.getJokes);
    }
    handleReset() {
        window.localStorage.clear();
        window.location.reload();
    }
    vote(id,delta) {
        const updatedJokes = this.state.jokes.map(j => j.id === id ? { ...j, votes: j.votes + delta } : j)
        this.setState(
            { jokes: updatedJokes },
            () => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
        );
    }
    render() { 
        if (this.state.loading) {
            return (
                <div className="JokeList-spinner">
                    <div className="JokeList-spin">
                        <span className="ec ec-laughing"></span>
                    </div>
                    <h1 className="JokeList-title">Loading...</h1>
                </div>
            )
        }
        let jokes = this.state.jokes.sort((a,b) => b.votes - a.votes)
        return (
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title">
                        <span>Dad</span> Jokes
                    </h1>
                    <img
                        src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
                        alt="laugh emoji"
                    />
                    <button className="JokeList-moreBtn" onClick={this.handleClick}>More Jokes</button>
                    <button className="JokeList-moreBtn2" onClick={this.handleReset}>Reset</button>
                </div>
                <div className="JokeList-jokes">
                    {jokes.map(j => <Joke key={j.id} id={j.id} joke={j.joke} vote={this.vote} votes={j.votes} />)}
                </div>
            </div>
        )
    }
}
export default JokeList;