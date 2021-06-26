import React from "react";
import { withRouter } from "react-router-dom";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

// core components

import Typography from "@material-ui/core/Typography";
import Card from "../../../Common/components/Card/Card.js";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import CardHeader from "../../../Common/components/Card/CardHeader.js";
import CardBody from "../../../Common/components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

// election hook
import useFetch from "../Hooks/useFetch";

// connect component to store
import { connect } from "react-redux";

// ..............material ui spinner for loading election data...
import useSpinner from "../../../Common/Spinner/Spinner";

const useStyles = makeStyles(styles);

const Election = ({ tkn,history }) => {
	const classes = useStyles();
	const [election, fetchElection, load, text] = useFetch();

	//...........initialize spinner hook
	const [renderSpinner] = useSpinner();

	React.useEffect(() => {
		fetchElection(tkn);
	}, []);

	// destructuring election props
	const {
		election_close_date,
		election_open_date,
		ongoing,
		posts_count,
		title,
		uuid
	} = election;


	
	return (
		<>
			{election !== null && election !== undefined ? (
				<Grid container>
					{/* ...spinner grid item ... */}
					<Grid item xs={12} className={classes.spinner}>
						{renderSpinner(load, text)}
					</Grid>
					{/* .......spinner grid end.......... */}

					<Grid item xs={12} sm={12} md={12}>
						<Card>
							<CardHeader color="danger">
								<h4 className={classes.cardTitleWhite}>Active Election</h4>
								<p className={classes.cardCategoryWhite}>Election details</p>
							</CardHeader>

							<CardBody>
								<Grid container className={classes.election_details}>
									{/* election title */}
									<Grid item xs={12} sm={12} md={12}>
										<p>
											<span>
												<i>Name :</i>
											</span>
											<span>
												<b>{title}</b>
											</span>
										</p>
									</Grid>

									{/* election start date */}
									<Grid item xs={12} sm={12} md={6}>
										<p>
											<span>
												<i>From :</i>
											</span>
											<span>
												<b>{election_open_date}</b>
											</span>
										</p>
									</Grid>

									{/* election end date */}
									<Grid item xs={12} sm={12} md={6}>
										<p>
											<span>
												<i>To :</i>
											</span>
											<span>
												<b>{election_close_date}</b>
											</span>
										</p>
									</Grid>
									{/* election status */}
									<Grid item xs={12} sm={12} md={6}>
										<p>
											<span>
												<i>Status :</i>
											</span>
											{ongoing ? (
												<span>
													<b>ongoing</b>
												</span>
											) : (
												<span>
													<b>active</b>
												</span>
											)}
										</p>
									</Grid>
									{/* election post count */}
									<Grid item xs={12} sm={12} md={6}>
										<p>
											<span>
												<i>Number of posts :</i>
											</span>
											<span>
												<b>{posts_count}</b>
											</span>
										</p>
									</Grid>
								</Grid>
								{/* end details grid container */}
								{uuid !== undefined ? 
								<Grid container>
									{ongoing && ongoing !==undefined? (
										<>
											<Grid item xs={6}>
												<Button variant="contained" color="primary">
													View election
												</Button>
											</Grid>
											<Grid item xs={6}>
												<Button variant="contained" color="secondary">
													Apply for Candidacy
												</Button>
											</Grid>
										</>
									) : (
										<>
											<Grid item xs={6}>
												<Button variant="contained" color="primary" 
													onClick={()=> history.push(`/voting/election/${uuid}`)}>
													View election
												</Button>
											</Grid>
											<Grid item xs={6}>
												<Button variant="contained" color="secondary">
													Vote
												</Button>
											</Grid>
										</>
									)}
								</Grid>
								: null}
							</CardBody>
						</Card>
					</Grid>
				</Grid>
			) : (
				<Grid container>
					<Grid item>
						<Typography variant="subtitle1" color="secondary">
							Sorry, no elections available. Try again later.....
						</Typography>
					</Grid>
				</Grid>
			)}
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		tkn: state.User?.tkn,
	};
};

export default withRouter(connect(mapStateToProps, null)(Election));
