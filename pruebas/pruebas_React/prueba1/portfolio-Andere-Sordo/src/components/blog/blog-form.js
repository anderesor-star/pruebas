import React, {Component} from "react";
import axios from "axios";

export default class BlogForm extends Component {
    constructor(props) {
        super(props);

        this.state ={
            title: "",
            blog_status: "draft"
        }

        this.handleChange = this. handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    buildForm() {
        let formData = new FormData();

        formData.append("portfolio_blog[title]", this.state.title);
        formData.append("portfolio_blog[blog_status]", this.state.blog_status);
        formData.append("portfolio_blog[content]", this.state.content || "");

        return formData;
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        axios.post("https://anderesordo.devcamp.space/portfolio/portfolio_blogs", 
            this.buildForm(), 
            {withCredentials: true}
        ).then(response => {
            this.setState({
                title: "",
                blog_status: "draft",
                content: ""
            });

            if (response.data.portfolio_blog) {
                this.props.handleSuccessfullFormSubmission(response.data.portfolio_blog);
            }
        }).catch(error => {
            console.log("error in handle submit", error);
        })

        event.preventDefault();
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit} className="blog-form-wrapper">
                <div className="two-columns">
                    <input 
                        type="text"
                        onChange={this.handleChange}
                        name="title"
                        placeholder="Blog Title"
                        value={this.state.title}
                    />
                    <select
                        name="blog_status"
                        value={this.state.blog_status}
                        onChange={this.handleChange}
                        className="select-element"
                    >
                        <option value={"draft"}>Draft</option>
                        <option value={"published"}>Published</option>
                    </select>
                </div>

                <button className="btn">Save</button>
            </form>
        );
    }
}