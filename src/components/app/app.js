import './app.css';
import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomPic from '../randomPic';

export default class App extends Component {

	render() {

		return (
			<div className="app">
				<Container>
					<Header />
				</Container>

				<Container>
					<Row>
						<Col lg={{size: 5, offset: 0}}>
							<RandomPic/>
						</Col>
					</Row>
				</Container>
			</div>
		)
	}
}