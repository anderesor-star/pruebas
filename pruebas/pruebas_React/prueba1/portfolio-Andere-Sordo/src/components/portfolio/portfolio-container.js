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
        if (filter === "ALL") {
            this.getPortfolioItems();
        } else {
            this.getPortfolioItems(filter);
        };
    }

    getPortfolioItems(filter = null){
        axios
            .get("https://anderesordo.devcamp.space/portfolio/portfolio_items")
            .then(response => {
                if (filter) {
                    this.setState({
                        data: response.data.portfolio_items.filter(item => {
                        return item.category === filter;
                        })
                    });
                } else {
                    this.setState({
                        data: response.data.portfolio_items
                    });
                }
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
            <div className="homepage-wrapper">
                <div className="filter-links">
                    <button className="btn" onClick={() => this.handleFilter("prueba1")}>Prueba1</button>
                    <button className="btn" onClick={() => this.handleFilter("prueba2")}>Prueba2</button>
                    <button className="btn" onClick={() => this.handleFilter("prueba3")}>Prueba3</button>
                    <button className="btn" onClick={() => this.handleFilter("ALL")}>Reset</button>
                </div>
                <div className="portfolio-items-wrapper">
                    {this.portfolioItems()}
                </div>
            </div>
        )
    }
}