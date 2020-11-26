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
        const response = await api.get('user');        
        this.setState({ user: response.data.data });
    }
    
    
    findAUser = async (evt) => {
        let response;
        if (evt.target.value.length) {
            response = await api.get('user/search/'+decodeURI(evt.target.value));            
        } else {
            response = await api.get('user/');
        }
        this.setState({ user: response.data.data });
    }

    render() {
        return (
            <section id="user-list">
                <input
                    type='text'
                    placeholder='search'
                    onChange={this.findAUser}
                />
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