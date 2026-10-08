import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import BlogItem from "../blog/blog-item";
import BlogModal from "../modals/blog-modals";

class Blog extends Component {
    constructor() {
        super();

        this.state = {
            blogItems: [],
            totalCount: 0,
            currentPage: 0,
            isLoading: true,
            blogModalIsOpen: false
        };

        this.getBlogItems = this.getBlogItems.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.handleNewBlogClick = this.handleNewBlogClick.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleSuccessfullNewBlogSubmission = this.handleSuccessfullNewBlogSubmission.bind(this);
    }

    handleSuccessfullNewBlogSubmission(blog) {
        this.setState({
            blogModalIsOpen: false,
            blogItems: [blog].concat(this.state.blogItems)
        });
    }

    onScroll(event) {
        if (this.state.isLoading || 
            (this.state.totalCount > 0 && this.state.blogItems.length >= this.state.totalCount)) {
        return;
        };

        const target = event.target;
        const scrollTop = target.scrollTop !== undefined ? target.scrollTop : (document.documentElement.scrollTop || document.body.scrollTop);
        const scrollHeight = target.scrollHeight !== undefined ? target.scrollHeight : document.documentElement.scrollHeight;
        const clientHeight = target.clientHeight !== undefined ? target.clientHeight : window.innerHeight;

        console.log("Scroll activo:", scrollTop + clientHeight, "vs Total:", scrollHeight);

        if (scrollHeight - (scrollTop + clientHeight) < 100) {
            this.getBlogItems();
        }
    }

    handleNewBlogClick() {
        this.setState({
            blogModalIsOpen: true
        });
    }

    handleModalClose() {
        this.setState({
            blogModalIsOpen: false
        });
    }

    getBlogItems() {
       this.setState({
            isLoading: true
        });

        const nextPage = this.state.currentPage + 1;

        axios.get(
            `https://anderesordo.devcamp.space/portfolio/portfolio_blogs?page=${nextPage}`, 
            { withCredentials: true }
        ).then(response => {
            console.log("getting page:", nextPage, response);

            const blogs = response.data.portfolio_blogs || [];
            const total = (response.data.meta && response.data.meta.total_records) ? response.data.meta.total_records : 999;

            this.setState({
                blogItems: this.state.blogItems.concat(blogs),
                totalCount: total,
                currentPage: nextPage,
                isLoading: false
            });
        }).catch(error => {
            console.log("error in get blog items:", error);
            this.setState({ isLoading: false });
        });
    }

    componentDidMount() {
        this.getBlogItems();
        window.addEventListener("scroll", this.onScroll, false);
    }
    
    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll, false);
    }

    render() {
        const blogRecords = this.state.blogItems.map((blogItem, index) => {
            return <BlogItem key={`${blogItem.id}-${index}`} blogItem={blogItem} />;
        });
        return(
        <div className="blog-container" onScroll={this.onScroll}>
            <BlogModal 
                handleSuccessfullNewBlogSubmission= {this.handleSuccessfullNewBlogSubmission}
                handleModalClose= {this.handleModalClose}
                modalIsOpen= {this.state.blogModalIsOpen}
            />

            {this.props.loggedInStatus === "LOGGED_IN" ? (
                <div className="new-blog-link">
                    <a onClick={this.handleNewBlogClick}>
                        <FontAwesomeIcon icon={"file-circle-plus"} />
                    </a>
                </div>
            ): null }

            <div className="content-container">
                {blogRecords}
            </div>
            
            {this.state.isLoading ? (
                <div className="content-loader">
                    <FontAwesomeIcon icon={"hurricane"} spin/>
                </div>
            ): null};
        </div>
    );
    }
}

export default Blog;