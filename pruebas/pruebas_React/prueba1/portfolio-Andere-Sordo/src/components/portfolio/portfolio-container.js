import React, { Component } from "react";

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {

    constructor(){
        super();

        this.state = {
            pageTitle: "Welcome to my portfolio",
            isLoading: false,
            filter: "ALL",
            data: [
                {title:"google", category: "online"},
                {title:"upna", category: "in-person"},
                {title:"upv", category: "in-person"}
            ]
        };

        this.handlePageTitleUpdate = this.handlePageTitleUpdate.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter(filter) {
        this.setState({filter:filter});
    }

    portfolioItems() {
        const { data, filter } = this.state;
        const filteredData = filter === "ALL" 
            ? data 
            : data.filter(item => item.category === filter);

        return filteredData.map(item => (
            <PortfolioItem key={item.title} title={item.title} />
        ));
    }

    handlePageTitleUpdate() {
        this.setState({
            pageTitle: "Something else"
        });
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>;
        }

        return(
            <div>
                <h2>{this.state.pageTitle}</h2>

                {this.portfolioItems()}

                <hr/>

                <button onClick={() => this.handleFilter("online")}>Online</button>
                <button onClick={() => this.handleFilter("in-person")}>In-person</button>
                <button onClick={() => this.handleFilter("ALL")}>Reset</button>


                <button onClick={this.handlePageTitleUpdate}>Change Title</button>
            </div>
        )
    }
}