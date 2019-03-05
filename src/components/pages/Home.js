import React from 'react';
import axios from 'axios';
import Navigation from '../general/Navigation';
import styled from 'styled-components';
import ResourceCard from '../general/ResourceCard';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resources: [],
        };
    }

    componentDidMount() {
        console.log('component did mount');
        fetch(`${process.env.BACK_END_URL}/getResources`, {
            credentials: 'include',
        })
            .then(response => response.json())
            .then(response => {
                this.setState({ resources: response.resources });

                console.log(this.state.resources);
            });
    }

    render() {
        return (
            <Resources>
                {this.state.resources.map(name => (
                    <ResourceCard title={name} />
                ))}
            </Resources>
        );
    }
}

const Resources = styled.div`
    display: grid;
    width: 80%;
    margin: 10vw auto;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;
`;

export default Home;
