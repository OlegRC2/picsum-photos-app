import './app.scss';
import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomPic from '../randomPic';
import ImgById from '../imgById';
import SetImgSize from '../setImgSize';
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

								<Route path='/' exact render={() =>
									<>
										<div className="main_title">Random image every 5 sec. Data is taken from api</div>
										<a href="https://picsum.photos" className="main_title" target="_blank" rel="noreferrer">https://picsum.photos</a>
									</>

									}
								/>
									

								<Route path='/get-img-by-id' component={ImgById}/>

								<Route path='/set-img-size' component={SetImgSize}/>
									
							</Container>
						</>
					</Switch>
				</div>
			</Router>
		)
	}
}