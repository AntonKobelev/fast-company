import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api";
import AddCommentForm from "../common/comments/addCommentForm";
import CommentsList from "../common/comments/commentsList";
import orderBy from "lodash/orderBy";

const Comments = () => {
    // получим параметры маршрута
    const { userId } = useParams();
    // создадим хук useState - комментарии
    const [comments, setComments] = useState([]);
    // вызовем хук useEffect, делаем запрос комментариев к api затем записываем их в массив comments
    useEffect(() => {
        API.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);
    // создадим функцию handleSubmit, передаем туда data - которые прилетели из addCommentForm
    const handleSubmit = (data) => {
        API.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...comments, data]));
    };

    console.log("comments", comments);
    const handleRemoveComment = (id) => {
        API.comments.remove(id).then((id) => {
            setComments(comments.filter((x) => x._id !== id));
        });
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    <CommentsList
                        comments={sortedComments}
                        onRemove={handleRemoveComment}
                    />
                </div>
            </div>
        </>
    );
};

export default Comments;
