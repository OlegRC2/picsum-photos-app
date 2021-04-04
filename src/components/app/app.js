import './app.css';
import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomPic from '../randomPic';
import ImgById from '../imgById';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

export default class App extends Component {

	render() {

		return (
			<Router>
				<div className="app">
					<Container>
						<Header />
					</Container>

					<Switch>
						<>
							<Container>
								<Row className="justify-content-between">
									<Col lg={{size: 5}}>
										<Route path='/' exact component={RandomPic}/>
									</Col>
									<Col lg={{size: 5}}>
										<Route path='/' exact component={RandomPic}/>
									</Col>
								</Row>

								<Route path='/get-img-by-id' component={ImgById}/>
									
									
							</Container>
						</>
					</Switch>
				</div>
			</Router>
		)
	}
}