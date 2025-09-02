import React from 'react';
import styled from 'styled-components';

// Status dot colors
const statusColors = {
    online: 'green',
    offline: 'red',
    unknown: 'gray',
    warning: 'goldenrod'
};

const CardContainer = styled.div`
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
    padding: 1.2rem 1.5rem;
    margin: 0.5rem 0;
    min-width: 220px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const CardTitle = styled.h3`
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.7rem;
`;

const StatusRow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
`;

const StatusDot = styled.span`
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ status }) => statusColors[status] || statusColors.unknown};
    margin-right: 0.5em;
`;

const Label = styled.span`
    font-weight: 500;
    margin-right: 0.5em;
`;

const Value = styled.span`
    font-weight: 400;
    color: #333;
`;

const DeviceHealthCard = ({ deviceHealth }) => {
    if (!deviceHealth) return null;
    const { status = 'unknown', lastSeen = 'N/A', connectivity = 'N/A' } = deviceHealth;
    return (
        <CardContainer>
            <CardTitle>Device Health</CardTitle>
            <StatusRow>
                <StatusDot status={status}/>
                <Label>Status:</Label>
                <Value>{status.charAt(0).toUpperCase() + status.slice(1)}</Value>
            </StatusRow>
            <StatusRow>
                <Label>Last Seen:</Label>
                <Value>{lastSeen}</Value>
            </StatusRow>
            <StatusRow>
                <Label>Connectivity:</Label>
                <Value>{connectivity}</Value>
            </StatusRow>
        </CardContainer>
    );
};

export default DeviceHealthCard;
