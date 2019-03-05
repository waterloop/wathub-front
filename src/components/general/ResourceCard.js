import React from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
} from 'reactstrap';
import styled from 'styled-components';

const ResourceCard = props => {
    return (
        <div>
            <Card>
                <StyledCard>
                    <CardTitle>{props.title}</CardTitle>
                </StyledCard>
            </Card>
        </div>
    );
};

const StyledCard = styled(CardBody)`
    border-top: 3px solid #ffc107;
    h5 {
        margin: 0;
    }
`;

export default ResourceCard;
