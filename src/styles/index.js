import styled from 'styled-components';

export const WheelWrapper = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
`;

export const Message = styled.div`
    color: ${(props) => props.color}
`;

export const WheelItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 30%;
    max-width: 150px;
    height: 150px;
    margin: 10px;
    padding: 10px;
    border: 7px solid;
    overflow: hidden;
    border-radius: 20px;

    @keyframes spin {
        0% {
            transform: translateY(-100%);
        }
        100% {
            transform: translateY(100%);
        }
    }
    @keyframes stop {
        0% {
            transform: translateY(-100%);
        }
        100% {
            transform: translateY(0%);
            transition: 1s;
        }
    }
    img {
        width: 100%;
        animation: ${(props) => (props.stop ? 'spin 150ms infinite linear' : 'stop')};
    }
`;

export const Button = styled.button`
    font-size: 20px;
    width: 100px;
    height: 100px;
    margin: 20px;
    border-radius: 50%;
    ${(props) => (props.color === 'success'
    ? `
            background: #8BC34A;
            border: 1px solid green;
        `
    : `
            background: #E91E63;
            border: 1px solid red;
        `)
}
    color: #ffffff;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
    outline: none;
`;
