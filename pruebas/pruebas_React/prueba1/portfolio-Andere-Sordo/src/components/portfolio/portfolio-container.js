import React, { Component } from "react";
import axios from 'axios';

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {

    constructor(){
        super();

        this.state = {
            pageTitle: "Welcome to my portfolio",
            isLoading: false,
            filter: "ALL",
            data: []
        };

        this.handlePageTitleUpdate = this.handlePageTitleUpdate.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter(filter) {
        this.setState({filter:filter});
    }

    getPortfolioItems(){
        axios
            .get("https://anderesordo.devcamp.space/portfolio/portfolio_items")
            .then(response => {
                this.setState({
                    data: response.data.portfolio_items
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    portfolioItems() {
        const { data, filter } = this.state;
        const filteredData = filter === "ALL" 
            ? data 
            : data.filter(item => item.category === filter);

        return filteredData.map(item => (
            <PortfolioItem key={item.id} item={item}/>
        ));
    }

    handlePageTitleUpdate() {
        this.setState({
            pageTitle: "Something else"
        });
    }

    componentDidMount(){
        this.getPortfolioItems();
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>;
        }

        return(
            <div>
                <div className="portfolio-items-wrapper">
                    <button className="btn" onClick={() => this.handleFilter("online")}>Online</button>
                    <button className="btn" onClick={() => this.handleFilter("in-person")}>In-person</button>
                    <button className="btn" onClick={() => this.handleFilter("ALL")}>Reset</button>

                    {this.portfolioItems()}
                </div>
            </div>
        )
    }
}