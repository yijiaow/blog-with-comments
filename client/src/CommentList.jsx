import React from 'react';

const CommentList = ({ comments }) => {
  return (
    <div className="d-flex flex-column">
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className="card-body">
            <p>
              {comment.status === 'approved'
                ? comment.content
                : comment.status === 'rejected'
                ? 'This comment has been rejected'
                : 'This comment is awaiting moderation'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
