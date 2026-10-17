import React, {Component} from "react";
import axios from "axios";

export default class PortfolioDetail extends Component {
    constructor(props) {
        super(props);

        this.state= {
            portfolioItem: {}
        }

        this.getPortfolioDetail = this.getPortfolioDetail.bind(this);
    }

    getPortfolioDetail(){
        axios.get(`https://anderesordo.devcamp.space/portfolio/portfolio_items/${this.props.match.params.slug}`, {withCredentials:true})
        .then(response => {
            console.log(response);
            const portfolioItem = response.data.portfolio_item;

            this.setState({
                portfolioItem: response.data.portfolio_item
            });
        }).catch(error => {
            console.log("error in get portfolio detail:", error);
        })
    }

    componentDidMount() {
        this.getPortfolioDetail();
    }

    render() {
        const {
            id,
            banner_image_url,
            category,
            description,
            logo_url,
            name,
            thumb_image_url,
            url
        } = this.state.portfolioItem;

        const bannerStyles = {
            backgroundImage: `url(${banner_image_url})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center center"
        }

        const logoStyles = {
            width: "200px"
        }

        return(
            <div className="portfolio-detail-wrapper">
                <div className="banner" style={bannerStyles}>
                    <img src={logo_url} style={logoStyles}/>
                </div>

                <div className="portfolio-detail-description-wrapper">
                    <div className="description">
                        {description}
                    </div>
                </div>

                <div className="bottom-content-wrapper">
                    <a href={url} className="site-link" target="_blank">
                        Visit {name}
                    </a>
                </div>
            </div>
        );
    } 
}