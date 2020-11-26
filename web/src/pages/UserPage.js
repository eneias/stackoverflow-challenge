import React, { Component } from 'react';
import api from '../services/api';
import io from 'socket.io-client';

import './UserPage.css';

import more from '../assets/more.svg';

class UserPage extends Component {
    state = {
        user: [],
    }

    async componentDidMount() {
        this.registerToSocket();

        const response = await api.get('user');

        console.log(response.data.data);
        
        this.setState({ user: response.data.data });
    }

    registerToSocket = () => {
        const socket = io('http://localhost:3333');

        socket.on('user', newUser => {
            this.setState({ user: [newUser, ...this.state.user] });
        });
    }

    render() {
        return (
            <section id="user-list">
                { this.state.user.map(user => (
                    <article key={user._id}>
                    <header>
                        <div className="user-info">
                            <span>{user.display_name}</span>
                            <span className="place">{user.location}</span>
                            <span className="place"><a href={user.link}>{user.link}</a></span>
                            
                        </div>

                        <img src={more} alt="More" />
                    </header>

                    <img src={`${user.profile_image}`} alt="" />

                    <footer>
                        <strong><a href={user.website_url}>{user.website_url}</a> </strong>
                        <p>
                            <span>last access on {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(user.last_access_date)}</span>
                        </p>
                    </footer>
                </article>
                ))}
            </section>
        );
    }
}

export default UserPage;