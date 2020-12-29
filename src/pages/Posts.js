import React from 'react';
import { Link, Route } from 'react-router-dom';

const Post = ({match}) => {
    return (
        <div>
            {match.params.title}
        </div>
    );
};

const Posts = () => {
    return (
        <div>
           <h2>Post List</h2> 
           <ul>
                <li><Link to="/posts/1">Post #1</Link></li>
                <li><Link to="/posts/2">Post #2</Link></li>
                <li><Link to="/posts/react">react #3</Link></li>
                <li><Link to="/posts/redux">redux #4</Link></li>
                <li><Link to="/posts/relay">relay #5</Link></li>
           </ul>
           <Route exact path="/posts"render={()=>(<h3>Please select any post</h3>)}/>
           <Route path="/posts/:title" component={Post}/>
        </div>
    );
};

export default Posts;