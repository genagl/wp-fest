import Voc from "./Voc";
import React from "react";

export default class FmRUPhase
{
	static setPhase(_phase)
	{
		FmRUPhase.phase = _phase;
	}
	static getText()
	{
		switch(FmRUPhase.phase)
		{
			case "0":
			case 0:
				return <ul className="pagination justify-content-center">
					<li className="page-item">
						<a className="page-link">
							<Voc text="The Festival has not yet begun" />
						</a>
					</li>
				</ul>;
			case "1":
			case 1:
				return <ul className="pagination justify-content-center">
					<li className="page-item">
						<a className="page-link">
							<Voc text="The preparation of the Projects" />
						</a>
					</li>
				</ul>;
			case "2":
			case 2:
				return <ul className="pagination justify-content-center">
					<li className="page-item">
						<a className="page-link">
							<Voc text="The Festival began. Experts evaluate the Projects" />
						</a>
					</li>
				</ul>;
			case "3":
			case 3:
				return <ul className="pagination justify-content-center">
					<li className="page-item">
						<a className="page-link">
							<Voc text="The Festival in archive" />
						</a>
					</li>
				</ul>;
			default:
				return <ul className="pagination justify-content-center">
					<li className="page-item">
						<a className="page-link">
							<Voc text = {FmRUPhase.phase} />
						</a>
					</li>
				</ul>;
		}
	}
}