import React from 'react';
//import { Form, Text } from 'react-form';
class Comment extends React.Component {
    render() {
       return(
           <div className="comment">
            <p className="comment-body">
                {this.props.body}
            </p>
          </div>
        )
      }
    }

class CommentForm extends React.Component {
       render() {
          return (
         <div>
        <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
            <h3 style={{color:'blue'}}>Join the discussion</h3>
            <div className="common-form-fields">
            <br/>
              <textarea placeholder="Comment:"
               style={{ height: 100 , width:300}}
              ref={(textarea) => this._body = textarea} ></textarea>
            </div>
            <br/>
          <div className="comment-form-actions">
              <button type="submit">
                Post Comment
              </button>
           </div>
        </form>
        </div>
      );
    }
    _handleSubmit(event) {
      event.preventDefault();
      let body = this._body;
      if (body === null)
       return
      this.props.addComment(body.value);
  }
}


export default class CommentBox extends React.Component {
  constructor() {
     super();
      this.state = {

          comments: [
            { id: 1,  body: 'Great picture!' },
            { id: 2,  body: 'Excellent stuff' },
            { id: 3,  body: 'Excellent stuff,wow' }            ]
          };
      }

  _getComments() {
      return this.state.comments.map((comment) => {
       return (
          <Comment
            body={comment.body}
            key={comment.id} />
            );
      });
    }

  _getCommentsTitle(commentCount) {
      if (commentCount === 0) {
            return 'No comments yet';
         } else if (commentCount === 1) {
         return '1 comment';
        } else {
        return `${commentCount} comments`;
        }
      }

  _addComment(author, body) {
    const comment = {
        id: this.state.comments.length + 1,
        body
       };
 this.setState({ comments: this.state.comments.concat([comment]) });
  }
  render(){
    const comments = this._getComments();
    return(
      <div className="comment-box">
      <CommentForm addComment={this._addComment.bind(this)} />
       <h3 style={{color:'blue'}}>Comments</h3>
       <h4 className="comment-count">{this._getCommentsTitle(comments.length)}</h4>
       <div className="comment-list">
          {comments}
        </div>

      </div>
    )
  }
}
