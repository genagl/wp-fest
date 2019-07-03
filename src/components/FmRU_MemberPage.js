import React, {Component, Fragment} from 'react';
import Foo from "../Foo";

export default class FmRU_MemberPage extends Component
{
	render()
	{
		return <div className="container">
					<div className="row">
						<div className="col-12">
						FmRU_MemberPage
						<p>
							{Foo.app.props.code}
						</p>
					</div>
				</div>
			</div>;
		
	}
}