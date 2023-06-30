export function Post( { post, like } ) {
    return (
        <div className="post__item__wrapper">
            <div className="post__avatar"></div>
            <div className="post__text">{ post }</div>
            <div className="post__setup">
                <div className="post__likes">Likes: { like }</div>
            </div>
        </div>
    )
}