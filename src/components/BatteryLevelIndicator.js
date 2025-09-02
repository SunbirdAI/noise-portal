import React from 'react';
import styled, { css } from 'styled-components';
import { MdBatteryFull, MdBatteryStd, MdBatteryAlert } from 'react-icons/md';

const getBatteryColor = (level) => {
    if (typeof level !== 'number') return 'gray';
    if (level > 80) return 'green';
    if (level > 50) return 'goldenrod';
    return 'red';
};

const getBatteryIcon = (level) => {
    if (typeof level !== 'number') return <MdBatteryAlert />;
    if (level > 80) return <MdBatteryFull />;
    if (level > 50) return <MdBatteryStd />;
    return <MdBatteryAlert />;
};

const sizeStyles = {
    small: css`
        font-size: 1rem;
        padding: 0.2rem 0.4rem;
    `,
    medium: css`
        font-size: 1.5rem;
        padding: 0.3rem 0.6rem;
    `,
    large: css`
        font-size: 2rem;
        padding: 0.4rem 0.8rem;
    `
};

const BatteryContainer = styled.span`
    display: inline-flex;
    align-items: center;
    font-weight: bold;
    color: ${({ level }) => getBatteryColor(level)};
    ${({ size }) => sizeStyles[size || 'medium']}
`;

const BatteryLevelIndicator = ({ batteryLevel, size = 'medium' }) => (
    <BatteryContainer level={batteryLevel} size={size}>
        {getBatteryIcon(batteryLevel)}
        <span style={{ marginLeft: '0.4em' }}>{
            typeof batteryLevel === 'number' ? `${batteryLevel}%` : 'Unknown'
        }</span>
    </BatteryContainer>
);

export default BatteryLevelIndicator;
