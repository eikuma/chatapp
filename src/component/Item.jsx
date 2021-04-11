const Item = ({ user, content }) => {
    return (
        <li>
            {`${user} : ${content}`}
        </li>
    )
}

export default Item;