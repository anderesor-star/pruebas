import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

export default function() {
    return(
        <div>
            <h2>We couldn't find that page</h2>
            <Link to="/">Link to homepage</Link>
        </div>
    );
}