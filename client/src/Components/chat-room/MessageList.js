import React, { Component } from "react";
import Message from './Message';
import ReactDOM from 'react-dom';
// const dummy_data =[
//     {
//         senderId: 'bowbow',
//         text:'heyy,im great,whats up with you ?'
//     },
//     {
//         senderId: 'peekaboo',
//         text:'amazing here ,good to hear from you ?'
//     },
// ]

class MessageList extends React.Component {
    
    componentWillUpdate() {
        const node = ReactDOM.findDOMNode(this)
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
    }   
    componentDidUpdate() {
        if(this.shouldScrollToBottom){
           const node= ReactDOM.findDOMNode(this)
           node.scrollTop=node.scrollHeight
        }
      
    }   
    render(){
        return(
            <div className="message-list">
                {this.props.messages.map((message, index)=> {
                    return <Message key={index} user={message.username} text={message.message} /> 
                })}
            </div>
        )
}
}
export default MessageList;