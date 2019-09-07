import React, {Component, Fragment} from "react";

export default class Loader extends Component
{
	render()
	{
		return <svg 
			width='100' 
			height='100' 
			xmlns="http://www.w3.org/2000/svg" 
			viewBox="0 0 140 140" 
			preserveAspectRatio="xMidYMid"
			className={["uil-ring-alt", window.is_loader ? "visible" : "hidden"].join(" ")}
			
		>
			<rect x="0" y="0" width="140" height="140" fill="none" className="bk"></rect>
			<circle cx="70" cy="70" r="30" stroke="#888888" fill="none" strokeWidth="14" strokeLinecap="round">
			</circle>
			<circle cx="70" cy="70" r="30" stroke="#CCCCCC" fill="none" strokeWidth="10" strokeLinecap="round">
			</circle>
			<circle cx="70" cy="70" r="30" stroke="#34543f" fill="none" strokeWidth="9" strokeLinecap="round">
				<animate attributeName="stroke-dashoffset" dur="6s" repeatCount="indefinite" from="0" to="502">
				</animate>
				<animate attributeName="stroke-dasharray" dur="6s" repeatCount="indefinite" values="150.6 100.4;1 250;150.6 100.4">
				</animate>
			</circle>
		</svg>
	}
}